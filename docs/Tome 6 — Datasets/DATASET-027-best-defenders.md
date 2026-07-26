---
id: DATASET-027
title: Best Defenders Pokémon GO Hub
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PROVIDER-020, PAGE-056, API-177, API-178]
---

# DATASET-027 — Best Defenders Pokémon GO Hub

Dataset public de 250 lignes réparties dans les tiers `S`, `A+`, `A`, `B`, `C` et `D`. MongoDB utilise `best_defenders`, document `key=current`, payload gzip, hash canonique, diff, upsert et relecture de contrôle.

La source fournit le tier et le score. Identité, nom local, types et images proviennent exclusivement du catalogue canonique. Les diagnostics non résolus sont historisés avec chaque exécution.
