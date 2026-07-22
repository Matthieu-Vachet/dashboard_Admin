import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const srcRoot = path.join(root, "src");
const inputPath = path.join(srcRoot, "components/ui/input.tsx");
const fieldPath = path.join(srcRoot, "components/ui/field.tsx");
const cnPath = path.join(srcRoot, "lib/cn.ts");
const commonRootClass = "block";
const commonLabelClass = "text-xs font-black uppercase tracking-[0.16em] text-muted";
const wrapperNames = new Set(["Field", "Area", "InputField", "TextareaField", "FormField", "RangeFields", "SearchField"]);
const specializedTypes = new Set(["hidden", "color", "checkbox", "file", "radio", "range"]);

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

function attribute(node, name, sourceFile) {
  return node.attributes.properties.find(
    (property) => ts.isJsxAttribute(property) && property.name.getText(sourceFile) === name,
  );
}

function attributeText(node, name, sourceFile) {
  const property = attribute(node, name, sourceFile);
  if (!property?.initializer) return property ? "true" : "";
  if (ts.isStringLiteral(property.initializer)) return property.initializer.text;
  if (ts.isJsxExpression(property.initializer) && property.initializer.expression) {
    return property.initializer.expression.getText(sourceFile);
  }
  return property.initializer.getText(sourceFile);
}

function enclosingComponent(node, sourceFile) {
  let current = node.parent;
  while (current) {
    if (ts.isFunctionDeclaration(current) && current.name) return current.name.text;
    if (
      (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) &&
      ts.isVariableDeclaration(current.parent) &&
      ts.isIdentifier(current.parent.name)
    ) return current.parent.name.text;
    current = current.parent;
  }
  return path.basename(sourceFile.fileName).replace(/\.[^.]+$/, "");
}

function jsxText(node, sourceFile) {
  return node
    .getText(sourceFile)
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function visibleLabelText(field) {
  if (!field) return "";
  const parts = [];
  function visit(node) {
    if (ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, " ").trim();
      if (value) parts.push(value);
      return;
    }
    if (ts.isJsxExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "label") {
      parts.push("{label}");
      return;
    }
    if (ts.isJsxElement(node)) {
      const tag = jsxTagName(node.openingElement.tagName);
      if (["input", "textarea", "select", "Input", "Textarea"].includes(tag)) return;
    }
    if (ts.isJsxSelfClosingElement(node)) return;
    ts.forEachChild(node, visit);
  }
  visit(field);
  return parts.join(" ").replace(/\s+/g, " ").trim().slice(0, 80);
}

function nearestFieldAncestor(node, sourceFile, fieldAliases) {
  let current = node.parent;
  while (current) {
    if (ts.isJsxElement(current)) {
      const tag = jsxTagName(current.openingElement.tagName);
      if (tag === "label" || fieldAliases.has(tag)) return current;
    }
    if (ts.isFunctionLike(current)) return null;
    current = current.parent;
  }
  return null;
}

function spanLabel(field, sourceFile) {
  if (!field || !ts.isJsxElement(field)) return { text: "", className: "" };
  const span = field.children.find(
    (child) => ts.isJsxElement(child) && jsxTagName(child.openingElement.tagName) === "span",
  );
  if (!span || !ts.isJsxElement(span)) return { text: "", className: "" };
  return {
    text: jsxText(span, sourceFile) || (span.getText(sourceFile).includes("{label}") ? "{label}" : ""),
    className: attributeText(span.openingElement, "className", sourceFile),
  };
}

function classification(site) {
  if (wrapperNames.has(site.component)) {
    return {
      category: "B",
      migrationPossible: site.component === "RangeFields" ? "non dans ce sprint" : "oui — composition Field",
      risk: "moyen",
      notes: site.component === "RangeFields"
        ? "Paire numérique sous fieldset/legend conservée comme wrapper métier."
        : "Wrapper métier conservé ; seule sa racine de structure est composable.",
    };
  }
  if (specializedTypes.has(site.type)) {
    return {
      category: "C",
      migrationPossible: "non",
      risk: "élevé",
      notes: `Contrôle spécialisé ${site.type} explicitement exclu.`,
    };
  }
  if (site.commonField) {
    return {
      category: "A",
      migrationPossible: "oui — Field",
      risk: "faible",
      notes: "Anatomie commune exacte, contrôle déjà canonique et logique inchangée.",
    };
  }
  return {
    category: "D",
    migrationPossible: "non dans ce sprint",
    risk: "moyen",
    notes: site.named
      ? "Structure, palette ou orchestration distincte ; équivalence non prouvée."
      : site.placeholder
        ? "Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité."
        : "Contrôle sans contrat Field comparable ; documentation seule.",
  };
}

export function collectInventory() {
  const sites = [];
  const wrappers = [];
  let semanticLabelSites = 0;
  let canonicalFieldUsages = 0;

  for (const absolutePath of sourceFiles()) {
    const source = readFileSync(absolutePath, "utf8");
    const relativePath = path.relative(root, absolutePath);
    const sourceFile = ts.createSourceFile(
      absolutePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      absolutePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.JSX,
    );
    const inputAliases = new Map();
    const fieldAliases = new Set();
    const explicitLabels = new Map();

    for (const statement of sourceFile.statements) {
      if (
        !ts.isImportDeclaration(statement) ||
        !ts.isStringLiteral(statement.moduleSpecifier) ||
        !statement.importClause?.namedBindings ||
        !ts.isNamedImports(statement.importClause.namedBindings)
      ) continue;
      for (const element of statement.importClause.namedBindings.elements) {
        const imported = (element.propertyName || element.name).text;
        if (statement.moduleSpecifier.text === "@/components/ui/input" && ["Input", "Textarea"].includes(imported)) {
          inputAliases.set(element.name.text, imported);
        }
        if (statement.moduleSpecifier.text === "@/components/ui/field" && imported === "Field") {
          fieldAliases.add(element.name.text);
        }
      }
    }

    function collectLabels(node) {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = jsxTagName(node.tagName);
        if (tag === "label" && relativePath !== "src/components/ui/field.tsx") {
          semanticLabelSites += 1;
          const htmlFor = attributeText(node, "htmlFor", sourceFile);
          if (htmlFor && ts.isJsxElement(node.parent)) explicitLabels.set(htmlFor, jsxText(node.parent, sourceFile));
        }
        if (fieldAliases.has(tag)) {
          semanticLabelSites += 1;
          canonicalFieldUsages += 1;
        }
      }
      ts.forEachChild(node, collectLabels);
    }
    collectLabels(sourceFile);

    function visit(node) {
      let declarationName = "";
      if (ts.isFunctionDeclaration(node) && node.name) declarationName = node.name.text;
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer &&
        (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
      ) declarationName = node.name.text;
      if (wrapperNames.has(declarationName)) {
        const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
        wrappers.push({ component: declarationName, file: relativePath, line });
      }

      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const rawTag = jsxTagName(node.tagName);
        const primitive = inputAliases.get(rawTag);
        const native = rawTag === "input" || rawTag === "textarea";
        const isPrimitiveImplementation = [
          "src/components/ui/checkbox.tsx",
          "src/components/ui/input.tsx",
        ].includes(relativePath) && native;
        if ((primitive || native) && !isPrimitiveImplementation) {
          const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
          const field = nearestFieldAncestor(node, sourceFile, fieldAliases);
          const fieldTag = field && ts.isJsxElement(field) ? jsxTagName(field.openingElement.tagName) : "";
          const fieldOpening = field && ts.isJsxElement(field) ? field.openingElement : null;
          const labelSpan = spanLabel(field, sourceFile);
          const canonicalField = Boolean(fieldTag && fieldAliases.has(fieldTag));
          const fieldLabel = canonicalField && fieldOpening
            ? attributeText(fieldOpening, "label", sourceFile)
            : labelSpan.text || visibleLabelText(field);
          const fieldRootClass = fieldOpening ? attributeText(fieldOpening, "className", sourceFile) : "";
          const effectiveLabelClass = canonicalField && fieldOpening
            ? attributeText(fieldOpening, "labelClassName", sourceFile) || commonLabelClass
            : labelSpan.className;
          const effectiveRootClass = canonicalField ? fieldRootClass || commonRootClass : fieldRootClass;
          const type = attributeText(node, "type", sourceFile) || (rawTag.toLowerCase().includes("textarea") ? "textarea" : "text");
          const id = attributeText(node, "id", sourceFile);
          const ariaLabel = attributeText(node, "aria-label", sourceFile);
          const explicitLabel = explicitLabels.get(id) || "";
          const implicit = Boolean(field);
          const site = {
            kind: primitive || `native-${rawTag}`,
            component: enclosingComponent(node, sourceFile),
            file: relativePath,
            line,
            element: primitive || rawTag,
            semanticElement: rawTag.toLowerCase().includes("textarea") || primitive === "Textarea" ? "textarea" : "input",
            type,
            id,
            name: attributeText(node, "name", sourceFile),
            placeholder: attributeText(node, "placeholder", sourceFile),
            required: Boolean(attribute(node, "required", sourceFile)),
            disabled: Boolean(attribute(node, "disabled", sourceFile)),
            readOnly: Boolean(attribute(node, "readOnly", sourceFile)),
            controlled: Boolean(attribute(node, "value", sourceFile) || attribute(node, "checked", sourceFile)),
            ariaInvalid: attributeText(node, "aria-invalid", sourceFile),
            ariaDescribedby: attributeText(node, "aria-describedby", sourceFile),
            label: fieldLabel || explicitLabel || ariaLabel,
            labelMode: implicit ? "implicit" : explicitLabel ? "explicit" : ariaLabel ? "aria-label" : "none",
            named: Boolean(fieldLabel || explicitLabel || ariaLabel),
            commonField: Boolean(
              primitive && effectiveRootClass === commonRootClass && effectiveLabelClass === commonLabelClass,
            ),
            classes: attributeText(node, "className", sourceFile).replace(/\s+/g, " ").trim().slice(0, 220),
          };
          sites.push({ ...site, ...classification(site) });
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }

  sites.sort((left, right) => left.file.localeCompare(right.file) || left.line - right.line);
  wrappers.sort((left, right) => left.file.localeCompare(right.file) || left.line - right.line);
  return { sites, wrappers, semanticLabelSites, canonicalFieldUsages };
}

function markdownInventory(inventory) {
  const header = "| ID local | Composant | Fichier | Ligne | Contrôle | Label | Description | Erreur | Utilise primitive | Catégorie | Migration possible | Risque | Notes |";
  const separator = "|---|---|---|---:|---|---|---|---|---|---|---|---|---|";
  const rows = inventory.sites.map((site, index) => {
    const value = (text) => String(text || "—").replaceAll("|", "\\|").replace(/\s+/g, " ");
    return `| FIELD-USAGE-${String(index + 1).padStart(3, "0")} | ${value(site.component)} | \`${site.file}\` | ${site.line} | ${value(`${site.semanticElement}:${site.type}`)} | ${value(site.label)} | ${site.ariaDescribedby ? "liée" : "—"} | ${site.ariaInvalid ? "liée" : "—"} | ${site.kind === "Input" || site.kind === "Textarea" ? "oui" : "non"} | ${site.category} | ${site.migrationPossible} | ${site.risk} | ${value(site.notes)} |`;
  });
  return [header, separator, ...rows].join("\n");
}

if (process.argv.includes("--dump-inventory")) {
  const inventory = collectInventory();
  process.stdout.write(`${JSON.stringify(inventory, null, 2)}\n`);
} else if (process.argv.includes("--dump-markdown")) {
  process.stdout.write(`${markdownInventory(collectInventory())}\n`);
} else if (process.argv.includes("--write-inventory")) {
  const inventoryPath = path.join(
    root,
    "docs/codex/Design System Program/sprints/field-input-textarea/field-family-inventory.md",
  );
  const source = readFileSync(inventoryPath, "utf8");
  const start = "<!-- BEGIN GENERATED INVENTORY -->";
  const end = "<!-- END GENERATED INVENTORY -->";
  assert.ok(source.includes(start) && source.includes(end), "Marqueurs d’inventaire absents");
  const before = source.slice(0, source.indexOf(start) + start.length);
  const after = source.slice(source.indexOf(end));
  writeFileSync(inventoryPath, `${before}\n${markdownInventory(collectInventory())}\n${after}`);
} else {
  test("Input et Textarea conservent leurs contrats natifs, refs et classes structurantes", () => {
    const source = readFileSync(inputPath, "utf8");
    assert.match(source, /forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>/);
    assert.match(source, /forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>/);
    assert.match(source, /<input\s+ref=\{ref\}/);
    assert.match(source, /<textarea\s+ref=\{ref\}/);
    assert.match(source, /min-h-11 w-full rounded-lg border border-line bg-surface-control px-3/);
    assert.match(source, /placeholder:text-muted\/70 focus:border-brand-2\/55 focus:bg-surface-control-focus/);
    assert.match(source, /min-h-32 w-full resize-none rounded-lg border border-line bg-surface-control p-3/);
    assert.match(source, /cn\([\s\S]*?className,[\s\S]*?\)/);
  });

  test("cn conserve clsx puis tailwind-merge", () => {
    assert.match(readFileSync(cnPath, "utf8"), /twMerge\(clsx\(inputs\)\)/);
  });

  test("l’inventaire exhaustif courant conserve ses 129 sites et ses états observés", () => {
    const inventory = collectInventory();
    const kinds = Object.groupBy(inventory.sites, (site) => site.kind);
    assert.deepEqual(
      Object.fromEntries(Object.entries(kinds).map(([kind, sites]) => [kind, sites.length])),
      { Input: 67, Textarea: 16, "native-input": 39, "native-textarea": 7 },
    );
    assert.equal(inventory.semanticLabelSites, 84);
    assert.equal(inventory.wrappers.length, 6);
    assert.equal(inventory.sites.filter((site) => site.controlled).length, 124);
    assert.equal(inventory.sites.filter((site) => site.required).length, 2);
    assert.equal(inventory.sites.filter((site) => site.disabled).length, 6);
    assert.equal(inventory.sites.filter((site) => site.readOnly).length, 2);
    assert.equal(inventory.sites.filter((site) => site.placeholder).length, 76);
    assert.equal(inventory.sites.filter((site) => site.named).length, 72);
    assert.equal(inventory.sites.filter((site) => site.ariaInvalid).length, 1);
    assert.equal(inventory.sites.filter((site) => site.ariaDescribedby).length, 5);
  });

  test("la classification courante reste A25, B6, C6 et D92", () => {
    const categories = Object.groupBy(collectInventory().sites, (site) => site.category);
    assert.deepEqual(
      Object.fromEntries(Object.entries(categories).map(([category, sites]) => [category, sites.length])),
      { A: 25, B: 6, C: 6, D: 92 },
    );
    assert.equal(collectInventory().sites.filter((site) => site.commonField).length, 27);
  });

  test("les contrôles spécialisés et RangeFields restent hors migration", () => {
    const inventory = collectInventory();
    for (const site of inventory.sites.filter((item) => specializedTypes.has(item.type))) {
      assert.equal(site.category, "C", `${site.file}:${site.line}`);
      assert.equal(site.commonField, false, `${site.file}:${site.line}`);
    }
    assert.equal(inventory.sites.filter((site) => site.component === "RangeFields").length, 2);
    assert.ok(inventory.sites.filter((site) => site.component === "RangeFields").every((site) => site.category === "B"));
  });

  test("Field, si créée, reste une composition label minimale et bornée", () => {
    if (!existsSync(fieldPath)) return;
    const source = readFileSync(fieldPath, "utf8");
    assert.match(source, /forwardRef<HTMLLabelElement, FieldProps>/);
    assert.match(source, /LabelHTMLAttributes<HTMLLabelElement>/);
    assert.match(source, /label: ReactNode/);
    assert.match(source, /labelClassName\?: string/);
    assert.match(source, /<label/);
    assert.match(source, /<span className=\{cn\(commonLabelClass, labelClassName\)\}>\{label\}<\/span>/);
    assert.doesNotMatch(source, /cloneElement|useId|value|onChange|zod|react-hook-form/);
    assert.equal(collectInventory().canonicalFieldUsages, 29);
  });
}
