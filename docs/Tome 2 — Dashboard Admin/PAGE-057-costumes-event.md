---
id: PAGE-057
title: Audit Costumes et Pokémon événementiels
version: 1.1.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [DATASET-028, PROVIDER-021, API-179, API-180]
---

# PAGE-057 — Audit Costumes et Pokémon événementiels

Outil privé Admin Pokémon → Événements. Il compare les entrées Margxt à PokemonGo-Data sans les transformer en données publiques d’événements.

Les filtres isolent `present`, `unresolved`, `ambiguous`, `asset-missing`, `inconsistent` et `duplicate`, puis permettent de cibler un événement, un type ou la disponibilité shiny. Les résultats se trient par date dans les deux sens, événement, type, nom ou numéro Pokédex.

À chaque lecture, l’API réinterroge le catalogue Identity Manager courant. Un alias Margxt résolu après la dernière génération affiche donc immédiatement son canonicalId et son asset exact. Les images Margxt restent des preuves source ; seul `PokemonArtwork` peut afficher l’asset local canonique.
