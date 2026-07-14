---
id: ADR-011
title: Identité Pokémon canonique transversale
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API, Dashboard Admin]
references: [RULE-045, DATASET-021, COMP-325, COMP-326]
---

# ADR-011 — Identité Pokémon canonique transversale

Chaque donnée externe conserve un snapshot brut puis passe par `pokemon-identity-resolver.js`. La clé canonique combine `pokemonId`, `formId`, `costumeId`, `gender`, `shiny`, `shadow`, `dynamax`, `gigantamax`, `mega`, `primal` et `specialState`. La résolution suit : ID exact, Pokédex + forme, Pokédex + costume, mapping Game Master, alias versionné, nom exact normalisé.

Une forme explicite jamais résolue ne retombe pas sur la forme de base. Le résultat porte stratégie, confiance, statut, diagnostics et asset choisi. Les générateurs Raids, Œufs, Max, Rocket, Research, Shiny et PvP publient cette identité sans modifier leurs racines historiques.

## Migration et rollback

Les anciens champs `id`, `form`, `assets`, `names` et `types` sont conservés. `identity` est additif. Les fichiers sont archivés avant chantier ; les écritures Game Master et Best Attackers sont atomiques. Aucun dataset de progression ou collection personnelle n'est concerné.
