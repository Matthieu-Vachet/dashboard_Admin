# Backlog officiel du programme Design System

Statuts autorisés : `not-started`, `observing`, `planned`, `in-progress`, `blocked`, `validated`, `completed`.

| ID | Epic | Famille | Tâche | Statut | Priorité | Risque | Taille | Dépendances |
|---|---|---|---|---|---|---|---|---|
| DS-BACKLOG-001 | Consolidation | Badge | Sprint pilote Kanban : deux catégories | completed | P0 | faible | S | Audit et matrices |
| DS-BACKLOG-002 | Consolidation | Badge | Sprint Famille : inventaire et cas sûrs | completed | P0 | faible | M | DS-BACKLOG-001 |
| DS-BACKLOG-003 | Formulaires | Field | Anatomie auditée, primitive minimale créée et façades sûres composées | completed | P1 | moyen | M | Badge validé |
| DS-BACKLOG-004 | Formulaires | Input | Entrées textuelles auditées et cas sûrs consolidés | completed | P1 | moyen | M | DS-BACKLOG-003 |
| DS-BACKLOG-005 | Formulaires | Textarea | Zones multiligne auditées et cas sûrs consolidés | completed | P1 | moyen | S | DS-BACKLOG-003 |
| DS-BACKLOG-006 | Formulaires | Select | 72 contrôles compatibles canoniques et nommés à la baseline courante ; cinq wrappers conservés, palette spécialisée exclue | completed | P1 | élevé | L | DS-BACKLOG-003 |
| DS-BACKLOG-007 | Formulaires | Checkbox | 10 contrôles compatibles canoniques et nommés ; disabled, labels et exceptions sémantiques conservés | completed | P1 | moyen | M | Accessibility |
| DS-BACKLOG-008 | États | Loading / Empty / Error | 87 racines génériques couvertes à la baseline courante ; Fetch Loading animé 18/18, Empty/No Results 55/55, Error 14/14, exceptions documentées | completed | P1 | moyen | L | Card, Accessibility |
| DS-BACKLOG-009 | Actions | Button | Sprint Famille : contrat, inventaire, ExternalButton et LoadMoreButton | completed | P1 | élevé | M | Badge validé |
| DS-BACKLOG-010 | Surfaces | Card | 386 racines historiques classées ; 20 surfaces sûres migrées, 117 usages canoniques à la baseline courante ; surfaces résiduelles, radius et élévations génériques validés par Visual Consistency | completed | P1 | élevé | L | Responsive vérifié localement sur 3 viewports |
| DS-BACKLOG-011 | Overlays | Modal | 38 cas historiques classés ; 23 instances canoniques dans 14 fichiers à la baseline courante, API publique inchangée et exceptions métier documentées | completed | P1 | élevé | L | Accessibility, Button |
| DS-BACKLOG-012 | Qualité transverse | Responsive | 2 266/2 266 racines génériques conformes ; 20 parcours validés en 375×812, 768×1024 et 1440×1000, clair/sombre, sans overflow | completed | P0 | moyen | M | Aucune |
| DS-BACKLOG-013 | Qualité transverse | Accessibility | Contrats de formulaires, focus, noms accessibles et reduced-motion consolidés ; dette WCAG/physique conservée | completed | P0 | élevé | L | Sprint Field validé |
| DS-BACKLOG-014 | Qualité transverse | Motion | Trois durations et trois easings ; 69/69 sites UI canoniques, 99/99 sites reduced-motion couverts, exceptions fonctionnelles/métier conservées | completed | P1 | moyen | M | Accessibility |
| DS-BACKLOG-015 | Synchronisation | Figma Sync | Aligner tokens, primitives et variantes validés | not-started | P2 | moyen | L | Familles stabilisées |
| DS-BACKLOG-016 | Maintenance | Cleanup final | Corrections sûres finales, façades Field composées et compteurs fragiles retirés ; suppressions risquées renvoyées à la maintenance ordinaire | completed | P2 | élevé | L | Toutes migrations validées |
| DS-BACKLOG-017 | Overlays | Modal Stabilisation | Titre/description reliés, overlay hors tab order, focus renforcé et motion réduite sur AdminVersionHistoryDialog | completed | P1 | élevé | M | DS-BACKLOG-011 |
| DS-BACKLOG-018 | Foundations | Color System | 5 179 usages classés ; couverture générique 46,4 % → 91,0 %, 1 504 hardcodes génériques retirés, 66 scénarios dark/light validés | completed | P0 | élevé | L | Card, Modal, Button, Badge, Field |

## Disposition finale

La chaîne Preflight → Visual Consistency → Typography → Motion → Responsive → Finalization est close. Les entrées 001 à 014, 016 à 018 sont `completed`.

- `DS-BACKLOG-015` reste pertinent, mais relève d’une décision humaine Figma/produit hors consolidation structurelle.
- Les exceptions de contrôles riches, palettes métier, overlays spécialisés et géométries Pokémon restent documentées et ne sont pas des sprints planifiés.
- La QA sur appareils physiques, zoom réel et budgets Core Web Vitals reste une dette de validation, pas une dette de primitive.
- Aucun identifiant permanent supplémentaire n’a été inventé.
