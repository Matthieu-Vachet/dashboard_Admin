# Inventaire State System

## Méthode

Le recensement couvre `src/components/**/*.{js,jsx,ts,tsx}`. Une occurrence est classée selon l’usage rendu, pas uniquement selon les mots « chargement », « aucun » ou « erreur ». Les badges de synchronisation, validations de formulaire, toasts, textes informatifs et réponses API serveur ne sont donc pas assimilés automatiquement à un état de vue.

## Classification A/B/C/D/E

| Classe | Définition | Résultat |
| --- | --- | ---: |
| A | état générique compatible, migrable directement | 69 racines |
| B | wrapper métier compatible composant le contrat | 9 racines |
| C | état spécialisé à conserver | 26 familles/branches recensées |
| D | faux positif lexical ou autre famille | 34 occurrences recensées |
| E | ambigu, décision reportée | 1 branche |

Le périmètre générique A+B compte **78 racines conditionnelles** : 15 Fetch Loading, 52 Empty/No Results et 11 Error. Un wrapper est compté à sa racine de rendu, pas multiplié par chaque appel consommateur.

## Fetch Loading — avant

| Famille | Nombre | Exemples |
| --- | ---: | --- |
| loaders génériques de fetch | 15 | statistiques Pokémon, bootstrap Admin, datasets, sources, identité, Trainer |
| animés modernes locaux | 2 | collection Trainer et historique Trainer |
| statiques/legacy compatibles | 13 | `Synchronisation...`, Panels « Chargement… », paragraphes d’historique et d’identité |
| skeletons fetch spécialisés | 4 | grille Templates, détail, comparaison, diff Game Master |
| module loading spécialisé | 2 | imports dynamiques Trainer et Game Master |
| pleine page/persistance | 6 consommateurs | Projects, Calendar, Kanban, Notes, Todo, Backlog |
| progression/import | 3 | command center, import Trainer, actualisation MongoDB |

Le pattern moderne retenu est celui de `trainer-pokemon-collection-panel.tsx` : une surface stable, un `LoaderCircle` centré, un texte explicite, la couleur `text-brand-2` et une hauteur minimale limitant le layout shift.

## Empty et No Results — avant

52 racines compatibles ont été relevées : **38 Empty** et **14 No Results**. Elles couvrent les historiques vides, listes et tableaux sans données, panneaux sans ressource, calendriers vides et résultats de filtres nuls. Deux wrappers locaux servent neuf appels consommateurs : `EmptyLine` (2) et `EmptyInline` (7). Deux wrappers Events reçoivent aussi un libellé métier dynamique.

Après migration, 52 points de composition `EmptyState` couvrent les 52 racines, les wrappers locaux composant désormais le contrat canonique.

## Error — avant

11 erreurs asynchrones génériques compatibles ont été identifiées : bootstrap Admin, Source Watch, deux vues Identity, collection Trainer avec reprise, Game Master, test API, apprentissage, backlog, MongoDB Stats et diagnostic de dataset. Les erreurs de formulaire, avertissements de configuration, toasts, erreurs d’import et erreurs métier détaillées restent spécialisés.

## Exceptions spécialisées

Les 10 surfaces encore `border-dashed` sont justifiées : zone de dépôt d’import Trainer, zone de dépôt pédagogique, cible Kanban, instruction du testeur API, sélection de fiche, informations PvP non fournies, slot Rocket sans Pokémon, alias fournisseur absent, historique Shiny insuffisant et un état détaillé Game Master. Elles ne partagent pas le contrat d’une liste vide générique.

Les loaders de boutons restent dans `Button`; les skeletons conservent la géométrie du contenu ; `DashboardLoadingState` reste un chargement pleine page/persistance ; les imports et commandes longues conservent leur progression métier.

## Ambiguïté E

`identity-manager-panel.tsx` affiche « Chargement ou aucune modification enregistrée » dans une même branche, sans état métier distinct. La séparer nécessiterait de modifier le modèle de fetching. Elle est donc documentée et laissée intacte conformément au périmètre.

## Couverture avant/après

| Famille compatible | Avant canonique | Avant legacy/local | Après canonique couvert | Après legacy |
| --- | ---: | ---: | ---: | ---: |
| Fetch Loading | 0 | 15, dont 13 statiques et 2 animés locaux | 15 | 0 |
| Empty + No Results | 0 | 52 | 52 | 0 |
| Error | 0 | 11 | 11 | 0 |
| Total | 0/78 (0 %) | 78 | 78/78 (100 %) | 0 |
