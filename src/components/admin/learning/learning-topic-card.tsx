import { ArrowUpRight, BookMarked, BookOpenCheck, Code2, Download, ExternalLink, Rocket, ScrollText, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LEARNING_DIFFICULTY_CLASS, LEARNING_STATUS_CLASS, LEARNING_STATUS_LABEL } from "@/constants/admin/learning";
import { LearningProgressBar } from "@/components/admin/learning/learning-progress-bar";
import { getTopicStats } from "@/lib/learning/javascript";
import type { RuntimeLearningTopic } from "@/types/admin/learning";

export function LearningTopicCard({
  topic,
  onOpen,
}: {
  topic: RuntimeLearningTopic;
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
              <Badge>Chapitre {topic.chapterNumber}</Badge>
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

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-muted">
          {topic.book.references.map((reference) => (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-recessed px-2.5 py-1.5" key={`${reference.chapter}-${reference.pages}`}>
              <BookMarked size={13} /> Chap. {reference.chapter} · p. {reference.pages}
            </span>
          ))}
          {topic.resources.filter((resource) => resource.kind === "mdn" || resource.kind === "roadmap").map((resource) => (
            <a className="inline-flex items-center gap-1.5 rounded-full border border-brand-2/20 bg-brand-2/[0.06] px-2.5 py-1.5 text-brand-2 transition hover:bg-brand-2/15" href={resource.url} key={resource.id} target={resource.url.startsWith("/") ? undefined : "_blank"} rel="noreferrer">
              {resource.kind === "mdn" ? "MDN" : "roadmap.sh"} <ExternalLink size={12} />
            </a>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <TopicMetric icon={BookOpenCheck} label="Théorie" value={stats.completedTheory ? "Terminée" : "À commencer"} />
          <TopicMetric icon={Code2} label="Exercices" value={`${stats.completedExercises} / ${stats.totalExercises}`} />
          <TopicMetric icon={ScrollText} label="Pseudo-code" value={`${stats.completedPseudocode} / ${stats.totalPseudocode}`} />
          <TopicMetric icon={Target} label="Challenges" value={`${stats.completedChallenges} / ${stats.totalChallenges}`} />
          <TopicMetric icon={Rocket} label="Projets" value={`${stats.completedProjects} / ${stats.totalProjects}`} />
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
          <button
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand-2/30 bg-brand-2/10 px-4 py-2.5 text-sm font-black text-brand-2 transition hover:bg-brand-2/20 focus:outline-none focus:ring-4 focus:ring-brand-2/15"
            type="button"
            onClick={onOpen}
          >
            Voir le détail
            <ArrowUpRight size={16} />
          </button>
          <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-surface-flat px-3 py-2.5 text-xs font-black text-muted transition hover:text-foreground" href={`/api/learning/export?scope=topic&id=${encodeURIComponent(topic.id)}`}>
            <Download size={14} /> Exporter JSON
          </a>
        </div>
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
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-recessed px-3 py-2.5">
      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-muted">
        <Icon size={14} /> {label}
      </span>
      <strong className="text-sm font-black text-foreground">{value}</strong>
    </div>
  );
}
