---
id: PAGE-049
title: Ma collection Pokémon GO
version: 1.1.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Page privée
projects: [Dashboard Admin]
references: [COMP-137, DATASET-020, API-157, API-158, API-159, API-160, WORKFLOW-016]
---

# PAGE-049 — Ma collection Pokémon GO

## Objectif

Section privée `my-collection` de `/pokemon-admin`, réservée à l'administrateur authentifié, pour prévisualiser, importer et consulter un export Pokémon GO personnel.

## Interface

- En-tête, provenance et compteurs total/shiny/chanceux/IV 100 %/obscurs/purifiés/costumes.
- Recherche temporisée, filtres métier principaux, volet avancé, plages IV/CP/poids/taille, douze tris et ordre ascendant/descendant.
- Pagination serveur 25/50/100 ; table dense à partir de `lg`, cartes sous `lg`.
- Import JSON avec validation serveur, aperçu, confirmation et annonce accessible.
- Historique des snapshots et rollback.

## Sécurité et données

Le composant ne lit jamais MongoDB directement et ne persiste rien dans `localStorage`. Toutes les opérations passent par `API-157` à `API-160`, sont liées au propriétaire de session et restent absentes des surfaces publiques.

## Responsive et accessibilité

Vérifié à 375×812, 390×844, 430×932, 768×1024, 1440×900 et 1920×1080 sans débordement global, en sombre et en clair. Les champs possèdent des labels, les états importants utilisent une live region et la modale piège/restaure le focus.

## Limites

Les variantes recherchent successivement l’asset exact, la forme, la forme normale puis la base. Un shiny sans asset shiny conserve le placeholder officiel et n’utilise jamais l’image normale. Aucun import MongoDB réel n'a été déclenché pendant la livraison.
