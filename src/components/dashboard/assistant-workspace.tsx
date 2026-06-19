"use client";

import { motion } from "framer-motion";
import { Bot, Send, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { aiSuggestions } from "@/data/dashboard";
import { cn } from "@/lib/cn";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Salut Matthieu. Je peux transformer tes idées en backlog, résumer tes notes, analyser ton API Pokémon GO ou préparer ton planning.",
  },
];

export function AssistantWorkspace() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(prompt = input) {
    const content = prompt.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { content: string };
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.content || "Je n'ai pas encore de réponse." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Impossible de joindre l'assistant pour le moment. Vérifie la route API et la clé OPENAI_API_KEY.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <Card tone="strong" className="relative min-h-[calc(100vh-150px)] overflow-hidden p-4 sm:p-5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2 to-transparent" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <Badge tone="violet">MCP ready</Badge>
            <h2 className="mt-3 text-3xl font-black">Assistant personnel</h2>
            <p className="mt-2 text-sm font-semibold text-muted">
              Connecté à l&apos;API OpenAI côté serveur quand `OPENAI_API_KEY` est défini.
            </p>
          </div>
          <div className="hidden h-14 w-14 place-items-center rounded-lg border border-brand-2/30 bg-brand-2/10 text-brand-2 sm:grid">
            <Bot size={26} />
          </div>
        </div>

        <div className="mt-6 h-[calc(100vh-380px)] min-h-[380px] space-y-4 overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <motion.div
              key={`${message.role}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
                  <Bot size={17} />
                </span>
              ) : null}
              <div
                className={cn(
                  "max-w-[760px] rounded-lg border p-4 text-sm font-semibold leading-7",
                  message.role === "user"
                    ? "border-brand-2/30 bg-brand-2/12 text-cyan-50"
                    : "border-line bg-white/[0.055] text-foreground",
                )}
              >
                {message.content}
              </div>
              {message.role === "user" ? (
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.08] text-brand-3">
                  <UserRound size={17} />
                </span>
              ) : null}
            </motion.div>
          ))}
          {loading ? (
            <div className="flex items-center gap-3 text-sm font-black text-muted">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/12 text-brand">
                <Sparkles size={16} />
              </span>
              Réflexion en cours...
            </div>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <Textarea
            className="min-h-24"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Demande un plan, une analyse API, une note ou un backlog..."
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                void sendMessage();
              }
            }}
          />
          <Button
            className="self-end"
            variant="primary"
            icon={<Send size={17} />}
            type="button"
            onClick={() => void sendMessage()}
            disabled={loading}
          >
            Envoyer
          </Button>
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            Actions rapides
          </p>
          <div className="mt-4 space-y-3">
            {aiSuggestions.map((suggestion) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={suggestion.title}
                  type="button"
                  onClick={() => void sendMessage(suggestion.prompt)}
                  className="w-full rounded-lg border border-line bg-white/[0.045] p-3 text-left transition hover:border-brand-2/35 hover:bg-brand-2/10"
                >
                  <Icon size={18} className="text-brand-2" />
                  <p className="mt-3 text-sm font-black">{suggestion.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-muted">
                    {suggestion.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            Intégration
          </p>
          <div className="mt-4 space-y-3 text-sm font-semibold leading-6 text-muted">
            <p>
              Ton compte ChatGPT n&apos;est pas branché directement dans une app web. La bonne voie est une clé API OpenAI stockée côté serveur.
            </p>
            <p>
              Ajoute `OPENAI_API_KEY` localement et sur Vercel pour activer les réponses réelles.
            </p>
          </div>
        </Card>
      </aside>
    </div>
  );
}
