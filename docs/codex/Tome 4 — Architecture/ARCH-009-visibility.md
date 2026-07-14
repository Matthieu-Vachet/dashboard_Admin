---
id: ARCH-009
title: Visibility
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - DOC-011-dashboard-overview.md
  - DOC-020-security.md
  - ADR-002-public-private-datasets.md
  - ARCH-008-permissions.md
source_of_truth:
  - Dashboard Admin
  - Datasets
  - API
---

# ARCH-009 — Visibility

## Objectif

Décrire les principes d'architecture gouvernant la visibilité des données, fonctionnalités et ressources au sein de l'écosystème Pokémon GO.

---

# Vue d'ensemble

Le projet distingue plusieurs niveaux de visibilité afin de séparer clairement les ressources destinées au public de celles réservées à l'administration.

```text
Ressource
    │
    ▼
Classification
    │
    ├── Publique
    ├── Privée
    └── Interne
          │
          ▼
Contrôle d'accès
          │
          ▼
Consommateur autorisé
```

---

# Principes

- Chaque ressource possède un niveau de visibilité clairement défini.
- Une ressource ne change pas implicitement de niveau de visibilité.
- Les datasets publics et privés restent séparés.
- Les routes API respectent le niveau de visibilité des données qu'elles exposent.

---

# Niveaux de visibilité

## Public

Ressources destinées à être consultées par des consommateurs externes via l'API publique.

## Privé

Ressources accessibles uniquement aux fonctionnalités d'administration autorisées.

## Interne

Ressources techniques utilisées par les workflows, la journalisation, le monitoring ou les traitements internes.

---

# Architecture retenue

```text
Dataset
    │
    ▼
Classification
    │
    ▼
Contrôle de visibilité
    │
    ├── API publique
    ├── Dashboard Admin
    └── Services internes
```

---

# Bonnes pratiques

- Définir le niveau de visibilité dès la création d'une ressource.
- Éviter toute exposition implicite de données internes.
- Vérifier la cohérence entre visibilité, permissions et documentation.
- Documenter tout changement de visibilité.

---

# Limites connues

Les règles générales de visibilité sont définies ici.

Les mécanismes techniques d'authentification et d'autorisation sont documentés dans les tomes Sécurité et API.

---

# Documents liés

- DOC-011 — Dashboard Overview
- DOC-020 — Security
- ADR-002 — Public / Private Datasets
- ARCH-008 — Permissions

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant les principes de visibilité des ressources du projet.
