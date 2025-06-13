import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is a simplified middleware that would normally check for authentication tokens
  // For demo purposes, we'll just check if the user is trying to access dashboard routes

  const path = request.nextUrl.pathname

  // If the user is trying to access a dashboard route, we'll let the client-side
  // authentication handle the redirect
  if (path.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
