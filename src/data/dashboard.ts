import {
  AlertTriangle,
  Bot,
  ClipboardCheck,
  Database,
  FileDiff,
  FileJson,
  Fingerprint,
  History,
  ListTodo,
  Radar,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { PokemonSectionId } from "@/data/pokemon-routes";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon | string;
  sectionId?: PokemonSectionId;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

const filtersAssetBase =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers/Filters";
const pokemonAssetBase =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers";
const localNavigationIconBase = "/assets/ui/icons/general";

export const pokemonNavigationIcons = {
  collections: `${localNavigationIconBase}/pokeball.webp`,
  assets: `${localNavigationIconBase}/ic_evolvable.png`,
  catalogs: `${localNavigationIconBase}/pokedex-galar.webp`,
  docs: `${localNavigationIconBase}/search.png`,
  pvpRankings: `${localNavigationIconBase}/ic_battle.png`,
  pvpSimulator: `${localNavigationIconBase}/TodayView_Icon_Battle.webp`,
  gblCalendar: `${localNavigationIconBase}/ic_date.png`,
  bestAttackers: `${localNavigationIconBase}/ic_Legendary_small.png`,
  bestDefenders: `${localNavigationIconBase}/ic_route_medal_outline.png`,
  communityDays: `${localNavigationIconBase}/ic_event.png`,
  eventsHistory: `${localNavigationIconBase}/ep_point_icon.png`,
} as const;

export const navGroups: NavGroup[] = [
  {
    id: "home",
    label: "Accueil",
    items: [
      { href: "/", label: "Accueil", icon: `${pokemonAssetBase}/btn_pokeball_white_shadow.png`, sectionId: "overview" },
    ],
  },
  {
    id: "pokemon-data",
    label: "Données Pokémon",
    items: [
      { href: "/pokedex", label: "Fiches", icon: `${filtersAssetBase}/ic_alola.png`, sectionId: "pokedex" },
      { href: "/candies", label: "Candies", icon: `${filtersAssetBase}/TodayView_Icon_CandyXL.png`, sectionId: "candies" },
      { href: "/backgrounds", label: "Backgrounds", icon: `${filtersAssetBase}/TodayView_Icon_PostCard.png`, sectionId: "backgrounds" },
      { href: "/collections", label: "Collections", icon: pokemonNavigationIcons.collections, sectionId: "collections" },
      { href: "/assets", label: "Assets", icon: pokemonNavigationIcons.assets, sectionId: "assets" },
      { href: "/json-builder", label: "JSON Builder", icon: FileJson, sectionId: "json-builder" },
      { href: "/catalogues", label: "Catalogues", icon: pokemonNavigationIcons.catalogs, sectionId: "catalogs" },
      { href: "/pokemon-docs", label: "Docs JSON", icon: pokemonNavigationIcons.docs },
      { href: "/shiny-tracker", label: "Shiny Tracker", icon: `${filtersAssetBase}/ic_shiny_white.png`, sectionId: "shiny" },
    ],
  },
  {
    id: "combat",
    label: "Combat",
    items: [
      { href: "/pvp-rankings", label: "PvP Rankings", icon: pokemonNavigationIcons.pvpRankings, sectionId: "pvp-rankings" },
      { href: "/pvp-simulator", label: "Simulateur PvP", icon: pokemonNavigationIcons.pvpSimulator, sectionId: "pvp-simulator" },
      { href: "/gbl-calendar", label: "Calendrier GBL", icon: pokemonNavigationIcons.gblCalendar, sectionId: "gbl-calendar" },
      { href: "/best-attackers", label: "Best Attackers", icon: pokemonNavigationIcons.bestAttackers, sectionId: "best-attackers" },
      { href: "/best-defenders", label: "Best Defenders", icon: pokemonNavigationIcons.bestDefenders, sectionId: "best-defenders" },
      { href: "/raids", label: "Raids", icon: `${filtersAssetBase}/TodayView_Icon_Raid.png`, sectionId: "raids" },
      { href: "/max-battles", label: "Max Battles", icon: `${filtersAssetBase}/TodayView_Icon_Evolve.png`, sectionId: "max-battles" },
      { href: "/rocket", label: "Rocket", icon: `${filtersAssetBase}/TodayView_Icon_TeamRocket.png`, sectionId: "rocket" },
    ],
  },
  {
    id: "events",
    label: "Événements",
    items: [
      { href: "/eggs", label: "Œufs", icon: `${filtersAssetBase}/TodayView_Icon_LuckyEgg.png`, sectionId: "eggs" },
      { href: "/research", label: "Research", icon: `${filtersAssetBase}/TodayView_Icon_Research.png`, sectionId: "research" },
      { href: "/events", label: "Calendrier Events", icon: `${filtersAssetBase}/TodayView_Icon_Event.png`, sectionId: "events" },
      { href: "/community-days", label: "Community Days", icon: pokemonNavigationIcons.communityDays, sectionId: "community-days" },
      { href: "/events-history", label: "Historique Events", icon: pokemonNavigationIcons.eventsHistory, sectionId: "events-history" },
    ],
  },
  {
    id: "quality",
    label: "Qualité & supervision",
    items: [
      { href: "/identity-manager", label: "Identity Manager", icon: Fingerprint, sectionId: "identity-manager" },
      { href: "/pokemon-identity-mappings", label: "Résolution variantes", icon: Radar, sectionId: "pokemon-identity-mappings" },
      { href: "/game-master-explorer", label: "Game Master Explorer", icon: Database, sectionId: "game-master-explorer" },
      { href: "/checks", label: "Contrôles", icon: AlertTriangle, sectionId: "checks" },
      { href: "/source-watch", label: "Veille", icon: Radar, sectionId: "sources" },
      { href: "/compare", label: "Comparaison", icon: FileDiff, sectionId: "compare" },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    items: [
      { href: "/pokemon-todo", label: "Todo Pokémon", icon: ListTodo, sectionId: "todo" },
      { href: "/logs", label: "Logs & MAJ", icon: History, sectionId: "logs" },
      { href: "/rules", label: "Règles JSON", icon: Sparkles, sectionId: "rules" },
      { href: "/bulk-corrections", label: "Corrections", icon: ClipboardCheck, sectionId: "bulk" },
      { href: "/export", label: "Export", icon: FileJson, sectionId: "export" },
      { href: "/discord-bot", label: "Discord Bot", icon: Bot },
      { href: "/database", label: "Mongo DB", icon: Database },
    ],
  },
];

export const navItems = navGroups.flatMap((group) => group.items);
