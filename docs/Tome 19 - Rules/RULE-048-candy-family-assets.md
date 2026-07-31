---
id: RULE-048
title: Règle des assets candy de famille
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [ARCH-013, DATASET-030, ADR-015]
---

# RULE-048 — Assets candy de famille

1. La clé unique est `familyId`.
2. `assets.candy.image` reste l'asset normal historique.
3. `assets.candy.xlImage` est résolu par le pipeline Data et peut être `null`.
4. Toute forme et tout bundle `assetsRef` copient la même structure de famille.
5. Une divergence fiche/bundle fait échouer la validation.
6. Aucun consommateur ne concatène un chemin `xl_candy`.
7. Aucun fallback silencieux ne remplace un XL absent par le bonbon normal.
