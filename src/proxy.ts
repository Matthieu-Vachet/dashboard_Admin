import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sessionCookieName, verifySessionToken } from "@/lib/session-token";
import { applySecurityHeaders } from "@/lib/security";

const publicPaths = ["/login", "/api/session", "/api/logout", "/api/events"];
const protectedApiPaths = [
  "/api/dashboard-store",
  "/api/pokemon-admin",
  "/api/trainer-pokemon",
  "/api/dashboard-backlog",
  "/api/admin/events",
  "/api/admin/community-days",
  "/api/admin/dynamax-images",
  "/api/learning",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const next = () => applySecurityHeaders(NextResponse.next());

  if (
    publicPaths.some((path) => pathname.startsWith(path)) ||
    protectedApiPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return next();
  }

  const session = verifySessionToken(request.cookies.get(sessionCookieName)?.value);

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  return next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
