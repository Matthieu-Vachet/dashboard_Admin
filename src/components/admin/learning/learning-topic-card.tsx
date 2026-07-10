import { ArrowUpRight, BookOpenCheck, Code2, Rocket, ScrollText, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LEARNING_DIFFICULTY_CLASS, LEARNING_STATUS_CLASS, LEARNING_STATUS_LABEL } from "@/constants/admin/learning";
import { LearningProgressBar } from "@/components/admin/learning/learning-progress-bar";
import { getTopicStats } from "@/lib/learning/javascript";
import type { LearningTopic } from "@/types/admin/learning";

export function LearningTopicCard({
  topic,
  onOpen,
}: {
  topic: LearningTopic;
  onOpen: () => void;
}) {
  const stats = getTopicStats(topic);

  return (
    <Card className="relative overflow-hidden p-4 transition hover:-translate-y-0.5 hover:border-brand-2/35 hover:shadow-[0_18px_60px_rgba(32,211,255,.1)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(32,211,255,.12),transparent_36%),linear-gradient(135deg,rgba(144,91,244,.05),transparent_45%)]" />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={LEARNING_STATUS_CLASS[topic.status]}>{LEARNING_STATUS_LABEL[topic.status]}</Badge>
              <Badge className={LEARNING_DIFFICULTY_CLASS[topic.difficulty]}>{topic.difficulty}</Badge>
            </div>
            <h2 className="mt-3 text-xl font-black">{topic.title}</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">{topic.description}</p>
          </div>
          <span className="shrink-0 rounded-lg border border-brand-2/25 bg-brand-2/10 px-3 py-2 font-mono text-sm font-black text-brand-2">
            {stats.progress}%
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-xs font-black text-muted">
          <span>{stats.earnedXP} / {stats.totalXP} XP</span>
          <span>{topic.category}</span>
        </div>
        <LearningProgressBar className="mt-2" value={stats.progress} />

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <TopicMetric icon={BookOpenCheck} label="Théorie" value={stats.completedTheory ? "Terminée" : "À commencer"} />
          <TopicMetric icon={Code2} label="Exercices" value={`${stats.completedExercises} / ${stats.totalExercises}`} />
          <TopicMetric icon={ScrollText} label="Pseudo-code" value={`${stats.completedPseudocode} / ${stats.totalPseudocode}`} />
          <TopicMetric icon={Target} label="Challenges" value={`${stats.completedChallenges} / ${stats.totalChallenges}`} />
          <TopicMetric icon={Rocket} label="Projets" value={`${stats.completedProjects} / ${stats.totalProjects}`} />
        </div>

        <button
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand-2/30 bg-brand-2/10 px-4 py-2.5 text-sm font-black text-brand-2 transition hover:bg-brand-2/20 focus:outline-none focus:ring-4 focus:ring-brand-2/15"
          type="button"
          onClick={onOpen}
        >
          Voir le détail
          <ArrowUpRight size={16} />
        </button>
      </div>
    </Card>
  );
}

function TopicMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpenCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-black/15 px-3 py-2.5">
      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-muted">
        <Icon size={14} /> {label}
      </span>
      <strong className="text-sm font-black text-foreground">{value}</strong>
    </div>
  );
}

