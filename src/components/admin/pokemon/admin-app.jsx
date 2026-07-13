"use client";

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertTriangle,
  Archive,
  BarChart3,
  ClipboardCheck,
  Cloud,
  Copy,
  FileDiff,
  FileJson,
  History,
  ListTodo,
  Radar,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Boxes,
  PackageOpen,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { DetailModal } from "@/components/admin/pokemon/detail-modal";
import { PokemonCard } from "@/components/admin/pokemon/pokemon-card";
import { SortableWidgetGrid } from "@/components/admin/shared/sortable-widget-grid";
import { MetricCard } from "@/components/site/metric-card";
import { uiAssets } from "@/components/site/ui-assets";
import {
  AssetStatCard,
  BarList,
  CompletionList,
  ControlCardsPanel,
  fieldClass,
  GenerationFilterBar,
  HistoryList,
  JsonIssueList,
  MiniCardList,
  Panel,
  panelClass,
  primaryButtonClass,
  buttonClass,
} from "./admin-ui";
import { CandyPanel } from "./candy-panel";
import { BackgroundPanel } from "./background-panel";
import { CatalogPanel } from "./catalog-panel";
import { CollectionsPanel } from "./collections-panel";
import { EggsPanel } from "./eggs-panel";
import { EventsCalendarPanel } from "./events-calendar-panel";
import { LoginCard } from "./login-card";
import { MaxBattlesPanel } from "./max-battles-panel";
import { PvpRankingsPanel } from "./pvp-rankings-panel";
import { RaidsPanel } from "./raids-panel";
import { ResearchPanel } from "./research-panel";
import { RocketPanel } from "./rocket-panel";
import { ShinyTrackerPanel } from "./shiny-tracker-panel";
import { DataDeployHistoryModal, SourceHistoryModal, SourceRows } from "./source-watch-panel";
import { UpdateLogPanel } from "./update-log-panel";
import { AdminTodoPanel } from "./admin-todo-panel";
import { AdminSectionNavigation } from "./admin-section-navigation";
import {
  readDashboardStoreValue,
  readLocalJson,
  writeDashboardStoreValue,
} from "@/services/admin/dashboard-store";
import {
  dashboardRedeployApiPath as redeployApiPath,
  pokemonAdminApiPath as adminApiPath,
} from "@/services/admin/pokemon-admin-api";
import {
  entryMatchesFicheFilter,
  sortPokemonEntries,
} from "@/utils/admin/pokemon-entries";
import { persistSourceSignatures } from "@/utils/admin/source-watch";

const legacyAssetChecksKey = "pokedex-v4-asset-checks";
const assetChecksStoreKey = "matweb.pokemon.assetChecks";
const sourceWatchSignatureKey = "pokedex-v4-source-watch-signatures";
const collectionsKey = "pokedex-v4-admin-collections";

const TrainerPokemonCollectionPanel = dynamic(
  () => import("./trainer-pokemon-collection-panel").then((module) => module.TrainerPokemonCollectionPanel),
  { loading: () => <div className={`${panelClass} min-h-64 animate-pulse`} aria-label="Chargement de Ma collection" /> },
);

const filtersAssetBase = "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers/Filters";
const pokemonAssetBase = "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers";
const navItems = [
  { id: "overview", label: "Accueil", icon: `${pokemonAssetBase}/btn_pokeball_white_shadow.png`, group: "data" },
  { id: "pokedex", label: "Fiches", icon: `${filtersAssetBase}/ic_alola.png`, group: "data" },
  { id: "candies", label: "Candies", icon: `${filtersAssetBase}/TodayView_Icon_CandyXL.png`, group: "data" },
  { id: "backgrounds", label: "Background", icon: `${filtersAssetBase}/TodayView_Icon_PostCard.png`, group: "data" },
  { id: "collections", label: "Collections", icon: Boxes, group: "data" },
  { id: "my-collection", label: "Ma collection", icon: PackageOpen, group: "data" },
  { id: "assets", label: "Assets", icon: `${filtersAssetBase}/TodayView_Icon_Photobomb.png`, group: "data" },
  { id: "catalogs", label: "Catalogues", icon: Archive, group: "data" },
  { id: "raids", label: "Raids", icon: `${filtersAssetBase}/TodayView_Icon_Raid.png`, group: "combat" },
  { id: "max-battles", label: "Max Battles", icon: `${filtersAssetBase}/TodayView_Icon_Evolve.png`, group: "combat" },
  { id: "rocket", label: "Rocket", icon: `${filtersAssetBase}/TodayView_Icon_TeamRocket.png`, group: "combat" },
  { id: "pvp-rankings", label: "PvP Rankings", icon: `${filtersAssetBase}/TodayView_Icon_Battle.png`, group: "combat" },
  { id: "eggs", label: "Œufs", icon: `${filtersAssetBase}/TodayView_Icon_LuckyEgg.png`, group: "events" },
  { id: "research", label: "Research", icon: `${filtersAssetBase}/TodayView_Icon_Research.png`, group: "events" },
  { id: "events", label: "Calendrier Events", icon: `${filtersAssetBase}/TodayView_Icon_Event.png`, group: "events" },
  { id: "shiny", label: "Shiny Tracker", icon: `${filtersAssetBase}/ic_shiny_white.png`, group: "quality" },
  { id: "checks", label: "Contrôles", icon: AlertTriangle, group: "quality" },
  { id: "sources", label: "Veille", icon: Radar, group: "quality" },
  { id: "compare", label: "Comparaison", icon: FileDiff, group: "quality" },
  { id: "todo", label: "Todo-list", icon: ListTodo, group: "quality" },
  { id: "logs", label: "Logs & MAJ", icon: History, group: "maintenance" },
  { id: "rules", label: "Règles JSON", icon: Sparkles, group: "maintenance" },
  { id: "bulk", label: "Corrections", icon: ClipboardCheck, group: "maintenance" },
  { id: "export", label: "Export", icon: FileJson, group: "maintenance" },
];

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

const initialShinyOptions = { board: "today", search: "", type: "", generation: "", trend: "", page: 1, limit: 50 };
const initialPvpOptions = { league: "great", search: "", role: "", page: 1, limit: 50 };

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

const ficheFilterOptions = [
  ["all", "Toutes", null, "Toutes les fiches"],
  ["chromatic", "Chromatique", "/ui/chromatique_banner.png", "availability.shinyReleased"],
  ["costume", "Costume / Event", "/ui/costume_banner.png", "assetForms événementiels"],
  ["mega", "Méga", "/ui/mega_banner.png", "kind/form méga ou primo"],
  ["regional", "Régional", "/ui/regional_banner.png", "formes Alola, Galar, Hisui, Paldea"],
];

const initialFicheLimit = 240;
const ficheLimitStep = 240;
const initialAssetLimit = 120;
const assetLimitStep = 120;

function isPlainObject(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
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

function errorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function markCurrentDatasetFailure(resource, message) {
  if (!resource) return null;
  return {
    ...resource,
    meta: {
      ...(resource.meta || {}),
      refreshError: `Affichage de la dernière version MongoDB connue — la nouvelle récupération a échoué. ${message}`,
    },
  };
}

function downloadCurrentDataset(resource, baseName) {
  const current = resource?.current;
  const requiredFields = ["source", "generatedAt", "savedAt", "count", "sourceHash", "diagnostics", "data"];
  if (
    resource?.meta?.source !== "mongodb"
    || current?.key !== "current"
    || requiredFields.some((field) => current[field] === undefined)
  ) {
    toast.error("Le document MongoDB courant confirmé n’est pas disponible au téléchargement.");
    return;
  }

  const savedDate = new Date(current.savedAt);
  const dateLabel = Number.isNaN(savedDate.getTime())
    ? new Date().toISOString().slice(0, 10)
    : savedDate.toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(current, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${baseName}-${dateLabel}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function regenerationMessage(report) {
  const diff = report?.diff || report?.current?.diagnostics?.diff;
  if (!diff?.changed) {
    return "Données récupérées avec succès — aucun changement détecté.";
  }
  return `Données mises à jour : ${Number(diff.added || 0)} ajoutées, ${Number(diff.removed || 0)} retirées, ${Number(diff.modified || 0)} modifiées.`;
}

function currentResourceFromReport(report, metaKey) {
  const current = report?.current;
  if (current?.key !== "current" || !current.data) return null;
  return {
    data: current.data,
    current,
    meta: {
      source: "mongodb",
      domain: current.domain,
      provider: current.source?.provider || null,
      url: current.source?.url || null,
      mode: current.source?.mode || null,
      event: current.source?.event || null,
      fetchedAt: current.source?.fetchedAt || null,
      generatedAt: current.generatedAt || null,
      savedAt: current.savedAt || current.updatedAt || null,
      count: current.count,
      sourceHash: current.sourceHash,
      status: current.status,
      diagnostics: current.diagnostics,
      [metaKey]: report?.[metaKey] || null,
    },
  };
}

function LoadMoreButton({ shown, total, onClick }) {
  const remaining = Math.max(0, total - shown);
  return (
    <div className="mt-5 flex justify-center">
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-400/12 px-5 py-2 text-sm font-black text-cyan-50 transition hover:border-cyan-200/55 hover:bg-cyan-400/20"
        type="button"
        onClick={onClick}
      >
        Afficher plus · {remaining.toLocaleString("fr-FR")} restant(s)
      </button>
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
  const [deployHistory, setDeployHistory] = useState([]);
  const [deployHistoryOpen, setDeployHistoryOpen] = useState(false);
  const [redeployingDashboard, setRedeployingDashboard] = useState(false);
  const [raids, setRaids] = useState(null);
  const [raidsLoading, setRaidsLoading] = useState(false);
  const [raidsRegenerating, setRaidsRegenerating] = useState(false);
  const [eggs, setEggs] = useState(null);
  const [eggsLoading, setEggsLoading] = useState(false);
  const [eggsRegenerating, setEggsRegenerating] = useState(false);
  const [maxBattles, setMaxBattles] = useState(null);
  const [maxBattlesLoading, setMaxBattlesLoading] = useState(false);
  const [maxBattlesRegenerating, setMaxBattlesRegenerating] = useState(false);
  const [rocket, setRocket] = useState(null);
  const [rocketTexts, setRocketTexts] = useState(null);
  const [rocketLoading, setRocketLoading] = useState(false);
  const [rocketRegenerating, setRocketRegenerating] = useState(false);
  const [research, setResearch] = useState(null);
  const [itemsReference, setItemsReference] = useState(null);
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchRegenerating, setResearchRegenerating] = useState(false);
  const [shiny, setShiny] = useState(null);
  const [shinyLoading, setShinyLoading] = useState(false);
  const [shinyRegenerating, setShinyRegenerating] = useState(false);
  const [shinyOptions, setShinyOptions] = useState(initialShinyOptions);
  const [pvpRankings, setPvpRankings] = useState(null);
  const [pvpRankingsLoading, setPvpRankingsLoading] = useState(false);
  const [pvpRankingsRegenerating, setPvpRankingsRegenerating] = useState(false);
  const [pvpOptions, setPvpOptions] = useState(initialPvpOptions);
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [detail, setDetail] = useState(null);
  const [extraPanel, setExtraPanel] = useState(null);
  const [search, setSearch] = useState("");
  const [assetChecks, setAssetChecks] = useState({});
  const [collections, setCollections] = useState([]);
  const [compareA, setCompareA] = useState("");
  const [compareB, setCompareB] = useState("");
  const [bulkOnlyIssues, setBulkOnlyIssues] = useState(true);
  const [assetTab, setAssetTab] = useState("all");
  const [ficheLimit, setFicheLimit] = useState(initialFicheLimit);
  const [assetLimit, setAssetLimit] = useState(initialAssetLimit);
  const [generationFilter, setGenerationFilter] = useState("all");
  const [ficheFilter, setFicheFilter] = useState("all");
  const [customRules, setCustomRules] = useState([]);
  const [ruleForm, setRuleForm] = useState({ ...defaultRuleForm });
  const [rulePreview, setRulePreview] = useState(null);
  const [ruleMessage, setRuleMessage] = useState("");
  const [rulesSyncing, setRulesSyncing] = useState(false);

  useEffect(() => {
    setAssetChecks(readLocalJson(legacyAssetChecksKey, {}));
    setCollections(readLocalJson(collectionsKey, []));
    const requestedSection = new URLSearchParams(window.location.search).get("section");
    if (requestedSection && navItems.some((item) => item.id === requestedSection)) {
      setActive(requestedSection);
    }
  }, []);

  useEffect(() => {
    if (!session.authenticated) return;
    let cancelled = false;

    async function hydrateAssetChecks() {
      const legacyValue = readLocalJson(legacyAssetChecksKey, {});
      const stored = await readDashboardStoreValue(assetChecksStoreKey);
      if (cancelled || !stored.ok || !stored.configured) return;

      if (isPlainObject(stored.value)) {
        setAssetChecks(stored.value);
        return;
      }

      if (isPlainObject(legacyValue) && Object.keys(legacyValue).length) {
        setAssetChecks(legacyValue);
        const saved = await writeDashboardStoreValue(assetChecksStoreKey, legacyValue);
        if (saved) localStorage.removeItem(legacyAssetChecksKey);
        return;
      }

      setAssetChecks({});
    }

    void hydrateAssetChecks();

    return () => {
      cancelled = true;
    };
  }, [session.authenticated]);

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
      const [
        checklistResponse,
        catalogResponse,
        assetResponse,
        historyResponse,
        rulesResponse,
        sourceHistoryResponse,
        redeployResponse,
      ] = await Promise.all([
        fetch(adminApiPath),
        fetch(`${adminApiPath}?action=catalog`),
        fetch(`${adminApiPath}?action=assets`),
        fetch(`${adminApiPath}?action=history`),
        fetch(`${adminApiPath}?action=custom-rules`),
        fetch(`${adminApiPath}?action=source-history`),
        fetch(redeployApiPath),
      ]);
      const [
        checklistPayload,
        catalogPayload,
        assetPayload,
        historyPayload,
        rulesPayload,
        sourceHistoryPayload,
        redeployPayload,
      ] = await Promise.all([
        checklistResponse.json(),
        catalogResponse.json(),
        assetResponse.json(),
        historyResponse.json(),
        rulesResponse.json(),
        sourceHistoryResponse.json(),
        redeployResponse.json(),
      ]);
      if (!checklistResponse.ok) throw new Error(checklistPayload.error || "Erreur de chargement.");
      setBootstrap({ loading: false, payload: checklistPayload.data, error: "" });
      setCatalog(catalogPayload.data || null);
      setAssetAudit(assetPayload.data || null);
      setHistory(historyPayload.data || []);
      setCustomRules(rulesPayload.data || checklistPayload.data?.customRules || []);
      setSourceHistory(Array.isArray(sourceHistoryPayload.data) ? sourceHistoryPayload.data : []);
      setDeployHistory(Array.isArray(redeployPayload.data?.history) ? redeployPayload.data.history : []);
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

  useEffect(() => {
    setFicheLimit(initialFicheLimit);
  }, [search, generationFilter, ficheFilter]);

  useEffect(() => {
    setAssetLimit(initialAssetLimit);
  }, [search, assetTab]);

  useEffect(() => {
    if (session.authenticated && active === "raids" && !raids && !raidsLoading) {
      loadRaids();
    }
  }, [active, session.authenticated, raids, raidsLoading]);

  useEffect(() => {
    if (session.authenticated && active === "eggs" && !eggs && !eggsLoading) {
      loadEggs();
    }
  }, [active, session.authenticated, eggs, eggsLoading]);

  useEffect(() => {
    if (session.authenticated && active === "max-battles" && !maxBattles && !maxBattlesLoading) {
      loadMaxBattles();
    }
  }, [active, session.authenticated, maxBattles, maxBattlesLoading]);

  useEffect(() => {
    if (session.authenticated && active === "rocket" && !rocket && !rocketLoading) {
      loadRocket();
    }
  }, [active, session.authenticated, rocket, rocketLoading]);

  useEffect(() => {
    if (session.authenticated && active === "research" && !research && !researchLoading) {
      loadResearch();
    }
  }, [active, session.authenticated, research, researchLoading]);

  useEffect(() => {
    if (session.authenticated && active === "shiny") loadShiny();
  }, [active, session.authenticated, shinyOptions]);

  useEffect(() => {
    if (session.authenticated && active === "pvp-rankings") loadPvpRankings();
  }, [active, session.authenticated, pvpOptions]);

  const entries = useMemo(() => bootstrap.payload?.entries || [], [bootstrap.payload]);
  const customRuleEntries = useMemo(() => bootstrap.payload?.customRuleEntries || [], [bootstrap.payload]);
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
      sortPokemonEntries(
        entries.filter((entry) =>
          (generationFilter === "all" ||
            (generationFilter === "hisui"
              ? String(entry.form || "").toLowerCase().includes("hisui")
              : String(entry.generation || "") === String(generationFilter))) &&
          entryMatchesFicheFilter(entry, ficheFilter) &&
          [entry.name, entry.dexId, entry.form, entry.kind, entry.file, entry.primaryType]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
      ),
    [entries, search, generationFilter, ficheFilter],
  );
  const ficheFilterCounts = useMemo(
    () =>
      Object.fromEntries(
        ficheFilterOptions.map(([id]) => [
          id,
          entries.filter((entry) => entryMatchesFicheFilter(entry, id)).length,
        ]),
      ),
    [entries],
  );
  const selected = selectedEntry || (selectedIndex >= 0 ? filtered[selectedIndex] : null);
  const selectedBaseIndex = selectedIndex >= 0 ? selectedIndex : filtered.findIndex((item) => item.key === selected?.key);
  const previousSelectedEntry = filtered.length && selectedBaseIndex >= 0
    ? filtered[(selectedBaseIndex - 1 + filtered.length) % filtered.length]
    : null;
  const nextSelectedEntry = filtered.length && selectedBaseIndex >= 0
    ? filtered[(selectedBaseIndex + 1) % filtered.length]
    : null;
  const compareLeft = entries.find((entry) => entry.key === compareA);
  const compareRight = entries.find((entry) => entry.key === compareB);
  const bulkEntries = filtered.filter((entry) => !bulkOnlyIssues || entry.issues.length).slice(0, 80);
  const unchecked = entries.filter((entry) => !assetChecks[entry.key]);
  const assetItems = useMemo(() => {
    const linkedAssets = assetAudit?.goAssets || [];
    const linkedByType = (type, group) =>
      linkedAssets
        .filter((item) => item.assetType === type)
        .map((item) => ({ ...item, group, image: item.url }));
    const lists = [
      ...(assetTab === "all" || assetTab === "proposals"
        ? (assetAudit?.proposals || []).map((item) => ({ ...item, group: "Propositions HD", image: item.url }))
        : []),
      ...(assetTab === "all" || assetTab === "linked"
        ? linkedAssets.map((item) => ({ ...item, group: "Assets liés", image: item.url }))
        : []),
      ...(assetTab === "go"
        ? linkedByType("go", "GO")
        : []),
      ...(assetTab === "home"
        ? linkedByType("home", "HOME")
        : []),
      ...(assetTab === "portrait"
        ? linkedByType("portrait", "Portraits")
        : []),
      ...(assetTab === "variant"
        ? linkedByType("variant", "Variantes")
        : []),
      ...(assetTab === "background"
        ? linkedByType("background", "Backgrounds")
        : []),
      ...(assetTab === "candy"
        ? linkedByType("candy", "Bonbons")
        : []),
      ...(assetTab === "all" || assetTab === "shuffle"
        ? [
            ...linkedByType("shuffle", "Shuffle liés"),
            ...(assetAudit?.shuffleAssets || []).map((item) => ({ ...item, group: "Shuffle bibliothèque", image: item.url })),
          ]
        : []),
      ...(assetTab === "all" || assetTab === "unused"
        ? (assetAudit?.unused || []).map((item) => ({ ...item, group: "HD non utilisés", image: item.url }))
        : []),
    ];
    const needle = search.trim().toLowerCase();
    if (!needle) return lists;
    return lists.filter((item) => JSON.stringify(item).toLowerCase().includes(needle));
  }, [assetAudit, assetTab, search]);
  const visibleFiches = filtered.slice(0, ficheLimit);
  const visibleAssetItems = assetItems.slice(0, assetLimit);
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

  function unwrapAdminActionReport(payload) {
    return payload?.data?.data || payload?.data || payload;
  }

  function assertSuccessfulAdminAction(payload, fallbackMessage) {
    const report = unwrapAdminActionReport(payload);
    if (report?.success === false) {
      throw new Error(report.error || fallbackMessage);
    }
    return report;
  }

  async function loadRaids({ notify = false } = {}) {
    setRaidsLoading(true);
    try {
      const response = await fetch(`${adminApiPath}?action=raids`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Impossible de charger les raids.");
      setRaids(payload.data || null);
      if (notify) toast.success("Raids actualisés.");
    } catch (error) {
      const message = errorMessage(error, "Erreur de chargement des raids.");
      setRaids((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setRaidsLoading(false);
    }
  }

  function rankedQuery(action, options) {
    const params = new URLSearchParams({ action });
    for (const [key, value] of Object.entries(options)) {
      if (value !== "" && value !== null && value !== undefined) params.set(key, String(value));
    }
    return `${adminApiPath}?${params}`;
  }

  async function loadRankedDataset({ action, options, setData, setLoading, label, notify = false }) {
    setLoading(true);
    try {
      const response = await fetch(rankedQuery(action, options), { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || `Impossible de charger ${label}.`);
      setData(payload.data || null);
      if (notify) toast.success(`${label} actualisé.`);
    } catch (error) {
      const message = errorMessage(error, `Erreur de chargement ${label}.`);
      setData((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function regenerateRankedDataset({ action, setRegenerating, reload, label }) {
    setRegenerating(true);
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || `Régénération ${label} impossible.`);
      const report = assertSuccessfulAdminAction(payload, `Régénération ${label} impossible.`);
      toast.success(regenerationMessage(report));
      await reload();
    } catch (error) {
      toast.error(errorMessage(error, `Régénération ${label} impossible.`));
    } finally {
      setRegenerating(false);
    }
  }

  function loadShiny({ notify = false } = {}) {
    return loadRankedDataset({ action: "shiny", options: shinyOptions, setData: setShiny, setLoading: setShinyLoading, label: "Shiny Tracker", notify });
  }

  function loadPvpRankings({ notify = false } = {}) {
    return loadRankedDataset({ action: "pvp-rankings", options: pvpOptions, setData: setPvpRankings, setLoading: setPvpRankingsLoading, label: "PvP Rankings", notify });
  }

  async function loadShinyHistory(identity) {
    try {
      const response = await fetch(`${adminApiPath}?action=shiny-history&identity=${encodeURIComponent(identity)}&days=30`, { cache: "no-store" });
      const payload = await response.json();
      return response.ok && Array.isArray(payload.data?.data)
        ? { points: payload.data.data, statistics: payload.data.meta?.statistics || null }
        : { points: [], statistics: null };
    } catch {
      return { points: [], statistics: null };
    }
  }

  function downloadRaidsJson() {
    downloadCurrentDataset(raids, "current-raids");
  }

  async function regenerateRaids() {
    setRaidsRegenerating(true);
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "regenerate-raids" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Action raids impossible.");
      const report = assertSuccessfulAdminAction(payload, "Action raids impossible.");
      const refreshed = currentResourceFromReport(report, "buckets");
      if (refreshed) setRaids(refreshed);
      toast.success(regenerationMessage(report));
      await loadRaids();
    } catch (error) {
      const message = errorMessage(error, "Action raids impossible.");
      setRaids((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setRaidsRegenerating(false);
    }
  }

  async function loadEggs({ notify = false } = {}) {
    setEggsLoading(true);
    try {
      const response = await fetch(`${adminApiPath}?action=eggs`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Impossible de charger les oeufs.");
      setEggs(payload.data || null);
      if (notify) toast.success("Oeufs actualisés.");
    } catch (error) {
      const message = errorMessage(error, "Erreur de chargement des oeufs.");
      setEggs((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setEggsLoading(false);
    }
  }

  function downloadEggsJson() {
    downloadCurrentDataset(eggs, "current-eggs");
  }

  async function regenerateEggs() {
    setEggsRegenerating(true);
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "regenerate-eggs" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Action oeufs impossible.");
      const report = assertSuccessfulAdminAction(payload, "Action oeufs impossible.");
      const refreshed = currentResourceFromReport(report, "buckets");
      if (refreshed) setEggs(refreshed);
      toast.success(regenerationMessage(report));
      await loadEggs();
    } catch (error) {
      const message = errorMessage(error, "Action oeufs impossible.");
      setEggs((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setEggsRegenerating(false);
    }
  }

  async function loadMaxBattles({ notify = false } = {}) {
    setMaxBattlesLoading(true);
    try {
      const response = await fetch(`${adminApiPath}?action=max-battles`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Impossible de charger les Max Battles.");
      setMaxBattles(payload.data || null);
      if (notify) toast.success("Max Battles actualisées.");
    } catch (error) {
      const message = errorMessage(error, "Erreur de chargement des Max Battles.");
      setMaxBattles((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setMaxBattlesLoading(false);
    }
  }

  function downloadMaxBattlesJson() {
    downloadCurrentDataset(maxBattles, "current-max-battles");
  }

  async function regenerateMaxBattles() {
    setMaxBattlesRegenerating(true);
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "regenerate-max-battles" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Action Max Battles impossible.");
      const report = assertSuccessfulAdminAction(payload, "Action Max Battles impossible.");
      const refreshed = currentResourceFromReport(report, "buckets");
      if (refreshed) setMaxBattles(refreshed);
      toast.success(regenerationMessage(report));
      await loadMaxBattles();
    } catch (error) {
      const message = errorMessage(error, "Action Max Battles impossible.");
      setMaxBattles((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setMaxBattlesRegenerating(false);
    }
  }

  async function loadRocket({ notify = false } = {}) {
    setRocketLoading(true);
    try {
      const [response, textsResponse] = await Promise.all([
        fetch(`${adminApiPath}?action=rocket`, { cache: "no-store" }),
        fetch(`${adminApiPath}?action=rocket-texts`, { cache: "no-store" }),
      ]);
      const [payload, textsPayload] = await Promise.all([response.json(), textsResponse.json()]);
      if (!response.ok) throw new Error(payload.error || "Impossible de charger Rocket.");
      if (!textsResponse.ok) throw new Error(textsPayload.error || "Impossible de charger les textes Rocket.");
      setRocket(payload.data || null);
      setRocketTexts(textsPayload.data || null);
      if (notify) toast.success("Rocket actualisé.");
    } catch (error) {
      const message = errorMessage(error, "Erreur de chargement Rocket.");
      setRocket((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setRocketLoading(false);
    }
  }

  function downloadRocketJson() {
    downloadCurrentDataset(rocket, "current-rocket");
  }

  async function regenerateRocket() {
    setRocketRegenerating(true);
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "regenerate-rocket" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Action Rocket impossible.");
      const report = assertSuccessfulAdminAction(payload, "Action Rocket impossible.");
      const refreshed = currentResourceFromReport(report, "summary");
      if (refreshed) setRocket(refreshed);
      toast.success(regenerationMessage(report));
      await loadRocket();
    } catch (error) {
      const message = errorMessage(error, "Action Rocket impossible.");
      setRocket((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setRocketRegenerating(false);
    }
  }

  async function loadResearch({ notify = false } = {}) {
    setResearchLoading(true);
    try {
      const [response, itemsResponse] = await Promise.all([
        fetch(`${adminApiPath}?action=research`, { cache: "no-store" }),
        fetch(`${adminApiPath}?action=items`, { cache: "no-store" }),
      ]);
      const [payload, itemsPayload] = await Promise.all([response.json(), itemsResponse.json()]);
      if (!response.ok) throw new Error(payload.error || "Impossible de charger Research.");
      if (!itemsResponse.ok) throw new Error(itemsPayload.error || "Impossible de charger les items.");
      setResearch(payload.data || null);
      setItemsReference(itemsPayload.data || null);
      if (notify) toast.success("Research actualisé.");
    } catch (error) {
      const message = errorMessage(error, "Erreur de chargement Research.");
      setResearch((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setResearchLoading(false);
    }
  }

  function downloadResearchJson() {
    downloadCurrentDataset(research, "current-research");
  }

  async function regenerateResearch() {
    setResearchRegenerating(true);
    try {
      const response = await fetch(adminApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "regenerate-research" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Action Research impossible.");
      const report = assertSuccessfulAdminAction(payload, "Action Research impossible.");
      const refreshed = currentResourceFromReport(report, "summary");
      if (refreshed) setResearch(refreshed);
      toast.success(regenerationMessage(report));
      await loadResearch();
    } catch (error) {
      const message = errorMessage(error, "Action Research impossible.");
      setResearch((current) => markCurrentDatasetFailure(current, message));
      toast.error(message);
    } finally {
      setResearchRegenerating(false);
    }
  }

  async function openDetail(entry) {
    const index = filtered.findIndex((item) => item.key === entry.key);
    setSelectedIndex(index);
    setSelectedEntry(entry);
    setExtraPanel(null);
    setDetail(null);
    const response = await fetch(`${adminApiPath}?action=detail&key=${encodeURIComponent(entry.key)}`);
    const payload = await response.json();
    setDetail(response.ok ? payload.data : { detail: { error: payload.error || "Erreur de chargement." } });
  }

  function findEntryForPokemonReference(pokemon) {
    const candidates = [pokemon?.formId, pokemon?.form, pokemon?.id, pokemon?.pokemonId]
      .filter(Boolean)
      .map((value) => String(value).toUpperCase());
    if (!candidates.length) return null;

    return (
      entries.find((entry) => {
        const entryKeys = [entry.key, entry.formId, entry.id, entry.baseFormId]
          .filter(Boolean)
          .map((value) => String(value).toUpperCase());
        return candidates.some((candidate) => entryKeys.includes(candidate));
      }) || null
    );
  }

  async function openPokemonReference(pokemon) {
    const entry = findEntryForPokemonReference(pokemon);
    if (!entry) {
      toast.error("Fiche Pokémon introuvable pour cette entrée.");
      return;
    }
    await openDetail(entry);
  }

  function shiftDetail(delta) {
    if (!filtered.length) return;
    const baseIndex = selectedIndex >= 0 ? selectedIndex : filtered.findIndex((item) => item.key === selected?.key);
    const nextIndex = ((baseIndex >= 0 ? baseIndex : 0) + delta + filtered.length) % filtered.length;
    openDetail(filtered[nextIndex]);
  }

  function setAssetChecked(key, checked) {
    setAssetChecks((current) => {
      const next = { ...current, [key]: checked };
      if (!checked) delete next[key];
      void writeDashboardStoreValue(assetChecksStoreKey, next).then((saved) => {
        if (saved) {
          localStorage.removeItem(legacyAssetChecksKey);
          return;
        }
        toast.error("La vérification d'asset n'a pas pu être synchronisée sur Mongo.");
      });
      return next;
    });
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
      const watchState = persistSourceSignatures(payload.data, sourceWatchSignatureKey);
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

  async function loadDeployHistory() {
    try {
      const response = await fetch(redeployApiPath);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Historique data indisponible.");
      setDeployHistory(Array.isArray(payload.data?.history) ? payload.data.history : []);
      setDeployHistoryOpen(true);
    } catch (error) {
      toast.error(error.message || "Historique data indisponible.");
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

  async function redeployDashboard() {
    setRedeployingDashboard(true);
    const toastId = toast.loading("Je demande a Vercel de reconstruire le Dashboard...");
    try {
      const response = await fetch(redeployApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reason: "Manual PokemonGo-Data refresh" }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Redéploiement impossible.");
      const history = Array.isArray(payload.data?.history) ? payload.data.history : [];
      setDeployHistory(history);
      const changed = payload.data?.event?.dataChanges?.trackedFiles || 0;
      toast.success(
        changed
          ? `Redéploiement demandé. ${changed} JSON data seront visibles dans l'historique.`
          : "Redéploiement demandé. Vercel va reconstruire le Dashboard.",
        { id: toastId },
      );
    } catch (error) {
      toast.error(error.message || "Redéploiement impossible.", { id: toastId });
    } finally {
      setRedeployingDashboard(false);
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
                  {navItems.find((item) => item.id === active)?.label}
                </h1>
              </div>
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] xl:w-[780px]">
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
                <button
                  className={primaryButtonClass}
                  type="button"
                  onClick={redeployDashboard}
                  disabled={redeployingDashboard}
                >
                  <Cloud size={17} /> {redeployingDashboard ? "Déploiement..." : "Redéployer"}
                </button>
              </div>
            </div>
            <AdminSectionNavigation items={navItems} active={active} onSelect={setActive} />
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
                <section className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_18px_70px_rgba(0,0,0,.2)]">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100/75">
                      <Search size={15} /> Filtres fiches
                    </span>
                    <button className="text-xs font-black text-cyan-100 underline-offset-4 hover:underline" type="button" onClick={() => setFicheFilter("all")}>
                      Réinitialiser
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                    {ficheFilterOptions.map(([id, label, image, detail]) => {
                      const activeFilter = ficheFilter === id;
                      return (
                        <button
                          className={`group relative min-h-[92px] overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${
                            activeFilter
                              ? "border-cyan-200/55 bg-cyan-400/18 shadow-[0_16px_55px_rgba(34,211,238,.18)]"
                              : "border-white/10 bg-white/[0.045] hover:border-cyan-200/35"
                          }`}
                          key={id}
                          type="button"
                          onClick={() => setFicheFilter(id)}
                        >
                          {image ? (
                            <img
                              className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
                                activeFilter ? "opacity-52 saturate-125" : "opacity-24 saturate-75 group-hover:opacity-40"
                              }`}
                              src={image}
                              alt=""
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,.25),transparent_42%)]" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/76 via-slate-950/52 to-slate-950/70" />
                          <span className="relative inline-flex rounded-full border border-white/10 bg-slate-950/45 px-2.5 py-1 text-[11px] font-black text-cyan-50">
                            {ficheFilterCounts[id] || 0}
                          </span>
                          <strong className="relative mt-3 block text-sm font-black text-white">{label}</strong>
                          <small className="relative mt-1 block truncate text-[11px] font-bold text-slate-300">{detail}</small>
                        </button>
                      );
                    })}
                  </div>
                </section>
                <section className="mt-4 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {visibleFiches.map((entry) => (
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
                {visibleFiches.length < filtered.length ? (
                  <LoadMoreButton
                    shown={visibleFiches.length}
                    total={filtered.length}
                    onClick={() => setFicheLimit((current) => current + ficheLimitStep)}
                  />
                ) : null}
              </>
            ) : null}

            {active === "candies" ? (
              <CandyPanel entries={entries} search={search} onOpen={openDetail} />
            ) : null}

            {active === "backgrounds" ? (
              <BackgroundPanel
                entries={entries}
                library={assetAudit?.locationCards || []}
                linkedAssets={(assetAudit?.goAssets || []).filter((item) => item.assetType === "background")}
                loading={!assetAudit}
                search={search}
                onOpen={openDetail}
              />
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

            {active === "my-collection" ? <TrainerPokemonCollectionPanel /> : null}

            {active === "raids" ? (
              <RaidsPanel
                raids={raids}
                loading={raidsLoading}
                regenerating={raidsRegenerating}
                onRefresh={() => loadRaids({ notify: true })}
                onDownload={downloadRaidsJson}
                onRegenerate={regenerateRaids}
                onOpenPokemon={openPokemonReference}
                typeCatalog={catalog?.types}
                weatherCatalog={catalog?.weather}
              />
            ) : null}

            {active === "eggs" ? (
              <EggsPanel
                eggs={eggs}
                loading={eggsLoading}
                regenerating={eggsRegenerating}
                onRefresh={() => loadEggs({ notify: true })}
                onDownload={downloadEggsJson}
                onRegenerate={regenerateEggs}
                onOpenPokemon={openPokemonReference}
                typeCatalog={catalog?.types}
              />
            ) : null}

            {active === "max-battles" ? (
              <MaxBattlesPanel
                maxBattles={maxBattles}
                loading={maxBattlesLoading}
                regenerating={maxBattlesRegenerating}
                onRefresh={() => loadMaxBattles({ notify: true })}
                onDownload={downloadMaxBattlesJson}
                onRegenerate={regenerateMaxBattles}
                onOpenPokemon={openPokemonReference}
                typeCatalog={catalog?.types}
              />
            ) : null}

            {active === "rocket" ? (
              <RocketPanel
                rocket={rocket}
                rocketTexts={rocketTexts}
                loading={rocketLoading}
                regenerating={rocketRegenerating}
                onRefresh={() => loadRocket({ notify: true })}
                onDownload={downloadRocketJson}
                onRegenerate={regenerateRocket}
                onOpenPokemon={openPokemonReference}
              />
            ) : null}

            {active === "research" ? (
              <ResearchPanel
                research={research}
                itemsReference={itemsReference}
                loading={researchLoading}
                regenerating={researchRegenerating}
                onRefresh={() => loadResearch({ notify: true })}
                onDownload={downloadResearchJson}
                onRegenerate={regenerateResearch}
              />
            ) : null}

            {active === "shiny" ? (
              <ShinyTrackerPanel
                dataset={shiny}
                loading={shinyLoading}
                regenerating={shinyRegenerating}
                options={shinyOptions}
                onOptionsChange={setShinyOptions}
                onRefresh={() => loadShiny({ notify: true })}
                onDownload={() => downloadCurrentDataset(shiny, "shiny-tracker")}
                onRegenerate={() => regenerateRankedDataset({ action: "regenerate-shiny", setRegenerating: setShinyRegenerating, reload: loadShiny, label: "Shiny Tracker" })}
                onLoadHistory={loadShinyHistory}
                onOpenPokemon={openPokemonReference}
              />
            ) : null}

            {active === "pvp-rankings" ? (
              <PvpRankingsPanel
                dataset={pvpRankings}
                loading={pvpRankingsLoading}
                regenerating={pvpRankingsRegenerating}
                options={pvpOptions}
                onOptionsChange={setPvpOptions}
                onRefresh={() => loadPvpRankings({ notify: true })}
                onDownload={() => downloadCurrentDataset(pvpRankings, "pvp-rankings")}
                onRegenerate={() => regenerateRankedDataset({ action: "regenerate-pvp-rankings", setRegenerating: setPvpRankingsRegenerating, reload: loadPvpRankings, label: "PvP Rankings" })}
                onOpenPokemon={openPokemonReference}
              />
            ) : null}

            {active === "events" ? (
              <EventsCalendarPanel globalSearch={search} onOpenPokemon={openPokemonReference} />
            ) : null}

            {active === "assets" ? (
              <section className="grid items-start gap-5 xl:grid-cols-[1.4fr_.9fr]">
                <Panel title="Vérification d’assets" eyebrow="bibliothèque">
                  <div className="mb-4 grid min-w-0 items-start gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                    <AssetStatCard label="Liés" value={assetAudit?.totals?.goFiles || 0} icon={uiAssets.icons.goLogo} tone="cyan" detail="Tous assets JSON fiches" />
                    <AssetStatCard label="HOME" value={assetAudit?.totals?.homeFiles || 0} icon={uiAssets.icons.pokemon} tone="green" detail="Images HOME liées" />
                    <AssetStatCard label="Portraits" value={assetAudit?.totals?.portraitFiles || 0} icon={uiAssets.icons.mega} tone="violet" detail="Portraits et shiny" />
                    <AssetStatCard label="Shuffle" value={assetAudit?.totals?.shuffleFiles || 0} icon={uiAssets.icons.pikachuShuffle} tone="violet" detail="Bibliothèque Shuffle" />
                    <AssetStatCard label="Variantes" value={assetAudit?.totals?.variantFiles || 0} icon={uiAssets.icons.tag} tone="amber" detail="assetForms JSON" />
                    <AssetStatCard label="Backgrounds" value={assetAudit?.totals?.backgroundFiles || 0} icon={uiAssets.icons.bookSpells} tone="cyan" detail="Location cards" />
                    <AssetStatCard label="Bonbons" value={assetAudit?.totals?.candyFiles || 0} icon={uiAssets.icons.candy} tone="amber" detail="Candy assets" />
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
                      ["linked", "Liés"],
                      ["go", "GO"],
                      ["home", "HOME"],
                      ["portrait", "Portraits"],
                      ["variant", "Variantes"],
                      ["background", "Backgrounds"],
                      ["candy", "Bonbons"],
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
                    {visibleAssetItems.map((asset, index) => (
                      <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40" key={`${asset.group}-${asset.filename || asset.url}-${index}`}>
                        <div className="grid aspect-square place-items-center bg-white/[0.04] p-3">
                          <img className="max-h-full object-contain" src={asset.image || asset.url} alt={asset.filename || asset.label || "asset"} />
                        </div>
                        <div className="border-t border-white/10 p-3">
                          <strong className="block truncate text-xs font-black text-white">{asset.filename || asset.label}</strong>
                          <span className="mt-1 block truncate text-xs font-bold text-slate-400">{asset.group} · {asset.label || asset.details || asset.form || "standard"}</span>
                          <button
                            className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200/20 bg-cyan-400/10 px-3 text-[11px] font-black text-cyan-50 transition hover:border-cyan-200/45 hover:bg-cyan-400/18"
                            type="button"
                            onClick={() => copyToClipboard(asset.url, "URL GitHub copiée.")}
                          >
                            <Copy size={13} /> Copy GitHub URL
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  {visibleAssetItems.length < assetItems.length ? (
                    <LoadMoreButton
                      shown={visibleAssetItems.length}
                      total={assetItems.length}
                      onClick={() => setAssetLimit((current) => current + assetLimitStep)}
                    />
                  ) : null}
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

            {active === "logs" ? (
              <UpdateLogPanel
                gitHistory={history}
                sourceHistory={sourceHistory}
                deployHistory={deployHistory}
                onOpenSourceHistory={loadSourceHistory}
                onOpenDeployHistory={loadDeployHistory}
              />
            ) : null}

            {active === "catalogs" ? <CatalogPanel catalog={catalog} onOpen={openDetail} /> : null}

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

            {active === "todo" ? <AdminTodoPanel /> : null}

          </div>
        </section>
      </div>

      <SourceHistoryModal
        open={sourceHistoryOpen}
        history={sourceHistory}
        onClose={() => setSourceHistoryOpen(false)}
      />

      <DataDeployHistoryModal
        open={deployHistoryOpen}
        history={deployHistory}
        onClose={() => setDeployHistoryOpen(false)}
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
        previousEntry={previousSelectedEntry}
        nextEntry={nextSelectedEntry}
        allEntries={entries}
        onOpenRelated={openDetail}
        onClose={() => {
          setSelectedIndex(-1);
          setSelectedEntry(null);
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
