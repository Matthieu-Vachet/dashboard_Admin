# Plan de migration State System

## Séquence appliquée

1. Inventorier les états visuels, les conditions de rendu et les faux positifs.
2. Comparer tous les loaders animés et choisir la collection Trainer comme référence Fetch Loading.
3. Figer les contrats `FetchLoadingState`, `EmptyState` et `ErrorState` avant migration.
4. Migrer les 13 loaders statiques et les 2 loaders animés locaux vers le contrat Fetch.
5. Faire composer `EmptyState` par les wrappers métier existants puis migrer les branches directes compatibles.
6. Migrer les erreurs asynchrones génériques en conservant les actions de reprise.
7. Rechercher à nouveau tout le dépôt et justifier chaque exception spécialisée.
8. Vérifier Color System, dark/light, mobile/tablette/desktop, reduced motion, transitions fetch et non-régression.
9. Mettre à jour la documentation officielle, puis seulement après validation committer et pousser.

## Garde-fous

- aucune stratégie de fetch, requête, hook ou structure de données n’est modifiée ;
- Loading précède Error uniquement lorsque la condition existante le faisait déjà ;
- aucune surface spécialisée n’est appauvrie pour augmenter artificiellement la couverture ;
- un loader de bouton, un skeleton ou une progression d’import ne devient jamais un Fetch Loading par simple ressemblance ;
- l’ambiguïté Identity History reste hors migration tant que son état métier n’est pas séparé.

## Critères de sortie

- legacy/static Fetch Loading compatible = 0 ;
- états génériques hardcodés compatibles = 0 ;
- couverture canonique générique = 78/78 racines, soit 100 % ;
- erreurs, réductions de mouvement et actions de reprise vérifiées ;
- tests State System, tests de sprints voisins, ESLint, TypeScript et vérification navigateur au vert.
