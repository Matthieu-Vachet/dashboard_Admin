# Inventaire de la famille Badge

Date du relevé : 13 juillet 2026, avant migration source du Sprint Famille.

## Méthode et périmètre

L’unité de recensement est un site JSX d’implémentation : chaque appel à la primitive canonique, et chaque élément local pill-shaped combinant une forme `rounded-full` avec un padding horizontal. `TypeBadge` et `WeatherBadge` sont ajoutés explicitement malgré leurs rayons `rounded-xl`/`rounded-lg`, car leur identité visuelle et leur nom appartiennent à la famille. Les lignes sont celles du code initial.

Le scan couvre tout `src/**/*.tsx` et `src/**/*.jsx`, puis chaque candidat est classé une seule fois. Les helpers textuels contenant `Label`, les charts/status panels, `InfoPill` (carte rectangulaire), `StatusIcons` (collection d’icônes), `ReleaseStatusGrid` et les variables dynamiques `Tag` de titres ont été inspectés : ce sont des faux positifs de recherche sans site visuel de badge autonome, donc ils ne gonflent pas le total.

## Synthèse initiale

| Mesure | Total |
|---|---:|
| Sites détectés | 205 |
| Utilisent déjà `Badge` canonique | 68 |
| Implémentations locales | 137 |
| A — statique migrable/déjà consolidé | 68 |
| B — métier composable | 100 |
| C — faux badge interactif | 13 |
| D — ambigu, documentation seule | 24 |
| Racines B strictement sûres | 4 |

## Inventaire détaillé

| ID local | Composant | Fichier | Ligne | Type visuel | Interactif | Utilise Badge | Catégorie | Migration possible | Risque | Notes |
|---|---|---|---:|---|---|---|---|---|---|---|
| BADGE-USAGE-001 | `AccountPage` | `src/app/(dashboard)/account/page.tsx` | 37 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-002 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 113 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-003 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 120 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-004 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 129 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-005 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 157 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-006 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 160 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-007 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 168 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-008 | `ProjectsPage` | `src/app/(dashboard)/projects/page.tsx` | 203 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-009 | `LoginPage` | `src/app/login/page.tsx` | 20 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-010 | `PokemonWidget` | `src/components/admin/cards/pokemon-widget.tsx` | 39 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-011 | `ColorLab` | `src/components/admin/dashboard/color-lab.tsx` | 33 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-012 | `DailyTools` | `src/components/admin/dashboard/daily-tools.tsx` | 437 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-013 | `DashboardHomeLive` | `src/components/admin/dashboard/dashboard-home-live.tsx` | 245 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-014 | `DashboardHomeLive` | `src/components/admin/dashboard/dashboard-home-live.tsx` | 320 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-015 | `DailyCodePost` | `src/components/admin/dashboard/dashboard-home-live.tsx` | 411 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-016 | `Pomodoro` | `src/components/admin/dashboard/pomodoro.tsx` | 81 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-017 | `SnippetVault` | `src/components/admin/dashboard/snippet-vault.tsx` | 92 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-018 | `CalendarDayCell` | `src/components/admin/events/events-calendar-panel.jsx` | 938 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-019 | `EventGroup` | `src/components/admin/events/events-calendar-panel.jsx` | 1027 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-020 | `TimelineSection` | `src/components/admin/events/events-calendar-panel.jsx` | 1052 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-021 | `EventRow` | `src/components/admin/events/events-calendar-panel.jsx` | 1125 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-022 | `TypePills` | `src/components/admin/events/events-calendar-panel.jsx` | 1204 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-023 | `EventBadge` | `src/components/admin/events/events-calendar-panel.jsx` | 1252 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-024 | `DetailSection` | `src/components/admin/events/events-calendar-panel.jsx` | 1299 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-025 | `EventDetailModal` | `src/components/admin/events/events-calendar-panel.jsx` | 1349 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-026 | `EventPokemonGroups` | `src/components/admin/events/events-calendar-panel.jsx` | 1473 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-027 | `PokemonCardGrid` | `src/components/admin/events/events-calendar-panel.jsx` | 1496 | badge métier | non | non | B | non dans ce sprint | moyen | Style événementiel/densité locale à conserver. |
| BADGE-USAGE-028 | `CalendarPlanner` | `src/components/admin/forms/calendar-planner.tsx` | 228 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-029 | `CalendarPlanner` | `src/components/admin/forms/calendar-planner.tsx` | 238 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-030 | `CalendarPlanner` | `src/components/admin/forms/calendar-planner.tsx` | 469 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-031 | `MonthGrid` | `src/components/admin/forms/calendar-planner.tsx` | 549 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-032 | `EventList` | `src/components/admin/forms/calendar-planner.tsx` | 657 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-033 | `EventButton` | `src/components/admin/forms/calendar-planner.tsx` | 699 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-034 | `EventButton` | `src/components/admin/forms/calendar-planner.tsx` | 700 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-035 | `JavaScriptExercises` | `src/components/admin/forms/javascript-exercises.tsx` | 91 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-036 | `JavaScriptExercises` | `src/components/admin/forms/javascript-exercises.tsx` | 134 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-037 | `JavaScriptExercises` | `src/components/admin/forms/javascript-exercises.tsx` | 153 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-038 | `JsProgress` | `src/components/admin/forms/js-progress.tsx` | 37 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-039 | `JsProgress` | `src/components/admin/forms/js-progress.tsx` | 46 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-040 | `JsProgress` | `src/components/admin/forms/js-progress.tsx` | 47 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-041 | `JsProgress` | `src/components/admin/forms/js-progress.tsx` | 48 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-042 | `JsProgress` | `src/components/admin/forms/js-progress.tsx` | 84 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-043 | `KanbanBoard` | `src/components/admin/forms/kanban-board.tsx` | 300 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-044 | `KanbanBoard` | `src/components/admin/forms/kanban-board.tsx` | 307 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-045 | `KanbanBoard` | `src/components/admin/forms/kanban-board.tsx` | 459 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-046 | `KanbanBoard` | `src/components/admin/forms/kanban-board.tsx` | 479 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-047 | `KanbanColumn` | `src/components/admin/forms/kanban-board.tsx` | 620 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-048 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 674 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-049 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 712 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-050 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 715 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-051 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 719 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-052 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 725 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-053 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 733 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-054 | `KanbanTaskCard` | `src/components/admin/forms/kanban-board.tsx` | 745 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-055 | `KanbanTaskPreview` | `src/components/admin/forms/kanban-board.tsx` | 757 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-056 | `KanbanTaskPreview` | `src/components/admin/forms/kanban-board.tsx` | 766 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-057 | `NotesBoard` | `src/components/admin/forms/notes-board.tsx` | 233 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-058 | `NotesBoard` | `src/components/admin/forms/notes-board.tsx` | 241 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-059 | `NotesBoard` | `src/components/admin/forms/notes-board.tsx` | 243 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-060 | `NotesBoard` | `src/components/admin/forms/notes-board.tsx` | 249 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-061 | `NotesBoard` | `src/components/admin/forms/notes-board.tsx` | 269 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-062 | `TodoList` | `src/components/admin/forms/todo-list.tsx` | 47 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-063 | `TodoList` | `src/components/admin/forms/todo-list.tsx` | 51 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-064 | `WriterStudio` | `src/components/admin/forms/writer-studio.tsx` | 135 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-065 | `WriterStudio` | `src/components/admin/forms/writer-studio.tsx` | 180 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-066 | `WriterStudio` | `src/components/admin/forms/writer-studio.tsx` | 184 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-067 | `WriterStudio` | `src/components/admin/forms/writer-studio.tsx` | 185 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-068 | `AdminVersionHistoryDialog` | `src/components/admin/layout/admin-version-history-dialog.tsx` | 68 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-069 | `LearningAchievementGrid` | `src/components/admin/learning/learning-achievement-grid.tsx` | 34 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-070 | `LearningDetailModal` | `src/components/admin/learning/learning-detail-modal.tsx` | 64 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-071 | `PseudocodeCard` | `src/components/admin/learning/learning-detail-modal.tsx` | 192 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-072 | `CardHeader` | `src/components/admin/learning/learning-detail-modal.tsx` | 247 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-073 | `CardHeader` | `src/components/admin/learning/learning-detail-modal.tsx` | 248 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-074 | `CardHeader` | `src/components/admin/learning/learning-detail-modal.tsx` | 249 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-075 | `CardHeader` | `src/components/admin/learning/learning-detail-modal.tsx` | 250 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-076 | `TagRow` | `src/components/admin/learning/learning-detail-modal.tsx` | 352 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-077 | `LearningImportModal` | `src/components/admin/learning/learning-import-modal.tsx` | 161 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-078 | `LearningImportModal` | `src/components/admin/learning/learning-import-modal.tsx` | 192 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-079 | `LearningSummary` | `src/components/admin/learning/learning-summary.tsx` | 64 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-080 | `LearningTopicCard` | `src/components/admin/learning/learning-topic-card.tsx` | 25 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-081 | `LearningTopicCard` | `src/components/admin/learning/learning-topic-card.tsx` | 26 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-082 | `LearningTopicCard` | `src/components/admin/learning/learning-topic-card.tsx` | 27 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-083 | `LearningTopicCard` | `src/components/admin/learning/learning-topic-card.tsx` | 45 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-084 | `LearningTopicCard` | `src/components/admin/learning/learning-topic-card.tsx` | 50 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-085 | `AdminSidebar` | `src/components/admin/navigation/admin-sidebar.tsx` | 151 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-086 | `RulesPanel` | `src/components/admin/pokemon/admin-app.jsx` | 859 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-087 | `RulesPanel` | `src/components/admin/pokemon/admin-app.jsx` | 892 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-088 | `RulesPanel` | `src/components/admin/pokemon/admin-app.jsx` | 912 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-089 | `AdminApp` | `src/components/admin/pokemon/admin-app.jsx` | 2012 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-090 | `AdminApp` | `src/components/admin/pokemon/admin-app.jsx` | 2203 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-091 | `AdminApp` | `src/components/admin/pokemon/admin-app.jsx` | 2477 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-092 | `BarList` | `src/components/admin/pokemon/admin-ui.jsx` | 95 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-093 | `MiniCardList` | `src/components/admin/pokemon/admin-ui.jsx` | 283 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-094 | `ControlCardsPanel` | `src/components/admin/pokemon/admin-ui.jsx` | 306 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-095 | `JsonIssueList` | `src/components/admin/pokemon/admin-ui.jsx` | 337 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-096 | `JsonIssueList` | `src/components/admin/pokemon/admin-ui.jsx` | 343 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-097 | `BackgroundPreview` | `src/components/admin/pokemon/background-panel.jsx` | 59 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-098 | `BackgroundPreview` | `src/components/admin/pokemon/background-panel.jsx` | 60 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-099 | `BackgroundPreview` | `src/components/admin/pokemon/background-panel.jsx` | 67 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-100 | `CandyPanel` | `src/components/admin/pokemon/candy-panel.jsx` | 99 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-101 | `CandyPanel` | `src/components/admin/pokemon/candy-panel.jsx` | 169 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-102 | `CandyPanel` | `src/components/admin/pokemon/candy-panel.jsx` | 181 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-103 | `TypeChip` | `src/components/admin/pokemon/catalog-panel.jsx` | 50 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-104 | `TypeCatalogCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 142 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-105 | `AdminMoveCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 196 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-106 | `AdminMoveCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 205 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-107 | `AdminMoveCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 227 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-108 | `AdminMoveCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 252 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-109 | `AdminMoveCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 259 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-110 | `AdminMoveCard` | `src/components/admin/pokemon/catalog-panel.jsx` | 269 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-111 | `CatalogPanel` | `src/components/admin/pokemon/catalog-panel.jsx` | 316 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-112 | `CatalogPanel` | `src/components/admin/pokemon/catalog-panel.jsx` | 399 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-113 | `CollectionsPanel` | `src/components/admin/pokemon/collections-panel.jsx` | 496 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-114 | `CollectionsPanel` | `src/components/admin/pokemon/collections-panel.jsx` | 515 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-115 | `CollectionsPanel` | `src/components/admin/pokemon/collections-panel.jsx` | 627 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-116 | `CollectionsPanel` | `src/components/admin/pokemon/collections-panel.jsx` | 630 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-117 | `DatasetSourceHeader` | `src/components/admin/pokemon/current-dataset-diagnostics.jsx` | 109 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-118 | `DatasetSourceHeader` | `src/components/admin/pokemon/current-dataset-diagnostics.jsx` | 112 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-119 | `DatasetSourceHeader` | `src/components/admin/pokemon/current-dataset-diagnostics.jsx` | 116 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-120 | `DatasetEventBanner` | `src/components/admin/pokemon/dataset-event-banner.jsx` | 88 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-121 | `DatasetEventBanner` | `src/components/admin/pokemon/dataset-event-banner.jsx` | 89 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-122 | `TypeBadge` | `src/components/admin/pokemon/detail-modal.jsx` | 191 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-123 | `MoveList` | `src/components/admin/pokemon/detail-modal.jsx` | 516 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-124 | `EvolutionPanel` | `src/components/admin/pokemon/detail-modal.jsx` | 663 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-125 | `EvolutionPanel` | `src/components/admin/pokemon/detail-modal.jsx` | 668 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-126 | `AssetGallery` | `src/components/admin/pokemon/detail-modal.jsx` | 735 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-127 | `AssetBadges` | `src/components/admin/pokemon/detail-modal.jsx` | 844 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-128 | `IssuesPanel` | `src/components/admin/pokemon/detail-modal.jsx` | 874 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-129 | `PvpPanel` | `src/components/admin/pokemon/detail-modal.jsx` | 933 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-130 | `DetailModal` | `src/components/admin/pokemon/detail-modal.jsx` | 1152 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-131 | `DetailModal` | `src/components/admin/pokemon/detail-modal.jsx` | 1154 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-132 | `DetailModal` | `src/components/admin/pokemon/detail-modal.jsx` | 1186 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-133 | `EggPill` | `src/components/admin/pokemon/eggs-panel.jsx` | 54 | badge métier | non | non | B | oui, composition sûre | faible | Racine équivalente ; wrapper métier conservé. |
| BADGE-USAGE-134 | `EggCard` | `src/components/admin/pokemon/eggs-panel.jsx` | 88 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-135 | `EggCard` | `src/components/admin/pokemon/eggs-panel.jsx` | 93 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-136 | `MaxPill` | `src/components/admin/pokemon/max-battles-panel.jsx` | 39 | badge métier | non | non | B | oui, composition sûre | faible | Racine équivalente ; wrapper métier conservé. |
| BADGE-USAGE-137 | `MaxBattleCard` | `src/components/admin/pokemon/max-battles-panel.jsx` | 61 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-138 | `MaxBattleCard` | `src/components/admin/pokemon/max-battles-panel.jsx` | 65 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-139 | `MaxBattleCard` | `src/components/admin/pokemon/max-battles-panel.jsx` | 70 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-140 | `PokemonApiExplorer` | `src/components/admin/pokemon/pokemon-api-explorer.tsx` | 117 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-141 | `PokemonApiExplorer` | `src/components/admin/pokemon/pokemon-api-explorer.tsx` | 124 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-142 | `PokemonApiExplorer` | `src/components/admin/pokemon/pokemon-api-explorer.tsx` | 124 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-143 | `TypeBadge` | `src/components/admin/pokemon/pokemon-card.jsx` | 30 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-144 | `WeatherBadge` | `src/components/admin/pokemon/pokemon-card.jsx` | 52 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-145 | `PokemonCard` | `src/components/admin/pokemon/pokemon-card.jsx` | 127 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-146 | `PokemonCard` | `src/components/admin/pokemon/pokemon-card.jsx` | 200 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-147 | `PokemonDocsViewer` | `src/components/admin/pokemon/pokemon-docs-viewer.tsx` | 45 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-148 | `PokemonDocsViewer` | `src/components/admin/pokemon/pokemon-docs-viewer.tsx` | 96 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-149 | `MoveBadge` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 45 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-150 | `MoveBadge` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 45 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-151 | `PvpDetail` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 101 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-152 | `PvpDetail` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 103 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-153 | `PvpDetail` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 104 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-154 | `PvpDetail` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 104 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-155 | `PvpRankingsPanel` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` | 131 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-156 | `RaidPill` | `src/components/admin/pokemon/raids-panel.jsx` | 58 | badge métier | non | non | B | oui, composition sûre | faible | Racine équivalente ; wrapper métier conservé. |
| BADGE-USAGE-157 | `RaidCard` | `src/components/admin/pokemon/raids-panel.jsx` | 91 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-158 | `RaidCard` | `src/components/admin/pokemon/raids-panel.jsx` | 96 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-159 | `TypeIcons` | `src/components/admin/pokemon/research-panel.jsx` | 131 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-160 | `Badge` | `src/components/admin/pokemon/research-panel.jsx` | 142 | badge métier | non | non | B | oui, composition sûre | faible | Racine équivalente ; wrapper métier conservé. |
| BADGE-USAGE-161 | `ResearchSection` | `src/components/admin/pokemon/research-panel.jsx` | 263 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-162 | `PokemonCard` | `src/components/admin/pokemon/rocket-panel.jsx` | 234 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-163 | `PokemonCard` | `src/components/admin/pokemon/rocket-panel.jsx` | 235 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-164 | `SlotBlock` | `src/components/admin/pokemon/rocket-panel.jsx` | 249 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-165 | `TrainerCard` | `src/components/admin/pokemon/rocket-panel.jsx` | 307 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-166 | `TrainerCard` | `src/components/admin/pokemon/rocket-panel.jsx` | 323 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-167 | `RocketPanel` | `src/components/admin/pokemon/rocket-panel.jsx` | 439 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-168 | `ShinyDetail` | `src/components/admin/pokemon/shiny-tracker-panel.jsx` | 101 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-169 | `ShinyDetail` | `src/components/admin/pokemon/shiny-tracker-panel.jsx` | 105 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-170 | `ShinyDetail` | `src/components/admin/pokemon/shiny-tracker-panel.jsx` | 106 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-171 | `ShinyDetail` | `src/components/admin/pokemon/shiny-tracker-panel.jsx` | 125 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-172 | `SourceHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 156 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-173 | `SourceHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 159 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-174 | `SourceHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 172 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-175 | `DataDeployHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 270 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-176 | `DataDeployHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 273 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-177 | `DataDeployHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 286 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-178 | `DataDeployHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 322 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-179 | `DataDeployHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx` | 327 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-180 | `SourceRows` | `src/components/admin/pokemon/source-watch-panel.tsx` | 402 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-181 | `SourceRows` | `src/components/admin/pokemon/source-watch-panel.tsx` | 448 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-182 | `SourceRows` | `src/components/admin/pokemon/source-watch-panel.tsx` | 451 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-183 | `TierSection` | `src/components/admin/pokemon/tier-section.jsx` | 90 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-184 | `Move` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 120 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-185 | `StatusBadges` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 145 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-186 | `StatusBadges` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 146 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-187 | `StatusBadges` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 147 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-188 | `StatusBadges` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 148 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-189 | `PokemonMobileCard` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 163 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-190 | `PokemonMobileCard` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 163 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-191 | `PokemonTable` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 188 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-192 | `PokemonTable` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 188 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-193 | `TrainerPokemonCollectionPanel` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 351 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-194 | `TrainerPokemonCollectionPanel` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 363 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-195 | `TrainerPokemonCollectionPanel` | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 386 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-196 | `UpdateLogPanel` | `src/components/admin/pokemon/update-log-panel.jsx` | 65 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-197 | `UpdateLogPanel` | `src/components/admin/pokemon/update-log-panel.jsx` | 124 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-198 | `UpdateLogPanel` | `src/components/admin/pokemon/update-log-panel.jsx` | 154 | badge métier | non | non | B | non dans ce sprint | moyen | Palette, asset ou structure métier Pokémon. |
| BADGE-USAGE-199 | `DashboardFooter` | `src/components/admin/shared/dashboard-footer.tsx` | 36 | chip/contrôle | oui | non | C | non | élevé | Contrôle natif : sémantique et sélection à conserver. |
| BADGE-USAGE-200 | `DashboardFooter` | `src/components/admin/shared/dashboard-footer.tsx` | 45 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-201 | `PokemonAnalytics` | `src/components/admin/stats/pokemon-analytics.tsx` | 69 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-202 | `DashboardBacklog` | `src/components/admin/tables/dashboard-backlog.tsx` | 460 | badge canonique | non | oui | A | déjà consolidé | faible | Primitive canonique MWI-COMP-317. |
| BADGE-USAGE-203 | `TicketCard` | `src/components/admin/tables/dashboard-backlog.tsx` | 680 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-204 | `TicketCard` | `src/components/admin/tables/dashboard-backlog.tsx` | 683 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |
| BADGE-USAGE-205 | `TicketCard` | `src/components/admin/tables/dashboard-backlog.tsx` | 686 | pill locale | non | non | D | documenter | moyen | Squelette différent : hauteur/display/bordure/type à caractériser. |

## Décisions de classification

- A contient uniquement les appels déjà canoniques : aucune source ne doit changer pour eux.
- B regroupe les implémentations liées aux événements ou à Pokémon. Seules BADGE-USAGE-133, -136, -156 et -160 possèdent une racine équivalente et à faible risque.
- C conserve ses `button` et `a` natifs ; aucun contrôle ne devient un `Badge`.
- D reste documenté : imposer `min-h-7`, `inline-flex`, une bordure ou une typographie de compensation créerait un risque visuel non justifié dans ce sprint.
