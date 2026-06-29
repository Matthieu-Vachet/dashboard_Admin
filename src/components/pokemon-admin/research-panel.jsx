"use client";

import { CloudUpload, Download, Package, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { uiAssets } from "../site/ui-assets";

const researchSections = [
  ["eventResearch", "Événement", "orange", "bg-orange-400/14 border-orange-200/18 text-orange-50"],
  ["fieldResearch", "Terrain", "cyan", "bg-cyan-400/12 border-cyan-200/18 text-cyan-50"],
  ["specialResearch", "Spéciale", "violet", "bg-violet-400/12 border-violet-200/18 text-violet-50"],
  ["timedResearch", "Limitée", "green", "bg-emerald-400/12 border-emerald-200/18 text-emerald-50"],
];

const typeTone = {
  Normal: "bg-slate-400/22 text-slate-50 border-slate-200/25",
  Fire: "bg-orange-400/22 text-orange-50 border-orange-200/25",
  Water: "bg-sky-400/22 text-sky-50 border-sky-200/25",
  Grass: "bg-emerald-400/22 text-emerald-50 border-emerald-200/25",
  Electric: "bg-yellow-300/22 text-yellow-50 border-yellow-100/25",
  Ice: "bg-cyan-200/22 text-cyan-50 border-cyan-100/25",
  Fighting: "bg-red-400/22 text-red-50 border-red-200/25",
  Poison: "bg-purple-400/22 text-purple-50 border-purple-200/25",
  Ground: "bg-amber-500/22 text-amber-50 border-amber-200/25",
  Flying: "bg-indigo-300/22 text-indigo-50 border-indigo-100/25",
  Psychic: "bg-pink-400/22 text-pink-50 border-pink-200/25",
  Bug: "bg-lime-400/22 text-lime-50 border-lime-200/25",
  Rock: "bg-stone-400/22 text-stone-50 border-stone-200/25",
  Ghost: "bg-violet-500/22 text-violet-50 border-violet-200/25",
  Dragon: "bg-blue-500/22 text-blue-50 border-blue-200/25",
  Dark: "bg-zinc-500/22 text-zinc-50 border-zinc-200/25",
  Steel: "bg-slate-300/22 text-slate-50 border-slate-100/25",
  Fairy: "bg-fuchsia-300/22 text-fuchsia-50 border-fuchsia-100/25",
};

const itemAssets = [
  [/^poke ball$/i, "/ui/Items/pokeball_sprite.png"],
  [/^great ball$/i, "/ui/Items/greatball_sprite.png"],
  [/^ultra ball$/i, "/ui/Items/ultraball_sprite.png"],
  [/^stardust$/i, "/ui/Items/stardust_painted.png"],
  [/^rare candy$/i, "/ui/Items/candy_rgb.png"],
  [/^rare candy xl$/i, "/ui/Items/LV40_XLCandy_RGB_PSD.png"],
  [/^mysterious component$/i, "/ui/Items/Item_Leader_MapCompass.png"],
  [/^silver pinap berry$/i, "/ui/Items/Item_1406.png"],
  [/^pinap berry$/i, "/ui/Items/Item_1403.png"],
  [/^razz berry$/i, "/ui/Items/Item_1401.png"],
  [/^nanab berry$/i, "/ui/Items/Item_1402.png"],
  [/^golden razz berry$/i, "/ui/Items/Item_1404.png"],
  [/^fast tm$/i, "/ui/Items/Item_1201.png"],
  [/^charged tm$/i, "/ui/Items/Item_1202.png"],
  [/^sinnoh stone$/i, "/ui/Items/Bag_Sinnoh_Stone_Sprite.png"],
  [/^unova stone$/i, "/ui/Items/Bag_Unova_Stone_Sprite.png"],
  [/mega energy/i, "/ui/mega_energy/reward_mega_energy.png"],
];

function values(data) {
  return Array.isArray(data) ? data : [];
}

function totalTasks(currentResearchList) {
  return Object.values(currentResearchList || {}).reduce((total, tasks) => total + values(tasks).length, 0);
}

function rewardsOf(task) {
  return values(task.rewards).length ? values(task.rewards) : task.reward ? [{ rewardType: task.rewardType, reward: task.reward }] : [];
}

function itemAsset(name) {
  return itemAssets.find(([pattern]) => pattern.test(String(name || "")))?.[1] || null;
}

function Pill({ children, tone = "" }) {
  return (
    <span className={`inline-flex min-h-7 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
      {children}
    </span>
  );
}

function PokemonReward({ reward }) {
  const name = reward.names?.French || reward.names?.English || reward.sourceName || reward.id || "Pokemon";
  const cp = reward.cpRange?.length === 2 ? `${reward.cpRange[0]} - ${reward.cpRange[1]}` : null;

  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-cyan-200/15 bg-cyan-400/8">
      <div className="grid min-h-32 place-items-center bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,.22),transparent_44%),linear-gradient(135deg,rgba(8,47,73,.88),rgba(30,41,59,.82))] p-3">
        <img
          className="max-h-24 object-contain drop-shadow-[0_16px_26px_rgba(0,0,0,.36)]"
          src={reward.assets?.image || reward.assets?.shinyImage || uiAssets.icons.pokemon}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="space-y-2 p-3">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <h4 className="truncate text-base font-black text-white">{name}</h4>
          {reward.shiny ? (
            <Pill tone="border-amber-200/25 bg-amber-300/16 text-amber-50">
              <Sparkles size={11} /> Shiny
            </Pill>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {values(reward.types).map((type) => (
            <Pill key={type} tone={typeTone[type] || "border-white/10 bg-white/10 text-white"}>
              {type}
            </Pill>
          ))}
          {reward.form ? <Pill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{reward.form}</Pill> : null}
          {reward.unmatched ? <Pill tone="border-red-200/30 bg-red-400/16 text-red-50">Non matché</Pill> : null}
        </div>
        {cp ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-xs font-black text-slate-200">
            CP {cp}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ItemReward({ reward }) {
  const src = reward.asset || itemAsset(reward.name);
  return (
    <article className="min-w-0 rounded-2xl border border-amber-200/16 bg-amber-400/9 p-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-amber-100/18 bg-slate-950/40 p-2">
          {src ? (
            <img className="max-h-full object-contain" src={src} alt={reward.name} loading="lazy" />
          ) : (
            <Package className="text-amber-100" size={24} />
          )}
        </span>
        <div className="min-w-0">
          <h4 className="truncate text-base font-black text-white">{reward.name || "Item"}</h4>
          {reward.quantity ? <p className="text-xs font-black text-amber-100/78">×{reward.quantity}</p> : null}
        </div>
      </div>
    </article>
  );
}

function RewardCard({ entry }) {
  if (entry.rewardType === "pokemon") return <PokemonReward reward={entry.reward || {}} />;
  return <ItemReward reward={entry.reward || {}} />;
}

function ResearchTask({ task, toneClass }) {
  const rewards = rewardsOf(task);
  return (
    <article className={`min-w-0 overflow-hidden rounded-3xl border ${toneClass}`}>
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-2">
          <Pill tone="border-white/14 bg-white/10 text-white">{task.categoryTitle || task.category || "Research"}</Pill>
          {task.event?.name ? <Pill tone="border-orange-200/25 bg-orange-400/14 text-orange-50">{task.event.name}</Pill> : null}
        </div>
        <h3 className="text-lg font-black leading-tight text-white">{task.task}</h3>
      </div>
      <div className="grid gap-3 border-t border-white/10 bg-slate-950/30 p-3 sm:grid-cols-2 xl:grid-cols-3">
        {rewards.map((reward, index) => (
          <RewardCard key={`${task.task}-${reward.rewardType}-${index}`} entry={reward} />
        ))}
      </div>
    </article>
  );
}

function ResearchSection({ id, title, toneClass, tasks }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/62">{id}</p>
          <h2 className="text-2xl font-black text-white">{title}</h2>
        </div>
        <span className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-xs font-black text-white">
          {tasks.length}
        </span>
      </div>
      {tasks.length ? (
        <div className="grid gap-4">
          {tasks.map((task, index) => (
            <ResearchTask key={`${id}-${task.task}-${index}`} task={task} toneClass={toneClass} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucune quête dans cette section.
        </p>
      )}
    </section>
  );
}

export function ResearchPanel({
  research,
  loading = false,
  busyAction = "",
  onRefresh,
  onDownload,
  onImportMongo,
  onRegenerate,
}) {
  const currentResearchList = research?.data?.currentResearchList || research?.currentResearchList || {};
  const total = totalTasks(currentResearchList);
  const allTasks = Object.values(currentResearchList).flatMap(values);
  const allRewards = allTasks.flatMap(rewardsOf);
  const pokemonRewards = allRewards.filter((reward) => reward.rewardType === "pokemon").length;
  const itemRewards = allRewards.filter((reward) => reward.rewardType === "item").length;

  return (
    <div className="space-y-5">
      <Panel
        title="Research Pokémon GO"
        eyebrow="LeekDuck + JSON local"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!total}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={buttonClass} type="button" onClick={onImportMongo} disabled={Boolean(busyAction)}>
              <CloudUpload size={17} /> {busyAction === "import" ? "Envoi..." : "Envoyer MongoDB"}
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={Boolean(busyAction)}>
              <RotateCcw size={17} /> {busyAction === "regenerate" ? "Régénération..." : "Régénérer Research"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Quêtes" value={total} icon="/ui/Items/Item_1201.png" tone="cyan" detail="Toutes catégories" />
          <AssetStatCard label="Événement" value={values(currentResearchList.eventResearch).length} icon="/ui/Items/TroyKey_sparkly.png" tone="amber" detail="Research event" />
          <AssetStatCard label="Rewards Pokémon" value={pokemonRewards} icon={uiAssets.icons.pokemon} tone="green" detail="Matchés localement" />
          <AssetStatCard label="Rewards items" value={itemRewards} icon="/ui/Items/stardust_painted.png" tone="violet" detail="Items détectés" />
        </div>
        <p className="mt-4 rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4 text-sm font-bold leading-6 text-emerald-50/86">
          Les récompenses Pokémon utilisent les assets et noms locaux. Les rewards items utilisent les assets UI disponibles quand ils sont identifiables.
        </p>
      </Panel>

      {loading && !total ? (
        <Panel title="Chargement Research">
          <p className="font-bold text-slate-300">Lecture du JSON Research en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-5">
        {researchSections.map(([id, title, , toneClass]) => (
          <ResearchSection key={id} id={id} title={title} toneClass={toneClass} tasks={values(currentResearchList[id])} />
        ))}
      </div>
    </div>
  );
}
