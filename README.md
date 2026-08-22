# Dashboard Pokémon GO

Dashboard privé consacré exclusivement aux données, workflows et outils Pokémon GO. La route `/` ouvre directement le centre de commande Pokémon ; l’ancien sous-dashboard « Admin Pokémon » n’existe plus.

## Périmètre

- Données : fiches, candies, backgrounds, collections, assets et catalogues.
- Combat : PvP Rankings, simulateur PvP, calendrier GBL, Best Attackers, Best Defenders, Raids, Max Battles et Rocket.
- Événements : Œufs, Research, calendrier Events, Community Days et historique.
- Qualité : Identity Manager, résolution des variantes, Game Master Explorer, contrôles, Shiny Tracker, Source Watch et comparaison.
- Maintenance : Todo Pokémon, logs, règles JSON, corrections groupées et export.
- Outils Pokémon associés : documentation JSON, Discord Bot Control Center et supervision MongoDB.

Les modules personnels, d’organisation et d’apprentissage JavaScript vivent dans le repository autonome `dashboard-javascript`.

## Architecture et dépendances

L’application utilise Next.js, TypeScript, React, MongoDB et un Design System local. Elle consomme les contrats de `PokemonGo-Data`, `PokemonGo-API-` et `PokemonGo-Assets-API` sans déplacer leur code ni modifier leurs branches pour cette séparation.

Les données packagées de `PokemonGo-Data` sont préparées par `scripts/data/ensure-data.js`. Le `Generator Registry`, l’exécuteur d’actions, les resolvers, les manifests de fonctions Vercel et l’Engine canonique restent dans ce repository.

## Développement

```bash
npm install
cp .env.example .env.local
npm run dev
```

La navigation principale expose des routes plates telles que `/pokedex`, `/raids`, `/pvp-rankings`, `/events` et `/identity-manager`. `/pokemon-admin?section=...` redirige de façon permanente vers la route équivalente et conserve la recherche `q`.

## Données et API

Le Dashboard préserve les chemins historiques vers `PokemonGo-Data`, les routes `/api/pokemon-admin`, `/api/admin/events`, `/api/admin/community-days`, les APIs de session et le stockage `dashboard_store`.

Les collections Pokémon incluent notamment `events`, `events_archive`, `community_days`, `community_days_archive` et `dataset_runs`. Aucune donnée MongoDB n’est déplacée ou supprimée pendant la séparation.

## Tests

Contrôles essentiels :

```bash
npm run lint
npm run typecheck
npm run test:split
npm run test:admin-pokemon
npm run test:admin-actions
npm run test:data-repository
npm run test:regeneration-matrix
npm run verify:regenerations
npm run smoke:regenerations -- --base-url=<preview> --all
```

Les tests spécialisés couvrent également Engine, PvP, assets, variants, collections, Shiny, Events et notifications. Un build vert seul n’est pas considéré comme une validation des régénérations : le smoke test authentifié doit exercer les actions réelles sur une preview.

## Version et déploiement

La séparation publie `1.49.0` sur `develop`. Ce choix est un incrément mineur : le produit change de périmètre et de navigation, mais les contrats Data/API et les actions Pokémon restent compatibles. `dashboard-javascript` commence une histoire indépendante en `1.0.0`.

Les previews Vercel doivent provenir de `develop`. Aucun merge, tag final ou remplacement de production `main` n’est autorisé avant validation explicite.

Voir [docs/migrations/dashboard-split](./docs/migrations/dashboard-split) pour la carte des routes, MongoDB, l’authentification, l’environnement et le Design System.
