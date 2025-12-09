import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const authRoutes = ["/sign-in"];
  const protectedRoutes = ["/dashboard"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && sessionCookie) {
    // Jika ada session cookie dan sedang di halaman login -> lempar ke dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !sessionCookie) {
    // Jika tidak ada session cookie dan sedang di halaman yang dilindungi -> lempar ke login
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

	return NextResponse.next();
}

export const config = {
	matcher: ["/sign-in", "/dashboard"], // Specify the routes the middleware applies to
};