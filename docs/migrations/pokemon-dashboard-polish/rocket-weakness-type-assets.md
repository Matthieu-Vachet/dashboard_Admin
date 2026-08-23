# Faiblesses Rocket avec assets de types

## Contrat d’affichage

Les faiblesses des cartes Team GO Rocket proviennent exclusivement de `data/battles/rocket/current.json`. Le Dashboard ne recalcule pas la table des types et ne modifie pas le snapshot.

- une faiblesse simple est affichée avec le multiplicateur Pokémon GO `×1,6` ;
- une double faiblesse est affichée avec `×2,56`, soit `1,6 × 1,6` ;
- les types d’une double faiblesse ne sont jamais répétés dans le groupe simple ;
- l’absence de double faiblesse ne crée aucun état vide artificiel ;
- les noms sont traduits par le référentiel partagé `typeLabels` ;
- les icônes viennent de `public/assets/pokemon/types/icons` via le résolveur partagé `typeIcon`.

## Couverture

Le test de contrat charge le snapshot Rocket canonique et vérifie les profils de Giovanni, des Leaders et des Grunts. Il couvre un Pokémon mono-type, une faiblesse simple, une double faiblesse et un cas sans double faiblesse. Chaque type réellement présent dans les faiblesses du snapshot doit posséder son asset local versionné.
