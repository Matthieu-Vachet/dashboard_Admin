import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { learningServerError } from "@/lib/learning/http";
import { readLearningCatalog } from "@/lib/learning/repository";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "learning-export", 60, 60_000);
    const session = await getSession();
    if (!session || session.role !== "admin") return NextResponse.json({ success: false, error: "Droits administrateur requis." }, { status: 403 });
    const catalog = await readLearningCatalog();
    const scope = request.nextUrl.searchParams.get("scope") || "all";
    const topicId = request.nextUrl.searchParams.get("id");
    let payload: unknown;
    let fileName: string;
    if (scope === "curriculum") {
      payload = catalog.curriculum;
      fileName = "curriculum.json";
    } else if (scope === "projects") {
      payload = { schemaVersion: 1, projects: catalog.topics.flatMap((topic) => topic.projects.map((project) => ({ topicId: topic.id, ...project }))) };
      fileName = "learning-projects.json";
    } else if (scope === "achievements") {
      payload = { schemaVersion: 1, achievements: catalog.topics.flatMap((topic) => topic.achievements.map((achievement) => ({ topicId: topic.id, ...achievement }))) };
      fileName = "learning-achievements.json";
    } else if (scope === "topic" && topicId) {
      payload = catalog.topics.find((topic) => topic.id === topicId);
      if (!payload) return NextResponse.json({ success: false, error: "Thème introuvable." }, { status: 404 });
      fileName = `${topicId}.json`;
    } else {
      payload = { schemaVersion: 1, curriculum: catalog.curriculum, topics: catalog.topics };
      fileName = "javascript-learning.json";
    }
    const response = new NextResponse(JSON.stringify(payload, null, 2), {
      headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="${fileName}"`, "Cache-Control": "private, no-store" },
    });
    return response;
  } catch (error) {
    return learningServerError(error);
  }
}
