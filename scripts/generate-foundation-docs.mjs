import fs from "node:fs";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const targetDirectory = path.join(repositoryRoot, "docs", "codex", "Tome 1 — Foundation (Fondations)");

const registryLinks = {
  pages: "../../../../audit-documentation/registries/pages.json",
  components: "../../../../audit-documentation/registries/components.json",
  contexts: "../../../../audit-documentation/registries/contexts.json",
  services: "../../../../audit-documentation/registries/services.json",
  providers: "../../../../audit-documentation/registries/providers.json",
  datasets: "../../../../audit-documentation/registries/datasets.json",
  api: "../../../../audit-documentation/registries/api-routes.json",
  mongo: "../../../../audit-documentation/registries/mongodb-collections.json",
  assets: "../../../../audit-documentation/registries/assets.json",
  dependencies: "../../../../audit-documentation/registries/dependencies.json",
  map: "../../../../audit-documentation/registries/documentation-map.json",
};

const docFiles = {
  "DOC-005": "DOC-005-repositories.md",
  "DOC-006": "DOC-006-architecture-overview.md",
  "DOC-007": "DOC-007-versioning.md",
  "DOC-010": "DOC-010-design-system-overview.md",
  "DOC-011": "DOC-011-dashboard-overview.md",
  "DOC-012": "DOC-012-api-overview.md",
  "DOC-013": "DOC-013-data-overview.md",
  "DOC-014": "DOC-014-assets-overview.md",
  "DOC-015": "DOC-015-provider-overview.md",
  "DOC-016": "DOC-016-dataset-overview.md",
  "DOC-017": "DOC-017-mongodb-overview.md",
  "DOC-018": "DOC-018-cache-overview.md",
  "DOC-019": "DOC-019-authentication.md",
  "DOC-020": "DOC-020-security.md",
  "DOC-021": "DOC-021-testing.md",
  "DOC-022": "DOC-022-performance.md",
  "DOC-023": "DOC-023-responsive.md",
  "DOC-024": "DOC-024-folder-structure.md",
  "DOC-025": "DOC-025-coding-guidelines.md",
  "DOC-026": "DOC-026-naming-conventions.md",
  "DOC-027": "DOC-027-error-handling.md",
  "DOC-028": "DOC-028-logging.md",
  "DOC-029": "DOC-029-monitoring.md",
  "DOC-030": "DOC-030-quality-checklist.md",
  "DOC-031": "DOC-031-release-process.md",
  "DOC-032": "DOC-032-local-cache.md",
  "DOC-033": "DOC-033-public-private-datasets.md",
  "DOC-034": "DOC-034-glossary.md",
  "DOC-035": "DOC-035-adr-index.md",
};

const specializedFiles = {
  "PAGE-049": "PAGE-049-ma-collection-pokemon-go.md",
  "COMP-137": "COMP-137-trainer-pokemon-collection-panel.md",
  "API-157": "API-157-get-trainer-pokemon.md",
  "API-158": "API-158-post-trainer-pokemon-import.md",
  "API-159": "API-159-get-trainer-pokemon-imports.md",
  "API-160": "API-160-post-trainer-pokemon-rollback.md",
  "COL-030": "COL-030-trainer-pokemon-owners.md",
  "COL-031": "COL-031-trainer-pokemon-snapshots.md",
  "COL-032": "COL-032-trainer-pokemon-entries.md",
  "DATASET-020": "DATASET-020-collection-personnelle-pokemon-go.md",
  "WORKFLOW-016": "WORKFLOW-016-import-collection-pokemon-go.md",
};

const specializedByDocument = {
  "DOC-011": Object.keys(specializedFiles),
  "DOC-012": ["API-157", "API-158", "API-159", "API-160"],
  "DOC-013": ["DATASET-020", "COL-030", "COL-031", "COL-032", "WORKFLOW-016"],
  "DOC-014": ["COMP-137", "DATASET-020"],
  "DOC-016": ["DATASET-020", "WORKFLOW-016"],
  "DOC-017": ["COL-030", "COL-031", "COL-032"],
  "DOC-019": ["PAGE-049", "API-157", "API-158", "API-159", "API-160"],
  "DOC-020": ["API-157", "API-158", "API-159", "API-160", "WORKFLOW-016"],
  "DOC-021": ["PAGE-049", "COMP-137", "WORKFLOW-016"],
  "DOC-022": ["PAGE-049", "COMP-137"],
  "DOC-023": ["PAGE-049", "COMP-137"],
  "DOC-024": ["PAGE-049", "COMP-137"],
  "DOC-027": ["API-157", "API-158", "API-159", "API-160", "WORKFLOW-016"],
  "DOC-028": ["WORKFLOW-016", "COL-031"],
  "DOC-029": ["PAGE-049", "WORKFLOW-016"],
  "DOC-030": ["PAGE-049", "COMP-137", "WORKFLOW-016"],
  "DOC-033": Object.keys(specializedFiles),
  "DOC-035": ["WORKFLOW-016", "DATASET-020", "COL-030", "COL-031", "COL-032"],
};

function D(id, title, description, scope, sources, registries, related, inventory, facts, relations, diagram, missing) {
  return { id, title, description, scope, sources, registries, related, inventory, facts, relations, diagram, missing };
}

const documents = [
  D("DOC-011", "Vue d’ensemble du Dashboard", "Référence du Dashboard Admin, de ses pages, sections, composants, services et dépendances réellement présents.",
    ["Dashboard Admin"],
    ["Dashboard Admin/src/app", "Dashboard Admin/src/components/admin", "Dashboard Admin/src/data/dashboard.ts", "Dashboard Admin/src/proxy.ts"],
    ["pages", "components", "contexts", "services", "dependencies"], ["DOC-006", "DOC-010", "DOC-012", "DOC-013"],
    [["Pages routées Dashboard", "20 fichiers page.tsx"], ["Sections Admin Pokémon", "24 identifiants dans admin-app.jsx"], ["Méthodes API Dashboard", "38 exports GET/POST/PUT/PATCH/DELETE"], ["Composants React enregistrés", "COMP-001 à COMP-137 sur les trois interfaces"], ["Contexte racine", "CTX-001, ThemeProvider de next-themes"], ["Services Dashboard", "SERVICE-001 à SERVICE-005"]],
    ["Le RootLayout monte Providers, puis le layout du groupe dashboard vérifie la session et rend AdminAppFrame.", "La navigation principale contient 18 destinations visibles réparties en cinq groupes; la page Account existe hors navGroups.", "PokemonAdminStudio rend AdminApp. AdminApp contient les 24 sections overview, pokedex, candies, backgrounds, collections, my-collection, assets, catalogs, raids, max-battles, rocket, pvp-rankings, eggs, research, events, shiny, checks, sources, compare, todo, logs, rules, bulk et export.", "La section PAGE-049 charge COMP-137 avec next/dynamic. Elle appelle SERVICE-005 et les routes API-157 à API-160.", "Le design exécuté utilise les thèmes dark et light, huit palettes et les primitives Badge, Button, Card, Input, Textarea et Modal.", "Le Dashboard lit PokemonGo-Data via un voisin ou .data, PokemonGo-API via ses handlers serveur, les assets via GitHub raw et ses données privées via MongoDB Dashboard."],
    [["PAGE-006", "rend", "COMP-049 puis COMP-031"], ["PAGE-049", "rend", "COMP-137"], ["COMP-137", "appelle", "SERVICE-005"], ["Dashboard", "consomme", "PokemonGo-API-, PokemonGo-Data, PokemonGo-Assets-API et MongoDB"]],
    ["flowchart LR", "  PAGE[\"/pokemon-admin\"] --> APP[\"COMP-031 AdminApp\"]", "  APP --> SECTIONS[\"24 sections\"]", "  SECTIONS --> PERSONAL[\"PAGE-049 / COMP-137\"]", "  PERSONAL --> ROUTES[\"API-157 à API-160\"]", "  ROUTES --> MONGO[(\"COL-030 à COL-032\")]"],
    ["Aucune page Settings autonome n’est présente.", "Aucune section Éditeur autonome n’est présente.", "Aucune fiche Markdown unitaire n’est présente pour PAGE-001 à PAGE-048 ni COMP-001 à COMP-136."]
  ),
  D("DOC-012", "Architecture de l’API", "Référence des surfaces Next.js, Express et Dashboard BFF, des 160 routes enregistrées et de leurs protections.",
    ["PokemonGo-API-", "Dashboard Admin/src/app/api"],
    ["PokemonGo-API-/src/app.js", "PokemonGo-API-/src/routes", "PokemonGo-API-/src/current-datasets/router.js", "PokemonGo-API-/api", "Dashboard Admin/src/app/api"],
    ["api", "datasets", "mongo", "dependencies"], ["DOC-006", "DOC-011", "DOC-017", "DOC-019", "DOC-020"],
    [["Routes PokemonGo-API-", "API-001 à API-122"], ["Routes Dashboard", "API-123 à API-160"], ["Entrées publiques", "92"], ["Entrées privées", "67"], ["Entrée interne bloquée", "API-007"], ["Documentation", "/api-docs.json, /api-docs, /swagger"]],
    ["PokemonGo-API- sert quatre pages App Router, trois fonctions Vercel et une application Express montée sous api/rest.js.", "Express applique requestId, Helmet, CORS, compression, Morgan, rate limiting, cache GET, middleware read-only, routes et middleware d’erreur.", "Les routes statiques lisent les modèles Mongoose et exposent pagination, recherche, projections ou catalogues selon leur module.", "Le routeur current dessert raids, eggs, max-battles, rocket, research, shiny et pvp-rankings. Il impose no-store; les mutations import et regenerate exigent x-api-admin-secret.", "Les routes API-157 à API-160 sont privées au Dashboard, vérifient getSession et isolent les données avec session.email.", "OpenAPI n’inclut ni les routes Shiny privées ni les routes trainer-pokemon du Dashboard."],
    [["Vercel", "redirige /api/v1, docs et health vers", "api/rest.js"], ["api/rest.js", "encapsule", "Express src/app.js"], ["Routes Express", "lisent", "MongoDB"], ["Dashboard BFF", "relaie avec secret serveur", "mutations PokemonGo-API"]],
    ["flowchart LR", "  CLIENT[\"Client public\"] --> REST[\"api/rest.js\"]", "  REST --> EXPRESS[\"Express /api/v1\"]", "  EXPRESS --> DB[(\"MongoDB API\")]", "  ADMIN[\"Dashboard avec session\"] --> BFF[\"38 méthodes BFF\"]", "  BFF --> EXPRESS", "  BFF --> DDB[(\"MongoDB Dashboard\")]"],
    ["Aucune version OpenAPI alignée automatiquement sur package.json n’est présente.", "Aucune fiche Markdown unitaire n’est présente pour API-001 à API-156.", "Aucune politique de compatibilité entre les 160 contrats n’est codée."]
  ),
  D("DOC-013", "Architecture des données", "Référence des référentiels statiques, datasets courants, données Dashboard et pipelines de transformation.",
    ["PokemonGo-Data", "PokemonGo-API-", "Dashboard Admin"],
    ["PokemonGo-Data", "PokemonGo-API-/src/sync", "PokemonGo-API-/src/lib/current-dataset-pipeline.js", "Dashboard Admin/src/lib/learning", "Dashboard Admin/src/lib/trainer-pokemon"],
    ["datasets", "providers", "mongo", "dependencies"], ["DOC-006", "DOC-012", "DOC-015", "DOC-016", "DOC-017"],
    [["Datasets enregistrés", "DATASET-001 à DATASET-020"], ["Providers enregistrés", "PROVIDER-001 à PROVIDER-018"], ["Collections enregistrées", "COL-001 à COL-032"], ["Schémas Data", "schemas/pokemon.schema.json et schemas/pokemon-assets.schema.json"], ["Pipelines current API", "7 domaines"], ["Pipelines privés Dashboard", "Learning, Events, Source Watch et collection du dresseur"]],
    ["PokemonGo-Data conserve les référentiels Pokémon, formes, assets JSON, moves, types, weather, generations, items, rocket texts et stickers.", "Le sync statique collecte les documents Data, calcule les empreintes, crée les index, exécute les bulk upserts, supprime les entrées stale si SYNC_DELETE_STALE vaut true, met à jour globalstats et écrit syncruns.", "Le pipeline current valide un dataset non vide, calcule hash et diff, upsert le document key=current, invalide le cache et vérifie count et hash après relecture.", "Les cinq JSON raids, eggs, max-battles, rocket et research servent de fixtures, références ou exports; les lectures runtime utilisent MongoDB.", "Learning emploie Zod, des contenus locaux, une migration navigateur, quatre collections de contenu/progression et deux collections d’historique.", "DATASET-020 valide le JSON importé, résout Pokémon, attaques et types via l’API publique, écrit un snapshot puis bascule activeSnapshotId après read-back."],
    [["Providers", "alimentent", "générateurs Data"], ["PokemonGo-Data", "alimente", "sync statique API"], ["Current pipeline", "écrit", "MongoDB API"], ["Dashboard repositories", "écrivent", "MongoDB Dashboard"]],
    ["flowchart LR", "  SRC[\"Providers\"] --> DATA[\"PokemonGo-Data\"]", "  DATA --> STATIC[\"Sync statique\"] --> API_DB[(\"MongoDB API\")]", "  SRC --> CURRENT[\"Pipeline current\"] --> API_DB", "  JSON[\"Import admin\"] --> DASH_PIPE[\"Learning / trainer\"] --> DASH_DB[(\"MongoDB Dashboard\")]", "  API_DB --> API[\"PokemonGo-API\"]"],
    ["Aucune transaction globale ne couvre le sync statique.", "Aucun rollback automatique ne couvre les cinq current publics.", "Aucun schemaVersion global ne couvre les 20 datasets."]
  ),
  D("DOC-014", "Architecture des assets", "Référence des 17 familles d’assets, de leur stockage et de leurs consommateurs réels.",
    ["PokemonGo-Assets-API", "PokemonGo-Data/pokemon-assets", "Dashboard Admin/public", "PokemonGo-API-/asset"],
    ["PokemonGo-Assets-API", "PokemonGo-Assets-API/scripts/sync-pokeminers-pogo-assets.js", "Dashboard Admin/next.config.ts", "Landing-Page-PogoApi/next.config.mjs"],
    ["assets", "dependencies"], ["DOC-005", "DOC-006", "DOC-011", "DOC-013"],
    [["ASSET-001 à ASSET-004", "LocationCards, MegaPortraits, Pokémon GO, Pokémon HOME HD"], ["ASSET-005 à ASSET-008", "Stickers, TypeBackgrounds, Types, candy"], ["ASSET-009 à ASSET-012", "divers, items, pokemonShuffle, weather"], ["ASSET-013 à ASSET-014", "miroir et cache PokeMiners"], ["ASSET-015 à ASSET-017", "public Dashboard, asset API local, références JSON Data"], ["Fichiers Git suivis du dépôt Assets", "22 634"]],
    ["Les consommateurs publics chargent les médias depuis raw.githubusercontent.com sur la branche main.", "PokemonGo-Data stocke des références d’assets dans pokemon-assets et dans les fiches Pokémon.", "Le script sync-pokeminers-pogo-assets télécharge une archive, extrait un cache puis remplace le miroir PokeMiners-pogo_assets.", "Les index candy/index.json, pokemonShuffle/index.json et weather/index.json décrivent trois familles.", "Dashboard Admin autorise raw.githubusercontent.com et avatars.githubusercontent.com dans next/image; la Landing autorise raw.githubusercontent.com et pokemon-go-api.vercel.app.", "Le Dashboard combine next/image et des balises img; les composants Pokémon utilisent aussi des URL raw codées dans uiAssets et admin-app.jsx."],
    [["PokeMiners", "alimente", "ASSET-013"], ["PokemonGo-Assets-API", "alimente", "Dashboard, API, Landing et Data"], ["PokemonGo-Data/pokemon-assets", "référence", "fichiers médias publiés"]],
    ["flowchart LR", "  UP[\"PokeMiners\"] --> SYNC[\"script de synchronisation\"] --> MIRROR[\"ASSET-013\"]", "  LOCAL[\"Familles locales ASSET-001 à 012\"] --> RAW[\"GitHub raw\"]", "  RAW --> DASH[\"Dashboard\"]", "  RAW --> API[\"API publique\"]", "  RAW --> LAND[\"Landing\"]", "  RAW --> DATA[\"Références Data\"]"],
    ["Aucune version de package n’est présente dans PokemonGo-Assets-API.", "Aucune licence de dépôt n’est présente.", "Aucune fiche Markdown ASSET-* unitaire n’est présente.", "Aucun workflow CI de validation des fichiers et liens raw n’est présent."]
  ),
  D("DOC-015", "Vue d’ensemble des providers", "Référence des 18 sources et adaptateurs recensés dans les générateurs, scrapers et imports.",
    ["PokemonGo-Data/scripts", "Dashboard Admin/src/lib", "PokemonGo-API-/scripts/import", "PokemonGo-Assets-API/scripts"],
    ["PokemonGo-Data/scripts/generateCurrentRaids.js", "PokemonGo-Data/scripts/providers", "Dashboard Admin/src/lib/leekduck-events-scraper.ts", "PokemonGo-API-/scripts/import", "PokemonGo-Assets-API/scripts/sync-pokeminers-pogo-assets.js"],
    ["providers", "datasets", "dependencies"], ["DOC-013", "DOC-016", "DOC-027", "DOC-028"],
    [["PROVIDER-001 à 005", "LeekDuck raids, eggs, rocket, research; Snacknap max battles"], ["PROVIDER-006 à 008", "Snacknap Shiny, fixture Shiny, PvPoke"], ["PROVIDER-009 à 010", "LeekDuck Events et ScrapedDuck"], ["PROVIDER-011 à 013", "PokeMiners game_masters, pogo_assets et Margxt"], ["PROVIDER-014 à 018", "pogoapi.net, PokeAPI, Bulbapedia, Serebii et dépôt Assets GitHub"], ["Contrat formel dataset-provider", "Shiny et PvP Rankings"]],
    ["Les générateurs raids, eggs, max-battles, rocket et research intègrent directement fetch, parsing, normalisation et enrichissement.", "Le contrat scripts/lib/dataset-provider.js est utilisé par les providers Shiny et PvP.", "Le provider fixture Shiny sert aux tests et au mode fixture du générateur.", "Le scraper Events combine feed et pages LeekDuck avec des références ScrapedDuck, limite la concurrence et poursuit après certains échecs de détail.", "Les scripts import de PokemonGo-API ont un mode lecture/dry-run et des variantes :write déclarées dans package.json.", "Les providers assets PokeMiners et PokemonGo-Assets-API publient des fichiers ou références, pas des réponses JSON runtime via un serveur Assets dédié."],
    [["PROVIDER-001 à 005", "produisent", "DATASET-012 à 016"], ["PROVIDER-006", "produit", "DATASET-017"], ["PROVIDER-008", "produit", "DATASET-018"], ["PROVIDER-009 et 010", "alimentent", "collection events"]],
    ["flowchart LR", "  DIRECT[\"5 générateurs directs\"] --> CURRENT[\"Datasets current publics\"]", "  FORMAL[\"Shiny / PvP providers\"] --> RANKED[\"Datasets ranked\"]", "  EVENTS[\"LeekDuck / ScrapedDuck\"] --> CAL[\"Events Dashboard\"]", "  IMPORTS[\"5 imports historiques\"] --> DATA[\"PokemonGo-Data\"]", "  ASSETS[\"PokeMiners / Assets GitHub\"] --> MEDIA[\"Assets et références\"]"],
    ["Aucune interface commune de timeout et retry ne couvre les 18 providers.", "Les licences et conditions d’utilisation ne sont pas codées pour les sources externes.", "Aucune fiche Markdown PROVIDER-* unitaire n’est présente."]
  ),
  D("DOC-016", "Vue d’ensemble des datasets", "Référence des 20 datasets, de leur visibilité, stockage, pipeline et source runtime.",
    ["PokemonGo-Data", "PokemonGo-API-", "Dashboard Admin"],
    ["PokemonGo-Data/package.json", "PokemonGo-API-/src/current-datasets", "Dashboard Admin/src/lib/learning", "Dashboard Admin/src/lib/trainer-pokemon"],
    ["datasets", "providers", "api", "mongo", "dependencies"], ["DOC-013", "DOC-015", "DOC-017", "DOC-033"],
    [["DATASET-001 à 011", "Référentiels Pokémon, formes, assets, moves, types, weather, generations, items, rocket texts, stickers et candy"], ["DATASET-012 à 016", "Raids, eggs, max battles, Rocket et Research publics"], ["DATASET-017", "Shiny Tracker privé"], ["DATASET-018", "PvP Rankings public"], ["DATASET-019", "Source Watch privé admin"], ["DATASET-020", "Collection Pokémon du dresseur privée"]],
    ["DATASET-001 à 011 partent de fichiers versionnés PokemonGo-Data et alimentent les collections statiques ou des réponses dérivées.", "DATASET-012 à 016 lisent uniquement MongoDB au runtime; leurs JSON locaux ne servent pas de fallback runtime.", "DATASET-017 utilise shiny_rankings et shiny_snapshots, exige le secret API et reste absent d’OpenAPI.", "DATASET-018 utilise pvprankings, un document current compressé et des routes publiques.", "DATASET-019 stocke la configuration dans source-watch/sources.json et l’historique dans dashboard_store.", "DATASET-020 ne conserve aucun export utilisateur dans Git; son snapshot actif dans MongoDB Dashboard est la source de lecture."],
    [["DATASET-001 à 011", "proviennent de", "PokemonGo-Data"], ["DATASET-012 à 018", "sont servis par", "PokemonGo-API"], ["DATASET-019 à 020", "sont servis par", "Dashboard Admin"]],
    ["flowchart TD", "  STATIC[\"DATASET-001 à 011\"] --> SYNC[\"Sync statique\"]", "  CURRENT[\"DATASET-012 à 018\"] --> PIPE[\"Pipeline current\"]", "  PRIVATE[\"DATASET-019 à 020\"] --> DASH[\"Repositories Dashboard\"]", "  SYNC --> DB[(\"MongoDB\")]", "  PIPE --> DB", "  DASH --> DDB[(\"MongoDB Dashboard\")]"],
    ["Aucune fiche Markdown unitaire n’est présente pour DATASET-001 à DATASET-019.", "Aucune version globale ne couvre les 20 datasets.", "Aucune fréquence de régénération n’est codée sous forme de cron."]
  ),
  D("DOC-017", "Vue d’ensemble MongoDB", "Référence des 32 collections, des deux bases logiques et des index déclarés dans le code.",
    ["PokemonGo-API-/src/models", "Dashboard Admin/src/lib"],
    ["PokemonGo-API-/src/models", "PokemonGo-API-/src/sync", "Dashboard Admin/src/lib/dashboard-store.ts", "Dashboard Admin/src/lib/learning/repository.ts", "Dashboard Admin/src/lib/trainer-pokemon/repository.ts"],
    ["mongo", "datasets", "dependencies"], ["DOC-012", "DOC-013", "DOC-016", "DOC-018"],
    [["COL-001 à 019", "Base MONGODB_URI de PokemonGo-API"], ["COL-020 à 029", "Base DASHBOARD_MONGODB_DB du Dashboard"], ["COL-030", "trainer_pokemon_owners"], ["COL-031", "trainer_pokemon_snapshots"], ["COL-032", "trainer_pokemon_entries"], ["TTL déclarés", "0"]],
    ["Les collections API sont eggs, generations, globalstats, items, maxbattles, moves, pokemons, pokemonAssets, pvp_rankings, raids, researches, regions, rockets, rocket_texts, shiny_rankings, shiny_snapshots, syncruns, types et weathers.", "Les collections Dashboard existantes sont dashboard_store, dashboard_api_metrics, dashboard_backlog, events et les six collections learning.", "trainer_pokemon_owners porte un index unique owner et les pointeurs activeSnapshotId et previousSnapshotId.", "trainer_pokemon_snapshots indexe owner/importedAt et owner/status/importedAt.", "trainer_pokemon_entries possède neuf index, dont l’unicité owner+snapshotId+sourceId et les accès par numéro, nom, CP, IV, états, genre, alignement, forme et costume.", "Les modèles Mongoose désactivent versionKey sur les modèles observés; le versionnement métier repose sur timestamps, hash, snapshots ou historique applicatif."],
    [["Sync statique", "écrit", "COL-002 à 004, 006 à 008, 012, 014, 018 à 019"], ["Current pipeline", "écrit", "COL-001, 005, 009 à 011, 013, 015 à 016"], ["Trainer repository", "écrit", "COL-030 à COL-032"]],
    ["flowchart LR", "  API[\"PokemonGo-API\"] --> API_DB[(\"COL-001 à 019\")]", "  DASH[\"Dashboard Admin\"] --> DASH_DB[(\"COL-020 à 032\")]", "  IMPORT[\"Import trainer\"] --> SNAP[\"COL-031 / COL-032\"]", "  SNAP --> POINTER[\"COL-030 activeSnapshotId\"]"],
    ["Aucun TTL n’est déclaré dans les 32 entrées du registre.", "Aucun validateur MongoDB côté serveur n’est codé pour les collections Dashboard.", "Aucune fiche Markdown unitaire n’est présente pour COL-001 à COL-029.", "La configuration réseau et les sauvegardes Atlas ne sont pas présentes dans le code."]
  ),
  D("DOC-018", "Cache applicatif", "Référence des caches mémoire, HTTP, build, assets et référentiels réellement implémentés.",
    ["PokemonGo-API-", "Dashboard Admin", "PokemonGo-Assets-API"],
    ["PokemonGo-API-/src/lib/cache.js", "PokemonGo-API-/src/current-datasets/router.js", "Dashboard Admin/scripts/data/ensure-data.js", "Dashboard Admin/src/lib/trainer-pokemon/references.ts", "PokemonGo-Assets-API/.pokeminers-cache"],
    ["api", "datasets", "assets"], ["DOC-012", "DOC-017", "DOC-022", "DOC-032"],
    [["Cache Express", "Map mémoire, TTL 60 s, maximum 5 000 entrées"], ["Bypass current", "no-store et X-Cache BYPASS"], ["Events public", "max-age=60, stale-while-revalidate=300"], ["Référentiels trainer", "Promise mémoire, TTL 10 minutes"], ["Snapshot Data", ".data/PokemonGo-Data"], ["Cache Assets", ".pokeminers-cache"]],
    ["Le cache Express ne stocke que les GET 2xx sans no-store et expose HIT, MISS ou BYPASS dans X-Cache.", "fresh=true contourne le cache. clearCache efface tout; invalidateDatasetCache efface les préfixes des cinq current publics historiques.", "Le routeur current impose Cache-Control no-store, Pragma no-cache et Expires 0.", "Le Dashboard envoie private, no-store sur ses routes privées et sur les réponses trainer-pokemon.", "fetchTrainerPokemonReferences regroupe Pokémon, moves et types dans une Promise partagée pendant dix minutes; une erreur remet la Promise et le timestamp à zéro.", "ensure-data crée un clone ou snapshot dérivé dans .data; le script de PokeMiners utilise un cache de téléchargement et d’extraction."],
    [["GET statique", "passe par", "cache Express"], ["GET current", "bypass", "cache Express"], ["Import trainer", "lit", "cache de référentiels 10 minutes"], ["Build", "lit", ".data snapshot"]],
    ["flowchart LR", "  REQ[\"GET API\"] --> MEM[\"Map 60 s\"]", "  CURRENT[\"GET current\"] --> BYPASS[\"no-store\"]", "  BUILD[\"prebuild\"] --> SNAP[\".data\"]", "  TRAINER[\"Import trainer\"] --> REF[\"Référentiels 10 min\"]", "  PM[\"Sync PokeMiners\"] --> CACHE[\".pokeminers-cache\"]"],
    ["Aucun cache distribué n’est présent.", "Aucune métrique de hit ratio n’est présente.", "Aucune limite de poids du cache Express n’est présente.", "La revalidation CDN effective du déploiement n’est pas présente dans le code."]
  ),
  D("DOC-019", "Authentification", "Référence de la session Dashboard, du secret administrateur API et des contrôles par route.",
    ["Dashboard Admin", "PokemonGo-API-"],
    ["Dashboard Admin/src/lib/auth.ts", "Dashboard Admin/src/lib/session-token.ts", "Dashboard Admin/src/proxy.ts", "PokemonGo-API-/src/lib/admin-auth.js", "PokemonGo-API-/src/middleware/read-only.js"],
    ["api", "pages", "dependencies"], ["DOC-011", "DOC-012", "DOC-020", "DOC-033"],
    [["Compte Dashboard", "ADMIN_EMAIL et ADMIN_PASSWORD"], ["Jeton", "payload JSON base64url signé HMAC-SHA256"], ["Cookie", "matweb_dashboard_session, HttpOnly, SameSite=Lax"], ["Durée", "14 jours"], ["Rôle", "admin"], ["Secret API", "x-api-admin-secret comparé en temps constant"]],
    ["POST /api/session applique rateLimit, assertSameOrigin, validateCredentials et safeInternalPath, puis écrit le cookie et répond par une redirection 303.", "En production, ADMIN_EMAIL, ADMIN_PASSWORD et SESSION_SECRET sont tous obligatoires; leur absence refuse la connexion.", "Le proxy protège les pages hors chemins publics. Les préfixes dashboard-store, pokemon-admin, trainer-pokemon, backlog, admin/events et learning passent jusqu’aux contrôles getSession de leurs handlers.", "Les quatre routes trainer-pokemon vérifient la session et le rôle admin; le repository utilise session.email comme owner.", "PokemonGo-API autorise les lectures publiques, protège Shiny et les mutations avec API_ADMIN_SECRET et refuse les mutations legacy read-only.", "Le Dashboard ajoute POKEMON_API_ADMIN_SECRET côté serveur lorsqu’il relaie une mutation autorisée vers PokemonGo-API."],
    [["Navigateur", "présente", "cookie Dashboard"], ["Handlers Dashboard", "vérifient", "getSession"], ["Dashboard BFF", "présente", "x-api-admin-secret"], ["PokemonGo-API", "autorise", "route publique ou secret valide"]],
    ["sequenceDiagram", "  participant B as Navigateur", "  participant D as Dashboard", "  participant A as PokemonGo-API", "  B->>D: email + mot de passe", "  D-->>B: cookie HMAC 14 jours", "  B->>D: requête privée + cookie", "  D->>A: mutation + secret serveur", "  A-->>D: réponse protégée"],
    ["Aucun MFA n’est présent.", "Aucun store de révocation de session n’est présent.", "Aucun rôle distinct d’admin n’est présent.", "Aucun hash de mot de passe applicatif n’est présent."]
  ),
  D("DOC-020", "Sécurité", "Référence des protections HTTP, origine, payload, rate limits, secrets et frontières public/privé.",
    ["Dashboard Admin", "PokemonGo-API-"],
    ["Dashboard Admin/src/lib/security.ts", "Dashboard Admin/src/proxy.ts", "PokemonGo-API-/src/app.js", "PokemonGo-API-/next.config.mjs", "PokemonGo-API-/src/lib/admin-auth.js"],
    ["api", "datasets", "mongo"], ["DOC-012", "DOC-019", "DOC-027", "DOC-033"],
    [["Headers Dashboard", "CSP, COOP, Referrer-Policy, nosniff, DENY, Permissions-Policy"], ["Headers API", "Next security headers et Helmet"], ["Origine mutations", "assertSameOrigin"], ["Rate limit Dashboard", "Map mémoire par IP et label"], ["Rate limit API", "express-rate-limit"], ["Taille trainer import", "12 000 000 octets et 20 000 entrées"]],
    ["safeInternalPath refuse les chemins externes, les doubles slashs et les backslashes.", "assertSameOrigin compare l’origine du header Origin avec l’origine de request.url pour POST, PUT, PATCH et DELETE.", "La CSP Dashboard autorise unsafe-inline et unsafe-eval dans script-src; la CSP API ajoute unsafe-eval uniquement en développement.", "PokemonGo-API applique CORS_ORIGINS, Helmet, compression, limite JSON et rate limit global.", "Le proxy PokemonGo-API du Dashboard limite les chemins aux routes système, à une allowlist admin ou aux chemins OpenAPI résolus.", "trainerPokemonServerError masque les messages 5xx et conserve codes et issues de validation pour les erreurs contrôlées."],
    [["Proxy Dashboard", "protège", "pages privées"], ["Handlers privés", "appliquent", "session, origine et rate limit"], ["API read-only", "bloque", "mutations non admin"], ["Secret API", "protège", "Shiny et mutations current"]],
    ["flowchart TD", "  REQ[\"Requête\"] --> HEADERS[\"Headers sécurité\"]", "  HEADERS --> AUTH{\"Route privée ?\"}", "  AUTH -->|oui| SESSION[\"Session ou secret\"]", "  SESSION --> ORIGIN[\"Same-origin si mutation\"]", "  ORIGIN --> LIMIT[\"Rate limit + taille\"]", "  LIMIT --> HANDLER[\"Handler\"]"],
    ["Aucun WAF n’est configuré dans le code local.", "Aucun scan SAST ou DAST n’est configuré.", "Aucune rotation de secrets n’est codée.", "Les règles réseau Atlas ne sont pas présentes."]
  ),
  D("DOC-021", "Tests", "Référence des suites de tests, commandes et couvertures réellement présentes dans les cinq dépôts.",
    ["Les cinq dépôts"],
    ["Dashboard Admin/scripts", "PokemonGo-API-/test", "PokemonGo-Data/scripts", "PokemonGo-Data/test", "PokemonGo-API-/.github/workflows", "PokemonGo-Data/.github/workflows"],
    ["api", "datasets", "providers", "components"], ["DOC-012", "DOC-013", "DOC-020", "DOC-030"],
    [["PokemonGo-API-", "10 fichiers, 66 tests node:test"], ["PokemonGo-Data", "4 fichiers, 32 tests node:test"], ["Dashboard structure", "7 tests"], ["Dashboard trainer", "13 tests déclarés"], ["Dashboard Learning", "1 scénario E2E séquentiel Playwright + Mongo temporaire"], ["Landing et Assets", "0 test"]],
    ["npm test de PokemonGo-API lance node --test après ensure-data.", "Les tests API couvrent routes de base, read-only, secret Shiny, cache, adapters current, hash, modèles, pipeline, corruption et indisponibilité Mongo.", "PokemonGo-Data sépare test:pokemon:refactor, test:current-generators et test:ranked-datasets.", "Dashboard expose test:admin-pokemon, test:trainer-pokemon et test:learning-flow; npm run check ne les appelle pas.", "test-trainer-pokemon valide le contrat, les limites IV, la normalisation, le read-back, l’absence de deleteMany, la session, l’absence OpenAPI et les états responsive.", "Le workflow sync-mongodb exécute npm ci puis npm run sync sans tests; le workflow Data dispatch ne lance aucune suite."],
    [["Tests Data", "valident", "générateurs et schémas"], ["Tests API", "valident", "routes et pipelines"], ["E2E Learning", "valide", "Dashboard + Mongo réel temporaire"], ["Workflow de sync", "écrit sans appeler", "suites de tests"]],
    ["flowchart LR", "  DATA[\"32 tests Data\"] --> API[\"66 tests API\"]", "  DASH[\"16 tests Dashboard + E2E\"] --> UI[\"Dashboard\"]", "  API -.-> SYNC[\"Workflow sync Mongo\"]", "  LAND[\"Landing: 0\"]", "  ASSETS[\"Assets: 0\"]"],
    ["Aucun pourcentage de couverture n’est produit.", "Aucun test d’accessibilité automatisé n’est présent.", "Aucun budget de performance automatisé n’est présent.", "Aucun test Landing ou Assets n’est présent."]
  ),
  D("DOC-022", "Performance", "Référence des mécanismes de rendu, pagination, cache, images et requêtes qui influencent le coût runtime.",
    ["Dashboard Admin", "PokemonGo-API-", "Landing-Page-PogoApi"],
    ["Dashboard Admin/src/components/admin/pokemon/admin-app.jsx", "PokemonGo-API-/src/lib/cache.js", "PokemonGo-API-/src/services", "PokemonGo-API-/components", "Landing-Page-PogoApi/components/landing-experience.jsx"],
    ["components", "api", "mongo"], ["DOC-011", "DOC-012", "DOC-018", "DOC-023"],
    [["AdminApp", "2 503 lignes et 103 558 octets"], ["Chargement dynamique", "COMP-137 uniquement dans AdminApp"], ["Cache API", "60 s et 5 000 entrées"], ["Accueil API", "revalidate=3600"], ["Events public", "60 s + stale 300 s"], ["Pagination trainer", "10 à 100 entrées, défaut 50"]],
    ["AdminApp importe statiquement les panneaux historiques et charge TrainerPokemonCollectionPanel avec next/dynamic.", "Les datasets current historiques sont chargés lorsque leur section devient active; le bootstrap Pokémon initial reste global.", "La checklist publique reçoit le bootstrap et le catalogue complets puis limite le rendu initial côté client.", "Les routes principales Pokémon, moves, items, forms, PvP et textes Rocket utilisent skip, limit, countDocuments et lean.", "Les images mélangent next/image et img; la Landing utilise next/image pour ses visuels et hydrate LandingExperience pour GSAP.", "Le repository trainer partage la connexion Mongo par Promise, crée les index au premier accès et exécute pagination, projection, distincts et agrégation de plages en parallèle."],
    [["Route Admin Pokémon", "charge", "AdminApp"], ["AdminApp", "charge dynamiquement", "COMP-137"], ["API GET", "utilise", "cache ou no-store"], ["Requêtes listées", "utilisent", "index, projection et pagination"]],
    ["flowchart LR", "  PAGE[\"Admin Pokémon\"] --> APP[\"AdminApp 103 Ko source\"]", "  APP --> STATIC[\"Panneaux statiques\"]", "  APP --> DYNAMIC[\"COMP-137 dynamique\"]", "  APP --> BFF[\"BFF Dashboard\"]", "  BFF --> API[\"API cache/no-store\"]", "  API --> DB[(\"MongoDB\")]"],
    ["Aucun résultat Core Web Vitals n’est présent.", "Aucun budget de bundle n’est présent.", "Aucune mesure p95 ou p99 API/Mongo n’est présente.", "Aucun explain MongoDB n’est conservé."]
  ),
  D("DOC-023", "Responsive", "Référence des breakpoints, shells, grilles, modales et variantes mobile/desktop présentes dans les interfaces.",
    ["Dashboard Admin", "PokemonGo-API-", "Landing-Page-PogoApi"],
    ["Dashboard Admin/src/components/admin/layout/admin-app-frame.tsx", "Dashboard Admin/src/components/ui/modal.tsx", "Dashboard Admin/src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx", "PokemonGo-API-/components", "Landing-Page-PogoApi/components/landing-experience.jsx"],
    ["components", "pages"], ["DOC-010", "DOC-011", "DOC-021", "DOC-022"],
    [["Breakpoints Tailwind utilisés", "sm, md, lg, xl, 2xl"], ["Seuils Tailwind", "640, 768, 1024, 1280, 1536 px"], ["Sidebar Dashboard", "fixe à partir de lg; drawer mobile 286 px"], ["Contenu Dashboard", "max-width 1680 px"], ["Modal commune", "w-full et max-height 92dvh"], ["Collection trainer", "cartes sous lg; table min-width 1540 px à partir de lg"]],
    ["AdminAppFrame bascule entre sidebar desktop et drawer mobile; la topbar adapte libellés et actions.", "Les écrans métier utilisent des grilles progressives, min-w-0, truncate, overflow et des conteneurs scrollables.", "La modale commune fixe un corps scrollable et ferme sur Escape; les modales Pokémon et Events ont aussi des implémentations locales.", "COMP-137 rend PokemonMobileCard avec lg:hidden et PokemonTable avec hidden lg:block; le tableau est placé dans overflow-x-auto.", "La checklist API passe de une à quatre colonnes; son détail devient bottom-sheet sur mobile puis modal centré à partir de sm.", "La Landing passe son hero de une à deux colonnes; sa navigation principale est masquée sous md."],
    [["Viewport mobile", "rend", "drawer et cartes"], ["Viewport lg", "rend", "sidebar et tableaux"], ["Modal", "contraint", "hauteur avec dvh"], ["Listes", "emploient", "grilles, pagination ou scroll horizontal"]],
    ["flowchart LR", "  M[\"< 640\"] --> SM[\"sm 640\"] --> MD[\"md 768\"] --> LG[\"lg 1024\"] --> XL[\"xl 1280\"] --> XXL[\"2xl 1536\"]", "  M --> DRAWER[\"Drawer\"]", "  LG --> SIDEBAR[\"Sidebar\"]", "  M --> CARDS[\"Cartes trainer\"]", "  LG --> TABLE[\"Table trainer\"]"],
    ["Aucune matrice officielle d’appareils et navigateurs n’est présente.", "Aucun test automatique iOS Safari ou Android Chrome n’est présent.", "Aucun test de zoom 200 % ou 400 % n’est présent."]
  ),
  D("DOC-024", "Structure des dossiers", "Référence de l’arborescence active des cinq dépôts et des zones dérivées ou archivées.",
    ["Les cinq dépôts Git du workspace"],
    ["Dashboard Admin", "Landing-Page-PogoApi", "PokemonGo-API-", "PokemonGo-Assets-API", "PokemonGo-Data"],
    ["pages", "components", "datasets", "assets"], ["DOC-005", "DOC-006", "DOC-011", "DOC-013", "DOC-014"],
    [["Dashboard Admin", "src/app, src/components, src/hooks, src/services, src/lib, src/data, public, scripts"], ["PokemonGo-API-", "app, api, src/routes, src/models, src/current-datasets, src/sync, src/lib, scripts, test"], ["PokemonGo-Data", "référentiels JSON, schemas, scripts, test, .github/workflows"], ["PokemonGo-Assets-API", "familles médias, scripts, miroir et cache PokeMiners"], ["Landing-Page-PogoApi", "app et components/landing-experience.jsx"], ["Zones dérivées", "node_modules, .next, .vercel, .data, .pokeminers-cache"]],
    ["Dashboard Admin contient 20 pages, 29 fichiers route.ts et 38 méthodes HTTP exportées.", "src/components/admin est le chemin canonique; src/components/dashboard, src/components/pokemon-admin et src/components/checklist contiennent des façades ou chemins legacy.", "PokemonGo-API- contient 26 modules sous src/routes et 22 fichiers sous src/models.", "PokemonGo-Data contient 31 scripts JavaScript actifs et 3 782 fichiers suivis Git.", "PokemonGo-Assets-API contient 22 634 fichiers suivis Git et un volume dérivé plus large dans le miroir PokeMiners.", "Les dossiers .backup, archives, archive JSON et PokemonGo-API-/archive ne participent pas au runtime actif."],
    [["Dashboard app", "importe", "components/admin"], ["API prebuild", "clone", "PokemonGo-Data dans .data"], ["Assets script", "remplit", "miroir et cache"], ["Archives", "restent hors", "code actif"]],
    ["flowchart TD", "  W[\"Workspace\"] --> D[\"Dashboard Admin\"]", "  W --> A[\"PokemonGo-API-\"]", "  W --> DATA[\"PokemonGo-Data\"]", "  W --> ASSETS[\"PokemonGo-Assets-API\"]", "  W --> L[\"Landing-Page-PogoApi\"]", "  D --> SNAP[\".data dérivé\"]", "  ASSETS --> CACHE[\".pokeminers-cache dérivé\"]"],
    ["La politique de conservation des archives racine n’est pas présente.", "La génération automatique des façades de compatibilité n’est pas présente.", "L’origine de chaque fichier non suivi sous PokemonGo-API-/asset n’est pas codée."]
  ),
  D("DOC-025", "Conventions de code", "Référence des choix de langage, modules, typage, imports, contrôles et exceptions visibles dans le code.",
    ["Les cinq dépôts"],
    ["Dashboard Admin/tsconfig.json", "Dashboard Admin/eslint.config.mjs", "Dashboard Admin/package.json", "PokemonGo-API-/package.json", "PokemonGo-Data/package.json"],
    ["components", "services", "api"], ["DOC-021", "DOC-024", "DOC-026", "DOC-030"],
    [["Dashboard", "TypeScript strict, JSX historique, alias @/*"], ["API", "CommonJS côté Express et scripts; ESM côté Next app"], ["Data", "scripts CommonJS et JSON"], ["Landing", "JavaScript/JSX ESM"], ["Lint Dashboard", "eslint-config-next core-web-vitals et typescript"], ["Formatage", "aucune configuration Prettier ou EditorConfig"]],
    ["Le Dashboard compile avec strict=true, noEmit=true, moduleResolution=bundler et resolveJsonModule=true.", "Les pages et handlers App Router exportent des fonctions ou composants; les composants clients déclarent use client.", "Les imports Dashboard utilisent l’alias @ pour src et des imports relatifs dans les groupes proches.", "Les handlers Next renvoient NextResponse; Express utilise router, asyncHandler, ApiError et middleware central.", "Les scripts de mutation Data/API possèdent des modes dry et :write distincts dans package.json.", "Les exceptions ESLint actives couvrent no-require-imports, no-img-element, set-state-in-effect et exhaustive-deps dans des fichiers nommés."],
    [["TypeScript", "contrôle", "Dashboard"], ["ESLint", "contrôle", "Dashboard src hors zones ignorées"], ["node:test", "contrôle", "API, Data et scripts Dashboard"], ["CommonJS", "structure", "Express et générateurs"]],
    ["flowchart LR", "  TS[\"Dashboard TS strict\"] --> NEXT[\"Next App Router\"]", "  JSX[\"Composants JSX legacy\"] --> NEXT", "  CJS[\"Express CommonJS\"] --> API[\"API runtime\"]", "  DATA[\"Scripts CommonJS\"] --> JSON[\"Datasets JSON\"]", "  ESLINT[\"ESLint Dashboard\"] --> TS"],
    ["Aucune règle de formatage commune aux cinq dépôts n’est présente.", "Aucun commitlint n’est présent.", "Aucune convention de code exécutable n’est présente dans Assets."]
  ),
  D("DOC-026", "Conventions de nommage", "Référence des conventions de noms réellement observées pour fichiers, symboles, routes, collections, données et variables.",
    ["Les cinq dépôts"],
    ["Dashboard Admin/src", "PokemonGo-API-/src", "PokemonGo-Data", "audit-documentation/registries"],
    ["api", "mongo", "datasets", "components"], ["DOC-012", "DOC-017", "DOC-024", "DOC-025"],
    [["Fichiers UI", "kebab-case.tsx, kebab-case.jsx"], ["Composants", "PascalCase"], ["Hooks", "use + PascalCase; fichiers use-kebab-case"], ["Routes", "segments kebab-case et paramètres [id] ou :id"], ["Collections Dashboard", "snake_case"], ["Variables d’environnement", "UPPER_SNAKE_CASE"]],
    ["Les services Dashboard portent le suffixe -api ou un nom de store et exportent des fonctions camelCase.", "Les routes Express utilisent des noms de ressources pluriels et des segments kebab-case: max-battles, pvp-rankings et rocket-texts.", "Les collections API conservent plusieurs noms historiques sans séparateur: globalstats, maxbattles et syncruns; pokemonAssets utilise camelCase; shiny_rankings utilise snake_case.", "Les documents Data utilisent dexNr, schemaVersion et generatedAt; le format d’import trainer conserve les champs source mon_number, mon_isShiny et mon_move_1 avant normalisation.", "Les identifiants documentaires utilisent un préfixe et trois chiffres: PAGE-049, COMP-137, API-160, COL-032 et DATASET-020.", "Les noms de dépôts conservent leur casse et le tiret final de PokemonGo-API-."],
    [["Nom fichier", "détermine", "module importé"], ["Nom route", "détermine", "endpoint public ou privé"], ["Nom collection", "est fixé par", "Mongoose ou repository Mongo"], ["ID documentaire", "référence", "entrée de registre"]],
    ["flowchart LR", "  FILE[\"kebab-case file\"] --> SYMBOL[\"PascalCase / camelCase\"]", "  ROUTE[\"kebab-case route\"] --> HANDLER[\"GET / POST / PUT / PATCH / DELETE\"]", "  MODEL[\"Model PascalCase\"] --> COLLECTION[\"nom Mongo explicite ou dérivé\"]", "  REG[\"PREFIX-000\"] --> ENTRY[\"entrée de registre\"]"],
    ["Aucun linter de nommage commun n’est présent.", "Aucune migration ne normalise tous les noms de collections historiques.", "Aucun dictionnaire central de champs JSON n’est présent."]
  ),
  D("DOC-027", "Gestion des erreurs", "Référence des formats, validations, reprises et affichages d’erreur réellement implémentés.",
    ["Dashboard Admin", "PokemonGo-API-", "PokemonGo-Data"],
    ["PokemonGo-API-/src/middleware/errors.js", "PokemonGo-API-/src/lib/api-error.js", "Dashboard Admin/src/app/api", "Dashboard Admin/src/lib/trainer-pokemon/http.ts", "PokemonGo-Data/scripts"],
    ["api", "services", "datasets"], ["DOC-012", "DOC-020", "DOC-021", "DOC-028"],
    [["Erreur Express", "{ error: { code, message, requestId, details? } }"], ["Erreur trainer", "{ success:false, error:{ code, message, issues? } }"], ["Validation Learning", "Zod"], ["Validation trainer", "TrainerPokemonValidationError"], ["UI", "toasts Sonner et messages inline"], ["Error Boundary App Router", "0 fichier error.tsx ou global-error.tsx"]],
    ["ApiError transporte status, code et details; asyncHandler transmet au middleware central.", "Le middleware Express masque le message des erreurs 500 en production et inclut requestId dans la réponse.", "Les handlers Dashboard historiques emploient plusieurs formats JSON; securityError et les helpers learning/trainer conservent des statuts contrôlés.", "trainerPokemonServerError masque les 5xx, transforme 502 et 503 en messages fixes et conserve les issues de validation 400.", "Le pipeline current refuse les datasets vides ou invalides avant l’upsert et vérifie le read-back après écriture.", "Les composants affichent les erreurs via toast.error, role=alert ou états inline; aucune stratégie retry UI centrale n’est présente."],
    [["Erreur Express", "passe par", "middleware central"], ["Erreur Dashboard", "passe par", "catch du handler"], ["Erreur pipeline", "produit", "diagnostics et statut"], ["Réponse client", "alimente", "toast ou message inline"]],
    ["flowchart TD", "  E[\"Erreur\"] --> L{\"Couche\"}", "  L -->|Express| APIERR[\"ApiError + requestId\"]", "  L -->|Dashboard| LOCAL[\"Helper local\"]", "  L -->|Dataset| DIAG[\"Validation + diagnostics\"]", "  APIERR --> UI[\"Client\"]", "  LOCAL --> UI", "  DIAG --> UI"],
    ["Aucune taxonomie commune de codes ne couvre Express et Dashboard.", "Aucune Error Boundary applicative n’est présente.", "Aucun test de chaos réseau n’est présent."]
  ),
  D("DOC-028", "Journalisation", "Référence des logs HTTP, jobs, historiques MongoDB et messages console présents dans le code.",
    ["Dashboard Admin", "PokemonGo-API-", "PokemonGo-Data"],
    ["PokemonGo-API-/src/app.js", "PokemonGo-API-/src/middleware/request-id.js", "PokemonGo-API-/src/models/sync-run.js", "Dashboard Admin/src/lib/dashboard-store.ts", "Dashboard Admin/src/lib/trainer-pokemon/repository.ts"],
    ["mongo", "api", "dependencies"], ["DOC-017", "DOC-027", "DOC-029", "DOC-031"],
    [["HTTP API", "Morgan combined en production, dev sinon"], ["Corrélation Express", "X-Request-Id UUID ou valeur entrante"], ["Sync statique", "collection syncruns"], ["Current", "diagnostics document + console"], ["Dashboard metrics", "dashboard_api_metrics"], ["Trainer", "console.info import/rollback et console.error avant activation"]],
    ["Morgan écrit sur stdout; le middleware request-id renvoie X-Request-Id et les erreurs JSON reprennent cet identifiant.", "SyncRun enregistre statut, dates, durée, compteurs, changements et erreur du sync statique.", "Les pipelines current conservent source, hash, diff, compteurs, warnings et résultat de read-back.", "dashboard_api_metrics compte owner, jour, endpoint et méthode; les erreurs d’écriture sont avalées.", "Source Watch conserve au maximum 500 événements dans dashboard_store; Learning conserve activité, imports et versions.", "Le repository trainer journalise owner, snapshotId, count et préfixe de checksum lors d’une activation; l’échec journalise owner, snapshotId et count sans payload utilisateur."],
    [["Requête API", "écrit", "Morgan stdout"], ["Sync", "écrit", "syncruns"], ["Actions Dashboard", "écrivent", "métriques et historiques"], ["Import trainer", "écrit", "logs console et snapshots Mongo"]],
    ["flowchart LR", "  HTTP[\"Requête HTTP\"] --> MORGAN[\"Morgan stdout\"]", "  HTTP --> RID[\"X-Request-Id\"]", "  SYNC[\"Sync\"] --> RUN[\"syncruns\"]", "  DASH[\"Dashboard\"] --> METRICS[\"dashboard_api_metrics\"]", "  TRAINER[\"Import trainer\"] --> LOG[\"console + snapshots\"]"],
    ["Aucune destination centralisée de logs n’est configurée.", "Aucune durée de rétention stdout n’est codée.", "Aucun requestId Dashboard n’est présent.", "Aucune corrélation end-to-end Dashboard vers API et provider n’est présente."]
  ),
  D("DOC-029", "Monitoring", "Référence des surfaces de santé, métriques, diagnostics et alertes présentes ou absentes du code.",
    ["Dashboard Admin", "PokemonGo-API-"],
    ["PokemonGo-API-/src/app.js", "Dashboard Admin/src/app/api/pokemon-api-health/route.ts", "Dashboard Admin/src/components/admin/stats/database-stats.tsx", "Dashboard Admin/src/components/admin/pokemon/source-watch-panel.tsx"],
    ["api", "mongo", "components"], ["DOC-018", "DOC-022", "DOC-028", "DOC-030"],
    [["Santé API", "GET /health"], ["Proxy santé Dashboard", "GET /api/pokemon-api-health"], ["Statistiques Mongo Dashboard", "GET /api/database-stats"], ["Veille sources", "PAGE-037 / Source Watch"], ["Diagnostics current", "cinq panneaux publics + Shiny/PvP"], ["SDK observabilité externe", "0"]],
    ["GET /health renvoie état DB, uptime et timestamp.", "pokemon-api-health mesure la durée de la requête distante et renvoie les liens de documentation.", "DatabaseStats affiche statistiques de collections et ordre de widgets persistant.", "Les panneaux current affichent source, dates, hash, compteurs, diff et diagnostics issus des documents MongoDB.", "Source Watch compare signatures, ETag, commit ou dates et conserve un historique borné à 500 entrées.", "Les toasts signalent les erreurs pendant la session active; aucun canal externe n’envoie ces signaux."],
    [["Health", "alimente", "PokemonApiStatus"], ["Mongo stats", "alimente", "DatabaseStats"], ["Diagnostics", "alimentent", "panneaux Admin Pokémon"], ["Source Watch", "alimente", "veille privée"]],
    ["flowchart LR", "  API[\"/health\"] --> STATUS[\"PokemonApiStatus\"]", "  DB[\"/api/database-stats\"] --> DBUI[\"DatabaseStats\"]", "  CURRENT[\"Diagnostics current\"] --> PANELS[\"Panneaux Dashboard\"]", "  WATCH[\"Source Watch\"] --> HISTORY[\"Historique 500\"]", "  ALERT[\"Alerte externe absente\"] -.-> STATUS"],
    ["Aucun Sentry, OpenTelemetry, Datadog ou New Relic n’est présent.", "Aucun SLO ou SLI n’est codé.", "Aucun seuil d’alerte n’est codé.", "Aucun webhook, email ou canal de notification opérationnelle n’est présent."]
  ),
  D("DOC-030", "Checklist qualité", "Référence des contrôles réellement exécutables dans chaque dépôt et des étapes absentes des pipelines.",
    ["Les cinq dépôts"],
    ["Dashboard Admin/package.json", "PokemonGo-API-/package.json", "PokemonGo-Data/package.json", "Landing-Page-PogoApi/package.json", "PokemonGo-API-/.github/workflows", "PokemonGo-Data/.github/workflows"],
    ["api", "datasets", "components"], ["DOC-021", "DOC-025", "DOC-027", "DOC-031"],
    [["Dashboard npm run check", "lint puis build"], ["Dashboard contrôles séparés", "typecheck, test:admin-pokemon, test:trainer-pokemon, test:learning-flow"], ["API npm run check", "ensure:data, sync:dry, test, build"], ["Data contrôles", "tests séparés et commandes generate:*:check"], ["Landing", "build et script next lint"], ["Assets", "aucune commande qualité"]],
    ["Le prebuild Dashboard exécute validate:learning et ensure-data avant next build.", "Le typecheck Dashboard utilise tsc --noEmit mais n’est pas inclus dans check.", "Le test trainer couvre validation, normalisation, confidentialité, activation par pointeur et responsive source-level.", "API check exécute une chaîne complète locale; le workflow sync-mongodb n’appelle pas check.", "Data fournit des modes check pour raids, eggs, max-battles, rocket, research, shiny, pvp-rankings, assets et GameMaster selon package.json.", "Aucun workflow Dashboard, Landing ou Assets n’exécute ces contrôles dans le workspace."],
    [["Code Dashboard", "passe par", "lint/build et contrôles séparés"], ["Code API", "passe localement par", "ensure/dry/test/build"], ["Push Data", "déclenche", "dispatch sans test"], ["Sync Mongo", "exécute", "npm run sync sans gate"]],
    ["flowchart LR", "  DASH[\"Dashboard\"] --> DCHECK[\"lint + build\"]", "  API[\"API\"] --> ACHECK[\"ensure + dry + tests + build\"]", "  DATA[\"Data\"] --> TESTS[\"tests/checks séparés\"]", "  ACTION[\"Workflow sync\"] --> SYNC[\"mutation Mongo\"]", "  ACHECK -.-> SYNC"],
    ["Aucune gate CI commune aux cinq dépôts n’est présente.", "Aucun rapport de couverture n’est présent.", "Aucune validation automatique des assets n’est présente.", "Aucun contrôle d’accessibilité ou performance n’est présent dans check."]
  ),
  D("DOC-031", "Processus de release", "Référence des versions, changelogs, builds, workflows et mécanismes de déploiement codés.",
    ["Les cinq dépôts"],
    ["Dashboard Admin/package.json", "Dashboard Admin/CHANGELOG.md", "PokemonGo-API-/package.json", "PokemonGo-API-/CHANGELOG.md", "PokemonGo-Data/package.json", "PokemonGo-Data/CHANGELOG.md", "PokemonGo-API-/.github/workflows", "PokemonGo-Data/.github/workflows"],
    ["dependencies", "map"], ["DOC-005", "DOC-007", "DOC-021", "DOC-030"],
    [["Dashboard", "package 1.21.0; UI V1.21.0; changelog 1.21.0"], ["PokemonGo-API-", "package 1.7.0; OpenAPI 1.4.1; changelog 1.6.1"], ["PokemonGo-Data", "package 1.8.0; changelog 1.7.0"], ["Landing", "package 1.0.0; aucun changelog"], ["Assets", "aucun package ni changelog"], ["Tags Git locaux", "0 dans les cinq dépôts"]],
    ["Les versions de package et changelog sont modifiées manuellement; aucun outil de release n’est installé.", "Vercel construit Dashboard, Landing et API; les prebuild Dashboard/API exécutent ensure-data.", "Un push Data main sur les familles statiques appelle repository_dispatch vers l’API, puis le workflow API exécute npm ci et npm run sync.", "Le Dashboard expose une route privée de deploy hook Vercel, limitée à quatre requêtes par dix minutes et accompagnée d’un historique.", "Learning et la collection trainer possèdent un rollback applicatif de contenu ou de snapshot; le sync statique et les cinq current publics n’ont pas de rollback transactionnel.", "Aucun commit, push ou déploiement n’est exécuté par la génération de cette documentation."],
    [["Push Data", "déclenche", "repository_dispatch"], ["Action API", "exécute", "sync Mongo"], ["Build Vercel", "exécute", "ensure-data"], ["Bouton Dashboard", "appelle", "Deploy Hook"]],
    ["sequenceDiagram", "  participant Data as PokemonGo-Data", "  participant GA as GitHub Actions", "  participant API as PokemonGo-API", "  participant DB as MongoDB", "  Data->>GA: push main sur chemins statiques", "  GA->>API: repository_dispatch", "  API->>DB: npm run sync", "  Note over API,DB: aucun test dans le workflow"],
    ["Aucune politique SemVer écrite n’est présente.", "Aucun tag ou GitHub Release localement vérifiable n’est présent.", "Aucune promotion preview vers production n’est codée.", "Aucune procédure de rollback Vercel ou Atlas n’est présente."]
  ),
  D("DOC-032", "Cache local", "Référence de la persistance navigateur, de sa migration vers MongoDB Dashboard et des clés présentes dans le code.",
    ["Dashboard Admin"],
    ["Dashboard Admin/src/lib/use-persistent-state.ts", "Dashboard Admin/src/services/admin/dashboard-store.js", "Dashboard Admin/src/hooks/admin/use-javascript-learning.ts", "Dashboard Admin/src/components/admin"],
    ["services", "components", "mongo"], ["DOC-011", "DOC-017", "DOC-018", "DOC-027"],
    [["Clés matweb détectées", "29 chaînes de base"], ["Clés legacy pokedex-v4", "4"], ["Clés .hidden dynamiques", "une par grille SortableWidgetGrid"], ["Mode principal usePersistentState", "MongoDB dashboard_store"], ["Fallback", "localStorage"], ["Délai d’écriture Mongo", "450 ms"]],
    ["usePersistentState lit d’abord la valeur legacy localStorage, puis GET /api/dashboard-store?key= avec cache no-store.", "Si MongoDB est configuré et vide, le hook migre la valeur legacy, l’écrit en base puis supprime la clé navigateur.", "Si la route échoue ou indique une base non configurée, le hook utilise localStorage et l’état initial.", "Les familles matweb couvrent notes, todos, kanban, projects, calendar, writer, palette, pomodoro, learning, outils, ordres de widgets, sidebar, historique de version et déploiement, règles et contrôles Pokémon.", "Les clés legacy sont pokedex-v4-admin-collections, pokedex-v4-admin-todos, pokedex-v4-asset-checks et pokedex-v4-source-watch-signatures.", "Learning migre matweb.js.learning.progress vers matweb.js.learning.progress.v2 puis supprime les deux clés lorsque MongoDB accepte la migration."],
    [["Composant", "appelle", "usePersistentState"], ["Hook", "lit/écrit", "dashboard_store"], ["Base absente", "bascule vers", "localStorage"], ["Mongo configuré", "supprime après migration", "clé locale"]],
    ["flowchart TD", "  UI[\"Composant\"] --> HOOK[\"usePersistentState\"]", "  HOOK --> API[\"/api/dashboard-store\"]", "  API -->|configuré| DB[(\"dashboard_store\")]", "  API -->|absent/erreur| LS[\"localStorage\"]", "  LS -->|migration réussie| DB", "  DB --> CLEAN[\"suppression clé locale\"]"],
    ["Aucun TTL localStorage n’est présent.", "Aucune limite de quota par clé n’est présente.", "Aucune migration globale de schéma ne couvre toutes les clés.", "Aucun chiffrement navigateur n’est présent."]
  ),
  D("DOC-033", "Datasets publics et privés", "Référence de la visibilité effective des 20 datasets, 160 routes, 32 collections et 49 pages ou sections.",
    ["Les cinq dépôts"],
    ["PokemonGo-API-/src/routes", "PokemonGo-API-/src/current-datasets", "Dashboard Admin/src/app/api", "Dashboard Admin/src/proxy.ts"],
    ["datasets", "api", "mongo", "pages", "providers"], ["DOC-012", "DOC-016", "DOC-019", "DOC-020"],
    [["Routes publiques/techniques", "92"], ["Routes privées/admin", "67"], ["Route interne bloquée", "1"], ["Datasets avec sortie publique", "17"], ["Datasets privés", "DATASET-017, DATASET-019 et DATASET-020"], ["Collections", "16 exposées sélectivement, 15 privées, 1 interne"]],
    ["DATASET-001 à 016 et DATASET-018 ont une sortie publique, même lorsque leur dépôt source est privé.", "DATASET-017 Shiny exige le secret sur quatre lectures/mutations, utilise deux collections privées et reste absent d’OpenAPI.", "DATASET-019 Source Watch reste dans le Dashboard privé et dashboard_store.", "DATASET-020 collection du dresseur reste dans PAGE-049, API-157 à API-160 et COL-030 à COL-032; chaque handler vérifie session et rôle admin.", "La collection events est privée mais GET /api/events publie une projection métier cacheable.", "Le préfixe /admin de six lectures current ne les rend pas privées; les handlers GET restent publics selon le routeur."],
    [["Client public", "accède", "92 routes publiques/techniques"], ["Dashboard", "accède avec session", "35 routes privées Dashboard"], ["Dashboard BFF", "accède avec secret", "32 routes privées API"], ["Données trainer", "restent dans", "MongoDB Dashboard"]],
    ["flowchart LR", "  PUB[\"17 datasets avec sortie publique\"] --> API[\"92 routes publiques/techniques\"]", "  SHINY[\"DATASET-017\"] --> SECRET[\"Secret API\"]", "  WATCH[\"DATASET-019\"] --> SESSION[\"Session Dashboard\"]", "  TRAINER[\"DATASET-020\"] --> SESSION", "  SESSION --> PRIVATE[\"67 routes privées\"]"],
    ["Les ACL réelles des dépôts GitHub ne sont pas présentes dans le code local.", "L’exposition réseau Atlas n’est pas présente.", "Les droits de lecture des logs Vercel ne sont pas présents.", "Aucune fiche unitaire de visibilité n’est présente hors registres."]
  ),
  D("DOC-034", "Glossaire", "Définitions tirées des noms, structures et comportements présents dans le code de l’écosystème.",
    ["Les cinq dépôts et leurs registres"],
    ["Dashboard Admin/src", "PokemonGo-API-/src", "PokemonGo-Data", "PokemonGo-Assets-API", "audit-documentation/registries"],
    ["map", "dependencies"], ["DOC-005", "DOC-006", "DOC-013", "DOC-016", "DOC-017"],
    [["current", "Document MongoDB key=current pour un dataset dynamique"], ["référentiel statique", "JSON versionné dans PokemonGo-Data puis synchronisé"], ["provider", "Code qui collecte ou adapte une source externe ou fixture"], ["adapter", "Contrat d’un domaine current: modèle, validation, count, présentation"], ["read-back", "Relecture MongoDB après écriture avec contrôle du hash et du count"], ["snapshot", "Version persistée de données ou métadonnées avant activation ou historique"], ["sourceHash", "Empreinte canonique utilisée par sync et current"], ["BFF", "Handlers Dashboard qui appliquent session et relaient ou stockent des données"], ["owner", "Email de session utilisé pour isoler les documents Dashboard"], ["dataset privé", "Dataset dont les handlers exigent session ou secret"], ["asset", "Fichier média publié ou référence JSON vers ce fichier"], ["façade", "Fichier court qui réexporte un composant canonique"], ["dashboard_store", "Collection clé/valeur privée du Dashboard"], ["SyncRun", "Document de statut du sync statique"], ["Source Watch", "Catalogue et historique de signatures de sources"], ["stale", "Document absent de la source courante et supprimable par sync"], ["rootKey", "Clé racine exigée par un import current"], ["diagnostics", "Métadonnées de parsing, matching, diff, warnings et provenance"], ["activeSnapshotId", "Pointeur owner vers la collection trainer active"], ["OpenAPI", "Contrat public généré par src/docs/openapi.js"]],
    ["Les termes current, sourceHash, diagnostics et read-back sont des champs ou opérations des pipelines API.", "Les termes owner, dashboard_store et activeSnapshotId appartiennent aux repositories MongoDB Dashboard.", "Les identifiants PAGE, COMP, API, COL, DATASET, PROVIDER et ASSET sont attribués par les registres d’audit actuels.", "Le mot Assets dans PokemonGo-Assets-API désigne un dépôt GitHub de fichiers; aucun serveur applicatif propre n’est présent.", "Le terme privé décrit une barrière effective de handler ou de stockage, pas le seul nom d’un chemin.", "Le terme release décrit les versions de package, changelogs et déploiements présents, sans tag Git local."],
    [["Code", "définit", "termes runtime"], ["Registres", "définissent", "identifiants documentaires"], ["Documents Foundation", "emploient", "glossaire commun"]],
    ["flowchart LR", "  CODE[\"Code runtime\"] --> TERMS[\"Termes techniques\"]", "  REG[\"Registres JSON\"] --> IDS[\"IDs documentaires\"]", "  TERMS --> DOCS[\"Foundation\"]", "  IDS --> DOCS"],
    ["Aucun fichier de glossaire officiel distinct n’était présent avant DOC-034.", "Aucune traduction anglaise du glossaire n’est présente.", "Aucun propriétaire de terme n’est codé."]
  ),
  D("DOC-035", "Index des ADR", "Index de l’état réel des décisions architecturales et des fiches ADR présentes dans le workspace.",
    ["Les cinq dépôts", "Documentation Markdown"],
    ["PokemonGo-Data/.github/workflows/dispatch-api-sync.yml", "PokemonGo-API-/src/current-datasets/router.js", "Dashboard Admin/src/lib/session-token.ts", "Dashboard Admin/src/lib/trainer-pokemon/repository.ts", "audit-documentation/registries/documentation-map.json"],
    ["map", "dependencies"], ["DOC-006", "DOC-013", "DOC-019", "DOC-031", "DOC-033"],
    [["Fichiers ADR-*.md présents", "0"], ["Entrées ADR réservées dans documentation-map", "ADR-001 à ADR-010"], ["ADR formel accepté", "0"], ["Décisions encodées examinées", "10"], ["Liens vers fiches ADR", "0"], ["Statut", "absence explicite de fiches"]],
    ["PokemonGo-Data est la source versionnée des référentiels statiques; le workflow dispatch énumère les chemins concernés.", "MongoDB est la source runtime des current raids, eggs, max-battles, rocket et research; le routeur et le reader n’emploient pas les JSON locaux comme fallback.", "Shiny reste privé par adapter, secret, collections et absence OpenAPI.", "La session Dashboard utilise un cookie HMAC de 14 jours et un seul rôle admin.", "Le Dashboard relaie les mutations API avec un secret serveur et stocke ses domaines privés dans une base séparée.", "Le contrat formel dataset-provider reste limité à Shiny et PvP Rankings; les cinq current publics utilisent des générateurs directs.", "Le pipeline current emploie hash, diff, invalidation et read-back; Events conserve un fallback seeds distinct.", "Learning conserve une migration browser et un rollback de contenu.", "La collection trainer conserve les snapshots, vérifie le read-back et active un pointeur owner sans deleteMany.", "Les assets publics sont consommés par URL GitHub raw sur main.", "Ces dix décisions existent dans le code mais aucune ne possède une fiche ADR avec contexte, alternatives, décision et conséquences."],
    [["Décision codée", "est prouvée par", "fichier source"], ["documentation-map", "réserve", "ADR-001 à ADR-010"], ["Index", "ne crée aucun lien vers", "fiche absente"]],
    ["flowchart TD", "  CODE[\"10 décisions encodées\"] --> EVIDENCE[\"Fichiers sources\"]", "  MAP[\"ADR-001 à ADR-010 réservés\"] --> ABSENT[\"0 fiche ADR-*.md\"]", "  EVIDENCE --> INDEX[\"DOC-035\"]", "  ABSENT --> INDEX"],
    ["Les dates de décision ne sont pas présentes.", "Les alternatives évaluées ne sont pas présentes.", "Les propriétaires et approbateurs de décision ne sont pas présents.", "Les conséquences formalisées dans une fiche ADR ne sont pas présentes."]
  ),
];

function yamlList(values) {
  return values.map((value) => `  - ${JSON.stringify(value)}`).join("\n");
}

function table(rows, headers) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function render(document) {
  const relatedLinks = document.related.map((id) => `- [${id}](./${docFiles[id]})`).join("\n");
  const registryReferences = document.registries.map((name) => `- [Registre ${name}](${registryLinks[name]})`).join("\n");
  const specializedReferences = (specializedByDocument[document.id] || [])
    .map((id) => `- [${id}](<../Post-audit 2026-07-13/${specializedFiles[id]}>)`)
    .join("\n");
  const unitPrefixes = [...new Set(document.inventory.flatMap((row) => row[1].match(/\b(?:PAGE|COMP|API|COL|DATASET|PROVIDER|ASSET)-/g) || []))];
  const ficheNotice = unitPrefixes.length
    ? `\n\nLes identifiants non listés dans les fiches spécialisées ci-dessus renvoient uniquement aux registres JSON.`
    : "";
  return `---
id: ${document.id}
title: ${JSON.stringify(document.title)}
description: ${JSON.stringify(document.description)}
version: 2.0.0
status: Official
owner: Matthieu Vachet
created: 2026-07-13
last_updated: 2026-07-13
category: Foundation
type: Reference
language: fr
scope:
${yamlList(document.scope)}
source_files:
${yamlList(document.sources)}
registries:
${yamlList(document.registries.map((name) => `audit-documentation/registries/${path.basename(registryLinks[name])}`))}
related:
${yamlList(document.related)}
---

# ${document.id} — ${document.title}

## 1. Périmètre vérifié

${document.description}

Le contenu décrit l’état du code au 13 juillet 2026. Les builds, caches, archives et rapports historiques ne servent pas de preuve runtime lorsqu’un fichier source actif existe.

## 2. Inventaire du code

${table(document.inventory, ["Élément", "Constat vérifié"])}

## 3. Implémentation observée

${document.facts.map((fact) => `- ${fact}`).join("\n")}

## 4. Relations et dépendances

${table(document.relations, ["Source", "Relation", "Cible"])}

## 5. Diagramme vérifié

\`\`\`mermaid
${document.diagram.join("\n")}
\`\`\`

## 6. Références documentaires

### Documents Foundation

${relatedLinks}

### Registres actuels

${registryReferences}

### Fiches spécialisées présentes

${specializedReferences || "Aucune fiche spécialisée liée n’est présente."}${ficheNotice}

## 7. Informations absentes du code

${document.missing.map((fact) => `- ${fact}`).join("\n")}

## 8. Fichiers sources

${document.sources.map((source) => `- \`${source}\``).join("\n")}
`;
}

for (const document of documents) {
  const file = docFiles[document.id];
  if (!file) throw new Error(`Nom de fichier absent pour ${document.id}`);
  fs.writeFileSync(path.join(targetDirectory, file), render(document));
}

const index = `# Documentation Foundation officielle

État vérifié le 13 juillet 2026. Les documents DOC-011 à DOC-035 partagent le même front matter et les huit mêmes sections.

| ID | Document |
| --- | --- |
${documents.map((document) => `| ${document.id} | [${document.title}](./Tome%201%20%E2%80%94%20Foundation%20%28Fondations%29/${docFiles[document.id]}) |`).join("\n")}

Onze fiches spécialisées Post-audit existent pour PAGE-049, COMP-137, API-157 à API-160, COL-030 à COL-032, DATASET-020 et WORKFLOW-016. Les autres identifiants restent consultables dans les registres JSON du dossier audit-documentation/registries.
`;
fs.writeFileSync(path.join(repositoryRoot, "docs", "codex", "README.md"), index);

console.log(`${documents.length} documents Foundation et un index générés.`);
