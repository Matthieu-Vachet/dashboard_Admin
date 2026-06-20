const fs = require("fs");
const path = require("path");

const appRoot = path.resolve(
  process.env.POKEMON_GO_APP_ROOT || /*turbopackIgnore: true*/ process.cwd(),
);

function hasDataShape(directory) {
  return (
    directory &&
    fs.existsSync(path.join(directory, "pokemon")) &&
    fs.existsSync(path.join(directory, "pokemon-forms")) &&
    fs.existsSync(path.join(directory, "moves"))
  );
}

function candidateRoots() {
  return [
    process.env.POKEMON_GO_DATA_DIR,
    process.env.DATA_REPOSITORY_DIR,
    path.join(/*turbopackIgnore: true*/ appRoot, ".data", "PokemonGo-Data"),
    path.resolve(/*turbopackIgnore: true*/ appRoot, "..", "PokemonGo-Data"),
    path.join(/*turbopackIgnore: true*/ appRoot, "data"),
  ].filter(Boolean);
}

function resolveDataRoot() {
  const explicit = process.env.POKEMON_GO_DATA_DIR || process.env.DATA_REPOSITORY_DIR;
  for (const candidate of candidateRoots()) {
    const root = path.resolve(/*turbopackIgnore: true*/ candidate);
    if (hasDataShape(root)) return root;
  }

  const expected = explicit || "../PokemonGo-Data";
  throw new Error(
    `Depot Pokemon GO data introuvable. Configure POKEMON_GO_DATA_DIR. Attendu: ${expected}`,
  );
}

const dataRoot = resolveDataRoot();

function dataPath(...segments) {
  return path.join(dataRoot, ...segments);
}

function appPath(...segments) {
  return path.join(appRoot, ...segments);
}

function stripDataPrefix(relativePath) {
  return String(relativePath || "")
    .replace(/\\/g, "/")
    .replace(/^\.?\/*data\//, "")
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
    return `data/${dataRelative}`;
  return path.relative(appRoot, absolute).replace(/\\/g, "/");
}

function isInsideData(file) {
  const relative = path.relative(dataRoot, path.resolve(file));
  return Boolean(relative) && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function resolveDataFile(relativeFile) {
  return dataPathFromRelative(relativeFile);
}

module.exports = {
  appPath,
  appRoot,
  dataPath,
  dataPathFromRelative,
  dataRoot,
  isInsideData,
  relativeToApp,
  relativeToData,
  resolveDataFile,
  stripDataPrefix,
};
