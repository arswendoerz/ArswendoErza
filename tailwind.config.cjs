/** @type {import('tailwindcss').Config} */

// Every colour resolves through a CSS variable so light/dark is a single
// token swap on <html data-theme>, with no duplicated utility classes.
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        // page grounds
        canvas: {
          DEFAULT: token("--c-canvas"),
          deep: token("--c-canvas-deep"),
        },
        // raised panels
        surface: {
          DEFAULT: token("--c-surface"),
          2: token("--c-surface-2"),
        },
        // hairlines
        line: {
          DEFAULT: token("--c-line"),
          soft: token("--c-line-soft"),
          strong: token("--c-line-strong"),
        },
        // subtle fills
        overlay: {
          DEFAULT: token("--c-overlay"),
          strong: token("--c-overlay-strong"),
        },
        content: {
          DEFAULT: token("--c-text"),
          muted: token("--c-text-muted"),
          dim: token("--c-text-dim"),
        },
        accent: {
          DEFAULT: token("--c-accent"),
          soft: token("--c-accent-soft"),
          strong: token("--c-accent-strong"),
          cyan: token("--c-accent-cyan"),
        },
        // readable text on top of the accent gradient
        "on-accent": token("--c-on-accent"),
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(100deg, rgb(var(--c-grad-from)) 0%, rgb(var(--c-grad-to)) 100%)",
        "text-gradient":
          "linear-gradient(180deg, rgb(var(--c-heading)) 0%, rgb(var(--c-text) / 0.6) 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--c-accent) / 0.35), 0 18px 60px -20px rgb(var(--c-accent) / 0.45)",
        lift: "0 24px 70px -30px rgb(var(--c-shadow) / var(--shadow-alpha))",
        card: "0 10px 30px -18px rgb(var(--c-shadow) / calc(var(--shadow-alpha) * 0.7))",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        caret: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        caret: "caret 1s step-end infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
