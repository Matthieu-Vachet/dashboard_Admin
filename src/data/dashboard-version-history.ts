export type DashboardVersionEntry = {
  version: string;
  date: string;
  title: string;
  changes: string[];
};

export const dashboardVersionHistory: DashboardVersionEntry[] = [
  {
    version: "V1.2.0",
    date: "2026-06-27",
    title: "Admin Pokémon : filtres, assets, collections et catalogues",
    changes: [
      "Corrige l'ouverture des fiches Pokémon depuis Bonbons, Collections et Catalogues même hors grille Pokédex active.",
      "Empêche les formes Méga de récupérer les assets HOME du Pokémon parent quand le JSON d'assets indique home: null.",
      "Rend les sources modifiées immédiatement repérables avec une carte entière en alerte rouge.",
      "Ajoute les filtres Fiches Chromatique, Costume/Event, Méga et Régional avec les bannières dédiées.",
      "Refond le pipeline Collections avec exclusion release:false, Méga seulement via type Méga, Dynamax/Gigamax stricts et tri Pokédex déterministe.",
      "Ajoute Sélectionner tous aux collections et recalcule les stats selon les mêmes règles que les listes.",
      "Étend la bibliothèque assets aux GO, HOME, portraits, variantes, backgrounds, bonbons et Shuffle avec copie d'URL GitHub.",
      "Ajoute les Pokémon liés dans le catalogue Attaques avec image et ouverture de la modale Pokémon.",
    ],
  },
  {
    version: "V1.1.1",
    date: "2026-06-27",
    title: "Correction des modales au-dessus de la sidebar",
    changes: [
      "Aligne les overlays modaux sur un niveau z-index global au-dessus de la navigation.",
      "Déplace les modales d'historique des sources et des déploiements data dans un portal document.body.",
      "Corrige la modale de détail Pokémon et sa preview d'asset pour rester au-dessus de la sidebar.",
      "Scanne les autres modales du dashboard : Projects, Kanban, Calendar, Snippets et Collections utilisent désormais un overlay hors du stacking context du contenu.",
    ],
  },
  {
    version: "V1.1.0",
    date: "2026-06-26",
    title: "Redéploiement PokemonGo-Data et historique data",
    changes: [
      "Ajoute un bouton Redéployer pour forcer un rebuild Vercel du Dashboard après un push PokemonGo-Data.",
      "Enregistre dans Mongo l'historique des redéploiements data avec comparaison des commits PokemonGo-Data.",
      "Liste les JSON fiches, formes, assets et catalogues modifiés par redéploiement dans Logs & MAJ.",
      "Ajoute un snapshot de commit PokemonGo-Data généré à chaque build.",
      "Ignore les assets image/shiny absents ou vides quand une fiche Pokémon n'est pas encore sortie.",
    ],
  },
  {
    version: "V1.0.2",
    date: "2026-06-26",
    title: "Synchronisation PokemonGo-Data et historique branche Mongo",
    changes: [
      "Force la mise a jour du clone .data/PokemonGo-Data avant le build.",
      "Aligne le Dashboard sur la nouvelle structure JSON avec pokemon-assets.",
      "Corrige le controle maxCp.maxBattlesLevel20 sur les fiches non Max.",
      "Remonte les modales d'historique au-dessus de la navigation.",
      "Branche l'historique des versions sur matweb.dashboard.versionHistory dans Mongo.",
      "Stabilise l'affichage mobile du widget Code du jour.",
    ],
  },
  {
    version: "V1.0.1",
    date: "2026-06-25",
    title: "Version visible du Dashboard",
    changes: [
      "Ajoute une pastille de version dans le header.",
      "Prepare l'historique de modifications du Dashboard.",
      "Nettoie les premiers problemes d'interface autour des logs et widgets.",
    ],
  },
  {
    version: "V1.0.0",
    date: "2026-06-25",
    title: "Premiere version suivie du Dashboard Admin",
    changes: [
      "Ajoute une version visible dans le header.",
      "Centralise les outils d'admin Pokemon, veille, docs et widgets.",
      "Pose la base du journal de modifications du Dashboard.",
    ],
  },
];
