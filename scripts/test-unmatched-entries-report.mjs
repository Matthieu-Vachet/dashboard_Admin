import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  UNMATCHED_REASON_CODES,
  createUnmatchedEntriesReport,
  normalizeUnmatchedEntry,
} from "../src/lib/unmatched-entries-report.mjs";

const root = path.resolve(import.meta.dirname, "..");

test("normalise toutes les causes historiques vers les sept codes autorisés", () => {
  const fixtures = [
    ["no match", "NO_CANONICAL_MATCH"],
    ["ambiguous", "AMBIGUOUS_MATCH"],
    ["source_identifier_missing", "SOURCE_ID_UNKNOWN"],
    ["form_unknown", "FORM_MISMATCH"],
    ["costume_asset_not_found", "VARIANT_MISMATCH"],
    ["name differs", "NAME_MISMATCH"],
    ["ALIAS_UNKNOWN", "MISSING_ALIAS"],
  ];
  assert.deepEqual(fixtures.map(([reason]) => normalizeUnmatchedEntry({ sourceId: "25", sourceName: "Pikachu", reason }).reason), UNMATCHED_REASON_CODES);
});

test("le rapport expose le contrat actionnable et signale les anciens rapports incomplets", () => {
  const report = createUnmatchedEntriesReport([
    {
      provider: "snacknap",
      sourceId: "PIKACHU_PARTY",
      sourceName: "Pikachu",
      rawAlias: "pikachu-party",
      reason: "ALIAS_UNKNOWN",
      candidates: [{ canonicalId: "pokemon:0025:normal:party_2020", confidence: 0.82 }],
      localFile: "pokemon/0025-pikachu.json",
    },
  ], { expectedCount: 18 });
  assert.equal(report.schema, "UnmatchedEntriesReport@1");
  assert.equal(report.total, 18);
  assert.equal(report.detailedCount, 1);
  assert.equal(report.missingDetailCount, 17);
  assert.equal(report.complete, false);
  const entry = report.entries[0];
  for (const field of ["provider", "sourceId", "name", "sourceValue", "reason", "candidates", "confidence", "destination", "status"]) {
    assert.ok(Object.hasOwn(entry, field), `champ ${field} absent`);
  }
  assert.equal(entry.reason, "MISSING_ALIAS");
  assert.equal(entry.confidence, 0.82);
  assert.equal(entry.destination, "pokemon/0025-pikachu.json");
});

test("le panneau compact ouvre le rapport générique filtrable", () => {
  const control = fs.readFileSync(path.join(root, "src/components/admin/pokemon/current-dataset-diagnostics.jsx"), "utf8");
  const component = fs.readFileSync(path.join(root, "src/components/admin/pokemon/unmatched-entries-report.jsx"), "utf8");
  assert.match(control, /Voir les \{unmatchedCount\.toLocaleString\("fr-FR"\)\} non-matchés/);
  assert.match(control, /title="Entrées non matchées"/);
  assert.match(control, /<UnmatchedEntriesReport/);
  assert.match(component, /PAGE_SIZE = 50/);
  assert.match(component, /Rechercher dans les non-matchés/);
  assert.match(component, /Filtrer par raison/);
  assert.match(component, /Filtrer par provider/);
  assert.match(component, /Filtrer par statut/);
});
