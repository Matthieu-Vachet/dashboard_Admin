import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { learningJson, learningServerError } from "@/lib/learning/http";
import { deleteLearningTopic, readLearningTopicById, updateLearningTopic } from "@/lib/learning/repository";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, "learning-topic-read", 180, 60_000);
    const session = await getSession();
    if (!session) return learningJson({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    const { id } = await params;
    const topic = await readLearningTopicById(id);
    return topic
      ? learningJson({ success: true, data: { topic } })
      : learningJson({ success: false, error: "Thème introuvable." }, { status: 404 });
  } catch (error) {
    return learningServerError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, "learning-topic-write", 30, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return learningJson({ success: false, error: "Droits administrateur requis." }, { status: 403 });
    const body = await request.json().catch(() => null);
    assertJsonPayloadSize(body, 2_000_000);
    const { id } = await params;
    const topic = await updateLearningTopic(session.email, id, body);
    return learningJson({ success: true, data: { topic } });
  } catch (error) {
    return learningServerError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, "learning-topic-delete", 10, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return learningJson({ success: false, error: "Droits administrateur requis." }, { status: 403 });
    const { id } = await params;
    const result = await deleteLearningTopic(session.email, id);
    return learningJson({ success: true, data: result });
  } catch (error) {
    return learningServerError(error);
  }
}
