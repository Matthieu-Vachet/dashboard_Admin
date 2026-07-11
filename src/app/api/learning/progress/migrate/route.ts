import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { migrateLearningStatusMap, readLearningCatalog, readLearningProgress } from "@/lib/learning/repository";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "learning-progress-migrate", 5, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return learningJson({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    const body = (await request.json().catch(() => ({}))) as { progress?: unknown };
    assertJsonPayloadSize(body, 250_000);
    const catalog = await readLearningCatalog();
    const migrated = await migrateLearningStatusMap(session.email, body.progress, catalog.topics);
    const result = await readLearningProgress(session.email, catalog.topics);
    return learningJson({ success: true, data: { migrated, progress: result.progress } });
  } catch (error) {
    return learningServerError(error);
  }
}
