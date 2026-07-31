import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const docsRoot = path.join(root, "docs");

function markdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(file) : entry.isFile() && entry.name.endsWith(".md") ? [file] : [];
  });
}

const tomeDirectories = fs.readdirSync(docsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.startsWith("Tome "))
  .map((entry) => path.join(docsRoot, entry.name));
const files = [
  ...tomeDirectories.flatMap(markdownFiles),
  path.join(docsRoot, "TOME-INDEX.md"),
  path.join(docsRoot, "Reports", "DOCUMENTATION-AUDIT-2026-07-31.md"),
];

function parseFrontmatter(file) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.startsWith("---\n")) return { text, data: null };
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) return { text, data: null };
  const data = {};
  let listKey = null;
  for (const line of text.slice(4, end).split("\n")) {
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && listKey) {
      if (!Array.isArray(data[listKey])) data[listKey] = [];
      data[listKey].push(listItem[1].replace(/^['"]|['"]$/g, ""));
      continue;
    }
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    data[key] = raw.startsWith("[") && raw.endsWith("]")
      ? raw.slice(1, -1).split(",").map((item) => item.trim()).filter(Boolean)
      : raw.replace(/^['"]|['"]$/g, "");
    listKey = raw ? null : key;
  }
  return { text, data };
}

const required = ["id", "title", "version", "status", "last_update", "author", "affected_projects", "references"];
const errors = [];
const warnings = [];
const documents = files.map((file) => ({ file, ...parseFrontmatter(file) }));
const byId = new Map();

for (const document of documents) {
  const relative = path.relative(root, document.file);
  if (!document.data) {
    errors.push(`${relative}: frontmatter absent`);
    continue;
  }
  const normalized = {
    ...document.data,
    title: document.data.title || document.data.titre,
    status: document.data.status || document.data.statut,
    last_update: document.data.last_update || document.data.last_updated || document.data.derniere_mise_a_jour || document.data.updated || document.data.date,
    author: document.data.author || document.data.auteur || document.data.owner,
    affected_projects: document.data.affected_projects || document.data.projets_concernes || document.data.projects || document.data.scope || document.data.source_of_truth,
    references: document.data.references || [],
  };
  document.data = normalized;
  const strict = normalized.last_update === "2026-07-31" || /DOCUMENTATION-AUDIT|TOME-INDEX/.test(relative);
  for (const key of required) {
    if (!(key in normalized) || normalized[key] === "" || normalized[key] == null) {
      (strict ? errors : warnings).push(`${relative}: ${key} absent`);
    }
  }
  const id = normalized.id;
  if (!/^[A-Z][A-Z0-9-]*-\d+(?:-[A-Z0-9-]+)?$/.test(id)) errors.push(`${relative}: identifiant invalide (${id})`);
  if (byId.has(id)) errors.push(`${relative}: identifiant dupliqué avec ${path.relative(root, byId.get(id))}`);
  else byId.set(id, document.file);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized.last_update || "")) (strict ? errors : warnings).push(`${relative}: last_update invalide`);
  for (const match of document.text.matchAll(/\]\((?!https?:|#|mailto:)([^)]+)\)/g)) {
    const target = decodeURIComponent(match[1].split("#")[0]);
    if (!target) continue;
    const absolute = path.resolve(path.dirname(document.file), target);
    if (!fs.existsSync(absolute)) warnings.push(`${relative}: lien local introuvable (${match[1]})`);
  }
}

for (const document of documents) {
  if (!document.data) continue;
  for (const reference of document.data.references || []) {
    if (/^[A-Z][A-Z0-9-]*-\d+/.test(reference) && !byId.has(reference)) {
      const relative = path.relative(root, document.file);
      (document.data.last_update === "2026-07-31" ? errors : warnings).push(`${relative}: référence inconnue (${reference})`);
    }
  }
}

const tomeIndex = fs.readFileSync(path.join(docsRoot, "TOME-INDEX.md"), "utf8");
for (const directory of tomeDirectories) {
  if (!tomeIndex.includes(path.basename(directory).split(" — ")[0].split(" - ")[0])) {
    errors.push(`docs/TOME-INDEX.md: tome non indexé (${path.basename(directory)})`);
  }
}

if (errors.length) {
  console.error(JSON.stringify({ valid: false, documents: documents.length, errors: errors.slice(0, 200), totalErrors: errors.length, warnings, totalWarnings: warnings.length }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ valid: true, documents: documents.length, identifiers: byId.size, tomes: tomeDirectories.length, warnings, totalWarnings: warnings.length }, null, 2));
