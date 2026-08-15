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

function catalog(type, variantMode = "single", shiny = false) {
  return buildCollectionCatalog(sources, { type, variantMode, shiny });
}

test("la table de vérité canonique garde les compteurs calculés depuis les JSON", () => {
  const report = buildCollectionContractReport(sources);
  assert.equal(report.schemaVersion, COLLECTION_SCHEMA_VERSION);
  assert.equal(report.valid, true);
  assert.deepEqual(report.diagnostics, []);
  assert.deepEqual(report.counts, {
    "normal.single.standard": 955,
    "normal.single.shiny": 876,
    "normal.multi.standard": 1352,
    "normal.multi.shiny": 1245,
    "event.single.standard": 315,
    "event.single.shiny": 312,
    "event.multi.standard": 427,
    "event.multi.shiny": 423,
    "lucky.single.standard": 955,
    "lucky.single.shiny": 876,
    "lucky.multi.standard": 1352,
    "lucky.multi.shiny": 1245,
    "shadow.single.standard": 458,
    "shadow.single.shiny": 307,
    "shadow.multi.standard": 548,
    "shadow.multi.shiny": 366,
    "purified.single.standard": 458,
    "purified.single.shiny": 307,
    "purified.multi.standard": 548,
    "purified.multi.shiny": 366,
    "mega.single.standard": 53,
    "mega.single.shiny": 53,
    "mega.multi.standard": 53,
    "mega.multi.shiny": 53,
    "dynamax.single.standard": 127,
    "dynamax.single.shiny": 121,
    "dynamax.multi.standard": 127,
    "dynamax.multi.shiny": 121,
    "gigantamax.single.standard": 25,
    "gigantamax.single.shiny": 22,
    "gigantamax.multi.standard": 25,
    "gigantamax.multi.shiny": 22,
  });
});

test("l'Engine publie le contrôle Collection Catalog et ses huit diagnostics bloquants", () => {
  const { report } = buildCanonicalEngineReport();
  assert.equal(report.architecture.collectionCatalog.valid, true);
  assert.equal(report.architecture.collectionCatalog.counts["gigantamax.single.standard"], 25);
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
      for (const shiny of [false, true]) {
        const entries = catalog(type, variantMode, shiny);
        assert.ok(entries.every((entry) => entry.released === true));
        assert.ok(entries.every((entry) => Boolean(entry.asset)));
        assert.equal(new Set(entries.map((entry) => entry.key)).size, entries.length);
        assert.deepEqual(validateCollectionCatalog(entries, { shiny }), []);
      }
    }
  }
});

test("Non variante garde les catégories spécialisées et corrige le catalogue Gigamax vide", () => {
  assert.equal(catalog("mega").length, 53);
  assert.equal(catalog("dynamax").length, 127);
  assert.equal(catalog("gigantamax").length, 25);
  assert.ok(catalog("gigantamax").every((entry) => entry.category === "gigantamax"));
  assert.ok(catalog("dynamax").every((entry) => entry.category === "dynamax"));
  assert.ok(catalog("normal").every((entry) => entry.category === "normal"));
});

test("Event repose exclusivement sur kind costume/event et sépare principal de multi variante", () => {
  const single = catalog("event", "single");
  const multi = catalog("event", "multi");
  assert.ok(single.every((entry) => ["costume", "event"].includes(entry.kind)));
  assert.ok(multi.every((entry) => ["costume", "event"].includes(entry.kind)));
  assert.ok(single.every((entry) => entry.gender !== "female"));
  assert.equal(multi.filter((entry) => entry.gender === "female").length, 118);
  assert.equal(single.length, 315);
  assert.equal(multi.length, 427);
});

test("Multi variante ajoute les différences de genre sans réintroduire Event ou Max dans Normal", () => {
  const entries = catalog("normal", "multi");
  assert.equal(entries.filter((entry) => entry.gender === "female").length, 94);
  assert.ok(entries.every((entry) => !["costume", "event", "mega", "primal", "dynamax", "gigantamax"].includes(entry.category)));
  assert.equal(catalog("normal", "single").filter((entry) => entry.gender === "female").length, 0);
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
  const entries = buildCollectionCatalog([source], { type: "event", variantMode: "multi" });
  const legacyAlias = entries.find((entry) => entry.gender === "female")?.legacyAliases[0];
  const migrated = migrateCollectionSelections({ id: "legacy", items: { [legacyAlias]: true, orphan: true } }, entries);
  assert.equal(migrated.schemaVersion, COLLECTION_SCHEMA_VERSION);
  assert.equal(migrated.migration.existing, 2);
  assert.equal(migrated.migration.mapped, 1);
  assert.equal(migrated.migration.ambiguous, 1);
  assert.equal(migrated.migration.unmapped, 1);
  assert.equal(migrated.legacyItems.orphan, true);
  assert.ok(Object.keys(migrated.items).length >= 2);
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
  assert.match(panel, /const collectionPageSize = 48/);
  assert.match(panel, /Sélectionner tous les résultats/);
  assert.match(panel, /Désélectionner tous les résultats/);
  assert.match(panel, /aria-label="Pagination Collections"/);
  assert.match(panel, /grid-cols-2[^\n]+2xl:grid-cols-10/);
  assert.doesNotMatch(panel, /Afficher plus|onOpen|<Info/);
  assert.match(assets, /collectionMax: "\/assets\/ui\/categories\/max-battles\/max-battles\.webp"/);
  assert.match(assets, /collectionShiny: "\/assets\/ui\/categories\/max-battles\/ic_shiny\.png"/);
  assert.match(styles, /\.collection-pokemon-card\[data-tone="max"\]/);
  assert.doesNotMatch(styles, /data-tone="mega"[^\n]+data-tone="max"/);
});
