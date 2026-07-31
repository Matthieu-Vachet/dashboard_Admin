---
id: RULE-047
title: Fallback HOME réservé aux fiches normales
version: 1.3.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-Assets-API]
references: [RULE-045, ADR-011, COMP-325]
---

# RULE-047 — Fallback HOME réservé aux fiches normales

Pour une fiche normale : asset GO principal exact, asset normal du fichier référencé, HOME, portrait, placeholder. Pour un shiny normal : les mêmes sources shiny dans le même ordre. `availability.released`, capturabilité et date de sortie n’interviennent jamais dans la présence visuelle.

Dès qu’une forme, un costume, une différence femelle, un Méga, Dynamax, Gigamax ou tout autre état explicite est demandé, seul l’asset exact est autorisé. L’asset HOME normal ne peut jamais masquer une variante absente.

Cette règle s'applique aux fiches, aux datasets courants et classés ainsi qu'aux comparaisons Game Master. Le statut de résolution et la provenance de l'asset doivent rester visibles et auditables. L’ancienne collection personnelle a été retirée du produit le 30 juillet 2026 et n’est plus un consommateur actif.

Une entrée portant un `canonicalId` n'est jamais éligible à ce fallback côté Dashboard : sa référence locale et son bundle sont déjà déterminés par l'Identity Manager. Le fallback HOME reste réservé aux fiches locales normales non administrées qui n'expriment aucune variante.

## Historique

- 1.3.0 — 2026-07-31 : retrait de la collection personnelle de la portée active.
- 1.2.0 — 2026-07-18 : exclusion explicite des payloads déjà résolus par une identité canonique.
- 1.1.0 — 2026-07-15 : extension explicite à la collection, au Shiny Tracker et aux comparaisons Game Master.
- 1.0.0 — 2026-07-15 : règle initiale du fallback HOME normal.
