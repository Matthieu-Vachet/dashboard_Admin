---
id: PROVIDER-019
title: Provider DialgaDex
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [DATASET-022, API-161]
---

# PROVIDER-019 — DialgaDex

Le propriétaire a explicitement autorisé le wrapper. L'adaptation reste isolée sous `GPL-3.0-only` et conserve attribution, URL, commit, date et SHA-256 de `calc.js`, `settings.js` et `dataload.js`.

Le provider ne copie aucune fiche Pokémon. Il apporte seulement les formules PvE DialgaDex : stats effectives par CPM, DPS complet, TDO et eDPS avec respawn, équipe et relobby. Toutes les données d'entrée viennent de PokemonGo-Data.
