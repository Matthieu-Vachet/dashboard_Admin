---
id: PAGE-061
title: Contrôle des costumes Pokémon
version: 2.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data]
references: [PROVIDER-021, DATASET-028, DATASET-029, PAGE-057, ADR-014, ADR-016, RULE-049]
---

# PAGE-061 — Costumes Pokémon

Le parseur lit le titre métier précédant chaque `<figure>` et les deux cellules d’images, au lieu de déduire toute l’identité depuis le nom du fichier. La clé métier est `dexId + form + costume`; `isFemale` reste une dimension d’asset agrégée dans `genderVariants`.

Un alias exact Identity Manager ou un mapping approuvé peut associer Pikachu Willow, les chapeaux Valor/Mystic/Instinct et Mordudor 10e anniversaire. Un libellé inconnu reste `identity-unresolved`, accompagné de candidats si une aide textuelle existe. L’interface n’affiche jamais ce cas comme divergence métier.
