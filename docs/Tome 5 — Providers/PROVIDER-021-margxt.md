---
id: PROVIDER-021
title: Provider Margxt
version: 3.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, Dashboard Admin, PokemonGo-API-]
references: [DATASET-028, DATASET-029, PAGE-059, PAGE-060, PAGE-061, PAGE-062, ADR-014, ADR-016]
---

# PROVIDER-021 — Margxt

Margxt est une source externe francophone de contrôle. Elle ne remplace jamais `PokemonGo-Data` et n’autorise aucune écriture automatique.

| Source ID | Sujet | Bloc HTML fiable | Consommateur |
| --- | --- | --- | --- |
| `margxt-pokemon-go-missing` | Pokémon introuvables | lignes de tableau Numéro/Pokémon/Information | PAGE-059 |
| `margxt-pokemon-go-shiny` | Pokémon chromatiques | lignes de tableau, `<br>` date/événement | PAGE-060 |
| `margxt-pokemon-go-costumes` | Costumes | titre précédant le `<figure>` + tableau d’images | PAGE-061 et PAGE-057 |
| `margxt-pokemon-go-shadow` | Shadow et Shiny Shadow | deux colonnes de disponibilité indépendantes | PAGE-062 |

Les titres, légendes, sommaires, boutons et lignes « Liste des… » sont exclus. Les séparateurs `<br>` sont conservés avant extraction afin que `Meloetta / Forme Danse`, `Prismillon / Motif Poké Ball` et `date / événement` restent des champs séparés.

La résolution suit cet ordre : alias Margxt actif exact dans Identity Manager, nom/forme/costume canonique exact, mapping approuvé versionné, espèce de base exacte sans variante explicite. Le rapprochement textuel ne fournit que des candidats et ne valide jamais une identité. Les mappings approuvés vivent dans `PokemonGo-Data/mappings/margxtAuditAliases.json`, avec cible, périmètre et justification.

Chaque exécution conserve l’URL, l’heure de lecture, l’empreinte SHA-256, la version du parseur et la politique `read-only`. Les fixtures HTML des quatre pages sont obligatoires lors de toute évolution du DOM.
