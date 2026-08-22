# Catalogue canonique Moves

## Source et projection

Le catalogue Admin lit les sept familles `data/moves/fast`, `fast-elite`, `charged`, `charged-elite`, `charged-plus`, `max` et `gmax`. `buildMoveCatalog()` groupe les fichiers par `id` canonique : le snapshot courant contient 503 fichiers mais 372 attaques uniques. Les doublons normal/Elite ne deviennent jamais deux lignes.

Chaque ligne expose un view-model unique `pvp` :

- rapide : `category`, `power`, `energy`, `turns`, `damagePerTurn`, `energyPerTurn`, `buffs` ;
- chargée : `category`, `power`, `energyCost`, `damagePerEnergy`, `buffs` ;
- Max/G-Max : identité, famille et valeurs raid restent visibles même lorsque `combat` est absent.

`availability` distingue `normal`, `elite`, `eliteRequirement` (`none`, `conditional`, `required`) et la liste des dossiers sources. `sourceFiles` garde la traçabilité de chaque JSON fusionné et `pokemon` conserve les fiches liées et leurs slots.

## Invariants

- Les métriques PvP viennent uniquement de `combat.*`; les valeurs arène/raid restent séparées.
- Un coût chargé positif est dérivé de `combat.energyCost`, ou à défaut de la valeur négative `combat.energy` du même contrat.
- Un move Elite partagé garde le fichier normal comme base et signale une disponibilité conditionnelle.
- Les familles Charged Plus, Max et G-Max restent présentes dans le catalogue sans inventer de métriques PvP.

La non-régression `npm run test:admin-pokemon` vérifie 372 IDs uniques, 503 sources, un Fast normal+Elite, un Charged normal+Elite et la couverture Charged Plus/Max/G-Max.
