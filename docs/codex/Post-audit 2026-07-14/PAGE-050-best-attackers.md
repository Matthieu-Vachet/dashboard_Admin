---
id: PAGE-050
title: Best Attackers PvE
version: 1.2.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-]
references: [DATASET-022, API-161, COMP-325, COMP-326, COMP-327]
---

# PAGE-050 — Best Attackers PvE

Écran Admin Pokémon responsive avec recherche, type visuel par icônes locales, niveau, métrique, classe, moveset, filtres Obscur/Méga/élite, pagination, tier et barres comparatives. Les calculs restent serveur ; le navigateur reçoit uniquement les lignes hydratées demandées. L'export charge la vue filtrée complète sans écrire dans MongoDB. Le rendu mobile regroupe toutes les informations dans une carte plus dense sans modifier le contrat ni le layout desktop. L'artwork et le rang occupent une même zone de 76 px ; le lazy-loading reste actif hors écran et ne doit pas être interprété comme un asset absent dans une capture pleine page non scrollée.
