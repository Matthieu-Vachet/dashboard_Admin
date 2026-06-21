import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth";
import { applySecurityHeaders, assertSameOrigin, rateLimit, safeInternalPath, securityError } from "@/lib/security";
import { createSessionToken, sessionCookieName } from "@/lib/session-token";

export async function POST(request: Request) {
  try {
    rateLimit(request, "session-login", 12, 60_000);
    assertSameOrigin(request);
  } catch (error) {
    return applySecurityHeaders(securityError(error));
  }

  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const next = safeInternalPath(formData.get("next"));

  if (!validateCredentials(email, password)) {
    return applySecurityHeaders(NextResponse.redirect(
      new URL(`/login?error=1&next=${encodeURIComponent(next)}`, request.url),
      303,
    ));
  }

  const response = applySecurityHeaders(NextResponse.redirect(new URL(next, request.url), 303));

  response.cookies.set(sessionCookieName, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
