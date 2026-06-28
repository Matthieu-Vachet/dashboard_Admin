export type DashboardVersionEntry = {
  version: string;
  date: string;
  title: string;
  changes: string[];
};

export const dashboardVersionHistory: DashboardVersionEntry[] = [
  {
    version: "V1.4.3",
    date: "2026-06-28",
    title: "Validation assetForms nullable",
    changes: [
      "Accepte assetForms[].shinyImage en string ou null quand une variante Pokémon GO n'a pas de chromatique disponible.",
      "Normalise les assetForms hydratés pour garantir form, costume, shinyImage et isFemale avant validation.",
      "Corrige les faux positifs du vérificateur sur Venusaur COPY_2019 et les variantes femelles sans costume explicite.",
    ],
  },
  {
    version: "V1.4.2",
    date: "2026-06-28",
    title: "Synchronisation Mongo des assets vérifiés",
    changes: [
      "Déplace l'état des assets vérifiés de l'Admin Pokémon vers matweb.pokemon.assetChecks dans Mongo.",
      "Migre automatiquement l'ancien localStorage pokedex-v4-asset-checks quand Mongo ne contient pas encore de valeur.",
      "Synchronise chaque coche d'asset depuis les cartes, la modale Pokémon et le widget Admin Pokémon pour conserver l'état entre appareils.",
    ],
  },
  {
    version: "V1.4.1",
    date: "2026-06-28",
    title: "Compatibilité secret admin PokemonGo-API",
    changes: [
      "Corrige l'API Explorer Pokémon pour utiliser /api/v1/meta/filters au lieu de l'ancienne route /api/v1/meta/sync.",
      "Ajoute le support serveur optionnel de POKEMON_API_ADMIN_SECRET pour les actions privées PokemonGo-API saisies dans le proxy dashboard.",
      "Documente où configurer le secret admin côté Dashboard sans l'exposer au navigateur.",
      "Met à jour la documentation Pokémon embarquée avec l'authentification x-api-admin-secret.",
    ],
  },
  {
    version: "V1.4.0",
    date: "2026-06-28",
    title: "Dashboard Backlog interne",
    changes: [
      "Ajoute la page Dashboard Backlog dans Outils pour centraliser bugs, features, refactors, UI et data.",
      "Crée la collection Mongo dashboard_backlog avec modèle complet, historique, resolvedAt et contexte Codex généré.",
      "Expose l'API CRUD /api/dashboard-backlog et /api/dashboard-backlog/:id avec session, rate-limit et protection origin.",
      "Ajoute liste filtrable, statistiques, édition complète, archivage, suppression confirmée et exports Markdown Codex.",
      "Ajoute les filtres type, statut, priorité, page, composant, recherche texte et tris plus récent, priorité, statut.",
    ],
  },
  {
    version: "V1.3.0",
    date: "2026-06-27",
    title: "Éditeurs, calendrier, widgets, light mode et sidebar",
    changes: [
      "Refond l'éditeur Notes avec recherche, tri, tags, priorité, couleur, favoris, dates et suppression confirmée.",
      "Transforme le Kanban en cartes projet enrichies avec description, liens, images, tags, priorité, statut, échéance, checklist et édition complète en modale.",
      "Ajoute un éditeur texte enrichi avec toolbar, titres, listes, citations, liens, blocs code, aperçu et sauvegarde visible.",
      "Refond le Calendrier pour gérer les événements Pokémon GO avec dates début/fin, catégories, statuts, couleurs, filtres et vues en cours/à venir.",
      "Ajoute drag & drop, masquage, restauration et ordre sauvegardé aux widgets Outils et Analytics avec glow contrôlé compatible dark/light.",
      "Reprend le light mode global et regroupe la sidebar en sous-menus repliables plus lisibles.",
    ],
  },
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
