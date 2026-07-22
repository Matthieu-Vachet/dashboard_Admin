"use client";

import { useMemo, useState } from "react";
import { BookOpen, FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export type PokemonDoc = {
  slug: string;
  file: string;
  title: string;
  content: string;
  lineCount: number;
};

export function PokemonDocsViewer({ docs }: { docs: PokemonDoc[] }) {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(docs[0]?.slug || "");

  const filteredDocs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return docs;

    return docs.filter(
      (doc) =>
        doc.title.toLowerCase().includes(normalizedQuery) ||
        doc.file.toLowerCase().includes(normalizedQuery) ||
        doc.content.toLowerCase().includes(normalizedQuery),
    );
  }, [docs, query]);

  const selectedDoc =
    filteredDocs.find((doc) => doc.slug === selectedSlug) ||
    docs.find((doc) => doc.slug === selectedSlug) ||
    filteredDocs[0] ||
    docs[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
      <Card className="p-4">
        <CardHeader
          eyebrow="PokemonGo-Data"
          action={<Badge tone="cyan">{docs.length} docs</Badge>}
        >
          <CardTitle>Documentation JSON</CardTitle>
          <CardDescription>Structures, templates, API, normalisation et maintenance.</CardDescription>
        </CardHeader>

        <label className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface-subtle px-3 text-muted">
          <Search size={16} />
          <Input
            aria-label="Chercher dans les docs"
            className="min-h-0 border-0 bg-transparent px-0 focus:bg-transparent"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher dans les docs"
          />
        </label>

        <div className="mt-4 space-y-2">
          {filteredDocs.map((doc) => (
            <button
              className={cn(
                "grid w-full grid-cols-[auto_1fr] gap-3 rounded-lg border p-3 text-left transition",
                selectedDoc?.slug === doc.slug
                  ? "border-brand-2/45 bg-brand-2/12 text-foreground"
                  : "border-line bg-surface-minimal text-muted hover:bg-white/[0.075] hover:text-foreground",
              )}
              key={doc.slug}
              type="button"
              onClick={() => setSelectedSlug(doc.slug)}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.07] text-brand-2">
                <FileText size={16} />
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black">{doc.title}</strong>
                <small className="mt-1 block truncate font-mono text-xs font-bold">{doc.file}</small>
              </span>
            </button>
          ))}
          {!filteredDocs.length ? (
            <p className="rounded-lg border border-line bg-surface-minimal p-4 text-sm font-bold text-muted">
              Aucun document trouvé.
            </p>
          ) : null}
        </div>
      </Card>

      <Card tone="strong" className="min-w-0 p-4 sm:p-5">
        {selectedDoc ? (
          <>
            <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge tone="green">Copie dashboard</Badge>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">{selectedDoc.title}</h2>
                <p className="mt-2 font-mono text-xs font-bold text-muted">
                  {selectedDoc.file} · {selectedDoc.lineCount} lignes
                </p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-line bg-surface-subtle text-brand-2">
                <BookOpen size={20} />
              </div>
            </div>
            <article className="mt-5 max-w-none space-y-3 text-sm font-semibold leading-7 text-muted">
              <MarkdownBlocks content={selectedDoc.content} />
            </article>
          </>
        ) : (
          <div className="grid min-h-[420px] place-items-center text-center text-muted">
            <p className="font-black">Sélectionne un document.</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function MarkdownBlocks({ content }: { content: string }) {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return blocks.map((block, index) => {
    if (block.type === "heading") {
      const Tag = `h${Math.min(block.level, 3)}` as "h1" | "h2" | "h3";
      return (
        <Tag
          className={cn(
            "pt-3 font-black leading-tight text-foreground",
            block.level === 1 ? "text-2xl" : block.level === 2 ? "text-xl" : "text-base",
          )}
          key={index}
        >
          {block.text}
        </Tag>
      );
    }

    if (block.type === "code") {
      return (
        <pre
          className="overflow-auto rounded-lg border border-line bg-slate-950/70 p-4 font-mono text-xs leading-6 text-cyan-50"
          key={index}
        >
          <code>{block.text}</code>
        </pre>
      );
    }

    if (block.type === "table") {
      return (
        <div className="overflow-auto rounded-lg border border-line" key={index}>
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr className="border-b border-line last:border-b-0" key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    const Cell = rowIndex === 0 ? "th" : "td";
                    return (
                      <Cell
                        className={cn(
                          "px-3 py-2 align-top",
                          rowIndex === 0 ? "bg-white/[0.065] font-black text-foreground" : "text-muted",
                        )}
                        key={cellIndex}
                      >
                        {cell}
                      </Cell>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === "list") {
      return (
        <ul className="space-y-2 rounded-lg border border-line bg-surface-faint p-4" key={index}>
          {block.items.map((item, itemIndex) => (
            <li className="flex gap-3" key={itemIndex}>
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="rounded-lg border border-line bg-white/[0.025] p-3" key={index}>
        {block.text}
      </p>
    );
  });
}

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "code"; text: string }
  | { type: "table"; rows: string[][] }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", text: code.join("\n") });
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: stripMarkdown(heading[2]) });
      index += 1;
      continue;
    }

    if (trimmed.includes("|") && lines[index + 1]?.trim().match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/)) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().includes("|")) {
        const current = lines[index].trim();
        if (!current.match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/)) {
          rows.push(
            current
              .replace(/^\|/, "")
              .replace(/\|$/, "")
              .split("|")
              .map((cell) => stripMarkdown(cell.trim())),
          );
        }
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(stripMarkdown(lines[index].trim().replace(/^[-*]\s+/, "")));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].trim().startsWith("```") &&
      !lines[index].trim().startsWith("#") &&
      !/^[-*]\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: stripMarkdown(paragraph.join(" ")) });
  }

  return blocks;
}

function stripMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
