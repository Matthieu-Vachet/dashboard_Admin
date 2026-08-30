import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const panel = fs.readFileSync("src/components/admin/pokemon/pvp-rankings-panel.jsx", "utf8");
const styles = fs.readFileSync("src/app/globals.css", "utf8");

test("les cards Legacy utilisent une seule règle visuelle partagée", () => {
  assert.match(panel, /restriction \? "pvp-legacy-move" : ""/);
  assert.equal((styles.match(/\.pvp-legacy-move\s*\{/g) || []).length, 1);
});

test("le badge n'emploie plus le booléen global ambigu du fichier move", () => {
  assert.match(panel, /pvpMoveRestriction\(entry, move, fastMove\)/);
  assert.match(panel, /\{restriction\.label\}/);
  assert.match(panel, /title=\{restriction\.description\}/);
  assert.doesNotMatch(panel, /aria-label=\{`\$\{restriction\.label\}/);
  assert.doesNotMatch(panel, /move\?\.legacy/);
  assert.doesNotMatch(panel, />LEGACY</);
});

test("la lueur Legacy dérive du token d’avertissement adaptatif", () => {
  const rule = styles.match(/\.pvp-legacy-move\s*\{([^}]+)\}/)?.[1] || "";
  assert.match(rule, /outline:/);
  assert.match(rule, /box-shadow:/);
  assert.match(rule, /var\(--warning\)/);
  assert.doesNotMatch(rule, /#[0-9a-f]{3,8}|rgba?\(/i);
  assert.match(styles, /:root\s*\{[\s\S]*?--warning:\s*#ffd166/);
  assert.match(styles, /\.light\s*\{[\s\S]*?--warning:\s*#b7791f/);
});
