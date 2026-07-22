# Rapport final — Color System complet

Date : 22 juillet 2026. Statut Color System : `completed`. Validation technique : réussie. Identifiant officiel : `DS-BACKLOG-018`.

## Résultat

Le Dashboard dispose désormais d'un contrat couleur dark/light central pour le fond, les surfaces, les textes, les bordures, les interactions, les accents, les statuts et l'overlay. Les primitives consolidées le consomment en premier ; le chrome générique des composants métier est migré sans absorber les couleurs Pokémon/Events. La couverture générique mesurée passe de 46,4 % à 91,0 %.

Le working tree contenait au démarrage les lots Modal et Card non committés. Ils ont été préservés. Les fichiers communs ont reçu uniquement les substitutions Color System nécessaires ; aucune restauration, aucun nettoyage destructif et aucune refonte concurrente n'ont été effectués.

## Inventaire chiffré

| Mesure | Avant | Après |
|---|---:|---:|
| Usages couleur totaux | 5 096 | 5 179 |
| Usages génériques | 3 346 | 3 221 |
| Génériques tokenisés | 1 552 | 2 931 |
| Génériques hardcodés | 1 794 | 290 |
| Couleurs métier | 1 358 | 1 593 |
| Décoratifs | 172 | 151 |
| Ambigus | 220 | 214 |
| Generic Color System Coverage | 46,4 % | 91,0 % |

La migration retire 1 504 occurrences de dette générique, soit 83,8 % des hardcodes génériques initiaux. Le total lexical augmente de 83 car les références sémantiques et la séparation explicite `domain-foreground` sont mieux détectées ; la dette, elle, diminue.

## Tokens

- Avant : 21 variables couleur centrales.
- Conservés : 21.
- Créés : 27.
- Supprimés ou fusionnés : 0.
- Après : 48 variables couleur dark/light.

Les créations couvrent les textes secondaire/disabled/inverse/on-accent, les surfaces et interactions répétées, les niveaux de bordure, success et ses foregrounds de statut, l'overlay et le contraste métier. Les niveaux d'alpha de fidélité sont documentés comme compatibilité de migration, pas comme variantes de composants.

## Migration

- 84 fichiers source apparaissent dans le diff résultant, dont `globals.css` et cinq fichiers UI ; 88 fichiers source consomment au moins un des nouveaux rôles.
- Six primitives exportées ont été migrées dans cinq fichiers : `Badge`, `Button`, `Card`, `Input`, `Textarea`, `Modal`.
- `Field` a été vérifié et reste inchangé car il ne contenait pas de couleur arbitraire.
- Le chrome générique des consommateurs métier, shell, formulaires, Cards, Modals et charts utilise les tokens ; les couleurs de données restent locales.
- La primitive `Card` flat emploie `surface-flat`, `Modal` emploie `overlay`, les champs emploient les surfaces de contrôle, les badges et boutons emploient les foregrounds adaptés.
- Les charts ont migré leurs axes, grilles, curseurs et tooltips génériques ; les séries métier restent séparées.

## Hardcodes restants

Les 290 occurrences restantes sont justifiées dans `color-system-inventory.md` : 87 sont dans les règles de compatibilité Light de `globals.css`, les autres sont surtout des alphas non équivalents, overlays spécialisés, viewers et panneaux Pokémon/Events. Les patterns dominants sont `border-white/12` (16), `bg-white/[0.07]` (9), `bg-slate-950`, `/55` et `/70` (8 chacun), `text-slate-600` (8) et quelques textes/overlays locaux.

Ils ne sont ni oubliés ni déclarés canoniques : leur sémantique, leur contraste ou leur superposition ne permettait pas une migration certaine pendant ce sprint.

## Light / Dark et accessibilité

Les deux thèmes sont contrôlés par la même API de tokens. Le rendu dark conserve les recettes calculées historiques ; le thème Light corrige les textes et bordures qui dépendaient auparavant de hacks globaux.

Contrastes mesurés contre le fond :

| Texte | Dark | Light |
|---|---:|---:|
| principal | 18,20:1 | 16,65:1 |
| secondaire | 13,62:1 | 9,70:1 |
| muted | 7,89:1 | 5,90:1 |
| disabled | 4,25:1 | 4,46:1 |

Sur les captures de page, le drift dark maximal est de 0,33 %. Les différences Light atteignent 5,84 % sur la page Events spécialisée et correspondent aux corrections adaptatives attendues ; la géométrie, le DOM sémantique et les boîtes restent identiques.

## Tests exacts

| Validation | Résultat |
|---|---|
| Test statique Color System | 6/6 pass |
| TypeScript `tsc --noEmit` | pass, 0 erreur |
| ESLint ciblé sur les sources/scripts touchés | pass, 0 erreur ; 59 warnings legacy `no-img-element` |
| Playwright Color System | 66/66 scénarios : 11 pages × 2 thèmes × 3 viewports |
| Card ciblé | 7/7 pass |
| Modal complet ciblé | 8/8 pass |
| Button ciblé | 5/5 pass |
| `git diff --check` | pass |

La matrice Playwright couvre Dashboard, Projects, Analytics/Learning, Database/Forms, Tools, Notes, Pomodoro, Palette, Todo, Events et Admin Pokémon en 375×812, 768×1024 et 1440×1000. Résultat runtime : zéro différence structurelle, erreur React, erreur console/page ou overflow. Les styles et pixels des cibles migrées sont comparés à la baseline pré-migration.

## Palette Replacement Readiness — PARTIALLY READY

1. Fichiers centraux : `src/app/globals.css` contrôle la base sémantique dark/light ; `src/data/dashboard-palettes.ts` et le hook de palette existant contrôlent les huit jeux d'accents runtime.
2. Pour recolorer : modifier `background` pour le fond ; `panel`, `panel-strong` et `surface-*` pour les surfaces ; `foreground`, `foreground-secondary`, `muted`, `disabled`, `inverse` et `on-accent` pour le texte ; `line-*` pour les bordures ; `brand-*` et `accent-*`/les palettes runtime pour l'accent.
3. Hardcodes UI génériques restants : 290.
4. Freins : les sélecteurs de compatibilité Light de `globals.css`, puis les panneaux Game Master, Detail Modal, Shiny, Events, Collections et quelques viewers qui combinent alphas, gradients et données dynamiques.
5. Light et Dark peuvent être recolorés principalement depuis les tokens, mais pas encore exclusivement. Un remplacement global doit conserver une vérification visuelle des 290 exceptions et des huit palettes.

## Risques ouverts

- 290 hardcodes génériques de classe F restent à traiter par famille ou cleanup, sans migration aveugle.
- 214 occurrences ambiguës nécessitent un propriétaire métier ou décoratif.
- Les 87 occurrences de compatibilité dans `globals.css` empêchent une suppression immédiate de tous les correctifs Light.
- La matrice valide la palette active et la page de sélection ; elle ne démontre pas encore tous les contrastes de chacune des huit palettes sur toutes les pages.
- Les shadows, Typography, Spacing, Radius, Motion et Responsive globaux restent hors périmètre.

## Gouvernance et suite

`DS-BACKLOG-018` est enregistré `completed`. Le rapport, le contrat, l'inventaire et les preuves avant/après satisfont les critères de clôture : inventaire complet, cas sûrs migrés, primitives et chrome métier tokenisés, exceptions justifiées, thèmes validés et couverture mesurée.

Prochain gros sprint de famille recommandé, non lancé : **Select** (`DS-BACKLOG-006`). Il doit inventorier natif et custom, stabiliser accessibilité et états, puis consommer le Color System sans créer prématurément un composant universel.

Aucun commit, push ou déploiement n'a été effectué.
