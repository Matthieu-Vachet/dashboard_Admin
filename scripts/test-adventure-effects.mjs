import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const root = path.resolve(process.cwd(), "..", "PokemonGo-Data");
process.env.POKEMON_GO_DATA_DIR = root;
const require = createRequire(import.meta.url);
const engine = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const workshop = require("../src/server/pokemon-go/apps/checklist/server/workshop.js");

function readSource(relativePath) {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), "utf8");
}

test("l’Engine et le catalogue exposent les 11 effets, relations, langues et assets", () => {
  const audit = engine.adventureEffectArchitectureAudit();
  assert.deepEqual(audit.summary, {
    valid: true,
    effects: 11,
    pokemonLinks: 11,
    moveLinks: 11,
    languages: ["en", "de", "es", "pt", "fr", "nl"],
    banners: 9,
    portraits: 9,
    errors: 0,
    manifestStale: false,
  });
  const catalog = workshop.catalog();
  assert.equal(catalog.adventureEffects.length, 11);
  assert.equal([...catalog.moves.values()].filter((move) => move.adventureEffect).length, 11);
});

test("les onze familles disposent d’un renderer riche et Méga-Mewtwo garde un fallback explicite", () => {
  const effects = engine.adventureEffectArchitectureAudit().effects;
  assert.deepEqual(new Set(effects.map((effect) => effect.effectType)), new Set([
    "ATTACK_BONUS", "DEFENSE_BONUS", "MAX_MOVE_LEVEL", "CATCH_FREEZE", "CATCH_RING_SLOW",
    "DAY_INCENSE", "NIGHT_INCENSE", "ITEM_TIME_PAUSE", "ENCOUNTER_RANGE", "MEGA_RAID_DAMAGE", "APPRAISAL_VISIBILITY",
  ]));
  const card = readSource("src/components/admin/pokemon/adventure-effect-card.jsx");
  for (const effectType of new Set(effects.map((effect) => effect.effectType))) assert.match(card, new RegExp(effectType));
  assert.match(card, /Asset bannière non publié/);
  assert.match(card, /Portrait non publié/);
  assert.match(card, /function AdventureEffectMetric/);
  assert.match(card, /uiAssets\.icons\.stardust/);
  assert.match(card, /uiAssets\.icons\.collectionMax/);
  assert.match(card, /excludedPokemon/);
  assert.doesNotMatch(card, /JSON\.stringify/);
  assert.doesNotMatch(card, /Source et fiabilité|effect\.sources|effect\.metadata/);
  for (const effect of effects.filter((entry) => entry.id.includes("MEGA_MEWTWO"))) {
    assert.equal(effect.bonusEffects.status, "NOT_AVAILABLE");
    assert.equal(effect.bonusEffects.raw, null);
    assert.equal(effect.assets.banner, null);
    assert.equal(effect.assets.portrait, null);
  }
});

test("les fiches Pokémon, Moves et la vue Catalogue consomment le domaine centralisé", () => {
  const detail = engine.detailForKey("form:data/pokemon/forms/0484-palkia-origin.json#PALKIA_ORIGIN");
  assert.equal(detail.adventureEffects[0].id, "ADVENTURE_EFFECT_SPACIAL_REND");
  const pokemonCard = readSource("src/components/admin/pokemon/pokemon-card.jsx");
  const detailModal = readSource("src/components/admin/pokemon/detail-modal.jsx");
  const catalog = readSource("src/components/admin/pokemon/catalog-panel.jsx");
  assert.match(pokemonCard, /adventureEffects/);
  assert.match(detailModal, /AdventureEffectCard/);
  assert.match(catalog, /Effets d’aventure/);
  assert.match(catalog, /move\.adventureEffect/);
});

test("la résolution de fiche reste exacte par forme, catégorie et référence canonique", () => {
  const megaX = engine.detailForKey("mega:data/pokemon/mega/0150-mewtwo-mega-x.json#MEWTWO_MEGA_X");
  const megaY = engine.detailForKey("mega:data/pokemon/mega/0150-mewtwo-mega-y.json#MEWTWO_MEGA_Y");
  const mewtwo = engine.detailForKey("pokemon:data/pokemon/normal/0150-mewtwo.json");
  const zacianCrowned = engine.detailForKey("form:data/pokemon/forms/0888-zacian-crowned-sword.json#ZACIAN_CROWNED_SWORD");
  const zacian = engine.detailForKey("pokemon:data/pokemon/normal/0888-zacian.json");

  assert.deepEqual(megaX.adventureEffects.map((effect) => effect.id), ["ADVENTURE_EFFECT_MEGA_MEWTWO_X"]);
  assert.deepEqual(megaY.adventureEffects.map((effect) => effect.id), ["ADVENTURE_EFFECT_MEGA_MEWTWO_Y"]);
  assert.deepEqual(mewtwo.adventureEffects, []);
  assert.deepEqual(zacianCrowned.adventureEffects.map((effect) => effect.id), ["ADVENTURE_EFFECT_BEHEMOTH_BLADE"]);
  assert.deepEqual(zacian.adventureEffects, []);
  assert.equal(engine.detailForKey("mega:data/pokemon/mega/0150-mewtwo-mega-x.json#MEWTWO_MEGA_Y"), null);
  assert.equal(megaX.adventureEffects[0].pokemon[0].formId, "MEWTWO_MEGA_X");
});

test("la donnée canonique Adventure Effect n’expose plus les métadonnées opérationnelles", () => {
  for (const effect of engine.adventureEffectArchitectureAudit().effects) {
    assert.equal("sources" in effect, false);
    assert.equal("metadata" in effect, false);
  }
});

test("les neuf couples d’assets publiés existent dans Assets API et les mappings ne sont pas cassés", () => {
  const effects = engine.adventureEffectArchitectureAudit().effects;
  const assetsRoot = path.resolve(process.cwd(), "..", "PokemonGo-Assets-API");
  for (const effect of effects) {
    for (const field of ["bannerPath", "portraitPath"]) {
      const assetPath = effect.assets[field];
      if (assetPath) assert.ok(fs.existsSync(path.join(assetsRoot, assetPath)), `${effect.id}: ${assetPath}`);
    }
  }
  assert.equal(effects.filter((effect) => effect.assets.bannerPath).length, 9);
  assert.equal(effects.filter((effect) => effect.assets.portraitPath).length, 9);
});

test("Builder, synchronisation et Veille sont branchés sur les contrats Adventure Effects", () => {
  const builder = readSource("src/components/admin/pokemon/json-builder-panel.tsx");
  const dashboardNavigation = readSource("src/data/dashboard.ts");
  const adminApp = readSource("src/components/admin/pokemon/admin-app.jsx");
  const transaction = readSource("src/server/pokemon-go/json-builder/transaction-engine.js");
  const watch = readSource("src/server/pokemon-go/apps/checklist/server/source-watch.js");
  const registry = readSource("src/lib/admin-regeneration-registry.ts");
  assert.match(builder, /adventureEffectSteps/);
  assert.match(builder, /Sélectionner un effet existant/);
  assert.equal(dashboardNavigation.match(/href: "\/json-builder"/g)?.length, 1);
  assert.ok(
    dashboardNavigation.indexOf('id: "maintenance"') < dashboardNavigation.indexOf('href: "/json-builder"'),
    "JSON Builder doit être rangé dans Maintenance",
  );
  assert.match(adminApp, /id: "json-builder"[^\n]+group: "maintenance"/);
  assert.match(transaction, /adventureEffectReferencePatches/);
  assert.match(watch, /semanticSnapshot/);
  assert.match(registry, /Synchroniser Adventure Effects/);
  assert.match(registry, /\/api\/v1\/admin\/adventure-effects\/regenerate/);
});
