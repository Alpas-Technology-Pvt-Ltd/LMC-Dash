import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary_text_color: 'var(--primary-text-color)',

        body_bg: 'var(--body-bg-color)',
        component_bg: 'var(--component-bg-color)',

        theme_color: 'var(--theme-color)',
        theme_color_light: 'var(--theme-color-light)',
        theme_color_dark: 'var(--theme-color-dark)',

        // Padding && Spacing
        component_padding: 'var(--component-padding)',
      },
    },
  },
  plugins: [],
} satisfies Config;
