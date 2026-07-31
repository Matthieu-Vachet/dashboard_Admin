---
id: ADR-014
title: Audit externe en lecture seule
version: 1.0.0
status: Accepted
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-029]
---

# ADR-014 — Audit externe en lecture seule

## Décision

Une page externe sert de contrôle et jamais de source d'écriture implicite. Le Dashboard produit des écarts traçables, laisse les ambiguïtés ouvertes et sépare une indisponibilité réseau d'une divergence métier.

## Conséquences

Les corrections locales passent par un workflow humain, un provider versionné, une validation puis un commit dédié. Le centre de contrôle n'expose aucune mutation.
