import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const srcRoot = path.join(root, "src");
const buttonPath = path.join(srcRoot, "components/ui/button.tsx");
const cnPath = path.join(srcRoot, "lib/cn.ts");

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

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

function attributeText(node, name, sourceFile) {
  const property = attribute(node, name);
  if (!property?.initializer) return "";
  if (ts.isStringLiteral(property.initializer)) return property.initializer.text;
  if (ts.isJsxExpression(property.initializer) && property.initializer.expression) {
    return property.initializer.expression.getText(sourceFile);
  }
  return property.initializer.getText(sourceFile);
}

function literalAttribute(node, name) {
  const property = attribute(node, name);
  if (!property?.initializer) return property ? "true" : "";
  return ts.isStringLiteral(property.initializer) ? property.initializer.text : "";
}

function enclosingComponent(node, sourceFile) {
  let current = node.parent;
  while (current) {
    if (ts.isFunctionDeclaration(current) && current.name) return current.name.text;
    if (
      (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) &&
      ts.isVariableDeclaration(current.parent) &&
      ts.isIdentifier(current.parent.name)
    ) {
      return current.parent.name.text;
    }
    current = current.parent;
  }
  return path.basename(sourceFile.fileName).replace(/\.[^.]+$/, "");
}

function visibleContent(opening, sourceFile) {
  const parent = opening.parent;
  if (!ts.isJsxElement(parent)) return "";
  return parent.children
    .map((child) => child.getText(sourceFile).replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 180);
}

function insideCanonicalAsChild(node, canonicalNames) {
  let current = node.parent?.parent;
  while (current) {
    if (
      ts.isJsxElement(current) &&
      canonicalNames.has(jsxTagName(current.openingElement.tagName)) &&
      attribute(current.openingElement, "asChild")
    ) return true;
    current = current.parent;
  }
  return false;
}

function semanticElement(opening, canonicalNames) {
  const tag = jsxTagName(opening.tagName);
  if (!canonicalNames.has(tag) || !attribute(opening, "asChild") || !ts.isJsxElement(opening.parent)) {
    return tag === "Button" ? "button" : tag;
  }
  const child = opening.parent.children.find((item) => ts.isJsxElement(item) || ts.isJsxSelfClosingElement(item));
  if (!child) return "polymorphe";
  return ts.isJsxElement(child) ? jsxTagName(child.openingElement.tagName) : jsxTagName(child.tagName);
}

function looksButtonStyled(tag, classes) {
  if (!new Set(["a", "Link"]).has(tag)) return false;
  const signals = [
    /(?:^|\s)(?:inline-)?flex(?:\s|$)/,
    /(?:^|\s)items-center(?:\s|$)/,
    /(?:^|\s)justify-(?:center|between)(?:\s|$)/,
    /(?:^|\s)rounded-(?:full|lg|xl|2xl)(?:\s|$)/,
    /(?:^|\s)(?:min-)?h-(?:8|9|10|11|12|\[[^\]]+\])(?:\s|$)/,
    /(?:^|\s)(?:px|p)-[2-9](?:\.?5)?(?:\s|$)/,
    /(?:^|\s)border(?:\s|$)/,
    /(?:^|\s)(?:bg|hover:bg)-/,
  ];
  return signals.filter((signal) => signal.test(classes)).length >= 4;
}

function isIconOnly(content, ariaLabel, title) {
  if (ariaLabel || title) {
    return !/[A-Za-zÀ-ÿ0-9]{2,}/.test(content.replace(/<[^>]+>/g, " "));
  }
  return /^<[^>]+\/?>(?:\s*)$/.test(content);
}

const businessWrappers = new Set([
  "EventButton",
  "ExternalButton",
  "LoadMoreButton",
  "ProgressButton",
  "ToolbarButton",
]);

const richControlComponents = new Set([
  "AdminActions",
  "AdminPaletteSelector",
  "AdminSectionNavigation",
  "AdminSidebar",
  "AdminSidebarLink",
  "AdminTopbar",
  "CalendarDayCell",
  "DatasetFilterBar",
  "DetailModal",
  "EventDetailModal",
  "EventEditorModal",
  "EventRow",
  "GenerationFilterBar",
  "KanbanBoard",
  "KanbanTaskCard",
  "MiniMonth",
  "Modal",
  "MonthGrid",
  "MultiDaySegment",
  "SingleDayEvent",
  "SortableWidgetFrame",
  "SortableWidgetGrid",
]);

function classifySite(site) {
  if (businessWrappers.has(site.component)) {
    const candidate = site.component === "ExternalButton" || site.component === "LoadMoreButton";
    return {
      category: "B",
      migrationPossible: candidate ? "conditionnelle" : "wrapper conservé",
      risk: candidate ? "moyen" : "élevé",
      notes: candidate
        ? "Wrapper métier candidat ; équivalence DOM/styles/interaction requise."
        : "Wrapper métier utile ; composition ou sémantique spécialisée conservée.",
    };
  }
  if (site.kind === "canonical-button") {
    return {
      category: "A",
      migrationPossible: "déjà canonique",
      risk: "faible",
      notes: "Usage direct de la primitive canonique ; aucune migration nécessaire.",
    };
  }
  if (site.kind === "role-button") {
    return {
      category: "C",
      migrationPossible: "non",
      risk: "élevé",
      notes: "Contrôle ARIA non natif ; correction réservée à un sprint accessibilité.",
    };
  }
  if (site.kind === "styled-link") {
    if (site.component === "AccountPage") {
      return {
        category: "D",
        migrationPossible: "hors sprint",
        risk: "moyen",
        notes: "Lien CTA isolé ; contrat lien/bouton non caractérisé sur cette page.",
      };
    }
    return {
      category: "C",
      migrationPossible: "non",
      risk: "élevé",
      notes: "Navigation, carte-lien ou composite riche ; l’apparence seule ne suffit pas.",
    };
  }
  const richByLocation =
    site.file.includes("/events/") ||
    site.file.includes("/navigation/") ||
    site.file.endsWith("/forms/kanban-board.tsx") ||
    site.file.endsWith("/layout/admin-version-history-dialog.tsx") ||
    site.file.endsWith("/shared/sortable-widget-grid.tsx");
  const richByState =
    Boolean(site.ariaPressed) ||
    /(?:selected|active|toggle|drag|aria-|rounded-full)/i.test(`${site.classes} ${site.component}`);
  if (richControlComponents.has(site.component) || richByLocation || richByState) {
    return {
      category: "C",
      migrationPossible: "non",
      risk: "élevé",
      notes: "Toggle, navigation, carte, drag, modal ou contrôle riche explicitement exclu.",
    };
  }
  return {
    category: "D",
    migrationPossible: "hors sprint",
    risk: "moyen",
    notes: site.file.includes("/pokemon/")
      ? "Action legacy Pokémon ; nécessite l’adaptateur visuel et les palettes dédiées."
      : "Action native ambiguë ; documentation seule faute d’équivalence mesurée.",
  };
}

export function collectInventory() {
  const sites = [];
  const namedComponents = [];

  for (const absolutePath of sourceFiles()) {
    const source = readFileSync(absolutePath, "utf8");
    const relativePath = path.relative(root, absolutePath);
    const scriptKind = absolutePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.JSX;
    const sourceFile = ts.createSourceFile(
      absolutePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      scriptKind,
    );
    const canonicalNames = new Set();

    for (const statement of sourceFile.statements) {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text === "@/components/ui/button" &&
        statement.importClause?.namedBindings &&
        ts.isNamedImports(statement.importClause.namedBindings)
      ) {
        for (const element of statement.importClause.namedBindings.elements) {
          if ((element.propertyName || element.name).text === "Button") {
            canonicalNames.add(element.name.text);
          }
        }
      }
    }

    function visit(node) {
      let declarationName = "";
      if (ts.isFunctionDeclaration(node) && node.name) declarationName = node.name.text;
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer &&
        (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
      ) {
        declarationName = node.name.text;
      }
      if (
        declarationName &&
        /^[A-Z]/.test(declarationName) &&
        /(Button|Action|Trigger|Toggle|Control|Link)/.test(declarationName)
      ) {
        const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
        namedComponents.push({ component: declarationName, file: relativePath, line });
      }

      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = jsxTagName(node.tagName);
        const classes = attributeText(node, "className", sourceFile);
        const component = enclosingComponent(node, sourceFile);
        const role = (literalAttribute(node, "role") || attributeText(node, "role", sourceFile))
          .replace(/["']/g, "");
        const namedActionLink =
          new Set(["a", "Link"]).has(tag) &&
          /^[A-Z]/.test(component) &&
          /(Button|Action|Trigger|Toggle|Control|Link)/.test(component);
        const nestedAsChildRoot = insideCanonicalAsChild(node, canonicalNames);
        const kind = nestedAsChildRoot
          ? ""
          : canonicalNames.has(tag)
          ? "canonical-button"
          : tag === "button"
            ? "native-button"
            : role === "button"
              ? "role-button"
              : looksButtonStyled(tag, classes) || namedActionLink
                ? "styled-link"
                : "";

        if (kind) {
          const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
          const content = visibleContent(node, sourceFile);
          const ariaLabel = literalAttribute(node, "aria-label") || attributeText(node, "aria-label", sourceFile);
          const title = literalAttribute(node, "title") || attributeText(node, "title", sourceFile);
          const site = {
            kind,
            component,
            file: relativePath,
            line,
            element: tag,
            semanticElement: semanticElement(node, canonicalNames),
            type: literalAttribute(node, "type") || attributeText(node, "type", sourceFile),
            href: literalAttribute(node, "href") || attributeText(node, "href", sourceFile),
            target: literalAttribute(node, "target") || attributeText(node, "target", sourceFile),
            rel: literalAttribute(node, "rel") || attributeText(node, "rel", sourceFile),
            ariaPressed: literalAttribute(node, "aria-pressed") || attributeText(node, "aria-pressed", sourceFile),
            ariaDisabled: literalAttribute(node, "aria-disabled") || attributeText(node, "aria-disabled", sourceFile),
            disabled: Boolean(attribute(node, "disabled")),
            iconOnly: isIconOnly(content, ariaLabel, title),
            accessibleName: ariaLabel || title || content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 100),
            classes: classes.replace(/\s+/g, " ").trim().slice(0, 260),
          };
          sites.push({ ...site, ...classifySite(site) });
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  }

  sites.sort((left, right) => left.file.localeCompare(right.file) || left.line - right.line);
  namedComponents.sort(
    (left, right) => left.file.localeCompare(right.file) || left.line - right.line,
  );
  return { sites, namedComponents };
}

const dumpInventory = process.argv.includes("--dump-inventory");

if (dumpInventory) {
  process.stdout.write(`${JSON.stringify(collectInventory(), null, 2)}\n`);
} else {
  test("Button conserve son API finie, son polymorphisme et ses classes structurantes", () => {
    const source = readFileSync(buttonPath, "utf8");
    assert.match(source, /type ButtonVariant = "primary" \| "secondary" \| "ghost" \| "danger";/);
    assert.match(source, /type ButtonSize = "sm" \| "md" \| "lg" \| "icon";/);
    assert.match(source, /ButtonHTMLAttributes<HTMLButtonElement>/);
    assert.match(source, /asChild\?: boolean/);
    assert.match(source, /icon\?: ReactNode/);
    assert.match(source, /const Component = asChild \? Slot : "button"/);
    assert.match(source, /inline-flex items-center justify-center gap-2 rounded-lg border font-black/);
    assert.match(source, /focus-visible:outline-brand-2/);
    assert.match(source, /disabled:cursor-not-allowed disabled:opacity-50/);
    assert.match(source, /variants\[variant\],\s*sizes\[size\],\s*className/);
  });

  test("les variantes et tailles Button restent exactement les contrats 4 × 4", () => {
    const source = readFileSync(buttonPath, "utf8");
    const variantBlock = source.match(/const variants:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] || "";
    const sizeBlock = source.match(/const sizes:[\s\S]*?= \{([\s\S]*?)\n\};/)?.[1] || "";
    assert.deepEqual([...variantBlock.matchAll(/^\s{2}(\w+):/gm)].map((match) => match[1]), [
      "primary",
      "secondary",
      "ghost",
      "danger",
    ]);
    assert.deepEqual([...sizeBlock.matchAll(/^\s{2}(\w+):/gm)].map((match) => match[1]), [
      "sm",
      "md",
      "lg",
      "icon",
    ]);
  });

  test("cn conserve clsx puis tailwind-merge", () => {
    const source = readFileSync(cnPath, "utf8");
    assert.match(source, /twMerge\(clsx\(inputs\)\)/);
  });

  test("les cinq wrappers obligatoires conservent leur sémantique", () => {
    const dashboard = read("src/components/admin/dashboard/dashboard-home-live.tsx");
    const calendar = read("src/components/admin/forms/calendar-planner.tsx");
    const writer = read("src/components/admin/forms/writer-studio.tsx");
    const learning = read("src/components/admin/learning/learning-detail-modal.tsx");
    const pokemon = read("src/components/admin/pokemon/admin-app.jsx");

    assert.match(dashboard, /function ExternalButton/);
    assert.match(dashboard, /href\.startsWith\("\/"\)/);
    assert.match(dashboard, /target="_blank" rel="noreferrer"/);
    assert.match(calendar, /function EventButton/);
    assert.match(calendar, /type="button"/);
    assert.match(calendar, /selected\s*\?/);
    assert.match(writer, /function ToolbarButton[\s\S]*?<Button size="sm" type="button"/);
    assert.match(learning, /function ProgressButton[\s\S]*?<Button/);
    assert.match(learning, /disabled=\{saving\}/);
    assert.match(pokemon, /function LoadMoreButton/);
    assert.match(pokemon, /type="button"/);
  });

  test("l’inventaire couvre chaque catégorie d’action attendue", () => {
    const inventory = collectInventory();
    const counts = Object.groupBy(inventory.sites, (site) => site.kind);
    assert.ok((counts["canonical-button"]?.length || 0) > 0);
    assert.ok((counts["native-button"]?.length || 0) > 0);
    assert.ok((counts["styled-link"]?.length || 0) > 0);
    assert.ok(inventory.namedComponents.some((item) => item.component === "ExternalButton"));
    assert.ok(inventory.namedComponents.some((item) => item.component === "LoadMoreButton"));
    assert.ok(inventory.namedComponents.some((item) => item.component === "EventButton"));
    assert.ok(inventory.namedComponents.some((item) => item.component === "ToolbarButton"));
    assert.ok(inventory.namedComponents.some((item) => item.component === "ProgressButton"));
  });
}
