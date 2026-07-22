# Rapport final — Sprint complet Select + Checkbox

Date : 22 juillet 2026. Statuts : Select `completed`, Checkbox `completed`. Identifiants officiels : `DS-BACKLOG-006` et `DS-BACKLOG-007`.

## Résultat

Les deux familles possèdent désormais une primitive native-backed minimale. `Select` transmet `SelectHTMLAttributes<HTMLSelectElement>` et un ref HTML ; `Checkbox` transmet les attributs d'input hors `type` et fixe `type="checkbox"`. Toutes deux consomment le Color System, fusionnent `className`, conservent les comportements du navigateur et n'embarquent aucune logique métier.

Le working tree contenait au démarrage les lots G1 Modal, Card et Color System déjà validés : 88 fichiers suivis modifiés et douze entrées non suivies. Ils ont été conservés. Le lot G2 Select + Checkbox a été ajouté sans restauration ni nettoyage destructif ; aucun changement G3 n'a été identifié.

## Inventaire et migration

| Mesure | Avant | Après |
|---|---:|---:|
| Select compatibles / canoniques | 67 / 0 | 67 / 67 |
| Select nommés | 49/67 | 67/67 |
| Couverture Select | 0 % | 100 % |
| Checkbox compatibles / canoniques | 10 / 0 | 10 / 10 |
| Checkbox nommées | 9/10 | 10/10 |
| Couverture Checkbox | 0 % | 100 % |

Les 77 racines sont réparties dans 23 fichiers consommateurs. Les cinq wrappers Select existants — deux `SelectField`, deux `FilterSelect` et `FormatSelect` — composent la primitive sans perdre leurs props. Les 18 noms accessibles Select manquants et le nom de la checkbox Kanban proviennent du texte ou du contexte métier déjà présent. Valeurs, options, handlers, contrôle React, labels visibles, classes, responsive et les deux disabled réels de l'Identity Manager sont conservés.

## Exclusions

- `AdminPaletteSelector` reste un menu graphique spécialisé, pas un Select natif.
- Le bouton Best Attackers avec `aria-checked` reste une sélection métier spécialisée.
- Les trois boutons `aria-pressed` et le radio Learning gardent leur sémantique.
- Aucun contrat combobox, recherche, async, Switch, Toggle, fieldset, indeterminate ou gestion d'erreur n'est inventé.

Le scan final ne contient aucun Select ou Checkbox générique natif hors primitive et aucun cas ambigu.

## Accessibilité, interactions et responsive

Les 67 Select et 10 Checkbox ont un nom accessible démontré. La vérification runtime exerce changement de valeur, Tab, Space pour Checkbox, focus visible, label cliquable, disabled et attributs natifs required. Elle couvre les contrôles directs, les wrappers, des contrôles en Modal et les exclusions spécialisées.

La matrice contient 66 scénarios : onze pages × dark/light × 375×812, 768×1024 et 1440×1000. Aucune différence significative de DOM, valeur, interaction, layout, overflow ou pixels n'est détectée. La seule évolution contrôlée est la taille visuelle des checkbox browser-default, de 13×13 à 20×20 ; la géométrie des Select reste stable. Les petits écarts de page sont sous 1,45 % et localisés hors contrôles migrés.

## Tests exacts

| Validation | Résultat |
|---|---|
| Test statique Select + Checkbox | 7/7 pass |
| TypeScript `tsc --noEmit` | pass, 0 erreur |
| ESLint ciblé sur les sources/scripts touchés | pass, 0 erreur ; 59 warnings legacy `no-img-element` et un fichier CSS ignoré |
| Playwright Select + Checkbox | 66/66 scénarios |
| Régressions Modal / Card / Color System / Button | 8/8, 7/7, 6/6 et 5/5 pass |
| Régressions Field / accessibilité formulaires | 6/6 et 6/6 pass ; hash Field inchangé |
| `git diff --check` | pass |

Les artefacts avant/après sont ignorés sous `test-results/design-system-select-checkbox/` et ne font pas partie du lot Git.

## Architecture et qualité React

Les primitives utilisent `forwardRef`, des types HTML natifs et des exports nommés. Aucun hook, effet, écouteur global, requête, dépendance ou abstraction de données n'est ajouté. Le travail respecte le contrat minimal de `Field`, qui reste inchangé, et ne crée pas de façade ou barrel supplémentaire.

## Rollback local

Remplacer les 67 `<Select>` par leurs `<select>` initiaux et les 10 `<Checkbox>` par leurs `<input type="checkbox">`, retirer les imports et supprimer uniquement `ui/select.tsx` et `ui/checkbox.tsx`. Les options, valeurs, handlers, labels et données n'ont pas été déplacés. Les lots G1 ne doivent pas être restaurés pendant ce rollback.

## Gouvernance et Git

`DS-BACKLOG-006` et `DS-BACKLOG-007` sont `completed`. Le prochain sprint recommandé, non lancé, est **Loading / Empty / Error** (`DS-BACKLOG-008`). La fermeture Git porte explicitement G1 + G2 sur la branche courante `main`, avec le message `feat(design-system): consolidate core UI system`, après validation complète. Aucun artefact, secret, `.env`, déploiement ou pull request n'entre dans ce périmètre ; le hash et le résultat du push sont consignés dans le compte rendu d'exécution.
