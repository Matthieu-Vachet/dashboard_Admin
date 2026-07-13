import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const badgeSource = readFileSync(
  path.join(repositoryRoot, "src/components/ui/badge.tsx"),
  "utf8",
);
const kanbanSource = readFileSync(
  path.join(repositoryRoot, "src/components/admin/forms/kanban-board.tsx"),
  "utf8",
);

const badgeSkeleton = [
  "inline-flex",
  "min-h-7",
  "items-center",
  "rounded-full",
  "border",
  "px-2.5",
  "text-xs",
  "font-black",
];

const expectedCategoryStyles = {
  Produit: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  Design: "border-brand/30 bg-brand/10 text-violet-100",
  API: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  Ops: "border-warning/35 bg-warning/10 text-amber-100",
  Urgent: "border-danger/35 bg-danger/10 text-rose-100",
};

function sectionBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  assert.notEqual(startIndex, -1, `Section absente : ${start}`);
  const endIndex = end ? source.indexOf(end, startIndex + start.length) : source.length;
  assert.notEqual(endIndex, -1, `Fin de section absente : ${end}`);
  return source.slice(startIndex, endIndex);
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function assertCategoryLabel(section, componentName) {
  const baselineSpan = /<span\s+className=\{cn\(\s*"inline-flex min-h-7 items-center rounded-full border px-2\.5 text-xs font-black",\s*categoryStyles\[task\.category\]\s*\)\}>\s*\{task\.category\}\s*<\/span>/s;
  const migratedBadge = /<Badge\s+className=\{categoryStyles\[task\.category\]\}>\s*\{task\.category\}\s*<\/Badge>/s;
  const matches = Number(baselineSpan.test(section)) + Number(migratedBadge.test(section));
  assert.equal(matches, 1, `${componentName} doit contenir exactement un libellé de catégorie conforme`);
}

test("Badge conserve son contrat non interactif et son squelette structurel", () => {
  assert.match(badgeSource, /HTMLAttributes<HTMLSpanElement>/);
  assert.match(badgeSource, /return\s*\(\s*<span\b/s);
  assert.doesNotMatch(badgeSource, /<button\b/);
  for (const className of badgeSkeleton) {
    assert.match(badgeSource, new RegExp(`(?:^|[\\s\"])+${className.replace(".", "\\.")}(?:[\\s\"]|$)`));
  }
});

test("categoryStyles conserve exactement les cinq catégories et leurs valeurs", () => {
  const categoryStylesSection = sectionBetween(
    kanbanSource,
    "const categoryStyles: Record<Category, string> = {",
    "\n};",
  );
  const entries = [...categoryStylesSection.matchAll(/^\s{2}([^:\n]+):\s*"([^"]+)",$/gm)]
    .map(([, key, value]) => [key, value]);
  assert.deepEqual(Object.fromEntries(entries), expectedCategoryStyles);
});

test("les deux composants pilotes conservent chacun un seul libellé de catégorie", () => {
  const cardSection = sectionBetween(
    kanbanSource,
    "function KanbanTaskCard(",
    "function KanbanTaskPreview(",
  );
  const previewSection = sectionBetween(kanbanSource, "function KanbanTaskPreview(");

  assertCategoryLabel(cardSection, "KanbanTaskCard");
  assertCategoryLabel(previewSection, "KanbanTaskPreview");

  const baselineLabels = countMatches(
    kanbanSource,
    /<span\s+className=\{cn\(\s*"inline-flex min-h-7 items-center rounded-full border px-2\.5 text-xs font-black",\s*categoryStyles\[task\.category\]\s*\)\}>\s*\{task\.category\}\s*<\/span>/gs,
  );
  const migratedLabels = countMatches(
    kanbanSource,
    /<Badge\s+className=\{categoryStyles\[task\.category\]\}>\s*\{task\.category\}\s*<\/Badge>/gs,
  );
  assert.ok(
    (baselineLabels === 2 && migratedLabels === 0) ||
      (baselineLabels === 0 && migratedLabels === 2),
    "La migration doit être atomique : deux spans avant, ou deux Badge après",
  );
});

test("les contrôles de catégorie de la modale restent des boutons", () => {
  const categoryControls = sectionBetween(
    kanbanSource,
    "{categories.map((category) => (",
    "{priorities.map((priority) => (",
  );
  assert.match(categoryControls, /<button\b/);
  assert.match(categoryControls, /type="button"/);
  assert.match(categoryControls, /updateTask\(selectedTask\.id, \{ category \}\)/);
  assert.doesNotMatch(categoryControls, /<Badge\b/);
});

test("les styles de priorité restent hors de la migration Badge", () => {
  assert.match(kanbanSource, /const priorityStyles: Record<Task\["priority"\], string>/);
  assert.match(kanbanSource, /categoryStyles\[category\]/);
  assert.match(kanbanSource, /priorityStyles\[priority\]/);
  assert.match(kanbanSource, /priorityStyles\[task\.priority\]/);
  assert.doesNotMatch(kanbanSource, /<Badge[^>]*priorityStyles/s);
});

test("Badge est importé depuis son chemin canonique", () => {
  assert.equal(
    countMatches(kanbanSource, /import \{ Badge \} from "@\/components\/ui\/badge";/g),
    1,
  );
});
