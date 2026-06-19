import OpenAI from "openai";
import { NextResponse } from "next/server";

let client: OpenAI | null = null;

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return client;
}

function getOpenAIErrorMessage(error: unknown) {
  const status =
    typeof error === "object" && error && "status" in error
      ? Number((error as { status?: number }).status)
      : undefined;
  const message =
    typeof error === "object" && error && "message" in error
      ? String((error as { message?: string }).message)
      : String(error);

  console.error("[api/assistant] OpenAI request failed", {
    status,
    message: message.slice(0, 300),
  });

  if (status === 429) {
    return "OpenAI répond 429 : ta clé API est bien présente, mais le quota, la limite de débit ou la facturation du compte bloque l'appel. Vérifie Billing / Usage côté OpenAI, ou utilise un modèle moins coûteux dans OPENAI_MODEL.";
  }

  if (status === 401) {
    return "OpenAI répond 401 : la clé OPENAI_API_KEY est refusée. Vérifie qu'elle est complète, active, et bien ajoutée dans l'environnement Production de Vercel.";
  }

  if (status === 404 || /model/i.test(message)) {
    return "OpenAI refuse le modèle configuré. Vérifie OPENAI_MODEL dans Vercel, puis redéploie le dashboard.";
  }

  return "L'assistant a reçu une erreur côté OpenAI. Les logs Vercel contiennent le détail technique, mais la route API fonctionne bien.";
}

export async function POST(request: Request) {
  const { messages } = (await request.json()) as {
    messages?: Array<{ role: "user" | "assistant"; content: string }>;
  };

  const openai = getClient();

  if (!openai) {
    return NextResponse.json({
      content:
        "Mode local actif. Ajoute OPENAI_API_KEY dans ton .env et dans Vercel pour activer l'assistant OpenAI. Pour ta demande : je peux la transformer en plan, backlog, checklist ou note projet.",
    });
  }

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions:
        "Tu es l'assistant personnel de Matthieu. Reponds en francais, avec un style direct, utile, oriente projet, dashboard, developpement et organisation.",
      input: (messages || []).slice(-10).map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return NextResponse.json({ content: response.output_text });
  } catch (error) {
    return NextResponse.json({ content: getOpenAIErrorMessage(error), error: true });
  }
}
