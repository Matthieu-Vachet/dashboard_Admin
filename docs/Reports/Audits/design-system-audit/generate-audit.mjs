import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const workspace = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const project = path.join(workspace, "Dashboard Admin");
const sourceRoot = path.join(project, "src");
const publicRoot = path.join(project, "public");
const output = path.join(workspace, "design-system-audit");
const ts = require(require.resolve("typescript", { paths: [project] }));

const slash = (value) => value.split(path.sep).join("/");
const relWorkspace = (value) => slash(path.relative(workspace, value));
const relProject = (value) => slash(path.relative(project, value));
const esc = (value) => String(value ?? "Not found").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const code = (value) => `\`${String(value).replace(/`/g, "\\`")}\``;
const uniq = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
const read = (file) => fs.readFileSync(file, "utf8");
const ensure = (directory) => fs.mkdirSync(directory, { recursive: true });
const write = (relative, content) => {
  const target = path.join(output, relative);
  ensure(path.dirname(target));
  fs.writeFileSync(target, content.endsWith("\n") ? content : `${content}\n`);
};
const table = (headers, rows) => [
  `| ${headers.map(esc).join(" | ")} |`,
  `|${headers.map(() => "---").join("|")}|`,
  ...rows.map((row) => `| ${row.map(esc).join(" | ")} |`),
].join("\n");

for (const directory of ["components", "foundations", "pages", "appendices", "registries", "screenshots"]) {
  fs.rmSync(path.join(output, directory), { recursive: true, force: true });
  ensure(path.join(output, directory));
}

function walk(directory, predicate = () => true, excluded = new Set()) {
  const result = [];
  if (!fs.existsSync(directory)) return result;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute, predicate, excluded));
    else if (predicate(absolute)) result.push(absolute);
  }
  return result.sort();
}

const sourceFiles = walk(sourceRoot, (file) => /\.(js|jsx|ts|tsx|css)$/.test(file));
const jsxFiles = sourceFiles.filter((file) => /\.(jsx|tsx)$/.test(file));
const codeFiles = sourceFiles.filter((file) => /\.(js|jsx|ts|tsx)$/.test(file));
const cssFiles = sourceFiles.filter((file) => file.endsWith(".css"));
const assets = walk(publicRoot, () => true).map((file) => ({
  path: relProject(file),
  extension: path.extname(file).toLowerCase() || "none",
  bytes: fs.statSync(file).size,
  family: slash(path.relative(publicRoot, path.dirname(file))).split("/")[0] || "root",
}));

const sourceInfo = new Map();
for (const file of codeFiles) {
  const text = read(file);
  const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : file.endsWith(".jsx") ? ts.ScriptKind.JSX : file.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  const imports = [];
  const importBindings = new Map();
  const declarations = new Map();
  const valueDeclarations = new Map();
  const helperDeclarations = new Map();
  ast.forEachChild((node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const source = node.moduleSpecifier.text;
      const names = [];
      const clause = node.importClause;
      if (clause?.name) {
        names.push(clause.name.text);
        importBindings.set(clause.name.text, { imported: "default", source });
      }
      if (clause?.namedBindings) {
        if (ts.isNamedImports(clause.namedBindings)) {
          for (const element of clause.namedBindings.elements) {
            const local = element.name.text;
            const imported = element.propertyName?.text || local;
            names.push(local);
            importBindings.set(local, { imported, source });
          }
        } else if (ts.isNamespaceImport(clause.namedBindings)) {
          names.push(clause.namedBindings.name.text);
          importBindings.set(clause.namedBindings.name.text, { imported: "*", source });
        }
      }
      imports.push({ source, names });
    }
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) declarations.set(node.name.text, node);
    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) valueDeclarations.set(declaration.name.text, declaration);
      }
    }
    if (ts.isFunctionDeclaration(node) && node.name) helperDeclarations.set(node.name.text, node);
  });
  sourceInfo.set(file, { file, text, ast, imports, importBindings, declarations, valueDeclarations, helperDeclarations });
}

function hasJsx(node) {
  let result = false;
  const visit = (child) => {
    if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child) || ts.isJsxFragment(child)) {
      result = true;
      return;
    }
    if (!result) ts.forEachChild(child, visit);
  };
  visit(node);
  return result;
}

function variableExported(node) {
  let current = node.parent;
  while (current && !ts.isVariableStatement(current) && !ts.isSourceFile(current)) current = current.parent;
  return Boolean(current?.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function componentCategory(file, name, exported, alias) {
  const rel = relProject(file);
  if (alias) return "Compatibility facade";
  if (rel.includes("/app/") || rel.startsWith("src/app/")) return rel.endsWith("layout.tsx") ? "Layout" : "Page";
  if (rel.includes("/ui/")) return "Primitive UI";
  if (rel.includes("/layout/") || rel.includes("/navigation/")) return "Layout / navigation";
  if (rel.includes("/shared/")) return "Shared pattern";
  if (rel.includes("/pokemon/")) return exported ? "Pokémon feature" : "Pokémon internal";
  if (rel.includes("/events/")) return exported ? "Events feature" : "Events internal";
  if (rel.includes("/learning/")) return exported ? "Learning feature" : "Learning internal";
  if (rel.includes("/forms/")) return exported ? "Form feature" : "Form internal";
  if (rel.includes("/stats/")) return exported ? "Analytics feature" : "Analytics internal";
  if (rel.includes("/dashboard/")) return exported ? "Dashboard feature" : "Dashboard internal";
  return exported ? "Component" : "Internal component";
}

const components = [];
const renderHelpers = [];
for (const file of jsxFiles) {
  const info = sourceInfo.get(file);
  const { ast } = info;
  const push = (name, node, kind, exported) => {
    const position = ast.getLineAndCharacterOfPosition(node.getStart(ast));
    const end = ast.getLineAndCharacterOfPosition(node.getEnd());
    components.push({
      name,
      file,
      node,
      kind,
      exported,
      alias: false,
      lineStart: position.line + 1,
      lineEnd: end.line + 1,
      category: componentCategory(file, name, exported, false),
    });
  };
  const visit = (node) => {
    if (ts.isFunctionDeclaration(node) && node.name && /^[A-Z]/.test(node.name.text) && hasJsx(node)) {
      push(node.name.text, node, "function", Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)));
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && /^[A-Z]/.test(node.name.text) && node.initializer &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer) || /^(?:React\.)?(?:memo|forwardRef)\b/.test(node.initializer.getText(ast))) && hasJsx(node.initializer)) {
      push(node.name.text, node, "variable", variableExported(node));
    }
    if (ts.isClassDeclaration(node) && node.name && /^[A-Z]/.test(node.name.text) && hasJsx(node)) {
      push(node.name.text, node, "class", Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)));
    }
    if (ts.isFunctionDeclaration(node) && node.name && !/^[A-Z]/.test(node.name.text) && hasJsx(node)) {
      const position = ast.getLineAndCharacterOfPosition(node.getStart(ast));
      const end = ast.getLineAndCharacterOfPosition(node.getEnd());
      renderHelpers.push({ name: node.name.text, file, lineStart: position.line + 1, lineEnd: end.line + 1, signature: node.parameters.map((parameter) => parameter.getText(ast)).join(", "), source: node.getText(ast) });
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
}

// Compatibility re-export paths are component identities because callers can import them directly.
const realComponentByFileName = new Map(components.map((component) => [`${component.file}#${component.name}`, component]));
for (const file of jsxFiles) {
  const info = sourceInfo.get(file);
  for (const statement of info.ast.statements) {
    if (!ts.isExportDeclaration(statement) || !statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const targetFile = resolveModule(file, statement.moduleSpecifier.text);
    if (!targetFile) continue;
    const aliases = [];
    if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      for (const element of statement.exportClause.elements) {
        if (statement.isTypeOnly || element.isTypeOnly) continue;
        aliases.push({ exported: element.name.text, imported: element.propertyName?.text || element.name.text });
      }
    } else if (!statement.exportClause) {
      for (const target of components.filter((component) => component.file === targetFile && component.exported)) aliases.push({ exported: target.name, imported: target.name });
    }
    for (const alias of aliases) {
      const aliasTargetKey = `${targetFile}#${alias.imported}`;
      if (!/^[A-Z]/.test(alias.exported) || !realComponentByFileName.has(aliasTargetKey) || components.some((component) => component.file === file && component.name === alias.exported)) continue;
      const position = info.ast.getLineAndCharacterOfPosition(statement.getStart(info.ast));
      const end = info.ast.getLineAndCharacterOfPosition(statement.getEnd());
      components.push({
        name: alias.exported,
        file,
        node: null,
        kind: "re-export",
        exported: true,
        alias: true,
        aliasTargetKey,
        lineStart: position.line + 1,
        lineEnd: end.line + 1,
        category: componentCategory(file, alias.exported, true, true),
      });
    }
  }
}

components.sort((a, b) => relProject(a.file).localeCompare(relProject(b.file)) || a.lineStart - b.lineStart || a.name.localeCompare(b.name));
const duplicateSlugs = new Map();
for (const [index, component] of components.entries()) {
  component.id = `MWI-COMP-${String(index + 1).padStart(3, "0")}`;
  const base = `${relProject(component.file).replace(/^src\//, "").replace(/\.(tsx?|jsx?)$/, "")}--${component.name}`
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  const occurrence = (duplicateSlugs.get(base) || 0) + 1;
  duplicateSlugs.set(base, occurrence);
  component.slug = occurrence === 1 ? base : `${base}-${occurrence}`;
  component.document = `components/${component.slug}.md`;
}

function resolveModule(fromFile, specifier) {
  if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return null;
  const base = specifier.startsWith("@/") ? path.join(project, "src", specifier.slice(2)) : path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.tsx`, `${base}.jsx`, `${base}.ts`, `${base}.js`, path.join(base, "index.tsx"), path.join(base, "index.jsx"), path.join(base, "index.ts"), path.join(base, "index.js")];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

const byFileName = new Map();
for (const component of components) byFileName.set(`${component.file}#${component.name}`, component);

function stringsInside(node) {
  const values = [];
  const visit = (child) => {
    if (ts.isStringLiteral(child) || ts.isNoSubstitutionTemplateLiteral(child)) {
      const parent = child.parent;
      const comparison = ts.isBinaryExpression(parent) && [
        ts.SyntaxKind.EqualsEqualsToken,
        ts.SyntaxKind.EqualsEqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsToken,
        ts.SyntaxKind.ExclamationEqualsEqualsToken,
      ].includes(parent.operatorToken.kind);
      const lookupKey = ts.isElementAccessExpression(parent) && parent.argumentExpression === child;
      if (!comparison && !lookupKey) values.push(child.text);
    }
    else if (ts.isTemplateExpression(child)) {
      values.push(child.head.text);
      for (const span of child.templateSpans) values.push(span.literal.text);
      for (const span of child.templateSpans) visit(span.expression);
    } else ts.forEachChild(child, visit);
  };
  visit(node);
  return values;
}

function tokenizeClasses(value) {
  const exactUtilities = new Set(["flex", "grid", "block", "inline", "hidden", "visible", "relative", "absolute", "fixed", "sticky", "truncate", "italic", "uppercase", "lowercase", "capitalize", "antialiased", "transition", "transform", "container", "border", "outline", "ring", "grow", "shrink", "static", "isolate", "contents", "table", "sr-only", "not-sr-only"]);
  return value.split(/\s+/).map((item) => item.trim()).filter((item) => {
    if (!item || /[{}=;]/.test(item) || item.length >= 180) return false;
    if (/^(?:#|--|\/|https?:|rgba?\(|hsla?\(|linear-gradient|radial-gradient|color-mix|transparent$)/.test(item)) return false;
    return exactUtilities.has(item) || /[-:\[\]]/.test(item);
  });
}

function parameterNode(component) {
  if (!component.node) return null;
  if (ts.isFunctionDeclaration(component.node)) return component.node.parameters[0] || null;
  if (ts.isVariableDeclaration(component.node)) {
    let init = component.node.initializer;
    if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) return init.parameters[0] || null;
    if (ts.isCallExpression(init)) {
      const fn = init.arguments.find((arg) => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg));
      return fn?.parameters?.[0] || null;
    }
  }
  return null;
}

function propsData(component) {
  const info = sourceInfo.get(component.file);
  const parameter = parameterNode(component);
  if (!parameter) return { signature: "Not found", contract: "Not found", names: [], defaults: [], variants: [] };
  const signature = parameter.getText(info.ast);
  let effectiveType = parameter.type || null;
  if (!effectiveType && ts.isVariableDeclaration(component.node) && ts.isCallExpression(component.node.initializer) && component.node.initializer.typeArguments?.length) {
    effectiveType = component.node.initializer.typeArguments[component.node.initializer.typeArguments.length - 1];
  }
  let contract = effectiveType?.getText(info.ast) || "Not found";
  if (effectiveType && ts.isTypeReferenceNode(effectiveType) && ts.isIdentifier(effectiveType.typeName)) {
    const declaration = info.declarations.get(effectiveType.typeName.text);
    if (declaration) contract = declaration.getText(info.ast);
  }
  if (contract !== "Not found") {
    const referencedDeclarations = [];
    for (const [name, declaration] of info.declarations) {
      if (new RegExp(`\\b${name}\\b`).test(contract) && declaration.getText(info.ast) !== contract) referencedDeclarations.push(declaration.getText(info.ast));
    }
    if (referencedDeclarations.length) contract = `${contract}\n\n${referencedDeclarations.join("\n\n")}`;
  }
  const names = [];
  const defaults = [];
  if (ts.isObjectBindingPattern(parameter.name)) {
    for (const element of parameter.name.elements) {
      const name = element.name.getText(info.ast);
      names.push(name);
      if (element.initializer) defaults.push(`${name} = ${element.initializer.getText(info.ast)}`);
    }
  } else names.push(parameter.name.getText(info.ast));
  const variants = [];
  if (contract !== "Not found") {
    const memberPattern = /([A-Za-z_$][\w$]*)\??\s*:\s*([^;\n}]+)/g;
    for (const match of contract.matchAll(memberPattern)) {
      let values = uniq([...match[2].matchAll(/["']([^"']+)["']/g)].map((entry) => entry[1]));
      if (!values.length) {
        const typeName = match[2].trim().match(/^([A-Za-z_$][\w$]*)/)?.[1];
        const declaration = typeName ? info.declarations.get(typeName) : null;
        if (declaration) values = uniq([...declaration.getText(info.ast).matchAll(/["']([^"']+)["']/g)].map((entry) => entry[1]));
      }
      if (values.length > 1 || /variant|size|tone|color|theme|shape|density|orientation|position|align|status|type/i.test(match[1])) {
        for (const value of values) variants.push({ prop: match[1], value });
      }
    }
  }
  return { signature, contract, names: uniq(names), defaults: uniq(defaults), variants };
}

function jsxTagName(node, ast) {
  const tag = ts.isJsxElement(node) ? node.openingElement.tagName : ts.isJsxSelfClosingElement(node) ? node.tagName : null;
  return tag ? tag.getText(ast) : "Fragment";
}

function analyzeComponent(component) {
  const info = sourceInfo.get(component.file);
  const ast = info.ast;
  const text = component.node ? component.node.getText(ast) : info.text;
  const classValues = [];
  const conditionalClasses = [];
  const tags = [];
  const outline = [];
  const attrs = [];
  const aria = [];
  const roles = [];
  const dataAttrs = [];
  const events = [];
  const inlineStyles = [];
  const referencedStyleDeclarations = [];

  function outlineVisit(node, depth = 0) {
    if (ts.isJsxElement(node)) {
      const name = node.openingElement.tagName.getText(ast);
      const keyAttrs = node.openingElement.attributes.properties
        .filter((attr) => ts.isJsxAttribute(attr) && (/^(role|aria-|data-|id$)/.test(attr.name.getText(ast))))
        .map((attr) => attr.getText(ast).replace(/\s+/g, " "));
      outline.push(`${"  ".repeat(depth)}- <${name}${keyAttrs.length ? ` ${keyAttrs.join(" ")}` : ""}>`);
      for (const child of node.children) outlineVisit(child, depth + 1);
      return;
    }
    if (ts.isJsxSelfClosingElement(node)) {
      const name = node.tagName.getText(ast);
      const keyAttrs = node.attributes.properties
        .filter((attr) => ts.isJsxAttribute(attr) && (/^(role|aria-|data-|id$)/.test(attr.name.getText(ast))))
        .map((attr) => attr.getText(ast).replace(/\s+/g, " "));
      outline.push(`${"  ".repeat(depth)}- <${name}${keyAttrs.length ? ` ${keyAttrs.join(" ")}` : ""} />`);
      return;
    }
    if (ts.isJsxFragment(node)) {
      outline.push(`${"  ".repeat(depth)}- <Fragment>`);
      for (const child of node.children) outlineVisit(child, depth + 1);
      return;
    }
    ts.forEachChild(node, (child) => outlineVisit(child, depth));
  }

  const visit = (node) => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node;
      tags.push(jsxTagName(node, ast));
      for (const attribute of opening.attributes.properties) {
        if (!ts.isJsxAttribute(attribute)) continue;
        const name = attribute.name.getText(ast);
        attrs.push(name);
        if (name.startsWith("aria-")) aria.push(attribute.getText(ast));
        if (name === "role") roles.push(attribute.getText(ast));
        if (name.startsWith("data-")) dataAttrs.push(attribute.getText(ast));
        if (/^on[A-Z]/.test(name)) events.push(name);
        if (name === "className" && attribute.initializer) {
          if (ts.isStringLiteral(attribute.initializer)) classValues.push(attribute.initializer.text);
          else if (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
            classValues.push(...stringsInside(attribute.initializer.expression));
            conditionalClasses.push(attribute.initializer.expression.getText(ast).replace(/\s+/g, " "));
          }
        }
        if (name === "style" && attribute.initializer) {
          const styleText = attribute.initializer.getText(ast).replace(/\s+/g, " ");
          inlineStyles.push(styleText);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  if (component.node) {
    visit(component.node);
    outlineVisit(component.node);
    const styleNodes = [];
    const referencedNames = new Set();
    const identifierVisit = (node) => {
      if (ts.isIdentifier(node)) referencedNames.add(node.text);
      ts.forEachChild(node, identifierVisit);
    };
    identifierVisit(component.node);
    const queue = [...referencedNames].map((name) => ({ name, info }));
    const visitedNames = new Set();
    while (queue.length) {
      const current = queue.shift();
      const key = `${current.info.file}#${current.name}`;
      if (visitedNames.has(key)) continue;
      visitedNames.add(key);
      const declaration = current.info.valueDeclarations.get(current.name) || current.info.helperDeclarations.get(current.name);
      if (declaration) {
        const isComponentDeclaration = byFileName.has(key);
        if (!isComponentDeclaration && /class|style|tone|color|variant|size|theme|shadow|radius|background|gradient|button|field|panel|pill|chip|badge/i.test(current.name)) {
          styleNodes.push({ node: declaration, ast: current.info.ast, name: current.name, file: current.info.file });
        }
        const nestedNames = new Set();
        const nestedVisit = (node) => {
          if (ts.isIdentifier(node)) nestedNames.add(node.text);
          ts.forEachChild(node, nestedVisit);
        };
        nestedVisit(declaration);
        for (const nestedName of nestedNames) queue.push({ name: nestedName, info: current.info });
        continue;
      }
      const binding = current.info.importBindings.get(current.name);
      if (binding) {
        const resolved = resolveModule(current.info.file, binding.source);
        const targetInfo = resolved ? sourceInfo.get(resolved) : null;
        if (targetInfo && binding.imported !== "*") queue.push({ name: binding.imported === "default" ? current.name : binding.imported, info: targetInfo });
      }
    }
    const classSourceVisit = (node, nodeAst) => {
      if (ts.isCallExpression(node) && /^(?:cn|clsx|twMerge|cva)$/.test(node.expression.getText(nodeAst))) classValues.push(...stringsInside(node));
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && /variant|tone|size|style|class|color|button|field|panel|pill|chip|badge/i.test(node.name.text)) classValues.push(...stringsInside(node.initializer || node));
      if (ts.isFunctionDeclaration(node) && node.name && /class|style|tone|color|variant|size|theme|shadow|radius|background|gradient|button|field|panel|pill|chip|badge/i.test(node.name.text)) classValues.push(...stringsInside(node));
      ts.forEachChild(node, (child) => classSourceVisit(child, nodeAst));
    };
    classSourceVisit(component.node, ast);
    for (const styleNode of styleNodes) {
      classSourceVisit(styleNode.node, styleNode.ast);
      referencedStyleDeclarations.push(`${relProject(styleNode.file)}#${styleNode.name}\n${styleNode.node.getText(styleNode.ast)}`);
    }
  }
  const normalizedClassValues = uniq(classValues.map((value) => value.replace(/\s+/g, " ").trim()).filter((value) => tokenizeClasses(value).length));
  const classTokens = uniq(normalizedClassValues.flatMap(tokenizeClasses));
  const childTags = uniq(tags.filter((tag) => /^[A-Z]/.test(tag)));
  const childComponents = [];
  const unresolvedChildren = [];
  for (const tag of childTags) {
    const base = tag.split(".")[0];
    let target = byFileName.get(`${component.file}#${base}`);
    if (!target) {
      const binding = info.importBindings.get(base);
      if (binding) {
        const resolved = resolveModule(component.file, binding.source);
        if (resolved) target = byFileName.get(`${resolved}#${binding.imported === "default" ? base : binding.imported}`) || byFileName.get(`${resolved}#${base}`);
      }
    }
    if (target && target !== component) childComponents.push(target.id);
    else unresolvedChildren.push(tag);
  }
  const cssVariables = uniq([...text.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]));
  const assetRefs = uniq([
    ...[...text.matchAll(/["'`](\/ui\/[^"'`})\s]+)["'`]/g)].map((match) => match[1]),
    ...[...text.matchAll(/https?:\/\/[^\s"'`)]+/g)].map((match) => match[0]),
  ]);
  const hooks = uniq([...text.matchAll(/\b(use[A-Z][A-Za-z0-9_]*)\s*\(/g)].map((match) => match[1]));
  const stateVariables = uniq([...text.matchAll(/const\s*\[\s*([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\s*\]\s*=\s*useState(?:<[^>]+>)?\(([^)]*)\)/g)].map((match) => `${match[1]} = ${match[3].trim() || "undefined"}`));
  const responsive = uniq(classTokens.map((token) => token.match(/^(sm|md|lg|xl|2xl):/)?.[1]).filter(Boolean));
  const pseudo = uniq(classTokens.map((token) => token.match(/^((?:hover|focus|focus-visible|active|disabled|group-hover|peer-checked|first|last|odd|even|before|after|dark|motion-reduce|motion-safe):)/)?.[1]).filter(Boolean));
  const animationTokens = uniq(classTokens.filter((token) => /^(?:animate-|transition|duration-|delay-|ease-|motion-|hover:.*(?:translate|scale|rotate)|active:.*(?:translate|scale|rotate))/.test(token)));
  const componentImports = info.imports.map((item) => ({
    source: item.source,
    names: item.names.filter((name) => new RegExp(`\\b${name}\\b`).test(text)),
  })).filter((item) => !item.names.length ? info.imports.find((source) => source.source === item.source)?.names.length === 0 : true);
  const iconImports = uniq(componentImports.filter((item) => item.source === "lucide-react").flatMap((item) => item.names));
  const props = propsData(component);
  const literalColors = uniq([...`${text}\n${referencedStyleDeclarations.join("\n")}`.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^\)]+\)|hsla?\([^\)]+\)|color-mix\([^;\n]+\)/g)].map((match) => match[0]));
  const lower = `${text}\n${classTokens.join(" ")}`.toLowerCase();
  const stateTests = [
    ["Default", true, "Base render path"],
    ["Hover", classTokens.some((token) => token.includes("hover:")) || events.includes("onMouseEnter"), "hover utility or mouse-enter handler"],
    ["Pressed", classTokens.some((token) => token.includes("active:")) || events.some((event) => /PointerDown|MouseDown/.test(event)), "active utility or press handler"],
    ["Focused", classTokens.some((token) => /focus(?:-visible)?:/.test(token)) || lower.includes("onfocus"), "focus styling or handler"],
    ["Selected", /selected|aria-selected|data-state/.test(lower), "selected/state signal"],
    ["Checked", /checked|aria-checked|peer-checked/.test(lower), "checked signal"],
    ["Unchecked", /checked|aria-checked|peer-checked/.test(lower), "inverse checked state"],
    ["Loading", /loading|pending|isloading|animate-spin|skeleton/.test(lower), "loading/pending signal"],
    ["Disabled", /disabled/.test(lower), "disabled prop, attribute, or class"],
    ["Error", /\berror\b|danger|destructive/.test(lower), "error/danger signal"],
    ["Warning", /warning|amber|yellow/.test(lower), "warning/amber/yellow signal"],
    ["Success", /success|emerald|green/.test(lower), "success/green signal"],
    ["Empty", /empty|no result|aucun|length\s*===?\s*0|!\w+\.length/.test(lower), "empty collection branch"],
    ["Collapsed", /collapsed|collapse|!open|setopen\(false/.test(lower), "collapsed/closed signal"],
    ["Expanded", /expanded|aria-expanded|\bopen\b/.test(lower), "expanded/open signal"],
    ["Dragging", /dragging|usedraggable|usesortable|dndcontext/.test(lower), "drag state signal"],
    ["Drop Target", /droppable|\bover\b|drop target/.test(lower), "drop target signal"],
    ["Active", /\bactive\b|aria-current/.test(lower), "active signal"],
    ["Inactive", /\bactive\b|inactive/.test(lower), "inactive inverse state"],
    ["Read Only", /readonly|read-only/.test(lower), "read-only signal"],
    ["Hidden", classTokens.some((token) => /(^|:)hidden$|invisible|opacity-0/.test(token)) || /aria-hidden/.test(lower), "hidden/invisible signal"],
    ["Visible", true, "Rendered state"],
    ["Scrollable", classTokens.some((token) => /overflow-(auto|scroll)|overflow-[xy]-(auto|scroll)/.test(token)), "overflow scrolling utility"],
    ["Sticky", classTokens.some((token) => /(^|:)sticky$/.test(token)), "sticky utility"],
  ].map(([name, detected, evidence]) => ({ name, detected: Boolean(detected), evidence: detected ? evidence : "Not found" }));
  return {
    text,
    classValues: normalizedClassValues,
    classTokens,
    conditionalClasses: uniq(conditionalClasses),
    tags: uniq(tags),
    outline,
    attrs: uniq(attrs),
    aria: uniq(aria),
    roles: uniq(roles),
    dataAttrs: uniq(dataAttrs),
    events: uniq(events),
    inlineStyles: uniq(inlineStyles),
    referencedStyleDeclarations: uniq(referencedStyleDeclarations),
    childComponents: uniq(childComponents),
    unresolvedChildren: uniq(unresolvedChildren),
    cssVariables,
    assetRefs,
    hooks,
    stateVariables,
    responsive,
    pseudo,
    animationTokens,
    iconImports,
    componentImports,
    props,
    literalColors,
    states: stateTests,
  };
}

for (const component of components) Object.assign(component, analyzeComponent(component));
const componentById = new Map(components.map((component) => [component.id, component]));
for (const component of components) component.parents = [];
for (const parent of components) {
  for (const childId of parent.childComponents) componentById.get(childId)?.parents.push(parent.id);
}
for (const component of components) component.parents = uniq(component.parents);

// Alias targets from source re-export statements.
for (const component of components.filter((item) => item.alias)) {
  const target = byFileName.get(component.aliasTargetKey);
  component.aliasOf = target?.id || "Not found";
  if (target) {
    component.childComponents = [target.id];
    target.parents = uniq([...target.parents, component.id]);
  }
}

for (const component of components) {
  const reuse = component.parents.length;
  let priority = 20 + Math.min(30, reuse * 3);
  if (component.category === "Primitive UI") priority += 30;
  if (component.category.includes("Layout") || component.category.includes("navigation")) priority += 18;
  if (component.category === "Page") priority += 12;
  if (component.exported) priority += 8;
  if (component.alias) priority -= 20;
  if (component.category.includes("internal")) priority -= 5;
  component.figmaPriority = Math.max(1, Math.min(100, priority));
}

const allClassTokens = uniq(components.flatMap((component) => component.classTokens));
const allClassValues = components.flatMap((component) => component.classValues);
const classCombinationCounts = new Map();
for (const value of allClassValues) if (value) classCombinationCounts.set(value, (classCombinationCounts.get(value) || 0) + 1);
const reusablePatterns = [...classCombinationCounts.entries()].filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const totalReusablePatterns = reusablePatterns.length + renderHelpers.length;

const globalsPath = path.join(sourceRoot, "app", "globals.css");
const globalCss = read(globalsPath);
const cssVariableDefinitions = [...globalCss.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => ({ name: match[1], value: match[2].trim(), line: globalCss.slice(0, match.index).split("\n").length }));
const cssVariableNames = uniq(cssVariableDefinitions.map((entry) => entry.name));
const globalClasses = uniq([...globalCss.matchAll(/\.([A-Za-z_][\w-]*)/g)].map((match) => match[1]).filter((name) => !/^\d/.test(name)));
const mediaQueries = uniq([...globalCss.matchAll(/@media\s*([^\{]+)/g)].map((match) => match[1].trim()));
const keyframes = uniq([...globalCss.matchAll(/@keyframes\s+([\w-]+)/g)].map((match) => match[1]));
const cssAnimations = uniq([...globalCss.matchAll(/animation\s*:\s*([^;]+);/g)].map((match) => match[1].trim()));
const colors = uniq([
  ...sourceFiles.flatMap((file) => [...read(file).matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^\)]+\)|hsla?\([^\)]+\)|color-mix\([^;\n]+\)/g)].map((match) => match[0])),
]);
const customClassesUsed = allClassTokens.filter((token) => globalClasses.includes(token.replace(/^[^:]+:/, "")));
const tailwindUtilities = allClassTokens.filter((token) => !globalClasses.includes(token.replace(/^[^:]+:/, "")) && !token.includes("${"));
const breakpointNames = uniq(allClassTokens.map((token) => token.match(/^(sm|md|lg|xl|2xl):/)?.[1]).filter(Boolean));
const spacingTokens = tailwindUtilities.filter((token) => /(^|:)(?:[mp][trblxy]?|gap[xy]?|space-[xy]|inset|top|right|bottom|left)-/.test(token));
const sizingTokens = tailwindUtilities.filter((token) => /(^|:)(?:w|h|min-w|max-w|min-h|max-h|size)-/.test(token));
const radiusTokens = tailwindUtilities.filter((token) => /(^|:)rounded/.test(token));
const shadowTokens = tailwindUtilities.filter((token) => /(^|:)(?:shadow|drop-shadow)/.test(token));
const opacityTokens = tailwindUtilities.filter((token) => /(^|:)opacity-/.test(token));
const typographyTokens = tailwindUtilities.filter((token) => /(^|:)(?:text-|font-|leading-|tracking-|uppercase|lowercase|capitalize|whitespace-|break-)/.test(token));
const animationUtilities = tailwindUtilities.filter((token) => /(^|:)(?:animate-|transition|duration-|delay-|ease-)/.test(token));
const borderTokens = tailwindUtilities.filter((token) => /(^|:)(?:border|ring|outline)/.test(token));
const backgroundTokens = tailwindUtilities.filter((token) => /(^|:)(?:bg-|from-|via-|to-|backdrop-)/.test(token));
const designTokenSet = new Set([
  ...cssVariableNames, ...colors, ...spacingTokens, ...sizingTokens, ...radiusTokens, ...shadowTokens,
  ...opacityTokens, ...typographyTokens, ...animationUtilities, ...borderTokens, ...backgroundTokens, ...breakpointNames,
]);
const lucideIcons = uniq(components.flatMap((component) => component.iconImports));
const iconAssets = assets.filter((asset) => /(^|\/)(icons?|Types|type-icons?|raids)(\/|$)|\.svg$/i.test(asset.path));
const animationPatterns = uniq([...keyframes, ...cssAnimations, ...animationUtilities]);
const parsedGlobalRules = [...globalCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
  selector: match[1].trim().replace(/\s+/g, " "),
  body: match[2].trim(),
  classes: uniq([...match[1].matchAll(/\.([A-Za-z_][\w-]*)/g)].map((entry) => entry[1])),
})).filter((rule) => rule.classes.length);
for (const component of components) {
  const usedCustomClasses = uniq(component.classTokens.map((token) => token.split(":").pop()).filter((token) => globalClasses.includes(token)));
  const rules = parsedGlobalRules.filter((rule) => rule.classes.some((name) => usedCustomClasses.includes(name)));
  component.customCssRules = uniq(rules.map((rule) => `${rule.selector} {\n${rule.body}\n}`));
  component.customCssClasses = usedCustomClasses;
  component.cssVariables = uniq([...component.cssVariables, ...rules.flatMap((rule) => [...rule.body.matchAll(/var\((--[\w-]+)/g)].map((match) => match[1]))]);
}

const appFiles = walk(path.join(sourceRoot, "app"), (file) => /\/(page|layout)\.(tsx|jsx)$/.test(slash(file)));
function routeFromPage(file) {
  let rel = slash(path.relative(path.join(sourceRoot, "app"), path.dirname(file)));
  rel = rel.split("/").filter((part) => part && !/^\(.+\)$/.test(part)).join("/");
  return `/${rel}`.replace(/\/$/, "") || "/";
}
const pages = appFiles.filter((file) => /\/page\.(tsx|jsx)$/.test(slash(file))).map((file, index) => ({
  id: `MWI-PAGE-${String(index + 1).padStart(3, "0")}`,
  route: routeFromPage(file),
  file: relProject(file),
  components: components.filter((component) => component.file === file).map((component) => component.id),
}));
const layouts = appFiles.filter((file) => /\/layout\.(tsx|jsx)$/.test(slash(file))).map((file, index) => ({
  id: `MWI-LAYOUT-${String(index + 1).padStart(3, "0")}`,
  scope: routeFromPage(file),
  file: relProject(file),
  components: components.filter((component) => component.file === file).map((component) => component.id),
}));

const allSourceText = sourceFiles.map(read).join("\n");
const localStorageKeys = uniq([...allSourceText.matchAll(/(?:localStorage\.(?:getItem|setItem|removeItem)\s*\(|storageKey\s*[:=]\s*)["'`]([^"'`]+)["'`]/g)].map((match) => match[1]));
const apiReferences = uniq([...allSourceText.matchAll(/["'`](\/api\/[A-Za-z0-9_?=&/{}$.-]+)["'`]/g)].map((match) => match[1]));
const externalPackages = uniq([...sourceInfo.values()].flatMap((info) => info.imports.map((item) => item.source).filter((source) => !source.startsWith(".") && !source.startsWith("@/"))));
const hooksGlobal = uniq(components.flatMap((component) => component.hooks));

function componentLink(id) {
  const target = componentById.get(id);
  return target ? `[${target.name}](../${target.document}) (${id})` : id;
}

function inferPurpose(component) {
  if (component.alias) return `Compatibility re-export preserving the legacy import path for ${component.name}.`;
  if (component.category === "Page") return `App Router page component for ${pages.find((page) => page.file === relProject(component.file))?.route || "its file route"}.`;
  if (component.category === "Layout") return "App Router layout that composes persistent application structure around child content.";
  return `${component.category} component implemented in ${relProject(component.file)}.`;
}

function layoutFacts(component) {
  const tokens = component.classTokens;
  const facts = [];
  if (tokens.some((token) => /(^|:)flex$/.test(token))) facts.push("Flex layout is present.");
  if (tokens.some((token) => /(^|:)grid$/.test(token))) facts.push("CSS Grid layout is present.");
  if (tokens.some((token) => /flex-col/.test(token))) facts.push("At least one flex container uses vertical direction.");
  if (tokens.some((token) => /items-/.test(token))) facts.push(`Alignment utilities: ${code(uniq(tokens.filter((token) => /items-|justify-|content-|self-/.test(token))).join(", "))}.`);
  if (tokens.some((token) => /(^|:)absolute$|(^|:)fixed$|(^|:)relative$|(^|:)sticky$/.test(token))) facts.push(`Positioning utilities: ${code(uniq(tokens.filter((token) => /(^|:)(absolute|fixed|relative|sticky)$/.test(token))).join(", "))}.`);
  return facts.length ? facts : ["Explicit layout behavior beyond the JSX structure: Not found."];
}

function figmaGuidance(component) {
  const direction = component.classTokens.some((token) => /flex-col/.test(token)) ? "vertical" : component.classTokens.some((token) => /(^|:)flex$/.test(token)) ? "horizontal or mixed; verify each nested frame" : component.classTokens.some((token) => /(^|:)grid$/.test(token)) ? "grid translated into nested Auto Layout frames" : "Estimated from implementation";
  const booleanProps = component.states.filter((state) => state.detected && !["Default", "Visible"].includes(state.name)).map((state) => state.name);
  const swaps = component.iconImports.length || component.assetRefs.length ? [...component.iconImports, ...component.assetRefs].slice(0, 24) : [];
  return [
    `- Auto Layout: ${direction}. Preserve every nested flex/grid boundary shown in the HTML outline.`,
    `- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.`,
    `- Boolean properties: ${booleanProps.length ? booleanProps.join(", ") : "Not found"}.`,
    `- Instance swaps: ${swaps.length ? swaps.map(code).join(", ") : "Not found"}.`,
    `- Text properties: expose each textual prop from the props contract; when text is hardcoded, preserve it in the default instance.`,
    `- Variables: bind CSS variables and semantic token references listed in this document. Literal utilities remain documented implementation values.`,
    `- Constraints: infer from width/min/max and responsive utilities; any value not encoded is marked Estimated from implementation.`,
    `- Nested components: use the child component links below as true instances rather than detached groups.`,
    `- Interactive components: create prototype states only for interactions detected in the state/event tables.`,
  ].join("\n");
}

function screenshotChecklist(component) {
  const rows = component.states.map((state) => [state.detected ? "□" : "—", state.name, state.detected ? state.evidence : "Not found"]);
  for (const variant of component.props.variants) rows.push(["□", `Variant: ${variant.prop}=${variant.value}`, "Explicit props contract"]);
  for (const breakpoint of component.responsive) rows.push(["□", `Responsive: ${breakpoint}`, `Tailwind ${breakpoint}: utilities`]);
  if (!component.responsive.length) rows.push(["—", "Responsive variants", "Not found"]);
  return table(["Capture", "State / variant", "Evidence"], rows);
}

function renderComponent(component) {
  const propsRows = component.props.names.length ? component.props.names.map((name) => [name, component.props.defaults.find((item) => item.startsWith(`${name} =`)) || "Not found", "See exact signature/contract below"]) : [["Not found", "Not found", "Not found"]];
  const variantRows = component.props.variants.length ? component.props.variants.map((variant) => [variant.prop, variant.value, "Explicit string literal in props contract"]) : [["Not found", "Not found", "No explicit variant union detected"]];
  const stateRows = component.states.map((state) => [state.name, state.detected ? "Detected" : "Not found", state.evidence]);
  const classRows = component.classTokens.length ? component.classTokens.map((token) => [code(token), token.includes(":") ? token.split(":").slice(0, -1).join(":") : "base", component.conditionalClasses.some((expression) => expression.includes(token)) ? "conditional or expression-derived" : "static occurrence"]) : [["Not found", "Not found", "Not found"]];
  const dependencies = component.componentImports;
  const sourceDependencies = dependencies.length ? dependencies.map((item) => [item.source, item.names.join(", ") || "side effect", item.source === "lucide-react" ? "icons" : item.source.startsWith(".") || item.source.startsWith("@/") ? "internal" : "external package"]) : [["Not found", "Not found", "Not found"]];
  const childRows = component.childComponents.length ? component.childComponents.map((id) => [id, componentLink(id), "JSX/import relation"]) : [["Not found", "Not found", "No resolved local child component"]];
  const parentRows = component.parents.length ? component.parents.map((id) => [id, componentLink(id), "Renders/imports this component"]) : [["Not found", "Not found", component.exported ? "No component parent detected; may be route entry or unused" : "No parent detected"]];
  const tokenRows = [
    ["CSS variables", component.cssVariables.map(code).join(", ") || "Not found"],
    ["Literal colors", component.literalColors.map(code).join(", ") || "Not found"],
    ["Spacing", uniq(component.classTokens.filter((token) => spacingTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Sizing", uniq(component.classTokens.filter((token) => sizingTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Typography", uniq(component.classTokens.filter((token) => typographyTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Radius", uniq(component.classTokens.filter((token) => radiusTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Borders/strokes", uniq(component.classTokens.filter((token) => borderTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Shadows/elevation", uniq(component.classTokens.filter((token) => shadowTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Opacity", uniq(component.classTokens.filter((token) => opacityTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Background", uniq(component.classTokens.filter((token) => backgroundTokens.includes(token))).map(code).join(", ") || "Not found"],
    ["Animation", component.animationTokens.map(code).join(", ") || "Not found"],
  ];
  return `---
id: ${component.id}
component: ${JSON.stringify(component.name)}
category: ${JSON.stringify(component.category)}
status: ${component.alias ? "compatibility_facade" : component.exported ? "exported" : "internal"}
source: ${JSON.stringify(relProject(component.file))}
lines: ${component.lineStart}-${component.lineEnd}
figma_priority: ${component.figmaPriority}
evidence: static_code
---

# ${component.name}

## 1. Purpose

${inferPurpose(component)} Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: ${code(component.id)}.
- Location: ${code(relWorkspace(component.file))}:${component.lineStart}.
- File range: lines ${component.lineStart}–${component.lineEnd}.
- Definition kind: ${component.kind}.
- Export status: ${component.exported ? "exported" : "internal to the source module"}.
- Compatibility target: ${component.aliasOf || "Not found"}.
- Figma recreation priority: **${component.figmaPriority}/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

${table(["Dependency", "Imported symbols", "Role"], sourceDependencies)}

### Child components

${table(["ID", "Component", "Evidence"], childRows)}

Unresolved/external JSX tags: ${component.unresolvedChildren.length ? component.unresolvedChildren.map(code).join(", ") : "Not found"}.

### Parent components

${table(["ID", "Component", "Evidence"], parentRows)}

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

${component.outline.length ? component.outline.join("\n") : "Not found"}

Unique HTML/React tags: ${component.tags.length ? component.tags.map(code).join(", ") : "Not found"}.

## 5. React structure and state management

- Hooks: ${component.hooks.length ? component.hooks.map(code).join(", ") : "Not found"}.
- Local state initializers: ${component.stateVariables.length ? component.stateVariables.map(code).join(", ") : "Not found"}.
- Event handlers exposed in JSX: ${component.events.length ? component.events.map(code).join(", ") : "Not found"}.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

${table(["Prop/binding", "Default", "Evidence"], propsRows)}

Exact parameter signature:

\`\`\`tsx
${component.props.signature}
\`\`\`

Exact local props contract when statically resolvable:

\`\`\`tsx
${component.props.contract}
\`\`\`

## 7. Variants and component properties

${table(["Property", "Value", "Source"], variantRows)}

- Boolean properties for Figma: ${component.states.filter((state) => state.detected && !["Default", "Visible"].includes(state.name)).map((state) => state.name).join(", ") || "Not found"}.
- Text properties: ${component.props.names.length ? component.props.names.map(code).join(", ") : "Not found"}.
- Instance swaps: ${[...component.iconImports, ...component.assetRefs].length ? [...component.iconImports, ...component.assetRefs].map(code).join(", ") : "Not found"}.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

${table(["State", "Implementation status", "Evidence"], stateRows)}

## 9. Interactions

- Hover behavior: ${component.states.find((state) => state.name === "Hover").detected ? "Defined by the exact hover utilities in section 11." : "Not found"}.
- Pressed behavior: ${component.states.find((state) => state.name === "Pressed").detected ? "Defined by active utilities or pointer/mouse handlers." : "Not found"}.
- Focus behavior: ${component.states.find((state) => state.name === "Focused").detected ? "Defined by focus/focus-visible utilities or handlers." : "Not found"}.
- Pointer/cursor behavior: ${component.classTokens.filter((token) => /cursor-/.test(token)).map(code).join(", ") || (component.events.includes("onClick") ? "Browser/element click behavior; explicit cursor token Not found" : "Not found")}.
- Expand/collapse behavior: ${/open|expanded|collapsed/i.test(component.text) ? "Detected; see state and attribute tables." : "Not found"}.

## 10. Layout, spacing, sizing and constraints

${layoutFacts(component).map((fact) => `- ${fact}`).join("\n")}

${table(["Token family", "Exact implementation references"], tokenRows)}

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

${table(["Token", "Variant/pseudo prefix", "Condition"], classRows)}

Exact className combinations:

${component.classValues.length ? component.classValues.map((value) => `- ${code(value)}`).join("\n") : "Not found"}

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

${component.conditionalClasses.length ? component.conditionalClasses.map((value) => `- ${code(value)}`).join("\n") : "Not found"}

### CSS variables

${component.cssVariables.length ? component.cssVariables.map(code).join(", ") : "Not found"}

### Inline style expressions

${component.inlineStyles.length ? component.inlineStyles.map((value) => `- ${code(value)}`).join("\n") : "Not found"}

### Referenced local/imported style declarations

${component.referencedStyleDeclarations.length ? component.referencedStyleDeclarations.map((value) => `\`\`\`tsx\n${value}\n\`\`\``).join("\n\n") : "Not found"}

### Referenced global custom CSS rules

${component.customCssRules.length ? component.customCssRules.map((value) => `\`\`\`css\n${value}\n\`\`\``).join("\n\n") : "Not found"}

### Data attributes

${component.dataAttrs.length ? component.dataAttrs.map((value) => `- ${code(value)}`).join("\n") : "Not found"}

### Pseudo selectors/variants

${component.pseudo.length ? component.pseudo.map(code).join(", ") : "Not found"}

## 13. Responsive behavior

- Breakpoints used: ${component.responsive.length ? component.responsive.map(code).join(", ") : "Not found"}.
- Responsive utilities: ${component.classTokens.filter((token) => /^(sm|md|lg|xl|2xl):/.test(token)).map(code).join(", ") || "Not found"}.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: ${component.animationTokens.length ? component.animationTokens.map(code).join(", ") : "Not found"}.
- Animation libraries imported by file: ${sourceInfo.get(component.file).imports.filter((item) => /framer-motion|gsap/.test(item.source)).map((item) => item.source).join(", ") || "Not found"}.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: ${component.events.length || component.states.some((state) => state.detected && ["Hover", "Pressed", "Expanded", "Dragging"].includes(state.name)) ? "Detected through event/state evidence; preserve exact trigger." : "Not found"}.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: ${component.aria.length ? component.aria.map(code).join(", ") : "Not found"}.
- Roles: ${component.roles.length ? component.roles.map(code).join(", ") : "Not found"}.
- Keyboard events: ${component.events.filter((event) => /Key/.test(event)).map(code).join(", ") || "Not found"}.
- Focus management hooks/refs: ${/focus\(|autofocus|focus-visible|useref/i.test(component.text) ? "Detected in source; preserve exact sequence." : "Not found"}.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: ${component.iconImports.length ? component.iconImports.map(code).join(", ") : "Not found"}.
- Asset references: ${component.assetRefs.length ? component.assetRefs.map(code).join(", ") : "Not found"}.
- SVG usage: ${component.tags.some((tag) => tag === "svg") || component.assetRefs.some((asset) => asset.endsWith(".svg")) ? "Detected" : "Not found"}.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

${figmaGuidance(component)}

## 18. Screenshot capture checklist

${screenshotChecklist(component)}

## 19. Rebuild acceptance criteria

- DOM hierarchy matches section 4.
- Props, defaults, variants and states match sections 6–9.
- Every class/token and conditional expression in sections 10–12 has a Figma or CSS equivalent.
- Responsive behavior matches each encoded breakpoint.
- ARIA, keyboard, focus and native semantics match section 15.
- Child components remain true nested instances.
- No undocumented redesign, optimization or normalization is introduced.

## 20. Unknowns

- Runtime-computed dimensions, line wrapping and browser font metrics: Estimated from implementation.
- Visual output without an authenticated rendered screenshot: Not found.
- Product rationale not encoded in code or naming: Not found.
`;
}

for (const component of components) write(component.document, renderComponent(component));

const dependencyEdges = components.flatMap((component) => component.childComponents.map((target) => ({ source: component.id, target, type: component.alias ? "compatibility-reexport" : "renders" })));
const componentRegistry = components.map((component) => ({
  id: component.id,
  name: component.name,
  category: component.category,
  status: component.alias ? "compatibility-facade" : component.exported ? "exported" : "internal",
  file: relProject(component.file),
  lines: [component.lineStart, component.lineEnd],
  document: component.document,
  parents: component.parents,
  children: component.childComponents,
  unresolvedChildren: component.unresolvedChildren,
  props: component.props.names,
  variants: component.props.variants,
  states: component.states.filter((state) => state.detected).map((state) => state.name),
  classTokens: component.classTokens,
  cssVariables: component.cssVariables,
  literalColors: component.literalColors,
  customCssClasses: component.customCssClasses,
  icons: component.iconImports,
  roles: component.roles,
  assets: component.assetRefs,
  responsive: component.responsive,
  figmaPriority: component.figmaPriority,
}));

write("registries/components.json", JSON.stringify({ generatedAt: "2026-07-13", methodology: "TypeScript AST plus compatibility re-export inventory", count: componentRegistry.length, entries: componentRegistry }, null, 2));
write("registries/dependencies.json", JSON.stringify({ count: dependencyEdges.length, edges: dependencyEdges }, null, 2));
write("registries/pages.json", JSON.stringify({ pages, layouts }, null, 2));
write("registries/assets.json", JSON.stringify({ count: assets.length, entries: assets }, null, 2));
write("registries/tokens.json", JSON.stringify({
  totalImplementationTokens: designTokenSet.size,
  cssVariables: cssVariableNames,
  definitions: cssVariableDefinitions,
  literalColors: colors,
  spacing: spacingTokens,
  sizing: sizingTokens,
  radius: radiusTokens,
  borders: borderTokens,
  shadows: shadowTokens,
  opacity: opacityTokens,
  typography: typographyTokens,
  backgrounds: backgroundTokens,
  animations: animationUtilities,
  breakpoints: breakpointNames,
}, null, 2));
write("registries/tailwind-utilities.json", JSON.stringify({ count: tailwindUtilities.length, utilities: tailwindUtilities, customCssClassesUsed: uniq(customClassesUsed) }, null, 2));
write("registries/icons.json", JSON.stringify({ total: lucideIcons.length + iconAssets.length, lucide: lucideIcons, assetFiles: iconAssets }, null, 2));
write("registries/animations.json", JSON.stringify({ count: animationPatterns.length, keyframes, cssAnimations, utilityPatterns: animationUtilities }, null, 2));
write("registries/reusable-patterns.json", JSON.stringify({ count: totalReusablePatterns, classPatterns: reusablePatterns.map(([classes, occurrences], index) => ({ id: `MWI-PATTERN-${String(index + 1).padStart(3, "0")}`, occurrences, classes })), renderHelpers }, null, 2));

const folderTree = walk(sourceRoot, () => true).map((file) => `- ${code(relProject(file))}`).join("\n");
const routeTable = table(["ID", "Route/scope", "Type", "Source", "Root component IDs"], [
  ...pages.map((page) => [page.id, page.route, "page", code(page.file), page.components.join(", ") || "Not found"]),
  ...layouts.map((layout) => [layout.id, layout.scope, "layout", code(layout.file), layout.components.join(", ") || "Not found"]),
]);

write("foundations/01-project-architecture.md", `# Project architecture

## Scope

This specification covers only ${code("Dashboard Admin")}. It records the current implementation without redesign, refactor or optimization.

## Runtime architecture

- Framework: Next.js App Router (${code("next: latest")} in package.json).
- React: ${code("react: latest")}.
- Styling: Tailwind CSS 4 imported through ${code('@import "tailwindcss"')} plus 669 lines of global CSS.
- Theme: class-driven light override over a dark ${code(":root")} default; ${code("next-themes")} provider.
- UI composition: ${components.length} detected React component identities, including internal definitions and compatibility paths.
- Data/state: React state/hooks, local persistence utilities, route handlers and external Pokémon data APIs.
- Drag and drop: @dnd-kit.
- Charts: Recharts.
- Notifications: Sonner.

## External packages imported by UI source

${externalPackages.map((item) => `- ${code(item)}`).join("\n")}

## State and data references

- Hook identifiers: ${hooksGlobal.map(code).join(", ")}.
- localStorage keys statically extracted: ${localStorageKeys.length ? localStorageKeys.map(code).join(", ") : "Not found"}.
- API references statically extracted: ${apiReferences.length ? apiReferences.map(code).join(", ") : "Not found"}.

## Reconstruction boundary

Backend behavior, production data, authentication secrets, runtime viewport rendering and network responses are outside the static design-system evidence. Where necessary they are marked Not found or Estimated from implementation.
`);

write("foundations/02-folder-routing-layouts.md", `# Folder structure, routing and layouts

## Routes and layouts

${routeTable}

## Complete source tree

${folderTree}

## Routing behavior

- Route groups such as ${code("(dashboard)")} do not contribute a URL segment.
- The protected dashboard layout wraps its child routes; authentication behavior is implementation-dependent and documented in architecture/state references.
- Exact runtime redirects and access outcomes without a session: Estimated from implementation.
`);

write("foundations/03-color-and-theme-tokens.md", `# Color system and theme variables

## CSS variable definitions

${table(["Variable", "Exact value", "Source line"], cssVariableDefinitions.map((item) => [code(item.name), code(item.value), item.line]))}

## Literal color values across source

${colors.map((item) => `- ${code(item)}`).join("\n")}

## Theme behavior

- Dark is the root color scheme.
- Light mode is activated through the ${code(".light")} ancestor class.
- Semantic Tailwind colors are created by ${code("@theme inline")} aliases to CSS variables.
- Components may also contain literal colors; these remain implementation values and must not be silently mapped to a different semantic token.
`);

write("foundations/04-typography.md", `# Typography

## Font families

- Sans: ${code('"Geist", "Inter", ui-sans-serif, system-ui, sans-serif')}.
- Mono: ${code('"Geist Mono", "SFMono-Regular", ui-monospace, monospace')}.
- Body uses ${code("var(--font-sans)")} with ${code("text-rendering: optimizeLegibility")} and antialiasing.

## Typography utilities

${typographyTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Figma mapping

Create text styles only for combinations evidenced by these utilities. Font resolution and exact glyph metrics without rendered files: Estimated from implementation.
`);

write("foundations/05-spacing-sizing-grid.md", `# Spacing, sizing, grid and constraints

## Spacing utilities

${spacingTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Sizing and container utilities

${sizingTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Grid system

${tailwindUtilities.filter((item) => /(^|:)(grid|grid-cols-|col-span-|row-span-|auto-cols-|auto-rows-)/.test(item)).map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Auto Layout translation

Each ${code("flex")} or ${code("grid")} boundary becomes a nested Figma frame. Preserve direction, gap, alignment, padding, min/max dimensions and overflow at the same nesting level. Values absent from the utilities are Estimated from implementation.
`);

write("foundations/06-radius-border-opacity.md", `# Radius, strokes, borders and opacity

## Radius

Global radius variable: ${cssVariableDefinitions.filter((item) => item.name.includes("radius")).map((item) => `${code(item.name)} = ${code(item.value)}`).join(", ")}.

${radiusTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Border, ring and outline utilities

${borderTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Opacity utilities

${opacityTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}
`);

write("foundations/07-elevation-effects-backgrounds.md", `# Elevation, shadows, glows, blur, glass, gradients and backgrounds

## Shadow/elevation utilities

${shadowTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Background/gradient/backdrop utilities

${backgroundTokens.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Global custom effect classes

${globalClasses.filter((name) => /glass|glow|scan|grid|shadow|panel|background|surface|sidebar|card|button|modal/i.test(name)).map((item) => `- ${code(item)}`).join("\n") || "Not found"}

All exact multi-layer gradients, shadows and filters are preserved verbatim in the global CSS appendix.
`);

write("foundations/08-motion-transitions.md", `# Motion, animations, transitions, timing and easing

## CSS keyframes

${keyframes.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## CSS animation declarations

${cssAnimations.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Tailwind motion utilities

${animationUtilities.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Reduced motion

Global stylesheet media queries: ${mediaQueries.map(code).join(", ") || "Not found"}. Exact rule bodies are in the verbatim CSS appendix.
`);

write("foundations/09-responsive-system.md", `# Responsive system

## Breakpoint prefixes found

${breakpointNames.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

Tailwind default numeric breakpoint values are not re-declared in source. Their exact installed-framework defaults are therefore Estimated from implementation.

## Global media queries

${mediaQueries.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Component coverage

${table(["Component", "Breakpoints", "Document"], components.filter((item) => item.responsive.length).map((item) => [item.name, item.responsive.join(", "), `[${item.id}](../${item.document})`]))}
`);

write("foundations/10-icons-images-assets.md", `# Icons, SVG, images and assets

## Statistics

- Public files: ${assets.length}.
- Unique Lucide icon components imported: ${lucideIcons.length}.
- Icon-like public assets: ${iconAssets.length}.
- Combined icon inventory used for index statistics: ${lucideIcons.length + iconAssets.length}.

## Lucide icons

${lucideIcons.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Complete public asset inventory

${table(["Path", "Extension", "Bytes", "Family"], assets.map((asset) => [code(asset.path), asset.extension, asset.bytes, asset.family]))}

Dimensions, crops and semantic role for assets not referenced by a component: Not found. File size and path are exact.
`);

const adjacencyRows = components.map((component) => [component.id, component.name, component.parents.join(", ") || "Not found", component.childComponents.join(", ") || "Not found", component.document]);
const fullMermaid = ["flowchart LR", ...dependencyEdges.map((edge) => `  ${edge.source.replaceAll("-", "_")}["${edge.source}"] --> ${edge.target.replaceAll("-", "_")}["${edge.target}"]`)].join("\n");
write("foundations/11-component-hierarchy-dependencies.md", `# Component hierarchy and dependency graph

## Full adjacency matrix

${table(["ID", "Name", "Parents", "Children", "Specification"], adjacencyRows.map((row) => [row[0], row[1], row[2], row[3], `[open](../${row[4]})`]))}

## Full machine-generated Mermaid graph

\`\`\`mermaid
${fullMermaid}
\`\`\`

Unresolved external tags remain listed in individual component documents and are not falsely connected.
`);

write("foundations/12-interaction-state-model.md", `# Interaction and state model

## Standard state vocabulary

Default, Hover, Pressed, Focused, Selected, Checked, Unchecked, Loading, Disabled, Error, Warning, Success, Empty, Collapsed, Expanded, Dragging, Drop Target, Active, Inactive, Read Only, Hidden, Visible, Scrollable and Sticky.

## Detected component-state coverage

${table(["Component", "Detected states", "Events"], components.map((item) => [item.id, item.states.filter((state) => state.detected).map((state) => state.name).join(", "), item.events.join(", ") || "Not found"]))}

Detection is static. Runtime-only state reachability: Estimated from implementation.
`);

write("foundations/13-accessibility-keyboard-focus.md", `# Accessibility, keyboard, ARIA and focus

## Component evidence matrix

${table(["Component", "ARIA", "Keyboard handlers", "Focus evidence"], components.map((item) => [item.id, item.aria.join(", ") || "Not found", item.events.filter((event) => /Key/.test(event)).join(", ") || "Not found", /focus\(|autofocus|focus-visible|useref/i.test(item.text) ? "Detected" : "Not found"]))}

## Global rules

- Native elements retain their browser semantics.
- Focus appearance encoded through utilities must be reproduced exactly.
- Dialog focus trapping, announcement order and tab sequence without runtime testing: Not found.
- WCAG conformance level: Not found.
`);

write("foundations/14-tailwind-css-system.md", `# Tailwind utilities, CSS variables and custom classes

## Counts

- Unique class/Tailwind tokens: ${allClassTokens.length}.
- Tailwind-style utility tokens after custom-class separation: ${tailwindUtilities.length}.
- Global CSS class selectors: ${globalClasses.length}.
- Global custom classes referenced by JSX: ${uniq(customClassesUsed).length}.

## Every Tailwind-style utility token

${tailwindUtilities.map((item) => `- ${code(item)}`).join("\n")}

## Custom global classes used by components

${uniq(customClassesUsed).map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Plugin usage

No Tailwind plugin declaration was found in source configuration. Tailwind 4 PostCSS integration is present. Any framework-internal generated CSS: Not found.
`);

write("foundations/15-reusable-patterns.md", `# Reusable implementation patterns

Repeated class combinations are treated as observed patterns, not newly designed components.

${table(["Pattern ID", "Occurrences", "Exact class combination"], reusablePatterns.map(([classes, count], index) => [`MWI-PATTERN-${String(index + 1).padStart(3, "0")}`, count, code(classes)]))}

## JSX render helpers that are not React components

${table(["Name", "Source", "Lines", "Signature"], renderHelpers.map((item) => [item.name, code(relProject(item.file)), `${item.lineStart}-${item.lineEnd}`, code(item.signature)]))}

Pattern intent beyond repeated implementation: Estimated from implementation.
`);

write("appendices/jsx-render-helpers.md", `# JSX render helpers outside the component registry

These functions return JSX but use lowercase names and are invoked as ordinary render helpers, so they are not counted as React component identities.

${renderHelpers.map((item) => `## ${item.name}\n\n- Source: ${code(relProject(item.file))}:${item.lineStart}-${item.lineEnd}.\n- Signature: ${code(item.signature)}.\n\n\`\`\`tsx\n${item.source}\n\`\`\`\n`).join("\n") || "Not found"}
`);

write("foundations/16-layering-overflow-scrollbars.md", `# Layering, z-index, overflow, sticky regions and scrollbars

## Z-index utilities

${tailwindUtilities.filter((item) => /(^|:)z-/.test(item)).map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Position utilities

${tailwindUtilities.filter((item) => /(^|:)(fixed|absolute|relative|sticky)$|(^|:)(top|right|bottom|left|inset)-/.test(item)).map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Overflow and scrolling utilities

${tailwindUtilities.filter((item) => /overflow|overscroll|scroll|snap-/.test(item)).map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Scrollbars

Explicit scrollbar pseudo-element styling in global CSS: ${/::-webkit-scrollbar|scrollbar-color|scrollbar-width/.test(globalCss) ? "Detected; see verbatim CSS" : "Not found"}.
`);

write("foundations/17-figma-reconstruction-plan.md", `# Figma reconstruction plan

## Build order

1. Create primitive and semantic variables from the token registry.
2. Recreate global effects/backgrounds and typography styles.
3. Build Primitive UI components in descending priority.
4. Build shared/layout/navigation components.
5. Build feature components and internal nested components.
6. Assemble layouts and routes.
7. Capture and compare every state/variant/breakpoint from the component checklists.

## Priority matrix

${table(["Rank", "ID", "Component", "Category", "Score", "Parents", "Specification"], [...components].sort((a, b) => b.figmaPriority - a.figmaPriority || b.parents.length - a.parents.length || a.name.localeCompare(b.name)).map((item, index) => [index + 1, item.id, item.name, item.category, item.figmaPriority, item.parents.length, `[open](../${item.document})`]))}

The score is Estimated from implementation and is a reconstruction ordering aid, not a recommendation to redesign.
`);

write("foundations/18-global-css-verbatim.md", `# Global CSS — verbatim implementation snapshot

Source: ${code("Dashboard Admin/src/app/globals.css")}. This appendix exists so the system can be rebuilt without access to source.

\`\`\`css
${globalCss}
\`\`\`
`);

write("foundations/19-state-management-data-interactions.md", `# State management, data dependencies and interaction triggers

## Hooks

${hooksGlobal.map((item) => `- ${code(item)}`).join("\n")}

## localStorage keys

${localStorageKeys.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## API references

${apiReferences.map((item) => `- ${code(item)}`).join("\n") || "Not found"}

## Per-component state

${table(["Component", "Local state initializers", "Events"], components.filter((item) => item.stateVariables.length || item.events.length).map((item) => [item.id, item.stateVariables.join(", ") || "Not found", item.events.join(", ") || "Not found"]))}
`);

write("foundations/20-audit-methodology-and-unknowns.md", `# Audit methodology, evidence and unknowns

## Evidence method

- TypeScript compiler AST over every JSX/TSX file in ${code("Dashboard Admin/src")}.
- Compatibility re-exports included as separate callable component identities.
- JSX hierarchy, props, imports, classes, state hooks, events, ARIA, assets and responsive prefixes extracted per definition.
- Global CSS parsed and preserved verbatim.
- Public assets inventoried by exact path, extension and byte size.
- No project source file was modified.

## Interpretation labels

- ${code("Estimated from implementation")}: a reconstruction inference where no direct exact token/contract exists.
- ${code("Not found")}: no static evidence was found.

## Known static-audit limits

- Runtime visual output, authenticated data and network-dependent branches: Not found.
- Browser layout rounding, font substitution and content-driven wrapping: Estimated from implementation.
- Hidden branches assembled dynamically through values not represented as JSX tags may require runtime captures.
- Figma instance architecture is a translation of current code structure, not an existing Figma source of truth.
`);

const requestedFamilies = [
  ["Badges and tags", /Badge|Pill|Tag|Chip/], ["Avatars", /Avatar/], ["Buttons", /Button/], ["Inputs and text areas", /Input|Textarea|Field|Area/],
  ["Checkboxes", /Checkbox/], ["Switches and toggles", /Switch|Toggle/], ["Dropdowns and selects", /Dropdown|Select/], ["Menus", /Menu|Sidebar|Navigation/],
  ["Pagination", /Pagination/], ["Tabs", /Tab/], ["Search", /Search/], ["Filters", /Filter/], ["Tables", /Table|Backlog/],
  ["Cards", /Card|Tile|Metric|Stat/], ["Pokémon cards", /PokemonCard/], ["Pokémon/list rows", /Row|List/], ["Progress rows", /Progress|Bar/],
  ["Sidebar", /Sidebar/], ["Header", /Header|Topbar/], ["Footer", /Footer/], ["Dashboard widgets", /Widget/], ["Charts", /Chart|Bars|Timeline/],
  ["Panels", /Panel/], ["Dialogs and modals", /Dialog|Modal/], ["Drawers", /Drawer/], ["Tooltips", /Tooltip/], ["Toasts", /Toast/],
  ["Notifications", /Notification|Banner/], ["Loading and skeletons", /Loading|Skeleton/], ["Error states", /Error|Issue/], ["Empty states", /Empty/],
  ["Success states", /Success|Validation/], ["Tables/rows", /Table|Row/], ["Navigation", /Navigation|Sidebar|Topbar|ActionLink/],
];
write("foundations/21-component-family-coverage.md", `# Component family coverage and explicit absences

This matrix maps the requested design-system families to actual detected component identities. A family with no named component is marked Not found; behavior may still be embedded inside a larger component and is covered by its JSX specification.

${table(["Family", "Detected component identities", "Status"], requestedFamilies.map(([family, pattern]) => {
  const matches = components.filter((component) => pattern.test(component.name));
  return [family, matches.length ? matches.map((component) => `${component.id} ${component.name}`).join(", ") : "Not found", matches.length ? `${matches.length} detected` : "Not found"];
}))}

## Embedded controls

Native ${code("button")}, ${code("input")}, ${code("select")}, ${code("textarea")}, table and list structures embedded in feature components are fully enumerated in each component's HTML outline and class tables even when no dedicated named component exists.
`);

for (const page of pages) {
  const pageComponents = page.components.map((id) => componentById.get(id)).filter(Boolean);
  write(`pages/${page.id.toLowerCase()}-${page.route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root"}.md`, `# ${page.id} — ${page.route}

- Source: ${code(page.file)}.
- Root definitions: ${pageComponents.length ? pageComponents.map((item) => `[${item.name}](../${item.document})`).join(", ") : "Not found"}.
- Layout coverage: ${layouts.filter((layout) => page.route.startsWith(layout.scope === "/" ? "/" : layout.scope)).map((layout) => layout.id).join(", ") || "Not found"}.

## Reconstruction checklist

- □ Desktop dark
- □ Desktop light
- □ Tablet dark
- □ Tablet light
- □ Mobile dark
- □ Mobile light
- □ Loading/data-ready/empty/error states where detected in child specifications
- □ Keyboard traversal and focus order
- □ Sticky, scrollable and overflow regions

Exact rendered composition beyond statically resolved root definitions: Estimated from implementation.
`);
}

const screenshotRows = components.map((component) => [component.id, component.name, component.states.filter((state) => state.detected).map((state) => state.name).join(", "), component.props.variants.map((variant) => `${variant.prop}=${variant.value}`).join(", ") || "Not found", component.responsive.join(", ") || "Not found", `[checklist](../${component.document}#18-screenshot-capture-checklist)`]);
write("screenshots/master-component-screenshot-checklist.md", `# Master component screenshot checklist

Each linked component specification contains its state-by-state checkbox table.

${table(["ID", "Component", "States", "Variants", "Breakpoints", "Checklist"], screenshotRows)}
`);

const totalVariants = components.reduce((sum, component) => sum + component.props.variants.length, 0);
const totalStates = components.reduce((sum, component) => sum + component.states.filter((state) => state.detected).length, 0);
const componentRows = components.map((component) => [component.id, component.name, component.category, component.alias ? "facade" : component.exported ? "exported" : "internal", component.parents.length, component.childComponents.length, component.figmaPriority, `[spec](./${component.document})`]);
const highLevelEdges = dependencyEdges.filter((edge) => {
  const source = componentById.get(edge.source);
  const target = componentById.get(edge.target);
  return source?.category === "Page" || source?.category.includes("Layout") || target?.category === "Primitive UI" || target?.parents.length >= 5;
});
const highLevelMermaid = ["flowchart LR", ...highLevelEdges.map((edge) => `  ${edge.source.replaceAll("-", "_")}["${edge.source}"] --> ${edge.target.replaceAll("-", "_")}["${edge.target}"]`)].join("\n");

write("index.md", `# MatWeb Innovation — Dashboard Admin Design System Audit

Official reverse-engineered technical specification of the current Dashboard Admin implementation. No source code was modified; no redesign, optimization, refactor or simplification is proposed.

## Audit summary

${table(["Metric", "Total", "Definition"], [
  ["Components", components.length, "Distinct AST component definitions plus compatibility component paths"],
  ["Implementation component definitions", components.filter((item) => !item.alias).length, "Uppercase React definitions containing JSX"],
  ["Compatibility component paths", components.filter((item) => item.alias).length, "Callable re-export identities linked to canonical definitions"],
  ["Variants", totalVariants, "Explicit prop/value variant pairs statically detected"],
  ["States", totalStates, "Detected component-state pairs from the standard state vocabulary"],
  ["Design tokens", designTokenSet.size, "Unique implementation token records across CSS variables, literals and utility families"],
  ["CSS variables", cssVariableNames.length, "Unique custom property names"],
  ["Tailwind utilities", tailwindUtilities.length, "Unique Tailwind-style class tokens after custom-class separation"],
  ["Icons", lucideIcons.length + iconAssets.length, "Unique Lucide imports plus icon-like public asset files"],
  ["Animations", animationPatterns.length, "Unique keyframe, CSS declaration and utility animation patterns"],
  ["Pages", pages.length, "App Router page files"],
  ["Layouts", layouts.length, "App Router layout files"],
  ["Reusable patterns", totalReusablePatterns, "Repeated exact className combinations plus lowercase JSX render helpers"],
  ["Public assets", assets.length, "All files under public, including non-visual files"],
  ["Component dependency edges", dependencyEdges.length, "Statically resolved local render/re-export relations"],
])}

Counts are exact for the stated extraction definitions. Runtime-only variants or states: Not found.

## Table of contents

### Foundations

1. [Project architecture](./foundations/01-project-architecture.md)
2. [Folder structure, routing and layouts](./foundations/02-folder-routing-layouts.md)
3. [Color and theme tokens](./foundations/03-color-and-theme-tokens.md)
4. [Typography](./foundations/04-typography.md)
5. [Spacing, sizing and grid](./foundations/05-spacing-sizing-grid.md)
6. [Radius, borders and opacity](./foundations/06-radius-border-opacity.md)
7. [Elevation and effects](./foundations/07-elevation-effects-backgrounds.md)
8. [Motion and transitions](./foundations/08-motion-transitions.md)
9. [Responsive system](./foundations/09-responsive-system.md)
10. [Icons and complete assets](./foundations/10-icons-images-assets.md)
11. [Component hierarchy and full dependencies](./foundations/11-component-hierarchy-dependencies.md)
12. [Interaction state model](./foundations/12-interaction-state-model.md)
13. [Accessibility, keyboard and focus](./foundations/13-accessibility-keyboard-focus.md)
14. [Tailwind and CSS system](./foundations/14-tailwind-css-system.md)
15. [Reusable patterns](./foundations/15-reusable-patterns.md)
16. [Layering, overflow and scrollbars](./foundations/16-layering-overflow-scrollbars.md)
17. [Figma reconstruction plan](./foundations/17-figma-reconstruction-plan.md)
18. [Global CSS verbatim](./foundations/18-global-css-verbatim.md)
19. [State management and data interactions](./foundations/19-state-management-data-interactions.md)
20. [Methodology and unknowns](./foundations/20-audit-methodology-and-unknowns.md)
21. [Component family coverage and explicit absences](./foundations/21-component-family-coverage.md)

### Operational indexes

- [Master screenshot checklist](./screenshots/master-component-screenshot-checklist.md)
- [Component registry](./registries/components.json)
- [Token registry](./registries/tokens.json)
- [Tailwind utility registry](./registries/tailwind-utilities.json)
- [Assets registry](./registries/assets.json)
- [Icons registry](./registries/icons.json)
- [Animations registry](./registries/animations.json)
- [Reusable patterns registry](./registries/reusable-patterns.json)
- [Pages/layouts registry](./registries/pages.json)
- [Dependency registry](./registries/dependencies.json)
- [Lowercase JSX render helpers](./appendices/jsx-render-helpers.md)

## Component dependency graph

The graph below emphasizes pages, layouts, primitives and high-reuse nodes. The [full graph and adjacency matrix](./foundations/11-component-hierarchy-dependencies.md) contains every resolved edge.

\`\`\`mermaid
${highLevelMermaid}
\`\`\`

## Component hierarchy

${table(["ID", "Name", "Category", "Visibility", "Parents", "Children", "Figma score", "Document"], componentRows)}

## Design token hierarchy

\`\`\`mermaid
flowchart TD
  ROOT["Implementation tokens · ${designTokenSet.size}"] --> CSS["CSS variables · ${cssVariableNames.length}"]
  ROOT --> COLOR["Literal colors · ${colors.length}"]
  ROOT --> SPACE["Spacing · ${spacingTokens.length}"]
  ROOT --> SIZE["Sizing · ${sizingTokens.length}"]
  ROOT --> TYPE["Typography · ${typographyTokens.length}"]
  ROOT --> RADIUS["Radius · ${radiusTokens.length}"]
  ROOT --> BORDER["Borders/strokes · ${borderTokens.length}"]
  ROOT --> SHADOW["Shadows/elevation · ${shadowTokens.length}"]
  ROOT --> OPACITY["Opacity · ${opacityTokens.length}"]
  ROOT --> BG["Background/blur/gradient · ${backgroundTokens.length}"]
  ROOT --> MOTION["Animation utilities · ${animationUtilities.length}"]
  ROOT --> BREAKPOINT["Breakpoint names · ${breakpointNames.length}"]
  CSS --> PRIMITIVE["Primitive theme values"]
  CSS --> SEMANTIC["Semantic aliases via @theme inline"]
  SEMANTIC --> COMPONENT["Component utility references"]
\`\`\`

## Folder tree

The complete source tree is in [Folder structure, routing and layouts](./foundations/02-folder-routing-layouts.md). Core documentation structure:

\`\`\`text
design-system-audit/
├── index.md
├── components/ (${components.length} specifications)
├── foundations/ (21 system specifications)
├── pages/ (${pages.length} page reconstruction checklists)
├── screenshots/ (master capture checklist)
├── registries/ (10 machine-readable inventories)
└── generate-audit.mjs (reproducible read-only source scanner)
\`\`\`

## Figma recreation priority

${table(["Rank", "ID", "Component", "Category", "Score", "Why first"], [...components].sort((a, b) => b.figmaPriority - a.figmaPriority || b.parents.length - a.parents.length || a.name.localeCompare(b.name)).map((item, index) => [index + 1, item.id, item.name, item.category, item.figmaPriority, item.category === "Primitive UI" ? "Primitive foundation" : item.parents.length >= 5 ? `${item.parents.length} parents` : item.category.includes("Layout") ? "Structural layout" : item.alias ? "Compatibility path; recreate after target" : "Feature assembly"] ))}

## Completion statement

Every statically detected React component identity has a dedicated Markdown specification containing purpose, location, dependencies, hierarchy, props, defaults, variants, states, interactions, layout, exact class utilities, conditional classes, CSS variables, styles, responsive behavior, motion, accessibility, icons/assets, Figma translation and screenshot checklist. Unknown runtime evidence is explicitly marked Not found or Estimated from implementation.
`);

const manifest = {
  generatedAt: "2026-07-13",
  project: "Dashboard Admin",
  sourceModified: false,
  outputs: {
    markdown: walk(output, (file) => file.endsWith(".md")).length,
    json: walk(output, (file) => file.endsWith(".json")).length + 1,
    componentDocuments: components.length,
  },
  statistics: {
    components: components.length,
    implementationDefinitions: components.filter((item) => !item.alias).length,
    compatibilityComponentPaths: components.filter((item) => item.alias).length,
    variants: totalVariants,
    states: totalStates,
    designTokens: designTokenSet.size,
    cssVariables: cssVariableNames.length,
    tailwindUtilities: tailwindUtilities.length,
    icons: lucideIcons.length + iconAssets.length,
    animations: animationPatterns.length,
    pages: pages.length,
    layouts: layouts.length,
    reusablePatterns: totalReusablePatterns,
    assets: assets.length,
    dependencyEdges: dependencyEdges.length,
  },
};
write("registries/manifest.json", JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
