---
id: RULE-046
title: Game Master externe, serveur et privé
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [PAGE-052, ADR-012, DATASET-023]
---

# RULE-046 — Game Master externe, serveur et privé

PokemonGo-Data reste la source de vérité métier. Le Game Master PokeMiners sert de référence et de diagnostic ; il n’écrase jamais automatiquement les JSON locaux. Le document complet est récupéré, validé, indexé et recherché côté serveur. Les routes sont privées, paginées et absentes d’OpenAPI ; un seul template brut peut être lu explicitement.
