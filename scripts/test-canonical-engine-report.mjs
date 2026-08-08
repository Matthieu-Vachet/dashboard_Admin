import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

process.env.POKEMON_GO_DATA_DIR = path.resolve(process.cwd(), "../PokemonGo-Data");
const require = createRequire(import.meta.url);
const { buildCanonicalEngineReport } = require("../src/server/pokemon-go/apps/checklist/server/engine.js");
const engineRun = buildCanonicalEngineReport([]);

test("le véritable Engine produit un rapport global sérialisable et mesuré", () => {
  const { report } = engineRun;

  assert.equal(report.reportId, "ENGINE-CANONICAL-ARCHITECTURE-001");
  assert.equal(report.status, "VALID_WITH_DIAGNOSTICS");
  assert.equal(report.coverage.pokemonAndForms, 1_611);
  assert.equal(report.coverage.assetCore, 1_611);
  assert.equal(report.coverage.assetFamilies, 3_147);
  assert.equal(report.coverage.pvpRecords, 1_611);
  assert.equal(report.architecture.assets.valid, true);
  assert.equal(report.architecture.pvp.valid, true);
  assert.deepEqual(new Set(report.architecture.categories), new Set([
    "NORMAL",
    "FORM",
    "MEGA",
    "DYNAMAX",
    "GIGANTAMAX",
  ]));
  assert.ok(Number.isFinite(report.performance.durationMs));
  assert.ok(report.performance.durationMs >= 0);
  assert.ok(report.performance.memoryAfter.heapUsedBytes > 0);
  assert.doesNotThrow(() => JSON.stringify(report));
});

test("le rapport distingue les absences légitimes des erreurs et refuse les reliquats legacy", () => {
  const { report } = engineRun;

  assert.ok(report.diagnosticTaxonomy.LEGITIMATE_ABSENCE.count > 0);
  assert.ok(report.diagnosticTaxonomy.UNSUPPORTED_FORM.count >= 0);
  assert.ok(report.diagnosticTaxonomy.NOT_RANKED.count >= 0);
  assert.ok(report.diagnosticTaxonomy.MAPPING_MISSING.count > 0);
  assert.equal(report.diagnosticTaxonomy.BROKEN_REFERENCE.count, 0);
  assert.equal(report.diagnosticTaxonomy.ORPHAN.count, 0);
  assert.equal(report.diagnosticTaxonomy.MIGRATION_INCOMPLETE.count, 0);
  assert.equal(report.diagnosticTaxonomy.ERROR.count, 0);
  assert.ok(Object.values(report.architecture.legacyRequirements).every((required) => required === false));
  assert.match(report.indexes.strategy, /Map\/Set/);
});
