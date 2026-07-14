# Inventaire — Famille Modal

Date de l’inventaire : 14 juillet 2026. Les lignes correspondent au code inspecté et peuvent évoluer après cette date.

## Méthode et périmètre

La recherche couvre les imports et instances de `Modal`, les rôles `dialog`, `aria-modal`, portals, overlays fixes, composants nommés `Modal` ou `Dialog`, drawer mobile, previews plein écran et confirmations natives. Les fonds décoratifs `absolute inset-0`, aperçus inline et états de confirmation qui n’ouvrent aucune surface séparée sont distingués des dialogs.

Classification :

- A : utilise déjà correctement la primitive ; aucune modification ;
- B : wrapper simple strictement équivalent et migrable dans ce sprint ;
- C : dialog spécialisé ou flux dont la structure métier doit rester locale ;
- D : cas proche ou ambigu, mais équivalence non démontrée ; documentation seulement.

## Résultat global

| Classe | Total | Décision |
|---|---:|---|
| A | 11 | conserver sans modification |
| B | 0 | aucune migration source |
| C | 10 | conserver spécialisé |
| D | 4 | documenter ; nécessite un sprint distinct ou une décision d’API |
| Total runtime | 25 | inventaire complet du code courant |

## A — instances canoniques existantes

| # | Composant / usage | Fichier : ligne | Primitive | Wrapper métier / catégorie | Migration | Risque |
|---:|---|---|---|---|---|---|
| 1 | Éditeur de projet | `src/app/(dashboard)/projects/page.tsx:252` | `Modal` | fenêtre d’édition | aucune | moyen, formulaire |
| 2 | `SnippetModal` | `src/components/admin/dashboard/snippet-vault.tsx:189` | `Modal` | fenêtre d’édition | aucune ; fichier déjà modifié | moyen |
| 3 | Éditeur calendrier | `src/components/admin/forms/calendar-planner.tsx:382` | `Modal` | édition + confirmation intégrée | aucune | moyen |
| 4 | Éditeur Kanban | `src/components/admin/forms/kanban-board.tsx:344` | `Modal` | édition + confirmation intégrée | aucune | élevé, DnD adjacent |
| 5 | `LearningDetailModal` | `src/components/admin/learning/learning-detail-modal.tsx:44` | `Modal` | détail pédagogique complexe | aucune | élevé mais déjà composé |
| 6 | `LearningImportModal` | `src/components/admin/learning/learning-import-modal.tsx:129` | `Modal` | import / preview | aucune | élevé, import |
| 7 | preview LocationCard | `src/components/admin/pokemon/background-panel.jsx:190` | `Modal` | preview image | aucune | moyen |
| 8 | détail Shiny | `src/components/admin/pokemon/shiny-tracker-panel.jsx:232` | `Modal` | preview / détail | aucune ; fichier déjà modifié | élevé, données |
| 9 | `ImportModal` collection privée | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx:217` | `Modal` | import / confirmation | aucune | critique, import atomique |
| 10 | historique collection privée | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx:385` | `Modal` | historique / rollback | aucune | critique, rollback |
| 11 | éditeur Dashboard Backlog | `src/components/admin/tables/dashboard-backlog.tsx:568` | `Modal` | édition + confirmation intégrée | aucune ; fichier déjà modifié | élevé, persistance |

Ces onze instances proviennent de dix consommateurs ; le panel de collection privée contient deux racines `Modal`.

## C — dialogs spécialisés conservés

| # | Composant / usage | Fichier : ligne | Primitive actuelle | Catégorie | Pourquoi conserver | Risque |
|---:|---|---|---|---|---|---|
| 12 | `EventEditorModal` | `src/components/admin/events/event-editor-modal.jsx:9` | `ModalPortal` + overlay local | formulaire lourd | formulaire Events, palette legacy, `z-[1200]`, scroll et footer propres ; fichier modifié | critique |
| 13 | `EventDetailModal` | `src/components/admin/events/events-calendar-panel.jsx:1316` | `ModalPortal` + dialog local | fullscreen dialog métier | header illustré, contenu riche, scroll interne, actions et `z-[1200]` ; fichier modifié | critique |
| 14 | éditeur de collection | `src/components/admin/pokemon/collections-panel.jsx:703` | `createPortal` + dialog local | formulaire lourd | sticky header/footer, scroll et surface legacy ; fichier modifié | critique |
| 15 | `DetailModal` Pokémon | `src/components/admin/pokemon/detail-modal.jsx:1018` | `createPortal` + dialog local | fullscreen / bottom sheet | thème dynamique par type, navigation, tabs et responsive distinct | critique |
| 16 | preview d’asset imbriquée | `src/components/admin/pokemon/detail-modal.jsx:758` | overlay local `z-[1120]` | preview nested | doit rester au-dessus de `DetailModal`; politique nested absente | critique |
| 17 | drawer de navigation mobile | `src/components/admin/layout/admin-app-frame.tsx:81` | `AnimatePresence` + overlay local | Drawer | navigation plein écran partiel, mouvement spring, fermeture/navigation propres | élevé |
| 18 | suppression Event native | `src/components/admin/events/events-calendar-panel.jsx:546` | `window.confirm` | confirmation native | contrat synchrone dans un fichier modifié ; migration changerait la logique | élevé |
| 19 | révéler correction Learning | `src/components/admin/learning/learning-detail-modal.tsx:170` | `window.confirm` | confirmation native | flux pédagogique synchrone | moyen |
| 20 | terminer unité Learning | `src/components/admin/learning/learning-detail-modal.tsx:267` | `window.confirm` | confirmation native | attribution XP et garde métier | élevé |
| 21 | rollback collection privée | `src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx:325` | `window.confirm` | confirmation native | mutation critique et contrat synchrone | critique |

## D — cas proches mais non équivalents

| # | Composant / usage | Fichier : ligne | Primitive actuelle | Écart bloquant | Migration possible maintenant | Risque |
|---:|---|---|---|---|---|---|
| 22 | `AdminVersionHistoryDialog` | `src/components/admin/layout/admin-version-history-dialog.tsx:13` | Framer Motion + dialog local | entrée/sortie animée, eyebrow, header, rayon, largeur et scroll distincts ; aucun focus/scroll lock/Escape | non | élevé |
| 23 | `ImportModal` Events | `src/components/admin/events/event-editor-modal.jsx:54` | `ModalPortal` + overlay local | `z-[1200]`, palette/rayon/paddings propres, aucun rôle ni contrat focus ; fichier modifié | non | élevé |
| 24 | `SourceHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx:105` | `createPortal` + dialog local | overlay non fermant, dialog sans nom, aucun Escape/focus/scroll lock, surface legacy | non | élevé |
| 25 | `DataDeployHistoryModal` | `src/components/admin/pokemon/source-watch-panel.tsx:216` | `createPortal` + dialog local | mêmes écarts que l’historique Sources | non | élevé |

`AdminVersionHistoryDialog` était le candidat recommandé par la roadmap. Le code réel invalide sa migration dans ce sprint : `className` ne permet pas de préserver son header, son exit animation, son overlay et son scroll sans dupliquer l’anatomie ou étendre l’API de `Modal`.

## Helpers, compatibilité et cas reliés

- `src/components/admin/shared/modal-portal.jsx:5` est un helper de portal, pas un dialog.
- `src/components/checklist/detail-modal.jsx:3` réexporte le `DetailModal` Pokémon ; cette façade reste intacte.
- `src/components/pokemon-admin/source-watch-panel.tsx:3` réexporte les historiques Sources/Data ; cette façade reste intacte.
- Les confirmations à deux clics de Calendar, Kanban et Dashboard Backlog sont des états internes de trois instances A, pas de nouvelles modales.
- Les confirmations de Notes et Writer sont inline et restent hors famille Modal.
- `DocumentPreview`, les previews JSON inline et les overlays graphiques `pointer-events-none` ne sont pas des dialogs.
- Les fonds décoratifs `absolute inset-0`, les scanlines et les gradients ne sont pas des overlays interactifs.

## Collisions de working tree

Au premier inventaire, `snippet-vault.tsx`, `event-editor-modal.jsx`, `events-calendar-panel.jsx`, `collections-panel.jsx`, `admin-app.jsx`, `shiny-tracker-panel.jsx` et `dashboard-backlog.tsx` faisaient partie du working tree modifié ou l’ont rejoint pendant la baseline. Ils ont été inspectés en lecture seule. Aucun de ces fichiers n’est modifié par ce sprint Modal.
