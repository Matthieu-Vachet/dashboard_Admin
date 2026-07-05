"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Pause, Play, RotateCcw, TimerReset } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePersistentState } from "@/lib/use-persistent-state";
import { cn } from "@/lib/cn";

type PomodoroMode = "focus" | "short" | "long";

type PomodoroStats = {
  sessions: number;
  focusMinutes: number;
  history: Array<{ mode: PomodoroMode; finishedAt: string }>;
};

const initialStats: PomodoroStats = { sessions: 0, focusMinutes: 0, history: [] };
const durations: Record<PomodoroMode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const modeLabels = {
  focus: "Focus 25 min",
  short: "Pause courte 5 min",
  long: "Pause longue 15 min",
};

export function Pomodoro() {
  const [stats, setStats] = usePersistentState<PomodoroStats>("matweb.pomodoro", initialStats);
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(durations.focus);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current > 1) return current - 1;
        window.clearInterval(interval);
        setRunning(false);
        setStats((previous) => ({
          sessions: previous.sessions + (mode === "focus" ? 1 : 0),
          focusMinutes: previous.focusMinutes + (mode === "focus" ? 25 : 0),
          history: [{ mode, finishedAt: new Date().toISOString() }, ...previous.history].slice(0, 20),
        }));
        return 0;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [mode, running, setStats]);

  const progress = useMemo(
    () => Math.round(((durations[mode] - secondsLeft) / durations[mode]) * 100),
    [mode, secondsLeft],
  );

  function switchMode(nextMode: PomodoroMode) {
    setMode(nextMode);
    setRunning(false);
    setSecondsLeft(durations[nextMode]);
  }

  function reset() {
    setRunning(false);
    setSecondsLeft(durations[mode]);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,.16),transparent_32%)]" />
        <CardHeader className="relative z-10" eyebrow="Pomodoro" action={<Badge tone={running ? "green" : "cyan"}>{running ? "En cours" : "Prêt"}</Badge>}>
          <CardTitle className="text-2xl sm:text-3xl">Timer de concentration</CardTitle>
          <CardDescription>25 minutes de focus, puis une pause courte ou longue selon ton rythme.</CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="relative overflow-hidden p-5">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(32,211,255,.08),transparent_45%)]" />
          <div className="relative flex flex-col items-center text-center">
            <div className="relative grid h-72 w-72 place-items-center rounded-full border border-brand-2/25 bg-brand-2/10 shadow-[0_0_80px_rgba(32,211,255,.12)]">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#20d3ff ${progress}%, rgba(255,255,255,.08) ${progress}% 100%)`,
                }}
                animate={{ rotate: running ? 360 : 0 }}
                transition={{ duration: 18, repeat: running ? Infinity : 0, ease: "linear" }}
              />
              <div className="absolute inset-3 rounded-full bg-background" />
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">{modeLabels[mode]}</p>
                <strong className="mt-3 block font-mono text-6xl font-black">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {(["focus", "short", "long"] as PomodoroMode[]).map((item) => (
                <button
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-black transition",
                    mode === item
                      ? "border-brand-2/40 bg-brand-2/15 text-brand-2"
                      : "border-line bg-white/[0.045] text-muted hover:text-foreground",
                  )}
                  key={item}
                  type="button"
                  onClick={() => switchMode(item)}
                >
                  {modeLabels[item]}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button variant="primary" onClick={() => setRunning(true)} disabled={running || secondsLeft === 0}>
                <Play size={16} />
                Start
              </Button>
              <Button onClick={() => setRunning(false)} disabled={!running}>
                <Pause size={16} />
                Pause
              </Button>
              <Button onClick={reset}>
                <RotateCcw size={16} />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader eyebrow="Stats">
            <CardTitle>Sessions terminées</CardTitle>
            <CardDescription>Historique simple sauvegardé dans le dashboard.</CardDescription>
          </CardHeader>
          <div className="mt-5 grid gap-3">
            <MiniStat icon={TimerReset} label="Pomodoros" value={String(stats.sessions)} />
            <MiniStat icon={Coffee} label="Minutes focus" value={String(stats.focusMinutes)} />
          </div>
          <div className="mt-5 space-y-2">
            {stats.history.slice(0, 6).map((item) => (
              <div className="rounded-lg border border-line bg-white/[0.045] p-3 text-sm font-bold" key={`${item.mode}-${item.finishedAt}`}>
                {modeLabels[item.mode]} terminé
                <span className="mt-1 block text-xs text-muted">{new Date(item.finishedAt).toLocaleString("fr-FR")}</span>
              </div>
            ))}
            {!stats.history.length ? (
              <p className="rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted">
                Lance ta première session pour remplir l’historique.
              </p>
            ) : null}
          </div>
        </Card>
      </section>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof TimerReset; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-white/[0.045] p-3">
      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
        <Icon size={15} />
        {label}
      </span>
      <strong className="font-mono text-xl font-black">{value}</strong>
    </div>
  );
}
