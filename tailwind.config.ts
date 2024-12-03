import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'btn': 'rgba(255, 255, 255, 1) 1px 1px 2px -1px inset, rgba(30, 58, 138, 0.5) -1px -1px 1px -1px inset, rgba(30, 58, 138, 0.3) 5px 5px 10px -3px',
        'inset-box': 'rgba(30, 58, 138, 0.1) 2px 2px 3px 0 inset, rgba(255, 255, 255, 0.5) -3px -3px 4px 0 inset',
        'divider': 'rgba(30, 58, 138, 0.1) 0px 1px 0px 0px inset',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} satisfies Config;
