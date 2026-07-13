---
id: DOC-003
titre: Objectifs du projet
version: 1.1.0
statut: Actif
derniere_mise_a_jour: 2026-07-13
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 03
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing-Page-PogoApi
references:
  - DOC-001
  - DOC-002
  - DOC-006
  - DOC-010
  - DOC-019
---

# Objectifs du projet

> Ce document définit les objectifs fonctionnels, techniques et organisationnels de la plateforme Pokémon GO.

---

# Objectif principal

Créer une plateforme complète permettant de collecter, enrichir, valider, publier et administrer les données Pokémon GO à travers une architecture moderne, fiable et évolutive.

---

# Objectifs fonctionnels

## GOAL-001 — Centraliser les données

Réunir dans un même écosystème l'ensemble des données utiles à Pokémon GO :

- Pokémon
- Formes
- Assets
- Candies
- Backgrounds
- Collections
- Raids
- Œufs
- Max Battles
- Team GO Rocket
- Research
- PvP Rankings
- Shiny Tracker (privé)
- Événements

### Critères de réussite

- Une structure homogène.
- Une documentation par dataset.
- Une source de vérité clairement identifiée.

### État observé

L'audit recense 19 datasets normalisés. Leur autorité n'est pas uniforme : référentiels statiques dans `PokemonGo-Data`, datasets courants dans MongoDB, assets dans `PokemonGo-Assets-API`, et domaines Dashboard dans leurs stockages dédiés.

---

## GOAL-002 — Automatiser les mises à jour

Réduire au maximum les interventions manuelles grâce aux Providers et aux pipelines.

### Critères

- Régénération contrôlée.
- Validation automatique.
- Diagnostics détaillés.
- Publication atomique.

### État observé

Les pipelines courants effectuent validation, hash/diff, upsert, invalidation du cache et read-back. En revanche, aucune transaction globale ni rollback automatique n'est confirmé ; la synchronisation statique multi-collections peut laisser des écritures partielles en cas d'échec.

---

## GOAL-003 — Fournir une API fiable

L'API doit être :

- documentée ;
- versionnée ;
- sécurisée ;
- performante ;
- simple à utiliser.

État observé : 156 routes sont recensées, dont 122 côté `PokemonGo-API-` et 34 côté Dashboard. Les routes publiques/privées sont cartographiées, mais OpenAPI, package et changelog API portent des versions divergentes et les tests ne couvrent pas uniformément l'ensemble des contrats.

---

## GOAL-004 — Offrir un Dashboard professionnel

Le Dashboard Admin doit devenir le centre de pilotage de toute la plateforme.

Fonctions attendues :

- supervision ;
- diagnostics ;
- import/export ;
- publication MongoDB ;
- API Explorer ;
- veille des sources ;
- administration des datasets.

État observé : ces fonctions existent en grande partie dans les 20 routes Dashboard et les 23 sections Pokémon. L'interface comprend aussi des modules personnels et Learning. Plusieurs panneaux restent monolithiques et les mutations de production ne partagent pas toutes un gate de validation commun.

---

# Objectifs techniques

## Architecture

- Architecture orientée Providers.
- Source de vérité unique.
- Séparation des responsabilités.
- Composants réutilisables.
- Pipelines documentés.

## Qualité

- TypeScript strict lorsque possible.
- Validation des données.
- Tests.
- Responsive.
- Accessibilité.

## Performance

- Optimiser les traitements.
- Réduire les duplications.
- Utiliser le cache intelligemment.
- Mesurer les performances avant toute optimisation.

---

# Objectifs de maintenance

La plateforme doit rester :

- lisible ;
- documentée ;
- facilement extensible ;
- simple à faire évoluer.

Toute nouvelle fonctionnalité doit pouvoir être intégrée sans remettre en cause l'architecture existante.

---

# Objectifs de documentation

Chaque évolution importante doit entraîner :

- une mise à jour des documents concernés ;
- une mise à jour du changelog ;
- une mise à jour du versionnage ;
- un ADR lorsque la décision est structurante.

---

# Indicateurs de réussite

La plateforme sera considérée comme mature lorsque :

- les principaux datasets seront automatisés ;
- les Providers seront documentés ;
- l'API sera entièrement documentée ;
- le Dashboard couvrira l'ensemble des besoins d'administration ;
- la documentation sera synchronisée avec le code.

Base auditée au 2026-07-13 : cinq dépôts, 18 Providers, 19 datasets, 156 routes, 29 collections, 48 pages/sections, 136 fichiers de composants sur les trois interfaces et 555 cibles documentaires. Les volumes sont confirmés ; la maturité opérationnelle reste partielle faute de preuves runtime, de couverture de tests homogène, de tags/releases et de procédures complètes de rollback.

---

# Conformité

Ce document applique notamment :

- RULE-001 — Préserver l'existant.
- RULE-003 — Auditer avant de développer.
- RULE-008 — Architecture orientée Providers.
- RULE-012 — Source de vérité unique.
- RULE-037 — Documentation obligatoire.

---

# Documents associés

- DOC-001 — Règles générales du projet
- DOC-002 — Vision du projet
- DOC-006 — Architecture générale
- DOC-010 — Vue d'ensemble du Design System
- DOC-019 — Référence API

---

# Historique

## Version 1.1.0 — 2026-07-13

- Ajout de l'état réel mesuré pour les objectifs données, automatisation, API et Dashboard.
- Retrait de l'hypothèse d'une publication atomique généralisée.
- Ajout des inventaires et limites de maturité issus de l'audit.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Définition des objectifs fonctionnels, techniques et organisationnels.
