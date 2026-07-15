# Audit et migration JS Progress V2

## État initial

- Six fichiers étaient importés en dur et leur ordre dépendait du code TypeScript.
- 13 unités `completed` et 12 unités `in_progress` étaient intégrées au contenu.
- Quatre achievements avaient une cible supérieure au nombre d’unités disponibles.
- Le badge MongoDB masquait un stockage générique `dashboard_store` avec fallback localStorage.
- Théorie, exercice, pseudo-code, challenge et projet partageaient un contrat minimal.

## Décisions

- `curriculum.json` pilote l’ordre ; `plannedTopics` documente le futur sans créer de faux contenus.
- Les six fichiers V1 restent des seeds représentatifs et ne portent plus de progression.
- MongoDB est prioritaire dès que `learning_topics` contient un catalogue ; sinon les seeds locaux assurent un fallback explicite.
- Les projets restent imbriqués dans les thèmes pour préserver la structure existante.
- Le temps et l’historique antérieurs, inconnus, ne sont pas inventés.

## Migration sans perte

Le snapshot `src/data/learning/migrations/v1-legacy-content-status.snapshot.json` conserve les anciens statuts de démonstration, mais il est volontairement exclu de toute migration automatique.

La progression réellement persistée sous `matweb.js.learning.progress` est copiée par `itemId` vers `learning_progress` avec des upserts idempotents. La source historique n’est pas supprimée. Les statuts terminés conservent l’XP définie au moment de la migration ; aucune activité datée artificielle n’est ajoutée.

## Collections

- `learning_topics` : contenu pédagogique partagé
- `learning_curricula` : manifeste et ordre
- `learning_progress` : progression par utilisateur et unité
- `learning_activity` : événements réels et XP
- `learning_imports` : journal des imports et rollbacks
- `learning_topic_versions` : sauvegardes, dix dernières versions par thème
