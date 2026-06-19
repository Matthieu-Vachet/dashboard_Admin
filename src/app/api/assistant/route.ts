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
}
