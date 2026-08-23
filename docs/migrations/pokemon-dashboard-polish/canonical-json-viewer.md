# Viewer des JSON canoniques d'une fiche Pokémon

## Contrat

L'onglet `JSON` d'une fiche affiche un onglet par fichier canonique réellement résolu par le serveur. Il ne fusionne pas les documents et ne reconstruit pas de JSON monolithique.

L'ordre stable est le suivant :

1. `Pokémon` depuis `data/pokemon/...` ;
2. `Assets Core` depuis `data/assets/core/...` ;
3. `Assets Home` depuis `data/assets/home/...` ;
4. `Assets Shuffle` depuis `data/assets/shuffle/...` ;
5. `Assets Variants` depuis `data/assets/variants/...` ;
6. `Location Cards` depuis `data/assets/location-cards/...` ;
7. `PvP` depuis `data/pvp/pokemon/...`.

Une entrée n'est exposée que lorsque sa référence canonique est valide, que le fichier existe, que sa catégorie correspond à la fiche et que son contenu passe les contrôles d'identité du loader. Le JSON principal reste toujours présent puisque l'ouverture du détail dépend déjà de ce fichier.

## Présentation et actions

Le viewer expose le chemin exact du fichier actif, une coloration syntaxique, la copie du JSON, la copie du chemin et le téléchargement du document isolé. Le nom téléchargé est le nom réel du fichier canonique.

`assetSourceData` reste disponible dans la réponse détaillée pour les consommateurs historiques, mais cette agrégation de compatibilité n'est jamais affichée dans l'onglet `JSON`. L'interface utilise exclusivement `canonicalJsonRecords`.

## Couverture de non-régression

`npm run test:canonical-json-viewer` vérifie :

- une fiche normale avec Variants et Location Cards ;
- une forme Alola ;
- une Méga-évolution ;
- une forme Dynamax sans classement PvP utile ;
- une forme Gigantamax ;
- l'égalité profonde entre chaque payload exposé et le contenu de son fichier disque ;
- l'absence des onglets sans fichier réel ;
- les commandes de copie, de chemin et de téléchargement.
