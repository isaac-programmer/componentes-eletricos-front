import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;
  // const refreshToken = request.cookies.get("refresh_token")?.value;

  if (token && (pathname === "/login")) {
    return NextResponse.redirect(new URL("/componentes", request.url));
  }
  
  if (!token && (pathname !== "/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/login",
    "/componentes/:path*", 
    "/dashboard/:path*"
  ],
};