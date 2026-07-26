---
id: API-177
title: GET Best Defenders
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-027, PAGE-056]
---

# API-177 — GET Best Defenders

`GET /api/v1/best-defenders` est public et documenté dans OpenAPI. Paramètres : `search`, `tier`, `type`, `page`, `limit` et `full`. La réponse expose uniquement métadonnées publiques, résumé des tiers et lignes paginées enrichies d’identités/assets canoniques.
