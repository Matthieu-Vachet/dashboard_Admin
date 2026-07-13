# Sprint Famille Button

Date d’exécution : 13 juillet 2026. Primitive : `Button` — MWI-COMP-318.

Ce dossier documente le premier sprint Famille consacré aux actions. Le code courant, les styles calculés et les interactions navigateur priment sur les ressemblances de classes. Le sprint inventorie toute la surface puis ne compose `Button` que dans les wrappers dont l’équivalence est prouvée.

## Ordre de lecture

1. `button-family-inventory.md` ;
2. `button-contract-analysis.md` ;
3. `button-family-migration-plan.md` ;
4. `button-family-sprint-report.md`.

Les artefacts Playwright sont produits sous `test-results/design-system-button-family/`, jamais dans `public/`. Le test statique est `scripts/test-design-system-button-family.mjs` et la vérification navigateur ciblée est `scripts/verify-design-system-button-family.mjs`.

## Règle de périmètre

`src/components/ui/button.tsx` est inspecté mais ne doit pas être modifié. Les wrappers métier sont conservés. Aucun variant métier, booléen de commodité, token global ou refactor adjacent n’est autorisé.
