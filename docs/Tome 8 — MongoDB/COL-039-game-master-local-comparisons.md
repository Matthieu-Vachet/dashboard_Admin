---
id: COL-039
title: Collection game_master_local_comparisons
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, PokemonGo-Data]
references: [ADR-013, DATASET-024, RULE-045]
---

# COL-039 — game_master_local_comparisons

Comparaison auditable par snapshot : Pokémon, forme, costume, asset bundle, entrée locale, asset exact, provenance, ambiguïté et statut. Index unique `snapshotId + comparisonKey`.
