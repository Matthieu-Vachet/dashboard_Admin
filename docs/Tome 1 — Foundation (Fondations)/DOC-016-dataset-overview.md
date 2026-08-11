---
id: DOC-016
title: "Vue d’ensemble des datasets"
description: "Référence des 20 datasets, de leur visibilité, stockage, pipeline et source runtime."
version: 2.0.0
status: Official
owner: Matthieu Vachet
created: 2026-07-13
last_updated: 2026-07-13
category: Foundation
type: Reference
language: fr
scope:
  - "PokemonGo-Data"
  - "PokemonGo-API-"
  - "Dashboard Admin"
source_files:
  - "PokemonGo-Data/package.json"
  - "PokemonGo-API-/src/current-datasets"
  - "Dashboard Admin/src/lib/learning"
registries:
  - "audit-documentation/registries/datasets.json"
  - "audit-documentation/registries/providers.json"
  - "audit-documentation/registries/api-routes.json"
  - "audit-documentation/registries/mongodb-collections.json"
  - "audit-documentation/registries/dependencies.json"
related:
  - "DOC-013"
  - "DOC-015"
  - "DOC-017"
  - "DOC-033"
---

# DOC-016 — Vue d’ensemble des datasets

## 1. Périmètre vérifié

Référence des datasets actifs, de leur visibilité, stockage, pipeline et source runtime.

Le contenu décrit l’état du code au 13 juillet 2026. Les builds, caches, archives et rapports historiques ne servent pas de preuve runtime lorsqu’un fichier source actif existe.

## 2. Inventaire du code

| Élément | Constat vérifié |
| --- | --- |
| DATASET-001 à 011 | Référentiels Pokémon, formes, assets, moves, types, weather, generations, items, rocket texts, stickers et candy |
| DATASET-012 à 016 | Raids, eggs, max battles, Rocket et Research publics |
| DATASET-017 | Shiny Tracker privé |
| DATASET-018 | PvP Rankings public |
| DATASET-019 | Source Watch privé admin |
| DATASET-030 | Assets candy familiaux |

## 3. Implémentation observée

- DATASET-001 à 011 partent de fichiers versionnés PokemonGo-Data et alimentent les collections statiques ou des réponses dérivées.
- DATASET-012 à 016 lisent uniquement MongoDB au runtime; leurs JSON locaux ne servent pas de fallback runtime.
- DATASET-017 utilise shiny_rankings et shiny_snapshots, exige le secret API et reste absent d’OpenAPI.
- DATASET-018 utilise pvprankings, un document current compressé et des routes publiques.
- DATASET-019 stocke la configuration dans operations/audits/sources/current.json et l’historique dans dashboard_store.
- DATASET-030 provient exclusivement des JSON PokemonGo-Data résolus.

## 4. Relations et dépendances

| Source | Relation | Cible |
| --- | --- | --- |
| DATASET-001 à 011 | proviennent de | PokemonGo-Data |
| DATASET-012 à 018 | sont servis par | PokemonGo-API |
| DATASET-019 | est servi par | Dashboard Admin privé |

## 5. Diagramme vérifié

```mermaid
flowchart TD
  STATIC["DATASET-001 à 011"] --> SYNC["Sync statique"]
  CURRENT["DATASET-012 à 018"] --> PIPE["Pipeline current"]
  PRIVATE["DATASET-019"] --> DASH["BFF Dashboard"]
  SYNC --> DB[("MongoDB")]
  PIPE --> DB
  DASH --> DDB[("MongoDB Dashboard")]
```

## 6. Références documentaires

### Documents Foundation

- [DOC-013](./DOC-013-data-overview.md)
- [DOC-015](./DOC-015-provider-overview.md)
- [DOC-017](./DOC-017-mongodb-overview.md)
- [DOC-033](./DOC-033-public-private-datasets.md)

### Registres actuels

- [Registre datasets](../Reports/Audits/audit-documentation/registries/datasets.json)
- [Registre providers](../Reports/Audits/audit-documentation/registries/providers.json)
- [Registre api](../Reports/Audits/audit-documentation/registries/api-routes.json)
- [Registre mongo](../Reports/Audits/audit-documentation/registries/mongodb-collections.json)
- [Registre dependencies](../Reports/Audits/audit-documentation/registries/dependencies.json)

### Fiches spécialisées présentes

- `DATASET-020` — référence historique retirée avec la fonctionnalité associée.
- `WORKFLOW-016` — référence historique retirée avec la fonctionnalité associée.

## 7. Informations absentes du code

- Aucune fiche Markdown unitaire n’est présente pour DATASET-001 à DATASET-019.
- Aucune version globale ne couvre les 20 datasets.
- Aucune fréquence de régénération n’est codée sous forme de cron.

## 8. Fichiers sources

- `PokemonGo-Data/package.json`
- `PokemonGo-API-/src/current-datasets`
- `Dashboard Admin/src/lib/learning`
