---
id: API-164
title: POST Regenerate Pokemon Identity Mappings
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-021, PAGE-051, API-163]
---

# API-164 — POST /api/v1/admin/pokemon-identity-mappings/regenerate

Route privée qui recharge le Game Master PokeMiners, compare toutes les formes locales, persiste le snapshot vérifié dans `pokemon_identity_mappings` et renvoie les compteurs/diff. Aucun fallback JSON runtime n'est utilisé.
