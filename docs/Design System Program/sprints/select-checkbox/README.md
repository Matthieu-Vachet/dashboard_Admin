# Sprint complet Select + Checkbox

Date : 22 juillet 2026. Type : Sprint Famille double, partagé par le contrat de contrôle natif. Statut courant : `completed`.

Le sprint consolide toutes les racines Select et Checkbox génériques du Dashboard, leurs cinq wrappers compatibles, leurs noms accessibles, leur rendu Color System et leurs états natifs. Les menus, radios, toggles et sélections métier qui ne partagent pas ce contrat restent exclus.

## Livrables

- `select-checkbox-inventory.md` : inventaire exhaustif et métriques avant/après ;
- `select-contract-analysis.md` : contrat fini de Select ;
- `checkbox-contract-analysis.md` : contrat fini de Checkbox ;
- `select-checkbox-migration-plan.md` : plan écrit avant migration ;
- `select-checkbox-sprint-report.md` : résultats, tests et clôture Git.

Les preuves reproductibles sont portées par `scripts/test-design-system-select-checkbox.mjs` et `scripts/verify-design-system-select-checkbox.mjs`. Les 67 Select et 10 Checkbox compatibles sont canoniques et nommés ; les six exclusions spécialisées ou sémantiquement différentes restent locales.
