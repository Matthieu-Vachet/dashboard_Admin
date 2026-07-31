---
id: PAGE-060
title: Contrôle des Pokémon chromatiques
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-029, ADR-014]
---

# PAGE-060 — Pokémon chromatiques

La page compare les entrées externes à `availability.shinyReleased` et signale séparément les assets chromatiques absents. Les formes partageant un numéro sont résolues par nom et forme; un score ex æquo devient `ambiguous`.

La date et l'événement externes restent des observations. Ils ne sont pas copiés dans les JSON sans décision humaine et pipeline dédié.
