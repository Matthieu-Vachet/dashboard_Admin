import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/auth";
import { createSessionToken, sessionCookieName } from "@/lib/session-token";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/");

  if (!validateCredentials(email, password)) {
    return NextResponse.redirect(
      new URL(`/login?error=1&next=${encodeURIComponent(next)}`, request.url),
      303,
    );
  }

  const response = NextResponse.redirect(
    new URL(next.startsWith("/") ? next : "/", request.url),
    303,
  );

  response.cookies.set(sessionCookieName, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
