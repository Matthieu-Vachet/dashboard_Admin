---
id: ADR-010
title: Provider Interface
status: Accepted
version: 1.0.0
date: 2026-07-14
author: Matthieu Vachet
decision_makers:
  - Matthieu Vachet
category: Architecture Decision Record
scope:
  - Providers
  - API
  - Dashboard Admin
  - Workflows
  - Datasets
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-015-provider-overview.md
  - DOC-012-api-overview.md
  - ADR-001-provider-architecture.md
  - ADR-006-pvp-provider.md
tags:
  - provider
  - interface
  - contract
  - architecture
---

# ADR-010 — Provider Interface

## Statut

**Accepté**

---

# Résumé

Tous les Providers du projet doivent respecter une **interface commune** (*Provider Interface*).

Cette interface constitue le contrat officiel entre les sources externes et le reste de l'écosystème.

---

# Contexte

Le projet utilise plusieurs Providers spécialisés pour récupérer et transformer les données provenant de sources externes.

Sans contrat commun, chaque Provider évoluerait selon ses propres conventions, ce qui compliquerait leur utilisation, leurs tests et leur maintenance.

---

# Problème

Des interfaces hétérogènes entraînent :

- une logique différente selon les Providers ;
- une maintenance plus difficile ;
- une réutilisation limitée ;
- une augmentation du risque de régression lors de l'ajout de nouvelles sources.

---

# Décision

Tous les Providers doivent implémenter une interface cohérente définissant notamment :

- leur responsabilité ;
- leur point d'entrée ;
- leur format de sortie ;
- leur stratégie de validation ;
- leur gestion des erreurs.

Les détails d'implémentation restent propres à chaque Provider, mais le contrat exposé au reste du projet doit rester homogène.

---

# Architecture retenue

```text
Source externe
      │
      ▼
Provider
      │
      ├── Validation
      ├── Transformation
      ├── Gestion des erreurs
      └── Contrat commun
              │
              ▼
Datasets / Workflows / API / Dashboard
```

---

# Alternatives étudiées

## Interface propre à chaque Provider

**Rejetée**

Elle entraîne des comportements incohérents et une complexité inutile.

## Interface commune

**Retenue**

Elle simplifie l'intégration, les tests, la maintenance et l'évolution des Providers.

---

# Conséquences

## Avantages

- comportement homogène ;
- meilleure lisibilité du code ;
- maintenance facilitée ;
- intégration simplifiée des nouveaux Providers ;
- réduction des risques de régression.

## Contraintes

- tout nouveau Provider doit respecter le contrat commun ;
- les exceptions doivent être documentées ;
- les évolutions du contrat doivent être compatibles avec les Providers existants.

---

# Principes dérivés

- Les Providers exposent une interface stable.
- Les implémentations internes peuvent varier sans modifier le contrat.
- Les consommateurs utilisent uniquement l'interface publique.
- Les traitements spécifiques restent confinés au Provider.

---

# Impact

Cette décision influence :

- tous les Providers ;
- les Workflows ;
- les Datasets ;
- l'API ;
- le Dashboard Admin ;
- les tests d'intégration.

---

# Risques

En cas de non-respect :

- fragmentation des Providers ;
- comportements incohérents ;
- augmentation de la dette technique ;
- difficulté à intégrer de nouvelles sources.

---

# Références

- DOC-015 — Provider Overview
- DOC-012 — API Overview
- ADR-001 — Provider Architecture
- ADR-006 — PvP Provider

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR définissant le contrat commun que doivent respecter tous les Providers du projet.
