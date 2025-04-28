# Server Actions

- same as API functions.
- server actions == **post request**

# 🛠️ Why Use Server Actions?

- Mutations (updating/deleting data in database)
- Fetching data on user interaction (button click, form submit in database)
- Fetching data securely (hiding API keys)

# Example Of Server Action

```Javascript

// ✅ Define a Server Action inside a Server Component
"use server";
export async function fetchPost() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json());
  return data.title;
}



"use client";
export default function ClientComponent() {

  async function handleFetch() {
    await fetchPost();
   }

  return (
      <button onClick={handleFetch}>Fetch Title</button>
  );
}
```
