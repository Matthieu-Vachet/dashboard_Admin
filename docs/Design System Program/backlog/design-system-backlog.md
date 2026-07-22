# Backlog officiel du programme Design System

Statuts autorisés : `not-started`, `observing`, `planned`, `in-progress`, `blocked`, `validated`, `completed`.

| ID | Epic | Famille | Tâche | Statut | Priorité | Risque | Taille | Dépendances |
|---|---|---|---|---|---|---|---|---|
| DS-BACKLOG-001 | Consolidation | Badge | Sprint pilote Kanban : deux catégories | validated | P0 | faible | S | Audit et matrices |
| DS-BACKLOG-002 | Consolidation | Badge | Sprint Famille : inventaire et cas sûrs | validated | P0 | faible | M | DS-BACKLOG-001 |
| DS-BACKLOG-003 | Formulaires | Field | Anatomie auditée, primitive minimale créée, 29 racines sûres composées | validated | P1 | moyen | M | Badge validé |
| DS-BACKLOG-004 | Formulaires | Input | Entrées textuelles auditées et cas Field sûrs consolidés | validated | P1 | moyen | M | DS-BACKLOG-003 |
| DS-BACKLOG-005 | Formulaires | Textarea | Zones multiligne auditées et cas Field sûrs consolidés | validated | P1 | moyen | S | DS-BACKLOG-003 |
| DS-BACKLOG-006 | Formulaires | Select | 67 contrôles compatibles canoniques et nommés ; cinq wrappers conservés, palette spécialisée exclue | completed | P1 | élevé | L | DS-BACKLOG-003 |
| DS-BACKLOG-007 | Formulaires | Checkbox | 10 contrôles compatibles canoniques et nommés ; disabled, labels et exceptions sémantiques conservés | completed | P1 | moyen | M | Accessibility |
| DS-BACKLOG-008 | États | Loading / Empty / Error | Cartographier puis extraire les états répétés | not-started | P1 | moyen | L | Card, Accessibility |
| DS-BACKLOG-009 | Actions | Button | Sprint Famille : contrat, inventaire, ExternalButton et LoadMoreButton | validated | P1 | élevé | M | Badge validé |
| DS-BACKLOG-010 | Surfaces | Card | 386 racines classées ; 20 surfaces sûres migrées, 115 usages canoniques et exceptions métier documentées | completed | P1 | élevé | L | Responsive vérifié localement sur 3 viewports |
| DS-BACKLOG-011 | Overlays | Modal | 38 cas courants ; A22/B0/C0/D10/E6/F0 après stabilisation, API publique inchangée et exceptions métier documentées | completed | P1 | élevé | L | Accessibility, Button |
| DS-BACKLOG-012 | Qualité transverse | Responsive | Définir les matrices de viewports par famille | planned | P0 | moyen | M | Aucune |
| DS-BACKLOG-013 | Qualité transverse | Accessibility | 95 contrôles inventoriés, 43 vérifiés au runtime et 18 défauts sûrs corrigés | validated | P0 | élevé | L | Sprint Field validé |
| DS-BACKLOG-014 | Qualité transverse | Motion | Inventorier animations et reduced motion | not-started | P1 | moyen | M | Accessibility |
| DS-BACKLOG-015 | Synchronisation | Figma Sync | Aligner tokens, primitives et variantes validés | not-started | P2 | moyen | L | Familles stabilisées |
| DS-BACKLOG-016 | Maintenance | Cleanup final | Supprimer code mort et façades devenues inutiles | not-started | P2 | élevé | L | Toutes migrations validées |
| DS-BACKLOG-017 | Overlays | Modal Stabilisation | Titre/description reliés, overlay hors tab order, focus renforcé et motion réduite sur AdminVersionHistoryDialog | completed | P1 | élevé | M | DS-BACKLOG-011 |
| DS-BACKLOG-018 | Foundations | Color System | 5 179 usages classés ; couverture générique 46,4 % → 91,0 %, 1 504 hardcodes génériques retirés, 66 scénarios dark/light validés | completed | P0 | élevé | L | Card, Modal, Button, Badge, Field |

## Prochaine priorité proposée

**Loading / Empty / Error**, non lancé (`DS-BACKLOG-008`) : cartographier les états répétés, distinguer le générique du métier puis extraire uniquement les contrats démontrés. `DS-BACKLOG-012` Responsive reste `planned` au niveau transverse ; les matrices locales Card, Color System et Select + Checkbox ne prétendent pas clore ce chantier global.
