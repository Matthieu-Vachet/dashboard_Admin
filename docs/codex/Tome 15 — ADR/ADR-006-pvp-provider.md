---
id: ADR-006
title: PvP Provider
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Providers
  - PvP Rankings
  - Datasets
  - Dashboard Admin
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-015-provider-overview.md
  - DOC-016-dataset-overview.md
  - ADR-001-provider-architecture.md
  - ADR-010-provider-interface.md
tags:
  - provider
  - pvp
  - rankings
  - architecture
---

# ADR-006 — PvP Provider

## Statut

**Accepté**

---

# Résumé

Les données PvP sont isolées dans un **Provider dédié**.

Aucun composant, workflow ou dataset ne doit récupérer directement les informations PvP depuis une source externe.

---

# Contexte

Les classements PvP reposent sur une source spécialisée disposant de ses propres formats, conventions et cycles de mise à jour.

Ces données doivent pouvoir évoluer indépendamment du reste de l'écosystème.

---

# Problème

Sans Provider dédié :

- la logique de récupération serait dupliquée ;
- les transformations seraient dispersées ;
- les évolutions de la source impacteraient directement le Dashboard ;
- les tests deviendraient plus complexes.

---

# Décision

Toutes les opérations liées aux classements PvP transitent par un **Provider spécialisé**.

Ce Provider est responsable de :

- récupérer les données ;
- normaliser leur structure ;
- valider leur cohérence ;
- exposer un contrat stable au reste du projet.

Les pages, composants et datasets consomment uniquement les données normalisées produites par ce Provider.

---

# Architecture retenue

```text
Source PvP
    │
    ▼
PvP Provider
    │
    ▼
Transformation
    │
    ▼
Validation
    │
    ▼
Dataset PvP
    │
    ▼
Dashboard
```

---

# Alternatives étudiées

## Accès direct à la source PvP

**Rejetée**

Cette approche crée un couplage fort avec la source externe.

## Provider dédié

**Retenue**

Elle garantit une séparation claire des responsabilités, une meilleure maintenabilité et une évolution indépendante de la source.

---

# Conséquences

## Avantages

- logique centralisée ;
- meilleure testabilité ;
- maintenance simplifiée ;
- contrat stable ;
- intégration homogène avec les autres Providers.

## Contraintes

- toute évolution de la source doit être absorbée par le Provider ;
- les transformations restent confinées au Provider ;
- aucun composant UI ne dépend directement de la source.

---

# Principes dérivés

- Le Provider PvP est l'unique point d'accès aux données PvP.
- Les datasets utilisent uniquement les données normalisées.
- Les composants React restent indépendants de la source externe.

---

# Impact

Cette décision influence :

- les Providers ;
- les datasets PvP ;
- les workflows de synchronisation ;
- les pages PvP ;
- les tests.

---

# Risques

En cas de non-respect :

- duplication de logique ;
- couplage fort avec la source ;
- maintenance plus complexe ;
- incohérences entre les données PvP.

---

# Références

- DOC-015 — Provider Overview
- DOC-016 — Dataset Overview
- ADR-001 — Provider Architecture
- ADR-010 — Provider Interface

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR définissant l'utilisation d'un Provider dédié pour les données PvP.
