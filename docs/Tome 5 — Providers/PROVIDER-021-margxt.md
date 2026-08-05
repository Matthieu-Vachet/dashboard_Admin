---
id: PROVIDER-021
title: Provider Margxt
version: 4.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, Dashboard Admin, PokemonGo-API-]
references: [DATASET-019, DATASET-028, PAGE-057, PAGE-063, ADR-014]
---

# PROVIDER-021 — Margxt

Margxt est une source externe francophone de contrôle. Elle ne remplace jamais `PokemonGo-Data` et n’autorise aucune écriture automatique.

| Source ID | Sujet | Bloc HTML fiable | Consommateur |
| --- | --- | --- | --- |
| `margxt-pokemon-go-missing` | Pokémon introuvables | signature HTTP | Veille |
| `margxt-pokemon-go-shiny` | Pokémon chromatiques | signature HTTP | Veille |
| `margxt-pokemon-go-costumes` | Costumes | titre précédant le `<figure>` + tableau d’images | PAGE-057 et Veille |
| `margxt-pokemon-go-shadow` | Shadow et Shiny Shadow | signature HTTP | Veille |

Le dataset privé Costume conserve son parseur dédié et ses preuves. Les trois autres pages ne sont plus interprétées par le Dashboard : Source Watch relève seulement leur joignabilité et leurs signatures.

Chaque contrôle conserve l’URL, l’heure de lecture, la signature distante et la politique `read-only`. Le provider Costume reste couvert par sa fixture HTML et ne crée jamais de donnée canonique automatiquement.
