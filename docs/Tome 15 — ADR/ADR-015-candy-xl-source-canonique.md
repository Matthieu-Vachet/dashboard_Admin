---
id: ADR-015
title: Référence XL résolue dans PokemonGo-Data
version: 1.0.0
status: Accepted
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [ARCH-013, DATASET-030, RULE-048]
---

# ADR-015 — Source canonique du Bonbon XL

## Décision

`PokemonGo-Data` résout `assets.candy.xlImage` à partir de `familyId` et de l'inventaire réel des assets. Les composants et l'API transmettent ce champ sans fabriquer d'URL.

## Motif

Cette décision évite les chemins cassés, maintient l'autonomie des bundles de formes et centralise l'audit. `assets.candy.image` reste inchangé pour la rétrocompatibilité.
