"use client";

import { FileText, Plus, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { initialWriterDocuments, type WriterDocument } from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

export function WriterStudio() {
  const [documents, setDocuments, ready] = usePersistentState(
    "matweb.writer.documents",
    initialWriterDocuments,
  );
  const [selectedId, setSelectedId] = useState(initialWriterDocuments[0]?.id || "");
  const selected = useMemo(
    () => documents.find((document) => document.id === selectedId) || documents[0] || null,
    [documents, selectedId],
  );
  const words = selected?.body.trim().split(/\s+/).filter(Boolean).length || 0;

  function addDocument() {
    const document: WriterDocument = {
      id: `doc${Date.now()}`,
      title: "Nouveau document",
      body: "",
      updatedAt: new Date().toLocaleDateString("fr-FR"),
    };
    setDocuments((current) => [document, ...current]);
    setSelectedId(document.id);
  }

  function updateDocument(id: string, patch: Partial<WriterDocument>) {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? { ...document, ...patch, updatedAt: new Date().toLocaleDateString("fr-FR") }
          : document,
      ),
    );
  }

  function deleteDocument(id: string) {
    setDocuments((current) => {
      const next = current.filter((document) => document.id !== id);
      setSelectedId(next[0]?.id || "");
      return next;
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <Badge tone={ready ? "green" : "neutral"}>{ready ? "Sauvegardé" : "Chargement"}</Badge>
          <Button size="sm" variant="primary" icon={<Plus size={15} />} type="button" onClick={addDocument}>
            Nouveau
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          {documents.map((document) => (
            <button
              key={document.id}
              type="button"
              onClick={() => setSelectedId(document.id)}
              className={cn(
                "grid w-full grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition",
                selected?.id === document.id
                  ? "border-brand-2/45 bg-brand-2/12"
                  : "border-line bg-white/[0.04] hover:bg-white/[0.075]",
              )}
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-2/10 text-brand-2">
                <FileText size={17} />
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black">{document.title}</strong>
                <small className="mt-1 block truncate text-xs font-bold text-muted">
                  {document.updatedAt || "Non daté"}
                </small>
              </span>
            </button>
          ))}
        </div>
      </Card>

      <Card tone="strong" className="p-4 sm:p-5">
        {selected ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge tone="cyan">Traitement de texte</Badge>
                <h2 className="mt-3 text-3xl font-black">Rédaction</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="violet">{words} mots</Badge>
                <Button icon={<Save size={16} />} type="button">
                  Auto-save
                </Button>
                <Button
                  variant="danger"
                  icon={<Trash2 size={16} />}
                  type="button"
                  onClick={() => deleteDocument(selected.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
            <Input
              className="text-xl font-black"
              value={selected.title}
              onChange={(event) => updateDocument(selected.id, { title: event.target.value })}
            />
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ["Titre", "# "],
                ["Sous-titre", "## "],
                ["Liste", "- "],
                ["Bloc code", "```\n\n```"],
              ].map(([label, token]) => (
                <Button
                  key={label}
                  size="sm"
                  type="button"
                  onClick={() => updateDocument(selected.id, { body: `${selected.body}${selected.body ? "\n" : ""}${token}` })}
                >
                  {label}
                </Button>
              ))}
            </div>
            <Textarea
              className="min-h-[58dvh] resize-y text-base leading-8"
              value={selected.body}
              onChange={(event) => updateDocument(selected.id, { body: event.target.value })}
              placeholder="Écris ton brief, une spec, un brouillon client, une idée de page..."
            />
          </div>
        ) : (
          <div className="grid min-h-[420px] place-items-center text-center text-muted">
            <p className="font-black">Crée un document pour commencer.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
