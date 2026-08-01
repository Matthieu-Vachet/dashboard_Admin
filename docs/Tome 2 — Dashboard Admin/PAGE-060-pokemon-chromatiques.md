---
id: PAGE-060
title: Contrôle des Pokémon chromatiques
version: 2.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-029, ADR-014, ADR-016, RULE-049]
---

# PAGE-060 — Pokémon chromatiques

La page compare séparément `availability.shinyReleased` et `assets.shinyImage`. Les formes, motifs et costumes ne sont jamais fusionnés avec le nom : `Prismillon / Motif Poké Ball`, les lettres de Zarbi et les costumes Pikachu utilisent l’identité canonique structurée.

Une date absente dans la colonne Margxt produit une erreur de parsing visible ; elle ne devient ni divergence ni identité arbitraire. Les cartes repliables montrent valeur externe, valeur locale, champ JSON, raison, source, confiance, fichier et candidats éventuels.
