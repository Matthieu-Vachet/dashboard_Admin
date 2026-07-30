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

## Assets de combat fournis

| Source | Nom normalisé | Usage |
| --- | --- | --- |
| `Attaque_zygard.png` | `charged-attack.png` | Attaque chargée, CMP et action de combat générique |
| `Attaque_zygard 2.png` | `fast-attack.png` | Attaque immédiate et séparation de combattants |
| `Shield_0.png` | `shield-0.png` | Zéro bouclier / bouclier consommé |
| `Shield_1.png` | `shield-1.png` | Un bouclier disponible |
| `Shield_2.png` | `shield-2.png` | Deux boucliers disponibles |

Les consommateurs applicatifs passent par `src/components/site/ui-assets.js` pour conserver une source d’URL unique. Les fichiers sont affichés avec `object-contain` ; aucune déformation CSS n’est appliquée.
