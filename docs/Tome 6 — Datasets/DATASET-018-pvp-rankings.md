---
id: DATASET-018
title: PvP Rankings
version: 1.1.0
status: Public
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PAGE-058, ADR-006, RULE-048]
---

# DATASET-018 — PvP Rankings

Snapshot public issu des classements et du Game Master PvPoke, puis normalisé avec les identités, attaques et métadonnées locales. `pvp.secondChargedMoveCost` lit `secondChargeMoveCost`; `pvp.candyFamilyId` et `pokemon.assets.candy` transportent la famille et ses assets résolus.

Le dataset ne devine ni coût, ni distance, ni quantité XL. Chaque champ local publie une provenance ou un état absent. Les partenaires suggérés sont servis séparément par l'API privée et résolus vers l'identité canonique avant affichage.
