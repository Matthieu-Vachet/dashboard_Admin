"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BarChart3,
  Check,
  ChevronDown,
  Filter,
  Image as ImageIcon,
  LayoutDashboard,
  MoreHorizontal,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import * as collectionCatalogEngine from "@/lib/collections/collection-catalog";
import { uiAssets } from "@/components/site/ui-assets";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/admin/shared/state-system";

const {
  COLLECTION_SCHEMA_VERSION,
  buildCollectionCatalog,
  buildCollectionDataStats,
  migrateCollectionSelections,
} = collectionCatalogEngine;

const panelClass = "rounded-surface border border-line bg-surface-subtle p-3 shadow-raised backdrop-blur-xl sm:p-5";
const fieldClass = "min-h-11 w-full rounded-control border border-line bg-surface-inset-strong px-4 text-sm font-bold text-domain-foreground outline-none transition placeholder:text-disabled focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10";
const primaryButtonClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-on-accent shadow-raised transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/30";
const secondaryButtonClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-line bg-surface-control px-3 py-2 text-sm font-black text-domain-foreground transition hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/20";

const collectionTypes = [
  ["normal", "Normal", uiAssets.icons.pokeball || "/assets/ui/icons/general/pokeball.webp"],
  ["event", "Événement", "/assets/ui/icons/general/pokeball.webp"],
  ["lucky", "Chanceux", uiAssets.icons.shiny || "/assets/ui/icons/general/ic_shiny_white.webp"],
  ["shadow", "Obscur", uiAssets.icons.collectionShadow],
  ["purified", "Purifié", uiAssets.icons.collectionPurified],
  ["mega", "Méga", uiAssets.icons.collectionMega],
  ["dynamax", "Dynamax", uiAssets.icons.collectionMax],
  ["gigantamax", "Gigamax", uiAssets.icons.collectionMax],
];

const collectionVariantModes = [
  ["multi", "Multi variante"],
  ["single", "Non variante"],
];

const collectionRegionFilters = [
  ["all", "Toutes", null],
  ["1", "Kanto", "/assets/ui/icons/general/pokedex-kanto.webp"],
  ["2", "Johto", "/assets/ui/icons/general/pokedex-johto.webp"],
  ["3", "Hoenn", "/assets/ui/icons/general/pokedex-hoenn.webp"],
  ["4", "Sinnoh", "/assets/ui/icons/general/pokedex-sinnoh.webp"],
  ["5", "Unys", "/assets/ui/icons/general/pokedex-unova.webp"],
  ["6", "Kalos", "/assets/ui/icons/general/pokedex-kalos.webp"],
  ["7", "Alola", "/assets/ui/icons/general/pokedex-alola.webp"],
  ["8", "Galar", "/assets/ui/icons/general/pokedex-galar.webp"],
  ["hisui", "Hisui", "/assets/pokemon/generations/artwork/hisui_starters.png"],
  ["9", "Paldea", "/assets/ui/icons/general/pokedex-paldea.webp"],
];

const generationLabels = Object.fromEntries(collectionRegionFilters.map(([id, label]) => [id, label]));

function formatCount(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

function typeLabel(type) {
  return collectionTypes.find(([id]) => id === type)?.[1] || type;
}

function variantModeLabel(mode) {
  return collectionVariantModes.find(([id]) => id === mode)?.[1] || mode;
}

function statusLabel(status) {
  return status === "have" ? "HAVE" : status === "need" ? "NEED" : "ALL";
}

function Sheet({ open, title, description, onClose, children, footer, size = "lg" }) {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    previousFocusRef.current = document.activeElement;
    const dialog = dialogRef.current;
    const focusableSelector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusFirst = window.requestAnimationFrame(() => {
      if (dialog && !dialog.contains(document.activeElement)) {
        dialog.querySelector(focusableSelector)?.focus();
      }
    });
    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = [...dialog.querySelectorAll(focusableSelector)];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex max-w-full items-start justify-center overflow-x-hidden overflow-y-auto bg-overlay p-2 pt-[max(0.5rem,env(safe-area-inset-top))] pr-[max(0.5rem,env(safe-area-inset-right))] pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-[max(0.5rem,env(safe-area-inset-left))] backdrop-blur-md md:items-center md:p-6"
      onMouseDown={(event) => event.target === event.currentTarget && onCloseRef.current()}
    >
      <section
        ref={dialogRef}
        className={`flex max-h-[calc(100dvh-max(1rem,env(safe-area-inset-top))-max(1rem,env(safe-area-inset-bottom)))] min-h-[76dvh] w-full min-w-0 max-w-full flex-col overflow-hidden rounded-overlay border border-line bg-panel-strong shadow-overlay md:min-h-0 ${size === "sm" ? "md:max-w-xl" : "md:max-w-3xl"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="collections-editor-title"
        aria-describedby={description ? "collections-editor-description" : undefined}
      >
        <header className="flex min-w-0 shrink-0 items-start justify-between gap-4 overflow-hidden border-b border-line bg-panel-strong p-4 sm:p-5">
          <div className="min-w-0 flex-1">
            <h3 id="collections-editor-title" className="type-title-section text-domain-foreground">{title}</h3>
            {description ? <p id="collections-editor-description" className="mt-1 break-words text-sm font-semibold text-muted">{description}</p> : null}
          </div>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface-control text-domain-foreground" type="button" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </header>
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-4 sm:p-5">{children}</div>
        {footer ? <footer className="min-w-0 shrink-0 overflow-x-hidden border-t border-line bg-panel-strong p-4 sm:p-5">{footer}</footer> : null}
      </section>
    </div>,
    document.body,
  );
}

function CollectionStatCard({ label, value, icon, detail, tone = "cyan" }) {
  const toneClass = tone === "violet"
    ? "border-violet-300/25 bg-violet-400/10"
    : tone === "amber"
      ? "border-amber-300/25 bg-amber-400/10"
      : "border-cyan-300/25 bg-cyan-400/10";
  return (
    <article className={`min-w-0 rounded-surface border p-3 shadow-surface ${toneClass}`}>
      <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-control border border-line bg-surface-inset-strong p-2">
          {icon ? <Image src={icon} alt="" width={40} height={40} className="h-full w-full object-contain" unoptimized /> : <BarChart3 size={20} />}
        </span>
        <span className="min-w-0">
          <span className="block truncate type-overline-compact text-muted">{label}</span>
          <strong className="block font-mono text-2xl font-black leading-none text-domain-foreground">{formatCount(value)}</strong>
        </span>
      </div>
      {detail ? <p className="mt-2 truncate type-caption-strong text-muted">{detail}</p> : null}
    </article>
  );
}

function CollectionStats({ stats }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ["Chromatiques", stats.shiny, uiAssets.icons.shiny, "Fiches shiny sorties"],
        ["Shadow", stats.shadow, uiAssets.icons.shadow, "Fiches Shadow sorties", "violet"],
        ["Dynamax", stats.dynamax, uiAssets.icons.maxPc, "Fiches Dynamax sorties"],
        ["Gigamax", stats.gigantamax, uiAssets.icons.maxPc, "Fiches Gigamax sorties"],
        ["Méga", stats.mega, uiAssets.icons.mega, "Méga et Primo sorties"],
        ["Formes", stats.forms, uiAssets.icons.pokedex, "Formes canoniques sorties"],
        ["Régionales", stats.regional, uiAssets.icons.pokedex, "Alola, Galar, Hisui, Paldea"],
        ["Événements", stats.event, uiAssets.icons.pokeball, "Identités costume/event", "amber"],
      ].map(([label, value, icon, detail, tone]) => (
        <CollectionStatCard key={label} label={label} value={value} icon={icon} detail={detail} tone={tone} />
      ))}
    </div>
  );
}

function StatusTabs({ value, onChange, compact = false }) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-control border border-line bg-surface-inset p-1" aria-label="État de progression">
      {["all", "have", "need"].map((id) => (
        <button
          className={`${compact ? "min-h-11 min-w-0 px-2 text-[11px]" : "min-h-10 px-4 text-xs"} rounded-control font-black tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 ${value === id ? "bg-cyan-400/20 text-accent-text shadow-surface" : "text-muted hover:bg-surface-hover"}`}
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
        >
          {statusLabel(id)}
        </button>
      ))}
    </div>
  );
}

function collectionCategoryIcon(entry) {
  if (["dynamax", "gigantamax"].includes(entry.category)) return uiAssets.icons.collectionMax;
  if (["mega", "primal"].includes(entry.category)) return uiAssets.icons.collectionMega;
  if (entry.tone === "shadow") return uiAssets.icons.collectionShadow;
  if (entry.tone === "purified") return uiAssets.icons.collectionPurified;
  if (entry.shiny) return uiAssets.icons.collectionShiny;
  return null;
}

function PokemonCollectionCard({ entry, selected, onToggle }) {
  const descriptor = [entry.label, entry.gender === "female" ? "♀" : entry.gender === "male" ? "♂" : null, entry.shiny ? "Shiny" : null, entry.hundo ? "Hundo" : null].filter(Boolean).join(" · ");
  const categoryIcon = collectionCategoryIcon(entry);
  const secondaryShiny = entry.shiny && categoryIcon !== uiAssets.icons.collectionShiny;
  return (
    <article className="collection-pokemon-card group relative min-w-0 overflow-hidden rounded-surface border border-line bg-surface-inset shadow-surface transition hover:-translate-y-0.5" data-tone={entry.tone} data-selected={selected ? "true" : "false"}>
      <button
        className="absolute inset-0 z-10 rounded-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-cyan-300/55"
        type="button"
        aria-label={`${selected ? "Retirer" : "Ajouter"} ${entry.name}, ${descriptor}`}
        aria-pressed={selected}
        onClick={onToggle}
      >
        <span className="sr-only">{selected ? "Obtenu" : "Manquant"}</span>
      </button>
      {categoryIcon ? (
        <span className="pointer-events-none absolute left-2 top-2 z-20 flex items-center gap-1" aria-hidden="true">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-panel/90 p-1 shadow-surface">
            <Image src={categoryIcon} alt="" width={22} height={22} className="h-full w-full object-contain" unoptimized />
          </span>
          {secondaryShiny ? (
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-panel/90 p-1 shadow-surface">
              <Image src={uiAssets.icons.collectionShiny} alt="" width={22} height={22} className="h-full w-full object-contain" unoptimized />
            </span>
          ) : null}
        </span>
      ) : null}
      <span className="pointer-events-none absolute right-0 top-0 z-20 grid h-11 w-11 place-items-center" aria-hidden="true">
        <span className={`grid h-[22px] w-[22px] place-items-center rounded-full border ${selected ? "border-emerald-100/80 bg-emerald-400 text-slate-950" : "border-line-strong bg-panel/85 text-transparent"}`}>
          <Check size={13} strokeWidth={3.5} />
        </span>
      </span>
      <div className="pointer-events-none relative grid min-h-[6.25rem] place-items-center px-2 pb-0.5 pt-3 sm:min-h-[7.25rem]">
        {entry.asset ? (
          <Image
            className="h-[5.25rem] w-[5.25rem] object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,.34)] transition duration-motion-normal group-hover:scale-105 sm:h-[6.25rem] sm:w-[6.25rem]"
            src={entry.asset}
            alt={entry.name}
            width={180}
            height={180}
            sizes="(max-width: 639px) 42vw, (max-width: 1279px) 28vw, 180px"
            unoptimized
          />
        ) : <ImageIcon className="text-muted" size={36} />}
      </div>
      <div className="pointer-events-none relative min-h-[4.25rem] border-t border-line bg-surface-control p-2">
        <strong className="block truncate type-caption-strong text-xs font-black leading-4 text-domain-foreground sm:text-sm">{entry.name}</strong>
        <span className="block font-mono text-[10px] font-bold leading-4 text-foreground-secondary">#{entry.dexId}</span>
        <span className="block truncate text-[10px] font-bold leading-4 text-muted" title={entry.costume || entry.form || undefined}>{descriptor}</span>
      </div>
    </article>
  );
}

export function CollectionsPanel({ entries = [], collections = [], onSave, globalSearch = "" }) {
  const [sheet, setSheet] = useState(null);
  const [activeId, setActiveId] = useState(collections[0]?.id || "");
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [draft, setDraft] = useState({ name: "", type: "normal", variantMode: "multi", includeGenderVariants: false, shiny: false, hundo: false });

  const activeCollection = collections.find((collection) => collection.id === activeId) || collections[0] || null;
  const activeItems = useMemo(() => activeCollection?.items || {}, [activeCollection]);
  const stats = useMemo(() => buildCollectionDataStats(entries), [entries]);
  const catalog = useMemo(() => activeCollection ? buildCollectionCatalog(entries, activeCollection) : [], [activeCollection, entries]);
  const combinedSearch = [globalSearch, query].filter(Boolean).join(" ").trim().toLocaleLowerCase("fr-FR");
  const allMatching = useMemo(() => catalog.filter((entry) =>
    (region === "all" || entry.region === region)
    && (!combinedSearch || entry.searchText.includes(combinedSearch))), [catalog, combinedSearch, region]);
  const collectionEntries = useMemo(() => allMatching.filter((entry) => {
    if (status === "have") return Boolean(activeItems[entry.key]);
    if (status === "need") return !activeItems[entry.key];
    return true;
  }), [activeItems, allMatching, status]);
  const generationGroups = useMemo(() => {
    const groups = new Map();
    for (const entry of collectionEntries) {
      const key = entry.region || "unknown";
      const current = groups.get(key) || [];
      current.push(entry);
      groups.set(key, current);
    }
    return [...groups.entries()];
  }, [collectionEntries]);
  const haveCount = catalog.filter((entry) => activeItems[entry.key]).length;
  const activeFilterCount = Number(activeCollection?.shiny) + Number(activeCollection?.hundo) + Number(activeCollection?.includeGenderVariants) + Number(activeCollection?.variantMode === "multi") + Number(region !== "all");
  const draftCount = useMemo(() => buildCollectionCatalog(entries, draft).length, [draft, entries]);

  useEffect(() => {
    if (!entries.length || !collections.some((collection) => Number(collection.schemaVersion || 1) < COLLECTION_SCHEMA_VERSION)) return;
    let mapped = 0;
    let unmapped = 0;
    let ambiguous = 0;
    const migrated = collections.map((collection) => {
      if (Number(collection.schemaVersion || 1) >= COLLECTION_SCHEMA_VERSION) return collection;
      const collectionCatalog = buildCollectionCatalog(entries, {
        ...collection,
        includeGenderVariants: collection.variantMode !== "single",
      });
      const next = migrateCollectionSelections(collection, collectionCatalog);
      mapped += next.migration.mapped;
      unmapped += next.migration.unmapped;
      ambiguous += next.migration.ambiguous;
      return next;
    });
    onSave(migrated);
    toast.success(`Migration Collections : ${mapped} sélection(s) mappée(s), ${unmapped} conservée(s) en historique${ambiguous ? `, ${ambiguous} ambiguë(s)` : ""}.`);
  }, [collections, entries, onSave]);

  function closeSheet() {
    setSheet(null);
    setDeleteConfirmation(false);
  }

  function createCollection() {
    const name = draft.name.trim();
    if (!name) {
      toast.error("Donne un nom à la collection.");
      return;
    }
    const nextCollection = {
      id: `collection-${Date.now()}`,
      schemaVersion: COLLECTION_SCHEMA_VERSION,
      name,
      type: draft.type,
      variantMode: draft.variantMode,
      includeGenderVariants: draft.includeGenderVariants,
      shiny: draft.shiny,
      hundo: draft.hundo,
      items: {},
      legacyItems: {},
      createdAt: new Date().toISOString(),
    };
    onSave([nextCollection, ...collections]);
    setActiveId(nextCollection.id);
    setDraft({ name: "", type: "normal", variantMode: "multi", includeGenderVariants: false, shiny: false, hundo: false });
    closeSheet();
    toast.success("Collection créée.");
  }

  function updateActive(patch) {
    if (!activeCollection) return;
    onSave(collections.map((collection) => collection.id === activeCollection.id
      ? { ...collection, ...patch, schemaVersion: COLLECTION_SCHEMA_VERSION, updatedAt: new Date().toISOString() }
      : collection));
  }

  function toggleEntry(entry) {
    if (!activeCollection) return;
    const nextItems = { ...activeItems };
    if (nextItems[entry.key]) delete nextItems[entry.key];
    else nextItems[entry.key] = true;
    updateActive({ items: nextItems });
  }

  function selectEntries(entriesToSelect) {
    if (!activeCollection || !entriesToSelect.length) return;
    const nextItems = { ...activeItems };
    for (const entry of entriesToSelect) nextItems[entry.key] = true;
    updateActive({ items: nextItems });
    toast.success(`${entriesToSelect.length} Pokémon sélectionné(s).`);
  }

  function deselectEntries(entriesToDeselect) {
    if (!activeCollection || !entriesToDeselect.length) return;
    const nextItems = { ...activeItems };
    for (const entry of entriesToDeselect) delete nextItems[entry.key];
    updateActive({ items: nextItems });
    toast.success(`${entriesToDeselect.length} Pokémon désélectionné(s).`);
  }

  function deleteActive() {
    if (!activeCollection) return;
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      return;
    }
    const next = collections.filter((collection) => collection.id !== activeCollection.id);
    onSave(next);
    setActiveId(next[0]?.id || "");
    closeSheet();
    toast.success("Collection supprimée.");
  }

  function resetViewFilters() {
    setRegion("all");
    setStatus("all");
    setQuery("");
  }

  return (
    <section className={`${panelClass} min-w-0 max-w-full overflow-x-hidden`} data-testid="collections-panel">
      <header className="mb-1 flex items-start justify-between gap-3 sm:mb-4">
        <div>
          <p className="type-overline text-cyan-200/70">Checklist canonique</p>
          <h2 className="text-lg font-black leading-tight text-domain-foreground sm:type-title-subsection">Collections Pokémon GO</h2>
        </div>
        <button className={`${primaryButtonClass} shrink-0 px-3 sm:px-4`} type="button" onClick={() => setSheet("create")} aria-label="Nouvelle collection" data-testid="collection-create-trigger">
          <Sparkles size={17} /> <span className="hidden sm:inline">Nouvelle collection</span>
        </button>
      </header>

      <div className="mb-5 hidden xl:block"><CollectionStats stats={stats} /></div>

      {activeCollection ? (
        <>
          <div className="mb-2 rounded-surface border border-cyan-300/25 bg-gradient-to-br from-sky-500/12 via-cyan-400/8 to-emerald-400/10 p-2 shadow-surface sm:mb-3 sm:p-4" data-testid="active-collection-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="type-overline-compact text-cyan-100/70"><span className="md:hidden">Active · {typeLabel(activeCollection.type)}</span><span className="hidden md:inline">Collection active · {typeLabel(activeCollection.type)}</span></p>
                <h3 className="mt-1 min-w-0">
                  <button
                    className="flex min-h-11 w-full min-w-0 max-w-xl items-center justify-between gap-2 rounded-control border border-line bg-surface-control px-3 py-2 text-left text-xl font-black text-domain-foreground transition hover:border-cyan-200/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/20 sm:type-title-section"
                    type="button"
                    onClick={() => setSheet("collections")}
                    aria-label={`Changer de collection, active : ${activeCollection.name}`}
                    title={activeCollection.name}
                    data-testid="collection-selector-trigger"
                  >
                    <span className="min-w-0 truncate">{activeCollection.name}</span>
                    <ChevronDown className="shrink-0" size={18} />
                  </button>
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-foreground-secondary">
                  <span>{haveCount} / {catalog.length} obtenus</span>
                  <span aria-hidden="true">·</span>
                  <span>{collections.length} collection(s)</span>
                </p>
              </div>
              <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface-control text-domain-foreground" type="button" onClick={() => setSheet("actions")} aria-label="Actions de la collection">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <label className="relative mt-3 hidden md:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-disabled" size={17} />
              <input aria-label="Rechercher dans la collection..." className={`${fieldClass} pl-10`} placeholder="Rechercher nom, dex, forme…" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <div className="mt-3 hidden grid-cols-3 gap-3 md:grid xl:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
              <div className="col-span-3 xl:col-span-1"><StatusTabs value={status} onChange={setStatus} /></div>
              <button className={secondaryButtonClass} type="button" onClick={() => selectEntries(collectionEntries)}>Sélectionner tous les résultats</button>
              <button className={secondaryButtonClass} type="button" onClick={() => deselectEntries(collectionEntries)}>Désélectionner tous les résultats</button>
              <button className={secondaryButtonClass} type="button" onClick={() => setSheet("filters")}><Filter size={17} /> Filtres · {activeFilterCount}</button>
            </div>
          </div>

          <div className="sticky top-2 z-30 mb-2 rounded-surface border border-line bg-panel-strong/95 p-1.5 shadow-floating backdrop-blur-xl md:hidden" data-testid="collections-sticky-bar">
            <div className="grid min-w-0 gap-1.5">
              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-1.5">
                <StatusTabs value={status} onChange={setStatus} compact />
                <span className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-2 py-1 font-mono text-[11px] font-black text-accent-text">{haveCount}/{catalog.length}</span>
              </div>
              <div className="grid min-w-0 grid-cols-3 gap-1.5" data-testid="collections-mobile-actions">
                <button className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-control border border-line bg-surface-control px-2 text-[11px] font-black text-domain-foreground" type="button" onClick={() => setSheet("search")} aria-label="Ouvrir la recherche"><Search size={16} /><span className="truncate">Recherche</span></button>
                <button className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-control border border-line bg-surface-control px-2 text-[11px] font-black text-domain-foreground" type="button" onClick={() => setSheet("filters")} aria-label={`Ouvrir les filtres, ${activeFilterCount} actifs`}><Filter size={16} /><span className="truncate">Filtres</span></button>
                <button className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-control border border-line bg-surface-control px-2 text-[11px] font-black text-domain-foreground" type="button" onClick={() => setSheet("region")} aria-label="Changer de région"><LayoutDashboard size={16} /><span className="truncate">Région</span></button>
              </div>
            </div>
          </div>

          <div className="mb-4 hidden grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2 md:grid">
            {collectionRegionFilters.map(([id, label, icon]) => (
              <button className={`relative min-h-16 overflow-hidden rounded-control border p-3 text-left transition hover:-translate-y-0.5 ${region === id ? "border-cyan-200/55 bg-cyan-400/20" : "border-line bg-surface-flat"}`} key={id} type="button" aria-pressed={region === id} onClick={() => setRegion(id)}>
                {icon ? <Image className="absolute bottom-1 right-1 h-10 w-10 object-contain opacity-50" src={icon} alt="" width={48} height={48} unoptimized /> : <LayoutDashboard className="absolute bottom-3 right-3 text-cyan-100/40" size={22} />}
                <small className="relative block type-overline-compact text-muted">{id === "all" ? "Régions" : id === "hisui" ? "Région" : `Gen. ${id}`}</small>
                <strong className="relative mt-1 block text-sm font-black text-domain-foreground">{label}</strong>
              </button>
            ))}
          </div>

          <div className="space-y-5" data-testid="collection-pokemon-list">
            {generationGroups.map(([groupId, groupEntries]) => (
              <section className="[content-visibility:auto] [contain-intrinsic-size:auto_42rem]" key={groupId}>
                <div className="mb-1 flex items-end justify-between gap-3 sm:mb-3">
                  <div>
                    <p className="type-overline-compact text-cyan-100/65">Région / génération</p>
                    <h3 className="text-lg font-black text-domain-foreground sm:type-title-section">{generationLabels[groupId] || `Gen. ${groupId}`}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="hidden rounded-full border border-cyan-200/25 bg-cyan-400/10 px-3 py-1.5 type-label text-accent-text sm:inline-flex" type="button" onClick={() => selectEntries(collectionEntries.filter((entry) => (entry.region || "unknown") === groupId))}>Sélectionner la région</button>
                    <span className="rounded-full border border-cyan-200/25 bg-cyan-400/10 px-3 py-1.5 font-mono text-xs font-black text-accent-text">{collectionEntries.filter((entry) => (entry.region || "unknown") === groupId && activeItems[entry.key]).length}/{collectionEntries.filter((entry) => (entry.region || "unknown") === groupId).length}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10">
                  {groupEntries.map((entry) => (
                    <PokemonCollectionCard key={entry.key} entry={entry} selected={Boolean(activeItems[entry.key])} onToggle={() => toggleEntry(entry)} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {collectionEntries.length ? (
            <p className="mt-5 rounded-surface border border-line bg-surface-inset p-3 text-center font-mono text-xs font-bold text-muted" aria-live="polite">
              {formatCount(collectionEntries.length)} résultat(s) affiché(s) dans la liste complète
            </p>
          ) : null}

          {!collectionEntries.length ? (
            <div className="mt-4 rounded-surface border border-line bg-surface-inset p-4 text-center">
              <EmptyState title="Aucun résultat" description={`${typeLabel(activeCollection.type)} · ${variantModeLabel(activeCollection.variantMode)} · ${generationLabels[region]} · ${statusLabel(status)}`} />
              <button className={`${secondaryButtonClass} mt-3`} type="button" onClick={resetViewFilters}>Réinitialiser les filtres</button>
            </div>
          ) : null}

          <details className="mt-6 rounded-surface border border-line bg-surface-inset p-3 xl:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-black text-domain-foreground">
              <span className="inline-flex items-center gap-2"><BarChart3 size={18} /> Statistiques de données</span>
              <span className="text-xs text-accent-text">Afficher</span>
            </summary>
            <div className="mt-3"><CollectionStats stats={stats} /></div>
          </details>
        </>
      ) : (
        <div className="grid min-h-56 place-items-center rounded-surface border border-dashed border-line bg-surface-inset p-5 text-center">
          <div>
            <Sparkles className="mx-auto mb-3 text-cyan-200" size={30} />
            <h3 className="type-title-subsection text-domain-foreground">Crée ta première checklist</h3>
            <p className="mt-2 text-sm font-bold text-muted">Les Pokémon sortis et leurs assets canoniques seront ajoutés automatiquement.</p>
            <button className={`${primaryButtonClass} mt-4`} type="button" onClick={() => setSheet("create")}><Sparkles size={17} /> Nouvelle collection</button>
          </div>
        </div>
      )}

      <Sheet open={sheet === "collections"} title="Mes collections" description={`${collections.length} collection(s)`} onClose={closeSheet} size="sm">
        <div className="grid gap-2">
          {collections.map((collection) => (
            <button className={`w-full min-w-0 overflow-hidden rounded-control border p-3 text-left transition ${activeCollection?.id === collection.id ? "border-cyan-200/55 bg-cyan-400/18" : "border-line bg-surface-flat hover:bg-surface-hover"}`} key={collection.id} type="button" title={collection.name} data-testid="collection-option" onClick={() => { setActiveId(collection.id); closeSheet(); }}>
              <span className="flex min-w-0 items-center justify-between gap-3"><strong className="min-w-0 flex-1 truncate text-domain-foreground">{collection.name}</strong><small className="shrink-0 rounded-full bg-surface-emphasis px-2 py-1 type-label text-foreground">{collection.shiny ? "SHINY" : "STANDARD"}</small></span>
              <small className="mt-1 block truncate font-bold text-muted">{typeLabel(collection.type)} · {variantModeLabel(collection.variantMode)}{collection.includeGenderVariants ? " · Sexe" : ""}{collection.hundo ? " · Hundo" : ""}</small>
            </button>
          ))}
          {!collections.length ? <EmptyState title="Aucune collection" /> : null}
        </div>
      </Sheet>

      <Sheet open={sheet === "region"} title="Région / génération" description={`Filtre actuel : ${generationLabels[region]}`} onClose={closeSheet} size="sm">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {collectionRegionFilters.map(([id, label, icon]) => (
            <button className={`min-h-20 rounded-control border p-3 text-left ${region === id ? "border-cyan-200/55 bg-cyan-400/18" : "border-line bg-surface-flat"}`} key={id} type="button" onClick={() => { setRegion(id); closeSheet(); }} aria-pressed={region === id}>
              <span className="flex items-center justify-between gap-2"><strong className="text-domain-foreground">{label}</strong>{icon ? <Image src={icon} alt="" width={40} height={40} className="h-10 w-10 object-contain opacity-70" unoptimized /> : <LayoutDashboard size={22} className="text-muted" />}</span>
            </button>
          ))}
        </div>
      </Sheet>

      <Sheet
        open={sheet === "search"}
        title="Rechercher"
        description="Nom français ou anglais, numéro, forme, costume ou catégorie."
        onClose={closeSheet}
        size="sm"
        footer={<button className={`${primaryButtonClass} w-full`} type="button" onClick={closeSheet}>Afficher {formatCount(collectionEntries.length)} Pokémon</button>}
      >
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-disabled" size={17} />
          <input aria-label="Rechercher dans la collection..." className={`${fieldClass} pl-10`} placeholder="Rechercher nom, dex, forme…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      </Sheet>

      <Sheet
        open={sheet === "filters"}
        title="Filtres de la checklist"
        description={`${activeFilterCount} filtre(s) actif(s)`}
        onClose={closeSheet}
        footer={<button className={`${primaryButtonClass} w-full`} type="button" onClick={closeSheet}>Afficher {formatCount(allMatching.length)} Pokémon</button>}
      >
        {activeCollection ? <div className="space-y-6">
          <div>
            <h4 className="mb-3 type-overline text-muted">Type de collection</h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {collectionTypes.map(([id, label, icon]) => (
                <button className={`min-h-20 rounded-control border p-4 text-center ${activeCollection.type === id ? "border-cyan-200/55 bg-cyan-400/18" : "border-line bg-surface-flat"}`} key={id} type="button" onClick={() => updateActive({ type: id })} aria-pressed={activeCollection.type === id}>
                  <Image className="mx-auto mb-1 h-8 w-8 object-contain" src={icon} alt="" width={32} height={32} unoptimized /><strong className="text-sm text-domain-foreground">{label}</strong>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 type-overline text-muted">Mode Pokédex</h4>
            <div className="grid grid-cols-2 gap-3">
              {collectionVariantModes.map(([id, label]) => <button className={`min-h-12 rounded-control border px-3 font-black ${activeCollection.variantMode === id ? "border-cyan-200/55 bg-cyan-400/18 text-domain-foreground" : "border-line bg-surface-flat text-muted"}`} key={id} type="button" onClick={() => updateActive({ variantMode: id })}>{label}</button>)}
            </div>
          </div>
          <div>
            <h4 className="mb-3 type-overline text-muted">Caractéristiques</h4>
            <div className="grid gap-3">
            {[["shiny", "Chromatique", "Remplace la checklist par les seules entrées shiny sorties."], ["includeGenderVariants", "Sexe", "Inclure les différences visuelles mâle / femelle lorsqu'elles existent."], ["hundo", "Hundo 100 %", "Caractéristique orthogonale, sans modifier l’asset."]].map(([id, label, detail]) => (
              <label className="flex items-center justify-between gap-4 rounded-control border border-line bg-surface-flat p-4" key={id}>
                <span><strong className="block text-domain-foreground">{label}</strong><small className="mt-1 block font-semibold text-muted">{detail}</small></span>
                <Checkbox checked={Boolean(activeCollection[id])} onChange={(event) => updateActive({ [id]: event.target.checked })} />
              </label>
            ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 type-overline text-muted">Région / génération</h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {collectionRegionFilters.map(([id, label, icon]) => (
                <button className={`min-h-16 rounded-control border p-3 text-left ${region === id ? "border-cyan-200/55 bg-cyan-400/18" : "border-line bg-surface-flat"}`} key={id} type="button" onClick={() => setRegion(id)} aria-pressed={region === id}>
                  <span className="flex items-center justify-between gap-2"><strong className="text-sm text-domain-foreground">{label}</strong>{icon ? <Image src={icon} alt="" width={32} height={32} className="h-8 w-8 object-contain opacity-70" unoptimized /> : <LayoutDashboard size={20} className="text-muted" />}</span>
                </button>
              ))}
            </div>
          </div>
          <button className={secondaryButtonClass} type="button" onClick={() => { updateActive({ type: "normal", variantMode: "single", includeGenderVariants: false, shiny: false, hundo: false }); resetViewFilters(); }}>Réinitialiser</button>
        </div> : null}
      </Sheet>

      <Sheet open={sheet === "actions"} title="Actions de la collection" description={activeCollection?.name} onClose={closeSheet} size="sm">
        {activeCollection ? <div className="space-y-4">
          <label className="block"><span className="mb-2 block type-overline text-muted">Renommer</span><input className={fieldClass} value={activeCollection.name} onChange={(event) => updateActive({ name: event.target.value })} /></label>
          <div className="grid gap-2 sm:grid-cols-2">
            <button className={secondaryButtonClass} type="button" onClick={() => selectEntries(collectionEntries)}>Sélectionner tous les résultats</button>
            <button className={secondaryButtonClass} type="button" onClick={() => deselectEntries(collectionEntries)}>Désélectionner tous les résultats</button>
            <button className={`${secondaryButtonClass} border-rose-300/30 text-danger`} type="button" onClick={deleteActive}><Trash2 size={17} /> {deleteConfirmation ? "Confirmer la suppression" : "Supprimer"}</button>
          </div>
          {deleteConfirmation ? <p className="rounded-control border border-rose-300/25 bg-rose-400/10 p-3 text-sm font-bold text-danger">Cette action supprime uniquement cette collection après confirmation. Les autres collections restent intactes.</p> : null}
          {activeCollection.migration ? <p className="rounded-control border border-line bg-surface-flat p-3 type-caption-strong text-muted">Migration : {activeCollection.migration.mapped} mappée(s) · {activeCollection.migration.unmapped} historique(s) conservée(s) · {activeCollection.migration.ambiguous} ambiguë(s).</p> : null}
        </div> : null}
      </Sheet>

      <Sheet
        open={sheet === "create"}
        title="Nouvelle collection"
        description="Le compteur se met à jour depuis les données canoniques sorties."
        onClose={closeSheet}
        footer={<button className={`${primaryButtonClass} w-full`} type="button" onClick={createCollection}>Créer la collection · {formatCount(draftCount)} Pokémon</button>}
      >
        <div className="space-y-5">
          <div>
            <h4 className="mb-2 type-overline text-muted">Type de collection</h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {collectionTypes.map(([id, label, icon]) => (
                <button className={`min-h-20 rounded-control border p-3 text-center ${draft.type === id ? "border-emerald-200/55 bg-emerald-400/18" : "border-line bg-surface-flat"}`} key={id} type="button" onClick={() => setDraft((current) => ({ ...current, type: id }))} aria-pressed={draft.type === id}>
                  <Image className="mx-auto mb-1 h-8 w-8 object-contain" src={icon} alt="" width={32} height={32} unoptimized /><strong className="text-sm text-domain-foreground">{label}</strong>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 type-overline text-muted">Mode Pokédex</h4>
            <div className="grid grid-cols-2 gap-2">{collectionVariantModes.map(([id, label]) => <button className={`min-h-12 rounded-control border px-3 font-black ${draft.variantMode === id ? "border-cyan-200/55 bg-cyan-400/18 text-domain-foreground" : "border-line bg-surface-flat text-muted"}`} key={id} type="button" onClick={() => setDraft((current) => ({ ...current, variantMode: id }))}>{label}</button>)}</div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[["shiny", "Chromatique", "Afficher uniquement les entrées chromatiques sorties."], ["includeGenderVariants", "Sexe", "Inclure les différences visuelles mâle / femelle lorsqu'elles existent."], ["hundo", "Hundo 100 %", "Suivre la caractéristique 100 % sans changer l’asset."]].map(([id, label, detail]) => <label className="flex items-center justify-between gap-4 rounded-control border border-line bg-surface-flat p-4 text-domain-foreground" key={id}><span><strong className="block">{label}</strong><small className="mt-1 block font-semibold text-muted">{detail}</small></span><Checkbox checked={Boolean(draft[id])} onChange={(event) => setDraft((current) => ({ ...current, [id]: event.target.checked }))} /></label>)}
          </div>
          <label className="block"><span className="mb-2 block type-overline text-muted">Nom de la collection</span><input className={fieldClass} value={draft.name} placeholder="ex. Shiny Shadow Kanto" onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} /></label>
        </div>
      </Sheet>
    </section>
  );
}
