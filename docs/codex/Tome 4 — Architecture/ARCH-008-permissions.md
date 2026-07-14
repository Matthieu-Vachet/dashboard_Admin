---
id: ARCH-008
title: Permissions
version: 1.0.0
status: Stable
last_updated: 2026-07-14
author: Matthieu Vachet
related:
  - DOC-019-authentication.md
  - DOC-020-security.md
  - ARCH-007-routing.md
  - ADR-004-dashboard-architecture.md
source_of_truth:
  - Dashboard Admin
  - Authentication
  - Authorization
---

# ARCH-008 — Permissions

## Objectif

Décrire les principes d'architecture régissant les permissions et le contrôle d'accès au sein du Dashboard Admin et des services associés.

---

# Vue d'ensemble

Le système de permissions contrôle quelles fonctionnalités peuvent être consultées ou exécutées selon le contexte d'utilisation.

```text
Utilisateur
      │
      ▼
Authentification
      │
      ▼
Contrôle des permissions
      │
      ▼
Dashboard / API / Workflows
```

Les permissions constituent une couche de protection et ne remplacent jamais la validation métier.

---

# Principes

- Toute opération sensible doit être protégée.
- Les contrôles d'accès sont centralisés autant que possible.
- Les permissions sont vérifiées avant l'exécution d'une action.
- Les composants d'interface ne sont pas considérés comme un mécanisme de sécurité.

---

# Responsabilités

Le système de permissions permet de :

- protéger les fonctionnalités d'administration ;
- limiter l'accès aux ressources privées ;
- distinguer les opérations publiques et internes ;
- empêcher l'exécution d'actions non autorisées.

---

# Architecture retenue

```text
Requête
   │
   ▼
Authentification
   │
   ▼
Autorisation
   │
   ▼
Exécution
```

Les règles d'autorisation sont appliquées avant tout traitement métier.

---

# Bonnes pratiques

- Vérifier les permissions côté serveur lorsque nécessaire.
- Éviter de dupliquer les règles de sécurité.
- Journaliser les refus d'accès significatifs.
- Documenter toute nouvelle permission introduite.

---

# Limites connues

Les mécanismes détaillés (RBAC, MFA, révocation de session, etc.) ne sont pas encore entièrement formalisés et sont documentés séparément lorsqu'ils existent.

---

# Documents liés

- DOC-019 — Authentication
- DOC-020 — Security
- ARCH-007 — Routing
- SEC-001 à SEC-006

---

# Historique

## Version 1.0.0 — 2026-07-14

- Création du document décrivant les principes architecturaux des permissions.
