---
id: DATASET-023
title: Index Game Master courant
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, PokemonGo-Data, Dashboard Admin]
references: [ADR-012, COL-035, COL-036, API-165, API-169]
---

# DATASET-023 — Index Game Master courant

Index privé dérivé de PokeMiners. Chaque template contient identité, catégorie, `settingType`, tokens, propriétés aplaties, hash, snapshot et JSON brut. Les routes de liste retirent les champs lourds. Le test réel compte 18 152 templates et 31 catégories.
