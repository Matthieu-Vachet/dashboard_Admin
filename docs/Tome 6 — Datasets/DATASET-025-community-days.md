---
id: DATASET-025
title: Community Days permanents
version: 1.0.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [COL-040, PAGE-054]
---

# DATASET-025 — Community Days permanents

`community_days` conserve tous les Community Days fournis par `https://pogoapi.net/api/v1/community_days.json`. Une synchronisation fait un upsert par `sourceId`, incrémente la révision si le hash source change et ne supprime jamais une entrée absente de la source suivante.

Le document contient les dates source, bonus, attaques exclusives et Pokémon mis en avant. Les champs `dexNr`, `pokemonId`, forme et assets normal/shiny sont résolus depuis PokemonGo-Data. Les non-résolus restent dans `dataset_runs` sous `datasetKey: community-days` avec leur raison. Aucun CP, statistique de combat ou champ absent de la source n’est inventé.

Lecture publique : `GET /api/v1/community-days` et `GET /api/v1/community-days/:id`. Synchronisation : `POST /api/admin/community-days/sync`, privée par session Dashboard. La projection publique omet `sourcePayload`, hashes et diagnostics internes.
