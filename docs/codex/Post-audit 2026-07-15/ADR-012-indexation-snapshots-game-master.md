---
id: ADR-012
title: Indexation MongoDB et snapshots Game Master
version: 1.0.0
status: Accepted
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, PokemonGo-Data, Dashboard Admin]
references: [PAGE-052, DATASET-023, DATASET-024, COL-035, COL-036, COL-037, COL-038, COL-039]
---

# ADR-012 — Indexation MongoDB et snapshots Game Master

## Décision

Le Game Master est séparé en documents MongoDB par template et snapshot. Une récupération identique met uniquement à jour `lastCheckedAt` et `checkCount`. Une récupération différente écrit templates, comparaison, diff et métadonnées en staging, puis active une unique ligne `game_master_states/current`.

Le JSON complet n’est jamais envoyé par une liste. La rétention est illimitée par défaut et configurable par `GAME_MASTER_SNAPSHOT_RETENTION`; une valeur positive conserve les N snapshots les plus récents.

## Conséquences

La recherche et la pagination sont serveur, les diffs sont conservés et une écriture incomplète ne remplace pas le snapshot valide. Les cinq collections et leurs index augmentent le stockage mais évitent toute sérialisation massive dans le Dashboard.

## Alternatives refusées

- Un document global : limite MongoDB, recherche et pagination inefficaces.
- Chargement client intégral : fuite de données internes et coût mémoire.
- Remplacement destructif : absence de rollback et d’historique.
