"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckSquare2,
  FolderKanban,
  GraduationCap,
  TimerReset,
  Trophy,
} from "lucide-react";
import { SortableWidgetGrid } from "@/components/admin/shared/sortable-widget-grid";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialProjects, initialTodos } from "@/data/personal-dashboard-defaults";
import {
  initialJsExerciseState,
  initialJsRoadmap,
  jsRoadmapLevels,
  type JsExerciseState,
  type JsRoadmapItem,
} from "@/data/javascript-learning";
import { usePersistentState } from "@/lib/use-persistent-state";

type PomodoroStats = { sessions: number; focusMinutes: number };

const colors = ["#20d3ff", "#58f2a9", "#905bf4"];

function mergeRoadmap(stored: JsRoadmapItem[]) {
  const storedMap = new Map(stored.map((item) => [item.id, item]));
  return initialJsRoadmap.map((item) => ({ ...item, ...storedMap.get(item.id) }));
}

export function LearningAnalytics() {
  const [todos] = usePersistentState("matweb.todos", initialTodos);
  const [projects] = usePersistentState("matweb.projects", initialProjects);
  const [roadmap] = usePersistentState<JsRoadmapItem[]>("matweb.js.progress", initialJsRoadmap);
  const [exercises] = usePersistentState<JsExerciseState>("matweb.js.exercises", initialJsExerciseState);
  const [pomodoro] = usePersistentState<PomodoroStats>("matweb.pomodoro", { sessions: 0, focusMinutes: 0 });

  const items = useMemo(() => mergeRoadmap(roadmap), [roadmap]);
  const totalTasks = todos.length;
  const doneTasks = todos.filter((todo) => todo.done).length;
  const activeProjects = projects.filter((project) => !["Archive", "Pause"].includes(project.status)).length;
  const understoodConcepts = items.filter((item) => item.status === "Compris").length;
  const completedExercises = Object.values(exercises).filter((exercise) => exercise.completed).length;
  const jsProgress = Math.round(items.reduce((sum, item) => sum + item.progress, 0) / Math.max(items.length, 1));
  const levelData = jsRoadmapLevels.map((level) => {
    const levelItems = items.filter((item) => item.level === level.level);
    return {
      name: `N${level.level}`,
      progression: Math.round(levelItems.reduce((sum, item) => sum + item.progress, 0) / Math.max(levelItems.length, 1)),
      compris: levelItems.filter((item) => item.status === "Compris").length,
    };
  });
  const statusData = [
    { name: "Compris", value: understoodConcepts },
    { name: "En cours", value: items.filter((item) => item.status === "En cours").length },
    { name: "À apprendre", value: items.filter((item) => item.status === "À apprendre").length },
  ];
  const analyticsWidgets = [
    {
      id: "metrics",
      label: "Métriques",
      className: "xl:col-span-2",
      node: (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={CheckSquare2} label="Tâches totales" value={String(totalTasks)} tone="cyan" />
          <Metric icon={Trophy} label="Tâches terminées" value={String(doneTasks)} tone="green" />
          <Metric icon={FolderKanban} label="Projets actifs" value={String(activeProjects)} tone="violet" />
          <Metric icon={GraduationCap} label="Concepts JS compris" value={String(understoodConcepts)} tone="amber" />
          <Metric icon={BarChart3} label="Exercices terminés" value={String(completedExercises)} tone="cyan" />
          <Metric icon={TimerReset} label="Sessions Pomodoro" value={String(pomodoro.sessions || 0)} tone="green" />
          <Metric icon={TimerReset} label="Minutes focus" value={String(pomodoro.focusMinutes || 0)} tone="violet" />
          <Metric icon={GraduationCap} label="Progression JS" value={`${jsProgress}%`} tone="amber" />
        </section>
      ),
    },
    {
      id: "levels",
      label: "Roadmap JS",
      node: (
        <Card className="min-w-0 p-4">
          <CardHeader eyebrow="Roadmap">
            <CardTitle>Progression par niveau JS</CardTitle>
            <CardDescription>Chaque niveau reprend les jalons de la roadmap.</CardDescription>
          </CardHeader>
          <LevelProgressGrid items={levelData} />
        </Card>
      ),
    },
    {
      id: "concepts",
      label: "Concepts",
      node: (
        <Card className="min-w-0 p-4">
          <CardHeader eyebrow="Concepts">
            <CardTitle>Statut des notions</CardTitle>
            <CardDescription>Compris, en cours, ou à apprendre.</CardDescription>
          </CardHeader>
          <StatusChart items={statusData} />
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_84%_20%,rgba(144,91,244,.16),transparent_32%)]" />
        <CardHeader className="relative z-10" eyebrow="Analytics">
          <CardTitle className="text-2xl sm:text-3xl">Stats de progression personnelle</CardTitle>
          <CardDescription>
            Todo, projets, progression JavaScript, exercices et sessions Pomodoro dans une seule vue.
          </CardDescription>
        </CardHeader>
      </Card>

      <SortableWidgetGrid
        columnsClassName="grid gap-5 xl:grid-cols-[1.2fr_.8fr]"
        itemClassName="mb-0"
        items={analyticsWidgets}
        storageKey="matweb.analytics.widgets"
      />
    </div>
  );
}

function LevelProgressGrid({ items }: { items: Array<{ name: string; progression: number; compris: number }> }) {
  return (
    <div className="mt-5 grid gap-3">
      {items.map((item, index) => (
        <div className="rounded-lg border border-line bg-white/[0.045] p-3" key={item.name}>
          <div className="mb-2 flex items-center justify-between gap-3">
            <strong className="font-black">{item.name}</strong>
            <span className="font-mono text-sm font-black text-muted">{item.progression}%</span>
          </div>
          <span className="block h-3 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full"
              style={{ background: colors[index % colors.length] }}
              initial={{ width: 0 }}
              animate={{ width: `${item.progression}%` }}
              transition={{ duration: 0.45, delay: index * 0.035 }}
            />
          </span>
          <span className="mt-2 block text-xs font-bold text-muted">{item.compris} notion(s) comprises</span>
        </div>
      ))}
    </div>
  );
}

function StatusChart({ items }: { items: Array<{ name: string; value: number }> }) {
  const total = Math.max(items.reduce((sum, item) => sum + item.value, 0), 1);

  return (
    <div className="mt-5 grid gap-4">
      <div
        className="mx-auto grid h-52 w-52 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${colors[0]} 0 ${(items[0].value / total) * 100}%, ${colors[1]} ${(items[0].value / total) * 100}% ${((items[0].value + items[1].value) / total) * 100}%, ${colors[2]} ${((items[0].value + items[1].value) / total) * 100}% 100%)`,
        }}
      >
        <div className="grid h-32 w-32 place-items-center rounded-full bg-background text-center">
          <span>
            <strong className="block text-3xl font-black">{total}</strong>
            <small className="text-xs font-black uppercase tracking-[0.16em] text-muted">notions</small>
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <div className="flex items-center justify-between rounded-lg border border-line bg-white/[0.045] p-3" key={item.name}>
            <span className="inline-flex items-center gap-2 text-sm font-black">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[index % colors.length] }} />
              {item.name}
            </span>
            <span className="font-mono text-sm font-black text-muted">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckSquare2;
  label: string;
  value: string;
  tone: "cyan" | "green" | "violet" | "amber";
}) {
  const toneClass = {
    cyan: "text-brand-2 bg-brand-2/10 border-brand-2/20",
    green: "text-brand-3 bg-brand-3/10 border-brand-3/20",
    violet: "text-brand bg-brand/10 border-brand/20",
    amber: "text-warning bg-warning/10 border-warning/20",
  }[tone];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
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
    </motion.div>
  );
}
