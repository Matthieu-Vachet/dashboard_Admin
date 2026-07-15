---
id: ADR-012
title: Indexation MongoDB et snapshots Game Master
version: 1.1.0
status: Accepted
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, PokemonGo-Data, Dashboard Admin]
references: [PAGE-052, DATASET-023, DATASET-024, COL-035, COL-036, COL-037, COL-038, COL-039]
---

# ADR-012 — Indexation MongoDB et snapshots Game Master

## Décision

Le Game Master est séparé en documents MongoDB par template et snapshot. Une récupération identique met uniquement à jour `lastCheckedAt` et `checkCount`. Une récupération différente écrit templates, comparaison, diff et métadonnées en staging, puis active une unique ligne `game_master_states/current`.

Le JSON complet n’est jamais envoyé par une liste. Chaque template stocke une seule copie du JSON brut et un `searchText` borné ; les chemins aplatis sont reconstruits à la lecture du détail. La rétention conserve deux snapshots par défaut et reste configurable par `GAME_MASTER_SNAPSHOT_RETENTION`.

Avant une régénération, les staging sans snapshot ni pointeur valide et âgés d'au moins quinze minutes sont supprimés. Le premier snapshot ne crée aucun diff « ajouté » redondant. Une saturation Atlas retourne `GAME_MASTER_STORAGE_QUOTA_EXCEEDED` avec un diagnostic actionnable, puis le staging courant est nettoyé.

## Conséquences

La recherche et la pagination sont serveur, les diffs entre snapshots réels sont conservés et une écriture incomplète ne remplace pas le snapshot valide. La rétention et le stockage compact bornent la croissance MongoDB sans retirer le JSON brut nécessaire au détail.

## Historique

- 1.1.0 — 2026-07-15 : stockage compact, rétention bornée, purge des staging orphelins et diagnostic de quota.
- 1.0.0 — 2026-07-15 : architecture initiale des snapshots Game Master.

## Alternatives refusées

- Un document global : limite MongoDB, recherche et pagination inefficaces.
- Chargement client intégral : fuite de données internes et coût mémoire.
- Remplacement destructif : absence de rollback et d’historique.
