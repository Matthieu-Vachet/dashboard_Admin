---
id: DOC-004
titre: Philosophie du projet
version: 1.1.1
statut: Actif
derniere_mise_a_jour: 2026-07-14
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 04
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
  - DOC-006
---

# Philosophie du projet

> La philosophie de la plateforme définit **la manière de concevoir chaque fonctionnalité**, bien avant d'écrire la moindre ligne de code. Elle sert de fil conducteur à toutes les décisions techniques.

---

# Pourquoi ce projet existe

L'objectif n'est pas simplement de créer une API Pokémon GO ou un Dashboard.

Le projet vise à construire une **plateforme complète**, capable de durer plusieurs années, où chaque évolution reste cohérente avec l'architecture initiale.

Chaque décision doit privilégier la qualité, la maintenabilité et la compréhension du projet.

---

# Les valeurs fondamentales

## 1. La qualité avant la quantité

Une fonctionnalité incomplète ou mal intégrée n'apporte pas de valeur.

Nous préférons :
- une fonctionnalité robuste ;
- correctement documentée ;
- testée ;
- réutilisable.

Plutôt que plusieurs fonctionnalités ajoutées rapidement.

---

## 2. La documentation fait partie du développement

Le code n'est jamais considéré comme terminé tant que :

- la documentation est absente ;
- le versionnage n'est pas mis à jour ;
- les références croisées ne sont pas complètes.

Chaque évolution doit laisser une trace.

---

## 3. Une architecture avant tout

Chaque nouveauté doit s'intégrer dans l'architecture existante.

Avant de développer, il faut toujours se demander :

- Existe-t-il déjà un composant ?
- Existe-t-il déjà un Provider ?
- Existe-t-il déjà un pipeline ?
- Existe-t-il déjà un dataset ?
- Existe-t-il déjà une route API adaptée ?

Si la réponse est oui, il faut réutiliser ou étendre l'existant.

---

## 4. Une seule source de vérité

Une donnée doit avoir une autorité clairement définie dans son domaine.

L'audit observe plusieurs autorités complémentaires : `PokemonGo-Data` pour les référentiels statiques, MongoDB pour les datasets courants lus en production, `PokemonGo-Assets-API` pour les médias et les collections propres au Dashboard pour Events/Learning. Les sources externes alimentent ces autorités via leurs Providers. Le snapshot `.data` est dérivé et ne doit pas être présenté comme source canonique.

---

## 5. Les erreurs doivent être visibles

Une erreur ne doit jamais être cachée.

Le système doit produire :

- un diagnostic ;
- un message clair ;
- un historique si nécessaire.

Les faux positifs et les corrections silencieuses sont à éviter.

L'audit confirme des diagnostics, historiques et read-backs dans plusieurs pipelines, mais relève aussi des fallbacks, des échecs de dispatch volontairement non bloquants et une observabilité incomplète. Ce principe reste donc une exigence à appliquer, pas un état uniformément atteint.

---

## 6. Les composants avant les pages

Le Dashboard est construit à partir d'un Design System.

Les pages ne doivent pas inventer leur propre interface.

Chaque nouvel élément visuel doit renforcer le Design System plutôt que le contourner.

État observé : six fichiers UI atomiques partagés fournissent Badge, Button, Card, Field, Input/Textarea et Modal, tandis que de nombreux composants métier reconstruisent localement boutons, filtres, cartes, modales et styles. `Field` reste volontairement minimal : un label, ses props natives et son enfant, sans description, erreur, validation ou génération d’identifiant. Les spécifications Atomic/Composite/Complex/Template décrivent une cible future et non une bibliothèque React/Figma déjà réalisée.

---

## 7. Une évolution progressive

Le projet est pensé pour évoluer.

Chaque nouvelle fonctionnalité doit :

- limiter la dette technique ;
- respecter les conventions ;
- conserver la compatibilité ;
- préparer les évolutions futures.

---

# Ce que nous refusons

Le projet refuse volontairement :

- les duplications de logique ;
- les composants copiés-collés ;
- les pipelines concurrents ;
- les données fictives en production ;
- les routes API non documentées ;
- les décisions non justifiées ;
- les modifications impossibles à retracer.

---

# La philosophie de développement

Chaque tâche suit le même raisonnement :

```text
Comprendre
      ↓
Auditer
      ↓
Concevoir
      ↓
Développer
      ↓
Tester
      ↓
Documenter
      ↓
Versionner
      ↓
Publier
```

Aucune étape ne doit être ignorée.

---

# La philosophie du Dashboard

Le Dashboard n'est pas seulement une interface.

Il doit devenir :

- un centre de supervision ;
- un outil d'administration ;
- un environnement de diagnostic ;
- un laboratoire de validation ;
- un poste de contrôle de toute la plateforme.

Il sert déjà de poste de contrôle Pokémon, mais aussi d'espace privé de productivité et d'apprentissage. L'audit compte 20 pages routées et 23 sections Pokémon intégrées.

---

# La philosophie des données

Chaque dataset doit être :

- fiable ;
- traçable ;
- versionné ;
- validé ;
- documenté ;
- identifiable.

Ces propriétés ne sont pas encore uniformes : `datasetVersion`, `providerVersion` et `sourceVersion` ne forment pas un contrat partagé par les 19 datasets. Les implémentations utilisent selon les domaines `schemaVersion`, timestamps, hash, commit SHA, ETag ou snapshots.

La qualité des données est plus importante que leur quantité.

---

# La philosophie de Codex

Codex est considéré comme un collaborateur technique.

Avant toute implémentation importante, il doit :

1. auditer ;
2. proposer un plan ;
3. réutiliser l'existant ;
4. documenter les impacts ;
5. produire un rapport final.

---

# Citation fondatrice

> « Une fonctionnalité n'est pas terminée lorsqu'elle fonctionne. Elle est terminée lorsqu'elle est comprise, documentée, testée et prête à évoluer. »

---

# Conformité

Ce document applique notamment :

- RULE-001 — Ne jamais casser l'existant.
- RULE-003 — Auditer avant de développer.
- RULE-006 — Réutiliser avant de créer.
- RULE-008 — Architecture orientée Providers.
- RULE-012 — Source de vérité unique.
- RULE-037 — Documentation obligatoire.
- RULE-039 — Identifiants permanents.

---

# Documents associés

- DOC-001 — Règles générales du projet
- DOC-002 — Vision du projet
- DOC-003 — Objectifs du projet
- DOC-006 — Architecture générale

---

# Historique

## Version 1.1.0 — 2026-07-13

- Alignement de la philosophie avec les autorités de données réellement observées.
- Distinction entre principes cibles et couverture actuelle des erreurs, versions et composants.
- Ajout du périmètre réel du Dashboard et du statut des spécifications Design System.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Définition des principes et valeurs fondamentales du projet.
