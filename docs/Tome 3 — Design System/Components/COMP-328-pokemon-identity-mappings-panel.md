---
id: COMP-328
title: PokemonIdentityMappingsPanel
version: 1.1.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin]
references: [PAGE-051, API-163, API-164]
---

# COMP-328 — PokemonIdentityMappingsPanel

Présente les compteurs et la table responsive des mappings Game Master. Les filtres, la pagination et les actions sont contrôlés par `AdminApp`; aucune donnée externe n'est lue directement par le navigateur. À partir de `md`, la table historique est conservée avec une miniature exacte avant le nom. En dessous, chaque mapping devient une carte regroupant identité, formes, bundle, source et statut complet, avec placeholder explicite.
