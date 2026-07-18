---
id: COMP-325
title: PokemonArtwork
version: 1.3.0
status: Active
last_update: 2026-07-18
author: Matthieu Vachet
affected_projects: [Dashboard Admin]
references: [ADR-011, RULE-045, RULE-047, COMP-326]
---

# COMP-325 — PokemonArtwork

Composant unique d'affichage des images Pokémon dans Raids, Œufs, Max, Rocket, Research, Shiny, PvP, Events et Best Attackers. Il délègue exclusivement à `pokemon-variant-resolver.ts`, n'invente aucune URL et affiche « Asset absent » lorsque la référence exacte manque.

Dès que `pokemon.identity.canonicalId` existe, `pokemon.identity.assetResolution` devient l’unique autorité. Le composant ne consulte plus les images brutes ou les assets parallèles de l’objet ; il expose la cause serveur stable dans `data-asset-reason`. Community Days utilise le même chemin pour les rendus normal et shiny.

Le résolveur recherche d'abord `assets.assetForms`, `assetForms` ou leur résumé compatible `eventAssets`, en comparant la forme, le costume et `isFemale`. Un costume peut être rapproché d'un ancien identifiant encore stocké dans `assetForms.form`, notamment `PIKACHU_WINTER_2020` ↔ `WINTER_2020`.

Une variante explicite non résolue ne lit jamais `assets.image`, `image`, Home ou Shuffle. Le composant expose `data-asset-status="missing-asset"`, un placeholder et un badge visible de variante. Le nom principal reste celui de l'espèce ; le costume ou la forme est affiché séparément.

Une fiche réellement normale peut lire successivement l’asset GO principal, l’asset normal du fichier référencé, HOME puis portrait. Le shiny normal suit les sources shiny. Ce chemin ne consulte pas `availability` et reste impossible dès qu’une variante explicite est demandée.

## Tests

`npm run test:pokemon-variants` couvre normal, `_NORMAL`, costume, costume shiny, femelle, costume absent, shiny absent, forme régionale, Méga, Obscur, Purifié, Dynamax et Gigamax.

## Historique

- 1.3.0 — 2026-07-18 : priorité absolue à la résolution canonique et couverture Community Days.
- 1.2.0 — 2026-07-15 : fallback HOME/portrait limité aux identités normales et indépendant de la disponibilité.
- 1.1.0 — 2026-07-15 : résolution exacte partagée et suppression des fallbacks de variantes.
- 1.0.0 — 2026-07-14 : création de `PokemonArtwork`.
