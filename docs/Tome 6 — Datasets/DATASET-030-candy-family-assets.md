---
id: DATASET-030
title: Assets de famille candy
version: 1.0.0
status: Public
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-Assets-API, PokemonGo-API-]
references: [ARCH-013, ADR-015, RULE-048, PAGE-064]
---

# DATASET-030 — Candy Family Assets

Contrat rétrocompatible :

```json
{
  "familyId": 1,
  "image": ".../candy/1.png",
  "xlImage": ".../xl_candy/1.png",
  "primaryColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
  "secondaryColor": { "r": 0, "g": 0, "b": 0, "a": 1 }
}
```

`xlImage` est `string | null`. Les couleurs restent celles de la famille normale. Le snapshot du 31 juillet 2026 contient 548 familles XL, 1 605 fiches et 1 605 bundles cohérents, sans asset XL manquant.
