import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { updateLearningProgress } from "@/lib/learning/repository";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";
import type { LearningStatus } from "@/types/admin/learning";

export async function PUT(request: NextRequest) {
  try {
    rateLimit(request, "learning-progress-write", 180, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return learningJson({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    const body = (await request.json().catch(() => ({}))) as { itemId?: unknown; status?: unknown; answer?: unknown; correctionViewed?: unknown };
    assertJsonPayloadSize(body, 150_000);
    const itemId = String(body.itemId || "");
    if (!itemId) return learningJson({ success: false, error: "Identifiant d’unité requis." }, { status: 400 });
    if (body.status !== undefined && !["not_started", "in_progress", "completed", "reviewing"].includes(String(body.status))) {
      return learningJson({ success: false, error: "Statut invalide." }, { status: 400 });
    }
    if (body.answer !== undefined && typeof body.answer !== "string") {
      return learningJson({ success: false, error: "Réponse invalide." }, { status: 400 });
    }
    if (body.correctionViewed !== undefined && body.correctionViewed !== true) {
      return learningJson({ success: false, error: "Valeur de consultation de correction invalide." }, { status: 400 });
    }
    const result = await updateLearningProgress(session.email, {
      itemId,
      status: body.status as LearningStatus | undefined,
      answer: body.answer as string | undefined,
      correctionViewed: body.correctionViewed as true | undefined,
    });
    return learningJson({ success: true, data: result });
  } catch (error) {
    return learningServerError(error);
  }
}
