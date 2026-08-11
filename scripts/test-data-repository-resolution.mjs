import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  resolveDataRoot,
  resolvePathInsideDataRoot,
} = require("../src/server/pokemon-go/src/lib/data-repository.js");

function temporaryWorkspace(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dashboard-data-root-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

function createDataRepository(root) {
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, "package.json"), `${JSON.stringify({ name: "pokemon-go-data" })}\n`);
  for (const directory of ["data/pokemon", "data/assets", "data/pvp"]) {
    fs.mkdirSync(path.join(root, directory), { recursive: true });
  }
  return root;
}

test("POKEMON_GO_DATA_DIR explicite est prioritaire et relatif à la racine applicative", (t) => {
  const workspace = temporaryWorkspace(t);
  const appRoot = path.join(workspace, "Dashboard Admin");
  const explicit = createDataRepository(path.join(appRoot, "fixtures", "PokemonGo-Data"));
  createDataRepository(path.join(appRoot, ".data", "PokemonGo-Data"));
  assert.equal(resolveDataRoot({ appRoot, env: { POKEMON_GO_DATA_DIR: "fixtures/PokemonGo-Data" } }), explicit);
});

test("un chemin explicite invalide échoue sans fallback silencieux", (t) => {
  const workspace = temporaryWorkspace(t);
  const appRoot = path.join(workspace, "Dashboard Admin");
  createDataRepository(path.join(appRoot, ".data", "PokemonGo-Data"));
  assert.throws(
    () => resolveDataRoot({ appRoot, env: { POKEMON_GO_DATA_DIR: "missing-data" } }),
    (error) => error.code === "POKEMON_DATA_ROOT_INVALID" && error.details.resolved === path.join(appRoot, "missing-data"),
  );
});

test("le snapshot runtime-data est l’emplacement production-like officiel", (t) => {
  const workspace = temporaryWorkspace(t);
  const appRoot = path.join(workspace, "Dashboard Admin");
  const snapshot = createDataRepository(path.join(appRoot, "runtime-data", "PokemonGo-Data"));
  assert.equal(resolveDataRoot({ appRoot, env: {} }), snapshot);
});

test("le snapshot .data historique reste un fallback de migration", (t) => {
  const workspace = temporaryWorkspace(t);
  const appRoot = path.join(workspace, "Dashboard Admin");
  const legacy = createDataRepository(path.join(appRoot, ".data", "PokemonGo-Data"));
  assert.equal(resolveDataRoot({ appRoot, env: {} }), legacy);
});

test("le dépôt voisin reste la convention workspace locale démontrée", (t) => {
  const workspace = temporaryWorkspace(t);
  const appRoot = path.join(workspace, "Dashboard Admin");
  const sibling = createDataRepository(path.join(workspace, "PokemonGo-Data"));
  assert.equal(resolveDataRoot({ appRoot, env: {} }), sibling);
});

test("l’absence de dépôt produit une erreur claire et stable", (t) => {
  const workspace = temporaryWorkspace(t);
  const appRoot = path.join(workspace, "Dashboard Admin");
  assert.throws(
    () => resolveDataRoot({ appRoot, env: {} }),
    (error) => error.code === "POKEMON_DATA_ROOT_NOT_FOUND" && /prebuild/.test(error.message),
  );
});

test("aucun chemin relatif ou lien symbolique ne peut sortir du data root", (t) => {
  const workspace = temporaryWorkspace(t);
  const dataRoot = createDataRepository(path.join(workspace, "PokemonGo-Data"));
  const outside = path.join(workspace, "outside");
  fs.mkdirSync(outside);
  fs.symlinkSync(outside, path.join(dataRoot, "data", "pokemon", "escape"), "dir");

  assert.throws(
    () => resolvePathInsideDataRoot(dataRoot, "..", "outside"),
    (error) => error.code === "POKEMON_DATA_PATH_OUTSIDE_ROOT",
  );
  assert.throws(
    () => resolvePathInsideDataRoot(dataRoot, "data", "pokemon", "escape"),
    (error) => error.code === "POKEMON_DATA_PATH_OUTSIDE_ROOT",
  );
  assert.throws(
    () => resolvePathInsideDataRoot(dataRoot, "data", "pokemon", "escape", "future.json"),
    (error) => error.code === "POKEMON_DATA_PATH_OUTSIDE_ROOT",
  );
});

test("les Functions qui lisent PokemonGo-Data embarquent la racine runtime et des globs récursifs", () => {
  const config = fs.readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  for (const route of ["/api/pokemon-admin", "/api/admin/community-days/**/*", "/api/admin/events/scrape"]) {
    assert.ok(config.includes(`"${route}"`), `${route} doit être tracée`);
  }
  assert.match(config, /runtime-data\/PokemonGo-Data/);
  assert.match(config, /data\/pokemon\/\*\*\/\*/);
  assert.match(config, /archives\/\*\*\/\*/);
  assert.match(config, /data\/pvp\/rankings\/\*\*\/\*/);
  assert.doesNotMatch(config, /\.data\/PokemonGo-Data/);
});
