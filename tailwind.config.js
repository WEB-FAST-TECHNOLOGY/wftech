/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F5F5F5',
        surface: '#FFFFFF',
        foreground: '#0A0A0A',
        muted: '#6B7280',
        border: '#E5E7EB',
        'border-strong': '#D1D5DB',
        brand: {
          black: '#0A0A0A',
          white: '#FFFFFF',
          gray: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
    },
  },
  plugins: [],
};