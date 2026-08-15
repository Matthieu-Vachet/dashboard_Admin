---
id: DOC-007
titre: Versionnage
version: 2.0.0
statut: Actif
derniere_mise_a_jour: 2026-08-15
auteur: Matthieu Vachet
categorie: Fondation
tome: 1
ordre: 07
projets_concernes:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
  - PokemonGo-Assets-API
  - Landing-Page-PogoApi
references:
  - DOC-001
  - DOC-006
---

# Versionnage

> Ce document définit la stratégie de versionnage appliquée à l'ensemble de la plateforme. Les versions logicielles, données et schémas sont indépendantes et contrôlées en CI.

## Objectifs

- Identifier précisément chaque version.
- Garantir la compatibilité entre les projets.
- Faciliter les retours arrière.
- Rendre les changements compréhensibles.
- Synchroniser le code, les données et la documentation.

---

# Semantic Versioning

La convention cible est :

```text
MAJOR.MINOR.PATCH
```

| Niveau | Signification | Exemple |
|--------|---------------|---------|
| MAJOR | Rupture de compatibilité | 2.0.0 |
| MINOR | Nouvelle fonctionnalité compatible | 1.5.0 |
| PATCH | Correction compatible | 1.5.3 |

État appliqué au 2026-08-13 : Dashboard Admin, `PokemonGo-API-` et `PokemonGo-Data` utilisent SemVer dans leur `package.json`. `PokemonGo-Assets-API`, dépôt statique sans package Node, utilise `version.json`. Chaque dépôt produit possède un garde-fou de release exécutable en CI.

---

# Éléments versionnés

## Application

```text
appVersion
```

Concerne :

- Dashboard Admin
- PokemonGo-API-
- PokemonGo-Data
- PokemonGo-Assets-API
- Landing-Page-PogoApi

| Projet | Package | Autre marqueur observé |
|--------|---------|-------------------------|
| Dashboard Admin | `1.47.0` | badge dérivé du package, historique `V1.47.0` |
| PokemonGo-API- | `1.23.0` | OpenAPI dérivé du package, chemin REST public `/api/v1` |
| PokemonGo-Data | `1.26.0` | `version.json` : Data `2026.08.15.1`, schéma `1.1.0` |
| Landing-Page-PogoApi | `1.0.0` | aucun changelog trouvé |
| PokemonGo-Assets-API | Sans package | `version.json` : `1.0.0`, Assets `2026.08.13.1` |

---

## Datasets

PokemonGo-Data expose un contrat global dans `version.json` :

```json
{
  "appVersion": "1.26.0",
  "dataVersion": "2026.08.15.1",
  "schemaVersion": "1.1.0",
  "generatedAt": "2026-08-15T00:19:25.758Z"
}
```

`dataVersion` change lorsqu’un contenu canonique ou sa génération change. `schemaVersion` ne change que pour une évolution structurelle.

Exemples :

```text
datasetVersion
schemaVersion
generatedAt
sourceVersion
hash
```

Les datasets courants utilisent principalement `generatedAt`, `savedAt`, `sourceHash`, diagnostics et parfois `schemaVersion`. `datasetVersion` n'est pas uniformément présent.

---

## Providers

Les Providers évoluent indépendamment, mais aucun champ `providerVersion` commun n'est observé.

```text
providerVersion
```

Une modification d'un Provider n'entraîne pas automatiquement une nouvelle version majeure de l'application.

Les versions parfois présentes dans des User-Agent ne constituent pas un contrat partagé.

---

## Schémas

Le marqueur cible est :

```text
schemaVersion
```

État observé : Learning utilise `schemaVersion: 1`, Shiny/PvP utilisent `schemaVersion: 2` et plusieurs datasets reprennent une valeur de métadonnées ou `1`. Les JSON statiques ne portent pas tous un marqueur uniforme.

---

# Politique d'incrémentation

## PATCH

Utiliser PATCH pour :

- correction de bugs ;
- amélioration visuelle ;
- optimisation interne ;
- documentation.

## MINOR

Utiliser MINOR pour :

- nouvelle page ;
- nouveau dataset ;
- nouveau Provider ;
- nouveau composant ;
- nouvelle route API ;
- nouvelle fonctionnalité.

## MAJOR

Utiliser MAJOR lorsque :

- une compatibilité est rompue ;
- un schéma est profondément modifié ;
- une API change de comportement de manière incompatible.

---

# Changelog

Toute version publiée doit être accompagnée d'un changelog décrivant :

- les nouveautés ;
- les corrections ;
- les améliorations ;
- les ruptures éventuelles.

---

# Compatibilité

Avant toute publication, vérifier :

- compatibilité des datasets ;
- compatibilité API ;
- compatibilité Dashboard ;
- compatibilité MongoDB ;
- compatibilité documentation.

Ces vérifications sont des exigences. Les workflows de Data, Dashboard et Assets comparent le commit à sa base : un changement produit exige la version et le changelog correspondants, tandis qu’un changement limité aux docs/tests/CI ne déclenche pas de release artificielle. L'API reste `1.21.0` pour cette mission, car aucune route publique ni aucun contrat public n'est modifié.

---

# Workflow de publication

```mermaid
flowchart LR
  A[Modification locale] --> B[Commit / push]
  B --> C[Vercel ou GitHub Actions]
  C --> D[Build / sync]
  V[Versions incrémentées manuellement] -.-> B
  T[Tags et releases automatisées non trouvés] -.-> B
  G[Gate tests commun non trouvé] -.-> C
```

Le workflow idéal Tests → Documentation → Version → Changelog → Publication reste la politique à atteindre. Le processus observé repose sur des incréments manuels, des changelogs partiels et des déclenchements Vercel/GitHub Actions sans tag local ni gate de promotion confirmé.

---

# Bonnes pratiques

- Incrémenter la version avant publication.
- Ne jamais réutiliser un numéro de version.
- Documenter toute rupture de compatibilité.
- Versionner les schémas indépendamment des applications.
- Conserver l'historique des versions.
- Aligner package, UI, OpenAPI et changelog avant publication.
- Créer des tags/releases formels si ce processus est adopté.

---

# Conformité

Ce document applique notamment :

- RULE-002 — Archivage.
- RULE-015 — Publication atomique.
- RULE-035 — Semantic Versioning.
- RULE-036 — Distinction des types de version.
- RULE-038 — Mise à jour documentaire.
- RULE-039 — Identifiants permanents.

---

# Documents associés

- DOC-001 — Règles générales
- DOC-006 — Architecture générale
- DOC-008 — Changelog

---

# Historique

## Version 1.1.0 — 2026-07-13

- Ajout des versions réellement déclarées dans les cinq repositories.
- Distinction entre politique SemVer et processus manuel observé.
- Retrait des contrats globaux supposés pour datasets, Providers et schémas.
- Mise à jour du workflow de publication et des divergences package/UI/OpenAPI/changelog.

## Version 1.0.0 — 2026-07-12

- Création du document.
- Définition de la stratégie de versionnage commune.
