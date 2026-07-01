import { NextResponse } from "next/server";

const mutatingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const buckets = new Map<string, { count: number; resetAt: number }>();

export const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: blob: https://raw.githubusercontent.com https://avatars.githubusercontent.com https://cdn.leekduck.com https://leekduck.com",
    "connect-src 'self' https://raw.githubusercontent.com https://api.github.com",
    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Cross-Origin-Opener-Policy": "same-origin",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

/** Ajoute les headers de sécurité sur une réponse Next.js. */
export function applySecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

/** Nettoie une URL de retour pour éviter les redirections externes après login. */
export function safeInternalPath(value: unknown, fallback = "/") {
  const path = String(value || fallback).trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return fallback;
  return path;
}

/** Bloque les requêtes d'écriture qui ne viennent pas du même origin que le dashboard. */
export function assertSameOrigin(request: Request) {
  if (!mutatingMethods.has(request.method.toUpperCase())) return;

  const origin = request.headers.get("origin");
  if (!origin) {
    if (process.env.NODE_ENV === "production") {
      const error = new Error("Origine de requête manquante.");
      (error as Error & { status?: number }).status = 403;
      throw error;
    }
    return;
  }

  let requestOrigin = "";
  let providedOrigin = "";
  try {
    requestOrigin = new URL(request.url).origin;
    providedOrigin = new URL(origin).origin;
  } catch {
    const error = new Error("Origine de requête invalide.");
    (error as Error & { status?: number }).status = 403;
    throw error;
  }

  if (providedOrigin !== requestOrigin) {
    const error = new Error("Origine de requête refusée.");
    (error as Error & { status?: number }).status = 403;
    throw error;
  }
}

/** Limiteur mémoire best-effort pour calmer les essais bruteforce et les floods API. */
export function rateLimit(request: Request, label: string, limit = 120, windowMs = 60_000) {
  const now = Date.now();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const key = `${label}:${ip}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    const error = new Error("Trop de requêtes, réessaie dans quelques secondes.");
    (error as Error & { status?: number }).status = 429;
    throw error;
  }

  bucket.count += 1;
}

/** Refuse les très gros payloads JSON qui n'ont rien à faire dans le dashboard. */
export function assertJsonPayloadSize(value: unknown, maxBytes = 250_000) {
  const bytes = new TextEncoder().encode(JSON.stringify(value ?? null)).byteLength;
  if (bytes > maxBytes) {
    const error = new Error("Payload trop volumineux.");
    (error as Error & { status?: number }).status = 413;
    throw error;
  }
}

/** Réponse JSON commune pour les blocages de sécurité côté API. */
export function securityError(error: unknown) {
  const message = error instanceof Error ? error.message : "Requête refusée.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 403
      : 403;

  return NextResponse.json({ error: message }, { status });
}
