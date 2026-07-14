---
id: COL-033
title: Collection MongoDB Best Attackers
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-API-]
references: [DATASET-022, API-161, API-162]
---

# COL-033 — best_attackers

Document `current` public conforme au modèle current partagé. Le payload est stocké dans `compressedData` en `gzip+json`; `data` ne conserve que le marqueur de compression. Hash, diff, diagnostics et relecture sont obligatoires.
