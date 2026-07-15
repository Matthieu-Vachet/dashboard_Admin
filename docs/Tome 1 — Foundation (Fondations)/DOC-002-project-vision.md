---
id: DOC-002
titre: Vision du projet
version: 1.1.0
statut: Actif
derniere_mise_a_jour: 2026-07-13
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 02
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing-Page-PogoApi
references:
  - DOC-001
  - DOC-003
  - DOC-006
  - DOC-010
  - DOC-019
---

# Vision du projet

> Construire une plateforme Pokémon GO de référence, durable, documentée et évolutive, reposant sur une architecture moderne où chaque donnée est fiable, traçable et facilement exploitable.

---

# Objectif

La plateforme n'a pas pour ambition de proposer uniquement une API Pokémon GO.

Elle vise à créer un **écosystème complet** permettant de :

- collecter automatiquement des données provenant de plusieurs sources ;
- enrichir ces données grâce à une base locale maîtrisée ;
- les valider avant toute publication ;
- les historiser et les versionner ;
- les diffuser via une API robuste ;
- les superviser grâce à un Dashboard d'administration moderne.

---

# Les piliers du projet

## 1. Une source de vérité unique

Chaque domaine possède une autorité explicite, mais l'audit ne confirme pas une source locale unique pour toute la plateforme.

- les référentiels statiques Pokémon, formes, attaques et types proviennent de `PokemonGo-Data`, puis sont matérialisés dans MongoDB par la synchronisation API ;
- les datasets courants (raids, œufs, Max Battles, Rocket, Research, PvP et Shiny privé) ont MongoDB comme vérité de lecture en production ;
- les assets sont servis depuis `PokemonGo-Assets-API` via GitHub raw ;
- Events, Learning et les données propres au Dashboard utilisent leurs collections ou stockages dédiés.

Les sources externes alimentent les Providers de leur domaine. Le snapshot `.data` reste une copie dérivée de build et non une source canonique.

---

## 2. Une architecture pérenne

Le projet doit pouvoir évoluer pendant plusieurs années sans nécessiter de réécriture complète.

Pour cela, l'architecture repose notamment sur :

- une séparation claire des responsabilités ;
- des Providers indépendants ;
- des datasets versionnés ;
- un pipeline de validation ;
- une documentation complète.

---

## 3. Un Dashboard comme centre de contrôle

Le Dashboard Admin est le cœur de la plateforme.

Il permet notamment :

- de superviser les datasets ;
- de lancer des régénérations ;
- de contrôler les diagnostics ;
- de publier vers MongoDB ;
- de tester les routes API ;
- de surveiller les sources externes ;
- d'administrer les modules privés.

L'état observé comprend également des outils personnels et d'apprentissage (notes, kanban, calendrier, todo, writer, snippets, pomodoro, projets et progression JavaScript). Le Dashboard expose 20 routes applicatives et 23 sections intégrées dans l'administration Pokémon.

---

## 4. Une documentation vivante

Chaque évolution importante doit être accompagnée d'une mise à jour de la documentation.

Le code et la documentation doivent évoluer ensemble.

---

## 5. Une qualité constante

Chaque nouvelle fonctionnalité doit respecter :

- les règles du projet (`DOC-001`) ;
- le Design System ;
- les conventions de nommage ;
- les exigences de tests ;
- le versionnage SemVer.

---

# Vision à long terme

À terme, la plateforme doit pouvoir :

- accueillir de nouveaux Providers sans modifier l'architecture existante ;
- ajouter de nouveaux datasets facilement ;
- servir d'API publique fiable ;
- offrir des outils d'administration complets ;
- rester compréhensible plusieurs années après sa création grâce à sa documentation.

---

# Ce que le projet n'est pas

Le projet ne cherche pas à :

- recopier des sites existants ;
- accumuler des fonctionnalités sans cohérence ;
- privilégier la rapidité au détriment de la qualité ;
- masquer les erreurs ou les incohérences.

Chaque évolution doit apporter une réelle valeur.

---

# Principes directeurs

- Qualité avant quantité.
- Documentation avant oubli.
- Réutilisation avant duplication.
- Validation avant publication.
- Architecture avant implémentation.
- Simplicité avant complexité.

---

# Indicateurs de réussite

La vision sera considérée comme atteinte si la plateforme :

- est facilement maintenable ;
- possède une documentation exhaustive ;
- permet d'ajouter rapidement de nouveaux modules ;
- garantit des données fiables ;
- offre une expérience cohérente aux utilisateurs et aux développeurs.

L'audit code-only établit la base mesurable suivante : cinq repositories actifs, 48 pages/sections, 156 routes, 29 collections MongoDB déclarées, 18 Providers, 19 datasets et 17 familles d'assets. Il identifie aussi des écarts de tests, d'atomicité, de documentation opérationnelle et de cohérence Design System qui empêchent de considérer tous ces indicateurs comme entièrement atteints.

---

# Documents associés

- DOC-001 — Règles générales du projet
- DOC-003 — Objectifs du projet
- DOC-006 — Vue d'ensemble de l'architecture
- DOC-010 — Vue d'ensemble du Design System
- DOC-019 — Référence API

---

# Historique

## Version 1.1.0 — 2026-07-13

- Réconciliation avec le méga-audit code-only.
- Remplacement de la source de vérité locale unique par les autorités réellement observées par domaine.
- Ajout du périmètre fonctionnel et des inventaires confirmés.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Définition de la vision globale de la plateforme Pokémon GO.
