# Plan de migration Select + Checkbox

Plan écrit avant toute migration source le 22 juillet 2026.

## Baseline

- Select : 67 racines natives, 0 canonique, cinq wrappers compatibles, une implémentation spécialisée exclue, 49 noms accessibles démontrés.
- Checkbox : 10 racines natives, 0 canonique, neuf noms accessibles, deux disabled réels ; un pseudo-checkbox et quatre faux positifs exclus.
- `Field` conserve le hash `c5a4830f…a4c33` et son contrat label + enfant.
- Le working tree contient les lots G1 Modal, Card et Color System déjà validés ; aucun G3 identifié avant migration.

## Ordre

1. Créer les primitives native-backed, sans dépendance ni option métier.
2. Migrer mécaniquement les 67 et 10 racines en conservant props, enfants, classes, valeurs et handlers.
3. Ajouter les imports directs et laisser les cinq wrappers composer Select.
4. Relier les 18 Select et la checkbox Kanban à leur texte existant.
5. Laisser `AdminPaletteSelector`, Best Attackers, les toggles `aria-pressed` et le radio Learning hors migration.
6. Comparer baseline et résultat sur dark/light, trois viewports, contrôles directs, wrappers, Modals, filtres et cas spécialisés.

## Conditions d'arrêt locales

- logique async/recherche riche ou menu non natif ;
- changement de valeur, option, handler ou donnée ;
- label métier non démontré ;
- nécessité d'un nouvel état ou composant de groupe ;
- différence responsive, clavier ou focus non expliquée ;
- collision avec un changement G3.

Un cas arrêté reste documenté sans bloquer les autres. Aucun hardcode générique ne peut entrer dans les primitives.

## Baseline visuelle

Les cibles seront capturées avant migration. Les différences attendues sont limitées à la consolidation visuelle des checkbox browser-default et aux noms accessibles ajoutés, sans différence de layout, valeur ou interaction. Les Select doivent conserver leurs classes calculées grâce à `className` et `tailwind-merge`.

## Git

Aucun staging, commit ou push avant typecheck, ESLint ciblé, tests statiques, Playwright, régressions G1 et `git diff --check`. À la fin, seuls G1 + G2 seront ajoutés explicitement ; aucun artefact `test-results`, secret, `.env` ou fichier généré ne sera inclus.
