---
id: DATASET-020
title: Collection personnelle Pokémon GO
version: 1.0.0
status: Active
last_updated: 2026-07-13
owner: Matthieu Vachet
category: Dataset privé
projects: [Dashboard Admin]
visibility: private-dashboard
references: [PAGE-049, COL-030, COL-031, COL-032, WORKFLOW-016]
---

# DATASET-020 — Collection personnelle Pokémon GO

## Source et contrat

Export JSON personnel contenant métadonnées et `fileData` indexé par identifiants chaîne. Le fichier réel validé le 13 juillet 2026 contient 4 838 entrées.

## Normalisation

Le serveur conserve l'identifiant, résout le nom français par numéro/forme, sépare surnom/forme/costume, calcule IV total/pourcentage, traduit genre/alignement, rapproche les attaques/types/icônes et sélectionne strictement l'image normale ou shiny exacte. Les champs additionnels sont tolérés ; les erreurs bloquantes et diagnostics non bloquants restent distincts.

## Visibilité

Strictement privé Dashboard. Aucune route PokemonGo-API, OpenAPI, API Explorer, navigation publique, export public ou persistance navigateur.
