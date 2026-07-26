---
id: DATASET-020
title: Collection personnelle Pokémon GO
version: 1.2.0
status: Active
last_updated: 2026-07-26
owner: Matthieu Vachet
category: Dataset privé
projects: [Dashboard Admin]
visibility: private-dashboard
references: [PAGE-049, COL-030, COL-031, COL-032, PROVIDER-022, API-181, API-182, WORKFLOW-016]
---

# DATASET-020 — Collection personnelle Pokémon GO

## Source et contrat

Export JSON personnel contenant métadonnées et `fileData` indexé par identifiants chaîne. Le snapshot actif contrôlé le 26 juillet 2026 contient 4 833 entrées.

## Normalisation

Le serveur conserve l'identifiant, résout le nom français par numéro/forme, sépare surnom/forme/costume, calcule IV total/pourcentage, traduit genre/alignement, rapproche les attaques/types/icônes et sélectionne strictement l'image normale ou shiny exacte. Les champs additionnels sont tolérés ; les erreurs bloquantes et diagnostics non bloquants restent distincts.

La phase canonique appelle l’Identity Manager en lots de 500. Les anomalies sont agrégées par alias/Pokédex/forme/costume/cause avant persistance, de sorte que 4 833 entrées n’imposent aucune inspection manuelle. Une indisponibilité du manager est signalée comme telle et n’autorise aucun fallback arbitraire.

L’inventaire privé des non-résolus est recalculé depuis les entrées du snapshot, pas depuis un échantillon de cartes. Il expose tous les IDs source et distingue en plus genre, shiny et cause exacte afin de ne jamais fusionner deux besoins d’asset différents.

## Visibilité

Strictement privé Dashboard. Aucune route PokemonGo-API, OpenAPI, API Explorer, navigation publique, export public ou persistance navigateur.
