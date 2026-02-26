import { cookies } from "next/headers";

const COOKIE_NAME = "docs_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) return false;

  const password = process.env.DOCS_PASSWORD;
  if (!password) return false;

  return token.value === hashPassword(password);
}

export function hashPassword(password: string): string {
  // Simple hash for cookie comparison — not cryptographic security,
  // just prevents the raw password from sitting in the cookie.
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return `ie_${Math.abs(hash).toString(36)}`;
}

export function getAuthCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  };
}
