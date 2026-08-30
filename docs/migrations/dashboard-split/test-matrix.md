# Matrice de validation de la séparation

## Non-régression Pokémon

| Domaine | Avant | Après statique/unitaire | Runtime réel preview |
| --- | --- | --- | --- |
| Raids | OK | OK — Registry + bundle + matrice | PASS — HTTP 200, synchrone |
| Max Battles | OK | OK — Registry + bundle + matrice | PASS — HTTP 200, synchrone |
| Rocket | OK | OK — Registry + bundle + matrice | PASS — HTTP 200, synchrone |
| PvP Rankings | OK | OK — données dédiées, architecture, régénération | PASS — HTTP 200, état final `partial` accepté |
| Best Attackers | OK | OK — UI, API, registre | PASS — HTTP 200, synchrone |
| Best Defenders | OK | OK — protection source et matrice | PASS — `source_protected` attendu, protection Cloudflare confirmée |
| Eggs | OK | OK — Registry + bundle + matrice | PASS — HTTP 200, synchrone |
| Research | OK | OK — référentiel items + bundle | PASS — HTTP 200, synchrone |
| Events | OK | OK — routes, archives, références persistantes | PASS — HTTP 200, synchrone |
| Community Days | OK | OK — routes, références et matrice | PASS — HTTP 200, synchrone |
| Shiny Tracker | OK | OK — booléens canoniques et snapshots | PASS — HTTP 200, synchrone |
| Identity Manager | OK | OK — CRUD privé, diagnostics et mappings | PASS — HTTP 200, synchrone |
| Engine | OK | OK — rapport canonique, taxonomie, 1 617 fiches | PASS — Game Master, résolution des variantes et réindexation HTTP 200 |
| Generator Registry | OK | OK — 17 actions, 15 globales | PASS — 17/17 actions validées |

## Suites exécutées

- TypeScript, ESLint sans erreur, build et manifests de fonctions : PASS.
- Séparation Pokémon : 4/4 ; Admin Pokémon : 43/43.
- Contrats actions : 7/7 ; repository Data : 9/9 ; matrice régénérations : 6/6 ; notifications : 7/7.
- Variantes, présentation, détail, Shiny, candy, PvP, Engine, assets, collections, Events et Design System : PASS.
- Dashboard JavaScript : TypeScript, ESLint, split 4/4, Design System 4/4, version, validation learning et build : PASS.
- Parcours navigateur local Pokémon : 32 routes plates, redirection historique, auth, MongoDB, thèmes, console et navigation mobile : PASS.
- Parcours navigateur local JavaScript : 15 routes, auth, MongoDB, thèmes, console et navigation mobile : PASS.
- Parcours navigateur preview Pokémon : authentification, diagnostic privé Identity Manager et accès MongoDB : PASS.
- Parcours navigateur preview JavaScript : authentification, centre JavaScript présent, aucun domaine Pokémon visible : PASS.

## Validation runtime sur preview

- Date : `2026-08-22T18:16:09+02:00`.
- Dashboard Pokémon : `https://dashboard-admin-1cexd7vzw-matthieu-vachets-projects.vercel.app` (`Preview`, jamais `Production`).
- Fournisseur Pokémon API : preview dédiée, avec secret d’administration aligné uniquement dans l’environnement `Preview`.
- Commande : `npm run smoke:regenerations -- --base-url=<preview> --all`.
- Résultat global : `PASS`, 17/17 actions validées.
- Résultats complémentaires : Game Master, résolution des variantes, calendrier GBL, Community Days, Shiny Tracker, réindexation Game Master et snapshot GitHub Data en HTTP 200 ; PvP en `partial` accepté ; Best Defenders en `source_protected` attendu.

Le script accepte le bypass Vercel d’automation uniquement via `VERCEL_AUTOMATION_BYPASS_SECRET`. Le jeton a été transmis en mémoire et n'est ni écrit dans le repository ni consigné dans ce rapport. En local, les trois lectures privées dépendantes de `POKEMON_API_ADMIN_SECRET` sont identifiées comme indisponibles lorsque ce secret n’est volontairement pas installé ; la preview les a validées sans cette tolérance.
