---
id: COL-035
title: Collection game_master_states
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-]
references: [ADR-012, DATASET-023]
---

# COL-035 — game_master_states

Pointeur unique `current` : snapshot actif, hash, timestamps, compteurs et version d’index. Son remplacement atomique est la dernière étape d’une régénération différente.
