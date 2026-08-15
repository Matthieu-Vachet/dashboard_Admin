---
id: PAGE-058
title: PvP Rankings
version: 1.1.0
status: Active
last_update: 2026-08-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-]
references: [DATASET-018, RULE-048, PAGE-064]
---

# PAGE-058 — PvP Rankings

La page présente les classements PvPoke normalisés par `PokemonGo-Data`. Le coût de seconde attaque provient exclusivement de `pokemon.secondChargeMoveCost`; la distance de copain et la famille de bonbon conservent leur provenance locale.

La fiche détaillée affiche les IV Rank 1, le niveau, les attaques, les matchups, les faiblesses/résistances, les coéquipiers structurés et le Bonbon XL référencé par `pokemon.assets.candy.xlImage`. Une quantité XL absente reste « quantité non renseignée ». L'interface ne calcule ni quantité ni URL d'asset.

Les coéquipiers sont normalisés avant rendu. Un champ objet ne peut donc jamais être interpolé en `[object Object]`; les cartes affichent identité, forme, types et ordre lorsqu'ils existent.

Les fiches Pokémon utilisent la même ressource dédiée que Rankings : `pvpRef → data/pvp/pokemon/<catégorie>/*.pvp.json`. La section affiche `status`, rang, score, rating, Rank 1/IV, moveset, provider, commit et `syncedAt`. `NOT_RANKED`, `UNSUPPORTED_FORM`, `FORMAT_EXCLUDED` et les autres états non classés restent visibles avec une explication, sans fallback vers un ancien bloc embarqué.

Le bouton « Relancer » suit l’exécution API persistante jusqu’à un statut terminal et conserve les distinctions `success`, `partial`, `unchanged` et `failed`. Le snapshot PvPoke courant est le commit `f754cd6fc819ad065f1f00df1036ade36c57c022`, 1 614 fiches dédiées et zéro avertissement Engine.

Tests : `test:pvp-local-data`, `test:pvp-dedicated`, `test:pvp-architecture`, `test:pvp-regeneration`, `test:candy-assets`, `test:ranked-datasets` et vérification navigateur desktop/mobile.
