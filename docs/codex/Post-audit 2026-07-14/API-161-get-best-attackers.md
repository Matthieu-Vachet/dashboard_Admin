---
id: API-161
title: GET Best Attackers
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-022, PAGE-050]
---

# API-161 — GET /api/v1/best-attackers

Route publique MongoDB-only. Paramètres : `type`, `level`, `metric`, `search`, `shadow`, `mega`, `elite`, `class`, `movesetClass`, `page`, `limit`. La réponse hydrate Pokémon et attaques, puis ajoute rang global, pourcentage et tier. `POST /api/v1/admin/best-attackers/regenerate` exige le secret admin.
