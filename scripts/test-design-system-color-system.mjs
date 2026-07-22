import assert from "node:assert/strict";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const target = process.env.COLOR_SYSTEM_PHASE !== "baseline";
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = "src") {
  return readdirSync(path.join(root, directory)).flatMap((name) => {
    const relative = path.join(directory, name);
    const info = statSync(path.join(root, relative));
    if (info.isDirectory()) return sourceFiles(relative);
    return /\.(?:css|js|jsx|ts|tsx)$/.test(name) ? [relative] : [];
  });
}

const semanticColors = [
  "background", "foreground", "foreground-secondary", "muted", "disabled", "inverse", "on-accent", "domain-foreground",
  "panel", "panel-strong", "surface-faint", "surface-minimal", "surface-flat", "surface-subtle", "surface-control",
  "surface-control-focus", "surface-interactive", "surface-hover",
  "surface-interactive-hover", "surface-emphasis", "surface-recessed", "surface-inset-subtle", "surface-inset", "surface-inset-medium", "surface-inset-strong",
  "line-subtle", "line", "line-medium", "line-strong", "brand", "brand-2", "brand-3", "warning",
  "warning-foreground", "danger", "danger-foreground", "success", "success-foreground", "overlay",
];
const semanticPrefixes = [...semanticColors, "accent-"];
const neutralFamilies = ["white", "black", "slate", "gray", "zinc", "neutral", "stone"];
const chromaticFamilies = [
  "red", "rose", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink",
];
const colorTokenNames = new Set([
  "background", "foreground", "foreground-secondary", "muted", "disabled", "inverse", "on-accent", "domain-foreground",
  "panel", "panel-strong", "surface-faint", "surface-minimal", "surface-flat", "surface-subtle", "surface-control",
  "surface-control-focus", "surface-interactive", "surface-hover",
  "surface-interactive-hover", "surface-emphasis", "surface-recessed", "surface-inset-subtle", "surface-inset", "surface-inset-medium", "surface-inset-strong", "line-subtle", "line", "line-medium", "line-strong",
  "brand", "brand-2", "brand-3", "accent-primary", "accent-secondary", "accent-tertiary",
  "accent-muted", "accent-glow", "accent-border", "accent-text", "accent-bg", "accent-rgb", "warning",
  "warning-foreground", "danger", "danger-foreground", "success", "success-foreground",
  "overlay",
]);
const domainPath = /(?:\/pokemon\/|\/events\/|\/checklist\/|pokemon-style|pokemon-events|pokemon-canonical|dashboard-palettes\.ts$)/;
const decorativeProperties = new Set(["from", "via", "to", "shadow", "fill", "stroke"]);
const utilityPattern = /(?<![\w-])(?:(?:[A-Za-z0-9_[\].=&-]+):)*(?:bg|text|border|ring|outline|from|via|to|fill|stroke|shadow|divide|placeholder|caret|accent)-(?:\[[^\]\s"'`]+\]|[A-Za-z0-9_.-]+)(?:\/(?:\[[^\]]+\]|[A-Za-z0-9.-]+))?/g;
const variablePattern = /var\(--([A-Za-z0-9-]+)\)/g;
const literalPattern = /#[0-9a-fA-F]{3,8}\b|(?:rgb|rgba|hsl|hsla|oklab|oklch|color)\([^)]*\)/g;

function propertyAndValue(utility) {
  const matches = [...utility.matchAll(/(?:^|:)(bg|text|border|ring|outline|from|via|to|fill|stroke|shadow|divide|placeholder|caret|accent)-(.+)$/g)];
  if (!matches.length) return null;
  return { property: matches.at(-1)[1], value: matches.at(-1)[2] };
}

function familyOf(value) {
  const normalized = value.replace(/^\[/, "").replace(/\].*$/, "").replace(/\/.+$/, "");
  return [...neutralFamilies, ...chromaticFamilies].find((family) => normalized === family || normalized.startsWith(`${family}-`));
}

function isSemantic(value) {
  const normalized = value.replace(/\/.+$/, "");
  return semanticPrefixes.some((name) => normalized === name || (name.endsWith("-") && normalized.startsWith(name)));
}

function isColorUtility(property, value) {
  const family = familyOf(value);
  if (family || isSemantic(value)) return true;
  if (["transparent", "current", "inherit"].includes(value.replace(/\/.+$/, ""))) return true;
  if (value.startsWith("[") && /(?:#|rgb|hsl|oklab|oklch|color\(|var\(--)/i.test(value)) return true;
  return property === "shadow" && value.startsWith("[") && /(?:#|rgb|hsl|oklab|oklch|var\(--)/i.test(value);
}

function isNeutralLiteral(value) {
  const compact = value.toLowerCase().replace(/\s+/g, "");
  if (/^#(?:fff(?:fff)?|000(?:000)?|0f172a|101827|eef3ff|94a3b8|64748b|334155)$/.test(compact)) return true;
  const rgb = compact.match(/^rgba?\((\d+),(\d+),(\d+)/);
  return Boolean(rgb && (rgb[1] === rgb[2] && rgb[2] === rgb[3] || ["15,23,42", "31,45,69", "238,243,255"].includes(`${rgb[1]},${rgb[2]},${rgb[3]}`)));
}

function surroundingLine(source, index) {
  const start = source.lastIndexOf("\n", index) + 1;
  const end = source.indexOf("\n", index);
  return source.slice(start, end === -1 ? source.length : end);
}

function record(records, file, kind, value, category, index, source) {
  records.push({ file, kind, value, category, line: source.slice(0, index).split("\n").length });
}

export function inventoryColorSystem() {
  const records = [];
  for (const file of sourceFiles()) {
    const source = read(file);
    const utilitySpans = [];
    for (const match of source.matchAll(utilityPattern)) {
      const parsed = propertyAndValue(match[0]);
      if (!parsed || !isColorUtility(parsed.property, parsed.value)) continue;
      utilitySpans.push([match.index, match.index + match[0].length]);
      const family = familyOf(parsed.value);
      let category;
      if (parsed.value.replace(/\/.+$/, "") === "domain-foreground") category = "domain";
      else if (isSemantic(parsed.value) || ["transparent", "current", "inherit"].includes(parsed.value.replace(/\/.+$/, ""))) category = "tokenizedGeneric";
      else if (family && neutralFamilies.includes(family)) category = decorativeProperties.has(parsed.property) ? "decorative" : "hardcodedGeneric";
      else if (domainPath.test(file)) category = "domain";
      else if (decorativeProperties.has(parsed.property) || parsed.property === "bg" && parsed.value.startsWith("[")) category = "decorative";
      else category = "ambiguous";
      record(records, file, "tailwind", match[0], category, match.index, source);
    }

    const insideUtility = (index) => utilitySpans.some(([start, end]) => index >= start && index < end);
    for (const match of source.matchAll(variablePattern)) {
      if (insideUtility(match.index)) continue;
      const name = match[1];
      const category = colorTokenNames.has(name) ? "tokenizedGeneric" : name === "widget-accent" ? "domain" : "ambiguous";
      record(records, file, "css-variable", match[0], category, match.index, source);
    }

    for (const match of source.matchAll(literalPattern)) {
      if (insideUtility(match.index)) continue;
      const line = surroundingLine(source, match.index);
      let category;
      if (file === "src/data/dashboard-palettes.ts" || file === "src/constants/admin/dashboard-palettes.ts") category = "tokenizedGeneric";
      else if (file === "src/app/globals.css" && /--(?:background|foreground|muted|disabled|inverse|panel|surface|line|brand|accent|warning|danger|success|overlay)/.test(line)) category = "tokenizedGeneric";
      else if (/\$\{|color-mix|--widget-accent/.test(match[0]) || /\$\{|--widget-accent/.test(line)) category = "ambiguous";
      else if (domainPath.test(file)) category = "domain";
      else if (/gradient|shadow|drop-shadow|filter/.test(line)) category = "decorative";
      else category = isNeutralLiteral(match[0]) ? "hardcodedGeneric" : "decorative";
      record(records, file, "literal", match[0], category, match.index, source);
    }
  }

  const summary = Object.fromEntries(["tokenizedGeneric", "hardcodedGeneric", "domain", "decorative", "ambiguous"].map((category) => [category, records.filter((item) => item.category === category).length]));
  summary.generic = summary.tokenizedGeneric + summary.hardcodedGeneric;
  summary.total = records.length;
  summary.coverage = Number((100 * summary.tokenizedGeneric / Math.max(1, summary.generic)).toFixed(1));
  const patterns = Object.fromEntries(Object.entries(records.reduce((result, item) => {
    const key = `${item.category}:${item.value}`;
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {})).sort((a, b) => b[1] - a[1]));
  return { generatedAt: new Date().toISOString(), summary, patterns, records };
}

const inventory = inventoryColorSystem();
if (process.env.COLOR_SYSTEM_INVENTORY_OUT) {
  const output = path.resolve(root, process.env.COLOR_SYSTEM_INVENTORY_OUT);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l'inventaire couleur couvre les sources applicatives", () => {
  assert.ok(inventory.summary.total > 1_000);
  assert.equal(inventory.summary.total, Object.values(inventory.summary).slice(0, 5).reduce((sum, count) => sum + count, 0));
  assert.ok(inventory.summary.generic > 0);
  assert.ok(inventory.summary.domain > 0);
  assert.ok(inventory.summary.decorative > 0);
});

test("le contrat sémantique dark/light est centralisé", () => {
  const globals = read("src/app/globals.css");
  for (const token of [
    "--background", "--foreground", "--foreground-secondary", "--muted", "--disabled",
    "--inverse", "--on-accent", "--panel", "--panel-strong", "--surface-flat", "--surface-subtle",
    "--surface-control", "--surface-inset", "--surface-inset-strong", "--line", "--line-strong",
    "--success", "--warning", "--danger", "--overlay",
  ]) {
    if (target) assert.equal(globals.match(new RegExp(`${token.replaceAll("-", "\\-")}:`, "g"))?.length, 2, token);
  }
  if (target) {
    assert.match(globals, /--color-surface-flat: var\(--surface-flat\)/);
    assert.match(globals, /--color-foreground-secondary: var\(--foreground-secondary\)/);
    assert.match(globals, /--color-success: var\(--success\)/);
  }
});

test("les primitives consolidées consomment le Color System", () => {
  const primitives = sourceFiles("src/components/ui").map(read).join("\n");
  const forbidden = /(?:bg-white|bg-black|bg-slate|text-white|text-slate|border-white|border-slate)(?:-|\/)/;
  if (target) assert.doesNotMatch(primitives, forbidden);
  else assert.match(primitives, forbidden);
  for (const token of ["text-foreground", "text-muted", "border-line"]) assert.match(primitives, new RegExp(token));
});

test("les équivalences génériques sûres ont été migrées globalement", () => {
  const sources = sourceFiles().map((file) => read(file)).join("\n");
  const legacy = [
    /border-white\/10(?!\d)/, /text-slate-300\b/, /text-slate-400\b/, /text-slate-500\b/,
    /bg-white\/\[0\.045\]/, /bg-white\/\[0\.055\]/, /bg-white\/\[0\.06\]/,
    /bg-slate-950\/35\b/, /bg-slate-950\/45\b/,
  ];
  if (target) for (const pattern of legacy) assert.doesNotMatch(sources, pattern);
  else for (const pattern of legacy) assert.match(sources, pattern);
});

test("les couleurs de statut sont indépendantes des accents de palette", () => {
  const badge = read("src/components/ui/badge.tsx");
  if (target) {
    assert.match(badge, /border-success\/30 bg-success\/10 text-success-foreground/);
    assert.match(badge, /border-warning\/35 bg-warning\/12 text-warning-foreground/);
    assert.match(badge, /border-danger\/35 bg-danger\/12 text-danger-foreground/);
    assert.doesNotMatch(badge, /green: "[^"]*brand-3/);
  }
});

test("la couverture générique progresse sans absorber le domaine", () => {
  if (target) {
    assert.ok(inventory.summary.coverage >= 65, JSON.stringify(inventory.summary));
    assert.ok(inventory.summary.hardcodedGeneric < 750, JSON.stringify(inventory.summary));
    assert.ok(inventory.summary.domain > 250, JSON.stringify(inventory.summary));
  } else {
    assert.ok(inventory.summary.hardcodedGeneric > 750, JSON.stringify(inventory.summary));
  }
});

console.log(`Color System inventory: ${JSON.stringify(inventory.summary)}`);
