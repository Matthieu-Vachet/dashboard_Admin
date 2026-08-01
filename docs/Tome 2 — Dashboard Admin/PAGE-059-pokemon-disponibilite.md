---
id: PAGE-059
title: Contrôle des Pokémon disponibles
version: 2.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-029, ADR-014]
---

# PAGE-059 — Pokémon disponibles

Cette page compare la liste Margxt des Pokémon introuvables à `availability.released`. La sémantique est négative : la présence externe signifie « attendu non disponible »; l'absence externe ne prouve jamais qu'un Pokémon est sorti.

Elle expose la couverture, les statuts de résolution et métier, la recherche, les filtres, la provenance et l’ouverture de la fiche locale. Chaque résultat détaille `availability.released`, la valeur externe `false`, la valeur locale et la raison. Meloetta Forme Danse, les motifs de Prismillon et les lettres de Zarbi sont des formes distinctes, jamais des noms concaténés.

Une identité non résolue rend les variantes locales du même `dexId` non vérifiables au lieu de les classer artificiellement « uniquement locales ». Une source indisponible est affichée comme erreur de source avec zéro divergence.
