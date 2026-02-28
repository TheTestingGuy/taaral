/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#EAE0D5", // Crème (Home)
        "primary-about": "#AE5E4C", // Terracotta (About)
        "primary-projects": "#E8CBB8", // Beige clair (Projects)
        "background-light": "#4F1D1F", 
        "background-dark": "#2A0F10", 
        "bg-about-light": "#F9F5F1",
        "bg-about-dark": "#4E2629",
        "bg-proj-light": "#F5F0EB",
        accent: "#AE5E4C",
        secondary: "#C07A65",
        "secondary-dark": "#6B2628",
        "secondary-light": "#E0D6CC",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        serif: ["'DM Serif Display'", "serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}