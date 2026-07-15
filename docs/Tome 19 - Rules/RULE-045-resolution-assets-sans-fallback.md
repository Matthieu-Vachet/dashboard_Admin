---
id: RULE-045
title: Résolution Pokémon et assets sans fallback silencieux
version: 1.2.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API, Dashboard Admin]
references: [ADR-011, DATASET-021, COMP-325, RULE-047]
---

# RULE-045 — Résolution sans fallback silencieux

Les sources sont consultées dans cet ordre : JSON locaux, API interne, assets référencés, Game Master, alias versionnés. Une variante explicite non résolue reste visible comme `unresolved`, `ambiguous`, `missing-asset` ou `missing-local-form`.

Il est interdit de substituer silencieusement la forme de base, d'inventer une URL ou un statut de sortie, ou de masquer une ambiguïté. Le composant `PokemonArtwork` affiche un état « Asset absent » et un indicateur de résolution au lieu d'une image générique trompeuse.

Dans le Dashboard, `pokemon-variant-resolver.ts` est l'unique autorité de sélection d'artwork. Dès qu'un costume, une forme non portée par la fiche canonique ou une différence femelle est explicitement demandé, il compare les entrées `assetForms` avant toute autre source. Une absence de correspondance exacte, ou l'absence du `shinyImage` exact demandé, produit `missing-asset` et `image: null`.

Les composants ne peuvent pas rétablir un fallback local vers `assets.image`, `image`, Home, Shuffle ou une URL source. Les assets pré-résolus ne sont acceptés que lorsqu'ils portent une preuve explicite de sélection ou un statut canonique `matched` cohérent avec la variante demandée.

RULE-047 précise l’unique exception légitime : une fiche réellement normale peut utiliser HOME ou portrait après épuisement des assets GO et référencés exacts. Cette règle est indépendante de `availability`. Elle ne s’applique jamais à une variante explicite.

## Historique

- 1.2.0 — 2026-07-15 : ordre normal GO → référence → HOME → portrait et séparation disponibilité jeu/asset.
- 1.1.0 — 2026-07-15 : formalisation du résolveur Dashboard unique et de la comparaison `form` / `costume` / `isFemale`.
- 1.0.0 — 2026-07-14 : création de la règle sans fallback silencieux.
