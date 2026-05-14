/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gb: {
          bg: "var(--bg)",
          bg2: "var(--bg2)",
          bg3: "var(--bg3)",
          green: "var(--green)",
          red: "var(--red)",
          gold: "var(--gold)",
          blue: "var(--blue)",
          text: "var(--text)",
          muted: "var(--muted)",
          border: "var(--border)",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        mono: ['"Share Tech Mono"', "monospace"],
        body: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
