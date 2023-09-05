import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  if (pathname !== "/") {
    const response = await fetch(`${process.env.API_URL}/url?shorten=${pathname.substring(1)}`)
    const { origin } = await response.json()
    if (origin) {
      return NextResponse.redirect(new URL(origin))
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}