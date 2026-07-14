---
id: ADR-009
title: Single Source of Truth
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Dashboard Admin
  - API
  - Datasets
  - Assets
  - MongoDB
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-013-data-overview.md
  - DOC-014-assets-overview.md
  - DOC-016-dataset-overview.md
  - ADR-001-provider-architecture.md
tags:
  - source-of-truth
  - data
  - architecture
  - consistency
---

# ADR-009 — Single Source of Truth

## Statut

**Accepté**

---

# Résumé

Chaque donnée métier possède une **source de vérité unique** (*Single Source of Truth*).

Le projet interdit la duplication de données faisant autorité ainsi que les synchronisations concurrentes entre plusieurs sources.

---

# Contexte

Le Dashboard Admin, l'API, les datasets, les Assets et les workflows manipulent les mêmes informations Pokémon.

Sans une source de référence clairement définie, des divergences apparaissent rapidement entre les différents modules de l'écosystème.

---

# Problème

Sans source de vérité unique :

- plusieurs versions d'une même donnée peuvent coexister ;
- les synchronisations deviennent imprévisibles ;
- les corrections doivent être appliquées à plusieurs endroits ;
- les incohérences augmentent avec le temps.

---

# Décision

Chaque information métier possède une seule source faisant autorité.

Les autres couches du projet :

- lisent cette source ;
- la transforment si nécessaire ;
- mais ne deviennent jamais une nouvelle source de vérité.

Les synchronisations doivent toujours partir de cette référence unique.

---

# Architecture retenue

```text
Source of Truth
       │
       ▼
 Providers
       │
       ▼
 Datasets
       │
       ▼
 API / Dashboard / Workflows
```

---

# Alternatives étudiées

## Multiples sources de vérité

**Rejetée**

Cette approche conduit à des incohérences et à une maintenance complexe.

## Source de vérité unique

**Retenue**

Elle garantit la cohérence des données dans l'ensemble du projet.

---

# Conséquences

## Avantages

- cohérence des données ;
- maintenance simplifiée ;
- synchronisations fiables ;
- réduction des conflits de données ;
- meilleure traçabilité.

## Contraintes

- toute modification doit être appliquée sur la source de vérité ;
- les données dérivées doivent pouvoir être régénérées ;
- aucune couche ne doit devenir une source concurrente.

---

# Principes dérivés

- Une donnée métier possède une seule référence officielle.
- Les données dérivées peuvent être recalculées.
- Les workflows ne remplacent jamais la source de vérité.
- Les composants UI consomment des données déjà validées.

---

# Impact

Cette décision influence :

- les Providers ;
- les datasets ;
- les Assets ;
- l'API ;
- MongoDB ;
- le Dashboard Admin.

---

# Risques

En cas de non-respect :

- incohérences de données ;
- conflits de synchronisation ;
- dette technique ;
- comportements imprévisibles.

---

# Références

- DOC-013 — Data Overview
- DOC-014 — Assets Overview
- DOC-016 — Dataset Overview
- ADR-001 — Provider Architecture

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR officialisant le principe de « Single Source of Truth » pour l'ensemble de l'écosystème.
