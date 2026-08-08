import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const root = process.cwd();
const dataRoot = path.resolve(root, "../PokemonGo-Data");
process.env.POKEMON_GO_DATA_DIR = dataRoot;
const require = createRequire(import.meta.url);
const engine = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const bulbasaurSource = JSON.parse(fs.readFileSync(path.join(dataRoot, "pokemon/0001-bulbasaur.json"), "utf8"));
const bulbasaurCore = JSON.parse(fs.readFileSync(path.join(dataRoot, bulbasaurSource.assets.assetsRef), "utf8"));
const bulbasaurHome = JSON.parse(fs.readFileSync(path.join(dataRoot, bulbasaurCore.assetRefs.home), "utf8"));
const bulbasaurShuffle = JSON.parse(fs.readFileSync(path.join(dataRoot, bulbasaurCore.assetRefs.shuffle), "utf8"));
const bulbasaurVariants = JSON.parse(fs.readFileSync(path.join(dataRoot, bulbasaurCore.assetRefs.variants), "utf8"));
const bulbasaurLocations = JSON.parse(fs.readFileSync(path.join(dataRoot, bulbasaurCore.assetRefs["location-cards"]), "utf8"));

test("le loader par défaut ne lit que le core léger", () => {
  const data = engine.hydrateSourceData(bulbasaurSource, { families: [] });
  assert.equal(data.assets.assetsRef, "pokemon-assets/core/normal/0001-bulbasaur.assets.json");
  assert.equal(data.assets.image, bulbasaurSource.assets.image);
  assert.deepEqual(data.assets.candy, bulbasaurSource.assets.candy);
  assert.equal(data.assets.home, null);
  assert.equal(data.assets.shuffle, null);
  assert.deepEqual(data.assets.locationCards, []);
  assert.deepEqual(data.assetForms, []);
  assert.deepEqual(Object.keys(data.assetRefs).sort(), ["home", "location-cards", "shuffle", "variants"]);
});

test("le détail charge à la demande les quatre familles séparées sans perte", () => {
  const data = engine.hydrateSourceData(bulbasaurSource);
  assert.deepEqual(data.assets.home, bulbasaurHome.home);
  assert.deepEqual(data.assets.shuffle, bulbasaurShuffle.shuffle);
  assert.deepEqual(data.assets.locationCards, bulbasaurLocations.locationCards);
  assert.deepEqual(data.assetForms, bulbasaurVariants.variants.map((asset) => ({
    ...asset,
    form: asset.form ?? null,
    image: asset.image,
    shinyImage: asset.shinyImage ?? null,
    costume: asset.costume ?? null,
    isFemale: asset.isFemale === true,
  })));
});

test("l’endpoint paresseux construit 1 611 patches et conserve Location Cards et costumes", () => {
  const patches = engine.buildAssetFamilyPatches(["home", "shuffle", "variants", "location-cards"]);
  assert.equal(patches.length, 1611);
  const bulbasaur = patches.find((entry) => entry.key === "pokemon:data/pokemon/0001-bulbasaur.json");
  assert.ok(bulbasaur.homeImage);
  assert.ok(bulbasaur.shuffleImage);
  assert.equal(bulbasaur.assets.locationCards.length, 3);
  assert.equal(bulbasaur.eventAssets.length, 3);
});

test("la fiche détaillée expose le core et les documents de famille séparés", () => {
  const detail = engine.detailForKey("pokemon:data/pokemon/0001-bulbasaur.json");
  assert.equal(detail.assetSourceFile, "pokemon-assets/core/normal/0001-bulbasaur.assets.json");
  assert.equal(detail.assetSourceData.formId, "BULBASAUR");
  assert.deepEqual(Object.keys(detail.assetSourceData.familyDocuments).sort(), ["home", "location-cards", "shuffle", "variants"]);
});

test("le client ne demande les familles lourdes que pour les surfaces concernées", () => {
  const source = fs.readFileSync(path.join(root, "src/components/admin/pokemon/admin-app.jsx"), "utf8");
  assert.match(source, /action=asset-families/);
  assert.match(source, /active === "collections"/);
  assert.match(source, /\["home", "shuffle", "variants"\]/);
  assert.match(source, /active === "backgrounds"/);
  assert.match(source, /\["location-cards"\]/);
  assert.match(source, /assetFamilyData\.patches\[entry\.key\]/);
});
