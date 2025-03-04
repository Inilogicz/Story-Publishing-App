import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that should be accessible to unauthenticated users
const publicRoutes = ["/", "/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/stories/:path*"], // Protect home & story pages
};
