---
id: ROADMAP-005
title: Limitations connues
version: 1.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# ROADMAP-005 — Limitations connues

## Autorité

Pokémon GO Hub peut refuser le scraping automatisé via Cloudflare ; le système signale alors la source indisponible et conserve le dernier snapshot valide.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`PokemonGo-Data/scripts/providers/best-defenders/pokemon-go-hub-provider.js`, `PokemonGo-API-/src/lib/current-dataset-pipeline.js`.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
