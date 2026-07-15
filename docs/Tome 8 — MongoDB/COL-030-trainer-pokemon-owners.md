---
id: COL-030
title: trainer_pokemon_owners
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Collection MongoDB privée
projects: [Dashboard Admin]
references: [DATASET-020, WORKFLOW-016, COL-031]
---

# COL-030 — trainer_pokemon_owners

Un document par propriétaire, index unique `owner`. Contient `activeSnapshotId`, `previousSnapshotId`, `updatedAt` et `updatedBy`. La mise à jour de ce document constitue l'unique point d'activation atomique ; les lecteurs n'infèrent jamais l'actif depuis un statut réparti.
