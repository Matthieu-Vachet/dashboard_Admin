---
id: DATASET-021
title: Mappings Pokémon Game Master
version: 1.1.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [ADR-011, RULE-045, API-163, API-164, PAGE-051, COL-034]
---

# DATASET-021 — Mappings Pokémon Game Master

Source : `PokeMiners/game_masters`, fichiers `latest/latest.json` et `latest/timestamp.txt`. Le générateur extrait `pokemonSettings` et `formSettings`, déduplique `(pokemonId, form, assetBundleValue, assetBundleSuffix)`, compare les formes locales puis écrit atomiquement `game-master/gameMasterPokemonMappings.json`.

Contrat : `metadata` contient source, dates, total et compteurs ; `mappings` contient template, forme officielle, valeurs d'asset, forme locale et `mappingStatus`. Le snapshot actuel contient 2 456 mappings : 1 391 résolus et 1 065 formes locales absentes. Ces absences sont des diagnostics, pas des suppressions.

Les identités locales sont regroupées par `pokemonId + form + costume`. `isFemale` sélectionne l’asset final mais ne décide pas si le costume existe. Un groupe sexué résolu expose `genderVariants`; plusieurs formes ou costumes distincts exposent une ambiguïté détaillée. Les formes dont `MALE` ou `FEMALE` appartient réellement au `formId` officiel restent séparées.

L’audit couvre aussi les entrées `local-only`, les catégories normalisées (`normal`, `costume`, `regional`, `mega`, `primal`, `dynamax`, `gigantamax`, `official-gender`, `special-state`, `alternative`) et les métadonnées récursives `assetBundleValue`, `assetBundleSuffix`, `assetBundleSource`, `assetBundlePaths` et `assetBundleResolved`.
