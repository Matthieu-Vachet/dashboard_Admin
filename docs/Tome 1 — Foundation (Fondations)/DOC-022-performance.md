---
id: DOC-022
title: "Performance"
description: "Référence des mécanismes de rendu, pagination, cache, images et requêtes qui influencent le coût runtime."
version: 2.0.0
status: Official
owner: Matthieu Vachet
created: 2026-07-13
last_updated: 2026-07-13
category: Foundation
type: Reference
language: fr
scope:
  - "Dashboard Admin"
  - "PokemonGo-API-"
  - "Landing-Page-PogoApi"
source_files:
  - "Dashboard Admin/src/components/admin/pokemon/admin-app.jsx"
  - "PokemonGo-API-/src/lib/cache.js"
  - "PokemonGo-API-/src/services"
  - "PokemonGo-API-/components"
  - "Landing-Page-PogoApi/components/landing-experience.jsx"
registries:
  - "audit-documentation/registries/components.json"
  - "audit-documentation/registries/api-routes.json"
  - "audit-documentation/registries/mongodb-collections.json"
related:
  - "DOC-011"
  - "DOC-012"
  - "DOC-018"
  - "DOC-023"
---

# DOC-022 — Performance

## 1. Périmètre vérifié

Référence des mécanismes de rendu, pagination, cache, images et requêtes qui influencent le coût runtime.

Le contenu décrit l’état du code au 13 juillet 2026. Les builds, caches, archives et rapports historiques ne servent pas de preuve runtime lorsqu’un fichier source actif existe.

## 2. Inventaire du code

| Élément | Constat vérifié |
| --- | --- |
| AdminApp | shell métier segmenté par panneaux |
| Chargement dynamique | panneaux lourds et audits chargés à la demande |
| Cache API | 60 s et 5 000 entrées |
| Accueil API | revalidate=3600 |
| Events public | 60 s + stale 300 s |
| Audits externes | requête à la demande, sans écriture locale |

## 3. Implémentation observée

- AdminApp charge dynamiquement les panneaux lourds et le centre d’audit.
- Les datasets current historiques sont chargés lorsque leur section devient active; le bootstrap Pokémon initial reste global.
- La checklist publique reçoit le bootstrap et le catalogue complets puis limite le rendu initial côté client.
- Les routes principales Pokémon, moves, items, forms, PvP et textes Rocket utilisent skip, limit, countDocuments et lean.
- Les images mélangent next/image et img; la Landing utilise next/image pour ses visuels et hydrate LandingExperience pour GSAP.

## 4. Relations et dépendances

| Source | Relation | Cible |
| --- | --- | --- |
| Route Admin Pokémon | charge | AdminApp |
| AdminApp | charge dynamiquement | panneaux lourds et audits |
| API GET | utilise | cache ou no-store |
| Requêtes listées | utilisent | index, projection et pagination |

## 5. Diagramme vérifié

```mermaid
flowchart LR
  PAGE["Admin Pokémon"] --> APP["AdminApp"]
  APP --> STATIC["Panneaux courants"]
  APP --> DYNAMIC["Panneaux lourds dynamiques"]
  APP --> BFF["BFF Dashboard"]
  BFF --> API["API cache/no-store"]
  API --> DB[("MongoDB")]
```

## 6. Références documentaires

### Documents Foundation

- [DOC-011](./DOC-011-dashboard-overview.md)
- [DOC-012](./DOC-012-api-overview.md)
- [DOC-018](./DOC-018-cache-overview.md)
- [DOC-023](./DOC-023-responsive.md)

### Registres actuels

- [Registre components](../Reports/Audits/audit-documentation/registries/components.json)
- [Registre api](../Reports/Audits/audit-documentation/registries/api-routes.json)
- [Registre mongo](../Reports/Audits/audit-documentation/registries/mongodb-collections.json)

### Fiches spécialisées présentes

- `PAGE-049` — référence historique retirée avec la fonctionnalité associée.
- `COMP-137` — référence historique retirée avec la fonctionnalité associée.

Les identifiants non listés dans les fiches spécialisées ci-dessus renvoient uniquement aux registres JSON.

## 7. Informations absentes du code

- Aucun résultat Core Web Vitals n’est présent.
- Aucun budget de bundle n’est présent.
- Aucune mesure p95 ou p99 API/Mongo n’est présente.
- Aucun explain MongoDB n’est conservé.

## 8. Fichiers sources

- `Dashboard Admin/src/components/admin/pokemon/admin-app.jsx`
- `PokemonGo-API-/src/lib/cache.js`
- `PokemonGo-API-/src/services`
- `PokemonGo-API-/components`
- `Landing-Page-PogoApi/components/landing-experience.jsx`
