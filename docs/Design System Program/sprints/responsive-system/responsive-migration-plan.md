# Plan de migration Responsive System

## Lot validé

1. Caractériser toutes les routes et familles structurelles avec un inventaire statique reproductible.
2. Remplacer les hauteurs viewport génériques par `dvh`, en conservant le fallback CSS utile.
3. Borner les deux largeurs fixes mobiles sans modifier leur largeur nominale.
4. Rendre les chaînes de layout principales rétrécissables avec `min-w-0`.
5. Corriger les contrats clavier/focus du drawer principal et du détail Event découverts par la campagne.
6. Vérifier les trois viewports exacts et les deux thèmes sur les 20 parcours.
7. Relancer les suites Design System, Admin Pokémon, TypeScript, ESLint, build et `git diff --check`.
8. Synchroniser le Programme Design System et les DOC Foundation réellement propriétaires.

## Contraintes

- aucun texte, donnée, handler métier, route ou fonctionnalité n’est modifié ;
- aucun breakpoint générique supplémentaire n’est créé ;
- aucune primitive ou API publique n’est ajoutée ;
- les compositions Pokémon spécialisées restent distinctes ;
- aucune modification de la tâche concurrente ne doit entrer dans le commit.

## Rollback local

Le rollback retire uniquement les changements responsive des neuf sources, les deux scripts et le dossier de sprint. Il ne requiert aucune migration de données, aucun nettoyage global et aucune commande Git destructive. Les corrections focus/Escape du shell et du détail Event forment des unités indépendantes si un retour ciblé est nécessaire.
