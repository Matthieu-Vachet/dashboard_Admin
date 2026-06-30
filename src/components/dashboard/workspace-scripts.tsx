"use client";

import { ClipboardCopy, Play, RefreshCcw, Search, TerminalSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type WorkspaceScript = {
  id: string;
  project: string;
  kind: "npm" | "node";
  name: string;
  command: string;
  description: string;
};

type RunResult = {
  script?: WorkspaceScript;
  stdout?: string;
  stderr?: string;
  error?: string;
};

export function WorkspaceScripts() {
  const [scripts, setScripts] = useState<WorkspaceScript[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [runningId, setRunningId] = useState("");
  const [result, setResult] = useState<RunResult | null>(null);

  async function loadScripts() {
    setLoading(true);
    const response = await fetch("/api/workspace-scripts", { cache: "no-store" });
    const payload = (await response.json()) as { data?: { scripts?: WorkspaceScript[] }; error?: string };
    if (!response.ok) {
      setResult({ error: payload.error || "Scripts indisponibles." });
    } else {
      setScripts(payload.data?.scripts || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    fetch("/api/workspace-scripts", { cache: "no-store" })
      .then(async (response) => {
        const payload = (await response.json()) as { data?: { scripts?: WorkspaceScript[] }; error?: string };
        if (!response.ok) throw new Error(payload.error || "Scripts indisponibles.");
        if (active) setScripts(payload.data?.scripts || []);
      })
      .catch((error) => {
        if (active) setResult({ error: error instanceof Error ? error.message : "Scripts indisponibles." });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return scripts;
    return scripts.filter((script) =>
      [script.project, script.kind, script.name, script.command, script.description]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query, scripts]);

  const projects = useMemo(() => Array.from(new Set(scripts.map((script) => script.project))).sort(), [scripts]);

  async function runScript(script: WorkspaceScript) {
    setRunningId(script.id);
    setResult(null);
    try {
      const response = await fetch("/api/workspace-scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: script.id }),
      });
      const payload = (await response.json()) as { data?: RunResult; error?: string; stdout?: string; stderr?: string };
      setResult(response.ok ? payload.data || {} : { error: payload.error, stdout: payload.stdout, stderr: payload.stderr, script });
    } finally {
      setRunningId("");
    }
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge tone="cyan">Workspace</Badge>
            <h2 className="mt-3 text-3xl font-black">Scripts workspace</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted">
              {loading ? "Scan en cours..." : `${scripts.length} scripts detectes dans ${projects.length} projets.`}
            </p>
          </div>
          <Button icon={<RefreshCcw size={16} />} type="button" onClick={loadScripts} disabled={loading}>
            Actualiser
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        <label className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted">
          <Search size={16} />
          <Input
            className="min-h-0 border-0 bg-transparent px-0 focus:bg-transparent"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher projet, script, commande..."
          />
        </label>
      </Card>

      <section className="grid gap-3 xl:grid-cols-2">
        {filtered.map((script) => (
          <Card className="p-4" key={script.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={script.kind === "npm" ? "green" : "violet"}>{script.kind}</Badge>
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-muted">{script.project}</span>
                </div>
                <h3 className="mt-3 truncate text-lg font-black">{script.name}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">{script.description}</p>
              </div>
              <TerminalSquare className="shrink-0 text-brand-2" size={22} />
            </div>
            <pre className="mt-4 overflow-auto rounded-lg border border-line bg-slate-950/45 p-3 text-xs font-bold text-brand-3">
              {script.command}
            </pre>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button icon={<ClipboardCopy size={15} />} type="button" onClick={() => navigator.clipboard.writeText(script.command)}>
                Copier
              </Button>
              <Button
                variant="primary"
                icon={<Play size={15} />}
                type="button"
                disabled={Boolean(runningId)}
                onClick={() => runScript(script)}
              >
                {runningId === script.id ? "Execution..." : "Lancer"}
              </Button>
            </div>
          </Card>
        ))}
      </section>

      {!filtered.length ? (
        <Card className="grid min-h-48 place-items-center p-6 text-center">
          <p className="font-black">Aucun script ne correspond a cette recherche.</p>
        </Card>
      ) : null}

      {result ? (
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={result.error ? "red" : "green"}>{result.error ? "Erreur" : "Termine"}</Badge>
            {result.script ? <span className="text-sm font-black">{result.script.project} / {result.script.name}</span> : null}
          </div>
          {result.error ? <p className="mt-3 text-sm font-bold text-danger">{result.error}</p> : null}
          <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-slate-950/60 p-3 text-xs leading-6 text-muted">
            {[result.stdout, result.stderr].filter(Boolean).join("\n") || "Aucune sortie."}
          </pre>
        </Card>
      ) : null}
    </div>
  );
}
