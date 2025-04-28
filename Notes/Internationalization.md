# i18n
    - routing.ts : This file is for creating the locales that needs to be supported.
    - request.ts : This file is used by next-intl internally for it's configuration.

# messages

    - en.json : Data files
    - np.json : Data files

- Changing the routing structure from "src/app/layout.tsx" to "src/app/[locale]/layout.tsx"

- Changes in layout.tsx file

- middleware.ts : Used for intercepting the requests and redirecting it to `/${locale}`
  if it matches with the routes mentioned in matchers array.

//-------------------------------------------------------------------------------------------------------------------------------------//

# Hooks

- useTranslations() : getting the messages data
- useLocale() : Client component lai locale ko value cahiyo bhane
- getLocale() : Server side component lai locale ko value cahiyo bhane
- import { Link } from "@/i18n/routing"
  - <Link href="/" locale="en"> </Link> : For manually changing the locale value
