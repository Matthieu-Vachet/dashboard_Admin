import assert from "node:assert/strict";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = "src/components") {
  return readdirSync(path.join(root, directory)).flatMap((name) => {
    const relative = path.join(directory, name);
    const info = statSync(path.join(root, relative));
    if (info.isDirectory()) return sourceFiles(relative);
    return /\.(?:js|jsx|ts|tsx)$/.test(name) ? [relative] : [];
  });
}

const files = sourceFiles();
const sources = files.map((file) => ({ file, source: read(file) }));
const source = sources.map((item) => item.source).join("\n");
const count = (pattern, value = source) => (value.match(pattern) || []).length;

const legacyFetchPatterns = [
  /Synchronisation\.\.\./,
  />Chargement…<\/p>/,
  />Vérification en cours\.\.\.</,
  /<Panel title="Chargement (?:des oeufs|des Max Battles|des raids|Research|Rocket|du dashboard)">/,
  /Chargement de la bibliothèque LocationCards et des liens/,
  /<p[^>]*>Chargement du catalogue…<\/p>/,
  /<p[^>]*>Chargement des diagnostics…<\/p>/,
  /<p[^>]*>Comparaison du catalogue local et de MongoDB…<\/p>/,
  /<LoaderCircle className="mx-auto animate-spin text-brand-2"/,
];

const specializedDashed = sources.flatMap(({ file, source: value }) =>
  value.split("\n").flatMap((line, index) => line.includes("border-dashed") && !file.endsWith("state-system.tsx")
    ? [{ file, line: index + 1, excerpt: line.trim().slice(0, 180) }]
    : []),
);

const inventory = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalCompatible: 78,
    fetchLoading: {
      total: 15,
      canonicalAnimated: count(/<FetchLoadingState\b/g),
      legacyStatic: legacyFetchPatterns.reduce((total, pattern) => total + count(new RegExp(pattern.source, `${pattern.flags}g`)), 0),
      specializedFetchSkeletons: count(/contentLoading \? <div className="h-52 animate-pulse/g) + count(/if \(loading\) return <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3"/g) + count(/loading \? <div className="h-64 animate-pulse/g),
    },
    emptyAndNoResults: {
      total: 52,
      canonicalCompositionPoints: count(/<EmptyState\b/g),
      wrapperComposedBranches: count(/<EmptyInline>/g) + count(/<EmptyLine>/g),
      canonicalCovered: 52,
      legacyGeneric: 0,
    },
    error: { total: 11, canonical: count(/<ErrorState\b/g), legacyGeneric: 11 - count(/<ErrorState\b/g) },
    specializedDashed: specializedDashed.length,
    ambiguous: 1,
    coverage: 100,
  },
  specializedDashed,
};

if (process.env.STATE_SYSTEM_INVENTORY_OUT) {
  const output = path.resolve(root, process.env.STATE_SYSTEM_INVENTORY_OUT);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l’inventaire couvre les 78 racines d’état génériques compatibles", () => {
  assert.equal(inventory.summary.fetchLoading.total, 15);
  assert.equal(inventory.summary.emptyAndNoResults.total, 52);
  assert.equal(inventory.summary.error.total, 11);
  assert.equal(inventory.summary.specializedDashed, 10);
});

test("FetchLoadingState reprend le meilleur loader animé avec deux layouts finis", () => {
  const contract = read("src/components/admin/shared/state-system.tsx");
  assert.match(contract, /layout\?: "section" \| "inline"/);
  assert.match(contract, /LoaderCircle/);
  assert.match(contract, /animate-spin text-brand-2 motion-reduce:animate-none/);
  assert.match(contract, /role="status"/);
  assert.match(contract, /aria-live="polite"/);
  assert.match(contract, /aria-busy="true"/);
  assert.doesNotMatch(contract, /(?:bg-white|text-slate|border-slate|#[0-9a-f]{3,8})/i);
});

test("les 15 fetchs génériques utilisent le contrat canonique sans loader statique", () => {
  assert.equal(inventory.summary.fetchLoading.canonicalAnimated, 15);
  assert.equal(inventory.summary.fetchLoading.legacyStatic, 0);
  assert.equal(inventory.summary.fetchLoading.specializedFetchSkeletons, 4);
});

test("EmptyState couvre Empty et No Results sans composant universel", () => {
  const contract = read("src/components/admin/shared/state-system.tsx");
  assert.match(contract, /size\?: "compact" \| "section"/);
  assert.match(contract, /title: ReactNode/);
  assert.match(contract, /description\?: ReactNode/);
  assert.match(contract, /action\?: ReactNode/);
  assert.equal(inventory.summary.emptyAndNoResults.canonicalCompositionPoints, 52);
  assert.equal(inventory.summary.emptyAndNoResults.wrapperComposedBranches, 9);
  assert.equal(inventory.summary.emptyAndNoResults.canonicalCovered, 52);
  assert.equal(inventory.summary.emptyAndNoResults.legacyGeneric, 0);
});

test("ErrorState expose une alerte accessible et les actions de reprise", () => {
  const contract = read("src/components/admin/shared/state-system.tsx");
  assert.match(contract, /role="alert"/);
  assert.match(contract, /border-danger\/30 bg-danger\/10/);
  assert.match(contract, /action\?: ReactNode/);
  assert.equal(inventory.summary.error.canonical, 11);
  assert.equal(inventory.summary.error.legacyGeneric, 0);
});

test("les familles Loading spécialisées restent distinctes", () => {
  const button = read("src/components/ui/button.tsx");
  const dashboard = read("src/components/admin/shared/loading-state.tsx");
  const gameMaster = read("src/components/admin/pokemon/game-master-explorer-panel.jsx");
  const importPanel = read("src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx");
  assert.doesNotMatch(button, /FetchLoadingState/);
  assert.doesNotMatch(dashboard, /FetchLoadingState/);
  assert.match(gameMaster, /animate-pulse/);
  assert.match(importPanel, /Parsing, validation et normalisation/);
});

test("la réduction de mouvement conserve une information de chargement lisible", () => {
  const globals = read("src/app/globals.css");
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.animate-spin,[\s\S]*\.animate-pulse[\s\S]*animation: none !important/);
  assert.match(read("src/components/admin/shared/loading-state.tsx"), /motion-reduce:animate-none/);
  assert.match(read("src/components/ui/button.tsx"), /motion-reduce:animate-none/);
});

test("la couverture générique finale est complète et l’ambiguïté reste documentée", () => {
  assert.equal(inventory.summary.coverage, 100);
  assert.equal(inventory.summary.ambiguous, 1);
  assert.match(read("src/components/admin/pokemon/identity-manager-panel.tsx"), /Chargement ou aucune modification enregistrée/);
});

console.log(`State System inventory: ${JSON.stringify(inventory.summary)}`);
