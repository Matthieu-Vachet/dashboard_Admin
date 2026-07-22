"use client";

import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { readDashboardStoreValue, readLocalJson, writeDashboardStoreValue } from "@/services/admin/dashboard-store";
import { Panel, fieldClass, primaryButtonClass } from "./admin-ui";

const storeKey = "matweb.pokemon.todos";
const legacyStoreKey = "pokedex-v4-admin-todos";

function normalizeTodos(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((todo) => ({
      id: String(todo?.id || crypto.randomUUID()),
      text: String(todo?.text || todo?.title || "").trim(),
      done: Boolean(todo?.done),
    }))
    .filter((todo) => todo.text);
}

export function AdminTodoPanel() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [storageState, setStorageState] = useState("loading");

  useEffect(() => {
    async function hydrateTodos() {
      const legacy = normalizeTodos(readLocalJson(legacyStoreKey, []));
      const remote = await readDashboardStoreValue(storeKey);

      if (remote.ok && remote.configured) {
        const stored = normalizeTodos(remote.value);
        if (stored.length || !legacy.length) {
          setTodos(stored);
        } else {
          setTodos(legacy);
          const saved = await writeDashboardStoreValue(storeKey, legacy);
          if (saved) localStorage.removeItem(legacyStoreKey);
        }
        setStorageState("mongo");
        return;
      }

      // Le fallback conserve les anciennes taches si Mongo est temporairement indisponible.
      setTodos(legacy);
      setStorageState("local");
    }

    void hydrateTodos();
  }, []);

  async function persist(next) {
    setTodos(next);
    if (storageState === "mongo") {
      const saved = await writeDashboardStoreValue(storeKey, next);
      if (!saved) toast.error("La Todo n’a pas pu être enregistrée dans MongoDB.");
      return;
    }
    localStorage.setItem(legacyStoreKey, JSON.stringify(next));
  }

  function addTodo() {
    const text = newTodo.trim();
    if (!text) return;
    void persist([{ id: crypto.randomUUID(), text, done: false }, ...todos]);
    setNewTodo("");
  }

  function saveEdit(todo) {
    const text = editingText.trim();
    if (!text) return;
    void persist(todos.map((item) => (item.id === todo.id ? { ...item, text } : item)));
    setEditingId(null);
    setEditingText("");
  }

  const openCount = useMemo(() => todos.filter((todo) => !todo.done).length, [todos]);

  return (
    <Panel
      title="Todo-list"
      eyebrow={storageState === "mongo" ? `${openCount} tâche(s) ouverte(s) · MongoDB` : "synchronisation"}
    >
      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          aria-label="Ajouter une tâche"
          className={fieldClass}
          value={newTodo}
          placeholder="Ajouter une tâche"
          onChange={(event) => setNewTodo(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTodo();
          }}
        />
        <button className={primaryButtonClass} type="button" onClick={addTodo}>
          <Plus size={17} /> Ajouter
        </button>
      </div>

      {storageState === "local" ? (
        <p className="mb-4 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-100">
          MongoDB est indisponible : les tâches restent temporairement sur cet appareil.
        </p>
      ) : null}

      <div className="grid gap-3">
        {todos.map((todo) => {
          const editing = editingId === todo.id;
          return (
            <article className="flex gap-3 rounded-2xl border border-line bg-surface-inset p-3" key={todo.id}>
              <button
                aria-label={todo.done ? "Marquer la tâche comme ouverte" : "Marquer la tâche comme terminée"}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition ${todo.done ? "border-emerald-300/35 bg-emerald-400/18 text-emerald-100" : "border-line-medium bg-white/[0.05] text-foreground-secondary hover:border-cyan-200/45"}`}
                type="button"
                onClick={() => void persist(todos.map((item) => (item.id === todo.id ? { ...item, done: !item.done } : item)))}
              >
                {todo.done ? <Check size={18} /> : null}
              </button>
              <div className="min-w-0 flex-1">
                {editing ? (
                  <input
                    aria-label="Modifier la tâche"
                    autoFocus
                    className={`${fieldClass} h-10 py-2`}
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") saveEdit(todo);
                      if (event.key === "Escape") setEditingId(null);
                    }}
                  />
                ) : (
                  <p className={`py-2 text-sm font-bold ${todo.done ? "text-disabled line-through" : "text-domain-foreground"}`}>{todo.text}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {editing ? (
                  <button className="rounded-xl border border-emerald-300/30 bg-emerald-400/12 p-2 text-emerald-50" type="button" onClick={() => saveEdit(todo)} aria-label="Enregistrer la tâche">
                    <Check size={16} />
                  </button>
                ) : (
                  <button className="rounded-xl border border-white/12 bg-white/[0.05] p-2 text-foreground transition hover:border-cyan-200/45" type="button" onClick={() => { setEditingId(todo.id); setEditingText(todo.text); }} aria-label="Modifier la tâche">
                    <Pencil size={16} />
                  </button>
                )}
                <button className="rounded-xl border border-red-300/25 bg-red-400/10 p-2 text-red-100 transition hover:bg-red-400/18" type="button" onClick={() => void persist(todos.filter((item) => item.id !== todo.id))} aria-label="Supprimer la tâche">
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          );
        })}
        {!todos.length && storageState !== "loading" ? (
          <p className="rounded-2xl border border-dashed border-line-medium p-5 text-sm font-bold text-muted">Aucune tâche pour le moment.</p>
        ) : null}
      </div>
    </Panel>
  );
}
