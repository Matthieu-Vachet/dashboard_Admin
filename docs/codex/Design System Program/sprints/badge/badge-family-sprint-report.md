# Rapport — Sprint Famille Badge

Date d’exécution : 13 juillet 2026. Primitive : `Badge` — MWI-COMP-317.

## 1. Résumé

Le sprint a créé la structure officielle du programme, recensé 205 sites visuels Badge-like et composé la primitive existante dans les quatre seules racines métier strictement équivalentes : `EggPill`, `RaidPill`, `MaxPill` et le wrapper local `Badge` de Research. Les quatre wrappers, leurs props et leurs palettes métier sont conservés. `src/components/ui/badge.tsx` et son API n’ont pas été modifiés.

## 2. Inspection initiale

Le premier `git status --short` était vide : le working tree était propre. Aucun fichier concurrent ni collision n’a été détecté. Les cinq sources de vérité ont été lues avant le code courant.

Contrats confirmés : `Badge` rend un `span` non interactif, accepte les attributs d’un `HTMLSpanElement`, possède six tons finis et conserve le squelette `inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black`. Les wrappers candidats rendaient eux aussi un `span`, sans handler ni tab index. Le code courant concordait avec le plan d’audit.

## 3. Métriques

| Mesure | Avant | Après |
|---|---:|---:|
| Sites recensés | 205 | 205 |
| Sites composant la primitive canonique | 68 | 72 |
| Implémentations locales | 137 | 133 |
| Racines migrées | 0 | 4 |
| Wrappers métier supprimés | 0 | 0 |
| Faux badges transformés | 0 | 0 |

L’unité est un site JSX d’implémentation, définie dans l’inventaire. Les lignes de l’inventaire restent celles de la baseline pré-migration.

## 4. Classification

- A : 68 usages statiques déjà canoniques ;
- B : 100 sites métier, dont 4 composés dans ce sprint et 96 conservés sans modification ;
- C : 13 contrôles interactifs exclus ;
- D : 24 cas ambigus documentés uniquement.

Les quatre candidats B migrés sont BADGE-USAGE-133, -136, -156 et -160. Les types, attaques, météo, événements, assets dynamiques, filtres, toggles et chips sélectionnables restent métier ou interactifs.

## 5. Modifications

Chaque wrapper conserve son nom et son paramètre `tone`. Sa racine locale `span` est remplacée par `Badge` ; Research utilise l’alias `DesignSystemBadge` afin de préserver le nom local. Les trois wrappers dont `tone` vaut par défaut une chaîne vide ajoutent des classes de compatibilité `border-current bg-transparent text-inherit`, supprimées par `tailwind-merge` quand une palette métier est fournie et équivalentes au rendu initial si aucune palette ne l’est.

Le diff des quatre sources contient 12 insertions et 8 suppressions. Aucune logique métier, donnée, route, interaction, palette, variante globale ou primitive adjacente n’a changé.

## 6. Fichiers créés

Programme :

- `docs/codex/Design System Program/DESIGN-SYSTEM-PROGRAM.md` ;
- `docs/codex/Design System Program/README.md` ;
- `docs/codex/Design System Program/backlog/design-system-backlog.md` ;
- `docs/codex/Design System Program/reports/README.md` ;
- `docs/codex/Design System Program/sprints/README.md` ;
- `docs/codex/Design System Program/sprints/badge/README.md` ;
- `docs/codex/Design System Program/sprints/badge/badge-family-inventory.md` ;
- `docs/codex/Design System Program/sprints/badge/badge-family-migration-plan.md` ;
- le présent rapport ;
- `docs/codex/Design System Program/templates/codex-design-system-sprint-template.md` ;
- `docs/codex/Design System Program/templates/design-system-sprint-report-template.md`.

Tests et artefacts :

- `scripts/test-design-system-badge-family.mjs` ;
- `scripts/verify-design-system-badge-family.mjs` ;
- `test-results/design-system-badge-family/baseline.json` ;
- `test-results/design-system-badge-family/after.json` ;
- `test-results/design-system-badge-family/comparison.json` ;
- 84 PNG avant et 84 PNG après dans les dossiers `before/` et `after/`. L’ensemble exact est le produit des thèmes `dark|light`, viewports `mobile|tablet|desktop`, huit scénarios et états `page`, plus `target` pour les quatre scénarios Pokémon, `modal` pour Kanban et `hover` pour Projets.

Le dossier d’artefacts contient 171 fichiers au total.

## 7. Fichiers modifiés

- `src/components/admin/pokemon/eggs-panel.jsx` ;
- `src/components/admin/pokemon/max-battles-panel.jsx` ;
- `src/components/admin/pokemon/raids-panel.jsx` ;
- `src/components/admin/pokemon/research-panel.jsx`.

Le démarrage de Next a généré temporairement un changement de chemin dans `next-env.d.ts`. Son contenu initial a été remis exactement après l’arrêt du serveur ; le fichier est absent du diff final.

## 8. Tests

| Validation | Résultat |
|---|---|
| Test statique avant migration | 5/5 passés |
| Test statique après migration | 5/5 passés |
| `npm run typecheck` | passé, 0 erreur |
| ESLint ciblé quatre sources + `badge.tsx` | passé, 0 erreur ; 7 warnings `no-img-element` préexistants |
| Playwright | 48 scénarios, 0 différence critique |
| Captures ciblées | 24/24 empreintes avant/après identiques |
| Styles calculés | 24/24 objets strictement identiques |
| Erreurs console | 0 |
| Erreurs React/page | 0 |
| Overflow horizontal | 0 sur 48 scénarios |

Commandes finales :

```text
node --test scripts/test-design-system-badge-family.mjs
npm run typecheck
npx eslint src/components/admin/pokemon/eggs-panel.jsx src/components/admin/pokemon/max-battles-panel.jsx src/components/admin/pokemon/raids-panel.jsx src/components/admin/pokemon/research-panel.jsx src/components/ui/badge.tsx
node scripts/verify-design-system-badge-family.mjs
```

## 9. Dark/light

Dark et light sont validés sur les huit scénarios. Pour chacune des quatre cibles métier, le tag `span`, le texte, la chaîne de classes résolue, les 16 propriétés calculées et la capture ciblée sont strictement identiques avant/après dans les deux thèmes.

## 10. Responsive

Les viewports 375 × 812, 768 × 1024 et 1440 × 1000 sont validés. Le script couvre `/`, `/kanban`, `/projects`, `/js-progress` et les sections Raids, Œufs, Max Battles et Research de `/pokemon-admin`. Un contenu métier volontairement long est testé dans les trois wrappers de cards. Aucun overflow horizontal n’est détecté.

Les empreintes PNG globales contiennent neuf variations informatives : plusieurs correspondent à 0 pixel brut différent ; la variation maximale réelle est 10 pixels, soit 0,003284 %. Trois captures d’état présentent au maximum la même variation. Elles concernent l’anticrénelage de Dashboard/Projets/Kanban hors sources migrées. Les 24 captures critiques des wrappers sont, elles, identiques bit à bit.

## 11. Accessibilité

- Les quatre racines restent des `span` non interactifs.
- Aucun focus ni tab stop n’est ajouté.
- Les signatures de focusables et l’ordre de tabulation sont identiques avant/après.
- Les 13 faux badges interactifs restent des `button` ou `a` natifs.
- La modale et la sélection Kanban restent fonctionnelles ; le hover Projets est capturé.
- `prefers-reduced-motion: reduce` est reconnu et le Kanban reste chargé sans erreur.
- Les wrappers conservent textes, icônes, parents interactifs et structures métier.

## 12. Écarts

- Le binaire `agent-browser` n’était pas installé. Playwright 1.61.0, déjà déclaré par le projet, a servi de fallback.
- Les données Admin Pokémon et le stockage Dashboard ont été interceptés par des fixtures stables ; aucune donnée utilisateur n’a été écrite.
- Les 7 warnings ESLint `@next/next/no-img-element` existaient sur des lignes d’images hors diff et n’ont pas été corrigés.
- Les variations PNG globales sous 0,003284 % sont consignées dans `comparison.json` et ne touchent aucune cible migrée.

## 13. Risques ouverts

Les 96 sites B restants nécessitent une caractérisation propre à leurs assets, styles dynamiques ou structures métier. Les 24 cas D nécessiteraient des classes de compensation de hauteur/display/bordure/type ; ils restent documentés plutôt que forcés dans `Badge`. Aucun ton Pokémon ou Kanban ne doit être ajouté à la primitive.

Prochain sprint unique recommandé, non démarré : **Sprint 2 — contrat Button et un adaptateur `ExternalButton`**, conformément à la roadmap. Il doit commencer par les états hover/focus/disabled et la sémantique lien versus bouton.

## 14. Rollback

Par groupe local :

1. Dans Eggs, Raids et Max Battles, remettre le `span` initial dans le wrapper concerné et retirer uniquement son import `Badge`.
2. Dans Research, remettre le `span` initial et retirer uniquement l’import alias `DesignSystemBadge`.
3. Rejouer le test statique, le typecheck, le lint et la comparaison visuelle.
4. Ne modifier ni les wrappers, ni leurs consommateurs, ni les données, ni les autres fichiers du working tree.

Le rollback ne demande aucune migration de données, API, token ou compatibilité.

## 15. Conclusion

Sprint Famille Badge validé : tous les usages sûrs identifiés ont été migrés vers la primitive Badge sans régression détectée.

Aucun commit, push ou déploiement n’a été effectué.
