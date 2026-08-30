# JSON Builder — progression d’implémentation

## Prévol — 29 août 2026

- Branche Dashboard : `develop`
- Dashboard HEAD / `origin/develop` : `cf3307138b5b3705ac463b124fa53f7d97b5b638`
- Dashboard `origin/main` : `103a0f3bd2f59298760f8b6cd0e01767b4d8159b`
- Version Dashboard au démarrage : `1.52.0`
- PokémonGo-Data HEAD / `origin/develop` : `6a374cf8209e5d3ad51f597cc2fd033b3c7ddae5`
- PokémonGo-Data `origin/main` : `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`
- Version PokémonGo-Data au démarrage : `1.31.0`
- PokémonGo-API HEAD / `origin/develop` : `72a632da7d3a60c1bd5ab6f2d978fb1ecd654d22`
- PokémonGo-API `origin/main` : `952107b8cf262b212f7f3059be64218e395eb965`
- Version PokémonGo-API au démarrage : `1.26.0`

### Garde-fous

- `main` et les environnements de production restent hors périmètre.
- Les templates canoniques de PokémonGo-Data sont consommés comme source de vérité ; aucun schéma parallèle n’est créé.
- Aucun JSON canonique existant ne doit être reformaté ou réordonné.
- La modification locale préexistante de `templates/pokemon/exemple-dynamax.json` dans PokémonGo-Data appartient à l’utilisateur. Elle ne sera ni modifiée, ni indexée, ni committée par cette mission.
- Toute écriture est précédée d’un dry-run signé et périmé si la base de données change.

## Lots

- [x] Prévol Git, versions et périmètre
- [x] Audit des templates, schémas, catégories, Engine, Identity et routes existants
- [x] Contrat central, états de valeurs et ordre récursif des clés
- [x] Dry-run, diff, empreinte et protection contre l’écrasement
- [x] Transaction atomique, sauvegardes et rollback
- [x] Wizard, brouillons, historique et navigation
- [x] Contrôles Engine / Identity et rapports
- [x] Tests de sécurité, non-régression, build et validation navigateur
- [x] Version, commits `develop`, push et preview

## Lot moteur et interface

- Contrat central chargé depuis le checkout Data ou, si le runtime de preview ne contient pas encore les templates, depuis le dépôt GitHub PokémonGo-Data sur `develop`.
- Ordre des clés reconstruit récursivement à partir du template sélectionné ; les clés supplémentaires restent interdites par les schémas canoniques.
- Les états `unknown`, `not-published` et `not-applicable` ne deviennent `null` ou omission que lorsque le schéma l’autorise ; sinon ils bloquent la création.
- Fichiers générés : Pokémon, Assets Core, familles Assets demandées, PvP status-only, manifests canoniques et inventaire Identity officiel recalculé dans un overlay isolé.
- Patch parent limité au tableau concerné, avec copie de sauvegarde et conservation exacte du texte autour du tableau.
- Dry-run signé pendant 30 minutes, lié à la session, au contrat, au HEAD, aux hashes des fichiers et au brouillon.
- Écriture locale uniquement sur un checkout Data Git `develop`, staging fermé par allowlist, journal transactionnel et rollback inverse en cas d’échec.
- Wizard en dix étapes, brouillons localStorage/MongoDB, preview JSON, diff, copie, confirmation explicite et historique.
- Version Dashboard préparée : `1.53.0`. Data et API restent inchangés.

## Validation locale finale

- `test:json-builder` : 22 / 22.
- Tests Engine, diagnostics, catégories, Assets et PvP : tous passés.
- Tests Admin Pokémon : 47 / 47 ; split, documentation et version : passés.
- TypeScript et build Next.js de production : passés, route `/api/json-builder` packagée avec le générateur Identity.
- ESLint : 0 erreur ; 71 avertissements préexistants hors JSON Builder.
- Navigateur Playwright : contrat `develop`, wizard, preview à six fichiers, diff, écriture distante désactivée et responsive mobile validés.
- Matrice responsive globale : 220 pages, 11 largeurs, 2 thèmes.

## Validation Preview

- Cible : Preview Vercel de la branche `develop` ; aucune promotion production.
- URL de branche : `https://dashboard-admin-git-develop-matthieu-vachets-projects.vercel.app`.
- Déploiement validé : `https://dashboard-admin-8xvc15n8g-matthieu-vachets-projects.vercel.app` (`READY`).
- Bootstrap authentifié : contrat `develop`, mode `dry-run-only`, 1 617 identités, 10 templates Pokémon et 5 templates Assets.
- Dry-run authentifié : Pokémon, Assets Core, PvP, manifests Assets/PvP et inventaire Identity ; 0 bloquant, 0 JSON existant reformaté, 0 JSON non concerné modifié.
- Commits fonctionnel et release poussés sur `origin/develop` : `a189086` et `a5b73bb`.
- `origin/main` Dashboard est resté inchangé sur `103a0f3bd2f59298760f8b6cd0e01767b4d8159b`.

Ce fichier est mis à jour après chaque lot important afin de permettre une reprise sans ambiguïté.
