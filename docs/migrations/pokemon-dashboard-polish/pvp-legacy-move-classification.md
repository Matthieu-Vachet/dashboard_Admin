# Classification des attaques restreintes dans PvP Rankings

## Conclusion de l'audit

Le badge historique `LEGACY` du Dashboard ne venait pas d'un statut attaché aux lignes de classement PvPoke. Le générateur Data ajoutait un booléen `legacy` au document d'une attaque lorsque son fichier provenait d'un dossier `fast-elite/` ou `charged-elite/`. Comme les fichiers normaux et Elite partagent le même identifiant, la référence globale pouvait retenir la copie Elite et afficher le badge pour tous les Pokémon qui utilisent cette attaque.

Cette classification globale était fausse: la restriction dépend du couple Pokémon/attaque. Plaquage est par exemple une attaque Elite de Coudlangue, mais pas une attaque restreinte pour chaque Pokémon qui peut apprendre Plaquage.

## Sources et définition retenue

Le Game Master officiel PvPoke expose deux listes distinctes sur chaque Pokémon:

- `eliteMoves`: attaques accessibles notamment via CT d'élite ou distribution événementielle;
- `legacyMoves`: anciennes attaques retirées du movepool et non indiquées comme accessibles via CT d'élite.

Le code officiel PvPoke retire explicitement les entrées `eliteMoves` de `legacyMoves`, puis exclut des variantes Shadow les anciennes attaques qui ne sont pas accessibles via CT d'élite. Ces deux catégories ne doivent donc pas être fusionnées.

Le Dashboard ne prétend pas que PvPoke fournit un badge prêt à afficher dans une ligne de classement. Il croise l'identité du Pokémon avec les listes canoniques locales `eliteQuickMoves`, `eliteCinematicMoves`, `legacyQuickMoves` et `legacyCinematicMoves`, elles-mêmes auditées contre les catégories du Game Master PvPoke.

## Contrat d'interface

- Une attaque du pool Elite est libellée `Héritage` avec l'aide: « Attaque disponible historiquement et nécessitant généralement une CT d'élite ou un événement spécifique. »
- Une attaque du pool Legacy strict est libellée `Retirée` avec une aide qui précise qu'elle n'est pas indiquée comme accessible via CT d'élite.
- Une attaque ordinaire n'a ni badge ni lueur.
- La lueur partagée du lot 9 reste pilotée par le token Design System `--warning`.

## Chaîne de preuve

1. La ligne de classement donne le Pokémon et le moveset recommandé.
2. L'enrichissement Dashboard résout la fiche Pokémon canonique locale.
3. La classification compare l'identifiant de l'attaque à la bonne liste, selon qu'elle est immédiate ou chargée.
4. Le composant affiche le libellé et l'aide correspondant à la catégorie prouvée.

Références primaires auditées: `runtime-data/PokemonGo-Data/tooling/scripts/generators/generatePvpRankings.js`, le snapshot PvPoke mis en cache sous `operations/cache/pvpoke`, les fiches Pokémon canoniques, le [Game Master Pokémon PvPoke](https://github.com/pvpoke/pvpoke/blob/78c64048aebeb9265e1a090137c5463880fb6fa2/src/data/gamemaster/pokemon.json) et le [traitement officiel des listes Elite et Legacy](https://github.com/pvpoke/pvpoke/blob/78c64048aebeb9265e1a090137c5463880fb6fa2/src/js/GameMaster.js#L307-L328) au commit source exact du mapping courant.
