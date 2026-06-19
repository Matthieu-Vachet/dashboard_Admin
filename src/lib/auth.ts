import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session-token";

const defaultEmail = "matthieu@example.com";
const defaultPassword = "change-moi";

export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get("matweb_dashboard_session")?.value);
}

export function validateCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL || defaultEmail;
  const expectedPassword = process.env.ADMIN_PASSWORD || defaultPassword;

  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET)
  ) {
    return false;
  }

  return email === expectedEmail && password === expectedPassword;
}
