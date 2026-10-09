/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1E9",
        creamSoft: "#FBF9F4",
        ink: "#241715",
        inkSoft: "#5C4A42",
        gold: "#EAA735",
        goldDeep: "#D0912A",
        terracotta: "#59362F",
        terracottaSoft: "#EADFD2",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
