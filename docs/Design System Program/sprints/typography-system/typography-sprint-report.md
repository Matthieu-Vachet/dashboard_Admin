# Rapport — Typography System

Date : 26 juillet 2026. Statut : `completed`.

## Résultat

Geist Sans est désormais la famille réellement chargée pour l’interface et Geist Mono celle du code, des identifiants et des métriques. Le Dashboard consomme une hiérarchie finie de 15 rôles `type-*`; les primitives portent les contrats génériques et les consommateurs ne reconstruisent plus les 609 combinaisons legacy identifiées à la baseline.

La couverture Typography passe de **0 % à 100 %** sur les patterns génériques sûrs. Le sprint ne modifie ni texte, ni donnée, ni handler, ni logique métier, ni API publique, ni balise ou structure de DOM.

## Contrats adoptés

- familles : Geist Sans et Geist Mono auto-hébergées par `geist@1.7.2`, avec fallbacks Sans et Mono explicites ;
- titres : `type-display`, `type-title-page`, `type-title-section`, `type-title-subsection`, `type-title-card` et `type-title-inline` ;
- contenu : `type-body`, `type-body-strong`, `type-label`, `type-caption` et `type-caption-strong` ;
- signalétique et contrôles : `type-overline`, `type-overline-compact`, `type-control` et `type-control-strong` ;
- responsive : progression des cinq niveaux de titre à partir de 640 px, avec tailles en rem et contrôle du zoom ;
- exceptions : code/identifiants Mono, micro-données, visualisations, artwork, wordmarks, displays fluides et densités métier sous 12 px restent locaux et mesurés.

## Migration

- le RootLayout charge les deux fontes et expose `--font-geist-sans` et `--font-geist-mono` ;
- `globals.css` définit les 15 rôles et retire une règle globale non stratifiée qui empêchait `font-mono` de gagner la cascade sur les contrôles natifs ; Tailwind Preflight conserve l’héritage natif ;
- Button, Badge, Card, Field, Input, Textarea, Select, Modal et State System consomment les rôles propriétaires ;
- 601 chaînes de classes sûres sont réécrites mécaniquement dans 73 fichiers, puis les primitives et contrats globaux sont alignés ;
- 83 fichiers source sont touchés au total ; les quatre tests de caractérisation Badge, Button et Card sont synchronisés avec les rôles réellement adoptés.

## Inventaire avant / après

| Dimension | Avant | Après |
|---|---:|---:|
| Déclarations Typography | 3 188 | 1 698 |
| Tailles | 1 361 | 731 |
| Graisses | 1 198 | 580 |
| Interlignages | 155 | 62 |
| Letter-spacings | 272 | 59 |
| Valeurs arbitraires | 503 | 236 |
| Patterns génériques sémantiques | 0 / 609 | 618 / 618 |
| **Couverture consolidée** | **0 %** | **100 %** |

L’augmentation de 609 à 618 chaînes génériques suivies vient des rôles ajoutés directement aux primitives et aux compositions prioritaires ; aucun pattern legacy générique ne reste.

## Validation

- garde-fou Typography : 6/6 tests ;
- suites Design System Badge, Button, Card, Color, Field, Modal, Select/Checkbox, State System, Typography et Visual Consistency : 77/77 tests ;
- TypeScript : succès, 0 erreur ;
- ESLint global : 0 erreur, 62 avertissements préexistants, principalement `no-img-element` dans les écrans Pokémon ;
- build Next.js : succès, 34 pages statiques, avec l’avertissement Turbopack/NFT préexistant ;
- Playwright : 66 captures, soit 11 parcours × dark/light × 375×812, 768×1024 et 1440×1000 ; 2 contrôles de zoom, 54 contrôles Mono, 0 overflow horizontal et 0 erreur console/page ;
- inspection manuelle : Dashboard sombre mobile, Admin Pokémon clair desktop, Modal sombre tablette et Events clair mobile conformes ;
- `git diff --check` : succès.

## Synchronisation Foundation

- DOC inspectés : DOC-001, DOC-004, DOC-010, DOC-011, DOC-022 et DOC-023 ;
- DOC-010 modifié : propriétaire du contrat Design System, il décrit le chargement réel de Geist, les 15 rôles, leurs valeurs, le responsive et les règles de consommation ;
- DOC-011 modifié : la référence Dashboard indique désormais les familles effectivement chargées et l’usage des rôles sémantiques dans les primitives et consommateurs ;
- DOC-001 et DOC-004 laissés inchangés : aucune règle de projet ni philosophie n’évolue ;
- DOC-022 laissé inchangé : le sprint ne modifie aucun budget ou contrat de performance, et les fontes sont auto-hébergées par le package local ;
- DOC-023 laissé inchangé : le palier typographique réutilise `sm` à 640 px sans changer les breakpoints ni le contrat responsive global.

Code, Design System Program et Foundation décrivent le même état actuel. Aucun identifiant DOC, RULE, COMP ou ADR n’a été créé.

## Dette restante

- 236 valeurs arbitraires restent réservées aux densités et géométries métier documentées ;
- aucun text style ou fichier source Figma n’est disponible pour une synchronisation bidirectionnelle ;
- `npm audit` signale 7 vulnérabilités transitive/existantes (1 faible, 6 élevées) ; aucune correction automatique hors périmètre n’a été appliquée ;
- l’avertissement Turbopack/NFT et les 62 avertissements ESLint restent hors périmètre ;
- Motion System et Responsive System restent à leurs sprints dédiés.

## Rollback

Le rollback retire d’abord les rôles des consommateurs, restaure les combinaisons de classes, puis retire les utilities, les variables/imports Geist et enfin la dépendance. Il ne touche ni données, ni logique, ni API, ni structure de DOM.

## Git

Le lot est destiné au commit unique `feat(design-system): unify typography system`, puis à un push normal de `main`. Le hash et l’état distant sont contrôlés par l’orchestrateur après création du commit ; aucun force push n’est autorisé.
