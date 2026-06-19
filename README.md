# MatWeb Dashboard Admin

Dashboard personnel Next.js pour piloter les futurs projets MatWeb : notes, kanban, assistant IA, projets, calendrier, todo list, statistiques Pokemon GO API et design system Storybook.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS 4
- Framer Motion, Recharts, dnd-kit, lucide-react
- Storybook pour documenter les composants
- API OpenAI cote serveur via `OPENAI_API_KEY`

## Installation

```bash
npm install
npm run dev
```

Ouvre ensuite `http://localhost:3000`.

## Auth locale

Copie `.env.example` en `.env` puis change au minimum :

```bash
ADMIN_EMAIL=matthieu@example.com
ADMIN_PASSWORD=change-moi
SESSION_SECRET=une-valeur-longue
```

## Assistant IA

L'assistant ne connecte pas directement un compte ChatGPT. Il utilise l'API OpenAI cote serveur.

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
```

Ajoute les memes variables dans Vercel pour l'activer en production.

## Storybook

```bash
npm run storybook
npm run build-storybook
```

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
