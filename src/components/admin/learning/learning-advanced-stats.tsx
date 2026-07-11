import { CalendarClock, CalendarDays, CheckCircle2, Clock3, Flame, History, Rocket, Sparkles, Target, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { LearningAdvancedStats } from "@/types/admin/learning";

function duration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const hours = Math.floor(seconds / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  return hours ? `${hours}h ${minutes}min` : `${minutes}min`;
}

export function LearningAdvancedStats({ stats }: { stats: LearningAdvancedStats }) {
  const metrics = [
    { label: "Temps total", value: duration(stats.totalStudySeconds), icon: Clock3 },
    { label: "Cette semaine", value: duration(stats.weekStudySeconds), icon: CalendarDays },
    { label: "Aujourd’hui", value: duration(stats.todayStudySeconds), icon: CalendarClock },
    { label: "XP aujourd’hui", value: String(stats.xpToday), icon: Sparkles },
    { label: "XP semaine", value: String(stats.xpWeek), icon: Target },
    { label: "XP mois", value: String(stats.xpMonth), icon: Trophy },
    { label: "Exercices réussis", value: String(stats.completedExercises), icon: CheckCircle2 },
    { label: "Challenges réussis", value: String(stats.completedChallenges), icon: Flame },
    { label: "Projets terminés", value: String(stats.completedProjects), icon: Rocket },
    { label: "Série actuelle", value: `${stats.currentStreak} j`, icon: Flame },
    { label: "Meilleure série", value: `${stats.bestStreak} j`, icon: Trophy },
    { label: "Dernière activité", value: stats.lastActivity ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(stats.lastActivity)) : "Aucune", icon: History },
  ];

  return (
    <section className="space-y-3" aria-labelledby="learning-stats-title">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Mesure réelle</p>
        <h2 id="learning-stats-title" className="mt-1 text-2xl font-black">Statistiques d’étude</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metrics.map(({ icon: Icon, label, value }) => (
          <Card className="p-4" key={label}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-muted">{label}</span>
                <strong className="mt-2 block truncate text-xl font-black">{value}</strong>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-2/20 bg-brand-2/10 text-brand-2"><Icon size={17} /></span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
