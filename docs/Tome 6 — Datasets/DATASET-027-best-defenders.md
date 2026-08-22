---
id: DATASET-027
title: Best Defenders Pokémon GO Hub
version: 1.1.0
status: Active
last_update: 2026-08-22
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PROVIDER-020, PAGE-056, API-177, API-178]
---

# DATASET-027 — Best Defenders Pokémon GO Hub

Dataset public de 250 lignes réparties dans les tiers `S`, `A+`, `A`, `B`, `C` et `D`. MongoDB utilise `best_defenders`, document `key=current`, payload gzip, hash canonique, diff, upsert et relecture de contrôle.

La source principale est la page anglaise SSR `https://db.pokemongohub.net/best/gym-defenders`, lue par le provider central `pokemon-go-hub-best-defenders`. Aucun endpoint JSON public n'a été identifié : le parseur HTML valide les six tiers, les scores, les rangs et le volume avant toute écriture. Un script Cloudflare passif présent après le contenu n'est plus confondu avec une page de challenge réelle.

La source fournit le tier et le score. Identité, forme, catégorie, nom local, types et images proviennent exclusivement de l'Identity Manager et du catalogue canonique. Le workflow fetch → parse → validation → résolution → qualité → remplacement atomique conserve le snapshot courant en cas de `SOURCE_PROTECTED`, `SOURCE_UNAVAILABLE`, `SOURCE_SCHEMA_CHANGED` ou `VALIDATION_FAILED`.

Le contrôle local `stamina × defense` reproduit les 250 scores à 1 % près, mais ne remplace pas encore la source : l'éligibilité et l'ordre éditorial de certaines espèces, notamment Dondozo, nécessitent une règle canonique supplémentaire. Pokémon GO Hub reste donc l'autorité des tiers et du classement ; le calcul local sert de contrôle de cohérence déterministe.
