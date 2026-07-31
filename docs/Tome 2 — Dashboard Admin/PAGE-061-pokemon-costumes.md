---
id: PAGE-061
title: Contrôle des costumes Pokémon
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-028, DATASET-029, PAGE-057, ADR-014]
---

# PAGE-061 — Costumes Pokémon

Le contrôle lit les images des tableaux Margxt et compare chaque observation avec les `eventAssets` locaux. La clé métier est `dexId + forme + costume`. Les variantes mâle/femelle sont agrégées sous cette identité et restent visibles dans `genders` et `occurrences`.

L'image normale et l'image shiny sont diagnostiquées séparément. Les correspondances faibles ou multiples restent ambiguës; aucune URL externe n'est injectée dans le dataset.
