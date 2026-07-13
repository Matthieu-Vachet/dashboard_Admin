# Plan de migration — Famille Field / Input / Textarea

Ce plan a été écrit avant toute modification source.

## Périmètre mesuré

| Mesure | Total |
|---|---:|
| Input | 47 |
| Textarea | 12 |
| Natifs | 36 |
| Wrappers déclarés | 5 |
| Labels sémantiques | 68 |
| Descriptions reliées | 0 |
| Erreurs reliées | 0 |
| A | 25 |
| B | 6 |
| C | 13 |
| D | 51 |

## Lot sûr prévu

1. Créer `src/components/ui/field.tsx` avec l’option A minimale.
2. Remplacer les 25 racines A par `Field` dans Login, Projets, Kanban, Calendrier, Notes et Dashboard Backlog.
3. Conserver les wrappers métier locaux `Field`/`Area` et composer seulement leur racine interne dans Events et Dashboard Backlog : 4 racines B.
4. Conserver `RangeFields` sous `fieldset`/`legend`, ses deux inputs numériques, tous les contrôles C et les 51 cas D.
5. Ne modifier ni `Input`, ni `Textarea`, ni leurs props, classes ou exports.

Le lot représente 29 racines statiques migrées vers `Field` : 25 A et 4 B. Les wrappers locaux continuent d’exister et leurs appels restent inchangés.

## Pages et preuves

- `/login?error=1` : required, placeholders et alerte réelle ;
- `/projects` : formulaire Dashboard général, input, number et textarea ;
- `/kanban` : input, date, number, textarea et contrôles spécialisés inchangés ;
- `/calendar` : formulaire Events, date/time/textarea ;
- `/notes` : input et textarea longue ;
- `/tools/dashboard-backlog` : wrappers locaux conservés ;
- `/js-progress` : textarea disabled réel ;
- `/pokemon-admin?section=my-collection` : recherche et contrôles Admin Pokémon hors migration.

Chaque route est mesurée en dark/light et 375 × 812, 768 × 1024, 1440 × 1000. Les preuves portent sur DOM, attributs, noms, ordre de tabulation, styles label/racine/contrôle, focus, saisie, overflow, erreurs console/React et captures.

## Risques et conditions d’arrêt

- Toute différence calculée ou pixel sur une cible migrée impose un rollback local.
- Tout besoin de modifier `src/components/ui/input.tsx`, un token, une autre primitive ou une logique métier arrête le cas concerné.
- Les dates/times restent des `Input` existants ; seul leur label structurel change.
- Les champs legacy Pokémon conservent `fieldClass` et leur palette.
- Les recherches sans nom accessible restent documentées ; ce sprint ne les corrige pas sous couvert de consolidation.
- `aria-describedby`, `aria-invalid` et les IDs générés attendent un sprint où au moins trois usages réels concordent.

## Rollback

1. Remplacer chaque `Field` du lot A par le couple `<label className="block">` / `<span className="text-xs font-black uppercase tracking-[0.16em] text-muted">` précédent.
2. Remettre les quatre racines internes des wrappers B à leur `<label>` précédent sans toucher aux appels.
3. Supprimer uniquement les imports `Field` devenus inutiles, puis `src/components/ui/field.tsx` si aucun usage ne reste.
4. Rejouer test statique, typecheck, lint et comparaison visuelle ; ne restaurer aucun autre fichier.
