# Coéquipiers suggérés PvP

## Cause racine

Le proxy Dashboard atteignait correctement `PokemonGo-API`, mais l'API lançait le Team Ranker client de PvPoke dans Chromium. Les logs Vercel montraient d'abord un timeout du sélecteur `.partner-pokemon .list a`, puis un `FUNCTION_INVOCATION_TIMEOUT` à 60 secondes malgré le filtrage des ressources tierces. Le calcul est rapide dans un navigateur local, mais son démarrage et ses simulations ne sont pas compatibles avec le budget CPU d'une Function froide.

## Contrat réparé

- l'API calcule les compléments depuis le snapshot PvPoke MongoDB déjà synchronisé pour la ligue ;
- `league`, `speciesId`, forme régionale, rang, `matchups`, `counters`, score, identité et assets proviennent du même snapshot ;
- Great, Ultra et Master gardent leur contexte PvPoke propre ;
- une espèce absente du classement renvoie `200`, `data: []`, `emptyReason: RANKING_NOT_FOUND` ;
- un snapshot invalide reste une erreur explicite et n'est jamais maquillé en état vide ;
- le proxy Dashboard conserve le statut HTTP et extrait aussi `error.message` dans les erreurs API structurées ;
- l'interface affiche un état vide neutre lorsqu'aucune suggestion n'est disponible.

Le cache est indexé par `sourceHash`, ligue et espèce. Une écriture de cache impossible n'annule pas un calcul valide et reste visible dans `persistenceWarnings`.
