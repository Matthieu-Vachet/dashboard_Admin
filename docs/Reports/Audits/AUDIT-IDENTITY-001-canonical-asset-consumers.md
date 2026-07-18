---
id: AUDIT-IDENTITY-001
title: Audit des consommateurs d’assets Pokémon canoniques
version: 1.0.0
status: Active
last_update: 2026-07-18
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [ADR-IDENTITY-001, RULE-IDENTITY-001, COMP-325, DATASET-025]
---

# AUDIT-IDENTITY-001 — Consommateurs d’assets canoniques

## Objectif

Cet audit vérifie que chaque donnée Pokémon issue d’un provider suit le même chemin : `alias brut → Identity Manager → canonicalId → localReference → asset bundle → entrée exacte → genre → image normale/shiny`. Une fois le `canonicalId` obtenu, aucune image brute du provider, aucun rapprochement de nom et aucun fallback HOME ne peuvent remplacer l’asset canonique attendu.

## Matrice des consommateurs

| Domaine | Provider | Résolution serveur | Contrat transporté | Rendu final | Statut |
| --- | --- | --- | --- | --- | --- |
| Shiny Tracker | Snacknap | `generateShinyTracker.js`, catalogue injecté en lot | `pokemon.identity.assetResolution` préservé par `presentShiny` | `ShinyTrackerPanel` → `PokemonArtwork`, détail + podium + liste | Conforme |
| PvP Rankings | PvPoke | `generatePvpRankings.js`, catalogue injecté en lot | identité canonique dans la référence Pokémon hydratée | `PvpRankingsPanel` → `PokemonArtwork` | Conforme |
| Raids | LeekDuck | générateur courant + Identity Manager | identité et résolution exacte du boss | `RaidsPanel` → `PokemonArtwork` | Conforme |
| Œufs | LeekDuck | générateur courant + Identity Manager | identité et résolution exacte du Pokémon | `EggsPanel` → `PokemonArtwork` | Conforme |
| Max Battles | LeekDuck | générateur courant + Identity Manager | identité et résolution exacte du Pokémon | `MaxBattlesPanel` → `PokemonArtwork` | Conforme |
| Research | LeekDuck | générateur courant + Identity Manager | identité et résolution exacte de la récompense Pokémon | `ResearchPanel` → `PokemonArtwork` | Conforme |
| Rocket | LeekDuck | générateur courant + Identity Manager | identité et résolution exacte du Pokémon | `RocketPanel` → `PokemonArtwork` | Conforme |
| Calendrier Events | LeekDuck | `leekduck-events-scraper.ts`, appel groupé `/resolve-assets` | image source conservée séparément dans `sourceImage`, image finale canonique seulement | bannière Pokémon → `PokemonArtwork` | Conforme |
| Community Days | PogoAPI | `community-days-store.ts`, appel groupé `/resolve-assets` | `featuredPokemon.identity.assetResolution`, raison stable si non résolu | normal + shiny → `PokemonArtwork` | Conforme |
| Best Attackers | DialgaDex + données locales | générateur avec catalogue injecté | identité canonique de l’attaquant | `BestAttackersPanel` → `PokemonArtwork` | Conforme |
| Catalogue Admin | PokemonGo-Data | référence locale déjà canonique | fiche locale complète | `CatalogPanel` → `PokemonArtwork` | Conforme |

## Exceptions autorisées

Les balises image directes restantes concernent uniquement les icônes de type, d’œuf, de dresseur ou d’objet, les bannières source d’événements et les aperçus de diagnostic qui doivent montrer exactement le fichier audité. Elles ne sélectionnent jamais l’artwork final d’une variante Pokémon.

Les fiches réellement normales et exclusivement locales peuvent utiliser l’ordre documenté `GO principal → asset normal du bundle → HOME → portrait`. Cette exception ne s’applique jamais à une forme, un costume, un genre explicite ou une identité provider déjà canonisée.

## Invariants vérifiés

- `PokemonArtwork` lit en priorité `pokemon.identity.assetResolution` dès qu’un `canonicalId` existe ;
- un résultat canonique non matché reste sans image et expose son code exact dans `data-asset-reason` ;
- le Shiny Tracker utilise la primitive partagée dans ses trois rendus et le Presenter API ne retire ni la trace ni l’URL shiny ;
- Community Days ne rend plus `image` ou `shinyImage` avec des balises directes ;
- les événements LeekDuck conservent l’image source pour l’audit, sans l’utiliser comme fallback final ;
- les appels d’Identity Manager sont groupés par lots de 500 et n’introduisent pas de requête MongoDB N+1.

## Vérifications

```bash
npm run test:pokemon-variants
npm run typecheck
npm run build
```

Dans PokemonGo-API :

```bash
node --test test/current-dataset-adapters.test.js
```

Après un déploiement modifiant le résolveur, les snapshots MongoDB existants doivent être régénérés pour embarquer les nouvelles résolutions canoniques. Une ancienne capture « Asset absent » ne constitue donc pas un résultat actuel tant que le snapshot n’a pas été recalculé.

