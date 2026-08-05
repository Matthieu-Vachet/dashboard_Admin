---
id: DATASET-019
title: Source Watch
version: 2.0.0
status: Private
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, Dashboard Admin]
references: [PAGE-063, PROVIDER-021]
---

# DATASET-019 — Source Watch

Registre privé des sources GitHub et web suivies par le Dashboard. Chaque entrée définit un identifiant stable, une catégorie, une URL et, selon le provider, domaine, langue, sujet, fréquence, statut, parseur, consommateurs, confiance et notes de mapping.

Source Watch contrôle uniquement la joignabilité, les statuts et les signatures. Les contrôles structurels et référentiels des données canoniques restent dans l’Engine JSON afin de ne pas confondre transport et conformité.
