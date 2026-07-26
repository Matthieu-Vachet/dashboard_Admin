# Plan de migration Motion System

## Lot 1 — Foundation

- ajouter trois durations et trois easings à `globals.css` ;
- connecter les valeurs par défaut Tailwind ;
- exposer les constantes secondes et la recette spring nécessaires à Framer ;
- installer la politique Framer reduced-motion au Provider racine.

## Lot 2 — primitives et UI générique

- Button et actions génériques : 150/200 ms vers les rôles fast/normal ;
- shell et drawer : 300 ms vers slow, spring conservé par recette ;
- palette et dialog historique : durées numériques remplacées par les constantes ;
- motion-border : opacité alignée sur normal/standard ;
- aucune API, sémantique HTML, structure de DOM ou logique d’interaction modifiée.

## Lot 3 — migration globale sûre

- remplacer les `duration-150`, `duration-200` et `duration-300` génériques ou compatibles ;
- conserver `duration-500`, les transitions width/height, délais de visualisation et boucles métier lorsqu’ils sont fonctionnels ;
- ne créer aucune motion sur les Cards statiques et ne rouvrir ni Modal, ni Color, ni Typography, ni Visual Consistency.

## Lot 4 — reduced motion et validation

- couvrir transitions CSS, boucles Tailwind/CSS et Framer globalement ;
- valider normal/reduced sur dark/light × 375×812, 768×1024 et 1440×1000 ;
- tester Button, Card interactive, forms, Modal, State System, menu palette, drawer, Admin Pokémon, Events et Dashboard ;
- exécuter tests Design System impactés, TypeScript, ESLint, build et `git diff --check` ;
- synchroniser Programme et DOC Foundation réellement propriétaires.

## Rollback

Retirer d’abord les rôles des consommateurs, restaurer les durées explicites, retirer la politique MotionConfig, puis les variables/utilitaires. Les animations fonctionnelles et métier ne sont pas supprimées pendant la migration.
