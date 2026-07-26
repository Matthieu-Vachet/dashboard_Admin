# Contrat anti-régression

## Commande centrale

```bash
npm run test:design-system
```

Cette commande agrège les tests de toutes les familles et `test-design-system-governance.mjs`. Elle doit être exécutée avec le typecheck, ESLint et le build avant livraison.

## Invariants bloquants

Le garde-fou global échoue si :

- un contrat central requis disparaît ;
- un `<select>` natif est ajouté hors de la primitive Select ;
- une checkbox native est ajoutée hors de la primitive Checkbox ;
- ErrorState reçoit `description`, `error` ou omet `message` ;
- une façade locale nommée Field ne compose pas la primitive Field ;
- la règle durable de réutilisation et la séparation consolidation/UX disparaissent de la constitution ;
- un vérificateur de famille détecte une typographie, motion, couleur sûre, surface, spacing, radius, élévation ou structure responsive générique hors contrat.

## Règles d’évolution

Une feature conforme peut augmenter :

- le nombre de routes ;
- le nombre de tables ;
- le nombre de Card ;
- le nombre de contrôles canoniques ;
- le nombre d’états partagés ;
- le nombre de racines responsive.

Ces compteurs ne sont donc pas des assertions durables. Les inventaires historiques conservent leurs chiffres, tandis que les tests courants vérifient :

```text
coverage = 100 %
compatible hardcodes = 0
invalid contracts = 0
```

Les listes exactes restent autorisées uniquement pour un contrat fini ou un registre d’exceptions explicitement documenté, par exemple les cinq tons d’un composant, les trois rôles radius ou les quatorze seuils métier responsive.

## Ordre obligatoire pour une nouvelle feature

1. primitive existante ;
2. composant partagé existant ;
3. wrapper métier existant ;
4. token existant ;
5. composition possible ;
6. nouvelle abstraction éventuelle après preuve de répétition.

## Mise à jour d’une exception

Une exception ne peut être ajoutée silencieusement. Le changement doit préciser son propriétaire, sa sémantique, la raison de non-compatibilité et le test qui borne son univers. Si l’équivalence devient certaine, l’exception doit être migrée plutôt qu’élargie.
