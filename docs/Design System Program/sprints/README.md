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
| `state-system/` | Famille complète | completed — 78 racines génériques couvertes, dont 15 Fetch Loading animés, 52 Empty/No Results et 11 Error |
| `visual-consistency/` | Consolidation transverse complète | completed — couverture générique 98,83 % → 100 %, trois rôles radius, cinq niveaux d’élévation et 102 captures validées |
| `typography-system/` | Consolidation transverse complète | completed — Geist Sans/Mono activées, 15 rôles, couverture générique 0 % → 100 % et 66 captures validées |

Le prochain sprint de la chaîne est **Motion System**. Typography n’a créé ni composant, ni nouvelle API, ni micro-sprint supplémentaire. `DS-BACKLOG-012` Responsive reste planifié globalement et `DS-BACKLOG-014` Motion entre dans son sprint dédié.
