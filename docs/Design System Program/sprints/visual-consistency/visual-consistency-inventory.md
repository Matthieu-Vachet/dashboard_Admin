# Inventaire Visual Consistency

Date de baseline : 26 juillet 2026. Le scan porte sur tous les fichiers CSS, JS, JSX, TS et TSX sous `src`.

## Méthode

- Spacing : occurrences des utilities `p*`, `m*`, `gap*` et `space-*`, variantes responsive incluses ; les valeurs standard sont ramenées à leur valeur calculée Tailwind en pixels.
- Radius : utilities `rounded*`, déclarations CSS `border-radius` et propriétés inline `borderRadius`.
- Shadow : utilities `shadow*` et `drop-shadow*`, déclarations CSS `box-shadow` et propriétés inline `boxShadow`. Les ombres noires ou inset neutres sont classées comme élévation UI ; les glows colorés et ombres d’artwork restent décoratifs ou métier.
- Surface : instance `Card` ou conteneur hôte avec radius et au moins deux groupes parmi border, background et shadow/backdrop/ring.

## Spacing — avant

| Mesure | Valeur |
|---|---:|
| Déclarations | 3 427 |
| Échelle canonique | 3 420 |
| Valeurs arbitraires | 7 |
| Arbitraire générique | 1 (`gap-[normal]`) |
| Exceptions structurelles/métier | 6 |
| Couverture générique | 99,97 % |

Distribution calculée principale : 4 px (415), 8 px (930), 12 px (1 060), 16 px (563), 20 px (184) et 24 px (35). Les autres valeurs de l’échelle sont minoritaires mais standard. Les six exceptions sont les offsets de sidebar `84/236/286px`, deux safe-area paddings et le halo décoratif `m-[-38%]`.

## Radius — avant

| Mesure | Valeur |
|---|---:|
| Déclarations totales | 913 |
| Utilities | 906 |
| Candidats génériques | 653 |
| `rounded-full` décoratifs/pills | 242 |
| Utilities arbitraires | 11 |
| Déclarations CSS | 4 |
| Propriétés inline | 3 |
| Usages de rôles sémantiques | 0 |
| Couverture par l’échelle Tailwind | 100 % |

Les rayons arbitraires appartiennent aux modales Pokémon/Events, bottom sheets, Pokémon cards et géométries décoratives. Les trois valeurs inline appartiennent à Recharts. Aucun hardcode radius générique compatible n’est identifié.

## Shadows / elevation — avant

| Mesure | Valeur |
|---|---:|
| Déclarations totales | 183 |
| Utilities | 157 |
| CSS `box-shadow` | 19 |
| Inline `boxShadow` | 7 |
| Candidats élévation UI | 93 |
| Élévations canoniques | 44 |
| Utilities UI arbitraires | 40 |
| Décoratif/métier | 90 |
| Usages de rôles sémantiques | 0 |
| Couverture élévation UI | 47,31 % |

La dette sûre se concentre sur les recettes de Card glass, Panel, Modal/dialog, menu flottant et surfaces neutres répétées. Les glows de type, shiny, statuts, artwork, sélection et drag restent hors élévation générique.

## Surfaces — avant

| Mesure | Valeur |
|---|---:|
| Racines surface-like | 383 |
| Card canoniques | 117 dans 33 fichiers |
| Wrappers métier composant Card | 4 |
| Racines locales classées | 266 |
| Exceptions exactes `flat` non-Card | 16 |
| Surface générique compatible restante | 0 |
| Ambigu | 0 |
| Couverture générique | 100 % |

Les 16 exceptions exactes sont des contrôles interactifs, liens, sous-surfaces inset, zones d’édition ou messages déjà classés par le sprint Card. Elles ne deviennent pas Card du seul fait que leur recette couleur est désormais sémantique.

## Couverture consolidée avant

La couverture est calculée par somme des déclarations génériques canoniques sur la somme des candidats génériques des quatre familles. Les exceptions structurelles et métier sont exclues du dénominateur.

**Visual Consistency Coverage avant : 98,83 %.**

## Métriques après migration

| Famille | Avant | Après | Couverture après |
|---|---:|---:|---:|
| Spacing canonique / candidats génériques | 3 420 / 3 421 | 3 421 / 3 421 | 100 % |
| Radius canonique / candidats génériques | 653 / 653 | 656 / 656 | 100 % |
| Élévation UI canonique / candidats | 44 / 93 | 108 / 108 | 100 % |
| Card / surfaces génériques compatibles | 117 / 117 | 117 / 117 | 100 % |
| **Visual Consistency consolidé** | **98,83 %** | **100 %** | **100 %** |

L’ajout des trois utilitaires radius et des cinq utilitaires d’élévation augmente mécaniquement certains totaux lexicaux. Après migration, le scan compte 3 427 déclarations de spacing, 919 déclarations de radius, 198 déclarations shadow/elevation et 383 racines surface-like. Les 11 rayons arbitraires, 90 ombres décoratives/métier et six espacements structurels restent explicitement hors contrat générique.
