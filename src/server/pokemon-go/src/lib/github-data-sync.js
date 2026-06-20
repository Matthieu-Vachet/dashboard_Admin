const fs = require("fs");
const os = require("os");
const path = require("path");

const defaultRepo = "https://github.com/Matthieu-Vachet/PokemonGo-Data.git";
const snapshotRoot = path.join(os.tmpdir(), "matweb-dashboard-admin");
const snapshotDir = path.join(snapshotRoot, "PokemonGo-Data-live");
const metaFile = path.join(snapshotDir, ".sync-meta.json");
const requiredFolders = [
  "pokemon",
  "pokemon-forms",
  "moves",
  "generations",
  "types",
  "weather",
  "stickers",
];
const jsonFolderPattern = /^(pokemon|pokemon-forms|moves|generations|types|weather|stickers)\//;

function parseRepo(value) {
  const repo = String(value || defaultRepo)
    .trim()
    .replace(/\.git$/, "");
  const match = repo.match(/github\.com[:/]([^/]+)\/([^/]+)$/);
  if (!match) throw new Error(`Depot GitHub PokemonGo-Data invalide: ${repo}`);
  return { owner: match[1], name: match[2] };
}

function authHeaders() {
  const token =
    process.env.POKEMON_GO_DATA_TOKEN ||
    process.env.GH_TOKEN ||
    process.env.GITHUB_TOKEN;
  return {
    "user-agent": "matweb-dashboard-admin",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

function hasDataShape(directory) {
  return requiredFolders.every((folder) => fs.existsSync(path.join(directory, folder)));
}

function readMeta() {
  try {
    return JSON.parse(fs.readFileSync(metaFile, "utf8"));
  } catch {
    return null;
  }
}

function cleanDirectory(directory) {
  if (fs.existsSync(directory)) fs.rmSync(directory, { recursive: true, force: true });
  fs.mkdirSync(directory, { recursive: true });
}

function rawUrl(owner, repo, ref, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${encodeURIComponent(ref)}/${filePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: authHeaders() });
  if (!response.ok) throw new Error(`GitHub data: HTTP ${response.status} sur ${url}`);
  return response.json();
}

async function downloadFile(owner, repo, ref, item) {
  const response = await fetch(rawUrl(owner, repo, ref, item.path), {
    headers: authHeaders(),
  });
  if (!response.ok)
    throw new Error(`GitHub data: HTTP ${response.status} sur ${item.path}`);
  const target = path.join(snapshotDir, item.path);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, await response.text());
}

async function mapWithLimit(items, limit, worker) {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      if (item) await worker(item);
    }
  });
  await Promise.all(workers);
}

async function syncGithubDataSnapshot({ force = false } = {}) {
  const { owner, name } = parseRepo(process.env.POKEMON_GO_DATA_REPO || defaultRepo);
  const ref = process.env.POKEMON_GO_DATA_REF || "main";
  const treeUrl = `https://api.github.com/repos/${owner}/${name}/git/trees/${encodeURIComponent(
    ref,
  )}?recursive=1`;
  const tree = await fetchJson(treeUrl);
  const files = (tree.tree || []).filter(
    (item) =>
      item.type === "blob" &&
      item.path.endsWith(".json") &&
      jsonFolderPattern.test(item.path) &&
      !/(^|\/)index\.json$/.test(item.path),
  );

  if (!files.length) throw new Error("GitHub data: aucun JSON PokemonGo-Data trouvé.");

  const meta = readMeta();
  if (!force && meta?.treeSha === tree.sha && hasDataShape(snapshotDir)) return snapshotDir;

  cleanDirectory(snapshotDir);
  await mapWithLimit(files, 18, (item) => downloadFile(owner, name, ref, item));
  fs.writeFileSync(
    metaFile,
    `${JSON.stringify(
      {
        repo: `${owner}/${name}`,
        ref,
        treeSha: tree.sha,
        fileCount: files.length,
        fetchedAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );

  if (!hasDataShape(snapshotDir))
    throw new Error("GitHub data: snapshot incomplet après synchronisation.");

  return snapshotDir;
}

module.exports = { syncGithubDataSnapshot };
