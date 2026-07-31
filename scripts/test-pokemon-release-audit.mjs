import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { compareAuditRows, localAuditRows, parseMargxtAuditHtml } = require("../src/server/pokemon-go/apps/checklist/server/pokemon-release-audit.js");
const fixtures = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "margxt");
const fixture = (name) => fs.readFileSync(path.join(fixtures, `${name}.html`), "utf8");

test("les quatre fixtures Margxt produisent des observations structurées", () => {
  assert.equal(parseMargxtAuditHtml(fixture("missing"), "available").rows[0].expected, false);
  assert.equal(parseMargxtAuditHtml(fixture("shiny"), "shiny").rows[0].dexId, "0001");
  assert.equal(parseMargxtAuditHtml(fixture("costume"), "costume").rows[0].sourceCostume, "Pikachu Willow");
  assert.equal(parseMargxtAuditHtml(fixture("shadow"), "shadow").rows[0].shadowShiny, true);
});

test("isFemale ne crée pas une seconde identité métier de costume", () => {
  const rows = localAuditRows([{ key: "pikachu", dexId: "0025", name: "Pikachu", form: "normal", eventAssets: [
    { form: null, costume: "WILLOW", image: "male.png", shinyImage: "male-s.png", isFemale: false },
    { form: null, costume: "WILLOW", image: "female.png", shinyImage: "female-s.png", isFemale: true },
  ] }], "costume");
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0].genders.sort(), ["female", "male-or-shared"]);
  assert.equal(rows[0].occurrences, 2);
});

test("une source indisponible n'est pas transformée en divergence", () => {
  assert.deepEqual(compareAuditRows("shiny", [], [{ dexId: "0001", shinyReleased: false }]), []);
});
