import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY as string
  const refreshTokenKey = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string

  const token = request.cookies.get(tokenKey)?.value;
  const refreshToken = request.cookies.get(refreshTokenKey)?.value;

  if (token && (pathname === "/login")) {
    return NextResponse.redirect(new URL("/componentes", request.url));
  }
  
  if (!token && !refreshToken && (pathname !== "/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/login",
    "/componentes/:path*", 
    "/dashboard/:path*",
  ],
};