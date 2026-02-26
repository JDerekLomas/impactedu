import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /documents (not /documents/login) and /admin
  const isProtected =
    (pathname === "/documents" || (pathname.startsWith("/documents") && !pathname.startsWith("/documents/login"))) ||
    pathname.startsWith("/admin");

  if (isProtected) {
    const token = request.cookies.get("docs_auth");

    if (!token) {
      const loginUrl = new URL("/documents/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/documents/:path*", "/admin/:path*"],
};
