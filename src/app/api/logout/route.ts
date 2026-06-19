import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/session-token";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.delete(sessionCookieName);
  return response;
}
