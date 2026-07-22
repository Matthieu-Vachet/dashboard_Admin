import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = process.cwd();
const target = process.env.SELECT_CHECKBOX_PHASE !== "baseline";
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = "src") {
  return readdirSync(path.join(root, directory)).flatMap((name) => {
    const relative = path.join(directory, name);
    const info = statSync(path.join(root, relative));
    if (info.isDirectory()) return sourceFiles(relative);
    return /\.(?:js|jsx|ts|tsx)$/.test(name) ? [relative] : [];
  });
}

function attributeMap(node, sourceFile) {
  return Object.fromEntries(node.attributes.properties.flatMap((attribute) => {
    if (!ts.isJsxAttribute(attribute)) return [];
    return [[attribute.name.getText(sourceFile), attribute.initializer?.getText(sourceFile) || "true"]];
  }));
}

function functionName(node, sourceFile) {
  if (node.name) return node.name.getText(sourceFile);
  if (node.parent && ts.isVariableDeclaration(node.parent)) return node.parent.name.getText(sourceFile);
  return "anonymous";
}

function inventoryControls() {
  const selects = [];
  const checkboxes = [];
  for (const file of sourceFiles()) {
    if (["src/components/ui/select.tsx", "src/components/ui/checkbox.tsx"].includes(file)) continue;
    const source = read(file);
    const kind = /\.tsx?$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.JSX;
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, kind);
    const ancestors = [];
    const functions = [];

    function record(node, collection, control) {
      const attributes = attributeMap(node, sourceFile);
      const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
      const accessibleBy = attributes["aria-label"] ? "aria-label"
        : attributes["aria-labelledby"] ? "aria-labelledby"
          : ancestors.some((tag) => ["label", "Field", "FieldRoot"].includes(tag)) ? "ancestor-label"
            : "missing";
      collection.push({
        file,
        line,
        control,
        function: functions.at(-1) || "module",
        accessibleBy,
        controlled: Boolean(attributes.value || attributes.checked),
        defaultControlled: Boolean(attributes.defaultValue || attributes.defaultChecked),
        disabled: Boolean(attributes.disabled),
        required: Boolean(attributes.required),
        invalid: Boolean(attributes["aria-invalid"]),
        className: attributes.className || null,
      });
    }

    function visit(node) {
      const isFunction = ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node);
      if (isFunction) functions.push(functionName(node, sourceFile));
      let pushed = false;
      if (ts.isJsxElement(node)) {
        ancestors.push(node.openingElement.tagName.getText(sourceFile));
        pushed = true;
      }
      const element = ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node) ? node : null;
      if (element) {
        const tag = element.tagName.getText(sourceFile);
        if (["select", "Select"].includes(tag)) record(element, selects, tag);
        if (tag === "Checkbox") record(element, checkboxes, tag);
        if (tag === "input") {
          const attributes = attributeMap(element, sourceFile);
          if (/^["']checkbox["']$/.test(attributes.type || "")) record(element, checkboxes, "input");
        }
      }
      ts.forEachChild(node, visit);
      if (pushed) ancestors.pop();
      if (isFunction) functions.pop();
    }
    visit(sourceFile);
  }

  const allSources = sourceFiles().map(read).join("\n");
  const wrapperNames = new Set(["FilterSelect", "FormatSelect", "SelectField"]);
  const wrapperSelects = selects.filter((item) => wrapperNames.has(item.function));
  const summary = {
    select: {
      totalLike: selects.length + 1,
      controls: selects.length,
      canonical: selects.filter((item) => item.control === "Select").length,
      nativeGeneric: selects.filter((item) => item.control === "select").length,
      wrappers: wrapperSelects.length,
      specialized: 1,
      ambiguous: 0,
      accessible: selects.filter((item) => item.accessibleBy !== "missing").length,
      coverage: Number((100 * selects.filter((item) => item.control === "Select").length / Math.max(1, selects.length)).toFixed(1)),
    },
    checkbox: {
      totalLike: checkboxes.length + 5,
      controls: checkboxes.length,
      canonical: checkboxes.filter((item) => item.control === "Checkbox").length,
      nativeGeneric: checkboxes.filter((item) => item.control === "input").length,
      wrappers: 0,
      specialized: (allSources.match(/aria-checked=/g) || []).length,
      falsePositives: (allSources.match(/aria-pressed=/g) || []).length + (allSources.match(/type=["']radio["']/g) || []).length,
      ambiguous: 0,
      accessible: checkboxes.filter((item) => item.accessibleBy !== "missing").length,
      coverage: Number((100 * checkboxes.filter((item) => item.control === "Checkbox").length / Math.max(1, checkboxes.length)).toFixed(1)),
    },
  };
  return { generatedAt: new Date().toISOString(), summary, selects, checkboxes };
}

const inventory = inventoryControls();
if (process.env.SELECT_CHECKBOX_INVENTORY_OUT) {
  const output = path.resolve(root, process.env.SELECT_CHECKBOX_INVENTORY_OUT);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(inventory, null, 2)}\n`);
}

test("l'inventaire Select et Checkbox couvre les racines courantes", () => {
  assert.equal(inventory.summary.select.controls, 67);
  assert.equal(inventory.summary.select.wrappers, 5);
  assert.equal(inventory.summary.select.specialized, 1);
  assert.equal(inventory.summary.checkbox.controls, 10);
  assert.equal(inventory.summary.checkbox.specialized, 1);
  assert.equal(inventory.summary.checkbox.falsePositives, 4);
});

test("Select est une primitive native-backed à API HTML et ref", () => {
  if (!target) return assert.equal(inventory.summary.select.canonical, 0);
  const source = read("src/components/ui/select.tsx");
  assert.match(source, /forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>/);
  assert.match(source, /<select/);
  assert.match(source, /border-line bg-surface-control/);
  assert.match(source, /focus-visible:ring-brand-2/);
  assert.doesNotMatch(source, /(?:bg-white|border-white|text-slate|bg-slate)-/);
});

test("Checkbox est une primitive native-backed à API HTML et ref", () => {
  if (!target) return assert.equal(inventory.summary.checkbox.canonical, 0);
  const source = read("src/components/ui/checkbox.tsx");
  assert.match(source, /forwardRef<HTMLInputElement, CheckboxProps>/);
  assert.match(source, /type="checkbox"/);
  assert.match(source, /accent-brand-2/);
  assert.match(source, /focus-visible:ring-brand-2/);
  assert.doesNotMatch(source, /indeterminate/);
  assert.doesNotMatch(source, /(?:bg-white|border-white|text-slate|bg-slate)-/);
});

test("tous les contrôles génériques et wrappers compatibles composent les primitives", () => {
  if (!target) {
    assert.equal(inventory.summary.select.nativeGeneric, 67);
    assert.equal(inventory.summary.checkbox.nativeGeneric, 10);
    return;
  }
  assert.equal(inventory.summary.select.canonical, 67);
  assert.equal(inventory.summary.select.nativeGeneric, 0);
  assert.equal(inventory.summary.checkbox.canonical, 10);
  assert.equal(inventory.summary.checkbox.nativeGeneric, 0);
  assert.equal(inventory.summary.select.coverage, 100);
  assert.equal(inventory.summary.checkbox.coverage, 100);
});

test("chaque contrôle migré conserve un nom accessible démontré", () => {
  if (!target) {
    assert.ok(inventory.summary.select.accessible < inventory.summary.select.controls);
    assert.equal(inventory.summary.checkbox.accessible, 9);
    return;
  }
  assert.equal(inventory.summary.select.accessible, inventory.summary.select.controls);
  assert.equal(inventory.summary.checkbox.accessible, inventory.summary.checkbox.controls);
});

test("les contrôles spécialisés et faux positifs restent hors primitives", () => {
  const palette = read("src/components/admin/navigation/admin-palette-selector.tsx");
  const attackers = read("src/components/admin/pokemon/best-attackers-panel.jsx");
  const learning = read("src/components/admin/learning/learning-import-modal.tsx");
  assert.doesNotMatch(palette, /components\/ui\/(?:select|checkbox)/);
  assert.match(attackers, /aria-checked=\{selected\}/);
  assert.match(learning, /type="radio"/);
});

test("Field conserve son contrat minimal inchangé", () => {
  const digest = createHash("sha256").update(read("src/components/ui/field.tsx")).digest("hex");
  assert.equal(digest, "c5a4830f582800106996f5a7c60369c9f771864fdcaa19e2ab51d0dc44da4c33");
});

console.log(`Select + Checkbox inventory: ${JSON.stringify(inventory.summary)}`);
