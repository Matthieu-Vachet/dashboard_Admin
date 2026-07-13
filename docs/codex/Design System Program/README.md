# Design System Program

Ce dossier pilote la consolidation progressive du Design System du Dashboard Admin. Il complète l’audit et la roadmap sans déplacer les documents historiques.

## Dossiers et documents

- `DESIGN-SYSTEM-PROGRAM.md` : constitution opérationnelle et règles obligatoires.
- `backlog/` : priorités, dépendances et état des familles.
- `sprints/` : inventaires, plans et rapports propres à chaque famille.
- `reports/` : convention des rapports transverses ou futurs index.
- `templates/` : prompt de sprint et rapport normalisés.

## Ordre de lecture

1. constitution du programme ;
2. roadmap et matrices dans `design-system-audit/roadmap/` ;
3. backlog officiel ;
4. README de la famille ;
5. inventaire, plan puis rapport du sprint.

## Statut des familles

Le statut courant fait foi dans `backlog/design-system-backlog.md`. Badge est la première famille pilotée : son sprint pilote et son sprint famille sont validés et documentés dans `sprints/badge/`.

## Lancer un nouveau sprint

Dupliquer le template de prompt, sélectionner une seule famille dans le backlog, confirmer les dépendances, inspecter le working tree, écrire l’inventaire et le plan, puis seulement établir la baseline et modifier le code. Le prochain sprint n’est jamais lancé implicitement depuis le rapport du précédent.
