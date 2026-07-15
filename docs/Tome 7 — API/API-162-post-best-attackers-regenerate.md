---
id: API-162
title: POST Regenerate Best Attackers
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-022, API-161, PAGE-050]
---

# API-162 — POST /api/v1/admin/best-attackers/regenerate

Route privée protégée par `API_ADMIN_SECRET`. Elle reconstruit les classements depuis PokemonGo-Data et les métadonnées DialgaDex, valide les matrices, compresse le document, calcule le diff et le hash, effectue l'upsert MongoDB puis vérifie la relecture. La réponse compacte n'embarque pas les 33 Mo de données.
