import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { readLearningActivity } from "@/lib/learning/repository";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "learning-activity-read", 180, 60_000);
    const session = await getSession();
    if (!session) return learningJson({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    const result = await readLearningActivity(session.email);
    return learningJson({ success: true, data: result });
  } catch (error) {
    return learningServerError(error);
  }
}
