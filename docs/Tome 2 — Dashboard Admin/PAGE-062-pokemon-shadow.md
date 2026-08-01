---
id: PAGE-062
title: Contrôle des Pokémon Shadow
version: 2.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-029, ADR-014, ADR-016, RULE-049]
---

# PAGE-062 — Pokémon Shadow

La page compare `availability.shadow` et `availability.shadowShinyReleased` dans deux objets de comparaison distincts. Apex, Purified et la présence d’un sprite Shadow ne remplacent jamais ces disponibilités métier.

Une variante externe non résolue bloque la conclusion `local-only` pour les identités locales du même `dexId`; elles deviennent `not-verified`. Les ambiguïtés et erreurs de parsing sont isolées des divergences réelles.
