---
id: ADR-008
title: Component First
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Design System
  - Components
  - Dashboard Admin
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-010-design-system-overview.md
  - DOC-024-folder-structure.md
  - DOC-025-coding-guidelines.md
  - ADR-005-design-system.md
tags:
  - component
  - design-system
  - reuse
  - architecture
---

# ADR-008 — Component First

## Statut

**Accepté**

---

# Résumé

Le développement de l'interface suit une approche **Component First**.

Avant de créer un nouveau composant ou d'écrire du code spécifique à une page, le projet privilégie systématiquement la réutilisation des primitives et composants existants.

---

# Contexte

Au fil de l'évolution du Dashboard, plusieurs composants similaires ont été implémentés indépendamment, entraînant des duplications, des variantes inutiles et une dette technique.

Le programme de consolidation du Design System a confirmé que la réutilisation des composants existants est la stratégie la plus durable.

---

# Problème

Sans règle commune :

- des composants similaires apparaissent dans plusieurs modules ;
- les variantes se multiplient ;
- les corrections doivent être reproduites à plusieurs endroits ;
- la maintenance devient plus coûteuse.

---

# Décision

Avant toute création de composant :

1. vérifier si une primitive répond déjà au besoin ;
2. vérifier si un composant existant peut être réutilisé ;
3. créer un nouveau composant uniquement si aucun élément existant n'est adapté.

Les composants métier doivent **composer** les primitives du Design System, sans modifier leur contrat.

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
Pages
```

---

# Alternatives étudiées

## Création libre de composants

**Rejetée**

Elle favorise la duplication et les incohérences.

## Approche Component First

**Retenue**

Elle maximise la réutilisation, réduit la dette technique et facilite les évolutions.

---

# Conséquences

## Avantages

- réduction des duplications ;
- meilleure cohérence visuelle ;
- maintenance simplifiée ;
- intégration naturelle avec le Design System ;
- refactors plus sûrs.

## Contraintes

- auditer l'existant avant toute création ;
- respecter les contrats des primitives ;
- documenter les nouveaux composants lorsqu'ils sont réellement nécessaires.

---

# Principes dérivés

- Les primitives sont prioritaires.
- Les composants métier composent les primitives.
- Les nouvelles abstractions doivent être justifiées.
- Les migrations sont progressives et limitées à des cas sûrs.

---

# Impact

Cette décision influence :

- le Design System ;
- les composants React ;
- les revues de code ;
- les futurs refactors ;
- la documentation technique.

---

# Risques

En cas de non-respect :

- retour des duplications ;
- explosion du nombre de composants ;
- incohérences d'interface ;
- augmentation de la dette technique.

---

# Références

- DOC-010 — Design System Overview
- DOC-024 — Folder Structure
- DOC-025 — Coding Guidelines
- ADR-005 — Design System

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR officialisant l'approche « Component First » pour l'ensemble du Dashboard.
