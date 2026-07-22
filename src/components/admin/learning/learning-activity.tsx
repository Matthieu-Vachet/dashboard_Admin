import { CheckCircle2, Clock3, Play, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/admin/shared/state-system";
import type { LearningActivity } from "@/types/admin/learning";

const itemLabels = { theory: "Théorie", exercise: "Exercice", pseudocode: "Pseudo-code", challenge: "Challenge", project: "Projet" } as const;

export function LearningActivityTimeline({ activity }: { activity: LearningActivity[] }) {
  const completed = activity.filter((item) => item.action === "completed");
  const byDay = new Map<string, number>();
  completed.forEach((item) => {
    const day = item.occurredAt.slice(0, 10);
    byDay.set(day, (byDay.get(day) || 0) + 1);
  });
  const calendar = Array.from({ length: 84 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (83 - index));
    const key = date.toISOString().slice(0, 10);
    return { key, date, count: byDay.get(key) || 0 };
  });

  return (
    <section className="space-y-3" aria-labelledby="learning-activity-title">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Chronologie</p>
        <h2 id="learning-activity-title" className="mt-1 text-2xl font-black">Historique d’activité</h2>
      </div>
      <Card className="overflow-hidden p-4 sm:p-5">
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2" aria-label="Activité des 12 dernières semaines">
          {calendar.map((day) => (
            <span
              className={day.count === 0 ? "h-3 w-3 rounded-sm bg-surface-control" : day.count === 1 ? "h-3 w-3 rounded-sm bg-brand-3/45" : day.count === 2 ? "h-3 w-3 rounded-sm bg-brand-3/70" : "h-3 w-3 rounded-sm bg-brand-3"}
              key={day.key}
              title={`${day.date.toLocaleDateString("fr-FR")} · ${day.count} activité${day.count > 1 ? "s" : ""}`}
            />
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {activity.length ? activity.slice(0, 20).map((item) => (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface-recessed p-3" key={item.id}>
              <div className="flex min-w-0 items-center gap-3">
                <span className={item.action === "completed" ? "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-3/10 text-brand-3" : "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-2/10 text-brand-2"}>
                  {item.action === "completed" ? <CheckCircle2 size={17} /> : <Play size={17} />}
                </span>
                <div className="min-w-0">
                  <strong className="block truncate text-sm font-black">{item.title}</strong>
                  <span className="text-xs font-semibold text-muted">{itemLabels[item.itemType]} · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.occurredAt))}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-black">
                {item.studySeconds ? <span className="inline-flex items-center gap-1 text-muted"><Clock3 size={13} /> {Math.max(1, Math.round(item.studySeconds / 60))} min</span> : null}
                {item.xp ? <span className="inline-flex items-center gap-1 text-brand-3"><Sparkles size={13} /> +{item.xp} XP</span> : null}
              </div>
            </div>
          )) : <EmptyState title="Aucune activité réelle enregistrée" description="L’historique commencera à ton prochain démarrage de notion." />}
        </div>
      </Card>
    </section>
  );
}
