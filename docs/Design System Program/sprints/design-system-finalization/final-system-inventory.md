# Inventaire système final

Date : 26 juillet 2026. Périmètre : tout le code applicatif `src/**/*.{css,js,jsx,ts,tsx}`.

## Méthode

Les scripts historiques sont réutilisés comme sources reproductibles. Les inventaires AST/lexicaux parcourent le code courant et ne se limitent pas au diff. Les features ajoutées depuis les consolidations majeures sont comparées séparément à leur commit d’introduction.

La classification finale distingue :

- **Canonical** : candidat compatible consommant la primitive, le composant partagé ou le rôle sémantique ;
- **Compatible hardcode** : candidat générique dont la migration est sûre mais absente ;
- **Specialized** : sémantique, interaction, donnée, palette ou géométrie métier ;
- **Ambiguous** : équivalence non démontrée ou décision UX/architecture requise ;
- **False positive** : occurrence lexicale sans contrat visuel de la famille.

## Primitives et couches partagées

| Couche | Contrats courants |
|---|---|
| Tokens | Color System, spacing Tailwind, radius `control/surface/overlay`, cinq élévations, 15 rôles typographiques, trois durations et trois easings |
| Primitives | Badge, Button, Card, CardHeader, CardTitle, CardDescription, Field, Input, Textarea, Select, Checkbox, Modal |
| États | FetchLoadingState, EmptyState, ErrorState |
| Partagés | ModalPortal, shell responsive, loading-state de compatibilité, grilles et wrappers métier composés |
| Métier | Pokémon, Events, Learning, DnD, visualisations, assets, diagnostics, viewers et panels |

## Mesures courantes

| Famille | Univers observé | Canonical | Spécialisé | Ambigu | Faits structurants |
|---|---:|---:|---:|---:|---|
| Button | 427 sites action-like | 218 | 94 | 115 | 211 usages directs et 7 racines de wrappers composent Button ; un EventButton riche reste spécialisé |
| Badge | 246 sites enregistrés/courants | 113 | 109 | 24 | 4 wrappers métier composent Badge ; types, raids, events et filtres interactifs restent métier |
| Card / surfaces | 384 racines surface-like | 117 | 267 | 0 | 33 fichiers consomment Card ; 4 wrappers métier composent Card |
| Field/Input/Textarea | 130 contrôles | 87 | 5 natifs | 38 natifs | 30 usages Field ; les 3 contrôles Events sûrement compatibles ont été migrés |
| Select | 77 sites select-like | 76 | 1 | 0 | 5 wrappers composent Select ; aucun `<select>` générique externe |
| Checkbox | 15 sites checkbox-like | 10 | 1 | 0 | 4 faux positifs exclus ; aucune checkbox native externe |
| Modal | 38 cas historiques/courants | 23 | 15 | 0 | 14 fichiers importent Modal ; drawers et dialogs métier restent séparés |
| State System | 102 états classés | 87 | 14 | 1 | 18 Loading, 55 Empty/No Results, 14 Error compatibles |
| Color | 5 124 occurrences | 2 880 | 1 706 | 538 | 290 hardcodes résiduels non prouvés sont classés F, pas dette sûre |
| Spacing | 3 429 déclarations | 3 423 | 6 | 0 | six exceptions structurelles finies |
| Radius | 919 déclarations | 656 génériques | 263 | 0 | trois rôles génériques ; formes rondes/décoratives séparées |
| Elevation | 198 déclarations | 108 UI | 90 | 0 | cinq niveaux UI ; glows et data-viz séparés |
| Typography | 1 994 chaînes classées | 620 génériques | — | 1 374 domaine/décoratif/ambigu | Geist Sans/Mono et 15 rôles |
| Motion | 140 chaînes classées | 69 UI | 13 | 58 | 99/99 sites éligibles reduced-motion couverts |
| Responsive | 2 280 racines/seuils | 2 266 racines | 14 seuils métier | 0 | cinq breakpoints Tailwind, aucun branchement viewport JS |

Les métriques de ce document décrivent le relevé final. Les tests durables n’imposent pas les nombres de consommateurs, de routes, de tables ou de Card : ils imposent les invariants de couverture et les registres d’exceptions finis.

## Features postérieures aux sprints

`identity-manager-panel.tsx`, modifié au commit initial `5a9c01b`, était la seule feature applicative postérieure au sprint Responsive. L’audit a trouvé :

- un pattern typographique générique legacy ;
- un radius local sur une surface générique ;
- une façade Field locale reproduisant la primitive ;
- des filtres et un import sans noms accessibles explicites ;
- des Select surchargeant inutilement leur contrat visuel canonique.

Tous ces cas certains ont été corrigés. Les lignes de résultat interactives restent des contrôles métier riches et ne sont pas forcées dans Button.
