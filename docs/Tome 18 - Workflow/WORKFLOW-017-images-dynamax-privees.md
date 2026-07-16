---
id: WORKFLOW-017
title: Scraping privé des images Dynamax
version: 1.0.0
status: Active
last_update: 2026-07-16
author: Matthieu Vachet
affected_projects: [PokemonGo-API-, Dashboard Admin]
references: [PAGE-053]
---

# WORKFLOW-017 — Images Dynamax privées

La section Admin Pokémon > Assets > Images Dynamax déclenche explicitement un navigateur serveur qui parcourt toutes les pages de la liste GO Hub, extrait uniquement numéro, nom et URL d’image, déduplique les URL et télécharge les fichiers dans un cache temporaire privé.

Chaque téléchargement exige HTTPS, le domaine `db.pokemongohub.net`, un statut 2xx, un `Content-Type` image, une taille maximale de 10 Mio, un timeout de 12 secondes et des redirections restant sur le domaine autorisé. WebP et AVIF sont conservés.

Les routes API privées sont `POST /api/v1/admin/dynamax-images/scan`, `GET /api/v1/admin/dynamax-images`, `GET /api/v1/admin/dynamax-images/export.zip` et `DELETE /api/v1/admin/dynamax-images/cache`. Elles exigent le secret Admin et restent absentes d’OpenAPI. Le Dashboard les relaie après vérification de session. Une simple consultation lit seulement l’état technique et ne lance jamais de scan.

Le ZIP `dynamax-images.zip` contient `dynamax-images/images/`, `manifest.json` limité au nom, numéro, fichier, URL et statut, puis `errors.json` limité aux échecs. Aucune statistique, collection MongoDB ou route Dynamax publique n’est créée.
