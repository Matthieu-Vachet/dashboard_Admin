---
id: PAGE-056
title: Best Defenders
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [DATASET-027, PROVIDER-020, API-177, API-178]
---

# PAGE-056 — Best Defenders

Section Admin Pokémon → Combat placée sous Best Attackers. Elle affiche les défenseurs groupés par tiers Pokémon GO Hub, avec score, nom français, Pokédex, types locaux et `PokemonArtwork`. La couleur de carte réutilise les tokens de types existants avec une faible opacité.

Recherche, tier, type, pagination, source, JSON, actualisation, régénération, erreurs et états de chargement réutilisent les primitives des autres datasets. Un clic ouvre la fiche Pokémon canonique. Une identité non résolue conserve sa place, reste sans image et mène aux diagnostics Identity Manager.
