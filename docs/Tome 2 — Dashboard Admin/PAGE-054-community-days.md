---
id: PAGE-054
title: Admin Pokémon — Community Days
version: 1.1.0
status: Active
last_update: 2026-07-18
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-025, COL-040]
---

# PAGE-054 — Community Days

Vue Admin de tous les Community Days, avec statuts, dates, Pokémon normal/shiny, attaques, bonus, résolution locale, filtres, JSON, historique, non-résolus et synchronisation privée.

Les deux artworks normal et shiny sont rendus par `PokemonArtwork` à partir de `featuredPokemon.identity.assetResolution`. Une entrée non résolue conserve un cadre sans image et affiche le code de résolution exact ; `image` et `shinyImage` ne sont plus lus directement par la carte.

## Historique

- 1.1.0 — 2026-07-18 : branchement du rendu normal/shiny sur la primitive canonique partagée.
- 1.0.0 — 2026-07-16 : création de la page.
