# Mistakes in Next JS

- Every Component thats being **imported inside a client component** will also be **considered as a client component**.
- The next JS compiler , converts only the **imported components inside a client component into client component**.

- If you wrap a server component inside a client component , the server component will stay as a server component itself.(unless the parent component isn't a client component)
- eg : wrapping all components inside contextWrapper.

### Next JS dynamic import

- Incorrectly using browser API (localstorage, window object)
- **Dyanmic Import** along with **SSR:false** to render the client component only on the client side(it won't render on server).
- EG : const DynamicComponentWithNoSSR = dynamic(() => import('../components/hello3'),{ ssr: false })

# Suspense and Streaming in Next JS

- "loading.tsx" filename for suspense in next js **whole page suspense**
- <suspense> for specific loading indications.

```Javascript
 <Suspense key={`${productId}`} fallback="Loading feed...">
        <PostFeed />
</Suspense>

// Key is used to re-trigger this suspense loading , when even the "productId" changes.
```

//--------------------------------------------------------------------------------------------------------------------------------------//

- next js will auto cache the requests made by **fetch**
- to make a component server-component use "server-only" package , but by default all comps are server components.
- "use server" is only used to create server actions.

- By default , server components are rendered statically(static site generation) , but if we use certain features in server component , it's rendered dynamically(Server Side Rendering).
- eg : using SearchParams as a prop , using browser features like cookies , headers

//--------------------------------------------------------------------------------------------------------------------------------------//
