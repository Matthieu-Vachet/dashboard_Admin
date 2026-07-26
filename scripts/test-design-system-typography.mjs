import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const target = process.env.TYPOGRAPHY_PHASE !== "baseline";
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

function matches(pattern, value = joined) {
  return [...value.matchAll(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`))];
}

function tokens(pattern) {
  return matches(pattern).map((match) => match[0]);
}

const prefix = String.raw`(?:[a-z0-9_-]+:)*`;
const sizeTokens = tokens(new RegExp(`${prefix}text-(?:xs|sm|base|lg|xl|[2-9]xl|\\[[^\\]]+\\])`, "g"));
const weightTokens = tokens(new RegExp(`${prefix}font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\\[[^\\]]+\\])`, "g"));
const familyTokens = tokens(new RegExp(`${prefix}font-(?:sans|mono)`, "g"));
const leadingTokens = tokens(new RegExp(`${prefix}leading-(?:none|tight|snug|normal|relaxed|loose|[3-9]|10|\\[[^\\]]+\\])`, "g"));
const trackingTokens = tokens(new RegExp(`${prefix}tracking-(?:tighter|tight|normal|wide|wider|widest|\\[[^\\]]+\\])`, "g"));
const semanticRoles = [
  "display",
  "title-page",
  "title-section",
  "title-subsection",
  "title-card",
  "title-inline",
  "body",
  "body-strong",
  "label",
  "caption",
  "caption-strong",
  "overline",
  "overline-compact",
  "control",
  "control-strong",
];
const semanticRoleTokens = tokens(new RegExp(`${prefix}type-(?:${semanticRoles.join("|")})(?=[\\s\"'\\x60}])`, "g"));

const stripVariant = (token) => token.replace(/^(?:(?:[a-z0-9_-]+):)+/, "");
const distribution = (values) => Object.fromEntries(
  [...values.reduce((map, token) => {
    const value = stripVariant(token);
    map.set(value, (map.get(value) || 0) + 1);
    return map;
  }, new Map())].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])),
);

const arbitrarySizeTokens = sizeTokens.filter((token) => token.includes("-["));
const arbitraryWeightTokens = weightTokens.filter((token) => token.includes("-["));
const arbitraryLeadingTokens = leadingTokens.filter((token) => token.includes("-["));
const arbitraryTrackingTokens = trackingTokens.filter((token) => token.includes("-["));
const responsiveTokens = [...sizeTokens, ...weightTokens, ...leadingTokens, ...trackingTokens]
  .filter((token) => /^(?:sm|md|lg|xl|2xl):/.test(token));
const inlineDeclarations = files
  .filter((file) => /\.(?:js|jsx|ts|tsx)$/.test(file))
  .reduce((total, file) => total + matches(/\b(?:fontFamily|fontSize|fontWeight|lineHeight|letterSpacing)\s*:/g, sources.get(file)).length, 0);
const cssDeclarations = matches(/\b(?:font-family|font-size|font-weight|line-height|letter-spacing)\s*:/g, globals).length;

function classStrings() {
  const values = [];
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
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        if (/(?:text-|font-|leading-|tracking-|type-)/.test(node.text)) values.push({ file, value: node.text });
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
  return values;
}

function classifyClassString(value) {
  const set = new Set(value.split(/\s+/).filter(Boolean));
  const hasSemantic = [...set].some((token) => {
    const bare = stripVariant(token);
    return bare.startsWith("type-") && semanticRoles.includes(bare.slice(5));
  });
  if (hasSemantic) return "semantic";
  const mono = set.has("font-mono");
  const uppercase = set.has("uppercase");
  const weight = ["font-medium", "font-semibold", "font-bold", "font-black"].find((token) => set.has(token));
  const size = ["text-xs", "text-sm", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-[10px]", "text-[11px]"].find((token) => set.has(token));
  const tracking = [...set].find((token) => /^tracking-/.test(token));
  const largeResponsiveJump = ["sm:text-5xl", "sm:text-6xl", "md:text-[2.5rem]"].some((token) => set.has(token));
  if (!mono && uppercase && weight === "font-black" && tracking && ["text-xs", "text-[10px]", "text-[11px]"].includes(size)) return "generic-overline";
  if (!mono && !largeResponsiveJump && weight === "font-black" && ["text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl"].includes(size)) return "generic-heading";
  if (!mono && !uppercase && size === "text-sm" && ["font-medium", "font-semibold", "font-bold"].includes(weight) && (set.has("leading-6") || set.has("leading-5"))) return "generic-body";
  if (!mono && !uppercase && size === "text-xs" && ["font-semibold", "font-bold", "font-black"].includes(weight)) return "generic-caption-label";
  return "domain-decorative-ambiguous";
}

const strings = classStrings();
const classifications = strings.map((entry) => ({ ...entry, category: classifyClassString(entry.value) }));
const semanticClassStrings = classifications.filter((entry) => entry.category === "semantic");
const legacyGenericClassStrings = classifications.filter((entry) => entry.category.startsWith("generic-"));
const domainDecorativeAmbiguous = classifications.filter((entry) => entry.category === "domain-decorative-ambiguous");
const genericCandidates = semanticClassStrings.length + legacyGenericClassStrings.length;

const inventory = {
  generatedAt: new Date().toISOString(),
  declarations: {
    total: sizeTokens.length + weightTokens.length + familyTokens.length + leadingTokens.length + trackingTokens.length + inlineDeclarations + cssDeclarations,
    size: sizeTokens.length,
    weight: weightTokens.length,
    family: familyTokens.length,
    leading: leadingTokens.length,
    tracking: trackingTokens.length,
    css: cssDeclarations,
    inline: inlineDeclarations,
    responsive: responsiveTokens.length,
  },
  variants: {
    size: distribution(sizeTokens),
    weight: distribution(weightTokens),
    family: distribution(familyTokens),
    leading: distribution(leadingTokens),
    tracking: distribution(trackingTokens),
  },
  arbitrary: {
    total: arbitrarySizeTokens.length + arbitraryWeightTokens.length + arbitraryLeadingTokens.length + arbitraryTrackingTokens.length,
    size: distribution(arbitrarySizeTokens),
    weight: distribution(arbitraryWeightTokens),
    leading: distribution(arbitraryLeadingTokens),
    tracking: distribution(arbitraryTrackingTokens),
  },
  classification: {
    classStrings: strings.length,
    genericCandidates,
    semantic: semanticClassStrings.length,
    legacyGeneric: legacyGenericClassStrings.length,
    domainDecorativeAmbiguous: domainDecorativeAmbiguous.length,
    byLegacyPattern: Object.fromEntries(
      [...legacyGenericClassStrings.reduce((map, entry) => map.set(entry.category, (map.get(entry.category) || 0) + 1), new Map())],
    ),
  },
  semanticRoleUsages: semanticRoleTokens.length,
  typographySystemCoverage: Number((100 * semanticClassStrings.length / Math.max(1, genericCandidates)).toFixed(2)),
};

console.info("Typography System inventory:", JSON.stringify(inventory));
if (process.env.TYPOGRAPHY_INVENTORY_OUT) {
  writeFileSync(path.resolve(root, process.env.TYPOGRAPHY_INVENTORY_OUT), `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l’inventaire Typography couvre toutes les dimensions sans confondre les couleurs text-*", () => {
  assert.ok(inventory.declarations.total > 0);
  assert.ok(inventory.declarations.size > 0);
  assert.ok(inventory.declarations.weight > 0);
  assert.ok(inventory.declarations.leading > 0);
  assert.ok(inventory.declarations.tracking > 0);
  assert.equal(inventory.declarations.inline, 0);
  assert.ok(inventory.classification.classStrings > inventory.classification.genericCandidates);
});

test("les familles Geist Sans et Mono sont réellement chargées dans le layout cible", () => {
  const layout = read("src/app/layout.tsx");
  const packageJson = JSON.parse(read("package.json"));
  if (target) {
    assert.match(layout, /geist\/font\/sans/);
    assert.match(layout, /geist\/font\/mono/);
    assert.match(layout, /GeistSans\.variable/);
    assert.match(layout, /GeistMono\.variable/);
    assert.ok(packageJson.dependencies?.geist);
    assert.match(globals, /var\(--font-geist-sans\)/);
    assert.match(globals, /var\(--font-geist-mono\)/);
  } else {
    assert.doesNotMatch(layout, /geist\/font/);
    assert.equal(packageJson.dependencies?.geist, undefined);
  }
});

test("la hiérarchie sémantique reste finie et centralisée", () => {
  if (!target) {
    assert.equal(inventory.semanticRoleUsages, 0);
    return;
  }
  for (const role of semanticRoles) {
    assert.match(globals, new RegExp(`@utility type-${role} \\{`));
  }
  assert.ok(inventory.semanticRoleUsages > 0);
});

test("les primitives prioritaires consomment le contrat Typography", () => {
  if (!target) return;
  const expectations = {
    "src/components/ui/button.tsx": /type-control-strong/,
    "src/components/ui/badge.tsx": /type-label/,
    "src/components/ui/card.tsx": /type-(?:overline|title-card|body)/,
    "src/components/ui/field.tsx": /type-overline/,
    "src/components/ui/input.tsx": /type-control/,
    "src/components/ui/modal.tsx": /type-(?:title-subsection|body)/,
    "src/components/ui/select.tsx": /type-control-strong/,
    "src/components/admin/shared/state-system.tsx": /type-(?:body|body-strong|label)/,
  };
  for (const [file, pattern] of Object.entries(expectations)) assert.match(read(file), pattern, file);
});

test("tous les patterns génériques sûrs sont migrés sans absorber Mono ni les displays spécialisés", () => {
  if (target) {
    assert.equal(inventory.classification.legacyGeneric, 0);
    assert.equal(inventory.typographySystemCoverage, 100);
  } else {
    assert.ok(inventory.classification.legacyGeneric > 0);
    assert.equal(inventory.typographySystemCoverage, 0);
  }
  assert.ok(familyTokens.map(stripVariant).filter((token) => token === "font-mono").length > 0);
  assert.ok(arbitrarySizeTokens.some((token) => token.includes("clamp(")));
});

test("les valeurs arbitraires restantes appartiennent à un univers fini auditable", () => {
  const allowedSizeValues = new Set([
    "text-[0.65rem]", "text-[0.66rem]", "text-[0.68rem]", "text-[0.8rem]", "text-[0px]",
    "text-[8px]", "text-[9px]", "text-[10px]", "text-[11px]", "text-[2.5rem]",
    "text-[clamp(.68rem,2.2vw,1rem)]", "text-[clamp(1.35rem,2.4vw,2.35rem)]",
    "text-[clamp(1.6rem,3vw,2.75rem)]", "text-[clamp(2.1rem,9vw,4.8rem)]",
  ]);
  for (const token of arbitrarySizeTokens.map(stripVariant)) assert.ok(allowedSizeValues.has(token), token);
  assert.deepEqual([...new Set(arbitraryWeightTokens.map(stripVariant))], []);
});
