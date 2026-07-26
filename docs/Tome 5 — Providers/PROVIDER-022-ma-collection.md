---
id: PROVIDER-022
title: Provider Ma Collection
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-]
references: [DATASET-020, PAGE-049, PAGE-IDENTITY-001]
---

# PROVIDER-022 — Ma Collection

Identifiant technique : `ma-collection`. L’alias brut provient d’abord du costume, sinon de la forme, du nom source ou du Pokédex.

Les requêtes de résolution incluent Pokédex, forme, costume, genre, shiny et alignement. Les diagnostics sont agrégés avant écriture et une correction d’alias peut être appliquée au snapshot actif par une nouvelle résolution non destructive.
