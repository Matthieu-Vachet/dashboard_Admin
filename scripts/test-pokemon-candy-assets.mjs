import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { xlCandyRequirement } from "../src/lib/pokemon-candy-assets.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("les vues candy consomment xlImage sans connaître PokemonGo-Assets-API", () => {
  const files = [
    "src/components/admin/pokemon/candy-panel.jsx",
    "src/components/admin/pokemon/detail-modal.jsx",
    "src/components/admin/pokemon/pvp-rankings-panel.jsx",
    "src/components/admin/pokemon/candy-asset-image.jsx",
  ];
  const source = files.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
  assert.match(source, /candy\.xlImage|candyXlImage/);
  assert.doesNotMatch(source, /PokemonGo-Assets-API|xl_candy/);
});

test("l'exigence XL n'invente pas une quantité absente", () => {
  assert.equal(xlCandyRequirement({ pvp: { level: 39.5 } }).label, "Aucun requis");
  assert.equal(xlCandyRequirement({ pvp: { level: 44 } }).label, "Requis · quantité non renseignée");
  assert.equal(xlCandyRequirement({ pvp: { level: 44, xlCandyRequired: 118 } }).quantity, 118);
});
