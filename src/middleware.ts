// 🎯 Key Takeaways
// ✅ Middleware intercepts both frontend route navigations and API requests.
// ✅ You can use it to protect frontend pages and API endpoints.
// ✅ Middleware does NOT intercept external requests or static assets.

// middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const protectedRoutes = ['/map', '/incident', '/blog'];
const notProtectedRoute = ['/login'];

const intlMiddleware = createIntlMiddleware(routing);

// Middleware handler
export async function middleware(request: NextRequest) {
  await cookies();

  let defaultLng = "en";

  // Check if the path is protected
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => {
      return (
        path == '/' || path == '/en' || path == '/np' || path.includes(route)
      );
    },
    // path == "/en" || path == "/np" will check if the current route is dashboard or not
    // path.includes(route) will check remaining protected routes
  );
  const isNotProtectedRoute = notProtectedRoute.some((route) =>
    path.includes(route),
  );

  // Get auth status (adjust according to your auth implementation)
  const authToken = request.cookies.get('accessToken');
  const isAuthenticated = !!authToken;

  // route is protected ,but the is not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    console.log(request.cookies.get('NEXT_LOCALE')?.value);

    const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLng; // 'en' or 'np'
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }
  // route is unprotected , but the user is authenticated
  else if (isAuthenticated && isNotProtectedRoute) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLng; // 'en' or 'np'
    const loginUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(loginUrl);
  } else {
    // route is protected && the user is authenticated.
    // It will redirect to the original requested URL
    return intlMiddleware(request);
  }
}

export const config = {
  matcher: ['/', '/(np|en)/:path*'],
};
