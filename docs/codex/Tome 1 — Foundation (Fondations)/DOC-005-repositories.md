---
id: DOC-005
titre: Référentiels (Repositories)
version: 1.0.0
statut: Actif
derniere_mise_a_jour: 2026-07-12
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 05
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing Page Pokémon GO
references:
  - DOC-001
  - DOC-002
  - DOC-004
  - DOC-006
---

# Référentiels (Repositories)

> Ce document présente les différents dépôts constituant l'écosystème de la plateforme Pokémon GO, leurs responsabilités et leurs interactions.

## Vue d'ensemble

L'architecture repose sur plusieurs dépôts indépendants afin de séparer les responsabilités et de faciliter la maintenance.

```text
                 +----------------------+
                 | PokemonGo-Data       |
                 | Génération datasets  |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 | PokemonGo-API        |
                 | MongoDB + API REST   |
                 +----------+-----------+
                            |
             +--------------+--------------+
             |                             |
             v                             v
+--------------------------+     +-------------------------+
| Dashboard Admin          |     | Landing Page            |
| Administration privée    |     | Documentation publique  |
+--------------------------+     +-------------------------+

                ^
                |
      +-----------------------+
      | PokemonGo-Assets-API  |
      | Images / Icônes       |
      +-----------------------+
```

## REPO-001 — Dashboard Admin

### Rôle

Interface privée d'administration et de supervision.

### Responsabilités

- Gestion des datasets
- Diagnostics
- Publication MongoDB
- API Explorer
- Veille des sources
- Tests visuels
- Modules privés (Shiny Tracker, etc.)

### Dépendances

- PokemonGo-API
- PokemonGo-Assets-API

---

## REPO-002 — PokemonGo-API

### Rôle

Expose les données publiques et privées via des routes REST.

### Responsabilités

- API REST
- Authentification
- Documentation OpenAPI
- Cache
- MongoDB
- Versionnement des routes

### Dépendances

- MongoDB
- Datasets générés par PokemonGo-Data

---

## REPO-003 — PokemonGo-Data

### Rôle

Génère tous les jeux de données.

### Responsabilités

- Scraping
- Providers
- Validation
- Normalisation
- Génération JSON
- Hash et diagnostics

Ce dépôt est la porte d'entrée des données externes.

---

## REPO-004 — PokemonGo-Assets-API

### Rôle

Centraliser toutes les ressources graphiques.

### Contenu

- Assets GO
- Assets HOME
- Icônes
- Types
- Backgrounds
- Location Cards
- Filtres
- Illustrations

Tous les projets utilisent ce dépôt comme référence graphique.

---

## REPO-005 — Landing Page

### Rôle

Présenter publiquement l'écosystème.

### Objectifs

- Présentation de l'API
- Documentation
- Exemples
- Mise en avant des datasets publics

---

# Flux entre les dépôts

1. PokemonGo-Data récupère et génère les datasets.
2. Les datasets sont validés puis publiés.
3. PokemonGo-API les expose.
4. Dashboard Admin les administre.
5. La Landing Page présente les fonctionnalités publiques.
6. Les assets sont partagés par l'ensemble des projets.

---

# Principes

- Un dépôt = une responsabilité principale.
- Pas de duplication de logique métier.
- Les dépendances doivent être clairement identifiées.
- Les échanges passent par des interfaces définies (API, datasets, providers).

---

# Conformité

Ce document applique notamment :

- RULE-003 — Auditer avant de développer.
- RULE-006 — Réutiliser avant de créer.
- RULE-007 — Responsabilité unique.
- RULE-008 — Architecture orientée Providers.
- RULE-009 — Aucune architecture concurrente.

---

# Documents associés

- DOC-001 — Règles générales
- DOC-002 — Vision
- DOC-004 — Philosophie
- DOC-006 — Architecture générale

---

# Historique

## Version 1.0.0 — 2026-07-12

- Création du document.
- Documentation des dépôts et de leurs responsabilités.
