---
title: Audit préalable Game Master Explorer et corrections UI Admin Pokémon
version: 1.1.0
status: Final
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: [PAGE-049, PAGE-050, PAGE-051, ADR-011, RULE-045]
---

# Audit préalable — Game Master Explorer et corrections UI

## Baseline sauvegardée

L’audit a été établi depuis Dashboard `336babb`, API `835698a` et Data `cf809b8`. Une archive `.tar.gz` indépendante de chaque dépôt a été créée sous `Workflow/archives/2026-07-15-game-master-explorer/` avant la première modification.

## Fichiers et flux existants

- `generateGameMasterPokemonMappings.js` et `generateGameMasterReferences.js` récupéraient déjà PokeMiners et devaient rester les bases communes.
- `pokemon-identity-resolver.js`, `PokemonArtwork`, `pokemon-variant-resolver.ts` et le suivi d’`assetsRef` portaient la résolution canonique à étendre, sans créer un second résolveur.
- PAGE-051 « Résolution variantes » consommait le mapping local existant et devait être conservée.
- Les datasets courants utilisaient déjà routes Admin protégées, modèles MongoDB, hash, historique de source et composants `Panel`, barres de filtres et pagination.
- Admin Pokémon possédait une navigation par groupes, une recherche de section, un état actif et une modale de fiche réutilisables mais trop volumineux sur écrans étroits.

## Composants réutilisés

`Panel`, les classes communes de champs et boutons, le résolveur canonique, `PokemonArtwork`, les assets locaux de types, le proxy Dashboard avec secret serveur, la pagination API, les erreurs structurées et la convention MongoDB `current` ont été conservés.

## Risques identifiés

- Chargement du Game Master complet dans React et fuite du secret Admin.
- Document MongoDB supérieur à la limite BSON ou recherche regex non bornée.
- Snapshot partiel activé après un échec d’indexation.
- Duplication de la logique PAGE-051 et divergence des statuts.
- Confusion entre disponibilité en jeu et disponibilité d’un asset.
- Fallback HOME normal masquant un costume ou une forme explicitement absente.
- Régression visuelle desktop lors des corrections mobiles.

## Stratégie retenue

- Index serveur par template, listes sans `raw`, pagination maximale 100 et détail brut unitaire.
- Cinq collections séparées avec staging, hash idempotent, diff structuré puis activation d’un pointeur courant.
- Option B d’ADR-013 : PAGE-051 et PAGE-052 restent deux écrans, mais utilisent le même générateur et le même résolveur.
- UI mobile dédiée pour cartes et navigation; rendu desktop existant conservé lorsque demandé.
- Résolution normale GO → référence exacte → HOME → portrait → placeholder, indépendante de `availability`; résolution exacte obligatoire dès qu’une variante est demandée.

## Résultat de la passe corrective

- Le même résolveur canonique alimente désormais fiches, collection, datasets et Shiny Tracker, avec fallback HOME limité aux identités normales.
- Research charge le référentiel `items/items.json` embarqué côté serveur et signale clairement une absence de fichier.
- Best Attackers utilise les 19 icônes de type compactes, Events conserve ses sept statistiques sans tuiles surdimensionnées et les badges ne recouvrent plus les artworks.
- Game Master stocke les templates de façon compacte, purge les staging orphelins, borne sa rétention et retourne un diagnostic de quota explicite.

## Migration

La première régénération privée initialise les nouvelles collections sans modifier les JSON Pokémon. Aucun snapshot courant n’est remplacé tant que templates, comparaison locale et diagnostics ne sont pas entièrement persistés. Deux snapshots sont conservés par défaut.

## IDs documentaires

Les séquences libres vérifiées au moment de l’audit ont conduit à PAGE-052, ADR-012/013, RULE-046/047, DATASET-023/024, COMP-329 à 331, COL-035 à 039 et API-165 à 176.
