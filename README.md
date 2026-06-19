# MatWeb Dashboard Admin

Dashboard personnel Next.js pour piloter les futurs projets MatWeb : notes, kanban, projets, calendrier, todo list, outils quotidiens, statistiques Pokemon GO API et design system Storybook.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS 4
- Framer Motion, Recharts, dnd-kit, lucide-react
- Storybook pour documenter les composants
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

Le widget consomme `POKEMON_API_URL`.

```bash
POKEMON_API_URL=https://pokemon-go-7r5q2j05a-matthieu-vachets-projects.vercel.app/api/checklist-v3
```

## Storybook

```bash
npm run storybook
npm run build-storybook
```

Le build Storybook est servi directement dans le dashboard via `/storybook/index.html`.

Les premiers composants documentes :

- `Design System/Button`
- `Design System/Badge`
- `Design System/Card`
- `Dashboard/StatCard`

## Checks

```bash
npm run lint
npm run build
```
