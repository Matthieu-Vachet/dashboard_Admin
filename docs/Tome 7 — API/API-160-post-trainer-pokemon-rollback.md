---
id: API-160
title: POST /api/trainer-pokemon/imports/:id/rollback
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Route API privée
projects: [Dashboard Admin]
references: [WORKFLOW-016, COL-030, COL-031, COL-032]
---

# API-160 — POST /api/trainer-pokemon/imports/:id/rollback

Vérifie l'identifiant, le propriétaire, le statut et le nombre d'entrées du snapshot cible avant de basculer atomiquement `activeSnapshotId`. L'ancien actif devient archivé et reste récupérable. Session admin, same-origin et rate limit obligatoires.
