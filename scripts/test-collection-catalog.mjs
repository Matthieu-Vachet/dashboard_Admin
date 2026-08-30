import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const { buildCanonicalEngineReport, buildChecklist } = require("../src/server/pokemon-go/apps/checklist/server/engine");
const {
  COLLECTION_SCHEMA_VERSION,
  buildCollectionCatalog,
  buildCollectionContractReport,
  mergeCollectionSnapshots,
  migrateCollectionSelections,
  validateCollectionCatalog,
} = require("../src/lib/collections/collection-catalog");

const sources = buildChecklist();

function catalog(type, variantMode = "single", shiny = false, includeGenderVariants = false) {
  return buildCollectionCatalog(sources, { type, variantMode, shiny, includeGenderVariants });
}

test("la table de vérité canonique garde les compteurs calculés depuis les JSON", () => {
  const report = buildCollectionContractReport(sources);
  assert.equal(report.schemaVersion, COLLECTION_SCHEMA_VERSION);
  assert.equal(report.valid, true);
  assert.deepEqual(report.diagnostics, []);
  assert.deepEqual(report.counts, {
    "normal.single.standard": 955,
    "normal.single.shiny": 876,
    "normal.single.gender.standard": 1055,
    "normal.single.gender.shiny": 975,
    "normal.multi.standard": 1258,
    "normal.multi.shiny": 1151,
    "normal.multi.gender.standard": 1359,
    "normal.multi.gender.shiny": 1251,
    "event.single.standard": 311,
    "event.single.shiny": 308,
    "event.single.gender.standard": 429,
    "event.single.gender.shiny": 425,
    "event.multi.standard": 311,
    "event.multi.shiny": 308,
    "event.multi.gender.standard": 429,
    "event.multi.gender.shiny": 425,
    "lucky.single.standard": 955,
    "lucky.single.shiny": 876,
    "lucky.single.gender.standard": 1055,
    "lucky.single.gender.shiny": 975,
    "lucky.multi.standard": 1258,
    "lucky.multi.shiny": 1151,
    "lucky.multi.gender.standard": 1359,
    "lucky.multi.gender.shiny": 1251,
    "shadow.single.standard": 458,
    "shadow.single.shiny": 307,
    "shadow.single.gender.standard": 526,
    "shadow.single.gender.shiny": 348,
    "shadow.multi.standard": 480,
    "shadow.multi.shiny": 325,
    "shadow.multi.gender.standard": 548,
    "shadow.multi.gender.shiny": 366,
    "purified.single.standard": 458,
    "purified.single.shiny": 307,
    "purified.single.gender.standard": 526,
    "purified.single.gender.shiny": 348,
    "purified.multi.standard": 480,
    "purified.multi.shiny": 325,
    "purified.multi.gender.standard": 548,
    "purified.multi.gender.shiny": 366,
    "mega.single.standard": 58,
    "mega.single.shiny": 58,
    "mega.single.gender.standard": 58,
    "mega.single.gender.shiny": 58,
    "mega.multi.standard": 58,
    "mega.multi.shiny": 58,
    "mega.multi.gender.standard": 58,
    "mega.multi.gender.shiny": 58,
    "dynamax.single.standard": 127,
    "dynamax.single.shiny": 121,
    "dynamax.single.gender.standard": 127,
    "dynamax.single.gender.shiny": 121,
    "dynamax.multi.standard": 127,
    "dynamax.multi.shiny": 121,
    "dynamax.multi.gender.standard": 127,
    "dynamax.multi.gender.shiny": 121,
    "gigantamax.single.standard": 17,
    "gigantamax.single.shiny": 17,
    "gigantamax.single.gender.standard": 17,
    "gigantamax.single.gender.shiny": 17,
    "gigantamax.multi.standard": 17,
    "gigantamax.multi.shiny": 17,
    "gigantamax.multi.gender.standard": 17,
    "gigantamax.multi.gender.shiny": 17,
  });
});

test("l'Engine publie le contrôle Collection Catalog et ses huit diagnostics bloquants", () => {
  const { report } = buildCanonicalEngineReport();
  assert.equal(report.architecture.collectionCatalog.valid, true);
  assert.equal(report.architecture.collectionCatalog.counts["gigantamax.single.standard"], 17);
  for (const code of [
    "COLLECTION_UNRELEASED_ENTRY",
    "COLLECTION_DUPLICATE_ENTRY",
    "COLLECTION_WRONG_ASSET_VARIANT",
    "COLLECTION_INVALID_EVENT_KIND",
    "COLLECTION_INVALID_GENDER_VARIANT",
    "COLLECTION_INVALID_CATEGORY",
    "COLLECTION_SHINY_NOT_RELEASED",
    "COLLECTION_MISSING_ASSET",
  ]) {
    assert.equal(report.diagnosticTaxonomy[code].count, 0, code);
    assert.equal(report.diagnosticTaxonomy[code].blocking, true, code);
  }
});

test("aucune checklist ne contient une fiche non sortie, un asset absent ou une clé dupliquée", () => {
  for (const type of ["normal", "event", "lucky", "shadow", "purified", "mega", "dynamax", "gigantamax"]) {
    for (const variantMode of ["single", "multi"]) {
      for (const includeGenderVariants of [false, true]) {
        for (const shiny of [false, true]) {
          const entries = catalog(type, variantMode, shiny, includeGenderVariants);
          assert.ok(entries.every((entry) => entry.released === true));
          assert.ok(entries.every((entry) => Boolean(entry.asset)));
          assert.equal(new Set(entries.map((entry) => entry.key)).size, entries.length);
          assert.deepEqual(validateCollectionCatalog(entries, { shiny }), []);
        }
      }
    }
  }
});

test("Non variante garde les catégories spécialisées et corrige le catalogue Gigamax vide", () => {
  assert.equal(catalog("mega").length, 58);
  assert.equal(catalog("dynamax").length, 127);
  assert.equal(catalog("gigantamax").length, 17);
  assert.ok(catalog("gigantamax").every((entry) => entry.category === "gigantamax"));
  assert.ok(catalog("dynamax").every((entry) => entry.category === "dynamax"));
  assert.ok(catalog("normal").every((entry) => entry.category === "normal"));
});

test("Event repose exclusivement sur kind costume/event et sépare Sexe de Multi variante", () => {
  const single = catalog("event", "single");
  const multi = catalog("event", "multi");
  const genderOnly = catalog("event", "single", false, true);
  const multiGender = catalog("event", "multi", false, true);
  assert.ok(single.every((entry) => ["costume", "event"].includes(entry.kind)));
  assert.ok(multi.every((entry) => ["costume", "event"].includes(entry.kind)));
  assert.ok(single.every((entry) => entry.gender !== "female"));
  assert.ok(multi.every((entry) => entry.gender !== "female"));
  assert.equal(genderOnly.filter((entry) => entry.gender === "female").length, 118);
  assert.equal(multiGender.filter((entry) => entry.gender === "female").length, 118);
  assert.equal(single.length, 311);
  assert.equal(multi.length, 311);
  assert.equal(genderOnly.length, 429);
  assert.equal(multiGender.length, 429);
});

test("la table de vérité rend Multi variante et Sexe strictement orthogonaux", () => {
  const base = catalog("normal", "single");
  const multi = catalog("normal", "multi");
  const gender = catalog("normal", "single", false, true);
  const multiGender = catalog("normal", "multi", false, true);
  assert.equal(base.filter((entry) => entry.gender === "female").length, 0);
  assert.equal(multi.filter((entry) => entry.gender === "female").length, 0);
  assert.equal(gender.filter((entry) => entry.gender === "female").length, 100);
  assert.equal(multiGender.filter((entry) => entry.gender === "female").length, 101);
  assert.equal(base.length, 955);
  assert.equal(multi.length, 1258);
  assert.equal(gender.length, 1055);
  assert.equal(multiGender.length, 1359);
  assert.ok(multi.every((entry) => !["costume", "event", "mega", "primal", "dynamax", "gigantamax"].includes(entry.category)));
});

test("Sexe n’ajoute une femelle chromatique qu’avec son shinyImage exact", () => {
  const fixtures = [{
    key: "pokemon:no-gender",
    kind: "pokemon",
    form: "normal",
    formId: "NO_GENDER",
    id: "NO_GENDER",
    dexId: "9997",
    name: "Sans différence",
    availability: { released: true, shinyReleased: true },
    goImage: "/no-gender.png",
    goShinyImage: "/no-gender-shiny.png",
    collectionVariants: [],
  }, {
    key: "pokemon:gender",
    kind: "pokemon",
    form: "normal",
    formId: "GENDER",
    id: "GENDER",
    dexId: "9998",
    name: "Avec différence",
    availability: { released: true, shinyReleased: true },
    goImage: "/gender.png",
    goShinyImage: "/gender-shiny.png",
    collectionVariants: [{ kind: "gender", gender: "female", isFemale: true, image: "/gender-female.png", shinyImage: null }],
  }, {
    key: "pokemon:gender-shiny",
    kind: "pokemon",
    form: "normal",
    formId: "GENDER_SHINY",
    id: "GENDER_SHINY",
    dexId: "9999",
    name: "Avec shiny femelle",
    availability: { released: true, shinyReleased: true },
    goImage: "/gender-shiny-base.png",
    goShinyImage: "/gender-shiny-base-shiny.png",
    collectionVariants: [{ kind: "gender", gender: "female", isFemale: true, image: "/gender-shiny-female.png", shinyImage: "/gender-shiny-female-shiny.png" }],
  }];
  const standard = buildCollectionCatalog(fixtures, { type: "normal", variantMode: "single", includeGenderVariants: true });
  const shiny = buildCollectionCatalog(fixtures, { type: "normal", variantMode: "single", includeGenderVariants: true, shiny: true });
  assert.equal(standard.length, 5);
  assert.equal(shiny.length, 4);
  assert.deepEqual(shiny.filter((entry) => entry.gender === "female").map((entry) => entry.asset), ["/gender-shiny-female-shiny.png"]);
});

test("Rattata, Pikachu, formes régionales et formes alternatives suivent les axes demandés", () => {
  const normalGender = catalog("normal", "single", false, true);
  const normalMulti = catalog("normal", "multi");
  assert.ok(normalGender.some((entry) => entry.dexId === "0019" && entry.category === "normal" && entry.gender === "female"));
  assert.ok(normalGender.some((entry) => entry.dexId === "0025" && entry.category === "normal" && entry.gender === "female"));
  assert.ok(normalMulti.some((entry) => entry.dexId === "0019" && entry.category === "regional"));
  assert.ok(normalMulti.some((entry) => entry.category === "form"));
  assert.ok(normalMulti.every((entry) => entry.gender !== "female"));
});

test("Shadow shiny utilise shadowShinyReleased et pas shinyReleased", () => {
  const fixture = [{
    key: "pokemon:fixture",
    kind: "pokemon",
    form: "normal",
    formId: "FIXTURE",
    id: "FIXTURE",
    dexId: "9999",
    name: "Fixture",
    availability: { released: true, shadow: true, shinyReleased: true, shadowShinyReleased: false },
    goImage: "/fixture.png",
    goShinyImage: "/fixture-shiny.png",
    collectionVariants: [],
  }];
  assert.equal(buildCollectionCatalog(fixture, { type: "normal", variantMode: "single", shiny: true }).length, 1);
  assert.equal(buildCollectionCatalog(fixture, { type: "shadow", variantMode: "single", shiny: true }).length, 0);
});

test("les fixtures métier couvrent base, costumes, régional, Méga X/Y, Dynamax et Gigamax", () => {
  const normalMulti = catalog("normal", "multi");
  const events = catalog("event", "multi");
  const megas = catalog("mega", "multi");
  assert.ok(normalMulti.some((entry) => entry.dexId === "0001" && entry.category === "normal"));
  assert.ok(events.some((entry) => entry.dexId === "0001" && /fall|jan|spring/i.test(`${entry.form} ${entry.costume}`)));
  assert.ok(events.some((entry) => entry.dexId === "0003" && /copy/i.test(`${entry.form} ${entry.costume}`)));
  assert.ok(normalMulti.some((entry) => entry.dexId === "0019" && entry.category === "regional"));
  assert.ok(normalMulti.some((entry) => entry.canonicalId === "MOLTRES_GALARIAN"));
  assert.ok(megas.some((entry) => entry.canonicalId === "CHARIZARD_MEGA_X"));
  assert.ok(megas.some((entry) => entry.canonicalId === "CHARIZARD_MEGA_Y"));
  assert.ok(catalog("dynamax", "multi").some((entry) => entry.dexId === "0001"));
  assert.ok(catalog("gigantamax", "multi").some((entry) => entry.dexId === "0003"));
});

test("la migration préserve les sélections exactes, ambiguës et non mappées", () => {
  const source = sources.find((entry) => entry.collectionVariants?.some((variant) => variant.kind === "costume" && variant.isFemale));
  assert.ok(source);
  const entries = buildCollectionCatalog([source], { type: "event", variantMode: "multi", includeGenderVariants: true });
  const legacyAlias = entries.find((entry) => entry.gender === "female")?.legacyAliases[0];
  const migrated = migrateCollectionSelections({ id: "legacy", items: { [legacyAlias]: true, orphan: true } }, entries);
  assert.equal(migrated.schemaVersion, COLLECTION_SCHEMA_VERSION);
  assert.equal(migrated.includeGenderVariants, false);
  assert.equal(migrated.migration.existing, 2);
  assert.equal(migrated.migration.mapped, 1);
  assert.equal(migrated.migration.ambiguous, 1);
  assert.equal(migrated.migration.unmapped, 1);
  assert.equal(migrated.legacyItems.orphan, true);
  assert.ok(Object.keys(migrated.items).length >= 2);
});

test("la migration v2 conserve les clés HAVE femelles tout en désactivant Sexe", () => {
  const source = sources.find((entry) => entry.collectionVariants?.some((variant) => variant.kind === "gender" && variant.isFemale));
  assert.ok(source);
  const migrationCatalog = buildCollectionCatalog([source], { type: "normal", variantMode: "multi", includeGenderVariants: true });
  const female = migrationCatalog.find((entry) => entry.gender === "female");
  const oldFemaleKey = female?.legacyAliases.find((alias) => alias.startsWith("collection:")) || female?.key;
  const oldMainKey = migrationCatalog.find((entry) => entry.gender !== "female")?.legacyAliases.find((alias) => alias.startsWith("collection:"));
  assert.ok(female && oldFemaleKey && oldMainKey);

  const migrated = migrateCollectionSelections({
    id: "legacy-v2",
    schemaVersion: 2,
    variantMode: "multi",
    items: { [oldMainKey]: true, [oldFemaleKey]: true },
  }, migrationCatalog);
  assert.equal(migrated.includeGenderVariants, false);
  assert.equal(migrated.migration.unmapped, 0);
  assert.equal(Object.keys(migrated.items).length, 2);
  assert.equal(migrated.items[female.key], true);
  const visibleWithoutGender = buildCollectionCatalog([source], migrated);
  assert.equal(visibleWithoutGender.some((entry) => entry.gender === "female"), false);
  const visibleWithGender = buildCollectionCatalog([source], { ...migrated, includeGenderVariants: true });
  assert.equal(visibleWithGender.find((entry) => entry.gender === "female")?.key, female.key);
  assert.equal(migrated.items[female.key], true);
});

test("la fusion Mongo et locale ne supprime aucune collection ni sélection HAVE", () => {
  const localOnly = { id: "local", name: "Locale", items: { localHave: true } };
  const mergedFromEmptyStore = mergeCollectionSnapshots([], [localOnly]);
  assert.deepEqual(mergedFromEmptyStore, [localOnly]);

  const merged = mergeCollectionSnapshots(
    [{ id: "shared", name: "Serveur", schemaVersion: 1, updatedAt: "2026-08-14T10:00:00.000Z", items: { serverHave: true } }],
    [{ id: "shared", name: "Locale récente", schemaVersion: 2, updatedAt: "2026-08-14T11:00:00.000Z", items: { localHave: true } }, localOnly],
  );
  assert.equal(merged.length, 2);
  assert.equal(merged[0].name, "Locale récente");
  assert.deepEqual(merged[0].items, { serverHave: true, localHave: true });
  assert.equal(merged[0].schemaVersion, 2);
  assert.equal(merged[1].id, "local");
});

test("les Collections compactes gardent les couleurs, libellés, icônes et actions canoniques", () => {
  const fixture = [{
    key: "pokemon:fixture",
    kind: "pokemon",
    form: "normal",
    formId: "FIXTURE",
    id: "FIXTURE",
    dexId: "9999",
    name: "Fixture",
    generation: 1,
    availability: { released: true, shinyReleased: true },
    goImage: "/fixture.png",
    goShinyImage: "/fixture-shiny.png",
    collectionVariants: [{
      kind: "costume",
      form: "JAN_2020_NOEVOLVE",
      costume: "JAN_2020_NOEVOLVE",
      image: "/fixture-party.png",
      shinyImage: "/fixture-party-shiny.png",
    }],
  }, {
    key: "dynamax:fixture",
    kind: "dynamax",
    form: "dynamax",
    formId: "FIXTURE_DYNAMAX",
    id: "FIXTURE_DYNAMAX",
    dexId: "9999",
    name: "Fixture Dynamax",
    generation: 1,
    availability: { released: true },
    goImage: "/fixture-dynamax.png",
    collectionVariants: [],
  }];
  const event = buildCollectionCatalog(fixture, { type: "event", variantMode: "single" });
  const dynamax = buildCollectionCatalog(fixture, { type: "dynamax", variantMode: "single" });
  assert.equal(event[0].label, "Chapeau de fête");
  assert.equal(dynamax[0].tone, "max");

  const root = process.cwd();
  const panel = fs.readFileSync(path.join(root, "src/components/admin/pokemon/collections-panel.jsx"), "utf8");
  const assets = fs.readFileSync(path.join(root, "src/components/site/ui-assets.js"), "utf8");
  const styles = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");
  assert.doesNotMatch(panel, /collectionPageSize|Pagination Collections|Choisir une page Collections/);
  assert.match(panel, /Sélectionner tous les résultats/);
  assert.match(panel, /Désélectionner tous les résultats/);
  assert.match(panel, /content-visibility:auto/);
  assert.match(panel, /liste complète/);
  assert.match(panel, /grid-cols-2[^\n]+2xl:grid-cols-10/);
  assert.match(panel, /data-testid="active-collection-card"/);
  assert.match(panel, /data-testid="collection-selector-trigger"/);
  assert.match(panel, /Changer de collection, active/);
  assert.doesNotMatch(panel, /const collectionSelector/);
  assert.match(panel, /dialog\.contains\(document\.activeElement\)/);
  assert.match(panel, /includeGenderVariants/);
  assert.match(panel, /Inclure les différences visuelles mâle \/ femelle lorsqu'elles existent\./);
  assert.doesNotMatch(panel, /Afficher plus|onOpen|<Info/);
  assert.match(assets, /collectionMax: "\/assets\/ui\/categories\/max-battles\/max-battles\.webp"/);
  assert.match(assets, /collectionShiny: "\/assets\/ui\/categories\/max-battles\/ic_shiny\.png"/);
  assert.match(styles, /\.collection-pokemon-card\[data-tone="max"\]/);
  assert.doesNotMatch(styles, /data-tone="mega"[^\n]+data-tone="max"/);
});

test("le panneau attend les familles d’assets avant d’autoriser une collection", () => {
  const source = fs.readFileSync(new URL("../src/components/admin/pokemon/admin-app.jsx", import.meta.url), "utf8");
  assert.match(source, /collectionAssetFamiliesReady = \["home", "shuffle", "variants"\]\.every/);
  assert.match(source, /active === "collections" && !collectionAssetFamiliesReady/);
  assert.match(source, /Préparation des Collections…/);
  assert.match(source, /active === "collections" && collectionAssetFamiliesReady/);
});
