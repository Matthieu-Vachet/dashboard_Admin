---
id: ARCH-002
title: Pipeline
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - ARCH-001-provider-architecture.md
  - ARCH-003-current-dataset-pipeline.md
  - DOC-015-provider-overview.md
  - DOC-016-dataset-overview.md
  - ADR-001-provider-architecture.md
source_of_truth:
  - Providers
  - Datasets
  - Workflows
---

# ARCH-002 — Pipeline

## Objectif

Décrire le pipeline général de circulation des données dans l'écosystème Pokémon GO, depuis les sources externes jusqu'au Dashboard Admin.

---

# Vue d'ensemble

L'architecture suit un pipeline unique où chaque étape possède une responsabilité clairement définie.

```text
Sources externes
        │
        ▼
    Providers
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
Datasets
        │
        ├── API
        ├── Workflows
        └── Dashboard Admin
```

---

# Étapes du pipeline

## 1. Collecte

Les Providers récupèrent les données auprès des différentes sources externes.

## 2. Validation

Les données récupérées sont contrôlées afin de détecter les erreurs, incohérences ou informations incomplètes.

## 3. Transformation

Chaque Provider convertit les données dans un format interne homogène.

## 4. Normalisation

Les données sont préparées pour être consommées par le reste de l'écosystème.

## 5. Publication

Les datasets deviennent la référence utilisée par :

- les routes API ;
- les workflows ;
- le Dashboard Admin.

---

# Principes

- Une étape ne réalise qu'une seule responsabilité.
- Les Providers sont responsables des échanges avec les sources externes.
- Les datasets contiennent des données déjà validées et normalisées.
- Les couches consommatrices ne communiquent jamais directement avec une source externe.

---

# Bonnes pratiques

- Centraliser les transformations dans les Providers.
- Limiter les traitements spécifiques aux workflows concernés.
- Préserver une séparation claire entre récupération, transformation et consommation des données.

---

# Documents liés

- ARCH-001 — Provider Architecture
- ARCH-003 — Current Dataset Pipeline
- DOC-015 — Provider Overview
- DOC-016 — Dataset Overview

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant le pipeline général des données.
