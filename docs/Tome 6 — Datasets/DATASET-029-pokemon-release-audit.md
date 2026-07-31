---
id: DATASET-029
title: Audit externe des sorties Pokémon
version: 1.0.0
status: Private
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, ADR-014, PAGE-059, PAGE-060, PAGE-061, PAGE-062]
---

# DATASET-029 — Pokémon Release Audit

Dataset privé et éphémère généré à la demande. Il contient `kind`, métadonnées source, provenance, statistiques et lignes de comparaison. Les données externes ne sont pas publiées comme vérité locale et ne sont pas persistées dans les fiches Pokémon.

Statuts : `up-to-date`, `divergence`, `external-only`, `local-only`, `ambiguous`. États de source : `success` ou `source-unavailable`. L'empreinte SHA-256 rend une exécution traçable sans conserver tout le HTML dans le Dashboard.
