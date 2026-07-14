import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function source(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

const canonicalConsumers = new Map([
  ["src/app/(dashboard)/projects/page.tsx", 1],
  ["src/components/admin/dashboard/snippet-vault.tsx", 1],
  ["src/components/admin/forms/calendar-planner.tsx", 1],
  ["src/components/admin/forms/kanban-board.tsx", 1],
  ["src/components/admin/learning/learning-detail-modal.tsx", 1],
  ["src/components/admin/learning/learning-import-modal.tsx", 1],
  ["src/components/admin/pokemon/background-panel.jsx", 1],
  ["src/components/admin/pokemon/shiny-tracker-panel.jsx", 1],
  ["src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx", 2],
  ["src/components/admin/tables/dashboard-backlog.tsx", 1],
]);

test("Modal conserve son API publique et son rendu portal", () => {
  const modal = source("src/components/ui/modal.tsx");
  for (const contract of [
    /open: boolean;/,
    /title: string;/,
    /description\?: string;/,
    /children: ReactNode;/,
    /footer\?: ReactNode;/,
    /className\?: string;/,
    /onClose: \(\) => void;/,
    /return createPortal\(/,
    /document\.body/,
  ]) assert.match(modal, contract);
  assert.match(modal, /className="fixed inset-0 z-\[1100\] grid place-items-center bg-black\/65 p-3 backdrop-blur-xl sm:p-5"/);
  assert.match(modal, /relative max-h-\[92dvh\] w-full max-w-2xl overflow-hidden rounded-lg/);
});

test("Modal conserve le contrat dialog, ses deux fermetures et le scroll lock", () => {
  const modal = source("src/components/ui/modal.tsx");
  assert.match(modal, /role="dialog"/);
  assert.match(modal, /aria-modal="true"/);
  assert.match(modal, /aria-label=\{title\}/);
  assert.match(modal, /aria-label="Fermer" onClick=\{onClose\}/);
  assert.match(modal, /aria-label="Fermer la fenêtre"/);
  assert.match(modal, /document\.body\.style\.overflow = "hidden"/);
  assert.match(modal, /document\.body\.style\.overflow = previous/);
});

test("Modal conserve Escape, focus initial, trap Tab et retour du focus", () => {
  const modal = source("src/components/ui/modal.tsx");
  assert.match(modal, /window\.requestAnimationFrame/);
  assert.match(modal, /querySelector<HTMLElement>\(focusableSelector\)\?\.focus\(\)/);
  assert.match(modal, /event\.key === "Escape"/);
  assert.match(modal, /event\.key === "Tab"/);
  assert.match(modal, /event\.shiftKey && document\.activeElement === first/);
  assert.match(modal, /!event\.shiftKey && document\.activeElement === last/);
  assert.match(modal, /previouslyFocusedRef\.current\?\.focus\(\)/);
  assert.match(modal, /window\.removeEventListener\("keydown", closeOnEscape\)/);
});

test("les 11 instances canoniques restent limitées aux 10 consommateurs inventoriés", () => {
  let total = 0;
  for (const [file, expected] of canonicalConsumers) {
    const contents = source(file);
    assert.match(contents, /@\/components\/ui\/modal/);
    const count = [...contents.matchAll(/<Modal\b/g)].length;
    assert.equal(count, expected, `${file}: nombre d'instances Modal inattendu`);
    total += count;
  }
  assert.equal(total, 11);
});

test("les dialogs legacy restent caractérisables sans migration partielle", () => {
  const version = source("src/components/admin/layout/admin-version-history-dialog.tsx");
  assert.match(version, /<AnimatePresence>/);
  assert.match(version, /<motion\.div/);
  assert.match(version, /role="dialog"/);
  assert.match(version, /aria-label="Historique des versions du Dashboard"/);
  assert.match(version, /max-w-3xl/);
  assert.match(version, /transition=\{\{ duration: 0\.18 \}\}/);
  assert.doesNotMatch(version, /@\/components\/ui\/modal/);

  const eventEditor = source("src/components/admin/events/event-editor-modal.jsx");
  assert.equal([...eventEditor.matchAll(/<ModalPortal>/g)].length, 2);
  assert.equal([...eventEditor.matchAll(/z-\[1200\]/g)].length, 2);
  assert.doesNotMatch(eventEditor, /role="dialog"/);
  assert.doesNotMatch(eventEditor, /@\/components\/ui\/modal/);

  const histories = source("src/components/admin/pokemon/source-watch-panel.tsx");
  assert.equal([...histories.matchAll(/role="dialog"/g)].length, 2);
  assert.equal([...histories.matchAll(/aria-modal="true"/g)].length, 2);
  assert.equal([...histories.matchAll(/role="dialog"\s+aria-modal="true"\s+>/g)].length, 2);
  assert.doesNotMatch(histories, /@\/components\/ui\/modal/);
});

test("les overlays spécialisés et imbriqués restent hors de Modal", () => {
  const events = source("src/components/admin/events/events-calendar-panel.jsx");
  assert.match(events, /event-detail-overlay fixed inset-0 z-\[1200\]/);
  assert.match(events, /event-detail-modal flex max-h-\[94dvh\]/);

  const detail = source("src/components/admin/pokemon/detail-modal.jsx");
  assert.match(detail, /pokemon-modal-overlay fixed inset-0 z-\[1100\]/);
  assert.match(detail, /fixed inset-0 z-\[1120\].*role="presentation"/);

  const collections = source("src/components/admin/pokemon/collections-panel.jsx");
  assert.match(collections, /createPortal\(/);
  assert.match(collections, /fixed inset-0 z-\[1100\] overflow-y-auto/);

  const frame = source("src/components/admin/layout/admin-app-frame.tsx");
  assert.match(frame, /dashboard-sidebar-mobile/);
  assert.match(frame, /fixed inset-0 z-50 bg-black\/60 backdrop-blur-sm lg:hidden/);
});

test("les confirmations natives et les façades de compatibilité restent inchangées", () => {
  const confirmations = [
    "src/components/admin/events/events-calendar-panel.jsx",
    "src/components/admin/learning/learning-detail-modal.tsx",
    "src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx",
  ].flatMap((file) => [...source(file).matchAll(/window\.confirm\(/g)].map(() => file));
  assert.equal(confirmations.length, 4);
  assert.deepEqual(
    Object.fromEntries([...new Set(confirmations)].map((file) => [file, confirmations.filter((item) => item === file).length])),
    {
      "src/components/admin/events/events-calendar-panel.jsx": 1,
      "src/components/admin/learning/learning-detail-modal.tsx": 2,
      "src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx": 1,
    },
  );
  assert.match(source("src/components/checklist/detail-modal.jsx"), /export \{ DetailModal \} from "@\/components\/admin\/pokemon\/detail-modal"/);
  const sourceFacade = source("src/components/pokemon-admin/source-watch-panel.tsx");
  assert.match(sourceFacade, /export \* from "@\/components\/admin\/pokemon\/source-watch-panel"/);
});
