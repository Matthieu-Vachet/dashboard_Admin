---
id: ARCH-POST-MIGRATION-STABILIZATION-001
title: Stabilisation Dashboard après séparation PvP et Assets
version: 1.0.0
status: Stable
last_updated: 2026-08-09
author: MatWeb Innovation
affected_projects:
  - Dashboard Admin
  - PokemonGo-API-
  - PokemonGo-Data
---

# Stabilisation Dashboard après séparation PvP et Assets

Ce runbook remplace les anciens compteurs comme état courant. Les rapports datés et le
dossier d’audit documentaire restent des preuves historiques, pas des contrats actifs.

## Contrat de données

- Les fiches JSON portent `assetsRef` et `pvpRef` à la racine.
- Le Core `pokemon-assets/core/<catégorie>/` est l’unique autorité des images,
  portraits, bonbons, couleurs et références secondaires.
- Les fiches `pvp/pokemon/<catégorie>/*.pvp.json` sont l’unique autorité PvP.
- Les catégories sont `normal`, `forms`, `mega`, `dynamax` et `gigantamax`.
- Le Dashboard suit les références ; aucun composant ne concatène un ancien chemin ou
  ne reconstruit un bloc `assets`/`pvp` source.

Les contrats `assets.assetsRef`, `data.assets.assetsRef`, les champs embarqués
`pvp.littleCup|greatLeague|ultraLeague|masterLeague` et les répertoires
`pokemon-assets/normal|mega|…` sont historiques et interdits dans les guides actifs.

## Engine final

Le rapport `VALID_WITH_DIAGNOSTICS` couvre 1 611 Pokémon/formes, 1 611 Core, 3 147
familles secondaires et 1 611 fiches PvP. Il contient 0 erreur, 0 warning et 7 959
informations, qui représentent des absences métier légitimes et une information
fournisseur. `MAPPING_MISSING`, `MOVE_MAPPING_MISSING`, `BROKEN_REFERENCE`, `ORPHAN`
et `MIGRATION_INCOMPLETE` valent zéro.

`SKIDDO`/`ROCK_SLIDE` est l’unique `SOURCE_MISMATCH` : le classement PvPoke la cite
mais le Game Master du même commit ne l’autorise pas. Il reste visible dans le rapport
global, avec sévérité `info`, sans rendre la fiche incomplète ni créer une clé à
contrôler.

## Sources, Identity Manager et chemins

`PokemonGo-Data/source-watch/sources.json` est l’autorité du registre. Les IDs
`leekduck-eggs`, `leekduck-research` et `leekduck-rocket` sont des provenances qui
convergent vers l’unique provider Identity Manager `leekduck`. Le run validé a appliqué
1 920 mises à jour, 5 créations, 2 marquages orphelins non destructifs et zéro conflit,
y compris pour la règle exacte Corsola.

Le runtime Data résout un `POKEMON_GO_DATA_DIR` explicite valide, le snapshot de build
`.data/PokemonGo-Data`, puis le dépôt workspace voisin. Une valeur explicite invalide
échoue sans fallback silencieux. En production, le clone est défini par
`POKEMON_GO_DATA_REPO`, `POKEMON_GO_DATA_REF` et `POKEMON_GO_DATA_TOKEN`.

## Matrice de régénération

L’ordre séquentiel obligatoire est : Game Master, Identity Manager, Variants, Raids,
Max Battles, Rocket, PvP, calendrier GBL, Best Attackers, Best Defenders, Costumes,
Œufs, Research, Events, Community Days et Shiny. La preuve machine est
`tests/fixtures/regeneration-pipeline-matrix.json`.

Le run de production a confirmé Rocket (26 trainers, 214 slots), Œufs (76), Research
(59 tâches, 204 récompenses Pokémon, 114 objets), calendrier GBL, Events (39 visibles),
Community Days (80), Shiny (1 207), Best Attackers (1 683) et les snapshots courants.
Best Defenders a reçu un `403` Cloudflare : `SOURCE_PROTECTED` a conservé les 250
entrées MongoDB valides. Aucun pipeline n’a remplacé son état par une liste vide.

PvP a relu 20 436 lignes avec zéro mapping ou entrée non appariée. Le warning
`bayou-1500: volcarona sans Rank 1 calculable` produit honnêtement `partial`. Ce warning
de régénération est distinct de l’information Engine Skiddo.

Le centre global traverse `data`, `run`, `sourceRun`, `current` et `diagnostics` ; les
warnings imbriqués Events ou provider restent donc visibles. L’UI PvP gère `idle`,
`running`, `success`, `partial`, `failed` et `cancelled`.

## API, versionnement et rollback

Le Dashboard `1.43.0` consomme l’API `1.21.0` et Data `1.21.0`. Les versions restent
indépendantes, mais une publication coordonnée note les trois commits. Les projections
API hydratées ne deviennent jamais des sources JSON.

Un rollback est un nouveau commit audité. Il cible des révisions Data/API/Dashboard
compatibles, conserve archives, MongoDB et historiques, puis rejoue Engine, Identity
Manager, schémas, manifestes, API, build et parcours navigateur. La publication suit
Data → API → Dashboard. Aucune réécriture de `main`, suppression d’archive ou
restauration partielle des ressources sans leurs références n’est autorisée.
