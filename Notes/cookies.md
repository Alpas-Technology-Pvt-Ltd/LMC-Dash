# Secure Attribute (Secure):
    - The Secure attribute instructs the browser to transmit the cookie only over secure HTTPS connections.

# HttpOnly Attribute (HttpOnly):

- The HttpOnly attribute adds an additional layer of security by preventing client-side scripts from accessing the cookie.
- When this attribute is set, the cookie cannot be accessed via JavaScript, which helps protect against cross-site scripting (XSS) attacks.
- It is highly recommended to apply this attribute to cookies that contain sensitive information.

Blog Samesite : https://vercel.com/blog/understanding-the-samesite-cookie-attribute
Blog XSS Attacks : https://vercel.com/guides/understanding-xss-attacks
Blog CSRF Attacks : https://vercel.com/blog/understanding-csrf-attacks

# Same site

    Strict
    - When a cookie's SameSite attribute is set to Strict, it means the cookie will be sent only if the request originates from the same site.
    Lax
    - The Lax setting strikes a balance between usability and security. With this setting, the cookie:
    - Won't be sent on cross-site subresource requests, such as images, stylesheets, and scripts.
    - Will be sent for top-level navigations, like when a user clicks on a link leading to the site.
    None
    - For the cookie to be sent with every request, including cross-site ones, the SameSite attribute should be set to None.
    - when using "SameSite=None", the cookie must also be marked as "Secure".

# Cross Site Request Forgery (CSRF Attacks)
