---
id: ASSET-001
title: Architecture des assets
version: 1.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# ASSET-001 — Architecture des assets

## Autorité

Les références d’assets sont résolues dans PokemonGo-Data puis transportées par PokemonGo-API. Le Dashboard consomme les URLs canoniques sans reconstruire de chemin.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`PokemonGo-Data/scripts/lib/pokemon-canonical-asset-resolver.js`, `PokemonGo-API-/src/services/pokemon-canonical-asset-service.js`, `Dashboard Admin/src/components/admin/pokemon/candy-asset-image.jsx`.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
