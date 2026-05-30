/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--bg)',
        'surface-elevated': 'var(--bg-elevated)',
        border: 'var(--border)',
        foreground: 'var(--text)',
        muted: 'var(--text-muted)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
