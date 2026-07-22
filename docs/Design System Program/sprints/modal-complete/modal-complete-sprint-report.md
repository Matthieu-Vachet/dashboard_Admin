# Rapport final — Sprint Modal complet

Date de clôture : 22 juillet 2026. Statut : `completed`.

## 1. Inspection et working tree

Le working tree était propre au démarrage. Aucun changement concurrent n’a été détecté sur `Modal` ou les fichiers ciblés. Les chemins `docs/codex/` du prompt avaient été déplacés : les sources canoniques actuelles se trouvent sous `docs/`, et l’audit sous `docs/Reports/Audits/design-system-audit/roadmap/`.

Le code réel a évolué depuis le sprint du 14 juillet : les 11 usages historiques sont toujours présents, mais la primitive compte désormais 22 instances directes dans 14 fichiers. Le sprint complet utilise ces nombres courants sans réécrire le rapport historique.

## 2. Inventaire et classification

38 cas runtime ont été vérifiés : 22 instances canoniques, 10 dialogs spécialisés, deux drawers/sheets et quatre confirmations natives.

| Classe | Avant | Après | Résultat |
|---|---:|---:|---|
| A — canonique correct | 0 | 22 | les consommateurs héritent du contrat stabilisé |
| B — canonique à stabiliser | 22 | 0 | correction centralisée dans la primitive |
| C — wrapper simple migrable | 0 | 0 | aucune équivalence stricte trouvée |
| D — spécialisé | 10 | 10 | composants conservés ; défauts locaux certains seulement |
| E — autre pattern | 6 | 6 | drawers/sheets et confirmations conservés |
| F — ambigu | 0 | 0 | aucun cas non classé |

Aucun wrapper n’a été migré et aucun fichier consommateur canonique n’a dû être modifié.

## 3. Contrat avant et après

L’API publique reste exactement `open`, `title`, `description?`, `children`, `footer?`, `className?`, `onClose`. Aucun token, prop, variant, niveau, texte métier ou dépendance n’a été ajouté. Les classes de la primitive, sa structure visible, ses dimensions, son responsive et son absence de motion restent inchangés.

Avant, le dialog était nommé par `aria-label={title}`, sa description visible n’était pas reliée, l’overlay était un bouton focusable hors de la section, le focus n’avait pas de fallback sans contrôle et le trap ne récupérait pas un focus déplacé derrière le dialog.

Après validation :

- `useId` relie le `h2` par `aria-labelledby` et la description réelle par `aria-describedby` ;
- l’overlay conserve le clic de fermeture et le rendu, mais devient décoratif et sort du tab order ;
- la section `tabIndex={-1}` fournit le fallback de focus ;
- le trap récupère un focus déplacé hors du dialog ;
- Escape, close, clic overlay, retour du focus, scroll lock/restauration, body scrollable et footer restent contractuels.

## 4. Cas spécialisés

Neuf surfaces spécialisées ont reçu des corrections locales dans six fichiers : les deux dialogs Events Editor/Import, Event Detail, Collections, Admin Version History, Source History, Data Deploy History, DetailModal Pokémon et sa preview asset imbriquée.

Les corrections portent uniquement sur rôle/nom/description accessibles et libellé du bouton close, sauf `AdminVersionHistoryDialog`, qui reçoit aussi focus initial, trap, retour, Escape, scroll lock et respect de `prefers-reduced-motion`. Sa motion reste 180 ms en mode normal et 0 ms en mode réduit. Il ne compose pas `Modal` et conserve ses classes, couches et anatomie.

Game Master, les deux surfaces de navigation et les quatre confirmations natives restent inchangés. Les niveaux locaux 30/40/50/90/95/1100/1110/1120/1200 sont documentés, sans création d’un système global.

## 5. Fichiers

Fichiers source modifiés :

- `src/components/ui/modal.tsx` ;
- `src/components/admin/layout/admin-version-history-dialog.tsx` ;
- `src/components/admin/events/event-editor-modal.jsx` ;
- `src/components/admin/events/events-calendar-panel.jsx` ;
- `src/components/admin/pokemon/collections-panel.jsx` ;
- `src/components/admin/pokemon/source-watch-panel.tsx` ;
- `src/components/admin/pokemon/detail-modal.jsx`.

Fichiers créés : les six documents de `sprints/modal-complete/`, `scripts/test-design-system-modal-complete.mjs` et `scripts/verify-design-system-modal-complete.mjs`.

Documents existants mis à jour : backlog officiel, README du Programme, index des sprints et `DOC-010-design-system-overview.md`. `DOC-004-project-philosophy.md` n’est pas modifié : son inventaire des primitives et le contrat minimal de `Field` restent exacts.

## 6. Tests et preuves

| Vérification | Résultat |
|---|---|
| test statique baseline | 8/8 passants avant modification |
| `node --test scripts/test-design-system-modal-complete.mjs` | 8/8 passants après modification |
| `npm run typecheck` | passant, zéro erreur |
| ESLint ciblé | zéro erreur ; 20 warnings `no-img-element` préexistants et hors périmètre |
| vérification Playwright | 48 scénarios référencés, 46 exécutés, 2 skips desktop attendus pour la navigation mobile |
| styles et pixels | 0 différence significative avant/après |
| thèmes/viewports | dark et light ; 375×812, 768×1024, 1440×1000 |
| runtime | zéro erreur React, zéro erreur console, zéro overflow horizontal |

Les scénarios couvrent une Modal canonique Kanban, un formulaire/footer Identity, un contenu long Learning, Admin Version History, Events Import, Collections, Source History et la navigation Admin mobile. Les preuves vérifient titres/descriptions, IDs, overlay, focus initial, Tab/Shift+Tab, Escape, close, retour du focus, scroll lock, reduced motion, responsive, styles calculés et captures.

Les artefacts JSON et PNG sont conservés dans `test-results/design-system-modal-complete/`, ignoré par Git et absent de `public/`.

## 7. Écarts et risques ouverts

Aucune régression visuelle, métier, responsive ou de contrat n’est détectée. Aucun changement concurrent n’est apparu pendant le sprint.

Les limites restantes concernent les composants spécialisés, pas le contrat canonique : focus/scroll non harmonisés sur Events, Collections, Source/Data et DetailModal Pokémon ; focus nested non coordonné pour la preview asset ; focus initial/trap/retour incomplets sur Game Master ; niveaux de z-index volontairement locaux. Elles ne justifient pas un nouveau micro-sprint Modal et ne doivent évoluer qu’avec une refonte métier explicite ou un bug reproductible.

## 8. Rollback

Le rollback est local : annuler uniquement les ajouts de contrat dans les sept fichiers source, retirer les deux scripts et le dossier `modal-complete/`, puis annuler les quatre mises à jour documentaires existantes. Les 22 consommateurs canoniques ne nécessitent aucune modification individuelle. Ne toucher à aucun autre fichier.

## 9. Programme et suite

`DS-BACKLOG-011` et `DS-BACKLOG-017` sont `completed`. Badge, Button, Field, Input, Textarea et Accessibilité conservent leurs statuts ; `Field` reste une primitive minimale label + enfant. Aucun sprint Modal supplémentaire n’est planifié hors bug nouveau.

Prochain sprint de famille recommandé, non lancé : **Sprint Famille Card** (`DS-BACKLOG-010`), après satisfaction de sa dépendance Responsive (`DS-BACKLOG-012`).

Sprint Modal complet validé : la primitive Modal, ses 11 consommateurs canoniques historiques — désormais 22 instances canoniques dans le code courant — et les défauts sûrs des cas spécialisés ont été stabilisés sans régression détectée.

Aucun commit, push ou déploiement n’a été effectué.
