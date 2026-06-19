import { createHmac, timingSafeEqual } from "node:crypto";

export const sessionCookieName = "matweb_dashboard_session";

function getSecret() {
  return process.env.SESSION_SECRET || "local-dashboard-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(email: string) {
  const payload = Buffer.from(
    JSON.stringify({ email, role: "admin", issuedAt: Date.now() }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [payload, signature] = token.split(".");
  const expected = sign(payload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString());
    return decoded as { email: string; role: "admin"; issuedAt: number };
  } catch {
    return null;
  }
}
