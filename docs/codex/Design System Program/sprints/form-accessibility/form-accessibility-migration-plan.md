# Plan de migration — Accessibilité des formulaires

Date : 14 juillet 2026. Ce plan a été écrit après les tests de caractérisation et la baseline runtime, avant toute correction source.

## Périmètre et classification

L’inventaire statique couvre les 95 contrôles du projet. Les 52 contrôles dont le mécanisme de nommage était déjà démontré lors du sprint Field restent inchangés. La cohorte à vérifier au runtime contient 43 contrôles : 1 cas déjà conforme ou légitime (A), 18 corrections simples et sûres (B), 3 contrôles spécialisés (C) et 21 cas ambigus (D). Le total projet est donc A 53, B 18, C 3 et D 21.

## Corrections autorisées

Les 18 cas B réemploient uniquement un texte métier déjà rendu ou déjà présent comme placeholder :

1. `ColorLab` : nommer l’entrée HEX avec le libellé visible « HEX ».
2. `DailyTools` : nommer « Journal du jour » et relier l’aide de sauvegarde existante.
3. `SnippetVault` : nommer la recherche avec son placeholder existant.
4. `ImportModal` Events : nommer la zone avec le texte visible « Import JSON ».
5. `EventsCalendarPanel` : nommer la recherche avec son placeholder existant.
6. `NotesBoard` : nommer la recherche avec son placeholder existant.
7. `TodoList` : nommer l’ajout avec son placeholder existant.
8. `RulesPanel` : relier le libellé et l’aide déjà visibles au filtre de cible.
9. `AdminApp` : nommer la recherche globale avec son placeholder existant.
10. `AdminApp` : nommer « Corrections groupées » et relier son aide existante.
11. `AdminApp` : nommer « Export et partage » et relier son aide existante.
12. `AdminTodoPanel` : nommer l’ajout avec son placeholder existant.
13. `AdminTodoPanel` : nommer l’édition avec le texte déjà utilisé par l’action « Modifier la tâche ».
14. `CollectionsPanel` : nommer la recherche avec son placeholder existant.
15. `DatasetFilterBar` : exposer le placeholder métier fourni par chaque appelant comme nom.
16. `LoginCard` Pokémon : nommer le mot de passe, relier l’erreur existante et exposer l’état invalide conditionnel.
17. `PokemonDocsViewer` : nommer la recherche avec son placeholder existant.
18. `DashboardBacklog` : nommer la recherche avec son placeholder existant.

Bilan prévu : 17 `aria-label`, 1 `aria-labelledby`, 5 `aria-describedby`, 1 `aria-invalid` conditionnel et 7 IDs stables. Quatre descriptions existantes et une erreur existante seront reliées. Aucun texte, placeholder, message, handler, rôle, valeur, validation ou style ne sera modifié.

## Cas sans migration

- A : `A11Y-FIELD-008`, champ caché natif de redirection, volontairement absent de l’arbre d’accessibilité.
- C : `A11Y-FIELD-049` checkbox Kanban, `061` file input pédagogique et `062` radio de stratégie. Ils restent spécialisés ; le radio possède déjà un nom runtime via son label englobant.
- D : `013–022`, `025–029`, `034`, `050`, `056–059`. Leur contexte ne fournit pas de libellé métier suffisamment fiable ou leur contrôle est complexe. Aucun contenu ne sera inventé.

## Ordre, risques et tests

Ordre : corrections locales TSX/JSX, test statique, typecheck, lint ciblé, comparaison Playwright avant/après, puis documentation. Les risques sont les collisions d’IDs, la substitution accidentelle du placeholder au texte métier, une annonce doublée de l’erreur Pokémon et une variation visuelle causée par les attributs. Les tests contrôlent noms calculés, descriptions, erreur, rôles, propriétés, styles, pixels, clavier, focus, valeurs, overflow, console/React, dark/light et 375 × 812, 768 × 1024, 1440 × 1000.

## Décision Field et conditions d’arrêt

`Field`, `Input` et `Textarea` restent strictement inchangés : les cas ne partagent pas un contrat générique description/erreur sur au moins trois usages et une correction locale explicite suffit. Un cas est abandonné si son texte métier est incertain, s’il nécessite un nouveau contenu ou une nouvelle validation, s’il implique un contrôle spécialisé, s’il modifie le rendu ou s’il entre en collision avec le working tree.

## Rollback

Retirer uniquement les attributs ARIA et les sept IDs ajoutés dans les 13 fichiers applicatifs concernés, sans restaurer ni reformater d’autres changements. Les scripts et rapports peuvent être conservés s’ils restent utiles. Aucun changement concurrent ne doit être touché.
