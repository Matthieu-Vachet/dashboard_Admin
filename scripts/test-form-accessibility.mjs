import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function source(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function loadFieldInventory() {
  return JSON.parse(execFileSync(
    process.execPath,
    [path.join(root, "scripts/test-design-system-field-family.mjs"), "--dump-inventory"],
    { cwd: root, encoding: "utf8" },
  )).sites.map((site, index) => ({
    ...site,
    id: `A11Y-FIELD-${String(index + 1).padStart(3, "0")}`,
  }));
}

const initialUnnamedIds = [
  "008", "012", "013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "023",
  "024", "025", "026", "027", "028", "029", "030", "033", "034", "049", "050", "051", "055",
  "056", "057", "058", "059", "061", "062", "065", "069", "071", "072", "074", "075", "077",
  "080", "082", "086", "092",
].map((id) => `A11Y-FIELD-${id}`);

const classifications = {
  A: ["008"],
  B: ["012", "023", "024", "030", "033", "051", "055", "065", "069", "071", "072", "074", "075", "077", "080", "082", "086", "092"],
  C: ["049", "061", "062"],
  D: ["013", "014", "015", "016", "017", "018", "019", "020", "021", "022", "025", "026", "027", "028", "029", "034", "050", "056", "057", "058", "059"],
};

for (const category of Object.keys(classifications)) {
  classifications[category] = classifications[category].map((id) => `A11Y-FIELD-${id}`);
}

const correctionContracts = [
  ["src/components/admin/dashboard/color-lab.tsx", /<Input\s+aria-label="HEX"\s+value=\{color\}/],
  ["src/components/admin/dashboard/daily-tools.tsx", /aria-label="Journal du jour"/],
  ["src/components/admin/dashboard/daily-tools.tsx", /aria-describedby="form-a11y-journal-description"/],
  ["src/components/admin/dashboard/daily-tools.tsx", /id="form-a11y-journal-description"/],
  ["src/components/admin/dashboard/snippet-vault.tsx", /aria-label="Rechercher langage, tag, contenu\.\.\."/],
  ["src/components/admin/events/event-editor-modal.jsx", /aria-label="Import JSON"/],
  ["src/components/admin/events/events-calendar-panel.jsx", /aria-label="Rechercher event, bonus, Pokémon\.\.\."/],
  ["src/components/admin/forms/notes-board.tsx", /aria-label="Chercher titre, tag, priorité\.\.\."/],
  ["src/components/admin/forms/todo-list.tsx", /aria-label="Ajouter une action\.\.\."/],
  ["src/components/admin/pokemon/admin-app.jsx", /id="form-a11y-rule-filter-label"/],
  ["src/components/admin/pokemon/admin-app.jsx", /id="form-a11y-rule-filter-description"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-labelledby="form-a11y-rule-filter-label"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-describedby="form-a11y-rule-filter-description"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-label="Chercher fiche, type, fichier\.\.\."/],
  ["src/components/admin/pokemon/admin-app.jsx", /id="form-a11y-bulk-description"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-label="Corrections groupées"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-describedby="form-a11y-bulk-description"/],
  ["src/components/admin/pokemon/admin-app.jsx", /id="form-a11y-export-description"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-label="Export et partage"/],
  ["src/components/admin/pokemon/admin-app.jsx", /aria-describedby="form-a11y-export-description"/],
  ["src/components/admin/pokemon/admin-todo-panel.jsx", /aria-label="Ajouter une tâche"/],
  ["src/components/admin/pokemon/admin-todo-panel.jsx", /<input\s+aria-label="Modifier la tâche"\s+autoFocus/],
  ["src/components/admin/pokemon/collections-panel.jsx", /aria-label="Rechercher dans la collection\.\.\."/],
  ["src/components/admin/pokemon/dataset-filter-bar.jsx", /aria-label=\{placeholder\}/],
  ["src/components/admin/pokemon/login-card.jsx", /id="form-a11y-pokemon-admin-password"/],
  ["src/components/admin/pokemon/login-card.jsx", /aria-label="Mot de passe admin"/],
  ["src/components/admin/pokemon/login-card.jsx", /aria-invalid=\{error \? true : undefined\}/],
  ["src/components/admin/pokemon/login-card.jsx", /aria-describedby=\{error \? "form-a11y-pokemon-admin-password-error" : undefined\}/],
  ["src/components/admin/pokemon/login-card.jsx", /id="form-a11y-pokemon-admin-password-error"/],
  ["src/components/admin/pokemon/pokemon-docs-viewer.tsx", /aria-label="Chercher dans les docs"/],
  ["src/components/admin/tables/dashboard-backlog.tsx", /aria-label="Rechercher titre, page, composant\.\.\."/],
];

const migrationApplied = source("src/components/admin/pokemon/login-card.jsx").includes("form-a11y-pokemon-admin-password");

test("l’univers courant reste exhaustif et la cohorte historique conserve 43 identifiants", () => {
  const sites = loadFieldInventory();
  assert.ok(sites.length > 0);
  assert.equal(new Set(sites.map((site) => `${site.file}:${site.line}:${site.column}:${site.element}`)).size, sites.length);
  assert.equal(initialUnnamedIds.length, 43);
  assert.deepEqual([...new Set(initialUnnamedIds)].sort(), [...initialUnnamedIds].sort());
});

test("la classification de la cohorte reste A1, B18, C3 et D21", () => {
  assert.deepEqual(
    Object.fromEntries(Object.entries(classifications).map(([category, ids]) => [category, ids.length])),
    { A: 1, B: 18, C: 3, D: 21 },
  );
  const classified = Object.values(classifications).flat();
  assert.deepEqual([...classified].sort(), [...initialUnnamedIds].sort());
});

test("Field et Input/Textarea conservent leurs contrats structurels validés", () => {
  const field = source("src/components/ui/field.tsx");
  const input = source("src/components/ui/input.tsx");
  assert.match(field, /forwardRef<HTMLLabelElement, FieldProps>/);
  assert.match(field, /label: ReactNode/);
  assert.match(field, /<label[\s\S]*<span className=\{cn\(commonLabelClass, labelClassName\)\}>\{label\}<\/span>/);
  assert.doesNotMatch(field, /cloneElement|useId|value|onChange|zod|react-hook-form/);
  assert.match(input, /forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>/);
  assert.match(input, /forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>/);
  assert.match(input, /border-line bg-surface-control/);
  assert.match(input, /focus:border-brand-2\/55 focus:bg-surface-control-focus/);
});

test("les contrôles spécialisés et les cas ambigus restent sans correction inventée", () => {
  const kanban = source("src/components/admin/forms/kanban-board.tsx");
  assert.match(kanban, /<Checkbox\s+aria-label=\{item\.text \|\| "Action de checklist"\}[\s\S]{0,500}<Input\s+value=\{item\.text\}/);
  const learning = source("src/components/admin/learning/learning-import-modal.tsx");
  assert.match(learning, /className="sr-only" type="file"/);
  assert.match(learning, /className="sr-only" type="radio"/);
  assert.doesNotMatch(learning, /type="file"[^>]*aria-label/);
});

test("les 18 corrections sûres sont absentes avant migration ou complètes après migration", () => {
  const matched = correctionContracts.map(([file, pattern]) => pattern.test(source(file)));
  if (!migrationApplied) {
    assert.ok(matched.every((value) => !value), "baseline attendue sans correction partielle");
    return;
  }
  assert.ok(matched.every(Boolean), "tous les contrats de correction doivent être présents ensemble");
});

test("les sept IDs ajoutés sont stables, uniques et limités au périmètre prévu", () => {
  if (!migrationApplied) return;
  const expected = [
    "form-a11y-journal-description",
    "form-a11y-rule-filter-label",
    "form-a11y-rule-filter-description",
    "form-a11y-bulk-description",
    "form-a11y-export-description",
    "form-a11y-pokemon-admin-password",
    "form-a11y-pokemon-admin-password-error",
  ];
  const files = new Set(correctionContracts.map(([file]) => file));
  const ids = [...files].flatMap((file) => [...source(file).matchAll(/\bid="(form-a11y-[^"]+)"/g)].map((match) => match[1]));
  assert.deepEqual(ids.sort(), expected.sort());
  assert.equal(new Set(ids).size, ids.length);
});
