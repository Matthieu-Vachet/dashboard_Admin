# Rapport générique des entrées non matchées

`UnmatchedEntriesReport` rend actionnables les écarts conservés pendant une régénération. Le contrôle compact affiche `Voir les N non-matchés` dès que le compteur est supérieur à zéro, y compris lorsque le détail historique est incomplet.

La modale officielle expose pour chaque entrée le provider, l’identifiant et le nom source, la valeur brute, la raison normalisée, les candidats, la confiance, la destination éventuelle et le statut. Elle conserve aussi la forme et le costume source utiles aux variantes Pokémon.

Les grands rapports sont limités à 50 cartes par page. La recherche couvre l’intégralité de l’entrée structurée. Trois filtres indépendants ciblent la raison, le provider et le statut. Les rapports anciens dont le compteur excède le nombre de détails affichent une alerte explicite ; une nouvelle régénération alimentée par l’API compatible produit le contrat complet.

Le même composant est utilisé par la modale directe et par l’historique des exécutions. La compatibilité avec `diagnostics.unmatchedEntries` est maintenue, tandis que `diagnostics.unmatchedReport.entries` est prioritaire.
