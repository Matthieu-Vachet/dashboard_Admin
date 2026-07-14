---
id: ADR-005
title: Design System
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Dashboard Admin
  - Design System
  - Components
  - UI
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-010-design-system-overview.md
  - DOC-011-dashboard-overview.md
  - ADR-004-dashboard-architecture.md
  - ADR-008-component-first.md
tags:
  - design-system
  - ui
  - components
  - consistency
---

# ADR-005 — Design System

## Statut

**Accepté**

---

# Résumé

Le Dashboard Admin repose sur un **Design System unique**.

Toutes les évolutions de l'interface doivent s'appuyer sur des primitives, des composants réutilisables et des règles communes afin de garantir une interface cohérente, maintenable et évolutive.

---

# Contexte

Au fil de l'évolution du projet, plusieurs composants similaires ont été développés indépendamment, générant des duplications, des variantes inutiles et des incohérences visuelles.

Un programme de consolidation du Design System a été lancé afin de normaliser progressivement l'ensemble de l'interface.

---

# Problème

Sans Design System :

- les composants sont dupliqués ;
- les styles divergent ;
- les variantes deviennent difficiles à maintenir ;
- les évolutions augmentent le risque de régression.

---

# Décision

Le projet adopte un Design System unique.

Les règles suivantes sont désormais obligatoires :

- toute nouvelle interface réutilise les primitives existantes lorsqu'elles répondent au besoin ;
- les composants métier composent les primitives du Design System ;
- les migrations sont réalisées progressivement, par sprints, sans refactor global ;
- toute nouvelle primitive doit être justifiée par un besoin réel identifié lors d'un audit.

---

# Architecture retenue

```text
Design Tokens
      │
      ▼
Primitives UI
      │
      ▼
Composants métier
      │
      ▼
Pages du Dashboard
```

---

# Alternatives étudiées

## Développement libre des composants

**Rejetée**

Elle conduit à une multiplication des implémentations et à une dette technique importante.

## Design System unique

**Retenue**

Elle garantit la cohérence visuelle, la réutilisation des composants et une maintenance plus simple.

---

# Conséquences

## Avantages

- interface homogène ;
- réduction de la duplication ;
- meilleure maintenabilité ;
- évolutions plus sûres ;
- intégration facilitée avec Figma ;
- meilleure qualité des tests.

## Contraintes

- respecter les primitives existantes ;
- éviter la création de variantes inutiles ;
- documenter les nouvelles primitives ;
- privilégier des migrations progressives.

---

# Principes dérivés

- Les primitives constituent la base de tous les composants.
- Les composants métier ne modifient pas le contrat des primitives.
- Les nouveaux composants sont précédés d'un audit lorsqu'un doute existe.
- Les refactors globaux sont proscrits au profit de sprints limités.

---

# Impact

Cette décision influence :

- l'ensemble des composants React ;
- les pages du Dashboard ;
- le programme Design System ;
- les tests visuels ;
- la documentation technique.

---

# Risques

En cas de non-respect :

- retour des duplications ;
- incohérences visuelles ;
- augmentation de la dette technique ;
- difficulté à faire évoluer le Dashboard.

---

# Références

- DOC-010 — Design System Overview
- ADR-004 — Dashboard Architecture
- ADR-008 — Component First
- Programme Design System

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR officialisant l'adoption d'un Design System unique et la stratégie de consolidation progressive.
