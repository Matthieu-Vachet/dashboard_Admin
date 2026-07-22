# Sprint complet Color System

Date : 22 juillet 2026. Type : consolidation transverse. Statut final : `completed` et validation technique réussie.

Ce sprint centralise les couleurs génériques du Dashboard sans absorber les couleurs Pokémon, Events, graphiques ou illustrations. Le code courant prévaut sur l’audit historique. Le périmètre couvre les tokens dark/light, les primitives consolidées, le chrome générique des composants métier, les états sémantiques et les exceptions documentées.

## Livrables

- `color-system-inventory.md` : métriques avant/après et méthode de classification ;
- `color-token-contract.md` : contrat minimal des tokens dark/light ;
- `domain-color-inventory.md` : couleurs métier et décoratives exclues ;
- `color-system-migration-plan.md` : migrations autorisées et conditions d’arrêt ;
- `color-system-sprint-report.md` : résultats, tests et préparation au remplacement de palette.

Les preuves automatiques sont portées par `scripts/test-design-system-color-system.mjs` et `scripts/verify-design-system-color-system.mjs`.

Résultat : 5 179 usages couleur lexicaux après normalisation, dont 3 221 génériques. La couverture Color System générique passe de 46,4 % à 91,0 % ; 1 504 occurrences génériques hardcodées ont été retirées. Les 290 occurrences génériques restantes sont classées et justifiées. Palette Replacement Readiness : `PARTIALLY READY`.
