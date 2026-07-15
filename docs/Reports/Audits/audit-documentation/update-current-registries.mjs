import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registryDirectory = path.join(import.meta.dirname, "registries");

function update(name, mutate) {
  const file = path.join(registryDirectory, `${name}.json`);
  const registry = JSON.parse(fs.readFileSync(file, "utf8"));
  mutate(registry);
  fs.writeFileSync(file, `${JSON.stringify(registry, null, 2)}\n`);
}

function upsert(entries, entry) {
  const index = entries.findIndex((item) => item.id === entry.id);
  if (index === -1) entries.push(entry);
  else entries[index] = entry;
}

update("pages", (registry) => {
  registry.generatedAt = "2026-07-13";
  registry.counts.pokemonAdminSections = 24;
  registry.counts.total = 49;
  upsert(registry.entries, {
    id: "PAGE-049",
    kind: "pokemon-admin-section",
    project: "Dashboard Admin",
    name: "Ma collection",
    route: "/pokemon-admin?section=my-collection",
    file: "Dashboard Admin/src/components/admin/pokemon/admin-app.jsx",
    component: "TrainerPokemonCollectionPanel",
    auth: "session-and-handler-admin",
    visibility: "private-dashboard",
    dataSources: [
      "GET /api/trainer-pokemon",
      "POST /api/trainer-pokemon/import",
      "GET /api/trainer-pokemon/imports",
      "POST /api/trainer-pokemon/imports/:id/rollback",
    ],
    status: "active",
    evidence: "admin-app.jsx:85-88,112-136,2071",
  });
});

update("components", (registry) => {
  registry.generatedAt = "2026-07-13";
  registry.count = 137;
  upsert(registry.entries, {
    id: "COMP-137",
    names: ["TrainerPokemonCollectionPanel"],
    path: "src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx",
    category: "Feature",
    status: "active",
    client: true,
    lines: 365,
    children: [
      "@/components/ui/badge",
      "@/components/ui/button",
      "@/components/ui/card",
      "@/components/ui/input",
      "@/components/ui/modal",
    ],
    parents: ["src/components/admin/pokemon/admin-app.jsx"],
    hooks: ["useCallback", "useEffect", "useMemo", "useRef", "useState"],
    api: [
      "/api/trainer-pokemon",
      "/api/trainer-pokemon/import",
      "/api/trainer-pokemon/imports",
      "/api/trainer-pokemon/imports/:id/rollback",
    ],
    responsive: ["sm", "lg", "xl"],
    a11y: { aria: 8, roles: ["alert"] },
    hardcodes: 0,
  });
});

update("services", (registry) => {
  registry.count = 5;
  upsert(registry.entries, {
    id: "SERVICE-005",
    name: "trainer Pokemon API",
    path: "Dashboard Admin/src/services/admin/trainer-pokemon-api.ts",
    responsibility: "Client typé de lecture, preview, import, historique et rollback de la collection privée du dresseur.",
    api: [
      "GET /api/trainer-pokemon",
      "POST /api/trainer-pokemon/import",
      "GET /api/trainer-pokemon/imports",
      "POST /api/trainer-pokemon/imports/:id/rollback",
    ],
    consumers: ["trainer-pokemon-collection-panel.tsx"],
    errors: "readPayload transforme la réponse structurée en Error et conserve les issues de validation.",
    retries: "Aucun",
    cache: "cache:no-store sur les lectures",
    tests: ["scripts/test-trainer-pokemon.mjs"],
  });
});

update("datasets", (registry) => {
  registry.count = 20;
  upsert(registry.entries, {
    id: "DATASET-020",
    name: "Collection personnelle Pokémon GO",
    visibility: "private-dashboard",
    sourceProject: "Dashboard Admin",
    sourceFiles: "JSON importé par l’administrateur; aucun fichier métier conservé dans le dépôt",
    schema: "Dashboard Admin/src/lib/trainer-pokemon/schema.ts",
    schemaVersion: "champ source facultatif; aucun numéro imposé par le validateur",
    generatedAt: null,
    pipeline: "validation -> normalisation avec référentiels API -> snapshot MongoDB -> read-back -> activation du pointeur owner",
    mongodb: ["trainer_pokemon_owners", "trainer_pokemon_snapshots", "trainer_pokemon_entries"],
    routes: [
      "/api/trainer-pokemon",
      "/api/trainer-pokemon/import",
      "/api/trainer-pokemon/imports",
      "/api/trainer-pokemon/imports/:id/rollback",
    ],
    pages: ["PAGE-049"],
    sourceOfTruth: "snapshot actif dans MongoDB Dashboard, isolé par owner",
  });
});

update("api-routes", (registry) => {
  registry.count = 160;
  const routes = [
    ["API-157", "GET", "/api/trainer-pokemon", "Dashboard Admin/src/app/api/trainer-pokemon/route.ts", 16, "session/handler-admin"],
    ["API-158", "POST", "/api/trainer-pokemon/import", "Dashboard Admin/src/app/api/trainer-pokemon/import/route.ts", 10, "session/handler-admin-and-same-origin"],
    ["API-159", "GET", "/api/trainer-pokemon/imports", "Dashboard Admin/src/app/api/trainer-pokemon/imports/route.ts", 9, "session/handler-admin"],
    ["API-160", "POST", "/api/trainer-pokemon/imports/:id/rollback", "Dashboard Admin/src/app/api/trainer-pokemon/imports/[id]/rollback/route.ts", 7, "session/handler-admin-and-same-origin"],
  ];
  for (const [id, method, endpoint, file, line, auth] of routes) {
    upsert(registry.entries, { id, project: "Dashboard Admin", method, endpoint, file, line, auth, visibility: "private-dashboard" });
  }
});

update("mongodb-collections", (registry) => {
  registry.count = 32;
  const common = {
    project: "Dashboard Admin",
    database: "DASHBOARD_MONGODB_DB or matweb-dashboard-admin",
    schemaPath: "Dashboard Admin/src/lib/trainer-pokemon/repository.ts",
    ttl: null,
    visibility: "private-dashboard",
    sourceOfTruth: "MongoDB Dashboard",
  };
  upsert(registry.entries, {
    ...common,
    id: "COL-030",
    name: "trainer_pokemon_owners",
    role: "pointeur du snapshot actif et précédent par owner",
    required: ["owner", "activeSnapshotId", "updatedAt", "updatedBy"],
    unique: ["owner"],
    indexes: [{ keys: { owner: 1 }, unique: true }],
    versioning: "activeSnapshotId et previousSnapshotId gérés par l’application",
  });
  upsert(registry.entries, {
    ...common,
    id: "COL-031",
    name: "trainer_pokemon_snapshots",
    role: "métadonnées, diagnostics, checksum et état des imports",
    required: ["owner", "sourceFileName", "actualPokemonCount", "importedAt", "checksum", "entryChecksum", "status", "stats"],
    unique: [],
    indexes: [
      { keys: { owner: 1, importedAt: -1 } },
      { keys: { owner: 1, status: 1, importedAt: -1 } },
    ],
    versioning: "statuts staging, active, archived et failed",
  });
  upsert(registry.entries, {
    ...common,
    id: "COL-032",
    name: "trainer_pokemon_entries",
    role: "entrées normalisées de chaque snapshot de collection",
    required: ["owner", "snapshotId", "sourceId", "dexNumber", "frenchName", "cp", "ivPercent"],
    unique: ["owner+snapshotId+sourceId"],
    indexes: [
      { keys: { owner: 1, snapshotId: 1, sourceId: 1 }, unique: true },
      { keys: { owner: 1, snapshotId: 1, dexNumber: 1 } },
      { keys: { owner: 1, snapshotId: 1, frenchName: 1 } },
      { keys: { owner: 1, snapshotId: 1, cp: -1 } },
      { keys: { owner: 1, snapshotId: 1, ivPercent: -1 } },
      { keys: { owner: 1, snapshotId: 1, shiny: 1, lucky: 1 } },
      { keys: { owner: 1, snapshotId: 1, gender: 1, alignment: 1 } },
      { keys: { owner: 1, snapshotId: 1, form: 1, costume: 1 } },
      { keys: { owner: 1, snapshotId: 1, specialForm: 1 } },
    ],
    versioning: "snapshotId immuable; activation via trainer_pokemon_owners",
  });
});

update("dependencies", (registry) => {
  const nextId = () => `DEP-${String(registry.edges.length + 1).padStart(4, "0")}`;
  const additions = [
    ["PAGE-049", "COMP-137", "renders", "Dashboard Admin/src/components/admin/pokemon/admin-app.jsx"],
    ["COMP-137", "SERVICE-005", "calls-service", "Dashboard Admin/src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx"],
    ["SERVICE-005", "API-157", "calls-api", "Dashboard Admin/src/services/admin/trainer-pokemon-api.ts"],
    ["SERVICE-005", "API-158", "calls-api", "Dashboard Admin/src/services/admin/trainer-pokemon-api.ts"],
    ["SERVICE-005", "API-159", "calls-api", "Dashboard Admin/src/services/admin/trainer-pokemon-api.ts"],
    ["SERVICE-005", "API-160", "calls-api", "Dashboard Admin/src/services/admin/trainer-pokemon-api.ts"],
    ["DATASET-020", "COL-030", "stored-in", "Dashboard Admin/src/lib/trainer-pokemon/repository.ts"],
    ["DATASET-020", "COL-031", "stored-in", "Dashboard Admin/src/lib/trainer-pokemon/repository.ts"],
    ["DATASET-020", "COL-032", "stored-in", "Dashboard Admin/src/lib/trainer-pokemon/repository.ts"],
    ["API-157", "DATASET-020", "reads", "Dashboard Admin/src/app/api/trainer-pokemon/route.ts"],
    ["API-158", "DATASET-020", "writes", "Dashboard Admin/src/app/api/trainer-pokemon/import/route.ts"],
    ["API-159", "DATASET-020", "reads", "Dashboard Admin/src/app/api/trainer-pokemon/imports/route.ts"],
    ["API-160", "DATASET-020", "writes", "Dashboard Admin/src/app/api/trainer-pokemon/imports/[id]/rollback/route.ts"],
  ];
  for (const [source, target, type, file] of additions) {
    if (registry.edges.some((edge) => edge.source === source && edge.target === target && edge.type === type)) continue;
    registry.edges.push({ id: nextId(), source, target, type, file, criticality: "high", visibility: "private-dashboard", evidence: file });
  }
  registry.metadata.generatedAt = "2026-07-13";
  registry.metadata.edgeCount = registry.edges.length;
});

console.log("Current registries updated from source code.");
