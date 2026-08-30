---
id: COMP-330
title: GameMasterJsonViewer
version: 1.1.0
status: Active
last_update: 2026-08-27
author: Matthieu Vachet
affected_projects: [Dashboard Admin]
references: [PAGE-052, COMP-329, RULE-046]
---

# COMP-330 — GameMasterJsonViewer

Arbre JSON progressif, replié par défaut, utilisable au clavier. Il recherche clés, chemins et valeurs, navigue entre les correspondances et copie chemin, valeur ou document complet. Il rend uniquement le template ouvert.

Dans une fiche Pokémon, un onglet est créé pour chaque fichier canonique réellement
résolu: Pokémon, Assets Core, Assets Home, Assets Shuffle, Assets Variants, Location
Cards et PvP. Les documents ne sont jamais fusionnés. Le chemin, la copie et le
téléchargement portent uniquement sur l’onglet actif; un onglet sans fichier valide
n’est pas affiché.
