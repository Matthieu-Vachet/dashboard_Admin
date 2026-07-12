# Pokémon GO Platform

> Une plateforme complète dédiée à la collecte, au traitement, à la validation, à la publication et à la visualisation des données Pokémon GO.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Statut](https://img.shields.io/badge/statut-En%20développement-orange)
![Licence](https://img.shields.io/badge/licence-Privée-red)

---

# 📖 Présentation

Pokémon GO Platform est un ensemble de projets développés par **Matthieu Vachet** ayant pour objectif de centraliser l'ensemble des données de Pokémon GO dans une architecture moderne, fiable et évolutive.

Le projet repose sur plusieurs applications spécialisées qui travaillent ensemble afin de :

- récupérer automatiquement les informations provenant de différentes sources ;
- enrichir les données avec une base locale complète ;
- générer des jeux de données versionnés ;
- publier les informations dans MongoDB ;
- alimenter une API publique ;
- fournir un Dashboard d'administration complet ;
- superviser les différentes sources de données ;
- faciliter la maintenance du projet sur le long terme.

L'objectif est de créer une plateforme robuste pouvant évoluer pendant plusieurs années tout en conservant une architecture claire et facilement maintenable.

---

# 🎯 Objectifs

Le projet poursuit plusieurs objectifs principaux :

- Centraliser toutes les données Pokémon GO.
- Garantir une source de vérité unique.
- Automatiser les mises à jour.
- Réduire les tâches manuelles.
- Fournir une API publique fiable.
- Offrir un Dashboard d'administration moderne.
- Faciliter l'ajout de nouvelles sources de données.
- Conserver un historique complet des générations de données.
- Maintenir une documentation technique exhaustive.

---

# 🏗️ Les projets

La plateforme est composée de plusieurs dépôts.

## Dashboard Admin

Interface d'administration permettant de :

- gérer les datasets ;
- surveiller les sources ;
- lancer des régénérations ;
- consulter les diagnostics ;
- contrôler MongoDB ;
- tester les routes API ;
- superviser l'ensemble de la plateforme.

---

## PokémonGo-API

API REST publique et privée.

Responsabilités :

- publication des datasets ;
- authentification ;
- documentation OpenAPI ;
- cache ;
- pagination ;
- gestion des permissions.

---

## PokémonGo-Data

Projet chargé de :

- récupérer les données externes ;
- normaliser les informations ;
- enrichir les données locales ;
- générer les JSON ;
- produire les diagnostics ;
- préparer les imports MongoDB.

---

## PokémonGo-Assets-API

Référentiel des ressources graphiques :

- sprites ;
- icônes ;
- types ;
- assets HOME ;
- images diverses.

---

## Landing Page

Site de présentation de l'API publique.

Il permet notamment :

- découvrir les fonctionnalités ;
- consulter la documentation ;
- tester les endpoints ;
- présenter les jeux de données disponibles.

---

# 🧩 Architecture générale

```text
Sources externes
        │
        ▼
    Providers
        │
        ▼
  Normalisation
        │
        ▼
   Validation
        │
        ▼
 Diagnostics
        │
        ▼
 Génération JSON
        │
        ▼
      MongoDB
        │
        ▼
         API
        │
        ▼
 Dashboard Admin
```

Chaque couche possède une responsabilité unique afin de garantir une architecture claire et évolutive.

---

# 📦 Jeux de données

La plateforme manipule plusieurs catégories de datasets.

Exemples :

- Pokémon
- Fiches
- Candies
- Backgrounds
- Collections
- Raids
- Œufs
- Max Battles
- Team GO Rocket
- Études de terrain
- PvP Rankings
- Shiny Tracker *(privé)*
- Calendrier des événements
- Assets

Chaque dataset est documenté individuellement.

---

# 🔒 Visibilité des datasets

Deux niveaux de visibilité existent.

## Public

Les datasets publics peuvent être :

- exposés via l'API ;
- documentés ;
- utilisés par la Landing Page.

## Privé

Les datasets privés sont réservés au Dashboard Admin.

Ils ne doivent jamais être :

- exposés publiquement ;
- documentés dans l'API publique ;
- accessibles sans authentification.

Le premier dataset privé est :

- Shiny Tracker.

---

# 🧱 Principes de développement

Le projet repose sur plusieurs principes fondamentaux.

- Source de vérité unique.
- Réutilisation maximale des composants.
- Architecture orientée Providers.
- Aucun fallback silencieux.
- Documentation systématique.
- Responsive obligatoire.
- Tests obligatoires.
- Versionnage systématique.
- Diagnostics détaillés.
- Séparation claire des responsabilités.

---

# 📚 Documentation

Toute la documentation technique est regroupée dans le dossier :

```text
docs/
```

La documentation est organisée en plusieurs chapitres :

- règles générales ;
- architecture ;
- versionnage ;
- API ;
- Dashboard ;
- MongoDB ;
- Providers ;
- Design System ;
- composants ;
- pages ;
- templates ;
- roadmap.

---

# 🚀 Versionnage

La plateforme utilise le **Semantic Versioning (SemVer)**.

Chaque évolution importante est documentée.

Les éléments versionnés comprennent notamment :

- Dashboard
- API
- Datasets
- Providers
- Schémas JSON

---

# 🧪 Qualité

Chaque modification doit respecter le workflow suivant :

1. Audit.
2. Archivage.
3. Développement.
4. Tests.
5. Documentation.
6. Validation.
7. Publication.

Aucune fonctionnalité n'est considérée comme terminée tant que cette procédure n'est pas respectée.

---

# 📈 Évolutivité

La plateforme est conçue pour permettre l'ajout futur de nouveaux modules sans remettre en cause l'architecture existante.

Par exemple :

- nouveaux providers ;
- nouveaux datasets ;
- nouvelles pages du Dashboard ;
- nouvelles routes API ;
- nouveaux composants UI.

---

# 📅 Roadmap

La roadmap détaillée est disponible dans :

```text
docs/codex/07-roadmap.md
```

---

# 🤝 Contribution

Ce projet est développé et maintenu par **Matthieu Vachet**.

Toute nouvelle fonctionnalité doit respecter les règles définies dans :

```text
docs/codex/00-project-rules.md
```

---

# 📄 Licence

Ce projet est actuellement privé.

Certaines parties pourront être publiées ultérieurement sous une licence adaptée, tandis que d'autres (notamment les outils internes d'administration) resteront exclusivement réservées au projet.

---

# ❤️ Philosophie du projet

L'objectif n'est pas seulement de construire une API Pokémon GO.

L'objectif est de créer une plateforme complète, fiable, documentée et évolutive, capable d'être maintenue pendant de nombreuses années tout en offrant une expérience de développement moderne et cohérente.