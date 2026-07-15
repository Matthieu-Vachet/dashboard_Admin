# Project architecture

## Scope

This specification covers only `Dashboard Admin`. It records the current implementation without redesign, refactor or optimization.

## Runtime architecture

- Framework: Next.js App Router (`next: latest` in package.json).
- React: `react: latest`.
- Styling: Tailwind CSS 4 imported through `@import "tailwindcss"` plus 669 lines of global CSS.
- Theme: class-driven light override over a dark `:root` default; `next-themes` provider.
- UI composition: 325 detected React component identities, including internal definitions and compatibility paths.
- Data/state: React state/hooks, local persistence utilities, route handlers and external Pokémon data APIs.
- Drag and drop: @dnd-kit.
- Charts: Recharts.
- Notifications: Sonner.

## External packages imported by UI source

- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`
- `@radix-ui/react-slot`
- `cheerio`
- `clsx`
- `date-fns`
- `date-fns/locale`
- `domhandler`
- `framer-motion`
- `lucide-react`
- `mongodb`
- `next`
- `next-themes`
- `next/headers`
- `next/image`
- `next/link`
- `next/navigation`
- `next/server`
- `node:crypto`
- `node:fs`
- `node:fs/promises`
- `node:path`
- `react`
- `react-dom`
- `recharts`
- `sonner`
- `tailwind-merge`
- `zod`

## State and data references

- Hook identifiers: `useCallback`, `useDashboardPalette`, `useDashboardVersionHistory`, `useDroppable`, `useEffect`, `useJavascriptLearning`, `useMemo`, `usePathname`, `usePersistentState`, `useSensor`, `useSensors`, `useSortable`, `useState`, `useTheme`.
- localStorage keys statically extracted: `matweb-theme`, `matweb.analytics.widgets`, `matweb.home.widgetOrder`, `matweb.mongo.widgetOrder`, `matweb.pokemonAdmin.widgetOrder`, `matweb.tools.widgets`.
- API references statically extracted: `/api/admin/events`, `/api/admin/events/import`, `/api/admin/events/scrape`, `/api/checklist-v3`, `/api/dashboard-backlog`, `/api/dashboard-backlog/${editingId}`, `/api/dashboard-backlog/${ticket.id}`, `/api/dashboard-redeploy`, `/api/dashboard-store`, `/api/data`, `/api/database-stats`, `/api/events`, `/api/learning`, `/api/learning/activity`, `/api/learning/export?scope=achievements`, `/api/learning/export?scope=all`, `/api/learning/export?scope=curriculum`, `/api/learning/export?scope=projects`, `/api/learning/import`, `/api/learning/imports`, `/api/learning/progress`, `/api/learning/progress/migrate`, `/api/learning/topics`, `/api/logout`, `/api/moves`, `/api/pokemon`, `/api/pokemon-admin`, `/api/pokemon-api-health`, `/api/pokemon-api-proxy`, `/api/pokemon-stats`, `/api/session`, `/api/types`, `/api/v1`, `/api/v1/admin/`, `/api/v1/admin/${domain}/regenerate`, `/api/v1/admin/eggs/regenerate`, `/api/v1/admin/max-battles/regenerate`, `/api/v1/admin/pvp-rankings/regenerate`, `/api/v1/admin/raids/regenerate`, `/api/v1/admin/research/regenerate`, `/api/v1/admin/rocket/regenerate`, `/api/v1/admin/shiny/regenerate`, `/api/v1/eggs`, `/api/v1/max-battles`, `/api/v1/raids`, `/api/v1/research`, `/api/v1/rocket`, `/api/v1/shiny`.

## Reconstruction boundary

Backend behavior, production data, authentication secrets, runtime viewport rendering and network responses are outside the static design-system evidence. Where necessary they are marked Not found or Estimated from implementation.
