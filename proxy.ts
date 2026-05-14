import { NextRequest, NextResponse } from "next/server"

// Route yang butuh login
const protectedRoutes = [
  "/dashboard",
  "/onboarding",
  "/progress",
  "/profile",
]

// Route auth
const authRoutes = ["/login", "/register"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Cek session Better Auth
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")

  const isLoggedIn = !!sessionCookie

  // Protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    )
  }

  // Auth route
  const isAuthRoute = authRoutes.includes(pathname)

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding",
    "/progress/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
}