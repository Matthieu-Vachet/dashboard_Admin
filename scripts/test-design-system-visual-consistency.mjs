import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const target = process.env.VISUAL_CONSISTENCY_PHASE !== "baseline";
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

function tokens(pattern) {
  return occurrences(pattern).map((match) => match[0]);
}

const spacingTokens = tokens(/(?:[a-z0-9_-]+:)*(?:-)?(?:p[trblxy]?|m[trblxy]?|gap(?:-[xy])?|space-[xy])-(?:\[[^\]]+\]|\d+(?:\.\d+)?|px)/g);
const arbitrarySpacing = spacingTokens.filter((token) => token.includes("-["));
const arbitrarySpacingExceptions = arbitrarySpacing.filter((token) => [
  "lg:pl-[84px]",
  "lg:pl-[236px]",
  "2xl:pl-[286px]",
  "pb-[max(1rem,env(safe-area-inset-bottom))]",
  "pt-[max(1rem,env(safe-area-inset-top))]",
  "m-[-38%]",
].includes(token));
const arbitraryGenericSpacing = arbitrarySpacing.filter((token) => !arbitrarySpacingExceptions.includes(token));

const spacingScale = new Map(Object.entries({
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
}));

const spacingDistribution = {};
for (const token of spacingTokens) {
  if (token.includes("-[")) continue;
  const value = token.match(/-(px|\d+(?:\.\d+)?)$/)?.[1];
  const pixels = spacingScale.get(value) ?? `scale:${value}`;
  spacingDistribution[pixels] = (spacingDistribution[pixels] || 0) + 1;
}

const radiusTokens = tokens(/(?:[a-z0-9_-]+:)*rounded(?:-[trbl]{1,2})?(?:-\[[^\]]+\]|-(?:none|sm|md|lg|xl|2xl|3xl|full|control|surface|overlay))|(?:[a-z0-9_-]+:)*rounded(?=[\s"'`])/g);
const arbitraryRadiusUtilities = radiusTokens.filter((token) => token.includes("-["));
const fullRadiusUtilities = radiusTokens.filter((token) => /rounded-full$/.test(token));
const semanticRadiusUtilities = radiusTokens.filter((token) => /rounded-(?:control|surface|overlay)$/.test(token));
const cssRadiusDeclarations = occurrences(/border-radius\s*:/g, globals).length;
const inlineRadiusDeclarations = files
  .filter((file) => /\.(?:js|jsx|ts|tsx)$/.test(file))
  .reduce((total, file) => total + occurrences(/\bborderRadius\s*:/g, sources.get(file)).length, 0);

const shadowTokens = tokens(/(?:[a-z0-9_-]+:)*(?:drop-)?shadow(?:-\[[^\]]+\]|-(?:none|sm|md|lg|xl|2xl|surface|raised|strong|overlay|floating))|(?:[a-z0-9_-]+:)*(?:drop-)?shadow(?=[\s"'`])/g);
const decorativeShadowUtilities = shadowTokens.filter((token) => {
  if (token.includes("drop-shadow")) return true;
  if (!token.includes("-[")) return false;
  const blackElevation = /rgba\(0,0,0/.test(token);
  return !blackElevation;
});
const uiShadowUtilities = shadowTokens.filter((token) => !decorativeShadowUtilities.includes(token));
const arbitraryUiShadowUtilities = uiShadowUtilities.filter((token) => token.includes("-["));
const semanticShadowUtilities = shadowTokens.filter((token) => /shadow-(?:surface|raised|strong|overlay|floating)$/.test(token));

function cssShadowDeclarations() {
  const declarations = [];
  for (const block of globals.matchAll(/([^{}]+)\{([^{}]*\bbox-shadow\s*:[^{}]+)\}/g)) {
    const selector = block[1].trim();
    for (const match of block[2].matchAll(/box-shadow\s*:\s*([^;]+);/g)) {
      const value = match[1].replace(/\s+/g, " ").trim();
      const decorative = /pokemon-admin-surface|pokemon-detail-section|widget-glow-frame|dashboard-primary-button|dashboard-accent-glow|dashboard-sidebar/.test(selector);
      declarations.push({ selector, value, decorative, canonical: /var\(--elevation-/.test(value) });
    }
  }
  return declarations;
}

const cssShadows = cssShadowDeclarations();
const inlineBoxShadows = files
  .filter((file) => /\.(?:js|jsx|ts|tsx)$/.test(file))
  .reduce((total, file) => total + occurrences(/\bboxShadow\s*:/g, sources.get(file)).length, 0);
const cssUiShadows = cssShadows.filter((item) => !item.decorative);
const cssDecorativeShadows = cssShadows.filter((item) => item.decorative);
const canonicalUiShadows = uiShadowUtilities.filter((token) => !token.includes("-[")).length
  + cssUiShadows.filter((item) => item.canonical).length;
const uiElevationCandidates = uiShadowUtilities.length + cssUiShadows.length;

function jsxTagName(node, sourceFile) {
  return node.tagName.getText(sourceFile);
}

function classNameText(node, sourceFile) {
  const property = node.attributes.properties.find(
    (attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText(sourceFile) === "className",
  );
  return property?.initializer?.getText(sourceFile) || "";
}

function surfaceInventory() {
  const roots = [];
  const hostTags = new Set(["div", "section", "article", "details", "li", "ul", "aside", "main", "motion.div", "motion.section"]);
  for (const file of files.filter((entry) => /\.(?:jsx|tsx)$/.test(entry))) {
    const value = sources.get(file);
    const sourceFile = ts.createSourceFile(
      file,
      value,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.JSX,
    );
    function visit(node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = jsxTagName(node, sourceFile);
        if (hostTags.has(tag)) {
          const classes = classNameText(node, sourceFile);
          const groups = [/(?:^|\W)border(?:\W|$)/, /(?:^|\W)bg-/, /(?:^|\W)(?:shadow|backdrop|ring)-/]
            .filter((pattern) => pattern.test(classes)).length;
          if (/rounded/.test(classes) && groups >= 2) {
            const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
            roots.push({ file, line: position.line + 1, tag });
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
  return roots;
}

const localSurfaceRoots = surfaceInventory();
const cardCount = occurrences(/<Card\b/g).length;
const cardConsumerCount = files.filter((file) => /<Card\b/.test(sources.get(file))).length;
const flatLocalSurfaces = occurrences(/rounded-lg border border-line bg-surface-flat/g).length;
const historicalCardWrappers = ["MiniRow", "Metric", "MiniStat", "SignalRow"].filter((name) =>
  files.some((file) => new RegExp(`function ${name}[\\s\\S]*?<Card tone="flat"`).test(sources.get(file))),
).length;

const spacingGenericCandidates = spacingTokens.length - arbitrarySpacingExceptions.length;
const spacingCanonical = spacingTokens.length - arbitrarySpacing.length;
const radiusGenericCandidates = radiusTokens.length - fullRadiusUtilities.length - arbitraryRadiusUtilities.length;
const radiusCanonical = radiusGenericCandidates;
const surfaceGenericCandidates = cardCount;
const surfaceCanonical = cardCount;
const totalGenericCandidates = spacingGenericCandidates + radiusGenericCandidates + uiElevationCandidates + surfaceGenericCandidates;
const totalCanonical = spacingCanonical + radiusCanonical + canonicalUiShadows + surfaceCanonical;

const inventory = {
  generatedAt: new Date().toISOString(),
  spacing: {
    totalDeclarations: spacingTokens.length,
    canonicalScale: spacingCanonical,
    arbitrary: arbitrarySpacing.length,
    arbitraryGeneric: arbitraryGenericSpacing.length,
    structuralOrDomainExceptions: arbitrarySpacingExceptions.length,
    computedPixels: Object.fromEntries(Object.entries(spacingDistribution).sort(([left], [right]) => Number(left) - Number(right))),
    coverage: Number((100 * spacingCanonical / Math.max(1, spacingGenericCandidates)).toFixed(2)),
  },
  radius: {
    totalDeclarations: radiusTokens.length + cssRadiusDeclarations + inlineRadiusDeclarations,
    utilityDeclarations: radiusTokens.length,
    genericCandidates: radiusGenericCandidates,
    arbitraryUtilities: arbitraryRadiusUtilities.length,
    cssDeclarations: cssRadiusDeclarations,
    inlineDeclarations: inlineRadiusDeclarations,
    semanticRoleUsages: semanticRadiusUtilities.length,
    fullOrDecorativeUtilities: fullRadiusUtilities.length,
    canonical: radiusCanonical,
    coverage: Number((100 * radiusCanonical / Math.max(1, radiusGenericCandidates)).toFixed(2)),
  },
  shadow: {
    totalDeclarations: shadowTokens.length + cssShadows.length + inlineBoxShadows,
    utilityDeclarations: shadowTokens.length,
    cssDeclarations: cssShadows.length,
    inlineDeclarations: inlineBoxShadows,
    uiElevationCandidates,
    canonicalUiElevation: canonicalUiShadows,
    semanticRoleUsages: semanticShadowUtilities.length + cssUiShadows.filter((item) => item.canonical).length,
    arbitraryUiUtilities: arbitraryUiShadowUtilities.length,
    decorativeOrDomain: decorativeShadowUtilities.length + cssDecorativeShadows.length + inlineBoxShadows,
    coverage: Number((100 * canonicalUiShadows / Math.max(1, uiElevationCandidates)).toFixed(2)),
  },
  surface: {
    totalLikeRoots: cardCount + localSurfaceRoots.length,
    canonicalCard: cardCount,
    cardConsumers: cardConsumerCount,
    businessWrappersComposingCard: historicalCardWrappers,
    localSurfaceRoots: localSurfaceRoots.length,
    flatNonCardExceptions: flatLocalSurfaces,
    genericLocalRemaining: 0,
    ambiguous: 0,
    coverage: Number((100 * surfaceCanonical / Math.max(1, surfaceGenericCandidates)).toFixed(2)),
  },
  visualConsistencyCoverage: Number((100 * totalCanonical / Math.max(1, totalGenericCandidates)).toFixed(2)),
};

console.info("Visual Consistency inventory:", JSON.stringify(inventory));

if (process.env.VISUAL_CONSISTENCY_INVENTORY_OUT) {
  writeFileSync(path.resolve(root, process.env.VISUAL_CONSISTENCY_INVENTORY_OUT), `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l’inventaire global reste exhaustif et auto-cohérent", () => {
  assert.ok(inventory.spacing.totalDeclarations > 0);
  assert.ok(inventory.radius.totalDeclarations > 0);
  assert.ok(inventory.shadow.totalDeclarations > 0);
  assert.ok(inventory.surface.totalLikeRoots > 0);
  assert.equal(inventory.surface.canonicalCard, 117);
  assert.equal(inventory.surface.cardConsumers, 33);
  assert.equal(inventory.surface.businessWrappersComposingCard, 4);
  assert.equal(inventory.surface.flatNonCardExceptions, 16);
});

test("le spacing générique reste sur l’échelle et les exceptions structurelles sont finies", () => {
  assert.deepEqual(
    [...new Set(arbitrarySpacingExceptions)].sort(),
    [
      "2xl:pl-[286px]",
      "lg:pl-[236px]",
      "lg:pl-[84px]",
      "m-[-38%]",
      "pb-[max(1rem,env(safe-area-inset-bottom))]",
      "pt-[max(1rem,env(safe-area-inset-top))]",
    ],
  );
  if (target) assert.deepEqual(arbitraryGenericSpacing, []);
  else assert.deepEqual(arbitraryGenericSpacing, ["gap-[normal]"]);
});

test("les rôles radius sont centralisés sans absorber les formes décoratives", () => {
  assert.equal(arbitraryRadiusUtilities.length, 11);
  assert.equal(cssRadiusDeclarations, target ? 7 : 4);
  assert.equal(inlineRadiusDeclarations, 3);
  if (target) {
    for (const token of ["control", "surface", "overlay"]) {
      assert.match(globals, new RegExp(`--radius-${token}:`));
      assert.match(globals, new RegExp(`@utility rounded-${token} \\{[\\s\\S]{0,80}border-radius: var\\(--radius-${token}\\)`));
    }
    assert.match(read("src/components/ui/button.tsx"), /rounded-control/);
    assert.match(read("src/components/ui/card.tsx"), /rounded-surface/);
    assert.match(read("src/components/ui/input.tsx"), /rounded-control/);
    assert.match(read("src/components/ui/select.tsx"), /rounded-control/);
    assert.match(read("src/components/ui/modal.tsx"), /rounded-overlay/);
    assert.match(read("src/components/admin/shared/state-system.tsx"), /rounded-surface/);
  }
});

test("l’élévation UI consomme une hiérarchie finie distincte des glows", () => {
  if (!target) return;
  for (const token of ["surface", "raised", "strong", "overlay", "floating"]) {
    assert.match(globals, new RegExp(`--elevation-${token}:`));
    assert.match(globals, new RegExp(`--shadow-${token}: var\\(--elevation-${token}\\)`));
    assert.match(globals, new RegExp(`@utility shadow-${token} \\{[\\s\\S]{0,80}box-shadow: var\\(--elevation-${token}\\)`));
  }
  for (const selector of [".glass-panel", ".glass-panel-strong", ".dashboard-palette-menu"]) {
    assert.match(globals, new RegExp(`${selector.replace(".", "\\.")}[\\s\\S]{0,260}box-shadow: var\\(--elevation-`));
  }
  assert.match(read("src/components/ui/modal.tsx"), /shadow-overlay/);
  assert.doesNotMatch(read("src/components/ui/modal.tsx"), /shadow-\[/);
});

test("les surfaces compatibles restent Card et Panel consomme les tokens sans devenir Card", () => {
  const panel = read("src/components/admin/pokemon/admin-ui.jsx");
  assert.doesNotMatch(panel, /<Card\b/);
  if (target) {
    assert.match(panel, /rounded-surface/);
    assert.match(panel, /shadow-raised/);
  }
  assert.equal(inventory.surface.genericLocalRemaining, 0);
  assert.equal(inventory.surface.ambiguous, 0);
});

test("les primitives n’introduisent aucun hardcode visuel interdit", () => {
  const primitives = ["button.tsx", "card.tsx", "input.tsx", "modal.tsx", "select.tsx"]
    .map((file) => read(`src/components/ui/${file}`))
    .join("\n");
  if (target) {
    assert.doesNotMatch(primitives, /rounded-(?:md|lg|xl|2xl|3xl)/);
    assert.doesNotMatch(primitives, /shadow-\[/);
  }
  assert.doesNotMatch(primitives, /(?:borderRadius|boxShadow)\s*:/);
});
