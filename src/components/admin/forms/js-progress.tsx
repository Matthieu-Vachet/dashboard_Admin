"use client";

import { useMemo, useState } from "react";
import { BookOpenCheck, Database, Sparkles } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LearningAchievementGrid } from "@/components/admin/learning/learning-achievement-grid";
import { LearningDetailModal } from "@/components/admin/learning/learning-detail-modal";
import { LearningSummary } from "@/components/admin/learning/learning-summary";
import { LearningTopicCard } from "@/components/admin/learning/learning-topic-card";
import { getAchievements, getCurrentLevel, getLearningSummary } from "@/lib/learning/javascript";
import { useJavascriptLearning } from "@/hooks/admin/use-javascript-learning";

export function JsProgress() {
  const { topics, ready, setItemStatus } = useJavascriptLearning();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const summary = useMemo(() => getLearningSummary(topics), [topics]);
  const level = useMemo(() => getCurrentLevel(summary.earnedXP), [summary.earnedXP]);
  const achievements = useMemo(() => getAchievements(topics, summary), [summary, topics]);
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) || null;

  return (
    <div className="space-y-5" data-testid="js-progress-page">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(32,211,255,.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(88,242,169,.16),transparent_32%)]" />
        <CardHeader
          className="relative z-10"
          eyebrow="Système d’apprentissage dynamique"
          action={<Badge tone={ready ? "green" : "amber"}>{ready ? "MongoDB synchronisé" : "Chargement"}</Badge>}
        >
          <CardTitle className="text-2xl sm:text-3xl">JS Progress</CardTitle>
          <CardDescription>
            Une progression calculée depuis les fichiers JSON d’apprentissage. Ajoute une notion ou un exercice dans les données, le dashboard recalcule automatiquement les statistiques, l’XP et les achievements.
          </CardDescription>
        </CardHeader>
        <div className="relative z-10 mt-4 flex flex-wrap gap-2 text-xs font-black text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-2/20 bg-brand-2/10 px-3 py-1.5"><Database size={14} /> Données JSON</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-3/20 bg-brand-3/10 px-3 py-1.5"><Sparkles size={14} /> Calculs automatiques</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5"><BookOpenCheck size={14} /> Progression persistante</span>
        </div>
      </Card>

      <LearningSummary summary={summary} level={level} unlockedAchievements={achievements.filter((achievement) => achievement.unlocked).length} />

      <section className="space-y-3" aria-labelledby="learning-topics-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Parcours</p>
            <h2 id="learning-topics-title" className="mt-1 text-2xl font-black">Notions JavaScript</h2>
          </div>
          <span className="text-sm font-bold text-muted">{topics.length} notions chargées depuis `src/data/learning`</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {topics.map((topic) => <LearningTopicCard key={topic.id} topic={topic} onOpen={() => setSelectedTopicId(topic.id)} />)}
        </div>
      </section>

      <LearningAchievementGrid achievements={achievements} />

      <LearningDetailModal
        topic={selectedTopic}
        onClose={() => setSelectedTopicId(null)}
        onSetStatus={setItemStatus}
      />
    </div>
  );
}
