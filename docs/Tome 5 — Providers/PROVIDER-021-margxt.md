---
id: PROVIDER-021
title: Provider Margxt
version: 4.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, Dashboard Admin, PokemonGo-API-]
references: [DATASET-019, PAGE-063, ADR-014]
---

# PROVIDER-021 — Margxt

Margxt est une source externe francophone de contrôle. Elle ne remplace jamais `PokemonGo-Data` et n’autorise aucune écriture automatique.

| Source ID | Sujet | Bloc HTML fiable | Consommateur |
| --- | --- | --- | --- |
| `margxt-pokemon-go-missing` | Pokémon introuvables | signature HTTP | Veille |
| `margxt-pokemon-go-shiny` | Pokémon chromatiques | signature HTTP | Veille |
| `margxt-pokemon-go-shadow` | Shadow et Shiny Shadow | signature HTTP | Veille |

Les trois pages restantes ne sont pas interprétées par le Dashboard : Source Watch relève seulement leur joignabilité et leurs signatures.

Chaque contrôle conserve l’URL, l’heure de lecture, la signature distante et la politique `read-only`. Les costumes et événements sont maintenus manuellement dans les données canoniques; aucun provider Margxt Costume n'est exécuté.
