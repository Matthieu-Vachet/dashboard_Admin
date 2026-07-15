# Rapport — Sprint Famille Button

Date d’exécution : 13 juillet 2026. Primitive : `Button` — MWI-COMP-318.

## 1. Résumé

Le sprint a inventorié 291 sites d’action, documenté le contrat 4 variantes × 4 tailles et composé la primitive existante dans les trois seules racines d’implémentation validées : les branches lien interne et lien externe d’`ExternalButton`, puis la racine bouton de `LoadMoreButton`. Les deux wrappers, leurs props, leurs consommateurs et leur logique sont conservés. `src/components/ui/button.tsx`, son API et ses variantes n’ont pas été modifiés.

## 2. Inspection initiale

Le premier `git status --short` était vide : working tree propre, aucun fichier concurrent et aucune collision. Les documents du programme, la roadmap, les deux matrices et le rapport Badge ont été relus avant le code courant.

Contrats confirmés : import canonique `@/components/ui/button`, racine `<button>` ou Radix `Slot` avec `asChild`, props HTML + `asChild`/`variant`/`size`/`icon`, variantes `primary|secondary|ghost|danger`, tailles `sm|md|lg|icon`, valeurs par défaut `secondary`/`md`, classes structurelles et fusion `clsx` puis `tailwind-merge`. Le code courant concordait avec l’audit.

## 3. Métriques

| Mesure | Avant | Après |
|---|---:|---:|
| Sites d’action logiques | 291 | 291 |
| Usages directs de `Button` | 92 | 95 |
| `<button>` natifs | 184 | 183 |
| `role="button"` non natifs | 0 | 0 |
| Liens stylés hors primitive | 15 | 13 |
| Racines sémantiques lien, y compris `Button asChild` | 23 | 23 |
| Sites icon-only | 39 | 39 |
| Composants nommés inventoriés | 10 | 10 |
| Racines JSX migrées | 0 | 3 |
| Wrappers migrés | 0 | 2 |
| Wrappers supprimés | 0 | 0 |
| Composants supprimés | 0 | 0 |

Les trois racines sont les deux branches exclusives d’`ExternalButton` et l’unique racine de `LoadMoreButton`. Les trois appels d’`ExternalButton` et les deux appels conditionnels de `LoadMoreButton` sont inchangés.

## 4. Classification

- A : 88 usages génériques déjà canoniques ;
- B : 8 racines de wrappers métier, dont 3 composées dans ce sprint ;
- C : 95 faux génériques interactifs explicitement exclus ;
- D : 100 cas ambigus ou legacy documentés uniquement.

La classification reste inchangée après migration : composer une primitive ne retire pas la responsabilité métier d’un wrapper. Les cinq wrappers obligatoires `ExternalButton`, `LoadMoreButton`, `EventButton`, `ToolbarButton` et `ProgressButton` sont tous conservés.

## 5. Modifications

`ExternalButton` utilise désormais `Button asChild` autour du `Link` interne ou du `<a>` externe. `href`, `target="_blank"`, `rel="noreferrer"`, texte, icône et sémantique de lien sont préservés. Des classes locales rétablissent la durée calculée de 150 ms et l’outline natif exact ; aucun contrat global n’est créé.

`LoadMoreButton` rend `Button` avec `type="button"`. Le compteur, l’incrément, la palette Pokémon, les dimensions et l’outline natif sont préservés par des classes locales. `gap-[normal]` conserve la valeur calculée initiale. Aucun variant métier n’a été ajouté.

Diff source : 17 insertions et 12 suppressions sur deux fichiers. Aucun autre bouton, wrapper, toggle, lien, composant métier, token, route ou donnée n’a changé.

## 6. Fichiers créés

- `docs/codex/Design System Program/sprints/button/README.md` ;
- `docs/codex/Design System Program/sprints/button/button-family-inventory.md` ;
- `docs/codex/Design System Program/sprints/button/button-contract-analysis.md` ;
- `docs/codex/Design System Program/sprints/button/button-family-migration-plan.md` ;
- le présent rapport ;
- `scripts/test-design-system-button-family.mjs` ;
- `scripts/verify-design-system-button-family.mjs`.

Artefacts générés dans `test-results/design-system-button-family/` : `baseline.json`, `after.json`, `comparison.json`, 162 PNG avant et 162 PNG après, soit 327 fichiers au total.

## 7. Fichiers modifiés

Sources :

- `src/components/admin/dashboard/dashboard-home-live.tsx` ;
- `src/components/admin/pokemon/admin-app.jsx`.

Programme :

- `docs/codex/Design System Program/backlog/design-system-backlog.md` ;
- `docs/codex/Design System Program/sprints/README.md`.

`next-env.d.ts` a été modifié automatiquement par le serveur Next puis remis exactement à son contenu initial. Il est absent du diff final. La primitive `src/components/ui/button.tsx` est absente du diff.

## 8. Tests

| Validation | Résultat |
|---|---|
| Test statique avant migration | 5/5 passés |
| Test statique après migration | 5/5 passés |
| `npm run typecheck` | passé, 0 erreur |
| ESLint ciblé sources + `button.tsx` | passé, 0 erreur ; 3 warnings préexistants `no-img-element` |
| Playwright | 30 scénarios, 0 différence critique |
| Captures | 324 PNG avant/après |
| Cibles migrées | 18 combinaisons runtime × 3 états, 0 pixel significatif différent |
| Styles calculés des cibles migrées | 54 objets, 1 458 propriétés comparées, toutes identiques |
| Erreurs console/React | 0 / 0 |
| Overflow horizontal | 0 sur 30 scénarios |

Commandes finales :

```text
node --test scripts/test-design-system-button-family.mjs
npm run typecheck
npx eslint src/components/admin/dashboard/dashboard-home-live.tsx src/components/admin/pokemon/admin-app.jsx src/components/ui/button.tsx
node scripts/verify-design-system-button-family.mjs
```

Le script couvre également un bouton text+icon, un icon-only, un bouton disabled, une modale, `EventButton`, le clic externe, la navigation interne, Entrée, Espace, l’inertie disabled et l’incrément unique de LoadMore.

## 9. Dark/light

Dark et light sont validés sur dashboard, Kanban, calendrier, Admin Pokémon/Assets et Projets. Les 18 instances runtime des racines migrées ont les mêmes tags, attributs, dimensions, styles default/hover/focus et captures critiques avant/après. Les classes DOM diffèrent volontairement sur ces 18 instances car elles prouvent la composition de `Button`; leur rendu calculé reste identique.

## 10. Responsive

Les viewports 375 × 812, 768 × 1024 et 1440 × 1000 sont validés. Aucun overflow horizontal n’est détecté. Les captures globales Dashboard sont identiques. Deux hashes globaux sont identiques au pixel utile malgré un hash différent, et un seul pixel au-delà du seuil de canal apparaît sur le bouton disabled de Projets, hors fichiers modifiés : 0,000069 % de la capture. Aucune cible migrée ne comporte de pixel significativement différent.

## 11. Accessibilité

- `ExternalButton` reste un lien : Entrée navigue, Espace n’est pas transformé en activation de bouton.
- Le lien externe conserve `target` et `rel`; le lien interne conserve son `href` et sa navigation.
- `LoadMoreButton` reste un `<button type="button">`; aucun submit accidentel n’est introduit.
- Aucun nouveau tab stop, nom accessible ou changement d’ordre de tabulation n’est détecté.
- Le focus calculé et la capture focus sont équivalents grâce au retour local à l’outline navigateur.
- L’icon-only Kanban répond toujours à Entrée et Espace et ouvre la même modale.
- Le bouton disabled Projets reste inert et hors tab order.
- Aucun contrat de reduced motion n’est modifié ; la durée calculée reste 150 ms avant/après sur les wrappers migrés.

## 12. Écarts

- Le binaire `agent-browser` n’était pas installé. Playwright 1.61.0, déjà déclaré par le projet, a servi de fallback.
- Les API Dashboard et Admin Pokémon ont été interceptées par des fixtures stables ; une seule session locale a été créée puis réutilisée. Aucune donnée utilisateur n’a été écrite.
- Les 3 warnings ESLint `@next/next/no-img-element` aux lignes 2001, 2222 et 2485 d’`admin-app.jsx` sont préexistants et hors diff.
- Les états loading métier ne concernent ni `ExternalButton` ni `LoadMoreButton`; ils sont inventoriés mais n’ont pas été déclenchés. `EventButton`, `ToolbarButton` et `ProgressButton` ont été inspectés et laissés inchangés.
- Les captures actives reposent sur les activations clavier réelles ; la primitive n’expose aucun style `:active` contractuel distinct.

## 13. Risques ouverts

Les 183 boutons natifs et 13 liens stylés hors primitive ne constituent pas un lot sûr. Les 95 cas C doivent rester des toggles, navigations, cartes, drag handles, actions de modale ou contrôles riches. Les 100 cas D nécessitent une baseline propre ; les actions Pokémon attendent l’adaptateur visuel legacy. Aucun booléen `loading`, `active`, `fullWidth` ou `compact` ne doit être ajouté à `Button`.

Prochain sprint unique recommandé, non démarré : **Sprint Observation Field — anatomie label, aide et erreur**, correspondant à DS-BACKLOG-003.

## 14. Rollback

1. Dans `dashboard-home-live.tsx`, remettre directement le `Link` et le `<a>` dans les deux branches d’`ExternalButton`, rétablir la chaîne de classes initiale ; l’import `Button` reste utilisé ailleurs dans le fichier.
2. Dans `admin-app.jsx`, remettre le `<button type="button">` initial de `LoadMoreButton` et retirer uniquement l’import `Button` ajouté.
3. Rejouer test statique, typecheck, lint et comparaison visuelle.
4. Ne modifier ni les wrappers, ni leurs consommateurs, ni la primitive, ni les autres fichiers du working tree.

## 15. Conclusion

Sprint Famille Button validé : tous les usages sûrs identifiés ont été migrés vers la primitive Button sans régression détectée.

Aucun commit, push ou déploiement n’a été effectué.
