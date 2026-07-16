---
id: DATASET-026
title: Archive permanente des événements Pokémon GO
version: 1.0.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [COL-041, PAGE-055]
---

# DATASET-026 — Archive permanente Events

Le rescraping du Calendrier Events maintient trois contrats distincts :

- `events` est le flux courant utilisé par le calendrier ;
- `events_archive` conserve tous les événements déjà observés sans suppression ;
- `dataset_runs` conserve les exécutions, hashes, diffs, warnings et non-matchés.

Une entrée présente reçoit `activeInCurrentFeed: true`. Une entrée absente reste dans l’archive avec `activeInCurrentFeed: false`; le compteur `removed` de la Source active signifie donc « absent du flux courant », jamais « supprimé de l’archive ».

Une modification réelle du hash incrémente `revision` et ajoute uniquement `changedFields`, `previousValues`, `hashBefore`, `hashAfter`, `changedAt` et le provider. Une collision ambiguë de clé canonique est conservée sous une clé suffixée et remonte un diagnostic.

Lecture publique : `GET /api/v1/events/history`, `GET /api/v1/events/history/:id` et `GET /api/v1/events/history/:id/revisions`. Les payloads source et diagnostics internes restent réservés à la page Admin Historique Events.
