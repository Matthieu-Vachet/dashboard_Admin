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
| Modal | completed | sprint clos à 22 instances ; baseline courante à 23 instances canoniques dans 14 fichiers, toutes importées depuis la primitive, avec exceptions métier documentées dans `sprints/modal-complete/` |
| Modal Stabilisation | completed | contrat canonique, overlay, focus et motion locale stabilisés (`DS-BACKLOG-017`) |
| Card + Surfaces | completed | sprint clos à 115 usages ; baseline courante à 117 usages dans 33 fichiers, tous importés depuis la primitive, sans modifier le contrat Card ; preuves historiques dans `sprints/card-surfaces/` (`DS-BACKLOG-010`) |
| Color System | completed | sprint clos à 91,0 % ; baseline courante à 90,8 % de couverture générique après ajout de consommateurs, sans réintroduction des équivalences génériques interdites ; preuves dans `sprints/color-system/` (`DS-BACKLOG-018`) |
| Select | completed | baseline courante à 72/72 contrôles compatibles canoniques et nommés, cinq wrappers conservés ; preuves historiques dans `sprints/select-checkbox/` (`DS-BACKLOG-006`) |
| Checkbox | completed | 10/10 contrôles compatibles canoniques et nommés, sémantiques spécialisées conservées ; preuves dans `sprints/select-checkbox/` (`DS-BACKLOG-007`) |
| State System | completed | baseline courante à 87/87 racines génériques : 18 Fetch Loading, 55 Empty/No Results et 14 Error ; 0 legacy compatible, preuves historiques dans `sprints/state-system/` (`DS-BACKLOG-008`) |
| Visual Consistency | completed | spacing générique, rôles radius, cinq niveaux d’élévation et surfaces résiduelles validés à 100 % ; 102 captures dans `sprints/visual-consistency/` |
| Typography System | completed | Geist Sans/Mono réellement chargées, 15 rôles sémantiques, couverture générique 0 % → 100 % et 66 captures validées dans `sprints/typography-system/` |

Métriques de santé au 26 juillet 2026 : la baseline statique couvre 117 Card dans 33 fichiers, 130 contrôles Field/Input/Textarea, 23 Modal dans 14 fichiers, 72 Select, 10 Checkbox et 87 racines State System. State System consolide 18/18 fetchs génériques sur un loader animé commun. Le Color System pilote 90,8 % des 3 157 usages génériques courants ; les couleurs métier restent séparées. Visual Consistency porte la couverture générique de 98,83 % à 100 % : 3 421 espacements canoniques, 656 rayons génériques canoniques et 108 élévations UI canoniques. Typography porte 618/618 patterns génériques sur 15 rôles, contre 0/609 avant migration, et conserve 236 valeurs arbitraires spécialisées. Les métriques de clôture originales et les campagnes visuelles restent immuables dans leurs dossiers de sprint.

Baseline Design System READY, Visual Consistency et Typography System completed. La prochaine mission de la chaîne autorisée est **Motion System** ; elle doit partir de l’inventaire réel des transitions et animations sans rouvrir les contrats validés.

## Lancer un nouveau sprint

Dupliquer le template de prompt, sélectionner une seule famille dans le backlog, confirmer les dépendances, inspecter le working tree, écrire l’inventaire et le plan, puis seulement établir la baseline et modifier le code. Le prochain sprint n’est jamais lancé implicitement depuis le rapport du précédent.
