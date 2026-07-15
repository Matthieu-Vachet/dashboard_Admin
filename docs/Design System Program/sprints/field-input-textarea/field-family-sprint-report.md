# Rapport — Sprint Famille Field / Input / Textarea

Date d’exécution : 14 juillet 2026. Primitives : `Input` — MWI-COMP-323, `Textarea` — MWI-COMP-324 et nouvelle composition `Field` sans ID attribué manuellement.

## 1. Inspection

Le premier `git status --short` était vide : working tree propre, aucun fichier concurrent et aucune collision. Les documents du programme, les templates, la roadmap, les deux matrices et le rapport Button ont été relus avant le code courant. La roadmap se trouve à la racine du workspace, dans `design-system-audit/roadmap/`, et non dans le sous-projet Dashboard Admin.

Le code réel concordait avec l’audit : `Input` et `Textarea` sont exportés par `src/components/ui/input.tsx`, `cn` compose `clsx` puis `tailwind-merge`, et aucun composant `Field` canonique n’existait. `src/components/ui/input.tsx`, les autres primitives, les tokens, les routes et les données sont absents du diff.

## 2. Contrat Input

`Input` rend un `<input>`, transfère une ref `HTMLInputElement` et accepte les props natives `InputHTMLAttributes<HTMLInputElement>`. Son socle est `min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-semibold text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-white/[0.09]`.

`className` est fusionné en dernier par `cn`; les overrides locaux peuvent donc remplacer min-height, padding, graisse, bordure, fond ou focus. Les attributs `required`, `disabled`, `readOnly`, `type`, `value`, `defaultValue` et ARIA restent entièrement natifs. Il n’existe aucun contrat visuel dédié pour disabled, required ou invalid.

## 3. Contrat Textarea

`Textarea` rend un `<textarea>`, transfère une ref `HTMLTextAreaElement` et accepte les props natives `TextareaHTMLAttributes<HTMLTextAreaElement>`. Son socle est `min-h-32 w-full resize-none rounded-lg border border-line bg-white/[0.06] p-3 text-sm font-medium leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-white/[0.09]`.

La fusion de `className` autorise notamment les overrides actuels `min-h-*`, `resize-y`, `font-mono`, `text-*` et `leading-*`. Le comportement natif controlled, disabled et readOnly est conservé. Aucun style invalid ni lien description/erreur n’a été inventé.

## 4. Décision Field

La création est justifiée par 27 sites présentant exactement la même anatomie verticale : racine `<label className="block">`, libellé en `<span>` avec la même typographie, association implicite au contrôle imbriqué et aucune description ou erreur reliée. Deux wrappers Events utilisent la même relation avec une grille et une palette legacy substituables par classes locales.

L’option A minimale a été retenue. L’option B à sous-composants a été refusée : le code courant ne contient aucun contrat répété de description ou d’erreur qui justifierait `FieldDescription` ou `FieldError`.

## 5. API Field

`Field` rend un `<label>` non interactif et transfère une ref `HTMLLabelElement`. Son API est : props natives de label hors `children`, `label: ReactNode`, `labelClassName?: string`, `children: ReactNode` et `className` via les props natives. `htmlFor` reste disponible, mais les migrations conservent l’association implicite existante.

Les valeurs par défaut sont `block` pour la racine et `text-xs font-black uppercase tracking-[0.16em] text-muted` pour le libellé. Le composant ne clone pas l’enfant, ne génère pas d’ID, ne gère ni valeur, ni handler, ni validation, ni soumission, ni description, ni erreur, ni état métier.

## 6. Inventaire

| Mesure | Total initial |
|---|---:|
| Sites de contrôle | 95 |
| `Input` | 47 |
| `Textarea` | 12 |
| `<input>` natifs | 29 |
| `<textarea>` natifs | 7 |
| Natifs totaux | 36 |
| Wrappers déclarés | 5 |
| Labels sémantiques | 68 |
| Noms accessibles statiquement démontrés | 52 |
| Descriptions reliées | 0 |
| Erreurs reliées | 0 |
| Controlled | 91 |
| Uncontrolled | 4 |

Les 95 lignes, chemins, lignes courantes et décisions sont conservés dans `field-family-inventory.md`. Les 43 contrôles dont le nom accessible n’est pas démontré statiquement restent des risques documentés, pas des corrections opportunistes de ce sprint.

## 7. Classification

- A : 25 champs simples, tous migrés ;
- B : 6 sites appartenant à des wrappers métier, dont 4 racines composées et 2 contrôles `RangeFields` exclus ;
- C : 13 contrôles spécialisés exclus ;
- D : 51 cas ambigus ou legacy documentés uniquement.

La somme A/B/C/D reste 95. En cas de doute, le cas est resté hors migration.

## 8. Migrations

29 racines utilisent désormais `Field` : 25 cas A et 4 racines B. Répartition : Projets 7, Login 2, Calendrier 5, Kanban 8, Notes 2, Dashboard Backlog 3 et éditeur Events 2.

Les contrôles, valeurs, placeholders, types, classes, callbacks, contraintes et textes sont inchangés. `Input` et `Textarea` ne sont pas modifiés. Aucun Select, checkbox, radio, file input, contrôle Pokémon, recherche complexe ou formulaire multi-étapes n’a été migré.

## 9. Wrappers conservés

Les cinq wrappers inventoriés sont conservés : `Field` et `Area` dans l’éditeur Events, `Field` et `Area` dans Dashboard Backlog, puis `RangeFields` dans Ma collection. Les quatre premiers composent `Field` sous l’alias local `FieldRoot`; leurs props, appels, contrôles natifs ou canoniques et classes legacy restent identiques. `RangeFields`, son `fieldset`, sa `legend` et ses deux nombres restent entièrement inchangés.

## 10. Tests

| Validation | Résultat |
|---|---|
| Test statique avant migration | 6/6 passés |
| Test statique final | 6/6 passés |
| `npm run typecheck` | passé, 0 erreur |
| ESLint ciblé | passé après suppression d’un paramètre inutilisé dans le nouveau collecteur |
| Playwright | 48 scénarios, 0 différence critique |
| Cibles runtime | 120 instances, DOM et styles stables équivalents |
| Styles calculés enregistrés | 48 348 valeurs sur default/focus/filled |
| Saisie puis restauration | 84 exercices réussis |
| Tab puis Shift+Tab | 42 allers-retours réussis |
| Disabled | 6 instances inertes confirmées |
| Required | 12 instances natives confirmées |
| Textarea | 36 instances, dont contenu long et disabled |
| Erreurs console / React | 0 / 0 |
| Overflow horizontal | 0 sur 48 scénarios |

Les artefacts locaux comprennent `baseline.json`, `after.json`, `comparison.json`, 366 PNG uniques avant et 366 après, soit 735 fichiers. Ils restent sous `test-results/design-system-field-family/`, ignoré par la règle `test-results/` de `.gitignore`; rien n’est placé dans `public/` et le dépôt n’est pas alourdi.

Commandes finales :

```text
node --test scripts/test-design-system-field-family.mjs
npm run typecheck
npx eslint <sept sources migrées> src/components/ui/input.tsx src/components/ui/field.tsx scripts/test-design-system-field-family.mjs scripts/verify-design-system-field-family.mjs
node scripts/verify-design-system-field-family.mjs
```

## 11. Dark/light

Dark et light sont validés sur Login, Projets, Kanban, Calendrier, Notes, Dashboard Backlog, Learning et Admin Pokémon. Les signatures DOM, attributs, noms accessibles, styles default/filled, styles stables de focus, focusables et interactions sont équivalents avant/après.

Les captures de cible sont identiques. Dix captures de page ont un hash différent : huit comptent 0 pixel au-delà du seuil de canal, et les deux captures Notes desktop comptent 278 pixels en dark et 277 en light, dans l’horodatage dynamique « modifié ». Le seuil page est 500 pixels ; aucun écart n’approche ce seuil hors donnée temporelle identifiée.

## 12. Responsive

Les viewports 375 × 812, 768 × 1024 et 1440 × 1000 sont validés pour les deux thèmes. Aucun débordement horizontal n’est détecté. Les layouts de grille, hauteurs, largeurs, min-heights, paddings, bordures, rayons et resize sont inchangés.

## 13. Accessibilité

- les 29 migrations conservent une racine `<label>` et l’association implicite au contrôle imbriqué ;
- aucun nouveau focusable ni changement d’ordre de tabulation n’est détecté ;
- le focus reste visible et Tab/Shift+Tab revient sur le même contrôle dans les 42 essais ;
- `required` reste transmis aux deux champs Login ;
- le textarea disabled Learning reste inert ;
- les cinq boutons de catégorie Kanban restent cinq `<button type="button">` et hors `Field` ;
- aucun `aria-invalid` ou `aria-describedby` artificiel n’est ajouté ;
- les 16 scénarios mobiles exécutés avec `prefers-reduced-motion: reduce` restent équivalents.

Les 43 noms non démontrés et l’absence générale de descriptions/erreurs reliées constituent un chantier d’accessibilité séparé. Les corriger aurait changé le contrat et dépassé cette migration structurelle.

## 14. Écarts

- Le binaire `agent-browser` n’était pas installé. Playwright 1.61.0, déjà présent dans le projet, a servi de fallback conformément au workflow de vérification navigateur.
- Les API Dashboard, Backlog et Pokémon ont été interceptées avec des fixtures stables. Une session locale a été créée ; aucune donnée utilisateur n’a été écrite.
- Les couleurs calculées `borderColor`, `backgroundColor` et `outlineColor` ont produit 257 écarts sub-pixel lorsqu’elles étaient échantillonnées à 100 ms pendant la transition CSS de 150 ms. Elles sont enregistrées séparément : 112 bordures, 56 fonds et 89 outlines. Les captures de focus, réalisées animations désactivées, sont identiques et `src/components/ui/input.tsx` n’a pas changé.
- La soumission Login n’a pas été déclenchée pendant la comparaison pour éviter un effet externe. L’élément `<form>`, son `action`, sa méthode, ses noms et son bouton submit sont hors diff ; l’authentification de préparation a néanmoins réussi.
- Les deux cas readOnly recensés sont legacy et hors lot visuel. Leurs fichiers et attributs sont inchangés.

## 15. Risques

Les 13 contrôles C attendent leurs familles spécialisées. Les 51 cas D incluent les recherches avec icône, champs sans nom démontré, palettes legacy, éditeurs et structures métier ; ils ne forment pas un lot homogène. Une future API description/erreur ne devra être créée qu’à partir de cas reliés réels. `Field` ne doit pas accumuler `required`, `disabled`, validation ou clonage d’enfant sans preuve supplémentaire.

Prochain sprint unique recommandé, non démarré : **Sprint Accessibilité formulaires — noms accessibles, descriptions et erreurs**, rattaché à DS-BACKLOG-013. Il doit caractériser et corriger les 43 noms non démontrés avant toute création de Select ou Checkbox.

## 16. Rollback

1. Remplacer les 25 cas A par leur couple initial `<label className="block">` / `<span className="text-xs font-black uppercase tracking-[0.16em] text-muted">`.
2. Remettre les quatre racines internes des wrappers B à leur `<label>` initial sans modifier leurs appels.
3. Retirer uniquement les imports `Field` devenus inutiles, puis `src/components/ui/field.tsx` si aucun usage ne reste.
4. Rejouer test statique, typecheck, lint et comparaison visuelle sans restaurer aucun autre fichier.

## 17. Conclusion

Sprint Famille Field/Input/Textarea validé : la primitive Field a été créée si justifiée et tous les usages sûrs identifiés ont été migrés sans régression détectée.

Aucun commit, push ou déploiement n’a été effectué.
