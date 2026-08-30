import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const dashboardRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.env.POKEMON_GO_DATA_DIR ||= path.resolve(dashboardRoot, "..", "PokemonGo-Data");

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
  assert.equal(audit.summary.sources, 1_617);
  assert.equal(audit.summary.core, 1_617);
  assert.equal(audit.summary.familyRecords, 3_030);
  assert.equal(audit.summary.references, 3_030);
  assert.equal(audit.summary.manifestRecords, 4_647);
  assert.deepEqual(audit.summary.counts, {
    core: 1_617,
    home: 1_092,
    shuffle: 1_512,
    variants: 211,
    "location-cards": 215,
  });
  assert.deepEqual(audit.summary.categoryCounts.core, {
    normal: 1_025,
    alola: 18,
    galar: 20,
    hisui: 17,
    paldea: 4,
    forms: 316,
    mega: 59,
    primal: 2,
    dynamax: 127,
    gigantamax: 29,
  });
  assert.deepEqual(audit.summary.legitimateAbsences, {
    home: 525,
    shuffle: 105,
    variants: 1_406,
    "location-cards": 1_402,
  });
  assert.equal(audit.summary.urls, 20_345);
  assert.equal(audit.summary.uniqueUrls, 16_609);
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
