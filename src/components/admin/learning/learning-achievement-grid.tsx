import { LockKeyhole, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LearningProgressBar } from "@/components/admin/learning/learning-progress-bar";
import { getLearningMetricLabel } from "@/lib/learning/javascript";
import type { LearningAchievement } from "@/types/admin/learning";

type AchievementView = LearningAchievement & {
  value: number;
  progress: number;
  unlocked: boolean;
};

export function LearningAchievementGrid({ achievements }: { achievements: AchievementView[] }) {
  return (
    <section className="space-y-3" aria-labelledby="learning-achievements-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Récompenses</p>
          <h2 id="learning-achievements-title" className="mt-1 text-2xl font-black">Achievements</h2>
        </div>
        <span className="text-sm font-bold text-muted">Débloqués automatiquement depuis les données d’apprentissage.</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement) => (
          <Card className={achievement.unlocked ? "border-brand-3/30 bg-brand-3/[0.06] p-4" : "p-4 opacity-75"} key={achievement.id}>
            <div className="flex items-start gap-3">
              <span className={achievement.unlocked ? "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-brand-3/25 bg-brand-3/10 text-brand-3" : "grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.045] text-muted"}>
                {achievement.unlocked ? <Trophy size={18} /> : <LockKeyhole size={18} />}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black">{achievement.title}</h3>
                  <Badge tone={achievement.unlocked ? "green" : "neutral"}>{achievement.unlocked ? "Débloqué" : "Verrouillé"}</Badge>
                </div>
                <p className="mt-1 text-sm font-semibold leading-5 text-muted">{achievement.description}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 text-xs font-black text-muted">
              <span>{achievement.value} / {achievement.target} {getLearningMetricLabel(achievement.metric)}</span>
              <span>{achievement.progress}%</span>
            </div>
            <LearningProgressBar className="mt-2" value={achievement.progress} />
          </Card>
        ))}
      </div>
    </section>
  );
}

