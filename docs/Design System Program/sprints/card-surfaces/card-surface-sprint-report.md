# Rapport final — Sprint complet Card + Surfaces

Date : 22 juillet 2026. Statut : `completed`.

## Working tree

Le dépôt était déjà modifié au démarrage par le Sprint Modal complet : documents du Programme, `DOC-010`, primitive Modal, sept consommateurs Modal, dossier `modal-complete/` et ses deux scripts. Ce lot concurrent a été inventorié, conservé et n'a été ni restauré, ni reformaté, ni inclus dans la migration Card. Aucune collision n'existait sur `card.tsx`, les douze consommateurs Card ciblés ou les deux nouveaux scripts.

## Inventaire et classification

Le scan JSX/TSX reproductible a recensé 386 racines de surface dans 80 fichiers : 95 usages Card déjà canoniques et 291 implémentations locales. Le code contient en parallèle 67 composants réellement nommés `*Card`, `*Panel`, `*Tile` ou `*Widget` ; cette métrique de wrappers ne s'ajoute pas au total des racines.

Classification avant migration : A95/B16/C4/D255/E16/F0. Les classes B et C représentent 20 `div` statiques partageant exactement `rounded-lg border border-line bg-white/[0.045]`. Après migration : A115/B0/C0/D255/E16/F0. Les 271 exceptions locales restantes sont classées, pas ambiguës : 255 surfaces spécialisées et 16 faux positifs/interactifs.

## Migration

Vingt racines ont été composées avec `Card tone="flat"` dans douze consommateurs : Projects (2), Learning Analytics (2), Database Stats (1), Pokémon Analytics (1), Notes (1), Pokémon Widget (2), Daily Tools (4), Pomodoro (2), Color Lab (1), Dashboard Home Live (2), Todo (1) et Loading State (1).

Les wrappers `MiniRow`, `Metric`, `MiniStat` et `SignalRow` ont été conservés ; seule leur racine est devenue Card. Les contrôles imbriqués, handlers, textes, clés React, layouts, paddings, breakpoints et styles métier sont inchangés. `Panel`, les Cards Pokémon/Events, les liens/boutons-surface, Kanban, tables, éditeurs, segmented controls, overlays et modales restent spécialisés.

## Primitive Card

Avant : `tone?: "soft" | "strong"`, racine `div`, `forwardRef<HTMLDivElement>`, props HTML natives, `rounded-lg`, recettes `glass-panel` et `glass-panel-strong`.

Après : ajout fini de `tone="flat"`, qui applique seulement `border border-line bg-white/[0.045]`. La racine, le ref, le défaut `soft`, les tons existants, `CardHeader`, `CardTitle`, `CardDescription` et toutes les props publiques antérieures sont conservés. Aucune API de spacing, interaction, sélection, domaine, polymorphisme, body ou footer n'a été créée.

## Responsive et surfaces

Le prérequis Responsive a été classé R1 : l'absence historique était une lacune de preuve, pas un blocage architectural. Card n'impose aucune largeur, grille ni breakpoint ; aucune correction Responsive source n'a été nécessaire. La matrice couvre 375×812, 768×1024 et 1440×1000 en dark et light, sans overflow horizontal.

Le radius calculé reste 8 px. Les paddings et gaps restent locaux. `soft` et `strong` conservent leurs backgrounds, borders, ombres et blur. `flat` reproduit le fond et la bordure existants, sans shadow ni backdrop-filter. Les styles calculés, boîtes et captures individuelles des surfaces migrées sont identiques avant/après.

## Préparation Color System

Le scan lexical de `src` (`css`, `js`, `jsx`, `ts`, `tsx`) fournit une base, sans migration globale :

- 39 occurrences `bg-white/[0.045]`, dont le contrat centralisé de Card ;
- 45 occurrences `bg-white/[0.055]` et 307 `border-white/10` ;
- 186 occurrences `bg-slate-950*` réparties sur 27 formes ;
- 327 littéraux hexadécimaux représentant 114 valeurs ;
- 256 utilities `shadow*`, dont 105 ombres arbitraires ;
- 61 déclarations de propriétés CSS personnalisées dans `globals.css`, avec 23 références `var(--*)` distinctes dans `src`.

Le prochain audit devra distinguer surfaces, texte, bordures, accents et couleurs sémantiques. Les couleurs de types Pokémon, raids, œufs, météo, Team Rocket, shiny et Events restent des exceptions métier explicites. Aucun token, variable CSS, thème ou fichier Tailwind n'a été modifié ici.

## Tests et preuves

- `CARD_SURFACE_PHASE=baseline node --test scripts/test-design-system-card-surface-family.mjs` : 7/7 tests passants avant migration ;
- `node --test scripts/test-design-system-card-surface-family.mjs` : 7/7 après migration ;
- `npm run typecheck` : passant ;
- ESLint ciblé sur Card, les douze consommateurs et les deux scripts : passant, zéro diagnostic ;
- `node scripts/verify-design-system-card-surface-family.mjs` : 66 scénarios passants, dark/light × trois viewports × onze pages ;
- Playwright : 78 cibles et 66 pages par phase, soit 144 PNG avant et 144 après dans `test-results/design-system-card-surface-family/` ;
- zéro erreur React/page, zéro erreur console et zéro overflow ;
- zéro différence de sémantique, styles calculés, dimensions ou pixels sur les 78 captures de cibles ;
- clavier : focus, Tab et Shift+Tab vérifiés dans les surfaces contenant des contrôles ; interactions non destructives vérifiées sur Tools, Notes, Palette et Todo ;
- `git diff --check` : passant.

La comparaison de page entière tolère uniquement un bruit inférieur à 0,15 % de la surface de capture. Le dernier passage a classé cinq écarts localisés de 1 à 551 pixels comme bruit dynamique (icônes/chargements de pages spécialisées et animation de diagnostic), soit au plus 0,039 % ; aucune cible migrée n'est concernée et aucune différence significative n'est présente.

## Risques ouverts et rollback

Les 271 exceptions locales ne constituent pas un reliquat Card à migrer aveuglément. Leurs couleurs et recettes répétées alimentent Color System, Visual Consistency et Responsive global. Les surfaces interactives ou métier ne pourront évoluer que si leur contrat propre le justifie. La conformité globale WCAG, les contrastes des palettes et la totalité des animations restent hors de la preuve de ce sprint.

Rollback local : remettre les vingt racines en `div` avec leur squelette initial, retirer la branche et la valeur `flat` de Card, puis rejouer les validations. Aucun autre fichier ou changement concurrent ne doit être restauré.

## Conclusion

Card + Surfaces : `completed`. Les 20 racines strictement équivalentes ont été migrées ; les 115 usages canoniques sont désormais caractérisés, les wrappers métier sûrs sont conservés et aucune régression significative n'est détectée. Aucun micro-sprint Card supplémentaire n'est justifié.

Prochain sprint recommandé, non lancé : **Color System complet**.

Aucun commit, push ou déploiement n'a été effectué.
