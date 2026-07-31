# Organisation des assets publics

Cartographie appliquée le 30 juillet 2026. Les URLs publiques commencent toutes par `/assets/`.

| Domaine | Dossier | Contenu |
| --- | --- | --- |
| Interface | `public/assets/ui/branding` | Logos et marques du Dashboard |
| Interface | `public/assets/ui/backgrounds/library` | Fonds et textures réutilisables |
| Interface | `public/assets/ui/icons/general` | Icônes génériques |
| Interface | `public/assets/ui/illustrations/banners` | Bannières et illustrations éditoriales |
| Combat | `public/assets/ui/combat` | Attaques et états de boucliers PvP |
| Catégories | `public/assets/ui/categories` | Eggs, Raids, Rocket et Max Battles |
| Pokémon | `public/assets/pokemon/generations/artwork` | Visuels par génération/région |
| Pokémon | `public/assets/pokemon/items/library` | Objets et ressources |
| Pokémon | `public/assets/pokemon/types/icons` | Icônes de types |
| Pokémon | `public/assets/pokemon/mega-energy/icons` | Méga-énergies |
| Pokémon | `public/assets/pokemon/regions/icons` | Icônes de régions |

## Assets de combat et contrat de rendu

| Source | Nom normalisé | Usage |
| --- | --- | --- |
| Registre historique | `TodayView_Icon_AttackMove.webp` | Attaque immédiate de timeline |
| Registre historique | `swords.svg` | Attaque chargée et CMP |
| Registre historique | `shield-alt.svg` | Un bouclier; répété deux fois pour deux shields |
| Registre historique | `up.svg` | Buff, debuff et changement de forme |
| Registre historique | `TodayView_Icon_Battle.webp` | Action générique |
| Bibliothèque non active | `public/assets/ui/combat/*.png` | Assets conservés, mais non utilisés pour remplacer les icônes historiques |

Les consommateurs passent par `src/components/site/ui-assets.js`. Les SVG noirs historiques sont rendus comme masques `currentColor`, ce qui corrige leur contraste en thème sombre sans remplacer l'asset. Zéro shield est représenté par un tiret; un et deux shields répètent `shield-alt.svg`.

## Bonbons de famille

`PokemonGo-Data` stocke directement `assets.candy.image` et `assets.candy.xlImage`. Seul son pipeline connaît les dossiers `candy` et `xl_candy`. Le Dashboard et l'API ne concatènent jamais ces chemins.
