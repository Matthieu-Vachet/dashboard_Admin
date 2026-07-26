# Finalisation du Design System

Statut : `STRUCTURAL COMPLETE`. La campagne finale est consignée dans `design-system-final-report.md`.

Cette clôture audite le code applicatif courant, y compris les features postérieures aux sprints historiques, corrige les violations génériques sûrement migrables et installe une gouvernance durable. Elle ne redessine pas le Dashboard et ne transforme pas les composants métier en primitives génériques.

## Livrables

- `final-system-inventory.md` : méthode, périmètre et inventaire courant ;
- `final-coverage-matrix.md` : métriques et formules de couverture ;
- `anti-regression-contract.md` : invariants exécutables et procédure future ;
- `remaining-exceptions.md` : registre des exceptions et dettes légitimes ;
- `design-system-final-report.md` : résultat consolidé de la mission ;
- `execution-journal.md` : point de reprise opérationnel demandé pour éviter toute perte de contexte.

## Contrat de clôture

Une famille est structurellement complète lorsque :

```text
hardcodes génériques compatibles et sûrement migrables = 0
```

Les usages métier, interactions riches, palettes de données, overlays spécialisés, décorations, faux positifs et décisions UX non tranchées sont classés mais exclus du dénominateur de couverture générique.

Commande centrale :

```bash
npm run test:design-system
```
