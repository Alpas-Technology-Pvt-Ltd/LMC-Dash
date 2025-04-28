# Client Components are rendered on the client side and do not support async/await in their rendering logic.

```Javascript
// ✅ A Server Component
async function ServerComponent() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json());
  return <div>{data.title}</div>;
}

// ❌ A Client Component cannot "control" the async execution of the Server Component
"use client";
export default function ClientComponent() {
  return (
    <div>
      <h1>Client Component</h1>
      <ServerComponent /> {/* This component is already resolved on the server */}
    </div>
  );
}
```

- What Happens Here?
  - ServerComponent() executes on the server (before ClientComponent renders).
  - By the time ClientComponent runs in the browser, it just receives the resolved HTML of ServerComponent, and there’s no async behavior left for the client to manage.
  - The Client Component does not need to and cannot "wait" for the Server Component—it only gets the **final output**.
