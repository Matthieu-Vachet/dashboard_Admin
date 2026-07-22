"use client";

import { useState, type ReactNode } from "react";
import {
  AlertTriangle, BookOpen, CheckCircle2, CircleHelp, Clock3, Code2, Eye, ExternalLink,
  Lightbulb, Library, Play, Rocket, Save, ScrollText, ShieldAlert, Sparkles, Target, Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/input";
import { LEARNING_DIFFICULTY_CLASS, LEARNING_STATUS_CLASS, LEARNING_STATUS_LABEL } from "@/constants/admin/learning";
import { getTopicStats, isCompletedLearningStatus } from "@/lib/learning/javascript";
import type {
  LearningProgressMutationResult,
  LearningProgressPatch,
  LearningStatus,
  LearningTheorySection,
  RuntimeLearningChallenge,
  RuntimeLearningExercise,
  RuntimeLearningProject,
  RuntimeLearningPseudocode,
  RuntimeLearningTheory,
  RuntimeLearningTopic,
} from "@/types/admin/learning";

export function LearningDetailModal({
  topic,
  saving,
  onClose,
  onSetProgress,
  onNotify,
}: {
  topic: RuntimeLearningTopic | null;
  saving: boolean;
  onClose: () => void;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
  onNotify: (tone: "success" | "warning" | "error", message: string) => void;
}) {
  if (!topic) return null;
  const stats = getTopicStats(topic);

  return (
    <Modal
      open
      title={`Chapitre ${topic.chapterNumber} · ${topic.title}`}
      description={`${topic.category} · ${topic.difficulty} · ${stats.progress}% calculé depuis la progression personnelle`}
      className="max-w-6xl"
      onClose={onClose}
    >
      <div className="space-y-5">
        <section className="grid gap-3 md:grid-cols-3">
          <Info label="Description" value={topic.description} />
          <Info label="Livre" value={topic.book.references.map((item) => `Chap. ${item.chapter} · p. ${item.pages}`).join(" · ")} />
          <Info label="XP" value={`${stats.earnedXP} / ${stats.totalXP}`} />
        </section>

        <section className="grid gap-4 rounded-lg border border-line bg-surface-faint p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Library size={18} className="text-brand-2" />
            <h3 className="text-lg font-black">Prérequis et ressources</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.prerequisites.length ? topic.prerequisites.map((item) => <Badge key={item}>{item}</Badge>) : <span className="text-sm font-semibold text-muted">Aucun prérequis.</span>}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {topic.resources.map((resource) => (
              <a className="flex items-center justify-between gap-3 rounded-lg border border-brand-2/20 bg-brand-2/[0.06] px-3 py-3 text-sm font-black text-brand-2 transition hover:bg-brand-2/15" href={resource.url} key={resource.id} target={resource.url.startsWith("/") ? undefined : "_blank"} rel="noreferrer">
                <span>{resource.label}</span><ExternalLink size={14} />
              </a>
            ))}
          </div>
        </section>

        <TheoryCard item={topic.theory} references={topic.book.references} saving={saving} onSetProgress={onSetProgress} />

        <UnitSection icon={<Code2 size={18} />} title="Exercices" completed={topic.exercises.filter((item) => isCompletedLearningStatus(item.status)).length} total={topic.exercises.length}>
          {topic.exercises.map((item) => <ExerciseCard item={item} key={item.id} saving={saving} onSetProgress={onSetProgress} />)}
        </UnitSection>

        <UnitSection icon={<ScrollText size={18} />} title="Pseudo-codes" completed={topic.pseudocode.filter((item) => isCompletedLearningStatus(item.status)).length} total={topic.pseudocode.length}>
          {topic.pseudocode.map((item) => <PseudocodeCard item={item} key={item.id} saving={saving} onSetProgress={onSetProgress} onNotify={onNotify} />)}
        </UnitSection>

        <UnitSection icon={<Target size={18} />} title="Challenges" completed={topic.challenges.filter((item) => isCompletedLearningStatus(item.status)).length} total={topic.challenges.length}>
          {topic.challenges.map((item) => <ChallengeCard item={item} key={item.id} saving={saving} onSetProgress={onSetProgress} />)}
        </UnitSection>

        <UnitSection icon={<Rocket size={18} />} title="Projets" completed={topic.projects.filter((item) => isCompletedLearningStatus(item.status)).length} total={topic.projects.length}>
          {topic.projects.map((item) => <ProjectCard item={item} key={item.id} saving={saving} onSetProgress={onSetProgress} />)}
        </UnitSection>

        <section className="rounded-lg border border-brand-3/25 bg-brand-3/[0.05] p-4">
          <div className="flex items-center gap-2"><Trophy size={18} className="text-brand-3" /><h3 className="font-black">Achievements liés</h3></div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {topic.achievements.map((achievement) => (
              <div className="rounded-lg border border-line bg-surface-recessed p-3" key={achievement.id}>
                <div className="flex items-center gap-2 text-sm font-black"><Trophy size={14} /> {achievement.title}</div>
                <p className="mt-1 text-xs font-semibold text-muted">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}

function TheoryCard({ item, references, saving, onSetProgress }: {
  item: RuntimeLearningTheory;
  references: RuntimeLearningTopic["book"]["references"];
  saving: boolean;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
}) {
  return (
    <section className="rounded-lg border border-brand-2/25 bg-brand-2/[0.045] p-4 sm:p-5">
      <CardHeader icon={<BookOpen size={18} />} title={item.title} item={item} />
      <p className="mt-4 text-sm font-bold leading-6 text-foreground">{item.summary}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-muted">{item.description}</p>
      {item.sections?.length ? <TheorySections sections={item.sections} /> : null}
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <ListBlock title="Objectifs pédagogiques" items={item.objectives} />
        <ListBlock title="Livre" items={references.map((reference) => `${reference.title} · chapitre ${reference.chapter} · pages ${reference.pages}`)} />
        <ListBlock title="Erreurs fréquentes" items={item.commonMistakes} tone="danger" />
        <ListBlock title="Bonnes pratiques" items={item.bestPractices} tone="success" />
      </div>
      <div className="mt-4 rounded-lg border border-brand-3/20 bg-brand-3/[0.06] p-3">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-brand-3">Résumé final</span>
        <p className="mt-2 text-sm font-semibold leading-6">{item.finalSummary}</p>
      </div>
      <div className="mt-4 flex justify-end"><ProgressButton item={item} startLabel="Commencer la théorie" saving={saving} onSetProgress={onSetProgress} /></div>
    </section>
  );
}

function ExerciseCard({ item, saving, onSetProgress }: { item: RuntimeLearningExercise; saving: boolean; onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null> }) {
  return (
    <UnitCard>
      <CardHeader icon={<CheckCircle2 size={17} />} title={item.title} item={item} />
      <p className="mt-3 text-sm font-semibold leading-6 text-muted">{item.description}</p>
      <MetaBlock label="Objectif" value={item.objective} />
      <TagRow label="Compétences" items={item.skills} />
      <TagRow label="Prérequis" items={item.prerequisites} empty="Aucun" />
      {item.hint ? <details className="mt-3 rounded-lg border border-warning/20 bg-warning/[0.05] p-3"><summary className="cursor-pointer text-sm font-black text-warning">Afficher l’indice</summary><p className="mt-2 text-sm font-semibold text-muted">{item.hint}</p></details> : null}
      <Validation items={item.validation} />
      <div className="mt-4 flex justify-end"><ProgressButton item={item} saving={saving} onSetProgress={onSetProgress} /></div>
    </UnitCard>
  );
}

function PseudocodeCard({ item, saving, onSetProgress, onNotify }: { item: RuntimeLearningPseudocode; saving: boolean; onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>; onNotify: (tone: "success" | "warning" | "error", message: string) => void }) {
  const [answer, setAnswer] = useState(item.answer || "");
  const [correctionVisible, setCorrectionVisible] = useState(false);
  const canWrite = item.status === "in_progress" || item.status === "reviewing";

  async function saveAnswer() {
    if (!answer.trim()) {
      onNotify("warning", "Réponse vide : écris une tentative avant de sauvegarder.");
      return;
    }
    await onSetProgress(item.id, { answer });
  }

  async function showCorrection() {
    if (correctionVisible) {
      setCorrectionVisible(false);
      return;
    }
    if (!item.answer?.trim()) {
      const confirmed = window.confirm("Tu n’as pas encore enregistré de tentative. Voir la correction maintenant peut réduire l’intérêt de l’exercice. Continuer ?");
      if (!confirmed) return;
    }
    if (!item.correctionViewed) await onSetProgress(item.id, { correctionViewed: true });
    setCorrectionVisible(true);
  }

  return (
    <UnitCard>
      <CardHeader icon={<ScrollText size={17} />} title={item.title} item={item} />
      <MetaBlock label="Objectif" value={item.objective} />
      <MetaBlock label="Situation" value={item.situation} />
      <p className="mt-3 text-sm font-semibold leading-6 text-muted">{item.description}</p>
      <label className="mt-4 block text-xs font-black uppercase tracking-[0.14em] text-brand-2" htmlFor={`${item.id}-answer`}>Zone de rédaction</label>
      <Textarea id={`${item.id}-answer`} className="mt-2 font-mono" placeholder={canWrite ? "Écris ton pseudo-code ici…" : "Commence le pseudo-code pour rédiger une réponse."} value={answer} disabled={!canWrite || saving} onChange={(event) => setAnswer(event.target.value)} />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-muted">{item.savedAt ? `Sauvegardée le ${new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(new Date(item.savedAt))}` : "Aucune réponse enregistrée"}</span>
        <Button size="sm" icon={<Save size={14} />} disabled={saving || !canWrite} onClick={() => void saveAnswer()}>Enregistrer</Button>
      </div>
      <div className="mt-3 rounded-lg border border-brand/20 bg-brand/[0.05] p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button className="inline-flex items-center gap-2 text-sm font-black text-brand" type="button" aria-expanded={correctionVisible} onClick={() => void showCorrection()}><Eye size={15} /> {correctionVisible ? "Masquer la correction" : "Voir la correction"}</button>
          {item.correctionViewed ? <Badge className="border-brand/25 bg-brand/10 text-brand">Correction consultée</Badge> : null}
        </div>
        {correctionVisible ? <p className="mt-3 whitespace-pre-wrap font-mono text-sm leading-6 text-muted">{item.correction}</p> : null}
      </div>
      <Validation items={item.validation} />
      <div className="mt-4 flex justify-end"><ProgressButton item={item} saving={saving} onSetProgress={onSetProgress} /></div>
    </UnitCard>
  );
}

function ChallengeCard({ item, saving, onSetProgress }: { item: RuntimeLearningChallenge; saving: boolean; onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null> }) {
  return (
    <UnitCard>
      <CardHeader icon={<Target size={17} />} title={item.title} item={item} />
      <p className="mt-3 text-sm font-semibold leading-6 text-muted">{item.description}</p>
      <MetaBlock label="Objectif" value={item.objective} />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <ListBlock title="Contraintes" items={item.constraints} />
        <ListBlock title="Fonctionnalités obligatoires" items={item.requiredFeatures} tone="success" />
        <ListBlock title="Bonus" items={item.bonusFeatures} />
        <ListBlock title="Interdit" items={item.forbidden} tone="danger" />
      </div>
      <TagRow label="Notions utilisées" items={item.concepts} />
      <Validation items={item.validation} />
      <div className="mt-4 flex justify-end"><ProgressButton item={item} saving={saving} onSetProgress={onSetProgress} /></div>
    </UnitCard>
  );
}

function ProjectCard({ item, saving, onSetProgress }: { item: RuntimeLearningProject; saving: boolean; onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null> }) {
  return (
    <UnitCard>
      <CardHeader icon={<Rocket size={17} />} title={item.title} item={item} />
      <MetaBlock label="Contexte" value={item.context} />
      <MetaBlock label="Objectif" value={item.objective} />
      <p className="mt-3 text-sm font-semibold leading-6 text-muted">{item.description}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <ListBlock title="Fonctionnalités" items={item.features} tone="success" />
        <ListBlock title="Contraintes" items={item.constraints} />
        <ListBlock title="Bonus" items={item.bonusFeatures} />
        <ListBlock title="Pseudo-code conseillé" items={item.suggestedPseudocode} />
      </div>
      <TagRow label="Notions utilisées" items={item.concepts} />
      <TagRow label="Compétences validées" items={item.validatedSkills} />
      <Validation items={item.validation} />
      <div className="mt-4 flex justify-end"><ProgressButton item={item} saving={saving} onSetProgress={onSetProgress} /></div>
    </UnitCard>
  );
}

function CardHeader({ icon, title, item }: { icon: ReactNode; title: string; item: { status: LearningStatus; difficulty?: string; estimatedMinutes: number; xp: number } }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2 text-lg font-black text-foreground"><span className="text-brand-2">{icon}</span><h3>{title}</h3></div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={LEARNING_STATUS_CLASS[item.status]}>{LEARNING_STATUS_LABEL[item.status]}</Badge>
        {item.difficulty && item.difficulty in LEARNING_DIFFICULTY_CLASS ? <Badge className={LEARNING_DIFFICULTY_CLASS[item.difficulty as keyof typeof LEARNING_DIFFICULTY_CLASS]}>{item.difficulty}</Badge> : null}
        <Badge><Clock3 size={12} /> {item.estimatedMinutes} min</Badge>
        <Badge tone="cyan"><Sparkles size={12} /> {item.xp} XP</Badge>
      </div>
    </div>
  );
}

function ProgressButton({ item, saving, startLabel = "Commencer", onSetProgress }: {
  item: { id: string; status: LearningStatus };
  saving: boolean;
  startLabel?: string;
  onSetProgress: (id: string, patch: LearningProgressPatch) => Promise<LearningProgressMutationResult | null>;
}) {
  if (item.status === "completed") return <Button size="sm" disabled icon={<CheckCircle2 size={14} />}>Terminé</Button>;
  if (item.status === "reviewing") return <Button size="sm" disabled icon={<BookOpen size={14} />}>En révision</Button>;
  const nextStatus = item.status === "not_started" ? "in_progress" : "completed";
  async function update() {
    if (nextStatus === "completed") {
      const confirmed = window.confirm("Confirmer la fin de cette unité ? L’XP ne sera attribuée qu’une seule fois.");
      if (!confirmed) return;
    }
    await onSetProgress(item.id, { status: nextStatus });
  }
  return (
    <Button variant={item.status === "in_progress" ? "primary" : "secondary"} size="sm" disabled={saving} icon={item.status === "in_progress" ? <CheckCircle2 size={14} /> : <Play size={14} />} onClick={() => void update()}>
      {item.status === "in_progress" ? "Terminer" : startLabel}
    </Button>
  );
}

function TheorySections({ sections }: { sections: LearningTheorySection[] }) {
  return (
    <div className="mt-5 space-y-4">
      {sections.map((section) => {
        const codeExamples = section.codeExamples || (section.code ? [{ code: section.code, language: section.language || "javascript" }] : []);
        const warnings = [...(section.warnings || []), ...(Array.isArray(section.warning) ? section.warning : section.warning ? [section.warning] : [])];
        const questions = [...(section.comprehensionQuestions || []), ...(section.questions || [])];
        return (
        <section className="rounded-lg border border-line bg-surface-recessed p-4" key={section.id} aria-labelledby={`theory-section-${section.id}`}>
          <h4 id={`theory-section-${section.id}`} className="text-lg font-black text-brand-2">{section.title}</h4>
          <LearningMarkdown content={section.content} />
          {codeExamples.map((example, index) => (
            <div className="mt-4 overflow-hidden rounded-lg border border-line bg-black/30" key={`${section.id}-code-${index}`}>
              <div className="border-b border-line px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.12em] text-muted">{example.language}</div>
              <pre className="overflow-x-auto p-3 font-mono text-sm leading-6 text-foreground"><code>{example.code}</code></pre>
              {example.explanation ? <p className="border-t border-line px-3 py-2 text-sm font-semibold leading-6 text-muted">{example.explanation}</p> : null}
            </div>
          ))}
          {warnings.length ? <div className="mt-4 rounded-lg border border-warning/25 bg-warning/[0.06] p-3"><h5 className="flex items-center gap-2 text-sm font-black text-warning"><AlertTriangle size={15} /> Avertissements</h5><ul className="mt-2 space-y-1 text-sm font-semibold text-muted">{warnings.map((warning, index) => <li key={`${warning}-${index}`}>• {warning}</li>)}</ul></div> : null}
          {section.tips?.length ? <ListBlock title="Conseils" items={section.tips} tone="success" /> : null}
          {questions.length ? <div className="mt-4 rounded-lg border border-brand/20 bg-brand/[0.05] p-3"><h5 className="flex items-center gap-2 text-sm font-black text-brand"><CircleHelp size={15} /> Questions de compréhension</h5><ol className="mt-2 list-decimal space-y-1 pl-5 text-sm font-semibold text-muted">{questions.map((question, index) => <li key={`${question}-${index}`}>{question}</li>)}</ol></div> : null}
          {section.summary ? <div className="mt-4 rounded-lg border border-brand-3/20 bg-brand-3/[0.05] p-3"><span className="text-xs font-black uppercase tracking-[0.13em] text-brand-3">Résumé intermédiaire</span><p className="mt-2 text-sm font-semibold leading-6 text-muted">{section.summary}</p></div> : null}
        </section>
      )})}
    </div>
  );
}

function LearningMarkdown({ content }: { content: string }) {
  return (
    <div className="mt-3 space-y-3 text-sm font-semibold leading-6 text-muted">
      {content.split(/\n{2,}/).map((block, index) => {
        const lines = block.split("\n");
        if (lines.every((line) => /^[-*]\s+/.test(line))) {
          return <ul className="list-disc space-y-1 pl-5" key={`list-${index}`}>{lines.map((line) => <li key={line}>{renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</li>)}</ul>;
        }
        const heading = block.match(/^(#{1,4})\s+(.+)$/);
        if (heading) return <h5 className="font-black text-foreground" key={`heading-${index}`}>{renderInlineMarkdown(heading[2])}</h5>;
        return <p className="whitespace-pre-wrap" key={`paragraph-${index}`}>{renderInlineMarkdown(block)}</p>;
      })}
    </div>
  );
}

function renderInlineMarkdown(value: string) {
  return value.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong className="font-black text-foreground" key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-xs text-brand-2" key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    return part;
  });
}

function UnitSection({ icon, title, completed, total, children }: { icon: ReactNode; title: string; completed: number; total: number; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-surface-faint p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-lg font-black"><span className="text-brand-2">{icon}</span>{title}</h3>
        <span className="font-mono text-xs font-black text-muted">{completed}/{total}</span>
      </div>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

function UnitCard({ children }: { children: ReactNode }) {
  return <article className="rounded-lg border border-line bg-surface-recessed p-4">{children}</article>;
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return <div className="mt-3"><span className="text-xs font-black uppercase tracking-[0.13em] text-brand-2">{label}</span><p className="mt-1 text-sm font-semibold leading-6 text-muted">{value}</p></div>;
}

function TagRow({ label, items, empty }: { label: string; items: string[]; empty?: string }) {
  return <div className="mt-3 flex flex-wrap items-center gap-2"><span className="mr-1 text-xs font-black uppercase tracking-[0.12em] text-muted">{label}</span>{items.length ? items.map((item) => <Badge key={item}>{item}</Badge>) : <span className="text-xs font-semibold text-muted">{empty}</span>}</div>;
}

function ListBlock({ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "danger" | "success" }) {
  const Icon = tone === "danger" ? ShieldAlert : tone === "success" ? CheckCircle2 : Lightbulb;
  const toneClass = tone === "danger" ? "text-danger" : tone === "success" ? "text-brand-3" : "text-brand-2";
  return (
    <div className="rounded-lg border border-line bg-surface-recessed p-3">
      <h4 className={`flex items-center gap-2 text-sm font-black ${toneClass}`}><Icon size={15} /> {title}</h4>
      {items.length ? <ul className="mt-2 space-y-1.5 text-sm font-semibold leading-5 text-muted">{items.map((item) => <li className="flex gap-2" key={item}><span aria-hidden>•</span><span>{item}</span></li>)}</ul> : <p className="mt-2 text-sm font-semibold text-muted">Aucun.</p>}
    </div>
  );
}

function Validation({ items }: { items: string[] }) {
  return <div className="mt-4 rounded-lg border border-brand-3/20 bg-brand-3/[0.045] p-3"><h4 className="flex items-center gap-2 text-sm font-black text-brand-3"><CheckCircle2 size={15} /> Critères de validation</h4><ul className="mt-2 space-y-1 text-sm font-semibold text-muted">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-line bg-surface-recessed p-3"><span className="block text-[11px] font-black uppercase tracking-[0.16em] text-muted">{label}</span><strong className="mt-2 block text-sm leading-6">{value}</strong></div>;
}
