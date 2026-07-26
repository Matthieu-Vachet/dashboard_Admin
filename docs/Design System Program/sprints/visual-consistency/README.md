# Visual Consistency

Statut : `completed`
Périmètre : spacing, radius, shadows/elevation et surfaces génériques résiduelles.

## Ordre de lecture

1. `visual-consistency-inventory.md` ;
2. `spacing-contract.md` ;
3. `radius-contract.md` ;
4. `elevation-shadow-contract.md` ;
5. `residual-surface-analysis.md` ;
6. `visual-consistency-migration-plan.md` ;
7. `visual-consistency-sprint-report.md`.

Le script `scripts/test-design-system-visual-consistency.mjs` constitue l’inventaire reproductible et le garde-fou statique. La campagne `scripts/verify-design-system-visual-consistency.mjs` vérifie 17 parcours, deux thèmes et trois viewports, soit 102 captures.
