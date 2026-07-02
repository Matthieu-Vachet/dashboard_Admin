export const POKEMON_EVENT_TIMEZONE = "Europe/Paris";

export const POKEMON_EVENT_TYPES = [
  {
    id: "raid_battles",
    label: "Raid Battles",
    color: "#dc3b2f",
    icon: "/ui/raids/5_star_raids.png",
  },
  {
    id: "community_day",
    label: "Journée communautaire",
    color: "#22c55e",
    icon: "/ui/icons/pokemon.png",
  },
  {
    id: "spotlight_hour",
    label: "Heure vedette",
    color: "#f59e0b",
    icon: "/ui/icons/search.png",
  },
  {
    id: "raid_hour",
    label: "Heure de raid",
    color: "#dc3b2f",
    icon: "/ui/icons/raid.png",
  },
  {
    id: "go_battle_league",
    label: "GO Battle League",
    color: "#963fba",
    icon: "/ui/icons/TodayView_Icon_Battle.webp",
  },
  {
    id: "go_pass",
    label: "GO Pass",
    color: "#9a7a12",
    icon: "/ui/icons/go_logo.png",
  },
  {
    id: "choose_your_path",
    label: "Choose Your Path",
    color: "#16a085",
    icon: "/ui/icons/pokeball.webp",
  },
  {
    id: "max_monday",
    label: "Max Monday",
    color: "#9f0b67",
    icon: "/ui/max_battles/max-battles.webp",
  },
  {
    id: "raid_day",
    label: "Journée de raid",
    color: "#ef4444",
    icon: "/ui/raids/5_star_raids.png",
  },
  {
    id: "event",
    label: "Event",
    color: "#8b5cf6",
    icon: "/ui/icons/pokeball.webp",
  },
  {
    id: "season",
    label: "Saison",
    color: "#14b8a6",
    icon: "/ui/PokedexV2/kanto_starters.png",
  },
  {
    id: "go_fest",
    label: "GO Fest",
    color: "#06b6d4",
    icon: "/ui/icons/go_logo.png",
  },
  {
    id: "research_day",
    label: "Research Day",
    color: "#a855f7",
    icon: "/ui/Items/Item_1201.png",
  },
  {
    id: "max_battle",
    label: "Max Battles",
    color: "#ec4899",
    icon: "/ui/max_battles/max-battles.webp",
  },
  {
    id: "egg_event",
    label: "Event œufs",
    color: "#f97316",
    icon: "/ui/eggs/2_km.png",
  },
  {
    id: "rocket_event",
    label: "Team GO Rocket",
    color: "#64748b",
    icon: "/ui/raids/teamrocket_r.png",
  },
  {
    id: "other",
    label: "Autre",
    color: "#94a3b8",
    icon: "/ui/icons/tag.png",
  },
] as const;

export const POKEMON_EVENT_STATUSES = [
  "draft",
  "current",
  "upcoming",
  "past",
  "archived",
] as const;

export const POKEMON_EVENT_STATUS_LABELS = {
  draft: "Brouillon",
  current: "En cours",
  upcoming: "À venir",
  past: "Passé",
  archived: "Archivé",
} as const;

export type PokemonEventType = (typeof POKEMON_EVENT_TYPES)[number]["id"];
export type PokemonEventStatus = (typeof POKEMON_EVENT_STATUSES)[number];

export type PokemonEventLink = {
  label: string;
  url: string;
};

export type PokemonEventAsset = {
  banner: string | null;
  icon: string | null;
};

export type PokemonEventReward = {
  text: string;
  id?: string;
  name?: string;
  sourceName?: string;
  image?: string | null;
  type?: string;
  quantity?: string;
  matched?: boolean;
};

export type PokemonFeaturedPokemon = {
  id?: string;
  name: string;
  image?: string;
  dexId?: string;
  form?: string;
  types?: string[];
  shiny?: boolean;
};

export type PokemonEventSection = {
  id: string;
  title: string;
  category: "featured" | "wildSpawns" | "raids" | "eggs" | "researchRewards" | "bonuses" | "tickets" | "other";
  text?: string[];
  pokemon?: PokemonFeaturedPokemon[];
  rewards?: PokemonEventReward[];
  images?: string[];
};

export type PokemonCalendarEvent = {
  id: string;
  title: string;
  description: string;
  type: PokemonEventType;
  category?: string;
  startDate: string;
  endDate: string;
  timezone: string;
  status: PokemonEventStatus;
  source: string;
  sourceUrl?: string;
  images?: {
    banner?: string | null;
    thumbnail?: string | null;
  };
  assets: PokemonEventAsset;
  featuredPokemon: PokemonFeaturedPokemon[];
  wildSpawns?: PokemonFeaturedPokemon[];
  raids?: PokemonFeaturedPokemon[];
  eggs?: PokemonFeaturedPokemon[];
  researchRewards?: PokemonFeaturedPokemon[];
  sections?: PokemonEventSection[];
  bonuses: string[];
  rewards?: PokemonEventReward[];
  links: PokemonEventLink[];
  raw?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string | null;
};

export const defaultPokemonEvents: PokemonCalendarEvent[] = [
  {
    id: "raid-hour-articuno-zapdos-moltres-2026-07-01",
    title: "Raid Hour: Articuno, Zapdos et Moltres",
    description:
      "Heure de raid hebdomadaire avec les oiseaux légendaires en raids cinq étoiles.",
    type: "raid_hour",
    startDate: "2026-07-01T16:00:00.000Z",
    endDate: "2026-07-01T17:00:00.000Z",
    timezone: POKEMON_EVENT_TIMEZONE,
    status: "upcoming",
    source: "seed:pogocalendar",
    assets: {
      banner: null,
      icon: "/ui/icons/raid.png",
    },
    featuredPokemon: [
      { name: "Articuno" },
      { name: "Zapdos" },
      { name: "Moltres" },
    ],
    bonuses: ["Raids légendaires concentrés de 18h à 19h heure locale."],
    links: [{ label: "PoGO Calendar", url: "https://pogocalendar.com/" }],
  },
  {
    id: "spotlight-hour-pidgey-2026-07-02",
    title: "Heure vedette: Pidgey",
    description: "Heure vedette Pokémon GO dédiée à Pidgey.",
    type: "spotlight_hour",
    startDate: "2026-07-02T16:00:00.000Z",
    endDate: "2026-07-02T17:00:00.000Z",
    timezone: POKEMON_EVENT_TIMEZONE,
    status: "upcoming",
    source: "seed:pogocalendar",
    assets: {
      banner: null,
      icon: "/ui/icons/search.png",
    },
    featuredPokemon: [{ name: "Pidgey" }],
    bonuses: ["Apparitions augmentées de 18h à 19h heure locale."],
    links: [{ label: "PoGO Calendar", url: "https://pogocalendar.com/" }],
  },
  {
    id: "community-day-sobble-2026-07-04",
    title: "Community Day: Sobble",
    description:
      "Sobble apparaît plus souvent dans la nature pendant le Community Day de juillet 2026.",
    type: "community_day",
    startDate: "2026-07-04T12:00:00.000Z",
    endDate: "2026-07-04T15:00:00.000Z",
    timezone: POKEMON_EVENT_TIMEZONE,
    status: "upcoming",
    source: "seed:pokemongolive",
    assets: {
      banner: null,
      icon: "/ui/icons/pokemon.png",
    },
    featuredPokemon: [{ name: "Sobble" }],
    bonuses: [
      "Sobble apparaît plus fréquemment.",
      "Évolution possible vers Inteleon avec Hydro Cannon pendant la fenêtre annoncée.",
    ],
    links: [
      {
        label: "Annonce officielle",
        url: "https://pokemongolive.com/en/news/communityday-july-2026-sobble",
      },
    ],
  },
  {
    id: "go-pass-road-of-legends-2026",
    title: "GO Pass: Road of Legends",
    description:
      "Semaine de préparation avant Pokémon GO Fest 2026: Global avec tâches GO Pass et récompenses liées aux raids.",
    type: "event",
    startDate: "2026-07-05T22:01:00.000Z",
    endDate: "2026-07-12T21:59:00.000Z",
    timezone: POKEMON_EVENT_TIMEZONE,
    status: "upcoming",
    source: "seed:pokemongolive",
    assets: {
      banner: null,
      icon: "/ui/icons/pokeball.webp",
    },
    featuredPokemon: [{ name: "Pikachu" }],
    bonuses: [
      "Tâches GO Pass Road of Legends.",
      "Récompenses liées aux Pokémon présents dans les raids légendaires.",
    ],
    links: [
      {
        label: "Annonce officielle",
        url: "https://pokemongolive.com/en/news/road-of-legends-2026",
      },
    ],
  },
  {
    id: "go-fest-global-2026",
    title: "Pokémon GO Fest 2026: Global",
    description:
      "Event mondial Pokémon GO Fest 2026 avec Mewtwo, Zeraora et neuf heures de gameplay par jour.",
    type: "go_fest",
    startDate: "2026-07-11T08:00:00.000Z",
    endDate: "2026-07-12T17:00:00.000Z",
    timezone: POKEMON_EVENT_TIMEZONE,
    status: "upcoming",
    source: "seed:pokemongolive",
    assets: {
      banner: null,
      icon: "/ui/icons/go_logo.png",
    },
    featuredPokemon: [{ name: "Mewtwo" }, { name: "Zeraora" }],
    bonuses: [
      "Event mondial gratuit pour tous les Dresseurs connectés pendant la période.",
      "Gameplay de 10h à 19h heure locale les deux jours.",
    ],
    links: [
      {
        label: "GO Fest officiel",
        url: "https://pokemongolive.com/en/gofest/global",
      },
      {
        label: "Leek Duck",
        url: "https://leekduck.com/events/pokemon-go-fest-2026-global/",
      },
    ],
  },
];
