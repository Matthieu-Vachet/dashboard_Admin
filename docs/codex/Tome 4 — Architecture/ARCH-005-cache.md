---
id: ARCH-005
title: Cache
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - DOC-018-cache-overview.md
  - DOC-032-local-cache.md
  - ARCH-002-pipeline.md
  - ARCH-004-sync-system.md
source_of_truth:
  - Cache
  - Datasets
  - Providers
---

# ARCH-005 — Cache

## Objectif

Décrire le rôle de la couche de cache dans l'architecture du projet Pokémon GO et son interaction avec les Providers, les datasets et le Dashboard.

---

# Vue d'ensemble

Le cache a pour objectif de réduire les traitements inutiles, limiter les accès répétés aux sources externes et améliorer les performances générales.

```text
Sources externes
        │
        ▼
    Providers
        │
        ▼
      Cache
        │
        ▼
 Validation / Transformation
        │
        ▼
     Datasets
        │
        ▼
API / Dashboard / Workflows
```

Le cache n'est jamais considéré comme une source de vérité.

---

# Principes

- Le cache est une couche d'optimisation.
- Les données faisant autorité restent les datasets validés.
- Une donnée mise en cache doit pouvoir être reconstruite à partir de la source de vérité.
- Le cache ne modifie jamais les données métier.

---

# Responsabilités

Le système de cache permet de :

- limiter les requêtes répétitives ;
- accélérer les traitements fréquents ;
- réduire la charge sur les Providers ;
- améliorer les temps de réponse.

---

# Architecture retenue

Le cache intervient uniquement comme couche intermédiaire.

```text
Provider
    │
    ▼
Cache
    │
    ▼
Transformation
    │
    ▼
Dataset
```

Les consommateurs ne dépendent jamais directement du cache.

---

# Invalidation

Une entrée de cache doit être invalidée lorsque :

- la source de données évolue ;
- une synchronisation publie une nouvelle version ;
- une incohérence est détectée ;
- une reconstruction complète est demandée.

Les mécanismes précis d'expiration et de durée de vie sont documentés séparément.

---

# Bonnes pratiques

- Ne jamais stocker une donnée comme seule copie dans le cache.
- Garder le cache transparent pour les consommateurs.
- Prévoir une reconstruction sans perte.
- Journaliser les erreurs critiques liées au cache.

---

# Limites connues

L'audit documentaire identifie encore plusieurs points à formaliser :

- stratégie globale de TTL ;
- métriques d'efficacité du cache ;
- politique de purge ;
- supervision détaillée.

Ces éléments seront documentés au fur et à mesure de leur implémentation.

---

# Documents liés

- DOC-018 — Cache Overview
- DOC-032 — Local Cache
- ARCH-002 — Pipeline
- ARCH-004 — Sync System

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document d'architecture de la couche Cache.
