# Matrice de couverture finale

## Formule

Pour chaque famille :

```text
coverage =
  canonical generic compatible usages
  /
  (canonical generic compatible usages + compatible hardcodes)
```

Les spécialisations et ambiguïtés sont inventoriées, mais exclues du dénominateur tant qu’aucune équivalence générique sûre n’est démontrée.

| Family | Candidates | Canonical | Compatible hardcodes | Specialized | Ambiguous | Coverage | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Button | 427 | 218 | 0 | 94 | 115 | 100 % | complete |
| Badge | 246 | 113 | 0 | 109 | 24 | 100 % | complete |
| Card | 384 | 117 | 0 | 267 | 0 | 100 % | complete |
| Field/Input/Textarea | 130 | 87 | 0 | 5 | 38 | 100 % | complete |
| Select | 77 | 76 | 0 | 1 | 0 | 100 % | complete |
| Checkbox | 15 | 10 | 0 | 1 + 4 faux positifs | 0 | 100 % | complete |
| Modal | 38 | 23 | 0 | 15 | 0 | 100 % | complete |
| State System | 102 | 87 | 0 | 14 | 1 | 100 % | complete |
| Color | 5 124 | 2 880 | 0 | 1 706 | 538 | 100 % des équivalences prouvées | complete |
| Spacing | 3 429 | 3 423 | 0 | 6 | 0 | 100 % | complete |
| Radius | 919 | 656 | 0 | 263 | 0 | 100 % | complete |
| Elevation | 198 | 108 | 0 | 90 | 0 | 100 % | complete |
| Typography | 1 994 | 620 | 0 | 1 374 classés hors générique | 0 | 100 % | complete |
| Motion | 140 | 69 | 0 | 13 | 58 | 100 % | complete |
| Responsive | 2 280 | 2 266 | 0 | 14 | 0 | 100 % | complete |

## Interprétation Color

Le scanner lexical continue d’appeler `hardcodedGeneric` 290 occurrences neutres. L’inventaire Color System démontre qu’aucune n’a une équivalence sûre restante : recettes Light legacy, alphas distincts, viewers spécialisés et overlays métier. Elles sont donc classées **F — ambigu/non prouvé** dans la gouvernance finale, avec les 248 occurrences déjà ambiguës. Cette décision ne transforme pas ces valeurs en tokens officiels ; elle interdit seulement de prétendre qu’une migration mécanique est certaine.

## Invariants complémentaires

- Select générique natif hors primitive : `0`.
- Checkbox générique native hors primitive : `0`.
- ErrorState avec `description` ou `error` : `0`.
- Pattern Typography générique legacy : `0`.
- Espacement arbitraire générique : `0`.
- Shadow UI arbitraire : `0`.
- Motion UI arbitraire ou `transition-all` : `0`.
- Breakpoint arbitraire générique : `0`.
- Branche responsive JavaScript sur la largeur : `0`.
