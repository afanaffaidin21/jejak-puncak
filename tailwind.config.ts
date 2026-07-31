import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        divider: "var(--divider)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        heading: ["var(--font-geist-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        display: [
          "var(--text-display)",
          {
            lineHeight: "var(--text-display--line-height)",
            letterSpacing: "var(--text-display--letter-spacing)",
          },
        ],
        h1: [
          "var(--text-h1)",
          {
            lineHeight: "var(--text-h1--line-height)",
            letterSpacing: "var(--text-h1--letter-spacing)",
          },
        ],
        h2: [
          "var(--text-h2)",
          {
            lineHeight: "var(--text-h2--line-height)",
            letterSpacing: "var(--text-h2--letter-spacing)",
          },
        ],
        h3: [
          "var(--text-h3)",
          {
            lineHeight: "var(--text-h3--line-height)",
            letterSpacing: "var(--text-h3--letter-spacing)",
          },
        ],
        h4: ["var(--text-h4)", "var(--text-h4--line-height)"],
        "body-lg": ["var(--text-body-lg)", "var(--text-body-lg--line-height)"],
        body: ["var(--text-body)", "var(--text-body--line-height)"],
        "body-sm": ["var(--text-body-sm)", "var(--text-body-sm--line-height)"],
        caption: ["var(--text-caption)", "var(--text-caption--line-height)"],
        label: ["var(--text-label)", "var(--text-label--line-height)"],
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        "3xs": "var(--spacing-3xs)",
        "2xs": "var(--spacing-2xs)",
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)",
        touch: "var(--spacing-touch)",
        "mobile-nav": "var(--spacing-mobile-nav)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        flat: "var(--elevation-flat)",
        surface: "var(--elevation-surface)",
        hover: "var(--elevation-hover)",
        floating: "var(--elevation-floating)",
      },
      transitionDuration: {
        fast: "var(--motion-duration-fast)",
        normal: "var(--motion-duration-normal)",
        slow: "var(--motion-duration-slow)",
      },
      transitionTimingFunction: {
        standard: "var(--motion-ease-standard)",
        emphasized: "var(--motion-ease-emphasized)",
      },
      maxWidth: {
        content: "80rem",
        reading: "44rem",
      },
      minHeight: {
        touch: "var(--spacing-touch)",
      },
      zIndex: {
        sticky: "40",
        overlay: "50",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
