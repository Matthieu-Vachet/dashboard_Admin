---
id: PAGE-058
title: PvP Rankings
version: 1.2.0
status: Active
last_update: 2026-08-27
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-]
references: [DATASET-018, RULE-048, PAGE-064]
---

# PAGE-058 — PvP Rankings

La page présente les classements PvPoke normalisés par `PokemonGo-Data`. Le coût de seconde attaque provient exclusivement de `pokemon.secondChargeMoveCost`; la distance de copain et la famille de bonbon conservent leur provenance locale.

La fiche détaillée affiche les IV Rank 1, le niveau, les attaques, les matchups, les faiblesses/résistances, les coéquipiers structurés et le Bonbon XL référencé par `pokemon.assets.candy.xlImage`. Une quantité XL absente reste « quantité non renseignée ». L'interface ne calcule ni quantité ni URL d'asset.

Les coéquipiers sont calculés côté API depuis le snapshot PvPoke MongoDB de la ligue, puis normalisés avant rendu. Un champ objet ne peut donc jamais être interpolé en `[object Object]`; les cartes affichent identité, forme, types et ordre lorsqu'ils existent. Une espèce absente du classement produit un état vide `RANKING_NOT_FOUND`; un snapshot invalide reste une erreur explicite.

Les fiches Pokémon utilisent la même ressource dédiée que Rankings : `pvpRef → data/pvp/pokemon/<catégorie>/*.pvp.json`. La section affiche `status`, rang, score, rating, Rank 1/IV, moveset, provider, commit et `syncedAt`. `NOT_RANKED`, `UNSUPPORTED_FORM`, `FORMAT_EXCLUDED` et les autres états non classés restent visibles avec une explication, sans fallback vers un ancien bloc embarqué.

Le bouton « Relancer » suit l’exécution API persistante jusqu’à un statut terminal et conserve les distinctions `success`, `partial`, `unchanged` et `failed`. Un résultat `partial` reste écrit et lisible. Le rapport présente chaque warning avec code, entité, raison, impact et action; une sentinelle provider reconnue comme informative ne dégrade pas seule le statut.

La disponibilité restreinte d’une attaque est déterminée pour le couple Pokémon/attaque depuis les listes canoniques de la fiche. **Héritage** correspond au pool Elite ou événementiel; **Retirée** au pool Legacy strict. Une propriété globale de l’attaque ne peut pas produire ces badges.

Le commit, le volume et la date du snapshot PvPoke sont des métadonnées runtime affichées par la page. La documentation n’épingle pas un ancien total comme état courant.

Tests : `test:pvp-local-data`, `test:pvp-dedicated`, `test:pvp-architecture`, `test:pvp-regeneration`, `test:pvp-legacy-highlight`, `test:candy-assets`, `test:ranked-datasets` et vérification navigateur desktop/mobile.
