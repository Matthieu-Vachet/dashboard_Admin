---
id: REPORT-2026-07-31-DOCS
title: Audit de la documentation Pokémon GO
version: 1.0.0
status: Complete
last_update: 2026-07-31
author: Codex
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API]
references: [DOC-036, ARCH-013, PROVIDER-021, DATASET-029, DATASET-030, ADR-014, ADR-015, RULE-048]
---

# Audit documentaire — 31 juillet 2026

## Inventaire

Le dépôt contient 638 fichiers Markdown : 127 documents de premier niveau/tomes, 413 rapports générés sous `Reports/Audits`, 93 documents du programme Design System et 5 autres documents imbriqués. Les registres d'audit et les sprints Design System sont classés comme historiques ou générés; ils ne deviennent pas l'encyclopédie active.

## Décisions

- Conservation de l'organisation historique des tomes et ajout d'un index transversal par tome.
- Mise à jour ciblée des pages réellement modifiées : PvP Rankings, quatre contrôles Pokémon, Veille et Candies XL.
- Extension du provider Margxt et création des contrats d'audit/XL.
- Aucun archivage supplémentaire : la migration de retrait des anciennes collections Dresseur/Pokémon est déjà tracée dans `docs/migrations/2026-07-30-retire-trainer-pokemon.md`.
- Les rapports `Reports/Audits` restent des preuves générées et ne sont pas promus en documents permanents.

## Contrôles

Les nouveaux documents utilisent un frontmatter, un identifiant permanent, une date, un statut et des références croisées. `scripts/validate-documentation.mjs` vérifie les identifiants uniques, les frontmatters, les liens locaux et l'indexation du corpus encyclopédique.

Après correction des références historiques retirées et des alias de frontmatter, le corpus actif validé contient 139 documents et 139 identifiants uniques répartis sur 11 tomes. Le contrôle final retourne zéro erreur, zéro lien cassé et zéro avertissement. Les mentions de l’ancienne collection personnelle sont désormais exclusivement historiques et indiquent explicitement son retrait du produit.
