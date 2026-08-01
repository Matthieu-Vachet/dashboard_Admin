---
id: ADR-016
title: Résolution déterministe des identités dans les audits
version: 1.0.0
status: Accepted
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-]
references: [ADR-011, ADR-014, PROVIDER-021, DATASET-029, RULE-049]
---

# ADR-016 — Résolution déterministe des identités dans les audits

## Décision

Une variante métier est identifiée par `dexId + form + costume`. Le sexe reste dans `genderVariants` et les métadonnées d’asset. La résolution suit exclusivement : alias provider actif exact, correspondance canonique exacte, mapping approuvé, puis espèce de base exacte lorsqu’aucune variante n’est exprimée.

La similarité textuelle peut proposer des candidats, mais sa confiance ne valide jamais automatiquement une identité. En cas de pluralité ou d’absence, aucune comparaison métier n’est exécutée.

## Conséquences

Les statuts de parsing/résolution sont indépendants des statuts métier. Une ambiguïté ne gonfle plus les divergences, un fallback vers la forme normale est interdit et chaque association manuelle reste traçable dans Identity Manager.
