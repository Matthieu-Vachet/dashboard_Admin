# Promotion `develop` → `main` — 30 août 2026

## Manifest de restauration avant promotion

| Repository | Version | `main` avant merge | `develop` validé | Avance | Backup distant |
| --- | --- | --- | --- | ---: | --- |
| Dashboard Admin | 1.53.0 | `103a0f3bd2f59298760f8b6cd0e01767b4d8159b` | `0917ce21c0b093d21c31d7dc855054839c9464ae` | 60 | `backup-before-main-promotion-2026-08-30` |
| PokemonGo-Data | 1.31.0 | `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5` | `6a374cf8209e5d3ad51f597cc2fd033b3c7ddae5` | 11 | `backup-before-main-promotion-2026-08-30` |
| PokemonGo-API- | 1.26.0 | `952107b8cf262b212f7f3059be64218e395eb965` | `72a632da7d3a60c1bd5ab6f2d978fb1ecd654d22` | 13 | `backup-before-main-promotion-2026-08-30` |
| dashboard-javascript | 1.0.0 | `e34f89a6c37282331e93b3f6e549143225736e16` | `d889a06a850655b2caaa3140d1fb4a2afdb4ae3a` | 1 | `backup-before-main-promotion-2026-08-30` |

Les quatre backups sont des tags annotés, poussés sur leurs remotes respectifs avant toute opération sur `main`.

## Repositories audités mais exclus

| Repository | Motif |
| --- | --- |
| Landing-Page-PogoApi | `develop` et `main` identiques (`develop` en avance de 0 commit). |
| PokemonGo-Assets-API | `develop` en avance de 0 commit et en retard de 30 commits sur `main`. |
| discord-bot | Aucune branche `develop`. |

## Working trees avant promotion

- Dashboard Admin, PokemonGo-API-, dashboard-javascript, Landing-Page-PogoApi, PokemonGo-Assets-API et discord-bot : propres.
- PokemonGo-Data : modification locale utilisateur préexistante dans `templates/pokemon/exemple-dynamax.json`. Elle est volontairement préservée, non indexée et exclue de toute promotion.
- Les branches locales `develop` et `main` auditées correspondaient à leurs références `origin/*` après `git fetch --all --prune`.

## Garanties de promotion

- Aucun force push, rebase destructif, reset ou clean.
- Aucun repository sans changement n’est mergé.
- Aucun JSON existant n’a été reformaté ou réordonné pendant le merge.
- La modification locale utilisateur de `PokemonGo-Data/templates/pokemon/exemple-dynamax.json` est restée hors index et hors promotion.

## Résultat de la promotion

| Repository | Version finale | Merge applicatif sur `main` | Résultat |
| --- | --- | --- | --- |
| Dashboard Admin | 1.53.1 | `eec0b6f7b92b41c2a6f4b68b4421723d0cca0db4` | Arbre applicatif identique au `develop` validé ; correctifs CI et Design System inclus. |
| PokemonGo-Data | 1.31.0 | `f485bd8491f7a5f4c67db34c25da1241bd66c7e2` | 8 921 JSON suivis lisibles ; schémas, identités, Assets et PvP validés. |
| PokemonGo-API- | 1.26.0 | `46175add7dea2f554aef0c21e8da08af507edd84` | API, bundle serverless et synchronisation MongoDB validés. |
| dashboard-javascript | 1.0.0 | `75478b5bf43211f345f3cc71d78b6dc34b8df71d` | Vérification complète et build Vercel validés. |

Les merges ont été réalisés sans conflit, sans force push et sans réécriture parasite. Les repositories exclus n’ont reçu aucun merge. Aucun tag de release supplémentaire n’a été créé : les historiques audités n’emploient pas de convention homogène de tags de version ; seuls les tags de sauvegarde obligatoires ont été ajoutés.

## Validations locales et post-merge

### Dashboard Admin

- TypeScript et build Next.js 16 : succès ; route serverless `/api/json-builder` incluse.
- ESLint : 0 erreur, 71 avertissements historiques non bloquants.
- JSON Builder : 22/22 ; Design System : 37/37 ; Admin Pokémon : 47/47.
- Architecture Engine, Assets séparés, PvP dédié, catégories canoniques, diagnostics et versions : succès.
- Release guard : version 1.53.1 correctement déclarée et affichée.
- Vérification navigateur locale : 33 routes, authentification, MongoDB, thèmes et mobile.

### PokemonGo-Data

- Tests : 246/246.
- JSON suivis : 8 921 analysés, 0 invalide.
- Schémas : 1 617 fiches Pokémon/core et 3 030 records Assets secondaires valides.
- Templates canoniques : 14 valides.
- Identités : 1 928, 0 problème ; séparation Assets : 0 collision, 0 différence structurelle, 0 erreur.

### PokemonGo-API- et dashboard-javascript

- API : 189/189 tests, sync dry-run, build et bundle serverless réussis ; 11 générateurs, 34 modules JS et 12 manifests présents.
- Dashboard JavaScript : contrôle complet, tests, lint, types et build réussis avec MongoDB configuré.

## CI/CD

| Repository | Workflow | Run | Conclusion |
| --- | --- | --- | --- |
| Dashboard Admin | Verify regenerations | [33327835120](https://github.com/Matthieu-Vachet/dashboard_Admin/actions/runs/33327835120) | Succès sur `eec0b6f7…`. |
| PokemonGo-Data | Verify regenerations | [33327326254](https://github.com/Matthieu-Vachet/PokemonGo-Data/actions/runs/33327326254) | Succès sur `f485bd84…`. |
| PokemonGo-Data | Notifier PokemonGo-API | [33327326256](https://github.com/Matthieu-Vachet/PokemonGo-Data/actions/runs/33327326256) | Succès sur `f485bd84…`. |
| PokemonGo-Data | Synchronisation mensuelle PvPoke | [33387793366](https://github.com/Matthieu-Vachet/PokemonGo-Data/actions/runs/33387793366) | Succès après correction du réglage GitHub autorisant le workflow à créer sa PR ; [PR #2](https://github.com/Matthieu-Vachet/PokemonGo-Data/pull/2) ouverte, non fusionnée. |
| PokemonGo-API- | Verify regenerations | [33327335014](https://github.com/Matthieu-Vachet/PokemonGo-API-/actions/runs/33327335014) | Succès sur `46175add…`. |
| PokemonGo-API- | Synchroniser MongoDB Atlas | [33327335122](https://github.com/Matthieu-Vachet/PokemonGo-API-/actions/runs/33327335122) | Succès sur `46175add…`. |

Les échecs intermédiaires du Dashboard ont été diagnostiqués puis corrigés : le job sans accès au dépôt Data privé n’exécute plus le test canonique nécessitant ce dépôt, le JSON Builder consomme désormais les composants partagés du Design System, et la release a été portée à 1.53.1. Le dernier run applicatif est vert.

## Production validée le 31 août 2026

| Service | Déploiement validé | Alias Production | État |
| --- | --- | --- | --- |
| Dashboard Admin | `dpl_GeGCjRX39HxhNoHRrhLDGqy6gNNv` | [dashboard-admin-pi-ebon.vercel.app](https://dashboard-admin-pi-ebon.vercel.app) | READY, Production |
| PokemonGo-API- | `dpl_5ZeDYqxq75AjUz9y6xXJPH1tUFeo` | [pokemon-go-api.vercel.app](https://pokemon-go-api.vercel.app) | READY, Production |
| dashboard-javascript | `dpl_6wZPVXot9HAhipGKU3MNgKKjw5Zq` | [dashboard-javascript-sooty.vercel.app](https://dashboard-javascript-sooty.vercel.app) | READY, Production |

Contrôles Production effectués :

- Dashboard authentifié : HTTP 200, version visible `V1.53.1`, MongoDB configuré.
- API + DB : connectées, `/health` HTTP 200, documentation HTTP 200.
- API : `apiVersion` 1.26.0, `dataAppVersion` 1.31.0, endpoint Pokémon HTTP 200 avec 1 617 entrées.
- Engine : `VALID_WITH_DIAGNOSTICS`, 0 erreur d’architecture, 0 avertissement d’architecture, couverture 1 617 Pokémon, 503 attaques, 3 030 records Assets et 1 617 records PvP.
- Snapshot Data Production actualisé avec succès ; Engine toujours valide après actualisation.
- JSON Builder : contrat distant `develop`, 10 templates Pokémon et 5 templates Assets, wizard et rendu responsive valides, dry-run signé valide avec 0 bloquant ; écriture Production volontairement en mode `dry-run-only`.
- Invariants JSON Builder : JSON existants reformatés 0, JSON existants réordonnés 0, JSON non concernés modifiés 0.

## Conclusion

La promotion applicative, les backups, les tests, la CI, les déploiements Production, MongoDB, l’API, l’Engine, les régénérations principales et le JSON Builder sont validés. Le présent commit documentaire ne modifie aucun fichier produit ni aucune donnée canonique.
