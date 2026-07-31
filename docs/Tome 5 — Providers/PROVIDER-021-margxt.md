---
id: PROVIDER-021
title: Provider Margxt
version: 2.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, Dashboard Admin]
references: [DATASET-028, DATASET-029, PAGE-059, PAGE-060, PAGE-061, PAGE-062, ADR-014]
---

# PROVIDER-021 — Margxt

Margxt est une source externe francophone de contrôle. Elle ne remplace jamais `PokemonGo-Data` et n'autorise aucune écriture automatique.

## Sources enregistrées

| Source ID | Sujet | Scraper | Consommateur |
| --- | --- | --- | --- |
| `margxt-pokemon-go-missing` | Pokémon introuvables | `margxt-table-v1` | PAGE-059 |
| `margxt-pokemon-go-shiny` | Pokémon chromatiques disponibles | `margxt-table-v1` | PAGE-060 |
| `margxt-pokemon-go-costumes` | Costumes et variantes événementielles | `margxt-costume-images-v1` | PAGE-061 et PAGE-057 |
| `margxt-pokemon-go-shadow` | Pokémon Shadow et Shiny Shadow | `margxt-table-v1` | PAGE-062 |

Les métadonnées stables vivent dans `PokemonGo-Data/source-watch/sources.json` : identifiant, domaine, langue, sujet, fréquence, statut, scraper, consommateurs, confiance et notes de mapping.

## Contrat de comparaison

Les tables sont lues à la demande, puis rapprochées des identités locales. Les costumes utilisent la clé métier `dexId + forme + costume`; `isFemale` reste une dimension d'asset. Les statuts possibles sont `up-to-date`, `divergence`, `external-only`, `local-only` et `ambiguous`. Une ambiguïté, une erreur HTTP ou un changement de structure HTML reste visible et ne crée aucune modification JSON.

## Exploitabilité

Chaque résultat conserve l'URL, l'heure de lecture, l'empreinte SHA-256 du HTML, le parseur et la politique `read-only`. Les fixtures HTML couvrent les quatre structures attendues. Toute évolution du DOM doit modifier le parseur et sa fixture dans le même commit.
