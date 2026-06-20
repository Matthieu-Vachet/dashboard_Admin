"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare2, FileText, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePersistentState } from "@/lib/use-persistent-state";

type NotionPage = {
  id: string;
  title: string;
  icon: string;
  status: "Idée" | "En cours" | "Publié";
  body: string;
  tasks: string[];
};

const initialPages: NotionPage[] = [
  {
    id: "home",
    title: "QG personnel",
    icon: "HQ",
    status: "En cours",
    body: "Notes rapides, idées et mini-docs comme dans Notion, directement dans le dashboard.",
    tasks: ["Lister les pages utiles", "Transformer les idées en actions"],
  },
  {
    id: "pokemon",
    title: "Pokémon data",
    icon: "PK",
    status: "Idée",
    body: "Suivi des règles JSON, assets à contrôler et prochaines améliorations API.",
    tasks: ["Lister les règles utiles", "Contrôler les fiches sensibles"],
  },
];

export function NotionWorkspace() {
  const [pages, setPages] = usePersistentState<NotionPage[]>("matweb.notion.workspace", initialPages);
  const [selectedId, setSelectedId] = useState("home");
  const selected = pages.find((page) => page.id === selectedId) || pages[0];

  function updateSelected(patch: Partial<NotionPage>) {
    setPages((current) => current.map((page) => (page.id === selected.id ? { ...page, ...patch } : page)));
  }

  function addPage() {
    const id = `page-${Date.now()}`;
    const page: NotionPage = {
      id,
      title: "Nouvelle page",
      icon: "PG",
      status: "Idée",
      body: "",
      tasks: [],
    };
    setPages((current) => [page, ...current]);
    setSelectedId(id);
  }

  function addTask() {
    updateSelected({ tasks: [...selected.tasks, "Nouvelle action"] });
  }

  return (
    <div className="space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(144,91,244,.15),transparent_32%)]" />
        <CardHeader
          className="relative z-10"
          eyebrow="Notion-like"
          action={
            <Button onClick={addPage}>
              <Plus size={16} />
              Page
            </Button>
          }
        >
          <CardTitle className="text-2xl sm:text-3xl">Espace de notes structuré</CardTitle>
          <CardDescription>
            Une version Notion légère: pages, texte, statut et actions, sauvegardés dans le dashboard.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <Card className="p-3">
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                className={`grid w-full grid-cols-[2.5rem_1fr] items-center gap-3 rounded-lg border p-3 text-left transition ${
                  selected.id === page.id
                    ? "border-brand-2/35 bg-brand-2/12"
                    : "border-line bg-white/[0.045] hover:border-brand-2/30"
                }`}
                key={page.id}
                type="button"
                onClick={() => setSelectedId(page.id)}
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.07] text-lg">{page.icon}</span>
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-black">{page.title}</strong>
                  <small className="text-xs font-bold text-muted">{page.status}</small>
                </span>
              </button>
            ))}
          </div>
        </Card>

        <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-5">
            <div className="flex flex-wrap items-center gap-3">
              <input
                className="h-14 w-14 rounded-lg border border-line bg-white/[0.055] text-center text-2xl outline-none"
                value={selected.icon}
                onChange={(event) => updateSelected({ icon: event.target.value.slice(0, 2) })}
              />
              <input
                className="min-h-14 min-w-0 flex-1 rounded-lg border border-line bg-white/[0.055] px-4 text-2xl font-black outline-none"
                value={selected.title}
                onChange={(event) => updateSelected({ title: event.target.value })}
              />
              <select
                className="min-h-14 rounded-lg border border-line bg-slate-950/55 px-4 text-sm font-black outline-none"
                value={selected.status}
                onChange={(event) => updateSelected({ status: event.target.value as NotionPage["status"] })}
              >
                <option>Idée</option>
                <option>En cours</option>
                <option>Publié</option>
              </select>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                <FileText size={14} />
                Contenu
              </span>
              <textarea
                className="min-h-64 w-full resize-y rounded-lg border border-line bg-slate-950/45 p-4 text-sm font-semibold leading-7 outline-none transition focus:border-brand-2/50 focus:ring-4 focus:ring-brand-2/10"
                value={selected.body}
                onChange={(event) => updateSelected({ body: event.target.value })}
              />
            </label>

            <div className="mt-5 flex items-center justify-between gap-3">
              <h3 className="inline-flex items-center gap-2 font-black">
                <CheckSquare2 size={17} className="text-brand-3" />
                Actions
              </h3>
              <Button onClick={addTask}>
                <Sparkles size={16} />
                Ajouter
              </Button>
            </div>
            <div className="mt-3 grid gap-2">
              {selected.tasks.map((task, index) => (
                <input
                  className="rounded-lg border border-line bg-white/[0.045] px-3 py-3 text-sm font-bold outline-none"
                  key={`${selected.id}-${index}`}
                  value={task}
                  onChange={(event) => {
                    const tasks = [...selected.tasks];
                    tasks[index] = event.target.value;
                    updateSelected({ tasks });
                  }}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
