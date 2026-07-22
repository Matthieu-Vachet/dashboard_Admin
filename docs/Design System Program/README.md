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
| Modal | completed | 38 cas courants classés A22/B0/C0/D10/E6/F0 après stabilisation ; 22 instances canoniques dans 14 fichiers et exceptions métier documentées dans `sprints/modal-complete/` |
| Modal Stabilisation | completed | contrat canonique, overlay, focus et motion locale stabilisés (`DS-BACKLOG-017`) |
| Card + Surfaces | completed | 386 racines classées, 20 surfaces sûres migrées, 115 usages canoniques dans 32 fichiers ; preuves dans `sprints/card-surfaces/` (`DS-BACKLOG-010`) |
| Color System | completed | couverture générique 46,4 % → 91,0 %, 1 504 hardcodes génériques retirés et 66 scénarios dark/light validés ; preuves dans `sprints/color-system/` (`DS-BACKLOG-018`) |
| Select | completed | 67/67 contrôles compatibles canoniques et nommés, cinq wrappers conservés ; preuves dans `sprints/select-checkbox/` (`DS-BACKLOG-006`) |
| Checkbox | completed | 10/10 contrôles compatibles canoniques et nommés, sémantiques spécialisées conservées ; preuves dans `sprints/select-checkbox/` (`DS-BACKLOG-007`) |

Métriques au 22 juillet 2026 : sept entrées du backlog sont `validated`, six sont `completed` et neuf dossiers de sprint sont documentés. Les familles Badge, Button, Field, Input et Textarea sont validées ; Modal, Card, Color System, Select et Checkbox sont terminés ; le chantier transverse d'accessibilité des formulaires est validé. Pour Modal, 48 scénarios sont référencés, 46 sont exécutés et les deux skips desktop du drawer mobile sont attendus. Pour Card, Color System et Select + Checkbox, 66 scénarios dark/light et responsive couvrent onze pages, sans différence significative de structure, interaction ou layout, erreur React/console ou overflow. Le Color System pilote 91,0 % des 3 221 usages génériques inventoriés ; les couleurs métier restent séparées.

Prochain sprint recommandé, non lancé : **Loading / Empty / Error** (`DS-BACKLOG-008`). Il devra cartographier les états répétés avant toute extraction et conserver les états spécialisés de domaine.

## Lancer un nouveau sprint

Dupliquer le template de prompt, sélectionner une seule famille dans le backlog, confirmer les dépendances, inspecter le working tree, écrire l’inventaire et le plan, puis seulement établir la baseline et modifier le code. Le prochain sprint n’est jamais lancé implicitement depuis le rapport du précédent.
