const fs = require("fs");
const { dataPath } = require("../../../src/lib/data-repository");

const sourcesFile = dataPath("source-watch", "sources.json");
const userAgent = "PokemonGo-API-checklist-source-watch";
const timeoutMs = 12000;

function readSources() {
  return JSON.parse(fs.readFileSync(sourcesFile, "utf8"));
}

function shortSha(value) {
  return String(value || "").slice(0, 12);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      accept: "application/vnd.github+json, application/json",
      "user-agent": userAgent,
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function githubStatus(source) {
  const repo = await fetchJson(`https://api.github.com/repos/${source.owner}/${source.repo}`);
  const branch = repo.default_branch || "main";
  const commits = await fetchJson(
    `https://api.github.com/repos/${source.owner}/${source.repo}/commits?sha=${encodeURIComponent(branch)}&per_page=1`,
  );
  const commit = Array.isArray(commits) ? commits[0] : commits;
  if (!commit?.sha) throw new Error("Aucun commit GitHub trouvé.");

  return {
    ...source,
    status: "ok",
    branch,
    signature: commit.sha,
    version: shortSha(commit.sha),
    updatedAt: commit.commit?.committer?.date || commit.commit?.author?.date || repo.updated_at || null,
    message: commit.commit?.message?.split("\n")[0] || "",
    remoteUrl: commit.html_url || source.url,
  };
}

async function websiteStatus(source) {
  const response = await fetch(source.url, {
    method: "GET",
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
    headers: { "user-agent": userAgent },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const modified = response.headers.get("last-modified");
  const etag = response.headers.get("etag");
  return {
    ...source,
    status: "ok",
    signature: etag || modified || `${response.status}:${response.url}`,
    version: etag || modified || `HTTP ${response.status}`,
    updatedAt: modified ? new Date(modified).toISOString() : null,
    message: modified ? `Dernière modification: ${modified}` : "Site accessible.",
    remoteUrl: response.url || source.url,
  };
}

function transientSourceError(error) {
  const message = error instanceof Error ? error.message : String(error || "");
  return /HTTP 5\d\d|timeout|aborted|fetch failed/i.test(message);
}

async function inspectSource(source) {
  try {
    if (source.type === "github") return await githubStatus(source);
    if (source.type === "website") return await websiteStatus(source);
    return { ...source, status: "unsupported", signature: null, message: "Type de source non supporté." };
  } catch (error) {
    const warning = transientSourceError(error);
    return {
      ...source,
      status: warning ? "warning" : "error",
      signature: null,
      version: warning ? "à surveiller" : null,
      updatedAt: null,
      message: warning
        ? `Source distante temporairement indisponible (${error.message}).`
        : error.message,
      remoteUrl: source.url,
    };
  }
}

async function sourceWatch() {
  const sources = readSources();
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(sources.map(inspectSource));
  return { checkedAt, sources: results };
}

module.exports = { readSources, sourceWatch };
