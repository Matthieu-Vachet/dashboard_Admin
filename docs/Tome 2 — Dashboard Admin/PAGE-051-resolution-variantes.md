---
id: PAGE-051
title: Résolution des variantes Pokémon
version: 1.1.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [DATASET-021, API-163, API-164, RULE-045, COMP-328, PAGE-052, ADR-013]
---

# PAGE-051 — Résolution des variantes Pokémon

Écran privé affichant les compteurs résolus, formes locales absentes et Pokémon absents. La table filtre template, forme, asset bundle et statut. L'action de régénération appelle le pipeline protégé, sans fallback JSON runtime.

Depuis la version 1.1.0, la table desktop conserve ses colonnes mais ajoute l’asset exact avant le nom. Sous `md`, les entrées deviennent des cartes lisibles contenant Game Master, forme locale, costume, bundle, source et statut complet. PAGE-051 reste accessible selon ADR-013 et partage le générateur avec PAGE-052.
