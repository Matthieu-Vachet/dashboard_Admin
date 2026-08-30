"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Archive,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Cloud,
  Copy,
  Database,
  FileDiff,
  FileJson,
  Fingerprint,
  History,
  ListTodo,
  Radar,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Swords,
  Boxes,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { DetailModal } from "@/components/admin/pokemon/detail-modal";
import { PokemonCard } from "@/components/admin/pokemon/pokemon-card";
import { SortableWidgetGrid } from "@/components/admin/shared/sortable-widget-grid";
import {
  EmptyState,
  ErrorState,
  FetchLoadingState,
} from "@/components/admin/shared/state-system";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { MetricCard } from "@/components/site/metric-card";
import { uiAssets } from "@/components/site/ui-assets";
import {
  assemblePokemonDetail,
  loadPokemonDetail,
} from "@/lib/pokemon-detail-data.mjs";
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
import { BestAttackersPanel } from "./best-attackers-panel";
import { CatalogPanel } from "./catalog-panel";
import { CollectionsPanel } from "./collections-panel";
import * as collectionCatalogEngine from "@/lib/collections/collection-catalog";
import { EggsPanel } from "./eggs-panel";
import { EventsCalendarPanel } from "./events-calendar-panel";
import { CommunityDaysPanel } from "./community-days-panel";
import { EventsHistoryPanel } from "./events-history-panel";
import { LoginCard } from "./login-card";
import { MaxBattlesPanel } from "./max-battles-panel";
import { PvpRankingsPanel } from "./pvp-rankings-panel";
import { GblCalendarPanel } from "./gbl-calendar-panel";
import { PokemonIdentityMappingsPanel } from "./pokemon-identity-mappings-panel";
import { IdentityManagerPanel } from "./identity-manager-panel";
import { RaidsPanel } from "./raids-panel";
import { ResearchPanel } from "./research-panel";
import { RocketPanel } from "./rocket-panel";
import { ShinyTrackerPanel } from "./shiny-tracker-panel";
import {
  DataDeployHistoryModal,
  SourceHistoryModal,
  SourceRows,
} from "./source-watch-panel";
import { UpdateLogPanel } from "./update-log-panel";
import { AdminTodoPanel } from "./admin-todo-panel";
import { AdminCommandCenter } from "./admin-command-center";
import { AdminPokemonSearchProvider } from "./admin-pokemon-search-context";
import { pokemonSectionPath } from "@/data/pokemon-routes";
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
import {
  pokemonPresentationEntries,
  pokemonPresentationSearchText,
} from "@/utils/admin/pokemon-presentation-entries.mjs";
import { persistSourceSignatures } from "@/utils/admin/source-watch";
import { executePokemonAdminRegeneration } from "@/lib/admin-pokemon-global-regeneration";
import { actionError, normalizeActionError } from "@/lib/admin-action-errors";
import {
  createPvpRankingRegenerationState,
  normalizePvpRankingRegeneration,
  pvpRankingRegenerationToast,
} from "@/lib/pvp-ranking-regeneration-state.mjs";

const legacyAssetChecksKey = "pokedex-v4-asset-checks";
const assetChecksStoreKey = "matweb.pokemon.assetChecks";
const sourceWatchSignatureKey = "pokedex-v4-source-watch-signatures";
const collectionsKey = "pokedex-v4-admin-collections";
const collectionsStoreKey = "matweb.pokemon.collections";
const { mergeCollectionSnapshots } = collectionCatalogEngine;

const GameMasterExplorerPanel = dynamic(
  () =>
    import("./game-master-explorer-panel").then(
      (module) => module.GameMasterExplorerPanel,
    ),
  {
    loading: () => (
      <div
        className={`${panelClass} min-h-64 animate-pulse motion-reduce:animate-none`}
        aria-label="Chargement du Game Master Explorer"
      />
    ),
  },
);

const BestDefendersPanel = dynamic(() => import("./best-defenders-panel").then((module) => module.BestDefendersPanel));
const JsonBuilderPanel = dynamic(
  () => import("./json-builder-panel").then((module) => module.JsonBuilderPanel),
  {
    loading: () => (
      <div
        className={`${panelClass} min-h-96 animate-pulse motion-reduce:animate-none`}
        aria-label="Chargement du JSON Builder"
      />
    ),
  },
);
const PvpBattleLab = dynamic(
  () => import("./pvp-battle-lab").then((module) => module.PvpBattleLab),
  {
    loading: () => (
      <div
        className={`${panelClass} min-h-96 animate-pulse motion-reduce:animate-none`}
        aria-label="Chargement du simulateur PvP"
      />
    ),
  },
);

const filtersAssetBase =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers/Filters";
const pokemonAssetBase =
  "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/divers";
const navItems = [
  {
    id: "overview",
    label: "Accueil",
    icon: `${pokemonAssetBase}/btn_pokeball_white_shadow.png`,
    group: "data",
  },
  {
    id: "pokedex",
    label: "Fiches",
    icon: `${filtersAssetBase}/ic_alola.png`,
    group: "data",
  },
  {
    id: "candies",
    label: "Candies",
    icon: `${filtersAssetBase}/TodayView_Icon_CandyXL.png`,
    group: "data",
  },
  {
    id: "backgrounds",
    label: "Backgrounds",
    icon: `${filtersAssetBase}/TodayView_Icon_PostCard.png`,
    group: "data",
  },
  { id: "collections", label: "Collections", icon: Boxes, group: "data" },
  {
    id: "assets",
    label: "Assets",
    icon: `${filtersAssetBase}/TodayView_Icon_Photobomb.png`,
    group: "data",
  },
  { id: "json-builder", label: "JSON Builder", icon: FileJson, group: "data" },
  { id: "catalogs", label: "Catalogues", icon: Archive, group: "data" },
  {
    id: "raids",
    label: "Raids",
    icon: `${filtersAssetBase}/TodayView_Icon_Raid.png`,
    group: "combat",
  },
  {
    id: "max-battles",
    label: "Max Battles",
    icon: `${filtersAssetBase}/TodayView_Icon_Evolve.png`,
    group: "combat",
  },
  {
    id: "rocket",
    label: "Rocket",
    icon: `${filtersAssetBase}/TodayView_Icon_TeamRocket.png`,
    group: "combat",
  },
  {
    id: "pvp-simulator",
    label: "Simulateur PvP",
    icon: Swords,
    group: "combat",
  },
  {
    id: "pvp-rankings",
    label: "PvP Rankings",
    icon: `${filtersAssetBase}/TodayView_Icon_Battle.png`,
    group: "combat",
  },
  { id: "gbl-calendar", label: "Calendrier GBL", icon: CalendarDays, group: "combat" },
  {
    id: "best-attackers",
    label: "Best Attackers",
    icon: Swords,
    group: "combat",
  },
  { id: "best-defenders", label: "Best Defenders", icon: ShieldCheck, group: "combat" },
  {
    id: "eggs",
    label: "Œufs",
    icon: `${filtersAssetBase}/TodayView_Icon_LuckyEgg.png`,
    group: "events",
  },
  {
    id: "research",
    label: "Research",
    icon: `${filtersAssetBase}/TodayView_Icon_Research.png`,
    group: "events",
  },
  {
    id: "events",
    label: "Calendrier Events",
    icon: `${filtersAssetBase}/TodayView_Icon_Event.png`,
    group: "events",
  },
  {
    id: "community-days",
    label: "Community Days",
    icon: CalendarDays,
    group: "events",
  },
  {
    id: "events-history",
    label: "Historique Events",
    icon: Archive,
    group: "events",
  },
  {
    id: "shiny",
    label: "Shiny Tracker",
    icon: `${filtersAssetBase}/ic_shiny_white.png`,
    group: "quality",
  },
  {
    id: "identity-manager",
    label: "Identity Manager",
    icon: Fingerprint,
    group: "quality",
  },
  {
    id: "pokemon-identity-mappings",
    label: "Résolution variantes",
    icon: Radar,
    group: "quality",
  },
  {
    id: "game-master-explorer",
    label: "Game Master Explorer",
    icon: Database,
    group: "quality",
  },
  { id: "checks", label: "Contrôles", icon: AlertTriangle, group: "quality" },
  { id: "sources", label: "Veille", icon: Radar, group: "quality" },
  { id: "compare", label: "Comparaison", icon: FileDiff, group: "quality" },
  { id: "todo", label: "Todo Pokémon", icon: ListTodo, group: "quality" },
  { id: "logs", label: "Logs & MAJ", icon: History, group: "maintenance" },
  { id: "rules", label: "Règles JSON", icon: Sparkles, group: "maintenance" },
  {
    id: "bulk",
    label: "Corrections",
    icon: ClipboardCheck,
    group: "maintenance",
  },
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

const initialShinyOptions = {
  board: "today",
  search: "",
  type: "",
  generation: "",
  trend: "",
  page: 1,
  limit: 50,
};
const initialPvpOptions = {
  league: "great",
  search: "",
  role: "",
  page: 1,
  limit: 50,
};
const initialBestAttackersOptions = {
  type: "ANY",
  level: 40,
  metric: "edps",
  search: "",
  shadow: "",
  mega: "",
  elite: "",
  class: "",
  movesetClass: "",
  page: 1,
  limit: 50,
};
const initialIdentityMappingOptions = {
  status: "missing-local-form",
  search: "",
  page: 1,
  limit: 50,
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
    description:
      "Toutes les attaques doivent porter type, power, energy et bloc combat.",
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
    description:
      "Chaque région/génération doit avoir id, slug, numéro et noms.",
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
  [
    "chromatic",
    "Chromatique",
    "/assets/ui/illustrations/banners/chromatic.png",
    "availability.shinyReleased",
  ],
  [
    "costume",
    "Costumes / événements",
    "/assets/ui/illustrations/banners/costume.png",
    "identités individuelles · sexes regroupés",
  ],
  ["mega", "Méga", "/assets/ui/illustrations/banners/mega.png", "kind/form méga ou primo"],
  [
    "regional",
    "Régional",
    "/assets/ui/illustrations/banners/regional.png",
    "formes Alola, Galar, Hisui, Paldea",
  ],
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
  return normalizeActionError(error, fallback).message;
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
  const requiredFields = [
    "source",
    "generatedAt",
    "savedAt",
    "count",
    "sourceHash",
    "diagnostics",
    "data",
  ];
  if (
    resource?.meta?.source !== "mongodb" ||
    current?.key !== "current" ||
    requiredFields.some((field) => current[field] === undefined)
  ) {
    toast.error(
      "Le document MongoDB courant confirmé n’est pas disponible au téléchargement.",
    );
    return;
  }

  const savedDate = new Date(current.savedAt);
  const dateLabel = Number.isNaN(savedDate.getTime())
    ? new Date().toISOString().slice(0, 10)
    : savedDate.toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(current, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${baseName}-${dateLabel}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadJsonPayload(value, baseName) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${baseName}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function regenerationMessage(report) {
  if (report?.run?.status === "partial" && report?.report?.preserved) {
    return "Source temporairement indisponible — dernier snapshot MongoDB valide conservé.";
  }
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
      <Button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-400/12 px-5 py-2 text-sm font-black text-cyan-50 transition duration-motion-fast hover:border-cyan-200/55 hover:bg-cyan-400/20 focus-visible:[outline:revert]! focus-visible:[outline-offset:revert]!"
        type="button"
        onClick={onClick}
      >
        Afficher plus · {remaining.toLocaleString("fr-FR")} restant(s)
      </Button>
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
      total +
      (entry.issues || []).filter((issue) => issue.category === "custom")
        .length,
    0,
  );
  const customJsonIssueCount = customJsonIssueEntries.reduce(
    (total, entry) =>
      total +
      (entry.issues || []).filter((issue) => issue.category === "custom")
        .length,
    0,
  );

  function setMode(nextMode) {
    onFormChange({
      ...form,
      mode: nextMode,
      templateSource:
        nextMode === "path"
          ? ""
          : form.templateSource || defaultRuleForm.templateSource,
      path:
        nextMode === "path"
          ? form.path || "description.French"
          : form.path || "",
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
          <Button
            type="button"
            icon={<Cloud size={17} />}
            loading={syncingGithub}
            loadingText="Synchronisation…"
            onClick={onSyncGithub}
          >
            Sync GitHub
          </Button>
          <button
            className={primaryButtonClass}
            type="button"
            onClick={() => onFormChange({ ...defaultRuleForm })}
          >
            <Sparkles size={17} /> Nouvelle règle
          </button>
        </div>
      }
    >
      <div className="mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 type-body-strong text-cyan-50">
        La sauvegarde d’une règle est instantanée et relance le contrôle sur le
        snapshot déjà chargé. Utilise “Sync GitHub” seulement quand tu veux
        reprendre les JSON distants avant de recalculer toutes les cartes data:
        Pokémon, formes, attaques, types, météo, générations et stickers.
      </div>
      <div className="grid min-w-0 gap-5">
        <section className="min-w-0 space-y-4 overflow-hidden">
          {message ? (
            <p className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-sm font-bold text-cyan-100">
              {message}
            </p>
          ) : null}
          <div>
            <span className="mb-2 block type-overline text-disabled">
              Modèles utiles
            </span>
            <div className="grid min-w-0 gap-2 md:grid-cols-2">
              {rulePresets.map((preset) => (
                <button
                  className="min-w-0 rounded-2xl border border-line bg-surface-inset p-3 text-left transition hover:border-cyan-200/45 hover:bg-cyan-400/10"
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset)}
                >
                  <strong className="block text-sm font-black text-domain-foreground">
                    {preset.name}
                  </strong>
                  <span className="mt-1 block type-caption-strong text-muted">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="mb-2 block type-overline text-disabled">
              Nom
            </span>
            <input
              className={fieldClass}
              value={form.name}
              onChange={(event) =>
                onFormChange({ ...form, name: event.target.value })
              }
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-surface-inset p-4 text-sm font-black text-domain-foreground">
            <Checkbox
              className="h-5 w-5 accent-cyan-400"
              checked={form.enabled !== false}
              onChange={(event) =>
                onFormChange({ ...form, enabled: event.target.checked })
              }
            />
            Règle active
          </label>
          <div>
            <span className="mb-2 block type-overline text-disabled">
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
                      : "border-line bg-surface-subtle text-foreground-secondary"
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
            <span className="mb-2 block type-overline text-disabled">
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
                      : "border-line bg-surface-subtle text-foreground-secondary"
                  }`}
                >
                  <span className="break-words">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <span
                id="form-a11y-rule-filter-label"
                className="block type-overline text-disabled"
              >
                Filtrer fichiers / cibles
              </span>
              <button
                className="w-fit type-label text-cyan-100 underline-offset-4 hover:underline"
                type="button"
                onClick={() => onFormChange({ ...form, formFilters: [] })}
              >
                Toutes les cibles
              </button>
            </div>
            <p
              id="form-a11y-rule-filter-description"
              className="mb-2 type-caption-strong text-disabled"
            >
              Optionnel: vise une forme, un dossier, un fichier ou un id précis,
              par exemple types/fire, moves/charged, kanto ou WEATHER_BALL_FIRE.
            </p>
            <input
              aria-labelledby="form-a11y-rule-filter-label"
              aria-describedby="form-a11y-rule-filter-description"
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
                      : "border-line bg-surface-subtle text-foreground-secondary"
                  }`}
                >
                  <span className="break-words">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-surface-inset p-4 text-sm font-black text-domain-foreground">
            <Checkbox
              className="h-5 w-5 accent-cyan-400"
              checked={form.enforceNonEmpty}
              onChange={(event) =>
                onFormChange({ ...form, enforceNonEmpty: event.target.checked })
              }
            />
            Signaler aussi les valeurs vides
          </label>
          {mode === "template" ? (
            <label className="block">
              <span className="mb-2 block type-overline text-disabled">
                Modèle JSON attendu
              </span>
              <textarea
                className={`${fieldClass} min-h-[260px] max-w-full resize-y font-mono text-xs leading-6`}
                value={form.templateSource}
                onChange={(event) =>
                  onFormChange({ ...form, templateSource: event.target.value })
                }
              />
            </label>
          ) : (
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
              <label className="block">
                <span className="mb-2 block type-overline text-disabled">
                  Chemin JSON
                </span>
                <input
                  className={fieldClass}
                  placeholder="ex: description.French"
                  value={form.path || ""}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      path: event.target.value,
                      templateSource: "",
                    })
                  }
                />
              </label>
              <label className="block">
                <span className="mb-2 block type-overline text-disabled">
                  Type attendu
                </span>
                <Select
                  className={fieldClass}
                  value={form.expectedType || "presence"}
                  onChange={(event) =>
                    onFormChange({
                      ...form,
                      expectedType: event.target.value,
                      templateSource: "",
                    })
                  }
                >
                  {expectedTypes.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
          )}
          <div className="grid min-w-0 gap-2 sm:grid-cols-3">
            <button className={buttonClass} type="button" onClick={onPreview}>
              Prévisualiser
            </button>
            <button
              className={primaryButtonClass}
              type="button"
              onClick={onSave}
            >
              Sauvegarder
            </button>
            <button
              className={buttonClass}
              type="button"
              onClick={() => copyToClipboard(form.templateSource)}
            >
              <Copy size={16} /> Copier
            </button>
          </div>
          {preview ? (
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <strong className="text-sm font-black text-emerald-100">
                Prévisualisation valide
              </strong>
              <pre className="mt-3 max-h-72 overflow-auto rounded-2xl bg-slate-950/55 p-3 font-mono text-xs leading-6 text-emerald-50">
                {JSON.stringify(preview, null, 2)}
              </pre>
            </div>
          ) : null}
        </section>

        <section className="min-w-0 rounded-2xl border border-line bg-slate-950/25 p-4">
          <h3 className="type-title-card text-domain-foreground">
            Règles enregistrées
          </h3>
          <div className="mt-4 space-y-3">
            {rules.length ? (
              rules.map((rule) => (
                <article
                  className="rounded-2xl border border-line bg-surface-inset p-4"
                  key={rule.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <strong className="block truncate text-domain-foreground">
                        {rule.name}
                      </strong>
                      <small className="mt-1 block truncate type-caption-strong text-muted">
                        {(rule.appliesTo || []).join(", ")}
                        {(rule.formFilters || []).length
                          ? ` · ${(rule.formFilters || []).join(", ")}`
                          : ""}
                      </small>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${rule.enabled !== false ? "bg-emerald-400/15 text-emerald-100" : "bg-surface-emphasis text-foreground-secondary"}`}
                    >
                      {rule.enabled !== false ? "active" : "off"}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <button
                      className={buttonClass}
                      type="button"
                      onClick={() => onEdit(rule)}
                    >
                      Éditer
                    </button>
                    <button
                      className={buttonClass}
                      type="button"
                      onClick={() => onToggle(rule)}
                    >
                      {rule.enabled !== false ? "Pause" : "Activer"}
                    </button>
                    <button
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-2 text-sm font-black text-red-100"
                      type="button"
                      onClick={() => onDelete(rule)}
                    >
                      Suppr.
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState title="Aucune règle personnalisée pour le moment" />
            )}
          </div>
        </section>
      </div>
      <section className="mt-5 rounded-2xl border border-line bg-surface-inset-subtle p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="type-title-card text-domain-foreground">
              Cartes à contrôler
            </h3>
            <p className="mt-1 type-body-strong text-muted">
              Cartes Pokémon qui ne respectent pas une règle personnalisée.
            </p>
          </div>
          <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 type-label text-amber-100">
            {customIssueCount} clé(s)
          </span>
        </div>
        {customIssueEntries.length ? (
          <MiniCardList
            entries={customIssueEntries.slice(0, 80)}
            onOpen={onOpenEntry}
          />
        ) : (
          <EmptyState title="Aucune carte à contrôler pour les règles actives" />
        )}
      </section>
      <section className="mt-5 rounded-2xl border border-line bg-surface-inset-subtle p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="type-title-card text-domain-foreground">
              Autres JSON à contrôler
            </h3>
            <p className="mt-1 type-body-strong text-muted">
              Attaques, types, météo, générations et stickers qui ne respectent
              pas une règle personnalisée.
            </p>
          </div>
          <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 type-label text-amber-100">
            {customJsonIssueCount} clé(s)
          </span>
        </div>
        {customJsonIssueEntries.length ? (
          <JsonIssueList entries={customJsonIssueEntries.slice(0, 80)} />
        ) : (
          <EmptyState title="Aucun JSON de catalogue à contrôler pour les règles actives" />
        )}
      </section>
    </Panel>
  );
}

const diagnosticCategoryLabels = {
  schema: "Schéma",
  "pokemon-pvpoke-mapping": "Mapping Pokémon PvPoke",
  "move-mapping": "Mapping attaque",
  movepool: "Movepool",
  source: "Source",
  "release-metadata": "Release metadata",
  type: "Type",
  reference: "Référence",
  architecture: "Architecture",
};

const diagnosticSeverityLabels = {
  error: "Error",
  warning: "Warning",
  info: "Info",
};

function groupedDiagnostics(issues) {
  const groups = new Map();
  for (const issue of issues) {
    const severity = issue.severity || "warning";
    const category = issue.diagnosticCategory || "architecture";
    const key = `${severity}:${category}:${issue.issue}`;
    const current = groups.get(key) || { ...issue, severity, diagnosticCategory: category, count: 0 };
    current.count += 1;
    groups.set(key, current);
  }
  const priority = { error: 0, warning: 1, info: 2 };
  return [...groups.values()].sort((left, right) =>
    (priority[left.severity] ?? 3) - (priority[right.severity] ?? 3)
    || right.count - left.count
    || left.issue.localeCompare(right.issue));
}

function PvpArchitectureControlPanel({ audit }) {
  const summary = audit?.summary || {};
  const issues = Array.isArray(audit?.issues) ? audit.issues : [];
  const errors = issues.filter((item) => item.severity === "error");
  const warnings = issues.filter((item) => item.severity === "warning");
  const infos = issues.filter((item) => item.severity === "info");
  const groups = groupedDiagnostics(issues);
  const compactHash = summary.sourceCommit
    ? `${summary.sourceCommit.slice(0, 12)}…`
    : "indisponible";

  return (
    <Panel
      title="Architecture PvP dédiée"
      eyebrow="contrôle canonique PvPoke"
      action={
        <span
          className={`rounded-full border px-3 py-2 type-label ${
            summary.valid
              ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
              : "border-red-300/25 bg-red-400/10 text-red-100"
          }`}
        >
          {summary.valid ? "intégrité valide" : `${errors.length} erreur(s)`}
        </span>
      }
    >
      <p className="rounded-2xl border border-cyan-200/15 bg-cyan-400/10 p-4 type-body-strong text-domain-foreground">
        Vérification des pvpRef, identités, mappings, manifestes, empreintes,
        movesets, métriques, listes Elite, builds XL, fraîcheur mensuelle,
        orphelins et collisions.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Fiches PvP", summary.records],
          ["Références", summary.references],
          ["Mappings OK", summary.mappedRecords],
          ["Error", errors.length],
          ["Warning", warnings.length],
          ["Info", infos.length],
        ].map(([label, value]) => (
          <article
            className="rounded-2xl border border-line bg-surface-inset p-4"
            key={label}
          >
            <small className="type-overline text-muted">{label}</small>
            <strong className="mt-2 block font-mono text-2xl text-domain-foreground">
              {value ?? "—"}
            </strong>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-3 rounded-2xl border border-line bg-surface-inset p-4 text-sm sm:grid-cols-3">
        <span><strong className="text-domain-foreground">Commit</strong><br /><code>{compactHash}</code></span>
        <span><strong className="text-domain-foreground">Synchronisé</strong><br />{summary.syncedAt || "—"}</span>
        <span><strong className="text-domain-foreground">Diagnostics</strong><br />{errors.length} Error · {warnings.length} Warning · {infos.length} Info</span>
      </div>
      {issues.length ? (
        <div className="mt-4 grid gap-2">
          {groups.slice(0, 12).map((item, index) => (
            <article
              className={`rounded-2xl border p-3 ${
                item.severity === "error"
                  ? "border-red-300/20 bg-red-400/[0.08]"
                  : item.severity === "info"
                    ? "border-cyan-300/20 bg-cyan-400/[0.08]"
                    : "border-amber-300/20 bg-amber-400/[0.08]"
              }`}
              key={`${item.issue}-${item.pvpRef || item.path}-${index}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm text-domain-foreground">{item.issue} {item.count > 1 ? `× ${item.count}` : ""}</strong>
                <span className="type-label text-muted">{diagnosticCategoryLabels[item.diagnosticCategory]} · {diagnosticSeverityLabels[item.severity]}</span>
              </div>
              <code className="mt-1 block break-all text-xs text-foreground-secondary">
                {item.pvpRef || item.sourceFile || item.path}
              </code>
              <p className="mt-1 text-xs text-muted">Attendu : {String(item.expected)} · Reçu : {String(item.actual)}</p>
            </article>
          ))}
          {groups.length > 12 ? (
            <p className="type-caption-strong text-muted">
              {groups.length - 12} groupe(s) de diagnostics supplémentaire(s) sont rattachés aux fiches concernées.
            </p>
          ) : null}
        </div>
      ) : null}
    </Panel>
  );
}

function CanonicalEngineReportPanel({ report, onDownload }) {
  const performance = report?.performance || {};
  const diagnostics = report?.diagnostics || {};
  const taxonomy = report?.diagnosticTaxonomy || {};
  const collectionCatalog = report?.architecture?.collectionCatalog || {};
  const collectionCounts = collectionCatalog.counts || {};
  const categories = diagnostics.categories || {};
  const severities = diagnostics.severityCounts || {};
  const heapMb = Number(performance.memoryAfter?.heapUsedBytes || 0) / 1024 / 1024;
  const valid = report?.status === "VALID" || report?.status === "VALID_WITH_DIAGNOSTICS";

  return (
    <Panel
      title="Rapport Engine canonique"
      eyebrow="audit global exportable"
      action={
        <button className={buttonClass} type="button" onClick={onDownload} disabled={!report}>
          <FileJson size={17} /> Exporter le rapport
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Statut", report?.status || "—"],
          ["Durée", Number.isFinite(performance.durationMs) ? `${performance.durationMs} ms` : "—"],
          ["Heap final", heapMb ? `${heapMb.toFixed(1)} Mio` : "—"],
          ["Erreurs architecture", diagnostics.architectureErrors ?? "—"],
          ["Migration incomplète", taxonomy.MIGRATION_INCOMPLETE?.count ?? "—"],
        ].map(([label, value]) => (
          <article className="min-w-0 rounded-2xl border border-line bg-surface-inset p-4" key={label}>
            <small className="type-overline text-muted">{label}</small>
            <strong className={`mt-2 block break-all font-mono text-lg leading-tight ${valid ? "text-domain-foreground" : "text-danger"}`}>
              {value}
            </strong>
          </article>
        ))}
      </div>
      <p className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-400/10 p-4 type-body-strong text-domain-foreground">
        Le rapport distingue absences légitimes, données optionnelles, formes non supportées,
        non classées, mappings manquants, références cassées, orphelins, migrations incomplètes
        et erreurs bloquantes. Les index Map/Set sont construits une seule fois par audit.
      </p>
      <section className="mt-4 rounded-2xl border border-cyan-200/20 bg-cyan-400/[0.07] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <small className="type-overline text-cyan-100/70">Collection Catalog</small>
            <h3 className="type-title-card text-domain-foreground">Contrats de checklist canoniques</h3>
          </div>
          <span className={`rounded-full border px-3 py-1.5 type-label ${collectionCatalog.valid ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100" : "border-red-300/25 bg-red-400/10 text-red-100"}`}>
            {collectionCatalog.valid ? "VALID" : `${collectionCatalog.diagnostics || 0} erreur(s)`}
          </span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Contrats", Object.keys(collectionCounts).length],
            ["Event principal", collectionCounts["event.single.standard"]],
            ["Event multi", collectionCounts["event.multi.standard"]],
            ["Dynamax", collectionCounts["dynamax.single.standard"]],
            ["Gigamax", collectionCounts["gigantamax.single.standard"]],
          ].map(([label, value]) => (
            <article className="rounded-2xl border border-line bg-surface-inset p-3" key={label}>
              <small className="type-overline-compact text-muted">{label}</small>
              <strong className="mt-1 block font-mono text-xl text-domain-foreground">{value ?? "—"}</strong>
            </article>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            "COLLECTION_UNRELEASED_ENTRY",
            "COLLECTION_DUPLICATE_ENTRY",
            "COLLECTION_WRONG_ASSET_VARIANT",
            "COLLECTION_INVALID_EVENT_KIND",
            "COLLECTION_INVALID_GENDER_VARIANT",
            "COLLECTION_INVALID_CATEGORY",
            "COLLECTION_SHINY_NOT_RELEASED",
            "COLLECTION_MISSING_ASSET",
          ].map((code) => (
            <span className="rounded-full border border-line bg-surface-flat px-2.5 py-1 font-mono text-[10px] font-bold text-muted" key={code}>{code} · {taxonomy[code]?.count ?? 0}</span>
          ))}
        </div>
      </section>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[["Error", severities.error, "text-danger"], ["Warning", severities.warning, "text-warning"], ["Info", severities.info, "text-brand-2"]].map(([label, value, tone]) => (
          <article className="rounded-2xl border border-line bg-surface-inset p-4" key={label}>
            <small className="type-overline text-muted">{label}</small>
            <strong className={`mt-2 block font-mono text-2xl ${tone}`}>{value ?? "—"}</strong>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(diagnosticCategoryLabels).map(([category, label]) => {
          const counts = categories[category] || {};
          return (
            <article className="min-w-0 rounded-2xl border border-line bg-surface-inset p-3" key={category}>
              <strong className="block text-sm text-domain-foreground">{label}</strong>
              <span className="mt-1 block font-mono text-xs text-muted">{counts.error || 0} Error · {counts.warning || 0} Warning · {counts.info || 0} Info</span>
            </article>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["NOT_RANKED", "UNSUPPORTED_FORM", "UNRELEASED", "FORMAT_EXCLUDED"].map((status) => (
          <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1.5 type-label text-domain-foreground" key={status}>
            Info · {status} {taxonomy[status]?.count ?? 0}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function AssetArchitectureControlPanel({ audit }) {
  const summary = audit?.summary || {};
  const issues = Array.isArray(audit?.issues) ? audit.issues : [];
  const errors = issues.filter((item) => item.severity === "error");
  const warnings = issues.filter((item) => item.severity !== "error");
  const counts = summary.counts || {};
  const absences = summary.legitimateAbsences || {};
  const compactHash = summary.aggregateSha256
    ? `${summary.aggregateSha256.slice(0, 12)}…`
    : "indisponible";

  return (
    <Panel
      title="Architecture Assets séparée"
      eyebrow="contrôle canonique core + familles"
      action={
        <span
          className={`rounded-full border px-3 py-2 type-label ${
            summary.valid
              ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
              : "border-red-300/25 bg-red-400/10 text-red-100"
          }`}
        >
          {summary.valid ? "intégrité valide" : `${errors.length} erreur(s)`}
        </span>
      }
    >
      <p className="rounded-2xl border border-cyan-200/15 bg-cyan-400/10 p-4 type-body-strong text-domain-foreground">
        Vérification des assetsRef, assetRefs, identités, chemins, collisions,
        orphelins, manifestes, compteurs, empreintes, URL et absences légitimes.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Sources", summary.sources],
          ["Core", summary.core],
          ["Familles", summary.familyRecords],
          ["Références", summary.references],
          ["Manifeste", summary.manifestRecords],
          ["URL", summary.urls],
        ].map(([label, value]) => (
          <article
            className="rounded-2xl border border-line bg-surface-inset p-4"
            key={label}
          >
            <small className="type-overline text-muted">{label}</small>
            <strong className="mt-2 block font-mono text-2xl text-domain-foreground">
              {value ?? "—"}
            </strong>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["HOME HD", "home"],
          ["Shuffle", "shuffle"],
          ["Variants", "variants"],
          ["Location Cards", "location-cards"],
        ].map(([label, family]) => (
          <article
            className="rounded-2xl border border-line bg-surface-inset p-4"
            key={family}
          >
            <strong className="type-title-card text-domain-foreground">{label}</strong>
            <p className="mt-2 type-body-strong text-foreground-secondary">
              {counts[family] ?? "—"} fichier(s)
            </p>
            <p className="mt-1 type-caption-strong text-muted">
              {absences[family] ?? "—"} absence(s) légitime(s)
            </p>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-3 rounded-2xl border border-line bg-surface-inset p-4 text-sm sm:grid-cols-3">
        <span><strong className="text-domain-foreground">Archive</strong><br /><code>{summary.archiveTag || "—"}</code></span>
        <span><strong className="text-domain-foreground">Empreinte source</strong><br /><code>{compactHash}</code></span>
        <span><strong className="text-domain-foreground">Diagnostics</strong><br />{errors.length} erreur(s) · {warnings.length} avertissement(s)</span>
      </div>
      {issues.length ? (
        <div className="mt-4 grid gap-2">
          {issues.slice(0, 12).map((item, index) => (
            <article
              className={`rounded-2xl border p-3 ${
                item.severity === "error"
                  ? "border-red-300/20 bg-red-400/[0.08]"
                  : "border-amber-300/20 bg-amber-400/[0.08]"
              }`}
              key={`${item.issue}-${item.assetRef || item.path}-${index}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm text-domain-foreground">{item.issue}</strong>
                <span className="type-label text-muted">{item.severity}</span>
              </div>
              <code className="mt-1 block break-all text-xs text-foreground-secondary">
                {item.assetRef || item.sourceFile || item.path}
              </code>
              <p className="mt-1 text-xs text-muted">Attendu : {String(item.expected)} · Reçu : {String(item.actual)}</p>
            </article>
          ))}
        </div>
      ) : null}
    </Panel>
  );
}

export function AdminApp({ initialSection = "overview" }) {
  const router = useRouter();
  const [session, setSession] = useState({
    loading: true,
    authenticated: false,
  });
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [active, setActive] = useState(initialSection);
  const [bootstrap, setBootstrap] = useState({
    loading: false,
    payload: null,
    error: "",
  });
  const [catalog, setCatalog] = useState(null);
  const [assetAudit, setAssetAudit] = useState(null);
  const [assetAuditLoading, setAssetAuditLoading] = useState(false);
  const [assetAuditError, setAssetAuditError] = useState("");
  const assetAuditRequestRef = useRef(null);
  const [assetFamilyData, setAssetFamilyData] = useState({
    loading: false,
    loaded: [],
    patches: {},
    error: "",
  });
  const assetFamilyRequestRef = useRef(null);
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
  const [researchLoadError, setResearchLoadError] = useState("");
  const [researchRegenerating, setResearchRegenerating] = useState(false);
  const [shiny, setShiny] = useState(null);
  const [shinyLoading, setShinyLoading] = useState(false);
  const [shinyRegenerating, setShinyRegenerating] = useState(false);
  const [shinyOptions, setShinyOptions] = useState(initialShinyOptions);
  const [pvpRankings, setPvpRankings] = useState(null);
  const [pvpRankingsLoading, setPvpRankingsLoading] = useState(false);
  const [pvpRankingsRegenerating, setPvpRankingsRegenerating] = useState(false);
  const [pvpRankingRegeneration, setPvpRankingRegeneration] = useState(() =>
    createPvpRankingRegenerationState(),
  );
  const [pvpOptions, setPvpOptions] = useState(initialPvpOptions);
  const [gblCalendar, setGblCalendar] = useState(null);
  const [gblCalendarLoading, setGblCalendarLoading] = useState(false);
  const [gblCalendarRegenerating, setGblCalendarRegenerating] = useState(false);
  const [bestAttackers, setBestAttackers] = useState(null);
  const [bestAttackersLoading, setBestAttackersLoading] = useState(false);
  const [bestAttackersRegenerating, setBestAttackersRegenerating] =
    useState(false);
  const [bestAttackersOptions, setBestAttackersOptions] = useState(
    initialBestAttackersOptions,
  );
  const [identityMappings, setIdentityMappings] = useState(null);
  const [identityMappingsLoading, setIdentityMappingsLoading] = useState(false);
  const [identityMappingsRegenerating, setIdentityMappingsRegenerating] =
    useState(false);
  const [identityMappingOptions, setIdentityMappingOptions] = useState(
    initialIdentityMappingOptions,
  );
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [detail, setDetail] = useState(null);
  const detailRequestRef = useRef(null);
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

  function selectSection(sectionId) {
    setActive(sectionId);
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(pokemonSectionPath(sectionId), window.location.origin);
    const search = currentUrl.searchParams.get("q");
    if (search) targetUrl.searchParams.set("q", search);
    router.push(`${targetUrl.pathname}${targetUrl.search}`);
  }

  const updateGlobalSearch = useCallback((value) => {
    setSearch(value);
    setShinyOptions((current) =>
      current.search === value
        ? current
        : { ...current, search: value, page: 1 },
    );
    setPvpOptions((current) =>
      current.search === value
        ? current
        : { ...current, search: value, page: 1 },
    );
    setBestAttackersOptions((current) =>
      current.search === value
        ? current
        : { ...current, search: value, page: 1 },
    );
    setIdentityMappingOptions((current) =>
      current.search === value
        ? current
        : { ...current, search: value, page: 1 },
    );
    const url = new URL(window.location.href);
    if (value.trim()) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  }, []);

  useEffect(() => {
    setAssetChecks(readLocalJson(legacyAssetChecksKey, {}));
    setCollections(readLocalJson(collectionsKey, []));
    const requestedParams = new URLSearchParams(window.location.search);
    const requestedSearch = requestedParams.get("q") || "";
    if (requestedSearch) updateGlobalSearch(requestedSearch);
  }, [updateGlobalSearch]);

  useEffect(() => {
    setActive(initialSection);
  }, [initialSection]);

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
        const saved = await writeDashboardStoreValue(
          assetChecksStoreKey,
          legacyValue,
        );
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

  useEffect(() => {
    if (!session.authenticated) return;
    let cancelled = false;

    async function hydrateCollections() {
      const legacyValue = readLocalJson(collectionsKey, []);
      const stored = await readDashboardStoreValue(collectionsStoreKey);
      if (cancelled || !stored.ok || !stored.configured) return;

      if (Array.isArray(stored.value)) {
        const merged = mergeCollectionSnapshots(stored.value, legacyValue);
        setCollections(merged);
        localStorage.setItem(collectionsKey, JSON.stringify(merged));
        if (JSON.stringify(merged) !== JSON.stringify(stored.value)) {
          const saved = await writeDashboardStoreValue(collectionsStoreKey, merged);
          if (!saved) toast.error("La fusion des collections reste locale : aucune sélection HAVE n'a été supprimée.");
        }
        return;
      }

      if (Array.isArray(legacyValue) && legacyValue.length) {
        setCollections(legacyValue);
        const saved = await writeDashboardStoreValue(collectionsStoreKey, legacyValue);
        if (!saved) toast.error("La sauvegarde Mongo des collections n'a pas abouti. La copie locale est conservée.");
        return;
      }

      setCollections([]);
    }

    void hydrateCollections();
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
        historyResponse,
        rulesResponse,
        sourceHistoryResponse,
        redeployResponse,
      ] = await Promise.all([
        fetch(adminApiPath),
        fetch(`${adminApiPath}?action=catalog`),
        fetch(`${adminApiPath}?action=history`),
        fetch(`${adminApiPath}?action=custom-rules`),
        fetch(`${adminApiPath}?action=source-history`),
        fetch(redeployApiPath),
      ]);
      const [
        checklistPayload,
        catalogPayload,
        historyPayload,
        rulesPayload,
        sourceHistoryPayload,
        redeployPayload,
      ] = await Promise.all([
        checklistResponse.json(),
        catalogResponse.json(),
        historyResponse.json(),
        rulesResponse.json(),
        sourceHistoryResponse.json(),
        redeployResponse.json(),
      ]);
      if (!checklistResponse.ok)
        throw actionError(checklistPayload.error, "Erreur de chargement.");
      setBootstrap({
        loading: false,
        payload: checklistPayload.data,
        error: "",
      });
      setAssetFamilyData({ loading: false, loaded: [], patches: {}, error: "" });
      setCatalog(catalogPayload.data || null);
      setHistory(historyPayload.data || []);
      setCustomRules(
        rulesPayload.data || checklistPayload.data?.customRules || [],
      );
      setSourceHistory(
        Array.isArray(sourceHistoryPayload.data)
          ? sourceHistoryPayload.data
          : [],
      );
      setDeployHistory(
        Array.isArray(redeployPayload.data?.history)
          ? redeployPayload.data.history
          : [],
      );
      if (notify) toast.success("Dashboard Pokémon actualisé.");
    } catch (error) {
      setBootstrap((current) => ({ loading: false, payload: current.payload, error: error.message }));
      if (notify)
        toast.error(errorMessage(error, "Erreur de chargement du dashboard."));
    }
  }

  function loadAssetAudit() {
    if (assetAuditRequestRef.current) return assetAuditRequestRef.current;
    setAssetAuditLoading(true);
    setAssetAuditError("");
    const request = fetch(`${adminApiPath}?action=assets`)
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok)
          throw actionError(payload.error, "Audit des assets indisponible.");
        setAssetAudit(payload.data || null);
        return payload.data || null;
      })
      .catch((error) => {
        const message = error.message || "Audit des assets indisponible.";
        setAssetAuditError(message);
        toast.error(message);
        return null;
      })
      .finally(() => {
        assetAuditRequestRef.current = null;
        setAssetAuditLoading(false);
      });
    assetAuditRequestRef.current = request;
    return request;
  }

  function loadAssetFamilies(families) {
    const requested = [...new Set(families)].filter(
      (family) => !assetFamilyData.loaded.includes(family),
    );
    if (!requested.length) return Promise.resolve(assetFamilyData.patches);
    if (assetFamilyRequestRef.current) return assetFamilyRequestRef.current;
    setAssetFamilyData((current) => ({ ...current, loading: true, error: "" }));
    const request = fetch(
      `${adminApiPath}?action=asset-families&families=${encodeURIComponent(requested.join(","))}`,
    )
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok)
          throw actionError(payload.error, "Familles assets indisponibles.");
        const entries = Array.isArray(payload.data?.entries)
          ? payload.data.entries
          : [];
        setAssetFamilyData((current) => ({
          loading: false,
          loaded: [...new Set([...current.loaded, ...requested])],
          patches: {
            ...current.patches,
            ...Object.fromEntries(entries.map((entry) => [entry.key, entry])),
          },
          error: "",
        }));
        return entries;
      })
      .catch((error) => {
        const message = error.message || "Familles assets indisponibles.";
        setAssetFamilyData((current) => ({ ...current, loading: false, error: message }));
        toast.error(message);
        return [];
      })
      .finally(() => {
        assetFamilyRequestRef.current = null;
      });
    assetFamilyRequestRef.current = request;
    return request;
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
    if (
      session.authenticated &&
      active === "raids" &&
      !raids &&
      !raidsLoading
    ) {
      loadRaids();
    }
  }, [active, session.authenticated, raids, raidsLoading]);

  useEffect(() => {
    if (session.authenticated && active === "eggs" && !eggs && !eggsLoading) {
      loadEggs();
    }
  }, [active, session.authenticated, eggs, eggsLoading]);

  useEffect(() => {
    if (
      session.authenticated &&
      active === "max-battles" &&
      !maxBattles &&
      !maxBattlesLoading
    ) {
      loadMaxBattles();
    }
  }, [active, session.authenticated, maxBattles, maxBattlesLoading]);

  useEffect(() => {
    if (
      session.authenticated &&
      active === "rocket" &&
      !rocket &&
      !rocketLoading
    ) {
      loadRocket();
    }
  }, [active, session.authenticated, rocket, rocketLoading]);

  useEffect(() => {
    if (
      session.authenticated &&
      active === "research" &&
      !research &&
      !researchLoading
    ) {
      loadResearch();
    }
  }, [active, session.authenticated, research, researchLoading]);

  useEffect(() => {
    if (session.authenticated && active === "shiny") loadShiny();
  }, [active, session.authenticated, shinyOptions]);

  useEffect(() => {
    if (session.authenticated && active === "pvp-rankings") loadPvpRankings();
  }, [active, session.authenticated, pvpOptions]);

  useEffect(() => {
    if (session.authenticated && active === "gbl-calendar" && !gblCalendar && !gblCalendarLoading) loadGblCalendar();
  }, [active, session.authenticated, gblCalendar, gblCalendarLoading]);

  useEffect(() => {
    if (session.authenticated && active === "best-attackers")
      loadBestAttackers();
  }, [active, session.authenticated, bestAttackersOptions]);

  useEffect(() => {
    if (session.authenticated && active === "pokemon-identity-mappings")
      loadIdentityMappings();
  }, [active, session.authenticated, identityMappingOptions]);

  useEffect(() => {
    if (
      session.authenticated &&
      (active === "assets" || active === "backgrounds") &&
      !assetAudit
    ) {
      void loadAssetAudit();
    }
  }, [active, session.authenticated, assetAudit]);

  useEffect(() => {
    if (!session.authenticated) return;
    if (active === "collections") {
      void loadAssetFamilies(["home", "shuffle", "variants"]);
    } else if (active === "backgrounds") {
      void loadAssetFamilies(["location-cards"]);
    }
  }, [active, session.authenticated, assetFamilyData.loaded]);

  const entries = useMemo(
    () =>
      (bootstrap.payload?.entries || []).map((entry) => {
        const patch = assetFamilyData.patches[entry.key];
        return patch
          ? { ...entry, ...patch, assets: { ...entry.assets, ...patch.assets } }
          : entry;
      }),
    [bootstrap.payload, assetFamilyData.patches],
  );
  const collectionAssetFamiliesReady = ["home", "shuffle", "variants"].every((family) =>
    assetFamilyData.loaded.includes(family),
  );
  const customRuleEntries = useMemo(
    () => bootstrap.payload?.customRuleEntries || [],
    [bootstrap.payload],
  );
  const summary = bootstrap.payload?.summary || {};
  const issueEntries = useMemo(
    () => entries.flatMap((entry) => {
      const issues = (entry.issues || []).filter((issue) => issue.severity !== "info");
      return issues.length ? [{ ...entry, issues }] : [];
    }),
    [entries],
  );
  const customIssueEntries = useMemo(
    () =>
      entries.filter((entry) =>
        (entry.issues || []).some((issue) => issue.category === "custom"),
      ),
    [entries],
  );
  const presentationEntries = useMemo(
    () => pokemonPresentationEntries(entries, ficheFilter),
    [entries, ficheFilter],
  );
  const filtered = useMemo(
    () =>
      sortPokemonEntries(
        presentationEntries.filter(
          (entry) =>
            (generationFilter === "all" ||
              (generationFilter === "hisui"
                ? String(entry.form || "")
                    .toLowerCase()
                    .includes("hisui")
                : String(entry.generation || "") ===
                  String(generationFilter))) &&
            entryMatchesFicheFilter(entry, ficheFilter) &&
            pokemonPresentationSearchText(entry).includes(search.toLowerCase()),
        ),
      ),
    [presentationEntries, search, generationFilter, ficheFilter],
  );
  const ficheFilterCounts = useMemo(
    () =>
      Object.fromEntries(
        ficheFilterOptions.map(([id]) => [
          id,
          pokemonPresentationEntries(entries, id).filter((entry) =>
            entryMatchesFicheFilter(entry, id),
          ).length,
        ]),
      ),
    [entries],
  );
  const selected =
    selectedEntry || (selectedIndex >= 0 ? filtered[selectedIndex] : null);
  const selectedBaseIndex =
    selectedIndex >= 0
      ? selectedIndex
      : filtered.findIndex((item) => item.key === selected?.key);
  const previousSelectedEntry =
    filtered.length && selectedBaseIndex >= 0
      ? filtered[(selectedBaseIndex - 1 + filtered.length) % filtered.length]
      : null;
  const nextSelectedEntry =
    filtered.length && selectedBaseIndex >= 0
      ? filtered[(selectedBaseIndex + 1) % filtered.length]
      : null;
  const compareLeft = entries.find((entry) => entry.key === compareA);
  const compareRight = entries.find((entry) => entry.key === compareB);
  const bulkEntries = filtered
    .filter((entry) => !bulkOnlyIssues || entry.issues.length)
    .slice(0, 80);
  const unchecked = entries.filter((entry) => !assetChecks[entry.key]);
  const assetItems = useMemo(() => {
    const linkedAssets = assetAudit?.goAssets || [];
    const linkedByType = (type, group) =>
      linkedAssets
        .filter((item) => item.assetType === type)
        .map((item) => ({ ...item, group, image: item.url }));
    const lists = [
      ...(assetTab === "all" || assetTab === "proposals"
        ? (assetAudit?.proposals || []).map((item) => ({
            ...item,
            group: "Propositions HD",
            image: item.url,
          }))
        : []),
      ...(assetTab === "all" || assetTab === "linked"
        ? linkedAssets.map((item) => ({
            ...item,
            group: "Assets liés",
            image: item.url,
          }))
        : []),
      ...(assetTab === "go" ? linkedByType("go", "GO") : []),
      ...(assetTab === "home" ? linkedByType("home", "HOME") : []),
      ...(assetTab === "portrait" ? linkedByType("portrait", "Portraits") : []),
      ...(assetTab === "variant" ? linkedByType("variant", "Variantes") : []),
      ...(assetTab === "background"
        ? linkedByType("background", "Backgrounds")
        : []),
      ...(assetTab === "candy" ? linkedByType("candy", "Bonbons") : []),
      ...(assetTab === "all" || assetTab === "shuffle"
        ? [
            ...linkedByType("shuffle", "Shuffle liés"),
            ...(assetAudit?.shuffleAssets || []).map((item) => ({
              ...item,
              group: "Shuffle bibliothèque",
              image: item.url,
            })),
          ]
        : []),
      ...(assetTab === "all" || assetTab === "unused"
        ? (assetAudit?.unused || []).map((item) => ({
            ...item,
            group: "HD non utilisés",
            image: item.url,
          }))
        : []),
    ];
    const needle = search.trim().toLowerCase();
    if (!needle) return lists;
    return lists.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(needle),
    );
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
      id: "overview-summary",
      label: "Synthèse existante",
      node: (
        <Panel
          title="Synthèse des fiches"
          eyebrow="widgets historiques conservés"
        >
          <section className="grid items-start gap-3 sm:grid-cols-2">
            <MetricCard
              label="Fiches analysées"
              value={summary.total || 0}
              icon={uiAssets.icons.fiche}
            />
            <MetricCard
              label="Terminées"
              value={summary.complete || 0}
              accent="green"
              icon={uiAssets.icons.bookSpells}
            />
            <MetricCard
              label="Problèmes"
              value={summary.issues || 0}
              accent="amber"
              icon={uiAssets.icons.problem}
            />
            <MetricCard
              label="Assets vérifiés"
              value={Object.keys(assetChecks).length}
              accent="violet"
              icon={uiAssets.icons.result}
            />
          </section>
          <section className="mt-3 grid items-start gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4">
              <Sparkles className="mb-3 text-emerald-200" size={21} />
              <span className="type-caption-strong text-emerald-100/80">
                Données complètes
              </span>
              <strong className="mt-1 block type-title-section">
                {summary.complete || 0}
              </strong>
            </article>
            <article className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4">
              <ShieldCheck className="mb-3 text-cyan-200" size={21} />
              <span className="type-caption-strong text-cyan-100/80">
                Accès admin
              </span>
              <strong className="mt-1 block type-title-section">
                Protégé
              </strong>
            </article>
            <article className="rounded-2xl border border-violet-300/15 bg-violet-400/10 p-4">
              <BarChart3 className="mb-3 text-violet-200" size={21} />
              <span className="type-caption-strong text-violet-100/80">
                Résultat filtre
              </span>
              <strong className="mt-1 block type-title-section">
                {filtered.length}
              </strong>
            </article>
          </section>
        </Panel>
      ),
    },
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
        <Panel
          title="Historique Git"
          action={<History className="text-cyan-200" size={22} />}
        >
          <HistoryList history={history} />
        </Panel>
      ),
    },
    {
      id: "watch",
      label: "Fiches à surveiller",
      node: (
        <Panel title="Fiches à surveiller" eyebrow="premières anomalies">
          <MiniCardList
            entries={issueEntries.slice(0, 8)}
            onOpen={openDetail}
          />
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
      const message = errorMessage(payload.error, "Connexion refusée.");
      setAuthError(message);
      toast.error(message);
      return;
    }
    setSession({ loading: false, authenticated: true });
    setPassword("");
    selectSection("overview");
    toast.success("Session admin ouverte.");
    await loadAdminData();
  }

  function unwrapAdminActionReport(payload) {
    return payload?.data?.data || payload?.data || payload;
  }

  function assertSuccessfulAdminAction(payload, fallbackMessage) {
    const report = unwrapAdminActionReport(payload);
    if (report?.success === false) {
      throw actionError(report.error, fallbackMessage);
    }
    return report;
  }

  async function loadRaids({ notify = false } = {}) {
    setRaidsLoading(true);
    try {
      const response = await fetch(`${adminApiPath}?action=raids`, {
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok)
        throw actionError(payload.error, "Impossible de charger les raids.");
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
      if (value !== "" && value !== null && value !== undefined)
        params.set(key, String(value));
    }
    return `${adminApiPath}?${params}`;
  }

  async function loadRankedDataset({
    action,
    options,
    setData,
    setLoading,
    label,
    notify = false,
  }) {
    setLoading(true);
    try {
      const response = await fetch(rankedQuery(action, options), {
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok)
        throw actionError(payload.error, `Impossible de charger ${label}.`);
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

  async function regenerateRankedDataset({
    action,
    setRegenerating,
    setRegenerationState,
    reload,
    label,
  }) {
    setRegenerating(true);
    setRegenerationState?.(createPvpRankingRegenerationState("running"));
    try {
      const payload = await executePokemonAdminRegeneration(action);
      const report = assertSuccessfulAdminAction(
        payload,
        `Régénération ${label} impossible.`,
      );
      await reload();
      if (setRegenerationState) {
        const state = normalizePvpRankingRegeneration(report);
        setRegenerationState(state);
        const notification = pvpRankingRegenerationToast(state);
        if (notification?.kind === "warning") toast.warning(notification.message);
        else toast.success(notification?.message || regenerationMessage(report));
      } else {
        if (report?.run?.status === "partial") toast.warning(regenerationMessage(report));
        else toast.success(regenerationMessage(report));
      }
    } catch (error) {
      const message = errorMessage(error, `Régénération ${label} impossible.`);
      if (setRegenerationState) {
        const status = error?.regenerationStatus === "cancelled" ? "cancelled" : "failed";
        const state = normalizePvpRankingRegeneration({ status, errors: [{ message }] });
        setRegenerationState(state);
        const notification = pvpRankingRegenerationToast(state);
        if (notification?.kind === "warning") toast.warning(notification.message);
        else toast.error(notification?.message || message);
      } else {
        toast.error(message);
      }
    } finally {
      setRegenerating(false);
    }
  }

  async function downloadRankedDataset({ action, options, baseName, label }) {
    try {
      const response = await fetch(
        rankedQuery(action, { ...options, full: true, page: 1 }),
        { cache: "no-store" },
      );
      const payload = await response.json();
      if (!response.ok || !payload.data?.data)
        throw actionError(payload.error, `Export ${label} impossible.`);
      downloadJsonPayload(payload.data, baseName);
      toast.success(`${label} exporté sans modifier MongoDB.`);
    } catch (error) {
      toast.error(errorMessage(error, `Export ${label} impossible.`));
    }
  }

  function loadShiny({ notify = false } = {}) {
    return loadRankedDataset({
      action: "shiny",
      options: shinyOptions,
      setData: setShiny,
      setLoading: setShinyLoading,
      label: "Shiny Tracker",
      notify,
    });
  }

  function loadPvpRankings({ notify = false } = {}) {
    return loadRankedDataset({
      action: "pvp-rankings",
      options: pvpOptions,
      setData: setPvpRankings,
      setLoading: setPvpRankingsLoading,
      label: "PvP Rankings",
      notify,
    });
  }

  function loadGblCalendar({ notify = false } = {}) {
    return loadRankedDataset({
      action: "gbl-calendar",
      options: {},
      setData: setGblCalendar,
      setLoading: setGblCalendarLoading,
      label: "Calendrier GBL",
      notify,
    });
  }

  function loadBestAttackers({ notify = false } = {}) {
    return loadRankedDataset({
      action: "best-attackers",
      options: bestAttackersOptions,
      setData: setBestAttackers,
      setLoading: setBestAttackersLoading,
      label: "Best Attackers",
      notify,
    });
  }

  function loadIdentityMappings({ notify = false } = {}) {
    return loadRankedDataset({
      action: "pokemon-identity-mappings",
      options: identityMappingOptions,
      setData: setIdentityMappings,
      setLoading: setIdentityMappingsLoading,
      label: "Résolution des variantes",
      notify,
    });
  }

  async function loadShinyHistory(identity) {
    try {
      const response = await fetch(
        `${adminApiPath}?action=shiny-history&identity=${encodeURIComponent(identity)}&days=30`,
        { cache: "no-store" },
      );
      const payload = await response.json();
      return response.ok && Array.isArray(payload.data?.data)
        ? {
            points: payload.data.data,
            statistics: payload.data.meta?.statistics || null,
          }
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
      if (!response.ok)
        throw actionError(payload.error, "Action raids impossible.");
      const report = assertSuccessfulAdminAction(
        payload,
        "Action raids impossible.",
      );
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
      const response = await fetch(`${adminApiPath}?action=eggs`, {
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok)
        throw actionError(payload.error, "Impossible de charger les oeufs.");
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
      if (!response.ok)
        throw actionError(payload.error, "Action oeufs impossible.");
      const report = assertSuccessfulAdminAction(
        payload,
        "Action oeufs impossible.",
      );
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
      const response = await fetch(`${adminApiPath}?action=max-battles`, {
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok)
        throw actionError(
          payload.error,
          "Impossible de charger les Max Battles.",
        );
      setMaxBattles(payload.data || null);
      if (notify) toast.success("Max Battles actualisées.");
    } catch (error) {
      const message = errorMessage(
        error,
        "Erreur de chargement des Max Battles.",
      );
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
      if (!response.ok)
        throw actionError(payload.error, "Action Max Battles impossible.");
      const report = assertSuccessfulAdminAction(
        payload,
        "Action Max Battles impossible.",
      );
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
      const [payload, textsPayload] = await Promise.all([
        response.json(),
        textsResponse.json(),
      ]);
      if (!response.ok)
        throw actionError(payload.error, "Impossible de charger Rocket.");
      if (!textsResponse.ok)
        throw actionError(
          textsPayload.error,
          "Impossible de charger les textes Rocket.",
        );
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
      if (!response.ok)
        throw actionError(payload.error, "Action Rocket impossible.");
      const report = assertSuccessfulAdminAction(
        payload,
        "Action Rocket impossible.",
      );
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
    setResearchLoadError("");
    try {
      const [response, itemsResponse] = await Promise.all([
        fetch(`${adminApiPath}?action=research`, { cache: "no-store" }),
        fetch(`${adminApiPath}?action=items`, { cache: "no-store" }),
      ]);
      const [payload, itemsPayload] = await Promise.all([
        response.json(),
        itemsResponse.json(),
      ]);
      if (!response.ok)
        throw actionError(payload.error, "Impossible de charger Research.");
      if (!itemsResponse.ok)
        throw actionError(
          itemsPayload.error,
          "Impossible de charger les items.",
        );
      setResearch(payload.data || null);
      setItemsReference(itemsPayload.data || null);
      if (notify) toast.success("Research actualisé.");
    } catch (error) {
      const message = errorMessage(error, "Erreur de chargement Research.");
      setResearchLoadError(message);
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
      if (!response.ok)
        throw actionError(payload.error, "Action Research impossible.");
      const report = assertSuccessfulAdminAction(
        payload,
        "Action Research impossible.",
      );
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
    detailRequestRef.current?.abort();
    const controller = new AbortController();
    detailRequestRef.current = controller;
    const index = filtered.findIndex((item) => item.key === entry.key);
    setSelectedIndex(index);
    setSelectedEntry(entry);
    setExtraPanel(null);
    // Le résumé canonique contient déjà les sorties shiny. Tous les points
    // d’entrée rendent donc la même fiche pendant le chargement du détail.
    setDetail(assemblePokemonDetail(entry));
    try {
      const loaded = await loadPokemonDetail({
        fetcher: fetch,
        adminApiPath,
        entry,
        signal: controller.signal,
      });
      if (detailRequestRef.current === controller) setDetail(loaded);
    } catch (error) {
      if (error?.name === "AbortError") return;
      if (detailRequestRef.current === controller) {
        setDetail(
          assemblePokemonDetail(entry, {
            error: errorMessage(error, "Erreur de chargement."),
          }),
        );
      }
    }
  }

  function findEntryForPokemonReference(pokemon) {
    const candidates = [
      pokemon?.formId,
      pokemon?.form,
      pokemon?.id,
      pokemon?.pokemonId,
    ]
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
    const baseIndex =
      selectedIndex >= 0
        ? selectedIndex
        : filtered.findIndex((item) => item.key === selected?.key);
    const nextIndex =
      ((baseIndex >= 0 ? baseIndex : 0) + delta + filtered.length) %
      filtered.length;
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
        toast.error(
          "La vérification d'asset n'a pas pu être synchronisée sur Mongo.",
        );
      });
      return next;
    });
  }

  function saveCollections(next) {
    setCollections(next);
    localStorage.setItem(collectionsKey, JSON.stringify(next));
    void writeDashboardStoreValue(collectionsStoreKey, next).then((saved) => {
      if (!saved) toast.error("MongoDB indisponible : la copie locale des collections reste active.");
    });
  }

  async function loadSources({ automatic = false } = {}) {
    const toastId = automatic
      ? null
      : toast.loading("Vérification des sources Pokémon GO...");
    setSourceWatch({ loading: true, sources: [] });
    try {
      const response = await fetch(`${adminApiPath}?action=source-watch`);
      const payload = await response.json();
      if (!response.ok)
        throw actionError(payload.error, "Veille indisponible.");
      const watchState = persistSourceSignatures(
        payload.data,
        sourceWatchSignatureKey,
      );
      setSourceWatch({
        ...(payload.data || {}),
        sources: watchState?.sources || payload.data?.sources || [],
        changedSources: watchState?.changed || [],
      });
      if (Array.isArray(payload.data?.history))
        setSourceHistory(payload.data.history);
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
        toast.warning(
          `${watchState.blocked.length} source(s) bloquent le contrôle serveur, mais restent surveillées.`,
        );
      }
      if (!automatic)
        toast.success(
          `${payload.data?.sources?.length || 0} source(s) vérifiée(s).`,
          { id: toastId },
        );
    } catch (error) {
      setSourceWatch({ error: errorMessage(error, "Veille indisponible.") });
      if (!automatic)
        toast.error(errorMessage(error, "Veille indisponible."), { id: toastId });
    }
  }

  async function loadSourceHistory() {
    try {
      const response = await fetch(`${adminApiPath}?action=source-history`);
      const payload = await response.json();
      if (!response.ok)
        throw actionError(
          payload.error,
          "Historique des sources indisponible.",
        );
      setSourceHistory(Array.isArray(payload.data) ? payload.data : []);
      setSourceHistoryOpen(true);
    } catch (error) {
      toast.error(errorMessage(error, "Historique des sources indisponible."));
    }
  }

  async function loadDeployHistory() {
    try {
      const response = await fetch(redeployApiPath);
      const payload = await response.json();
      if (!response.ok)
        throw actionError(payload.error, "Historique data indisponible.");
      setDeployHistory(
        Array.isArray(payload.data?.history) ? payload.data.history : [],
      );
      setDeployHistoryOpen(true);
    } catch (error) {
      toast.error(errorMessage(error, "Historique data indisponible."));
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
      const message = errorMessage(payload.error, "Règle invalide.");
      setRuleMessage(message);
      toast.error(message);
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
      const message = errorMessage(payload.error, "Impossible de sauvegarder la règle.");
      setRuleMessage(message);
      toast.error(message);
      return;
    }
    setRuleForm({ ...defaultRuleForm });
    setRulePreview(payload.data);
    setRuleMessage(
      "Règle sauvegardée. Contrôle recalculé sur le snapshot local.",
    );
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
      if (!response.ok)
        throw actionError(payload.error, "Synchronisation impossible.");
      setBootstrap({
        loading: false,
        payload: payload.data?.bootstrap,
        error: "",
      });
      setCustomRules(payload.data?.bootstrap?.customRules || []);
      setRuleMessage(
        "Snapshot GitHub synchronisé. Contrôle relancé sur les données à jour.",
      );
      toast.success("Snapshot GitHub synchronisé.", { id: toastId });
    } catch (error) {
      setRuleMessage(error.message || "Synchronisation impossible.");
      toast.error(errorMessage(error, "Synchronisation impossible."), {
        id: toastId,
      });
    } finally {
      setRulesSyncing(false);
    }
  }

  async function redeployDashboard() {
    setRedeployingDashboard(true);
    const toastId = toast.loading(
      "Je demande a Vercel de reconstruire le Dashboard...",
    );
    try {
      const response = await fetch(redeployApiPath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ reason: "Manual PokemonGo-Data refresh" }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw actionError(payload.error, "Redéploiement impossible.");
      const history = Array.isArray(payload.data?.history)
        ? payload.data.history
        : [];
      setDeployHistory(history);
      const changed = payload.data?.event?.dataChanges?.trackedFiles || 0;
      toast.success(
        changed
          ? `Redéploiement demandé. ${changed} JSON data seront visibles dans l'historique.`
          : "Redéploiement demandé. Vercel va reconstruire le Dashboard.",
        { id: toastId },
      );
    } catch (error) {
      toast.error(errorMessage(error, "Redéploiement impossible."), {
        id: toastId,
      });
    } finally {
      setRedeployingDashboard(false);
    }
  }

  async function toggleRule(rule) {
    await fetch(adminApiPath, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: "toggle-rule",
        id: rule.id,
        enabled: rule.enabled === false,
      }),
    });
    toast.success(
      rule.enabled === false ? "Règle activée." : "Règle désactivée.",
    );
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
      <main className="grid min-h-dvh place-items-center bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,.28),transparent_35%),#060914] p-4 text-domain-foreground">
        <section className={panelClass}>
          <h2 className="type-title-subsection">
            Vérification de la session admin...
          </h2>
        </section>
      </main>
    );
  }

  if (!session.authenticated) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.22),transparent_28%),#050815] p-4 text-domain-foreground">
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
    <AdminPokemonSearchProvider
      query={search}
      onQueryChange={updateGlobalSearch}
    >
      <main className="pokemon-admin-surface text-domain-foreground">
        <div className="w-full">
          <section className="min-w-0">
            <header
              className={`relative overflow-hidden rounded-surface border border-line bg-surface-control shadow-raised backdrop-blur-2xl ${active === "collections" ? "p-3 sm:p-5" : "p-4 sm:p-5"}`}
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgba(15,23,42,.88), rgba(14,165,233,.18)), url("/assets/ui/backgrounds/library/catchCards/CatchCard_TypeBG_Water.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-surface-inset-strong" />
              <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <p className="mb-1 type-overline text-cyan-200/70">
                      Dashboard Pokémon GO
                    </p>
                    <h1 className={active === "collections" ? "text-2xl font-black sm:type-title-page" : "type-title-page"}>
                      {navItems.find((item) => item.id === active)?.label}
                    </h1>
                  </div>
                  <div className={`gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] xl:w-[780px] ${active === "collections" ? "hidden md:grid" : "grid"}`}>
                    <label className="relative block">
                      <Search
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-disabled"
                        size={18}
                      />
                      <input
                        aria-label="Chercher fiche, type, fichier..."
                        className={`${fieldClass} pl-11`}
                        placeholder="Chercher fiche, type, fichier..."
                        value={search}
                        onChange={(event) =>
                          updateGlobalSearch(event.target.value)
                        }
                      />
                    </label>
                    <Button
                      type="button"
                      icon={<RefreshCcw size={17} />}
                      loading={bootstrap.loading}
                      loadingText="Actualisation…"
                      onClick={() => loadAdminData({ notify: true })}
                    >
                      Actualiser
                    </Button>
                    <Button
                      variant="primary"
                      type="button"
                      icon={<Cloud size={17} />}
                      loading={redeployingDashboard}
                      loadingText="Déploiement…"
                      onClick={redeployDashboard}
                    >
                      Redéployer
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <div className={`${active === "collections" ? "mt-3 sm:mt-5" : "mt-5"} space-y-5`}>
              {bootstrap.loading && !bootstrap.payload ? (
                <FetchLoadingState
                  title="Chargement du dashboard…"
                  detail="Je recharge les fiches, catalogues, assets et l’historique Git."
                />
              ) : bootstrap.error && !bootstrap.payload ? (
                <ErrorState
                  title="Dashboard indisponible"
                  message={bootstrap.error}
                />
              ) : null}

              {bootstrap.payload &&
              active === "overview" ? (
                <>
                  <AdminCommandCenter
                    summary={summary}
                    assetCheckedCount={Object.keys(assetChecks).length}
                    assetsToVerify={unchecked.length}
                    filteredCount={filtered.length}
                    sourceWatch={sourceWatch}
                    history={history}
                    freshness={bootstrap.payload?.freshness || null}
                    search={search}
                    refreshing={bootstrap.loading || sourceWatch?.loading}
                    onSearchChange={updateGlobalSearch}
                    onNavigate={selectSection}
                    onRefresh={() => {
                      void loadAdminData({ notify: true });
                      void loadSources();
                    }}
                  />

                  <SortableWidgetGrid
                    columnsClassName="columns-1 xl:columns-2"
                    items={overviewWidgets}
                    storageKey="matweb.pokemonAdmin.widgetOrder"
                  />
                </>
              ) : null}

              {active === "pokedex" ? (
                <>
                  <GenerationFilterBar
                    value={generationFilter}
                    onChange={setGenerationFilter}
                  />
                  <section className="mt-4 rounded-surface border border-line bg-surface-inset-subtle p-3 shadow-surface">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 type-overline text-cyan-100/75">
                        <Search size={15} /> Filtres fiches
                      </span>
                      <button
                        className="type-label text-cyan-100 underline-offset-4 hover:underline"
                        type="button"
                        onClick={() => setFicheFilter("all")}
                      >
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
                                : "border-line bg-surface-flat hover:border-cyan-200/35"
                            }`}
                            key={id}
                            type="button"
                            onClick={() => setFicheFilter(id)}
                          >
                            {image ? (
                              <img
                                className={`absolute inset-0 h-full w-full object-cover transition duration-motion-slow ${
                                  activeFilter
                                    ? "opacity-52 saturate-125"
                                    : "opacity-24 saturate-75 group-hover:opacity-40"
                                }`}
                                src={image}
                                alt=""
                                loading="lazy"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,.25),transparent_42%)]" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/76 via-slate-950/52 to-slate-950/70" />
                            <span className="relative inline-flex rounded-full border border-line bg-surface-inset-strong px-2.5 py-1 text-[11px] font-black text-cyan-50">
                              {ficheFilterCounts[id] || 0}
                            </span>
                            <strong className="relative mt-3 block text-sm font-black text-domain-foreground">
                              {label}
                            </strong>
                            <small className="relative mt-1 block truncate text-[11px] font-bold text-foreground-secondary">
                              {detail}
                            </small>
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
                      onClick={() =>
                        setFicheLimit((current) => current + ficheLimitStep)
                      }
                    />
                  ) : null}
                </>
              ) : null}

              {active === "candies" ? (
                <CandyPanel
                  entries={entries}
                  search={search}
                  onOpen={openDetail}
                />
              ) : null}

              {active === "backgrounds" ? (
                <BackgroundPanel
                  entries={entries}
                  library={assetAudit?.locationCards || []}
                  linkedAssets={(assetAudit?.goAssets || []).filter(
                    (item) => item.assetType === "background",
                  )}
                  loading={assetAuditLoading}
                  search={search}
                  onOpen={openDetail}
                />
              ) : null}

              {active === "collections" && !collectionAssetFamiliesReady ? (
                assetFamilyData.error ? (
                  <ErrorState
                    title="Collections indisponibles"
                    message={assetFamilyData.error}
                    action={(
                      <button
                        className={secondaryButtonClass}
                        type="button"
                        onClick={() => void loadAssetFamilies(["home", "shuffle", "variants"])}
                      >
                        Réessayer
                      </button>
                    )}
                  />
                ) : (
                  <FetchLoadingState
                    title="Préparation des Collections…"
                    detail="Chargement des formes, variantes et assets canoniques."
                  />
                )
              ) : null}

              {active === "collections" && collectionAssetFamiliesReady ? (
                <CollectionsPanel
                  entries={entries}
                  collections={collections}
                  onSave={saveCollections}
                  onOpen={openDetail}
                  globalSearch={search}
                />
              ) : null}

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
                  refreshError={researchLoadError}
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
                  onDownload={() =>
                    downloadCurrentDataset(shiny, "shiny-tracker")
                  }
                  onRegenerate={() =>
                    regenerateRankedDataset({
                      action: "regenerate-shiny",
                      setRegenerating: setShinyRegenerating,
                      reload: loadShiny,
                      label: "Shiny Tracker",
                    })
                  }
                  onLoadHistory={loadShinyHistory}
                  onOpenPokemon={openPokemonReference}
                />
              ) : null}

              {active === "pvp-rankings" ? (
                <PvpRankingsPanel
                  dataset={pvpRankings}
                  localEntries={entries}
                  loading={pvpRankingsLoading}
                  regenerating={pvpRankingsRegenerating}
                  regeneration={pvpRankingRegeneration}
                  options={pvpOptions}
                  onOptionsChange={setPvpOptions}
                  onRefresh={() => loadPvpRankings({ notify: true })}
                  onDownload={() =>
                    downloadCurrentDataset(pvpRankings, "pvp-rankings")
                  }
                  onRegenerate={() =>
                    regenerateRankedDataset({
                      action: "regenerate-pvp-rankings",
                      setRegenerating: setPvpRankingsRegenerating,
                      setRegenerationState: setPvpRankingRegeneration,
                      reload: loadPvpRankings,
                      label: "PvP Rankings",
                    })
                  }
                  onOpenPokemon={openPokemonReference}
                />
              ) : null}

              {active === "pvp-simulator" ? <PvpBattleLab /> : null}

              {active === "gbl-calendar" ? (
                <GblCalendarPanel
                  dataset={gblCalendar}
                  loading={gblCalendarLoading}
                  regenerating={gblCalendarRegenerating}
                  onRefresh={() => loadGblCalendar({ notify: true })}
                  onDownload={() => downloadCurrentDataset(gblCalendar, "gbl-calendar")}
                  onRegenerate={() =>
                    regenerateRankedDataset({
                      action: "regenerate-gbl-calendar",
                      setRegenerating: setGblCalendarRegenerating,
                      reload: loadGblCalendar,
                      label: "Calendrier GBL",
                    })
                  }
                />
              ) : null}

              {active === "best-attackers" ? (
                <BestAttackersPanel
                  dataset={bestAttackers}
                  loading={bestAttackersLoading}
                  regenerating={bestAttackersRegenerating}
                  options={bestAttackersOptions}
                  onOptionsChange={setBestAttackersOptions}
                  onRefresh={() => loadBestAttackers({ notify: true })}
                  onDownload={() =>
                    downloadRankedDataset({
                      action: "best-attackers",
                      options: bestAttackersOptions,
                      baseName: "best-attackers",
                      label: "Best Attackers",
                    })
                  }
                  onRegenerate={() =>
                    regenerateRankedDataset({
                      action: "regenerate-best-attackers",
                      setRegenerating: setBestAttackersRegenerating,
                      reload: loadBestAttackers,
                      label: "Best Attackers",
                    })
                  }
                  onOpenPokemon={openPokemonReference}
                />
              ) : null}

              {active === "best-defenders" ? <BestDefendersPanel onOpenPokemon={openPokemonReference} globalSearch={search} onSearchChange={updateGlobalSearch} /> : null}

              {active === "pokemon-identity-mappings" ? (
                <PokemonIdentityMappingsPanel
                  dataset={identityMappings}
                  loading={identityMappingsLoading}
                  regenerating={identityMappingsRegenerating}
                  options={identityMappingOptions}
                  onOptionsChange={setIdentityMappingOptions}
                  onRefresh={() => loadIdentityMappings({ notify: true })}
                  onDownload={() =>
                    downloadRankedDataset({
                      action: "pokemon-identity-mappings",
                      options: identityMappingOptions,
                      baseName: "pokemon-identity-mappings",
                      label: "Mappings Game Master",
                    })
                  }
                  onRegenerate={() =>
                    regenerateRankedDataset({
                      action: "regenerate-pokemon-identity-mappings",
                      setRegenerating: setIdentityMappingsRegenerating,
                      reload: loadIdentityMappings,
                      label: "Résolution des variantes",
                    })
                  }
                />
              ) : null}

              {active === "identity-manager" ? <IdentityManagerPanel /> : null}

              {active === "json-builder" ? <JsonBuilderPanel /> : null}

              {active === "game-master-explorer" ? (
                <GameMasterExplorerPanel />
              ) : null}

              {active === "events" ? (
                <EventsCalendarPanel
                  globalSearch={search}
                  onOpenPokemon={openPokemonReference}
                  onOpenHistory={() => selectSection("events-history")}
                />
              ) : null}

              {active === "community-days" ? <CommunityDaysPanel /> : null}

              {active === "events-history" ? <EventsHistoryPanel /> : null}

              {active === "assets" ? (
                <section className="grid items-start gap-5 xl:grid-cols-[1.4fr_.9fr]">
                  <Panel title="Vérification d’assets" eyebrow="bibliothèque">
                    {assetAuditError ? (
                      <p className="mb-4 rounded-2xl border border-red-300/25 bg-red-400/10 p-4 text-sm font-bold text-red-100">
                        {assetAuditError}
                      </p>
                    ) : null}
                    {(assetAudit?.warnings || []).length ? (
                      <p className="mb-4 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-4 text-sm font-bold text-amber-100">
                        Bibliothèques distantes partiellement indisponibles :{" "}
                        {assetAudit.warnings.join(" · ")}. Les assets déjà liés
                        aux fiches restent affichés.
                      </p>
                    ) : null}
                    <div className="mb-4 grid min-w-0 items-start gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                      <AssetStatCard
                        label="Liés"
                        value={assetAudit?.totals?.goFiles || 0}
                        icon={uiAssets.icons.goLogo}
                        tone="cyan"
                        detail="Tous assets JSON fiches"
                      />
                      <AssetStatCard
                        label="HOME"
                        value={assetAudit?.totals?.homeFiles || 0}
                        icon={uiAssets.icons.pokemon}
                        tone="green"
                        detail="Images HOME liées"
                      />
                      <AssetStatCard
                        label="Portraits"
                        value={assetAudit?.totals?.portraitFiles || 0}
                        icon={uiAssets.icons.mega}
                        tone="violet"
                        detail="Portraits et shiny"
                      />
                      <AssetStatCard
                        label="Shuffle"
                        value={assetAudit?.totals?.shuffleFiles || 0}
                        icon={uiAssets.icons.pikachuShuffle}
                        tone="violet"
                        detail="Bibliothèque Shuffle"
                      />
                      <AssetStatCard
                        label="Variantes"
                        value={assetAudit?.totals?.variantFiles || 0}
                        icon={uiAssets.icons.tag}
                        tone="amber"
                        detail="assetForms JSON"
                      />
                      <AssetStatCard
                        label="Backgrounds"
                        value={assetAudit?.totals?.backgroundFiles || 0}
                        icon={uiAssets.icons.bookSpells}
                        tone="cyan"
                        detail="Location cards"
                      />
                      <AssetStatCard
                        label="Bonbons"
                        value={assetAudit?.totals?.candyFiles || 0}
                        icon={uiAssets.icons.candy}
                        tone="amber"
                        detail="Candy assets"
                      />
                      <AssetStatCard
                        label="Bonbons XL"
                        value={assetAudit?.totals?.xlCandyFiles || 0}
                        icon={uiAssets.icons.candy}
                        tone="cyan"
                        detail={`${assetAudit?.totals?.linkedXlCandyFiles || 0} références liées`}
                      />
                      <AssetStatCard
                        label="Utilisés"
                        value={assetAudit?.totals?.used || 0}
                        icon={uiAssets.icons.bookSpells}
                        tone="green"
                        detail="Référencés par les fiches"
                      />
                      <AssetStatCard
                        label="Réutilisations"
                        value={assetAudit?.totals?.duplicated || 0}
                        icon={uiAssets.icons.problem}
                        tone="amber"
                        detail="Même URL liée plusieurs fois"
                      />
                    </div>
                    <p className="mb-4 rounded-2xl border border-line bg-surface-inset p-4 type-body-strong text-foreground-secondary">
                      Cette page sert à contrôler les images réellement liées
                      aux fiches et les propositions HD. “Réutilisations”
                      signifie qu’une même URL d’asset est référencée par
                      plusieurs fiches, ce n’est pas forcément une erreur.
                    </p>
                    {assetAudit?.xlCandyAudit?.status === "source-unavailable" ? (
                      <p className="mb-4 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-4 type-body-strong text-amber-100">
                        L’inventaire Bonbons XL est indisponible. Aucun écart XL n’est déduit tant que la source ne répond pas.
                      </p>
                    ) : assetAudit?.xlCandyAudit ? (
                      <div className="mb-4 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
                        <p className="type-overline text-cyan-100/75">Audit Bonbons XL par familyId</p>
                          <div className="mt-3 flex flex-wrap gap-2 type-caption-strong">
                          {[
                            ["Familles connues", assetAudit.xlCandyAudit.knownFamilies],
                            ["Manquants", assetAudit.xlCandyAudit.missing?.length || 0],
                            ["Orphelins", assetAudit.xlCandyAudit.orphans?.length || 0],
                            ["Dupliqués", assetAudit.xlCandyAudit.duplicates?.length || 0],
                            ["Invalides", assetAudit.xlCandyAudit.invalid?.length || 0],
                          ].map(([label, value]) => (
                            <span className="rounded-full border border-cyan-200/20 bg-surface-inset-subtle px-3 py-1.5 text-cyan-50" key={label}>
                              {label} : {value}
                            </span>
                          ))}
                        </div>
                        {(assetAudit.xlCandyAudit.missing?.length || assetAudit.xlCandyAudit.orphans?.length || assetAudit.xlCandyAudit.duplicates?.length || assetAudit.xlCandyAudit.invalid?.length) ? (
                          <p className="mt-3 text-sm font-bold text-amber-100">
                            Écarts détectés : consulte le rapport du resolver avant toute régénération. Aucun placeholder n’est appliqué.
                          </p>
                        ) : (
                          <p className="mt-3 text-sm font-bold text-emerald-100">Inventaire XL cohérent avec les familles référencées.</p>
                        )}
                      </div>
                    ) : null}
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
                              : "border-line bg-surface-subtle text-foreground-secondary"
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
                        <article
                          className="overflow-hidden rounded-3xl border border-line bg-surface-inset-medium"
                          key={`${asset.group}-${asset.filename || asset.url}-${index}`}
                        >
                          <div className="grid aspect-square place-items-center bg-surface-minimal p-3">
                            <img
                              className="max-h-full object-contain"
                              src={asset.image || asset.url}
                              alt={asset.filename || asset.label || "asset"}
                            />
                          </div>
                          <div className="border-t border-line p-3">
                            <strong className="block truncate type-label text-domain-foreground">
                              {asset.filename || asset.label}
                            </strong>
                            <span className="mt-1 block truncate type-caption-strong text-muted">
                              {asset.group} ·{" "}
                              {asset.label ||
                                asset.details ||
                                asset.form ||
                                "standard"}
                            </span>
                            <button
                              className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200/20 bg-cyan-400/10 px-3 text-[11px] font-black text-cyan-50 transition hover:border-cyan-200/45 hover:bg-cyan-400/18"
                              type="button"
                              onClick={() =>
                                copyToClipboard(asset.url, "URL GitHub copiée.")
                              }
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
                        onClick={() =>
                          setAssetLimit((current) => current + assetLimitStep)
                        }
                      />
                    ) : null}
                  </Panel>
                  <Panel
                    title="Fiches à vérifier"
                    eyebrow={`${unchecked.length} restantes`}
                  >
                    <MiniCardList
                      entries={unchecked.slice(0, 50)}
                      onOpen={openDetail}
                    />
                  </Panel>
                </section>
              ) : null}

              {active === "checks" ? (
                <>
                  <CanonicalEngineReportPanel
                    report={bootstrap.payload?.engineReport}
                    onDownload={() => {
                      if (!bootstrap.payload?.engineReport) {
                        toast.error("Rapport Engine indisponible.");
                        return;
                      }
                      downloadJsonPayload(bootstrap.payload.engineReport, "pokemon-engine-canonical-report");
                      toast.success("Rapport Engine exporté.");
                    }}
                  />
                  <AssetArchitectureControlPanel
                    audit={bootstrap.payload?.assetArchitecture}
                  />
                  <PvpArchitectureControlPanel
                    audit={bootstrap.payload?.pvpArchitecture}
                  />
                  <section className="grid items-start gap-5 xl:grid-cols-[1.2fr_.8fr]">
                    <ControlCardsPanel
                      title="Fiches à contrôler"
                      entries={issueEntries}
                      onOpen={openDetail}
                      description="Liste dédiée pour ouvrir toutes les fiches qui ont une correction à faire, y compris les nouvelles règles JSON personnalisées."
                    />
                    <Panel
                      title="Règles personnalisées"
                      eyebrow="focus custom"
                      action={<Wand2 className="text-amber-100" size={22} />}
                    >
                      <MiniCardList
                        entries={customIssueEntries.slice(0, 120)}
                        onOpen={openDetail}
                      />
                    </Panel>
                  </section>
                </>
              ) : null}

              {active === "sources" ? (
                <Panel
                  title="Veille sources"
                  eyebrow="PokeMiners, Game Master, Shuffle"
                  action={
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={buttonClass}
                        type="button"
                        onClick={loadSourceHistory}
                      >
                        <History size={17} /> Historique
                      </button>
                      <button
                        className={primaryButtonClass}
                        type="button"
                        onClick={() => loadSources()}
                      >
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

              {active === "catalogs" ? (
                <CatalogPanel catalog={catalog} onOpen={openDetail} />
              ) : null}

              {active === "compare" ? (
                <Panel title="Comparaison de fiches" eyebrow="contrôle">
                  <p className="mb-4 rounded-2xl border border-line bg-surface-inset p-4 type-body-strong text-foreground-secondary">
                    Compare deux fiches côte à côte pour vérifier rapidement les
                    assets, types, problèmes JSON et informations visibles avant
                    une correction.
                  </p>
                  <div className="mb-5 grid gap-3 md:grid-cols-2">
                    <Select
                      aria-label="Fiche gauche"
                      className={fieldClass}
                      value={compareA}
                      onChange={(event) => setCompareA(event.target.value)}
                    >
                      <option value="">Fiche gauche</option>
                      {entries.slice(0, 1000).map((entry) => (
                        <option key={entry.key} value={entry.key}>
                          {entry.dexId} · {entry.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      aria-label="Fiche droite"
                      className={fieldClass}
                      value={compareB}
                      onChange={(event) => setCompareB(event.target.value)}
                    >
                      <option value="">Fiche droite</option>
                      {entries.slice(0, 1000).map((entry) => (
                        <option key={entry.key} value={entry.key}>
                          {entry.dexId} · {entry.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="grid items-start gap-4 lg:grid-cols-2">
                    {[compareLeft, compareRight].map((entry, index) => (
                      <div
                        className="rounded-[2rem] border border-line bg-surface-inset-subtle p-3"
                        key={index}
                      >
                        {entry ? (
                          <PokemonCard
                            entry={entry}
                            typeCatalog={catalog?.types}
                            weatherCatalog={catalog?.weather}
                            onOpen={openDetail}
                          />
                        ) : (
                          <p className="rounded-2xl border border-dashed border-line-medium p-5 text-sm font-bold text-muted">
                            Sélectionne une fiche.
                          </p>
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
                          : rule.templateSource ||
                            JSON.stringify(rule.template || {}, null, 2),
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
                    <label className="inline-flex items-center gap-3 rounded-2xl border border-line bg-surface-subtle px-4 py-3 text-sm font-black text-domain-foreground">
                      <Checkbox
                        className="h-5 w-5 accent-cyan-400"
                        checked={bulkOnlyIssues}
                        onChange={(event) =>
                          setBulkOnlyIssues(event.target.checked)
                        }
                      />
                      Seulement les fiches avec problèmes
                    </label>
                  }
                >
                  <p
                    id="form-a11y-bulk-description"
                    className="mb-4 rounded-2xl border border-line bg-surface-inset p-4 type-body-strong text-foreground-secondary"
                  >
                    Génère un brouillon JSON à partir des problèmes détectés. Ce
                    panneau ne modifie pas les fichiers: il sert à préparer des
                    corrections groupées.
                  </p>
                  <textarea
                    aria-label="Corrections groupées"
                    aria-describedby="form-a11y-bulk-description"
                    className={`${fieldClass} min-h-[520px] resize-y font-mono text-xs leading-6`}
                    readOnly
                    value={JSON.stringify(
                      Object.fromEntries(
                        bulkEntries.map((entry) => [
                          entry.key,
                          entry.suggestedPatch,
                        ]),
                      ),
                      null,
                      2,
                    )}
                  />
                </Panel>
              ) : null}

              {active === "export" ? (
                <Panel
                  title="Export et partage"
                  action={
                    <button
                      className={primaryButtonClass}
                      type="button"
                      onClick={() => copyToClipboard(exportPayload)}
                    >
                      <Copy size={17} /> Copier l’export
                    </button>
                  }
                >
                  <p
                    id="form-a11y-export-description"
                    className="mb-4 rounded-2xl border border-line bg-surface-inset p-4 type-body-strong text-foreground-secondary"
                  >
                    Exporte les fiches correspondant à la recherche globale en
                    cours. Pratique pour partager un lot réduit ou conserver un
                    état de contrôle.
                  </p>
                  <textarea
                    aria-label="Export et partage"
                    aria-describedby="form-a11y-export-description"
                    className={`${fieldClass} min-h-[520px] resize-y font-mono text-xs leading-6`}
                    readOnly
                    value={JSON.stringify(exportPayload, null, 2)}
                  />
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
            detailRequestRef.current?.abort();
            detailRequestRef.current = null;
            setSelectedIndex(-1);
            setSelectedEntry(null);
            setDetail(null);
            setExtraPanel(null);
          }}
          onCopyPatch={() => copyToClipboard(selected?.suggestedPatch || {})}
          onAuditUrls={async () => {
            const response = await fetch(
              `${adminApiPath}?action=url-audit&key=${encodeURIComponent(selected.key)}`,
            );
            const payload = await response.json();
            setExtraPanel(
              <div className="space-y-3">
                {(payload.data || []).map((item) => (
                  <div
                    className="rounded-2xl border border-line bg-surface-subtle p-3"
                    key={item.url}
                  >
                    <strong
                      className={item.ok ? "text-emerald-200" : "text-red-200"}
                    >
                      {item.ok ? "Accessible" : "Erreur"}
                    </strong>
                    <span className="mt-1 block break-all type-caption-strong text-foreground-secondary">
                      HTTP {item.status || "?"} · {item.url}
                    </span>
                  </div>
                ))}
              </div>,
            );
          }}
          onAssetAudit={async () => {
            const response = await fetch(
              `${adminApiPath}?action=assets&dexId=${encodeURIComponent(selected.dexId)}`,
            );
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
                      <strong className="text-domain-foreground">
                        {label}
                      </strong>
                      <span className="rounded-full bg-surface-emphasis px-2 py-1 type-label text-foreground-secondary">
                        {items.length}
                      </span>
                    </div>
                    {items.length ? (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {items.slice(0, 24).map((asset, index) => (
                          <article
                            className="overflow-hidden rounded-2xl border border-line bg-surface-inset-medium"
                            key={`${label}-${asset.filename || asset.url}-${index}`}
                          >
                            <div className="grid aspect-square place-items-center p-3">
                              <img
                                className="max-h-full object-contain"
                                src={asset.url}
                                alt={asset.filename || asset.label || label}
                              />
                            </div>
                            <div className="border-t border-line p-2">
                              <strong className="block truncate text-xs text-domain-foreground">
                                {asset.filename || asset.label}
                              </strong>
                              <span className="mt-1 block truncate text-xs text-muted">
                                {asset.details ||
                                  asset.form ||
                                  asset.state ||
                                  "standard"}
                              </span>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <EmptyState title="Aucun résultat" />
                    )}
                  </section>
                ))}
              </div>,
            );
          }}
        />
      </main>
    </AdminPokemonSearchProvider>
  );
}
