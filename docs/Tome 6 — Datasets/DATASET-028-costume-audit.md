---
id: DATASET-028
title: Audit privé Costumes Margxt
version: 1.0.0
status: Active
last_update: 2026-07-26
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PROVIDER-021, PAGE-057, API-179, API-180]
---

# DATASET-028 — Audit privé Costumes Margxt

Dataset de contrôle privé persistant les entrées Margxt dans `costume_audits`. Le document courant suit le pipeline idempotent gzip/hash/diff/relecture et conserve la preuve source séparément des assets locaux.

La génération du 26 juillet 2026 a observé 197 entrées et 189 disponibilités shiny : 4 correspondances locales exactes et 193 aliases/costumes non résolus dans l’exécution locale sans catalogue MongoDB. Ces chiffres doivent être recalculés après synchronisation Identity Manager et ne constituent pas des créations automatiques.
