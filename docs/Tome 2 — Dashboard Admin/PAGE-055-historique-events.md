---
id: PAGE-055
title: Admin Pokémon — Historique Events
version: 1.1.0
status: Active
last_update: 2026-08-22
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-026, COL-041]
---

# PAGE-055 — Historique Events

Archive responsive filtrable par date, type, statut, provider, Pokémon, présence dans le flux et modification. Le détail affiche le document courant, le payload source, les liens Pokémon/raids/research et l’historique compact des révisions.

`Rescraper Events` suit le provider LeekDuck jusqu’à la collection MongoDB sans changer
de resolver canonique. Le bouton passe par le gestionnaire partagé des régénérations,
transmet un `operationId`, valide que le résultat contient des événements avant refresh
et remplace le toast en cours par le code/message normalisé exact en cas d’échec.
