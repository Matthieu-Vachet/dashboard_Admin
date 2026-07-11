import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { readLearningImports } from "@/lib/learning/repository";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "learning-imports-read", 120, 60_000);
    const session = await getSession();
    if (!session || session.role !== "admin") return learningJson({ success: false, error: "Droits administrateur requis." }, { status: 403 });
    const imports = await readLearningImports(session.email);
    return learningJson({ success: true, data: { imports } });
  } catch (error) {
    return learningServerError(error);
  }
}
