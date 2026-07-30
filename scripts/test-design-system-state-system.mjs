import assert from "node:assert/strict";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

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

function componentSites(componentName) {
  return sources.flatMap(({ file, source: value }) => {
    const sourceFile = ts.createSourceFile(
      file,
      value,
      ts.ScriptTarget.Latest,
      true,
      /\.tsx?$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.JSX,
    );
    const sites = [];
    function visit(node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        if (node.tagName.getText(sourceFile) === componentName) {
          const attributes = new Set(node.attributes.properties.flatMap((property) =>
            ts.isJsxAttribute(property) ? [property.name.getText(sourceFile)] : [],
          ));
          sites.push({
            file,
            line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
            attributes,
          });
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return sites;
  });
}

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

const legacyEmptyPatterns = [
  /<p[^>]*>\s*Aucune activité récente détectée\./,
  /<p[^>]*>\s*Aucun import enregistré\./,
  /<p[^>]*>\s*Aucune activité réelle enregistrée\./,
  /<p[^>]*>\s*Aucun mapping pour ces filtres\./,
  /<p[^>]*>\s*Aucun classement PvP pour ces filtres\./,
  /<p[^>]*>\s*Aucun ticket dans cette vue\./,
];

const legacyErrorPatterns = [
  /<Panel title="Erreur dashboard">/,
  /<(?:div|p)[^>]*(?:border-danger|border-red|border-rose)[^>]*>\s*\{(?:error|loadError|errorMessage)\}/,
];

const fetchLoadingSites = componentSites("FetchLoadingState");
const emptyStateSites = componentSites("EmptyState");
const errorStateSites = componentSites("ErrorState");
const legacyFetchCount = legacyFetchPatterns.reduce((total, pattern) => total + count(new RegExp(pattern.source, `${pattern.flags}g`)), 0);
const legacyEmptyCount = legacyEmptyPatterns.reduce((total, pattern) => total + count(new RegExp(pattern.source, `${pattern.flags}g`)), 0);
const legacyErrorCount = legacyErrorPatterns.reduce((total, pattern) => total + count(new RegExp(pattern.source, `${pattern.flags}g`)), 0);

const specializedDashed = sources.flatMap(({ file, source: value }) =>
  value.split("\n").flatMap((line, index) => line.includes("border-dashed") && !file.endsWith("state-system.tsx")
    ? [{ file, line: index + 1, excerpt: line.trim().slice(0, 180) }]
    : []),
);

const inventory = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalCompatible: fetchLoadingSites.length + legacyFetchCount + emptyStateSites.length + legacyEmptyCount + errorStateSites.length + legacyErrorCount,
    fetchLoading: {
      total: fetchLoadingSites.length + legacyFetchCount,
      canonicalAnimated: fetchLoadingSites.length,
      legacyStatic: legacyFetchCount,
      specializedFetchSkeletons: count(/contentLoading \? <div className="h-52 animate-pulse/g) + count(/if \(loading\) return <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3"/g) + count(/loading \? <div className="h-64 animate-pulse/g),
    },
    emptyAndNoResults: {
      total: emptyStateSites.length + legacyEmptyCount,
      canonicalCompositionPoints: emptyStateSites.length,
      wrapperComposedBranches: count(/<EmptyInline>/g) + count(/<EmptyLine>/g),
      canonicalCovered: emptyStateSites.length,
      legacyGeneric: legacyEmptyCount,
    },
    error: { total: errorStateSites.length + legacyErrorCount, canonical: errorStateSites.length, legacyGeneric: legacyErrorCount },
    specializedDashed: specializedDashed.length,
    ambiguous: 1,
    coverage: Number((100 * (fetchLoadingSites.length + emptyStateSites.length + errorStateSites.length) / Math.max(1, fetchLoadingSites.length + legacyFetchCount + emptyStateSites.length + legacyEmptyCount + errorStateSites.length + legacyErrorCount)).toFixed(1)),
  },
  specializedDashed,
};

if (process.env.STATE_SYSTEM_INVENTORY_OUT) {
  const output = path.resolve(root, process.env.STATE_SYSTEM_INVENTORY_OUT);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l’inventaire State System reste exhaustif et auto-cohérent", () => {
  assert.ok(inventory.summary.fetchLoading.total > 0);
  assert.ok(inventory.summary.emptyAndNoResults.total > 0);
  assert.ok(inventory.summary.error.total > 0);
  assert.equal(
    inventory.summary.totalCompatible,
    inventory.summary.fetchLoading.total + inventory.summary.emptyAndNoResults.total + inventory.summary.error.total,
  );
  assert.ok(inventory.summary.specializedDashed > 0);
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

test("tous les fetchs génériques utilisent le contrat canonique sans loader statique", () => {
  assert.equal(inventory.summary.fetchLoading.canonicalAnimated, inventory.summary.fetchLoading.total);
  assert.equal(inventory.summary.fetchLoading.legacyStatic, 0);
  assert.ok(inventory.summary.fetchLoading.specializedFetchSkeletons > 0);
});

test("EmptyState couvre Empty et No Results sans composant universel", () => {
  const contract = read("src/components/admin/shared/state-system.tsx");
  assert.match(contract, /size\?: "compact" \| "section"/);
  assert.match(contract, /title: ReactNode/);
  assert.match(contract, /description\?: ReactNode/);
  assert.match(contract, /action\?: ReactNode/);
  assert.equal(inventory.summary.emptyAndNoResults.canonicalCompositionPoints, inventory.summary.emptyAndNoResults.total);
  assert.ok(inventory.summary.emptyAndNoResults.wrapperComposedBranches > 0);
  assert.equal(inventory.summary.emptyAndNoResults.canonicalCovered, inventory.summary.emptyAndNoResults.total);
  assert.equal(inventory.summary.emptyAndNoResults.legacyGeneric, 0);
});

test("ErrorState expose une alerte accessible et les actions de reprise", () => {
  const contract = read("src/components/admin/shared/state-system.tsx");
  assert.match(contract, /role="alert"/);
  assert.match(contract, /border-danger\/30 bg-danger\/10/);
  assert.match(contract, /action\?: ReactNode/);
  assert.equal(inventory.summary.error.canonical, inventory.summary.error.total);
  assert.equal(inventory.summary.error.legacyGeneric, 0);
  for (const site of errorStateSites) {
    assert.ok(site.attributes.has("message"), `${site.file}:${site.line}: ErrorState requiert message`);
    assert.equal(site.attributes.has("description"), false, `${site.file}:${site.line}: description n'appartient pas au contrat ErrorState`);
  }
});

test("les familles Loading spécialisées restent distinctes", () => {
  const button = read("src/components/ui/button.tsx");
  const dashboard = read("src/components/admin/shared/loading-state.tsx");
  const gameMaster = read("src/components/admin/pokemon/game-master-explorer-panel.jsx");
  assert.doesNotMatch(button, /FetchLoadingState/);
  assert.doesNotMatch(dashboard, /FetchLoadingState/);
  assert.match(gameMaster, /animate-pulse/);
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
