"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Gauge, Image as ImageIcon, LayoutDashboard, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { pokemonVariantLabel, preferredPokemonImage, typeColors } from "@/components/site/pokemon-style";
import { uiAssets } from "@/components/site/ui-assets";

const panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5";
const fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10";
const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]";
const initialCollectionLimit = 96;
const collectionLimitStep = 96;

const assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
};

const collectionTypes = [
  ["normal", "Normal", uiAssets.icons.pokeball || "/ui/icons/pokeball.webp"],
  ["event", "Evenement", "/ui/icons/pokeball.webp"],
  ["lucky", "Chanceux", uiAssets.icons.shiny || "/ui/icons/ic_shiny_white.webp"],
  ["shadow", "Obscur", uiAssets.icons.shadow || "/ui/icons/shadow.png"],
  ["purified", "Purifie", uiAssets.icons.purified || "/ui/icons/purified.png"],
  ["mega", "Méga", uiAssets.icons.mega || "/ui/icons/mega.png"],
  ["dynamax", "Dynamax", uiAssets.icons.maxCp || "/ui/icons/max_pc.webp"],
  ["gigantamax", "Gigamax", uiAssets.icons.maxCp || "/ui/icons/max_pc.webp"],
];

const collectionVariantModes = [
  ["multi", "Multi variante"],
  ["single", "Non variante"],
];

const collectionRegionFilters = [
  ["all", "Toutes", null],
  ["1", "Kanto", "/ui/icons/pokedex-kanto.webp"],
  ["2", "Johto", "/ui/icons/pokedex-johto.webp"],
  ["3", "Hoenn", "/ui/icons/pokedex-hoenn.webp"],
  ["4", "Sinnoh", "/ui/icons/pokedex-sinnoh.webp"],
  ["5", "Unys", "/ui/icons/pokedex-unova.webp"],
  ["6", "Kalos", "/ui/icons/pokedex-kalos.webp"],
  ["7", "Alola", "/ui/icons/pokedex-alola.webp"],
  ["8", "Galar", "/ui/icons/pokedex-galar.webp"],
  ["hisui", "Hisui", "/ui/PokedexV2/hisui_starters.png"],
  ["9", "Paldea", "/ui/icons/pokedex-paldea.webp"],
];

const generationLabels = {
  1: "Kanto",
  2: "Johto",
  3: "Hoenn",
  4: "Sinnoh",
  5: "Unys",
  6: "Kalos",
  7: "Alola",
  8: "Galar",
  9: "Paldea",
  hisui: "Hisui",
  unknown: "Inconnue",
};

function formatCount(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

function textForEntry(entry) {
  return [
    entry.name,
    entry.dexId,
    entry.form,
    entry.kind,
    entry.profile,
    entry.file,
    entry.primaryType,
    entry.secondaryType,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function entryIsReleased(entry) {
  return entry.availability?.released !== false;
}

function entryIsMega(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "").toLowerCase();
  return kind === "mega" || form.startsWith("mega") || form === "primal";
}

function entryIsMax(entry, type) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "").toLowerCase();
  return kind === type || form === type;
}

function entryIsEvent(entry) {
  return entry.collectionType === "event" || String(entry.kind || "").toLowerCase() === "event";
}

function entryMatchesCollectionType(entry, type) {
  if (!entryIsReleased(entry)) return false;
  const availability = entry.availability || {};
  const isMega = entryIsMega(entry);
  const isDynamax = entryIsMax(entry, "dynamax");
  const isGigantamax = entryIsMax(entry, "gigantamax");
  const isEvent = entryIsEvent(entry);
  if (type === "normal") {
    return !isEvent && !isMega && !isDynamax && !isGigantamax;
  }
  if (type === "event") return isEvent;
  if (type === "lucky") return !isEvent && !isMega && !isDynamax && !isGigantamax;
  if (type === "shadow" || type === "purified") return !isEvent && !isMega && !isDynamax && !isGigantamax && availability.shadow === true;
  if (type === "mega") return isMega;
  if (type === "dynamax") return !isEvent && isDynamax;
  if (type === "gigantamax") return !isEvent && isGigantamax;
  return true;
}

function entryMatchesVariantMode(entry, variantMode) {
  if (entry.collectionType === "event") return true;
  if (variantMode !== "single") return true;
  return String(entry.kind || "").toLowerCase() === "pokemon" && String(entry.form || "normal").toLowerCase() === "normal";
}

function entryMatchesCollectionRegion(entry, region) {
  if (region === "all") return true;
  if (region === "hisui") return textForEntry(entry).includes("hisui");
  return String(entry.generation || "") === String(region);
}

function entryMatchesCollection(entry, collection, region, query) {
  if (!entryMatchesCollectionType(entry, collection.type)) return false;
  if (!entryMatchesVariantMode(entry, collection.variantMode)) return false;
  if (!entryMatchesCollectionRegion(entry, region)) return false;
  const availability = entry.availability || {};
  if (collection.shiny) {
    if (collection.type === "event") {
      if (!entry.shinyImage) return false;
    } else {
      const isShadowCollection = ["shadow", "purified"].includes(collection.type);
      const released = isShadowCollection
        ? availability.shadowShinyReleased === true
        : availability.shinyReleased === true;
      if (!released) return false;
      if (!entry.shinyImage && !entry.homeShinyImage && !entry.shuffleShinyImage) return false;
    }
  }
  const needle = query.trim().toLowerCase();
  return !needle || textForEntry(entry).includes(needle);
}

const nonEventAssetForms = new Set([
  "normal",
  "mega",
  "mega-x",
  "mega-y",
  "primal",
  "dynamax",
  "gigantamax",
  "shadow",
  "purified",
  "alola",
  "galar",
  "hisui",
  "paldea",
]);

function eventAssetIsCollectionItem(asset = {}) {
  const form = String(asset.form || "").toLowerCase();
  if (asset.costume) return true;
  return Boolean(form) && !nonEventAssetForms.has(form);
}

function readableAssetLabel(value) {
  return String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bNoevolve\b/g, "No evolve");
}

function eventAssetName(entry, asset) {
  const label = readableAssetLabel(asset.costume || asset.form || "Evenement");
  return `${entry.name} ${label}`.trim();
}

function eventCollectionItems(entries) {
  return entries.filter(entryIsReleased).flatMap((entry) => {
    const eventAssets = Array.isArray(entry.eventAssets) ? entry.eventAssets : [];
    const seen = new Set();
    return eventAssets
      .filter(eventAssetIsCollectionItem)
      .filter((asset) => {
        const key = `${asset.costume || ""}|${asset.form || ""}|${asset.image || ""}|${asset.shinyImage || ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((asset, index) => ({
        ...entry,
        key: `${entry.key}:event:${asset.costume || asset.form || index}`,
        baseKey: entry.key,
        collectionType: "event",
        kind: "event",
        form: asset.costume || asset.form || "event",
        name: eventAssetName(entry, asset),
        image: asset.image || asset.shinyImage || entry.image,
        shinyImage: asset.shinyImage || null,
        eventAsset: asset,
        availability: {
          ...(entry.availability || {}),
          shinyReleased: Boolean(asset.shinyImage),
        },
      }));
  });
}

function collectionPool(entries, collection) {
  if (!collection) return [];
  return collection.type === "event" ? eventCollectionItems(entries) : entries;
}

function collectionImage(entry, collection) {
  if (collection?.shiny) {
    return (
      entry.shinyImage ||
      entry.homeShinyImage ||
      entry.shuffleShinyImage ||
      entry.eventAsset?.shinyImage ||
      preferredPokemonImage(entry, { preferShiny: true }) ||
      null
    );
  }
  return preferredPokemonImage(entry) || entry.image || entry.homeImage || null;
}

function generationKey(entry) {
  if (textForEntry(entry).includes("hisui")) return "hisui";
  return String(entry.generation || "unknown");
}

function dexSortValue(entry) {
  const value = Number.parseInt(String(entry.dexId || "").replace(/\D/g, ""), 10);
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

function collectionSortKey(entry) {
  const form = String(entry.form || "normal").toLowerCase();
  const kindRank = collectionVariantRank(entry);
  return [dexSortValue(entry), kindRank, form, String(entry.name || ""), String(entry.key || "")];
}

function collectionVariantRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "form") return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}

function sortCollectionEntries(entries) {
  return [...entries].sort((left, right) => {
    const leftKey = collectionSortKey(left);
    const rightKey = collectionSortKey(right);
    return (
      leftKey[0] - rightKey[0] ||
      leftKey[1] - rightKey[1] ||
      leftKey[2].localeCompare(rightKey[2], "fr") ||
      leftKey[3].localeCompare(rightKey[3], "fr") ||
      leftKey[4].localeCompare(rightKey[4], "fr")
    );
  });
}

function groupedByGeneration(entries) {
  const groups = new Map();
  for (const entry of sortCollectionEntries(entries)) {
    const key = generationKey(entry);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  }
  return Array.from(groups.entries()).sort(([left], [right]) => {
    const order = ["1", "2", "3", "4", "5", "6", "7", "8", "hisui", "9", "unknown"];
    const leftIndex = order.includes(left) ? order.indexOf(left) : order.length;
    const rightIndex = order.includes(right) ? order.indexOf(right) : order.length;
    return leftIndex - rightIndex;
  });
}

function collectionStats(entries) {
  const stats = {
    shiny: 0,
    shadow: 0,
    shadowShiny: 0,
    dynamax: 0,
    gigantamax: 0,
    mega: 0,
    regional: 0,
    event: eventCollectionItems(entries).length,
    forms: 0,
  };
  for (const entry of entries) {
    if (!entryIsReleased(entry)) continue;
    const kind = String(entry.kind || "").toLowerCase();
    const form = String(entry.form || "normal").toLowerCase();
    const availability = entry.availability || {};
    if (availability.shinyReleased) stats.shiny += 1;
    if (availability.shadow) stats.shadow += 1;
    if (availability.shadowShinyReleased) stats.shadowShiny += 1;
    if (entryIsMax(entry, "dynamax")) stats.dynamax += 1;
    if (entryIsMax(entry, "gigantamax")) stats.gigantamax += 1;
    if (entryIsMega(entry)) stats.mega += 1;
    if (kind === "form") stats.forms += 1;
    if (["alola", "galar", "hisui", "paldea"].includes(form)) stats.regional += 1;
  }
  return stats;
}

function CollectionStatCard({ label, value, icon, tone = "cyan", detail }) {
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

export function CollectionsPanel({ entries = [], collections = [], onSave, onOpen, globalSearch = "" }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeId, setActiveId] = useState(collections[0]?.id || "");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [collectionView, setCollectionView] = useState({ key: "", limit: initialCollectionLimit });
  const [draft, setDraft] = useState({
    name: "",
    type: "normal",
    variantMode: "multi",
    shiny: false,
    hundo: false,
  });

  const activeCollection = collections.find((collection) => collection.id === activeId) || collections[0] || null;
  const canUsePortal = typeof document !== "undefined";
  const activeItems = useMemo(() => activeCollection?.items || {}, [activeCollection]);
  const combinedSearch = [globalSearch, query].filter(Boolean).join(" ");
  const collectionFilterKey = [activeCollection?.id || "", region, status, combinedSearch].join("|");
  const collectionLimit =
    collectionView.key === collectionFilterKey ? collectionView.limit : initialCollectionLimit;
  const stats = useMemo(() => collectionStats(entries), [entries]);
  const pool = useMemo(() => collectionPool(entries, activeCollection), [activeCollection, entries]);
  const collectionEntries = useMemo(() => {
    if (!activeCollection) return [];
    return sortCollectionEntries(pool.filter((entry) => {
      if (!entryMatchesCollection(entry, activeCollection, region, combinedSearch)) return false;
      if (status === "have") return Boolean(activeItems[entry.key]);
      if (status === "need") return !activeItems[entry.key];
      return true;
    }));
  }, [activeCollection, activeItems, combinedSearch, pool, region, status]);
  const allMatching = useMemo(
    () => (activeCollection ? sortCollectionEntries(pool.filter((entry) => entryMatchesCollection(entry, activeCollection, region, combinedSearch))) : []),
    [activeCollection, combinedSearch, pool, region],
  );
  const visibleCollectionEntries = collectionEntries.slice(0, collectionLimit);
  const generationGroups = useMemo(() => groupedByGeneration(visibleCollectionEntries), [visibleCollectionEntries]);
  const haveCount = activeCollection ? Object.values(activeItems).filter(Boolean).length : 0;
  const visibleHaveCount = allMatching.filter((entry) => activeItems[entry.key]).length;

  function createCollection() {
    const name = draft.name.trim();
    if (!name) {
      toast.error("Donne un nom a la collection.");
      return;
    }
    const next = [
      {
        id: `collection-${Date.now()}`,
        name,
        type: draft.type,
        variantMode: draft.variantMode,
        shiny: draft.shiny,
        hundo: draft.hundo,
        items: {},
        createdAt: new Date().toISOString(),
      },
      ...collections,
    ];
    onSave(next);
    setActiveId(next[0].id);
    setModalOpen(false);
    setDraft({ name: "", type: "normal", variantMode: "multi", shiny: false, hundo: false });
    toast.success("Collection creee.");
  }

  function updateActive(patch) {
    if (!activeCollection) return;
    onSave(collections.map((collection) => (collection.id === activeCollection.id ? { ...collection, ...patch } : collection)));
  }

  function toggleEntry(entry) {
    if (!activeCollection) return;
    const nextItems = { ...activeItems };
    if (nextItems[entry.key]) delete nextItems[entry.key];
    else nextItems[entry.key] = true;
    updateActive({ items: nextItems, updatedAt: new Date().toISOString() });
  }

  function selectEntries(entriesToSelect) {
    if (!activeCollection || !entriesToSelect.length) return;
    const nextItems = { ...activeItems };
    for (const entry of entriesToSelect) nextItems[entry.key] = true;
    updateActive({ items: nextItems, updatedAt: new Date().toISOString() });
    toast.success(`${entriesToSelect.length} Pokémon sélectionné(s).`);
  }

  function deleteActive() {
    if (!activeCollection) return;
    const next = collections.filter((collection) => collection.id !== activeCollection.id);
    onSave(next);
    setActiveId(next[0]?.id || "");
    toast.success("Collection supprimee.");
  }

  return (
    <section className={panelClass}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">
            experimentation checklist
          </p>
          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">Collections Pokemon GO</h2>
        </div>
        <button className={primaryButtonClass} type="button" onClick={() => setModalOpen(true)}>
          <Sparkles size={17} /> Nouvelle collection
        </button>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Chromatiques", stats.shiny, uiAssets.icons.shiny, "Fiches dont availability.shinyReleased est vrai"],
          ["Shadow", stats.shadow, uiAssets.icons.shadow, "Fiches disponibles en Obscur"],
          ["Dynamax", stats.dynamax, uiAssets.icons.maxPc, "Fiches ou formes Dynamax"],
          ["Gigamax", stats.gigantamax, uiAssets.icons.maxPc, "Fiches ou formes Gigamax"],
          ["Mega", stats.mega, uiAssets.icons.mega, "Mega et Primo"],
          ["Formes", stats.forms, uiAssets.icons.pokedex, "Fiches du dossier pokemon-forms"],
          ["Regionales", stats.regional, uiAssets.icons.pokedex, "Alola, Galar, Hisui, Paldea"],
          ["Evenements", stats.event, uiAssets.icons.pokeball, "Cartes construites depuis assetForms"],
        ].map(([label, value, icon, detail]) => (
          <CollectionStatCard
            detail={detail}
            icon={icon}
            key={label}
            label={label}
            tone={label === "Shadow" ? "violet" : label === "Evenements" ? "amber" : "cyan"}
            value={value}
          />
        ))}
      </div>

      <div className="mb-5 grid gap-3 xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <strong className="font-black text-white">Mes collections</strong>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-100">
              {collections.length}
            </span>
          </div>
          <div className="grid gap-2">
            {collections.length ? (
              collections.map((collection) => (
                <button
                  className={`rounded-2xl border p-3 text-left transition ${
                    activeCollection?.id === collection.id
                      ? "border-cyan-200/55 bg-cyan-400/18"
                      : "border-white/10 bg-white/[0.045] hover:border-cyan-200/35"
                  }`}
                  key={collection.id}
                  type="button"
                  onClick={() => setActiveId(collection.id)}
                >
                  <span className="flex items-center justify-between gap-3">
                    <strong className="truncate text-sm font-black text-white">{collection.name}</strong>
                    <small className="shrink-0 rounded-full bg-white/10 px-2 py-1 text-[10px] font-black uppercase text-slate-200">
                      {collection.shiny ? "shiny" : "standard"}
                    </small>
                  </span>
                  <small className="mt-2 block truncate text-xs font-bold text-slate-400">
                    {collectionTypes.find(([id]) => id === collection.type)?.[1] || collection.type} -{" "}
                    {collectionVariantModes.find(([id]) => id === collection.variantMode)?.[1]}
                    {collection.hundo ? " - Hundo" : ""}
                  </small>
                </button>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
                Cree une premiere collection pour afficher les Pokemon correspondants.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/12 via-cyan-400/8 to-emerald-400/12 p-4">
          {activeCollection ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100/70">Collection active</p>
                  <h3 className="mt-1 text-2xl font-black text-white">{activeCollection.name}</h3>
                  <p className="mt-1 text-sm font-bold text-slate-300">
                    {visibleHaveCount}/{allMatching.length} selectionnes sur le filtre actuel - {haveCount} au total
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-2xl border border-cyan-200/25 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-50" type="button" onClick={() => selectEntries(allMatching)}>
                    Sélectionner tous
                  </button>
                  <button className="rounded-2xl border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-xs font-black text-rose-100" type="button" onClick={deleteActive}>
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                <input
                  aria-label="Rechercher dans la collection..."
                  className={fieldClass}
                  placeholder="Rechercher dans la collection..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <div className="grid grid-cols-3 gap-2">
                  {["all", "have", "need"].map((id) => (
                    <button
                      className={`rounded-2xl border px-4 py-2 text-xs font-black uppercase ${
                        status === id ? "border-cyan-200/55 bg-cyan-400/20 text-cyan-50" : "border-white/10 bg-white/[0.055] text-slate-300"
                      }`}
                      key={id}
                      type="button"
                      onClick={() => setStatus(id)}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="grid min-h-48 place-items-center text-center">
              <div>
                <Sparkles className="mx-auto mb-3 text-cyan-100" size={30} />
                <h3 className="text-xl font-black text-white">Aucune collection active</h3>
                <p className="mt-2 text-sm font-bold text-slate-400">Cree une collection pour generer automatiquement sa grille.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeCollection ? (
        <>
          <div className="mb-5 grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-2">
            {collectionRegionFilters.map(([id, label, icon]) => (
              <button
                className={`relative min-h-[72px] overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${
                  region === id ? "border-cyan-200/55 bg-cyan-400/20" : "border-white/10 bg-white/[0.045]"
                }`}
                key={id}
                type="button"
                onClick={() => setRegion(id)}
              >
                {icon ? (
                  <img className="absolute bottom-1 right-1 h-12 max-w-[56%] object-contain opacity-60 drop-shadow-xl" src={icon} alt="" />
                ) : (
                  <LayoutDashboard className="absolute bottom-3 right-3 text-cyan-100/50" size={24} />
                )}
                <small className="relative block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  {id === "all" ? "Regions" : `Gen. ${id}`}
                </small>
                <strong className="relative mt-1 block text-sm font-black text-white">{label}</strong>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {generationGroups.map(([groupId, groupEntries]) => (
              <section key={groupId}>
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/65">
                      Generation
                    </p>
                    <h3 className="text-2xl font-black text-white">
                      {generationLabels[groupId] || `Gen. ${groupId}`}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="rounded-full border border-cyan-200/25 bg-cyan-400/12 px-3 py-1.5 text-xs font-black text-cyan-50" type="button" onClick={() => selectEntries(groupEntries)}>
                      Sélectionner tous
                    </button>
                    <span className="rounded-full border border-cyan-200/25 bg-cyan-400/12 px-3 py-1.5 text-xs font-black text-cyan-50">
                      {groupEntries.filter((entry) => activeItems[entry.key]).length}/{groupEntries.length}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
                  {groupEntries.map((entry) => {
                    const selected = Boolean(activeItems[entry.key]);
                    const image = collectionImage(entry, activeCollection);
                    const color = typeColors[entry.primaryType] || "#38bdf8";
                    return (
                      <button
                        className={`group relative min-h-[13rem] overflow-hidden rounded-3xl border p-3 text-left transition hover:-translate-y-1 ${
                          selected
                            ? "border-pink-200/70 bg-pink-400/16 shadow-[0_18px_55px_rgba(244,114,182,.18)]"
                            : "border-white/10 bg-slate-950/42 hover:border-cyan-200/45"
                        }`}
                        key={entry.key}
                        type="button"
                        onClick={() => toggleEntry(entry)}
                        onDoubleClick={() => onOpen(entry)}
                      >
                        <span
                          className="pointer-events-none absolute inset-x-3 bottom-3 h-16 rounded-2xl opacity-70"
                          style={{ background: `linear-gradient(135deg, ${color}55, rgba(255,255,255,.08))` }}
                        />
                        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-slate-950/70 text-xs font-black text-white">
                          {selected ? "OK" : ""}
                        </span>
                        <span className="relative grid h-28 place-items-center p-2">
                          {image ? (
                            <img className="max-h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,.5)] transition group-hover:scale-110" src={image} alt="" />
                          ) : (
                            <ImageIcon className="text-cyan-100/55" size={34} />
                          )}
                        </span>
                        <span className="relative mt-2 block">
                          <strong className="block truncate text-sm font-black text-white">{entry.name}</strong>
                          <small className="mt-1 block truncate font-mono text-xs font-black text-slate-300">{entry.dexId}</small>
                          <small className="mt-1 block truncate text-[11px] font-bold text-slate-400">{pokemonVariantLabel(entry)}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
          {visibleCollectionEntries.length < collectionEntries.length ? (
            <div className="mt-5 flex justify-center">
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-400/12 px-5 py-2 text-sm font-black text-cyan-50 transition hover:border-cyan-200/55 hover:bg-cyan-400/20"
                type="button"
                onClick={() =>
                  setCollectionView({
                    key: collectionFilterKey,
                    limit: collectionLimit + collectionLimitStep,
                  })
                }
              >
                Afficher plus · {(collectionEntries.length - visibleCollectionEntries.length).toLocaleString("fr-FR")} restant(s)
              </button>
            </div>
          ) : null}
          {!collectionEntries.length ? (
            <p className="mt-4 rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
              Aucun Pokemon ne correspond a cette combinaison de filtres.
            </p>
          ) : null}
        </>
      ) : null}

      {canUsePortal && modalOpen ? createPortal(
        <div className="fixed inset-0 z-[1100] overflow-y-auto bg-slate-950/78 p-3 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true">
          <section className="mx-auto my-3 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 shadow-[0_32px_120px_rgba(0,0,0,.5)] sm:my-0 sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-zinc-900/95 p-4 backdrop-blur sm:p-5">
              <h3 className="text-2xl font-black text-white">Nouvelle collection</h3>
              <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl font-black text-white" type="button" onClick={() => setModalOpen(false)}>
                x
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-4 pb-5 sm:p-5">
              <div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-300">Type de collection</h4>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {collectionTypes.map(([id, label, icon]) => (
                    <button
                      className={`min-h-20 rounded-2xl border p-3 text-center transition sm:min-h-24 sm:p-4 ${
                        draft.type === id ? "border-emerald-200/65 bg-emerald-400/22" : "border-white/20 bg-white/[0.055] hover:border-cyan-200/45"
                      }`}
                      key={id}
                      type="button"
                      onClick={() => setDraft((current) => ({ ...current, type: id }))}
                    >
                      <img className="mx-auto mb-2 h-10 w-10 object-contain" src={icon} alt="" />
                      <strong className="font-black text-white">{label}</strong>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-300">Mode Pokedex</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {collectionVariantModes.map(([id, label]) => (
                    <button
                      className={`rounded-2xl border p-5 text-center font-black transition ${
                        draft.variantMode === id ? "border-cyan-200/60 bg-cyan-400/18 text-white" : "border-white/20 bg-white/[0.055] text-slate-200"
                      }`}
                      key={id}
                      type="button"
                      onClick={() => setDraft((current) => ({ ...current, variantMode: id }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-sm font-bold leading-6 text-slate-300">
                  Multi variante inclut les formes disponibles. Non variante limite aux fiches de base normales.
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-300">Autres caracteristiques</h4>
                <div className="grid gap-3">
                  {[
                    ["shiny", "Chromatique"],
                    ["hundo", "Hundo 100%"],
                  ].map(([id, label]) => (
                    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.055] p-4 text-sm font-black text-white" key={id}>
                      {label}
                      <input
                        className="h-6 w-6 accent-cyan-400"
                        type="checkbox"
                        checked={Boolean(draft[id])}
                        onChange={(event) => setDraft((current) => ({ ...current, [id]: event.target.checked }))}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-300">Nom de la collection</span>
                <input
                  className={fieldClass}
                  value={draft.name}
                  placeholder="ex. Shiny Shadow Kanto"
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                />
              </label>
            </div>
            <div className="sticky bottom-0 border-t border-white/10 bg-zinc-900/95 p-4 backdrop-blur sm:p-5">
              <button className="min-h-12 w-full rounded-2xl bg-white px-5 text-base font-black text-slate-950 transition hover:scale-[1.01]" type="button" onClick={createCollection}>
                Creer une Collection
              </button>
            </div>
          </section>
        </div>,
        document.body,
      ) : null}
    </section>
  );
}
