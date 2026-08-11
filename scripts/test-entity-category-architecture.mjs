import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const projectRoot = process.cwd();
const dataRoot = path.resolve(projectRoot, "../PokemonGo-Data");
process.env.POKEMON_GO_DATA_DIR = dataRoot;
const require = createRequire(import.meta.url);
const engine = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const {
  CATEGORY_DIAGNOSTICS,
  categoryFromReference,
  classifyEntity,
  resolveCanonicalReference,
} = require("../src/server/pokemon-go/apps/checklist/server/entity-category.js");

const cases = [
  ["data/pokemon/normal/0001-bulbasaur.json", "NORMAL", "normal"],
  ["data/pokemon/alola/0019-rattata-alola.json", "ALOLA", "alola"],
  ["data/pokemon/galar/0110-weezing-galarian.json", "GALAR", "galar"],
  ["data/pokemon/hisui/0215-sneasel-hisuian.json", "HISUI", "hisui"],
  ["data/pokemon/paldea/0128-tauros-paldea-combat.json", "PALDEA", "paldea"],
  ["data/pokemon/forms/0876-indeedee-female.json", "FORM", "forms"],
  ["data/pokemon/mega/0003-venusaur-mega.json", "MEGA", "mega"],
  ["data/pokemon/primal/0382-kyogre-primal.json", "PRIMAL", "primal"],
  ["data/pokemon/dynamax/0001-bulbasaur-dynamax.json", "DYNAMAX", "dynamax"],
  ["data/pokemon/gigantamax/0003-venusaur-gigantamax.json", "GIGANTAMAX", "gigantamax"],
];

function readJson(reference) {
  return JSON.parse(fs.readFileSync(path.join(dataRoot, reference), "utf8"));
}

test("le Dashboard résout et charge les dix catégories avec le même résolveur", () => {
  for (const [sourceFile, category, directory] of cases) {
    const source = readJson(sourceFile);
    const classification = classifyEntity(source, { sourceFile });
    assert.equal(classification.category, category, sourceFile);
    assert.equal(source.assets, undefined, sourceFile);
    assert.equal(source.assetsRef, resolveCanonicalReference(source, { family: "core", sourceFile }));
    assert.equal(source.pvpRef, resolveCanonicalReference(source, { family: "pvp", sourceFile }));
    assert.equal(categoryFromReference(source.assetsRef), category);
    assert.equal(categoryFromReference(source.pvpRef), category);
    assert.match(source.assetsRef, new RegExp(`/core/${directory}/`));

    const detail = engine.detailForKey(`pokemon:${sourceFile}`);
    assert.ok(detail, sourceFile);
    assert.equal(detail.sourceData.formId, source.formId);
    assert.equal(detail.assetSourceFile, source.assetsRef);
    assert.equal(detail.pvpSourceFile, source.pvpRef);
    assert.equal(detail.assetSourceData.formId, source.formId);
    assert.equal(detail.pvpSourceData.identity.formId, source.formId);
  }
});

test("le Dashboard expose les diagnostics architecturaux obligatoires", () => {
  assert.deepEqual(CATEGORY_DIAGNOSTICS, [
    "ENTITY_CATEGORY_MISMATCH",
    "PVP_WRONG_CATEGORY_DIRECTORY",
    "ASSET_WRONG_CATEGORY_DIRECTORY",
    "REFERENCE_CATEGORY_MISMATCH",
    "ENTITY_CLASSIFICATION_AMBIGUOUS",
  ]);
});
