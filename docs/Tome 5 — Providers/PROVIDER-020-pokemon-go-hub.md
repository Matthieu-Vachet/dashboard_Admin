---
id: PROVIDER-020
title: Provider Pokémon GO Hub
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [DATASET-027, PAGE-056]
---

# PROVIDER-020 — Pokémon GO Hub

Identifiant technique : `pokemon-go-hub`. Source : `https://db.pokemongohub.net/fr/best/gym-defenders`.

Le provider collecte uniquement la hiérarchie et les valeurs publiées. L’alias brut est transmis à l’Identity Manager ; aucune partie du nom ou de l’URL source ne construit un chemin d’asset. Toute absence produit un diagnostic GO Hub administrable.
