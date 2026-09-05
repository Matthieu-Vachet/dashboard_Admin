# Adventure Effects

Le Dashboard consomme le domaine canonique `PokemonGo-Data/data/adventure-effects/` par l’Engine. Les fiches Pokémon et Moves ne stockent que leurs références inverses ; le coût, la durée, le bonus, les traductions, les assets et la provenance restent centralisés dans la fiche Adventure Effect.

## Présentation

Les Cards, la fiche Pokémon et le Catalogue utilisent `AdventureEffectCard`. Le renderer choisit une présentation structurée selon `effectType`, affiche le français lorsqu’il existe et marque explicitement le fallback anglais. Une Banner ou un Portrait absent produit un fallback visuel, jamais une erreur de données.

## JSON Builder

Le type « Effet d’aventure » consomme le schéma et le template officiels de Data. Le dry-run affiche le JSON exact, protège les collisions, ajoute les références Pokémon/Move par patch minimal, reconstruit le manifeste et n’écrit qu’après validation sur `develop`.

## Veille et synchronisation

Source Watch contrôle les 66 pages GO Hub (11 effets × 6 langues) avec une empreinte sémantique portant sur traductions, coût, durée, bonus, relations et assets. Margxt reste un inventaire secondaire contrôlé par contenu. Un changement crée une alerte persistante et un diff lisible jusqu’à acquittement.

L’action « Synchroniser Adventure Effects » appelle la route Admin de l’API, qui retourne `SUCCESS`, `PARTIAL` ou une erreur structurée accompagnée du rapport de source.
