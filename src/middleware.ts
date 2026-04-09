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

function isAdminRoute(pathname: string) {
  return ["/laboratorios", "/usuarios"].some(route =>
    pathname.startsWith(route)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const tokenCookieKey = "inventario.token";
  const refreshTokenCookieKey = "inventario.refreshToken";

  const token = request.cookies.get(tokenCookieKey)?.value;
  const refreshToken = request.cookies.get(refreshTokenCookieKey)?.value;

  const payload = getTokenPayload(token);

  if (token && (pathname === "/login")) {
    return NextResponse.redirect(new URL("/componentes", request.url));
  }
  
  if (!token && !refreshToken && (pathname !== "/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute(pathname) && payload && !payload.isAdmin) {
    return NextResponse.redirect(new URL("/componentes", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/login",
    "/componentes/:path*", 
    "/dashboard/:path*",
    "/relatorio/:path*",
    "/laboratorios/:path*",
    "/usuarios/:path*",
    "/meu-perfil/:path*",
  ],
};