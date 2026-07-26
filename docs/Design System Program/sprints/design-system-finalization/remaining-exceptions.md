# Exceptions et dettes restantes

## QA non vérifiée

| Dette | Statut | Raison |
|---|---|---|
| iOS physique | NOT VERIFIED | aucun appareil physique disponible |
| Android physique | NOT VERIFIED | aucun appareil physique disponible |
| Clavier virtuel et touch réel | NOT VERIFIED | un viewport Playwright ne constitue pas une preuve physique |
| Zoom 200 % / 400 % | NOT VERIFIED | le harness existant modifie la taille racine inline, mais cette mutation reste sans effet sur la page authentifiée et ne constitue pas une simulation fiable du zoom navigateur |
| Core Web Vitals et budgets | NOT VERIFIED | aucune infrastructure ni historique de mesure fiable ; DOC-022 conserve cette dette |

## Spécialisations métier conservées

- couleurs de types, raids, œufs, météo, rareté, événements, séries de données et assets ;
- pills Pokémon/Events dont l’anatomie transporte des données ou interactions propres au domaine ;
- DnD, cartes sélectionnables, navigation, toggles, viewers JSON et contrôles de visualisation ;
- skeletons, progressions, imports, écrans pleine page et loaders métier ;
- drawers, popovers et dialogs imbriqués non équivalents à Modal ;
- glows, gradients, backgrounds, artwork et géométries décoratives.

## Ambiguïtés

- 115 actions Button-like demandent une décision d’anatomie ou d’interaction avant toute composition ;
- 24 Badge-like génériques historiques et 96 badges métier ne partagent pas sûrement le squelette Badge ;
- 38 contrôles natifs Field-like restent attachés à des viewers, recherches spécialisées ou structures historiques dont l’équivalence runtime n’est pas démontrée ;
- 290 hardcodes Color neutres et 248 occurrences ambiguës n’ont pas d’équivalence de token certaine ;
- 58 sites Motion appartiennent au domaine, à la décoration ou à une orchestration ambiguë ;
- un état visuel dashed reste classé ambigu dans State System.

Ces cas sont `UX DECISION REQUIRED` uniquement lorsqu’une uniformisation produit est souhaitée. Ils ne sont pas des migrations mécaniques restantes.

## Primitive potentielle

Aucune répétition générique massive non couverte n’a été démontrée avec un contrat suffisamment certain pour proposer une primitive. Aucun `POTENTIAL FUTURE PRIMITIVE` n’est ouvert.

## Figma

`DS-BACKLOG-015` reste une décision de produit/design distincte. L’absence de synchronisation Figma ne remet pas en cause la clôture de l’implémentation structurelle React/CSS actuelle.
