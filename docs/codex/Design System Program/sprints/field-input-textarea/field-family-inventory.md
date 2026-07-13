# Inventaire — Famille Field / Input / Textarea

Date d’audit initial : 14 juillet 2026. Le collecteur TypeScript parcourt tous les fichiers JSX/TSX de `src`, résout les imports canoniques et exclut uniquement les éléments internes aux primitives.

## Totaux

| Mesure | Total initial |
|---|---:|
| Sites de contrôle | 95 |
| `Input` | 47 |
| `Textarea` | 12 |
| `<input>` natifs | 29 |
| `<textarea>` natifs | 7 |
| Sites de label sémantique | 68 |
| Contrôles avec nom accessible statiquement démontré | 52 |
| Descriptions reliées par `aria-describedby` | 0 |
| Erreurs reliées par `aria-invalid` | 0 |
| Wrappers déclarés | 5 |

Les 5 wrappers déclarés sont `Field` et `Area` dans l’éditeur Events, `Field` et `Area` dans Dashboard Backlog, puis `RangeFields` dans Ma collection. Le compteur de labels inclut les labels natifs et, après migration, les usages de la primitive `Field` qui rendent eux-mêmes un `<label>`.

## Classification exhaustive

<!-- BEGIN GENERATED INVENTORY -->
| ID local | Composant | Fichier | Ligne | Contrôle | Label | Description | Erreur | Utilise primitive | Catégorie | Migration possible | Risque | Notes |
|---|---|---|---:|---|---|---|---|---|---|---|---|---|
| FIELD-USAGE-001 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 261 | input:text | Nom | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-002 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 268 | input:text | Type | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-003 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 275 | textarea:textarea | Description | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-004 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 282 | input:text | Prochaine action | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-005 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 290 | input:number | Progression | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-006 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 323 | input:text | GitHub | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-007 | ProjectsPage | `src/app/(dashboard)/projects/page.tsx` | 331 | input:text | Site / Vercel | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-008 | LoginPage | `src/app/login/page.tsx` | 56 | input:hidden | — | — | — | non | C | non | élevé | Contrôle spécialisé hidden explicitement exclu. |
| FIELD-USAGE-009 | LoginPage | `src/app/login/page.tsx` | 58 | input:email | Email | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-010 | LoginPage | `src/app/login/page.tsx` | 68 | input:password | Mot de passe | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-011 | ColorLab | `src/components/admin/dashboard/color-lab.tsx` | 41 | input:color | Sélecteur de couleur | — | — | non | C | non | élevé | Contrôle spécialisé color explicitement exclu. |
| FIELD-USAGE-012 | ColorLab | `src/components/admin/dashboard/color-lab.tsx` | 50 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-013 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 117 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-014 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 127 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-015 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 185 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-016 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 208 | textarea:textarea | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-017 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 253 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-018 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 263 | input:number | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-019 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 330 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-020 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 340 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-021 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 350 | input:email | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-022 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 385 | input:number | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-023 | DailyTools | `src/components/admin/dashboard/daily-tools.tsx` | 422 | textarea:textarea | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-024 | SnippetVault | `src/components/admin/dashboard/snippet-vault.tsx` | 111 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-025 | SnippetModal | `src/components/admin/dashboard/snippet-vault.tsx` | 195 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-026 | SnippetModal | `src/components/admin/dashboard/snippet-vault.tsx` | 197 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-027 | SnippetModal | `src/components/admin/dashboard/snippet-vault.tsx` | 198 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-028 | SnippetModal | `src/components/admin/dashboard/snippet-vault.tsx` | 199 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-029 | SnippetModal | `src/components/admin/dashboard/snippet-vault.tsx` | 201 | textarea:textarea | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-030 | ImportModal | `src/components/admin/events/event-editor-modal.jsx` | 68 | textarea:textarea | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-031 | Field | `src/components/admin/events/event-editor-modal.jsx` | 93 | input:type | label | — | — | non | B | oui — composition Field | moyen | Wrapper métier conservé ; seule sa racine de structure est composable. |
| FIELD-USAGE-032 | Area | `src/components/admin/events/event-editor-modal.jsx` | 118 | textarea:textarea | label | — | — | non | B | oui — composition Field | moyen | Wrapper métier conservé ; seule sa racine de structure est composable. |
| FIELD-USAGE-033 | EventsCalendarPanel | `src/components/admin/events/events-calendar-panel.jsx` | 702 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-034 | EventsCalendarPanel | `src/components/admin/events/events-calendar-panel.jsx` | 720 | input:date | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-035 | CalendarPlanner | `src/components/admin/forms/calendar-planner.tsx` | 394 | input:text | Titre | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-036 | CalendarPlanner | `src/components/admin/forms/calendar-planner.tsx` | 402 | input:date | Début | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-037 | CalendarPlanner | `src/components/admin/forms/calendar-planner.tsx` | 416 | input:date | Fin | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-038 | CalendarPlanner | `src/components/admin/forms/calendar-planner.tsx` | 426 | input:time | Heure | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-039 | CalendarPlanner | `src/components/admin/forms/calendar-planner.tsx` | 484 | textarea:textarea | Description | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-040 | JavaScriptExercises | `src/components/admin/forms/javascript-exercises.tsx` | 168 | textarea:textarea | Éditeur de pseudo-code | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-041 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 357 | input:text | Titre | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-042 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 364 | input:date | Échéance | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-043 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 373 | textarea:textarea | Description enrichie | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-044 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 387 | input:number | Points | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-045 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 397 | input:text | Owner | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-046 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 407 | input:text | Tags | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-047 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 431 | textarea:textarea | Liens | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-048 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 439 | textarea:textarea | Images | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-049 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 494 | input:checkbox | — | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-050 | KanbanBoard | `src/components/admin/forms/kanban-board.tsx` | 506 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-051 | NotesBoard | `src/components/admin/forms/notes-board.tsx` | 193 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-052 | NotesBoard | `src/components/admin/forms/notes-board.tsx` | 281 | input:text | Titre | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-053 | NotesBoard | `src/components/admin/forms/notes-board.tsx` | 288 | textarea:textarea | Contenu | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-054 | NotesBoard | `src/components/admin/forms/notes-board.tsx` | 305 | input:text | Tags | — | — | oui | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-055 | TodoList | `src/components/admin/forms/todo-list.tsx` | 75 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-056 | TodoList | `src/components/admin/forms/todo-list.tsx` | 113 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-057 | WriterStudio | `src/components/admin/forms/writer-studio.tsx` | 208 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-058 | WriterStudio | `src/components/admin/forms/writer-studio.tsx` | 213 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-059 | WriterStudio | `src/components/admin/forms/writer-studio.tsx` | 234 | textarea:textarea | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-060 | PseudocodeCard | `src/components/admin/learning/learning-detail-modal.tsx` | 184 | textarea:textarea | Zone de rédaction | — | — | oui | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-061 | LearningImportModal | `src/components/admin/learning/learning-import-modal.tsx` | 131 | input:file | — | — | — | non | C | non | élevé | Contrôle spécialisé file explicitement exclu. |
| FIELD-USAGE-062 | Strategy | `src/components/admin/learning/learning-import-modal.tsx` | 205 | input:radio | — | — | — | non | C | non | élevé | Contrôle spécialisé radio explicitement exclu. |
| FIELD-USAGE-063 | RulesPanel | `src/components/admin/pokemon/admin-app.jsx` | 675 | input:text | Nom | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-064 | RulesPanel | `src/components/admin/pokemon/admin-app.jsx` | 682 | input:checkbox | Règle active | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-065 | RulesPanel | `src/components/admin/pokemon/admin-app.jsx` | 751 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-066 | RulesPanel | `src/components/admin/pokemon/admin-app.jsx` | 775 | input:checkbox | Signaler aussi les valeurs vides | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-067 | RulesPanel | `src/components/admin/pokemon/admin-app.jsx` | 788 | textarea:textarea | Modèle JSON attendu | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-068 | RulesPanel | `src/components/admin/pokemon/admin-app.jsx` | 800 | input:text | Chemin JSON | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-069 | AdminApp | `src/components/admin/pokemon/admin-app.jsx` | 1904 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-070 | AdminApp | `src/components/admin/pokemon/admin-app.jsx` | 2374 | input:checkbox | Seulement les fiches avec problèmes | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-071 | AdminApp | `src/components/admin/pokemon/admin-app.jsx` | 2387 | textarea:textarea | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-072 | AdminApp | `src/components/admin/pokemon/admin-app.jsx` | 2403 | textarea:textarea | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-073 | AdminSectionNavigation | `src/components/admin/pokemon/admin-section-navigation.jsx` | 65 | input:text | Rechercher une section Admin Pokémon | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-074 | AdminTodoPanel | `src/components/admin/pokemon/admin-todo-panel.jsx` | 89 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-075 | AdminTodoPanel | `src/components/admin/pokemon/admin-todo-panel.jsx` | 124 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans contrat Field comparable ; documentation seule. |
| FIELD-USAGE-076 | CatalogPanel | `src/components/admin/pokemon/catalog-panel.jsx` | 339 | input:text | Recherche dans | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-077 | CollectionsPanel | `src/components/admin/pokemon/collections-panel.jsx` | 555 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-078 | CollectionsPanel | `src/components/admin/pokemon/collections-panel.jsx` | 762 | input:checkbox | {label} | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-079 | CollectionsPanel | `src/components/admin/pokemon/collections-panel.jsx` | 775 | input:text | Nom de la collection | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-080 | DatasetFilterBar | `src/components/admin/pokemon/dataset-filter-bar.jsx` | 19 | input:text | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-081 | AdminActions | `src/components/admin/pokemon/detail-modal.jsx` | 979 | input:checkbox | Assets OK | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-082 | LoginCard | `src/components/admin/pokemon/login-card.jsx` | 19 | input:password | — | — | — | non | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-083 | PokemonApiExplorer | `src/components/admin/pokemon/pokemon-api-explorer.tsx` | 121 | input:text | Route à tester | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-084 | PokemonApiExplorer | `src/components/admin/pokemon/pokemon-api-explorer.tsx` | 125 | textarea:textarea | Body JSON | — | — | non | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-085 | PokemonCard | `src/components/admin/pokemon/pokemon-card.jsx` | 226 | input:checkbox | Assets OK | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-086 | PokemonDocsViewer | `src/components/admin/pokemon/pokemon-docs-viewer.tsx` | 53 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-087 | ImportModal | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 223 | input:file | Sélectionner un fichier JSON | — | — | non | C | non | élevé | Contrôle spécialisé file explicitement exclu. |
| FIELD-USAGE-088 | TrainerPokemonCollectionPanel | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 355 | input:text | Rechercher dans la collection | — | — | oui | D | non dans ce sprint | moyen | Structure, palette ou orchestration distincte ; équivalence non prouvée. |
| FIELD-USAGE-089 | TrainerPokemonCollectionPanel | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 362 | input:checkbox | IV 100 % uniquement | — | — | non | C | non | élevé | Contrôle spécialisé checkbox explicitement exclu. |
| FIELD-USAGE-090 | RangeFields | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 397 | input:number | `${label} minimum` | — | — | oui | B | non dans ce sprint | moyen | Paire numérique sous fieldset/legend conservée comme wrapper métier. |
| FIELD-USAGE-091 | RangeFields | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 397 | input:number | `${label} maximum` | — | — | oui | B | non dans ce sprint | moyen | Paire numérique sous fieldset/legend conservée comme wrapper métier. |
| FIELD-USAGE-092 | DashboardBacklog | `src/components/admin/tables/dashboard-backlog.tsx` | 504 | input:text | — | — | — | oui | D | non dans ce sprint | moyen | Contrôle sans nom accessible explicite ; ne pas abstraire avant audit accessibilité. |
| FIELD-USAGE-093 | TicketForm | `src/components/admin/tables/dashboard-backlog.tsx` | 741 | input:text | Titre | — | — | oui | A | oui — Field | faible | Anatomie commune exacte, contrôle déjà canonique et logique inchangée. |
| FIELD-USAGE-094 | Field | `src/components/admin/tables/dashboard-backlog.tsx` | 832 | input:text | label | — | — | oui | B | oui — composition Field | moyen | Wrapper métier conservé ; seule sa racine de structure est composable. |
| FIELD-USAGE-095 | Area | `src/components/admin/tables/dashboard-backlog.tsx` | 850 | textarea:textarea | label | — | — | oui | B | oui — composition Field | moyen | Wrapper métier conservé ; seule sa racine de structure est composable. |
<!-- END GENERATED INVENTORY -->

## Constats transverses

- 91 contrôles sont pilotés par `value` ou `checked`; 4 sont non contrôlés et aucun n’emploie `defaultValue` ou `defaultChecked`.
- 42 sites utilisent un placeholder, mais celui-ci ne constitue jamais une preuve suffisante de nom accessible.
- 2 contrôles sont `required`, 2 sont `disabled` et 2 sont `readOnly`.
- Les 13 contrôles spécialisés de catégorie C sont : 1 hidden, 1 color, 8 checkbox, 2 file et 1 radio.
- Les recherches visuellement proches restent hétérogènes : certaines ont un texte `sr-only` ou `aria-label`, d’autres dépendent uniquement du placeholder.
- Aucun message d’erreur ou de description n’est relié à un contrôle dans le code courant. Les erreurs observées sont des alertes de formulaire, des toasts ou des panneaux métier.
