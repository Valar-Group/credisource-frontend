/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#0A1628',
          light: '#152542',
          dark: '#1a1535',
        },
        'pink': {
          DEFAULT: '#E91E8C',
          dark: '#d11a7d',
        },
        'purple': '#7B2D8E',
        'text-secondary': '#B8C5D6',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(to bottom right, #0A1628, #152542, #1a1535)',
      },
    },
  },
  plugins: [],
}
