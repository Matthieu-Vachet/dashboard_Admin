import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const target = process.env.MODAL_COMPLETE_PHASE !== "baseline";
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = "src") {
  const absolute = path.join(root, directory);
  return readdirSync(absolute).flatMap((name) => {
    const relative = path.join(directory, name);
    const info = statSync(path.join(root, relative));
    if (info.isDirectory()) return sourceFiles(relative);
    return /\.(?:jsx|tsx)$/.test(name) ? [relative] : [];
  });
}

const modal = read("src/components/ui/modal.tsx");
const allSources = sourceFiles();
const modalConsumers = allSources.filter((file) => /<Modal\b/.test(read(file)));

test("Modal conserve son API publique finie et son anatomie visuelle", () => {
  for (const prop of ["open", "title", "description", "children", "footer", "className", "onClose"]) {
    assert.match(modal, new RegExp(`\\b${prop}\\b`));
  }
  for (const forbidden of ["closeOnOverlay", "size:", "scrollMode", "motion:", "zIndex:", "header:"]) {
    assert.doesNotMatch(modal, new RegExp(forbidden));
  }
  assert.match(modal, /createPortal\([\s\S]*document\.body/);
  assert.match(modal, /fixed inset-0 z-\[1100\] grid place-items-center bg-overlay p-3 backdrop-blur-xl sm:p-5/);
  assert.match(modal, /max-h-\[92dvh\] w-full max-w-2xl overflow-hidden rounded-lg/);
  assert.match(modal, /max-h-\[calc\(92dvh-9rem\)\] overflow-auto p-4 sm:p-5/);
});

test("les 22 instances canoniques restent dans les 14 consommateurs courants", () => {
  const count = modalConsumers.reduce((total, file) => total + (read(file).match(/<Modal\b/g)?.length || 0), 0);
  assert.equal(count, 22);
  assert.equal(modalConsumers.length, 14);
  assert.deepEqual(modalConsumers.sort(), [
    "src/app/(dashboard)/projects/page.tsx",
    "src/components/admin/dashboard/snippet-vault.tsx",
    "src/components/admin/forms/calendar-planner.tsx",
    "src/components/admin/forms/kanban-board.tsx",
    "src/components/admin/learning/learning-detail-modal.tsx",
    "src/components/admin/learning/learning-import-modal.tsx",
    "src/components/admin/pokemon/background-panel.jsx",
    "src/components/admin/pokemon/community-days-panel.jsx",
    "src/components/admin/pokemon/current-dataset-diagnostics.jsx",
    "src/components/admin/pokemon/events-history-panel.jsx",
    "src/components/admin/pokemon/identity-manager-panel.tsx",
    "src/components/admin/pokemon/shiny-tracker-panel.jsx",
    "src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx",
    "src/components/admin/tables/dashboard-backlog.tsx",
  ]);
});

test("le contrat accessible passe de aria-label au titre et à la description visibles", () => {
  assert.match(modal, /role="dialog"/);
  assert.match(modal, /aria-modal="true"/);
  if (target) {
    assert.match(modal, /useId/);
    assert.match(modal, /aria-labelledby=\{titleId\}/);
    assert.match(modal, /aria-describedby=\{description \? descriptionId : undefined\}/);
    assert.match(modal, /<h2 id=\{titleId\}/);
    assert.match(modal, /<p id=\{descriptionId\}/);
    assert.doesNotMatch(modal, /aria-label=\{title\}/);
  } else {
    assert.match(modal, /aria-label=\{title\}/);
    assert.doesNotMatch(modal, /aria-labelledby/);
    assert.doesNotMatch(modal, /aria-describedby/);
  }
});

test("l’overlay conserve le clic mais quitte le tab order", () => {
  if (target) {
    assert.match(modal, /aria-hidden="true"/);
    assert.match(modal, /className="absolute inset-0 cursor-default"/);
    assert.doesNotMatch(modal, /<button className="absolute inset-0 cursor-default"/);
  } else {
    assert.match(modal, /<button className="absolute inset-0 cursor-default"[^>]*type="button"[^>]*aria-label="Fermer"/);
  }
  assert.match(modal, /onClick=\{onClose\}/);
});

test("focus, Escape, trap, retour et scroll lock restent contractuels", () => {
  for (const contract of [
    /previouslyFocusedRef/,
    /document\.body\.style\.overflow = "hidden"/,
    /event\.key === "Escape"/,
    /event\.key === "Tab"/,
    /event\.shiftKey/,
    /previouslyFocusedRef\.current\?\.focus\(\)/,
  ]) assert.match(modal, contract);
  if (target) {
    assert.match(modal, /tabIndex=\{-1\}/);
    assert.match(modal, /dialogRef\.current\.focus\(\)/);
    assert.match(modal, /!dialogRef\.current\.contains\(document\.activeElement\)/);
  }
});

test("AdminVersionHistoryDialog reçoit la stabilisation locale sans devenir Modal", () => {
  const source = read("src/components/admin/layout/admin-version-history-dialog.tsx");
  assert.doesNotMatch(source, /from "@\/components\/ui\/modal"/);
  assert.match(source, /duration: reduceMotion \? 0 : 0\.18/);
  if (target) {
    for (const contract of [/useReducedMotion/, /aria-labelledby=\{titleId\}/, /aria-describedby=\{descriptionId\}/, /event\.key === "Escape"/, /document\.body\.style\.overflow = "hidden"/, /previouslyFocusedRef/]) assert.match(source, contract);
  } else {
    assert.match(source, /aria-label="Historique des versions du Dashboard"/);
    assert.doesNotMatch(source, /useReducedMotion/);
  }
});

test("les corrections spécialisées restent sémantiques et locales", () => {
  const events = read("src/components/admin/events/event-editor-modal.jsx");
  const eventDetail = read("src/components/admin/events/events-calendar-panel.jsx");
  const collections = read("src/components/admin/pokemon/collections-panel.jsx");
  const sources = read("src/components/admin/pokemon/source-watch-panel.tsx");
  const pokemon = read("src/components/admin/pokemon/detail-modal.jsx");
  if (target) {
    assert.equal(events.match(/role="dialog"/g)?.length, 2);
    assert.equal(events.match(/aria-labelledby=/g)?.length, 2);
    assert.match(eventDetail, /aria-labelledby=\{eventDetailTitleId\}/);
    assert.match(collections, /aria-labelledby="collections-editor-title"/);
    assert.equal(sources.match(/aria-labelledby=/g)?.length, 2);
    assert.match(pokemon, /aria-labelledby=\{dialogTitleId\}/);
    assert.match(pokemon, /aria-label=\{`Aperçu asset \$\{preview\.label\}`\}/);
  }
  for (const source of [events, eventDetail, collections, sources, pokemon]) {
    assert.doesNotMatch(source, /closeOnOverlay|scrollMode|zIndex=/);
  }
});

test("drawers, confirmations et niveaux spécialisés restent hors primitive", () => {
  const joined = allSources.map(read).join("\n");
  assert.equal(joined.match(/window\.confirm\(/g)?.length, 4);
  assert.match(read("src/components/admin/layout/admin-app-frame.tsx"), /dashboard-sidebar-mobile/);
  assert.match(read("src/components/admin/pokemon/admin-section-navigation.jsx"), /z-\[90\][\s\S]*Navigation Admin Pokémon/);
  assert.match(read("src/components/admin/events/event-editor-modal.jsx"), /z-\[1200\]/);
  assert.match(read("src/components/admin/pokemon/detail-modal.jsx"), /z-\[1120\]/);
});
