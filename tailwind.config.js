/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './client/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('tailwindcss-cmdk'),
    require("tailwindcss-animate")
  ],
}
