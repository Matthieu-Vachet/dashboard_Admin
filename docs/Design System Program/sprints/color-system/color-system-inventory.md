# Inventaire Color System

Date : 22 juillet 2026. Périmètre : fichiers `css`, `js`, `jsx`, `ts` et `tsx` sous `src`.

## Méthode reproductible

Le script `scripts/test-design-system-color-system.mjs` inventorie les utilities Tailwind couleur avec leurs variantes, les variables CSS et les littéraux `hex`, `rgb/rgba`, `hsl/hsla`, `oklab/oklch` et `color()`. Il écrit les preuves complètes dans :

- `test-results/design-system-color-system/inventory-before.json` ;
- `test-results/design-system-color-system/inventory-after.json`.

L'unité est une occurrence lexicale, pas une couleur visuelle unique. Le total peut donc évoluer quand une classe arbitraire est remplacée par plusieurs références sémantiques ou qu'une occurrence devient explicitement métier. Les gradients et shadows sont détectés, mais leur refonte reste hors périmètre.

## Classification A–F

| Catégorie | Traduction dans la mesure | Décision |
|---|---|---|
| A — token sémantique canonique | `tokenizedGeneric` | conserver |
| B — hardcode équivalent | partie sûre de `hardcodedGeneric` avant migration | migrer vers un token existant |
| C — rôle générique répété sans token | partie démontrée de `hardcodedGeneric` avant migration | créer un rôle central, puis migrer |
| D — couleur métier | `domain` | conserver ou centraliser dans le domaine |
| E — couleur décorative spécialisée | `decorative` | conserver |
| F — legacy ou ambiguë | `ambiguous` et hardcodes non prouvés | documenter, ne pas migrer sans preuve |

## Mesure avant/après

| Mesure | Avant | Après | Écart |
|---|---:|---:|---:|
| Usages couleur totaux | 5 096 | 5 179 | +83 |
| Usages génériques | 3 346 | 3 221 | -125 |
| Génériques tokenisés | 1 552 | 2 931 | +1 379 |
| Génériques hardcodés | 1 794 | 290 | -1 504 |
| Couleurs métier | 1 358 | 1 593 | +235 |
| Décoratifs | 172 | 151 | -21 |
| Ambigus | 220 | 214 | -6 |
| Couverture générique | 46,4 % | 91,0 % | +44,6 points |

La hausse métier vient principalement de `domain-foreground`, qui rend explicite le contraste des composants Pokémon/Events au lieu de compter leur `text-white` comme dette générique. L'augmentation du total provient de la normalisation lexicale et des nouvelles références de tokens ; elle ne traduit pas une augmentation de dette.

## Patterns sûrs retirés

Les 1 504 hardcodes retirés couvrent notamment :

- les textes `slate-300/400/500` devenus `foreground-secondary`, `muted` et `disabled` ;
- les bordures `white/8`, `white/10`, `white/15` devenues `line-subtle`, `line` et `line-medium` ;
- les surfaces répétées `white/[.035/.04/.045/.055/.06]`, `white/10`, `black/15` ;
- les insets `slate-950/30/35/40/45` ;
- les textes blancs génériques devenus `inverse` ou `on-accent` ;
- le chrome générique des graphiques devenu `panel`, `line`, `foreground`, `muted` ou `brand-*`.

Les nouveaux rôles sont consommés dans 88 fichiers source. Les cinq fichiers UI modifiés couvrent six primitives exportées (`Badge`, `Button`, `Card`, `Input`, `Textarea`, `Modal`) ; `Field` était déjà conforme et reste inchangé.

## Les 290 hardcodes génériques restants

| Groupe | Exemples dominants | Justification d'arrêt |
|---|---|---|
| Compatibilité Light globale | 87 occurrences dans `globals.css` | sélecteurs de correction legacy et recettes d'arrière-plan ; les supprimer demande un sprint de suppression/visual consistency, pas un alias aveugle |
| Alphas non équivalents | `border-white/12` (16), `bg-white/[0.07]` (9), `white/[.025/.05/.075/.08]` | niveaux peu répétés ou rôle variable ; aucun token générique unique démontré |
| Overlays/insets spécialisés | `bg-slate-950/55` (8), `/70` (8), `/82` (5), `black/20/25/30` | modales métier, viewers et panneaux spécialisés ; contraste ou superposition locale |
| Texte legacy ou métier mal localisé | `text-slate-600` (8), `text-white` (6), `text-slate-200` (5) | signification contextuelle ou correction Light incertaine ; classé F jusqu'à preuve runtime dédiée |
| Panneaux spécialisés | Game Master, Detail Modal, Shiny, Events, Collections | mélangent chrome, données dynamiques, images et gradients ; migration arrêtée dès que l'équivalence n'était plus certaine |

Ces occurrences ne sont pas déclarées canoniques. Elles constituent un registre d'exceptions à réévaluer lors du sprint de leur famille ou d'un cleanup final.

## Gradients, shadows et opacités

- Les gradients de page, scanlines et glows identitaires restent décoratifs.
- Les couleurs de grille, axes et tooltips génériques des graphiques ont été reliées aux tokens.
- Les shadows d'élévation des primitives existantes ne sont pas refondues : le Sprint Shadow global est explicitement hors périmètre.
- Seuls les alphas répétés avec équivalence dark démontrée ont reçu un rôle. Aucun token n'a été créé pour chaque opacité arbitraire.

## Résultat de classification

Les catégories B et C démontrées ont été épuisées. Le reliquat se compose de D/E assumés et de F documentés. La classification détaillée, fichier, ligne et pattern par pattern reste disponible dans les deux JSON de preuve.
