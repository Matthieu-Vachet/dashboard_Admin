# PvP Rankings — explication du statut PARTIAL

## Snapshot audité

Le snapshot MongoDB du 22 août 2026 contient 20 442 classements, zéro entrée ignorée, zéro `MAPPING_MISSING` et deux warnings. Les deux messages bruts sont :

1. `bayou-1500: volcarona sans Rank 1 calculable.`
2. `1 entrees avec attaque non matchee: none (1).`

Ils ne recouvrent ni l'information Engine `SKIDDO` / `ROCK_SLIDE`, ni un échec de mapping Pokémon.

## Diagnostic exact

### Volcarona · bayou-1500

- Code exposé : `RANK1_INELIGIBLE_AT_SOURCE_LEVEL_FLOOR`.
- Cause : le Game Master PvPoke fixe `levelFloor` à 20. Avec les statistiques source de Volcarona, la combinaison minimale 0/0/0 atteint déjà 1 822 PC, au-dessus de la limite de 1 500 PC.
- Impact : le classement reste valide et visible, mais le Dashboard ne peut pas publier un niveau, des PC et des IV Rank 1 légaux.
- Action : aucune action opérateur. Le warning reste non bloquant et justifie le statut `PARTIAL` tant que la contrainte source subsiste.

### Unown · great

- Code source : `MOVE_UNMATCHED:none`.
- Cause : la ligne officielle PvPoke contient `HIDDEN_POWER_PSYCHIC`, `STRUGGLE`, puis la sentinelle `none`. Cette dernière signifie « pas de seconde attaque chargée » et n'est pas une attaque.
- Impact : aucun. Pouvoir Caché et Lutte sont conservés, aucune entrée n'est ignorée et aucun mapping Pokémon ne manque.
- Action : aucune action opérateur. Le Dashboard classe cette sentinelle comme information ; seule, elle ne dégrade plus un résultat en `PARTIAL`.

## Présentation et contrat

`RegenerationControl > Détails` affiche désormais une carte par warning avec code, entité, raison, impact et action. **Voir le rapport** ouvre les mêmes détails structurés, même quand la liste des entrées non matchées est vide. Les warnings structurés déjà fournis par une future API sont conservés ; les messages historiques sont normalisés par le Dashboard.

Le compteur `WARNING` reste le compteur brut du rapport. `actionableWarningCount` exclut seulement les sentinelles provider reconnues comme informatives. Les warnings inconnus restent avec impact par défaut afin de ne jamais masquer une nouvelle anomalie.

La génération locale en lecture seule a rencontré le quota GitHub public à zéro sur l'API de tree PvPoke ; l'audit des deux warnings s'appuie donc sur le snapshot MongoDB courant, les entrées détaillées Volcarona et Unown, le Game Master PvPoke servi par CDN et le code du générateur Data synchronisé. Aucune écriture MongoDB ni modification du dépôt Data n'a été réalisée pendant l'audit.
