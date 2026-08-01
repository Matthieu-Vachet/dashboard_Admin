---
id: COL-043
title: Manifestes de migration
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [COL-042, PAGE-IDENTITY-001]
---

# COL-043 — `migration_manifests`

Registre technique des migrations MongoDB réversibles. Le manifeste conserve l’identifiant, le statut, les collections et nombres de documents, les dates d’application/restauration et le marqueur `historicalOnly`. Il ne contient aucune identité active et n’alimente pas Identity Manager.
