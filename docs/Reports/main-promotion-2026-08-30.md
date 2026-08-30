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
- Aucun JSON existant ne doit être reformaté ou réordonné pendant le merge.
- Le rapport final complète ce document après CI/CD et validation Production.
