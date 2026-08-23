# Pagination des familles de bonbons

## Périmètre

La pagination appartient exclusivement à `CandyPanel`. Elle ne modifie ni l'état ni la présentation de Collections.

Les familles sont regroupées et filtrées avant pagination. Une page contient neuf familles, soit trois rangées sur un écran large à trois colonnes, tout en conservant une liste raisonnable sur mobile.

## Comportement

- les contrôles haut et bas exposent Précédent, Suivant, la page courante, le nombre de pages, la plage visible et le total filtré ;
- les boutons sont désactivés aux bornes ;
- un changement de page conserve la recherche active et replace la vue au début de la liste ;
- un changement de recherche ou du jeu d'entrées réinitialise la page visible à 1 ;
- les filtres éventuels fournis en amont sont inclus dans ce changement d'entrées ;
- aucun état de pagination n'est partagé avec Collections.

La fonction pure `paginateCandyFamilies` borne la page demandée et calcule les plages sans dépendre du rendu React.

## Vérification

`npm run test:candy-pagination` couvre une première page complète, la dernière page partielle, les totaux, les pages hors limites, l'état vide, le reset et l'isolation de Collections.

Le parcours navigateur couvre 542 familles, les pages 1 et 2, le reset par recherche, la conservation de la recherche, le thème clair et le viewport mobile 390 px.
