---
id: ARCH-013
title: Résolution des assets candy par famille
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-Assets-API, PokemonGo-API-, Dashboard Admin]
references: [DATASET-030, RULE-048, ADR-015, PAGE-064]
---

# ARCH-013 — Résolution candy

`scripts/add-candy-assets.js` est l'unique pipeline de résolution. Il construit la famille depuis les graphes d'évolution et héritages, consulte l'inventaire réel `PokemonGo-Assets-API/xl_candy`, puis produit `familyId`, `image`, `xlImage` et les couleurs de famille.

La même structure est copiée dans le JSON Pokémon/forme et dans son bundle `pokemon-assets` afin que chacun soit autonome. Le JSON Pokémon reste la source métier. Le validateur exige une égalité profonde entre les copies et contrôle que les chemins utilisent `familyId`, jamais `dexId`, `formId`, costume ou genre.

Si l'asset XL n'existe pas, `xlImage` vaut `null` et l'absence apparaît dans `candy-assets-report.json`. Une panne de l'inventaire distant arrête la génération pour éviter d'effacer silencieusement les références.
