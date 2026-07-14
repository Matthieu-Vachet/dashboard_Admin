---
id: DATASET-022
title: Classements Best Attackers
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PROVIDER-019, API-161, API-162, PAGE-050, COL-033]
---

# DATASET-022 — Classements Best Attackers

Le dataset normalisé contient `metadata`, un registre `entities`, un registre `moves` et les matrices `rankings.level{30|40|50}.{ANY|TYPE}`. Chaque ligne référence une variante/état et son meilleur moveset avec `dps`, `tdo`, `edps`, classe de moveset et drapeaux élite.

Le snapshot du 14 juillet 2026 couvre 1 725 entités, 289 attaques et 92 511 lignes. Dynamax, Gigamax et Eternamax sont exclus du contexte raid standard. Les Pokémon non sortis sont exclus ; les états obscurs ne sont créés que si le JSON local les déclare.

MongoDB stocke ce dataset sous gzip dans `best_attackers`, avec hash, diff et relecture. L'API hydrate uniquement la page demandée et calcule rang, pourcentage et tier pour la métrique sélectionnée.
