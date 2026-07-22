# Sprint State System

Statut : **completed** — 22 juillet 2026.

Ce sprint consolide les états génériques `Loading`, `Empty`, `No Results` et `Error` du Dashboard. Il introduit trois contrats finis dans `src/components/admin/shared/state-system.tsx` : `FetchLoadingState`, `EmptyState` et `ErrorState`. La métrique de couverture compte les racines conditionnelles qui rendent un état ; un wrapper partagé compte une fois et ses consommateurs sont décrits séparément.

Le meilleur loader de fetch existant — carte centrée, spinner `LoaderCircle`, couleur de marque et libellé explicite dans Ma collection — est devenu la référence. Les skeletons Game Master, le chargement persistant pleine page, les loaders de boutons, les imports et les progressions restent des familles distinctes.

Documents du sprint :

- `state-system-inventory.md` — inventaire A/B/C/D/E et couverture avant/après ;
- `state-contract-analysis.md` — contrats, anatomie, accessibilité et frontières ;
- `state-system-migration-plan.md` — séquence de migration et garde-fous ;
- `state-system-sprint-report.md` — preuves, résultats et Fetch Loading Consolidation.

Commandes de preuve :

```bash
npm run test:design-system-state-system
STATE_SYSTEM_INVENTORY_OUT=test-results/design-system-state-system/after-inventory.json npm run test:design-system-state-system
node scripts/verify-design-system-state-system.mjs
```
