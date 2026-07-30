import { Route } from "next";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

const PRIVATE_ROUTES: Route[] = ["/settings", "/editor"];

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (PRIVATE_ROUTES.some((path) => pathname.startsWith(path))) {
    if (!req.cookies.has("refresh_token")) {
      console.log("Редирект");
      return NextResponse.redirect(new URL("/login" as Route, req.url));
    }
  }

  const userAgent = req.headers.get("user-agent");
  const isMobile = userAgent ? /mobile|android|iphone/i.test(userAgent) : false;
  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-is-mobile", isMobile ? "1" : "0");

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
