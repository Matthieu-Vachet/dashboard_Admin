---
id: PAGE-063
title: Veille des sources
version: 3.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-019]
---

# PAGE-063 — Veille

La Veille utilise six catégories : Disponibilité Pokémon, Combat, Événements, Assets, Fournisseurs et données, Technique. Les actualités appartiennent aux événements ; la catégorie Technique recueille les erreurs de scraper, synchronisation et snapshot au lieu de servir de catégorie par défaut métier.

L’accueil compact affiche le nombre total de sources, les statuts OK, warning et error, ainsi que la dernière vérification. Il ne charge aucun module d’audit annexe.

La disponibilité HTTP et une erreur technique restent des signaux de supervision ; la conformité des JSON appartient au véritable Engine.
