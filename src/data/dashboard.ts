import {
  CalendarDays,
  CheckSquare2,
  Folders,
  Home,
  KanbanSquare,
  LineChart,
  NotebookPen,
  Wrench,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/kanban", label: "Kanban", icon: KanbanSquare },
  { href: "/projects", label: "Projets", icon: Folders },
  { href: "/calendar", label: "Calendrier", icon: CalendarDays },
  { href: "/todo", label: "Todo", icon: CheckSquare2 },
  { href: "/tools", label: "Outils", icon: Wrench },
  { href: "/analytics", label: "Stats API", icon: LineChart },
];

export const activityFeed = [
  {
    title: "Checklist Pokémon GO synchronisée",
    detail: "Les données publiques sont prêtes pour le dashboard.",
    time: "09:12",
    tone: "cyan",
  },
  {
    title: "Design system initialisé",
    detail: "Button, Badge, Card et StatCard référencés dans Storybook.",
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
