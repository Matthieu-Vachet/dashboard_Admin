---
id: COMP-325
title: PokemonArtwork
version: 1.0.0
status: Active
last_update: 2026-07-14
author: Matthieu Vachet
affected_projects: [Dashboard Admin]
references: [ADR-011, RULE-045, COMP-326]
---

# COMP-325 — PokemonArtwork

Composant unique d'affichage des images Pokémon dans Raids, Œufs, Max, Rocket, Research, Shiny, PvP et Best Attackers. Il lit l'asset déjà résolu, n'invente aucune URL et affiche « Asset absent » lorsque la référence manque. Un point ambre signale un statut de résolution différent de `matched`.
