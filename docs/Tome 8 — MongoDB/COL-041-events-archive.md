---
id: COL-041
title: Collection events_archive
version: 1.0.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-026]
---

# COL-041 — `events_archive`

Archive append/update des événements observés. La clé `canonicalKey` est unique. Les index couvrent identité source, dates, statut, présence dans le flux, type, provider, Pokémon, hash et mise à jour. L’absence du flux modifie uniquement `activeInCurrentFeed` et `archived`; aucun handler ne supprime de document.
