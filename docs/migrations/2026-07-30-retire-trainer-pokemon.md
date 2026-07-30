# Retrait de « Ma collection » — 30 juillet 2026

La fonctionnalité « Ma collection » et ses routes privées `trainer-pokemon` ont été retirées du Dashboard Admin.

## Conservation des données

Aucune donnée MongoDB n'est supprimée par cette modification. Les collections historiques `trainer_pokemon_owners`, `trainer_pokemon_snapshots` et `trainer_pokemon_entries` restent intactes afin de permettre une restauration ou une migration ultérieure.

Une purge éventuelle doit faire l'objet d'une opération séparée, sauvegardée et explicitement autorisée.
