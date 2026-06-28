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

## Checks

```bash
npm run lint
npm run build
```
