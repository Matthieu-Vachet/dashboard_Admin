# Matrice de validation de la séparation

## Non-régression Pokémon

| Domaine | Avant | Après statique/unitaire | Runtime réel preview |
| --- | --- | --- | --- |
| Raids | OK | OK — Registry + bundle + matrice | À consigner après smoke |
| Max Battles | OK | OK — Registry + bundle + matrice | À consigner après smoke |
| Rocket | OK | OK — Registry + bundle + matrice | À consigner après smoke |
| PvP Rankings | OK | OK — données dédiées, architecture, régénération | À consigner après smoke |
| Best Attackers | OK | OK — UI, API, registre | À consigner après smoke |
| Best Defenders | OK | OK — protection source et matrice | À consigner après smoke |
| Eggs | OK | OK — Registry + bundle + matrice | À consigner après smoke |
| Research | OK | OK — référentiel items + bundle | À consigner après smoke |
| Events | OK | OK — routes, archives, références persistantes | À consigner après smoke |
| Community Days | OK | OK — routes, références et matrice | À consigner après smoke |
| Shiny Tracker | OK | OK — booléens canoniques et snapshots | À consigner après smoke |
| Identity Manager | OK | OK — CRUD privé, diagnostics et mappings | À consigner après smoke |
| Engine | OK | OK — rapport canonique, taxonomie, 1 617 fiches | À consigner après smoke |
| Generator Registry | OK | OK — 17 actions, 15 globales | À consigner après smoke |

## Suites exécutées

- TypeScript, ESLint sans erreur, build et manifests de fonctions : PASS.
- Séparation Pokémon : 4/4 ; Admin Pokémon : 43/43.
- Contrats actions : 7/7 ; repository Data : 9/9 ; matrice régénérations : 6/6 ; notifications : 7/7.
- Variantes, présentation, détail, Shiny, candy, PvP, Engine, assets, collections, Events et Design System : PASS.
- Dashboard JavaScript : TypeScript, ESLint, split 4/4, Design System 4/4, version, validation learning et build : PASS.
- Parcours navigateur local Pokémon : 32 routes plates, redirection historique, auth, MongoDB, thèmes, console et navigation mobile : PASS.
- Parcours navigateur local JavaScript : 15 routes, auth, MongoDB, thèmes, console et navigation mobile : PASS.

Les actions réelles sont consignées après création de la preview, sans utiliser la production `main`. En local, les trois lectures privées dépendantes de `POKEMON_API_ADMIN_SECRET` sont identifiées comme indisponibles lorsque ce secret n’est volontairement pas installé ; la preview doit les valider sans cette tolérance.
