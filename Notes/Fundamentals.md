1. Client Side Component && Server Side Component
    - Both types of components are once rendered on the server.
    - client components are rendered on the browser 2nd time for **hydration and interactivity**.

    # How does the server component gets executed ?
    - The server executes all JS Logic and converts the JSX .
    - Only the final resultant HTML file to the browser.

    # How does the client component gets executed ?
    - The server converts the JSX(NON-JS part) into HTML.
    - JS Bundle included : 
        1. all JS logic
        2. JSX is wrapped in JS functions ,then included in the bundle
    - The server sends the bare-bone HTML file , which gets rendered immediately on the browser.
    - React on the other hand , executes the bundled JS on the browser for **hydration and interactivity**.


    # Performance Difference if client components and server components
    - Though ,client component are also rendered on the server ,but all the code is then bundled into JS bundle && executed on browser for  hydration and interactivity.
    - So more client components results in more size of JS bundle , more size of JS results in heavy browser operation leading to laggy website.

    - On the other hand, server components are fully rendered on the server && only the resulting HTML is sent to the browser.  

    # When is a server component turned into a client component ?
    - Every Component thats being **imported inside a client component** will also be **considered as a client component**.
    - The next JS compiler , converts only the **imported components inside a client component into client component**.

    # Why can't I use async server components inside a client component ?
    - because the server component is already turned into client component ,once it's imported inside the client component.
    - and a client component cannot be a async component.

- SSR, SSG, ISR 
- Hydration Issues ( how does it occur ? )
- Middleware
- caching ( data caching , full route caching-server && router caching-browser)