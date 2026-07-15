# Plan de migration — Famille Modal

Ce plan a été écrit après l’inventaire, le test statique 7/7 et la baseline visuelle, avant toute décision de modification source.

## Objectif et invariants

Consolider tous les cas strictement sûrs sans modifier l’API publique de `Modal`, le rendu, les interactions, le responsive, les thèmes, la motion ou la logique métier. Aucun token, variante ou comportement global ne peut être ajouté.

## Préconditions vérifiées

- working tree inspecté et collisions inventoriées ;
- `Modal` et ses 11 instances canoniques caractérisés ;
- 25 cas runtime classés ;
- baseline dark/light aux trois viewports ;
- ouverture, fermeture, Escape, overlay, Tab/Shift+Tab, focus, retour, scroll et reduced motion mesurés ;
- artefacts hors `public/` dans `test-results/design-system-modal-family/`.

## Décision par classe

### A — 11 cas

Ils utilisent déjà `Modal`. Aucune modification ni refactor adjacent. Les wrappers métier et leurs API restent en place.

### B — 0 cas

Aucun cas legacy ne satisfait simultanément l’équivalence de DOM, styles, z-index, ouverture/fermeture, focus, scroll, motion et responsive. Le lot de migration source est donc vide.

### C — 10 cas

Conserver EventEditor, EventDetail, Collections, DetailModal, preview imbriquée, drawer et quatre confirmations natives. Toute conversion toucherait une logique métier, un formulaire lourd, un dialog complexe, le nesting ou un contrat synchrone.

### D — 4 cas

- `AdminVersionHistoryDialog` : candidat historique invalidé par son anatomie et son exit motion ;
- `ImportModal` Events : wrapper simple en apparence, mais palette, niveau, structure et comportement différents, avec collision de fichier ;
- `SourceHistoryModal` et `DataDeployHistoryModal` : proches visuellement, mais l’overlay ne ferme pas et focus/Escape/scroll lock sont absents.

Ils restent documentés. Aucune adaptation locale ne peut neutraliser les comportements imposés par `Modal` sans changer son API.

## Conditions d’arrêt activées

La migration des quatre cas D demanderait au moins un contrat de header custom, overlay non fermant, motion/exit, niveau d’overlay ou scroll mode. Cela constitue une extension d’API ou une modification comportementale. Le sprint arrête donc chaque migration concernée et poursuit uniquement l’audit, les tests et la documentation.

Les fichiers Events, Collections et plusieurs consommateurs canoniques étaient déjà modifiés. Ils restent en lecture seule pour ce sprint.

## Lot d’implémentation

Fichiers source à modifier : aucun.

Primitive à modifier : aucune.

Wrappers à migrer : aucun.

Fichiers autorisés : tests, documents de sprint et mise à jour programme ciblée après validation.

## Validation prévue

1. `node --test scripts/test-design-system-modal-family.mjs` ;
2. `npm run typecheck` ;
3. ESLint ciblé sur les scripts et documents/source inspectés pertinents ;
4. `node scripts/verify-design-system-modal-family.mjs` ;
5. `git diff --check` ;
6. reload final dans le navigateur intégré ;
7. audit final du working tree et distinction des changements concurrents.

## Rollback local

Aucune source applicative n’étant modifiée, aucun rollback de composant n’est nécessaire. En cas de problème dans le banc, retirer uniquement les deux scripts Modal et le dossier documentaire `sprints/modal/`; les artefacts ignorés peuvent être supprimés séparément. Ne toucher à aucun changement concurrent, à aucune façade et à aucun fichier source.

## Sprint suivant unique proposé, non lancé

**Sprint Stabilisation Modal legacy — politique d’overlay, nom accessible et motion de `AdminVersionHistoryDialog`.** Il doit décider explicitement si une évolution minimale et compatible de l’API est autorisée, caractériser `aria-labelledby`/`aria-describedby`, overlay closable, niveaux et exit motion, puis ne migrer un pilote que si l’équivalence devient prouvable.
