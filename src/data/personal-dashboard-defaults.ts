import { format } from "date-fns";

export type Note = {
  id: string;
  title: string;
  body: string;
  category: "Projet" | "Client" | "Idée" | "Personnel";
  updatedAt: string;
};

export const initialNotes: Note[] = [
  {
    id: "n1",
    title: "Dashboard Admin",
    body: "Créer le socle, les pages métier, Storybook et le déploiement Vercel.",
    category: "Projet",
    updatedAt: "Aujourd'hui",
  },
  {
    id: "n2",
    title: "Pokemon GO API",
    body: "Ajouter une vue dédiée pour les métriques qualité, assets et générations.",
    category: "Projet",
    updatedAt: "Hier",
  },
  {
    id: "n3",
    title: "Design system",
    body: "Référencer les primitives Button, Badge, Card, StatCard, KanbanCard.",
    category: "Idée",
    updatedAt: "Lundi",
  },
  {
    id: "n4",
    title: "Outils quotidiens",
    body: "Centraliser les liens, snippets, contacts, abonnements et notes rapides.",
    category: "Personnel",
    updatedAt: "Vendredi",
  },
];

export type Category = "Produit" | "Design" | "API" | "Ops" | "Urgent";
export type ColumnId = "backlog" | "doing" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  category: Category;
  points: number;
  owner: string;
  note: string;
};

export type BoardState = Record<ColumnId, Task[]>;

export const kanbanColumns: Array<{ id: ColumnId; title: string; hint: string }> = [
  { id: "backlog", title: "Backlog", hint: "À cadrer" },
  { id: "doing", title: "En cours", hint: "Focus actif" },
  { id: "review", title: "Review", hint: "À vérifier" },
  { id: "done", title: "Terminé", hint: "Shippé" },
];

export const kanbanCategories: Category[] = ["Produit", "Design", "API", "Ops", "Urgent"];

export const initialBoard: BoardState = {
  backlog: [
    {
      id: "k1",
      title: "Finaliser les tokens Storybook",
      category: "Design",
      points: 3,
      owner: "MW",
      note: "Créer les variantes utiles pour Button, Badge, Card et StatCard.",
    },
    {
      id: "k2",
      title: "Brancher les stats Pokémon détaillées",
      category: "API",
      points: 5,
      owner: "MW",
      note: "Afficher live/fallback, générations et catalogue.",
    },
  ],
  doing: [
    {
      id: "k3",
      title: "Créer le dashboard personnel",
      category: "Produit",
      points: 8,
      owner: "MW",
      note: "Rendre chaque module utilisable, pas seulement joli.",
    },
  ],
  review: [
    {
      id: "k5",
      title: "Vérifier le parcours login",
      category: "Urgent",
      points: 2,
      owner: "MW",
      note: "Tester mobile, tablette et prod Vercel.",
    },
  ],
  done: [
    {
      id: "k6",
      title: "Architecture Next + Tailwind",
      category: "Produit",
      points: 5,
      owner: "MW",
      note: "Socle Next.js, auth et Storybook.",
    },
  ],
};

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  priority: "Haute" | "Moyenne" | "Basse";
};

export const initialTodos: Todo[] = [
  { id: "t1", title: "Configurer les variables Vercel", done: false, priority: "Haute" },
  { id: "t2", title: "Ajouter les premiers composants Storybook", done: true, priority: "Moyenne" },
  { id: "t3", title: "Créer un template de projet", done: false, priority: "Moyenne" },
  { id: "t4", title: "Créer les outils quotidiens", done: false, priority: "Basse" },
];

export type ProjectStatus = "Idée" | "Build" | "Live" | "Pause" | "Archive";

export type Project = {
  id: string;
  name: string;
  type: string;
  status: ProjectStatus;
  progress: number;
  repoUrl: string;
  siteUrl: string;
  nextStep: string;
  detail: string;
};

export const projectStatuses: ProjectStatus[] = ["Idée", "Build", "Live", "Pause", "Archive"];

export const initialProjects: Project[] = [
  {
    id: "p1",
    name: "Dashboard Admin",
    type: "Produit interne",
    status: "Build",
    progress: 72,
    repoUrl: "https://github.com/Matthieu-Vachet/dashboard_Admin",
    siteUrl: "https://dashboard-admin-pi-ebon.vercel.app",
    nextStep: "Rendre chaque page réellement utilisable.",
    detail: "Cockpit personnel avec notes, kanban, calendrier, outils quotidiens et design system.",
  },
  {
    id: "p2",
    name: "Pokemon GO API",
    type: "API data",
    status: "Live",
    progress: 100,
    repoUrl: "https://github.com/Matthieu-Vachet/PokemonGo-API-",
    siteUrl: "https://pokemon-go-7r5q2j05a-matthieu-vachets-projects.vercel.app/checklist",
    nextStep: "Surveiller la qualité des assets et les nouveaux endpoints.",
    detail: "Checklist, assets, qualité et endpoints publics pour explorer les données.",
  },
  {
    id: "p3",
    name: "MatWeb Innovation",
    type: "Site vitrine",
    status: "Live",
    progress: 84,
    repoUrl: "https://github.com/Matthieu-Vachet/MatWeb-Innovation-Website",
    siteUrl: "",
    nextStep: "Améliorer les pages offres et portfolio.",
    detail: "Identité, offres, projets, contact et présence professionnelle.",
  },
  {
    id: "p4",
    name: "Design System MW",
    type: "UI kit",
    status: "Idée",
    progress: 38,
    repoUrl: "",
    siteUrl: "",
    nextStep: "Documenter les composants dans Storybook.",
    detail: "Tokens, composants, guidelines Storybook et primitives admin.",
  },
];

export const projectRoadmap = [
  "Créer des templates projet réutilisables",
  "Ajouter un suivi clients simple",
  "Relier les cartes projet au kanban",
  "Ajouter une sauvegarde serveur quand tu voudras le multi-appareil",
];

export type EventTone = "cyan" | "green" | "violet" | "amber" | "red";

export type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  time: string;
  tone: EventTone;
  note: string;
};

function dateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

const todayKey = dateKey(new Date());

export const initialEvents: CalendarEvent[] = [
  {
    id: "e1",
    date: todayKey,
    title: "Review Dashboard",
    time: "09:30",
    tone: "cyan",
    note: "Tester les modules, corriger les vrais usages et déployer.",
  },
  {
    id: "e2",
    date: dateKey(new Date(Date.now() + 86400000 * 3)),
    title: "Sprint Pokemon API",
    time: "14:00",
    tone: "green",
    note: "Vérifier live stats, endpoints et qualité des assets.",
  },
  {
    id: "e3",
    date: dateKey(new Date(Date.now() + 86400000 * 8)),
    title: "Storybook session",
    time: "10:00",
    tone: "violet",
    note: "Référencer les composants du design system.",
  },
];

export type QuickLink = {
  id: string;
  label: string;
  url: string;
};

export type Snippet = {
  id: string;
  title: string;
  content: string;
  language?: string;
  category?: string;
  tags?: string;
};

export type Subscription = {
  id: string;
  name: string;
  price: number;
  billing: "Mensuel" | "Annuel";
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export const initialLinks: QuickLink[] = [
  { id: "l1", label: "Dashboard prod", url: "https://dashboard-admin-pi-ebon.vercel.app" },
  { id: "l2", label: "Storybook", url: "/storybook/index.html" },
  { id: "l3", label: "GitHub dashboard", url: "https://github.com/Matthieu-Vachet/dashboard_Admin" },
  { id: "l4", label: "Vercel", url: "https://vercel.com" },
];

export const initialSnippets: Snippet[] = [
  {
    id: "s1",
    title: "Commit propre",
    language: "bash",
    category: "Git",
    tags: "commit, push",
    content: "git status && git add -A && git commit -m \"feat: ...\" && git push",
  },
  {
    id: "s2",
    title: "Checklist deploy",
    language: "bash",
    category: "Vercel",
    tags: "build, deploy",
    content: "npm run lint\nnpm run build\nnpx vercel deploy --prod --yes",
  },
];

export type WriterDocument = {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
};

export const initialWriterDocuments: WriterDocument[] = [
  {
    id: "doc1",
    title: "Brief de projet",
    body: "Objectif\n- \n\nAudience\n- \n\nLivrables\n- \n\nNotes\n- ",
    updatedAt: "Aujourd'hui",
  },
];

export const initialSubscriptions: Subscription[] = [
  { id: "sub1", name: "Vercel", price: 0, billing: "Mensuel" },
  { id: "sub2", name: "Outil mensuel", price: 20, billing: "Mensuel" },
];

export const initialContacts: Contact[] = [
  { id: "c1", name: "Matthieu", role: "Admin", email: "vachet.matthieu@icloud.com" },
];

export const initialJournal = "Aujourd'hui je dois avancer sur...";
export const initialFocusMinutes = 25;
