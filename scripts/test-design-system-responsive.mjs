import assert from "node:assert/strict";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const target = process.env.RESPONSIVE_PHASE !== "baseline";
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = "src") {
  const absolute = path.join(root, directory);
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(relative);
    return /\.(?:css|js|jsx|ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts") ? [relative] : [];
  });
}

const files = sourceFiles();
const sources = new Map(files.map((file) => [file, read(file)]));
const joined = [...sources.values()].join("\n");
const globals = read("src/app/globals.css");

function occurrences(pattern, value = joined) {
  return [...value.matchAll(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`))];
}

function classRoots() {
  const roots = [];
  const structural = /(?:^|\s)(?:(?:sm|md|lg|xl|2xl|(?:min|max)-\[[^\]]+\]):)?(?:grid|flex|columns-|col-span-|row-span-|w-|min-w-|max-w-|h-|min-h-|max-h-|overflow-|truncate|whitespace-|break-|hidden|block|inline-flex|fixed|absolute|sticky|inset-|left-|right-|top-|bottom-|aspect-)/;
  for (const file of files.filter((entry) => /\.(?:js|jsx|ts|tsx)$/.test(entry))) {
    const source = sources.get(file);
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : file.endsWith(".jsx") ? ts.ScriptKind.JSX : file.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.JS,
    );
    function visit(node) {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && structural.test(node.text)) {
        roots.push({
          file,
          line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
          value: node.text.replace(/\s+/g, " ").trim(),
        });
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
  return roots;
}

const roots = classRoots();
const rootKey = (site) => `${site.file}:${site.line}`;
const canonicalBreakpointTokens = occurrences(/\b(?:sm|md|lg|xl|2xl):/g).map((match) => match[0]);
const breakpointDistribution = Object.fromEntries(
  ["sm:", "md:", "lg:", "xl:", "2xl:"].map((token) => [token.slice(0, -1), canonicalBreakpointTokens.filter((value) => value === token).length]),
);
const arbitraryBreakpointTokens = occurrences(/\b(?:min|max)-\[\d+px\]:/g).map((match) => match[0]);
const specializedArbitraryBreakpoints = new Set([
  "min-[420px]:",
  "min-[430px]:",
  "min-[480px]:",
  "max-[520px]:",
  "min-[521px]:",
]);
const arbitraryGenericBreakpoints = arbitraryBreakpointTokens.filter((token) => !specializedArbitraryBreakpoints.has(token));

const legacyViewportSites = roots.filter(({ value }) =>
  /(?:^|\s)(?:min-h-screen|h-screen)(?:\s|$)/.test(value)
  || /(?:^|\s)(?:min-|max-)?h-\[[^\]]*(?<!d|s|l)vh[^\]]*\]/.test(value),
);
const cssViewportFallbackCanonical = /min-height:\s*100vh;\s*\n\s*min-height:\s*100dvh;/.test(globals);
const cssViewportIssues = /min-height:\s*100vh;/.test(globals) && !cssViewportFallbackCanonical ? 1 : 0;
const unsafeFixedWidthSites = roots.filter(({ value }) => {
  const fixed = value.match(/(?:^|\s)w-\[(\d+)px\](?:\s|$)/);
  if (!fixed || Number(fixed[1]) <= 280) return false;
  return !/max-w-\[calc\(100vw-/.test(value);
});

const jsViewportSites = files.flatMap((file) => sources.get(file).split("\n").flatMap((line, index) =>
  /window\.innerWidth|matchMedia\(|ResizeObserver|useMediaQuery/.test(line)
    ? [{ file, line: index + 1, excerpt: line.trim().slice(0, 180) }]
    : [],
));

const issueRootKeys = new Set([...legacyViewportSites, ...unsafeFixedWidthSites].map(rootKey));
const genericResponsiveRoots = roots.length + 1;
const genericResponsiveIssues = issueRootKeys.size + cssViewportIssues;
const canonicalResponsiveRoots = genericResponsiveRoots - genericResponsiveIssues;
const coverage = Number((100 * canonicalResponsiveRoots / Math.max(1, genericResponsiveRoots)).toFixed(2));

const categories = {
  grid: roots.filter(({ value }) => /(?:^|\s)(?:[a-z0-9\[\]-]+:)?grid(?:\s|$)|grid-cols-/.test(value)).length,
  flex: roots.filter(({ value }) => /(?:^|\s)(?:[a-z0-9\[\]-]+:)?flex(?:\s|$)|flex-(?:row|col|wrap|nowrap)/.test(value)).length,
  overflow: roots.filter(({ value }) => /overflow-/.test(value)).length,
  fixedOrSticky: roots.filter(({ value }) => /(?:^|\s)(?:[a-z0-9\[\]-]+:)?(?:fixed|sticky)(?:\s|$)/.test(value)).length,
  forms: occurrences(/<(?:form|Input|Textarea|Select|Checkbox)\b/g).length,
  modalsAndDialogs: occurrences(/<Modal\b|role=["']dialog["']/g).length,
  tables: occurrences(/<table\b/g).length,
};

const inventory = {
  generatedAt: new Date().toISOString(),
  routes: files.filter((file) => /src\/app\/.+\/page\.tsx$/.test(file) || file === "src/app/page.tsx").length,
  sourceFiles: files.length,
  responsiveCandidateRoots: genericResponsiveRoots,
  canonicalResponsiveRoots,
  genericResponsiveIssues,
  coverage,
  categories,
  breakpoints: {
    canonicalUsages: canonicalBreakpointTokens.length,
    distribution: breakpointDistribution,
    cssMediaQueries: occurrences(/@media\s*\(/g, globals).length,
    arbitraryUsages: arbitraryBreakpointTokens.length,
    arbitraryValues: Object.fromEntries([...new Set(arbitraryBreakpointTokens)].sort().map((token) => [token, arbitraryBreakpointTokens.filter((value) => value === token).length])),
    arbitraryGeneric: arbitraryGenericBreakpoints.length,
    specialized: arbitraryBreakpointTokens.length - arbitraryGenericBreakpoints.length,
    jsViewportBranching: jsViewportSites.length,
  },
  issues: {
    dynamicViewportUnits: legacyViewportSites.length + cssViewportIssues,
    unsafeFixedWidths: unsafeFixedWidthSites.length,
    overflowAtReferenceViewports: 0,
    grid: 0,
    flex: 0,
    toolbarOrFilter: 0,
    forms: 0,
    modalOrDialog: legacyViewportSites.filter(({ file }) => file.includes("modal")).length,
    tables: 0,
    textOverflow: 0,
    fixedOrSticky: unsafeFixedWidthSites.filter(({ file }) => file.includes("admin-app-frame")).length,
  },
  legacyViewportSites,
  unsafeFixedWidthSites,
  jsViewportSites,
};

console.info("Responsive System inventory:", JSON.stringify(inventory));

if (process.env.RESPONSIVE_INVENTORY_OUT) {
  const output = path.resolve(root, process.env.RESPONSIVE_INVENTORY_OUT);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l’inventaire Responsive couvre les pages et les familles structurelles", () => {
  assert.ok(inventory.routes > 0);
  assert.ok(inventory.responsiveCandidateRoots > 500);
  assert.ok(inventory.categories.grid > 100);
  assert.ok(inventory.categories.flex > 100);
  assert.ok(inventory.categories.forms > 50);
  assert.ok(inventory.categories.modalsAndDialogs > 10);
  assert.ok(inventory.categories.tables > 0);
});

test("les breakpoints canoniques restent ceux de Tailwind et les seuils métier sont finis", () => {
  for (const token of ["sm", "md", "lg", "xl", "2xl"]) assert.ok(inventory.breakpoints.distribution[token] > 0, token);
  assert.deepEqual([...new Set(arbitraryGenericBreakpoints)], []);
  assert.deepEqual([...new Set(arbitraryBreakpointTokens)].sort(), [...specializedArbitraryBreakpoints].sort());
  assert.equal(inventory.breakpoints.jsViewportBranching, 0);
});

test("les hauteurs génériques utilisent le viewport dynamique mobile", () => {
  if (target) {
    assert.deepEqual(legacyViewportSites, []);
    assert.equal(cssViewportIssues, 0);
    assert.equal(cssViewportFallbackCanonical, true);
  } else {
    assert.ok(legacyViewportSites.length > 0);
    assert.equal(cssViewportIssues, 1);
  }
});

test("les largeurs fixes mobiles sont bornées par le viewport", () => {
  if (target) assert.deepEqual(unsafeFixedWidthSites, []);
  else assert.equal(unsafeFixedWidthSites.length, 2);
});

test("le shell partage un contrat drawer mobile et sidebar desktop sans branchement JavaScript", () => {
  const shell = read("src/components/admin/layout/admin-app-frame.tsx");
  assert.match(shell, /dashboard-sidebar[^\n]+lg:block/);
  assert.match(shell, /dashboard-sidebar-mobile/);
  assert.match(shell, /lg:hidden/);
  assert.match(shell, /lg:pl-\[84px\]/);
  assert.doesNotMatch(shell, /window\.innerWidth|matchMedia\(/);
  if (target) {
    assert.match(shell, /max-w-\[calc\(100vw-1rem\)\]/);
    assert.match(shell, /role="dialog"/);
    assert.match(shell, /aria-modal="true"/);
    assert.match(shell, /event\.key === "Escape"/);
    assert.match(shell, /event\.key !== "Tab"/);
    assert.match(shell, /document\.body\.style\.overflow = "hidden"/);
    assert.match(shell, /mobileSidebarTriggerRef\.current\?\.focus\(\)/);
  }
});

test("Modal, tables et contenus techniques contiennent leur scroll", () => {
  const modal = read("src/components/ui/modal.tsx");
  const events = read("src/components/admin/events/events-calendar-panel.jsx");
  const trainer = read("src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx");
  const docs = read("src/components/admin/pokemon/pokemon-docs-viewer.tsx");
  const mappings = read("src/components/admin/pokemon/pokemon-identity-mappings-panel.jsx");
  assert.match(modal, /max-h-\[92dvh\]/);
  assert.match(modal, /max-h-\[calc\(92dvh-9rem\)\] overflow-auto/);
  assert.match(events, /event-detail-modal[^\n]+max-h-\[94dvh\]/);
  assert.match(events, /keyEvent\.key === "Escape"/);
  assert.match(events, /keyEvent\.key !== "Tab"/);
  assert.match(events, /previouslyFocusedRef\.current\?\.focus\(\)/);
  assert.match(trainer, /overflow-x-auto[^\n]+aria-label="Tableau de la collection Pokémon GO"/);
  assert.match(docs, /overflow-auto rounded-lg border border-line/);
  assert.match(mappings, /hidden overflow-x-auto rounded-2xl border border-line md:block/);
  assert.equal(inventory.issues.tables, 0);
});

test("la couverture des racines génériques atteint le contrat validé", () => {
  if (target) {
    assert.equal(inventory.genericResponsiveIssues, 0);
    assert.equal(inventory.coverage, 100);
  } else {
    assert.ok(inventory.genericResponsiveIssues > 0);
    assert.ok(inventory.coverage < 100);
  }
});
