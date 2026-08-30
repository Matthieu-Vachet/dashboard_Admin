# Collections v3 — Multi-variante et Sexe

Date : 2026-08-29
Version Dashboard : V1.52.0
Schéma de persistance Collections : 3

## Contrat métier

`variantMode` et `includeGenderVariants` sont deux axes indépendants :

| Multi-variante | Sexe | Résultat |
| --- | --- | --- |
| non | non | identité principale uniquement |
| oui | non | identité principale + formes/régionales autorisées, sans femelle secondaire |
| non | oui | identité principale + différence femelle exacte, sans ajouter une forme |
| oui | oui | formes/régionales autorisées + différences femelles exactes |

Pour Event, chaque costume/événement reste une identité principale. `variantMode` ne déclenche plus aucune différence de sexe ; `includeGenderVariants` ajoute sa femelle seulement si le variant fournisseur expose un asset exact. En mode Chromatique, une femelle sans `shinyImage` est exclue et l’asset mâle n’est jamais réutilisé.

Les différences de sexe viennent en priorité de `data/assets/variants/**` avec `kind: "gender"`. Quand cette entrée GO n’existe pas, l’Engine accepte la première variante HOME frontale explicitement marquée `female-difference` / `genderCode: "fd"`. Une variante `female-only`, une vue arrière ou une image Gigamax ne créent jamais une seconde case.

## Modèle persistant

```json
{
  "schemaVersion": 3,
  "variantMode": "multi",
  "includeGenderVariants": false,
  "shiny": false,
  "hundo": false,
  "items": {},
  "legacyItems": {}
}
```

Le stockage reste `dashboard_store` / `matweb.pokemon.collections`, avec miroir local `pokedex-v4-admin-collections`. L’API de stockage est générique et ne nécessite aucun changement.

À l’hydratation, toute collection v1/v2 est reconstruite avec la sémantique historique pour retrouver ses anciennes clés, puis enregistrée en v3 avec `includeGenderVariants: false`. Les anciennes clés mâles sont aliasées vers la clé principale stable ; les clés femelles sélectionnées restent dans `items` même lorsqu’elles sont momentanément masquées. Réactiver Sexe les fait donc réapparaître en HAVE. Les clés réellement inconnues restent dans `legacyItems` et les snapshots Mongo/localStorage continuent d’unir leurs sélections.

## Compteurs de contrôle

L’Engine publie 64 contrats : huit types × deux modes × Sexe off/on × standard/shiny. Les compteurs sans segment `gender` représentent Sexe désactivé ; les compteurs `*.gender.*` représentent Sexe activé.

| Type | Single | Multi | Single + Sexe | Multi + Sexe |
| --- | ---: | ---: | ---: | ---: |
| Normal | 955 | 1 258 | 1 055 | 1 359 |
| Normal shiny | 876 | 1 151 | 975 | 1 251 |
| Event | 311 | 311 | 429 | 429 |
| Event shiny | 308 | 308 | 425 | 425 |
| Shadow / Purified | 458 | 480 | 526 | 548 |
| Shadow / Purified shiny | 307 | 325 | 348 | 366 |

Méga/Primo (58), Dynamax (127/121 shiny) et Gigamax (17) sont inchangés car aucune différence de sexe secondaire applicable n’est publiée pour ces catégories. Les 64 catalogues doivent rester sans doublon, sans fiche non sortie et sans asset absent.

## Interface et tests

L’option « Sexe » est placée dans Caractéristiques, séparément de Chromatique, Hundo et Mode Pokédex, dans la création comme dans les filtres desktop/mobile. Son texte accessible est : « Inclure les différences visuelles mâle / femelle lorsqu'elles existent. »

`npm run test:collections` couvre la table de vérité, Event, shiny sans fallback, Pokémon sans différence, Rattata, Pikachu HOME, costume mâle/femelle, formes régionales/alternatives, migration v2, HAVE/NEED et fusion Mongo/localStorage. `npm run test:collections:e2e` contrôle le formulaire, les compteurs, sept viewports et les thèmes clair/sombre.
