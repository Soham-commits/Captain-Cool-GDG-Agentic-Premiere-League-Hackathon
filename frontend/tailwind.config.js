/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: 'var(--blue)',
          green: 'var(--green)',
          yellow: 'var(--yellow)',
          red: 'var(--red)',
          black: 'var(--black)',
          white: 'var(--white)',
          purple: 'var(--purple-accent)'
        },
        background: 'var(--white)',
        card: '#ffffff',
        textMain: 'var(--text-primary)',
        textMuted: 'var(--text-muted)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
