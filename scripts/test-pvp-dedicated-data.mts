import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const root = path.resolve(process.cwd(), "..", "PokemonGo-Data");
process.env.POKEMON_GO_DATA_DIR = root;

const require = createRequire(import.meta.url);
const engine = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const serverData = await import("../src/lib/pokemon-go-pvp-engine/server-data");

test("le détail Dashboard hydrate pvpRef depuis la fiche dédiée", () => {
  const source = JSON.parse(fs.readFileSync(path.join(root, "data/pokemon/normal/0001-bulbasaur.json"), "utf8"));
  const hydrated = engine.hydrateSourceData(source);
  assert.equal(hydrated.pvpRecord.pvpId, "BULBASAUR");
  assert.equal(hydrated.pvpRecord.source.commit, "f754cd6fc819ad065f1f00df1036ade36c57c022");
  assert.equal(hydrated.pvp.greatLeague.status, "RANKED");
  assert.equal(hydrated.pvp.greatLeague.rank, 1040);
  assert.equal(hydrated.pvp.greatLeague.score, 56.9);
  assert.equal(hydrated.pvp.greatLeague.bestMovesets.fast, "VINE_WHIP_FAST");
  assert.equal(hydrated.pvp.ultraLeague.status, "NOT_RANKED");
  assert.equal(hydrated.pvp.ultraLeague.rank, null);
  assert.equal(hydrated.pvp.greatLeague.source.syncedAt, "2026-08-15T00:08:44.720Z");
});

test("le moteur de combat préfère les recommandations de la fiche PvP dédiée", async () => {
  const catalog = await serverData.readPvpCatalog();
  const bulbasaur = catalog.pokemon.find((entry) => entry.formId === "BULBASAUR");
  const record = JSON.parse(fs.readFileSync(path.join(root, bulbasaur.pvpRef), "utf8"));
  const primary = record.leagues.great.variants.find((variant) => variant.variant === "normal");
  assert.equal(bulbasaur.recommended.great.fast, primary.bestMoveset.fast.moveId);
  assert.deepEqual(bulbasaur.recommended.great.charged, primary.bestMoveset.charged.map((move) => move.moveId).filter(Boolean));
  assert.equal(catalog.versions.pvpCommit, record.source.commit);
});

test("le resolver serveur inclut explicitement le répertoire runtime-data de production", () => {
  const source = fs.readFileSync(path.join(process.cwd(), "src/lib/pokemon-go-pvp-engine/server-data.ts"), "utf8");
  assert.match(source, /path\.join\(process\.cwd\(\), "runtime-data", "PokemonGo-Data"\)/);
});
