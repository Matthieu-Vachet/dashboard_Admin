"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BookOpenCheck, CheckCircle2, Database, Download, HardDrive, Sparkles, UploadCloud, X } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LearningAchievementGrid } from "@/components/admin/learning/learning-achievement-grid";
import { LearningActivityTimeline } from "@/components/admin/learning/learning-activity";
import { LearningAdvancedStats } from "@/components/admin/learning/learning-advanced-stats";
import { LearningDetailModal } from "@/components/admin/learning/learning-detail-modal";
import { LearningImportModal } from "@/components/admin/learning/learning-import-modal";
import { LearningSummary } from "@/components/admin/learning/learning-summary";
import { LearningTopicCard } from "@/components/admin/learning/learning-topic-card";
import { getAchievements, getCurrentLevel, getLearningSummary } from "@/lib/learning/javascript";
import { useJavascriptLearning } from "@/hooks/admin/use-javascript-learning";

export function JsProgress() {
  const {
    topics, curriculum, progress, activity, stats, ready, saving, databaseConfigured,
    source, warning, error, notice, notify, clearNotice, setItemProgress, refresh,
  } = useJavascriptLearning();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const summary = useMemo(() => getLearningSummary(topics), [topics]);
  const level = useMemo(() => getCurrentLevel(summary.earnedXP), [summary.earnedXP]);
  const achievements = useMemo(() => getAchievements(topics, summary, curriculum), [curriculum, summary, topics]);
  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId) || null;

  return (
    <div className="space-y-6" data-testid="js-progress-page">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(32,211,255,.2),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(88,242,169,.16),transparent_32%)]" />
        <CardHeader
          className="relative z-10 flex-col sm:flex-row"
          eyebrow="Plateforme d’apprentissage pilotée par les données"
          action={<Badge tone={!ready ? "amber" : databaseConfigured ? "green" : "amber"}>{!ready ? "Chargement" : databaseConfigured ? "MongoDB synchronisé" : "Mode local sécurisé"}</Badge>}
        >
          <CardTitle className="text-2xl sm:text-3xl">JS Progress V2</CardTitle>
          <CardDescription>
            Le contenu pédagogique et la progression personnelle sont maintenant séparés. Le curriculum ordonne les notions ; MongoDB conserve l’avancement, l’XP et l’activité réelle.
          </CardDescription>
        </CardHeader>
        <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-xs font-black text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-2/20 bg-brand-2/10 px-3 py-1.5"><Database size={14} /> Contenu : {source === "mongodb" ? "MongoDB" : "JSON local"}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-3/20 bg-brand-3/10 px-3 py-1.5"><Sparkles size={14} /> Calculs automatiques</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5"><BookOpenCheck size={14} /> Progression séparée</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" icon={<UploadCloud size={15} />} onClick={() => setImportOpen(true)}>Importer un JSON</Button>
            <Button asChild size="sm" icon={<Download size={15} />}><a href="/api/learning/export?scope=all">Exporter tout</a></Button>
            <Button asChild size="sm" variant="ghost"><a href="/api/learning/export?scope=curriculum">Curriculum</a></Button>
            <Button asChild size="sm" variant="ghost"><a href="/api/learning/export?scope=projects">Projets</a></Button>
            <Button asChild size="sm" variant="ghost"><a href="/api/learning/export?scope=achievements">Achievements</a></Button>
          </div>
        </div>
      </Card>

      {warning ? <div className="flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/[0.06] p-3 text-sm font-bold text-warning"><HardDrive className="mt-0.5 shrink-0" size={16} /><span>{warning}</span></div> : null}
      {error ? <div className="rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-bold text-danger">{error}</div> : null}
      {notice ? (
        <div className={notice.tone === "error" ? "flex items-start justify-between gap-3 rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-bold text-danger" : notice.tone === "warning" ? "flex items-start justify-between gap-3 rounded-lg border border-warning/25 bg-warning/[0.06] p-3 text-sm font-bold text-warning" : "flex items-start justify-between gap-3 rounded-lg border border-brand-3/25 bg-brand-3/[0.06] p-3 text-sm font-bold text-brand-3"} role="status" aria-live="polite">
          <span className="flex items-start gap-2">{notice.tone === "success" ? <CheckCircle2 className="mt-0.5 shrink-0" size={16} /> : <AlertTriangle className="mt-0.5 shrink-0" size={16} />}{notice.message}</span>
          <button className="shrink-0 rounded p-1 hover:bg-surface-emphasis" type="button" aria-label="Masquer le message" onClick={clearNotice}><X size={15} /></button>
        </div>
      ) : null}

      <LearningSummary summary={summary} level={level} unlockedAchievements={achievements.filter((achievement) => achievement.unlocked).length} />
      <LearningAdvancedStats stats={stats} />

      <section className="space-y-4" aria-labelledby="learning-topics-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Parcours</p><h2 id="learning-topics-title" className="mt-1 text-2xl font-black">Notions JavaScript</h2></div>
          <span className="text-sm font-bold text-muted">{topics.length} notions actives · {curriculum.levels.reduce((sum, item) => sum + item.plannedTopics.length, 0)} planifiées</span>
        </div>
        {[...curriculum.levels].sort((left, right) => left.order - right.order).map((curriculumLevel) => {
          const levelTopics = curriculumLevel.topics.map((id) => topics.find((topic) => topic.id === id)).filter((topic): topic is NonNullable<typeof topic> => Boolean(topic));
          if (!levelTopics.length) return null;
          return (
            <div className="space-y-3" key={curriculumLevel.id}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2">
                <div><h3 className="text-lg font-black">Niveau {curriculumLevel.order} · {curriculumLevel.title}</h3><p className="mt-1 text-sm font-semibold text-muted">{curriculumLevel.description}</p></div>
                {curriculumLevel.plannedTopics.length ? <Badge>{curriculumLevel.plannedTopics.length} notion(s) à venir</Badge> : null}
              </div>
              <div className="grid gap-4 lg:grid-cols-2">{levelTopics.map((topic) => <LearningTopicCard key={topic.id} topic={topic} onOpen={() => setSelectedTopicId(topic.id)} />)}</div>
            </div>
          );
        })}
      </section>

      <LearningAchievementGrid achievements={achievements} />
      <LearningActivityTimeline activity={activity} />

      <LearningDetailModal topic={selectedTopic} saving={saving} onClose={() => setSelectedTopicId(null)} onSetProgress={setItemProgress} onNotify={notify} />
      <LearningImportModal open={importOpen} topics={topics} onClose={() => setImportOpen(false)} onChanged={refresh} />
      <span className="sr-only" aria-live="polite">{Object.keys(progress).length} progressions chargées.</span>
    </div>
  );
}
