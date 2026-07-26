import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const target = process.env.MOTION_PHASE !== "baseline";
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
const globals = read("src/app/globals.css");

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
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && /(?:transition|duration-|ease-|delay-|animate-|motion-reduce:)/.test(node.text)) {
        values.push({ file, value: node.text, tokens: node.text.split(/\s+/).filter(Boolean) });
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }
  return values;
}

const bare = (token) => token.slice(token.lastIndexOf(":") + 1);
const isMotionToken = (token) => /^(?:transition(?:-.+)?|duration-.+|ease-.+|delay-.+|animate-.+)$/.test(bare(token)) || token.startsWith("motion-reduce:");
const distribution = (tokens) => Object.fromEntries(
  [...tokens.reduce((map, token) => map.set(bare(token), (map.get(bare(token)) || 0) + 1), new Map())]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])),
);

const strings = classStrings();
const classTokens = strings.flatMap((entry) => entry.tokens.filter(isMotionToken));
const transitionTokens = classTokens.filter((token) => /^transition(?:-.+)?$/.test(bare(token)));
const durationTokens = classTokens.filter((token) => /^duration-.+$/.test(bare(token)));
const easingTokens = classTokens.filter((token) => /^ease-.+$/.test(bare(token)));
const delayTokens = classTokens.filter((token) => /^delay-.+$/.test(bare(token)));
const animationTokens = classTokens.filter((token) => /^animate-.+$/.test(bare(token)));
const transitionAllTokens = transitionTokens.filter((token) => bare(token) === "transition-all");
const arbitraryTokens = classTokens.filter((token) => /^(?:duration|ease|delay)-\[/.test(bare(token)));
const arbitraryTransitionProperties = transitionTokens.filter((token) => /^transition-\[/.test(bare(token)));
const canonicalDurationTokens = durationTokens.filter((token) => /^duration-motion-(?:fast|normal|slow)$/.test(bare(token)));

function classify(entry) {
  const tokenSet = new Set(entry.tokens.map(bare));
  if ([...tokenSet].some((token) => token === "animate-spin" || token === "animate-pulse")) return "functional-feedback";
  if ([...tokenSet].some((token) => /^transition-\[(?:width|height)\]$/.test(token))) return "functional-feedback";
  if (/pokemon|pomodoro|sortable-widget|learning-analytics|database-stats/.test(entry.file) && [...tokenSet].some((token) => /^(?:animate-|transition|transition-transform)/.test(token))) return "domain-decorative";
  if ([...tokenSet].some((token) => /^transition(?:-.+)?$/.test(token))) return "generic-ui";
  return "domain-decorative";
}

const classified = strings.map((entry) => ({ ...entry, category: classify(entry) }));
const genericSites = classified.filter((entry) => entry.category === "generic-ui");
const functionalSites = classified.filter((entry) => entry.category === "functional-feedback");
const domainSites = classified.filter((entry) => entry.category === "domain-decorative");
const genericLegacyDurationSites = genericSites.filter((entry) => entry.tokens.some((token) => /^duration-\d+$/.test(bare(token))));
const genericCanonical = target && /--motion-duration-fast:/.test(globals) && /--default-transition-duration:/.test(globals)
  ? genericSites.length - genericLegacyDurationSites.length
  : 0;

const cssTransitions = [...globals.matchAll(/\btransition\s*:\s*([^;]+);/g)].map((match) => match[1]);
const cssAnimationDeclarations = [...globals.matchAll(/\banimation\s*:\s*([^;]+);/g)].map((match) => match[1]);
const cssAnimations = cssAnimationDeclarations.filter((value) => !/^none\b/.test(value.trim()));
const keyframes = [...globals.matchAll(/@keyframes\s+([\w-]+)/g)].map((match) => match[1]);
const cssDurations = [...cssTransitions, ...cssAnimations].flatMap((value) => [...value.matchAll(/\b\d+(?:\.\d+)?(?:ms|s)\b/g)].map((match) => match[0]));
const cssEasings = [...cssTransitions, ...cssAnimations].flatMap((value) => [...value.matchAll(/\b(?:linear|ease|ease-in|ease-out|ease-in-out)\b/g)].map((match) => match[0]));

const framerFiles = files.filter((file) => /from\s+["']framer-motion["']/.test(sources.get(file)));
const framerElements = framerFiles.reduce((total, file) => total + [...sources.get(file).matchAll(/<motion\.[a-z]+/g)].length, 0);
const framerDurations = framerFiles.flatMap((file) => [...sources.get(file).matchAll(/\bduration\s*:\s*(\d+(?:\.\d+)?)/g)].map((match) => match[1]));
const framerDelays = framerFiles.flatMap((file) => [...sources.get(file).matchAll(/\bdelay\s*:\s*([^,}\n]+)/g)].map((match) => match[1].trim()));
const framerEasings = framerFiles.flatMap((file) => [...sources.get(file).matchAll(/\bease\s*:\s*["']([^"']+)["']/g)].map((match) => match[1]));
const framerSprings = framerFiles.reduce((total, file) => total + [...sources.get(file).matchAll(/type\s*:\s*["']spring["']/g)].length, 0);
const framerLocallyReduced = framerFiles
  .filter((file) => /useReducedMotion/.test(sources.get(file)))
  .reduce((total, file) => total + [...sources.get(file).matchAll(/<motion\.[a-z]+/g)].length, 0);
const globalFramerPolicy = /<MotionConfig\s+reducedMotion=["']user["']/.test(read("src/components/admin/layout/admin-providers.tsx"));

const reducedBlock = globals.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/)?.[1] || "";
const hasGlobalTransitionReduction = /transition-duration:\s*0\.01ms\s*!important/.test(reducedBlock);
const tailwindLoops = classified.filter((entry) => entry.tokens.some((token) => ["animate-spin", "animate-pulse"].includes(bare(token))));
const tailwindLoopsCovered = tailwindLoops.filter((entry) => entry.tokens.some((token) => token === "motion-reduce:animate-none") || /\.animate-spin[\s\S]*\.animate-pulse/.test(reducedBlock));
const cssLoopsCovered = cssAnimations.filter((animation) => {
  const name = animation.trim().split(/\s+/)[0];
  return new RegExp(`\\.${name}[\\s\\S]*animation:\\s*none`).test(reducedBlock) || (/sheen/.test(name) && /\.animated-sheen[\s\S]*animation:\s*none/.test(reducedBlock));
});
const genericLocallyReduced = genericSites.filter((entry) => entry.tokens.some((token) => token.startsWith("motion-reduce:transition-none")));
const reducedEligible = genericSites.length + tailwindLoops.length + cssAnimations.length + framerElements;
const reducedCovered = (hasGlobalTransitionReduction ? genericSites.length : genericLocallyReduced.length)
  + tailwindLoopsCovered.length
  + cssLoopsCovered.length
  + (globalFramerPolicy ? framerElements : framerLocallyReduced);

const genericFramerRawDurations = [
  "src/components/admin/navigation/admin-palette-selector.tsx",
  "src/components/admin/layout/admin-version-history-dialog.tsx",
].reduce((total, file) => total + [...sources.get(file).matchAll(/\bduration\s*:\s*\d+(?:\.\d+)?/g)].length, 0);

const inventory = {
  generatedAt: new Date().toISOString(),
  declarations: {
    total: classTokens.length + cssTransitions.length + cssAnimations.length + framerElements,
    transition: transitionTokens.length,
    duration: durationTokens.length + cssDurations.length + framerDurations.length,
    easing: easingTokens.length + cssEasings.length + framerEasings.length + framerSprings,
    delay: delayTokens.length + framerDelays.length,
    animation: animationTokens.length + cssAnimations.length + framerElements,
    cssTransition: cssTransitions.length,
    cssAnimation: cssAnimations.length,
    keyframes: keyframes.length,
    framerElements,
  },
  variants: {
    duration: distribution([...durationTokens, ...cssDurations, ...framerDurations]),
    easing: distribution([...easingTokens, ...cssEasings, ...framerEasings, ...Array.from({ length: framerSprings }, () => "spring")]),
    animation: distribution([...animationTokens, ...cssAnimations.map((value) => value.trim().split(/\s+/)[0])]),
  },
  classification: {
    classStrings: strings.length,
    genericUi: genericSites.length,
    functionalFeedback: functionalSites.length,
    domainDecorativeAmbiguous: domainSites.length,
    genericCanonical,
    genericLegacyDuration: genericLegacyDurationSites.length,
  },
  transitionAll: transitionAllTokens.length,
  arbitraryMotion: arbitraryTokens.length + genericFramerRawDurations,
  arbitraryTransitionProperties: arbitraryTransitionProperties.length,
  canonicalDurationUsages: canonicalDurationTokens.length,
  reducedMotion: {
    eligible: reducedEligible,
    covered: reducedCovered,
    coverage: Number((100 * reducedCovered / Math.max(1, reducedEligible)).toFixed(2)),
    globalCss: hasGlobalTransitionReduction,
    globalFramer: globalFramerPolicy,
    tailwindLoops: tailwindLoops.length,
    cssLoops: cssAnimations.length,
    framerElements,
  },
  motionSystemCoverage: Number((100 * genericCanonical / Math.max(1, genericSites.length)).toFixed(2)),
};

console.info("Motion System inventory:", JSON.stringify(inventory));

test("l’inventaire Motion couvre transitions, animations CSS et Framer", () => {
  assert.ok(inventory.declarations.total > 0);
  assert.ok(inventory.declarations.transition > 0);
  assert.ok(inventory.declarations.animation > 0);
  assert.ok(inventory.declarations.keyframes > 0);
  assert.ok(inventory.declarations.framerElements > 0);
  assert.equal(inventory.transitionAll, 0);
});

test("l’échelle de durations et easings génériques reste finie", () => {
  if (!target) {
    assert.equal(inventory.motionSystemCoverage, 0);
    assert.ok(inventory.classification.genericLegacyDuration > 0);
    return;
  }
  for (const role of ["fast", "normal", "slow"]) assert.match(globals, new RegExp(`--motion-duration-${role}:`));
  for (const role of ["standard", "enter", "exit"]) assert.match(globals, new RegExp(`--motion-ease-${role}:`));
  assert.equal(inventory.classification.genericLegacyDuration, 0);
  assert.equal(inventory.motionSystemCoverage, 100);
});

test("les primitives et layouts génériques consomment le contrat Motion", () => {
  if (!target) return;
  assert.match(read("src/components/ui/button.tsx"), /duration-motion-normal/);
  assert.match(read("src/components/admin/layout/admin-app-frame.tsx"), /duration-motion-slow/);
  assert.match(read("src/components/admin/navigation/admin-palette-selector.tsx"), /MOTION_DURATION_SECONDS/);
  assert.match(read("src/components/admin/layout/admin-version-history-dialog.tsx"), /MOTION_DURATION_SECONDS/);
});

test("reduced motion couvre CSS, Tailwind et Framer sans supprimer l’information", () => {
  if (!target) {
    assert.ok(inventory.reducedMotion.coverage < 100);
    assert.equal(inventory.reducedMotion.globalFramer, false);
    return;
  }
  assert.equal(inventory.reducedMotion.coverage, 100);
  assert.equal(inventory.reducedMotion.globalCss, true);
  assert.equal(inventory.reducedMotion.globalFramer, true);
  assert.match(read("src/components/admin/shared/state-system.tsx"), /role="status"/);
  assert.match(read("src/components/admin/shared/loading-state.tsx"), /motion-reduce:animate-none/);
});

test("les animations fonctionnelles et métier restent distinctes", () => {
  assert.ok(inventory.classification.functionalFeedback > 0);
  assert.ok(inventory.classification.domainDecorativeAmbiguous > 0);
  assert.ok(inventory.variants.animation["animate-spin"] > 0);
  assert.ok(inventory.variants.animation["animate-pulse"] > 0);
  assert.ok(inventory.variants.animation["energy-scan"] > 0);
  assert.ok(inventory.variants.animation.sheen > 0);
});

test("aucun transition-all ni durée générique arbitraire ne contourne le contrat", () => {
  assert.equal(inventory.transitionAll, 0);
  if (target) {
    assert.equal(inventory.arbitraryMotion, 0);
    assert.equal(arbitraryTokens.length, 0);
  }
});
