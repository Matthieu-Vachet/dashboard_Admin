# Responsive System

Statut : **completed**.

Périmètre : shell Dashboard, grilles, flex, toolbars, formulaires, modales, tableaux, hauteurs de viewport, breakpoints Tailwind et seuils métier spécialisés.

## Documents

- `responsive-inventory.md` : inventaire source et métriques avant/après ;
- `responsive-contract.md` : contrat durable de composition ;
- `responsive-migration-plan.md` : lot de migration, validations et rollback ;
- `responsive-exceptions.md` : seuils spécialisés conservés et dette explicite ;
- `responsive-sprint-report.md` : résultats techniques, visuels et Foundation.

## Preuves exécutables

- `scripts/test-design-system-responsive.mjs` contrôle statiquement les 20 routes et 264 fichiers source ;
- `scripts/verify-design-system-responsive.mjs` valide 20 parcours en 375×812, 768×1024 et 1440×1000, en thèmes clair et sombre ;
- `scripts/verify-pokemon-responsive.mjs` conserve la campagne spécialisée Admin Pokémon.

Les captures et rapports JSON sont générés sous `test-results/design-system-responsive/` et restent des artefacts locaux ignorés par Git.
