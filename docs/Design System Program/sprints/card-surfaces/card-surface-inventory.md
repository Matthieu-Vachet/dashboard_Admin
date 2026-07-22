# Inventaire — Card + Surfaces

Date : 22 juillet 2026. Le comptage est statique et reproductible sur les fichiers JSX/TSX courants.

## Méthode et unité

Une surface candidate est soit une instance `<Card>`, soit un conteneur hôte (`div`, `section`, `article`, `details`, `li`, `ul` ou équivalent Motion) combinant un radius et au moins deux groupes parmi border, background, shadow/backdrop/ring. Les boutons, liens, champs, pills, badges, textes et icônes sont exclus de l’unité primaire. Cette règle évite de considérer chaque élément arrondi comme une Card.

Le scan trouve 386 racines candidates dans 80 fichiers : 95 `Card` canoniques et 291 conteneurs locaux. Le code contient également 67 composants nommés se terminant réellement par `Card`, `Panel`, `Tile` ou `Widget` ; ce second nombre décrit les wrappers/composants, pas les sites JSX.

## Classification avant migration

| Classe | Total | Décision |
|---|---:|---|
| A — usage canonique | 95 | conserver |
| B — surface simple migrable | 16 | composer `Card tone="flat"` |
| C — wrapper métier composable | 4 | conserver le wrapper, migrer sa racine |
| D — surface spécialisée | 255 | conserver et documenter |
| E — faux positif | 16 | ne pas migrer |
| F — ambigu | 0 | aucun cas non classé après revue |
| **Total** | **386** | 20 racines sûres, 271 exceptions locales |

Les 16 cas E comprennent 13 conteneurs porteurs d'un handler/rôle spécialisé et trois structures au même squelette visuel mais au contrat non-Card : sélecteur de vue Calendar, sélecteur de vue Todo et zone d'édition Writer.

Après migration, les 20 racines B/C rejoignent A : A115/B0/C0/D255/E16/F0. Le total et le périmètre ne changent pas ; 271 implémentations locales classées restent spécialisées ou non-Card.

## Usages canoniques avant migration

| Fichier consommateur | Instances `Card` |
|---|---:|
| `src/app/(dashboard)/account/page.tsx` | 4 |
| `src/app/(dashboard)/projects/page.tsx` | 4 |
| `src/app/login/page.tsx` | 1 |
| `src/components/admin/cards/pokemon-widget.tsx` | 1 |
| `src/components/admin/cards/stat-card.tsx` | 1 |
| `src/components/admin/dashboard/color-lab.tsx` | 3 |
| `src/components/admin/dashboard/daily-tools.tsx` | 7 |
| `src/components/admin/dashboard/dashboard-home-live.tsx` | 3 |
| `src/components/admin/dashboard/pomodoro.tsx` | 3 |
| `src/components/admin/dashboard/snippet-vault.tsx` | 3 |
| `src/components/admin/forms/calendar-planner.tsx` | 3 |
| `src/components/admin/forms/javascript-exercises.tsx` | 3 |
| `src/components/admin/forms/js-progress.tsx` | 1 |
| `src/components/admin/forms/kanban-board.tsx` | 2 |
| `src/components/admin/forms/notes-board.tsx` | 2 |
| `src/components/admin/forms/todo-list.tsx` | 2 |
| `src/components/admin/forms/writer-studio.tsx` | 2 |
| `src/components/admin/learning/learning-achievement-grid.tsx` | 1 |
| `src/components/admin/learning/learning-activity.tsx` | 1 |
| `src/components/admin/learning/learning-advanced-stats.tsx` | 1 |
| `src/components/admin/learning/learning-summary.tsx` | 3 |
| `src/components/admin/learning/learning-topic-card.tsx` | 1 |
| `src/components/admin/pokemon/admin-command-center.tsx` | 6 |
| `src/components/admin/pokemon/pokemon-api-explorer.tsx` | 1 |
| `src/components/admin/pokemon/pokemon-docs-viewer.tsx` | 2 |
| `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx` | 9 |
| `src/components/admin/shared/loading-state.tsx` | 1 |
| `src/components/admin/stats/dashboard-charts.tsx` | 2 |
| `src/components/admin/stats/database-stats.tsx` | 6 |
| `src/components/admin/stats/learning-analytics.tsx` | 4 |
| `src/components/admin/stats/pokemon-analytics.tsx` | 6 |
| `src/components/admin/tables/dashboard-backlog.tsx` | 6 |
| **Total** | **95** |

Les usages canoniques de `CardHeader`, `CardTitle` et `CardDescription` sont au nombre de 25 chacun dans 12 fichiers. Cinq occurrences homonymes de `CardHeader` dans `learning-detail-modal.tsx` sont un composant métier local et ne sont pas attribuées à la primitive.

## Candidats B et C

Tous partagent exactement `rounded-lg border border-line bg-white/[0.045]`, rendent un `div`, n’ont ni handler ni rôle sur la racine et conservent leurs classes de layout/contenu.

| ID local | Fichier:ligne | Surface | Classe | Action |
|---|---|---|---|---|
| CARD-SURFACE-001 | `projects/page.tsx:137` | métrique Projets | B | migrer |
| CARD-SURFACE-002 | `projects/page.tsx:145` | métrique Projets | B | migrer |
| CARD-SURFACE-003 | `learning-analytics.tsx:122` | progression niveau | B | migrer |
| CARD-SURFACE-004 | `learning-analytics.tsx:163` | légende statut | B | migrer |
| CARD-SURFACE-005 | `database-stats.tsx:326` | `MiniRow` | C | conserver wrapper, migrer racine |
| CARD-SURFACE-006 | `pokemon-analytics.tsx:178` | répartition donnée | B | migrer |
| CARD-SURFACE-007 | `notes-board.tsx:299` | note/aperçu | B | migrer |
| CARD-SURFACE-008 | `pokemon-widget.tsx:62` | ligne génération | B | migrer |
| CARD-SURFACE-009 | `pokemon-widget.tsx:93` | `Metric` | C | conserver wrapper, migrer racine |
| CARD-SURFACE-010 | `daily-tools.tsx:116` | lien rapide | B | migrer |
| CARD-SURFACE-011 | `daily-tools.tsx:183` | snippet | B | migrer |
| CARD-SURFACE-012 | `daily-tools.tsx:252` | ligne checklist | B | migrer |
| CARD-SURFACE-013 | `daily-tools.tsx:329` | contact | B | migrer |
| CARD-SURFACE-014 | `pomodoro.tsx:155` | historique | B | migrer |
| CARD-SURFACE-015 | `pomodoro.tsx:174` | `MiniStat` | C | conserver wrapper, migrer racine |
| CARD-SURFACE-016 | `color-lab.tsx:103` | ligne palette | B | migrer |
| CARD-SURFACE-017 | `dashboard-home-live.tsx:499` | `SignalRow` | C | conserver wrapper, migrer racine |
| CARD-SURFACE-018 | `dashboard-home-live.tsx:580` | barre Kanban | B | migrer |
| CARD-SURFACE-019 | `todo-list.tsx:91` | ligne Todo avec contrôles imbriqués | B | migrer sans changer les contrôles |
| CARD-SURFACE-020 | `loading-state.tsx:25` | skeleton de surface | B | migrer |

## Répartition des 291 conteneurs locaux

| Zone | Candidats locaux |
|---|---:|
| Admin Pokémon | 183 |
| Learning | 28 |
| Forms | 19 |
| Events | 14 |
| Dashboard | 13 |
| Stats | 11 |
| Autres/site/UI | 10 |
| Tables | 5 |
| App/pages | 4 |
| Shared | 4 |

Les surfaces Pokémon/Events conservent leurs couleurs, assets, glows, états sélectionnés, anatomies et wrappers. `Panel`, `PokemonCard`, `RaidCard`, `EggCard`, `MaxBattleCard`, `EventDetailModal`, `KanbanTaskCard`, `TicketCard`, les modales, tables, toolbars et layouts ne sont pas convertis par ressemblance.
