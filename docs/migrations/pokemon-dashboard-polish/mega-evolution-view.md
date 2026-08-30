# Méga-évolutions dans la vue Évolution

## Résolution des données

La fiche Pokémon de base ne duplique pas les données d'une forme Méga. Son tableau `megaEvolutions` contient uniquement les `formId` canoniques à résoudre dans le catalogue chargé.

Pour chaque cible, la vue utilise directement la fiche Méga séparée :

- nom localisé, forme et image depuis la cible ;
- `megaEnergyCost` comme coût initial ;
- `availability.released` comme statut de disponibilité ;
- `key` comme destination de navigation vers la fiche détaillée.

Les fiches canoniques actuelles ne contiennent aucun coût suivant, niveau Méga ou cooldown. La vue le signale et ne calcule ni n'invente ces valeurs.

## Présentation

Les évolutions classiques et Méga partagent la section `Évolutions`. Les Méga sont regroupées sous un sous-titre dédié, ce qui conserve la hiérarchie métier sans créer un panneau concurrent. Les formes `mega-x` et `mega-y` restent distinctes.

Lorsqu'un Pokémon n'a ni évolution classique ni Méga, l'état vide l'indique explicitement. Une référence Méga sans cible résolue conserve son identifiant mais ne devient pas un faux lien.

## Couverture

`npm run test:pokemon-mega-evolutions` vérifie les données réelles suivantes :

- Florizarre vers Méga-Florizarre, coût initial 200 et statut disponible ;
- Dracaufeu vers Méga-Dracaufeu X et Y, chacune avec sa forme, son image et son coût ;
- Bulbizarre sans Méga, sans cible artificielle ;
- intégration dans la section Évolution et conservation de la navigation.
