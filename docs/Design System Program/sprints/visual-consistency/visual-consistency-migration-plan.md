# Plan de migration Visual Consistency

## Lot 1 — contrats globaux

- Ajouter les rôles radius `control`, `surface`, `overlay` dans `@theme`.
- Ajouter cinq recettes d’élévation dark/light et leurs utilities Tailwind.
- Brancher les recettes CSS génériques sur ces variables.

## Lot 2 — primitives et composants partagés

- Migrer Button, Card, Input, Textarea, Select, Modal et State System vers les rôles radius.
- Migrer Modal vers `shadow-overlay`.
- Faire consommer `rounded-surface` et `shadow-raised` au wrapper Panel sans le convertir en Card.

## Lot 3 — consommateurs sûrs

- Remplacer `gap-[normal]` par `gap-2`.
- Migrer les dialogs et panels dont l’ombre noire exprime uniquement l’élévation.
- Conserver les glows, effets d’artwork, ombres de statuts et géométries métier.

## Lot 4 — validation

- Test statique Visual Consistency et tests Design System impactés.
- TypeScript, ESLint ciblé, build et `git diff --check`.
- Dark/light × 375×812, 768×1024 et 1440×1000 sur Dashboard, pages génériques, Admin Pokémon, overlays et State System.
- Synchronisation du Programme, de DOC-010 et des autres DOC réellement concernés.

## Rollback

Chaque lot peut être annulé par fichier : variables et recipes CSS, classes sémantiques des primitives, puis consommateurs. Aucun changement de données, d’API métier ou de structure de DOM n’est prévu.
