---
id: COMP-137
title: TrainerPokemonCollectionPanel
version: 1.2.0
status: Active
last_updated: 2026-07-15
owner: Matthieu Vachet
category: Complex Component
projects: [Dashboard Admin]
references: [PAGE-049, API-157, API-158, API-159, API-160, COMP-325, RULE-047]
---

# COMP-137 — TrainerPokemonCollectionPanel

## Responsabilité

Orchestrer uniquement l'état UI de PAGE-049 : requêtes privées, filtres principaux et avancés, pagination, aperçu/import, historique et rollback. Le composant est chargé via `next/dynamic` depuis `AdminApp`.

## Réutilisation Design System

Réutilise `Badge`, `Button`, `Card`, `Input` et `Modal`. Les images utilisent `next/image`; l'UI n'invente aucun token ni URL d'asset.

## États

Loading, refreshing, vide, erreur, aucun résultat, parsing, previewing, ready, importing, success, diagnostics et asset absent.

L’artwork délègue au résolveur partagé. Le chargement des références conserve GO, HOME, portraits et variantes ; `availability` ne décide jamais si un asset local peut être affiché.

## Performance

Recherche avec délai de 300 ms, 100 entrées maximum par réponse, filtres poids/taille calculés côté serveur, aucune virtualisation inutile et aucune conservation du payload après fermeture/import.
