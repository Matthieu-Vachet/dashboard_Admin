# Restauration des alertes de Veille — 2026-09-01

## Audit du comportement antérieur

La collecte distante, les providers, leurs URLs canoniques, les signatures, les snapshots et l’historique MongoDB étaient toujours présents. L’historique Git localise la régression dans la couche de présentation :

- `6ab5efc` (`feat: refine pokemon admin widgets`) a introduit `persistSourceSignatures`, une référence `localStorage` remplacée à chaque vérification et une signature concaténant contenu, statut et message.
- `438cfb6` (`feat: improve pokemon admin filters and assets`) a ajouté la forte carte rouge « source modifiée ».
- `fd01aed` (`refactor(veille): deliver professional source monitoring interface`) a ensuite recalculé le ton principal des cartes depuis le seul état provider et réduit le changement à une petite pastille/zone secondaire.
- `33f4bbf` n’a fait que déplacer cette logique pendant la réorganisation de l’architecture Admin.

Le changement n’était donc visible que pendant un seul rendu et disparaissait après un refresh ou un polling identique. Comme statut et message participaient aussi à l’empreinte, une erreur fournisseur pouvait être interprétée comme une modification.

## Architecture retenue

- État persistant par administrateur dans `matweb.pokemon.sourceWatchState`.
- Référence initiale sans faux positif, puis comparaison de l’empreinte de contenu canonique uniquement lorsque le contrôle réussit.
- État non lu conservé jusqu’à un acquittement explicite, unitaire ou global.
- Historique `matweb.pokemon.sourceHistory` conservé indépendamment des acquittements.
- Erreurs provider enregistrées comme état de contrôle mais exclues des événements de changement.
- Lecture légère du compteur par le layout, sans déclencher de nouveau polling distant.

## Surfaces restaurées

- Badge numérique sur l’entrée Veille de la sidebar desktop et mobile.
- Bannière globale persistante dans la page Veille.
- Carte fortement signalée pour chaque source modifiée, avec type, date et empreintes avant/après réelles.
- Acquittement par source et acquittement global.
- Signal d’attention sur la Home Admin Pokémon.
- États explicites : À jour, Changement détecté, Erreur, Jamais vérifiée.
- Dates Dernière vérification et Dernier changement affichées séparément.

## Compatibilité préservée

Les fetchers, URLs de providers, snapshots locaux, preuves commit/hash, scheduler existant et routes de supervision n’ont pas été remplacés. Les tests canoniques PvPoke continuent de contrôler les distributions et preuves techniques existantes.

## Validation

- Scénarios unitaires : inchangé, changement, refresh persistant, acquittement, historique, nouveau changement après acquittement, trois alertes, erreur provider.
- Contrats source-watch canoniques.
- Tests structure Admin Pokémon.
- TypeScript, ESLint, Design System, version et build production.
- Vérification navigateur desktop/mobile et light/dark avant promotion en production.
