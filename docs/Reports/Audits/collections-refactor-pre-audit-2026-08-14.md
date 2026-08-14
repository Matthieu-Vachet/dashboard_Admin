# Audit avant reconstruction de la page Collections

Date : 2026-08-14
Dashboard : V1.45.0
Commit : `6d4c976474f0fcafc2f2c45f6001abe09b3e24f9`

## Sauvegarde préalable

L'archive ciblée `archives/collections-refactor-before-2026-08-14-16-28-53/` a été créée avant toute modification du code produit. Son manifeste contient 6 336 fichiers avec empreintes SHA-256. Une restauration complète vers un répertoire temporaire a été vérifiée avec le statut `PASS`.

L'export MongoDB en lecture seule ne contient aucun document dont la clé comporte `collection`. Les collections visibles dans l'ancienne interface sont donc conservées par la clé navigateur historique `pokedex-v4-admin-collections`. Cette clé ne doit pas être supprimée avant une migration complète et relue avec succès depuis `dashboard_store`.

## Architecture observée

La totalité de la logique Collections est concentrée dans `src/components/admin/pokemon/collections-panel.jsx` : population, shiny, type, variantes, régions, recherche, tri, statistiques, pagination, clés de sélection et rendu des cartes. Il n'existe pas de moteur métier pur ni de modèle `CollectionEntry` indépendant de React.

Les 1 611 fiches exposées au composant proviennent de l'Engine canonique. La famille Assets `variants` est chargée à l'ouverture de la section, mais sa projection publique ne conserve que les variantes costume/event dans `eventAssets`. Les 94 différences de genre canoniques ne sont donc pas disponibles au moteur Collections actuel.

La persistance de `items` utilise bien une clé de fiche plutôt qu'un index de tableau, mais les collections elles-mêmes sont uniquement écrites dans `localStorage`. Le mécanisme MongoDB partagé est utilisé par les contrôles Assets, pas par Collections. Aucun `schemaVersion`, dry-run de migration ou rapport de clés historiques non mappées n'existe.

## Compteurs canoniques avant refactor

Le scan de l'Engine sur les JSON actuels retourne :

| Population | Nombre |
| --- | ---: |
| Fiches totales | 1 611 |
| Fiches strictement `released === true` | 1 460 |
| Fiches exclues car non sorties ou disponibilité absente | 151 |
| Pokémon de base sortis | 955 |
| Formes/régionales sorties | 300 |
| Méga/Primo sortis | 53 |
| Dynamax sortis | 127 |
| Gigamax sortis | 25 |
| Shiny sortis | 1 346 |
| Shadow sortis | 480 |
| Shadow shiny sortis | 405 |
| Identités costume/event principales | 325 |
| Variantes costume/event mâle/femelle | 437 |
| Variantes event femelles | 118 |

Ces nombres sont calculés depuis les JSON, jamais codés en dur. Le benchmark Event principal est actuellement 325, au-dessus du repère historique d'environ 309 parce que les formes canoniques possédant leur propre costume/event sont désormais des identités distinctes.

## Défauts métier identifiés

1. `entryIsReleased` accepte toute fiche dont `released` n'est pas explicitement `false`. Une disponibilité absente peut donc entrer dans une checklist, contrairement à la règle stricte `released === true`.
2. Le mode Non variante impose `kind === pokemon` et `form === normal` pour tous les types. Il supprime donc toutes les fiches spécialisées Méga, Dynamax et Gigamax. C'est la cause du catalogue Gigamax `0/0` visible dans les captures.
3. Le filtre Event accepte `collectionType === event` ou `kind === event`, puis reconstruit des cartes depuis `eventAssets`. La création ne regroupe pas les variantes de genre en Non variante : le catalogue affiche 437 variantes au lieu des 325 identités principales.
4. Les règles Normal, Lucky, Shadow et Purified sont dupliquées dans des conditions UI. Elles ne partagent pas un contrat testable et ne produisent pas de diagnostic de catégorie ou d'asset.
5. Le shiny est traité comme un filtre tardif de la liste. Aucun résolveur Collections n'interdit structurellement l'asset normal en mode shiny ou l'asset shiny en mode standard.
6. Les 94 variantes `kind === gender` du référentiel séparé ne sont pas projetées vers Collections. Multi variante ne peut donc pas respecter le dataset.
7. La recherche ne dispose pas des noms anglais et dépend d'un texte assemblé dans le composant.
8. Hundo est stocké dans la définition de collection mais n'est ni explicité dans le modèle métier ni vérifié comme dimension orthogonale.
9. Aucun diagnostic `COLLECTION_*`, aucune table de vérité, aucun contrôle de doublon et aucune fixture de contrat Collections n'existent.

## Défauts de présentation et responsive

Sur mobile, les statistiques, la liste complète des collections, la grande carte active et les dix cartes de régions précèdent les Pokémon. Les premières cartes arrivent après plusieurs viewports. Les actions fréquentes ALL/HAVE/NEED ne restent pas accessibles pendant le scroll.

Les cartes Pokémon ont une hauteur minimale de 13 rem et superposent une plaque colorée aux métadonnées. Le libellé technique produit par `pokemonVariantLabel` domine encore les costumes. Les états Lucky, Shadow et Purified ne possèdent pas de tokens Collections centralisés.

La modale de création est scrollable et possède un footer sticky, mais il n'existe aucun bottom sheet mobile pour la collection, les filtres, la région ou les actions secondaires. La fermeture ne gère pas encore Escape ni la restitution explicite du focus.

## Architecture cible

- `buildCollectionCatalog(sourceEntries, options)` devient l'unique source de vérité et retourne une entrée par case de checklist.
- `resolveCollectionAsset` garantit la correspondance normal/shiny et variante exacte.
- Une projection `collectionVariants` expose les variantes séparées `costume`, `event` et `gender` sans réintroduire les anciennes formes canoniques dans `variants`.
- Les diagnostics `COLLECTION_*` valident sortie, unicité, catégorie, event kind, gender, shiny et asset.
- ALL/HAVE/NEED, recherche et région restent des filtres de vue appliqués après le catalogue métier.
- Les clés historiques sont migrées par correspondance exacte puis par alias contrôlé, avec compteurs `existing`, `mapped`, `unmapped`, `ambiguous`; les clés non mappées restent conservées.
- Desktop conserve une composition riche. Mobile rend la collection active et les premières cartes en moins d'un viewport, avec statistiques repliées et contrôles sticky.
