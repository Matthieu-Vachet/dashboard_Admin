# Plan de migration — Sprint Modal complet

Ce plan est écrit avant toute modification source, après inspection d’un working tree propre et du code au commit `a60f226`.

## Inventaire et décision

- 38 cas runtime ;
- A0/B22/C0/D10/E6/F0 avant stabilisation ;
- les 11 consommateurs historiques sont toujours présents, mais le code réel contient 22 instances canoniques dans 14 fichiers ;
- aucun wrapper simple C n’est strictement migrable.

## Lot source

### Primitive

Modifier seulement `src/components/ui/modal.tsx` pour :

1. lier titre et description visibles avec `useId` ;
2. retirer l’overlay du tab order sans changer son rendu ou sa fermeture ;
3. ajouter un fallback de focus programmatique ;
4. renforcer le trap quand le focus est déplacé hors du dialog ;
5. conserver exactement l’API, les classes, le scroll, le responsive et les callbacks.

### Cas spécialisés

Corrections locales sans classes ni textes nouveaux :

- `admin-version-history-dialog.tsx` : contrat accessible/focus/scroll/Escape et reduced motion ;
- `event-editor-modal.jsx` : rôle, titre relié, close nommé sur les deux dialogs ;
- `events-calendar-panel.jsx` : titre visible relié et close nommé ;
- `collections-panel.jsx` : nom du dialog et close nommé ;
- `source-watch-panel.tsx` : titres/descriptions reliés ;
- `detail-modal.jsx` : nom du dialog principal et de la preview nested, close nommé.

Game Master, drawers/sheets et confirmations restent source inchangés.

## Invariants

- aucune nouvelle prop publique ;
- aucun token, texte, style, taille, rayon, palette, route ou logique métier ;
- aucun système global de motion ou z-index ;
- aucune dépendance ;
- aucun fichier consommateur canonique modifié : les 22 instances héritent du correctif.

## Tests avant/après

- test statique `scripts/test-design-system-modal-complete.mjs` en mode baseline puis cible ;
- baseline et comparaison dans `test-results/design-system-modal-complete/` ;
- dark/light et 375×812, 768×1024, 1440×1000 ;
- modale canonique, footer/formulaire, historique versions, Events, Collections et surface Pokémon ;
- titre/description/IDs, overlay hors tab, focus, trap, retour, Escape, scroll, reduced motion, styles, pixels, console, React et overflow ;
- typecheck, ESLint ciblé et `git diff --check`.

## Conditions d’arrêt

Un cas spécialisé est abandonné si la correction exige une API, une classe, une motion, une couche, une refonte ou une logique métier nouvelle. Les autres corrections sûres continuent.

## Rollback

Rollback local : annuler les attributs/hooks ajoutés dans chacun des sept fichiers source, puis supprimer uniquement les deux scripts et `sprints/modal-complete/`. Ne toucher à aucun autre fichier. Les 22 consommateurs ne nécessitent aucun rollback individuel.
