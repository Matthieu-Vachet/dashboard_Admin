import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const docsRoot = path.join(root, "docs");
const tomePattern = /^Tome ([1-8])(?:\s|\u00a0)/;
const markdownFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? markdownFiles(target) : entry.isFile() && entry.name.endsWith(".md") ? [target] : [];
});

const directories = fs.readdirSync(docsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && tomePattern.test(entry.name))
  .sort((left, right) => Number(left.name.match(tomePattern)[1]) - Number(right.name.match(tomePattern)[1]));
const files = directories.flatMap((directory) => markdownFiles(path.join(docsRoot, directory.name)));
const errors = [];
const warnings = [];
const ids = new Map();
const counts = {};
const matrix = [];

for (const file of files) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  const tome = path.relative(docsRoot, file).match(tomePattern)?.[1] || "?";
  const fileErrorsBefore = errors.length;
  const fileWarningsBefore = warnings.length;
  counts[tome] = (counts[tome] || 0) + 1;
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    errors.push(`${relative}: frontmatter absent`);
    continue;
  }
  const id = frontmatter[1].match(/^id:\s*["']?([^\n"']+)/m)?.[1]?.trim();
  if (!id) errors.push(`${relative}: id absent`);
  else if (ids.has(id)) errors.push(`${relative}: id dupliqué avec ${ids.get(id)}`);
  else ids.set(id, relative);
  if (!/^#\s+/m.test(text)) errors.push(`${relative}: titre H1 absent`);
  if (text.length < 180) warnings.push(`${relative}: contenu très court à enrichir lors de la prochaine évolution du domaine`);
  if (/ma[-_ ]collection|my[-_ ]collection/i.test(text) && !/(histor|retir|supprim|migration|archive)/i.test(text)) {
    errors.push(`${relative}: ancienne fonctionnalité présentée sans contexte historique`);
  }
  for (const match of text.matchAll(/\]\((?!https?:|mailto:|#)([^)]+)\)/g)) {
    const target = decodeURIComponent(match[1].replace(/^<|>$/g, "").split("#")[0]);
    if (target && !fs.existsSync(path.resolve(path.dirname(file), target))) warnings.push(`${relative}: lien local introuvable (${match[1]})`);
  }
  matrix.push({
    tome: Number(tome),
    document: relative,
    status: errors.length > fileErrorsBefore
      ? "obsolète"
      : warnings.length > fileWarningsBefore
        ? "partiellement obsolète"
        : "à jour",
    corrections: errors.length > fileErrorsBefore || warnings.length > fileWarningsBefore
      ? "voir diagnostics"
      : "aucune correction requise",
    evidence: [
      relative,
      "scripts/audit-foundation-documentation.mjs",
      "scripts/validate-documentation.mjs",
    ],
    verifiedAt: "2026-08-02",
  });
}

const report = {
  valid: errors.length === 0,
  scope: "Tomes 1 à 8",
  documentsReadCompletely: files.length,
  identifiers: ids.size,
  byTome: counts,
  matrix,
  errors,
  warnings,
  totalWarnings: warnings.length,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
