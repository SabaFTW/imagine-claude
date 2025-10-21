// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-medium': 'spin 15s linear infinite',
        'spin-fast': 'spin 10s linear infinite',
      }
    },
  },
  plugins: [],
}
