import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  DIAGNOSTIC_CATEGORIES,
  categoryCounts,
  enrichDiagnostic,
} = require("../src/server/pokemon-go/apps/checklist/server/diagnostic-taxonomy.js");

test("la taxonomie Engine expose les neuf catégories demandées", () => {
  assert.deepEqual(DIAGNOSTIC_CATEGORIES, [
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
});

test("les codes post-migration reçoivent une catégorie et un niveau explicites", () => {
  const examples = [
    ["missing", "schema", "error"],
    ["type", "type", "error"],
    ["pvp_mapping_missing", "pokemon-pvpoke-mapping", "warning"],
    ["pvp_move_mapping_missing", "move-mapping", "warning"],
    ["pvp_moveset_outside_local_movepool", "movepool", "warning"],
    ["pvp_provider_source_movepool_mismatch", "source", "info"],
    ["release_metadata_conflict", "release-metadata", "warning"],
    ["pvp_ref_invalid", "reference", "error"],
    ["asset_manifest_hash_mismatch", "architecture", "error"],
    ["LEGACY_EMBEDDED_ASSET_DUPLICATE", "architecture", "warning"],
  ];
  for (const [issue, category, severity] of examples) {
    const result = enrichDiagnostic({
      issue,
      severity: issue === "pvp_provider_source_movepool_mismatch"
        ? "info"
        : ["pvp_ref_invalid", "asset_manifest_hash_mismatch"].includes(issue)
          ? "error"
          : undefined,
    });
    assert.equal(result.diagnosticCategory, category, issue);
    assert.equal(result.severity, severity, issue);
  }
  const counts = categoryCounts(examples.map(([issue]) => enrichDiagnostic({ issue })));
  assert.equal(Object.keys(counts).length, 9);
});

test("la carte Pokémon réserve ‘clés manquantes’ au schéma et affiche les diagnostics classés", () => {
  const source = fs.readFileSync(path.resolve("src/components/admin/pokemon/pokemon-card.jsx"), "utf8");
  assert.match(source, /filter\(\(issue\) => issue\.issue === "missing"\)/);
  assert.match(source, /Schéma · clés manquantes/);
  assert.match(source, /Diagnostics classés/);
  assert.match(source, /Mapping Pokémon PvPoke/);
  assert.doesNotMatch(source, /issue\.issue === "missing" \|\| issue\.category === "custom"/);
});
