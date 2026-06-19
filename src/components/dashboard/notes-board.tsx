"use client";

import { useMemo, useState } from "react";
import { Plus, Save, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

type Note = {
  id: string;
  title: string;
  body: string;
  category: "Projet" | "Client" | "Idée" | "Personnel";
  updatedAt: string;
};

const initialNotes: Note[] = [
  {
    id: "n1",
    title: "Dashboard Admin",
    body: "Créer le socle, les pages métier, Storybook et le déploiement Vercel.",
    category: "Projet",
    updatedAt: "Aujourd'hui",
  },
  {
    id: "n2",
    title: "Pokemon GO API",
    body: "Ajouter une vue dédiée pour les métriques qualité, assets et générations.",
    category: "Projet",
    updatedAt: "Hier",
  },
  {
    id: "n3",
    title: "Design system",
    body: "Référencer les primitives Button, Badge, Card, StatCard, KanbanCard.",
    category: "Idée",
    updatedAt: "Lundi",
  },
  {
    id: "n4",
    title: "Outils quotidiens",
    body: "Centraliser les liens, snippets, contacts, abonnements et notes rapides.",
    category: "Personnel",
    updatedAt: "Vendredi",
  },
];

const categoryTone = {
  Projet: "cyan",
  Client: "green",
  Idée: "violet",
  Personnel: "amber",
} as const;

export function NotesBoard() {
  const [notes, setNotes, ready] = usePersistentState("matweb.notes", initialNotes);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialNotes[0]?.id);

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(normalizedQuery) ||
        note.body.toLowerCase().includes(normalizedQuery) ||
        note.category.toLowerCase().includes(normalizedQuery),
    );
  }, [notes, query]);

  const selectedNote = notes.find((note) => note.id === selectedId) || notes[0];

  function addNote() {
    const note: Note = {
      id: `n${Date.now()}`,
      title: "Nouvelle note",
      body: "Écris ton idée ici.",
      category: "Idée",
      updatedAt: "Maintenant",
    };
    setNotes((current) => [note, ...current]);
    setSelectedId(note.id);
  }

  function updateSelected(patch: Partial<Note>) {
    if (!selectedNote) return;
    setNotes((current) =>
      current.map((note) =>
        note.id === selectedNote?.id ? { ...note, ...patch, updatedAt: "Maintenant" } : note,
      ),
    );
  }

  function deleteSelected() {
    if (!selectedNote) return;
    setNotes((current) => {
      const nextNotes = current.filter((note) => note.id !== selectedNote.id);
      setSelectedId(nextNotes[0]?.id);
      return nextNotes;
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
              Notes app
            </p>
            <h2 className="mt-2 text-2xl font-black">Carnet central</h2>
          </div>
          <Button
            size="icon"
            variant="primary"
            type="button"
            onClick={addNote}
            aria-label="Ajouter une note"
          >
            <Plus size={17} />
          </Button>
        </div>
        <div className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted">
          <Search size={16} />
          <Input
            className="min-h-0 border-0 bg-transparent px-0 focus:bg-transparent"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher une note"
          />
        </div>
        <div className="mt-4 max-h-[calc(100vh-250px)] space-y-2 overflow-y-auto pr-1">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => setSelectedId(note.id)}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition",
                selectedNote?.id === note.id
                  ? "border-brand-2/40 bg-brand-2/12"
                  : "border-line bg-white/[0.04] hover:bg-white/[0.07]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-black">{note.title}</p>
                <Badge tone={categoryTone[note.category]}>{note.category}</Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-muted">
                {note.body}
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="font-mono text-xs font-bold text-muted">{note.updatedAt}</p>
                <span className="text-xs font-black text-brand-2">Ouvrir</span>
              </div>
            </button>
          ))}
          {!filteredNotes.length ? (
            <div className="rounded-lg border border-line bg-white/[0.04] p-4 text-sm font-bold text-muted">
              Aucune note trouvée.
            </div>
          ) : null}
        </div>
      </Card>

      <Card tone="strong" className="p-4 sm:p-5">
        {selectedNote ? (
          <div className="grid gap-4 xl:grid-cols-[1fr_240px]">
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Titre
                </span>
                <Input
                  className="mt-2 text-lg font-black"
                  value={selectedNote.title}
                  onChange={(event) => updateSelected({ title: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Contenu
                </span>
                <Textarea
                  className="mt-2 min-h-[420px]"
                  value={selectedNote.body}
                  onChange={(event) => updateSelected({ body: event.target.value })}
                />
              </label>
            </div>
            <aside className="space-y-4">
              <div className="rounded-lg border border-line bg-white/[0.045] p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Catégorie
                </p>
                <div className="mt-3 grid gap-2">
                  {(["Projet", "Client", "Idée", "Personnel"] as const).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => updateSelected({ category })}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-left text-sm font-black transition",
                        selectedNote.category === category
                          ? "border-brand-2/40 bg-brand-2/12"
                          : "border-line bg-white/[0.04] hover:bg-white/[0.08]",
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button">
                {ready ? "Sauvegarde auto active" : "Chargement..."}
              </Button>
              <Button
                className="w-full"
                variant="danger"
                icon={<Trash2 size={17} />}
                type="button"
                onClick={deleteSelected}
              >
                Supprimer la note
              </Button>
            </aside>
          </div>
        ) : (
          <div className="grid min-h-[520px] place-items-center text-center text-muted">
            <p className="font-black">Sélectionne ou crée une note.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
