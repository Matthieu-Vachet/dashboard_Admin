"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  BarChart3,
  BookOpen,
  Boxes,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Cloud,
  Copy,
  FileDiff,
  FileJson,
  Filter,
  Gauge,
  Image as ImageIcon,
  History,
  LayoutDashboard,
  Layers,
  ListTodo,
  PenLine,
  Radar,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { DetailModal } from "../checklist/detail-modal";
import { PokemonCard } from "../checklist/pokemon-card";
import { SortableWidgetGrid } from "../dashboard/sortable-widget-grid";
import { MetricCard } from "../site/metric-card";
import { pokemonVariantLabel, preferredPokemonImage, typeBackground, typeColors, typeIcon, typeName } from "../site/pokemon-style";
import { uiAssets } from "../site/ui-assets";
import { CollectionsPanel } from "./collections-panel";
import { LoginCard } from "./login-card";
import { SourceHistoryModal, SourceRows } from "./source-watch-panel";

const assetChecksKey = "pokedex-v4-asset-checks";
const todoKey = "pokedex-v4-admin-todos";
const editorKey = "pokedex-v4-admin-editor";
const sourceWatchSignatureKey = "pokedex-v4-source-watch-signatures";
const collectionsKey = "pokedex-v4-admin-collections";
const adminApiPath = "/api/pokemon-admin";

const navItems = [
  ["overview", "Accueil", LayoutDashboard],
  ["pokedex", "Fiches", BookOpen],
  ["candies", "Candies", CircleDot],
  ["collections", "Collections", ClipboardCheck],
  ["assets", "Assets", Boxes],
  ["checks", "Contrôles", AlertTriangle],
  ["sources", "Veille", Radar],
  ["catalogs", "Catalogues", Archive],
  ["compare", "Comparaison", FileDiff],
  ["rules", "Règles JSON", Sparkles],
  ["bulk", "Corrections", ClipboardCheck],
  ["export", "Export", FileJson],
  ["todo", "Todo-list", ListTodo],
  ["editor", "Éditeur", PenLine],
];

const panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5";
const fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10";
const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15";
const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]";

const generationFilters = [
  ["all", "Toutes", null, null],
  ["1", "Kanto", "/ui/PokedexV2/kanto_starters.png", "/ui/PokedexV2/kanto_locked.png"],
  ["2", "Johto", "/ui/PokedexV2/jhoto_starters.png", "/ui/PokedexV2/jhoto_locked.png"],
  ["3", "Hoenn", "/ui/PokedexV2/hoenn_starters.png", "/ui/PokedexV2/hoenn_locked.png"],
  ["4", "Sinnoh", "/ui/PokedexV2/sinnoh_starters.png", "/ui/PokedexV2/sinnoh_locked.png"],
  ["5", "Unys", "/ui/PokedexV2/unova_starters.png", "/ui/PokedexV2/unova_locked.png"],
  ["6", "Kalos", "/ui/PokedexV2/kalos_starters.png", "/ui/PokedexV2/kalos_locked.png"],
  ["7", "Alola", "/ui/PokedexV2/alola_starters.png", "/ui/PokedexV2/alola_locked.png"],
  ["8", "Galar", "/ui/PokedexV2/galar_starters.png", "/ui/PokedexV2/galar_locked.png"],
  ["hisui", "Hisui", "/ui/PokedexV2/hisui_starters.png", "/ui/PokedexV2/hisui_locked.png"],
  ["9", "Paldea", "/ui/PokedexV2/paldea_starters.png", "/ui/PokedexV2/paldea_locked.png"],
];

const assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
};

const categoryLabels = {
  custom: "Règles personnalisées",
  pokemon: "Fiches Pokémon",
  form: "Formes",
  mega: "Méga / Primo",
  dynamax: "Dynamax",
  gigantamax: "Gigamax",
  assets: "Assets",
  moves: "Attaques",
  pvp: "PvP",
  availability: "Disponibilité",
  localization: "Localisation",
  reference: "Références",
  official: "Officiel",
  news: "Actualités",
  gamemaster: "Game Master",
  shuffle: "Shuffle",
  pvp: "PvP",
};

function formatCount(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

function issueLabel(value) {
  return categoryLabels[value] || String(value || "Autre");
}

const defaultRuleForm = {
  id: "",
  mode: "template",
  name: "Description multilingue",
  enabled: true,
  appliesTo: ["pokemon", "form"],
  formFilters: [],
  enforceNonEmpty: false,
  path: "",
  expectedType: "presence",
  templateSource: `{
  "description": {
    "English": "",
    "German": "",
    "French": "",
    "Italian": "",
    "Japanese": "",
    "Korean": "",
    "Spanish": ""
  }
}`,
};

const rulePresets = [
  {
    key: "description",
    name: "Description multilingue",
    description: "Toutes les traductions de description doivent exister.",
    appliesTo: ["pokemon", "form"],
    enforceNonEmpty: true,
    templateSource: `{
  "description": {
    "English": "",
    "German": "",
    "French": "",
    "Italian": "",
    "Japanese": "",
    "Korean": "",
    "Spanish": ""
  }
}`,
  },
  {
    key: "assets",
    name: "Images GO principales",
    description: "Image normale et shiny obligatoires dans assets.",
    appliesTo: ["pokemon", "form", "mega", "dynamax", "gigantamax"],
    enforceNonEmpty: true,
    templateSource: `{
  "assets": {
    "image": "",
    "shinyImage": ""
  }
}`,
  },
  {
    key: "stats",
    name: "Stats de combat",
    description: "Stamina, attaque et défense numériques sur chaque fiche.",
    appliesTo: ["pokemon", "form", "mega", "dynamax", "gigantamax"],
    enforceNonEmpty: false,
    templateSource: `{
  "stats": {
    "stamina": 0,
    "attack": 0,
    "defense": 0
  }
}`,
  },
  {
    key: "availability",
    name: "Disponibilité complète",
    description: "Flags de sortie, shiny, échange et transferts.",
    appliesTo: ["pokemon", "form"],
    enforceNonEmpty: false,
    templateSource: `{
  "availability": {
    "released": false,
    "shinyReleased": false,
    "shadowShinyReleased": false,
    "tradable": false,
    "pokemonHomeTransfer": false,
    "shadow": false,
    "dynamax": false,
    "gigantamax": false,
    "apex": false
  },
  "shinyAvailability": {
    "released": false,
    "releaseDate": null,
    "event": null,
    "source": "https://www.margxt.fr/guide-liste-des-pokemon-shiny-disponibles-dans-pokemon-go/",
    "matchedName": null
  },
  "shadowShinyAvailability": {
    "released": false,
    "releaseDate": null,
    "event": null,
    "source": "https://www.margxt.fr/liste-des-pokemon-obscurs-et-chromatiques-shiny-dans-pokemon-go/",
    "matchedName": null
  }
}`,
  },
  {
    key: "pvp",
    name: "Bloc PvP",
    description: "Présence des ligues PvP, même null si non pertinent.",
    appliesTo: ["pokemon", "form"],
    enforceNonEmpty: false,
    templateSource: `{
  "pvp": {
    "littleCup": null,
    "greatLeague": null,
    "ultraLeague": null,
    "masterLeague": null
  }
}`,
  },
  {
    key: "weather",
    name: "Météo boost",
    description: "weatherBoost doit être un tableau non vide.",
    appliesTo: ["pokemon", "form", "mega", "dynamax", "gigantamax"],
    enforceNonEmpty: true,
    templateSource: `{
  "weatherBoost": [""]
}`,
  },
  {
    key: "type-damage-multiplier",
    name: "Types: multiplicateurs",
    description: "Chaque type individuel doit porter les 18 damageMultiplier.",
    appliesTo: ["type"],
    formFilters: [
      "bug",
      "dark",
      "dragon",
      "electric",
      "fairy",
      "fighting",
      "fire",
      "flying",
      "ghost",
      "grass",
      "ground",
      "ice",
      "normal",
      "poison",
      "psychic",
      "rock",
      "steel",
      "water",
    ],
    enforceNonEmpty: false,
    templateSource: `{
  "damageMultiplier": {
    "Bug": 1,
    "Dark": 1,
    "Dragon": 1,
    "Electric": 1,
    "Fairy": 1,
    "Fighting": 1,
    "Fire": 1,
    "Flying": 1,
    "Ghost": 1,
    "Grass": 1,
    "Ground": 1,
    "Ice": 1,
    "Normal": 1,
    "Poison": 1,
    "Psychic": 1,
    "Rock": 1,
    "Steel": 1,
    "Water": 1
  }
}`,
  },
  {
    key: "type-assets",
    name: "Types: icônes et fonds",
    description: "Chaque type doit avoir ses URLs icon/background.",
    appliesTo: ["type"],
    enforceNonEmpty: true,
    templateSource: `{
  "assets": {
    "icon": "",
    "background": ""
  },
  "weatherBoost": ""
}`,
  },
  {
    key: "weather-catalog",
    name: "Météo: boost + icône",
    description: "Chaque météo doit déclarer son icône et les types boostés.",
    appliesTo: ["weather"],
    enforceNonEmpty: true,
    templateSource: `{
  "assets": {
    "icon": ""
  },
  "boostedTypes": [""]
}`,
  },
  {
    key: "move-combat",
    name: "Attaques: combat complet",
    description: "Toutes les attaques doivent porter type, power, energy et bloc combat.",
    appliesTo: ["move"],
    formFilters: ["fast", "charged"],
    enforceNonEmpty: false,
    templateSource: `{
  "type": "",
  "power": 0,
  "energy": 0,
  "durationMs": 0,
  "combat": {
    "power": 0,
    "energy": 0,
    "turns": 0,
    "buffs": null
  }
}`,
  },
  {
    key: "move-max",
    name: "Attaques Max/Gmax",
    description: "Contrôle les capacités Max et G-Max sans exiger un bloc PvP.",
    appliesTo: ["move"],
    formFilters: ["max", "gmax"],
    enforceNonEmpty: false,
    templateSource: `{
  "type": "",
  "power": 0,
  "energy": 0,
  "durationMs": 0,
  "combat": null
}`,
  },
  {
    key: "generation-catalog",
    name: "Générations: identité",
    description: "Chaque région/génération doit avoir id, slug, numéro et noms.",
    appliesTo: ["generation"],
    enforceNonEmpty: true,
    templateSource: `{
  "id": "",
  "slug": "",
  "generation": 0,
  "names": {
    "English": "",
    "French": ""
  }
}`,
  },
];

const expectedTypes = [
  ["presence", "Présence"],
  ["string", "Texte"],
  ["number", "Nombre"],
  ["boolean", "Booléen"],
  ["object", "Objet"],
  ["array", "Tableau"],
];

const ruleTargetKinds = [
  ["pokemon", "Pokémon de base"],
  ["form", "Formes régionales"],
  ["mega", "Méga / Primo"],
  ["dynamax", "Dynamax"],
  ["gigantamax", "Gigamax"],
  ["move", "Attaques"],
  ["type", "Types"],
  ["weather", "Météo"],
  ["generation", "Générations"],
  ["sticker", "Stickers"],
];

const formFilterOptions = [
  ["mega", "Méga toutes"],
  ["mega-x", "Méga X"],
  ["mega-y", "Méga Y"],
  ["primal", "Primo"],
  ["alola", "Alola"],
  ["galar", "Galar"],
  ["hisui", "Hisui"],
  ["paldea", "Paldea"],
  ["normal", "Normal"],
  ["dynamax", "Dynamax"],
  ["gigantamax", "Gigamax"],
  ["moves", "Dossier moves"],
  ["fast", "Moves fast"],
  ["charged", "Moves charged"],
  ["elite", "Moves elite"],
  ["types", "Dossier types"],
  ["fire", "Type feu"],
  ["water", "Type eau"],
  ["weather", "Dossier météo"],
  ["generations", "Dossier générations"],
  ["stickers", "Dossier stickers"],
];

function localJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function sourceSignature(source) {
  return [
    source.signature,
    source.version,
    source.updatedAt,
    source.status,
    source.message,
  ]
    .filter(Boolean)
    .join("|");
}

function persistSourceSignatures(sourceWatch) {
  if (typeof localStorage === "undefined" || !sourceWatch?.sources?.length) return;
  const previous = localJson(sourceWatchSignatureKey, {});
  const current = {};
  const changed = [];
  const blocked = [];
  const changedIds = new Set();

  for (const source of sourceWatch.sources) {
    const id = source.id || source.name || source.url;
    const signature = sourceSignature(source);
    if (!id || !signature) continue;
    current[id] = signature;
    if (previous[id] && previous[id] !== signature) {
      changed.push(source);
      changedIds.add(id);
    }
    if (source.status === "warning") blocked.push(source);
  }

  localStorage.setItem(sourceWatchSignatureKey, JSON.stringify(current));
  return {
    changed,
    blocked,
    known: Object.keys(previous).length,
    sources: sourceWatch.sources.map((source) => {
      const id = source.id || source.name || source.url;
      return {
        ...source,
        changedSinceLastCheck: changedIds.has(id),
        previousSignature: previous[id] || null,
      };
    }),
  };
}

async function copyToClipboard(value, label = "Copié dans le presse-papier") {
  try {
    await navigator.clipboard.writeText(
      typeof value === "string" ? value : JSON.stringify(value, null, 2),
    );
    toast.success(label);
  } catch {
    toast.error("Impossible de copier pour le moment.");
  }
}

function Panel({ title, eyebrow, action, children, className = "" }) {
  return (
    <section className={`${panelClass} ${className}`}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function BarList({ items, labelKey = "id", valueKey = "count" }) {
  const max = Math.max(...items.map((item) => Number(item[valueKey]) || 0), 1);
  return (
    <div className="space-y-3">
      {items.length ? (
        items.map((item) => {
          const value = Number(item[valueKey]) || 0;
          return (
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3" key={item[labelKey]}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate font-black text-slate-100">{issueLabel(item[labelKey])}</span>
                <strong className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs font-black text-white">
                  {formatCount(value)}
                </strong>
              </div>
              <span className="block h-2.5 overflow-hidden rounded-full bg-white/10">
                <i
                  className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                  style={{ width: `${(value / max) * 100}%` }}
                />
              </span>
              <p className="mt-2 text-xs font-bold leading-5 text-slate-400">
                {item[labelKey] === "custom"
                  ? "Issues remontées par tes règles JSON ajoutées."
                  : "Issues détectées par le checker intégré."}
              </p>
            </div>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucune donnée à afficher.
        </p>
      )}
    </div>
  );
}

/** Carte compacte de statistiques asset, conçue pour ne jamais déborder sur mobile. */
function AssetStatCard({ label, value, icon, tone = "cyan", detail }) {
  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-2xl border bg-gradient-to-br p-3 shadow-[0_18px_65px_rgba(0,0,0,.22)] ${assetStatTone[tone] || assetStatTone.cyan}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.1),transparent_45%)]" />
      <div className="relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/45 p-2 shadow-inner">
          {icon ? <img className="max-h-full object-contain" src={icon} alt="" /> : <Gauge size={21} />}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-black uppercase tracking-[0.18em] text-white/72">
            {label}
          </span>
          <strong className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[clamp(1.6rem,3vw,2.75rem)] font-black leading-none text-white drop-shadow-[0_0_18px_rgba(255,255,255,.16)]">
            {formatCount(value)}
          </strong>
        </span>
      </div>
      {detail ? (
        <p className="relative mt-3 truncate text-xs font-bold text-white/70">{detail}</p>
      ) : null}
    </article>
  );
}

/** Filtre visuel des générations avec les images PokedexV2 en couleur atténuée. */
function GenerationFilterBar({ value, onChange }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_18px_70px_rgba(0,0,0,.2)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100/75">
          <Filter size={15} /> Générations
        </span>
        <button className="text-xs font-black text-cyan-100 underline-offset-4 hover:underline" type="button" onClick={() => onChange("all")}>
          Tout afficher
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-11">
        {generationFilters.map(([id, label, image]) => {
          const active = value === id;
          return (
            <button
              className={`group relative min-h-[74px] overflow-hidden rounded-2xl border px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/45 ${
                active
                  ? "border-cyan-200/50 bg-cyan-400/15 shadow-[0_14px_45px_rgba(34,211,238,.16)]"
                  : "border-white/10 bg-white/[0.045]"
              }`}
              key={id}
              type="button"
              onClick={() => onChange(id)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.22),transparent_38%)] opacity-0 transition group-hover:opacity-100" />
              {image ? (
                <img
                  className={`absolute bottom-1 right-1 h-14 max-w-[68%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.35)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 ${
                    active ? "opacity-100 saturate-125" : "opacity-45 saturate-75"
                  }`}
                  src={image}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <Layers className="absolute bottom-3 right-3 text-cyan-100/60" size={24} />
              )}
              <span className="relative block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                {id === "all" ? "Filtre" : `Gén. ${id}`}
              </span>
              <strong className="relative mt-1 block text-sm font-black text-white">{label}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CompletionList({ items }) {
  return (
    <div className="space-y-3">
      {items.length ? (
        items.map((item) => {
          const percent = item.percent ?? Math.round((item.complete / Math.max(item.count, 1)) * 100);
          return (
            <div className="grid grid-cols-[5.5rem_1fr_4.6rem] items-center gap-3 text-sm" key={item.generation || item.id}>
              <span className="truncate font-bold text-slate-300">
                {item.generation ? `Gén. ${item.generation}` : item.id}
              </span>
              <span className="h-3 overflow-hidden rounded-full bg-white/10">
                <i
                  className="block h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-400 to-sky-500"
                  style={{ width: `${Math.min(100, percent)}%` }}
                />
              </span>
              <strong className="text-right font-black text-white">{percent}%</strong>
              <span className="col-start-2 text-xs font-bold text-slate-500">
                {item.complete || 0}/{item.count || 0} fiches complètes
              </span>
            </div>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucune donnée à afficher.
        </p>
      )}
    </div>
  );
}

function HistoryList({ history = [] }) {
  return (
    <div className="space-y-3">
      {history.length ? (
        history.map((item) => (
          <div
            className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
            key={`${item.hash}-${item.date}`}
          >
            <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              {item.date}
            </span>
            <strong className="mt-1 block text-sm font-black text-white">{item.subject}</strong>
            <small className="mt-1 block font-mono text-xs text-cyan-200/70">{item.hash}</small>
          </div>
        ))
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Historique indisponible pour le moment.
        </p>
      )}
    </div>
  );
}

function moveTitle(move) {
  return move.names?.French || move.names?.English || move.name || move.id;
}

function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.86), rgba(15,23,42,.76)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.86), rgba(2,6,23,.78))";
}

function formatBuffValue(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number" && value > 0) return `+${value}`;
  return String(value);
}

function AdminMoveCard({ move, typeCatalog = [] }) {
  const [open, setOpen] = useState(false);
  const type = move.type;
  const rows = [
    ["Puissance arène/raid", move.power ?? "-"],
    ["Énergie arène/raid", move.energy ?? "-"],
    ["Durée", move.durationMs ? `${move.durationMs} ms` : "-"],
    ["Puissance PvP", move.combat?.power ?? "-"],
    ["Énergie PvP", move.combat?.energy ?? "-"],
    ["Tours PvP", move.combat?.turns ?? "-"],
    ["Catégorie", move.category || move.kind || move.moveType || "-"],
    ["Slug", move.slug || "-"],
  ];
  const buffs = move.combat?.buffs;
  const buffRows = buffs
    ? [
        ["Chance", buffs.activationChance !== undefined ? `${buffs.activationChance}%` : "-"],
        ["Atk lanceur", formatBuffValue(buffs.attackerAttackStatsChange)],
        ["Def lanceur", formatBuffValue(buffs.attackerDefenseStatsChange)],
        ["Atk cible", formatBuffValue(buffs.targetAttackStatsChange)],
        ["Def cible", formatBuffValue(buffs.targetDefenseStatsChange)],
      ]
    : [];

  return (
    <article
      className="overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center"
      style={{ backgroundImage: typePanelBackground(type, typeCatalog) }}
    >
      <button
        className="grid w-full gap-3 p-4 text-left sm:grid-cols-[minmax(0,1fr)_auto_auto]"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="min-w-0">
          <strong className="block truncate text-base font-black text-white">{moveTitle(move)}</strong>
          <small className="mt-1 block truncate font-mono text-xs font-bold text-slate-400">{move.id}</small>
        </span>
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white"
          style={{ background: `color-mix(in srgb, ${typeColors[type] || "#64748b"} 52%, rgba(255,255,255,.12))` }}
        >
          {typeIcon(type, typeCatalog) ? (
            <img className="h-4 w-4 shrink-0 object-contain" src={typeIcon(type, typeCatalog)} alt="" />
          ) : null}
          {typeName(type, typeCatalog)}
        </span>
        <span className="inline-flex items-center justify-end gap-2 text-xs font-black text-cyan-100">
          {move.power ?? "-"} puissance <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={15} />
        </span>
      </button>
      {open ? (
        <div className="border-t border-white/10 p-4">
          <div className="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
            {rows.map(([label, value]) => (
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3" key={label}>
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
                <strong className="mt-1 block break-words text-white">{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">Traductions</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(move.names || {}).map(([lang, value]) => (
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200" key={lang}>
                  {lang}: {value}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">Buffs PvP</span>
            {buffRows.length ? (
              <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
                {buffRows.map(([label, value]) => (
                  <span className="rounded-xl bg-white/[0.06] px-3 py-2 text-sm font-bold text-white" key={label}>
                    {label}: {value}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm font-bold text-slate-400">Aucun buff PvP renseigné.</p>
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function CatalogPanel({ catalog = {} }) {
  const [tab, setTab] = useState("moves");
  const [catalogSearch, setCatalogSearch] = useState("");
  const data = catalog || {};
  const labels = {
    moves: "Attaques",
    types: "Types",
    weather: "Météo",
    stickers: "Stickers",
  };
  const rawItems =
    tab === "moves"
      ? data.moves || []
      : tab === "stickers"
        ? data.stickers || []
        : tab === "weather"
          ? data.weather || []
          : data.types || [];
  const items = rawItems.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(catalogSearch.trim().toLowerCase()),
  );

  return (
    <Panel
      title="Catalogues complets"
      eyebrow="référentiels"
      action={
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
          {Object.entries(labels).map(([value, label]) => (
            <button
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${
                tab === value
                  ? "border-cyan-200/40 bg-cyan-400/20 text-cyan-50"
                  : "border-white/10 bg-white/[0.06] text-slate-300 hover:bg-white/10"
              }`}
              key={value}
              type="button"
              onClick={() => {
                setTab(value);
                setCatalogSearch("");
              }}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      <label className="mb-4 block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
          Recherche dans {labels[tab]}
        </span>
        <input
          className={fieldClass}
          value={catalogSearch}
          placeholder={`Chercher dans ${labels[tab].toLowerCase()}...`}
          onChange={(event) => setCatalogSearch(event.target.value)}
        />
      </label>
      {tab === "moves" ? (
        <div className="grid gap-3" key="moves">
          {items.slice(0, 180).map((item, index) => (
            <AdminMoveCard move={item} typeCatalog={data.types || []} key={`${item.id || item.slug}-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={tab}>
          {items.slice(0, 180).map((item, index) => {
            const image = item.assets?.background || item.assets?.icon || item.image;
            const label = item.names?.French || item.name || item.id;
            const boosted = Array.isArray(item.boostedTypes) ? item.boostedTypes : [];
            return (
              <article
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40"
                key={`${tab}-${item.id || item.filename || label}-${index}`}
              >
                <div
                  className="grid aspect-[4/3] place-items-center bg-white/[0.04] p-4"
                  style={{
                    backgroundImage: item.assets?.background
                      ? `linear-gradient(135deg, rgba(2,6,23,.45), rgba(2,6,23,.7)), url("${item.assets.background}")`
                      : undefined,
                    backgroundSize: "cover",
                  }}
                >
                  {image ? (
                    <img className="max-h-full object-contain drop-shadow-2xl" src={item.assets?.icon || item.image || image} alt={label} />
                  ) : (
                    <span className="h-10 w-10 rounded-full bg-white/10" />
                  )}
                </div>
                <div className="border-t border-white/10 p-3">
                  <strong className="block truncate text-sm font-black text-white">
                    {label}
                  </strong>
                  <span className="mt-1 block truncate text-xs font-bold text-slate-400">
                    {tab === "weather" ? "Météo" : tab === "stickers" ? item.filename || "Sticker" : item.category || item.id}
                  </span>
                  {boosted.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {boosted.map((type) => (
                        <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-slate-200" key={type}>
                          {typeName(type, data.types)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
      {!items.length ? (
        <p className="mt-4 rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun résultat dans {labels[tab]}.
        </p>
      ) : null}
    </Panel>
  );
}

function colorChannel(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(255, Math.round(numeric <= 1 ? numeric * 255 : numeric)));
}

function normalizeColor(color) {
  if (!color || typeof color === "string") return null;
  return {
    r: colorChannel(color.r ?? color.red),
    g: colorChannel(color.g ?? color.green),
    b: colorChannel(color.b ?? color.blue),
    a: Math.max(0, Math.min(1, Number(color.a ?? color.alpha ?? 1))),
  };
}

function colorToCss(color) {
  if (!color) return "rgba(148,163,184,.35)";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function colorToLabel(color) {
  if (!color) return "-";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function colorToHex(color) {
  const normalized = normalizeColor(color);
  if (!normalized) return "";
  return `#${[normalized.r, normalized.g, normalized.b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function variantTone(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  if (kind === "dynamax") return "border-sky-300/35 bg-sky-400/15 text-sky-100";
  if (kind === "gigantamax") return "border-violet-300/35 bg-violet-400/15 text-violet-100";
  if (kind === "mega") return "border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100";
  if (kind === "form") return "border-amber-300/35 bg-amber-400/15 text-amber-100";
  return "border-emerald-300/35 bg-emerald-400/15 text-emerald-100";
}

function CandyPanel({ entries = [], search = "", onOpen }) {
  const groups = useMemo(() => {
    const byFamily = new Map();
    for (const entry of entries) {
      const candy = entry.assets?.candy;
      if (!candy?.familyId && candy?.familyId !== 0) continue;
      const key = String(candy.familyId);
      const current =
        byFamily.get(key) || {
          familyId: candy.familyId,
          image: candy.image,
          primaryColor: candy.primaryColor,
          secondaryColor: candy.secondaryColor,
          pokemon: [],
        };
      current.image ||= candy.image;
      current.primaryColor ||= candy.primaryColor;
      current.secondaryColor ||= candy.secondaryColor;
      current.pokemon.push(entry);
      byFamily.set(key, current);
    }
    return [...byFamily.values()].sort((left, right) => Number(left.familyId) - Number(right.familyId));
  }, [entries]);
  const needle = search.trim().toLowerCase();
  const filteredGroups = groups.filter((group) => {
    if (!needle) return true;
    return [
      group.familyId,
      colorToLabel(group.primaryColor),
      colorToLabel(group.secondaryColor),
      ...group.pokemon.flatMap((entry) => [entry.name, entry.dexId, entry.form, entry.file]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  return (
    <Panel
      title="Bonbons par famille"
      eyebrow="candy assets"
      action={
        <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100">
          {formatCount(filteredGroups.length)} famille(s)
        </span>
      }
    >
      <p className="mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/85">
        Chaque carte utilise la donnée ajoutée dans les JSON Pokémon: image de candy, familyId,
        couleurs principales et toutes les fiches Pokémon/formes reliées à cette famille.
      </p>
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {filteredGroups.map((group) => {
          const primary = colorToCss(group.primaryColor);
          const secondary = colorToCss(group.secondaryColor);
          return (
          <article
            className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 shadow-[0_22px_70px_rgba(0,0,0,.22)]"
            key={group.familyId}
          >
            <div
              className="relative grid gap-4 overflow-hidden p-4 sm:grid-cols-[5rem_minmax(0,1fr)]"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${primary} 84%, #ffffff 6%), color-mix(in srgb, ${secondary} 72%, #020617 18%)), radial-gradient(circle at 88% 0%, rgba(255,255,255,.42), transparent 32%)`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] opacity-25 [background-size:24px_24px]" />
              <span className="relative grid h-20 w-20 place-items-center rounded-3xl border border-white/40 bg-white/88 p-3 shadow-2xl">
                {group.image ? (
                  <img className="max-h-full object-contain drop-shadow-xl" src={group.image} alt="" />
                ) : (
                  <CircleDot size={30} className="text-slate-500" />
                )}
              </span>
              <div className="relative min-w-0 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.38)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">FamilyId</p>
                <strong className="mt-1 block text-3xl font-black">{group.familyId}</strong>
                <p className="mt-2 text-sm font-black">
                  {formatCount(group.pokemon.length)} fiche(s) associée(s)
                </p>
              </div>
            </div>
            <div className="space-y-4 p-4">
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  ["primaryColor", group.primaryColor],
                  ["secondaryColor", group.secondaryColor],
                ].map(([label, color]) => (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3" key={label}>
                    <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      {label}
                    </span>
                    <span className="mt-2 flex items-center gap-2">
                      <i className="h-6 w-6 rounded-full border border-white/30" style={{ background: colorToCss(color) }} />
                      <span className="min-w-0">
                        <strong className="block break-all text-xs text-slate-100">{colorToLabel(color)}</strong>
                        {colorToHex(color) ? (
                          <small className="mt-1 block font-mono text-[11px] font-black text-cyan-100/75">{colorToHex(color)}</small>
                        ) : null}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  Pokémon associés
                </span>
                <div className="flex max-h-52 flex-wrap gap-2 overflow-auto pr-1">
                  {group.pokemon.map((entry) => {
                    const image = preferredPokemonImage(entry);
                    return (
                    <button
                      className={`inline-flex min-w-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-black transition hover:border-cyan-200/45 hover:bg-cyan-400/15 ${variantTone(entry)}`}
                      key={entry.key}
                      type="button"
                      onClick={() => onOpen(entry)}
                    >
                      {image ? (
                        <img className="h-6 w-6 object-contain" src={image} alt="" />
                      ) : null}
                      <span className="max-w-[11rem] truncate">
                        {entry.dexId} · {entry.name}
                      </span>
                      <small className="rounded-full bg-slate-950/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                        {pokemonVariantLabel(entry)}
                      </small>
                    </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
          );
        })}
      </div>
      {!filteredGroups.length ? (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun candy ne correspond à la recherche actuelle.
        </p>
      ) : null}
    </Panel>
  );
}

function MiniCardList({ entries, onOpen }) {
  return (
    <div className="grid gap-3">
      {entries.length ? (
        entries.map((entry) => {
          const issues = entry.issues?.length || 0;
          const image = preferredPokemonImage(entry) || entry.shinyImage;
          return (
            <button
              className="group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/10"
              key={entry.key}
              type="button"
              onClick={() => onOpen(entry)}
            >
              <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl border border-white/10 bg-white/[0.055] p-1.5 shadow-inner">
                {image ? (
                  <img className="max-h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,.4)] transition group-hover:scale-110" src={image} alt="" />
                ) : (
                  <ImageIcon className="text-cyan-100/60" size={22} />
                )}
              </span>
              <span className="min-w-0">
                <strong className="block truncate font-black text-white">{entry.name}</strong>
                <small className="mt-1 block truncate text-xs font-bold text-slate-400">
                  {entry.dexId} · {pokemonVariantLabel(entry)}
                </small>
              </span>
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-100">
                {issues}
              </span>
            </button>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Rien à afficher ici.
        </p>
      )}
    </div>
  );
}

function ControlCardsPanel({ title = "Fiches à contrôler", entries, onOpen, description }) {
  const customIssueCount = entries.reduce((total, entry) => total + (entry.issues?.length || 0), 0);

  return (
    <Panel
      title={title}
      eyebrow="contrôle de fiche"
      action={
        <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100">
          {formatCount(customIssueCount)} clé(s)
        </span>
      }
    >
      <p className="mb-4 rounded-2xl border border-amber-200/15 bg-amber-400/10 p-4 text-sm font-bold leading-6 text-amber-50/85">
        {description || "Toutes les fiches Pokémon qui ne respectent pas une règle active sont regroupées ici, avec leur sprite Home quand il existe."}
      </p>
      <MiniCardList entries={entries} onOpen={onOpen} />
    </Panel>
  );
}

function JsonIssueList({ entries }) {
  return (
    <div className="grid gap-3">
      {entries.length ? (
        entries.map((entry) => {
          const customIssues = (entry.issues || []).filter((issue) => issue.category === "custom");
          return (
            <article
              className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
              key={entry.key}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <strong className="block truncate font-black text-white">{entry.name}</strong>
                  <small className="mt-1 block truncate text-xs font-bold text-slate-400">
                    {entry.kind} · {entry.file}
                  </small>
                </span>
                <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-100">
                  {customIssues.length}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {customIssues.slice(0, 8).map((issue) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200"
                    key={`${entry.key}-${issue.ruleId}-${issue.path}`}
                  >
                    {issue.path}
                  </span>
                ))}
              </div>
            </article>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Rien à afficher ici.
        </p>
      )}
    </div>
  );
}

function RulesPanel({
  rules,
  entries = [],
  jsonEntries = [],
  form,
  preview,
  message,
  onFormChange,
  onPreview,
  onSave,
  onEdit,
  onToggle,
  onDelete,
  onOpenEntry,
  onSyncGithub,
  syncingGithub = false,
}) {
  const mode = form.mode || (form.templateSource ? "template" : "path");
  const customIssueEntries = entries.filter((entry) =>
    (entry.issues || []).some((issue) => issue.category === "custom"),
  );
  const customJsonIssueEntries = jsonEntries.filter((entry) =>
    (entry.issues || []).some((issue) => issue.category === "custom"),
  );
  const customIssueCount = customIssueEntries.reduce(
    (total, entry) =>
      total + (entry.issues || []).filter((issue) => issue.category === "custom").length,
    0,
  );
  const customJsonIssueCount = customJsonIssueEntries.reduce(
    (total, entry) =>
      total + (entry.issues || []).filter((issue) => issue.category === "custom").length,
    0,
  );

  function setMode(nextMode) {
    onFormChange({
      ...form,
      mode: nextMode,
      templateSource: nextMode === "path" ? "" : form.templateSource || defaultRuleForm.templateSource,
      path: nextMode === "path" ? form.path || "description.French" : form.path || "",
      expectedType: form.expectedType || "presence",
    });
  }

  function applyPreset(preset) {
    onFormChange({
      ...defaultRuleForm,
      name: preset.name,
      mode: "template",
      appliesTo: preset.appliesTo,
      formFilters: preset.formFilters || [],
      enforceNonEmpty: preset.enforceNonEmpty,
      templateSource: preset.templateSource,
    });
  }

  function toggleKind(kind) {
    const current = new Set(form.appliesTo || []);
    if (current.has(kind)) current.delete(kind);
    else current.add(kind);
    onFormChange({ ...form, appliesTo: [...current] });
  }

  function toggleFormFilter(filter) {
    const current = new Set(form.formFilters || []);
    if (current.has(filter)) current.delete(filter);
    else current.add(filter);
    onFormChange({ ...form, formFilters: [...current] });
  }

  function updateFilterText(value) {
    onFormChange({
      ...form,
      formFilters: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  }

  return (
    <Panel
      title="Règles JSON personnalisées"
      eyebrow="checker dynamique"
      action={
        <div className="flex flex-wrap gap-2">
          <button className={buttonClass} type="button" onClick={onSyncGithub} disabled={syncingGithub}>
            <Cloud size={17} /> {syncingGithub ? "Sync..." : "Sync GitHub"}
          </button>
          <button className={primaryButtonClass} type="button" onClick={() => onFormChange({ ...defaultRuleForm })}>
            <Sparkles size={17} /> Nouvelle règle
          </button>
        </div>
      }
    >
      <div className="mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50">
        La sauvegarde d’une règle est instantanée et relance le contrôle sur le snapshot déjà chargé. Utilise “Sync GitHub” seulement quand tu veux reprendre les JSON distants avant de recalculer toutes les cartes data: Pokémon, formes, attaques, types, météo, générations et stickers.
      </div>
      <div className="grid min-w-0 gap-5">
        <section className="min-w-0 space-y-4 overflow-hidden">
          {message ? (
            <p className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-sm font-bold text-cyan-100">
              {message}
            </p>
          ) : null}
          <div>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Modèles utiles
            </span>
            <div className="grid min-w-0 gap-2 md:grid-cols-2">
              {rulePresets.map((preset) => (
                <button
                  className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-left transition hover:border-cyan-200/45 hover:bg-cyan-400/10"
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset)}
                >
                  <strong className="block text-sm font-black text-white">{preset.name}</strong>
                  <span className="mt-1 block text-xs font-bold leading-5 text-slate-400">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Nom
            </span>
            <input
              className={fieldClass}
              value={form.name}
              onChange={(event) => onFormChange({ ...form, name: event.target.value })}
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-black text-white">
            <input
              className="h-5 w-5 accent-cyan-400"
              type="checkbox"
              checked={form.enabled !== false}
              onChange={(event) => onFormChange({ ...form, enabled: event.target.checked })}
            />
            Règle active
          </label>
          <div>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Mode de règle
            </span>
            <div className="grid min-w-0 gap-2 min-[480px]:grid-cols-2">
              {[
                ["template", "Modèle JSON complet"],
                ["path", "Clé simple + type"],
              ].map(([id, label]) => (
                <button
                  className={`min-w-0 rounded-2xl border px-3 py-3 text-sm font-black leading-5 ${
                    mode === id
                      ? "border-cyan-200/50 bg-cyan-400/20 text-cyan-50"
                      : "border-white/10 bg-white/[0.055] text-slate-300"
                  }`}
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                >
                  <span className="break-words">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Appliquer à
            </span>
            <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {ruleTargetKinds.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleKind(id)}
                  className={`min-w-0 rounded-2xl border px-3 py-2 text-xs font-black leading-5 ${
                    form.appliesTo?.includes(id)
                      ? "border-cyan-200/50 bg-cyan-400/20 text-cyan-50"
                      : "border-white/10 bg-white/[0.055] text-slate-300"
                  }`}
                >
                  <span className="break-words">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Filtrer fichiers / cibles
              </span>
              <button
                className="w-fit text-xs font-black text-cyan-100 underline-offset-4 hover:underline"
                type="button"
                onClick={() => onFormChange({ ...form, formFilters: [] })}
              >
                Toutes les cibles
              </button>
            </div>
            <p className="mb-2 text-xs font-bold leading-5 text-slate-500">
              Optionnel: vise une forme, un dossier, un fichier ou un id précis, par exemple types/fire, moves/charged, kanto ou WEATHER_BALL_FIRE.
            </p>
            <input
              className={`${fieldClass} mb-2`}
              value={(form.formFilters || []).join(", ")}
              placeholder="ex: types/fire, moves/charged, weather, kanto"
              onChange={(event) => updateFilterText(event.target.value)}
            />
            <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {formFilterOptions.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFormFilter(id)}
                  className={`min-w-0 rounded-2xl border px-3 py-2 text-xs font-black leading-5 ${
                    form.formFilters?.includes(id)
                      ? "border-emerald-200/50 bg-emerald-400/20 text-emerald-50"
                      : "border-white/10 bg-white/[0.055] text-slate-300"
                  }`}
                >
                  <span className="break-words">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-black text-white">
            <input
              className="h-5 w-5 accent-cyan-400"
              type="checkbox"
              checked={form.enforceNonEmpty}
              onChange={(event) => onFormChange({ ...form, enforceNonEmpty: event.target.checked })}
            />
            Signaler aussi les valeurs vides
          </label>
          {mode === "template" ? (
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Modèle JSON attendu
              </span>
              <textarea
                className={`${fieldClass} min-h-[260px] max-w-full resize-y font-mono text-xs leading-6`}
                value={form.templateSource}
                onChange={(event) => onFormChange({ ...form, templateSource: event.target.value })}
              />
            </label>
          ) : (
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Chemin JSON
                </span>
                <input
                  className={fieldClass}
                  placeholder="ex: description.French"
                  value={form.path || ""}
                  onChange={(event) => onFormChange({ ...form, path: event.target.value, templateSource: "" })}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Type attendu
                </span>
                <select
                  className={fieldClass}
                  value={form.expectedType || "presence"}
                  onChange={(event) => onFormChange({ ...form, expectedType: event.target.value, templateSource: "" })}
                >
                  {expectedTypes.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <div className="grid min-w-0 gap-2 sm:grid-cols-3">
            <button className={buttonClass} type="button" onClick={onPreview}>
              Prévisualiser
            </button>
            <button className={primaryButtonClass} type="button" onClick={onSave}>
              Sauvegarder
            </button>
            <button className={buttonClass} type="button" onClick={() => copyToClipboard(form.templateSource)}>
              <Copy size={16} /> Copier
            </button>
          </div>
          {preview ? (
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <strong className="text-sm font-black text-emerald-100">Prévisualisation valide</strong>
              <pre className="mt-3 max-h-72 overflow-auto rounded-2xl bg-slate-950/55 p-3 font-mono text-xs leading-6 text-emerald-50">
                {JSON.stringify(preview, null, 2)}
              </pre>
            </div>
          ) : null}
        </section>

        <section className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/25 p-4">
          <h3 className="text-lg font-black text-white">Règles enregistrées</h3>
          <div className="mt-4 space-y-3">
            {rules.length ? (
              rules.map((rule) => (
                <article className="rounded-2xl border border-white/10 bg-slate-950/35 p-4" key={rule.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <strong className="block truncate text-white">{rule.name}</strong>
                      <small className="mt-1 block truncate text-xs font-bold text-slate-400">
                        {(rule.appliesTo || []).join(", ")}
                        {(rule.formFilters || []).length ? ` · ${(rule.formFilters || []).join(", ")}` : ""}
                      </small>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${rule.enabled !== false ? "bg-emerald-400/15 text-emerald-100" : "bg-white/10 text-slate-300"}`}>
                      {rule.enabled !== false ? "active" : "off"}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <button className={buttonClass} type="button" onClick={() => onEdit(rule)}>
                      Éditer
                    </button>
                    <button className={buttonClass} type="button" onClick={() => onToggle(rule)}>
                      {rule.enabled !== false ? "Pause" : "Activer"}
                    </button>
                    <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-2 text-sm font-black text-red-100" type="button" onClick={() => onDelete(rule)}>
                      Suppr.
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
                Aucune règle personnalisée pour le moment.
              </p>
            )}
          </div>
        </section>
      </div>
      <section className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Cartes à contrôler</h3>
            <p className="mt-1 text-sm font-bold leading-6 text-slate-400">
              Cartes Pokémon qui ne respectent pas une règle personnalisée.
            </p>
          </div>
          <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100">
            {customIssueCount} clé(s)
          </span>
        </div>
        {customIssueEntries.length ? (
          <MiniCardList entries={customIssueEntries.slice(0, 80)} onOpen={onOpenEntry} />
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
            Aucune carte à contrôler pour les règles actives.
          </p>
        )}
      </section>
      <section className="mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Autres JSON à contrôler</h3>
            <p className="mt-1 text-sm font-bold leading-6 text-slate-400">
              Attaques, types, météo, générations et stickers qui ne respectent pas une règle personnalisée.
            </p>
          </div>
          <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100">
            {customJsonIssueCount} clé(s)
          </span>
        </div>
        {customJsonIssueEntries.length ? (
          <JsonIssueList entries={customJsonIssueEntries.slice(0, 80)} />
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
            Aucun JSON de catalogue à contrôler pour les règles actives.
          </p>
        )}
      </section>
    </Panel>
  );
}

export function AdminApp() {
  const [session, setSession] = useState({ loading: true, authenticated: false });
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [active, setActive] = useState("overview");
  const [bootstrap, setBootstrap] = useState({ loading: false, payload: null, error: "" });
  const [catalog, setCatalog] = useState(null);
  const [assetAudit, setAssetAudit] = useState(null);
  const [sourceWatch, setSourceWatch] = useState(null);
  const [sourceHistory, setSourceHistory] = useState([]);
  const [sourceHistoryOpen, setSourceHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [detail, setDetail] = useState(null);
  const [extraPanel, setExtraPanel] = useState(null);
  const [search, setSearch] = useState("");
  const [assetChecks, setAssetChecks] = useState({});
  const [collections, setCollections] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editorText, setEditorText] = useState("");
  const [compareA, setCompareA] = useState("");
  const [compareB, setCompareB] = useState("");
  const [bulkOnlyIssues, setBulkOnlyIssues] = useState(true);
  const [assetTab, setAssetTab] = useState("all");
  const [generationFilter, setGenerationFilter] = useState("all");
  const [customRules, setCustomRules] = useState([]);
  const [ruleForm, setRuleForm] = useState({ ...defaultRuleForm });
  const [rulePreview, setRulePreview] = useState(null);
  const [ruleMessage, setRuleMessage] = useState("");
  const [rulesSyncing, setRulesSyncing] = useState(false);

  useEffect(() => {
    setAssetChecks(localJson(assetChecksKey, {}));
    setCollections(localJson(collectionsKey, []));
    setTodos(localJson(todoKey, []));
    setEditorText(localStorage.getItem(editorKey) || "");
  }, []);

  async function refreshSession() {
    const response = await fetch(`${adminApiPath}?action=session`);
    const payload = await response.json();
    const authenticated = Boolean(payload.data?.authenticated);
    setSession({ loading: false, authenticated });
    return authenticated;
  }

  async function loadAdminData({ notify = false } = {}) {
    setBootstrap((current) => ({ ...current, loading: true, error: "" }));
    try {
      const [checklistResponse, catalogResponse, assetResponse, historyResponse, rulesResponse, sourceHistoryResponse] = await Promise.all([
        fetch(adminApiPath),
        fetch(`${adminApiPath}?action=catalog`),
        fetch(`${adminApiPath}?action=assets`),
        fetch(`${adminApiPath}?action=history`),
        fetch(`${adminApiPath}?action=custom-rules`),
        fetch(`${adminApiPath}?action=source-history`),
      ]);
      const [checklistPayload, catalogPayload, assetPayload, historyPayload, rulesPayload, sourceHistoryPayload] = await Promise.all([
        checklistResponse.json(),
        catalogResponse.json(),
        assetResponse.json(),
        historyResponse.json(),
        rulesResponse.json(),
        sourceHistoryResponse.json(),
      ]);
      if (!checklistResponse.ok) throw new Error(checklistPayload.error || "Erreur de chargement.");
      setBootstrap({ loading: false, payload: checklistPayload.data, error: "" });
      setCatalog(catalogPayload.data || null);
      setAssetAudit(assetPayload.data || null);
      setHistory(historyPayload.data || []);
      setCustomRules(rulesPayload.data || checklistPayload.data?.customRules || []);
      setSourceHistory(Array.isArray(sourceHistoryPayload.data) ? sourceHistoryPayload.data : []);
      if (notify) toast.success("Dashboard Pokémon actualisé.");
    } catch (error) {
      setBootstrap({ loading: false, payload: null, error: error.message });
      if (notify) toast.error(error.message || "Erreur de chargement du dashboard.");
    }
  }

  useEffect(() => {
    refreshSession().then((authenticated) => {
      if (authenticated) {
        loadAdminData();
        loadSources({ automatic: true });
      }
    });
  }, []);

  const entries = bootstrap.payload?.entries || [];
  const customRuleEntries = bootstrap.payload?.customRuleEntries || [];
  const summary = bootstrap.payload?.summary || {};
  const issueEntries = useMemo(() => entries.filter((entry) => entry.issues.length), [entries]);
  const customIssueEntries = useMemo(
    () =>
      entries.filter((entry) =>
        (entry.issues || []).some((issue) => issue.category === "custom"),
      ),
    [entries],
  );
  const filtered = useMemo(
    () =>
      entries.filter((entry) =>
        (generationFilter === "all" ||
          (generationFilter === "hisui"
            ? String(entry.form || "").toLowerCase().includes("hisui")
            : String(entry.generation || "") === String(generationFilter))) &&
        [entry.name, entry.dexId, entry.form, entry.kind, entry.file, entry.primaryType]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [entries, search, generationFilter],
  );
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null;
  const compareLeft = entries.find((entry) => entry.key === compareA);
  const compareRight = entries.find((entry) => entry.key === compareB);
  const bulkEntries = filtered.filter((entry) => !bulkOnlyIssues || entry.issues.length).slice(0, 80);
  const unchecked = entries.filter((entry) => !assetChecks[entry.key]);
  const assetItems = useMemo(() => {
    const lists = [
      ...(assetTab === "all" || assetTab === "proposals"
        ? (assetAudit?.proposals || []).map((item) => ({ ...item, group: "Propositions HD", image: item.url }))
        : []),
      ...(assetTab === "all" || assetTab === "go"
        ? (assetAudit?.goAssets || []).map((item) => ({ ...item, group: "Assets liés GO", image: item.url }))
        : []),
      ...(assetTab === "all" || assetTab === "shuffle"
        ? (assetAudit?.shuffleAssets || []).map((item) => ({ ...item, group: "Shuffle", image: item.url }))
        : []),
      ...(assetTab === "all" || assetTab === "unused"
        ? (assetAudit?.unused || []).map((item) => ({ ...item, group: "HD non utilisés", image: item.url }))
        : []),
    ];
    const needle = search.trim().toLowerCase();
    if (!needle) return lists;
    return lists.filter((item) => JSON.stringify(item).toLowerCase().includes(needle));
  }, [assetAudit, assetTab, search]);
  const exportPayload = {
    generatedAt: new Date().toISOString(),
    filters: { search },
    entries: filtered.slice(0, 250),
  };
  const overviewWidgets = [
    {
      id: "completion",
      label: "Complétion",
      node: (
        <Panel title="Complétion JSON par génération">
          <CompletionList items={summary.generations || []} />
        </Panel>
      ),
    },
    {
      id: "diagnostic",
      label: "Diagnostic",
      node: (
        <Panel title="Diagnostic des contrôles" eyebrow="issues par famille">
          <BarList items={summary.categories || []} />
        </Panel>
      ),
    },
    {
      id: "history",
      label: "Historique Git",
      node: (
        <Panel title="Historique Git" action={<History className="text-cyan-200" size={22} />}>
          <HistoryList history={history} />
        </Panel>
      ),
    },
    {
      id: "watch",
      label: "Fiches à surveiller",
      node: (
        <Panel title="Fiches à surveiller" eyebrow="premières anomalies">
          <MiniCardList entries={issueEntries.slice(0, 8)} onOpen={openDetail} />
        </Panel>
      ),
    },
  ];

  async function login() {
    setAuthError("");
    setSession((current) => ({ ...current, loading: true }));
    const response = await fetch(adminApiPath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "login", password }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setSession({ loading: false, authenticated: false });
      setAuthError(payload.error || "Connexion refusée.");
      toast.error(payload.error || "Connexion refusée.");
      return;
    }
    setSession({ loading: false, authenticated: true });
    setPassword("");
    setActive("overview");
    toast.success("Session admin ouverte.");
    await loadAdminData();
  }

  async function openDetail(entry) {
    const index = filtered.findIndex((item) => item.key === entry.key);
    setSelectedIndex(index);
    setExtraPanel(null);
    setDetail(null);
    const response = await fetch(`${adminApiPath}?action=detail&key=${encodeURIComponent(entry.key)}`);
    const payload = await response.json();
    setDetail(response.ok ? payload.data : { detail: { error: payload.error || "Erreur de chargement." } });
  }

  function shiftDetail(delta) {
    if (!filtered.length) return;
    const nextIndex = (selectedIndex + delta + filtered.length) % filtered.length;
    openDetail(filtered[nextIndex]);
  }

  function setAssetChecked(key, checked) {
    const next = { ...assetChecks, [key]: checked };
    if (!checked) delete next[key];
    setAssetChecks(next);
    localStorage.setItem(assetChecksKey, JSON.stringify(next));
  }

  function saveCollections(next) {
    setCollections(next);
    localStorage.setItem(collectionsKey, JSON.stringify(next));
  }

  async function loadSources({ automatic = false } = {}) {
    const toastId = automatic ? null : toast.loading("Vérification des sources Pokémon GO...");
    setSourceWatch({ loading: true, sources: [] });
    try {
      const response = await fetch(`${adminApiPath}?action=source-watch`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Veille indisponible.");
      const watchState = persistSourceSignatures(payload.data);
      setSourceWatch({
        ...(payload.data || {}),
        sources: watchState?.sources || payload.data?.sources || [],
        changedSources: watchState?.changed || [],
      });
      if (Array.isArray(payload.data?.history)) setSourceHistory(payload.data.history);
      if (watchState?.changed?.length) {
        const names = watchState.changed
          .map((source) => source.name || source.repo || source.url)
          .filter(Boolean)
          .slice(0, 4)
          .join(", ");
        toast.info(
          `${watchState.changed.length} source(s) modifiée(s) : ${names}${watchState.changed.length > 4 ? "..." : ""}`,
        );
      }
      if (watchState?.blocked?.length && !automatic) {
        toast.warning(`${watchState.blocked.length} source(s) bloquent le contrôle serveur, mais restent surveillées.`);
      }
      if (!automatic) toast.success(`${payload.data?.sources?.length || 0} source(s) vérifiée(s).`, { id: toastId });
    } catch (error) {
      setSourceWatch({ error: error.message });
      if (!automatic) toast.error(error.message || "Veille indisponible.", { id: toastId });
    }
  }

  async function loadSourceHistory() {
    try {
      const response = await fetch(`${adminApiPath}?action=source-history`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Historique des sources indisponible.");
      setSourceHistory(Array.isArray(payload.data) ? payload.data : []);
      setSourceHistoryOpen(true);
    } catch (error) {
      toast.error(error.message || "Historique des sources indisponible.");
    }
  }

  async function previewRule() {
    setRuleMessage("");
    const response = await fetch(adminApiPath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "preview-rule", ...ruleForm }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setRulePreview(null);
      setRuleMessage(payload.error || "Règle invalide.");
      toast.error(payload.error || "Règle invalide.");
      return;
    }
    setRulePreview(payload.data);
    setRuleMessage("Modèle compris par le checker.");
    toast.success("Règle comprise par le checker.");
  }

  async function saveRule() {
    setRuleMessage("");
    const response = await fetch(adminApiPath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "save-rule", ...ruleForm }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setRuleMessage(payload.error || "Impossible de sauvegarder la règle.");
      toast.error(payload.error || "Impossible de sauvegarder la règle.");
      return;
    }
    setRuleForm({ ...defaultRuleForm });
    setRulePreview(payload.data);
    setRuleMessage("Règle sauvegardée. Contrôle recalculé sur le snapshot local.");
    toast.success("Règle JSON sauvegardée.");
    await loadAdminData();
  }

  async function syncGithubData() {
    setRulesSyncing(true);
    setRuleMessage("Synchronisation GitHub en cours...");
    const toastId = toast.loading("Synchronisation GitHub en cours...");
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "sync-github-data" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Synchronisation impossible.");
      setBootstrap({ loading: false, payload: payload.data?.bootstrap, error: "" });
      setCustomRules(payload.data?.bootstrap?.customRules || []);
      setRuleMessage("Snapshot GitHub synchronisé. Contrôle relancé sur les données à jour.");
      toast.success("Snapshot GitHub synchronisé.", { id: toastId });
    } catch (error) {
      setRuleMessage(error.message || "Synchronisation impossible.");
      toast.error(error.message || "Synchronisation impossible.", { id: toastId });
    } finally {
      setRulesSyncing(false);
    }
  }

  async function toggleRule(rule) {
    await fetch(adminApiPath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "toggle-rule", id: rule.id, enabled: rule.enabled === false }),
    });
    toast.success(rule.enabled === false ? "Règle activée." : "Règle désactivée.");
    await loadAdminData();
  }

  async function deleteRule(rule) {
    await fetch(adminApiPath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "delete-rule", id: rule.id }),
    });
    toast.success("Règle supprimée.");
    await loadAdminData();
  }

  function addTodo() {
    if (!newTodo.trim()) return;
    const next = [{ id: Date.now(), text: newTodo.trim(), done: false }, ...todos];
    setTodos(next);
    setNewTodo("");
    localStorage.setItem(todoKey, JSON.stringify(next));
    toast.success("Tâche ajoutée.");
  }

  if (session.loading && !session.authenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,.28),transparent_35%),#060914] p-4 text-white">
        <section className={panelClass}>
          <h2 className="text-xl font-black">Vérification de la session admin...</h2>
        </section>
      </main>
    );
  }

  if (!session.authenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.22),transparent_28%),#050815] p-4 text-white">
        <LoginCard
          password={password}
          error={authError}
          loading={session.loading}
          onPasswordChange={setPassword}
          onSubmit={login}
        />
      </main>
    );
  }

  return (
    <main className="pokemon-admin-surface text-white">
      <div className="w-full">
        <section className="min-w-0">
          <header
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_90px_rgba(0,0,0,.25)] backdrop-blur-2xl sm:p-5"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(15,23,42,.88), rgba(14,165,233,.18)), url("/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-slate-950/45" />
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="mb-1 text-xs font-black uppercase tracking-[0.24em] text-cyan-200/70">
                  Dashboard sécurisé
                </p>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  {navItems.find(([id]) => id === active)?.[1]}
                </h1>
              </div>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] xl:w-[620px]">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    className={`${fieldClass} pl-11`}
                    placeholder="Chercher fiche, type, fichier..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <button className={buttonClass} type="button" onClick={() => loadAdminData({ notify: true })}>
                  <RefreshCcw size={17} /> Actualiser
                </button>
              </div>
            </div>
            <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
              {navItems.map(([id, label, Icon]) => (
                <button
                  className={`group inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-xs font-black tracking-normal transition ${
                    active === id
                      ? "border-cyan-200/55 bg-cyan-400/22 text-cyan-50 shadow-[0_12px_36px_rgba(34,211,238,.16)]"
                      : "border-white/10 bg-slate-950/35 text-slate-300 hover:border-cyan-200/35 hover:bg-white/[0.09]"
                  }`}
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                >
                  <Icon className="shrink-0 transition group-hover:scale-110" size={16} />
                  <span className="min-w-0 truncate">{label}</span>
                </button>
              ))}
            </nav>
            </div>
          </header>

          <div className="mt-5 space-y-5">
            {bootstrap.loading ? (
              <Panel title="Chargement du dashboard">
                <p className="font-bold text-slate-300">Je recharge les fiches, catalogues, assets et l’historique Git.</p>
              </Panel>
            ) : bootstrap.error ? (
              <Panel title="Erreur dashboard">
                <p className="font-bold text-red-100">{bootstrap.error}</p>
              </Panel>
            ) : null}

            {!bootstrap.loading && !bootstrap.error && active === "overview" ? (
              <>
                <section className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard label="Fiches analysées" value={summary.total || 0} icon={uiAssets.icons.fiche} />
                  <MetricCard label="Terminées" value={summary.complete || 0} accent="green" icon={uiAssets.icons.bookSpells} />
                  <MetricCard label="Problèmes" value={summary.issues || 0} accent="amber" icon={uiAssets.icons.problem} />
                  <MetricCard label="Assets vérifiés" value={Object.keys(assetChecks).length} accent="violet" icon={uiAssets.icons.result} />
                </section>

                <section className="grid items-start gap-3 lg:grid-cols-3">
                  <article className="rounded-[2rem] border border-emerald-300/15 bg-emerald-400/10 p-5">
                    <Sparkles className="mb-4 text-emerald-200" size={24} />
                    <span className="text-sm font-bold text-emerald-100/80">Données complètes</span>
                    <strong className="mt-1 block text-3xl font-black">{summary.complete || 0}</strong>
                  </article>
                  <article className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-5">
                    <ShieldCheck className="mb-4 text-cyan-200" size={24} />
                    <span className="text-sm font-bold text-cyan-100/80">Accès admin</span>
                    <strong className="mt-1 block text-3xl font-black">Protégé</strong>
                  </article>
                  <article className="rounded-[2rem] border border-violet-300/15 bg-violet-400/10 p-5">
                    <BarChart3 className="mb-4 text-violet-200" size={24} />
                    <span className="text-sm font-bold text-violet-100/80">Résultat filtre</span>
                    <strong className="mt-1 block text-3xl font-black">{filtered.length}</strong>
                  </article>
                </section>

                <SortableWidgetGrid
                  columnsClassName="columns-1 xl:columns-2"
                  items={overviewWidgets}
                  storageKey="matweb.pokemonAdmin.widgetOrder"
                />
              </>
            ) : null}

            {active === "pokedex" ? (
              <>
                <GenerationFilterBar value={generationFilter} onChange={setGenerationFilter} />
                <section className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filtered.slice(0, 240).map((entry) => (
                    <PokemonCard
                      admin
                      key={entry.key}
                      entry={entry}
                      onOpen={openDetail}
                      actionLabel="Ouvrir"
                      assetChecked={Boolean(assetChecks[entry.key])}
                      onAssetChecked={setAssetChecked}
                      typeCatalog={catalog?.types}
                      weatherCatalog={catalog?.weather}
                    />
                  ))}
                </section>
              </>
            ) : null}

            {active === "candies" ? (
              <CandyPanel entries={entries} search={search} onOpen={openDetail} />
            ) : null}

            {active === "collections" ? (
              <CollectionsPanel
                entries={entries}
                collections={collections}
                onSave={saveCollections}
                onOpen={openDetail}
                globalSearch={search}
              />
            ) : null}

            {active === "assets" ? (
              <section className="grid items-start gap-5 xl:grid-cols-[1.4fr_.9fr]">
                <Panel title="Vérification d’assets" eyebrow="bibliothèque">
                  <div className="mb-4 grid min-w-0 items-start gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                    <AssetStatCard label="GO" value={assetAudit?.totals?.goFiles || 0} icon={uiAssets.icons.goLogo} tone="cyan" detail="Fichiers image GO" />
                    <AssetStatCard label="Shuffle" value={assetAudit?.totals?.shuffleFiles || 0} icon={uiAssets.icons.pikachuShuffle} tone="violet" detail="Bibliothèque Shuffle" />
                    <AssetStatCard label="Utilisés" value={assetAudit?.totals?.used || 0} icon={uiAssets.icons.bookSpells} tone="green" detail="Référencés par les fiches" />
                    <AssetStatCard label="Réutilisations" value={assetAudit?.totals?.duplicated || 0} icon={uiAssets.icons.problem} tone="amber" detail="Même URL liée plusieurs fois" />
                  </div>
                  <p className="mb-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-bold leading-6 text-slate-300">
                    Cette page sert à contrôler les images réellement liées aux fiches et les propositions HD. “Réutilisations” signifie qu’une même URL d’asset est référencée par plusieurs fiches, ce n’est pas forcément une erreur.
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {[
                      ["all", "Tout"],
                      ["proposals", "Propositions HD"],
                      ["go", "Liés GO"],
                      ["shuffle", "Shuffle"],
                      ["unused", "HD non utilisés"],
                    ].map(([id, label]) => (
                      <button
                        className={`rounded-full border px-4 py-2 text-xs font-black ${
                          assetTab === id
                            ? "border-cyan-200/50 bg-cyan-400/20 text-cyan-50"
                            : "border-white/10 bg-white/[0.055] text-slate-300"
                        }`}
                        key={id}
                        type="button"
                        onClick={() => setAssetTab(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {assetItems.slice(0, 120).map((asset, index) => (
                      <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40" key={`${asset.group}-${asset.filename || asset.url}-${index}`}>
                        <div className="grid aspect-square place-items-center bg-white/[0.04] p-3">
                          <img className="max-h-full object-contain" src={asset.image || asset.url} alt={asset.filename || asset.label || "asset"} />
                        </div>
                        <div className="border-t border-white/10 p-3">
                          <strong className="block truncate text-xs font-black text-white">{asset.filename || asset.label}</strong>
                          <span className="mt-1 block truncate text-xs font-bold text-slate-400">{asset.group} · {asset.label || asset.details || asset.form || "standard"}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </Panel>
                <Panel title="Fiches à vérifier" eyebrow={`${unchecked.length} restantes`}>
                  <MiniCardList entries={unchecked.slice(0, 50)} onOpen={openDetail} />
                </Panel>
              </section>
            ) : null}

            {active === "checks" ? (
              <section className="grid items-start gap-5 xl:grid-cols-[1.2fr_.8fr]">
                <ControlCardsPanel
                  title="Fiches à contrôler"
                  entries={issueEntries}
                  onOpen={openDetail}
                  description="Liste dédiée pour ouvrir toutes les fiches qui ont une correction à faire, y compris les nouvelles règles JSON personnalisées."
                />
                <Panel title="Règles personnalisées" eyebrow="focus custom" action={<Wand2 className="text-amber-100" size={22} />}>
                  <MiniCardList entries={customIssueEntries.slice(0, 120)} onOpen={openDetail} />
                </Panel>
              </section>
            ) : null}

            {active === "sources" ? (
              <Panel
                title="Veille sources"
                eyebrow="PokeMiners, Game Master, Shuffle"
                action={
                  <div className="flex flex-wrap gap-2">
                    <button className={buttonClass} type="button" onClick={loadSourceHistory}>
                      <History size={17} /> Historique
                    </button>
                    <button className={primaryButtonClass} type="button" onClick={() => loadSources()}>
                      <Radar size={17} /> Vérifier maintenant
                    </button>
                  </div>
                }
              >
                <SourceRows sourceWatch={sourceWatch} />
              </Panel>
            ) : null}

            {active === "catalogs" ? <CatalogPanel catalog={catalog} /> : null}

            {active === "compare" ? (
              <Panel title="Comparaison de fiches" eyebrow="contrôle">
                <p className="mb-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-bold leading-6 text-slate-300">
                  Compare deux fiches côte à côte pour vérifier rapidement les assets, types, problèmes JSON et informations visibles avant une correction.
                </p>
                <div className="mb-5 grid gap-3 md:grid-cols-2">
                  <select className={fieldClass} value={compareA} onChange={(event) => setCompareA(event.target.value)}>
                    <option value="">Fiche gauche</option>
                    {entries.slice(0, 1000).map((entry) => (
                      <option key={entry.key} value={entry.key}>
                        {entry.dexId} · {entry.name}
                      </option>
                    ))}
                  </select>
                  <select className={fieldClass} value={compareB} onChange={(event) => setCompareB(event.target.value)}>
                    <option value="">Fiche droite</option>
                    {entries.slice(0, 1000).map((entry) => (
                      <option key={entry.key} value={entry.key}>
                        {entry.dexId} · {entry.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid items-start gap-4 lg:grid-cols-2">
                  {[compareLeft, compareRight].map((entry, index) => (
                    <div className="rounded-[2rem] border border-white/10 bg-slate-950/30 p-3" key={index}>
                      {entry ? (
                        <PokemonCard entry={entry} typeCatalog={catalog?.types} weatherCatalog={catalog?.weather} onOpen={openDetail} />
                      ) : (
                        <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm font-bold text-slate-400">Sélectionne une fiche.</p>
                      )}
                    </div>
                  ))}
                </div>
              </Panel>
            ) : null}

            {active === "rules" ? (
              <RulesPanel
                rules={customRules}
                entries={entries}
                jsonEntries={customRuleEntries}
                form={ruleForm}
                preview={rulePreview}
                message={ruleMessage}
                onFormChange={setRuleForm}
                onPreview={previewRule}
                onSave={saveRule}
                onOpenEntry={openDetail}
                onSyncGithub={syncGithubData}
                syncingGithub={rulesSyncing}
                onEdit={(rule) => {
                  setRuleForm({
                    ...defaultRuleForm,
                    ...rule,
                    mode: rule.mode || (rule.path ? "path" : "template"),
                    formFilters: rule.formFilters || [],
                    path: rule.path || "",
                    expectedType: rule.expectedType || "presence",
                    templateSource:
                      rule.mode === "path"
                        ? ""
                        : rule.templateSource || JSON.stringify(rule.template || {}, null, 2),
                  });
                  setRulePreview(rule);
                  setRuleMessage("Règle chargée dans l’éditeur.");
                }}
                onToggle={toggleRule}
                onDelete={deleteRule}
              />
            ) : null}

            {active === "bulk" ? (
              <Panel
                title="Corrections groupées"
                action={
                  <label className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-black text-white">
                    <input
                      className="h-5 w-5 accent-cyan-400"
                      type="checkbox"
                      checked={bulkOnlyIssues}
                      onChange={(event) => setBulkOnlyIssues(event.target.checked)}
                    />
                    Seulement les fiches avec problèmes
                  </label>
                }
              >
                <p className="mb-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-bold leading-6 text-slate-300">
                  Génère un brouillon JSON à partir des problèmes détectés. Ce panneau ne modifie pas les fichiers: il sert à préparer des corrections groupées.
                </p>
                <textarea className={`${fieldClass} min-h-[520px] resize-y font-mono text-xs leading-6`} readOnly value={JSON.stringify(Object.fromEntries(bulkEntries.map((entry) => [entry.key, entry.suggestedPatch])), null, 2)} />
              </Panel>
            ) : null}

            {active === "export" ? (
              <Panel
                title="Export et partage"
                action={
                  <button className={primaryButtonClass} type="button" onClick={() => copyToClipboard(exportPayload)}>
                    <Copy size={17} /> Copier l’export
                  </button>
                }
              >
                <p className="mb-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-bold leading-6 text-slate-300">
                  Exporte les fiches correspondant à la recherche globale en cours. Pratique pour partager un lot réduit ou conserver un état de contrôle.
                </p>
                <textarea className={`${fieldClass} min-h-[520px] resize-y font-mono text-xs leading-6`} readOnly value={JSON.stringify(exportPayload, null, 2)} />
              </Panel>
            ) : null}

            {active === "todo" ? (
              <Panel title="Todo-list">
                <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input className={fieldClass} value={newTodo} placeholder="Ajouter une tâche" onChange={(event) => setNewTodo(event.target.value)} />
                  <button className={primaryButtonClass} type="button" onClick={addTodo}>Ajouter</button>
                </div>
                <div className="grid gap-3">
                  {todos.map((todo) => (
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4" key={todo.id}>
                      <input
                        className="h-6 w-6 accent-cyan-400"
                        type="checkbox"
                        checked={todo.done}
                        onChange={(event) => {
                          const next = todos.map((item) => (item.id === todo.id ? { ...item, done: event.target.checked } : item));
                          setTodos(next);
                          localStorage.setItem(todoKey, JSON.stringify(next));
                        }}
                      />
                      <span className={`font-bold ${todo.done ? "text-slate-500 line-through" : "text-white"}`}>{todo.text}</span>
                    </label>
                  ))}
                </div>
              </Panel>
            ) : null}

            {active === "editor" ? (
              <Panel title="Éditeur de texte" eyebrow="notes privées">
                <textarea
                  className={`${fieldClass} min-h-[620px] resize-y font-mono text-sm leading-7`}
                  value={editorText}
                  onChange={(event) => {
                    setEditorText(event.target.value);
                    localStorage.setItem(editorKey, event.target.value);
                  }}
                  placeholder="Notes, brouillons JSON, idées de corrections..."
                />
              </Panel>
            ) : null}

          </div>
        </section>
      </div>

      <SourceHistoryModal
        open={sourceHistoryOpen}
        history={sourceHistory}
        onClose={() => setSourceHistoryOpen(false)}
      />

      <DetailModal
        open={Boolean(selected)}
        entry={selected}
        detail={detail}
        mode="admin"
        typeCatalog={catalog?.types}
        weatherCatalog={catalog?.weather}
        assetChecked={Boolean(selected && assetChecks[selected.key])}
        onAssetChecked={setAssetChecked}
        extraPanel={extraPanel}
        onPrevious={() => shiftDetail(-1)}
        onNext={() => shiftDetail(1)}
        onClose={() => {
          setSelectedIndex(-1);
          setDetail(null);
          setExtraPanel(null);
        }}
        onCopyPatch={() => copyToClipboard(selected?.suggestedPatch || {})}
        onAuditUrls={async () => {
          const response = await fetch(`${adminApiPath}?action=url-audit&key=${encodeURIComponent(selected.key)}`);
          const payload = await response.json();
          setExtraPanel(
            <div className="space-y-3">
              {(payload.data || []).map((item) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3" key={item.url}>
                  <strong className={item.ok ? "text-emerald-200" : "text-red-200"}>{item.ok ? "Accessible" : "Erreur"}</strong>
                  <span className="mt-1 block break-all text-xs font-bold text-slate-300">
                    HTTP {item.status || "?"} · {item.url}
                  </span>
                </div>
              ))}
            </div>,
          );
        }}
        onAssetAudit={async () => {
          const response = await fetch(`${adminApiPath}?action=assets&dexId=${encodeURIComponent(selected.dexId)}`);
          const payload = await response.json();
          const groups = [
            ["Propositions HD", payload.data?.proposals || []],
            ["Assets liés GO", payload.data?.goAssets || []],
            ["Shuffle", payload.data?.shuffleAssets || []],
          ];
          setExtraPanel(
            <div className="space-y-4">
              {groups.map(([label, items]) => (
                <section key={label}>
                  <div className="mb-2 flex items-center justify-between">
                    <strong className="text-white">{label}</strong>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-black text-slate-300">{items.length}</span>
                  </div>
                  {items.length ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {items.slice(0, 24).map((asset, index) => (
                        <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40" key={`${label}-${asset.filename || asset.url}-${index}`}>
                          <div className="grid aspect-square place-items-center p-3">
                            <img className="max-h-full object-contain" src={asset.url} alt={asset.filename || asset.label || label} />
                          </div>
                          <div className="border-t border-white/10 p-2">
                            <strong className="block truncate text-xs text-white">{asset.filename || asset.label}</strong>
                            <span className="mt-1 block truncate text-xs text-slate-400">{asset.details || asset.form || asset.state || "standard"}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-dashed border-white/15 p-3 text-sm font-bold text-slate-400">Aucun résultat.</p>
                  )}
                </section>
              ))}
            </div>,
          );
        }}
      />
    </main>
  );
}
