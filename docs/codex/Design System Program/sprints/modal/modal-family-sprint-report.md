# Rapport — Sprint Famille Modal

Date d’exécution : 14 juillet 2026. Type : Sprint Famille.

## 1. Résumé

Le code courant contient 25 cas runtime de la famille : 11 instances utilisent déjà `Modal`, aucun wrapper legacy n’est strictement migrable, 10 cas sont spécialisés et 4 restent ambigus/incompatibles. Le lot source est volontairement vide : une migration de `AdminVersionHistoryDialog`, Import Events ou des historiques Pokémon demanderait une nouvelle API ou changerait motion, fermeture, focus, scroll, DOM ou rendu.

La primitive, son API, les wrappers métier, les façades, les tokens et les styles restent inchangés.

## 2. Inspection initiale et working tree

Le premier `git status --short` montrait le backlog et l’index des sprints du programme modifiés par le sprint Accessibilité, quatorze sources de ce sprint précédent, deux routes API Pokémon modifiées et trois nouveaux fichiers Pokémon. Tous ont été préservés.

Pendant la mission, le travail concurrent s’est étendu à `CHANGELOG.md`, `docs/RANKED-DATASETS.md`, `docs/codex/README.md`, `package.json`, `package-lock.json`, `src/data/app-version.ts`, `src/data/dashboard-version-history.ts`, plusieurs panels Pokémon supplémentaires, un nouveau dossier Post-audit et de nouveaux composants Pokémon. Les fichiers Events, Collections, Shiny et Dashboard Backlog déjà inspectés sont restés en lecture seule pour le sprint Modal.

Le démarrage de Next a modifié `next-env.d.ts`; cette seule modification générée par l’environnement est remise à son contenu initial après l’arrêt du serveur. Aucun reset, restore, checkout, clean ou reformatage global n’est utilisé.

`src/components/ui/modal.tsx` était propre et conforme au contrat post-audit réel. La fiche historique est partiellement obsolète : le code gère désormais focus initial, trap Tab/Shift+Tab et retour du focus.

## 3. Inventaire et classification

| Mesure | Total |
|---|---:|
| Cas runtime | 25 |
| A — déjà sur `Modal` | 11 |
| B — migration strictement sûre | 0 |
| C — spécialisés | 10 |
| D — ambigus/incompatibles | 4 |
| Consommateurs directs de la primitive | 10 fichiers |
| Instances directes de la primitive | 11 |
| Confirmations natives | 4 |
| Façades de compatibilité conservées | 3 |

L’inventaire détaillé couvre éditions, previews, imports, historiques, EventDetail, DetailModal Pokémon, preview imbriquée, drawer mobile et confirmations natives. Les overlays décoratifs et previews inline sont explicitement exclus.

## 4. Contrat constaté

`Modal` fournit portal, `role="dialog"`, `aria-modal`, nom par `aria-label={title}`, Escape, overlay fermant, bouton de fermeture, focus initial, trap Tab/Shift+Tab, retour du focus et scroll lock/restauration. Le rendu est borné à `92dvh`, le body est scrollable et les paddings évoluent à `sm`.

Limites conservées : aucun `aria-labelledby`, `aria-describedby`, size union, scroll mode, header custom, overlay non fermant, animation d’entrée/sortie, niveau d’overlay ou politique nested. Le bouton d’overlay est focusable et se trouve hors de la `section` dialog.

## 5. Migrations et wrappers conservés

Nombre exact d’éléments migrés : **0**.

Cette valeur est le résultat attendu de l’application de la règle « en cas de doute, ne pas migrer » :

- les 11 usages sûrs composent déjà `Modal` ;
- `AdminVersionHistoryDialog` conserve son exit motion, header/eyebrow, largeur, rayon et scroll propres ;
- `EventEditorModal` est un formulaire lourd et `ImportModal` Events diffère en palette, niveau et contrat accessible ; les deux sont dans un fichier déjà modifié ;
- EventDetail, Collections, DetailModal Pokémon, preview nested et drawer restent spécialisés ;
- SourceHistory et DataDeployHistory ne ferment pas sur overlay et n’ont ni focus management, Escape, scroll lock ni nom de dialog ;
- les quatre `window.confirm` conservent leur contrat synchrone.

`src/components/ui/modal.tsx`, tous les fichiers applicatifs et toutes les façades sont absents du diff de cette mission.

## 6. Fichiers créés et modifiés

Fichiers créés :

- `docs/codex/Design System Program/sprints/modal/README.md` ;
- `modal-family-inventory.md` ;
- `modal-contract-analysis.md` ;
- `modal-family-migration-plan.md` ;
- le présent rapport ;
- `scripts/test-design-system-modal-family.mjs` ;
- `scripts/verify-design-system-modal-family.mjs`.

Fichiers programme modifiés par patch ciblé :

- `docs/codex/Design System Program/README.md` ;
- `docs/codex/Design System Program/backlog/design-system-backlog.md` ;
- `docs/codex/Design System Program/sprints/README.md`.

Documents Foundation réellement impactés et corrigés de manière ciblée :

- `DOC-004-project-philosophy.md` : ajout de la primitive minimale `Field` à l’état observé ;
- `DOC-010-design-system-overview.md` : statistiques UI actualisées et contrat de focus de la primitive `Modal` aligné sur les preuves du sprint.

Aucun fichier source TS/TSX/JS/JSX n’est modifié.

## 7. Tests et preuves

| Validation | Résultat |
|---|---|
| test statique avant décision | 7/7 passés |
| test statique final | 7/7 passés |
| `npm run typecheck` | passé, 0 erreur |
| ESLint scripts + primitive | passé, 0 erreur |
| Playwright | 36 scénarios, 34 exécutés et 2 skips drawer desktop attendus |
| dark/light | 2 thèmes validés |
| responsive | 375×812, 768×1024, 1440×1000 validés |
| comparaison | 0 différence de contrat, style, interaction ou pixel significatif |
| erreurs console | 0 |
| erreurs React/page | 0 |
| overflow horizontal | 0 |
| `git diff --check` | passé |

Le banc mesure 23 propriétés calculées sur les surfaces utiles et compare les captures avec un seuil de 8 unités par canal. Trois premiers hashes différaient de ±1 canal sans aucun pixel au-delà du seuil ; le script compare donc les pixels réels plutôt qu’un hash binaire fragile. Les animations Framer sont terminées par la capture avant la lecture des styles afin d’éviter de comparer un frame intermédiaire.

## 8. Interactions, focus et accessibilité

Sur l’instance canonique Kanban, les six combinaisons thème/viewport confirment : ouverture clavier, nom et modalité, focus initial interne, boucles Tab et Shift+Tab, fermeture Escape, fermeture overlay, fermeture bouton, retour du focus et restauration du scroll.

La matrice legacy caractérise sans les masquer :

- historique versions : role/nom présents, mais aucun focus initial, Escape ou scroll lock ; overlay fermant ;
- drawer : aucun rôle dialog, focus initial, Escape ou scroll lock ; overlay fermant ;
- Import Events : aucun rôle dialog, focus initial ou Escape ; overlay fermant ;
- Collections et historiques Sources : `aria-modal` présent, mais dialog sans nom, aucun focus initial/Escape et overlay non fermant.

Les corriger dans ce sprint serait une amélioration comportementale/accessibilité visible, pas une migration structurelle identique. Aucun nouveau focus, tab stop ou ordre de tabulation n’est introduit par la mission.

## 9. Motion, responsive et thèmes

La primitive n’a pas d’animation d’entrée/sortie ; aucun comportement ne dépend d’une animation. `AdminVersionHistoryDialog` conserve son fondu/translation/scale de 180 ms et le drawer son spring. Le viewport mobile est exécuté avec `prefers-reduced-motion: reduce`, tablette/desktop sans préférence ; aucune source motion n’est modifiée.

Dark et light sont validés aux trois viewports. Les overlays legacy volontairement sombres restent identiques en light. Les scrolls internes, hauteurs dynamiques, largeurs et surfaces sont inchangés.

## 10. Artefacts

`test-results/design-system-modal-family/` contient la baseline, le résultat après décision, la comparaison et les captures avant/après. Le dossier est ignoré par Git et rien n’est placé dans `public/`.

## 11. Écarts et risques ouverts

- Aucune migration B n’est disponible avec l’API actuelle.
- `Modal` nomme le dialog par `aria-label`, sans relier son titre ou sa description visibles.
- Les niveaux `1100`, `1120` et `1200` n’ont pas de politique nested commune.
- Plusieurs legacy ont des défauts accessibles réels ; ils sont documentés mais non corrigés pour respecter le rendu et les interactions actuels.
- Le working tree concurrent a continué d’évoluer pendant le sprint. Les validations Modal utilisent des fixtures réseau et des sources applicatives en lecture seule ; les changements concurrents ne sont ni restaurés ni attribués à cette mission.
- La checklist React ne déclenche aucune correction : aucun composant React n’a été modifié.

## 12. Rollback

Le rollback est documentaire et local : retirer uniquement les sept nouveaux fichiers du sprint Modal, puis annuler uniquement les ajouts Modal dans les deux index du Programme, le statut/texte de `DS-BACKLOG-011`, la ligne `DS-BACKLOG-017` et les corrections ciblées des deux documents Foundation. Aucun rollback source, token, API, donnée ou façade n’est nécessaire. Ne restaurer aucun autre changement du working tree.

## 13. Sprint suivant unique

Proposé et non lancé : **Sprint Stabilisation Modal legacy — politique d’overlay, nom accessible et motion de `AdminVersionHistoryDialog`** (`DS-BACKLOG-017`). Il doit décider explicitement l’évolution d’API autorisée avant toute migration.

## 14. Conclusion

Sprint Famille Modal validé. Aucun usage supplémentaire n’était strictement migrable. Les 11 usages canoniques ont été conservés et aucune modification source supplémentaire n’a été nécessaire. Aucune régression n’a été détectée.

Aucun commit, push ou déploiement n'a été effectué.
