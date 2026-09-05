const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const {
  ASSET_TEMPLATES,
  ENTITY_TYPES,
  PVP_TEMPLATE,
  SCHEMA_PATHS,
  builderError,
  loadCanonicalContract,
} = require("./canonical-contract");

const CONTRACT_REF = "develop";

function contractPaths() {
  return [...new Set([
    ...Object.values(ENTITY_TYPES).map((config) => config.template),
    ...Object.values(ASSET_TEMPLATES),
    PVP_TEMPLATE,
    ...Object.values(SCHEMA_PATHS),
  ])].sort();
}

function hasCanonicalContract(root) {
  try {
    loadCanonicalContract(root);
    return true;
  } catch {
    return false;
  }
}

function repositoryRef(root) {
  try {
    const snapshot = JSON.parse(fs.readFileSync(path.join(root, ".dashboard-data-snapshot.json"), "utf8"));
    if (snapshot.ref) return String(snapshot.ref);
  } catch {
    // Un checkout local n’a pas nécessairement de snapshot Dashboard.
  }
  const result = spawnSync("git", ["-C", root, "branch", "--show-current"], { encoding: "utf8" });
  return result.status === 0 ? String(result.stdout || "").trim() : null;
}

function githubCoordinates() {
  const repository = String(process.env.POKEMON_GO_DATA_REPO || "https://github.com/Matthieu-Vachet/PokemonGo-Data.git")
    .replace(/\.git$/, "");
  const match = repository.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/i);
  if (!match) throw builderError("POKEMON_GO_DATA_REPO ne désigne pas un dépôt GitHub HTTPS autorisé.", "JSON_BUILDER_CONTRACT_REPOSITORY_INVALID", 503);
  return { owner: match[1], repository: match[2] };
}

async function fetchCanonicalFile(relativePath) {
  const { owner, repository } = githubCoordinates();
  const target = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/${CONTRACT_REF}/${relativePath.split("/").map(encodeURIComponent).join("/")}`;
  const headers = { accept: "application/json" };
  const token = process.env.POKEMON_GO_DATA_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (token) headers.authorization = `Bearer ${token}`;
  const response = await fetch(target, { cache: "no-store", headers, signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw builderError(`Contrat canonique indisponible (${response.status}) : ${relativePath}.`, "JSON_BUILDER_CONTRACT_UNAVAILABLE", 503);
  const text = await response.text();
  JSON.parse(text);
  return text;
}

async function resolveContractRoot(dataRoot) {
  if (hasCanonicalContract(dataRoot)) {
    return { root: dataRoot, source: "data-root", ref: repositoryRef(dataRoot) || CONTRACT_REF };
  }
  const localCandidates = [
    process.env.POKEMON_GO_DATA_WRITE_DIR,
    process.env.POKEMON_GO_DATA_DIR,
    path.resolve(process.cwd(), "..", "PokemonGo-Data"),
  ].filter(Boolean);
  for (const candidate of localCandidates) {
    const root = path.resolve(candidate);
    if (root !== path.resolve(dataRoot) && hasCanonicalContract(root) && repositoryRef(root) === CONTRACT_REF) {
      return { root, source: "local-develop", ref: CONTRACT_REF };
    }
  }
  const cacheRoot = path.join(os.tmpdir(), "pokemon-go-json-builder-contract-develop");
  if (hasCanonicalContract(cacheRoot)) return { root: cacheRoot, source: "github-cache", ref: CONTRACT_REF };
  const temporary = `${cacheRoot}.${process.pid}.${Date.now()}.tmp`;
  try {
    const entries = await Promise.all(contractPaths().map(async (relativePath) => [relativePath, await fetchCanonicalFile(relativePath)]));
    for (const [relativePath, text] of entries) {
      const target = path.join(temporary, relativePath);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, text, { encoding: "utf8", mode: 0o600 });
    }
    loadCanonicalContract(temporary);
    if (hasCanonicalContract(cacheRoot)) fs.rmSync(temporary, { recursive: true, force: true });
    else {
      fs.rmSync(cacheRoot, { recursive: true, force: true });
      fs.renameSync(temporary, cacheRoot);
    }
    return { root: cacheRoot, source: "github-develop", ref: CONTRACT_REF };
  } catch (error) {
    fs.rmSync(temporary, { recursive: true, force: true });
    throw error;
  }
}

module.exports = { CONTRACT_REF, contractPaths, hasCanonicalContract, resolveContractRoot };
