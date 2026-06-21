import { NextResponse } from "next/server";
import { applySecurityHeaders, assertSameOrigin, securityError } from "@/lib/security";
import { sessionCookieName } from "@/lib/session-token";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
  } catch (error) {
    return applySecurityHeaders(securityError(error));
  }

  const response = applySecurityHeaders(NextResponse.redirect(new URL("/login", request.url), 303));
  response.cookies.delete(sessionCookieName);
  return response;
}
