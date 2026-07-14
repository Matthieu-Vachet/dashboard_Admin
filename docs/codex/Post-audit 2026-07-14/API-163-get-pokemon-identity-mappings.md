---
id: API-163
title: GET Pokemon Identity Mappings
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-021, PAGE-051, API-164]
---

# API-163 — GET /api/v1/pokemon-identity-mappings

Route privée MongoDB-only acceptant `status`, `search`, `page` et `limit`. Elle expose les mappings Game Master et leurs statuts sans figurer dans OpenAPI public.
