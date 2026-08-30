# Home — panneau d’attention responsive

## Problème observé

La rangée de quatre actions reposait sur un `flex-wrap`. Sur un écran MacBook, la largeur restante après la sidebar et la colonne de recherche produisait trois boutons sur la première ligne puis un bouton isolé sur la seconde. Les deux colonnes n’avaient pas la même hauteur visuelle et les appels à l’action semblaient désalignés.

## Composition retenue

Le panneau conserve strictement les mêmes informations et actions métier. Sa composition est maintenant déterministe :

- à partir de 1280 px, résumé et outils forment deux colonnes étirées de même hauteur, séparées par une ligne verticale ;
- les quatre actions principales utilisent une grille 2 × 2 de largeurs identiques à partir de 640 px ;
- sous 640 px, chaque action occupe une rangée complète pour préserver les libellés et les zones tactiles ;
- recherche et raccourcis restent dans une colonne dédiée, centrée verticalement sur desktop ;
- les icônes ne rétrécissent pas et les boutons sont alignés à gauche sans collision de texte.

## Validation

Le scénario Playwright mesure explicitement les quatre CTA, l’alignement des deux colonnes MacBook et l’overflow. Il couvre 320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440 et 1920 px dans les thèmes clair et sombre, soit 220 combinaisons page/viewport validées.
