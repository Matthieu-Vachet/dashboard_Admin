import { Award, BookOpenCheck, CheckCircle2, Code2, Flame, Gauge, Rocket, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LEARNING_XP_PER_LEVEL } from "@/constants/admin/learning";
import { LearningProgressBar } from "@/components/admin/learning/learning-progress-bar";
import type { LearningSummary as LearningSummaryData } from "@/types/admin/learning";

export function LearningSummary({
  summary,
  level,
  unlockedAchievements,
}: {
  summary: LearningSummaryData;
  level: { level: number; currentXP: number; nextLevelXP: number; progress: number };
  unlockedAchievements: number;
}) {
  const metrics = [
    { label: "Progression globale", value: `${summary.progress}%`, icon: Gauge, tone: "text-brand-2" },
    { label: "Exercices terminés", value: `${summary.completedExercises}/${summary.totalExercises}`, icon: Code2, tone: "text-brand-3" },
    { label: "Pseudo-codes terminés", value: `${summary.completedPseudocode}/${summary.totalPseudocode}`, icon: BookOpenCheck, tone: "text-brand" },
    { label: "Challenges terminés", value: `${summary.completedChallenges}/${summary.totalChallenges}`, icon: Flame, tone: "text-warning" },
    { label: "Projets terminés", value: `${summary.completedProjects}/${summary.totalProjects}`, icon: Rocket, tone: "text-danger" },
    { label: "Achievements", value: String(unlockedAchievements), icon: Trophy, tone: "text-brand-2" },
  ] as const;

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Résumé de progression JavaScript">
      <Card tone="strong" className="p-4 sm:col-span-2 xl:col-span-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Niveau actuel</span>
            <strong className="mt-2 block text-4xl font-black">Niveau {level.level}</strong>
            <p className="mt-1 text-sm font-semibold text-muted">
              {level.currentXP} / {LEARNING_XP_PER_LEVEL} XP
            </p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-brand-2/25 bg-brand-2/10 text-brand-2">
            <Award size={21} />
          </span>
        </div>
        <LearningProgressBar className="mt-4" value={level.progress} />
      </Card>

      {metrics.map(({ icon: Icon, label, tone, value }) => (
        <Card className="p-4" key={label}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="block text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
              <strong className="mt-3 block text-3xl font-black">{value}</strong>
            </div>
            <span className={`grid h-11 w-11 place-items-center rounded-lg border border-current/20 bg-current/10 ${tone}`}>
              <Icon size={20} />
            </span>
          </div>
        </Card>
      ))}

      <Card className="p-4 sm:col-span-2 xl:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="block text-xs font-black uppercase tracking-[0.16em] text-muted">XP cumulé</span>
            <strong className="mt-2 block text-2xl font-black">{summary.earnedXP} / {summary.totalXP} XP gagnée</strong>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-3/25 bg-brand-3/10 px-3 py-2 text-sm font-black text-brand-3">
            <CheckCircle2 size={16} /> {summary.topicsCompleted}/{summary.totalTheory} notions complètes
          </span>
        </div>
      </Card>
    </section>
  );
}

