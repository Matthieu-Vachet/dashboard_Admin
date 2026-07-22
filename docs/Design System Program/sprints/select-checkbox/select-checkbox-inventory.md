# Inventaire Select + Checkbox

Baseline du 22 juillet 2026. Le scan AST TypeScript couvre tous les fichiers `js`, `jsx`, `ts` et `tsx` sous `src`. La preuve racine par racine, avec fichier, ligne, fonction, contrôle, nom accessible, mode contrôlé, disabled, required et classes, est écrite dans `test-results/design-system-select-checkbox/inventory-before.json`.

## Select — baseline

| Mesure | Avant |
|---|---:|
| Racines Select natives | 67 |
| Fichiers | 20 |
| Select canonique | 0 |
| Wrappers compatibles | 5 |
| Spécialisé | 1, `AdminPaletteSelector` |
| Ambigu | 0 |
| Noms accessibles démontrés | 49/67 |
| Contrôlés | 67/67 |
| Disabled / required réels | 0 / 0 |
| Couverture canonique des cas compatibles | 0 % |

Classification : A62 racines génériques directes, B5 racines de wrappers composables, C1 menu de palette spécialisé, D0 faux Select, E0 ambigu. Les catégories A et B forment les 67 contrôles compatibles.

| Fichier | Lignes initiales | Total | Nommés | Classement |
|---|---|---:|---:|---|
| `projects/page.tsx` | 305 | 1 | 1 | A |
| `daily-tools.tsx` | 275 | 1 | 0 | A |
| `event-editor-modal.jsx` | 103 | 1 | 1 | B `SelectField` |
| `events-calendar-panel.jsx` | 730, 736 | 2 | 0 | A |
| `calendar-planner.tsx` | 296, 308, 435, 450 | 4 | 2 | A |
| `kanban-board.tsx` | 416 | 1 | 1 | A |
| `notes-board.tsx` | 204, 315, 329 | 3 | 3 | A |
| `todo-list.tsx` | 129 | 1 | 0 | A |
| `admin-app.jsx` | 855, 2487, 2495 | 3 | 1 | A |
| `best-attackers-panel.jsx` | 176, 192, 208, 224 | 4 | 4 | A |
| `community-days-panel.jsx` | ligne 238, trois racines | 3 | 0 | A |
| `events-history-panel.jsx` | ligne 44, quatre racines | 4 | 0 | A |
| `game-master-explorer-panel.jsx` | 263, 503–543 | 18 | 16 | A |
| `identity-manager-panel.tsx` | 769–945 | 10 | 10 | A |
| `pokemon-api-explorer.tsx` | 120 | 1 | 0 | A |
| `pokemon-identity-mappings-panel.jsx` | 114 | 1 | 1 | A |
| `pvp-rankings-panel.jsx` | 115, 131 | 2 | 2 | A + B `FormatSelect` |
| `shiny-tracker-panel.jsx` | 210–212 | 3 | 3 | A |
| `trainer-pokemon-collection-panel.tsx` | 406, 414 | 2 | 2 | A + B `FilterSelect` |
| `dashboard-backlog.tsx` | 646, 805 | 2 | 2 | B `FilterSelect`, `SelectField` |

Les 18 noms manquants ont un libellé déjà présent dans l'état, les options ou le contexte immédiat : facturation, type/statut Events, filtres Calendar, priorité Todo, comparaison gauche/droite, mois/shiny/génération Community Days, quatre filtres d'historique, type/catégorie de diff et endpoint API. La migration peut les relier sans créer de texte métier nouveau.

`AdminPaletteSelector` est un bouton ouvrant un menu de huit previews graphiques, avec animation, images, swatches et état actif. Il reste C : ce n'est ni un `<select>` natif ni une combobox à transformer.

## Checkbox — baseline

| Mesure | Avant |
|---|---:|
| Racines checkbox natives | 10 |
| Fichiers | 7 |
| Checkbox canonique | 0 |
| Wrappers | 0 |
| Spécialisé | 1 bouton `aria-checked` Best Attackers |
| Faux positifs | 4 : trois `aria-pressed`, un radio |
| Ambigu | 0 |
| Noms accessibles démontrés | 9/10 |
| Contrôlés | 10/10 |
| Disabled réels | 2 racines dans Identity Manager |
| Required / indeterminate réels | 0 / 0 |
| Couverture canonique des cas compatibles | 0 % |

Classification des quinze checkbox-like : A10 natives migrables, B0 wrapper, C1 sélection métier `aria-checked`, D4 faux positifs, E0 ambigu.

| Fichier | Lignes initiales | Total | Nommés | Particularité |
|---|---|---:|---:|---|
| `kanban-board.tsx` | 494 | 1 | 0 | texte de checklist disponible dans `item.text` |
| `admin-app.jsx` | 724, 819, 2558 | 3 | 3 | règles et filtre bulk |
| `collections-panel.jsx` | 752 | 1 | 1 | deux instances runtime depuis un mapping |
| `detail-modal.jsx` | 1404 | 1 | 1 | accent métier emerald conservable via `className` |
| `identity-manager-panel.tsx` | ligne 914, deux racines | 2 | 2 | disabled conditionnel réel |
| `pokemon-card.jsx` | 228 | 1 | 1 | contrôle assets métier |
| `trainer-pokemon-collection-panel.tsx` | 375 | 1 | 1 | filtre booléen simple |

Le pseudo-checkbox Best Attackers gère une sélection de type via un bouton `role=checkbox`/`aria-checked`; sa présentation et sa logique de groupe sont métier. Les boutons `aria-pressed` de filtres/navigation et le radio de stratégie Learning conservent leur sémantique propre.

## Décision de création

Les critères de la constitution sont satisfaits : 67 et 10 répétitions réelles, anatomie et comportements natifs communs, props HTML, focus/clavier de plateforme, contrat de ref simple et gain de duplication global. Aucune dépendance externe, combobox, Switch, Toggle, Fieldset ou gestion indeterminate n'est justifiée.

## Résultat après migration

| Mesure | Avant | Après |
|---|---:|---:|
| Contrôles Select compatibles | 67 | 67 |
| Select canoniques | 0 | 67 |
| Select natifs génériques hors primitive | 67 | 0 |
| Noms accessibles Select | 49/67 | 67/67 |
| Couverture canonique Select | 0 % | 100 % |
| Contrôles Checkbox compatibles | 10 | 10 |
| Checkbox canoniques | 0 | 10 |
| Checkbox natives génériques hors primitive | 10 | 0 |
| Noms accessibles Checkbox | 9/10 | 10/10 |
| Couverture canonique Checkbox | 0 % | 100 % |

Les cinq wrappers Select composent désormais la primitive sans nouvelle API. Les 18 noms Select manquants et le nom Kanban ont été reliés à du texte métier déjà présent. Les 67 Select restent contrôlés ; les 10 Checkbox restent contrôlées et les deux états disabled de l'Identity Manager sont conservés. `AdminPaletteSelector`, le pseudo-checkbox Best Attackers, les trois boutons `aria-pressed` et le radio Learning ne sont pas modifiés.

La preuve détaillée après migration est écrite dans `test-results/design-system-select-checkbox/inventory-after.json`. Le scan final classe 68 éléments Select-like — 67 contrôles canoniques et une spécialisation — ainsi que 15 éléments Checkbox-like — 10 contrôles canoniques, une spécialisation et quatre faux positifs — sans cas ambigu.
