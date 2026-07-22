"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Dumbbell, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  initialJsExerciseState,
  jsExercises,
  type JsExerciseState,
} from "@/data/javascript-learning";
import { usePersistentState } from "@/lib/use-persistent-state";
import { cn } from "@/lib/cn";

const exerciseLevelStyle: Record<string, string> = {
  "Niveau 1": "border-emerald-300/25 bg-emerald-400/[0.06] shadow-[0_18px_60px_rgba(16,185,129,.08)]",
  "Niveau 2": "border-cyan-300/25 bg-cyan-400/[0.06] shadow-[0_18px_60px_rgba(34,211,238,.08)]",
  "Niveau 3": "border-violet-300/25 bg-violet-400/[0.06] shadow-[0_18px_60px_rgba(139,92,246,.08)]",
  "Niveau 4": "border-amber-300/25 bg-amber-400/[0.06] shadow-[0_18px_60px_rgba(245,158,11,.08)]",
  "Niveau 5": "border-rose-300/25 bg-rose-400/[0.06] shadow-[0_18px_60px_rgba(244,63,94,.08)]",
  "Niveau 6": "border-sky-300/25 bg-sky-400/[0.06] shadow-[0_18px_60px_rgba(14,165,233,.08)]",
};

const exerciseLevelBadge: Record<string, string> = {
  "Niveau 1": "border-emerald-300/25 bg-emerald-400/12 text-emerald-100",
  "Niveau 2": "border-cyan-300/25 bg-cyan-400/12 text-cyan-100",
  "Niveau 3": "border-violet-300/25 bg-violet-400/12 text-violet-100",
  "Niveau 4": "border-amber-300/25 bg-amber-400/12 text-amber-100",
  "Niveau 5": "border-rose-300/25 bg-rose-400/12 text-rose-100",
  "Niveau 6": "border-sky-300/25 bg-sky-400/12 text-sky-100",
};

/** Fusionne la liste d'exercices actuelle avec le travail déjà sauvegardé. */
function mergeExerciseState(state: JsExerciseState): JsExerciseState {
  return Object.fromEntries(
    jsExercises.map((exercise) => [
      exercise.id,
      {
        completed: state[exercise.id]?.completed || false,
        code: state[exercise.id]?.code ?? exercise.starter,
        updatedAt: state[exercise.id]?.updatedAt || "",
      },
    ]),
  );
}

export function JavaScriptExercises() {
  const [state, setState, ready] = usePersistentState<JsExerciseState>(
    "matweb.js.exercises",
    initialJsExerciseState,
  );
  const [activeLevel, setActiveLevel] = useState("Tous");
  const mergedState = useMemo(() => mergeExerciseState(state), [state]);
  const levels = ["Tous", ...Array.from(new Set(jsExercises.map((exercise) => exercise.level)))];
  const visibleExercises = jsExercises.filter((exercise) => activeLevel === "Tous" || exercise.level === activeLevel);
  const completed = jsExercises.filter((exercise) => mergedState[exercise.id]?.completed).length;

  /** Enregistre ton pseudo-code au fil de la frappe. */
  function updateCode(id: string, code: string) {
    setState((current) => ({
      ...mergeExerciseState(current),
      [id]: {
        ...mergeExerciseState(current)[id],
        code,
        updatedAt: new Date().toISOString(),
      },
    }));
  }

  /** Marque un exercice comme terminé ou le réouvre pour retravailler dessus. */
  function toggleCompleted(id: string) {
    setState((current) => {
      const merged = mergeExerciseState(current);
      return {
        ...merged,
        [id]: {
          ...merged[id],
          completed: !merged[id].completed,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }

  return (
    <div className="space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(144,91,244,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(32,211,255,.14),transparent_32%)]" />
        <CardHeader className="relative z-10" eyebrow="Exercices JavaScript" action={<Badge tone={ready ? "green" : "amber"}>{ready ? "Mongo/local OK" : "Chargement"}</Badge>}>
          <CardTitle className="text-2xl sm:text-3xl">Pratique guidée</CardTitle>
          <CardDescription>Des exercices adaptés à ton niveau actuel: variables, conditions, boucles, tableaux, fonctions simples et début du DOM.</CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-3 md:grid-cols-3">
        <Stat icon={Dumbbell} label="Exercices" value={String(jsExercises.length)} tone="cyan" />
        <Stat icon={CheckCircle2} label="Terminés" value={`${completed}/${jsExercises.length}`} tone="green" />
        <Stat icon={Code2} label="Progression" value={`${Math.round((completed / jsExercises.length) * 100)}%`} tone="violet" />
      </section>

      <div className="flex flex-wrap gap-2">
        {levels.map((level) => (
          <button
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-black transition",
              activeLevel === level
                ? "border-brand-2/40 bg-brand-2/15 text-brand-2"
                : cn("border-line bg-surface-flat text-muted hover:text-foreground", level !== "Tous" && exerciseLevelBadge[level]),
            )}
            key={level}
            type="button"
            onClick={() => setActiveLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-2">
        {visibleExercises.map((exercise, index) => {
          const exerciseState = mergedState[exercise.id];
          return (
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.035 }}
              key={exercise.id}
            >
              <Card className={cn("overflow-hidden p-4", exerciseLevelStyle[exercise.level], exerciseState.completed && "border-brand-3/35 bg-brand-3/12")}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.16em]", exerciseLevelBadge[exercise.level])}>{exercise.level}</span>
                    <h2 className="mt-1 text-xl font-black">{exercise.title}</h2>
                  </div>
                  <button
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-black transition",
                      exerciseState.completed
                        ? "border-brand-3/30 bg-brand-3/15 text-brand-3"
                        : "border-line bg-surface-flat text-muted hover:text-foreground",
                    )}
                    type="button"
                    onClick={() => toggleCompleted(exercise.id)}
                  >
                    {exerciseState.completed ? "Terminé" : "Marquer comme terminé"}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {exercise.concepts.map((concept) => (
                    <span className="rounded-full border border-line bg-surface-control px-3 py-1 text-[11px] font-black text-muted" key={concept}>
                      {concept}
                    </span>
                  ))}
                </div>

                <p className="mt-4 rounded-lg border border-line bg-surface-recessed p-3 text-sm font-semibold leading-6 text-muted">
                  {exercise.statement}
                </p>

                <label className="mt-4 block">
                  <span className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                    <ListChecks size={14} />
                    Éditeur de pseudo-code
                  </span>
                  <textarea
                    className="min-h-56 w-full resize-y rounded-lg border border-line bg-slate-950/55 p-3 font-mono text-sm leading-6 text-foreground outline-none transition focus:border-brand-2/50 focus:ring-4 focus:ring-brand-2/10"
                    value={exerciseState.code}
                    onChange={(event) => updateCode(exercise.id, event.target.value)}
                  />
                </label>

                <div className="mt-3 flex justify-end">
                  <Button variant={exerciseState.completed ? "secondary" : "primary"} onClick={() => toggleCompleted(exercise.id)}>
                    <CheckCircle2 size={16} />
                    {exerciseState.completed ? "Réouvrir" : "Marquer comme terminé"}
                  </Button>
                </div>
              </Card>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Dumbbell;
  label: string;
  value: string;
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
