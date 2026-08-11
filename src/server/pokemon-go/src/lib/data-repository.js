const fs = require("fs");
const path = require("path");

function repositoryError(message, code, details = null) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

function hasDataShape(directory) {
  let packageName = null;
  try {
    packageName = JSON.parse(
      fs.readFileSync(
        path.join(/*turbopackIgnore: true*/ directory, "package.json"),
        "utf8",
      ),
    ).name;
  } catch {
    return false;
  }
  return (
    directory &&
    packageName === "pokemon-go-data" &&
    fs.existsSync(path.join(directory, "data", "pokemon")) &&
    fs.existsSync(path.join(directory, "data", "assets")) &&
    fs.existsSync(path.join(directory, "data", "pvp"))
  );
}

function resolveCandidate(appDirectory, candidate) {
  return path.isAbsolute(candidate)
    ? path.resolve(candidate)
    : path.resolve(/*turbopackIgnore: true*/ appDirectory, candidate);
}

function resolveDataRoot(options = {}) {
  const environment = options.env || process.env;
  const applicationRoot = path.resolve(
    options.appRoot
      || environment.POKEMON_GO_APP_ROOT
      || /*turbopackIgnore: true*/ process.cwd(),
  );
  const explicit = String(
    environment.POKEMON_GO_DATA_DIR || environment.DATA_REPOSITORY_DIR || "",
  ).trim();

  if (explicit) {
    const root = resolveCandidate(applicationRoot, explicit);
    if (hasDataShape(root)) return root;
    throw repositoryError(
      `POKEMON_GO_DATA_DIR invalide : ${explicit}. Le chemin résolu ne contient pas un dépôt PokemonGo-Data complet.`,
      "POKEMON_DATA_ROOT_INVALID",
      { configured: explicit, resolved: root },
    );
  }

  // Le clone de build est l'emplacement officiel en environnement déployé.
  // Le dépôt voisin est la convention workspace démontrée pour le développement local.
  const candidates = [
    path.join(/*turbopackIgnore: true*/ applicationRoot, "runtime-data", "PokemonGo-Data"),
    path.join(/*turbopackIgnore: true*/ applicationRoot, ".data", "PokemonGo-Data"),
    path.resolve(/*turbopackIgnore: true*/ applicationRoot, "..", "PokemonGo-Data"),
  ];
  for (const root of candidates) {
    if (hasDataShape(root)) return root;
  }

  throw repositoryError(
    "Dépôt PokemonGo-Data introuvable. Configurez POKEMON_GO_DATA_DIR en local ou vérifiez que le prebuild a créé runtime-data/PokemonGo-Data.",
    "POKEMON_DATA_ROOT_NOT_FOUND",
    { candidates },
  );
}

const appRoot = path.resolve(
  process.env.POKEMON_GO_APP_ROOT || /*turbopackIgnore: true*/ process.cwd(),
);
const dataRoot = resolveDataRoot();

function isPathInside(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function nearestExistingPath(target) {
  let candidate = target;
  while (!fs.existsSync(candidate)) {
    const parent = path.dirname(candidate);
    if (parent === candidate) return null;
    candidate = parent;
  }
  return candidate;
}

function resolvePathInsideDataRoot(root, ...segments) {
  const absoluteRoot = path.resolve(root);
  const target = path.resolve(/*turbopackIgnore: true*/ absoluteRoot, ...segments);
  if (!isPathInside(absoluteRoot, target)) {
    throw repositoryError(
      "Lecture refusée en dehors du dépôt PokemonGo-Data.",
      "POKEMON_DATA_PATH_OUTSIDE_ROOT",
      { root: absoluteRoot, target },
    );
  }

  const existingTarget = nearestExistingPath(target);
  const realRoot = fs.realpathSync(/*turbopackIgnore: true*/ absoluteRoot);
  const realTarget = existingTarget ? fs.realpathSync(/*turbopackIgnore: true*/ existingTarget) : null;
  if (realTarget && !isPathInside(realRoot, realTarget)) {
    throw repositoryError(
      "Lecture refusée via un lien symbolique hors du dépôt PokemonGo-Data.",
      "POKEMON_DATA_PATH_OUTSIDE_ROOT",
      { root: realRoot, target: realTarget },
    );
  }
  return target;
}

function dataPath(...segments) {
  return resolvePathInsideDataRoot(dataRoot, ...segments);
}

function appPath(...segments) {
  return path.join(/*turbopackIgnore: true*/ appRoot, ...segments);
}

function stripDataPrefix(relativePath) {
  return String(relativePath || "")
    .replace(/\\/g, "/")
    .replace(/^\.?\/*data\/data\//, "data/")
    .replace(/^\.?\/*repository\//, "")
    .replace(/^\.?\/*/, "");
}

function dataPathFromRelative(relativePath) {
  return dataPath(...stripDataPrefix(relativePath).split("/").filter(Boolean));
}

function relativeToData(file) {
  return path.relative(dataRoot, file).replace(/\\/g, "/");
}

function relativeToApp(file) {
  const absolute = path.resolve(file);
  const dataRelative = relativeToData(absolute);
  if (dataRelative && !dataRelative.startsWith("..") && !path.isAbsolute(dataRelative))
    return dataRelative.startsWith("data/") ? dataRelative : `repository/${dataRelative}`;
  return path.relative(appRoot, absolute).replace(/\\/g, "/");
}

function isInsideData(file) {
  const absolute = path.resolve(file);
  try {
    resolvePathInsideDataRoot(dataRoot, path.relative(dataRoot, absolute));
    return true;
  } catch {
    return false;
  }
}

function resolveDataFile(relativeFile) {
  return dataPathFromRelative(relativeFile);
}

function getPokemonGoDataRuntimeRoot() {
  return dataRoot;
}

function resolvePokemonGoDataFile(relativeFile) {
  return dataPathFromRelative(relativeFile);
}

function resolvePokemonGoDataModule(relativeFile) {
  const modulePath = dataPathFromRelative(relativeFile);
  if (!fs.existsSync(modulePath) || !/\.(?:c?js|mjs)$/.test(modulePath)) {
    throw repositoryError(
      `Module PokemonGo-Data introuvable ou invalide : ${relativeFile}.`,
      "POKEMON_DATA_MODULE_INVALID",
      { relativeFile, modulePath },
    );
  }
  return modulePath;
}

module.exports = {
  appPath,
  appRoot,
  dataPath,
  dataPathFromRelative,
  dataRoot,
  getPokemonGoDataRuntimeRoot,
  hasDataShape,
  isInsideData,
  resolveDataRoot,
  relativeToApp,
  relativeToData,
  resolveDataFile,
  resolvePokemonGoDataFile,
  resolvePokemonGoDataModule,
  resolvePathInsideDataRoot,
  stripDataPrefix,
};
