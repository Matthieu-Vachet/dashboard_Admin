---
id: DOC-009
titre: Roadmap du projet
version: 1.1.0
statut: Brouillon évolutif
derniere_mise_a_jour: 2026-07-13
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 09
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing-Page-PogoApi
references:
  - DOC-001
  - DOC-002
  - DOC-003
  - DOC-007
  - DOC-008
---

# Roadmap du projet

> Ce document définit la feuille de route stratégique de la plateforme. Il ne décrit pas le détail des développements mais **les grandes étapes** de l'évolution du projet.

> **⚠️ Ce document est vivant.** Il devra être mis à jour régulièrement au fil des nouvelles idées, des changements d'architecture et des fonctionnalités validées.

---

# Objectifs de la roadmap

La roadmap permet de :

- définir une direction claire ;
- prioriser les développements ;
- suivre l'avancement global ;
- visualiser les grandes étapes ;
- éviter de développer des fonctionnalités sans vision d'ensemble.

---

# Vision long terme

Créer une plateforme Pokémon GO complète comprenant :

- une API publique de référence ;
- un Dashboard Admin professionnel ;
- des datasets fiables et documentés ;
- une architecture modulaire orientée Providers ;
- une documentation exhaustive ;
- une intégration continue des nouvelles fonctionnalités.

---

# Axes stratégiques

## AXE 1 — Qualité des données

Objectif :

- améliorer les Providers ;
- renforcer les validations ;
- réduire les ambiguïtés ;
- augmenter les diagnostics.

État : 🟡 En cours

Base observée : 18 Providers et 19 datasets. Priorités confirmées : gates avant mutation production, rollback des synchronisations multi-collections, provenance/licences et contrat de version commun.

---

## AXE 2 — Dashboard Admin

Objectif :

Faire du Dashboard le centre de pilotage complet de la plateforme.

Exemples :

- supervision des datasets ;
- administration ;
- diagnostics ;
- API Explorer ;
- outils internes.

État : 🟡 En cours

Base observée : 20 pages routées, 23 sections Pokémon, 123 fichiers de composants Dashboard et 34 routes BFF/API Dashboard. Les monolithes UI, tests directs, accessibilité et convergence vers les primitives partagées restent prioritaires.

---

## AXE 3 — API

Objectif :

Construire une API stable, versionnée et documentée.

État : 🟡 En cours

Base observée : 122 routes dans `PokemonGo-API-`, architecture Express/Vercel/Next.js et 19 collections API. OpenAPI, package et changelog ne sont pas alignés ; aucun gate commun de release n'est confirmé.

---

## AXE 4 — Documentation

Objectif :

Documenter l'intégralité du projet avec une documentation technique homogène.

État : 🟡 En cours

Le méga-audit code-only est terminé : 34 rapports, 12 registres JSON et 555 cibles documentaires. DOC-001 à DOC-010 sont réconciliés avec cet audit ; les documents futurs restent à produire par vagues sans écraser les documents existants.

---

## AXE 5 — Écosystème

Objectif :

Permettre l'ajout rapide de nouveaux Providers, datasets et modules.

État : 🔵 Planifié

L'ajout est techniquement possible, mais les interfaces communes de Providers, versions, visibilité, observabilité et rollback ne sont pas uniformes dans tous les domaines.

---

# Jalons principaux

| Jalon | Description | État |
|--------|-------------|------|
| Foundation | DOC-001 à DOC-010 réconciliés avec l'audit | 🟢 |
| Dashboard actuel | 20 routes et 23 sections Pokémon inventoriées ; dette UI cartographiée | 🟡 |
| Providers communs | 18 Providers inventoriés ; contrat/licences à compléter | 🟡 |
| API actuelle | 156 routes inventoriées ; versions, gates et multi-runtime à fiabiliser | 🟡 |
| Documentation complète | 34 rapports produits et 555 documents futurs mappés | 🟡 |

---

# Priorités actuelles

1. Vérifier et révoquer si nécessaire tout credential Git potentiellement stocké dans un snapshot `.data`, puis empêcher son inclusion.
2. Ajouter un gate commun test/validation/dry-run avant toute mutation production.
3. Définir une stratégie de transaction ou rollback pour les synchronisations multi-collections et pipelines `current`.
4. Unifier les contrats Provider → validation → production, sans affaiblir la confidentialité Shiny.
5. Aligner versions package, UI, OpenAPI et changelogs ; formaliser tags et release.
6. Réduire les monolithes UI, compléter les primitives partagées et ajouter des tests composants/visuels/accessibilité.
7. Produire les 555 documents mappés par vagues, en conservant explicitement les informations runtime non trouvées.

---

# Ce document sera enrichi

Lors des prochaines revues, cette roadmap sera complétée avec :

- les versions cibles ;
- les jalons détaillés ;
- les dépendances ;
- les estimations ;
- les priorités ;
- les fonctionnalités planifiées.

---

# Informations nécessaires

L'audit a remplacé les suppositions sur les modules et fonctionnalités par un inventaire code-only. Restent nécessaires pour arbitrer une version datée et engageante :

- les propriétaires et responsables de chaque axe ;
- des échéances et capacités validées ;
- l'accès aux métriques/logs Vercel et MongoDB ;
- les volumes, SLA, rétention et procédures de backup/rollback réels ;
- des captures exhaustives datées et des tests utilisateurs/accessibilité ;
- les priorités produit à moyen et long terme validées par le propriétaire.

---

# Conformité

Ce document applique notamment :

- RULE-003 — Auditer avant de développer.
- RULE-004 — Travailler par phases.
- RULE-035 — Semantic Versioning.
- RULE-038 — Mise à jour documentaire.

---

# Documents associés

- DOC-001 — Règles générales
- DOC-002 — Vision
- DOC-003 — Objectifs
- DOC-007 — Versionnage
- DOC-008 — Changelog

---

# Historique

## Version 1.1.0 — 2026-07-13

- Remplacement de la roadmap générique par les priorités issues du méga-audit.
- Mise à jour des jalons avec les inventaires réels et les limites code-only.
- Retrait des informations désormais connues de la liste des prérequis.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Mise en place de la structure de roadmap.
- Les jalons détaillés devaient être ajoutés après audit complet du projet.
