---
id: COL-036
title: Collection game_master_templates
version: 1.1.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-API-]
references: [ADR-012, DATASET-023]
---

# COL-036 — game_master_templates

Un document par `snapshotId + templateId`, avec index catégorie, setting type, Pokédex et hash. Il contient une seule copie du JSON brut, les métadonnées scalaires et un `searchText` borné. Les tokens et propriétés aplaties ne sont pas persistés ; le détail reconstruit les chemins depuis `raw` à la lecture.
