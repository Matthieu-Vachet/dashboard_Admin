---
id: COL-032
title: trainer_pokemon_entries
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Collection MongoDB privée
projects: [Dashboard Admin]
references: [DATASET-020, WORKFLOW-016, COL-030, COL-031]
---

# COL-032 — trainer_pokemon_entries

Entrées normalisées liées par `owner` et `snapshotId`. L'index unique `{ owner, snapshotId, sourceId }` conserve l'identifiant source exact. Les indexes secondaires couvrent numéro, nom, CP, IV, shiny/lucky, genre/alignement, forme/costume et forme spéciale.

Les images sont des références URL ou `null`; aucune donnée binaire n'est stockée. `searchText` est une chaîne normalisée réservée à la recherche privée.
