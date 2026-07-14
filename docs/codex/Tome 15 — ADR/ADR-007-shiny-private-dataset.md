---
id: ADR-007
title: Shiny Private Dataset
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Shiny Tracker
  - Private Datasets
  - Dashboard Admin
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-016-dataset-overview.md
  - DOC-011-dashboard-overview.md
  - ADR-002-public-private-datasets.md
tags:
  - shiny
  - dataset
  - private
  - dashboard
---

# ADR-007 — Shiny Private Dataset

## Statut

**Accepté**

---

# Résumé

Les données utilisées par le **Shiny Tracker** sont stockées dans un **dataset privé** dédié.

Elles ne sont pas destinées à être exposées par l'API publique.

---

# Contexte

Le Shiny Tracker regroupe des informations servant au suivi, à l'analyse et à l'administration des Pokémon chromatiques.

Ces données répondent à des besoins internes du Dashboard et ne constituent pas un dataset public.

---

# Problème

Sans séparation :

- les données internes pourraient être exposées inutilement ;
- les traitements du Shiny Tracker seraient mélangés aux datasets publics ;
- les évolutions du Dashboard impacteraient l'API publique.

---

# Décision

Toutes les données spécifiques au Shiny Tracker sont regroupées dans un **dataset privé**.

Ce dataset peut contenir des informations nécessaires au fonctionnement interne du Dashboard, mais il ne doit jamais être publié directement.

Les éventuelles données publiques sont produites séparément à partir des traitements internes lorsque cela est nécessaire.

---

# Architecture retenue

```text
Sources
    │
    ▼
Providers
    │
    ▼
Dataset privé Shiny
    │
    ├── Dashboard Admin
    └── Outils internes
```

---

# Alternatives étudiées

## Dataset public unique

**Rejetée**

Cette approche mélange les responsabilités et augmente le risque d'exposition d'informations internes.

## Dataset privé dédié

**Retenue**

Elle garantit une séparation claire entre les besoins internes du Dashboard et les données publiques.

---

# Conséquences

## Avantages

- meilleure isolation des données internes ;
- maintenance simplifiée ;
- évolutions indépendantes de l'API publique ;
- sécurité renforcée.

## Contraintes

- le dataset reste réservé aux usages internes ;
- toute publication doit passer par un traitement dédié.

---

# Principes dérivés

- Le Shiny Tracker utilise un dataset privé.
- Les données internes ne sont jamais exposées directement.
- Les traitements publics et privés restent séparés.

---

# Impact

Cette décision influence :

- le Shiny Tracker ;
- les datasets ;
- les workflows ;
- la documentation ;
- les stratégies d'exposition des données.

---

# Risques

En cas de non-respect :

- exposition involontaire de données internes ;
- confusion entre usages publics et privés ;
- augmentation de la dette technique.

---

# Références

- DOC-016 — Dataset Overview
- DOC-011 — Dashboard Overview
- ADR-002 — Public / Private Datasets

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR définissant le Shiny Tracker comme consommateur d'un dataset privé dédié.
