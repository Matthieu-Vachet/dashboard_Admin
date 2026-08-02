---
id: PERF-006
title: Cache
version: 1.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# PERF-006 — Cache

## Autorité

Le cache ne remplace jamais MongoDB comme source de vérité. Toute mutation invalide la clé concernée ; les audits et actions admin restent `private, no-store`.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`PokemonGo-API-/src/lib/cache.js`, `src/app/api/pokemon-api-proxy/route.ts`.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
