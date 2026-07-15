---
id: API-176
title: POST Game Master reindex
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, PokemonGo-Data, Dashboard Admin]
references: [PAGE-052, ADR-012]
---

# API-176 — POST /api/v1/admin/game-master/reindex

Reconstruit tokens, propriétés, catégories et comparaison locale du snapshot actif sans nouvelle récupération externe.
