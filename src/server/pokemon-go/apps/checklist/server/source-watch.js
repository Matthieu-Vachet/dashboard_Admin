const fs = require("fs");
const { createHash } = require("crypto");
const { dataPath } = require("../../../src/lib/data-repository");

const sourcesFile = dataPath("operations", "audits", "sources", "current.json");
const pvpManifestFile = dataPath("data", "pvp", "manifests", "current.json");
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
  githubStatus,
  inspectSource,
  pvpokePipelineStatus,
  readPvpSnapshot,
  readSources,
  sourceWatch,
  websiteStatus,
};
