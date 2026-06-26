# Maintenance Des Données

## Sources De Vérité

- Le depot prive `PokemonGo-Data` contient les JSON sources.
- `PokemonGo-Data/pokemon/` contient uniquement les fiches principales.
- `PokemonGo-Data/pokemon-forms/` contient les données complètes de chaque forme.
- `PokemonGo-Data/pokemon-assets/` contient les assets lourds séparés : Home, portraits,
  portraits shiny, Location Cards, Shuffle et variantes visuelles.
- `regionForms`, `megaEvolutions`, `dynamaxForms` et `gigantamaxForms` sont des
  listes de références `formId`.
- `PokemonGo-Data/moves/`, `PokemonGo-Data/types/`, `PokemonGo-Data/generations/` et `PokemonGo-Data/weather/` sont les
  catalogues centraux.
- Les fiches complètes utilisent `regionId`; ne jamais recopier l'objet région ni
  la génération. Les formes Méga et Max héritent ces informations de leur base.
- `weatherBoost` et `PokemonGo-Data/types/*/weatherBoost` utilisent les identifiants de
  `PokemonGo-Data/weather/`.

Ne jamais recopier les données complètes d'une forme dans une fiche principale. Ne jamais
remettre `assets.home`, `assets.shuffle`, `assets.locationCards`, `assets.portrait`,
`assets.portraitShiny` ou `assetForms` dans `pokemon/` ou `pokemon-forms/` : ces champs
doivent rester dans `pokemon-assets/` et dans la collection MongoDB `pokemonAssets`.

## Contrôles Avant Contribution

```bash
npm run migrate:json-order:write
npm run audit:forms
npm run audit:identifiers
npm run audit:moves
npm run audit:weather
npm test
```

Le normaliseur d'ordre vérifie que les valeurs sont strictement identiques avant
chaque écriture.

Le Dashboard Admin valide tous les champs obligatoires de chaque famille de fiche :
Pokémon normal, forme complète, Méga / Primo et forme Max. Un asset complémentaire
comme Pokémon Shuffle ne remplace jamais les images Pokémon GO obligatoires d'une
fiche déjà sortie.

Après une modification manuelle des JSON, lancer au minimum une validation locale puis
une synchronisation Mongo. Si une fiche de l'admin affiche encore des assets lourds dans
son `JSON source`, le snapshot utilisé par l'application est obsolète ou n'a pas récupéré
`pokemon-assets/`.

## Snapshot Du Dashboard Admin

Le Dashboard Admin ne doit pas lire un vieux dossier `.data/PokemonGo-Data`. Avant
chaque build, `scripts/data/ensure-data.js` synchronise automatiquement ce clone local
sur `PokemonGo-Data@main` avec `git fetch`, `git reset --hard origin/main` et
`git clean -fd`. La structure est refusée si `pokemon-assets/` est absent.

Flux normal après une modification manuelle :

```bash
cd ../PokemonGo-Data
git add .
git commit -m "..."
git push origin main

cd ../Dashboard\ Admin
npm run build
```

Le `npm run build` déclenche `prebuild`, donc le Dashboard récupère la dernière version
des JSON et des assets séparés. En développement local, si `npm run dev` tourne déjà,
relancer le serveur ou exécuter `node scripts/data/ensure-data.js` pour rafraîchir
immédiatement le snapshot.

En production, après un push sur `PokemonGo-Data`, utiliser le bouton
`Redéployer` dans le header du Dashboard Admin. Ce bouton appelle un Deploy Hook
Vercel et force un nouveau build du Dashboard, donc `prebuild` récupère le dernier
commit `PokemonGo-Data@main`.

Configuration requise sur Vercel :

- créer un Deploy Hook dans le projet Dashboard Admin, ciblé sur la branche `main` ;
- ajouter son URL dans la variable d'environnement
  `DASHBOARD_VERCEL_DEPLOY_HOOK_URL` ;
- garder `POKEMON_GO_DATA_REPO`, `POKEMON_GO_DATA_REF` et
  `POKEMON_GO_DATA_TOKEN` configurés pour que le build puisse cloner les JSON.

Chaque redéploiement demandé depuis le Dashboard est historisé dans Mongo via
`matweb.dashboard.deployHistory`. L'historique compare le commit data utilisé par le
Dashboard deployé avec le dernier commit GitHub et liste les fichiers JSON suivis :
fiches, formes, `pokemon-assets/`, catalogues, stickers et sources.

Ne jamais corriger directement les JSON dans `.data/PokemonGo-Data` : ce dossier est un
cache ignoré et sera écrasé à la prochaine synchronisation.

Les migrations `npm run migrate:regions` et `npm run migrate:weather` doivent
indiquer `changedFiles: 0` après une contribution. Utiliser leurs variantes
`:write` uniquement lorsqu'une migration centrale est réellement nécessaire.

## Imports D'assets

```bash
npm run import:pokemon-shuffle
npm run import:pokemon-shuffle:write
npm run import:enrich-forms
npm run import:enrich-forms:write
```

Toujours contrôler le mode sans `:write` avant l'écriture. L'importeur Shuffle associe
chaque fichier à une seule fiche exacte, utilise `chromatique` pour le shiny et classe
les suffixes `shadow`, `purified`, `dynamax` et `gigantamax`. Les fichiers sans fiche
compatible restent dans la galerie et sont listés dans
`PokemonGo-Data/pokemon-shuffle-import-report.json`.

## Évolution Du Schéma

Toute évolution doit avoir une migration reproductible, un audit, une mise à jour de
la documentation et un test. Éviter les modifications manuelles répétitives.
