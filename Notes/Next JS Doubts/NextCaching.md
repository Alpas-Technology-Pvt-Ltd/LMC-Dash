# Caching in Next JS

1. Request Memoization
   - Memoizing/caching the fetch request response only for **single Request Lifecycle**.
   - The memoized data will be removed , once the a **new request lifecycle starts.**
   - eg usecases : parent file mah a fetch request is made , and the same fetch request is made in it's child component , then it's the part of **single Request Lifecycle**, so 2nd fetch call huda ,fetch call will be memoized.
2. Data Cache
   - Next.js has a built-in Data Cache that persists the result of data fetches across incoming server requests and deployments.
   - Memoizing/caching the fetch request data in the servers for a long period of time until expired or revalidated.
   - The memoized data can be used across multiple pages.

   - by default : fetch('https://api.vercel.app/blog', { cache: 'force-cache' })
   - revalidation : fetch('https://...', { next: { revalidate: 3600 } })
   - No cache : fetch('https://api.vercel.app/blog', { cache: 'no-store' })

3. Full Route Cache : Caching the whole page of the route either with SSG || SSR || ISR
4. Router Cache
   **(Incase of SSR)**
   - When a page is first requested, the server renders it and sends the complete HTML to the client
   - Next.js caches this result on the server for about 30 seconds by default
   - During those 30 seconds, any subsequent requests for the same page will receive the cached version (fast response)
   - After the 30-second cache expires, the next request will trigger a fresh server-side render
   - This new render result will be cached for another 30 seconds

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//

# Terms in Next JS Caching

- **React Server Component Payload (RSC Payload)** : It contains everything Next.js needs to reconstruct the exact state of your server components without having to re-fetch data or re-render components.
- **Request Lifecycle** : When a user opens a page in Next.js, the server processes the request and sends back a response.
  Think of it like this:
  🔹 You visit a page (/home) → The server fetches data → The server sends the page to your browser → End of that request lifecycle.
  🔹 You visit another page (/product) → A new request starts → The server fetches data again → A new response is sent.

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//


1. Request Memoization : memoizing the fetch response for a **Request Lifecycle**.
2. Data Cache : memoizing the fetch response according to the **cache header's directions for a longer period of time**.
3. Full Route Cache : Caching the whole page of the route either with SSG || ISR
   By default, statically rendered routes (pages that don't need fresh data for each visitor) are stored in this cache. For dynamic pages that change based on who's viewing them, the cache works differently - it might only keep pages for a short time or not cache them at all.
   You can control this cache by telling Next.js:

   Which pages should be cached
   How long they should stay cached before being rebuilt
   When to ignore the cache and build a fresh page

Full route cache in next can only happen in ISR && SSG ignoring the fact that the router cache that caches even SSR for certain time.


# Diff between full route cache and router cache
**full route cache**
Lives on the server side
Stores the fully rendered HTML of pages
Created during build time for static pages or at request time for dynamic pages
Determines when a page needs to be re-rendered on the server
Controlled by options like revalidate or dynamic settings

**router cache**
Lives on the client side (in the browser)
Stores the React Server Component payload (the data and component instructions) && React client-side runtime builds the UI with the payload
Created as users navigate through your application
Prevents unnecessary network requests when users navigate back to previously visited pages

- The **Full Route Cache** decides if the server needs to rebuild a page
- The **Router Cache** decides if the browser needs to request a page again