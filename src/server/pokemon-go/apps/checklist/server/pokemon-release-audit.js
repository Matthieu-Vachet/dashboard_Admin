const crypto = require("crypto");
const cheerio = require("cheerio");
const { buildChecklist } = require("./engine");
const { readSources } = require("./source-watch");

const sourceIds = {
  available: "margxt-pokemon-go-missing",
  shiny: "margxt-pokemon-go-shiny",
  costume: "margxt-pokemon-go-costumes",
  shadow: "margxt-pokemon-go-shadow",
};

function normalizeAuditText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function dexId(value) {
  const match = String(value || "").match(/\b(\d{1,4})\b/);
  return match ? String(Number(match[1])).padStart(4, "0") : null;
}

function tableSourceRows($, kind) {
  const rows = [];
  let previousDex = null;
  $("table tr").each((_index, element) => {
    const cells = $(element).find("td");
    if (cells.length < 2) return;
    const first = $(cells[0]).text().replace(/\s+/g, " ").trim();
    const currentDex = dexId(first) || (/^\/+|idem/i.test(first) ? previousDex : null);
    if (!currentDex) return;
    previousDex = currentDex;
    const name = $(cells[1]).clone().find("img,script,style").remove().end().text().replace(/\s+/g, " ").trim();
    if (!name) return;
    const info = $(cells[2]).text().replace(/\s+/g, " ").trim();
    const shinyInfo = $(cells[3]).text().replace(/\s+/g, " ").trim();
    rows.push({
      sourceKey: `${kind}:${currentDex}:${normalizeAuditText(name)}`,
      dexId: currentDex,
      sourceName: name,
      sourceForm: null,
      sourceCostume: null,
      sourceInfo: info || null,
      expected: kind === "available" ? false : true,
      shadowShiny: kind === "shadow" ? Boolean(shinyInfo && !/non disponible|indisponible|—|^-$/i.test(shinyInfo)) : null,
    });
  });
  return rows;
}

function costumeSourceRows($) {
  const byKey = new Map();
  $("table").each((_index, table) => {
    const images = $(table).find("img").map((_imageIndex, image) => $(image).attr("data-src") || $(image).attr("src") || "").get();
    const normalImage = images.find((src) => /\/(\d{1,4})-[^/]+\.(?:webp|png|jpe?g)(?:\?|$)/i.test(src) && !/-shiny\./i.test(src));
    if (!normalImage) return;
    const filename = decodeURIComponent(normalImage.split("/").pop().split("?")[0]);
    const match = filename.match(/^(\d{1,4})-(.+?)\.(?:webp|png|jpe?g)$/i);
    if (!match) return;
    const currentDex = String(Number(match[1])).padStart(4, "0");
    const rawLabel = match[2].replace(/-shiny$/i, "").replace(/-+/g, " ").trim();
    const heading = $(table).prevAll("h2,h3,h4").first().text().replace(/\s+/g, " ").trim();
    const sourceName = heading && !/costume|shiny/i.test(heading) ? heading : rawLabel.split(" ")[0];
    const key = `${currentDex}:${normalizeAuditText(rawLabel)}`;
    const shinyImage = images.find((src) => /-shiny\./i.test(src)) || null;
    byKey.set(key, {
      sourceKey: `costume:${key}`,
      dexId: currentDex,
      sourceName,
      sourceForm: null,
      sourceCostume: rawLabel,
      sourceInfo: rawLabel,
      expected: true,
      image: normalImage,
      shinyImage,
    });
  });
  return [...byKey.values()];
}

function parseMargxtAuditHtml(html, kind) {
  const $ = cheerio.load(html);
  const rows = kind === "costume" ? costumeSourceRows($) : tableSourceRows($, kind);
  return {
    rows,
    sourceUpdatedAt: $("time[datetime]").first().attr("datetime") || null,
    title: $("h1").first().text().replace(/\s+/g, " ").trim() || null,
  };
}

function localAuditRows(entries, kind) {
  if (kind === "costume") {
    const byKey = new Map();
    for (const entry of entries) {
      for (const asset of entry.eventAssets || []) {
        const key = [entry.dexId, normalizeAuditText(asset.form || entry.form || "normal"), normalizeAuditText(asset.costume || "none")].join("|");
        const current = byKey.get(key) || {
          localKey: entry.key,
          dexId: entry.dexId,
          localName: entry.name,
          localForm: asset.form || entry.form || "normal",
          localCostume: asset.costume || null,
          image: asset.image || null,
          shinyImage: asset.shinyImage || null,
          genders: [],
          occurrences: 0,
        };
        const gender = asset.isFemale ? "female" : "male-or-shared";
        if (!current.genders.includes(gender)) current.genders.push(gender);
        current.occurrences += 1;
        current.image ||= asset.image || null;
        current.shinyImage ||= asset.shinyImage || null;
        byKey.set(key, current);
      }
    }
    return [...byKey.values()];
  }
  return entries.map((entry) => ({
    localKey: entry.key,
    dexId: entry.dexId,
    localName: entry.name,
    localForm: entry.form,
    localCostume: null,
    image: entry.image || null,
    shinyImage: entry.shinyImage || null,
    released: entry.availability?.released ?? null,
    shinyReleased: entry.availability?.shinyReleased ?? null,
    shadow: entry.availability?.shadow ?? null,
    shadowShinyReleased: entry.availability?.shadowShinyReleased ?? null,
  }));
}

function candidateScore(source, local, kind) {
  if (source.dexId !== local.dexId) return -1;
  const sourceText = normalizeAuditText([source.sourceName, source.sourceForm, source.sourceCostume].filter(Boolean).join(" "));
  const localText = normalizeAuditText([local.localName, local.localForm, local.localCostume].filter(Boolean).join(" "));
  const sourceName = normalizeAuditText(source.sourceName);
  const localName = normalizeAuditText(local.localName);
  if (sourceText === localText) return 100;
  if (kind === "costume" && local.localCostume && sourceText.includes(normalizeAuditText(local.localCostume))) return 80;
  if (sourceName && sourceName === localName) {
    const normalForm = !local.localForm || normalizeAuditText(local.localForm) === "normal";
    return normalForm ? 95 : 85;
  }
  if (local.localForm && normalizeAuditText(local.localForm) !== "normal" && sourceText.includes(normalizeAuditText(local.localForm))) return 75;
  if (sourceText.includes(localName) || localText.includes(sourceName)) return 50;
  return 10;
}

function compareAuditRows(kind, externalRows, localRows) {
  const usedLocal = new Set();
  const rows = externalRows.map((source) => {
    const candidates = localRows
      .map((local, index) => ({ local, index, score: candidateScore(source, local, kind) }))
      .filter((candidate) => candidate.score >= 0)
      .sort((left, right) => right.score - left.score);
    if (!candidates.length) return { ...source, status: "external-only", diagnostics: ["Aucune identité locale avec ce dexId."] };
    const best = candidates[0];
    const ambiguous = candidates.length > 1 && candidates[1].score === best.score;
    if (ambiguous) return { ...source, status: "ambiguous", candidates: candidates.slice(0, 5).map(({ local }) => local), diagnostics: ["Plusieurs variantes locales ont le même score de rapprochement."] };
    usedLocal.add(best.index);
    const local = best.local;
    let agrees = false;
    const diagnostics = [];
    if (kind === "available") agrees = local.released === false;
    if (kind === "shiny") agrees = local.shinyReleased === true;
    if (kind === "shadow") {
      agrees = local.shadow === true && (!source.shadowShiny || local.shadowShinyReleased === true);
      if (source.shadowShiny && local.shadowShinyReleased !== true) diagnostics.push("Shiny Shadow externe présent, mais shadowShinyReleased local n'est pas true.");
    }
    if (kind === "costume") {
      agrees = Boolean(local.image);
      if (!local.image) diagnostics.push("Image de costume locale absente.");
      if (source.shinyImage && !local.shinyImage) diagnostics.push("Image shiny externe présente, mais asset shiny local absent.");
      if (source.shinyImage && !local.shinyImage) agrees = false;
    }
    if (!agrees && !diagnostics.length) diagnostics.push("La valeur locale diverge de l'observation externe.");
    return { ...source, ...local, status: agrees ? "up-to-date" : "divergence", diagnostics };
  });
  const relevantLocal = localRows.filter((local) => {
    if (kind === "available") return local.released === false;
    if (kind === "shiny") return local.shinyReleased === true;
    if (kind === "shadow") return local.shadow === true;
    return true;
  });
  for (const local of relevantLocal) {
    const originalIndex = localRows.indexOf(local);
    if (!usedLocal.has(originalIndex)) rows.push({ ...local, status: "local-only", diagnostics: ["Présent localement, non rapproché dans la page externe."] });
  }
  return rows;
}

function auditStats(rows) {
  const byStatus = {};
  for (const row of rows) byStatus[row.status] = (byStatus[row.status] || 0) + 1;
  return { total: rows.length, ...byStatus };
}

async function runPokemonReleaseAudit(kind) {
  if (!sourceIds[kind]) throw new Error("Type d'audit Pokémon inconnu.");
  const source = readSources().find((item) => item.id === sourceIds[kind]);
  if (!source) throw new Error(`Source ${sourceIds[kind]} non enregistrée.`);
  const fetchedAt = new Date().toISOString();
  try {
    const response = await fetch(source.url, {
      cache: "no-store",
      signal: AbortSignal.timeout(18_000),
      headers: { accept: "text/html", "accept-language": "fr-FR,fr;q=0.9", "user-agent": "MatWeb-Pokemon-Release-Audit/1.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const parsed = parseMargxtAuditHtml(html, kind);
    const local = localAuditRows(buildChecklist(), kind);
    const rows = compareAuditRows(kind, parsed.rows, local);
    return {
      kind,
      source: { ...source, status: "success", fetchedAt, sourceUpdatedAt: parsed.sourceUpdatedAt, title: parsed.title },
      provenance: { rawSha256: crypto.createHash("sha256").update(html).digest("hex"), parser: source.scraper, writePolicy: "read-only" },
      stats: auditStats(rows),
      rows,
    };
  } catch (error) {
    return {
      kind,
      source: { ...source, status: "source-unavailable", fetchedAt, error: error.message },
      provenance: { rawSha256: null, parser: source.scraper, writePolicy: "read-only" },
      stats: { total: 0 },
      rows: [],
    };
  }
}

module.exports = {
  compareAuditRows,
  localAuditRows,
  normalizeAuditText,
  parseMargxtAuditHtml,
  runPokemonReleaseAudit,
};
