# what happens if there is a server component inside a client component .In this case , along with the JSX of client component , will the server component inside it also be included in the JS bundle and sent to the browser ?? or what will happen in this case ??

- Next JS , firstly coverts the JSX of server component into HTML .
- During the time of rendering of client component on server , the server component is replaced by the converted HTML.
- Now , only the HTML part of the server is included in the JS bundle along with the JSX of client component.

# ThemeIcon Component ko code execution understand

- The content inside if (!mounted) will technically render, but only for a very brief moment (usually milliseconds) during the initial render.
- It's so quick that you might not catch it visually.
- To see the UI on intial render , You can use some delays in useEffect

```Javascript
"use client";

export default function ThemeIcon() {
  const [mounted, setMounted] = useState(false);;

// Changes to see the if (!mounted) condition wala UI
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    },5000)
  },[]);


  if (!mounted) return (<p>Helloooo</p>);

  if (theme === "dark") {return (<div><FiSun />{t("light")}</div>);}

  if (theme === "light") {return (<div><FiMoon />{t("dark")}</div>);}
}


```
