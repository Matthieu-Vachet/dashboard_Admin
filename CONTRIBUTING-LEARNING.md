# Contribuer au contenu JS Progress

Le contenu pédagogique et la progression utilisateur sont deux domaines strictement séparés.

- Les thèmes décrivent uniquement cours, exercices, pseudo-codes, challenges, projets, ressources, XP possible et critères de validation.
- `learning_progress` conserve les statuts, dates, réponses, tentatives, temps et XP réellement gagnée.
- Aucun fichier pédagogique ne doit contenir `status`, `completedAt`, `earnedXp`, `unlocked` ou une progression réelle.

## Créer un thème

1. Copier `src/data/learning/template-topic.json`.
2. Remplacer tous les identifiants d’exemple.
3. Choisir le niveau et l’ordre avec `curriculum.levelId` et `curriculum.order`.
4. Ajouter le thème actif à `src/data/learning/curriculum.json` si le fichier doit devenir un seed local.
5. Lancer `npm run validate:learning`.

En production, le flux recommandé est **JS Progress → Importer un JSON**. Un nouveau thème valide est ajouté à son niveau du curriculum et apparaît immédiatement, sans redéploiement.

## Identifiants

Les IDs utilisent uniquement des minuscules ASCII, des chiffres et des tirets : `arrays-exercise-001`.

- Ils sont stables et uniques dans tout le thème.
- Un ID publié ne doit pas être réutilisé pour un autre contenu : la progression MongoDB s’y rattache.
- Les prérequis de thème utilisent des IDs de thèmes existants.
- Les prérequis d’exercice utilisent des IDs d’unités existantes ou prévues par le parcours.

## Valeurs autorisées

- `schemaVersion` : `1`
- `difficulty` / `level` : `Facile`, `Moyen`, `Difficile`
- `resource.kind` : `book`, `mdn`, `roadmap`, `video`, `notes`, `other`
- `achievement.metric` : `completedTheory`, `completedExercises`, `completedPseudocode`, `completedChallenges`, `completedProjects`
- portée d’achievement : exactement une de `global`, `levelId`, `topicId`, `projectId`, `itemIds`
- XP et temps estimés : entiers strictement positifs

## Import

Le navigateur effectue une première validation. Le serveur recommence toujours la validation stricte, contrôle la taille, l’autorisation admin, les références et les conflits.

- **Créer** : réservé à un ID absent.
- **Fusionner** : met à jour les éléments portant le même ID et conserve les autres.
- **Remplacer** : sauvegarde puis remplace le thème complet.

Les dix dernières versions d’un thème sont conservées. Le rollback restaure le contenu ; il ne modifie jamais `learning_progress` ni `learning_activity`.

## Export

`GET /api/learning/export` exporte le catalogue complet. Les paramètres `scope=topic&id=...`, `scope=curriculum`, `scope=projects` et `scope=achievements` fournissent des vues ciblées.

## Compatibilité future

Toute évolution du contrat passe par une nouvelle version du schéma et une migration centralisée. Les composants React ne doivent contenir aucune adaptation spécifique à un thème.
