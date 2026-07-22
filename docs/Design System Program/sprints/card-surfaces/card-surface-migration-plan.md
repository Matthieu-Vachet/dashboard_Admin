# Plan de migration — Card + Surfaces

Ce plan est écrit avant toute modification source Card.

## État initial

- working tree déjà occupé par le Sprint Modal complet ; aucune collision avec `card.tsx` ou les dix consommateurs ciblés ;
- 386 surfaces candidates : A95/B16/C4/D255/E16/F0 ;
- 95 instances Card dans 32 fichiers ;
- 20 racines exactes `flat` migrables ;
- prérequis Responsive classé R1.

## Lot source

1. Étendre uniquement l’union `tone` de `Card` avec `flat`.
2. Conserver le `div`, le ref, les props natives et les valeurs par défaut.
3. Remplacer les 16 `div` B par `Card tone="flat"`.
4. Remplacer les racines de `MiniRow`, `Metric`, `MiniStat` et `SignalRow` par `Card tone="flat"`, sans supprimer les wrappers.
5. Ne modifier aucune classe de layout, padding, texte, responsive ou interaction.

Fichiers consommateurs prévus : Projects, Learning Analytics, Database Stats, Pokémon Analytics, Notes, Pokémon Widget, Daily Tools, Pomodoro, Color Lab, Dashboard Home Live, Todo et Loading State.

## Exclusions

Conserver `Panel` Admin Pokémon, les surfaces legacy, Cards métier Pokémon/Events, modales, Kanban, TicketCard, tableaux, éditeurs, segmented controls et surfaces interactives. Aucun `CardContent`, `CardFooter`, système de spacing, token, shadow ou radius global n’est créé.

## Tests avant/après

- test statique du contrat, des 95 usages initiaux et des 20 candidats ;
- baseline ciblée Dashboard, Projects, Analytics, Database, Tools, Notes, Pomodoro, Palette, Events et Admin Pokémon ;
- dark/light, 375×812, 768×1024, 1440×1000 ;
- styles calculés, captures, overflow, console/React, focusables et interactions non destructives ;
- typecheck, ESLint ciblé et `git diff --check`.

## Conditions d’arrêt locales

Une racine est abandonnée si le tag, les styles calculés, les pixels, le responsive, l’ordre de tabulation ou une interaction diffèrent. Une API supplémentaire, un token ou une variante métier arrête uniquement le cas concerné.

## Rollback

Remettre les 20 `div` et leur squelette de quatre classes, retirer `flat` de l’union et de la branche de Card, puis rejouer les validations. Ne toucher ni au lot Modal concurrent, ni aux 271 exceptions, ni aux documents historiques.
