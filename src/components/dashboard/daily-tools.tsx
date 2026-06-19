"use client";

import {
  Copy,
  ExternalLink,
  Link2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Save,
  Timer,
  Trash2,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { usePersistentState } from "@/lib/use-persistent-state";

type QuickLink = {
  id: string;
  label: string;
  url: string;
};

type Snippet = {
  id: string;
  title: string;
  content: string;
};

type Subscription = {
  id: string;
  name: string;
  price: number;
  billing: "Mensuel" | "Annuel";
};

type Contact = {
  id: string;
  name: string;
  role: string;
  email: string;
};

const initialLinks: QuickLink[] = [
  { id: "l1", label: "Dashboard prod", url: "https://dashboard-admin-pi-ebon.vercel.app" },
  { id: "l2", label: "Storybook", url: "/storybook/index.html" },
  { id: "l3", label: "GitHub dashboard", url: "https://github.com/Matthieu-Vachet/dashboard_Admin" },
  { id: "l4", label: "Vercel", url: "https://vercel.com" },
];

const initialSnippets: Snippet[] = [
  {
    id: "s1",
    title: "Commit propre",
    content: "git status && git add -A && git commit -m \"feat: ...\" && git push",
  },
  {
    id: "s2",
    title: "Checklist deploy",
    content: "npm run lint\nnpm run build\nnpx vercel deploy --prod --yes",
  },
];

const initialSubscriptions: Subscription[] = [
  { id: "sub1", name: "Vercel", price: 0, billing: "Mensuel" },
  { id: "sub2", name: "Outil mensuel", price: 20, billing: "Mensuel" },
];

const initialContacts: Contact[] = [
  { id: "c1", name: "Matthieu", role: "Admin", email: "vachet.matthieu@icloud.com" },
];

export function DailyTools() {
  const [links, setLinks] = usePersistentState("matweb.tools.links", initialLinks);
  const [snippets, setSnippets] = usePersistentState("matweb.tools.snippets", initialSnippets);
  const [subscriptions, setSubscriptions] = usePersistentState(
    "matweb.tools.subscriptions",
    initialSubscriptions,
  );
  const [contacts, setContacts] = usePersistentState("matweb.tools.contacts", initialContacts);
  const [journal, setJournal] = usePersistentState(
    "matweb.tools.journal",
    "Aujourd'hui je dois avancer sur...",
  );
  const [focusMinutes, setFocusMinutes] = usePersistentState("matweb.tools.focusMinutes", 25);
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);
  const [running, setRunning] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (running) return;
    const timeout = window.setTimeout(() => setSecondsLeft(focusMinutes * 60), 0);
    return () => window.clearTimeout(timeout);
  }, [focusMinutes, running]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  const monthlyTotal = useMemo(
    () =>
      subscriptions.reduce(
        (total, item) => total + (item.billing === "Annuel" ? item.price / 12 : item.price),
        0,
      ),
    [subscriptions],
  );

  const timerLabel = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
    secondsLeft % 60,
  ).padStart(2, "0")}`;

  function copySnippet(snippet: Snippet) {
    void navigator.clipboard.writeText(snippet.content);
    setCopiedId(snippet.id);
    window.setTimeout(() => setCopiedId(null), 1200);
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="p-5">
        <Badge tone="cyan">Local-first</Badge>
        <h2 className="mt-3 text-3xl font-black">Outils quotidiens</h2>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted">
          Ton panneau rapide pour bosser : liens, snippets, budget, contacts, journal et focus.
        </p>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="p-4">
          <ToolHeader icon={Link2} title="Liens rapides" action={(
            <Button
              size="sm"
              variant="primary"
              icon={<Plus size={15} />}
              type="button"
              onClick={() =>
                setLinks((current) => [
                  { id: `l${Date.now()}`, label: "Nouveau lien", url: "https://" },
                  ...current,
                ])
              }
            >
              Ajouter
            </Button>
          )} />
          <div className="mt-4 space-y-3">
            {links.map((link) => (
              <div key={link.id} className="grid gap-2 rounded-lg border border-line bg-white/[0.045] p-3 sm:grid-cols-[1fr_1.4fr_auto_auto]">
                <Input
                  value={link.label}
                  onChange={(event) =>
                    setLinks((current) =>
                      current.map((item) =>
                        item.id === link.id ? { ...item, label: event.target.value } : item,
                      ),
                    )
                  }
                />
                <Input
                  value={link.url}
                  onChange={(event) =>
                    setLinks((current) =>
                      current.map((item) =>
                        item.id === link.id ? { ...item, url: event.target.value } : item,
                      ),
                    )
                  }
                />
                <Button
                  size="icon"
                  type="button"
                  aria-label="Ouvrir le lien"
                  onClick={() =>
                    window.open(new URL(link.url, window.location.origin), "_blank", "noopener,noreferrer")
                  }
                >
                  <ExternalLink size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="danger"
                  type="button"
                  aria-label="Supprimer le lien"
                  onClick={() => setLinks((current) => current.filter((item) => item.id !== link.id))}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <ToolHeader icon={Copy} title="Snippets" action={(
            <Button
              size="sm"
              variant="primary"
              icon={<Plus size={15} />}
              type="button"
              onClick={() =>
                setSnippets((current) => [
                  { id: `s${Date.now()}`, title: "Nouveau snippet", content: "" },
                  ...current,
                ])
              }
            >
              Ajouter
            </Button>
          )} />
          <div className="mt-4 space-y-3">
            {snippets.map((snippet) => (
              <div key={snippet.id} className="rounded-lg border border-line bg-white/[0.045] p-3">
                <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
                  <Input
                    value={snippet.title}
                    onChange={(event) =>
                      setSnippets((current) =>
                        current.map((item) =>
                          item.id === snippet.id ? { ...item, title: event.target.value } : item,
                        ),
                      )
                    }
                  />
                  <Button
                    type="button"
                    icon={<Copy size={16} />}
                    onClick={() => copySnippet(snippet)}
                  >
                    {copiedId === snippet.id ? "Copié" : "Copier"}
                  </Button>
                  <Button
                    size="icon"
                    variant="danger"
                    type="button"
                    aria-label="Supprimer le snippet"
                    onClick={() =>
                      setSnippets((current) => current.filter((item) => item.id !== snippet.id))
                    }
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <Textarea
                  className="mt-2 min-h-28 font-mono text-xs"
                  value={snippet.content}
                  onChange={(event) =>
                    setSnippets((current) =>
                      current.map((item) =>
                        item.id === snippet.id ? { ...item, content: event.target.value } : item,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <ToolHeader icon={WalletCards} title="Abonnements" action={(
            <Button
              size="sm"
              variant="primary"
              icon={<Plus size={15} />}
              type="button"
              onClick={() =>
                setSubscriptions((current) => [
                  { id: `sub${Date.now()}`, name: "Nouvel abonnement", price: 0, billing: "Mensuel" },
                  ...current,
                ])
              }
            >
              Ajouter
            </Button>
          )} />
          <div className="mt-4 rounded-lg border border-brand-2/25 bg-brand-2/10 p-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Total mensuel estimé</p>
            <p className="mt-2 font-mono text-3xl font-black">{monthlyTotal.toFixed(2)} €</p>
          </div>
          <div className="mt-4 space-y-3">
            {subscriptions.map((item) => (
              <div key={item.id} className="grid gap-2 rounded-lg border border-line bg-white/[0.045] p-3 sm:grid-cols-[1fr_120px_120px_auto]">
                <Input
                  value={item.name}
                  onChange={(event) =>
                    setSubscriptions((current) =>
                      current.map((sub) =>
                        sub.id === item.id ? { ...sub, name: event.target.value } : sub,
                      ),
                    )
                  }
                />
                <Input
                  type="number"
                  min={0}
                  value={item.price}
                  onChange={(event) =>
                    setSubscriptions((current) =>
                      current.map((sub) =>
                        sub.id === item.id ? { ...sub, price: Number(event.target.value) || 0 } : sub,
                      ),
                    )
                  }
                />
                <select
                  className="min-h-11 rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none"
                  value={item.billing}
                  onChange={(event) =>
                    setSubscriptions((current) =>
                      current.map((sub) =>
                        sub.id === item.id
                          ? { ...sub, billing: event.target.value as Subscription["billing"] }
                          : sub,
                      ),
                    )
                  }
                >
                  <option value="Mensuel">Mensuel</option>
                  <option value="Annuel">Annuel</option>
                </select>
                <Button
                  size="icon"
                  variant="danger"
                  type="button"
                  aria-label="Supprimer l'abonnement"
                  onClick={() =>
                    setSubscriptions((current) => current.filter((sub) => sub.id !== item.id))
                  }
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <ToolHeader icon={Users} title="Contacts" action={(
            <Button
              size="sm"
              variant="primary"
              icon={<Plus size={15} />}
              type="button"
              onClick={() =>
                setContacts((current) => [
                  { id: `c${Date.now()}`, name: "Nouveau contact", role: "Client", email: "" },
                  ...current,
                ])
              }
            >
              Ajouter
            </Button>
          )} />
          <div className="mt-4 space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="grid gap-2 rounded-lg border border-line bg-white/[0.045] p-3 sm:grid-cols-[1fr_1fr_1.2fr_auto]">
                <Input
                  value={contact.name}
                  onChange={(event) =>
                    setContacts((current) =>
                      current.map((item) =>
                        item.id === contact.id ? { ...item, name: event.target.value } : item,
                      ),
                    )
                  }
                />
                <Input
                  value={contact.role}
                  onChange={(event) =>
                    setContacts((current) =>
                      current.map((item) =>
                        item.id === contact.id ? { ...item, role: event.target.value } : item,
                      ),
                    )
                  }
                />
                <Input
                  type="email"
                  value={contact.email}
                  onChange={(event) =>
                    setContacts((current) =>
                      current.map((item) =>
                        item.id === contact.id ? { ...item, email: event.target.value } : item,
                      ),
                    )
                  }
                />
                <Button
                  size="icon"
                  variant="danger"
                  type="button"
                  aria-label="Supprimer le contact"
                  onClick={() => setContacts((current) => current.filter((item) => item.id !== contact.id))}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[.8fr_1.2fr]">
        <Card className="p-4">
          <ToolHeader icon={Timer} title="Focus timer" />
          <div className="mt-5 rounded-lg border border-brand/25 bg-brand/10 p-5 text-center">
            <p className="font-mono text-6xl font-black">{timerLabel}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Input
                className="max-w-24"
                type="number"
                min={1}
                max={180}
                value={focusMinutes}
                onChange={(event) => setFocusMinutes(Number(event.target.value) || 25)}
              />
              <Button
                variant="primary"
                icon={running ? <Pause size={16} /> : <Play size={16} />}
                type="button"
                onClick={() => setRunning((value) => !value)}
              >
                {running ? "Pause" : "Start"}
              </Button>
              <Button
                icon={<RotateCcw size={16} />}
                type="button"
                onClick={() => {
                  setRunning(false);
                  setSecondsLeft(focusMinutes * 60);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <ToolHeader icon={Save} title="Journal du jour" />
          <Textarea
            className="mt-4 min-h-72 text-base"
            value={journal}
            onChange={(event) => setJournal(event.target.value)}
            placeholder="Note tes décisions, blocages, idées et actions de demain..."
          />
          <p className="mt-3 text-xs font-bold text-muted">Sauvegarde automatique dans ton navigateur.</p>
        </Card>
      </section>
    </div>
  );
}

function ToolHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-brand-2/25 bg-brand-2/10 text-brand-2">
          <Icon size={18} />
        </span>
        <h3 className="text-lg font-black">{title}</h3>
      </div>
      {action}
    </div>
  );
}
