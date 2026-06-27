"use client";

import {
  Bold,
  Code2,
  Eye,
  EyeOff,
  FileText,
  Heading1,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Plus,
  Quote,
  Save,
  Trash2,
  Underline,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { initialWriterDocuments, type WriterDocument } from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

function dateLabel() {
  return new Date().toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeDocument(document: WriterDocument): WriterDocument {
  return {
    ...document,
    tags: Array.isArray(document.tags) ? document.tags : [],
    createdAt: document.createdAt || document.updatedAt || dateLabel(),
    updatedAt: document.updatedAt || dateLabel(),
  };
}

function normalizeTags(value: string) {
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export function WriterStudio() {
  const [documents, setDocuments, ready] = usePersistentState(
    "matweb.writer.documents",
    initialWriterDocuments,
  );
  const [selectedId, setSelectedId] = useState(initialWriterDocuments[0]?.id || "");
  const [preview, setPreview] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const normalizedDocuments = useMemo(() => documents.map(normalizeDocument), [documents]);
  const selected = useMemo(
    () => normalizedDocuments.find((document) => document.id === selectedId) || normalizedDocuments[0] || null,
    [normalizedDocuments, selectedId],
  );
  const words = selected?.body.trim().split(/\s+/).filter(Boolean).length || 0;

  function addDocument() {
    const now = dateLabel();
    const document: WriterDocument = {
      id: `doc${Date.now()}`,
      title: "Nouveau document",
      body: "",
      tags: [],
      createdAt: now,
      updatedAt: now,
    };
    setDocuments((current) => [document, ...current.map(normalizeDocument)]);
    setSelectedId(document.id);
    setConfirmDelete(false);
  }

  function updateDocument(id: string, patch: Partial<WriterDocument>) {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? { ...normalizeDocument(document), ...patch, updatedAt: dateLabel() }
          : normalizeDocument(document),
      ),
    );
    setConfirmDelete(false);
  }

  function deleteDocument(id: string) {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDocuments((current) => {
      const next = current.map(normalizeDocument).filter((document) => document.id !== id);
      setSelectedId(next[0]?.id || "");
      return next;
    });
    setConfirmDelete(false);
  }

  function applyFormat(before: string, after = "", placeholder = "texte") {
    if (!selected) return;
    const textarea = textareaRef.current;
    const body = selected.body;
    const start = textarea?.selectionStart ?? body.length;
    const end = textarea?.selectionEnd ?? body.length;
    const selectedText = body.slice(start, end) || placeholder;
    const nextBody = `${body.slice(0, start)}${before}${selectedText}${after}${body.slice(end)}`;
    updateDocument(selected.id, { body: nextBody });
    window.requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    });
  }

  function insertLine(prefix: string, placeholder = "Ligne") {
    if (!selected) return;
    const separator = selected.body && !selected.body.endsWith("\n") ? "\n" : "";
    updateDocument(selected.id, { body: `${selected.body}${separator}${prefix}${placeholder}` });
    window.requestAnimationFrame(() => textareaRef.current?.focus());
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <Badge tone={ready ? "green" : "neutral"}>{ready ? "Sauvegardé" : "Chargement"}</Badge>
          <Button size="sm" variant="primary" icon={<Plus size={15} />} type="button" onClick={addDocument}>
            Nouveau
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          {normalizedDocuments.map((document) => (
            <button
              key={document.id}
              type="button"
              onClick={() => {
                setSelectedId(document.id);
                setConfirmDelete(false);
              }}
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
                <strong className="block truncate text-sm font-black">{document.title || "Sans titre"}</strong>
                <small className="mt-1 block truncate text-xs font-bold text-muted">
                  {document.updatedAt || "Non daté"}
                </small>
                {document.tags.length ? (
                  <small className="mt-2 block truncate text-[11px] font-black text-brand-2">
                    {document.tags.map((tag) => `#${tag}`).join(" ")}
                  </small>
                ) : null}
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
                <Badge tone="green">Sauvegarde locale active</Badge>
                <Button
                  icon={preview ? <EyeOff size={16} /> : <Eye size={16} />}
                  type="button"
                  onClick={() => setPreview((value) => !value)}
                >
                  {preview ? "Masquer aperçu" : "Aperçu"}
                </Button>
                <Button icon={<Save size={16} />} type="button">
                  Sauvegardé
                </Button>
                <Button
                  variant="danger"
                  icon={<Trash2 size={16} />}
                  type="button"
                  onClick={() => deleteDocument(selected.id)}
                >
                  {confirmDelete ? "Confirmer" : "Supprimer"}
                </Button>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
              <Input
                className="text-xl font-black"
                value={selected.title}
                onChange={(event) => updateDocument(selected.id, { title: event.target.value })}
              />
              <Input
                value={selected.tags.join(", ")}
                onChange={(event) => updateDocument(selected.id, { tags: normalizeTags(event.target.value) })}
                placeholder="tags, rédaction, spec"
              />
            </div>

            <div className="flex flex-wrap gap-2 rounded-lg border border-line bg-white/[0.04] p-2">
              <ToolbarButton label="Gras" icon={<Bold size={15} />} onClick={() => applyFormat("**", "**", "gras")} />
              <ToolbarButton label="Italique" icon={<Italic size={15} />} onClick={() => applyFormat("_", "_", "italique")} />
              <ToolbarButton label="Souligné" icon={<Underline size={15} />} onClick={() => applyFormat("<u>", "</u>", "souligné")} />
              <ToolbarButton label="Titre 1" icon={<Heading1 size={15} />} onClick={() => insertLine("# ", "Titre")} />
              <ToolbarButton label="Titre 2" icon={<Heading2 size={15} />} onClick={() => insertLine("## ", "Sous-titre")} />
              <ToolbarButton label="Liste" icon={<List size={15} />} onClick={() => insertLine("- ", "Point")} />
              <ToolbarButton label="Liste numérotée" icon={<ListOrdered size={15} />} onClick={() => insertLine("1. ", "Point")} />
              <ToolbarButton label="Citation" icon={<Quote size={15} />} onClick={() => insertLine("> ", "Citation")} />
              <ToolbarButton label="Lien" icon={<Link2 size={15} />} onClick={() => applyFormat("[", "](https://)", "lien")} />
              <ToolbarButton label="Code" icon={<Code2 size={15} />} onClick={() => applyFormat("```\n", "\n```", "code")} />
            </div>

            <div className={cn("grid gap-4", preview && "xl:grid-cols-[minmax(0,1fr)_420px]")}>
              <Textarea
                ref={textareaRef}
                className="min-h-[58dvh] resize-y text-base leading-8"
                value={selected.body}
                onChange={(event) => updateDocument(selected.id, { body: event.target.value })}
                placeholder="Écris ton brief, une spec, un brouillon client, une idée de page..."
              />
              {preview ? <DocumentPreview body={selected.body} /> : null}
            </div>

            <div className="grid gap-2 rounded-lg border border-line bg-white/[0.04] p-3 text-xs font-bold text-muted sm:grid-cols-2">
              <span>Créé : {selected.createdAt}</span>
              <span>Modifié : {selected.updatedAt}</span>
            </div>
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

function ToolbarButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button size="sm" type="button" icon={icon} onClick={onClick}>
      {label}
    </Button>
  );
}

function DocumentPreview({ body }: { body: string }) {
  const blocks = body.split("```");

  return (
    <div className="min-h-[58dvh] overflow-y-auto rounded-lg border border-line bg-white/[0.045] p-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-2">Aperçu</p>
      <div className="mt-4 space-y-3">
        {blocks.map((block, blockIndex) => {
          if (blockIndex % 2 === 1) {
            return (
              <pre key={`code-${blockIndex}`} className="overflow-x-auto rounded-lg border border-line bg-slate-950/50 p-3 font-mono text-xs leading-6 text-brand-3">
                {block.trim() || " "}
              </pre>
            );
          }
          return block
            .split("\n")
            .map((line, lineIndex) => (
              <PreviewLine key={`text-${blockIndex}-${lineIndex}`} line={line} />
            ));
        })}
      </div>
    </div>
  );
}

function PreviewLine({ line }: { line: string }) {
  if (!line.trim()) return <div className="h-2" />;
  if (line.startsWith("# ")) {
    return <h1 className="text-3xl font-black">{line.replace(/^# /, "")}</h1>;
  }
  if (line.startsWith("## ")) {
    return <h2 className="text-2xl font-black">{line.replace(/^## /, "")}</h2>;
  }
  if (line.startsWith("> ")) {
    return (
      <blockquote className="border-l-4 border-brand-2 bg-brand-2/10 px-4 py-3 text-sm font-bold text-muted">
        {line.replace(/^> /, "")}
      </blockquote>
    );
  }
  if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
    return (
      <p className="pl-4 text-sm font-semibold leading-7 text-muted">
        • {line.replace(/^-\s/, "").replace(/^\d+\.\s/, "")}
      </p>
    );
  }
  return <p className="text-sm font-semibold leading-7 text-muted">{line}</p>;
}
