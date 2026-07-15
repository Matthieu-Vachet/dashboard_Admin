# Plan d’implémentation — Sprint 1 Badge sur Kanban

## Statut et objectif

Ce plan est prêt à être utilisé comme base du prochain prompt d’implémentation. Il ne fait partie d’aucune modification source actuelle.

Objectif unique : prouver la méthode de consolidation sur deux badges statiques de catégorie du Kanban, avec une surface de rollback minimale et aucune différence visuelle ou fonctionnelle.

Le candidat retenu est `Badge` (MWI-COMP-317). Il offre un meilleur rapport valeur/risque que `Button`, `Card`, `Input`/`Textarea`, `Modal` ou les états génériques : il est non interactif, déjà largement consommé, ses six tons sont finis, et le Kanban duplique exactement son squelette de classes à deux endroits.

Taille estimée : **S**. Risque : **faible**, sous réserve des validations visuelles dark/light.

## Périmètre exact

À migrer :

- le libellé de catégorie dans `KanbanTaskCard` ;
- le libellé de catégorie dans `KanbanTaskPreview` ;
- uniquement les deux éléments situés actuellement autour des lignes 674 et 757 de `src/components/admin/forms/kanban-board.tsx` ;
- conservation stricte de `categoryStyles` et de ses cinq valeurs actuelles.

À ne pas migrer :

- les boutons de sélection de catégorie dans la modale ;
- les boutons de priorité ;
- les pills de priorité, statut, date, progression, tags ou points ;
- `EventBadge`, les badges Pokémon, les pills de raid/œuf/max, les types, la météo et les attaques ;
- aucune autre page ;
- aucune modification de l’API publique de `Badge` dans ce sprint ;
- aucun token global, rayon, espacement ou style de thème.

## Fichiers concernés

Fichier source à modifier :

- `src/components/admin/forms/kanban-board.tsx`

Fichier source à inspecter mais normalement à ne pas modifier :

- `src/components/ui/badge.tsx`
- `src/lib/cn.ts`

Fichiers de test probables à créer lors du sprint d’implémentation :

- `scripts/test-design-system-badge.mjs` pour les contrats statiques ciblés ;
- `scripts/verify-design-system-badge.mjs` pour la vérification Playwright et les screenshots, ou extension minimale d’un script visuel existant si celui-ci isole bien `/kanban`.

Documentation à mettre à jour après validation :

- `docs/codex/Tome 1 — Foundation (Fondations)/DOC-010-design-system-overview.md` ;
- addendum post-audit du composant `Badge` et du Kanban dans `docs/codex/Post-audit 2026-07-13/`, avec un ID documentaire attribué par le registre officiel ;
- registre courant des composants si un mécanisme de régénération existe ;
- ne pas réécrire les 325 fiches historiques de `design-system-audit/components/`.

## Pages pilotes

Page pilote unique :

- `/kanban`

États à capturer :

- board chargé avec au moins une carte pour chacune des cinq catégories ;
- carte normale ;
- carte sélectionnée ;
- drag preview visible ;
- modale d’édition ouverte, afin de confirmer que ses boutons de catégorie n’ont pas été modifiés ;
- thèmes dark et light ;
- largeurs 375 px, 768 px et 1440 px.

## Tests à écrire avant toute modification

### 1. Test statique de caractérisation

Écrire un test Node ciblé qui échoue si les faits suivants changent :

- `Badge` conserve le squelette `inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black` ;
- `categoryStyles` conserve exactement les cinq mappings actuels ;
- `KanbanTaskCard` et `KanbanTaskPreview` contiennent chacun un libellé de catégorie ;
- les boutons de catégorie de la modale restent des `<button>` et ne deviennent pas des `Badge` ;
- les styles de priorité restent hors périmètre.

Le test doit vérifier un contrat utile, pas une réécriture textuelle complète du fichier.

### 2. Baseline visuelle

Avant modification, démarrer l’application dans l’environnement de test existant et capturer `/kanban` :

- dark : 375 × 812, 768 × 1024, 1440 × 1000 ;
- light : mêmes trois viewports ;
- une capture du drag preview sur desktop si Playwright peut déclencher le drag de façon stable ;
- une capture de la modale d’édition ouverte.

Stocker les baselines comme artefacts du sprint, pas dans `public/`.

### 3. Baseline de styles calculés

Pour chaque catégorie (`Produit`, `Design`, `API`, `Ops`, `Urgent`), relever sur le badge d’une carte :

- `display` ;
- `min-height` ;
- paddings horizontal et vertical ;
- `border-radius`, largeur et couleur de bordure ;
- couleur de fond ;
- couleur de texte ;
- taille et poids de police ;
- hauteur de ligne.

Répéter le relevé en dark et light. Cette comparaison est le critère principal de “zéro changement visuel”.

## Étapes d’implémentation

1. Faire passer les tests et captures de caractérisation sur le code avant migration.
2. Remplacer le `<span>` de catégorie de `KanbanTaskCard` par `Badge`.
3. Remplacer le `<span>` de catégorie de `KanbanTaskPreview` par `Badge`.
4. Passer `categoryStyles[task.category]` via `className` afin que `cn`/`tailwind-merge` conserve les valeurs exactes, notamment les différences `/10` et `/12` entre catégories.
5. Ne pas ajouter de ton générique ou métier à `Badge` : `Produit`, `Design`, `API`, `Ops` et `Urgent` ne sont pas des tons Design System.
6. Ne pas déplacer `categoryStyles` et ne pas renommer les composants métier.
7. Exécuter les tests statiques, le typecheck et le lint ciblé.
8. Rejouer les captures et la comparaison des styles calculés.
9. Mettre à jour la documentation seulement après validation visuelle.

Forme d’implémentation attendue, à confirmer par les tests :

```tsx
<Badge className={categoryStyles[task.category]}>
  {task.category}
</Badge>
```

Cette forme réutilise la structure de `Badge` sans transformer les catégories Kanban en variantes globales.

## Vérifications fonctionnelles et d’accessibilité

- Le libellé reste un élément non interactif de type `span` dans le DOM.
- Le texte de catégorie reste visible et identique.
- Le clic sur la carte continue d’ouvrir la modale.
- Les poignées drag, edit et delete conservent leurs actions et noms accessibles.
- Le drag preview conserve dimensions et couleurs.
- La sélection de catégorie dans la modale reste pilotable au clavier.
- Aucun focus supplémentaire n’est créé par le badge.
- Aucun changement de tab order.
- Aucun changement sous `prefers-reduced-motion`.

## Commandes de validation attendues

Depuis la racine de `Dashboard Admin` :

```text
node --test scripts/test-design-system-badge.mjs
npm run typecheck
npx eslint src/components/admin/forms/kanban-board.tsx src/components/ui/badge.tsx
node scripts/verify-design-system-badge.mjs
```

Le script Playwright doit signaler les erreurs console, les débordements horizontaux et les différences de styles calculés, en plus de produire les screenshots.

## Documentation de sortie

Documenter :

- responsabilité de `Badge` : étiquette statique et non interactive ;
- tons canoniques existants : `cyan`, `violet`, `green`, `amber`, `red`, `neutral` ;
- règle : les valeurs métier restent dans le composant métier et peuvent surcharger le ton par `className` seulement pour préserver un rendu existant ;
- règle : un chip sélectionnable ou un toggle n’est pas un `Badge` ;
- preuve du pilote : deux duplications structurelles supprimées, zéro variation ajoutée, zéro changement visuel mesuré.

Ne pas attribuer un nouvel ID `COMP-*` ou `MWI-COMP-*` à la main. Utiliser le registre documentaire officiel ou marquer l’addendum “ID à attribuer”.

## Critères d’acceptation

- Exactement deux libellés de catégorie migrés.
- Aucun autre élément Kanban migré.
- Aucune modification de `Badge` nécessaire ; si une modification devient nécessaire, arrêter le sprint et réévaluer le périmètre.
- Styles calculés identiques pour les cinq catégories en dark et light.
- Screenshots acceptés aux trois largeurs.
- Typecheck, lint ciblé et tests de caractérisation réussis.
- Interactions Kanban, sélection, drag et ouverture de modale inchangées.
- Documentation mise à jour et limitée aux faits validés.
- Aucun chemin de compatibilité supprimé.

## Risques et parades

| Risque | Parade |
|---|---|
| `tailwind-merge` choisit une autre classe de couleur | Comparer les styles calculés par catégorie et thème avant/après. |
| Le `Badge` ajoute une hauteur ou un padding différent | Le squelette actuel est identique ; le test statique et les styles calculés le confirment. |
| Une catégorie devient une variante globale par commodité | Interdiction explicite d’ajouter des tons Kanban à `Badge`. |
| Le sprint s’étend aux pills de priorité/statut | Hors périmètre explicite ; créer un backlog séparé après le pilote. |
| Le drag preview est difficile à capturer | Conserver au minimum un test de styles calculés sur `KanbanTaskPreview` monté et une inspection manuelle documentée. |

## Plan de rollback

Rollback immédiat et local :

1. remplacer les deux usages de `Badge` par leurs deux `<span>` initiaux ;
2. supprimer uniquement les tests et artefacts créés pour ce pilote s’ils n’apportent plus de valeur ;
3. restaurer l’addendum documentaire du sprint ;
4. rejouer le typecheck et la page `/kanban` ;
5. ne toucher à aucun état persistant Kanban : cette migration ne change ni données ni schéma.

Le rollback ne requiert ni migration de données, ni modification d’API, ni suppression de compatibilité.
