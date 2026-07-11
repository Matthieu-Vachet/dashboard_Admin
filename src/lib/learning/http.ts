import { NextResponse } from "next/server";

export function learningJson(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export function learningServerError(error: unknown) {
  const message = error instanceof Error ? error.message : "Service d’apprentissage indisponible.";
  const status = error && typeof error === "object" && "status" in error
    ? Number((error as { status?: unknown }).status) || 500
    : 500;
  const issues = error && typeof error === "object" && "issues" in error
    ? (error as { issues?: unknown }).issues
    : undefined;
  return learningJson({ success: false, error: message, ...(issues ? { issues } : {}) }, { status });
}
