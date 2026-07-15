---
id: API-175
title: POST Game Master regenerate
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, PokemonGo-Data, Dashboard Admin]
references: [PAGE-052, ADR-012]
---

# API-175 — POST /api/v1/admin/game-master/regenerate

Récupère, valide, indexe, compare, calcule le diff, écrit le staging et active atomiquement. Un hash identique ne crée pas de snapshot.
