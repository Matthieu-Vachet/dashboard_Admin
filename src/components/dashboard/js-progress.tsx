"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Compass, Route, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  initialJsRoadmap,
  jsRoadmapLevels,
  type JsRoadmapItem,
  type JsStatus,
} from "@/data/javascript-learning";
import { usePersistentState } from "@/lib/use-persistent-state";
import { cn } from "@/lib/cn";

const statusOrder: JsStatus[] = ["À apprendre", "En cours", "Compris"];

const statusStyle = {
  "À apprendre": "border-slate-400/20 bg-white/[0.045] text-slate-300",
  "En cours": "border-cyan-300/30 bg-cyan-400/12 text-cyan-100",
  Compris: "border-emerald-300/30 bg-emerald-400/12 text-emerald-100",
};

const difficultyStyle = {
  facile: "text-emerald-100 bg-emerald-400/12 border-emerald-300/25",
  moyen: "text-amber-100 bg-amber-400/12 border-amber-300/25",
  difficile: "text-rose-100 bg-rose-400/12 border-rose-300/25",
};

function mergeRoadmap(stored: JsRoadmapItem[]) {
  const storedMap = new Map(stored.map((item) => [item.id, item]));
  return initialJsRoadmap.map((item) => ({ ...item, ...storedMap.get(item.id) }));
}

export function JsProgress() {
  const [storedItems, setStoredItems, ready] = usePersistentState<JsRoadmapItem[]>(
    "matweb.js.progress",
    initialJsRoadmap,
  );
  const items = useMemo(() => mergeRoadmap(storedItems), [storedItems]);
  const understood = items.filter((item) => item.status === "Compris").length;
  const inProgress = items.filter((item) => item.status === "En cours").length;
  const globalProgress = Math.round(
    items.reduce((total, item) => total + item.progress, 0) / Math.max(items.length, 1),
  );

  function cycleStatus(item: JsRoadmapItem) {
    const currentIndex = statusOrder.indexOf(item.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    const nextProgress = nextStatus === "Compris" ? 100 : nextStatus === "En cours" ? Math.max(item.progress, 45) : 0;

    setStoredItems((current) =>
      mergeRoadmap(current).map((entry) =>
        entry.id === item.id ? { ...entry, status: nextStatus, progress: nextProgress } : entry,
      ),
    );
  }

  return (
    <div className="space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(32,211,255,.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(88,242,169,.16),transparent_32%)]" />
        <CardHeader className="relative z-10" eyebrow="JavaScript Roadmap" action={<Badge tone={ready ? "green" : "amber"}>{ready ? "Sauvegardé" : "Chargement"}</Badge>}>
          <CardTitle className="text-2xl sm:text-3xl">Ta route JavaScript</CardTitle>
          <CardDescription>
            Inspirée des roadmaps modernes: tu avances niveau par niveau, avec les notions que tu connais déjà comme premiers repères.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-3 md:grid-cols-3">
        <Stat label="Progression globale" value={`${globalProgress}%`} icon={Route} tone="cyan" />
        <Stat label="Notions comprises" value={`${understood}/${items.length}`} icon={CheckCircle2} tone="green" />
        <Stat label="En cours" value={String(inProgress)} icon={Sparkles} tone="violet" />
      </section>

      <section className="relative overflow-hidden rounded-lg border border-line bg-white/[0.035] p-4 sm:p-6">
        <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-brand-2 via-brand to-brand-3 opacity-50 lg:block" />
        <div className="space-y-6">
          {jsRoadmapLevels.map((level, index) => {
            const levelItems = items.filter((item) => item.level === level.level);
            const levelProgress = Math.round(
              levelItems.reduce((sum, item) => sum + item.progress, 0) / Math.max(levelItems.length, 1),
            );
            const right = index % 2 === 1;

            return (
              <motion.article
                className={cn("relative grid gap-4 lg:grid-cols-[1fr_4rem_1fr]", right && "lg:[&>*:first-child]:col-start-3")}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
                key={level.level}
              >
                <Card className="relative overflow-hidden p-4">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(32,211,255,.09),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(144,91,244,.14),transparent_34%)]" />
                  <div className="relative">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Niveau {level.level}</span>
                        <h2 className="mt-1 text-xl font-black">{level.title}</h2>
                        <p className="mt-2 text-sm font-semibold leading-6 text-muted">{level.description}</p>
                      </div>
                      <span className="rounded-lg border border-brand-2/25 bg-brand-2/10 px-3 py-2 font-mono text-sm font-black text-brand-2">
                        {levelProgress}%
                      </span>
                    </div>
                    <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-brand-2 via-brand to-brand-3"
                        initial={{ width: 0 }}
                        animate={{ width: `${levelProgress}%` }}
                      />
                    </div>
                    <div className="grid gap-2">
                      {levelItems.map((item) => (
                        <div className="rounded-lg border border-line bg-black/15 p-3" key={item.id}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <strong className="text-sm font-black">{item.title}</strong>
                            <div className="flex flex-wrap gap-2">
                              <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${difficultyStyle[item.difficulty]}`}>
                                {item.difficulty}
                              </span>
                              <button
                                className={`rounded-full border px-2.5 py-1 text-[11px] font-black transition hover:scale-105 ${statusStyle[item.status]}`}
                                type="button"
                                onClick={() => cycleStatus(item)}
                              >
                                {item.status}
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-[1fr_3.2rem] items-center gap-3">
                            <span className="h-2 overflow-hidden rounded-full bg-white/10">
                              <span
                                className="block h-full rounded-full bg-gradient-to-r from-brand-2 to-brand-3"
                                style={{ width: `${item.progress}%` }}
                              />
                            </span>
                            <span className="text-right font-mono text-xs font-black text-muted">{item.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <div className="relative hidden place-items-center lg:grid">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-brand-2/30 bg-background text-brand-2 shadow-[0_0_35px_rgba(32,211,255,.22)]">
                    <Compass size={20} />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: typeof Route;
  tone: "cyan" | "green" | "violet";
}) {
  const toneClass = {
    cyan: "border-brand-2/25 bg-brand-2/10 text-brand-2",
    green: "border-brand-3/25 bg-brand-3/10 text-brand-3",
    violet: "border-brand/25 bg-brand/10 text-brand",
  }[tone];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <span>
          <span className="block text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
          <strong className="mt-3 block text-3xl font-black">{value}</strong>
        </span>
        <span className={`grid h-11 w-11 place-items-center rounded-lg border ${toneClass}`}>
          <Icon size={20} />
        </span>
      </div>
    </Card>
  );
}
