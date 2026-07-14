---
id: ARCH-003
title: Current Dataset Pipeline
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - ARCH-001-provider-architecture.md
  - ARCH-002-pipeline.md
  - DOC-013-data-overview.md
  - DOC-016-dataset-overview.md
  - ADR-009-single-source-of-truth.md
source_of_truth:
  - Datasets
  - Providers
  - Workflows
---

# ARCH-003 — Current Dataset Pipeline

## Objectif

Décrire le pipeline actuellement utilisé pour produire les datasets consommés par l'écosystème Pokémon GO.

---

# Vue d'ensemble

Le pipeline actuel repose sur une succession d'étapes indépendantes permettant de transformer des données externes en datasets normalisés.

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
Datasets courants
        │
        ├── API publique
        ├── Dashboard Admin
        ├── Workflows
        └── MongoDB
```

Chaque étape produit un résultat exploitable par l'étape suivante sans modifier les responsabilités des autres couches.

---

# Étapes du pipeline

## 1. Acquisition

Les Providers interrogent les différentes sources externes et récupèrent les données brutes.

## 2. Validation

Les données sont contrôlées afin de détecter les erreurs, les valeurs manquantes ou les incohérences.

## 3. Transformation

Chaque Provider convertit les données dans le modèle interne du projet.

## 4. Normalisation

Les données sont harmonisées afin de produire des structures homogènes utilisables par l'ensemble de l'écosystème.

## 5. Génération des datasets

Les datasets courants sont générés à partir des données normalisées.

Ils deviennent la référence utilisée par :

- l'API ;
- le Dashboard Admin ;
- les workflows ;
- les traitements internes.

---

# Principes

- Les datasets sont produits par le pipeline, jamais modifiés directement.
- Les données publiées sont issues d'informations déjà validées.
- Les transformations restent confinées aux Providers.
- Les consommateurs utilisent uniquement les datasets générés.

---

# Relations

## Entrées

- Providers
- Sources externes

## Sorties

- API
- Dashboard Admin
- MongoDB
- Workflows

---

# Bonnes pratiques

- Conserver un pipeline linéaire.
- Éviter les traitements redondants après la génération des datasets.
- Maintenir une séparation claire entre acquisition, transformation et consommation.

---

# Documents liés

- ARCH-001 — Provider Architecture
- ARCH-002 — Pipeline
- DOC-013 — Data Overview
- DOC-016 — Dataset Overview
- ADR-009 — Single Source of Truth

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant le pipeline actuel de génération des datasets.
