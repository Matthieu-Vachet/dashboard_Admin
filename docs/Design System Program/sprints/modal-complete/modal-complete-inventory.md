# Inventaire complet — Famille Modal

Date : 22 juillet 2026. Unité : instance runtime JSX, dialog spécialisé, sheet/drawer ou confirmation native. Les overlays décoratifs `pointer-events-none`, menus, popovers et previews inline ne sont pas comptés.

## Résultat

| Classe avant stabilisation | Total | Décision |
|---|---:|---|
| A — canonique correct | 0 | les 22 instances héritent des limites de la primitive courante |
| B — canonique à stabiliser | 22 | corriger une fois dans `Modal`, sans modifier ses props |
| C — wrapper simple migrable | 0 | aucune équivalence visuelle et comportementale complète |
| D — spécialisé | 10 | conserver ; corriger seulement les défauts locaux certains |
| E — autre pattern | 6 | deux drawers/sheets et quatre confirmations natives |
| F — ambigu | 0 | aucun cas non classé après inspection |
| **Total runtime** | **38** | 22 canoniques + 16 exceptions classées |

Après stabilisation, les 22 lignes B sont devenues A sans modification de leurs 14 fichiers consommateurs. La classification finale est donc A22/B0/C0/D10/E6/F0.

## Inventaire détaillé

Abréviations : `P` = comportement fourni par la primitive ; `—` = absent/non applicable. Le z-index est celui du conteneur runtime.

| ID local | Composant | Fichier | Route | Canonique | Rôle | Nom accessible | Description | Overlay | Escape | Focus | Scroll | Responsive | Motion | Z-index | Catégorie | Action | Risque |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---:|---|---|---|
| MODAL-USAGE-001 | Éditeur projet | `src/app/(dashboard)/projects/page.tsx:252` | `/projects` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `92dvh`, `max-w-2xl` | aucune | 1100 | B | stabiliser primitive | moyen |
| MODAL-USAGE-002 | SnippetModal | `src/components/admin/dashboard/snippet-vault.tsx:189` | `/snippets` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique | aucune | 1100 | B | stabiliser primitive | moyen |
| MODAL-USAGE-003 | Éditeur calendrier | `src/components/admin/forms/calendar-planner.tsx:382` | `/calendar` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique | aucune | 1100 | B | stabiliser primitive | moyen |
| MODAL-USAGE-004 | Éditeur Kanban | `src/components/admin/forms/kanban-board.tsx:344` | `/kanban` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-005 | LearningDetailModal | `src/components/admin/learning/learning-detail-modal.tsx:44` | `/js-progress` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | largeur locale | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-006 | LearningImportModal | `src/components/admin/learning/learning-import-modal.tsx:129` | `/js-progress` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `max-w-6xl` | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-007 | Preview Background | `src/components/admin/pokemon/background-panel.jsx:190` | `/pokemon-admin?section=backgrounds` | oui | dialog/P | `aria-label`/P | selon usage | ferme, focusable | P | P | P | canonique | aucune | 1100 | B | stabiliser primitive | moyen |
| MODAL-USAGE-008 | Détail Shiny | `src/components/admin/pokemon/shiny-tracker-panel.jsx:238` | `/pokemon-admin?section=shiny` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `max-w-5xl` | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-009 | Import collection privée | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx:227` | `/pokemon-admin?section=my-collection` | oui | dialog/P | `aria-label`/P | visible non reliée | callback neutralisé si busy | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-010 | Historique collection privée | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx:398` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-011 | Éditeur backlog | `src/components/admin/tables/dashboard-backlog.tsx:568` | `/tools/dashboard-backlog` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-012 | Sync catalogue | `src/components/admin/pokemon/identity-manager-panel.tsx:892` | `/pokemon-admin?section=identity-manager` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `max-w-4xl` + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-013 | Créer/modifier identité | `src/components/admin/pokemon/identity-manager-panel.tsx:906` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-014 | Alias fournisseur | `src/components/admin/pokemon/identity-manager-panel.tsx:919` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-015 | Historique Identity | `src/components/admin/pokemon/identity-manager-panel.tsx:951` | même route | oui | dialog/P | `aria-label`/P | absente | ferme, focusable | P | P | P | `max-w-4xl` | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-016 | Fusion identités | `src/components/admin/pokemon/identity-manager-panel.tsx:955` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-017 | Déprécier identité | `src/components/admin/pokemon/identity-manager-panel.tsx:957` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-018 | Import identités | `src/components/admin/pokemon/identity-manager-panel.tsx:959` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | canonique + footer | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-019 | Associer alias | `src/components/admin/pokemon/identity-manager-panel.tsx:961` | même route | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `max-w-4xl` | aucune | 1100 | B | stabiliser primitive | critique |
| MODAL-USAGE-020 | Détail Community Day | `src/components/admin/pokemon/community-days-panel.jsx:241` | `/pokemon-admin?section=community-days` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `max-w-6xl` | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-021 | Détail archive Event | `src/components/admin/pokemon/events-history-panel.jsx:47` | `/pokemon-admin?section=events-history` | oui | dialog/P | `aria-label`/P | visible non reliée | ferme, focusable | P | P | P | `max-w-6xl` | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-022 | Historique dataset courant | `src/components/admin/pokemon/current-dataset-diagnostics.jsx:320` | plusieurs sections Pokémon | oui | dialog/P | `aria-label`/P | provider non relié | ferme, focusable | P | P | P | `max-w-6xl` | aucune | 1100 | B | stabiliser primitive | élevé |
| MODAL-USAGE-023 | EventEditorModal | `src/components/admin/events/event-editor-modal.jsx:10` | `/pokemon-admin?section=events` | non | absent | absent | — | ferme | absent | absent | page | `92vh`, formulaire lourd | aucune | 1200 | D | sémantique locale sûre | critique |
| MODAL-USAGE-024 | Import Events | `src/components/admin/events/event-editor-modal.jsx:53` | même route | non | absent | absent | — | ferme | absent | absent | page | `max-w-4xl` | aucune | 1200 | D | sémantique locale sûre | élevé |
| MODAL-USAGE-025 | EventDetailModal | `src/components/admin/events/events-calendar-panel.jsx:1336` | même route | non | dialog | `aria-label` | contenu riche | ferme | absent | absent | page | `94dvh`, max-w-6xl | aucune | 1200 | D | relier titre + nommer close | critique |
| MODAL-USAGE-026 | Éditeur Collections | `src/components/admin/pokemon/collections-panel.jsx:692` | `/pokemon-admin?section=collections` | non | dialog sur overlay | absent | — | non fermant | absent | absent | page | sticky, `100dvh` | aucune | 1100 | D | nom local + close | critique |
| MODAL-USAGE-027 | AdminVersionHistoryDialog | `src/components/admin/layout/admin-version-history-dialog.tsx:13` | toutes pages Dashboard | non | dialog sur overlay | `aria-label` | visible non reliée | ferme | absent | absent | page | max-w-3xl | 180 ms | 1100/1110 | D | stabiliser localement | élevé |
| MODAL-USAGE-028 | SourceHistoryModal | `src/components/admin/pokemon/source-watch-panel.tsx:105` | `/pokemon-admin?section=sources` | non | dialog sur overlay | absent | visible non reliée | non fermant | absent | absent | page | max-w-5xl | aucune | 1100/1001 | D | relier titre/description | élevé |
| MODAL-USAGE-029 | DataDeployHistoryModal | `src/components/admin/pokemon/source-watch-panel.tsx:216` | même route | non | dialog sur overlay | absent | visible non reliée | non fermant | absent | absent | page | max-w-5xl | aucune | 1100/1001 | D | relier titre/description | élevé |
| MODAL-USAGE-030 | Game Master DetailModal | `src/components/admin/pokemon/game-master-explorer-panel.jsx:270` | `/pokemon-admin?section=game-master-explorer` | non | dialog | `aria-label` | — | non fermant | ferme | initial absent | lock | fullscreen mobile | aucune | 95 | D | conserver, documenter | élevé |
| MODAL-USAGE-031 | DetailModal Pokémon | `src/components/admin/pokemon/detail-modal.jsx:1442` | plusieurs sections Pokémon | non | dialog | absent | — | ferme | absent | absent | page | bottom-sheet/fullscreen | aucune | 1100 | D | relier titre | critique |
| MODAL-USAGE-032 | Preview asset imbriquée | `src/components/admin/pokemon/detail-modal.jsx:1085` | dans MODAL-USAGE-031 | non | presentation | absent | — | ferme | absent | absent | hérité | nested `78dvh` | aucune | 1120 | D | nom + close local | critique |
| MODAL-USAGE-033 | Drawer Dashboard mobile | `src/components/admin/layout/admin-app-frame.tsx:81` | toutes pages Dashboard | non | — | — | — | ferme | absent | absent | page | drawer 286 px | spring | 50 | E | conserver drawer | élevé |
| MODAL-USAGE-034 | Navigation Admin Pokémon mobile | `src/components/admin/pokemon/admin-section-navigation.jsx:146` | `/pokemon-admin` | non | dialog/sheet | `aria-label` | — | pas d’overlay distinct | ferme | close initial, pas trap/retour | lock | fullscreen/safe-area | aucune | 90 | E | conserver sheet | élevé |
| MODAL-USAGE-035 | Confirmation suppression Event | `src/components/admin/events/events-calendar-panel.jsx:551` | Events | non | natif UA | natif | natif | natif | natif | natif | natif | natif | natif | UA | E | conserver synchrone | élevé |
| MODAL-USAGE-036 | Confirmation correction Learning | `src/components/admin/learning/learning-detail-modal.tsx:170` | `/js-progress` | non | natif UA | natif | natif | natif | natif | natif | natif | natif | natif | UA | E | conserver synchrone | moyen |
| MODAL-USAGE-037 | Confirmation fin Learning | `src/components/admin/learning/learning-detail-modal.tsx:267` | `/js-progress` | non | natif UA | natif | natif | natif | natif | natif | natif | natif | natif | UA | E | conserver synchrone | élevé |
| MODAL-USAGE-038 | Confirmation rollback collection | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx:338` | Ma collection | non | natif UA | natif | natif | natif | natif | natif | natif | natif | natif | UA | E | conserver synchrone | critique |

## Helpers et faux positifs exclus

- `ModalPortal` est un helper de portal sans surface.
- `DocumentPreview`, `KanbanTaskPreview`, les menus de palette et les previews JSON inline ne sont pas des dialogs.
- Les calques `studio-grid`, `scanline-overlay`, gradients et halos sont décoratifs.
- Les confirmations inline de Notes/Writer ne créent aucune fenêtre séparée.
