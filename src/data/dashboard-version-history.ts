export type DashboardVersionEntry = {
  version: string;
  date: string;
  title: string;
  changes: string[];
};

export const dashboardVersionHistory: DashboardVersionEntry[] = [
  {
    version: "V1.1.0",
    date: "2026-06-26",
    title: "Redéploiement data et historique PokemonGo-Data",
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
