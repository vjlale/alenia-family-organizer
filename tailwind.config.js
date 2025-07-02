module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#1f2937',
          800: '#374151',
          700: '#4b5563',
          600: '#6b7280',
          500: '#9ca3af',
          400: '#d1d5db',
          300: '#e5e7eb',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          400: '#a78bfa',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
};
