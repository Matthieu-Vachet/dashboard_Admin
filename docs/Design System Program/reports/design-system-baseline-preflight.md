# Preflight — baseline Design System durable

Date : 26 juillet 2026
Statut : **BASELINE DESIGN SYSTEM READY**

## Objectif

Réparer les baselines rendues obsolètes par l’ajout de consommateurs conformes, sans rouvrir les contrats de familles déjà `validated` ou `completed`. Les rapports historiques de sprint et leurs cohortes de clôture restent immuables ; les tests de santé courants suivent désormais le code réel.

## Cause racine

Les tests mélangeaient deux responsabilités : préserver une cohorte historique et imposer son nombre exact au code courant. L’ajout légitime de Card, Modal, Select, Field/Input et états génériques faisait donc échouer des assertions malgré une consommation canonique. Quelques assertions vérifiaient aussi des couleurs, chemins de documentation ou structures antérieurs aux consolidations Color System et Modal.

Deux consommateurs violaient avec certitude le contrat `ErrorState` déjà validé :

- `src/components/admin/pokemon/best-defenders-panel.jsx` ;
- `src/components/admin/pokemon/costume-audit-panel.jsx`.

La correction autorisée est exclusivement mécanique : `description={error}` devient `message={error}`. Aucun texte, handler, style, comportement, donnée, structure UI ni API de primitive n’est modifié.

## Baseline avant / après

| Famille | Attente devenue obsolète | Baseline courante validée |
|---|---:|---:|
| Card | 112 usages courants | 117 usages dans 33 fichiers, import canonique vérifié |
| Field / Input / Textarea | 129 contrôles | 130 contrôles, identité AST fichier + ligne + colonne |
| Modal | 22 instances | 23 instances dans 14 fichiers, import et accessibilité vérifiés |
| Select | 67 contrôles | 72/72 canoniques et nommés |
| Checkbox | 10 contrôles | 10/10 canoniques et nommés |
| State System | 78 racines | 87/87 : 18 Fetch, 55 Empty/No Results, 14 Error |
| Color System | 91,0 % à la clôture | 90,8 % des 3 157 usages génériques courants |

Les inventaires historiques Badge (205 sites), Form Accessibility (43 identifiants initiaux), Card (386 racines) et les métriques de clôture restent contrôlés séparément. Ils ne servent plus de plafond artificiel aux consommateurs futurs.

## Contrats de test durables

- Les usages courants sont découverts depuis `src` et leurs imports canoniques sont vérifiés.
- Les API finies, sémantiques accessibles et invariants structurels restent stricts.
- Les nombres finis réellement contractuels restent exacts, notamment les variantes Button et les tons Badge.
- Les hashes de fichiers et les couleurs historiques ne remplacent plus un contrôle structurel.
- Chaque `ErrorState` doit fournir `message` et ne doit pas fournir `description`.
- Les cohortes de migration historiques restent vérifiées dans leurs documents d’origine.

## Validation

- Suites Design System Preflight : **71/71 réussies**.
- Tests State System : **8/8 réussis**, couverture générique 100 %.
- TypeScript : **réussi** (`npm run typecheck`).
- ESLint ciblé : **réussi**.
- Build Next.js production : **réussi**, 34 pages statiques générées ; avertissement Turbopack non bloquant déjà lié au traçage dynamique du dépôt de données.
- `git diff --check` : **réussi**.

## Synchronisation Foundation

- DOC inspectés : DOC-001, DOC-004 et DOC-010.
- DOC modifié : DOC-010, car les volumes State System et la prop canonique `ErrorState.message` étaient devenus obsolètes.
- DOC inspectés mais inchangés : DOC-001 et DOC-004 ; leurs règles générales de gouvernance, de sécurité et de progression restent compatibles avec le Preflight.
- Aucun identifiant permanent n’a été créé.
- Aucune information manquante n’empêche la synchronisation.

Le code courant, le Design System Program et DOC-010 décrivent le même contrat. Les rapports de sprint conservent volontairement leurs métriques historiques de clôture.

## Rollback local

Le rollback consiste à rétablir les assertions précédentes dans les scripts concernés, les deux anciennes props consommateur et les quatre documents transverses modifiés. Il ne nécessite ni migration de données, ni modification de primitive, ni commande Git destructive.

## Git

Commit prévu : `test(design-system): refresh durable baseline assertions`
Push : branche `main`, sans force push.
Condition de passage à Visual Consistency : commit poussé et `git status --short` vide.
