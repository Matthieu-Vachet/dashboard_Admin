---
id: ADR-001
title: Provider Architecture
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
  - Providers
  - Datasets
  - Workflows
review_date: TBD
supersedes: null
superseded_by: null
related:
  - DOC-015-provider-overview.md
  - DOC-011-dashboard-overview.md
  - DOC-013-data-overview.md
  - DOC-017-mongodb-overview.md
  - ADR-010-provider-interface.md
tags:
  - architecture
  - provider
  - datasource
  - abstraction
---

# ADR-001 — Provider Architecture

## Statut

**Accepté**

---

# Résumé

Toutes les sources externes doivent être intégrées au projet via une **couche Provider**.

Aucun composant React, aucune page, aucun dataset et aucun workflow ne doit communiquer directement avec une source externe.

Cette décision est définitive et constitue un principe fondateur de l'architecture.

---

# Contexte

L'écosystème Pokémon GO repose sur de nombreuses sources de données indépendantes.

Ces sources :

- utilisent des formats différents ;
- évoluent sans prévenir ;
- peuvent devenir indisponibles ;
- peuvent modifier leur structure.

Un couplage direct entre ces sources et le Dashboard rendrait le projet fragile et difficile à maintenir.

Une couche d'abstraction unique est donc nécessaire.

---

# Problème

Sans Provider :

- chaque page implémente sa propre logique ;
- la transformation des données est dupliquée ;
- les tests deviennent difficiles ;
- remplacer une source implique des modifications dans plusieurs parties du projet.

Cette architecture ne respecte pas le principe de responsabilité unique.

---

# Décision

Chaque source externe est encapsulée dans un **Provider**.

Le Provider est l'unique responsable de :

1. récupérer les données ;
2. normaliser leur structure ;
3. valider les informations ;
4. gérer les erreurs de récupération ;
5. exposer un contrat stable au reste du projet.

Le Dashboard ne connaît jamais le fonctionnement interne d'une source.

---

# Architecture retenue

```text
Source externe
        │
        ▼
   Provider
        │
        ▼
Transformation
        │
        ▼
Validation
        │
        ▼
Dataset / Workflow
        │
        ▼
Dashboard
```

---

# Alternatives étudiées

## Intégration directe dans le Dashboard

**Rejetée**

Couplage fort, duplication de logique et faible maintenabilité.

## Intégration directe dans les datasets

**Rejetée**

Les datasets ne doivent pas être responsables de la récupération des données.

## Architecture Provider

**Retenue**

Elle sépare clairement les responsabilités et permet de faire évoluer une source indépendamment du reste du système.

---

# Conséquences

## Positives

- séparation claire des responsabilités ;
- meilleure maintenabilité ;
- meilleure testabilité ;
- remplacement d'une source sans modifier l'interface utilisateur ;
- logique de transformation centralisée ;
- réutilisation des Providers dans plusieurs workflows.

## Contraintes

- chaque nouveau Provider doit respecter le contrat commun ;
- aucune logique métier de récupération ne doit être implémentée dans les composants UI ;
- les transformations restent confinées au Provider.

---

# Principes dérivés

- Les Providers sont la seule porte d'entrée vers les sources externes.
- Les composants React consomment des données déjà préparées.
- Les workflows orchestrent les Providers mais ne remplacent pas leur rôle.
- Les datasets représentent des données normalisées, jamais des données brutes.

---

# Impact

Cette décision influence directement :

- l'architecture du Dashboard ;
- les routes API ;
- les datasets ;
- les workflows ;
- la stratégie de tests ;
- la documentation des Providers.

---

# Risques

Si cette décision n'est plus respectée :

- duplication de logique ;
- dette technique ;
- comportements incohérents ;
- difficulté de migration d'une source.

---

# Références

- DOC-015 — Provider Overview
- ADR-010 — Provider Interface
- Documentation des Providers
- Architecture générale du Dashboard

---

# Historique

## 1.0.0 — 2026-07-14

Création de l'ADR fondateur définissant l'architecture Provider comme unique point d'accès aux sources externes.
