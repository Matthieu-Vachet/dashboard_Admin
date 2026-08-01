const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { buildChecklist } = require("./engine");
const { readSources } = require("./source-watch");
const { validateAuditPayload } = require("./pokemon-release-audit-schema");
const { dataPath, dataRoot } = require("../../../src/lib/data-repository");

const sourceIds = Object.freeze({
  available: "margxt-pokemon-go-missing",
  shiny: "margxt-pokemon-go-shiny",
  costume: "margxt-pokemon-go-costumes",
  shadow: "margxt-pokemon-go-shadow",
});

const typeLabels = new Set([
  "acier", "combat", "dragon", "eau", "electrik", "electrique", "fee", "feu", "glace",
  "insecte", "normal", "plante", "poison", "psy", "roche", "sol", "spectre", "tenebres", "vol",
]);

const statusDefinitions = Object.freeze({
  "up-to-date": "L’identité est résolue et toutes les valeurs externes correspondent aux valeurs locales.",
  divergence: "L’identité est résolue avec une confiance suffisante et au moins une valeur métier diffère.",
  "external-only": "L’identité externe est connue, mais sa référence locale canonique est absente.",
  "local-only": "L’identité locale appartient au périmètre, mais n’est pas observée dans la source externe.",
  "identity-ambiguous": "Plusieurs identités locales déterministes restent possibles ; aucune comparaison métier n’est faite.",
  "identity-unresolved": "Aucune identité locale fiable n’a été trouvée ; aucune comparaison métier n’est faite.",
  "parse-error": "La ligne externe ne respecte pas la structure attendue et n’est pas comparée.",
  "source-unavailable": "La source externe n’a pas pu être récupérée ; aucun écart n’est créé.",
  "not-verified": "La source ne permet pas de conclure sur cette identité.",
  ignored: "L’observation est explicitement ignorée par le workflow d’identité.",
  "false-positive": "L’observation est classée comme faux positif dans le workflow d’identité.",
  "manual-match": "L’identité provient d’une association manuelle approuvée.",
});

const counterDefinitions = Object.freeze({
  externalEntries: "Nombre de lignes métier valides extraites de la source externe.",
  resolvedIdentities: "Nombre d’identités externes résolues de façon déterministe, avant déduplication.",
  upToDate: statusDefinitions["up-to-date"],
  divergences: statusDefinitions.divergence,
  ambiguous: statusDefinitions["identity-ambiguous"],
  unresolved: statusDefinitions["identity-unresolved"],
  parseErrors: statusDefinitions["parse-error"],
  externalOnly: statusDefinitions["external-only"],
  localOnly: statusDefinitions["local-only"],
  notVerified: statusDefinitions["not-verified"],
  sourceUnavailable: statusDefinitions["source-unavailable"],
});

function normalizeAuditText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeIdentityToken(value) {
  return normalizeAuditText(value).replace(/\s+/g, "_").toUpperCase();
}

function normalizedCompact(value) {
  return normalizeAuditText(value)
    .replace(/\b(?:forme|motif|mode|style|de|du|des|la|le|les|d)\b/g, " ")
    .replace(/\s+/g, "")
    .trim();
}

function dexId(value) {
  const match = String(value || "").match(/\b(\d{1,4})\b/);
  return match ? String(Number(match[1])).padStart(4, "0") : null;
}

function cellLines($, cell) {
  if (!cell) return [];
  const clone = $(cell).clone();
  clone.find("br").replaceWith("\n");
  clone.find("img,script,style,svg,button").remove();
  return clone.text().split(/\n+/).map((line) => line.replace(/\s+/g, " ").trim()).filter(Boolean);
}

function imageUrl($, cell, predicate = () => true) {
  return $(cell).find("img").map((_index, image) => $(image).attr("data-src") || $(image).attr("src") || "").get().find(predicate) || null;
}

function imageVariant(url, sourceName) {
  if (!url) return null;
  let basename;
  try {
    basename = decodeURIComponent(path.basename(new URL(url).pathname));
  } catch {
    basename = decodeURIComponent(path.basename(String(url)));
  }
  const label = basename
    .replace(/\.(?:webp|png|jpe?g)$/i, "")
    .replace(/^\d{1,4}[-_]+/, "")
    .replace(/[-_]+shiny$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();
  const normalizedLabel = normalizeAuditText(label);
  const normalizedName = normalizeAuditText(sourceName);
  if (!normalizedLabel || normalizedLabel === normalizedName || typeLabels.has(normalizedLabel)) return null;
  if (normalizedName && normalizedLabel.startsWith(`${normalizedName} `)) {
    return label.split(/[-_\s]+/).slice(normalizedName.split(" ").length).join(" ") || null;
  }
  return label;
}

function isoSourceDate(value) {
  const match = String(value || "").match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : null;
}

function splitPokemonLabel(lines) {
  const meaningful = lines.filter((line) => !typeLabels.has(normalizeAuditText(line)));
  if (!meaningful.length) return { sourceName: null, sourceForm: null };
  const rawName = meaningful[0];
  const unown = rawName.match(/^Zarbi\s+([A-Z!?])$/i);
  if (unown) return { sourceName: "Zarbi", sourceForm: unown[1].toUpperCase() };
  const regional = rawName.match(/^(.+?)\s+de\s+(Alola|Galar|Hisui|Paldea)$/i);
  if (regional && meaningful.length === 1) return { sourceName: regional[1], sourceForm: regional[2] };
  return { sourceName: rawName, sourceForm: meaningful.slice(1).join(" · ") || null };
}

function sourceKey(kind, index, row) {
  return [kind, row.dexId || "no-dex", normalizeIdentityToken(row.sourceName), normalizeIdentityToken(row.sourceForm || row.sourceCostume || row.sourceVariant), index].join(":");
}

function parseTableRows($, kind) {
  const rows = [];
  const parseErrors = [];
  let previousDex = null;
  $("table").each((tableIndex, table) => {
    const headers = $(table).find("tr").first().find("th").map((_index, cell) => normalizeAuditText($(cell).text())).get();
    if (!headers.some((header) => header.includes("numero")) || !headers.some((header) => header.includes("pokemon"))) return;
    $(table).find("tr").slice(1).each((rowIndex, element) => {
      const cells = $(element).find("td");
      if (cells.length < 3) return;
      const first = $(cells[0]).text().replace(/\s+/g, " ").trim();
      const currentDex = dexId(first) || (/^\/+|idem/i.test(first) ? previousDex : null);
      if (currentDex) previousDex = currentDex;
      const nameLines = cellLines($, cells[1]);
      const { sourceName, sourceForm } = splitPokemonLabel(nameLines);
      const availabilityLines = cellLines($, cells[2]);
      const shinyLines = kind === "shadow" ? cellLines($, cells[3]) : [];
      const sourceImage = imageUrl($, cells[1]);
      const row = {
        dexId: currentDex,
        sourceName,
        sourceForm,
        sourceCostume: null,
        sourceVariant: imageVariant(sourceImage, sourceName),
        sourceImage,
        sourceDate: kind === "available" ? null : isoSourceDate(availabilityLines[0]),
        sourceEvent: kind === "available" ? null : availabilityLines.slice(1).join(" · ") || null,
        sourceInfo: kind === "available" ? availabilityLines.join(" · ") || null : null,
        expected: kind === "available" ? false : true,
        shadowShiny: kind === "shadow" ? Boolean(isoSourceDate(shinyLines[0])) : null,
        shadowShinyDate: kind === "shadow" ? isoSourceDate(shinyLines[0]) : null,
        shadowShinyEvent: kind === "shadow" ? shinyLines.slice(1).join(" · ") || null : null,
        sourceTable: tableIndex,
        sourceRow: rowIndex + 1,
      };
      const navigationRow = /^liste des\b/i.test(sourceName || "") || Boolean($(cells[1]).find('a[href^="#"]').length && !row.sourceDate && kind !== "available");
      if (navigationRow) return;
      const validStructure = Boolean(currentDex && sourceName)
        && (kind === "available" ? /non disponible|indisponible/i.test(row.sourceInfo || "") : Boolean(row.sourceDate));
      if (!validStructure) {
        parseErrors.push({
          ...row,
          sourceKey: `${kind}:parse:${tableIndex}:${rowIndex}`,
          status: "parse-error",
          resolutionStatus: "parse-error",
          businessStatus: "not-verified",
          diagnostics: ["La ligne ne contient pas une identité, une date ou une valeur métier exploitable."],
        });
        return;
      }
      rows.push({ ...row, sourceKey: sourceKey(kind, rows.length, row) });
    });
  });
  return { rows, parseErrors };
}

function costumeSourceRows($) {
  const rows = [];
  const parseErrors = [];
  $("table").each((tableIndex, table) => {
    const headers = $(table).find("tr").first().find("th").map((_index, cell) => normalizeAuditText($(cell).text())).get();
    if (!headers.includes("costume") || !headers.includes("shiny")) return;
    const cells = $(table).find("tr").eq(1).find("td");
    const normalImage = imageUrl($, cells[0], (url) => !/-shiny\./i.test(url));
    const shinyImage = imageUrl($, cells[1], (url) => /-shiny\./i.test(url)) || imageUrl($, cells[1]);
    const figure = $(table).closest("figure");
    const heading = figure.prevAll("h2,h3,h4").first().text().replace(/\s+/g, " ").trim();
    const [rawName, ...costumeParts] = heading.split(/\s+[–—-]\s+/);
    const identityImage = normalImage || shinyImage;
    const filenameDex = dexId(identityImage ? path.basename(identityImage) : "");
    const sourceName = rawName?.trim() || null;
    const sourceCostume = costumeParts.join(" – ").trim() || null;
    const events = figure.prevAll("ul").first().find("li").map((_index, item) => $(item).text().replace(/\s+/g, " ").trim()).get();
    const row = {
      dexId: filenameDex,
      sourceName,
      sourceForm: null,
      sourceCostume,
      sourceVariant: imageVariant(identityImage, sourceName),
      sourceInfo: sourceCostume,
      sourceEvent: events[0] || null,
      sourceEvents: events,
      sourceDate: null,
      expected: true,
      sourceImage: normalImage,
      sourceShinyImage: shinyImage,
      sourceTable: tableIndex,
      sourceRow: 1,
    };
    if (!identityImage || !sourceName || !sourceCostume) {
      parseErrors.push({
        ...row,
        sourceKey: `costume:parse:${tableIndex}`,
        status: "parse-error",
        resolutionStatus: "parse-error",
        businessStatus: "not-verified",
        diagnostics: ["Le bloc costume ne contient pas de titre structuré et d’image normale exploitable."],
      });
      return;
    }
    rows.push({ ...row, sourceKey: sourceKey("costume", rows.length, row) });
  });
  return { rows, parseErrors };
}

function sourceUpdatedLabel($) {
  const match = $("article").first().text().replace(/\s+/g, " ").match(/Dernière mise à jour\s*:\s*(\d{2}\/\d{2}\/\d{4}(?:\s+à\s+\d{1,2}\s*h\s*\d{1,2}\s*min)?)/i);
  return match?.[1] || null;
}

function canonicalSourceFormToken(sourceName, sourceForm) {
  const form = String(sourceForm || "").trim();
  if (normalizeAuditText(sourceName) === "zarbi") {
    if (form === "!") return "UNOWN_EXCLAMATION_POINT";
    if (form === "?") return "UNOWN_QUESTION_MARK";
    if (/^[a-z]$/i.test(form)) return `UNOWN_${form.toUpperCase()}`;
  }
  return normalizeIdentityToken(form);
}

function normalizeMargxtObservation(row) {
  const normalized = {
    ...row,
    sourceRawName: row.sourceName,
    sourceName: String(row.sourceName || "").replace(/\s+/g, " ").trim() || null,
    sourceForm: String(row.sourceForm || "").replace(/\s+/g, " ").trim() || null,
    sourceCostume: String(row.sourceCostume || "").replace(/\s+/g, " ").trim() || null,
  };
  return {
    ...normalized,
    sourceNormalizedName: normalizeIdentityToken(normalized.sourceName),
    sourceNormalizedForm: normalized.sourceForm ? canonicalSourceFormToken(normalized.sourceName, normalized.sourceForm) : null,
    sourceNormalizedCostume: normalized.sourceCostume ? normalizeIdentityToken(normalized.sourceCostume) : null,
    normalizationStatus: normalized.sourceName ? "normalized" : "failed",
  };
}

function parseMargxtAuditHtml(html, kind) {
  const $ = cheerio.load(html);
  const parsed = kind === "costume" ? costumeSourceRows($) : parseTableRows($, kind);
  return {
    rows: parsed.rows.map(normalizeMargxtObservation),
    parseErrors: parsed.parseErrors.map((row) => ({ ...normalizeMargxtObservation(row), normalizationStatus: "failed" })),
    sourceUpdatedAt: sourceUpdatedLabel($),
    title: $("article h1, h1").first().text().replace(/\s+/g, " ").trim() || null,
  };
}

function loadIdentityInventory() {
  const inventoryPath = dataPath("mappings", "pokemonLocalIdentityInventory.json");
  return JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
}

function checklistSourceFile(entry) {
  return String(entry.file || "").replace(/^data\//, "").split("#")[0];
}

function localAuditRows(entries, kind, inventory = loadIdentityInventory()) {
  const checklistByFile = new Map(entries.map((entry) => [checklistSourceFile(entry), entry]));
  return inventory.identities.flatMap((identity) => {
    const isAssetForm = identity.sourceType === "asset-form" || identity.category === "costume";
    if (kind === "costume" && !isAssetForm) return [];
    if (["available", "shadow"].includes(kind) && isAssetForm) return [];
    const sourceFile = identity.pokemonSourceFile || (identity.sourceFile.startsWith("pokemon-assets/") ? null : identity.sourceFile);
    const entry = checklistByFile.get(sourceFile) || checklistByFile.get(identity.sourceFile) || null;
    if (!entry && !isAssetForm) return [];
    return [{
      localKey: entry?.key || identity.identityKey,
      dexId: String(identity.pokemonId).padStart(4, "0"),
      pokemonId: identity.pokemonId,
      canonicalId: identity.canonicalId,
      localName: identity.pokemonName || entry?.name || null,
      displayName: identity.pokemonName || entry?.name || identity.canonicalId,
      localForm: identity.formId || identity.form || "normal",
      localCostume: identity.costume || null,
      category: identity.category,
      sourceType: identity.sourceType,
      image: identity.assets?.image || entry?.image || null,
      shinyImage: identity.assets?.shinyImage || entry?.shinyImage || null,
      genderVariants: identity.genderVariants || { male: false, female: false },
      genderAssets: identity.genderAssets || [],
      file: identity.sourceFile,
      pokemonFile: sourceFile,
      assetsRef: identity.assetsRef || entry?.assetsRef || null,
      availability: entry?.availability || null,
      released: entry?.availability?.released ?? null,
      shinyReleased: entry?.availability?.shinyReleased ?? null,
      shadow: entry?.availability?.shadow ?? null,
      shadowShinyReleased: entry?.availability?.shadowShinyReleased ?? null,
      apex: entry?.availability?.apex ?? null,
    }];
  });
}

function readApprovedMappings() {
  const file = dataPath("mappings", "margxtAuditAliases.json");
  if (!fs.existsSync(file)) return [];
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  return Array.isArray(parsed.mappings) ? parsed.mappings.filter((mapping) => mapping.status === "approved") : [];
}

function sourceAliasValues(source) {
  const basename = source.sourceImage ? imageVariant(source.sourceImage, "") : null;
  return [...new Set([
    source.sourceName,
    source.sourceForm,
    source.sourceCostume,
    source.sourceVariant,
    basename,
    [source.sourceName, source.sourceForm].filter(Boolean).join(" "),
    [source.sourceName, source.sourceCostume].filter(Boolean).join(" "),
  ].filter(Boolean).map(normalizeIdentityToken))];
}

function inferredDex(source, localRows) {
  if (source.dexId) return source.dexId;
  const name = normalizedCompact(source.sourceName);
  const dexes = [...new Set(localRows.filter((local) => normalizedCompact(String(local.localName || "").replace(/\s*\(.+\)\s*$/, "")) === name).map((local) => local.dexId))];
  return dexes.length === 1 ? dexes[0] : null;
}

function candidateView(local) {
  return {
    canonicalId: local.canonicalId,
    dexId: local.dexId,
    displayName: local.displayName,
    form: local.localForm,
    costume: local.localCostume,
    file: local.file,
  };
}

function resultFromLocal(local, resolutionStatus, strategy, confidence, diagnostics = []) {
  return {
    resolutionStatus,
    strategy,
    confidence,
    local,
    candidates: [],
    diagnostics,
  };
}

function resolveAuditIdentity(source, localRows, { identityCatalog = [], approvedMappings = [] } = {}) {
  const resolvedDex = inferredDex(source, localRows);
  const pool = resolvedDex ? localRows.filter((local) => local.dexId === resolvedDex) : localRows;
  const aliasValues = sourceAliasValues(source);
  const managedMatches = [];
  for (const identity of identityCatalog) {
    if (resolvedDex && String(identity.pokemonId).padStart(4, "0") !== resolvedDex) continue;
    for (const alias of identity.aliases || []) {
      if (normalizeAuditText(alias.provider) !== "margxt" || alias.status !== "active") continue;
      if (aliasValues.includes(normalizeIdentityToken(alias.normalizedValue || alias.value))) {
        managedMatches.push({ identity, alias });
      }
    }
  }
  const managedCanonicalIds = [...new Set(managedMatches.map((match) => match.identity.canonicalId))];
  if (managedCanonicalIds.length === 1) {
    const local = localRows.find((candidate) => candidate.canonicalId === managedCanonicalIds[0]);
    if (!local) return { resolutionStatus: "exact", strategy: "identity-manager-alias", confidence: 1, local: null, canonicalId: managedCanonicalIds[0], candidates: [], diagnostics: ["L’alias Identity Manager est connu, mais sa référence locale est absente."] };
    const alias = managedMatches.find((match) => match.identity.canonicalId === managedCanonicalIds[0]).alias;
    return resultFromLocal(local, alias.source === "manual" ? "manual-match" : "alias-exact", "identity-manager-alias", alias.confidence ?? 1);
  }
  if (managedCanonicalIds.length > 1) {
    const candidates = pool.filter((local) => managedCanonicalIds.includes(local.canonicalId));
    return { resolutionStatus: "ambiguous", strategy: "identity-manager-alias", confidence: 1, local: null, candidates: candidates.map(candidateView), diagnostics: ["Plusieurs identités portent le même alias Margxt actif."] };
  }

  if (source.sourceForm && normalizeAuditText(source.sourceName) !== "zarbi") {
    const combined = normalizeAuditText([source.sourceName, source.sourceForm].filter(Boolean).join(" "));
    const exactDisplay = pool.filter((local) => normalizeAuditText(local.displayName) === combined);
    if (exactDisplay.length === 1) return resultFromLocal(exactDisplay[0], "exact", "display-name-exact", 1);
    if (exactDisplay.length > 1) return { resolutionStatus: "ambiguous", strategy: "display-name-exact", confidence: 1, local: null, candidates: exactDisplay.map(candidateView), diagnostics: ["Plusieurs identités partagent exactement le même libellé canonique."] };
  }

  const explicitVariant = Boolean(source.sourceForm || source.sourceCostume || source.sourceVariant);
  if (source.sourceForm) {
    const canonicalForm = source.sourceNormalizedForm || canonicalSourceFormToken(source.sourceName, source.sourceForm);
    const requested = normalizedCompact(canonicalForm);
    const exactForms = pool.filter((local) => {
      const values = [local.localForm, local.canonicalId, local.displayName].map(normalizedCompact);
      if (normalizeAuditText(source.sourceName) === "zarbi" && /^UNOWN_/.test(canonicalForm)) {
        return normalizeIdentityToken(local.localForm) === canonicalForm || normalizeIdentityToken(local.canonicalId) === canonicalForm;
      }
      return values.some((value) => value === requested || value.endsWith(requested));
    });
    if (exactForms.length === 1) return resultFromLocal(exactForms[0], "exact", "form-exact", 1);
    if (exactForms.length > 1) return { resolutionStatus: "ambiguous", strategy: "form-exact", confidence: 1, local: null, candidates: exactForms.map(candidateView), diagnostics: ["Plusieurs formes canoniques correspondent exactement au qualificatif externe."] };
  }

  if (source.sourceCostume) {
    const requested = normalizedCompact(source.sourceCostume);
    const exactCostumes = pool.filter((local) => normalizedCompact(local.localCostume) === requested || normalizedCompact(local.canonicalId).endsWith(requested));
    if (exactCostumes.length === 1) return resultFromLocal(exactCostumes[0], "exact", "costume-exact", 1);
    if (exactCostumes.length > 1) return { resolutionStatus: "ambiguous", strategy: "costume-exact", confidence: 1, local: null, candidates: exactCostumes.map(candidateView), diagnostics: ["Plusieurs costumes canoniques correspondent exactement au qualificatif externe."] };
  }

  const approved = approvedMappings.filter((mapping) => {
    if (mapping.kinds?.length && !mapping.kinds.includes(source.kind)) return false;
    if (resolvedDex && mapping.dexId && String(mapping.dexId).padStart(4, "0") !== resolvedDex) return false;
    return aliasValues.includes(normalizeIdentityToken(mapping.sourceValue));
  });
  const approvedIds = [...new Set(approved.map((mapping) => mapping.canonicalId))];
  if (approvedIds.length === 1) {
    const local = localRows.find((candidate) => candidate.canonicalId === approvedIds[0]);
    if (!local) return { resolutionStatus: "mapping-approved", strategy: "approved-mapping", confidence: 1, local: null, canonicalId: approvedIds[0], candidates: [], diagnostics: ["Le mapping approuvé cible une identité absente du catalogue local."] };
    return resultFromLocal(local, "mapping-approved", "approved-mapping", 1);
  }
  if (approvedIds.length > 1) {
    const candidates = pool.filter((local) => approvedIds.includes(local.canonicalId));
    return { resolutionStatus: "ambiguous", strategy: "approved-mapping", confidence: 1, local: null, candidates: candidates.map(candidateView), diagnostics: ["Le registre de mappings approuvés contient plusieurs cibles."] };
  }

  if (!explicitVariant) {
    const baseName = normalizedCompact(source.sourceName);
    const species = pool.filter((local) => local.sourceType === "pokemon-file" && normalizedCompact(String(local.localName || "").replace(/\s*\(.+\)\s*$/, "")) === baseName);
    const canonicalNormal = species.filter((local) => normalizeIdentityToken(local.canonicalId).endsWith("_NORMAL"));
    if (canonicalNormal.length === 1) return resultFromLocal(canonicalNormal[0], "exact", "canonical-normal-form", 1);
    if (canonicalNormal.length > 1) return { resolutionStatus: "ambiguous", strategy: "canonical-normal-form", confidence: 1, local: null, candidates: canonicalNormal.map(candidateView), diagnostics: ["Plusieurs fiches canoniques *_NORMAL correspondent à l’espèce sans qualificatif externe."] };
    if (species.length === 1) return resultFromLocal(species[0], "exact", "dex-and-species-exact", 1);
    if (species.length > 1) return { resolutionStatus: "ambiguous", strategy: "dex-and-species-exact", confidence: 1, local: null, candidates: species.map(candidateView), diagnostics: ["La source ne précise aucune forme et l’inventaire contient plusieurs fiches canoniques sans forme normale unique."] };
  }

  const hint = normalizedCompact(source.sourceForm || source.sourceCostume || source.sourceVariant);
  const probable = hint
    ? pool.filter((local) => [local.canonicalId, local.localForm, local.localCostume, local.displayName].map(normalizedCompact).some((value) => value && (value.includes(hint) || hint.includes(value)))).slice(0, 5)
    : [];
  return {
    resolutionStatus: probable.length ? "probable" : "unresolved",
    strategy: probable.length ? "text-suggestion-only" : "none",
    confidence: probable.length === 1 ? 0.5 : 0,
    local: null,
    candidates: probable.map(candidateView),
    diagnostics: [probable.length ? "Suggestions textuelles affichées pour aide uniquement ; aucune identité n’est validée automatiquement." : "Aucune identité canonique déterministe ne correspond à l’observation."],
  };
}

function comparison(field, externalValue, localValue, reason) {
  return { field, externalValue, localValue, matches: externalValue === localValue, reason };
}

function comparisonsFor(kind, source, local) {
  if (kind === "available") return [comparison("availability.released", false, local.released, "La source liste cette identité comme introuvable.")];
  if (kind === "shiny") return [
    comparison("availability.shinyReleased", true, local.shinyReleased, "La source liste cette identité comme chromatique disponible."),
    comparison("assets.shinyImage", true, Boolean(local.shinyImage), "Une identité shiny disponible doit exposer son asset shiny canonique."),
  ];
  if (kind === "shadow") return [
    comparison("availability.shadow", true, local.shadow, "La source liste cette identité comme Shadow disponible."),
    comparison("availability.shadowShinyReleased", Boolean(source.shadowShiny), local.shadowShinyReleased, source.shadowShiny ? "La colonne Shiny contient une date de disponibilité." : "La colonne Shiny est vide dans la source."),
  ];
  return [
    comparison("assetForms.canonicalIdentity", true, true, "L’identité costume canonique existe dans PokemonGo-Data."),
    comparison("assets.image", Boolean(source.sourceImage), Boolean(local.image), "La présence de l’asset normal est comparée explicitement."),
    comparison("assets.shinyImage", Boolean(source.sourceShinyImage), Boolean(local.shinyImage), "La présence de l’asset shiny est comparée explicitement."),
  ];
}

function relevantLocalRows(kind, localRows) {
  if (kind === "available") return localRows.filter((local) => local.released === false);
  if (kind === "shiny") return localRows.filter((local) => local.shinyReleased === true || Boolean(local.shinyImage));
  if (kind === "shadow") return localRows.filter((local) => local.shadow === true);
  return localRows;
}

function compareAuditRows(kind, externalRows, localRows, options = {}) {
  const approvedMappings = options.approvedMappings || [];
  const identityCatalog = options.identityCatalog || [];
  const usedLocal = new Set();
  const blockedDexes = new Set();
  const rows = externalRows.map((external) => {
    const source = { ...external, kind };
    const resolution = resolveAuditIdentity(source, localRows, { approvedMappings, identityCatalog });
    if (resolution.resolutionStatus === "ambiguous") {
      const effectiveDexId = inferredDex(source, localRows);
      if (effectiveDexId) blockedDexes.add(effectiveDexId);
      return { ...source, effectiveDexId, status: "identity-ambiguous", businessStatus: "not-verified", resolutionStatus: "ambiguous", resolutionStrategy: resolution.strategy, confidence: resolution.confidence, candidates: resolution.candidates, diagnostics: resolution.diagnostics, comparisons: [] };
    }
    if (["unresolved", "probable"].includes(resolution.resolutionStatus)) {
      const effectiveDexId = inferredDex(source, localRows);
      if (effectiveDexId) blockedDexes.add(effectiveDexId);
      return { ...source, effectiveDexId, status: "identity-unresolved", businessStatus: "not-verified", resolutionStatus: resolution.resolutionStatus, resolutionStrategy: resolution.strategy, confidence: resolution.confidence, candidates: resolution.candidates, diagnostics: resolution.diagnostics, comparisons: [] };
    }
    if (!resolution.local) {
      return { ...source, canonicalId: resolution.canonicalId || null, status: "external-only", businessStatus: "external-only", resolutionStatus: resolution.resolutionStatus, resolutionStrategy: resolution.strategy, confidence: resolution.confidence, candidates: [], diagnostics: resolution.diagnostics, comparisons: [] };
    }
    const local = resolution.local;
    usedLocal.add(local.canonicalId);
    const comparisons = comparisonsFor(kind, source, local);
    const mismatches = comparisons.filter((item) => !item.matches);
    const businessStatus = mismatches.length ? "divergence" : "up-to-date";
    return {
      ...source,
      ...local,
      status: businessStatus,
      businessStatus,
      resolutionStatus: resolution.resolutionStatus,
      resolutionStrategy: resolution.strategy,
      confidence: resolution.confidence,
      candidates: [],
      comparisons,
      comparedField: mismatches[0]?.field || comparisons[0]?.field || null,
      externalValue: mismatches[0]?.externalValue ?? comparisons[0]?.externalValue ?? null,
      localValue: mismatches[0]?.localValue ?? comparisons[0]?.localValue ?? null,
      diagnostics: mismatches.map((item) => `${item.field} : ${item.reason} Externe=${JSON.stringify(item.externalValue)}, local=${JSON.stringify(item.localValue)}.`),
    };
  });
  for (const local of relevantLocalRows(kind, localRows)) {
    if (usedLocal.has(local.canonicalId)) continue;
    const notVerified = blockedDexes.has(local.dexId);
    rows.push({
      ...local,
      sourceKey: null,
      status: notVerified ? "not-verified" : "local-only",
      businessStatus: notVerified ? "not-verified" : "local-only",
      resolutionStatus: "exact",
      resolutionStrategy: "local-canonical-inventory",
      confidence: 1,
      candidates: [],
      comparisons: [],
      diagnostics: [notVerified
        ? "Une observation externe du même dexId n’est pas résolue ; l’absence de cette identité précise ne peut pas être affirmée."
        : kind === "available"
          ? "Le JSON local marque cette identité indisponible, mais l’absence de la liste Margxt ne prouve pas sa disponibilité."
          : "L’identité locale appartient au périmètre, mais aucune observation externe résolue ne lui correspond."],
    });
  }
  return rows;
}

function auditStats(rows, externalEntries, parseErrors = 0, sourceUnavailable = 0) {
  const byStatus = {};
  for (const row of rows) byStatus[row.status] = (byStatus[row.status] || 0) + 1;
  const resolvedStatuses = new Set(["exact", "alias-exact", "mapping-approved", "manual-match"]);
  return {
    externalEntries,
    resolvedIdentities: rows.filter((row) => row.sourceKey && resolvedStatuses.has(row.resolutionStatus)).length,
    uniqueResolvedIdentities: new Set(rows.filter((row) => row.sourceKey && row.canonicalId && resolvedStatuses.has(row.resolutionStatus)).map((row) => row.canonicalId)).size,
    upToDate: byStatus["up-to-date"] || 0,
    divergences: byStatus.divergence || 0,
    ambiguous: byStatus["identity-ambiguous"] || 0,
    unresolved: byStatus["identity-unresolved"] || 0,
    parseErrors,
    externalOnly: byStatus["external-only"] || 0,
    localOnly: byStatus["local-only"] || 0,
    notVerified: byStatus["not-verified"] || 0,
    sourceUnavailable,
    totalResults: rows.length,
    byStatus,
  };
}

async function runPokemonReleaseAudit(kind, options = {}) {
  if (!sourceIds[kind]) throw new Error("Type d'audit Pokémon inconnu.");
  const source = readSources().find((item) => item.id === sourceIds[kind]);
  if (!source) throw new Error(`Source ${sourceIds[kind]} non enregistrée.`);
  const fetchedAt = new Date().toISOString();
  try {
    const response = await fetch(source.url, {
      cache: "no-store",
      signal: AbortSignal.timeout(18_000),
      headers: { accept: "text/html", "accept-language": "fr-FR,fr;q=0.9", "user-agent": "MatWeb-Pokemon-Release-Audit/2.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const parsed = parseMargxtAuditHtml(html, kind);
    const local = localAuditRows(buildChecklist(), kind, options.inventory || loadIdentityInventory());
    const rows = compareAuditRows(kind, parsed.rows, local, {
      approvedMappings: options.approvedMappings || readApprovedMappings(),
      identityCatalog: options.identityCatalog || [],
    });
    const allRows = [...parsed.parseErrors, ...rows];
    return validateAuditPayload({
      kind,
      source: { ...source, status: "success", fetchedAt, sourceUpdatedAt: parsed.sourceUpdatedAt, title: parsed.title },
      provenance: { rawSha256: crypto.createHash("sha256").update(html).digest("hex"), parser: `${source.scraper}-structured-v2`, writePolicy: "read-only", identityAuthority: "PokemonGo-Data + Identity Manager" },
      definitions: { statuses: statusDefinitions, counters: counterDefinitions },
      stats: auditStats(allRows, parsed.rows.length, parsed.parseErrors.length),
      parsing: { accepted: parsed.rows.length, errors: parsed.parseErrors.length },
      rows: allRows,
    });
  } catch (error) {
    return validateAuditPayload({
      kind,
      source: { ...source, status: "source-unavailable", fetchedAt, error: error.message },
      provenance: { rawSha256: null, parser: `${source.scraper}-structured-v2`, writePolicy: "read-only", identityAuthority: "PokemonGo-Data + Identity Manager" },
      definitions: { statuses: statusDefinitions, counters: counterDefinitions },
      stats: auditStats([], 0, 0, 1),
      parsing: { accepted: 0, errors: 0 },
      rows: [],
    });
  }
}

module.exports = {
  auditStats,
  compareAuditRows,
  counterDefinitions,
  localAuditRows,
  normalizeAuditText,
  normalizeMargxtObservation,
  parseMargxtAuditHtml,
  resolveAuditIdentity,
  runPokemonReleaseAudit,
  statusDefinitions,
};
