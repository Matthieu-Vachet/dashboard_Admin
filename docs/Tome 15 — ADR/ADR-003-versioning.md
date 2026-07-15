---
id: ADR-003
title: Versioning Strategy
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
  - Documentation
  - Datasets
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-031-release-process.md
  - DOC-011-dashboard-overview.md
  - DOC-012-api-overview.md
tags:
  - versioning
  - semver
  - releases
  - architecture
---

# ADR-003 — Versioning Strategy

## Statut

**Accepté**

---

# Résumé

L'ensemble du projet adopte une stratégie de versionnement basée sur **Semantic Versioning (SemVer)** afin de garantir une évolution prévisible des fonctionnalités, de la documentation et des données.

---

# Contexte

Le projet évolue en continu avec de nouvelles fonctionnalités, des corrections, des datasets et des améliorations du Dashboard.

Sans stratégie commune, il devient difficile de suivre les changements, d'identifier les régressions et de documenter les évolutions.

---

# Problème

L'absence de versionnement normalisé entraîne :

- un historique difficile à suivre ;
- une documentation incohérente ;
- une communication imprécise sur les évolutions ;
- des risques lors des déploiements.

---

# Décision

Le projet adopte **Semantic Versioning**.

Les versions suivent le format :

```text
MAJOR.MINOR.PATCH
```

- **MAJOR** : changement incompatible ou rupture volontaire.
- **MINOR** : nouvelle fonctionnalité compatible.
- **PATCH** : correction ou amélioration sans impact sur la compatibilité.

Cette convention est utilisée pour le Dashboard, l'API et la documentation lorsqu'elle est applicable.

---

# Alternatives étudiées

## Versionnement libre

**Rejeté**

Il ne permet pas de connaître immédiatement la nature d'une évolution.

## Semantic Versioning

**Retenu**

Il est largement adopté, simple à comprendre et adapté au cycle d'évolution du projet.

---

# Conséquences

## Avantages

- historique clair ;
- meilleure traçabilité ;
- communication simplifiée ;
- documentation cohérente ;
- préparation facilitée des releases.

## Contraintes

- chaque évolution doit être correctement classée ;
- les changements majeurs doivent être explicitement documentés ;
- le changelog doit rester synchronisé avec les versions.

---

# Principes dérivés

- Chaque version correspond à un état identifiable du projet.
- Les changements incompatibles déclenchent une version majeure.
- Les nouvelles fonctionnalités compatibles utilisent une version mineure.
- Les corrections utilisent une version corrective.

---

# Impact

Cette décision influence :

- les releases ;
- le changelog ;
- la documentation ;
- les déploiements ;
- la communication des évolutions.

---

# Risques

En cas de non-respect :

- perte de traçabilité ;
- confusion entre correctifs et nouvelles fonctionnalités ;
- difficulté à identifier les régressions.

---

# Références

- DOC-031 — Release Process
- Semantic Versioning 2.0.0
- DOC-011 — Dashboard Overview

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR définissant la stratégie officielle de versionnement.
