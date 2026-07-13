import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(repositoryRoot, file), "utf8");

const badgeSource = read("src/components/ui/badge.tsx");
const inventory = read("docs/codex/Design System Program/sprints/badge/badge-family-inventory.md");
const kanban = read("src/components/admin/forms/kanban-board.tsx");
const projects = read("src/app/(dashboard)/projects/page.tsx");

const wrappers = [
  {
    name: "EggPill",
    file: "src/components/admin/pokemon/eggs-panel.jsx",
    className: "inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black",
    canonicalTag: "Badge",
  },
  {
    name: "MaxPill",
    file: "src/components/admin/pokemon/max-battles-panel.jsx",
    className: "inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black",
    canonicalTag: "Badge",
  },
  {
    name: "RaidPill",
    file: "src/components/admin/pokemon/raids-panel.jsx",
    className: "inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black",
    canonicalTag: "Badge",
  },
  {
    name: "Badge",
    file: "src/components/admin/pokemon/research-panel.jsx",
    className: "inline-flex min-h-7 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
    canonicalTag: "DesignSystemBadge",
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function functionSection(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `Wrapper ${name} absent`);
  const next = source.indexOf("\nfunction ", start + 10);
  return source.slice(start, next === -1 ? source.length : next);
}

test("Badge conserve son span non interactif, son API finie et son squelette", () => {
  assert.match(badgeSource, /HTMLAttributes<HTMLSpanElement>/);
  assert.match(badgeSource, /return\s*\(\s*<span\b/s);
  assert.doesNotMatch(badgeSource, /<button\b/);
  for (const token of ["inline-flex", "min-h-7", "items-center", "rounded-full", "border", "px-2.5", "text-xs", "font-black"]) {
    assert.match(badgeSource, new RegExp(escapeRegExp(token)));
  }
  assert.match(badgeSource, /"cyan" \| "violet" \| "green" \| "amber" \| "red" \| "neutral"/);
  assert.doesNotMatch(badgeSource, /fire|water|raid|egg|pokemon|urgent-kanban/i);
});

test("les quatre wrappers métier conservent leur nom, leurs classes et migrent atomiquement", () => {
  let migrated = 0;
  for (const wrapper of wrappers) {
    const source = read(wrapper.file);
    const section = functionSection(source, wrapper.name);
    assert.match(section, new RegExp(`function ${wrapper.name}\\(`));
    assert.match(section, /tone = ""|tone = "border-white\/10 bg-white\/\[0\.07\] text-white"/);
    assert.match(section, new RegExp(escapeRegExp(wrapper.className)));
    assert.match(section, /\{children\}/);
    assert.doesNotMatch(section, /<button\b|onClick=|tabIndex=/);
    const baselineRoot = new RegExp(`<span\\s+className=\\{\\\`[^\\\`]*${escapeRegExp(wrapper.className)}[^\\\`]*\\\`\\}>`);
    const migratedRoot = new RegExp(`<${wrapper.canonicalTag}\\s+className=\\{\\\`[^\\\`]*${escapeRegExp(wrapper.className)}[^\\\`]*\\\`\\}>`);
    const isBaseline = baselineRoot.test(section);
    const isMigrated = migratedRoot.test(section);
    assert.equal(Number(isBaseline) + Number(isMigrated), 1, `${wrapper.name} doit avoir une seule racine caractérisée`);
    if (isMigrated) {
      migrated += 1;
      assert.match(source, /@\/components\/ui\/badge/);
    }
  }
  assert.ok(migrated === 0 || migrated === 4, `Migration partielle interdite : ${migrated}/4`);
});

test("l’inventaire initial contient 205 sites classés une seule fois", () => {
  const rows = [...inventory.matchAll(/^\| BADGE-USAGE-(\d{3}) \|.*\| ([ABCD]) \|/gm)];
  assert.equal(rows.length, 205);
  assert.deepEqual(rows.map((row) => row[1]), Array.from({ length: 205 }, (_, index) => String(index + 1).padStart(3, "0")));
  const categories = Object.fromEntries(["A", "B", "C", "D"].map((category) => [category, rows.filter((row) => row[2] === category).length]));
  assert.deepEqual(categories, { A: 68, B: 100, C: 13, D: 24 });
  assert.equal((inventory.match(/oui, composition sûre/g) || []).length, 4);
});

test("les contrôles pill-shaped restent des éléments interactifs natifs", () => {
  assert.match(kanban, /\{categories\.map\([\s\S]*?<button\b[\s\S]*?updateTask\(selectedTask\.id, \{ category \}\)/);
  assert.match(kanban, /\{priorities\.map\([\s\S]*?<button\b[\s\S]*?updateTask\(selectedTask\.id, \{ priority \}\)/);
  assert.match(projects, /<button[\s\S]*?setSelectedId\(`js-level6-\$\{project\.id\}`\)/);
});

test("les composants métier complexes restent présents et non transformés en tons globaux", () => {
  const pokemonCard = read("src/components/admin/pokemon/pokemon-card.jsx");
  const detail = read("src/components/admin/pokemon/detail-modal.jsx");
  const pvp = read("src/components/admin/pokemon/pvp-rankings-panel.jsx");
  const events = read("src/components/admin/events/events-calendar-panel.jsx");
  for (const [source, name] of [
    [pokemonCard, "TypeBadge"], [pokemonCard, "WeatherBadge"], [detail, "MoveTypePill"],
    [pvp, "MoveBadge"], [events, "TypePills"], [events, "EventBadge"], [events, "InfoPill"],
  ]) assert.match(source, new RegExp(`function ${name}\\(`));
});
