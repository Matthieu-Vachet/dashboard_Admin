# MatWeb Dashboard Admin

Dashboard personnel Next.js pour piloter les futurs projets MatWeb : notes, kanban, projets, calendrier, todo list, outils quotidiens, statistiques Pokemon GO API, veille data et design system intégré.

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

## Raids Pokemon GO

La section `Pokemon Admin > Raids` lit `PokemonGo-Data/raids/currentRaids.json`
depuis le snapshot data du dashboard. Elle affiche les boss par bucket LeekDuck :
Ultra Beast, Mega, 5 etoiles, 3 etoiles, 1 etoile et Shadow.

Les boutons `Envoyer MongoDB` et `Regenerer raids` appellent les routes privees de
`PokemonGo-API` via le serveur dashboard. Ils exigent donc que
`POKEMON_API_ADMIN_SECRET` soit configure avec la meme valeur que `API_ADMIN_SECRET`
cote API.

## Oeufs Et Max Battles Pokemon GO

Les sections `Pokemon Admin > Oeufs` et `Pokemon Admin > Max Battles` lisent les
fichiers `PokemonGo-Data/eggs/currentEggs.json` et
`PokemonGo-Data/max-battles/currentsMaxBattle.json` depuis le snapshot data du
dashboard.

`Oeufs` affiche les categories LeekDuck, la rarete visuelle, le CP, le shiny,
les types et les assets locaux. `Max Battles` affiche les tiers Snacknap
dynamiques avec les formes Dynamax/Gigantamax locales quand elles existent.

Les boutons `Envoyer MongoDB` et `Regenerer` appellent les routes privees
`/api/v1/admin/eggs/*` et `/api/v1/admin/max-battles/*` via le serveur
dashboard. Ils utilisent aussi `POKEMON_API_ADMIN_SECRET`.

## Rocket Et Research Pokemon GO

Les sections `Pokemon Admin > Rocket` et `Pokemon Admin > Research` lisent les
fichiers `PokemonGo-Data/rocket/currentRocket.json` et
`PokemonGo-Data/research/currentResearch.json` depuis le snapshot data du
dashboard.

`Rocket` affiche Giovanni, les leaders et les grunts avec portraits Rocket
locaux, slots, rewards possibles, icones Shadow/Shiny, couleurs par profil et
phrases françaises depuis `PokemonGo-Data/rocket/rocketTexts.json`.
`Research` affiche les quetes par categorie dans des panneaux repliables avec
rewards Pokemon/items, CP, shiny, types et assets UI locaux. Les rewards items
sont relies a `PokemonGo-Data/items/items.json` quand un alias LeekDuck existe.

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

## Checks

```bash
npm run lint
npm run build
```
