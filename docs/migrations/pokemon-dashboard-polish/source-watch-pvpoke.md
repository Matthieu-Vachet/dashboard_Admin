# Veille PvPoke alignée sur le pipeline canonique

## Cause du faux HTTP 403

La veille contrôlait deux pages `pvpoke.com` qui ne sont pas les entrées réseau du pipeline. Ces pages peuvent refuser un robot HTTP alors que la régénération reste parfaitement fonctionnelle. Leur statut ne décrivait donc pas la santé de notre source de données.

## Contrat contrôlé

Le registre PokemonGo-Data expose désormais exactement deux contrôles PvPoke :

- le Game Master distribué par `cdn.jsdelivr.net/gh/pvpoke/pvpoke@master/src/data/gamemaster.json` ;
- le classement Great League distribué par jsDelivr, complété par l’arbre GitHub `git/trees/master?recursive=1` réellement utilisé pour découvrir tous les formats.

La veille récupère également le commit courant de `pvpoke/pvpoke`. Le token Data éventuel n’est envoyé qu’à `api.github.com`; jsDelivr reste public et aucune protection de `pvpoke.com` n’est contournée.

## Preuves visibles

Chaque ligne de la page Veille affiche le provider, l’URL contrôlée, le statut HTTP, le commit distant, le SHA-256 du JSON reçu, la dernière vérification et le commit/hash du snapshot local épinglé. La tête distante et le snapshot local sont volontairement distingués : un snapshot plus ancien reste un état reproductible, pas une indisponibilité réseau.
