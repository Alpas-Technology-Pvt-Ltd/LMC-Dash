1. There should be only 1 middleware file && only 1 middleware function in one Next JS application.

```Javascript
// Routes on which this middleware function should execute on
// "/" : will execute on homeRoute
// "/(np|en)/:path*" : will execute on all routes starting with np || en
export const config = {
  matcher: ["/", "/(np|en)/:path*"],
};

```

2.

```Javascript
const intlMiddleware = createIntlMiddleware(routing);


// How intl Middleware works
// If a user hits a route without a locale prefix (e.g., /map):
// The intlMiddleware will detect that the route is missing the locale part (/en or /np).
// It will then redirect the user to the correct locale-prefixed route (e.g., /en/map or /np/map).

// Example:
// User visits: /map (no locale specified).
// What intlMiddleware does:
// Checks the user’s preferred locale or defaults to the primary locale.
// Redirects from /map to /en/map (if the default locale is en) or /np/map if np is the preferred locale.
```
