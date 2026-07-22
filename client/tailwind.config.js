/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "luxury-black": "#0A0A0A",
        "luxury-charcoal": "#1A1A1A",
        "luxury-gold": "#C9A96E",
        "luxury-cream": "#F8F5F0",
        "luxury-white": "#FFFFFF",
        "luxury-gray": "#8A8A8A",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
