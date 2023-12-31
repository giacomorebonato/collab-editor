/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './{client,features,pages,renderer}/**/*.{ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
