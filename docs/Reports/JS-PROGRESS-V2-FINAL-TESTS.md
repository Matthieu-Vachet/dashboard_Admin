# JS Progress V2 — passe finale de sécurisation

Date d’exécution : 11 juillet 2026.

## Périmètre

Cette passe corrige les références du livre, ajoute les sections de théorie optionnelles et sécurise le cycle de progression sans modifier l’identité visuelle ni créer de contenu pédagogique supplémentaire.

Les références vérifiées sont :

- Fondamentaux JavaScript : 3.1, pages 31-34 ; 3.2, pages 35-38 ; 3.4-3.5, pages 40-46 ; 3.6, pages 47-51.
- Fonctions : 3.7, pages 52-58.
- Tableaux : chapitre 7, pages 97-115.
- Objets : chapitre 8, pages 117-136.
- DOM : chapitres 11, 12 et 13, pages 163-166, 177-202 et 209-231.
- Asynchrone : chapitres 14, 15 et 16, pages 235-241, 245-248 et 251-253.

## Scénario MongoDB isolé

Commande : `npm run test:learning-flow`.

Résultat : succès complet.

Le test crée une base dédiée nommée `jsp-e2e-<timestamp>`, démarre l’application avec cette base, puis supprime la base dans un bloc de nettoyage, succès ou échec. Il ne lit ni ne modifie les collections de progression réelles.

Étapes validées :

1. MongoDB vide et chargement des six seeds locaux.
2. Validation client d’un nouveau thème.
3. Nouvelle validation et import côté serveur.
4. Affichage immédiat du thème.
5. Relecture du thème depuis MongoDB.
6. Rendu d’une section de théorie détaillée.
7. Démarrage d’un exercice avec `startedAt`, sans XP.
8. Démarrage puis sauvegarde d’une réponse de pseudo-code.
9. Refus explicite d’une réponse vide.
10. Confirmation avant révélation d’une correction sans tentative.
11. Persistance de la réponse et de la consultation après rafraîchissement.
12. Confirmation avant fin d’un exercice.
13. Attribution unique de l’XP malgré une seconde requête.
14. Historique de démarrage et de fin sans doublon.
15. Recalcul et déblocage de l’achievement attendu.
16. Fusion d’une nouvelle version du thème avec progression intacte.
17. Rollback du contenu avec progression, réponse et consultation intactes.
18. Navigation clavier, fermeture par Échap et rendu mobile à 390 px sans débordement horizontal.

## Vérifications techniques

- `npm run validate:learning` : réussi, six thèmes validés.
- `npm run typecheck` : réussi.
- `npm run lint` : réussi sans erreur.
- `npm run build` : réussi.
- `npm run test:learning-flow` : réussi.

## Compatibilité MongoDB

Aucune migration destructive n’est requise. Les nouveaux champs de `learning_progress` sont optionnels et ajoutés lors des actions concernées. Un index unique sparse sur `learning_activity.eventKey` garantit l’idempotence des activités de démarrage et de fin tout en restant compatible avec l’historique existant.

Le contenu et la progression restent stockés dans des collections séparées. Les imports, fusions, remplacements et rollbacks de contenu ne suppriment ni ne réinitialisent `learning_progress`.

## Limites connues

- Le temps sauvegardé correspond à la durée écoulée entre démarrage et fin, plafonnée à six heures par session ; il ne détecte pas encore l’inactivité de l’onglet.
- Le rendu Markdown volontairement léger couvre les besoins pédagogiques courants, pas l’intégralité de GitHub Flavored Markdown.
- Le statut `reviewing` est accepté, persisté et affiché, mais aucun bouton dédié de mise en révision n’est ajouté dans cette passe ciblée.
