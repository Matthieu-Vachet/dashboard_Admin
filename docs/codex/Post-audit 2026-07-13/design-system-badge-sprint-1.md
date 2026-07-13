# Sprint 1 Design System — migration Badge sur le Kanban

Date d’exécution : 13 juillet 2026  
Primitive : Badge — MWI-COMP-317  
Route pilote : `/kanban`

## Conclusion

Sprint 1 validé : exactement deux libellés de catégorie Kanban utilisent désormais Badge, sans modification de l’API de Badge et sans régression détectée.

## Inspection initiale

Le premier `git status --short` était vide : le working tree était propre au début de cette mission. Aucun fichier concurrent ni collision n’a donc été détecté sur le périmètre autorisé.

Contrats confirmés avant modification :

- import canonique déjà présent : `@/components/ui/badge` ;
- `Badge` rend un `<span>` et accepte `HTMLAttributes<HTMLSpanElement>` ;
- squelette : `inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black` ;
- `cn` compose `clsx` puis `twMerge` ;
- catégories inchangées :
  - `Produit`: `border-brand-2/30 bg-brand-2/10 text-cyan-100` ;
  - `Design`: `border-brand/30 bg-brand/10 text-violet-100` ;
  - `API`: `border-brand-3/30 bg-brand-3/10 text-emerald-100` ;
  - `Ops`: `border-warning/35 bg-warning/10 text-amber-100` ;
  - `Urgent`: `border-danger/35 bg-danger/10 text-rose-100` ;
- les deux libellés initiaux étaient des `<span>` dans `KanbanTaskCard` et `KanbanTaskPreview` ;
- les boutons de catégorie de la modale étaient et restent des `<button type="button">` ;
- priorités, statuts, dates, progression, tags, points et actions étaient et restent hors périmètre.

Le code courant était conforme au plan d’audit ; aucune condition d’arrêt n’a été déclenchée.

## Modifications

### Source

Un seul fichier source a été modifié :

- `src/components/admin/forms/kanban-board.tsx` : remplacement de deux `<span>` par deux usages strictement identiques de :

```tsx
<Badge className={categoryStyles[task.category]}>
  {task.category}
</Badge>
```

Le diff source contient 4 insertions et 4 suppressions. Aucun import n’a été ajouté : `Badge` était déjà utilisé dans le fichier. `src/components/ui/badge.tsx`, `src/lib/cn.ts`, les tokens, Tailwind et `globals.css` n’ont pas été modifiés.

### Tests et artefacts

Fichiers créés :

- `scripts/test-design-system-badge.mjs` ;
- `scripts/verify-design-system-badge.mjs` ;
- `test-results/design-system-badge/baseline.json` ;
- `test-results/design-system-badge/after.json` ;
- `test-results/design-system-badge/comparison.json` ;
- 28 captures avant/après dans `test-results/design-system-badge/before/` et `after/` ;
- le présent rapport.

Le démarrage de `next dev` a automatiquement remplacé une référence dans `next-env.d.ts`. Cette modification générée par l’environnement a été remise exactement à son contenu initial après l’arrêt du serveur ; elle est absente du diff final.

## Tests exécutés

| Validation | Résultat |
|---|---|
| Test statique avant migration | 6/6 passés |
| Test statique après migration | 6/6 passés |
| `npm run typecheck` | passé |
| lint ciblé Kanban + Badge | passé |
| Playwright ciblé `/kanban` | passé, 0 différence |
| Erreurs console | 0 avant, 0 après |
| Erreurs React/page | 0 avant, 0 après |
| Overflow horizontal | 0 px sur les 6 combinaisons |
| Tab order | strictement identique |
| `prefers-reduced-motion` | route et cartes fonctionnelles |

Commandes finales :

```bash
node --test scripts/test-design-system-badge.mjs
npm run typecheck
npx eslint src/components/admin/forms/kanban-board.tsx src/components/ui/badge.tsx
node scripts/verify-design-system-badge.mjs
```

## Dark, light et responsive

Les thèmes dark et light ont été testés aux dimensions suivantes :

- 375 × 812 ;
- 768 × 1024 ;
- 1440 × 1000.

Pour chaque combinaison, le script a capturé le Kanban chargé et la modale d’édition. Le DragOverlay a aussi été capturé sur desktop dans les deux thèmes. Les 14 paires de captures avant/après ont des empreintes SHA-256 strictement identiques.

Artefacts principaux :

- [baseline complète](../../../test-results/design-system-badge/baseline.json) ;
- [mesures après migration](../../../test-results/design-system-badge/after.json) ;
- [comparaison](../../../test-results/design-system-badge/comparison.json) ;
- [dark desktop avant](../../../test-results/design-system-badge/before/dark-desktop-loaded.png) et [après](../../../test-results/design-system-badge/after/dark-desktop-loaded.png) ;
- [light mobile modale avant](../../../test-results/design-system-badge/before/light-mobile-modal.png) et [après](../../../test-results/design-system-badge/after/light-mobile-modal.png).

## Styles calculés

Les cinq catégories ont été mesurées dans les deux thèmes et aux trois viewports. Chaque propriété avant/après est identique.

Valeurs structurelles communes :

| Propriété | Valeur calculée |
|---|---|
| display | `flex` — valeur calculée de `inline-flex` |
| min-height | `28px` |
| padding-left/right | `10px` |
| padding-top/bottom | `0px` |
| border-radius | `3.35544e+07px` — rendu de `rounded-full` |
| border-width | `1px` |
| font-size | `12px` |
| font-weight | `900` |
| line-height | `16px` |

Les valeurs calculées de `border-color`, `background-color` et `color` propres à Produit, Design, API, Ops et Urgent sont conservées sans différence. Elles sont consignées intégralement dans `baseline.json` et `after.json`.

## Accessibilité et interactions

- les deux nouveaux usages rendent toujours des `<span>` non interactifs ;
- aucun élément n’a été ajouté au tab order ;
- le tab order avant/après est identique ;
- les cinq boutons de catégorie de la modale restent des boutons natifs et répondent au clavier ;
- le clic sur le contenu d’une carte et l’action Modifier ouvrent toujours la modale ;
- l’état sélectionné de la carte est toujours appliqué ;
- la demande et la confirmation de suppression fonctionnent dans le contexte Playwright isolé ;
- les textes de catégorie sont inchangés ;
- le DragOverlay apparaît et ses captures avant/après sont identiques ;
- les handlers DnD, animations et règles `prefers-reduced-motion` ne figurent pas dans le diff.

## Limites et écarts d’environnement

- La commande `agent-browser` n’était pas installée ; le projet fournit Playwright 1.61.0, utilisé directement comme fallback.
- Une première connexion via `127.0.0.1` a été refusée par le contrôle same-origin de l’environnement Next. Le script utilise `localhost`, sans modifier la configuration de l’application.
- Le déplacement inter-colonnes complet n’a pas pu être déclenché de manière fiable en headless : après trois tentatives, la colonne cible ne passait pas à `isOver`. Cette limite est enregistrée dans `after.json`. L’activation du drag, le DragOverlay et son rendu avant/après sont cependant vérifiés dans les deux thèmes desktop.
- Le stockage `/api/dashboard-store` a été intercepté pendant les tests ; aucune donnée Kanban utilisateur n’a été écrite ou supprimée.
- Aucune erreur préexistante de typecheck, lint, console ou React n’a été observée dans le périmètre testé.

## Rollback

Le rollback reste local : remplacer les deux usages de `Badge` par les deux `<span>` initiaux avec leur appel `cn`. L’import `Badge` doit rester, car le fichier l’utilisait déjà ailleurs avant ce sprint. Aucun changement de données, token, API ou compatibilité n’est nécessaire.

Aucun commit, push ou déploiement n’a été effectué.
