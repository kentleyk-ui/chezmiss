import { NextResponse } from "next/server"

export function middleware(req: any) {
  const isLogged = req.cookies.get("admin_auth")?.value === "1"

  if (!isLogged && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}
