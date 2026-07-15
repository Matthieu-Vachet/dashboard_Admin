---
id: ADR-002
title: Public / Private Datasets
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
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-016-dataset-overview.md
  - DOC-013-data-overview.md
  - DOC-012-api-overview.md
  - ADR-001-provider-architecture.md
tags:
  - datasets
  - public
  - private
  - architecture
---

# ADR-002 — Public / Private Datasets

## Statut

**Accepté**

---

# Résumé

Les jeux de données du projet sont séparés en deux catégories :

- **Datasets publics**, destinés à être consommés par les applications et utilisateurs.
- **Datasets privés**, réservés au fonctionnement interne du Dashboard Admin.

Cette séparation est une décision d'architecture permanente.

---

# Contexte

Le projet manipule des données ayant des objectifs différents.

Certaines doivent être publiées via l'API afin d'être utilisées par des applications tierces.

D'autres servent uniquement à l'administration, au contrôle qualité, aux synchronisations, aux statistiques ou aux outils internes.

Mélanger ces deux catégories compliquerait la maintenance et augmenterait les risques de fuite d'informations.

---

# Problème

Sans séparation claire :

- des données internes pourraient être exposées publiquement ;
- les datasets publics deviendraient inutilement volumineux ;
- les responsabilités seraient mélangées ;
- la maintenance serait plus complexe.

---

# Décision

Le projet distingue systématiquement :

## Datasets publics

Ils contiennent uniquement les informations destinées à être diffusées.

Ils doivent rester :

- stables ;
- documentés ;
- versionnés ;
- compatibles avec les consommateurs externes.

## Datasets privés

Ils regroupent les informations nécessaires au Dashboard Admin :

- analyses ;
- contrôles ;
- historiques ;
- statistiques ;
- données temporaires ;
- informations techniques.

Ils ne sont pas destinés à être exposés publiquement.

---

# Architecture retenue

```text
Sources
    │
    ▼
Providers
    │
    ▼
Transformation
    │
    ├────────► Dataset Public
    │
    └────────► Dataset Privé
```

---

# Alternatives étudiées

## Dataset unique

**Rejetée**

Cette approche mélange les responsabilités et augmente le risque d'exposition de données internes.

## Séparation Public / Privé

**Retenue**

Elle simplifie la maintenance, améliore la sécurité et clarifie le rôle de chaque dataset.

---

# Conséquences

## Avantages

- meilleure organisation ;
- séparation claire des responsabilités ;
- réduction des risques d'exposition ;
- API publique plus légère ;
- évolutions internes indépendantes.

## Contraintes

- chaque dataset doit être clairement identifié comme public ou privé ;
- toute nouvelle donnée doit être classée avant son intégration ;
- la documentation doit préciser le niveau de visibilité.

---

# Principes dérivés

- Un dataset possède un seul niveau de visibilité.
- Les datasets privés ne sont jamais publiés directement.
- Les datasets publics ne doivent contenir que les informations nécessaires aux consommateurs externes.
- Les traitements internes utilisent les datasets privés lorsque cela est pertinent.

---

# Impact

Cette décision influence :

- les Providers ;
- les Workflows ;
- l'API publique ;
- le Dashboard Admin ;
- la documentation des datasets.

---

# Risques

Si cette séparation n'est plus respectée :

- fuite potentielle d'informations ;
- augmentation de la dette technique ;
- API plus difficile à maintenir ;
- responsabilités moins claires.

---

# Références

- DOC-012 — API Overview
- DOC-013 — Data Overview
- DOC-016 — Dataset Overview
- ADR-001 — Provider Architecture

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR définissant la séparation entre datasets publics et privés.
