import type { PokemonDoc } from "@/components/dashboard/pokemon-docs-viewer";
import type { PokemonMetrics } from "@/lib/pokemon";

export const samplePokemonEntry = {
  key: "pokemon:data/pokemon/0001-bulbasaur.json",
  dexId: "0001",
  name: "Bulbizarre",
  kind: "pokemon",
  form: "normal",
  generation: 1,
  primaryType: "GRASS",
  secondaryType: "POISON",
  complete: true,
  issues: [],
  issueCategories: [],
  quality: { score: 100 },
  image:
    "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/PokemonHd/poke_capture_0001_000_mf_n_00000000_f_n.png",
  shinyImage:
    "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/PokemonHd/poke_capture_0001_000_mf_n_00000000_f_r.png",
  assets: {
    go: true,
    goShiny: true,
    home: true,
    homeShiny: true,
    incompletePairs: 0,
  },
  file: "data/pokemon/0001-bulbasaur.json",
};

export const samplePokemonEntryWithIssues = {
  ...samplePokemonEntry,
  key: "pokemon:data/pokemon/0004-charmander.json",
  dexId: "0004",
  name: "Salamèche",
  primaryType: "FIRE",
  secondaryType: null,
  complete: false,
  issues: ["Asset shiny manquant", "Champ PvP à vérifier"],
  issueCategories: ["assets", "pvp"],
  quality: { score: 74 },
};

export const samplePokemonDetail = {
  id: "BULBASAUR",
  formId: "BULBASAUR",
  slug: "bulbasaur",
  dexId: "0001",
  names: {
    English: "Bulbasaur",
    French: "Bulbizarre",
    German: "Bisasam",
    Italian: "Bulbasaur",
    Japanese: "フシギダネ",
  },
  form: "normal",
  generation: 1,
  regionId: "kanto",
  region: { names: { French: "Kanto" } },
  primaryType: "GRASS",
  secondaryType: "POISON",
  weatherBoost: ["SUNNY", "CLOUDY"],
  size: { height: 0.7, weight: 6.9 },
  stats: { attack: 118, defense: 111, stamina: 128 },
  maxCp: {
    maxLevel50: 1260,
    maxLevel40: 1115,
    raidLevel20: 477,
    weatherBoostLevel25: 597,
    researchLevel15: 358,
  },
  availability: {
    released: true,
    shinyReleased: true,
    tradable: true,
    pokemonHomeTransfer: true,
    shadow: true,
  },
  quickMoves: ["TACKLE_FAST", "VINE_WHIP_FAST"],
  cinematicMoves: ["POWER_WHIP", "SEED_BOMB", "SLUDGE_BOMB"],
  moveDetails: {
    quickMoves: [
      {
        id: "VINE_WHIP_FAST",
        names: { French: "Fouet Lianes" },
        type: "GRASS",
        power: 7,
        energy: 6,
        combat: { power: 5, energy: 8, turns: 2 },
      },
    ],
    cinematicMoves: [
      {
        id: "SLUDGE_BOMB",
        names: { French: "Bomb-Beurk" },
        type: "POISON",
        power: 80,
        energy: -50,
        combat: { power: 80, energy: 50 },
      },
    ],
  },
  pvp: {
    greatLeague: { rank: 42, cp: 1498 },
    ultraLeague: { rank: 128, cp: 2490 },
  },
  cpByLevel: [
    { level: 1, cp: 14 },
    { level: 10, cp: 285 },
    { level: 20, cp: 572 },
    { level: 40, cp: 1115 },
    { level: 50, cp: 1260 },
  ],
  captureRewards: { candy: 3, stardust: 100 },
  secondChargeMoveCost: { candy: 25, stardust: 10000 },
  sourceData: {
    names: {
      English: "Bulbasaur",
      French: "Bulbizarre",
    },
  },
};

export const sampleTypeCatalog = [
  { id: "GRASS", slug: "grass", names: { French: "Plante" }, color: "#58f2a9" },
  { id: "POISON", slug: "poison", names: { French: "Poison" }, color: "#905bf4" },
  { id: "FIRE", slug: "fire", names: { French: "Feu" }, color: "#ff5f7d" },
];

export const sampleWeatherCatalog = [
  { id: "SUNNY", slug: "sunny", names: { French: "Ensoleillé" } },
  { id: "CLOUDY", slug: "cloudy", names: { French: "Couvert" } },
];

export const samplePokemonMetrics: PokemonMetrics = {
  source: "live",
  status: "local",
  detail: "Données Pokémon chargées depuis la base data intégrée au dashboard.",
  total: 1602,
  complete: 1602,
  issues: 0,
  quality: 100,
  catalog: {
    types: 18,
    weather: 7,
    stickers: 1667,
    moves: 467,
  },
  generations: [
    { name: "G1", completion: 100, entries: 222 },
    { name: "G2", completion: 100, entries: 143 },
    { name: "G3", completion: 100, entries: 203 },
    { name: "G4", completion: 100, entries: 172 },
    { name: "G5", completion: 100, entries: 206 },
    { name: "G6", completion: 100, entries: 181 },
    { name: "G7", completion: 100, entries: 152 },
    { name: "G8", completion: 100, entries: 171 },
    { name: "G9", completion: 100, entries: 152 },
  ],
  kinds: [
    { name: "pokemon", value: 1024 },
    { name: "form", value: 367 },
    { name: "dynamax", value: 127 },
    { name: "mega", value: 55 },
    { name: "gigantamax", value: 29 },
  ],
};

export const samplePokemonDocs: PokemonDoc[] = [
  {
    slug: "schema",
    file: "SCHEMA.md",
    title: "Pokemon GO API - Schema",
    lineCount: 582,
    content: `# Pokemon GO API - Schema

## Organisation

\`\`\`text
PokemonGo-Data/
├── pokemon/
├── pokemon-forms/
└── moves/
\`\`\`

## Schema Pokemon

| Champ | Type | Description |
| --- | --- | --- |
| id | string | Identifiant technique principal. |
| dexId | string | Numéro Pokedex formaté sur 4 chiffres. |
| names | object | Noms localisés par langue. |

- Les valeurs inconnues utilisent null.
- Les listes vides utilisent [].
`,
  },
  {
    slug: "templates",
    file: "TEMPLATES.md",
    title: "Pokemon GO API - Templates",
    lineCount: 391,
    content: `# Pokemon GO API - Templates

## Objectif

Modèles de fichiers pour garder les JSON cohérents.
`,
  },
];

export const sampleApiHealth = {
  connected: true,
  api: "ok",
  database: "connected",
  statusCode: 200,
  uptimeSeconds: 542,
  timestamp: "2026-06-20T02:44:26.877Z",
  label: "API + DB connectées",
  docsUrl: "https://pokemon-go-api.vercel.app/api-docs",
  swaggerUrl: "https://pokemon-go-api.vercel.app/swagger",
};

export const sampleSourceWatch = {
  checkedAt: "2026-06-20T02:44:26.877Z",
  sources: [
    {
      id: "pokeminers-site",
      name: "PokeMiners",
      status: "ok",
      version: "HTTP 200",
      message: "Site accessible.",
      remoteUrl: "https://pokeminers.com/",
    },
    {
      id: "pokeminers-game-masters",
      name: "PokeMiners game_masters",
      status: "warning",
      version: "à surveiller",
      message: "Source distante temporairement indisponible.",
      remoteUrl: "https://github.com/PokeMiners/game_masters",
    },
  ],
};

export const sampleAdminBootstrap = {
  viewer: { admin: true },
  entries: [samplePokemonEntry, samplePokemonEntryWithIssues],
  summary: {
    total: 1602,
    complete: 1602,
    issues: 0,
    generations: [
      { generation: 1, count: 222, complete: 222, issues: 0, percent: 100 },
      { generation: 2, count: 143, complete: 143, issues: 0, percent: 100 },
    ],
    categories: [],
    kinds: [{ id: "pokemon", count: 1024, complete: 1024, issues: 0, percent: 100 }],
  },
  catalog: {
    types: 18,
    weather: 7,
    stickers: 1667,
    moves: 467,
  },
  customRules: [],
};

export const sampleCatalog = {
  types: sampleTypeCatalog,
  weather: sampleWeatherCatalog,
  moves: [
    {
      id: "VINE_WHIP_FAST",
      names: { French: "Fouet Lianes" },
      type: "GRASS",
      power: 7,
      combat: { power: 5, energy: 8 },
    },
  ],
  stickers: [],
};

export const sampleAssetAudit = {
  totals: {
    goFiles: 1204,
    shuffleFiles: 936,
    used: 1602,
    duplicated: 0,
  },
  proposals: [],
  goAssets: [
    {
      filename: "poke_capture_0001.png",
      url: samplePokemonEntry.image,
      label: "Bulbizarre",
    },
  ],
  shuffleAssets: [],
  unused: [],
};

export const sampleHistory = [
  { hash: "2a93a5c", date: "2026-06-20", subject: "feat: migrate pokemon admin into dashboard" },
  { hash: "44086f3", date: "2026-06-19", subject: "refactor: split PokemonGo-Data repository" },
];
