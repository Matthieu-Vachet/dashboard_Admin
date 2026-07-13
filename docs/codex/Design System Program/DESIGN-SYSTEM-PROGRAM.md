# Constitution opérationnelle du programme Design System

## 1. Objet

Ce document définit la méthode de consolidation du Design System du Dashboard Admin. Le code courant et les preuves mesurées priment sur les intentions historiques. Le programme réduit progressivement les duplications sans transformer une migration structurelle en refonte visuelle.

## 2. Principes non négociables

- Aucun Big Bang.
- Aucune régression visuelle involontaire ni régression fonctionnelle.
- Migration progressive, limitée et réversible.
- Le code réel est prioritaire sur l’audit lorsqu’un écart est constaté.
- Réutiliser avant de créer.
- Séparer les primitives génériques des composants et données métier.
- Chaque sprint possède un rollback local explicite.
- Écrire les tests de caractérisation et la baseline avant la modification.
- Documenter les résultats après validation.
- Maintenir une compatibilité temporaire quand sa suppression augmenterait le risque.
- Ne jamais inventer manuellement un ID `COMP-*` ou `MWI-COMP-*`.

## 3. Définition d’une primitive

Une primitive est générique, réutilisable, non métier, composable, accessible et stable. Son API expose un ensemble fini de variantes et d’états justifié par des usages réels. Elle n’embarque ni palette métier, ni règle de données, ni navigation implicite.

## 4. Critères de création d’une primitive

Une primitive ne peut être créée que si cette checklist est validée.

| Critère | Règle |
|---|---|
| Répétition | Au moins 3 usages réels, sauf justification forte d’accessibilité. |
| Structure | Anatomie réellement identique. |
| Comportement | Interactions identiques. |
| Accessibilité | Contrat commun. |
| Responsive | Comportement comparable. |
| Props | Contrat simple et fini. |
| Valeur | Réduction réelle de duplication. |
| Métier | Aucune logique métier intégrée. |

Si un critère important échoue, la primitive n’est pas créée. Le cas reste un composant métier, un helper ou une duplication documentée.

## 5. Classification des composants

- **Primitive** : brique générique à contrat fini, sans logique métier.
- **Composite** : assemblage réutilisable de primitives avec une anatomie stable.
- **Composant métier** : composant portant des données, règles, assets ou interactions propres à un domaine.
- **Façade de compatibilité** : API transitoire qui préserve les consommateurs pendant une migration.
- **Helper** : fonction ou structure technique sans identité visuelle autonome.
- **Faux positif** : élément ressemblant par ses classes ou son nom à une famille, sans en partager le contrat.

## 6. Types de sprint

### Sprint Observation

Analyse et documentation sans modification source.

### Sprint Pilote

Migration très limitée destinée à éprouver la méthode et les outils de non-régression.

### Sprint Famille

Inventaire complet puis migration de tous les cas strictement sûrs d’une famille.

### Sprint Stabilisation

Renforcement des tests, correction contrôlée d’API, compatibilité et documentation.

### Sprint Suppression

Suppression tardive du code mort après preuve que la migration est complète et que les façades ne sont plus consommées.

## 7. Cycle obligatoire d’un sprint

1. inspection du working tree et du code ;
2. recherche de la cause racine ;
3. inventaire exhaustif du périmètre ;
4. classification de chaque cas ;
5. tests de caractérisation ;
6. baseline visuelle et styles calculés ;
7. migration minimale ;
8. validation technique, visuelle, fonctionnelle et accessible ;
9. documentation des résultats ;
10. vérification du rollback ;
11. mise à jour du backlog.

## 8. Conditions d’arrêt

Le sprint s’arrête en cas de collision du working tree, de besoin de modifier plusieurs familles, de changement global de token imprévu, d’API incontrôlable, de tentative de composant universel, d’absence de baseline exploitable, de régression visuelle, de tests non fiables, de dépendance externe non validée ou de dépassement du périmètre. Un besoin de modifier une primitive interdite par le sprint constitue également un arrêt.

## 9. Politique de tests

Selon le risque, la preuve combine tests unitaires, statiques et d’intégration, captures avant/après, comparaison de styles calculés, thèmes dark/light, viewports mobile/tablette/desktop, clavier, focus, ordre de tabulation, `prefers-reduced-motion`, interactions métier, erreurs console et React, et overflow horizontal. Une capture seule n’est pas une preuve suffisante quand les styles calculés ou le DOM peuvent être comparés.

## 10. Politique de rollback

Chaque groupe de modifications doit pouvoir être annulé localement, sans migration de données et sans toucher aux changements concurrents. Le rapport précise les imports, racines JSX, tests et artefacts concernés. Aucun rollback ne doit utiliser une commande destructive globale.

## 11. Documentation

Un sprint maintient au minimum : inventaire, plan de migration, rapport, backlog et matrices de référence. Un addendum n’est créé que s’il apporte une preuve nouvelle et possède un emplacement officiel. Les documents historiques ne sont ni déplacés ni réécrits.

## 12. Figma ↔ Code

Figma et le code partagent les tokens canoniques, primitives, variantes et états validés. Les composites décrivent une anatomie commune ; les exemples métier restent séparés. La synchronisation ne doit créer ni doublon de composant, ni variante métier dans une primitive, ni second système de tokens.

## 13. Definition of Done

Un sprint est terminé uniquement si le périmètre est respecté, les tests réussissent, la baseline est comparée, la documentation est créée, le rollback est documenté et le backlog est mis à jour. Aucun commit, push ou déploiement ne doit être effectué sans demande explicite.
