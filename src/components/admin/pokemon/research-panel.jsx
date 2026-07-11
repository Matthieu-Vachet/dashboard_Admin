"use client";

import { useState } from "react";
import { ChevronDown, Download, Package, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { CurrentDatasetDiagnostics } from "./current-dataset-diagnostics";
import { uiAssets } from "@/components/site/ui-assets";

const sectionLabels = {
  fieldResearch: "Field Research",
  eventResearch: "Event Research",
  timedResearch: "Timed Research",
  specialResearch: "Special Research",
};

const sectionTones = {
  fieldResearch: "border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]",
  eventResearch: "border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]",
  timedResearch: "border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]",
  specialResearch: "border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]",
};

const taskCategoryTones = {
  fieldResearch: "border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]",
  eventResearch: "border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]",
  timedResearch: "border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]",
  specialResearch: "border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]",
};

const typeIconMap = {
  Normal: "/ui/Types/ico_0_normal.png",
  Fighting: "/ui/Types/ico_1_fighting.png",
  Flying: "/ui/Types/ico_2_flying.png",
  Poison: "/ui/Types/ico_3_poison.png",
  Ground: "/ui/Types/ico_4_ground.png",
  Rock: "/ui/Types/ico_5_rock.png",
  Bug: "/ui/Types/ico_6_bug.png",
  Ghost: "/ui/Types/ico_7_ghost.png",
  Steel: "/ui/Types/ico_8_steel.png",
  Fire: "/ui/Types/ico_9_fire.png",
  Water: "/ui/Types/ico_10_water.png",
  Grass: "/ui/Types/ico_11_grass.png",
  Electric: "/ui/Types/ico_12_electric.png",
  Psychic: "/ui/Types/ico_13_psychic.png",
  Ice: "/ui/Types/ico_14_ice.png",
  Dragon: "/ui/Types/ico_15_dragon.png",
  Dark: "/ui/Types/ico_16_dark.png",
  Fairy: "/ui/Types/ico_17_fairy.png",
};

function values(data) {
  return Array.isArray(data) ? data : [];
}

function textKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function itemList(itemsReference) {
  return values(itemsReference?.data?.items || itemsReference?.items);
}

function itemTerms(item) {
  return [
    item.id,
    item.itemId,
    item.templateId,
    item.assetKey,
    ...Object.values(item.names || {}),
  ].map(textKey).filter(Boolean);
}

function findItemReference(reward, items) {
  const idCandidates = [reward?.id, reward?.itemId, reward?.templateId, reward?.assetKey].map(textKey).filter(Boolean);
  const nameCandidates = [reward?.name, reward?.sourceName, reward?.names?.English].map(textKey).filter(Boolean);
  const frenchCandidates = [reward?.names?.French].map(textKey).filter(Boolean);
  const exactId = items.find((item) =>
    idCandidates.some((candidate) =>
      [item.id, item.itemId, item.templateId, item.assetKey].map(textKey).includes(candidate),
    ),
  );
  if (exactId) return exactId;
  const exactEnglish = items.find((item) =>
    nameCandidates.some((candidate) => textKey(item.names?.English) === candidate),
  );
  if (exactEnglish) return exactEnglish;
  const exactFrench = items.find((item) =>
    frenchCandidates.some((candidate) => textKey(item.names?.French) === candidate),
  );
  if (exactFrench) return exactFrench;
  const candidates = [...idCandidates, ...nameCandidates, ...frenchCandidates];
  if (!candidates.length) return null;
  return items.find((item) => {
    const terms = itemTerms(item);
    return candidates.some((candidate) => terms.includes(candidate));
  }) || null;
}

function totalTasks(currentResearchList) {
  return Object.values(currentResearchList || {}).reduce((total, tasks) => total + values(tasks).length, 0);
}

function rewardsOf(task) {
  return values(task.rewards).length ? values(task.rewards) : task.reward ? [{ rewardType: task.rewardType, reward: task.reward }] : [];
}

function typeIcon(type) {
  const label = String(type || "");
  return typeIconMap[label] || typeIconMap[label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()];
}

function TypeIcons({ types }) {
  const list = values(types);
  if (!list.length) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {list.map((type) => {
        const icon = typeIcon(type);
        return icon ? (
          <span key={type} className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-slate-950/35 p-1" title={type}>
            <img className="h-full w-full object-contain" src={icon} alt={type} loading="lazy" />
          </span>
        ) : (
          <span key={type} className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-black text-white">
            {type}
          </span>
        );
      })}
    </span>
  );
}

function Badge({ children, tone = "border-white/10 bg-white/[0.07] text-white" }) {
  return (
    <span className={`inline-flex min-h-7 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${tone}`}>
      {children}
    </span>
  );
}

function PokemonReward({ reward }) {
  const name = reward.names?.French || reward.names?.English || reward.sourceName || reward.id || "Pokemon";
  const cp = reward.cpRange?.length === 2 ? `${reward.cpRange[0]} - ${reward.cpRange[1]}` : null;

  return (
    <article className="grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border border-cyan-200/14 bg-cyan-400/8 p-3">
      <span className="grid h-[72px] w-[72px] place-items-center rounded-2xl border border-white/10 bg-slate-950/38 p-2">
        <img
          className="max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,.36)]"
          src={reward.assets?.image || reward.assets?.shinyImage || uiAssets.icons.pokemon}
          alt={name}
          loading="lazy"
        />
      </span>
      <span className="min-w-0 space-y-2">
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <strong className="truncate text-sm font-black text-white">{name}</strong>
          {reward.shiny ? (
            <Badge tone="border-amber-200/25 bg-amber-300/16 text-amber-50">
              <Sparkles size={11} /> Shiny
            </Badge>
          ) : null}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <TypeIcons types={reward.types} />
          {cp ? <Badge tone="border-cyan-200/25 bg-cyan-400/14 text-cyan-50">CP {cp}</Badge> : null}
          {reward.unmatched ? <Badge tone="border-red-200/30 bg-red-400/16 text-red-50">Non matché</Badge> : null}
        </span>
      </span>
    </article>
  );
}

function ItemReward({ reward, items }) {
  const item = findItemReference(reward, items);
  const name = item?.names?.French || item?.names?.English || reward.name || reward.id || "Item";
  const english = item?.names?.English && item.names.English !== name ? item.names.English : null;
  const src = item?.asset || reward.asset || null;

  return (
    <article className="grid min-w-0 grid-cols-[64px_minmax(0,1fr)] gap-3 rounded-2xl border border-amber-200/16 bg-amber-400/9 p-3">
      <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-amber-100/18 bg-slate-950/40 p-2">
        {src ? <img className="h-11 max-h-11 w-11 max-w-11 object-contain" src={src} alt={name} loading="lazy" /> : <Package className="text-amber-100" size={24} />}
      </span>
      <span className="min-w-0">
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <strong className="truncate text-sm font-black text-white">{name}</strong>
          {reward.quantity ? <Badge tone="border-amber-200/25 bg-amber-300/16 text-amber-50">x{reward.quantity}</Badge> : null}
        </span>
        {english ? <span className="mt-1 block truncate text-xs font-bold text-slate-400">{english}</span> : null}
        {item?.id ? <span className="mt-1 block truncate font-mono text-[10px] font-black uppercase text-amber-100/62">{item.id}</span> : null}
      </span>
    </article>
  );
}

function RewardCard({ entry, items }) {
  if (entry.rewardType === "pokemon") return <PokemonReward reward={entry.reward || {}} />;
  return <ItemReward reward={entry.reward || {}} items={items} />;
}

function ResearchTask({ task, items, sectionId }) {
  const rewards = rewardsOf(task);
  const firstReward = rewards[0];
  const summaryReward =
    firstReward?.rewardType === "pokemon"
      ? firstReward.reward?.names?.French || firstReward.reward?.names?.English || firstReward.reward?.id
      : findItemReference(firstReward?.reward, items)?.names?.French || firstReward?.reward?.name;

  return (
    <details className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/36 open:border-cyan-200/18 open:bg-slate-950/48">
      <summary className="grid cursor-pointer list-none gap-3 p-4 marker:hidden sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <span className="min-w-0">
          <span className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone={taskCategoryTones[sectionId] || undefined}>{task.categoryTitle || task.category || "Research"}</Badge>
            {task.event?.name ? <Badge tone="border-orange-200/25 bg-orange-400/14 text-orange-50">{task.event.name}</Badge> : null}
            {rewards.length > 1 ? <Badge tone="border-cyan-200/25 bg-cyan-400/14 text-cyan-50">{rewards.length} rewards</Badge> : null}
          </span>
          <strong className="block text-base font-black leading-snug text-white">{task.task}</strong>
          {summaryReward ? <span className="mt-1 block truncate text-xs font-bold text-slate-400">{summaryReward}</span> : null}
        </span>
        <span className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-100/68 sm:justify-end">
          Détails
          <ChevronDown className="transition group-open:rotate-180" size={18} />
        </span>
      </summary>
      <div className="grid gap-3 border-t border-white/10 bg-black/18 p-3 md:grid-cols-2 2xl:grid-cols-3">
        {rewards.map((reward, index) => (
          <RewardCard key={`${task.task}-${reward.rewardType}-${index}`} entry={reward} items={items} />
        ))}
      </div>
    </details>
  );
}

function ResearchSection({ id, title, tasks, items, defaultOpen }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <details
      className={`group overflow-hidden rounded-3xl border ${sectionTones[id] || "border-white/10 bg-white/[0.04]"}`}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="grid cursor-pointer list-none gap-3 p-4 marker:hidden sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <span>
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/62">{id}</span>
          <span className="mt-1 block text-2xl font-black text-white">{title}</span>
        </span>
        <span className="inline-flex items-center gap-3 text-sm font-black text-white">
          <span className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5">{tasks.length}</span>
          <ChevronDown className="transition group-open:rotate-180" size={20} />
        </span>
      </summary>
      <div className="grid gap-3 border-t border-white/10 p-3 sm:p-4">
        {tasks.length ? (
          tasks.map((task, index) => <ResearchTask key={`${id}-${task.task}-${index}`} task={task} items={items} sectionId={id} />)
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
            Aucune quête dans cette section.
          </p>
        )}
      </div>
    </details>
  );
}

export function ResearchPanel({
  research,
  itemsReference,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
}) {
  const currentResearchList = research?.data?.currentResearchList || research?.currentResearchList || {};
  const items = itemList(itemsReference);
  const total = totalTasks(currentResearchList);
  const allTasks = Object.values(currentResearchList).flatMap(values);
  const allRewards = allTasks.flatMap(rewardsOf);
  const pokemonRewards = allRewards.filter((reward) => reward.rewardType === "pokemon").length;
  const itemRewards = allRewards.filter((reward) => reward.rewardType === "item").length;
  const sections = Object.entries(currentResearchList).map(([id, tasks]) => [
    id,
    sectionLabels[id] || id.replace(/([A-Z])/g, " $1"),
    values(tasks),
  ]);

  return (
    <div className="space-y-5">
      <Panel
        title="Research Pokémon GO"
        eyebrow="MongoDB + LeekDuck"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading || regenerating}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!research?.current || !total || loading || regenerating}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={loading || regenerating}>
              <RotateCcw size={17} /> {regenerating ? "Régénération..." : "Régénérer Research"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Quêtes" value={total} icon="/ui/Items/Item_1201.png" tone="cyan" detail="Toutes catégories" />
          <AssetStatCard label="Référentiel items" value={items.length} icon="/ui/Items/stardust_painted.png" tone="amber" detail="Catalogue des items" />
          <AssetStatCard label="Rewards Pokémon" value={pokemonRewards} icon={uiAssets.icons.pokemon} tone="green" detail="Référentiel Pokémon" />
          <AssetStatCard label="Rewards items" value={itemRewards} icon="/ui/Items/candy_rgb.png" tone="violet" detail="Match par nom/id" />
        </div>
        <CurrentDatasetDiagnostics dataset={research} total={total} refreshError={refreshError} />
      </Panel>

      {loading && !total ? (
        <Panel title="Chargement Research">
          <p className="font-bold text-slate-300">Lecture des quêtes MongoDB en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {sections.map(([id, title, tasks], index) => (
          <ResearchSection key={id} id={id} title={title} tasks={tasks} items={items} defaultOpen={index < 2} />
        ))}
      </div>
    </div>
  );
}
