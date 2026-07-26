import fs from "node:fs";
import path from "node:path";

const dashboardRoot = path.resolve(import.meta.dirname, "..");
const workspaceRoot = path.resolve(dashboardRoot, "..");
const foundationDirectory = path.join(dashboardRoot, "docs", "Tome 1 — Foundation (Fondations)");
const auditDirectory = path.join(dashboardRoot, "docs", "Reports", "Audits", "audit-documentation");
const registryDirectory = path.join(auditDirectory, "registries");
const expectedKeys = [
  "id", "title", "description", "version", "status", "owner", "created", "last_updated",
  "category", "type", "language", "scope", "source_files", "registries", "related",
];
const expectedSections = [
  "## 1. Périmètre vérifié",
  "## 2. Inventaire du code",
  "## 3. Implémentation observée",
  "## 4. Relations et dépendances",
  "## 5. Diagramme vérifié",
  "## 6. Références documentaires",
  "## 7. Informations absentes du code",
  "## 8. Fichiers sources",
];
const forbidden = /\b(par exemple|généralement|habituellement|souvent|dans la plupart des cas|on peut|devrait|pourrait|est recommandé|il est conseillé)\b/i;

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(registryDirectory, `${name}.json`), "utf8"));
}

function fail(message) {
  throw new Error(message);
}

function frontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) fail("Front matter absent");
  const keys = match[1].split("\n").filter((line) => /^[a-z_]+:/.test(line)).map((line) => line.split(":")[0]);
  const values = {};
  for (const key of keys) {
    const scalar = match[1].match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
    values[key] = scalar?.[1]?.replace(/^"|"$/g, "") || "";
  }
  const sourceFiles = [];
  const lines = match[1].split("\n");
  const start = lines.indexOf("source_files:");
  for (let index = start + 1; index < lines.length && /^  - /.test(lines[index]); index += 1) {
    sourceFiles.push(JSON.parse(lines[index].slice(4)));
  }
  return { keys, values, sourceFiles };
}

function localLinks(source) {
  return [...source.matchAll(/\[[^\]]+\]\((<[^>]+>|[^)]+)\)/g)]
    .map((match) => match[1].replace(/^<|>$/g, ""))
    .filter((target) => !/^[a-z]+:/i.test(target) && !target.startsWith("#"));
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(target) : [target];
  });
}

const docs = fs.readdirSync(foundationDirectory)
  .filter((name) => /^DOC-(?:0(?:1[1-9]|2\d|3[0-5]))-.*\.md$/.test(name))
  .sort();
if (docs.length !== 25) fail(`25 documents attendus, ${docs.length} trouvés`);

const documentationMap = readJson("documentation-map");
if (
  documentationMap.metadata.total !== documentationMap.entries.length
  || documentationMap.metadata.statusCounts.documentedCurrent < docs.length
) {
  fail("documentation-map.json n’est pas auto-cohérent avec les Foundation courantes");
}
const expectedFoundationSource = "Dashboard Admin/docs/Tome 1 — Foundation (Fondations)";
for (const name of docs) {
  const id = name.slice(0, 7);
  const entry = documentationMap.entries.find((candidate) => candidate.id === id);
  if (!entry?.codeFiles?.includes(expectedFoundationSource)) {
    fail(`Source Foundation courante absente du mapping: ${id}`);
  }
}
const validIds = new Set(documentationMap.entries.map((entry) => entry.id));
for (const file of listFiles(path.join(dashboardRoot, "docs"))) {
  const documentedId = path.basename(file).match(/^(?:DOC|PAGE|COMP|HOOK|CTX|SERVICE|PROVIDER|DATASET|API|COL|ASSET|WORKFLOW|ADR|RULE)-\d{3}\b/)?.[0];
  if (documentedId) validIds.add(documentedId);
}
const missingByDocument = [];
let sectionCount = 0;
let diagramCount = 0;
let internalLinkCount = 0;
let referenceOccurrences = 0;
const uniqueReferences = new Set();

for (const name of docs) {
  const file = path.join(foundationDirectory, name);
  const source = fs.readFileSync(file, "utf8");
  const meta = frontMatter(source);
  if (meta.keys.join("|") !== expectedKeys.join("|")) fail(`Front matter non homogène: ${name}`);
  const [majorVersion] = meta.values.version.split(".").map(Number);
  if (!/^\d+\.\d+\.\d+$/.test(meta.values.version) || majorVersion < 2 || meta.values.status !== "Official") {
    fail(`Version ou statut invalide: ${name}`);
  }
  const headings = source.match(/^## [1-8]\. .+$/gm) || [];
  if (headings.join("|") !== expectedSections.join("|")) fail(`Sections non homogènes: ${name}`);
  sectionCount += headings.length;
  const diagrams = (source.match(/```mermaid/g) || []).length;
  if (diagrams !== 1) fail(`Un diagramme Mermaid attendu: ${name}`);
  diagramCount += diagrams;
  if (forbidden.test(source)) fail(`Texte interdit dans ${name}`);

  for (const sourceFile of meta.sourceFiles) {
    const target = path.join(workspaceRoot, sourceFile);
    if (!fs.existsSync(target)) fail(`Source absente dans ${name}: ${sourceFile}`);
  }
  for (const target of localLinks(source)) {
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target.split("#")[0]));
    if (!fs.existsSync(resolved)) fail(`Lien absent dans ${name}: ${target}`);
    internalLinkCount += 1;
  }
  for (const match of source.matchAll(/\b(?:DOC|PAGE|COMP|HOOK|CTX|SERVICE|PROVIDER|DATASET|API|COL|ASSET|WORKFLOW|ADR)-\d{3}\b/g)) {
    const id = match[0];
    if (!validIds.has(id)) fail(`Référence inconnue dans ${name}: ${id}`);
    if (id !== meta.values.id) {
      referenceOccurrences += 1;
      uniqueReferences.add(id);
    }
  }
  const missingSection = source.split("## 7. Informations absentes du code\n\n")[1]?.split("\n\n## 8.")[0] || "";
  const missing = missingSection.split("\n").filter((line) => line.startsWith("- ")).map((line) => line.slice(2));
  if (!missing.length) fail(`Liste d’informations absentes vide: ${name}`);
  missingByDocument.push({ id: meta.values.id, title: meta.values.title, missing });
}

const apiRegistry = readJson("api-routes");
if (!apiRegistry.entries.length || apiRegistry.entries.length !== apiRegistry.count) fail("Registre API incohérent");
for (const route of apiRegistry.entries) {
  const file = path.join(workspaceRoot, route.file);
  if (!fs.existsSync(file)) fail(`Fichier de route absent: ${route.id} ${route.file}`);
  if (route.project === "Dashboard Admin") {
    const source = fs.readFileSync(file, "utf8");
    if (!new RegExp(`export\\s+async\\s+function\\s+${route.method}\\b`).test(source)) fail(`Méthode absente: ${route.id}`);
  }
}

const componentRegistry = readJson("components");
if (!componentRegistry.entries.length || componentRegistry.entries.length !== componentRegistry.count) fail("Registre composants incohérent");
for (const component of componentRegistry.entries) {
  const relative = /^(Dashboard Admin|Landing-Page-PogoApi|PokemonGo-API-)\//.test(component.path)
    ? component.path
    : `Dashboard Admin/${component.path}`;
  if (!fs.existsSync(path.join(workspaceRoot, relative))) fail(`Composant absent: ${component.id} ${relative}`);
}

const collectionRegistry = readJson("mongodb-collections");
if (!collectionRegistry.entries.length || collectionRegistry.entries.length !== collectionRegistry.count) fail("Registre Mongo incohérent");
const dashboardSearch = listFiles(path.join(dashboardRoot, "src"))
  .filter((file) => /\.(?:js|jsx|ts|tsx)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
for (const collection of collectionRegistry.entries) {
  if (collection.schemaPath && !fs.existsSync(path.join(workspaceRoot, collection.schemaPath))) fail(`Schéma absent: ${collection.id}`);
  if (collection.project === "Dashboard Admin" && !dashboardSearch.includes(collection.name)) fail(`Collection Dashboard non trouvée dans le code: ${collection.id}`);
}

for (const name of ["pages", "services", "datasets", "providers", "assets"]) {
  const registry = readJson(name);
  if (!registry.entries.length) fail(`Registre ${name} vide`);
  if (Number.isInteger(registry.count) && registry.entries.length !== registry.count) fail(`Registre ${name} incohérent`);
}

const auditReports = fs.readdirSync(auditDirectory)
  .filter((name) => /^(?:[0-2]\d|3[0-4])-.*\.md$/.test(name))
  .sort();
if (auditReports.length !== 35) fail(`35 rapports d’audit attendus, ${auditReports.length} trouvés`);
let auditLinksValidated = 0;
for (const name of auditReports) {
  const file = path.join(auditDirectory, name);
  const source = fs.readFileSync(file, "utf8");
  if (!/^last_updated: 2026-07-13$/m.test(source)) fail(`last_updated absent: ${name}`);
  if (name !== "34-post-audit-changes.md" && !source.includes("<!-- current-state-2026-07-13:start -->")) {
    fail(`Encart courant absent: ${name}`);
  }
  if (forbidden.test(source)) fail(`Texte interdit dans le rapport ${name}`);
  for (const target of localLinks(source)) {
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target.split("#")[0]));
    if (!fs.existsSync(resolved)) fail(`Lien absent dans ${name}: ${target}`);
    auditLinksValidated += 1;
  }
}

const metrics = {
  documents: docs.length,
  auditReportsUpdated: auditReports.length,
  sectionsEnriched: sectionCount,
  referenceOccurrences,
  uniqueReferences: uniqueReferences.size,
  diagramsUpdated: diagramCount,
  internalLinksCreated: internalLinkCount,
  auditLinksValidated,
  missingInformationItems: missingByDocument.reduce((sum, document) => sum + document.missing.length, 0),
};

const report = `# Rapport de mise à jour Foundation DOC-011 à DOC-035

Vérification exécutée le 13 juillet 2026 sur le code et les registres courants.

## Métriques

| Mesure | Valeur |
| --- | ---: |
| Documents modifiés | ${metrics.documents} |
| Rapports Markdown d’audit actualisés | ${metrics.auditReportsUpdated} |
| Sections enrichies | ${metrics.sectionsEnriched} |
| Occurrences de références ajoutées | ${metrics.referenceOccurrences} |
| Références uniques | ${metrics.uniqueReferences} |
| Diagrammes Mermaid mis à jour | ${metrics.diagramsUpdated} |
| Liens internes créés | ${metrics.internalLinksCreated} |
| Liens locaux d’audit validés | ${metrics.auditLinksValidated} |
| Informations absentes recensées | ${metrics.missingInformationItems} |

## Documents modifiés

${docs.map((name) => `- [${name}](<./Tome 1 — Foundation (Fondations)/${name}>)`).join("\n")}

## Informations absentes du code

${missingByDocument.map((document) => `### ${document.id} — ${document.title}\n\n${document.missing.map((item) => `- ${item}`).join("\n")}`).join("\n\n")}
`;
if (process.argv.includes("--write-report")) {
  fs.writeFileSync(path.join(dashboardRoot, "docs", "Reports", "foundation-update-report.md"), report);
}

console.log(JSON.stringify(metrics, null, 2));
