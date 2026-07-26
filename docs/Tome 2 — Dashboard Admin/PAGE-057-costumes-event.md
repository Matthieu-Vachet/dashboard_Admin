---
id: PAGE-057
title: Audit Costumes et Pokémon événementiels
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [DATASET-028, PROVIDER-021, API-179, API-180]
---

# PAGE-057 — Audit Costumes et Pokémon événementiels

Outil privé Admin Pokémon → Événements. Il compare les entrées Margxt à PokemonGo-Data sans les transformer en données publiques d’événements.

Les filtres isolent `present`, `unresolved`, `ambiguous`, `asset-missing`, `inconsistent` et `duplicate`. Les images Margxt restent des preuves source ; seul `PokemonArtwork` peut afficher l’asset local exact. La page propose statistiques, recherche, filtre shiny, JSON privé, actualisation et régénération globale.
