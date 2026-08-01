---
id: COL-042
title: Archive des fonctionnalités retirées
version: 1.0.0
status: Historical
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [COL-043, PAGE-IDENTITY-001]
---

# COL-042 — `migration_retired_features_archive`

Archive historique créée avant la migration de retrait. Chaque document contient `migrationId`, `database`, `sourceCollection`, `sourceId`, `digest`, `archivedAt` et le document BSON original. L’index unique `migrationId + sourceCollection + sourceId` rend les relances idempotentes.

Cette collection est exclue de tout provider, cache, statistique et workflow actif. Elle est la seule source de restauration et peut donc conserver explicitement les anciens identifiants historiques.
