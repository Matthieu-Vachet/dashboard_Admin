---
id: API-158
title: POST /api/trainer-pokemon/import
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Route API privée
projects: [Dashboard Admin]
references: [DATASET-020, WORKFLOW-016, COL-030, COL-031, COL-032]
---

# API-158 — POST /api/trainer-pokemon/import

## Contrat

Corps `{ mode: "preview" | "commit", payload }`, limité à 12 Mo. `preview` valide et normalise sans mutation. `commit` répète l'intégralité des contrôles, écrit un snapshot staging, effectue le read-back puis active le pointeur propriétaire.

Session admin, same-origin et rate limit obligatoires. Les erreurs de validation contiennent des chemins précis. Une erreur avant activation conserve intégralement l'ancien snapshot.
