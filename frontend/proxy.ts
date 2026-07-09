import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const isMobile = userAgent ? /mobile|android|iphone/i.test(userAgent) : false;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-is-mobile", isMobile ? "1" : "0");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
