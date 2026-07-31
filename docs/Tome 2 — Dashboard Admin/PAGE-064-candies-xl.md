---
id: PAGE-064
title: Candies et Bonbons XL
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-Assets-API]
references: [ARCH-013, DATASET-030, RULE-048]
---

# PAGE-064 — Candies et Bonbons XL

Les vues Candies, Famille bonbon et PvP Rankings consomment directement `assets.candy.image` et `assets.candy.xlImage`. Elles ne connaissent ni le dépôt d'assets ni le dossier `xl_candy`.

Un `xlImage` nul produit l'état explicite « Bonbon XL absent ». Le bonbon normal n'est jamais utilisé comme fallback silencieux. Toutes les formes d'une même famille affichent la même copie canonique.
