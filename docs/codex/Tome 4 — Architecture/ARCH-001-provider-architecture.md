---
id: ARCH-001
title: Provider Architecture
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - DOC-011-dashboard-overview.md
  - DOC-015-provider-overview.md
  - ADR-001-provider-architecture.md
  - PROVIDER-001-leekduck.md
  - PROVIDER-007-provider-interface.md
source_of_truth:
  - Providers
  - Dashboard Admin
---

# ARCH-001 — Provider Architecture

## Objectif

Décrire l'architecture générale de la couche **Provider**, qui constitue le point d'entrée unique entre les sources externes et le reste de l'écosystème Pokémon GO.

---

# Vue d'ensemble

L'architecture repose sur une séparation stricte des responsabilités.

```text
Source externe
      │
      ▼
 Provider
      │
      ├── Récupération
      ├── Validation
      ├── Transformation
      └── Normalisation
      │
      ▼
 Dataset
      │
      ▼
 API / Workflows / Dashboard
```

Les Providers isolent toutes les spécificités des services tiers afin que le Dashboard et les datasets ne dépendent jamais directement d'une source externe.

---

# Responsabilités

Chaque Provider est responsable de :

- récupérer les données de la source distante ;
- gérer les erreurs de communication ;
- transformer les données dans un format interne ;
- valider la cohérence des informations ;
- exposer un contrat stable au reste du projet.

Les Providers ne contiennent pas de logique d'interface utilisateur.

---

# Relations

## En amont

- Sources externes
- Services tiers
- Fichiers distants

## En aval

- Datasets
- Workflows
- Routes API
- Dashboard Admin

---

# Cycle de vie

```text
Récupération
      │
      ▼
Validation
      │
      ▼
Transformation
      │
      ▼
Normalisation
      │
      ▼
Publication vers les datasets
```

---

# Principes d'architecture

- Un Provider représente une source de données.
- Les Providers sont indépendants les uns des autres.
- Les composants React ne consomment jamais directement une source externe.
- Les traitements métier utilisent les données normalisées produites par les Providers.
- Toute nouvelle source doit être intégrée via un nouveau Provider conforme au contrat commun.

---

# Bonnes pratiques

- Limiter les responsabilités d'un Provider à sa source.
- Éviter les dépendances entre Providers.
- Centraliser les transformations.
- Documenter tout nouveau Provider.
- Tester indépendamment chaque Provider.

---

# Documents liés

- DOC-015 — Provider Overview
- ADR-001 — Provider Architecture
- ADR-010 — Provider Interface
- PROVIDER-001 à PROVIDER-009

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document d'architecture de la couche Provider.
