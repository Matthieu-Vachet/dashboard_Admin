export type PokemonSectionId =
  | "overview"
  | "pokedex"
  | "candies"
  | "backgrounds"
  | "collections"
  | "assets"
  | "json-builder"
  | "catalogs"
  | "raids"
  | "max-battles"
  | "rocket"
  | "pvp-simulator"
  | "pvp-rankings"
  | "gbl-calendar"
  | "best-attackers"
  | "best-defenders"
  | "eggs"
  | "research"
  | "events"
  | "community-days"
  | "events-history"
  | "shiny"
  | "identity-manager"
  | "pokemon-identity-mappings"
  | "game-master-explorer"
  | "checks"
  | "sources"
  | "compare"
  | "todo"
  | "logs"
  | "rules"
  | "bulk"
  | "export";

export type PokemonSectionRoute = {
  id: PokemonSectionId;
  slug: string;
  path: string;
  label: string;
  description: string;
};

export const pokemonSectionRoutes: PokemonSectionRoute[] = [
  { id: "overview", slug: "", path: "/", label: "Accueil", description: "Santé des données, Engine et raccourcis Pokémon GO." },
  { id: "pokedex", slug: "pokedex", path: "/pokedex", label: "Fiches", description: "Catalogue et fiches Pokémon canoniques." },
  { id: "candies", slug: "candies", path: "/candies", label: "Candies", description: "Familles de bonbons et assets associés." },
  { id: "backgrounds", slug: "backgrounds", path: "/backgrounds", label: "Backgrounds", description: "Location Cards et liaisons visuelles." },
  { id: "collections", slug: "collections", path: "/collections", label: "Collections", description: "Checklists et collections Pokémon." },
  { id: "assets", slug: "assets", path: "/assets", label: "Assets", description: "Audit des assets Pokémon." },
  { id: "json-builder", slug: "json-builder", path: "/json-builder", label: "JSON Builder", description: "Création transactionnelle de fiches depuis les templates canoniques." },
  { id: "catalogs", slug: "catalogues", path: "/catalogues", label: "Catalogues", description: "Types, moves et catalogues de référence." },
  { id: "raids", slug: "raids", path: "/raids", label: "Raids", description: "Rotation des boss de raids." },
  { id: "max-battles", slug: "max-battles", path: "/max-battles", label: "Max Battles", description: "Rotation des combats Dynamax et Gigamax." },
  { id: "rocket", slug: "rocket", path: "/rocket", label: "Rocket", description: "Lineups Team GO Rocket et textes." },
  { id: "pvp-simulator", slug: "pvp-simulator", path: "/pvp-simulator", label: "Simulateur PvP", description: "Battle Lab et simulations PvP." },
  { id: "pvp-rankings", slug: "pvp-rankings", path: "/pvp-rankings", label: "PvP Rankings", description: "Classements et builds PvP." },
  { id: "gbl-calendar", slug: "gbl-calendar", path: "/gbl-calendar", label: "Calendrier GBL", description: "Rotations de la GO Battle League." },
  { id: "best-attackers", slug: "best-attackers", path: "/best-attackers", label: "Best Attackers", description: "Classements des attaquants PvE." },
  { id: "best-defenders", slug: "best-defenders", path: "/best-defenders", label: "Best Defenders", description: "Classements des défenseurs d’arène." },
  { id: "eggs", slug: "eggs", path: "/eggs", label: "Œufs", description: "Pools d’éclosion actifs." },
  { id: "research", slug: "research", path: "/research", label: "Research", description: "Études de terrain et récompenses." },
  { id: "events", slug: "events", path: "/events", label: "Calendrier Events", description: "Événements Pokémon GO actifs et à venir." },
  { id: "community-days", slug: "community-days", path: "/community-days", label: "Community Days", description: "Community Days synchronisés." },
  { id: "events-history", slug: "events-history", path: "/events-history", label: "Historique Events", description: "Archives des événements Pokémon GO." },
  { id: "shiny", slug: "shiny-tracker", path: "/shiny-tracker", label: "Shiny Tracker", description: "Suivi des sorties chromatiques." },
  { id: "identity-manager", slug: "identity-manager", path: "/identity-manager", label: "Identity Manager", description: "Identités canoniques et résolutions." },
  { id: "pokemon-identity-mappings", slug: "pokemon-identity-mappings", path: "/pokemon-identity-mappings", label: "Résolution variantes", description: "Mappings des variantes non résolues." },
  { id: "game-master-explorer", slug: "game-master-explorer", path: "/game-master-explorer", label: "Game Master Explorer", description: "Exploration privée du Game Master." },
  { id: "checks", slug: "checks", path: "/checks", label: "Contrôles", description: "Diagnostics et contrôles de cohérence." },
  { id: "sources", slug: "source-watch", path: "/source-watch", label: "Veille", description: "Surveillance des providers et sources." },
  { id: "compare", slug: "compare", path: "/compare", label: "Comparaison", description: "Comparaison de fiches Pokémon." },
  { id: "todo", slug: "pokemon-todo", path: "/pokemon-todo", label: "Todo Pokémon", description: "Actions de maintenance Pokémon." },
  { id: "logs", slug: "logs", path: "/logs", label: "Logs & MAJ", description: "Historique des mises à jour et déploiements." },
  { id: "rules", slug: "rules", path: "/rules", label: "Règles JSON", description: "Règles de validation des datasets." },
  { id: "bulk", slug: "bulk-corrections", path: "/bulk-corrections", label: "Corrections", description: "Prévisualisation des corrections groupées." },
  { id: "export", slug: "export", path: "/export", label: "Export", description: "Export des données filtrées." },
];

export function pokemonSectionById(value: string | null | undefined) {
  return pokemonSectionRoutes.find((section) => section.id === value) || pokemonSectionRoutes[0];
}

export function pokemonSectionBySlug(value: string | null | undefined) {
  return pokemonSectionRoutes.find((section) => section.slug === value) || null;
}

export function pokemonSectionPath(value: string | null | undefined) {
  return pokemonSectionById(value).path;
}
