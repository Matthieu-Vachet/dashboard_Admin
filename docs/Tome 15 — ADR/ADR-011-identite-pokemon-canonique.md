---
id: ADR-011
title: Identité Pokémon canonique transversale
version: 1.3.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, PokemonGo-Assets-API, Dashboard Admin]
references: [RULE-045, RULE-047, DATASET-021, COMP-325, COMP-326, ADR-013]
---

# ADR-011 — Identité Pokémon canonique transversale

Chaque donnée externe conserve un snapshot brut puis passe par `pokemon-identity-resolver.js`. La clé canonique combine `pokemonId`, `formId`, `costumeId`, `gender`, `shiny`, `shadow`, `dynamax`, `gigantamax`, `mega`, `primal` et `specialState`. La résolution suit : ID exact, Pokédex + forme, Pokédex + costume, mapping Game Master, alias versionné, nom exact normalisé.

Une forme explicite jamais résolue ne retombe pas sur la forme de base. Le résultat porte stratégie, confiance, statut, diagnostics et asset choisi. Les générateurs Raids, Œufs, Max, Rocket, Research, Shiny et PvP publient cette identité sans modifier leurs racines historiques.

Le Dashboard complète cette identité par un unique résolveur visuel pur. Il normalise les identifiants avec ou sans préfixe d'espèce, traite les costumes progressivement migrés entre `form` et `costume`, impose l'égalité de `isFemale` et conserve les assets principaux uniquement lorsque la fiche chargée porte déjà exactement la forme demandée. `preferredPokemonImage`, `PokemonArtwork` et la collection personnelle délèguent tous à ce module.

Les datasets classés conservent en plus l'identité source (`sourceIdentity`) et l'identité canonique résolue. Le Shiny Tracker sélectionne l'asset de la variante Snacknap exacte ; un costume ambigu ou absent reste sans artwork au lieu d'afficher la forme normale. Les badges de forme, costume ou provenance restent dans le contenu textuel et ne sont jamais superposés à l'artwork partagé.

Pour une identité sans variante explicite, le résolveur suit désormais les références d’assets complètes puis autorise HOME et portrait, sans consulter la disponibilité en jeu. Pour toute identité explicite, cette extension reste interdite. Le mapping Game Master privilégie une fiche de forme dédiée sur sa copie héritée dans `assetForms`.

## Migration et rollback

Les anciens champs `id`, `form`, `assets`, `names` et `types` sont conservés. `identity` est additif. Les fichiers sont archivés avant chantier ; les écritures Game Master et Best Attackers sont atomiques. Aucun dataset de progression ou collection personnelle n'est concerné.

## Historique

- 1.3.0 — 2026-07-15 : identité source exacte du Shiny Tracker et suppression des badges superposés aux artworks.
- 1.2.0 — 2026-07-15 : fallback local normal HOME/portrait et priorité aux fiches de forme dédiées.
- 1.1.0 — 2026-07-15 : ajout de la résolution visuelle Dashboard centralisée.
- 1.0.0 — 2026-07-14 : décision initiale d'identité canonique transversale.
