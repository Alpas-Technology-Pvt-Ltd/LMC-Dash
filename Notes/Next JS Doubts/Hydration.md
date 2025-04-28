# Hydration Issues

- Hydration Error occur when , there is a difference between **server rendered HTML** && **HTML generated while hydration** on the client side.
- **suppressHydrationWarning** attribute for preventing hydration warnings
- hydration issue occurs on client components

- **Hydration Process** :
  - React compares the server-rendered HTML with the Virtual DOM it creates.
  - If they match, hydration succeeds without modifying the DOM.
  - If they don’t match, React replaces the content.

```Javascript
"use client"
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

// What happens:
// - Server: Renders initial HTML with count = 0
// - Client receives: Static HTML of the button
// - Client: React hydrates the component, attaching event listeners and making it interactive

```
