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
  ["pokemon/0001-bulbasaur.json", "NORMAL", "normal"],
  ["pokemon/0003-venusaur.json", "NORMAL", "normal"],
  ["pokemon-forms/alola/0019-rattata-alola.json", "FORM", "forms"],
  ["pokemon-forms/mega/0003-venusaur-mega.json", "MEGA", "mega"],
  ["pokemon-forms/mega-x/0006-charizard-mega-x.json", "MEGA", "mega"],
  ["pokemon-forms/mega-y/0006-charizard-mega-y.json", "MEGA", "mega"],
  ["pokemon-forms/dynamax/0001-bulbasaur-dynamax.json", "DYNAMAX", "dynamax"],
  ["pokemon-forms/gigantamax/0003-venusaur-gigantamax.json", "GIGANTAMAX", "gigantamax"],
];

function readJson(reference) {
  return JSON.parse(fs.readFileSync(path.join(dataRoot, reference), "utf8"));
}

test("le Dashboard résout et charge les cinq catégories avec le même résolveur", () => {
  for (const [sourceFile, category, directory] of cases) {
    const source = readJson(sourceFile);
    const classification = classifyEntity(source, { sourceFile });
    assert.equal(classification.category, category, sourceFile);
    assert.equal(source.assets.assetsRef, resolveCanonicalReference(source, { family: "core", sourceFile }));
    assert.equal(source.pvpRef, resolveCanonicalReference(source, { family: "pvp", sourceFile }));
    assert.equal(categoryFromReference(source.assets.assetsRef), category);
    assert.equal(categoryFromReference(source.pvpRef), category);
    assert.match(source.assets.assetsRef, new RegExp(`/core/${directory}/`));

    const detail = engine.detailForKey(`pokemon:data/${sourceFile}`);
    assert.ok(detail, sourceFile);
    assert.equal(detail.sourceData.formId, source.formId);
    assert.equal(detail.assetSourceFile, source.assets.assetsRef);
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
