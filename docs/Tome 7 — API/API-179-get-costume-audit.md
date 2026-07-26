---
id: API-179
title: GET audit privé Costumes
version: 1.1.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-028, PAGE-057]
---

# API-179 — GET audit privé Costumes

`GET /api/v1/admin/costume-audit` exige le secret Admin et accepte recherche, statut, shiny, événement, type, tri, ordre et pagination. La réponse réhydrate chaque alias depuis l’Identity Manager courant avant filtrage et pagination. Il n’existe volontairement aucune route `/api/v1/costume-audit` publique ni schéma Margxt dans OpenAPI.
