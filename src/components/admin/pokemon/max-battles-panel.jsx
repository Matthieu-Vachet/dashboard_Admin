"use client";

import { Download, RefreshCcw, RotateCcw, Sparkles, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { TypeIcons } from "./asset-icons";
import { AssetStatCard, Panel } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { TierSection } from "./tier-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PokemonArtwork } from "./pokemon-artwork";
import { useAdminPokemonSearch } from "./admin-pokemon-search-context";
import { FetchLoadingState } from "@/components/admin/shared/state-system";

function values(data) {
  return Array.isArray(data) ? data : [];
}

function totalBattles(currentMaxBattle) {
  return Object.values(currentMaxBattle || {}).reduce((total, pokemon) => total + values(pokemon).length, 0);
}

function sortedTierEntries(currentMaxBattle) {
  return Object.entries(currentMaxBattle || {}).sort(([left], [right]) => {
    const leftTier = Number(left.match(/\d+/)?.[0] || 99);
    const rightTier = Number(right.match(/\d+/)?.[0] || 99);
    return leftTier - rightTier || left.localeCompare(right);
  });
}

function toneForTier(id) {
  const tier = Number(String(id).match(/\d+/)?.[0] || 1);
  if (tier >= 5) return "red";
  if (tier === 4) return "violet";
  if (tier === 3) return "amber";
  if (tier === 2) return "green";
  return "cyan";
}

function MaxPill({ children, tone = "" }) {
  return (
    <Badge className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black border-current bg-transparent text-inherit ${tone}`}>
      {children}
    </Badge>
  );
}

function MaxBattleCard({ pokemon, onOpenPokemon, typeCatalog = [] }) {
  const name = pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon inconnu";
  const english = pokemon.names?.English && pokemon.names.English !== name ? pokemon.names.English : null;
  const sourceName = pokemon.sourceName && ![name, english].filter(Boolean).includes(pokemon.sourceName) ? pokemon.sourceName : null;
  const cp = pokemon.cpRange?.length === 2 ? `${pokemon.cpRange[0]} - ${pokemon.cpRange[1]}` : pokemon.cpRange?.[0] || "n/a";
  const canOpen = Boolean(onOpenPokemon && !pokemon.unmatched);

  return (
    <button
      className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-slate-950/38 text-left shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35 disabled:cursor-default"
      type="button"
      disabled={!canOpen}
      onClick={() => canOpen && onOpenPokemon(pokemon)}
    >
      <div className="relative grid min-h-[152px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,.2),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.9),rgba(30,64,175,.58))] p-4">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:24px_24px]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-sky-100/25 bg-sky-300/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-50">
          <Zap size={12} /> {pokemon.tier || "Max"}
        </span>
        {pokemon.shiny ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-100/25 bg-amber-300/18 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-50">
            <Sparkles size={12} /> Shiny
          </span>
        ) : null}
        {pokemon.unmatched ? (
          <span className="absolute bottom-3 right-3 rounded-full border border-red-200/30 bg-red-400/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50">
            Non matché
          </span>
        ) : null}
        <PokemonArtwork pokemon={pokemon} alt={name} className="relative z-10 h-28 w-28 border-0 bg-transparent drop-shadow-[0_18px_34px_rgba(0,0,0,.38)]" />
      </div>
      <div className="space-y-3 border-t border-line p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black text-domain-foreground">{name}</h3>
          {english ? <p className="truncate text-xs font-bold text-muted">{english}</p> : null}
          {sourceName ? <p className="mt-1 truncate text-[11px] font-bold text-cyan-100/65">Source : {sourceName}</p> : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TypeIcons types={pokemon.types} catalog={typeCatalog} />
          {pokemon.form ? <MaxPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{pokemon.form}</MaxPill> : null}
          {pokemon.costume ? <MaxPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{pokemon.costume}</MaxPill> : null}
          {pokemon.maxForm ? <MaxPill tone="border-violet-200/25 bg-violet-400/12 text-violet-50">{pokemon.maxForm}</MaxPill> : null}
          {pokemon.assets?.sourceImage ? <MaxPill tone="border-emerald-200/20 bg-emerald-400/10 text-emerald-50">Asset source</MaxPill> : null}
        </div>
        <p className="rounded-2xl border border-line bg-surface-subtle p-3 text-sm font-black text-foreground">
          <small className="block text-[10px] uppercase tracking-[0.16em] text-disabled">CP Max Battle</small>
          {cp}
        </p>
      </div>
    </button>
  );
}

function MaxBattleSection({ id, pokemon, onOpenPokemon, typeCatalog = [] }) {
  return (
    <TierSection
      id="max battle"
      title={id}
      image="/ui/max_battles/max-battles.webp"
      count={pokemon.length}
      tone={toneForTier(id)}
      defaultOpen={false}
      emptyText="Aucun boss dans ce tier."
    >
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {pokemon.map((item) => (
            <MaxBattleCard
              key={`${id}-${item.form || item.id || item.sourceName}-${item.costume || "standard"}`}
              pokemon={item}
              onOpenPokemon={onOpenPokemon}
              typeCatalog={typeCatalog}
            />
          ))}
        </div>
    </TierSection>
  );
}

export function MaxBattlesPanel({
  maxBattles,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
  typeCatalog = [],
}) {
  const { combineWith } = useAdminPokemonSearch();
  const [query, setQuery] = useState("");
  const [shinyOnly, setShinyOnly] = useState(false);
  const [gigantamaxOnly, setGigantamaxOnly] = useState(false);
  const currentMaxBattle = useMemo(() => maxBattles?.data?.currentMaxBattle || maxBattles?.currentMaxBattle || {}, [maxBattles]);
  const buckets = maxBattles?.meta?.buckets || Object.fromEntries(
    Object.entries(currentMaxBattle).map(([key, pokemon]) => [key, values(pokemon).length]),
  );
  const total = totalBattles(currentMaxBattle);
  const tierEntries = useMemo(() => sortedTierEntries(currentMaxBattle), [currentMaxBattle]);
  const normalizedQuery = combineWith(query).toLocaleLowerCase("fr");
  const filteredTierEntries = useMemo(() => tierEntries.map(([id, pokemon]) => [id, values(pokemon).filter((entry) => {
    if (shinyOnly && !entry.shiny) return false;
    if (gigantamaxOnly && !String(entry.maxForm || entry.form || "").toLowerCase().includes("gigantamax")) return false;
    if (!normalizedQuery) return true;
    return [entry.sourceName, entry.id, entry.form, entry.maxForm, id, ...Object.values(entry.names || {}), ...values(entry.types)]
      .filter(Boolean).join(" ").toLowerCase().includes(normalizedQuery);
  })]), [gigantamaxOnly, normalizedQuery, shinyOnly, tierEntries]);
  const visibleTotal = filteredTierEntries.reduce((sum, [, pokemon]) => sum + pokemon.length, 0);

  return (
    <div className="space-y-5">
      <Panel
        title="Max Battles Pokémon GO"
        eyebrow="MongoDB + Snacknap"
        action={
          <div className="flex flex-wrap gap-2">
            <Button icon={<RefreshCcw size={17} />} loading={loading} loadingText="Chargement…" onClick={onRefresh} disabled={regenerating}>Actualiser</Button>
            <Button icon={<Download size={17} />} onClick={onDownload} disabled={!maxBattles?.current || !total || loading || regenerating}>Télécharger JSON</Button>
            <Button variant="primary" icon={<RotateCcw size={17} />} loading={regenerating} loadingText="Régénération…" onClick={onRegenerate} disabled={loading}>Régénérer Max</Button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Boss Max" value={total} icon="/ui/max_battles/max-battles.webp" tone="cyan" detail="Tous tiers actifs" />
          <AssetStatCard label="Tier 1" value={buckets.Tier1 || 0} icon="/ui/max_battles/max-battles.webp" tone="green" detail="Difficulté 1" />
          <AssetStatCard label="Tier 2" value={buckets.Tier2 || 0} icon="/ui/max_battles/max-battles.webp" tone="violet" detail="Difficulté 2" />
          <AssetStatCard label="Tier 3+" value={Object.entries(buckets).reduce((sum, [key, value]) => sum + (Number(key.match(/\d+/)?.[0] || 0) >= 3 ? value : 0), 0)} icon="/ui/max_battles/ic_shiny.png" tone="amber" detail="Tiers élevés" />
        </div>
        <DatasetSourceHeader dataset={maxBattles} total={total} refreshError={refreshError} />
      </Panel>

      <DatasetFilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Rechercher Pokémon, type, forme Max ou tier..."
        resultCount={visibleTotal}
        totalCount={total}
        toggles={[
          { id: "shiny", label: "Shiny", active: shinyOnly, onClick: () => setShinyOnly((value) => !value), icon: <Sparkles size={15} /> },
          { id: "gigantamax", label: "Gigamax", active: gigantamaxOnly, onClick: () => setGigantamaxOnly((value) => !value), icon: <Zap size={15} /> },
        ]}
      />

      {loading && !total ? (
        <FetchLoadingState title="Chargement des Max Battles…" detail="Lecture des Max Battles MongoDB en cours." />
      ) : null}

      <div className="space-y-4">
        {filteredTierEntries.map(([id, pokemon]) => (
          <MaxBattleSection
            key={`${id}-${pokemon.length > 0 ? "active" : "empty"}`}
            id={id}
            pokemon={values(pokemon)}
            onOpenPokemon={onOpenPokemon}
            typeCatalog={typeCatalog}
          />
        ))}
      </div>
    </div>
  );
}
