import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { readLearningActivity, readLearningCatalog, readLearningProgress } from "@/lib/learning/repository";
import { recordDashboardApiCall } from "@/lib/dashboard-store";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "learning-topics-read", 180, 60_000);
    const session = await getSession();
    if (!session) return learningJson({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/learning/topics", "GET");
    const catalog = await readLearningCatalog();
    const [progressResult, activityResult] = await Promise.all([
      readLearningProgress(session.email, catalog.topics),
      readLearningActivity(session.email),
    ]);
    return learningJson({
      success: true,
      data: {
        topics: catalog.topics,
        curriculum: catalog.curriculum,
        source: catalog.source,
        warning: catalog.warning,
        progress: progressResult.progress,
        migrated: progressResult.migrated,
        activity: activityResult.activity,
        stats: activityResult.stats,
        databaseConfigured: progressResult.configured,
      },
    });
  } catch (error) {
    return learningServerError(error);
  }
}
