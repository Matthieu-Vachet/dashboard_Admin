"use client";

import { Download, Eye, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { TypeIcons, WeatherIcons } from "./asset-icons";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetEventBanner } from "./dataset-event-banner";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { TierSection } from "./tier-section";
import { Badge } from "@/components/ui/badge";
import { PokemonArtwork } from "./pokemon-artwork";
import { useAdminPokemonSearch } from "./admin-pokemon-search-context";

const raidSections = [
  ["super_mega", "Super Méga", "/ui/raids/mega_raids_legendaire_raids.png", "violet"],
  ["ultra_beast", "Ultra Beast", "/ui/raids/ultra_breche_raids.png", "cyan"],
  ["mega", "Méga", "/ui/raids/mega_raids.png", "violet"],
  ["primal", "Primal", "/ui/raids/primal_raids.png", "red"],
  ["lvl5", "5 étoiles", "/ui/raids/5_star_raids.png", "amber"],
  ["lvl3", "3 étoiles", "/ui/raids/3_star_raids.png", "green"],
  ["lvl1", "1 étoile", "/ui/raids/1_star_raids.png", "blue"],
  ["shadow_lvl5", "Shadow 5 étoiles", "/ui/raids/shadow_icon.png", "red"],
  ["shadow_lvl3", "Shadow 3 étoiles", "/ui/raids/teamrocket_r.png", "red"],
  ["shadow_lvl1", "Shadow 1 étoile", "/ui/raids/teamrocket_r.png", "red"],
  ["special", "Raids spéciaux", "/ui/raids/elite_raids.png", "green"],
];

const knownRaidSections = new Set(raidSections.map(([id]) => id));

function values(data) {
  return Array.isArray(data) ? data : [];
}

function totalRaids(currentList) {
  return Object.values(currentList || {}).reduce((total, bosses) => total + values(bosses).length, 0);
}

function titleFromKey(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/\blvl\b/gi, "niveau")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function allRaidSections(currentList) {
  const unknown = Object.entries(currentList || {})
    .filter(([id]) => !knownRaidSections.has(id))
    .map(([id, bosses]) => [
      id,
      values(bosses)[0]?.sectionTitle || titleFromKey(id),
      "/ui/raids/elite_raids.png",
      "cyan",
    ]);
  return [...raidSections, ...unknown];
}

function RaidPill({ children, tone = "" }) {
  return (
    <Badge className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black border-current bg-transparent text-inherit ${tone}`}>
      {children}
    </Badge>
  );
}

function RaidCard({ boss, onOpenPokemon, typeCatalog = [], weatherCatalog = [] }) {
  const name = boss.names?.French || boss.names?.English || boss.sourceName || boss.id || "Boss inconnu";
  const english = boss.names?.English && boss.names.English !== name ? boss.names.English : null;
  const cp = boss.cpRange?.length === 2 ? `${boss.cpRange[0]} - ${boss.cpRange[1]}` : "n/a";
  const boosted = boss.cpRangeBoost?.length === 2 ? `${boss.cpRangeBoost[0]} - ${boss.cpRangeBoost[1]}` : "n/a";
  const counters = Object.entries(boss.counter || {}).slice(0, 4);
  const canOpen = Boolean(onOpenPokemon && !boss.unmatched);
  const sourceName = boss.sourceName && ![name, english].filter(Boolean).includes(boss.sourceName) ? boss.sourceName : null;
  const habitat = typeof boss.habitat === "string"
    ? boss.habitat
    : boss.habitat?.name || boss.rotation?.name;
  const rotation = boss.rotation?.label || (
    boss.rotation?.startsAt || boss.rotation?.endsAt
      ? `${boss.rotation?.startsAt || "?"} – ${boss.rotation?.endsAt || "?"}${boss.rotation?.timezoneMode ? ` (${boss.rotation.timezoneMode})` : ""}`
      : null
  );

  return (
    <button
      className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/38 text-left shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35 disabled:cursor-default"
      type="button"
      disabled={!canOpen}
      onClick={() => canOpen && onOpenPokemon(boss)}
    >
      <div className="relative grid min-h-[150px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_15%,rgba(34,211,238,.18),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.88),rgba(8,47,73,.68))] p-4">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:24px_24px]" />
        {boss.shiny ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-100/25 bg-amber-300/18 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-50">
            <Sparkles size={12} /> Shiny
          </span>
        ) : null}
        {boss.unmatched ? (
          <span className="absolute right-3 top-3 rounded-full border border-red-200/30 bg-red-400/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50">
            Non matché
          </span>
        ) : null}
        <PokemonArtwork pokemon={boss} alt={name} className="relative z-10 h-28 w-28 border-0 bg-transparent drop-shadow-[0_18px_34px_rgba(0,0,0,.38)]" />
      </div>
      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black text-white">{name}</h3>
          {english ? <p className="truncate text-xs font-bold text-slate-400">{english}</p> : null}
          {sourceName ? <p className="mt-1 line-clamp-2 text-[11px] font-bold text-cyan-100/65">Source : {sourceName}</p> : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TypeIcons types={boss.types} catalog={typeCatalog} />
          {boss.form ? <RaidPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{boss.form}</RaidPill> : null}
          {boss.costume ? <RaidPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{boss.costume}</RaidPill> : null}
          {boss.assets?.sourceImage ? <RaidPill tone="border-emerald-200/20 bg-emerald-400/10 text-emerald-50">Asset source</RaidPill> : null}
          {boss.raidType ? <RaidPill tone="border-white/10 bg-white/[0.06] text-slate-200">{boss.raidType}</RaidPill> : null}
        </div>
        <div className="grid gap-2 text-xs font-bold text-slate-300 sm:grid-cols-2">
          <span className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">CP</small>
            {cp}
          </span>
          <span className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Boost météo</small>
            {boosted}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold leading-5 text-slate-400">
          <span>Météo</span>
          <WeatherIcons weather={boss.weather} catalog={weatherCatalog} />
          {!values(boss.weather).length ? <span>n/a</span> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold leading-5 text-slate-400">
          <span>Faiblesses</span>
          {counters.length ? counters.map(([type, multiplier]) => (
            <span className="inline-flex items-center gap-1" key={type}>
              <TypeIcons types={[type]} catalog={typeCatalog} size="sm" />
              <span>x{multiplier}</span>
            </span>
          )) : <span>n/a</span>}
        </div>
        {habitat || rotation ? (
          <div className="rounded-2xl border border-violet-200/18 bg-violet-400/10 p-3 text-xs font-bold leading-5 text-violet-50">
            <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-violet-100/60">Habitat / rotation</span>
            {habitat ? <span className="block">{habitat}</span> : null}
            {rotation && rotation !== habitat ? <span className="block text-violet-100/68">{rotation}</span> : null}
          </div>
        ) : null}
        {boss.note ? <p className="text-xs font-bold leading-5 text-cyan-100/80">{boss.note}</p> : null}
      </div>
    </button>
  );
}

function RaidSection({ id, title, image, tone, bosses, onOpenPokemon, typeCatalog = [], weatherCatalog = [] }) {
  return (
    <TierSection
      id={id}
      title={title}
      image={image}
      count={bosses.length}
      tone={tone}
      defaultOpen={false}
      emptyText="Aucun boss dans cette section."
    >
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {bosses.map((boss) => (
            <RaidCard
              key={`${id}-${boss.form || boss.id || boss.sourceName}-${boss.rotation?.name || "current"}-${boss.rotation?.startsAt || ""}`}
              boss={boss}
              onOpenPokemon={onOpenPokemon}
              typeCatalog={typeCatalog}
              weatherCatalog={weatherCatalog}
            />
          ))}
        </div>
    </TierSection>
  );
}

export function RaidsPanel({
  raids,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
  typeCatalog = [],
  weatherCatalog = [],
}) {
  const { combineWith } = useAdminPokemonSearch();
  const [query, setQuery] = useState("");
  const [shinyOnly, setShinyOnly] = useState(false);
  const [unmatchedOnly, setUnmatchedOnly] = useState(false);
  const currentList = useMemo(() => raids?.data?.currentList || raids?.currentList || {}, [raids]);
  const buckets = raids?.meta?.buckets || Object.fromEntries(
    Object.entries(currentList).map(([key, bosses]) => [key, values(bosses).length]),
  );
  const total = totalRaids(currentList);
  const openBugs = values(currentList.shadow_lvl5).length + values(currentList.shadow_lvl3).length + values(currentList.shadow_lvl1).length;
  const sections = useMemo(() => allRaidSections(currentList), [currentList]);
  const normalizedQuery = combineWith(query).toLocaleLowerCase("fr");
  const filteredSections = useMemo(() => sections.map((section) => {
    const [id] = section;
    const bosses = values(currentList[id]).filter((boss) => {
      if (shinyOnly && !boss.shiny) return false;
      if (unmatchedOnly && !boss.unmatched) return false;
      if (!normalizedQuery) return true;
      return [boss.sourceName, boss.id, boss.form, boss.costume, boss.sectionTitle, boss.rotation?.name, ...Object.values(boss.names || {}), ...values(boss.types)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
    return [...section, bosses];
  }), [currentList, normalizedQuery, sections, shinyOnly, unmatchedOnly]);
  const visibleTotal = filteredSections.reduce((sum, section) => sum + section[4].length, 0);
  const sourceEvent = raids?.meta?.event || raids?.current?.source?.event;

  return (
    <div className="space-y-5">
      <Panel
        title="Raids Pokémon GO"
        eyebrow="MongoDB + LeekDuck"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading || regenerating}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!raids?.current || !total || loading || regenerating}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={loading || regenerating}>
              <RotateCcw size={17} /> {regenerating ? "Régénération..." : "Régénérer raids"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Boss actifs" value={total} icon="/ui/raids/5_star_raids.png" tone="cyan" detail="Toutes sections raids" />
          <AssetStatCard label="Méga" value={buckets.mega || 0} icon="/ui/raids/mega_raids.png" tone="violet" detail="Raids Méga actifs" />
          <AssetStatCard label="Shadow" value={openBugs} icon="/ui/raids/teamrocket_r.png" tone="amber" detail="Raids obscurs" />
          <AssetStatCard label="Ultra Beast" value={buckets.ultra_beast || 0} icon="/ui/raids/ultra_breche_raids.png" tone="green" detail="Ultra-brèches" />
        </div>
        <DatasetSourceHeader dataset={raids} total={total} refreshError={refreshError} />
      </Panel>

      <DatasetEventBanner event={sourceEvent} />

      <DatasetFilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Rechercher boss, type, forme, costume ou habitat..."
        resultCount={visibleTotal}
        totalCount={total}
        toggles={[
          { id: "shiny", label: "Shiny", active: shinyOnly, onClick: () => setShinyOnly((value) => !value), icon: <Sparkles size={15} /> },
          { id: "unmatched", label: "Non matchés", active: unmatchedOnly, onClick: () => setUnmatchedOnly((value) => !value), icon: <Eye size={15} /> },
        ]}
      />

      {loading && !total ? (
        <Panel title="Chargement des raids">
          <p className="font-bold text-slate-300">Lecture des raids MongoDB en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {filteredSections.map(([id, title, image, tone, bosses]) => (
          <RaidSection
            key={`${id}-${bosses.length > 0 ? "active" : "empty"}`}
            id={id}
            title={title}
            image={image}
            tone={tone}
            bosses={bosses}
            onOpenPokemon={onOpenPokemon}
            typeCatalog={typeCatalog}
            weatherCatalog={weatherCatalog}
          />
        ))}
      </div>
    </div>
  );
}
