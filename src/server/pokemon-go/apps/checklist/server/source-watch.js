const fs = require("fs");
const { createHash } = require("crypto");
const path = require("path");
const cheerio = require("cheerio");
const { dataPath } = require("../../../src/lib/data-repository");

const sourcesFile = dataPath("operations", "audits", "sources", "current.json");
const pvpManifestFile = dataPath("data", "pvp", "manifests", "current.json");
const adventureEffectsDirectory = dataPath("data", "adventure-effects", "effects");
const adventureEffectsReportFile = dataPath("operations", "reports", "adventure-effects", "current.json");
const adventureEffectLocales = Object.freeze(["en", "de", "es", "pt", "fr", "nl"]);
const userAgent =
  "Mozilla/5.0 (compatible; MatWebPokemonGoSourceWatch/1.0; +https://pokemon-go-api.vercel.app)";
const timeoutMs = 12000;

function readSources() {
  return JSON.parse(fs.readFileSync(sourcesFile, "utf8"));
}

function shortSha(value) {
  return String(value || "").slice(0, 12);
}

function requestHeaders(url, accept = "application/vnd.github+json, application/json") {
  const headers = {
    accept,
    "user-agent": userAgent,
  };
  const token = process.env.POKEMON_GO_DATA_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (token && new URL(url).hostname === "api.github.com") headers.authorization = `Bearer ${token}`;
  return headers;
}

function sourceHttpError(response, checkedUrl) {
  const error = new Error(`HTTP ${response.status}`);
  error.httpStatus = response.status;
  error.checkedUrl = checkedUrl;
  return error;
}

async function fetchResponse(url, options = {}) {
  const response = await fetch(url, {
    method: options.method,
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
    headers: requestHeaders(url, options.accept),
  });
  if (!response.ok) throw sourceHttpError(response, url);
  return response;
}

async function fetchJson(url) {
  const response = await fetchResponse(url);
  return { data: await response.json(), response };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function readAdventureEffects() {
  if (!fs.existsSync(adventureEffectsDirectory)) return [];
  return fs.readdirSync(adventureEffectsDirectory)
    .filter((file) => file.endsWith(".adventure-effect.json"))
    .sort()
    .map((file) => JSON.parse(fs.readFileSync(path.join(adventureEffectsDirectory, file), "utf8")));
}

function adventureTable($) {
  return $("h3")
    .filter((_index, heading) => /Adventure|Abenteuer|aventura|aventure|avontuur/i.test($(heading).text()))
    .last()
    .next("div")
    .find("table")
    .first();
}

function parseAdventurePage(html) {
  const $ = cheerio.load(html);
  const rows = Object.fromEntries(adventureTable($).find("tr").map((_index, row) => {
    const label = $(row).find("th").text().replace(/\s+/g, " ").trim();
    const value = $(row).find("td").text().replace(/\s+/g, " ").trim();
    const raw = $(row).find("pre").text().trim() || null;
    return [[label, { value, raw }]];
  }).get());
  return {
    name: $("h1").first().text().replace(/\s+/g, " ").trim(),
    description: Object.values(rows)[0]?.value || null,
    rows,
    structured: Object.keys(rows).length >= 4,
  };
}

function numbers(value) {
  return String(value || "").match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
}

function sourceMoveId(effect) {
  const source = (effect.sources || []).find((entry) => entry.sourceType === "GO_HUB");
  const direct = String(source?.sourceUrl || "").match(/\/move\/(\d+)/)?.[1];
  if (direct) return direct;
  try {
    const report = JSON.parse(fs.readFileSync(adventureEffectsReportFile, "utf8"));
    return String(report.sourceAudit?.pageAudits?.find((entry) => entry.effectId === effect.id)?.url || "").match(/\/move\/(\d+)/)?.[1] || null;
  } catch {
    return null;
  }
}

function parseBonus(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return { unparsed: raw };
  }
}

async function adventureEffectsStatus(source, checkedAt) {
  const effects = readAdventureEffects();
  if (!effects.length) throw new Error("Le snapshot canonique Adventure Effects est absent.");
  const observations = await Promise.all(effects.flatMap((effect) => {
    const moveId = sourceMoveId(effect);
    if (!moveId) throw new Error(`Move GO Hub introuvable pour ${effect.id}.`);
    return adventureEffectLocales.map(async (locale) => {
      const url = `https://db.pokemongohub.net/${locale}/move/${moveId}`;
      const response = await fetchResponse(url, { method: "GET", accept: "text/html,*/*;q=0.8" });
      return { effectId: effect.id, locale, url, httpStatus: response.status, page: parseAdventurePage(await response.text()) };
    });
  }));
  const byEffect = new Map(effects.map((effect) => [effect.id, []]));
  for (const observation of observations) byEffect.get(observation.effectId).push(observation);
  const snapshot = {
    effects: Object.fromEntries(effects.map((effect) => {
      const pages = byEffect.get(effect.id).sort((left, right) => left.locale.localeCompare(right.locale));
      const english = pages.find((page) => page.locale === "en")?.page;
      const cost = numbers(english?.rows?.Cost?.value);
      const duration = numbers(english?.rows?.Duration?.value)[0] ?? null;
      const extraDuration = numbers(english?.rows?.["Extra Duration"]?.value)[0] ?? null;
      return [effect.id, {
        label: effect.localization?.fr?.name || effect.localization?.en?.name || effect.id,
        moveRef: effect.moveRef,
        pokemonRefs: (effect.pokemonRefs || []).map((reference) => reference.formId).sort(),
        localization: Object.fromEntries(pages.map(({ locale, page }) => [locale, { name: page.name, description: page.description }])),
        structured: english?.structured === true,
        cost: english?.structured ? { candy: cost[0] ?? null, stardust: cost[1] ?? null } : null,
        duration: english?.structured ? { durationSeconds: duration, extraDurationSeconds: extraDuration } : null,
        bonusEffects: english?.structured ? parseBonus(english.rows?.["Bonus Effects"]?.raw) || english.rows?.["Bonus Effects"]?.value : null,
        assets: { banner: effect.assets?.bannerPath || null, portrait: effect.assets?.portraitPath || null },
      }];
    })),
  };
  const contentHash = sha256(JSON.stringify(snapshot));
  return {
    ...source,
    status: "ok",
    provider: "Pokémon GO Hub",
    signature: contentHash,
    version: contentHash.slice(0, 12),
    contentHash,
    semanticSnapshot: snapshot,
    checkedUrl: source.url,
    httpStatus: observations.every((observation) => observation.httpStatus === 200) ? 200 : null,
    checkedAt,
    updatedAt: null,
    message: `${effects.length} Effets d’aventure contrôlés dans ${adventureEffectLocales.length} langues (${observations.length} pages).`,
    remoteUrl: source.url,
  };
}

function normalizedText(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function adventureInventoryStatus(source, checkedAt) {
  const response = await fetchResponse(source.url, { method: "GET", accept: "text/html,*/*;q=0.8" });
  const html = await response.text();
  const $ = cheerio.load(html);
  const table = $("table").filter((_index, element) => /Effet d.aventure/.test($(element).text())).first();
  if (!table.length) throw new Error("Table d’inventaire Margxt absente.");
  const inventory = table.find("tr").map((_index, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) return null;
    const name = cells.first().find("a").first().text().trim();
    return name ? { name, pokemon: cells.eq(1).text().replace(/\s+/g, " ").trim() } : null;
  }).get();
  const effects = readAdventureEffects();
  const snapshot = {
    effects: effects.filter((effect) => inventory.some((entry) => normalizedText(entry.name) === normalizedText(effect.localization?.fr?.name))).map((effect) => effect.id).sort(),
    inventory: Object.fromEntries(inventory.map((entry) => [entry.name, entry.pokemon])),
  };
  const contentHash = sha256(html);
  const signature = sha256(JSON.stringify(snapshot));
  return {
    ...source,
    status: "ok",
    provider: "Margxt",
    signature,
    version: signature.slice(0, 12),
    contentHash,
    semanticSnapshot: snapshot,
    checkedUrl: source.url,
    httpStatus: response.status,
    checkedAt,
    updatedAt: null,
    message: `${snapshot.effects.length} Effets d’aventure canoniques retrouvés dans l’inventaire Margxt.`,
    remoteUrl: response.url || source.url,
  };
}

async function githubStatus(source, checkedAt) {
  const repoRequest = await fetchJson(`https://api.github.com/repos/${source.owner}/${source.repo}`);
  const repo = repoRequest.data;
  const branch = repo.default_branch || "main";
  const commitUrl = `https://api.github.com/repos/${source.owner}/${source.repo}/commits?sha=${encodeURIComponent(branch)}&per_page=1`;
  const commitsRequest = await fetchJson(
    commitUrl,
  );
  const commits = commitsRequest.data;
  const commit = Array.isArray(commits) ? commits[0] : commits;
  if (!commit?.sha) throw new Error("Aucun commit GitHub trouvé.");

  return {
    ...source,
    status: "ok",
    branch,
    signature: commit.sha,
    version: shortSha(commit.sha),
    commit: commit.sha,
    provider: source.provider || "GitHub",
    checkedUrl: commitUrl,
    httpStatus: commitsRequest.response.status,
    checkedAt,
    updatedAt: commit.commit?.committer?.date || commit.commit?.author?.date || repo.updated_at || null,
    message: commit.commit?.message?.split("\n")[0] || "",
    remoteUrl: commit.html_url || source.url,
  };
}

async function websiteStatus(source, checkedAt) {
  const request = (method) => fetchResponse(source.url, {
    method,
    accept: "text/html,application/json;q=0.9,*/*;q=0.8",
  });
  let response;
  try {
    response = await request(source.method || "HEAD");
  } catch (error) {
    if (error.httpStatus === 405 && !source.method) response = await request("GET");
    else throw error;
  }
  const modified = response.headers.get("last-modified");
  const etag = response.headers.get("etag");
  return {
    ...source,
    status: "ok",
    signature: etag || modified || `${response.status}:${response.url}`,
    version: etag || modified || `HTTP ${response.status}`,
    provider: source.provider || new URL(source.url).hostname,
    checkedUrl: source.url,
    httpStatus: response.status,
    checkedAt,
    updatedAt: modified ? new Date(modified).toISOString() : null,
    message: modified ? `Dernière modification: ${modified}` : "Site accessible.",
    remoteUrl: response.url || source.url,
  };
}

function readPvpSnapshot(source) {
  try {
    const manifest = JSON.parse(fs.readFileSync(pvpManifestFile, "utf8"));
    const snapshot = manifest.source || {};
    const file = String(source.snapshotKey || "")
      .split(".")
      .filter(Boolean)
      .reduce((value, key) => value?.[key], snapshot.files);
    return {
      snapshotCommit: snapshot.commit || null,
      snapshotHash: file?.sha256 || snapshot.hash || null,
      snapshotSyncedAt: snapshot.syncedAt || manifest.generatedAt || null,
    };
  } catch {
    return { snapshotCommit: null, snapshotHash: null, snapshotSyncedAt: null };
  }
}

async function pvpokePipelineStatus(source, checkedAt) {
  const ref = source.ref || "master";
  const commitUrl = `https://api.github.com/repos/${source.owner}/${source.repo}/commits/${encodeURIComponent(ref)}`;
  const [contentResponse, commitRequest, metadataRequest] = await Promise.all([
    fetchResponse(source.url, { accept: "application/json" }),
    fetchJson(commitUrl),
    source.metadataUrl ? fetchJson(source.metadataUrl) : Promise.resolve(null),
  ]);
  const content = await contentResponse.text();
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("La source canonique du pipeline ne contient pas un JSON valide.");
  }
  if (source.expect === "array" && !Array.isArray(parsed)) {
    throw new Error("La source canonique du classement ne contient pas une liste JSON.");
  }
  if (metadataRequest && !Array.isArray(metadataRequest.data?.tree)) {
    throw new Error("L’arbre GitHub canonique du pipeline PvPoke est invalide.");
  }

  const commit = commitRequest.data;
  if (!commit?.sha) throw new Error("Aucun commit PvPoke trouvé.");
  const contentHash = createHash("sha256").update(content).digest("hex");
  const snapshot = readPvpSnapshot(source);
  const metadataHttp = metadataRequest?.response?.status;

  return {
    ...source,
    ...snapshot,
    status: "ok",
    provider: source.provider || "PvPoke",
    branch: ref,
    signature: `${commit.sha}:${contentHash}`,
    version: shortSha(commit.sha),
    commit: commit.sha,
    contentHash,
    checkedUrl: source.url,
    httpStatus: contentResponse.status,
    metadataHttpStatus: metadataHttp || null,
    checkedAt,
    updatedAt: commit.commit?.committer?.date || commit.commit?.author?.date || null,
    message: metadataHttp
      ? `Source canonique du pipeline accessible (HTTP ${contentResponse.status}) · métadonnées GitHub HTTP ${metadataHttp}.`
      : `Source canonique du pipeline accessible (HTTP ${contentResponse.status}).`,
    remoteUrl: commit.html_url || source.repositoryUrl || source.url,
  };
}

function transientSourceError(error) {
  const message = error instanceof Error ? error.message : String(error || "");
  return /HTTP (403|429|5\d\d)|timeout|aborted|fetch failed/i.test(message);
}

async function inspectSource(source, checkedAt = new Date().toISOString()) {
  try {
    if (source.id === "pokemon-go-hub-adventure-effects") return await adventureEffectsStatus(source, checkedAt);
    if (source.id === "margxt-adventure-effects") return await adventureInventoryStatus(source, checkedAt);
    if (source.type === "github") return await githubStatus(source, checkedAt);
    if (source.type === "website") return await websiteStatus(source, checkedAt);
    if (source.type === "pvpoke-pipeline") return await pvpokePipelineStatus(source, checkedAt);
    return { ...source, status: "unsupported", signature: null, checkedAt, message: "Type de source non supporté." };
  } catch (error) {
    const warning = transientSourceError(error);
    return {
      ...source,
      status: warning ? "warning" : "error",
      signature: null,
      version: warning ? "à surveiller" : null,
      updatedAt: null,
      provider: source.provider || null,
      checkedUrl: error.checkedUrl || source.url,
      httpStatus: error.httpStatus || null,
      checkedAt,
      message: warning
        ? `Source distante temporairement indisponible (${error.message}).`
        : error.message,
      remoteUrl: source.repositoryUrl || source.url,
    };
  }
}

async function sourceWatch() {
  const sources = readSources();
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(sources.map((source) => inspectSource(source, checkedAt)));
  return { checkedAt, sources: results };
}

module.exports = {
  adventureEffectsStatus,
  adventureInventoryStatus,
  githubStatus,
  inspectSource,
  pvpokePipelineStatus,
  readPvpSnapshot,
  readSources,
  sourceWatch,
  websiteStatus,
};
