---
id: DATASET-025
title: Community Days permanents
version: 1.1.0
status: Active
last_update: 2026-07-18
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [COL-040, PAGE-054]
---

# DATASET-025 — Community Days permanents

`community_days` conserve tous les Community Days fournis par `https://pogoapi.net/api/v1/community_days.json`. Une synchronisation fait un upsert par `sourceId`, incrémente la révision si le hash source change et ne supprime jamais une entrée absente de la source suivante.

Le document contient les dates source, bonus, attaques exclusives et Pokémon mis en avant. Tous les noms PogoAPI sont envoyés en un lot privé à l'Identity Manager ; `canonicalId`, référence locale, forme, costume et assets normal/shiny proviennent ensuite du résolveur PokemonGo-Data. Aucun scan ou rapprochement parallèle de fichiers locaux n'est autorisé. Les non-résolus restent sans image dans `dataset_runs` sous `datasetKey: community-days`, avec alias brut, alias normalisé et raison exacte. Aucun CP, statistique de combat ou champ absent de la source n’est inventé.

Lecture publique : `GET /api/v1/community-days` et `GET /api/v1/community-days/:id`. Synchronisation : `POST /api/admin/community-days/sync`, privée par session Dashboard. La projection publique omet `sourcePayload`, hashes et diagnostics internes.
