---
id: ASSET-004
title: Icônes
version: 1.1.0
status: Active
last_update: 2026-08-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036]
---

# ASSET-004 — Icônes

## Autorité

Les icônes fonctionnelles proviennent de Lucide ou du registre UI. Elles restent décoratives quand leur libellé est déjà visible et accessibles dans les boutons icon-only.

## Invariants

- La donnée métier provient du provider ou dataset canonique ; le composant de présentation ne la reconstruit pas.
- Les absences, erreurs et ambiguïtés restent explicites et ne deviennent jamais une valeur métier arbitraire.
- Toute modification du contrat impose validation statique, tests ciblés et mise à jour documentaire.

## Implémentation vérifiée

`src/components/site/ui-assets.js`, `src/data/ui-assets.json`, `src/components/ui/button.tsx`.

Les visuels Fast et Charged convergent vers l’asset unique `/assets/ui/icons/general/TodayView_Icon_AttackMove.webp` via `attackMove`, `fastAttack` et `chargedAttack`. Les noms `fast-attack` et `charged-attack` ne sont plus référencés par le code, les tests, les styles ou les documents actifs ; les anciens fichiers physiques ne sont pas supprimés afin de ne pas rompre d’autres consommateurs.

Les Collections réutilisent les constantes `collectionMega`, `collectionShadow`, `collectionPurified`, `collectionShiny` et `collectionMax`. Une icône principale de catégorie peut recevoir un badge Shiny secondaire distinct ; la checkbox reste dans le coin opposé.

## Validation

Le contrôle minimal combine le validateur documentaire, les tests du domaine, le build du dépôt concerné et, pour une surface visible, un test navigateur Light/Dark aux breakpoints applicables.

## Historique

- 2026-08-02 — Création à partir de l’implémentation et des contrats actifs.
- 2026-08-15 — Centralisation de l’icône Attack Move et des cinq catégories visuelles Collections.
