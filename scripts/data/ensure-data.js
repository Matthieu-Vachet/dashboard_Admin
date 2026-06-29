const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const appRoot = path.resolve(__dirname, "../..");
const defaultRepo = "https://github.com/Matthieu-Vachet/PokemonGo-Data.git";
const targetDir = path.join(appRoot, ".data", "PokemonGo-Data");
const snapshotFilename = ".dashboard-data-snapshot.json";

function hasDataShape(directory) {
  return (
    directory &&
    fs.existsSync(path.join(directory, "pokemon")) &&
    fs.existsSync(path.join(directory, "pokemon-forms")) &&
    fs.existsSync(path.join(directory, "pokemon-assets")) &&
    fs.existsSync(path.join(directory, "moves")) &&
    fs.existsSync(path.join(directory, "raids", "currentRaids.json"))
  );
}

function explicitCandidates() {
  return [
    process.env.POKEMON_GO_DATA_DIR,
    process.env.DATA_REPOSITORY_DIR,
  ].filter(Boolean);
}

function fallbackCandidates() {
  return [path.resolve(appRoot, "..", "PokemonGo-Data"), path.join(appRoot, "data")];
}

function authenticatedRepoUrl(repo, token) {
  if (!token || !repo.startsWith("https://github.com/")) return repo;
  return repo.replace("https://github.com/", `https://x-access-token:${token}@github.com/`);
}

function git(args, options = {}) {
  return childProcess.execFileSync("git", args, {
    cwd: options.cwd,
    stdio: options.stdio || "pipe",
    encoding: "utf8",
  });
}

function isGitRepository(directory) {
  return fs.existsSync(path.join(directory, ".git"));
}

function cloneFresh(cloneUrl, ref) {
  if (fs.existsSync(targetDir)) fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  git(["clone", "--depth", "1", "--branch", ref, cloneUrl, targetDir], {
    stdio: "inherit",
  });
}

function resetTargetClone(cloneUrl, ref) {
  if (!fs.existsSync(targetDir) || !isGitRepository(targetDir)) {
    cloneFresh(cloneUrl, ref);
    return;
  }

  git(["remote", "set-url", "origin", cloneUrl], { cwd: targetDir });
  git(["fetch", "--depth", "1", "origin", ref], { cwd: targetDir, stdio: "inherit" });
  git(["reset", "--hard", `origin/${ref}`], { cwd: targetDir, stdio: "inherit" });
  git(["clean", "-fd"], { cwd: targetDir, stdio: "inherit" });
}

function syncTargetClone() {
  const repo = process.env.POKEMON_GO_DATA_REPO || defaultRepo;
  const ref = process.env.POKEMON_GO_DATA_REF || "main";
  const token = process.env.POKEMON_GO_DATA_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  const cloneUrl = authenticatedRepoUrl(repo, token);

  try {
    resetTargetClone(cloneUrl, ref);
  } catch (error) {
    throw new Error(
      "Impossible de synchroniser PokemonGo-Data. Configure POKEMON_GO_DATA_DIR en local ou POKEMON_GO_DATA_TOKEN sur Vercel/GitHub Actions.",
    );
  }

  if (!hasDataShape(targetDir))
    throw new Error(`PokemonGo-Data synchronise mais structure invalide: ${targetDir}`);

  writeSnapshot({ repo, ref, source: "remote" });
  console.log(`[data] dataset synchronise: ${targetDir}`);
}

function writeSnapshot({ repo = defaultRepo, ref = "main", source = "local" } = {}) {
  if (!hasDataShape(targetDir) && source === "remote") return;

  try {
    const directory = source === "remote" ? targetDir : path.resolve(repo);
    const commit = git(["rev-parse", "HEAD"], { cwd: directory }).trim();
    const branch = git(["rev-parse", "--abbrev-ref", "HEAD"], { cwd: directory }).trim();
    const snapshot = {
      repo: source === "remote" ? repo : directory,
      ref,
      branch,
      commit,
      source,
      syncedAt: new Date().toISOString(),
    };
    fs.writeFileSync(path.join(targetDir, snapshotFilename), `${JSON.stringify(snapshot, null, 2)}\n`);
  } catch (error) {
    console.warn(`[data] snapshot commit indisponible: ${error.message}`);
  }
}

function ensureData() {
  for (const candidate of explicitCandidates()) {
    const resolved = path.resolve(candidate);
    if (hasDataShape(resolved)) {
      console.log(`[data] dataset explicite: ${resolved}`);
      if (resolved === targetDir) writeSnapshot({ repo: resolved, ref: "local", source: "local" });
      return;
    }
  }

  try {
    syncTargetClone();
    return;
  } catch (error) {
    for (const candidate of fallbackCandidates()) {
      const resolved = path.resolve(candidate);
      if (hasDataShape(resolved)) {
        console.warn(`[data] sync distante impossible, dataset local utilise: ${resolved}`);
        return;
      }
    }
    throw error;
  }
}

ensureData();
