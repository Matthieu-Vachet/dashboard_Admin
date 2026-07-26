---
id: PAGE-049
title: Ma collection Pokémon GO
version: 1.4.0
status: Active
last_updated: 2026-07-26
owner: Matthieu Vachet
category: Page privée
projects: [Dashboard Admin]
references: [COMP-137, DATASET-020, API-157, API-158, API-159, API-160, API-181, API-182, WORKFLOW-016, RULE-045]
---

# PAGE-049 — Ma collection Pokémon GO

## Objectif

Section privée `my-collection` de `/pokemon-admin`, réservée à l'administrateur authentifié, pour prévisualiser, importer et consulter un export Pokémon GO personnel.

## Interface

- En-tête, provenance et compteurs total/shiny/chanceux/IV 100 %/obscurs/purifiés/costumes.
- Recherche temporisée, filtres métier principaux, volet avancé, plages IV/CP/poids/taille, douze tris et ordre ascendant/descendant.
- Pagination serveur 25/50/100 ; table dense à partir de `lg`, cartes sous `lg`.
- Import JSON avec validation serveur, aperçu, confirmation et annonce accessible.
- Historique des snapshots et rollback, avec accès à la liste des IDs non reconnus pour chaque snapshot.
- Inventaire central filtrable des identités/assets non liés : ID collection, Pokédex, alias brut, forme, costume, genre, shiny, canonicalId, cause, occurrences et action proposée.
- Export JSON de l’inventaire filtré sans parcourir les 4 833 cartes.

## Sécurité et données

Le composant ne lit jamais MongoDB directement et ne persiste rien dans `localStorage`. Toutes les opérations passent par `API-157` à `API-160`, sont liées au propriétaire de session et restent absentes des surfaces publiques.

## Responsive et accessibilité

Vérifié à 375×812, 390×844, 430×932, 768×1024, 1440×900 et 1920×1080 sans débordement global, en sombre et en clair. Les champs possèdent des labels, les états importants utilisent une live region et la modale piège/restaure le focus.

## Résolution des assets

Chaque entrée envoie le provider `ma-collection`, son alias brut, son Pokédex, sa forme, son costume, son genre et son état shiny à l’Identity Manager. Le résultat conserve `identityId`, `canonicalId`, confiance, cause et asset exact. Les échecs sont regroupés dans `pokemon_identity_diagnostics` avec leur nombre d’occurrences et restent affichés sans image de remplacement.

L’action « Re-résoudre les identités » rejoue le snapshot actif après la création ou la correction d’un alias, sans réimporter ni supprimer la collection. Une variante explicite ne peut jamais utiliser NORMAL, HOME, un premier costume ou une URL fabriquée comme fallback.

La route privée `API-182` relit directement les entrées non résolues du snapshot demandé. Elle groupe seulement des contextes identiques (Pokédex, alias, forme, costume, genre, shiny et cause) et conserve la liste complète des IDs source concernés.
