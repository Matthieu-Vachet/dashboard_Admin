---
id: ARCH-012
title: Version Flow
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - ARCH-010-deployment.md
  - DOC-031-release-process.md
  - ADR-003-versioning.md
  - API-005-versioning.md
source_of_truth:
  - Releases
  - Versioning
  - Dashboard Admin
---

# ARCH-012 — Version Flow

## Objectif

Décrire le cycle de vie d'une version, depuis son développement jusqu'à sa mise en production et son exploitation.

---

# Vue d'ensemble

Chaque version suit un flux unique garantissant la traçabilité des évolutions.

```text
Développement
      │
      ▼
Validation
      │
      ▼
Version (SemVer)
      │
      ▼
Build
      │
      ▼
Déploiement
      │
      ▼
Production
      │
      ▼
Suivi et maintenance
```

Le flux de version est commun au Dashboard, à l'API et à la documentation lorsque cela est applicable.

---

# Principes

- Chaque version est identifiée de manière unique.
- Les évolutions suivent Semantic Versioning (SemVer).
- Une version n'est publiée qu'après validation.
- Les changements doivent être documentés et traçables.

---

# Cycle de vie

## 1. Développement

Les nouvelles fonctionnalités, corrections et améliorations sont implémentées.

## 2. Validation

Le code et les données sont vérifiés (typecheck, lint, tests disponibles, validations documentaires).

## 3. Attribution de version

Une version SemVer est attribuée :

- **MAJOR** : changement incompatible ;
- **MINOR** : nouvelle fonctionnalité compatible ;
- **PATCH** : correction compatible.

## 4. Déploiement

La version validée est publiée.

## 5. Exploitation

La version devient la référence en production jusqu'à la publication d'une nouvelle version.

---

# Architecture retenue

```text
Développement
      │
Validation
      │
Version
      │
Déploiement
      │
Production
      │
Maintenance
```

---

# Bonnes pratiques

- Associer chaque déploiement à une version.
- Documenter les changements significatifs.
- Conserver un historique clair des versions.
- Synchroniser version, documentation et release.

---

# Limites connues

Les stratégies avancées (release channels, déploiements progressifs, rollback automatisé) dépendent de l'infrastructure et seront documentées lorsqu'elles seront implémentées.

---

# Documents liés

- DOC-031 — Release Process
- ADR-003 — Versioning
- API-005 — Versioning
- ARCH-010 — Deployment

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant le flux de gestion des versions.
