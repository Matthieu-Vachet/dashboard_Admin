---
id: ADR-013
title: Cohabitation Game Master Explorer et Résolution variantes
version: 1.0.0
status: Accepted
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [PAGE-051, PAGE-052, DATASET-021, DATASET-023, RULE-045]
---

# ADR-013 — Cohabitation avec Résolution variantes

L’option B est retenue : PAGE-051 et PAGE-052 restent accessibles, mais elles partagent `generateGameMasterPokemonMappings.js`, l’identité canonique, les statuts et la provenance des assets. PAGE-051 garde son contrat `current` existant pendant la validation ; PAGE-052 stocke la même comparaison dans COL-039 à chaque snapshot.

Cette transition évite une suppression prématurée, permet de comparer les deux surfaces et interdit la création d’un second résolveur concurrent.
