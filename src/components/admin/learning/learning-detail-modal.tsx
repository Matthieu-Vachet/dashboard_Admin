import { BookOpen, CheckCircle2, ExternalLink, Library, LockKeyhole, Play, Rocket, ScrollText, Target, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { LEARNING_DIFFICULTY_CLASS, LEARNING_STATUS_CLASS, LEARNING_STATUS_LABEL } from "@/constants/admin/learning";
import { getTopicStats } from "@/lib/learning/javascript";
import type { LearningItem, LearningStatus, LearningTopic } from "@/types/admin/learning";

export function LearningDetailModal({
  topic,
  onClose,
  onSetStatus,
}: {
  topic: LearningTopic | null;
  onClose: () => void;
  onSetStatus: (id: string, status: LearningStatus) => void;
}) {
  if (!topic) return null;
  const stats = getTopicStats(topic);

  return (
    <Modal
      open
      title={topic.title}
      description={`${topic.category} · ${topic.difficulty} · ${stats.progress}% calculé automatiquement`}
      className="max-w-5xl"
      onClose={onClose}
    >
      <div className="space-y-5">
        <section className="grid gap-3 md:grid-cols-3">
          <Info label="Description" value={topic.description} />
          <Info label="Livre" value={`Chapitre ${topic.book.chapter} · pages ${topic.book.pages}`} />
          <Info label="XP" value={`${stats.earnedXP} / ${stats.totalXP}`} />
        </section>

        <section className="grid gap-4 rounded-lg border border-line bg-white/[0.035] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Library size={18} className="text-brand-2" />
            <h3 className="text-lg font-black">Prérequis et ressources</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.prerequisites.length ? topic.prerequisites.map((item) => <Badge key={item}>{item}</Badge>) : <span className="text-sm font-semibold text-muted">Aucun prérequis.</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="inline-flex items-center gap-2 rounded-lg border border-brand-2/25 bg-brand-2/10 px-3 py-2 text-sm font-black text-brand-2 hover:bg-brand-2/20" href={topic.resources.mdn} target="_blank" rel="noreferrer">
              MDN <ExternalLink size={14} />
            </a>
            <a className="inline-flex items-center gap-2 rounded-lg border border-brand/25 bg-brand/10 px-3 py-2 text-sm font-black text-brand hover:bg-brand/20" href={topic.resources.roadmap} target="_blank" rel="noreferrer">
              roadmap.sh <ExternalLink size={14} />
            </a>
          </div>
        </section>

        <LearningUnit
          icon={BookOpen}
          title="Théorie"
          items={[{ id: `${topic.id}:theory`, title: "Lire et comprendre la théorie", status: topic.theory.status, xp: topic.theory.xp }]}
          onSetStatus={onSetStatus}
        />
        <LearningUnit icon={CheckCircle2} title="Exercices" items={topic.exercises} onSetStatus={onSetStatus} />
        <LearningUnit icon={ScrollText} title="Pseudo-codes" items={topic.pseudocode} onSetStatus={onSetStatus} />
        <LearningUnit icon={Target} title="Challenges" items={topic.challenges} onSetStatus={onSetStatus} />
        <LearningUnit icon={Rocket} title="Projets liés" items={topic.projects} onSetStatus={onSetStatus} />

        <section className="rounded-lg border border-brand-3/25 bg-brand-3/[0.05] p-4">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-brand-3" />
            <h3 className="font-black">Achievements liés</h3>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {topic.achievements.map((achievement) => (
              <div className="rounded-lg border border-line bg-black/15 p-3" key={achievement.id}>
                <div className="flex items-center gap-2 text-sm font-black"><LockKeyhole size={14} /> {achievement.title}</div>
                <p className="mt-1 text-xs font-semibold text-muted">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Modal>
  );
}

function LearningUnit({
  icon: Icon,
  items,
  onSetStatus,
  title,
}: {
  icon: typeof BookOpen;
  items: LearningItem[];
  onSetStatus: (id: string, status: LearningStatus) => void;
  title: string;
}) {
  return (
    <section className="rounded-lg border border-line bg-white/[0.035] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="inline-flex items-center gap-2 text-lg font-black"><Icon size={18} className="text-brand-2" /> {title}</h3>
        <span className="font-mono text-xs font-black text-muted">{items.filter((item) => item.status === "completed").length}/{items.length}</span>
      </div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-black/15 p-3" key={item.id}>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-black">{item.title}</h4>
                <Badge className={LEARNING_STATUS_CLASS[item.status]}>{LEARNING_STATUS_LABEL[item.status]}</Badge>
                {item.difficulty ? <Badge className={LEARNING_DIFFICULTY_CLASS[item.difficulty]}>{item.difficulty}</Badge> : null}
              </div>
              {item.description ? <p className="mt-1 text-sm font-semibold leading-5 text-muted">{item.description}</p> : null}
              <span className="mt-2 block font-mono text-xs font-black text-brand-2">+{item.xp} XP</span>
            </div>
            <button
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-line bg-white/[0.06] px-3 py-2 text-xs font-black text-foreground transition hover:border-brand-2/30 hover:text-brand-2"
              type="button"
              onClick={() => onSetStatus(item.id, item.status === "completed" ? "in_progress" : "completed")}
            >
              {item.status === "completed" ? "Réouvrir" : item.status === "in_progress" ? "Terminer" : "Commencer"}
              {item.status === "completed" ? <CheckCircle2 size={14} /> : <Play size={14} />}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-black/15 p-3">
      <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <strong className="mt-2 block text-sm leading-6">{value}</strong>
    </div>
  );
}
