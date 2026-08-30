# Sémantique Fiches — Costumes / événements

## Cause de la divergence 130 / 311

Le badge du filtre Fiches comptait les entrées canoniques porteuses d’au moins un `eventAssets` : **130 fiches sources**. Le contenu du filtre, lui, passait déjà par `costumePresentationEntries` et affichait une carte par identité costume/événement : **311 résultats**. Le badge et la liste ne mesuraient donc pas la même unité.

## Définition retenue

Le filtre **Costumes / événements** est aligné sur Collections `event.single.standard` :

- seuls `kind === "costume"` et `kind === "event"` sont inclus ;
- chaque triplet identité canonique + forme + costume produit au plus une carte ;
- les assets mâle/femelle de la même identité sont regroupés sur cette carte ;
- un costume uniquement femelle reste une identité principale visible ;
- les variantes de genre sans costume/événement sont exclues ;
- les formes structurelles, Méga, Dynamax et Gigamax ne sont pas réintroduites ;
- une entrée sans asset exact ou non publiée n’entre pas dans Collections et l’audit courant confirme qu’aucune des 311 identités n’est concernée.

Au snapshot Data `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`, les compteurs calculés sont :

| Mesure | Total | Sens |
|---|---:|---|
| Fiches sources porteuses | 130 | Pokémon/formes possédant au moins un costume ou événement |
| Fiches affichées / Collections single standard | 311 | identités costume/événement, sexes regroupés |
| Collections multi standard | 429 | assets sexués séparés |
| Variantes femelles ajoutées en multi | 118 | différence entre les deux modes |

Le Dashboard affiche désormais **311** sur le badge, car c’est le nombre de résultats ouverts par ce filtre. Il n’est pas codé en dur : il provient de la même projection calculée que la liste.

## Cas de régression

- Bulbizarre : 3 identités principales ;
- Pikachu : 96 identités principales, sans double comptage mâle/femelle ;
- Chrysacier : 0, car aucun costume/événement ;
- Évoli : 7 identités principales, contre 14 assets en multi dont 7 femelles.
