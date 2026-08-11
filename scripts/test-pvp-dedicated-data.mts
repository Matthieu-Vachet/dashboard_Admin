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
  assert.equal(hydrated.pvpRecord.source.commit, "ea8f7691cdee95cb33a485b8e89ff39819d41ba4");
  assert.equal(hydrated.pvp.greatLeague.status, "RANKED");
  assert.equal(hydrated.pvp.greatLeague.bestMovesets.fast, "VINE_WHIP_FAST");
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
