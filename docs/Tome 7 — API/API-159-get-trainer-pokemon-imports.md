---
id: API-159
title: GET /api/trainer-pokemon/imports
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Route API privée
projects: [Dashboard Admin]
references: [PAGE-049, COL-030, COL-031]
---

# API-159 — GET /api/trainer-pokemon/imports

Retourne au maximum 50 snapshots du propriétaire, du plus récent au plus ancien, avec statut, provenance, volume, checksum, diagnostics, statistiques et possibilité de rollback. Session admin, rate limit et cache privé sans stockage.
