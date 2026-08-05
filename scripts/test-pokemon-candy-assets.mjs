import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { xlCandyRequirement } from "../src/lib/pokemon-candy-assets.mjs";
import {
  candyFamilyContrast,
  contrastRatio,
  normalizeCandyColor,
} from "../src/lib/candy-family-contrast.mjs";

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

test("les en-têtes de famille garantissent un contraste WCAG AA sur toutes les palettes", () => {
  const palettes = [
    [{ r: 255, g: 255, b: 255, a: 1 }, { r: 255, g: 0, b: 255, a: 1 }],
    [{ r: 4, g: 9, b: 22, a: 1 }, { r: 22, g: 35, b: 61, a: 1 }],
    [{ r: 255, g: 28, b: 28, a: 1 }, { r: 0, g: 244, b: 255, a: 1 }],
    ["#f4c7df", "rgb(194, 235, 210)"],
  ];
  for (const [primary, secondary] of palettes) {
    const result = candyFamilyContrast(primary, secondary);
    assert.ok(result.minimumContrast >= 4.5, `${result.minimumContrast} pour ${JSON.stringify([primary, secondary])}`);
    assert.match(result.foreground, /^rgb\(/);
    assert.match(result.overlay, /^rgba\(/);
  }
});

test("le parseur couleur accepte objets, hex et rgba sans casser les valeurs fractionnaires", () => {
  assert.deepEqual(normalizeCandyColor({ red: 1, green: 0.5, blue: 0, alpha: 0.75 }), { r: 255, g: 128, b: 0, a: 0.75 });
  assert.deepEqual(normalizeCandyColor("#37cba8"), { r: 55, g: 203, b: 168, a: 1 });
  assert.deepEqual(normalizeCandyColor("rgba(255, 0, 255, .5)"), { r: 255, g: 0, b: 255, a: 0.5 });
  assert.deepEqual(normalizeCandyColor("rgb(1, 2, 3)"), { r: 1, g: 2, b: 3, a: 1 });
  assert.deepEqual(normalizeCandyColor("rgb(100% 50% 0% / 75%)"), { r: 255, g: 127, b: 0, a: 0.75 });
  assert.equal(Number(contrastRatio({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }).toFixed(1)), 21);
});

test("le composant Candies applique la stratégie centrale aux labels BONBON et BONBON XL", () => {
  const panel = fs.readFileSync(path.join(root, "src/components/admin/pokemon/candy-panel.jsx"), "utf8");
  const asset = fs.readFileSync(path.join(root, "src/components/admin/pokemon/candy-asset-image.jsx"), "utf8");
  assert.match(panel, /candyFamilyContrast\(group\.primaryColor, group\.secondaryColor\)/);
  assert.equal((panel.match(/highContrast/g) || []).length, 2);
  assert.match(asset, /text-current opacity-90/);
});
