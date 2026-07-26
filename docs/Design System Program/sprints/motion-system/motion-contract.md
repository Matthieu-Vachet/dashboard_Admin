# Contrat Motion System

## Durations

| Rôle | Valeur | Usage |
|---|---:|---|
| `fast` | 150 ms | hover, focus, couleur, opacité et feedback immédiat |
| `normal` | 200 ms | contrôle ou changement d’état local |
| `slow` | 300 ms | déplacement de shell, drawer et layout borné |

Le défaut Tailwind des transitions génériques devient `fast` avec l’easing `standard`. Les durées fonctionnelles de visualisation/progression et les boucles métier ne deviennent pas des niveaux supplémentaires.

## Easings

| Rôle | Courbe | Usage |
|---|---|---|
| `standard` | `ease` | transitions UI bidirectionnelles |
| `enter` | `cubic-bezier(0, 0, 0.2, 1)` | arrivée non spring |
| `exit` | `cubic-bezier(0.4, 0, 1, 1)` | sortie rapide |

Le spring du drawer conserve damping 26 et stiffness 260 : il s’agit d’une recette structurelle finie, pas d’un easing global supplémentaire.

## Consommation

- les transitions Tailwind utilisent le défaut global ou `duration-motion-fast|normal|slow` lorsqu’une durée explicite est nécessaire ;
- les transitions Framer génériques réutilisent les constantes secondes et la recette drawer de `src/lib/motion.ts` ;
- `transition-all` reste interdit lorsque les propriétés Tailwind ciblées suffisent ;
- Button et contrôles restent rapides; Card statique n’acquiert aucune transformation ;
- Modal canonique reste sans animation conformément à son contrat completed ;
- loaders et skeletons gardent leur information et leur structure ;
- DnD, progressions, graphiques et motion Pokémon restent fonctionnels ou métier.

## Reduced motion

- CSS réduit globalement durées, délais, boucles et smooth scroll, et arrête explicitement spin, pulse, sheen et energy-scan ;
- Framer utilise `MotionConfig reducedMotion="user"`, ce qui supprime les transforms/layout selon la préférence système tout en conservant l’opacité informative ;
- le dialog historique garde son traitement local instantané ;
- aucun texte, statut, géométrie de skeleton ou information de chargement n’est supprimé.

## Performance

Les transitions génériques privilégient transform et opacity. Les animations width/height des graphiques et barres restent des feedbacks fonctionnels bornés; aucune animation métier complexe n’est refactorée sans preuve de risque faible.
