# Rapport — Responsive System

## Statut

**completed** — couverture générique 99,51 % → 100 %, matrice 120/120 vues et contrats durables synchronisés.

## Résultat

- 2 253/2 264 racines conformes avant migration ;
- 2 266/2 266 après migration ;
- neuf hauteurs viewport legacy ramenées au contrat `dvh` ;
- deux largeurs fixes mobiles bornées ;
- zéro breakpoint arbitraire générique ;
- zéro branchement JavaScript sur la largeur ;
- 14 seuils métier spécialisés conservés et documentés.

Les correctifs source ne changent ni texte, ni données, ni logique métier, ni API publique. La largeur nominale du drawer (286 px), les hiérarchies et les compositions restent identiques.

## Défauts découverts et corrigés

La campagne a identifié deux violations certaines du contrat overlay :

1. le drawer principal ne fermait pas sur Escape et ne gérait pas le focus comme un dialogue ;
2. le détail Event ne fermait pas sur Escape et ne garantissait ni piège ni restitution du focus.

Les deux corrections sont locales et mécaniques : rôle/nom accessible, focus initial, Tab/Shift+Tab, Escape, verrouillage du body et restauration du déclencheur. Elles n’ajoutent aucune fonctionnalité métier.

## Preuves

- test statique Responsive : 7/7 assertions ;
- campagne Playwright : 20 parcours × 3 viewports × 2 thèmes = 120/120 vues ;
- 20 interactions, 12 contrôles de modale et 10 contrôles de tableau ;
- aucun overflow horizontal, overlay framework, erreur console ou erreur React ;
- captures générées pour chaque vue sous `test-results/design-system-responsive/` ;
- échantillon visuel inspecté : Dashboard mobile sombre, Events mobile clair, Admin tablette sombre et Docs Pokémon desktop clair.

Validations transverses finales :

- suites Design System : 90/90 assertions ;
- Admin Pokémon : 31/31 tests ;
- Trainer Pokémon : 16/16 tests exécutés, un fixture volumineux explicitement ignoré ;
- campagne Pokémon spécialisée : 126/126 vues, sept largeurs et deux thèmes ;
- TypeScript : réussi ;
- ESLint ciblé : 0 erreur, trois avertissements `<img>` préexistants ;
- ESLint complet : 0 erreur, 62 avertissements historiques ;
- build Next.js de production : réussi ;
- `git diff --check` : réussi.

Les avertissements de build sur le traçage dynamique du repository Pokémon sont connus, non bloquants et n’ont pas été introduits par Responsive.

## Synchronisation Foundation

DOC inspectés : DOC-001, DOC-010, DOC-011, DOC-021, DOC-022, DOC-023 et DOC-030.

- DOC-010 modifié : propriétaire du contrat Design System global ; sa section Responsive devient l’état réellement implémenté et testé.
- DOC-011 modifié : la vue durable du Dashboard décrit désormais le shell, les viewports dynamiques et les overlays clavier.
- DOC-021 modifié : propriétaire des suites et campagnes exécutables.
- DOC-022 modifié : propriétaire des choix de rendu qui évitent un branchement JavaScript et contiennent le coût/layout mobile.
- DOC-023 modifié : propriétaire principal des breakpoints, shell, grilles, modales et matrice de référence.
- DOC-001 laissé inchangé : RULE-023 est compatible avec le contrat validé et ne contient aucune règle obsolète.
- DOC-030 laissé inchangé : il décrit les commandes qualité générales des dépôts ; les campagnes de sprint restent la propriété de DOC-021 et du Programme.

Aucune information manquante n’empêche la synchronisation. Les limites appareils, zoom et clavier virtuel restent explicitement documentées comme dette.

## Rollback et dette

Le rollback est strictement local aux neuf sources, deux scripts et documents Responsive. Aucune donnée ni API n’est concernée. La dette restante porte sur les navigateurs mobiles réels, le zoom, le paysage, le clavier virtuel et les métriques de performance, pas sur un défaut observé dans la matrice de référence.

## Suite

Aucun cinquième sprint n’est lancé. Responsive clôt la chaîne autorisée Preflight → Visual Consistency → Typography → Motion → Responsive.
