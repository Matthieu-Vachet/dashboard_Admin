# Sprints Design System

Un dossier de sprint contient un README, un inventaire, un plan écrit avant la migration et un rapport final. Les types autorisés sont Observation, Pilote, Famille, Stabilisation et Suppression. Un sprint ne traite qu’une famille et suit le cycle de la constitution opérationnelle.

| Dossier | Type | Statut |
|---|---|---|
| `badge/` | Pilote + Famille | validated |
| `button/` | Famille | validated |
| `field-input-textarea/` | Famille | validated |
| `form-accessibility/` | Qualité transverse | validated |
| `modal/` | Famille | validated — 11 usages déjà canoniques, 0 migration source supplémentaire |
| `modal-complete/` | Stabilisation complète | completed — 22 instances canoniques stabilisées, exceptions métier documentées |
| `card-surfaces/` | Famille complète | completed — 386 racines classées, 20 surfaces migrées, 115 usages canoniques |
| `color-system/` | Consolidation transverse complète | completed — couverture générique 46,4 % → 91,0 %, 1 504 hardcodes retirés, 66 scénarios validés |
| `select-checkbox/` | Famille double | completed — 67 Select et 10 Checkbox compatibles canoniques, 100 % nommés, 66 scénarios validés |

Le prochain sprint proposé, non lancé, est **Loading / Empty / Error** (`DS-BACKLOG-008`). `DS-BACKLOG-012` Responsive reste planifié globalement ; les matrices locales Card, Color System et Select + Checkbox ont couvert les trois viewports sans clore le chantier transverse. Aucun micro-sprint Modal, Card, Color System, Select ou Checkbox supplémentaire n'est planifié hors bug nouveau.
