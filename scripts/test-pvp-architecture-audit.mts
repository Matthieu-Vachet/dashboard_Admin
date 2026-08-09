import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  LEAGUE_STATUSES,
  MONTHLY_FRESHNESS_DAYS,
  buildPvpArchitectureAudit,
} = require("../src/server/pokemon-go/apps/checklist/server/pvp-architecture-audit");

test("l'Engine couvre l'architecture PvP dédiée et son snapshot mensuel", () => {
  const audit = buildPvpArchitectureAudit({ now: "2026-08-08T18:30:00.000Z" });
  const forbiddenIntegrityCodes = new Set([
    "pvp_ref_missing",
    "pvp_ref_invalid",
    "pvp_ref_collision",
    "pvp_orphan_record",
    "pvp_manifest_count_mismatch",
    "pvp_manifest_hash_mismatch",
    "pvp_manifest_reference_mismatch",
    "pvp_identity_mismatch",
    "pvp_snapshot_commit_mismatch",
    "pvp_snapshot_source_mismatch",
    "pvp_move_category_mismatch",
    "pvp_move_metrics_missing",
    "pvp_fast_metrics_mismatch",
    "pvp_charged_metrics_mismatch",
    "pvp_elite_move_duplicate",
    "pvp_xl_asset_missing",
    "pvp_league_status_invalid",
    "PVP_WRONG_CATEGORY_DIRECTORY",
    "REFERENCE_CATEGORY_MISMATCH",
    "ENTITY_CLASSIFICATION_AMBIGUOUS",
  ]);

  assert.equal(audit.summary.records, 1_611);
  assert.equal(audit.summary.valid, true);
  assert.equal(audit.summary.errors, 0);
  assert.equal(audit.summary.references, audit.summary.records);
  assert.equal(audit.summary.manifestRecords, audit.summary.records);
  assert.deepEqual(audit.summary.categoryCounts, {
    normal: 1_025,
    forms: 372,
    mega: 58,
    dynamax: 127,
    gigantamax: 29,
  });
  assert.equal(audit.summary.monthlyFresh, true);
  assert.equal(audit.summary.freshnessDays, 0);
  assert.equal(audit.summary.mappingWarnings, 0);
  assert.equal(audit.summary.providerPokemonMappings, 1_736);
  assert.equal(audit.summary.providerMoveMappings, 347);
  assert.equal(
    audit.summary.sourceCommit,
    "5aa3fe6e99c270c3b0404e3135960ce943fa582a",
  );
  assert.equal(
    audit.issues.filter((diagnostic: { issue: string }) =>
      forbiddenIntegrityCodes.has(diagnostic.issue),
    ).length,
    0,
  );
  assert.equal(audit.summary.movesetAudit.auditedOccurrences, 96);
  assert.equal(audit.summary.movesetAudit.openOccurrences, 0);
  assert.equal(
    audit.issues.filter((diagnostic: { issue: string }) => diagnostic.issue === "pvp_moveset_outside_local_movepool").length,
    0,
  );
  assert.equal(
    audit.issues.filter((diagnostic: { issue: string }) => diagnostic.issue === "pvp_provider_source_movepool_mismatch").length,
    1,
  );
  assert.equal(
    (audit.diagnosticsBySource.get("pokemon/0001-bulbasaur.json") || []).filter(
      (diagnostic: { severity: string }) => diagnostic.severity === "error",
    ).length,
    0,
  );
});

test("les statuts et la fenêtre de fraîcheur PvP restent explicites", () => {
  assert.equal(MONTHLY_FRESHNESS_DAYS, 45);
  assert.deepEqual(
    [...LEAGUE_STATUSES],
    [
      "RANKED",
      "NOT_RANKED",
      "NOT_ELIGIBLE",
      "UNRELEASED",
      "MAPPING_MISSING",
      "SOURCE_MISSING",
      "FORMAT_EXCLUDED",
      "UNSUPPORTED_FORM",
    ],
  );
});
