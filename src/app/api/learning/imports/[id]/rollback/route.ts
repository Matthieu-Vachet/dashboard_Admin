import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { rollbackLearningImport } from "@/lib/learning/repository";
import { assertSameOrigin, rateLimit } from "@/lib/security";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, "learning-import-rollback", 10, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return learningJson({ success: false, error: "Droits administrateur requis." }, { status: 403 });
    const { id } = await params;
    const result = await rollbackLearningImport(session.email, id);
    return learningJson({ success: true, data: result });
  } catch (error) {
    return learningServerError(error);
  }
}
