---
id: ASSET-008
title: Validation des assets
version: 1.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# ASSET-008 — Validation des assets

## Autorité

Les contrôles couvrent URL autorisée, existence, transparence attendue, cohérence par famille et autonomie des fiches de formes. Une absence reste nullable et auditée.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`PokemonGo-Data/scripts/validate-pokemon-schema.js`, `PokemonGo-Data/scripts/test-candy-assets.js`, `PokemonGo-API-/test/pokemon-canonical-assets.test.js`.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
