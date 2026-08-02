export type PokemonApiMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type PokemonApiPrivateEndpoint = {
  id: string;
  method: PokemonApiMethod;
  path: string;
  testPath: string;
  label: string;
  group: string;
  description: string;
  bodyExample?: unknown;
  dangerous?: boolean;
};

const datasetDomains = [
  "raids", "eggs", "max-battles", "rocket", "research", "shiny", "pvp-rankings",
  "gbl-calendar", "best-attackers", "best-defenders", "costume-audit", "pokemon-identity-mappings",
] as const;

const datasetEndpoints: PokemonApiPrivateEndpoint[] = datasetDomains.flatMap((domain) => {
  const base = `/api/v1/admin/${domain}`;
  return [
    { id: `GET-${base}`, method: "GET", path: base, testPath: base, label: `${domain} · snapshot courant`, group: "Datasets privés", description: "Lit le document MongoDB courant et ses métadonnées." },
    { id: `GET-${base}/history`, method: "GET", path: `${base}/history`, testPath: `${base}/history?page=1&limit=20`, label: `${domain} · historique`, group: "Datasets privés", description: "Liste les exécutions persistées." },
    { id: `GET-${base}/regenerate/{runId}`, method: "GET", path: `${base}/regenerate/{runId}`, testPath: `${base}/regenerate/RUN_ID`, label: `${domain} · état régénération`, group: "Datasets privés", description: "Suit une régénération asynchrone par son identifiant." },
    { id: `POST-${base}/regenerate`, method: "POST", path: `${base}/regenerate`, testPath: `${base}/regenerate`, label: `${domain} · régénérer`, group: "Mutations datasets", description: "Démarre une régénération contrôlée. Le dernier snapshot valide est conservé en cas d’échec.", bodyExample: {}, dangerous: true },
    { id: `POST-${base}/import`, method: "POST", path: `${base}/import`, testPath: `${base}/import`, label: `${domain} · importer`, group: "Mutations datasets", description: "Importe un payload explicite après validation.", bodyExample: { data: {} }, dangerous: true },
  ];
});

const identityBase = "/api/v1/admin/pokemon-identities";
const identityEndpoints: PokemonApiPrivateEndpoint[] = [
  ["GET", "", "?page=1&limit=20", "Identités", "Liste paginée du catalogue canonique."],
  ["GET", "/providers", "", "Sources enregistrées", "Registre des providers Identity Manager."],
  ["GET", "/conflicts", "", "Conflits", "Conflits d’alias et de canonicalId."],
  ["GET", "/history", "?page=1&limit=20", "Historique", "Historique des décisions."],
  ["GET", "/diagnostics", "?status=open&page=1&limit=20", "Diagnostics", "Diagnostics actifs ou historiques."],
  ["GET", "/inventory", "?page=1&limit=20", "Inventaire local", "Fiches JSON canoniques disponibles à l’association."],
  ["GET", "/sync/preview", "", "Prévisualiser la synchronisation", "Plan en lecture seule."],
  ["GET", "/export", "", "Exporter", "Export JSON privé du catalogue."],
].map(([method, suffix, query, label, description]) => ({ id: `${method}-${identityBase}${suffix}`, method: method as PokemonApiMethod, path: `${identityBase}${suffix}`, testPath: `${identityBase}${suffix}${query}`, label, group: "Identity Manager", description }));

identityEndpoints.push(
  { id: `GET-${identityBase}/{identityId}`, method: "GET", path: `${identityBase}/{identityId}`, testPath: `${identityBase}/CANONICAL_ID`, label: "Détail identité", group: "Identity Manager", description: "Lit une identité par ObjectId ou canonicalId." },
  { id: `POST-${identityBase}/resolve`, method: "POST", path: `${identityBase}/resolve`, testPath: `${identityBase}/resolve`, label: "Résoudre un alias", group: "Identity Manager", description: "Résolution déterministe d’un alias enregistré.", bodyExample: { provider: "margxt", alias: "Pikachu Chapeau Valor" } },
  { id: `POST-${identityBase}/resolve-assets`, method: "POST", path: `${identityBase}/resolve-assets`, testPath: `${identityBase}/resolve-assets`, label: "Résoudre des assets", group: "Identity Manager", description: "Résout un lot de références d’assets.", bodyExample: { requests: [] } },
  { id: `POST-${identityBase}/diagnostics`, method: "POST", path: `${identityBase}/diagnostics`, testPath: `${identityBase}/diagnostics`, label: "Créer un diagnostic", group: "Mutations Identity Manager", description: "Enregistre un diagnostic de résolution idempotent.", bodyExample: { provider: "margxt", sourceId: "", rawAlias: "", reason: "ALIAS_UNKNOWN" }, dangerous: true },
  { id: `POST-${identityBase}/diagnostics/batch`, method: "POST", path: `${identityBase}/diagnostics/batch`, testPath: `${identityBase}/diagnostics/batch`, label: "Créer des diagnostics en lot", group: "Mutations Identity Manager", description: "Synchronise un lot borné de diagnostics.", bodyExample: { diagnostics: [] }, dangerous: true },
  { id: `POST-${identityBase}/sync/apply`, method: "POST", path: `${identityBase}/sync/apply`, testPath: `${identityBase}/sync/apply`, label: "Appliquer la synchronisation", group: "Mutations Identity Manager", description: "Applique le plan de synchronisation après contrôle.", bodyExample: {}, dangerous: true },
  { id: `POST-${identityBase}`, method: "POST", path: identityBase, testPath: identityBase, label: "Créer une identité", group: "Mutations Identity Manager", description: "Crée une identité canonique validée.", bodyExample: { canonicalId: "", pokemonId: 1, status: "draft", aliases: [] }, dangerous: true },
  { id: `PATCH-${identityBase}/{identityId}`, method: "PATCH", path: `${identityBase}/{identityId}`, testPath: `${identityBase}/IDENTITY_ID`, label: "Modifier une identité", group: "Mutations Identity Manager", description: "Met à jour une identité existante.", bodyExample: { reason: "Correction depuis API Explorer" }, dangerous: true },
  { id: `DELETE-${identityBase}/{identityId}`, method: "DELETE", path: `${identityBase}/{identityId}`, testPath: `${identityBase}/IDENTITY_ID`, label: "Déprécier une identité", group: "Mutations Identity Manager", description: "Déprécie une identité avec motif ; ne supprime pas silencieusement l’historique.", bodyExample: { reason: "Motif requis" }, dangerous: true },
  { id: `PATCH-${identityBase}/diagnostics/{diagnosticId}`, method: "PATCH", path: `${identityBase}/diagnostics/{diagnosticId}`, testPath: `${identityBase}/diagnostics/DIAGNOSTIC_ID`, label: "Clore un diagnostic", group: "Mutations Identity Manager", description: "Change explicitement le statut d’un diagnostic.", bodyExample: { status: "resolved", identityId: "IDENTITY_ID" }, dangerous: true },
  { id: `POST-${identityBase}/{identityId}/aliases`, method: "POST", path: `${identityBase}/{identityId}/aliases`, testPath: `${identityBase}/IDENTITY_ID/aliases`, label: "Ajouter un alias", group: "Mutations Identity Manager", description: "Ajoute un alias et clôt les diagnostics ouverts correspondants.", bodyExample: { provider: "margxt", value: "", status: "active", source: "manual" }, dangerous: true },
  { id: `PATCH-${identityBase}/{identityId}/aliases/{aliasId}`, method: "PATCH", path: `${identityBase}/{identityId}/aliases/{aliasId}`, testPath: `${identityBase}/IDENTITY_ID/aliases/ALIAS_ID`, label: "Modifier un alias", group: "Mutations Identity Manager", description: "Met à jour le statut ou la valeur d’un alias.", bodyExample: { status: "deprecated", reason: "Motif requis" }, dangerous: true },
  { id: `POST-${identityBase}/{identityId}/restore`, method: "POST", path: `${identityBase}/{identityId}/restore`, testPath: `${identityBase}/IDENTITY_ID/restore`, label: "Restaurer une identité", group: "Mutations Identity Manager", description: "Restaure une identité dépréciée.", bodyExample: {}, dangerous: true },
  { id: `POST-${identityBase}/{identityId}/merge`, method: "POST", path: `${identityBase}/{identityId}/merge`, testPath: `${identityBase}/IDENTITY_ID/merge`, label: "Fusionner des identités", group: "Mutations Identity Manager", description: "Fusion traçable de deux identités.", bodyExample: { targetId: "TARGET_ID", reason: "Motif requis" }, dangerous: true },
  { id: `POST-${identityBase}/import`, method: "POST", path: `${identityBase}/import`, testPath: `${identityBase}/import`, label: "Importer des identités", group: "Mutations Identity Manager", description: "Import validé du catalogue canonique.", bodyExample: { mode: "preview", identities: [] }, dangerous: true },
);

datasetEndpoints.push({ id: "GET-/api/v1/admin/shiny/{identity}/history", method: "GET", path: "/api/v1/admin/shiny/{identity}/history", testPath: "/api/v1/admin/shiny/0001/history?days=30", label: "shiny · historique d’une identité", group: "Datasets privés", description: "Lit les points d’historique Shiny persistés pour une identité." });

const gameMasterBase = "/api/v1/admin/game-master";
const gameMasterEndpoints: PokemonApiPrivateEndpoint[] = [
  ["summary", "Résumé"], ["categories", "Catégories"], ["templates", "Templates"], ["search", "Recherche"],
  ["local-comparison", "Comparaison locale"], ["snapshots", "Snapshots"], ["runs", "Exécutions"], ["diff", "Diff"], ["export", "Export"],
].map(([suffix, label]) => ({ id: `GET-${gameMasterBase}/${suffix}`, method: "GET", path: `${gameMasterBase}/${suffix}`, testPath: `${gameMasterBase}/${suffix}${["templates", "snapshots", "runs"].includes(suffix) ? "?page=1&limit=20" : suffix === "search" ? "?q=PIKACHU" : ""}`, label: `Game Master · ${label}`, group: "Game Master", description: `Lecture privée : ${label}.` }));
gameMasterEndpoints.push(
  { id: `GET-${gameMasterBase}/templates/{templateId}`, method: "GET", path: `${gameMasterBase}/templates/{templateId}`, testPath: `${gameMasterBase}/templates/V0001_POKEMON_BULBASAUR`, label: "Game Master · détail template", group: "Game Master", description: "Détail d’un template indexé." },
  { id: `GET-${gameMasterBase}/snapshots/{snapshotId}`, method: "GET", path: `${gameMasterBase}/snapshots/{snapshotId}`, testPath: `${gameMasterBase}/snapshots/SNAPSHOT_ID`, label: "Game Master · détail snapshot", group: "Game Master", description: "Détail d’un snapshot." },
  { id: `POST-${gameMasterBase}/regenerate`, method: "POST", path: `${gameMasterBase}/regenerate`, testPath: `${gameMasterBase}/regenerate`, label: "Game Master · régénérer", group: "Mutations Game Master", description: "Récupère et indexe une nouvelle source.", bodyExample: {}, dangerous: true },
  { id: `POST-${gameMasterBase}/reindex`, method: "POST", path: `${gameMasterBase}/reindex`, testPath: `${gameMasterBase}/reindex`, label: "Game Master · réindexer", group: "Mutations Game Master", description: "Reconstruit l’index depuis le snapshot courant.", bodyExample: {}, dangerous: true },
);

const dynamaxBase = "/api/v1/admin/dynamax-images";
const dynamaxEndpoints: PokemonApiPrivateEndpoint[] = [
  { id: `GET-${dynamaxBase}`, method: "GET", path: dynamaxBase, testPath: dynamaxBase, label: "Images Dynamax · état", group: "Assets privés", description: "Lit le dernier scan." },
  { id: `GET-${dynamaxBase}/export.zip`, method: "GET", path: `${dynamaxBase}/export.zip`, testPath: `${dynamaxBase}/export.zip`, label: "Images Dynamax · export ZIP", group: "Assets privés", description: "Télécharge l’export du scan." },
  { id: `POST-${dynamaxBase}/scan`, method: "POST", path: `${dynamaxBase}/scan`, testPath: `${dynamaxBase}/scan`, label: "Images Dynamax · scanner", group: "Mutations assets", description: "Lance un scan externe contrôlé.", bodyExample: {}, dangerous: true },
  { id: `DELETE-${dynamaxBase}/cache`, method: "DELETE", path: `${dynamaxBase}/cache`, testPath: `${dynamaxBase}/cache`, label: "Images Dynamax · vider le cache", group: "Mutations assets", description: "Invalide le cache temporaire.", bodyExample: {}, dangerous: true },
];

export const pokemonApiPrivateRegistry: PokemonApiPrivateEndpoint[] = [
  ...datasetEndpoints,
  ...identityEndpoints,
  ...gameMasterEndpoints,
  ...dynamaxEndpoints,
];

export function pokemonApiPathPattern(path: string) {
  return new RegExp(`^${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\{[^}]+\\\}/g, "[^/]+")}$`);
}

export function privateEndpointFor(method: PokemonApiMethod, pathname: string) {
  return pokemonApiPrivateRegistry.find((endpoint) => endpoint.method === method && pokemonApiPathPattern(endpoint.path).test(pathname));
}
