"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, FileJson2, History, RotateCcw, UploadCloud, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/admin/shared/state-system";
import { validateLearningTopic } from "@/lib/learning/schema";
import {
  fetchLearningImports,
  importLearningTopic,
  rollbackLearningImport,
  type LearningImportHistoryItem,
} from "@/services/admin/learning-api";
import type { LearningImportStrategy, LearningTopic, LearningValidationIssue } from "@/types/admin/learning";

const maxFileBytes = 2_000_000;

export function LearningImportModal({ open, topics, onClose, onChanged }: {
  open: boolean;
  topics: LearningTopic[];
  onClose: () => void;
  onChanged: () => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [raw, setRaw] = useState("");
  const [topic, setTopic] = useState<LearningTopic | null>(null);
  const [issues, setIssues] = useState<LearningValidationIssue[]>([]);
  const [strategy, setStrategy] = useState<LearningImportStrategy>("create");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [history, setHistory] = useState<LearningImportHistoryItem[]>([]);

  const refreshHistory = useCallback(async () => {
    try {
      const result = await fetchLearningImports();
      setHistory(result.imports);
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => void refreshHistory(), 0);
    return () => window.clearTimeout(timer);
  }, [open, refreshHistory]);

  const inspectFile = useCallback(async (selected: File) => {
    setMessage(null);
    setTopic(null);
    setIssues([]);
    setRaw("");
    if (!selected.name.toLowerCase().endsWith(".json")) {
      setIssues([{ path: "$", message: "Seuls les fichiers .json sont acceptés.", severity: "error" }]);
      return;
    }
    if (selected.size > maxFileBytes) {
      setIssues([{ path: "$", message: "Le fichier dépasse la limite de 2 Mo.", severity: "error" }]);
      return;
    }
    setFile(selected);
    const text = await selected.text();
    setRaw(text);
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      setIssues([{ path: "$", message: error instanceof Error ? `JSON malformé : ${error.message}` : "JSON malformé.", severity: "error" }]);
      return;
    }
    const validation = validateLearningTopic(parsed);
    setIssues(validation.issues);
    if (!validation.success) return;
    setTopic(validation.data);
    setStrategy(topics.some((item) => item.id === validation.data.id) ? "merge" : "create");
  }, [topics]);

  const preview = useMemo(() => {
    if (!topic) return null;
    const totalXp = [topic.theory, ...topic.exercises, ...topic.pseudocode, ...topic.challenges, ...topic.projects].reduce((sum, item) => sum + item.xp, 0);
    return {
      exists: topics.some((item) => item.id === topic.id),
      totalXp,
      counts: [
        ["Exercices", topic.exercises.length],
        ["Pseudo-codes", topic.pseudocode.length],
        ["Challenges", topic.challenges.length],
        ["Projets", topic.projects.length],
        ["Ressources", topic.resources.length],
      ] as const,
    };
  }, [topic, topics]);

  async function submit() {
    if (!topic || !file) return;
    setLoading(true);
    setMessage(null);
    try {
      const result = await importLearningTopic({ topic, strategy, fileName: file.name });
      const preservation = strategy === "create" ? "Nouveau contenu disponible immédiatement." : "Contenu mis à jour sans perte de progression.";
      setMessage({ tone: "success", text: `Import réussi : ${result.added} élément(s) ajouté(s), ${result.updated} mis à jour. ${preservation}` });
      await Promise.all([onChanged(), refreshHistory()]);
    } catch (error) {
      const validationIssues = error && typeof error === "object" && "issues" in error ? (error as { issues?: LearningValidationIssue[] }).issues : undefined;
      if (validationIssues?.length) setIssues(validationIssues);
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Erreur serveur pendant l’import." });
    } finally {
      setLoading(false);
    }
  }

  async function rollback(id: string) {
    setLoading(true);
    setMessage(null);
    try {
      await rollbackLearningImport(id);
      setMessage({ tone: "success", text: "Rollback réussi. La version précédente a été restaurée et la progression personnelle est préservée." });
      await Promise.all([onChanged(), refreshHistory()]);
    } catch (error) {
      setMessage({ tone: "error", text: error instanceof Error ? error.message : "Rollback impossible." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} title="Importer un JSON pédagogique" description="Validation stricte côté navigateur puis côté serveur. La progression personnelle n’est jamais incluse dans l’import." className="max-w-6xl" onClose={onClose}>
      <div className="space-y-5">
        <input ref={inputRef} className="sr-only" type="file" accept=".json,application/json" onChange={(event) => { const selected = event.target.files?.[0]; if (selected) void inspectFile(selected); }} />
        <button
          className="grid min-h-40 w-full place-items-center rounded-lg border border-dashed border-brand-2/35 bg-brand-2/[0.045] p-6 text-center transition hover:bg-brand-2/10"
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => { event.preventDefault(); const selected = event.dataTransfer.files?.[0]; if (selected) void inspectFile(selected); }}
        >
          <span>
            <UploadCloud className="mx-auto text-brand-2" size={30} />
            <strong className="mt-3 block">Sélectionner ou déposer un fichier .json</strong>
            <span className="mt-1 block text-sm font-semibold text-muted">Taille maximale : 2 Mo</span>
          </span>
        </button>

        {file ? <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface-recessed p-3"><span className="inline-flex items-center gap-2 text-sm font-black"><FileJson2 size={17} className="text-brand-2" /> {file.name}</span><span className="font-mono text-xs font-bold text-muted">{new Intl.NumberFormat("fr-FR").format(file.size)} octets</span></div> : null}

        {issues.length ? (
          <section className="rounded-lg border border-danger/25 bg-danger/[0.05] p-4">
            <h3 className="flex items-center gap-2 font-black text-danger"><XCircle size={17} /> Fichier invalide · {issues.length} erreur(s)</h3>
            <div className="mt-3 max-h-48 space-y-2 overflow-auto">
              {issues.map((issue, index) => <div className="rounded-md bg-surface-recessed p-2 font-mono text-xs" key={`${issue.path}-${index}`}><strong className="text-danger">{issue.path}</strong> : {issue.message}</div>)}
            </div>
          </section>
        ) : null}

        {topic && preview ? (
          <section className="rounded-lg border border-brand-3/25 bg-brand-3/[0.045] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-xs font-black uppercase tracking-[0.14em] text-brand-3">Aperçu validé</p><h3 className="mt-1 text-xl font-black">{topic.title}</h3><p className="mt-1 text-sm font-semibold text-muted">{topic.id} · {topic.category} · {topic.difficulty}</p></div>
              <Badge tone={preview.exists ? "amber" : "green"}>{preview.exists ? "Thème existant · mise à jour" : "Nouveau thème"}</Badge>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {preview.counts.map(([label, count]) => <div className="rounded-lg border border-line bg-surface-recessed p-3" key={label}><span className="text-[10px] font-black uppercase tracking-[0.12em] text-muted">{label}</span><strong className="mt-1 block text-xl">{count}</strong></div>)}
              <div className="rounded-lg border border-line bg-surface-recessed p-3"><span className="text-[10px] font-black uppercase tracking-[0.12em] text-muted">XP possible</span><strong className="mt-1 block text-xl">{preview.totalXp}</strong></div>
            </div>
            <fieldset className="mt-4">
              <legend className="text-xs font-black uppercase tracking-[0.14em] text-muted">Stratégie d’import</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {preview.exists ? (
                  <>
                    <Strategy value="merge" current={strategy} title="Fusionner" description="Met à jour par ID et conserve les éléments absents du fichier." onChange={setStrategy} />
                    <Strategy value="replace" current={strategy} title="Remplacer" description="Sauvegarde puis remplace complètement le contenu du thème." onChange={setStrategy} />
                  </>
                ) : <Strategy value="create" current={strategy} title="Créer" description="Ajoute ce thème au catalogue MongoDB." onChange={setStrategy} />}
              </div>
            </fieldset>
            <div className="mt-4 flex justify-end"><Button variant="primary" disabled={loading} icon={<UploadCloud size={15} />} onClick={() => void submit()}>{loading ? "Import en cours…" : "Confirmer l’import MongoDB"}</Button></div>
          </section>
        ) : null}

        {raw ? <details className="rounded-lg border border-line bg-surface-recessed p-3"><summary className="cursor-pointer text-sm font-black">Aperçu JSON brut</summary><pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap break-all font-mono text-xs leading-5 text-muted">{raw.slice(0, 50_000)}{raw.length > 50_000 ? "\n… aperçu tronqué" : ""}</pre></details> : null}

        {message ? <div className={message.tone === "success" ? "flex items-center gap-2 rounded-lg border border-brand-3/25 bg-brand-3/[0.06] p-3 text-sm font-black text-brand-3" : "flex items-center gap-2 rounded-lg border border-danger/25 bg-danger/[0.06] p-3 text-sm font-black text-danger"}>{message.tone === "success" ? <CheckCircle2 size={17} /> : <AlertTriangle size={17} />}{message.text}</div> : null}

        <section className="rounded-lg border border-line bg-white/[0.025] p-4">
          <h3 className="flex items-center gap-2 font-black"><History size={17} className="text-brand-2" /> Historique des imports</h3>
          <div className="mt-3 grid gap-2">
            {history.length ? history.map((item) => (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface-recessed p-3" key={item.id}>
                <div><strong className="block text-sm">{item.fileName}</strong><span className="text-xs font-semibold text-muted">{item.topicId} · {item.strategy} · {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.createdAt))}</span></div>
                {item.canRollback ? <Button size="sm" icon={<RotateCcw size={14} />} disabled={loading} onClick={() => void rollback(item.id)}>Restaurer</Button> : <Badge>Restauré</Badge>}
              </div>
            )) : <EmptyState title="Aucun import enregistré" />}
          </div>
        </section>
      </div>
    </Modal>
  );
}

function Strategy({ value, current, title, description, onChange }: { value: LearningImportStrategy; current: LearningImportStrategy; title: string; description: string; onChange: (value: LearningImportStrategy) => void }) {
  return (
    <label className={current === value ? "cursor-pointer rounded-lg border border-brand-2/45 bg-brand-2/10 p-3" : "cursor-pointer rounded-lg border border-line bg-surface-recessed p-3"}>
      <input className="sr-only" type="radio" name="strategy" value={value} checked={current === value} onChange={() => onChange(value)} />
      <strong className="block text-sm">{title}</strong><span className="mt-1 block text-xs font-semibold leading-5 text-muted">{description}</span>
    </label>
  );
}
