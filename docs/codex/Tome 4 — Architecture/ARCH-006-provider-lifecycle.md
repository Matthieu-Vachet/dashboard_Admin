---
id: ARCH-006
title: Provider Lifecycle
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - ARCH-001-provider-architecture.md
  - ARCH-002-pipeline.md
  - DOC-015-provider-overview.md
  - PROVIDER-007-provider-interface.md
  - ADR-001-provider-architecture.md
  - ADR-010-provider-interface.md
source_of_truth:
  - Providers
  - Workflows
---

# ARCH-006 — Provider Lifecycle

## Objectif

Décrire le cycle de vie d'un Provider depuis son exécution jusqu'à la production de données normalisées destinées au reste de l'écosystème.

---

# Vue d'ensemble

Chaque Provider suit le même cycle de traitement afin de garantir un comportement homogène.

```text
Initialisation
      │
      ▼
Connexion à la source
      │
      ▼
Récupération des données
      │
      ▼
Validation
      │
      ▼
Transformation
      │
      ▼
Normalisation
      │
      ▼
Publication vers les datasets
      │
      ▼
Journalisation
```

---

# Cycle de vie

## 1. Initialisation

Le Provider charge sa configuration et prépare les ressources nécessaires.

## 2. Connexion

Le Provider établit la communication avec la source externe.

## 3. Récupération

Les données brutes sont récupérées depuis la source.

## 4. Validation

Les données sont contrôlées afin de détecter les erreurs ou incohérences.

## 5. Transformation

Les informations sont converties vers le modèle interne du projet.

## 6. Normalisation

Les structures sont harmonisées pour être compatibles avec les datasets.

## 7. Publication

Les données validées sont transmises aux datasets ou aux workflows concernés.

## 8. Journalisation

Le résultat de l'exécution est enregistré afin de faciliter le suivi et le diagnostic.

---

# Principes

- Chaque Provider suit le même cycle de vie.
- Les traitements restent isolés dans le Provider.
- Les consommateurs utilisent uniquement les données produites.
- Les erreurs doivent être détectées avant la publication.

---

# Gestion des erreurs

En cas d'échec :

- l'exécution est interrompue si la cohérence des données ne peut être garantie ;
- les diagnostics sont journalisés ;
- aucune donnée incomplète ne doit être publiée volontairement.

---

# Bonnes pratiques

- Garder les responsabilités limitées au Provider.
- Centraliser la transformation et la validation.
- Éviter toute dépendance directe entre Providers.
- Documenter les comportements spécifiques lorsqu'ils existent.

---

# Documents liés

- ARCH-001 — Provider Architecture
- ARCH-002 — Pipeline
- DOC-015 — Provider Overview
- PROVIDER-007 — Provider Interface
- ADR-001 — Provider Architecture
- ADR-010 — Provider Interface

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant le cycle de vie commun des Providers.
