# Contrôles de régénération compacts

## Périmètre

Le composant partagé `RegenerationControl` remplace la présentation toujours développée des sources de datasets. Les douze consommateurs historiques de `DatasetSourceHeader` héritent automatiquement du nouveau rendu via la façade de compatibilité.

La ligne initiale contient uniquement :

- la dernière date de synchronisation disponible ;
- le statut courant du dataset ou de la régénération ;
- le bouton **Détails** ;
- l’action principale de régénération déjà portée par le panneau métier.

## Détails à la demande

Provider, visibilité, mode, événement, total, dates de récupération et d’enregistrement, hash, operation ID, compteurs matchés/non matchés, diff, warnings, URL source, historique et rapport ne sont rendus qu’après ouverture de **Détails**. Le panneau repart fermé à chaque montage et chaque instance reçoit un identifiant ARIA unique.

## Invariants fonctionnels

Le refactor ne modifie ni le Generator Registry (17 actions, 15 globales), ni les endpoints, permissions, timeouts, états, polling, toasts, rapports ou handlers de bouton. Les noms `DatasetSourceHeader` et `CurrentDatasetDiagnostics` restent exportés pour les pages existantes.
