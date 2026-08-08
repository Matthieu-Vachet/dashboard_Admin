# Architecture Dashboard par catégorie Pokémon

## Autorité commune

Le Dashboard utilise la classification `NORMAL`, `FORM`, `MEGA`, `DYNAMAX` et
`GIGANTAMAX`, stockée respectivement sous `normal`, `forms`, `mega`, `dynamax` et
`gigantamax`. `src/server/pokemon-go/apps/checklist/server/entity-category.js` et
`src/lib/pokemon-entity-category.ts` centralisent la résolution
`family + entityCategory + canonicalFilename` pour le serveur et les loaders typés.

Les composants React ne concatènent aucun chemin. Ils reçoivent les données hydratées
depuis le Core et ses références secondaires.

## Assets, PvP et chargement

```text
pokemon-assets/<core|home|shuffle|variants|location-cards>/<catégorie>/
pvp/pokemon/<catégorie>/
```

Le détail Pokémon charge le Core depuis `assetsRef`, les familles réellement présentes
depuis `assetRefs`, puis la fiche PvP depuis `pvpRef`. Les listes et caches légers ne
chargent pas les payloads secondaires inutiles. L’absence d’une famille ou d’un
classement PvP reste explicite et ne déclenche aucun fallback inventé.

## Engine

Les audits Assets et PvP contrôlent les cinq sous-répertoires, les compteurs des
manifestes, la catégorie attendue, le dossier réel, les références, `id`, `formId`,
`baseFormId`, `form`, `slug`, `dexId`, les collisions, les orphelins et les empreintes.

Diagnostics canoniques :

- `ENTITY_CATEGORY_MISMATCH` ;
- `PVP_WRONG_CATEGORY_DIRECTORY` ;
- `ASSET_WRONG_CATEGORY_DIRECTORY` ;
- `REFERENCE_CATEGORY_MISMATCH` ;
- `ENTITY_CLASSIFICATION_AMBIGUOUS`.

Une ambiguïté bloque la validation et reste visible dans l’Engine ; le nom de fichier
seul n’est jamais utilisé pour décider.

## Tests, déploiement et rollback

```bash
POKEMON_GO_DATA_DIR=../PokemonGo-Data npm run test:entity-categories
POKEMON_GO_DATA_DIR=../PokemonGo-Data npm run test:asset-architecture
POKEMON_GO_DATA_DIR=../PokemonGo-Data npm run test:pvp-architecture
npm run typecheck
npm run lint
npm run build
```

Un rollback se fait par un nouveau commit compatible avec la révision Data et API
ciblée, suivi d’un redéploiement. Aucun cache `.data` ne devient une source de vérité et
l’historique Git n’est pas réécrit.
