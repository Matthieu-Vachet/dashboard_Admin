---
id: DOC-008
titre: Changelog
version: 1.1.0
statut: Actif
derniere_mise_a_jour: 2026-07-13
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 08
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing-Page-PogoApi
references:
  - DOC-001
  - DOC-007
  - DOC-009
---

# Changelog

> Ce document définit la manière dont les changements sont documentés dans l'ensemble de la plateforme.

## Objectifs

Le changelog permet de :

- suivre précisément les évolutions ;
- connaître l'historique des versions ;
- comprendre les impacts d'une mise à jour ;
- faciliter les audits et les retours arrière.

---

# Principes

Chaque publication doit posséder un changelog.

Un changement ne doit jamais être publié sans être documenté.

Le changelog est indépendant du code : il explique **ce qui change**, pas **comment** cela a été implémenté.

État observé par l'audit :

| Projet | Version package | Dernière version du changelog | Écart |
|--------|-----------------|-------------------------------|------|
| Dashboard Admin | `1.21.1` | `1.21.1` | aligné post-audit |
| PokemonGo-API- | `1.7.0` | `1.6.1` | une version de retard |
| PokemonGo-Data | `1.8.0` | `1.7.0` | une version de retard |
| Landing-Page-PogoApi | `1.0.0` | Non trouvé | changelog absent |
| PokemonGo-Assets-API | Non trouvé | Non trouvé | historique absent |

Le Dashboard maintient en plus un historique UI allant jusqu'à `V1.21.1`. La livraison corrective Admin Pokémon réconcilie `package.json`, l'UI et `CHANGELOG.md`; aucun mécanisme automatique ne garantit encore leur synchronisation future.

---

# Structure d'une entrée

Chaque version suit le modèle suivant :

```md
## Version X.Y.Z — AAAA-MM-JJ

### ✨ Nouveautés

### 🚀 Améliorations

### 🐛 Corrections

### ♻️ Refactorisations

### ⚠️ Ruptures de compatibilité

### 📚 Documentation

### 🧪 Tests

### 🔒 Sécurité

### 📦 Datasets

### 🔌 Providers

### 🌐 API

### 🗄️ MongoDB
```

---

# Exemple

## Version 1.3.0 — 2026-08-01

### ✨ Nouveautés

- Ajout du module PvP Rankings.

### 🚀 Améliorations

- Optimisation du Dashboard Admin.

### 🐛 Corrections

- Correction d'un problème de synchronisation des raids.

### 📚 Documentation

- Mise à jour de `DOC-006`.
- Création de `DATASET-013`.

---

# Quand mettre à jour le changelog ?

Le changelog doit être mis à jour lors de :

- toute nouvelle fonctionnalité ;
- toute correction de bug ;
- toute évolution d'API ;
- toute modification d'un dataset ;
- toute évolution d'un Provider ;
- toute rupture de compatibilité ;
- toute modification importante de la documentation.

---

# Bonnes pratiques

- Décrire les changements de façon concise.
- Regrouper les modifications par catégorie.
- Utiliser le passé (« Ajout », « Correction », « Suppression »).
- Éviter les détails d'implémentation.
- Mentionner les documents, datasets ou ADR impactés lorsque pertinent.

---

# Liens avec le versionnage

Le changelog complète le document `DOC-007`.

À chaque nouvelle version :

1. incrémenter le numéro de version ;
2. mettre à jour le changelog ;
3. mettre à jour la documentation concernée.

L'audit confirme que ces opérations sont actuellement manuelles et qu'aucun tag Git local, générateur de release notes ou workflow de release formel n'est présent.

---

# Conformité

Ce document applique notamment :

- RULE-035 — Semantic Versioning.
- RULE-036 — Distinction des types de version.
- RULE-038 — Mise à jour documentaire.
- RULE-040 — Format documentaire commun.

---

# Documents associés

- DOC-001 — Règles générales
- DOC-007 — Versionnage
- DOC-009 — Roadmap

---

# Historique

## Version 1.1.0 — 2026-07-13

- Ajout de l'état réel des changelogs et de leurs écarts avec les packages.
- Documentation du double historique Dashboard et de l'absence d'automatisation/tags.
- Mise à jour des noms exacts des repositories.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Définition du format officiel des changelogs.
