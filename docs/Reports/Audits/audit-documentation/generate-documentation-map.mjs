import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryDir = path.join(root, "audit-documentation", "registries");
const read = (name) => JSON.parse(fs.readFileSync(path.join(registryDir, `${name}.json`), "utf8")).entries;

const pages = read("pages");
const components = read("components");
const hooks = read("hooks");
const contexts = read("contexts");
const services = read("services");
const providers = read("providers");
const datasets = read("datasets");
const apiRoutes = read("api-routes");
const collections = read("mongodb-collections");
const assets = read("assets");
const dependencies = JSON.parse(fs.readFileSync(path.join(registryDir, "dependencies.json"), "utf8")).edges;

function componentFile(component) {
  return /^(Dashboard Admin|Landing-Page-PogoApi|PokemonGo-API-)\//.test(component.path)
    ? component.path
    : `Dashboard Admin/${component.path}`;
}

const entries = [];
const seen = new Set();

function add(entry) {
  if (seen.has(entry.id)) throw new Error(`Documentation ID dupliqué: ${entry.id}`);
  seen.add(entry.id);
  entries.push({
    id: entry.id,
    exactName: entry.exactName,
    category: entry.category,
    auditSources: entry.auditSources || [],
    codeFiles: entry.codeFiles || [],
    capturesNeeded: entry.capturesNeeded || [],
    status: entry.status || "generable-immediatement",
    relatedDocuments: entry.relatedDocuments || [],
  });
}

function related(id, limit = 12) {
  return [...new Set(
    dependencies
      .filter((edge) => edge.source === id || edge.target === id)
      .map((edge) => (edge.source === id ? edge.target : edge.source))
      .filter((value) => /^(PAGE|COMP|HOOK|CTX|SERVICE|API|COL|PROVIDER|DATASET|ASSET)-/.test(value)),
  )].slice(0, limit);
}

const coreDocs = [
  ["DOC-001", "Règles du projet", ["01-executive-summary.md", "33-final-checklist.md"]],
  ["DOC-002", "Vision du projet", ["01-executive-summary.md", "06-dashboard-overview.md"]],
  ["DOC-003", "Objectifs du projet", ["01-executive-summary.md", "31-gaps-and-technical-debt.md"]],
  ["DOC-004", "Philosophie produit et données", ["03-architecture-overview.md", "12-datasets-registry.md"]],
  ["DOC-005", "Référentiels et responsabilités", ["02-repository-map.md", "04-folder-structure.md"]],
  ["DOC-006", "Architecture globale", ["03-architecture-overview.md", "27-dependencies-map.md"]],
  ["DOC-007", "Versioning", ["25-versioning-and-release.md"]],
  ["DOC-008", "Changelog", ["25-versioning-and-release.md"]],
  ["DOC-009", "Roadmap", ["31-gaps-and-technical-debt.md"]],
  ["DOC-010", "Vue d’ensemble du design system", ["09-design-system.md"]],
  ["DOC-011", "Vue d’ensemble du Dashboard", ["06-dashboard-overview.md", "07-pages-registry.md", "08-components-registry.md"]],
  ["DOC-012", "Architecture de l’API", ["14-api-registry.md", "18-authentication-and-security.md"]],
  ["DOC-013", "Architecture des données", ["12-datasets-registry.md", "13-data-pipelines.md"]],
  ["DOC-014", "Architecture des assets", ["16-assets-registry.md"]],
  ["DOC-015", "Vue d’ensemble des providers", ["11-providers-registry.md", "13-data-pipelines.md"]],
  ["DOC-016", "Vue d’ensemble des datasets", ["12-datasets-registry.md", "29-public-private-matrix.md"]],
  ["DOC-017", "Vue d’ensemble MongoDB", ["15-mongodb-registry.md"]],
  ["DOC-018", "Cache applicatif", ["17-cache-and-local-data.md", "21-performance-audit.md"]],
  ["DOC-019", "Authentification", ["18-authentication-and-security.md"]],
  ["DOC-020", "Sécurité", ["18-authentication-and-security.md"]],
  ["DOC-021", "Tests", ["24-testing-strategy.md"]],
  ["DOC-022", "Performance", ["21-performance-audit.md"]],
  ["DOC-023", "Responsive", ["19-responsive-audit.md"]],
  ["DOC-024", "Structure des dossiers", ["04-folder-structure.md"]],
  ["DOC-025", "Conventions de code", ["04-folder-structure.md", "24-testing-strategy.md"]],
  ["DOC-026", "Conventions de nommage", ["04-folder-structure.md", "14-api-registry.md", "15-mongodb-registry.md"]],
  ["DOC-027", "Gestion des erreurs", ["22-error-handling.md"]],
  ["DOC-028", "Journalisation", ["23-logging-and-monitoring.md"]],
  ["DOC-029", "Monitoring", ["23-logging-and-monitoring.md"]],
  ["DOC-030", "Checklist qualité", ["24-testing-strategy.md", "26-deployment-and-ci.md"]],
  ["DOC-031", "Processus de release", ["25-versioning-and-release.md", "26-deployment-and-ci.md"]],
  ["DOC-032", "Cache local", ["17-cache-and-local-data.md"]],
  ["DOC-033", "Datasets publics et privés", ["29-public-private-matrix.md"]],
  ["DOC-034", "Glossaire", ["32-final-index.md"]],
  ["DOC-035", "Index des ADR", ["03-architecture-overview.md", "28-workflows.md"]],
];

for (const [id, exactName, auditSources] of coreDocs) {
  add({
    id,
    exactName,
    category: "core-document",
    auditSources,
    codeFiles: id === "DOC-001" || (id >= "DOC-011" && id <= "DOC-035")
      ? ["Dashboard Admin/docs/codex/Tome 1 — Foundation (Fondations)"]
      : [],
    capturesNeeded: ["diagrammes Mermaid ou captures uniquement si indiqués dans le document source"],
    status: id >= "DOC-011" && id <= "DOC-035"
      ? "documented-current"
      : ["DOC-008", "DOC-009"].includes(id)
        ? "informations-manquantes"
        : "generable-immediatement",
    relatedDocuments: id === "DOC-035" ? ["DOC-001", "DOC-006", "DOC-034"] : ["DOC-006"],
  });
}

for (const page of pages) {
  add({
    id: page.id,
    exactName: `Page — ${page.name}`,
    category: page.kind.includes("route") ? "page-route" : "page-section",
    auditSources: ["07-pages-registry.md", "19-responsive-audit.md", "20-accessibility-audit.md"],
    codeFiles: [page.file],
    capturesNeeded: ["390x844", "834x1112", "1440x1000", "dark/light si pertinent"],
    relatedDocuments: related(page.id),
  });
}

for (const component of components) {
  add({
    id: component.id,
    exactName: `Composant — ${component.names.join(" / ")}`,
    category: `component-${component.category.toLowerCase()}`,
    auditSources: ["08-components-registry.md", "09-design-system.md", "20-accessibility-audit.md"],
    codeFiles: [componentFile(component)],
    capturesNeeded: component.status === "facade" ? [] : ["états default/loading/error/empty", "mobile et desktop si visuel"],
    relatedDocuments: related(component.id),
  });
}

for (const hook of hooks) add({ id: hook.id, exactName: `Hook — ${hook.name}`, category: "hook", auditSources: ["10-hooks-contexts-services.md"], codeFiles: [hook.path], relatedDocuments: related(hook.id) });
for (const context of contexts) add({ id: context.id, exactName: `Contexte — ${context.name}`, category: "context", auditSources: ["10-hooks-contexts-services.md"], codeFiles: [context.path], relatedDocuments: related(context.id) });
for (const service of services) add({ id: service.id, exactName: `Service — ${service.name}`, category: "service", auditSources: ["10-hooks-contexts-services.md", "22-error-handling.md"], codeFiles: [service.path], relatedDocuments: related(service.id) });

for (const provider of providers) {
  add({
    id: provider.id,
    exactName: `Provider — ${provider.name}`,
    category: "provider",
    auditSources: ["11-providers-registry.md", "13-data-pipelines.md"],
    codeFiles: [provider.path],
    capturesNeeded: ["exemple de réponse/fixture sans donnée sensible"],
    status: provider.license === "INFORMATION NON TROUVÉE" ? "informations-manquantes" : "generable-immediatement",
    relatedDocuments: related(provider.id),
  });
}

for (const dataset of datasets) {
  add({
    id: dataset.id,
    exactName: `Dataset — ${dataset.name}`,
    category: "dataset",
    auditSources: ["12-datasets-registry.md", "13-data-pipelines.md", "29-public-private-matrix.md"],
    codeFiles: Array.isArray(dataset.sourceFiles) ? dataset.sourceFiles : [String(dataset.sourceFiles)],
    capturesNeeded: ["extrait JSON anonymisé/compact", "diagramme source → Mongo → API"],
    relatedDocuments: related(dataset.id),
  });
}

for (const route of apiRoutes) {
  add({
    id: route.id,
    exactName: `API — ${route.method} ${route.endpoint}`,
    category: "api-route",
    auditSources: ["14-api-registry.md", "18-authentication-and-security.md", "29-public-private-matrix.md"],
    codeFiles: [route.file],
    capturesNeeded: route.visibility === "public" ? ["exemple Swagger/curl facultatif"] : [],
    relatedDocuments: related(route.id),
  });
}

for (const collection of collections) {
  add({
    id: collection.id,
    exactName: `Collection — ${collection.name}`,
    category: "mongodb-collection",
    auditSources: ["15-mongodb-registry.md", "29-public-private-matrix.md"],
    codeFiles: collection.schemaPath ? [collection.schemaPath] : [],
    capturesNeeded: ["schéma/indexes; aucune donnée réelle"],
    status: collection.ttl === null ? "informations-manquantes" : "generable-immediatement",
    relatedDocuments: related(collection.id),
  });
}

for (const asset of assets) {
  add({
    id: asset.id,
    exactName: `Asset — ${asset.family}`,
    category: "asset-family",
    auditSources: ["16-assets-registry.md", "19-responsive-audit.md"],
    codeFiles: [asset.path],
    capturesNeeded: ["planche représentative normale/shiny/formes", "fallback absent"],
    relatedDocuments: related(asset.id),
  });
}

const families = {
  DS: ["Fondations couleurs", "Typographie", "Espacement et layout", "Icônes et images", "États interactifs", "Formulaires", "Data display", "Modales et overlays", "Thèmes et palettes", "Tokens et gouvernance"],
  ARCH: ["Contexte système", "Architecture Dashboard", "Architecture API", "Architecture Data", "Architecture Assets", "Flux public/privé", "Architecture Mongo", "Pipelines de build", "Observabilité", "Sécurité"],
  MONGO: ["Connexion et bases", "Schémas et conventions", "Indexes", "Migrations", "Sauvegarde et rollback", "Rétention et TTL"],
  TEST: ["Pyramide de tests", "Tests API", "Tests datasets", "Tests providers", "Tests Dashboard", "Tests E2E", "Tests accessibilité", "Tests responsive", "Tests performance", "Gates CI"],
  PERF: ["Budgets frontend", "Performance API", "Performance MongoDB", "Providers et jobs", "Mesure Web Vitals"],
  RESP: ["Breakpoints", "Navigation", "Data dense", "Modales", "Touch et DnD", "Matrice viewports"],
  SEC: ["Modèle de menace", "Sessions", "Secrets", "Autorisations", "Headers et CSP", "CORS/CSRF", "Rate limiting", "Données privées"],
  ROADMAP: ["P0 sécurité et production", "P1 qualité et tests", "P2 architecture et performance", "P3 documentation et gouvernance"],
  ADR: ["Source de vérité statique/current", "Mongo-only current", "Shiny privé", "Session HMAC", "Proxies Dashboard", "Provider contract", "Read-back et hash", "Fallback Events", "Persistance Learning", "Distribution assets"],
  TEMPLATE: ["Template page", "Template composant", "Template route API", "Template dataset/provider", "Template runbook/ADR"],
  WORKFLOW: Array.from({ length: 16 }, (_, index) => index === 15 ? "Import et activation atomique de la collection Pokémon GO" : `Workflow ${String(index + 1).padStart(2, "0")}`),
};

const sourceByFamily = {
  DS: ["09-design-system.md"], ARCH: ["03-architecture-overview.md", "27-dependencies-map.md"],
  MONGO: ["15-mongodb-registry.md"], TEST: ["24-testing-strategy.md"], PERF: ["21-performance-audit.md"],
  RESP: ["19-responsive-audit.md"], SEC: ["18-authentication-and-security.md"],
  ROADMAP: ["31-gaps-and-technical-debt.md"], ADR: ["03-architecture-overview.md", "28-workflows.md"],
  TEMPLATE: ["30-documentation-mapping.md"], WORKFLOW: ["28-workflows.md"],
};

for (const [prefix, names] of Object.entries(families)) {
  names.forEach((name, index) => {
    const id = `${prefix}-${String(index + 1).padStart(3, "0")}`;
    add({
      id,
      exactName: `${prefix} — ${name}`,
      category: `${prefix.toLowerCase()}-document`,
      auditSources: sourceByFamily[prefix],
      codeFiles: [],
      capturesNeeded: ["diagramme ou exemple vérifié selon sujet"],
      status: ["ROADMAP", "MONGO"].includes(prefix) ? "informations-manquantes" : "generable-immediatement",
      relatedDocuments: prefix === "WORKFLOW" ? ["DOC-018", "DOC-033"] : ["DOC-006"],
    });
  });
}

const counts = {};
for (const entry of entries) counts[entry.category] = (counts[entry.category] || 0) + 1;

const output = {
  metadata: {
    generatedAt: "2026-07-13",
    total: entries.length,
    statusCounts: {
      generableImmediatement: entries.filter((entry) => entry.status === "generable-immediatement").length,
      informationsManquantes: entries.filter((entry) => entry.status === "informations-manquantes").length,
      documentedCurrent: entries.filter((entry) => entry.status === "documented-current").length,
    },
    categoryCounts: counts,
  },
  entries,
};

fs.writeFileSync(path.join(registryDir, "documentation-map.json"), `${JSON.stringify(output, null, 2)}\n`);
