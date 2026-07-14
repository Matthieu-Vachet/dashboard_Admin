"use client";

import { Check, Code2, Copy, Edit3, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { initialSnippets, type Snippet } from "@/data/personal-dashboard-defaults";
import { usePersistentState } from "@/lib/use-persistent-state";

const emptySnippet: Snippet = {
  id: "",
  title: "Nouveau snippet",
  language: "javascript",
  category: "Frontend",
  tags: "",
  content: "",
};

const snippetTones = [
  "border-cyan-300/24 bg-cyan-400/8",
  "border-emerald-300/24 bg-emerald-400/8",
  "border-violet-300/24 bg-violet-400/8",
  "border-amber-300/24 bg-amber-400/8",
  "border-rose-300/24 bg-rose-400/8",
];

export function SnippetVault() {
  const [snippets, setSnippets, ready] = usePersistentState("matweb.tools.snippets", initialSnippets);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    setSnippets((current) => {
      const existingIds = new Set(current.map((snippet) => snippet.id));
      const missing = initialSnippets.filter((snippet) => !existingIds.has(snippet.id));
      return missing.length ? [...current, ...missing] : current;
    });
  }, [ready, setSnippets]);

  /** Filtre côté client pour retrouver un snippet par langage, tag ou contenu. */
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return snippets;
    return snippets.filter((snippet) =>
      [snippet.title, snippet.language, snippet.category, snippet.tags, snippet.content]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query, snippets]);

  /** Normalise puis sauvegarde un snippet dans le stockage persistant du dashboard. */
  function saveSnippet(snippet: Snippet) {
    const normalized = {
      ...snippet,
      id: snippet.id || `s${Date.now()}`,
      title: snippet.title.trim() || "Snippet sans titre",
    };
    setSnippets((current) => {
      const exists = current.some((item) => item.id === normalized.id);
      return exists
        ? current.map((item) => (item.id === normalized.id ? normalized : item))
        : [normalized, ...current];
    });
    setEditing(null);
    toast.success("Snippet enregistré.");
  }

  /** Copie le contenu sans modifier le snippet enregistré. */
  async function copySnippet(snippet: Snippet) {
    try {
      await navigator.clipboard.writeText(snippet.content);
      setCopiedId(snippet.id);
      toast.success("Snippet copié.");
      window.setTimeout(() => setCopiedId(null), 1200);
    } catch {
      toast.error("Impossible de copier ce snippet.");
    }
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone={ready ? "green" : "neutral"}>{ready ? "Coffre synchronisé" : "Chargement"}</Badge>
          <h2 className="mt-3 text-3xl font-black">Snippets de code</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            Ajoute, classe et copie tes bouts de code en un clic.
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={17} />}
          type="button"
          onClick={() => setEditing({ ...emptySnippet })}
        >
          Ajouter
        </Button>
      </Card>

      <Card className="p-4">
        <label className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted">
          <Search size={16} />
          <Input
            aria-label="Rechercher langage, tag, contenu..."
            className="min-h-0 border-0 bg-transparent px-0 focus:bg-transparent"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher langage, tag, contenu..."
          />
        </label>
      </Card>

      <section className="grid min-w-0 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((snippet, index) => (
          <Card key={snippet.id} className={`min-w-0 overflow-hidden p-4 ${snippetTones[index % snippetTones.length]}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-2">
                  {snippet.language || "code"}
                </p>
                <h3 className="mt-2 break-words text-lg font-black">{snippet.title}</h3>
                <p className="mt-1 break-words text-xs font-bold text-muted">
                  {[snippet.category, snippet.tags].filter(Boolean).join(" · ") || "Sans catégorie"}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-2/10 text-brand-2">
                <Code2 size={18} />
              </span>
            </div>
            <pre className="mt-4 max-h-64 max-w-full overflow-auto whitespace-pre-wrap break-all rounded-lg border border-line bg-slate-950/70 p-3 font-mono text-xs leading-6 text-cyan-50">
              <code>{snippet.content || "// vide"}</code>
            </pre>
            <div className="mt-4 grid gap-2 min-[420px]:grid-cols-[1fr_1fr_auto]">
              <Button icon={copiedId === snippet.id ? <Check size={15} /> : <Copy size={15} />} type="button" onClick={() => copySnippet(snippet)}>
                {copiedId === snippet.id ? "Copié" : "Copier"}
              </Button>
              <Button icon={<Edit3 size={15} />} type="button" onClick={() => setEditing({ ...snippet })}>
                Modifier
              </Button>
              <Button
                size="icon"
                variant="danger"
                type="button"
                aria-label="Supprimer le snippet"
                onClick={() => {
                  setSnippets((current) => current.filter((item) => item.id !== snippet.id));
                  toast.success("Snippet supprimé.");
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </section>

      <SnippetModal
        snippet={editing}
        onChange={setEditing}
        onClose={() => setEditing(null)}
        onSave={saveSnippet}
      />
    </div>
  );
}

function SnippetModal({
  snippet,
  onChange,
  onClose,
  onSave,
}: {
  snippet: Snippet | null;
  onChange: (snippet: Snippet) => void;
  onClose: () => void;
  onSave: (snippet: Snippet) => void;
}) {
  const draft = snippet || emptySnippet;

  return (
    <Modal
      open={Boolean(snippet)}
      title={draft.title || "Snippet"}
      description="Langage, catégorie, tags et contenu copiable."
      onClose={onClose}
    >
      <div className="space-y-4">
        <Input value={draft.title} onChange={(event) => onChange({ ...draft, title: event.target.value })} />
        <div className="grid gap-3 sm:grid-cols-3">
          <Input value={draft.language || ""} placeholder="javascript" onChange={(event) => onChange({ ...draft, language: event.target.value })} />
          <Input value={draft.category || ""} placeholder="Frontend" onChange={(event) => onChange({ ...draft, category: event.target.value })} />
          <Input value={draft.tags || ""} placeholder="fetch, auth" onChange={(event) => onChange({ ...draft, tags: event.target.value })} />
        </div>
        <Textarea
          className="min-h-80 resize-y font-mono text-xs"
          value={draft.content}
          onChange={(event) => onChange({ ...draft, content: event.target.value })}
          placeholder="Colle ton snippet ici..."
        />
        <Button className="w-full" variant="primary" icon={<Check size={16} />} type="button" onClick={() => onSave(draft)}>
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}
