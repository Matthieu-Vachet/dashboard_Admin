---
id: PAGE-064
title: Candies et Bonbons XL
version: 1.1.0
status: Active
last_update: 2026-08-27
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-Assets-API]
references: [ARCH-013, DATASET-030, RULE-048]
---

# PAGE-064 — Candies et Bonbons XL

Les vues Candies, Famille bonbon et PvP Rankings consomment directement `assets.candy.image` et `assets.candy.xlImage`. Elles ne connaissent ni le dépôt d'assets ni le dossier `xl_candy`.

Un `xlImage` nul produit l'état explicite « Bonbon XL absent ». Le bonbon normal n'est jamais utilisé comme fallback silencieux. Toutes les formes d'une même famille affichent la même copie canonique.

`CandyPanel` regroupe et filtre les familles avant pagination. Une page contient neuf
familles. Précédent, Suivant, page, plage et total sont visibles au-dessus et au-dessous
de la liste; un changement de recherche ou de données revient à la première page. La
pagination est locale à Candies et ne modifie aucun état Collections.
