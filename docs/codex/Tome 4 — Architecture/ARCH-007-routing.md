---
id: ARCH-007
title: Routing
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - DOC-011-dashboard-overview.md
  - DOC-012-api-overview.md
  - ADR-004-dashboard-architecture.md
source_of_truth:
  - Dashboard Admin
  - API
  - Routes
---

# ARCH-007 — Routing

## Objectif

Décrire les principes d'organisation du système de routage du Dashboard Admin et de l'API afin de garantir une navigation cohérente et une architecture maintenable.

---

# Vue d'ensemble

Le projet distingue clairement :

- les routes du Dashboard Admin ;
- les routes de l'API ;
- les routes publiques ;
- les routes privées.

Chaque famille possède une responsabilité propre.

```text
Application
│
├── Dashboard
│     ├── Pages
│     └── Outils d'administration
│
└── API
      ├── Routes publiques
      └── Routes privées
```

---

# Principes

- Une route représente une responsabilité clairement identifiée.
- Les routes publiques et privées restent séparées.
- Les traitements métier sont délégués aux Providers et aux Workflows.
- Les routes ne doivent pas dupliquer la logique métier.

---

# Dashboard

Les routes du Dashboard permettent l'administration des datasets, des Providers et des outils internes.

Chaque page correspond à un domaine fonctionnel identifié dans la documentation `PAGE-*`.

---

# API

Les routes API exposent uniquement les données prévues pour les consommateurs externes ou les outils autorisés.

Les routes privées sont réservées aux opérations d'administration et aux traitements internes.

---

# Organisation

```text
Utilisateur
      │
      ▼
Route Dashboard / Route API
      │
      ▼
Provider / Workflow
      │
      ▼
Dataset
```

---

# Bonnes pratiques

- Limiter chaque route à une responsabilité.
- Conserver des conventions de nommage homogènes.
- Séparer les routes publiques des routes privées.
- Documenter toute nouvelle route dans le Tome API.

---

# Limites connues

Les conventions générales sont documentées.

Le détail des endpoints et des paramètres est traité dans les documents `API-*`.

---

# Documents liés

- DOC-011 — Dashboard Overview
- DOC-012 — API Overview
- API-000 — Conventions
- API-001 — Overview
- ADR-004 — Dashboard Architecture

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant les principes de routage du projet.
