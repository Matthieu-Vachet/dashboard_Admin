# Architecture Dashboard par catégorie Pokémon

## Autorité commune

Le Dashboard utilise les dix catégories `NORMAL`, `ALOLA`, `GALAR`, `HISUI`, `PALDEA`,
`FORM`, `MEGA`, `PRIMAL`, `DYNAMAX` et `GIGANTAMAX`. Les résolveurs serveur et TypeScript
appliquent le même contrat que `tooling/lib/entity-paths.js` dans PokemonGo-Data.

Les composants React ne concatènent aucun chemin. Ils reçoivent les données hydratées
depuis le Core et ses références secondaires.

## Assets, PvP et chargement

```text
data/assets/<core|home|shuffle|variants|location-cards>/<catégorie>/
data/pvp/pokemon/<catégorie>/
```

Le détail Pokémon charge le Core depuis `assetsRef`, les familles réellement présentes
depuis `assetRefs`, puis la fiche PvP depuis `pvpRef`. Les listes et caches légers ne
chargent pas les payloads secondaires inutiles. L’absence d’une famille ou d’un
classement PvP reste explicite et ne déclenche aucun fallback inventé.

Le Core est l’unique autorité des images, portraits, bonbons et couleurs. Une fiche
Pokémon ne contient ni bloc `assets`, ni `assets.assetsRef`, ni bloc `pvp` embarqué :
`assetsRef` et `pvpRef` sont deux champs racine. Une projection hydratée par l’API reste
dérivée et ne peut pas être réécrite comme source.

## Engine

Les audits Assets et PvP contrôlent les dix sous-répertoires, les compteurs des
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

État stabilisé : 1 611 Pokémon/formes, 1 611 Core, 3 147 familles secondaires et
1 611 fiches PvP. `MAPPING_MISSING`, `MOVE_MAPPING_MISSING`, `BROKEN_REFERENCE`,
`ORPHAN` et `MIGRATION_INCOMPLETE` valent zéro. L’unique `SOURCE_MISMATCH` PvP est une
information fournisseur et ne crée aucune clé dans « Fiches à contrôler ».

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
