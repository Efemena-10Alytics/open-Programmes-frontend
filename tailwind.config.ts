/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // if using App Router
    './src/**/*.{js,ts,jsx,tsx,mdx}', // if using src directory
  ],
  theme: {
    extend: {
      colors: {
        dark: "#333333",
        primary: "#CA2421",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(0deg, #000000, #000000), linear-gradient(90deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      animation: {
        scroll: "scroll var(--scroll-time, 40s) linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, any>) => void;
    }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
