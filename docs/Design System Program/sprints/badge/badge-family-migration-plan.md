# Plan de migration — Sprint Famille Badge

Date du plan : 13 juillet 2026. Ce plan a été écrit avant toute modification source du sprint.

## Périmètre et métriques initiales

Le recensement déterministe du code JSX courant contient 205 sites visuels : 68 appels à la primitive canonique et 137 implémentations locales. La classification initiale est A 68, B 100, C 13 et D 24. Les lignes sont celles du code avant migration.

Le recensement couvre les appels canoniques, les éléments locaux combinant forme pill et padding horizontal, ainsi que `TypeBadge` et `WeatherBadge` dont le rayon n’est pas `rounded-full`. Les helpers de texte et composants nommés `Status`/`Label` sans identité visuelle de badge ont été inspectés puis exclus comme faux positifs de recherche.

## Candidats migrables

Quatre racines B sont strictement équivalentes au squelette de `Badge` et conservent leur wrapper métier :

| ID | Wrapper | Fichier | Décision |
|---|---|---|---|
| BADGE-USAGE-133 | `EggPill` | `src/components/admin/pokemon/eggs-panel.jsx` | Composer `Badge`. |
| BADGE-USAGE-136 | `MaxPill` | `src/components/admin/pokemon/max-battles-panel.jsx` | Composer `Badge`. |
| BADGE-USAGE-156 | `RaidPill` | `src/components/admin/pokemon/raids-panel.jsx` | Composer `Badge`. |
| BADGE-USAGE-160 | wrapper local `Badge` | `src/components/admin/pokemon/research-panel.jsx` | Composer la primitive sous un alias, sans renommer le wrapper. |

Leur élément racine est déjà un `span` non interactif avec `inline-flex`, `min-h-7`, `items-center`, `rounded-full`, `border`, `px-2.5` et `font-black`. Les classes métier continuent d’être fournies par `className`; aucun ton Pokémon n’entre dans l’API globale.

## Exclusions

- 68 usages A sont déjà consolidés et ne demandent aucun diff.
- 13 usages C sont des boutons, liens, filtres ou sélecteurs natifs ; ils restent interactifs.
- 96 autres usages B conservent leurs assets, palettes, styles dynamiques, structures composites ou densités métier.
- 24 usages D présentent un écart de hauteur, display, bordure ou typographie. Les classes de compensation nécessaires ne sont pas suffisamment justifiées par cette baseline ; ils sont documentés uniquement.
- `TypeBadge`, `WeatherBadge`, `MoveBadge`, `TypeChip`, `EventBadge`, les types, attaques, météo et overlays de cartes restent métier.

## Fichiers et pages

Sources candidates : les quatre fichiers Pokémon ci-dessus. `src/components/ui/badge.tsx` est inspecté et testé mais interdit de modification.

Baseline minimale : `/`, `/kanban`, `/pokemon-admin?section=raids`, `/pokemon-admin?section=eggs`, `/pokemon-admin?section=max-battles`, `/pokemon-admin?section=research`, `/projects` et `/js-progress`, en dark/light aux viewports 375 × 812, 768 × 1024 et 1440 × 1000. `/projects` fournit les statuts et cards avec badges ; les quatre sections Pokémon exposent les wrappers migrés.

## Ordre de migration

1. Écrire le test statique et le script Playwright.
2. Capturer DOM, styles, tab order, overflow et screenshots avant migration.
3. Composer `Badge` dans `EggPill`, `RaidPill`, `MaxPill` puis Research.
4. Rejouer exactement la même matrice.
5. Comparer styles, captures, erreurs et interactions.
6. Finaliser le rapport et le backlog.

## Risques et tests

Risque principal : `tailwind-merge` pourrait résoudre différemment `text-[10px]`/`text-[11px]`, `py-1` ou les classes de palette. Le script compare les propriétés calculées, les classes résolues, les tags racine, le tab order et les captures avant/après. Les tests statiques imposent le `span` canonique, le squelette de la primitive, la conservation des quatre wrappers et l’absence de migration des contrôles.

Validations prévues : test Node, typecheck, lint ciblé des quatre sources et de `badge.tsx`, Playwright dark/light responsive, erreurs console/React, overflow, focusables et reduced motion.

## Rollback

Pour chaque fichier, remplacer uniquement la racine `Badge` du wrapper par son `span` initial et supprimer uniquement l’import devenu inutilisé. Ne modifier aucune donnée, palette, API ou autre composant.

## Condition d’arrêt

Arrêt immédiat si l’équivalence exige une modification de `src/components/ui/badge.tsx`, un token global, une logique métier, une route, une donnée ou une seconde famille ; si la baseline est inexploitable ; ou si une différence visuelle, DOM, focus ou interaction ne peut pas être expliquée et annulée localement.
