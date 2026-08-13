export type AdminRegenerationRegistration = {
  id: string;
  label: string;
  dashboardAction?: string;
  dashboardEndpoint?: string;
  apiPath?: string;
  generatorKey?: string;
  owner: "pokemon-api" | "dashboard" | "assets-api";
  kind: "generator" | "sync" | "index" | "scan";
  provider: string;
  output: string;
  permission: string;
  timeoutSeconds: number;
  status: "active";
  global: boolean;
};

export const adminRegenerationRegistry: readonly AdminRegenerationRegistration[] = Object.freeze([
  { id: "game-master", label: "Game Master", dashboardAction: "regenerate-game-master", apiPath: "/api/v1/admin/game-master/regenerate", generatorKey: "game-master", owner: "pokemon-api", kind: "generator", provider: "PokeMiners", output: "MongoDB game-master index", permission: "dashboard-admin", timeoutSeconds: 300, status: "active", global: true },
  { id: "identity-manager", label: "Identity Manager", dashboardAction: "identity-manager-sync-apply", apiPath: "/api/v1/admin/pokemon-identities/sync/apply", owner: "pokemon-api", kind: "sync", provider: "PokemonGo-Data", output: "MongoDB pokemon identities", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "variant-resolution", label: "Résolution des variantes", dashboardAction: "regenerate-pokemon-identity-mappings", apiPath: "/api/v1/admin/pokemon-identity-mappings/regenerate", generatorKey: "pokemon-identity-mappings", owner: "pokemon-api", kind: "generator", provider: "PokeMiners-game_masters", output: "data/reference/game-master/gameMasterPokemonMappings.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "raids", label: "Raids", dashboardAction: "regenerate-raids", apiPath: "/api/v1/admin/raids/regenerate", generatorKey: "raids", owner: "pokemon-api", kind: "generator", provider: "leekduck", output: "data/battles/raids/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "max-battles", label: "Max Battles", dashboardAction: "regenerate-max-battles", apiPath: "/api/v1/admin/max-battles/regenerate", generatorKey: "max-battles", owner: "pokemon-api", kind: "generator", provider: "snacknap", output: "data/battles/max-battles/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "rocket", label: "Team GO Rocket", dashboardAction: "regenerate-rocket", apiPath: "/api/v1/admin/rocket/regenerate", generatorKey: "rocket", owner: "pokemon-api", kind: "generator", provider: "leekduck", output: "data/battles/rocket/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "pvp", label: "Classements PvP", dashboardAction: "regenerate-pvp-rankings", apiPath: "/api/v1/admin/pvp-rankings/regenerate", generatorKey: "pvp-rankings", owner: "pokemon-api", kind: "generator", provider: "pvpoke-official-repository", output: "data/pvp/rankings/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 600, status: "active", global: true },
  { id: "gbl-calendar", label: "Calendrier GBL", dashboardAction: "regenerate-gbl-calendar", apiPath: "/api/v1/admin/gbl-calendar/regenerate", generatorKey: "gbl-calendar", owner: "pokemon-api", kind: "generator", provider: "battleflow", output: "data/battles/gbl/calendar.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "best-attackers", label: "Best Attackers", dashboardAction: "regenerate-best-attackers", apiPath: "/api/v1/admin/best-attackers/regenerate", generatorKey: "best-attackers", owner: "pokemon-api", kind: "generator", provider: "dialgadex-official-repository", output: "data/rankings/pve/attackers.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 300, status: "active", global: true },
  { id: "best-defenders", label: "Best Defenders", dashboardAction: "regenerate-best-defenders", apiPath: "/api/v1/admin/best-defenders/regenerate", generatorKey: "best-defenders", owner: "pokemon-api", kind: "generator", provider: "pokemon-go-hub", output: "data/rankings/pve/defenders.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "eggs", label: "Œufs", dashboardAction: "regenerate-eggs", apiPath: "/api/v1/admin/eggs/regenerate", generatorKey: "eggs", owner: "pokemon-api", kind: "generator", provider: "leekduck", output: "data/activities/eggs/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "research", label: "Research", dashboardAction: "regenerate-research", apiPath: "/api/v1/admin/research/regenerate", generatorKey: "research", owner: "pokemon-api", kind: "generator", provider: "leekduck", output: "data/activities/research/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "events", label: "Calendrier Events", dashboardEndpoint: "/api/admin/events/scrape", owner: "dashboard", kind: "generator", provider: "leekduck-events", output: "MongoDB events + archive", permission: "dashboard-admin", timeoutSeconds: 60, status: "active", global: true },
  { id: "community-days", label: "Community Days", dashboardEndpoint: "/api/admin/community-days/sync", owner: "dashboard", kind: "sync", provider: "leekduck", output: "MongoDB community days", permission: "dashboard-admin", timeoutSeconds: 60, status: "active", global: true },
  { id: "shiny", label: "Shiny Tracker", dashboardAction: "regenerate-shiny", apiPath: "/api/v1/admin/shiny/regenerate", generatorKey: "shiny", owner: "pokemon-api", kind: "generator", provider: "snacknap", output: "operations/audits/shiny/current.json + MongoDB", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: true },
  { id: "game-master-reindex", label: "Réindexation Game Master", dashboardAction: "reindex-game-master", apiPath: "/api/v1/admin/game-master/reindex", owner: "pokemon-api", kind: "index", provider: "PokemonGo-Data", output: "MongoDB game-master index", permission: "dashboard-admin", timeoutSeconds: 300, status: "active", global: false },
  { id: "github-data-sync", label: "Actualisation snapshot GitHub Data", dashboardAction: "sync-github-data", owner: "dashboard", kind: "sync", provider: "GitHub", output: "runtime Data snapshot", permission: "dashboard-admin", timeoutSeconds: 60, status: "active", global: false },
  { id: "dynamax-image-scan", label: "Scan images Dynamax", dashboardEndpoint: "/api/admin/dynamax-images/scan", owner: "pokemon-api", kind: "scan", provider: "Pokémon GO Hub via PokemonGo-API", output: "MongoDB dynamax image inventory/cache", permission: "dashboard-admin", timeoutSeconds: 180, status: "active", global: false },
]);

export function globalAdminRegenerations() {
  return adminRegenerationRegistry.filter((registration) => registration.global);
}

export function pokemonAdminProxyRegeneration(action: string) {
  return adminRegenerationRegistry.find((registration) => registration.dashboardAction === action && registration.apiPath);
}
