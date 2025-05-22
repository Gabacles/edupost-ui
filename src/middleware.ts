import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";

import { isTokenExpired } from "@/lib/auth";

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("access_token")?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/";

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    if (isTokenExpired(authToken)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

      const redirectResponse = NextResponse.redirect(redirectUrl);

      redirectResponse.cookies.set("access_token", "", {
        path: process.env.NEXT_PUBLIC_DOMAIN,
        expires: new Date(0),
      });

      return redirectResponse
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
