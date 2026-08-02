import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const docsRoot = path.join(root, "docs");

const mandatoryTomes = new Map([
  ["Tome 9 — Assets", ["ASSET-001-asset-architecture.md", "ASSET-002-home-assets.md", "ASSET-003-go-assets.md", "ASSET-004-icons.md", "ASSET-005-backgrounds.md", "ASSET-006-location-cards.md", "ASSET-007-filters.md", "ASSET-008-asset-validation.md"]],
  ["Tome 10 — Tests", ["TEST-001-testing-strategy.md", "TEST-002-unit-tests.md", "TEST-003-integration-tests.md", "TEST-004-e2e-tests.md", "TEST-005-responsive-tests.md", "TEST-006-provider-tests.md", "TEST-007-dataset-tests.md", "TEST-008-api-tests.md", "TEST-009-performance-tests.md"]],
  ["Tome 11 — Performance", ["PERF-001-rendering.md", "PERF-002-memoization.md", "PERF-003-virtualization.md", "PERF-004-pagination.md", "PERF-005-lazy-loading.md", "PERF-006-caching.md", "PERF-007-optimizations.md"]],
  ["Tome 12 — Responsive", ["RESP-001-desktop.md", "RESP-002-laptop.md", "RESP-003-tablet.md", "RESP-004-mobile.md", "RESP-005-breakpoints.md", "RESP-006-responsive-components.md"]],
  ["Tome 13 — Security", ["SEC-001-authentication.md", "SEC-002-authorization.md", "SEC-003-private-datasets.md", "SEC-004-public-datasets.md", "SEC-005-admin.md", "SEC-006-api-security.md"]],
  ["Tome 14 — Roadmap", ["ROADMAP-001-roadmap.md", "ROADMAP-002-future-features.md", "ROADMAP-003-technical-debt.md", "ROADMAP-004-ideas.md", "ROADMAP-005-known-limitations.md"]],
]);

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

for (const [directory, requiredFiles] of mandatoryTomes) {
  const absoluteDirectory = path.join(docsRoot, directory);
  if (!fs.existsSync(absoluteDirectory)) {
    errors.push(`docs/${directory}: tome obligatoire absent`);
    continue;
  }
  for (const requiredFile of requiredFiles) {
    if (!fs.existsSync(path.join(absoluteDirectory, requiredFile))) {
      errors.push(`docs/${directory}/${requiredFile}: document obligatoire absent`);
    }
  }
}
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
  const strict = ["2026-07-31", "2026-08-02"].includes(normalized.last_update) || /DOCUMENTATION-AUDIT|TOME-INDEX/.test(relative);
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
  if (strict && !["Active", "active", "Official", "Accepted", "Public", "Private", "Historical", "Complete", "Draft", "Deprecated", "Archived", "en-cours"].includes(normalized.status)) errors.push(`${relative}: status invalide (${normalized.status})`);
  if (/docs\/Tome (?:9|10|11|12|13|14) /.test(relative) && !/^## Historique/m.test(document.text)) errors.push(`${relative}: historique absent`);
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
      (["2026-07-31", "2026-08-02"].includes(document.data.last_update) ? errors : warnings).push(`${relative}: référence inconnue (${reference})`);
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
