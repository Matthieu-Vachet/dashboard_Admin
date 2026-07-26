---
id: API-178
title: POST régénération Best Defenders
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [DATASET-027, PROVIDER-020]
---

# API-178 — POST régénération Best Defenders

`POST /api/v1/admin/best-defenders/regenerate` exige le secret Admin. Il charge le catalogue Identity Manager, exécute le provider GO Hub, valide les six tiers, persiste MongoDB, enregistre les diagnostics et vérifie hash/compteur après relecture.
