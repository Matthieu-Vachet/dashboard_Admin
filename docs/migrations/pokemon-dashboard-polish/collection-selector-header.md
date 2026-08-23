# Sélecteur dans la collection active

## Hiérarchie

Le sélecteur n'occupe plus une rangée autonome entre les statistiques et le contenu actif. Le nom de la collection est désormais le déclencheur du sélecteur, dans l'en-tête de la card `Collection active`, immédiatement à gauche du menu d'actions.

Le même en-tête conserve :

- le type de collection ;
- le nom actif et son chevron ;
- la progression obtenue ;
- le nombre total de collections ;
- le menu d'actions.

## Responsive

Le déclencheur prend seulement l'espace restant avant le bouton d'actions. Son nom est tronqué visuellement et reste disponible via son attribut `title` et son nom accessible complet.

La liste des collections réutilise le sheet existant. Sur un écran étroit, elle reste contenue dans le viewport et n'écarte pas le menu d'actions.

## Vérification

Le scénario `npm run test:collections:e2e` couvre :

- une collection active ;
- deux collections et le passage de l'une à l'autre ;
- un nom volontairement très long ;
- un viewport étroit de 320 px ;
- sept tailles d'écran, les thèmes clair et sombre et l'absence d'erreur console.
