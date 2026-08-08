import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  ASSET_FAMILY_FIELDS,
  IDENTITY_FIELDS,
  buildAssetArchitectureAudit,
  collectUrls,
  nonEmptyPayload,
} = require("../src/server/pokemon-go/apps/checklist/server/asset-architecture-audit");

test("l'Engine valide toute l'architecture Assets séparée", () => {
  const audit = buildAssetArchitectureAudit();

  assert.equal(audit.summary.valid, true);
  assert.equal(audit.summary.errors, 0);
  assert.equal(audit.summary.sources, 1_611);
  assert.equal(audit.summary.core, 1_611);
  assert.equal(audit.summary.familyRecords, 3_148);
  assert.equal(audit.summary.references, 3_148);
  assert.equal(audit.summary.manifestRecords, 4_759);
  assert.deepEqual(audit.summary.counts, {
    core: 1_611,
    home: 1_089,
    shuffle: 1_512,
    variants: 332,
    "location-cards": 215,
  });
  assert.deepEqual(audit.summary.categoryCounts.core, {
    normal: 1_025,
    forms: 372,
    mega: 58,
    dynamax: 127,
    gigantamax: 29,
  });
  assert.deepEqual(audit.summary.legitimateAbsences, {
    home: 522,
    shuffle: 99,
    variants: 1_279,
    "location-cards": 1_396,
  });
  assert.equal(audit.summary.urls, 21_019);
  assert.equal(audit.summary.uniqueUrls, 16_599);
  assert.equal(audit.summary.temporaryLegacyRefs, 0);
  assert.equal(audit.summary.legacyMonoliths, 0);
  assert.equal(audit.summary.warnings, 0);
  assert.deepEqual(audit.issues, []);
  assert.equal(
    audit.summary.archiveTag,
    "archive/assets-monolithic-before-separated-records-2026-08-08",
  );
});

test("les familles, identités et absences légitimes restent explicites", () => {
  assert.deepEqual(ASSET_FAMILY_FIELDS, {
    home: "home",
    shuffle: "shuffle",
    variants: "variants",
    "location-cards": "locationCards",
  });
  assert.deepEqual(IDENTITY_FIELDS, [
    "id",
    "formId",
    "baseFormId",
    "form",
    "slug",
    "dexNr",
    "dexId",
  ]);
  assert.equal(nonEmptyPayload([]), false);
  assert.equal(nonEmptyPayload({ variants: [] }), false);
  assert.equal(nonEmptyPayload({ image: "https://assets.test/image.png" }), true);
  assert.deepEqual(
    collectUrls({
      image: "https://assets.test/image.png",
      nested: ["pas-une-url", "https://assets.test/shiny.png"],
    }),
    ["https://assets.test/image.png", "https://assets.test/shiny.png"],
  );
});
