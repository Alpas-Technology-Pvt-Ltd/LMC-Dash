# Server Side Rendering

```Javascript
async function Page() {
  const res = await fetch('https://api.example.com/products', { cache: 'no-store' });
  const data = await res.json();

  return <div>{JSON.stringify(data)}</div>;
}
export default Page;
```

When a browser requests a page
- The server runs ALL the code in your page file - including your data fetching logic
- It waits for that data to be fetched
- It then executes your JSX code using that data
- The server generates the complete HTML with all the data already in it
- This finished HTML is sent to the browser

# Incremental Site Generation

```Javascript
async function About() {
  const res = await fetch('https://api.example.com/about-data', { next: { revalidate: 3600 } });
  const data = await res.json();

  return <div>About: {JSON.stringify(data)}</div>;
}
```
- Server Part : data fetch garcha only for the request that comes after the time expires , then it runs the JSX part and sends the file to the browser. 

# Static Site Generation
- does not fetch for any request.



1. SSR
2. ISR
3. SSG
4. client side fetching
