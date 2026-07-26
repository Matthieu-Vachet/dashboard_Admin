# Contrat Responsive System

## Mobile first et breakpoints

Les layouts sont écrits mobile first. Les seuls paliers génériques sont ceux de Tailwind : `sm` 640 px, `md` 768 px, `lg` 1024 px, `xl` 1280 px et `2xl` 1536 px. Un seuil arbitraire n’est accepté que pour une composition métier locale, finie et documentée ; il ne devient pas un second système de breakpoints.

La logique métier et le chargement des données ne branchent pas sur la largeur du viewport. CSS décide de la disposition et peut présenter une composition spécialisée lorsque le contenu l’exige.

## Shell et largeur disponible

- sous `lg`, la navigation principale est un drawer de 286 px au maximum, borné à `calc(100vw - 1rem)` ;
- à partir de `lg`, la sidebar fixe vaut 84 px repliée ou 236 px dépliée, puis 286 px à `2xl` ;
- le contenu principal est plafonné à 1 680 px et ses chaînes flex/grid utilisent `min-w-0` lorsque leur enfant peut rétrécir ;
- un drawer ouvert verrouille le scroll du body, reçoit le focus, piège Tab, ferme sur Escape et restitue le focus au déclencheur.

## Hauteur mobile

Une surface plein écran conserve si nécessaire un fallback `vh`, puis adopte `dvh` pour suivre la zone visible mobile. Les pages et shells utilisent `min-h-dvh`; les overlays et viewers bornent leur hauteur en `dvh` et gardent un scroll interne.

## Grilles, flex, toolbars et formulaires

- les grilles commencent à une colonne et progressent par breakpoint ;
- les groupes flex peuvent revenir à la ligne et leurs enfants rétrécissables utilisent `min-w-0` ;
- filtres et toolbars conservent toutes leurs actions, par wrapping, grille ou scroll local ;
- les contrôles restent visibles, nommés et utilisables sans changement de donnée ni de handler.

## Modales et drawers

La boîte visible reste contenue dans le viewport. Le contenu long scrolle à l’intérieur sans créer d’overflow horizontal global. Les dialogues conservent un nom accessible, un focus initial dans le dialogue, un piège Tab/Shift+Tab, Escape, le verrouillage du body et le retour du focus.

Les modales métier peuvent garder leur anatomie distincte lorsqu’une migration vers la primitive commune changerait leur rendu ou leur API.

## Tableaux et contenus techniques

Un tableau large est placé dans un parent `overflow-x-auto`/`scroll`; le document global ne scrolle pas horizontalement. Une vue cartes peut remplacer le tableau sur mobile lorsque le composant métier le prévoit déjà, sans perte de donnée. Les blocs de code, JSON et chaînes longues possèdent leur propre scroll ou stratégie de coupure.

## Matrice de référence

Toute clôture responsive couvre au minimum 375×812, 768×1024 et 1440×1000, en thèmes clair et sombre, avec erreurs console/React, overflow global, navigation, formulaires, tableaux et overlays. Les campagnes spécialisées peuvent ajouter d’autres largeurs.
