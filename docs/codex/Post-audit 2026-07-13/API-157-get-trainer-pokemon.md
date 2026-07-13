---
id: API-157
title: GET /api/trainer-pokemon
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Route API privée
projects: [Dashboard Admin]
references: [PAGE-049, DATASET-020, COL-030, COL-031, COL-032]
---

# API-157 — GET /api/trainer-pokemon

Lecture paginée de la collection active du propriétaire authentifié. Accepte recherche, filtres shiny/lucky/genre/alignement/costume/forme/IV/CP et tri autorisé. Retourne au maximum 100 entrées, le snapshot actif, les statistiques, options dérivées et métadonnées de pagination.

Session admin obligatoire, rate limit, `private, no-store`, aucune présence dans l'OpenAPI public.
