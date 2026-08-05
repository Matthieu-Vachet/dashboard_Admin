---
id: DOC-036
title: Index des tomes de l'encyclopédie
version: 2.0.0
status: Active
last_update: 2026-08-02
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [ASSET-001, TEST-001, PERF-001, RESP-001, SEC-001, ROADMAP-001, ADR-014, RULE-048]
---

# DOC-036 — Index des tomes

| Tome | Autorité | Entrées de cette évolution |
| --- | --- | --- |
| Tome 1 — Foundation | règles, vision et vue d’ensemble | DOC-001 à DOC-035 |
| Tome 2 — Dashboard Admin | pages et usages | PAGE-* |
| Tome 3 — Design System | composants et tokens | DESIGN-* |
| Tome 4 — Architecture | flux et responsabilités | ARCH-* |
| Tome 5 — Providers | sources externes | PROVIDER-* |
| Tome 6 — Datasets | contrats de données | DATASET-* |
| Tome 7 — API | routes et contrats publiés | API-* |
| Tome 8 — MongoDB | collections et persistance | COL-* |
| Tome 9 — Assets | résolution, affichage et validation | ASSET-001 à ASSET-008 |
| Tome 10 — Tests | stratégie, niveaux et preuves | TEST-001 à TEST-009 |
| Tome 11 — Performance | rendu, cache et volumétrie | PERF-001 à PERF-007 |
| Tome 12 — Responsive | breakpoints et composants adaptatifs | RESP-001 à RESP-006 |
| Tome 13 — Security | auth, datasets et frontière API | SEC-001 à SEC-006 |
| Tome 14 — Roadmap | priorités, dette et limitations | ROADMAP-001 à ROADMAP-005 |
| Tome 15 — ADR | décisions | ADR-014 à ADR-015 |
| Tome 18 — Workflow | opérations | workflows existants; audit externe manuel |
| Tome 19 — Rules | invariants | RULE-048 |

Les Tomes 1 à 14 constituent désormais le socle continu obligatoire. Les documents historiques restent à leur emplacement et les séquences d’identifiants ne sont jamais renumérotées.

## Règles de maintien

- `npm run test:docs` vérifie la présence de chaque document obligatoire des Tomes 9 à 14.
- Un identifiant est unique dans toute la documentation active.
- Une route privée reste documentée hors du contrat OpenAPI public.
- Une modification fonctionnelle met à jour son document d’autorité et l’historique associé.
