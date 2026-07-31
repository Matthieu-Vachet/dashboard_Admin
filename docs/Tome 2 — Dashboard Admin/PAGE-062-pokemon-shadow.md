---
id: PAGE-062
title: Contrôle des Pokémon Shadow
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-029, ADR-014]
---

# PAGE-062 — Pokémon Shadow

La page compare la disponibilité Shadow à `availability.shadow` et la colonne chromatique à `availability.shadowShinyReleased`. Les deux dimensions sont indépendantes dans le diagnostic.

Le rapprochement privilégie l'identité nominale exacte et la forme normale, puis les formes explicites. Les ambiguïtés sont conservées pour revue humaine.
