---
id: PAGE-058
title: PvP Rankings
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-]
references: [DATASET-018, RULE-048, PAGE-064]
---

# PAGE-058 — PvP Rankings

La page présente les classements PvPoke normalisés par `PokemonGo-Data`. Le coût de seconde attaque provient exclusivement de `pokemon.secondChargeMoveCost`; la distance de copain et la famille de bonbon conservent leur provenance locale.

La fiche détaillée affiche les IV Rank 1, le niveau, les attaques, les matchups, les faiblesses/résistances, les coéquipiers structurés et le Bonbon XL référencé par `pokemon.assets.candy.xlImage`. Une quantité XL absente reste « quantité non renseignée ». L'interface ne calcule ni quantité ni URL d'asset.

Les coéquipiers sont normalisés avant rendu. Un champ objet ne peut donc jamais être interpolé en `[object Object]`; les cartes affichent identité, forme, types et ordre lorsqu'ils existent.

Tests : `test:pvp-local-data`, `test:candy-assets`, `test:ranked-datasets` et vérification navigateur desktop/mobile.
