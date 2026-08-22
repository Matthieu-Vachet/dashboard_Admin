import {
  AlertTriangle,
  Archive,
  Bot,
  Boxes,
  CalendarDays,
  ClipboardCheck,
  Database,
  FileDiff,
  FileJson,
  Fingerprint,
  History,
  Images,
  ListTodo,
  Radar,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Swords,
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
      { href: "/collections", label: "Collections", icon: Boxes, sectionId: "collections" },
      { href: "/assets", label: "Assets", icon: Images, sectionId: "assets" },
      { href: "/catalogues", label: "Catalogues", icon: Archive, sectionId: "catalogs" },
      { href: "/pokemon-docs", label: "Docs JSON", icon: ScrollText },
    ],
  },
  {
    id: "combat",
    label: "Combat",
    items: [
      { href: "/pvp-rankings", label: "PvP Rankings", icon: `${filtersAssetBase}/TodayView_Icon_Battle.png`, sectionId: "pvp-rankings" },
      { href: "/pvp-simulator", label: "Simulateur PvP", icon: Swords, sectionId: "pvp-simulator" },
      { href: "/gbl-calendar", label: "Calendrier GBL", icon: CalendarDays, sectionId: "gbl-calendar" },
      { href: "/best-attackers", label: "Best Attackers", icon: Swords, sectionId: "best-attackers" },
      { href: "/best-defenders", label: "Best Defenders", icon: ShieldCheck, sectionId: "best-defenders" },
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
      { href: "/community-days", label: "Community Days", icon: CalendarDays, sectionId: "community-days" },
      { href: "/events-history", label: "Historique Events", icon: Archive, sectionId: "events-history" },
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
      { href: "/shiny-tracker", label: "Shiny Tracker", icon: `${filtersAssetBase}/ic_shiny_white.png`, sectionId: "shiny" },
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
