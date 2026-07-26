import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const srcRoot = path.join(root, "src");
const read = (file) => readFileSync(path.join(root, file), "utf8");

function sourceFiles(directory = srcRoot) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(absolutePath);
    return /\.(?:jsx|tsx)$/.test(entry.name) ? [absolutePath] : [];
  });
}

function jsxTagName(tagName) {
  return tagName.getText();
}

function attribute(node, name) {
  return node.attributes.properties.find(
    (property) => ts.isJsxAttribute(property) && property.name.text === name,
  );
}

function literalAttribute(node, name) {
  const property = attribute(node, name);
  if (!property?.initializer) return property ? "true" : "";
  return ts.isStringLiteral(property.initializer) ? property.initializer.text : "";
}

function importedAliases(sourceFile, modulePath, exportName) {
  const aliases = new Set();
  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement)
      || !ts.isStringLiteral(statement.moduleSpecifier)
      || statement.moduleSpecifier.text !== modulePath
      || !statement.importClause?.namedBindings
      || !ts.isNamedImports(statement.importClause.namedBindings)
    ) continue;
    for (const element of statement.importClause.namedBindings.elements) {
      if ((element.propertyName || element.name).text === exportName) aliases.add(element.name.text);
    }
  }
  return aliases;
}

function inventory() {
  const nativeSelects = [];
  const nativeCheckboxes = [];
  const obsoleteErrorStateProps = [];
  const localFieldWrappers = [];

  for (const absolutePath of sourceFiles()) {
    const relativePath = path.relative(root, absolutePath);
    const source = readFileSync(absolutePath, "utf8");
    const sourceFile = ts.createSourceFile(
      absolutePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      absolutePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.JSX,
    );
    const errorStateAliases = importedAliases(
      sourceFile,
      "@/components/admin/shared/state-system",
      "ErrorState",
    );
    const fieldAliases = importedAliases(sourceFile, "@/components/ui/field", "Field");

    function visit(node) {
      if (ts.isFunctionDeclaration(node) && node.name?.text === "Field") {
        const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
        const body = node.body?.getText(sourceFile) || "";
        localFieldWrappers.push({
          file: relativePath,
          line,
          composesPrimitive: [...fieldAliases].some((alias) => new RegExp(`<${alias}\\b`).test(body)),
        });
      }

      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = jsxTagName(node.tagName);
        const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
        if (tag === "select" && relativePath !== "src/components/ui/select.tsx") {
          nativeSelects.push({ file: relativePath, line });
        }
        if (
          tag === "input"
          && literalAttribute(node, "type") === "checkbox"
          && relativePath !== "src/components/ui/checkbox.tsx"
        ) {
          nativeCheckboxes.push({ file: relativePath, line });
        }
        if (errorStateAliases.has(tag)) {
          for (const property of ["description", "error"]) {
            if (attribute(node, property)) obsoleteErrorStateProps.push({ file: relativePath, line, property });
          }
          if (!attribute(node, "message")) obsoleteErrorStateProps.push({ file: relativePath, line, property: "message absent" });
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }

  return { nativeSelects, nativeCheckboxes, obsoleteErrorStateProps, localFieldWrappers };
}

const current = inventory();

test("les contrats centraux requis restent présents", () => {
  const contracts = {
    "src/components/ui/badge.tsx": ["Badge"],
    "src/components/ui/button.tsx": ["Button"],
    "src/components/ui/card.tsx": ["Card", "CardHeader", "CardTitle", "CardDescription"],
    "src/components/ui/checkbox.tsx": ["Checkbox"],
    "src/components/ui/field.tsx": ["Field"],
    "src/components/ui/input.tsx": ["Input", "Textarea"],
    "src/components/ui/modal.tsx": ["Modal"],
    "src/components/ui/select.tsx": ["Select"],
    "src/components/admin/shared/state-system.tsx": ["FetchLoadingState", "EmptyState", "ErrorState"],
  };
  for (const [file, exports] of Object.entries(contracts)) {
    const source = read(file);
    for (const name of exports) assert.match(source, new RegExp(`export (?:const|function) ${name}\\b`), `${file}: ${name}`);
  }
});

test("Select et Checkbox génériques ne sont pas réimplémentés nativement", () => {
  assert.deepEqual(current.nativeSelects, []);
  assert.deepEqual(current.nativeCheckboxes, []);
});

test("ErrorState utilise uniquement son contrat message courant", () => {
  assert.deepEqual(current.obsoleteErrorStateProps, []);
});

test("les façades Field locales composent la primitive canonique", () => {
  assert.ok(current.localFieldWrappers.length > 0);
  assert.ok(
    current.localFieldWrappers.every((wrapper) => wrapper.composesPrimitive),
    JSON.stringify(current.localFieldWrappers.filter((wrapper) => !wrapper.composesPrimitive)),
  );
});

test("les règles de gouvernance permanentes sont documentées", () => {
  const program = read("docs/Design System Program/DESIGN-SYSTEM-PROGRAM.md");
  assert.match(program, /primitive existante[\s\S]*composant partagé existant[\s\S]*wrapper métier existant[\s\S]*token existant[\s\S]*composition possible/i);
  assert.match(program, /STRUCTURAL DESIGN SYSTEM CONSOLIDATION/i);
  assert.match(program, /FUTURE UX\/UI PRODUCT IMPROVEMENTS/i);
});
