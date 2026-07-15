---
id: RULE-047
title: Fallback HOME réservé aux fiches normales
version: 1.0.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-Assets-API]
references: [RULE-045, ADR-011, COMP-325, PAGE-049]
---

# RULE-047 — Fallback HOME réservé aux fiches normales

Pour une fiche normale : asset GO principal exact, asset normal du fichier référencé, HOME, portrait, placeholder. Pour un shiny normal : les mêmes sources shiny dans le même ordre. `availability.released`, capturabilité et date de sortie n’interviennent jamais dans la présence visuelle.

Dès qu’une forme, un costume, une différence femelle, un Méga, Dynamax, Gigamax ou tout autre état explicite est demandé, seul l’asset exact est autorisé. L’asset HOME normal ne peut jamais masquer une variante absente.
