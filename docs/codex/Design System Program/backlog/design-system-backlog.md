# Backlog officiel du programme Design System

Statuts autorisés : `not-started`, `observing`, `planned`, `in-progress`, `blocked`, `validated`, `completed`.

| ID | Epic | Famille | Tâche | Statut | Priorité | Risque | Taille | Dépendances |
|---|---|---|---|---|---|---|---|---|
| DS-BACKLOG-001 | Consolidation | Badge | Sprint pilote Kanban : deux catégories | validated | P0 | faible | S | Audit et matrices |
| DS-BACKLOG-002 | Consolidation | Badge | Sprint Famille : inventaire et cas sûrs | validated | P0 | faible | M | DS-BACKLOG-001 |
| DS-BACKLOG-003 | Formulaires | Field | Anatomie auditée, primitive minimale créée, 29 racines sûres composées | validated | P1 | moyen | M | Badge validé |
| DS-BACKLOG-004 | Formulaires | Input | Entrées textuelles auditées et cas Field sûrs consolidés | validated | P1 | moyen | M | DS-BACKLOG-003 |
| DS-BACKLOG-005 | Formulaires | Textarea | Zones multiligne auditées et cas Field sûrs consolidés | validated | P1 | moyen | S | DS-BACKLOG-003 |
| DS-BACKLOG-006 | Formulaires | Select | Inventorier natif et custom sans composant universel | not-started | P1 | élevé | L | DS-BACKLOG-003 |
| DS-BACKLOG-007 | Formulaires | Checkbox | Stabiliser sémantique, focus et états | not-started | P1 | moyen | M | Accessibility |
| DS-BACKLOG-008 | États | Loading / Empty / Error | Cartographier puis extraire les états répétés | not-started | P1 | moyen | L | Card, Accessibility |
| DS-BACKLOG-009 | Actions | Button | Sprint Famille : contrat, inventaire, ExternalButton et LoadMoreButton | validated | P1 | élevé | M | Badge validé |
| DS-BACKLOG-010 | Surfaces | Card | Classer primitive, composites et cartes métier | planned | P1 | élevé | L | Responsive |
| DS-BACKLOG-011 | Overlays | Modal | 25 cas classés A11/B0/C10/D4 ; contrat et baseline validés, aucun legacy strictement équivalent | validated | P1 | élevé | L | Accessibility, Button |
| DS-BACKLOG-012 | Qualité transverse | Responsive | Définir les matrices de viewports par famille | planned | P0 | moyen | M | Aucune |
| DS-BACKLOG-013 | Qualité transverse | Accessibility | 95 contrôles inventoriés, 43 vérifiés au runtime et 18 défauts sûrs corrigés | validated | P0 | élevé | L | Sprint Field validé |
| DS-BACKLOG-014 | Qualité transverse | Motion | Inventorier animations et reduced motion | not-started | P1 | moyen | M | Accessibility |
| DS-BACKLOG-015 | Synchronisation | Figma Sync | Aligner tokens, primitives et variantes validés | not-started | P2 | moyen | L | Familles stabilisées |
| DS-BACKLOG-016 | Maintenance | Cleanup final | Supprimer code mort et façades devenues inutiles | not-started | P2 | élevé | L | Toutes migrations validées |
| DS-BACKLOG-017 | Overlays | Modal Stabilisation | Décider overlay closable, nom accessible et motion sur le pilote AdminVersionHistoryDialog | planned | P1 | élevé | M | DS-BACKLOG-011 |
