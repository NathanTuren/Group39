/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.jsx",
    "./src/components/login/*.jsx",
    "./src/components/ui/*.jsx",
    "./src/index.jsx",
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}'
  ], 
  theme: {
    extend: {},
  },
  plugins: [],
};


