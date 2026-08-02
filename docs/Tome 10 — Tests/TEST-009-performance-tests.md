---
id: TEST-009
title: Tests de performance
version: 1.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# TEST-009 — Tests de performance

## Autorité

Les budgets surveillent durée de build, réponse API, rendu des longues listes et volume mémoire. La virtualisation ou pagination est exigée au-delà des limites documentées.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`src/components/admin/pokemon`, `PokemonGo-API-/src/lib/cache.js`.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
