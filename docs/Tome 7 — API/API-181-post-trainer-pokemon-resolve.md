---
id: API-181
title: POST nouvelle résolution Ma Collection
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-]
references: [DATASET-020, PAGE-049, PROVIDER-022]
---

# API-181 — POST nouvelle résolution Ma Collection

`POST /api/trainer-pokemon/resolve` est une route Dashboard privée, liée à l’utilisateur de session, protégée par origine et limite de débit. Elle rejoue le snapshot actif par lots Identity Manager, remplace uniquement les champs dérivés d’identité/asset et actualise les diagnostics sans supprimer ni réimporter les entrées.
