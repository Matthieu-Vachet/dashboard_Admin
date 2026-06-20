"use client";

import { Check, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/dashboard/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { initialTodos, type Todo } from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

export function TodoList() {
  const [todos, setTodos, ready] = usePersistentState("matweb.todos", initialTodos);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "done">("all");

  const filteredTodos = useMemo(() => {
    if (filter === "open") return todos.filter((todo) => !todo.done);
    if (filter === "done") return todos.filter((todo) => todo.done);
    return todos;
  }, [filter, todos]);

  const completion = todos.length
    ? Math.round((todos.filter((todo) => todo.done).length / todos.length) * 100)
    : 0;

  if (!ready) {
    return <DashboardLoadingState title="Liste d'actions" />;
  }

  function addTodo() {
    if (!title.trim()) return;
    setTodos((current) => [
      { id: `t${Date.now()}`, title: title.trim(), done: false, priority: "Moyenne" },
      ...current,
    ]);
    setTitle("");
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
      <Card tone="strong" className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge tone="green">Todo</Badge>
            <h2 className="mt-3 text-3xl font-black">Liste d&apos;actions</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={ready ? "green" : "neutral"}>{ready ? "Sauvegarde active" : "Chargement"}</Badge>
            <div className="flex rounded-lg border border-line bg-white/[0.045] p-1">
            {[
              ["all", "Tout"],
              ["open", "Ouvert"],
              ["done", "Fait"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id as typeof filter)}
                className={cn(
                  "min-h-9 rounded-md px-3 text-xs font-black transition",
                  filter === id ? "bg-brand-2 text-slate-950" : "text-muted hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addTodo();
            }}
            placeholder="Ajouter une action..."
          />
          <Button variant="primary" icon={<Plus size={17} />} type="button" onClick={addTodo}>
            Ajouter
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="grid gap-3 rounded-lg border border-line bg-white/[0.045] p-3 sm:grid-cols-[auto_1fr_150px_auto] sm:items-center"
            >
              <button
                type="button"
                onClick={() =>
                  setTodos((current) =>
                    current.map((item) =>
                      item.id === todo.id ? { ...item, done: !item.done } : item,
                    ),
                  )
                }
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-lg border transition",
                  todo.done
                    ? "border-brand-3/40 bg-brand-3/20 text-brand-3"
                    : "border-line bg-white/[0.04] text-muted",
                )}
                aria-label="Basculer la tâche"
              >
                {todo.done ? <Check size={16} /> : null}
              </button>
              <Input
                className={cn(
                  "min-h-10",
                  todo.done && "text-muted line-through",
                )}
                value={todo.title}
                onChange={(event) =>
                  setTodos((current) =>
                    current.map((item) =>
                      item.id === todo.id ? { ...item, title: event.target.value } : item,
                    ),
                  )
                }
              />
              <select
                className="min-h-10 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none"
                value={todo.priority}
                onChange={(event) =>
                  setTodos((current) =>
                    current.map((item) =>
                      item.id === todo.id
                        ? { ...item, priority: event.target.value as Todo["priority"] }
                        : item,
                    ),
                  )
                }
              >
                {(["Haute", "Moyenne", "Basse"] as const).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setTodos((current) => current.filter((item) => item.id !== todo.id))}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger"
                aria-label="Supprimer la tâche"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            Progression
          </p>
          <p className="mt-4 font-mono text-5xl font-black">{completion}%</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-3 to-brand-2"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-semibold leading-6 text-muted">
            {todos.filter((todo) => todo.done).length} tâches terminées sur {todos.length}.
          </p>
        </Card>
      </aside>
    </div>
  );
}
