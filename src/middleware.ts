import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

function normalizeToken(rawToken?: string): string | null {
  if (!rawToken || rawToken === "undefined" || rawToken === "null") {
    return null;
  }

  let token = rawToken.trim();

  if (token.startsWith("{")) {
    try {
      const parsed = JSON.parse(token);
      token = parsed?.value ?? token;
    } catch {
      return null;
    }
  }

  return token
    .replace(/^Bearer\s+/i, "")
    .replace(/^"|"$/g, "");
}

function isValidJwtFormat(token: string): boolean {
  return token.split(".").length === 3;
}

function getTokenPayload(token?: string) {
  const normalized = normalizeToken(token);

  if (!normalized || !isValidJwtFormat(normalized)) {
    return null;
  }

  try {
    return decodeJwt(normalized);
  } catch {
    return null;
  }
}

function isAuthRoute(pathname: string) {
  return pathname === "/login";
}

function isProtectedRoute(pathname: string) {
  return pathname !== "/login";
}

function isAdminRoute(pathname: string) {
  return ["/laboratorios", "/usuarios"].some(route =>
    pathname.startsWith(route)
  );
}

function redirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("inventario.token")?.value;
  const refreshToken = request.cookies.get("inventario.refreshToken")?.value;

  const payload = getTokenPayload(token);

  if (isAuthRoute(pathname) && token) {
    return redirect(request, "/componentes");
  }

  if (isProtectedRoute(pathname) && !token && !refreshToken) {
    return redirect(request, "/login");
  }

  if (isAdminRoute(pathname) && !payload?.isAdmin) {
    return redirect(request, "/componentes");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/login",
    "/componentes/:path*", 
    "/laboratorios/:path*",
    "/usuarios/:path*",
    "/dashboard/:path*",
  ],
};