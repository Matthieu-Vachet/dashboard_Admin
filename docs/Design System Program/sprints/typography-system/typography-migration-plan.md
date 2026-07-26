# Plan de migration Typography System

## Lot 1 — chargement et styles

- installer la version stable publiée du package `geist` ;
- charger Geist Sans et Geist Mono dans le RootLayout ;
- connecter les variables de fonte et créer les 15 utilities sémantiques finies ;
- préserver les fallbacks et `font-mono` existants.

## Lot 2 — primitives

- Button, Badge, CardTitle/CardDescription/CardHeader ;
- Field, Input, Textarea, Select ;
- Modal et State System ;
- aucune API publique ni balise HTML modifiée.

## Lot 3 — migration globale sûre

- 206 overlines vers normal/compact ;
- 117 headings vers leurs cinq niveaux ;
- 67 bodies vers normal/strong ;
- 219 captions/labels vers leur rôle ;
- conserver les grands sauts responsive, Mono, micro-data et displays spécialisés.

La réécriture est mécanique au niveau des chaînes de classes. Chaque pattern est détecté par le même classificateur que le test de couverture; une chaîne déjà sémantique ou classée métier n’est pas touchée.

## Lot 4 — validation

- baseline statique avant/après et suites Design System impactées ;
- TypeScript, ESLint ciblé, build, `git diff --check` ;
- Dark/Light × 375×812, 768×1024 et 1440×1000 sur les pages et états demandés ;
- vérification de chargement des deux fontes, tailles calculées, line-height, wrapping, zoom, overflow et erreurs runtime ;
- synchronisation Program, DOC-010 et autres DOC propriétaires réellement concernés.

## Rollback

Le rollback retire d’abord les rôles des consommateurs, restaure les combinaisons de classes, puis retire les utilities et enfin les imports/package Geist. Il ne touche ni données, ni logique, ni API, ni structure de DOM.
