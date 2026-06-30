import {
  CalendarDays,
  CheckSquare2,
  Code2,
  Coffee,
  Database,
  Dumbbell,
  Folders,
  GraduationCap,
  Home,
  KanbanSquare,
  LineChart,
  NotebookPen,
  Palette,
  ClipboardList,
  ScrollText,
  FileText,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon | string;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    items: [
      { href: "/", label: "Accueil", icon: Home },
      { href: "/analytics", label: "Analytics", icon: LineChart },
      { href: "/tools", label: "Outils", icon: Wrench },
      { href: "/tools/dashboard-backlog", label: "Dashboard Backlog", icon: ClipboardList },
      { href: "/tools/workspace-scripts", label: "Scripts workspace", icon: TerminalSquare },
    ],
  },
  {
    id: "pokemon-data",
    label: "Pokémon Data",
    items: [
      {
        href: "/pokemon-admin",
        label: "Admin Pokémon",
        icon: "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers/ic_pikachu_home.png",
      },
      { href: "/pokemon-docs", label: "Docs JSON", icon: ScrollText },
    ],
  },
  {
    id: "organisation",
    label: "Organisation",
    items: [
      { href: "/notes", label: "Notes", icon: NotebookPen },
      { href: "/kanban", label: "Kanban", icon: KanbanSquare },
      { href: "/projects", label: "Projets", icon: Folders },
      { href: "/calendar", label: "Calendrier", icon: CalendarDays },
      { href: "/todo", label: "Todo", icon: CheckSquare2 },
      { href: "/writer", label: "Texte", icon: FileText },
    ],
  },
  {
    id: "studio-js",
    label: "Studio JS",
    items: [
      { href: "/js-progress", label: "JS Progress", icon: GraduationCap },
      { href: "/pomodoro", label: "Pomodoro", icon: Coffee },
      { href: "/exercices-javascript", label: "Exercices JS", icon: Dumbbell },
      { href: "/snippets", label: "Snippets", icon: Code2 },
      { href: "/palette", label: "Couleurs", icon: Palette },
    ],
  },
  {
    id: "systeme",
    label: "Système",
    items: [{ href: "/database", label: "Mongo DB", icon: Database }],
  },
];

export const navItems = navGroups.flatMap((group) => group.items);

export const activityFeed = [
  {
    title: "Checklist Pokémon GO synchronisée",
    detail: "Les données publiques sont prêtes pour le dashboard.",
    time: "09:12",
    tone: "cyan",
  },
  {
    title: "Design system initialisé",
    detail: "Tokens, cartes et boutons stabilisés directement dans le dashboard.",
    time: "08:40",
    tone: "violet",
  },
  {
    title: "Sprint personnel cadré",
    detail: "Kanban, calendrier et todo connectés à tes prochains projets.",
    time: "Hier",
    tone: "green",
  },
] as const;

export const revenueData = [
  { name: "Jan", revenue: 4200, projects: 2 },
  { name: "Fev", revenue: 6100, projects: 3 },
  { name: "Mar", revenue: 5400, projects: 3 },
  { name: "Avr", revenue: 7600, projects: 4 },
  { name: "Mai", revenue: 8800, projects: 5 },
  { name: "Jun", revenue: 10200, projects: 6 },
];

export const focusBlocks = [
  { label: "Deep work", value: 18, color: "#20d3ff" },
  { label: "Clients", value: 9, color: "#905bf4" },
  { label: "Produit", value: 12, color: "#58f2a9" },
  { label: "Admin", value: 5, color: "#ffd166" },
];

export const quickActions = [
  "Créer une note projet",
  "Préparer un sprint",
  "Analyser l'API Pokémon",
  "Ouvrir les outils du jour",
];
