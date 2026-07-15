# Folder structure, routing and layouts

## Routes and layouts

| ID | Route/scope | Type | Source | Root component IDs |
|---|---|---|---|---|
| MWI-PAGE-001 | /account | page | `src/app/(dashboard)/account/page.tsx` | MWI-COMP-001 |
| MWI-PAGE-002 | /analytics | page | `src/app/(dashboard)/analytics/page.tsx` | MWI-COMP-002 |
| MWI-PAGE-003 | /calendar | page | `src/app/(dashboard)/calendar/page.tsx` | MWI-COMP-003 |
| MWI-PAGE-004 | /database | page | `src/app/(dashboard)/database/page.tsx` | MWI-COMP-004 |
| MWI-PAGE-005 | /exercices-javascript | page | `src/app/(dashboard)/exercices-javascript/page.tsx` | MWI-COMP-005 |
| MWI-PAGE-006 | /js-progress | page | `src/app/(dashboard)/js-progress/page.tsx` | MWI-COMP-006 |
| MWI-PAGE-007 | /kanban | page | `src/app/(dashboard)/kanban/page.tsx` | MWI-COMP-007 |
| MWI-PAGE-008 | /notes | page | `src/app/(dashboard)/notes/page.tsx` | MWI-COMP-009 |
| MWI-PAGE-009 | / | page | `src/app/(dashboard)/page.tsx` | MWI-COMP-010 |
| MWI-PAGE-010 | /palette | page | `src/app/(dashboard)/palette/page.tsx` | MWI-COMP-011 |
| MWI-PAGE-011 | /pokemon-admin | page | `src/app/(dashboard)/pokemon-admin/page.tsx` | MWI-COMP-012 |
| MWI-PAGE-012 | /pokemon-docs | page | `src/app/(dashboard)/pokemon-docs/page.tsx` | MWI-COMP-013 |
| MWI-PAGE-013 | /pomodoro | page | `src/app/(dashboard)/pomodoro/page.tsx` | MWI-COMP-014 |
| MWI-PAGE-014 | /projects | page | `src/app/(dashboard)/projects/page.tsx` | MWI-COMP-015 |
| MWI-PAGE-015 | /snippets | page | `src/app/(dashboard)/snippets/page.tsx` | MWI-COMP-016 |
| MWI-PAGE-016 | /todo | page | `src/app/(dashboard)/todo/page.tsx` | MWI-COMP-017 |
| MWI-PAGE-017 | /tools/dashboard-backlog | page | `src/app/(dashboard)/tools/dashboard-backlog/page.tsx` | MWI-COMP-018 |
| MWI-PAGE-018 | /tools | page | `src/app/(dashboard)/tools/page.tsx` | MWI-COMP-019 |
| MWI-PAGE-019 | /writer | page | `src/app/(dashboard)/writer/page.tsx` | MWI-COMP-020 |
| MWI-PAGE-020 | /login | page | `src/app/login/page.tsx` | MWI-COMP-022 |
| MWI-LAYOUT-001 | / | layout | `src/app/(dashboard)/layout.tsx` | MWI-COMP-008 |
| MWI-LAYOUT-002 | / | layout | `src/app/layout.tsx` | MWI-COMP-021 |

## Complete source tree

- `src/app/(dashboard)/account/page.tsx`
- `src/app/(dashboard)/analytics/page.tsx`
- `src/app/(dashboard)/calendar/page.tsx`
- `src/app/(dashboard)/database/page.tsx`
- `src/app/(dashboard)/exercices-javascript/page.tsx`
- `src/app/(dashboard)/js-progress/page.tsx`
- `src/app/(dashboard)/kanban/page.tsx`
- `src/app/(dashboard)/layout.tsx`
- `src/app/(dashboard)/notes/page.tsx`
- `src/app/(dashboard)/page.tsx`
- `src/app/(dashboard)/palette/page.tsx`
- `src/app/(dashboard)/pokemon-admin/page.tsx`
- `src/app/(dashboard)/pokemon-docs/page.tsx`
- `src/app/(dashboard)/pomodoro/page.tsx`
- `src/app/(dashboard)/projects/page.tsx`
- `src/app/(dashboard)/snippets/page.tsx`
- `src/app/(dashboard)/todo/page.tsx`
- `src/app/(dashboard)/tools/dashboard-backlog/page.tsx`
- `src/app/(dashboard)/tools/page.tsx`
- `src/app/(dashboard)/writer/page.tsx`
- `src/app/api/admin/events/[id]/route.ts`
- `src/app/api/admin/events/import/route.ts`
- `src/app/api/admin/events/route.ts`
- `src/app/api/admin/events/scrape/route.ts`
- `src/app/api/dashboard-backlog/[id]/route.ts`
- `src/app/api/dashboard-backlog/route.ts`
- `src/app/api/dashboard-redeploy/route.ts`
- `src/app/api/dashboard-store/route.ts`
- `src/app/api/database-stats/route.ts`
- `src/app/api/events/route.ts`
- `src/app/api/learning/activity/route.ts`
- `src/app/api/learning/export/route.ts`
- `src/app/api/learning/import/route.ts`
- `src/app/api/learning/imports/[id]/rollback/route.ts`
- `src/app/api/learning/imports/route.ts`
- `src/app/api/learning/progress/migrate/route.ts`
- `src/app/api/learning/progress/route.ts`
- `src/app/api/learning/topics/[id]/route.ts`
- `src/app/api/learning/topics/route.ts`
- `src/app/api/logout/route.ts`
- `src/app/api/pokemon-admin/route.ts`
- `src/app/api/pokemon-api-health/route.ts`
- `src/app/api/pokemon-api-proxy/route.ts`
- `src/app/api/pokemon-stats/route.ts`
- `src/app/api/session/route.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/login/page.tsx`
- `src/components/admin/cards/pokemon-widget.tsx`
- `src/components/admin/cards/stat-card.tsx`
- `src/components/admin/dashboard/color-lab.tsx`
- `src/components/admin/dashboard/daily-tools.tsx`
- `src/components/admin/dashboard/dashboard-home-live.tsx`
- `src/components/admin/dashboard/pomodoro.tsx`
- `src/components/admin/dashboard/snippet-vault.tsx`
- `src/components/admin/events/event-editor-modal.jsx`
- `src/components/admin/events/events-calendar-panel.jsx`
- `src/components/admin/forms/calendar-planner.tsx`
- `src/components/admin/forms/javascript-exercises.tsx`
- `src/components/admin/forms/js-progress.tsx`
- `src/components/admin/forms/kanban-board.tsx`
- `src/components/admin/forms/notes-board.tsx`
- `src/components/admin/forms/todo-list.tsx`
- `src/components/admin/forms/writer-studio.tsx`
- `src/components/admin/layout/admin-app-frame.tsx`
- `src/components/admin/layout/admin-providers.tsx`
- `src/components/admin/layout/admin-version-history-dialog.tsx`
- `src/components/admin/learning/learning-achievement-grid.tsx`
- `src/components/admin/learning/learning-activity.tsx`
- `src/components/admin/learning/learning-advanced-stats.tsx`
- `src/components/admin/learning/learning-detail-modal.tsx`
- `src/components/admin/learning/learning-import-modal.tsx`
- `src/components/admin/learning/learning-progress-bar.tsx`
- `src/components/admin/learning/learning-summary.tsx`
- `src/components/admin/learning/learning-topic-card.tsx`
- `src/components/admin/navigation/admin-palette-selector.tsx`
- `src/components/admin/navigation/admin-sidebar.tsx`
- `src/components/admin/navigation/admin-topbar.tsx`
- `src/components/admin/pokemon/admin-app.d.ts`
- `src/components/admin/pokemon/admin-app.jsx`
- `src/components/admin/pokemon/admin-section-navigation.jsx`
- `src/components/admin/pokemon/admin-todo-panel.jsx`
- `src/components/admin/pokemon/admin-ui.jsx`
- `src/components/admin/pokemon/asset-icons.jsx`
- `src/components/admin/pokemon/background-panel.jsx`
- `src/components/admin/pokemon/candy-panel.jsx`
- `src/components/admin/pokemon/catalog-panel.jsx`
- `src/components/admin/pokemon/collections-panel.jsx`
- `src/components/admin/pokemon/current-dataset-diagnostics.jsx`
- `src/components/admin/pokemon/dataset-event-banner.jsx`
- `src/components/admin/pokemon/dataset-filter-bar.jsx`
- `src/components/admin/pokemon/dataset-source-header.jsx`
- `src/components/admin/pokemon/detail-modal.jsx`
- `src/components/admin/pokemon/eggs-panel.jsx`
- `src/components/admin/pokemon/events-calendar-panel.jsx`
- `src/components/admin/pokemon/login-card.jsx`
- `src/components/admin/pokemon/max-battles-panel.jsx`
- `src/components/admin/pokemon/pokemon-admin-studio.tsx`
- `src/components/admin/pokemon/pokemon-api-explorer.tsx`
- `src/components/admin/pokemon/pokemon-api-status.tsx`
- `src/components/admin/pokemon/pokemon-card.jsx`
- `src/components/admin/pokemon/pokemon-docs-viewer.tsx`
- `src/components/admin/pokemon/pvp-rankings-panel.jsx`
- `src/components/admin/pokemon/raids-panel.jsx`
- `src/components/admin/pokemon/research-panel.jsx`
- `src/components/admin/pokemon/rocket-panel.jsx`
- `src/components/admin/pokemon/shiny-tracker-panel.jsx`
- `src/components/admin/pokemon/source-watch-panel.tsx`
- `src/components/admin/pokemon/tier-section.jsx`
- `src/components/admin/pokemon/update-log-panel.jsx`
- `src/components/admin/shared/dashboard-footer.tsx`
- `src/components/admin/shared/loading-state.tsx`
- `src/components/admin/shared/modal-portal.jsx`
- `src/components/admin/shared/sortable-widget-grid.tsx`
- `src/components/admin/stats/dashboard-charts.tsx`
- `src/components/admin/stats/database-stats.tsx`
- `src/components/admin/stats/learning-analytics.tsx`
- `src/components/admin/stats/pokemon-analytics.tsx`
- `src/components/admin/tables/dashboard-backlog.tsx`
- `src/components/checklist/detail-modal.jsx`
- `src/components/checklist/pokemon-card.jsx`
- `src/components/dashboard/app-frame.tsx`
- `src/components/dashboard/calendar-planner.tsx`
- `src/components/dashboard/color-lab.tsx`
- `src/components/dashboard/daily-tools.tsx`
- `src/components/dashboard/dashboard-backlog.tsx`
- `src/components/dashboard/dashboard-charts.tsx`
- `src/components/dashboard/dashboard-footer.tsx`
- `src/components/dashboard/dashboard-home-live.tsx`
- `src/components/dashboard/database-stats.tsx`
- `src/components/dashboard/javascript-exercises.tsx`
- `src/components/dashboard/js-progress.tsx`
- `src/components/dashboard/kanban-board.tsx`
- `src/components/dashboard/learning-analytics.tsx`
- `src/components/dashboard/loading-state.tsx`
- `src/components/dashboard/notes-board.tsx`
- `src/components/dashboard/pokemon-analytics.tsx`
- `src/components/dashboard/pokemon-api-explorer.tsx`
- `src/components/dashboard/pokemon-api-status.tsx`
- `src/components/dashboard/pokemon-docs-viewer.tsx`
- `src/components/dashboard/pokemon-widget.tsx`
- `src/components/dashboard/pomodoro.tsx`
- `src/components/dashboard/providers.tsx`
- `src/components/dashboard/snippet-vault.tsx`
- `src/components/dashboard/sortable-widget-grid.tsx`
- `src/components/dashboard/stat-card.tsx`
- `src/components/dashboard/todo-list.tsx`
- `src/components/dashboard/writer-studio.tsx`
- `src/components/pokemon-admin/admin-app.jsx`
- `src/components/pokemon-admin/admin-ui.jsx`
- `src/components/pokemon-admin/asset-icons.jsx`
- `src/components/pokemon-admin/candy-panel.jsx`
- `src/components/pokemon-admin/catalog-panel.jsx`
- `src/components/pokemon-admin/collections-panel.jsx`
- `src/components/pokemon-admin/eggs-panel.jsx`
- `src/components/pokemon-admin/events-calendar-panel.jsx`
- `src/components/pokemon-admin/login-card.jsx`
- `src/components/pokemon-admin/max-battles-panel.jsx`
- `src/components/pokemon-admin/pokemon-admin-studio.tsx`
- `src/components/pokemon-admin/raids-panel.jsx`
- `src/components/pokemon-admin/research-panel.jsx`
- `src/components/pokemon-admin/rocket-panel.jsx`
- `src/components/pokemon-admin/source-watch-panel.tsx`
- `src/components/pokemon-admin/update-log-panel.jsx`
- `src/components/site/metric-card.jsx`
- `src/components/site/pokemon-style.js`
- `src/components/site/ui-assets.js`
- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/modal.tsx`
- `src/constants/admin/dashboard-palettes.ts`
- `src/constants/admin/learning.ts`
- `src/constants/admin/navigation.ts`
- `src/data/app-version.ts`
- `src/data/daily-code-tips.ts`
- `src/data/dashboard-palettes.ts`
- `src/data/dashboard-version-history.ts`
- `src/data/dashboard.ts`
- `src/data/javascript-learning.ts`
- `src/data/learning/arrays.json`
- `src/data/learning/async.json`
- `src/data/learning/curriculum.json`
- `src/data/learning/dom.json`
- `src/data/learning/functions.json`
- `src/data/learning/javascript.json`
- `src/data/learning/migrations/v1-legacy-content-status.snapshot.json`
- `src/data/learning/objects.json`
- `src/data/learning/template-project.json`
- `src/data/learning/template-topic.json`
- `src/data/personal-dashboard-defaults.ts`
- `src/data/pokemon-docs/API.md`
- `src/data/pokemon-docs/DATA-NORMALIZATION.md`
- `src/data/pokemon-docs/EVENTS-CALENDAR.md`
- `src/data/pokemon-docs/GIT-WORKFLOW.md`
- `src/data/pokemon-docs/JAVASCRIPT-FILES.md`
- `src/data/pokemon-docs/MAINTENANCE.md`
- `src/data/pokemon-docs/PROJECT-STRUCTURE.md`
- `src/data/pokemon-docs/SCHEMA.md`
- `src/data/pokemon-docs/SHUFFLE-NAMING-CONVENTION.md`
- `src/data/pokemon-docs/TEMPLATES.md`
- `src/data/pokemon-events.ts`
- `src/hooks/admin/use-dashboard-palette.ts`
- `src/hooks/admin/use-dashboard-version-history.ts`
- `src/hooks/admin/use-javascript-learning.ts`
- `src/lib/auth.ts`
- `src/lib/cn.ts`
- `src/lib/dashboard-store.ts`
- `src/lib/learning/http.ts`
- `src/lib/learning/javascript.ts`
- `src/lib/learning/repository.ts`
- `src/lib/learning/schema.ts`
- `src/lib/leekduck-events-scraper.ts`
- `src/lib/pokemon.ts`
- `src/lib/security.ts`
- `src/lib/session-token.ts`
- `src/lib/use-persistent-state.ts`
- `src/proxy.ts`
- `src/server/pokemon-go/apps/checklist/server/custom-rules.js`
- `src/server/pokemon-go/apps/checklist/server/engine.js`
- `src/server/pokemon-go/apps/checklist/server/source-watch.js`
- `src/server/pokemon-go/apps/checklist/server/workshop.js`
- `src/server/pokemon-go/src/lib/data-repository.js`
- `src/server/pokemon-go/src/lib/github-data-sync.js`
- `src/server/pokemon-go/src/lib/pokemon-cp.js`
- `src/server/pokemon-go/src/lib/site-dashboard.js`
- `src/services/admin/dashboard-store.js`
- `src/services/admin/events-api.js`
- `src/services/admin/learning-api.ts`
- `src/services/admin/pokemon-admin-api.js`
- `src/types/admin/dashboard.ts`
- `src/types/admin/learning.ts`
- `src/utils/admin/pokemon-entries.js`
- `src/utils/admin/source-watch.js`

## Routing behavior

- Route groups such as `(dashboard)` do not contribute a URL segment.
- The protected dashboard layout wraps its child routes; authentication behavior is implementation-dependent and documented in architecture/state references.
- Exact runtime redirects and access outcomes without a session: Estimated from implementation.
