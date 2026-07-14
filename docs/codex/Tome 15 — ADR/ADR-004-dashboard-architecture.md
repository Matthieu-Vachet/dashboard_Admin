---
id: ADR-004
title: Dashboard Architecture
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Dashboard Admin
  - UI
  - API
  - Providers
  - Datasets
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-011-dashboard-overview.md
  - DOC-015-provider-overview.md
  - ADR-001-provider-architecture.md
  - ADR-008-component-first.md
tags:
  - dashboard
  - architecture
  - admin
  - modularity
---

# ADR-004 — Dashboard Architecture

## Statut

**Accepté**

---

# Résumé

Le Dashboard Admin est construit selon une architecture modulaire où chaque fonctionnalité est isolée dans son propre domaine tout en partageant des composants, des Providers et des services communs.

Cette organisation permet de faire évoluer une section sans impacter l'ensemble de l'application.

---

# Contexte

Le Dashboard centralise de nombreuses fonctionnalités :

- gestion des Pokémon ;
- Candies ;
- Backgrounds ;
- Raids ;
- Eggs ;
- Events ;
- Shiny Tracker ;
- API Explorer ;
- Sources ;
- Ma Collection ;
- paramètres et outils d'administration.

Une architecture monolithique rendrait ces évolutions difficiles à maintenir.

---

# Problème

Sans architecture modulaire :

- les dépendances deviennent difficiles à maîtriser ;
- les composants sont réutilisés de manière incohérente ;
- les évolutions augmentent le risque de régression ;
- les tests deviennent plus complexes.

---

# Décision

Le Dashboard adopte une architecture modulaire reposant sur :

- des pages indépendantes ;
- des composants réutilisables ;
- des Providers pour les accès aux données ;
- des datasets spécialisés ;
- des workflows dédiés aux traitements.

Chaque module reste responsable de son domaine fonctionnel tout en utilisant les briques communes de l'application.

---

# Architecture retenue

```text
Dashboard
│
├── Pages
├── Components
├── Providers
├── Workflows
├── Datasets
└── API
```

Chaque couche possède une responsabilité clairement définie.

---

# Alternatives étudiées

## Dashboard monolithique

**Rejetée**

Le couplage entre les fonctionnalités deviendrait trop important.

## Architecture modulaire

**Retenue**

Elle facilite la maintenance, la réutilisation et les évolutions progressives.

---

# Conséquences

## Avantages

- séparation des responsabilités ;
- meilleure évolutivité ;
- réutilisation des composants ;
- intégration facilitée du Design System ;
- maintenance simplifiée.

## Contraintes

- respecter les limites entre les modules ;
- éviter les dépendances circulaires ;
- privilégier les composants communs lorsqu'ils existent.

---

# Principes dérivés

- Une page représente un domaine fonctionnel.
- Les composants métier composent les primitives du Design System.
- Les accès aux données passent par les Providers.
- Les traitements complexes sont confiés aux workflows.

---

# Impact

Cette décision influence :

- l'organisation des pages ;
- le Design System ;
- les Providers ;
- les Workflows ;
- les tests ;
- la documentation.

---

# Risques

En cas de non-respect :

- augmentation de la dette technique ;
- duplication de logique ;
- perte de modularité ;
- difficulté de maintenance.

---

# Références

- DOC-011 — Dashboard Overview
- ADR-001 — Provider Architecture
- ADR-008 — Component First

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR définissant l'architecture modulaire du Dashboard Admin.
