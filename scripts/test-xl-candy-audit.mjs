import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { auditXlCandyAssets } = require("../src/server/pokemon-go/apps/checklist/server/workshop.js");

test("l'audit XL sépare manquants, orphelins, doublons et noms invalides", () => {
  const inventory = new Map([[1, ["pokemon/0001.json"]], [4, ["pokemon/0004.json"]], [25, ["pokemon/0025.json"]]]);
  const result = auditXlCandyAssets([
    { type: "blob", path: "xl_candy/1.png" },
    { type: "blob", path: "xl_candy/4.png" },
    { type: "blob", path: "xl_candy/4.png" },
    { type: "blob", path: "xl_candy/9999.png" },
    { type: "blob", path: "xl_candy/025.PNG" },
    { type: "blob", path: "candy/25.png" },
  ], inventory);
  assert.deepEqual(result.missing.map((item) => item.familyId), [25]);
  assert.deepEqual(result.orphans.map((item) => item.familyId), [9999]);
  assert.equal(result.duplicates[0].familyId, 4);
  assert.equal(result.invalid[0].path, "xl_candy/025.PNG");
});

test("une bibliothèque distante indisponible ne devient pas une divergence", () => {
  const result = auditXlCandyAssets(null, new Map([[1, []]]));
  assert.equal(result.status, "source-unavailable");
  assert.deepEqual(result.missing, []);
});
