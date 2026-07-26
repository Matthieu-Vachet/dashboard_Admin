---
id: API-182
title: GET /api/trainer-pokemon/diagnostics
version: 1.0.0
status: Active
last_updated: 2026-07-26
owner: Matthieu Vachet
category: API privée Dashboard
projects: [Dashboard Admin]
visibility: private-dashboard
references: [PAGE-049, DATASET-020, PROVIDER-022, API-181]
---

# API-182 — GET /api/trainer-pokemon/diagnostics

## Contrat

Retourne l’inventaire paginé et filtrable des entrées sans liaison canonique d’un snapshot Ma Collection appartenant à la session admin. Les filtres acceptés sont `snapshotId`, `search`, `reason`, `page` et `limit`.

Chaque groupe conserve le Pokédex, le nom, l’alias brut, la forme, le costume, le genre, shiny, le canonicalId éventuel, la cause, le nombre d’occurrences et tous les IDs source concernés. Le résumé fournit le volume d’entrées, le volume de groupes et les causes.

## Sécurité

Session administrateur obligatoire, rate limit serveur, liaison stricte au propriétaire et absence de toute exposition dans PokemonGo-API/OpenAPI public.
