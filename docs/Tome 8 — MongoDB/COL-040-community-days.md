---
id: COL-040
title: Collection community_days
version: 1.0.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-025]
---

# COL-040 — `community_days`

Collection permanente du Dashboard, partagée en lecture avec PokemonGo-API. Index uniques `id` et `sourceId`; index dates, année/mois/statut, Pokémon, hash et mise à jour. Les synchronisations utilisent des upserts et n’exécutent aucune suppression.
