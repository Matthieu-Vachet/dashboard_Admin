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

Le statut courant fait foi dans `backlog/design-system-backlog.md`.

| Lot | Statut courant | Preuve |
|---|---|---|
| Badge | validated | pilote et sprint famille documentés dans `sprints/badge/` |
| Button | validated | sprint famille documenté dans `sprints/button/` |
| Field, Input et Textarea | validated | sprint famille documenté dans `sprints/field-input-textarea/` ; `Field` conserve son contrat minimal de label + enfant |
| Accessibilité des formulaires | validated | sprint transverse documenté dans `sprints/form-accessibility/` |
| Modal | validated | 25 cas classés A11/B0/C10/D4 dans `sprints/modal/` ; 11 usages déjà canoniques et aucune migration source supplémentaire |
| Modal Stabilisation | planned | prochain sprint proposé, non lancé (`DS-BACKLOG-017`) |
| Card | planned | lot distinct conservé au backlog (`DS-BACKLOG-010`) |

Métriques de clôture du programme : huit entrées du backlog sont `validated`, cinq dossiers de sprint sont documentés, six familles de composants sont validées (Badge, Button, Field, Input, Textarea et Modal) et un chantier transverse d’accessibilité est validé. Pour Modal, les 36 scénarios de vérification ne montrent aucune différence significative de contrat, style, interaction ou pixels.

## Lancer un nouveau sprint

Dupliquer le template de prompt, sélectionner une seule famille dans le backlog, confirmer les dépendances, inspecter le working tree, écrire l’inventaire et le plan, puis seulement établir la baseline et modifier le code. Le prochain sprint n’est jamais lancé implicitement depuis le rapport du précédent.
