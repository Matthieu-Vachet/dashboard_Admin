---
id: ADR-014
title: Audit externe en lecture seule
version: 1.1.0
status: Accepted
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-019]
---

# ADR-014 — Audit externe en lecture seule

## Décision

Une page externe sert de signal de veille et jamais de source d’écriture implicite. Le Dashboard sépare indisponibilité réseau, erreur de parsing et donnée canonique.

## Conséquences

Les corrections locales passent par un workflow humain, un provider versionné, une validation puis un commit dédié. La Veille n’expose aucune mutation ; le véritable Engine JSON reste l’autorité de contrôle structurel.
