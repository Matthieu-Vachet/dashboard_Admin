import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const target = process.env.CARD_SURFACE_PHASE !== "baseline";
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = "src") {
  return readdirSync(path.join(root, directory)).flatMap((name) => {
    const relative = path.join(directory, name);
    const info = statSync(path.join(root, relative));
    if (info.isDirectory()) return sourceFiles(relative);
    return /\.(?:jsx|tsx)$/.test(name) ? [relative] : [];
  });
}

const files = sourceFiles();
const sources = new Map(files.map((file) => [file, read(file)]));
const card = read("src/components/ui/card.tsx");
const flatSkeleton = /rounded-lg border border-line bg-surface-flat/g;

test("Card conserve sa racine, sa ref et son API finie", () => {
  assert.match(card, /forwardRef<HTMLDivElement, CardProps>/);
  assert.match(card, /<div[\s\S]*ref=\{ref\}/);
  assert.match(card, /HTMLAttributes<HTMLDivElement>/);
  assert.match(card, /tone = "soft"/);
  for (const forbidden of ["interactive", "selected", "padding", "size", "asChild", "CardContent", "CardFooter"]) {
    assert.doesNotMatch(card, new RegExp(`\\b${forbidden}\\b`));
  }
});

test("les usages canoniques courants sont caractérisés", () => {
  const consumers = files.filter((file) => /<Card\b/.test(sources.get(file)));
  const count = consumers.reduce((total, file) => total + (sources.get(file).match(/<Card\b/g)?.length || 0), 0);
  assert.equal(consumers.length, 32);
  assert.equal(count, target ? 115 : 95);
});

test("CardHeader, CardTitle et CardDescription gardent leur anatomie", () => {
  assert.match(card, /flex items-start justify-between gap-4/);
  assert.match(card, /eyebrow\?: string/);
  assert.match(card, /action\?: ReactNode/);
  assert.match(card, /<h2[\s\S]*text-lg font-black leading-tight text-foreground/);
  assert.match(card, /<p[\s\S]*mt-1 text-sm font-medium leading-6 text-muted/);
  for (const component of ["CardTitle", "CardDescription"]) {
    const count = files.reduce((total, file) => total + (sources.get(file).match(new RegExp(`<${component}\\b`, "g"))?.length || 0), 0);
    assert.equal(count, 25);
  }
});

test("le ton flat est fondé sur les 20 surfaces exactes", () => {
  const remainingSkeletons = files.reduce((total, file) => total + (sources.get(file).match(flatSkeleton)?.length || 0), 0);
  const flatCards = files.reduce((total, file) => total + (sources.get(file).match(/<Card\s+tone="flat"/g)?.length || 0), 0);
  if (target) {
    assert.match(card, /tone\?: "soft" \| "strong" \| "flat"/);
    assert.match(card, /tone === "flat"/);
    assert.match(card, /border border-line bg-surface-flat/);
    assert.equal(flatCards, 20);
    assert.equal(remainingSkeletons, 16);
  } else {
    assert.doesNotMatch(card, /"flat"/);
    assert.equal(flatCards, 0);
    assert.equal(remainingSkeletons, 36);
  }
});

test("les quatre wrappers métier restent nommés et composables", () => {
  const wrappers = [
    ["src/components/admin/stats/database-stats.tsx", "MiniRow"],
    ["src/components/admin/cards/pokemon-widget.tsx", "Metric"],
    ["src/components/admin/dashboard/pomodoro.tsx", "MiniStat"],
    ["src/components/admin/dashboard/dashboard-home-live.tsx", "SignalRow"],
  ];
  for (const [file, name] of wrappers) {
    const source = sources.get(file);
    assert.match(source, new RegExp(`function ${name}\\b`));
    if (target) assert.match(source, new RegExp(`function ${name}[\\s\\S]*?<Card tone="flat"`));
  }
});

test("les trois faux positifs flat restent hors Card", () => {
  for (const file of [
    "src/components/admin/forms/calendar-planner.tsx",
    "src/components/admin/forms/todo-list.tsx",
    "src/components/admin/forms/writer-studio.tsx",
  ]) {
    assert.match(sources.get(file), /rounded-lg border border-line bg-surface-flat/);
  }
});

test("Panel legacy et surfaces interactives restent spécialisés", () => {
  const panel = read("src/components/admin/pokemon/admin-ui.jsx");
  assert.match(panel, /rounded-2xl border border-line bg-surface-subtle/);
  assert.match(panel, /export function Panel/);
  assert.doesNotMatch(panel, /<Card\b/);
  assert.match(read("src/components/admin/forms/kanban-board.tsx"), /function KanbanTaskCard/);
  assert.match(read("src/components/admin/pokemon/raids-panel.jsx"), /function RaidCard/);
  assert.match(read("src/components/admin/events/events-calendar-panel.jsx"), /function TimelineCard/);
});
