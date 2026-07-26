---
id: API-180
title: POST régénération audit Costumes
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-028, PROVIDER-021]
---

# API-180 — POST régénération audit Costumes

`POST /api/v1/admin/costume-audit/regenerate` exécute la comparaison Margxt avec le catalogue Identity Manager et PokemonGo-Data, écrit `costume_audits` de manière idempotente et transforme les aliases, costumes, ambiguïtés ou assets absents en diagnostics privés.
