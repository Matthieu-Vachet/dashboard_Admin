---
id: RULE-045
title: Résolution Pokémon et assets sans fallback silencieux
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API, Dashboard Admin]
references: [ADR-011, DATASET-021, COMP-325]
---

# RULE-045 — Résolution sans fallback silencieux

Les sources sont consultées dans cet ordre : JSON locaux, API interne, assets référencés, Game Master, alias versionnés. Une variante explicite non résolue reste visible comme `unresolved`, `ambiguous`, `missing-asset` ou `missing-local-form`.

Il est interdit de substituer silencieusement la forme de base, d'inventer une URL ou un statut de sortie, ou de masquer une ambiguïté. Le composant `PokemonArtwork` affiche un état « Asset absent » et un indicateur de résolution au lieu d'une image générique trompeuse.
