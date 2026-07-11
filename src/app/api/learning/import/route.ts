import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { importLearningTopic } from "@/lib/learning/repository";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";
import type { LearningImportStrategy } from "@/types/admin/learning";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "learning-import", 20, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return learningJson({ success: false, error: "Droits administrateur requis." }, { status: 403 });
    const body = (await request.json().catch(() => ({}))) as { topic?: unknown; strategy?: unknown; fileName?: unknown };
    assertJsonPayloadSize(body, 2_000_000);
    const strategy = String(body.strategy || "") as LearningImportStrategy;
    if (!["create", "replace", "merge"].includes(strategy)) {
      return learningJson({ success: false, error: "Stratégie d’import invalide." }, { status: 400 });
    }
    const result = await importLearningTopic(session.email, {
      topic: body.topic,
      strategy,
      fileName: String(body.fileName || "import.json"),
    });
    return learningJson({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return learningServerError(error);
  }
}
