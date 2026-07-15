import fs from "node:fs";
import path from "node:path";

const registryDir = path.join(process.cwd(), "audit-documentation", "registries");
const read = (name) => JSON.parse(fs.readFileSync(path.join(registryDir, `${name}.json`), "utf8")).entries;

const pages = read("pages");
const components = read("components");
const hooks = read("hooks");
const contexts = read("contexts");
const services = read("services");
const apiRoutes = read("api-routes");
const collections = read("mongodb-collections");
const providers = read("providers");
const datasets = read("datasets");
const assets = read("assets");

function componentFile(component) {
  return /^(Dashboard Admin|Landing-Page-PogoApi|PokemonGo-API-)\//.test(component.path)
    ? component.path
    : `Dashboard Admin/${component.path}`;
}

function componentVisibility(component) {
  return component.path.startsWith("Landing-Page-PogoApi/") || component.path.startsWith("PokemonGo-API-/")
    ? "public-ui"
    : "private-ui";
}

const edges = [];
const unresolved = [];
const seen = new Set();

function add(source, target, type, file, criticality = "medium", visibility = "internal", evidence = "static-code") {
  if (!source || !target || source === target) return;
  const key = [source, target, type, file].join("|");
  if (seen.has(key)) return;
  seen.add(key);
  edges.push({
    id: `DEP-${String(edges.length + 1).padStart(4, "0")}`,
    source,
    target,
    type,
    file,
    criticality,
    visibility,
    evidence,
  });
}

const componentByName = new Map();
const componentByStem = new Map();
for (const component of components) {
  for (const name of component.names) componentByName.set(name, component);
  componentByStem.set(component.path.replace(/\.(tsx?|jsx?)$/, ""), component);
}
const hookByName = new Map(hooks.map((hook) => [hook.name, hook]));

function endpoint(value) {
  return String(value || "")
    .replace(/^(GET|POST|PUT|PATCH|DELETE|ANY)\s+/, "")
    .split("?")[0]
    .replace(/\/$/, "") || "/";
}

function matchApi(value, method) {
  return apiRoutes.find(
    (route) =>
      (!method || route.method === method || route.method === "ANY") &&
      endpoint(route.endpoint) === endpoint(value),
  );
}

function routeVisibility(route) {
  if (route.visibility.includes("private")) return "private";
  if (route.visibility.includes("public")) return "public";
  return "internal";
}

for (const page of pages) {
  const component = componentByName.get(page.component);
  add(
    page.id,
    component?.id || `INLINE-${page.id}`,
    component ? "renders" : "renders-inline",
    page.file,
    component ? "medium" : "low",
    page.visibility,
    page.component,
  );
  for (const name of page.components || []) {
    const nested = componentByName.get(name);
    if (nested) add(page.id, nested.id, "renders", page.file, "low", page.visibility, name);
  }
  for (const source of page.dataSources || []) {
    const parsed = String(source).match(/^(GET|POST|PUT|PATCH|DELETE)\s+(\/\S+)/);
    if (!parsed) continue;
    const route = matchApi(parsed[2], parsed[1]);
    if (route) {
      add(page.id, route.id, "calls-api", page.file, route.visibility.includes("private") ? "high" : "medium", routeVisibility(route), source);
    } else {
      unresolved.push({ source: page.id, relation: "calls-api", value: source, file: page.file });
    }
  }
}

for (const component of components) {
  for (const child of component.children || []) {
    const stem = String(child).replace(/^@\//, "src/").replace(/\.(tsx?|jsx?)$/, "");
    let target = componentByStem.get(stem);
    if (!target) {
      const basename = stem.split("/").pop();
      const candidates = components.filter(
        (entry) => entry.path.replace(/\.(tsx?|jsx?)$/, "").split("/").pop() === basename,
      );
      if (candidates.length === 1) target = candidates[0];
    }
    if (target) add(component.id, target.id, "imports-component", componentFile(component), "low", componentVisibility(component), child);
  }
  for (const name of component.hooks || []) {
    const hook = hookByName.get(name);
    if (hook) add(component.id, hook.id, "uses-hook", componentFile(component), "medium", componentVisibility(component), name);
  }
  for (const source of component.api || []) {
    const parsed = String(source).match(/^(GET|POST|PUT|PATCH|DELETE)\s+(\/\S+)/);
    const route = parsed ? matchApi(parsed[2], parsed[1]) : matchApi(source);
    if (route) add(component.id, route.id, "calls-api", componentFile(component), "high", routeVisibility(route), source);
  }
}

add("HOOK-001", "CTX-001", "consumes-context", hooks.find((hook) => hook.id === "HOOK-001")?.path, "medium", "private-ui", "next-themes");
add("HOOK-002", "SERVICE-003", "calls-service", hooks.find((hook) => hook.id === "HOOK-002")?.path, "high", "private", "learning-api");

for (const service of services) {
  for (const source of service.api || []) {
    const parsed = String(source).match(/^(GET|POST|PUT|PATCH|DELETE)\s+(\/\S+)/);
    const route = parsed ? matchApi(parsed[2], parsed[1]) : matchApi(source);
    if (route) add(service.id, route.id, "calls-api", service.path, "high", routeVisibility(route), source);
    else unresolved.push({ source: service.id, relation: "calls-api", value: source, file: service.path });
  }
  for (const consumer of service.consumers || []) {
    const basename = String(consumer).split("/").pop().replace(/\.(tsx?|jsx?)$/, "");
    for (const component of components.filter((entry) => entry.path.replace(/\.(tsx?|jsx?)$/, "").split("/").pop() === basename)) {
      add(component.id, service.id, "calls-service", componentFile(component), "high", componentVisibility(component), consumer);
    }
  }
}

const collectionByName = new Map();
for (const collection of collections) {
  collectionByName.set(collection.name.toLowerCase(), collection.id);
  collectionByName.set(String(collection.model || "").toLowerCase(), collection.id);
}

function layersForRoute(route) {
  const value = route.endpoint.toLowerCase();
  const collectionNames = [];
  const datasetIds = [];
  const push = (nextCollections, nextDatasets) => {
    collectionNames.push(...nextCollections);
    datasetIds.push(...nextDatasets);
  };

  if (route.project === "Dashboard Admin") {
    if (value.startsWith("/api/dashboard-store")) push(["dashboard_store"], []);
    if (value.startsWith("/api/dashboard-backlog")) push(["dashboard_backlog"], []);
    if (value.startsWith("/api/database-stats") || value.startsWith("/api/dashboard-redeploy")) push(["dashboard_store", "dashboard_api_metrics"], []);
    if (value.startsWith("/api/events") || value.startsWith("/api/admin/events")) push(["events"], []);
    if (value.startsWith("/api/learning/topics")) push(["learning_topics", "learning_curricula", "learning_progress", "learning_activity", "learning_topic_versions"], []);
    if (value.startsWith("/api/learning/progress")) push(["learning_progress", "learning_activity"], []);
    if (value.startsWith("/api/learning/activity")) push(["learning_activity"], []);
    if (value.startsWith("/api/learning/import")) push(["learning_imports", "learning_topics", "learning_curricula", "learning_topic_versions"], []);
    if (value.startsWith("/api/learning/export")) push(["learning_topics", "learning_curricula"], []);
    if (value.startsWith("/api/pokemon-admin")) push(["dashboard_store", "dashboard_api_metrics"], []);
    if (value.startsWith("/api/trainer-pokemon")) push(["trainer_pokemon_owners", "trainer_pokemon_snapshots", "trainer_pokemon_entries"], ["DATASET-020"]);
    if (value.startsWith("/api/pokemon-api-") || value.startsWith("/api/pokemon-stats")) push(["dashboard_api_metrics"], []);
  } else if (value.includes("/shiny")) push(["shiny_rankings", "shiny_snapshots"], ["DATASET-017"]);
  else if (value.includes("/pvp-rankings")) push(["pvp_rankings"], ["DATASET-018"]);
  else if (value.includes("/raids")) push(["raids"], ["DATASET-012"]);
  else if (value.includes("/eggs")) push(["eggs"], ["DATASET-013"]);
  else if (value.includes("/max-battles")) push(["maxbattles"], ["DATASET-014"]);
  else if (value.includes("/rocket-texts")) push(["rocket_texts"], ["DATASET-009"]);
  else if (value.includes("/rocket")) push(["rockets"], ["DATASET-015"]);
  else if (value.includes("/research")) push(["researches"], ["DATASET-016"]);
  else if (value.includes("/pvp/")) push(["pokemons"], ["DATASET-001"]);
  else if (/\/(backgrounds|assets|shuffle)/.test(value)) push(["pokemonAssets", "pokemons"], ["DATASET-003", "DATASET-001"]);
  else if (value.includes("/candy")) push(["pokemons"], ["DATASET-011"]);
  else if (value.includes("/moves")) push(["moves", "pokemons"], ["DATASET-004", "DATASET-001"]);
  else if (value.includes("/types")) push(["types", "pokemons"], ["DATASET-005", "DATASET-001"]);
  else if (value.includes("/weather")) push(["weathers", "types", "moves", "pokemons"], ["DATASET-006", "DATASET-005", "DATASET-004", "DATASET-001"]);
  else if (value.includes("/regions")) push(["regions", "pokemons"], ["DATASET-007", "DATASET-001"]);
  else if (value.includes("/generations")) push(["generations", "pokemons"], ["DATASET-007", "DATASET-001"]);
  else if (value.includes("/items")) push(["items"], ["DATASET-008"]);
  else if (value.includes("/stickers")) push([], ["DATASET-010"]);
  else if (/\/(pokemon|search|shadow|mega|dynamax|gigantamax|regional|evolutions|availability|collection|compare|raid\/counters)/.test(value)) push(["pokemons"], ["DATASET-001", "DATASET-002"]);
  else if (value.includes("/stats")) push(["globalstats", "pokemons"], ["DATASET-001"]);
  else if (value === "/api/checklist-v3") push([], Array.from({ length: 11 }, (_, index) => `DATASET-${String(index + 1).padStart(3, "0")}`));

  return { collectionNames: [...new Set(collectionNames)], datasetIds: [...new Set(datasetIds)] };
}

for (const route of apiRoutes) {
  const { collectionNames, datasetIds } = layersForRoute(route);
  for (const name of collectionNames) {
    const collectionId = collectionByName.get(name.toLowerCase());
    if (collectionId) add(route.id, collectionId, route.method === "GET" ? "reads-collection" : "writes-collection", route.file, route.method === "GET" ? "high" : "critical", routeVisibility(route), route.endpoint);
  }
  for (const datasetId of datasetIds) add(route.id, datasetId, route.method === "GET" ? "reads-dataset" : "mutates-dataset", route.file, route.method === "GET" ? "high" : "critical", routeVisibility(route), route.endpoint);
}

for (const dataset of datasets) {
  if (dataset.mongodb) {
    const declaredCollections = Array.isArray(dataset.mongodb)
      ? dataset.mongodb
      : dataset.id === "DATASET-019"
        ? ["dashboard_store"]
        : [dataset.mongodb];
    for (const declared of declaredCollections) {
      const wanted = String(declared).toLowerCase().replace(/[^a-z0-9]/g, "");
      const collection = collections.find(
        (entry) =>
          entry.name.toLowerCase().replace(/[^a-z0-9]/g, "") === wanted ||
          String(entry.model || "").toLowerCase().replace(/[^a-z0-9]/g, "") === wanted,
      );
      if (collection) add(dataset.id, collection.id, "materialized-in", String(dataset.sourceFiles), "critical", dataset.visibility, declared);
    }
  }
  for (const pageId of dataset.pages || []) {
    const page = pages.find((entry) => entry.id === pageId);
    if (page) add(pageId, dataset.id, "consumes-dataset", page.file, "high", dataset.visibility, dataset.name);
  }
}

const providerTargets = {
  "PROVIDER-001": "DATASET-012", "PROVIDER-002": "DATASET-013", "PROVIDER-003": "DATASET-014",
  "PROVIDER-004": "DATASET-015", "PROVIDER-005": "DATASET-016", "PROVIDER-006": "DATASET-017",
  "PROVIDER-007": "DATASET-017", "PROVIDER-008": "DATASET-018", "PROVIDER-009": "EVENTS-DATASET",
  "PROVIDER-010": "DATASET-019", "PROVIDER-011": "DATASET-004", "PROVIDER-012": "ASSET-CATALOG",
  "PROVIDER-013": "DATASET-001", "PROVIDER-014": "DATASET-008", "PROVIDER-015": "DATASET-001",
  "PROVIDER-016": "DATASET-001", "PROVIDER-017": "DATASET-003", "PROVIDER-018": "ASSET-CATALOG",
};
for (const provider of providers) add(provider.id, providerTargets[provider.id], "produces-or-enriches", provider.path, "critical", provider.visibility, (provider.datasets || []).join(", "));

const datasetAssets = {
  "DATASET-001": ["ASSET-002", "ASSET-003", "ASSET-004", "ASSET-005", "ASSET-006", "ASSET-007", "ASSET-008", "ASSET-009"],
  "DATASET-002": ["ASSET-002", "ASSET-003", "ASSET-004", "ASSET-005", "ASSET-006", "ASSET-007", "ASSET-008"],
  "DATASET-003": assets.map((asset) => asset.id), "DATASET-004": ["ASSET-010"],
  "DATASET-005": ["ASSET-010", "ASSET-011"], "DATASET-006": ["ASSET-012"],
  "DATASET-010": ["ASSET-014"], "DATASET-011": ["ASSET-013"],
  "DATASET-012": ["ASSET-002", "ASSET-011"], "DATASET-013": ["ASSET-002", "ASSET-011"],
  "DATASET-014": ["ASSET-007", "ASSET-008", "ASSET-011"], "DATASET-015": ["ASSET-002", "ASSET-004", "ASSET-011"],
  "DATASET-016": ["ASSET-002", "ASSET-013"], "DATASET-017": ["ASSET-003"],
  "DATASET-018": ["ASSET-002", "ASSET-011"],
};
for (const [datasetId, assetIds] of Object.entries(datasetAssets)) {
  const dataset = datasets.find((entry) => entry.id === datasetId);
  for (const assetId of assetIds) add(datasetId, assetId, "references-asset", String(dataset?.sourceFiles || ""), "high", dataset?.visibility, "asset reference");
}
for (const asset of assets) {
  add("PROVIDER-012", asset.id, "supplies-asset", "PokemonGo-Assets-API/PokeMiners-pogo_assets", "high", "public", "PokeMiners");
  add("PROVIDER-018", asset.id, "publishes-asset", asset.path, "high", "public", "GitHub raw");
}

const output = {
  metadata: {
    generatedAt: "2026-07-13",
    method: "static imports/calls plus audited cross-layer relations",
    counts: {
      pages: pages.length, components: components.length, hooks: hooks.length, contexts: contexts.length,
      services: services.length, apiRoutes: apiRoutes.length, collections: collections.length,
      providers: providers.length, datasets: datasets.length, assets: assets.length,
      edges: edges.length, unresolved: unresolved.length,
    },
  },
  layers: ["Page", "Component", "Hook", "Context", "Service", "API Route", "MongoDB Collection", "Provider", "Dataset", "Asset"],
  edges,
  unresolved,
};

fs.writeFileSync(path.join(registryDir, "dependencies.json"), `${JSON.stringify(output, null, 2)}\n`);
