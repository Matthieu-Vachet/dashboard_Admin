import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

process.env.POKEMON_GO_DATA_DIR ||= path.resolve(process.cwd(), "../PokemonGo-Data");
const require = createRequire(import.meta.url);
const { buildCanonicalEngineReport, buildChecklist, eventAssetIsCostumeOrEvent, validateSourceData } = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const { summarizeChecklist } = require("../src/server/pokemon-go/src/lib/site-dashboard.js");
const engineRun = buildCanonicalEngineReport([]);

test("le véritable Engine produit un rapport global sérialisable et mesuré", () => {
  const { report } = engineRun;

  assert.equal(report.reportId, "ENGINE-CANONICAL-ARCHITECTURE-001");
  assert.equal(report.status, "VALID_WITH_DIAGNOSTICS");
  assert.equal(report.coverage.pokemonAndForms, 1_617);
  assert.equal(report.coverage.assetCore, 1_617);
  assert.equal(report.coverage.assetFamilies, 3_030);
  assert.equal(report.coverage.pvpRecords, 1_617);
  assert.equal(report.architecture.assets.valid, true);
  assert.equal(report.architecture.pvp.valid, true);
  assert.deepEqual(new Set(report.architecture.categories), new Set([
    "NORMAL",
    "ALOLA",
    "GALAR",
    "HISUI",
    "PALDEA",
    "FORM",
    "MEGA",
    "PRIMAL",
    "DYNAMAX",
    "GIGANTAMAX",
  ]));
  assert.ok(Number.isFinite(report.performance.durationMs));
  assert.ok(report.performance.durationMs >= 0);
  assert.ok(report.performance.memoryAfter.heapUsedBytes > 0);
  assert.doesNotThrow(() => JSON.stringify(report));
  assert.deepEqual(Object.keys(report.diagnostics.categories), [
    "schema",
    "pokemon-pvpoke-mapping",
    "move-mapping",
    "movepool",
    "source",
    "release-metadata",
    "type",
    "reference",
    "architecture",
  ]);
  assert.equal(report.diagnostics.severityCounts.error, 0);
  assert.equal(report.diagnostics.severityCounts.warning, 0);
  assert.ok(report.diagnostics.severityCounts.info > 0);
  assert.equal(
    Object.values(report.diagnostics.categories).reduce((total, category) => total + category.info, 0),
    report.diagnostics.severityCounts.info,
  );
});

test("le filtre Costume/Event charge les variants séparés et couvre la famille Bulbizarre", () => {
  const entries = buildChecklist([]);
  const eventFiches = entries.filter((entry) => Array.isArray(entry.eventAssets) && entry.eventAssets.length > 0);
  assert.ok(eventFiches.length > 0);
  const bulbasaur = entries.find((entry) => entry.formId === "BULBASAUR");
  const ivysaur = entries.find((entry) => entry.formId === "IVYSAUR");
  const venusaur = entries.find((entry) => entry.formId === "VENUSAUR");
  assert.ok(bulbasaur.eventAssets.some((asset) => asset.costume === "JAN_2020_NOEVOLVE"));
  assert.ok(ivysaur.eventAssets.some((asset) => asset.costume === "JAN_2020_NOEVOLVE"));
  assert.ok(venusaur.eventAssets.some((asset) => asset.form === "COPY_2019"));
  assert.equal(eventAssetIsCostumeOrEvent({ kind: "gender", costume: null }), false);
  assert.equal(eventAssetIsCostumeOrEvent({ kind: "event", form: "COPY_2019" }), true);
  assert.equal(eventAssetIsCostumeOrEvent({ kind: "costume", costume: "TEST" }), true);
  assert.equal(eventAssetIsCostumeOrEvent({ costume: "LEGACY_TEST" }), true);
  assert.equal(eventAssetIsCostumeOrEvent({ form: "galar" }), false);
});

test("le rapport distingue les absences légitimes des erreurs et refuse les reliquats legacy", () => {
  const { report } = engineRun;

  assert.ok(report.diagnosticTaxonomy.LEGITIMATE_ABSENCE.count > 0);
  assert.ok(report.diagnosticTaxonomy.UNSUPPORTED_FORM.count >= 0);
  assert.ok(report.diagnosticTaxonomy.NOT_RANKED.count >= 0);
  assert.equal(report.diagnosticTaxonomy.MAPPING_MISSING.count, 0);
  assert.equal(report.diagnosticTaxonomy.MOVE_MAPPING_MISSING.count, 0);
  assert.equal(report.diagnosticTaxonomy.SOURCE_MISMATCH.count, 1);
  assert.equal(report.diagnosticTaxonomy.SOURCE_MISMATCH.severity, "info");
  assert.ok(report.diagnosticTaxonomy.UNSUPPORTED_FORM.count > 0);
  assert.equal(report.diagnosticTaxonomy.BROKEN_REFERENCE.count, 0);
  assert.equal(report.diagnosticTaxonomy.ORPHAN.count, 0);
  assert.equal(report.diagnosticTaxonomy.MIGRATION_INCOMPLETE.count, 0);
  assert.equal(report.diagnosticTaxonomy.VARIANT_DUPLICATES_CANONICAL_ENTITY.count, 0);
  assert.equal(report.diagnosticTaxonomy.VARIANT_CANONICAL_CATEGORY_FORBIDDEN.count, 0);
  assert.equal(report.diagnosticTaxonomy.VARIANT_KIND_MISSING.count, 0);
  assert.equal(report.diagnosticTaxonomy.VARIANT_KIND_INVALID.count, 0);
  assert.equal(report.diagnosticTaxonomy.VARIANT_AMBIGUOUS.count, 0);
  assert.equal(report.diagnosticTaxonomy.ERROR.count, 0);
  assert.ok(Object.values(report.architecture.legacyRequirements).every((required) => required === false));
  assert.match(report.indexes.strategy, /Map\/Set/);
});

test("une information fournisseur reste visible sans créer une fiche à corriger", () => {
  const skiddo = engineRun.entries.find((entry) => entry.formId === "SKIDDO");
  assert.ok(skiddo.issues.some((issue) => issue.issue === "pvp_provider_source_movepool_mismatch" && issue.severity === "info"));
  assert.equal(skiddo.complete, true);
  assert.equal(skiddo.quality.score, 100);
  assert.deepEqual(skiddo.issueCategories, []);
  const summary = summarizeChecklist(engineRun.entries);
  assert.equal(summary.complete, 1_617);
  assert.equal(summary.issues, 0);
});

test("la checklist n'exige plus l'ancien bloc pvp embarqué", () => {
  const issues = engineRun.entries.flatMap((entry) => entry.issues || []);
  assert.equal(engineRun.report.diagnostics.checklistByCode.type || 0, 0);
  assert.equal(engineRun.report.diagnostics.checklistByCode.release_metadata_conflict || 0, 0);
  assert.equal(issues.some((issue) => /^pvp\.(?:littleCup|greatLeague|ultraLeague|masterLeague)(?:\.|$)/.test(String(issue.path))), false);
  assert.equal(issues.some((issue) => /(?:tierRank|bestMovesets)/.test(String(issue.path))), false);
});

test("le contrôle d'une fiche reprend les diagnostics du fichier dédié résolu par pvpRef", () => {
  const sourceFile = path.join(process.env.POKEMON_GO_DATA_DIR, "data", "pokemon", "dynamax", "0001-bulbasaur-dynamax.json");
  const source = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
  const issues = validateSourceData(source, "data/pokemon/dynamax/0001-bulbasaur-dynamax.json", "dynamax", {
    pvpArchitecture: engineRun.pvpArchitecture,
    customRules: [],
  });
  const mapping = issues.find((issue) => issue.issue === "pvp_mapping_missing");
  assert.equal(mapping, undefined);
  assert.ok(engineRun.report.architecture.pvp.leagueStatusCounts.UNSUPPORTED_FORM > 0);
  assert.equal(issues.some((issue) => String(issue.path).startsWith("pvp.")), false);
});
