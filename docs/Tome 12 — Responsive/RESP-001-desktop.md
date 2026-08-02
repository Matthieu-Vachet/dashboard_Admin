---
id: RESP-001
title: Desktop
version: 1.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# RESP-001 — Desktop

## Autorité

À 1440 px, les zones de commande utilisent la largeur sans étirer les lignes de lecture. Les cartes d’un même groupe ont une hauteur cohérente.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`src/components/admin/pokemon/admin-command-center.tsx`.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
