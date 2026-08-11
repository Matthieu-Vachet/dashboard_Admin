# MatWeb Dashboard Admin

Dashboard personnel Next.js pour piloter les futurs projets MatWeb : notes, kanban, projets, calendrier, todo list, outils quotidiens, statistiques Pokemon GO API, veille data et design system intégré.

La section Admin Pokémon regroupe les classements PvPoke enrichis, une checklist PvP persistée par compte dans `dashboard_store`, le calendrier public des rotations GBL Battleflow et un centre unique de vérification Disponibilité, Chromatiques, Costumes et Shadow. Les données métier restent lues depuis PokemonGo-API/MongoDB ; aucune liste de classement, URL d’asset XL ou identité externe n’est reconstruite dans l’interface.

L’encyclopédie d’architecture est indexée dans [`docs/TOME-INDEX.md`](docs/TOME-INDEX.md). Les Tomes 1 à 14 couvrent fondations, Dashboard, Design System, architecture, providers, datasets, API, MongoDB, assets, tests, performance, responsive, sécurité et roadmap. `npm run test:docs` contrôle leur présence, leurs IDs et leurs liens.

La résolution canonique des Assets et fiches PvP par catégories `normal`, `forms`,
`mega`, `dynamax` et `gigantamax`, ainsi que les diagnostics de l’Engine et le rollback,
sont décrits dans [`docs/ENTITY-CATEGORY-ARCHITECTURE.md`](docs/ENTITY-CATEGORY-ARCHITECTURE.md).
Le runbook transversal, la matrice des 16 régénérations, les compteurs Engine finaux,
le versionnement et le rollback coordonné sont dans
[`docs/POST-MIGRATION-STABILIZATION.md`](docs/POST-MIGRATION-STABILIZATION.md).

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS 4
- Framer Motion, Recharts, dnd-kit, lucide-react
- GSAP pour les animations d'interface

## Installation

```bash
npm install
npm run dev
```

Ouvre ensuite `http://localhost:3000`.

## Auth locale et production

Copie `.env.example` en `.env` puis change au minimum :

```bash
ADMIN_EMAIL=matthieu@example.com
ADMIN_PASSWORD=change-moi
SESSION_SECRET=une-valeur-longue
```

En production, le dashboard refuse la connexion si `ADMIN_EMAIL`, `ADMIN_PASSWORD` ou `SESSION_SECRET` ne sont pas définis dans Vercel.

## Statistiques Pokemon GO API

Les widgets de lecture publique consomment `POKEMON_API_URL` et `POKEMON_API_PUBLIC_URL`.

```bash
POKEMON_API_URL=https://pokemon-go-7r5q2j05a-matthieu-vachets-projects.vercel.app/api/checklist-v3
POKEMON_API_PUBLIC_URL=https://pokemon-go-api.vercel.app
```

Les endpoints publics de `PokemonGo-API` n'ont pas besoin du secret admin. Si le
dashboard doit appeler une route privee de `PokemonGo-API`, ajoute dans Vercel
Dashboard Admin une variable serveur :

```bash
POKEMON_API_ADMIN_SECRET=meme-valeur-que-API_ADMIN_SECRET-cote-pokemon-go-api
```

Cette variable ne doit jamais etre prefixee par `NEXT_PUBLIC_`. Le dashboard l'utilise
uniquement dans ses routes serveur pour envoyer le header `x-api-admin-secret`.

## Snapshot PokemonGo-Data

En local, le Dashboard résout les données dans cet ordre : `POKEMON_GO_DATA_DIR` lorsqu’il est défini, le snapshot `.data/PokemonGo-Data` créé au build, puis le dépôt workspace voisin `../PokemonGo-Data`. Un chemin explicite invalide provoque une erreur ; il n’est jamais remplacé silencieusement par une autre copie.

Sur Vercel, ne configurez pas `POKEMON_GO_DATA_DIR` avec un chemin de machine. Le `prebuild` clone la révision demandée dans `.data/PokemonGo-Data`, puis Next.js embarque le marqueur du dépôt et les seules familles requises par chaque Function. Configurez plutôt `POKEMON_GO_DATA_REPO`, `POKEMON_GO_DATA_REF` et, pour le dépôt privé, `POKEMON_GO_DATA_TOKEN`.

## Régénération PvP

Le suivi des classements PvP distingue `idle`, `running`, `success`, `partial`, `failed` et `cancelled`. Un résultat `partial` signifie que les classements valides ont été persistés et relus depuis MongoDB, avec des diagnostics résiduels ; il affiche les nombres générés, ignorés, `MAPPING_MISSING` et `WARNING`, un accès au rapport et une action de relance. `failed` et `cancelled` interrompent le parcours sans résultat réussi, tout en restant deux états distincts.

## Raids Pokemon GO

La section `Pokemon Admin > Raids` lit `PokemonGo-Data/data/battles/raids/current.json`
depuis le snapshot data du dashboard. Elle affiche les boss par bucket LeekDuck :
Ultra Beast, Mega, 5 etoiles, 3 etoiles, 1 etoile et Shadow.

Les boutons `Envoyer MongoDB` et `Regenerer raids` appellent les routes privees de
`PokemonGo-API` via le serveur dashboard. Ils exigent donc que
`POKEMON_API_ADMIN_SECRET` soit configure avec la meme valeur que `API_ADMIN_SECRET`
cote API.

## Oeufs Et Max Battles Pokemon GO

Les sections `Pokemon Admin > Oeufs` et `Pokemon Admin > Max Battles` lisent les
fichiers `PokemonGo-Data/data/activities/eggs/current.json` et
`PokemonGo-Data/data/battles/max-battles/current.json` depuis le snapshot data du
dashboard.

`Oeufs` affiche les categories LeekDuck, la rarete visuelle, le CP, le shiny,
les types et les assets locaux. `Max Battles` affiche les tiers Snacknap
dynamiques avec les formes Dynamax/Gigantamax locales quand elles existent.

Les boutons `Envoyer MongoDB` et `Regenerer` appellent les routes privees
`/api/v1/admin/eggs/*` et `/api/v1/admin/max-battles/*` via le serveur
dashboard. Ils utilisent aussi `POKEMON_API_ADMIN_SECRET`.

## Rocket Et Research Pokemon GO

Les sections `Pokemon Admin > Rocket` et `Pokemon Admin > Research` lisent les
fichiers `PokemonGo-Data/data/battles/rocket/current.json` et
`PokemonGo-Data/data/activities/research/current.json` depuis le snapshot data du
dashboard.

`Rocket` affiche Giovanni, les leaders et les grunts avec portraits Rocket
locaux, slots, rewards possibles, icones Shadow/Shiny, couleurs par profil et
phrases françaises depuis `PokemonGo-Data/data/battles/rocket/texts.json`.
`Research` affiche les quetes par categorie dans des panneaux repliables avec
rewards Pokemon/items, CP, shiny, types et assets UI locaux. Les rewards items
sont relies a `PokemonGo-Data/data/reference/items/items.json` quand un alias LeekDuck existe.

Les boutons `Envoyer MongoDB` et `Regenerer` appellent les routes privees
`/api/v1/admin/rocket/*` et `/api/v1/admin/research/*` via le serveur
dashboard. Ils utilisent aussi `POKEMON_API_ADMIN_SECRET`.

## Calendrier Events Pokemon GO

La section `Pokemon Admin > Calendrier Events` ajoute une vue mensuelle et une vue liste
des evenements Pokemon GO, avec filtres par type, statut, date et recherche texte.

Les donnees sont lues par `GET /api/events`. Les actions admin utilisent les routes
protegees `POST /api/admin/events`, `PATCH /api/admin/events/:id`,
`DELETE /api/admin/events/:id`, `POST /api/admin/events/scrape` et
`POST /api/admin/events/import`.

Le bouton `Rescraper Events` lit LeekDuck Events, s'appuie sur ScrapedDuck pour les
details publics disponibles, matche les Pokemon avec les donnees locales et upsert la
collection MongoDB `events`. La reponse contient un rapport avec events recuperes,
events ignores, Pokemon matches/non matches et images recuperees.

Les events sont stockes dans la collection MongoDB `events` du dashboard. Si MongoDB n'est
pas configure, l'API publique renvoie des seeds de lecture, mais le CRUD admin necessite
`DASHBOARD_MONGODB_URI` ou `MONGODB_URI`.

Le format attendu est documente dans `src/data/pokemon-docs/EVENTS-CALENDAR.md`.

## Architecture Admin

La structure refactorisee du dashboard admin est documentee dans
`docs/ADMIN-ARCHITECTURE.md`. Les nouveaux composants doivent vivre dans
`src/components/admin/*`; les anciens chemins `src/components/dashboard/*`,
`src/components/pokemon-admin/*` et `src/components/checklist/*` servent seulement de
facades de compatibilite.

## Centre de contrôle Discord Bot

La route privée `/discord-bot` supervise le bot Discord via un contrat
opérationnel read-only. Le navigateur ne communique jamais directement avec
Discord et ne reçoit aucun secret. Pour activer la liaison, configurer uniquement
côté serveur :

```bash
DISCORD_BOT_OPERATIONS_URL=https://bot-interne.example.com/v1/overview
DISCORD_BOT_OPERATIONS_SECRET=meme-secret-long-que-cote-bot
```

Sans ces variables, le module reste accessible et indique honnêtement que les
métriques ne sont pas disponibles. L’architecture et la roadmap sont décrites dans
[`docs/Discord Bot Control Center`](docs/Discord%20Bot%20Control%20Center/README.md).

## Checks

```bash
npm run validate:learning
npm run typecheck
npm run lint
npm run test:docs
npm run build
```

## JS Progress V2

Le parcours JavaScript est décrit par `src/data/learning/curriculum.json` et des thèmes conformes au schéma V1. En production, le contenu peut être importé dans MongoDB depuis la page JS Progress ; progression, activité et imports utilisent des collections séparées.

Le modèle officiel, les règles d’identifiants, les stratégies d’import et le rollback sont documentés dans `CONTRIBUTING-LEARNING.md`.
