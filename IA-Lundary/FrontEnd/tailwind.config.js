// @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "tw-",
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    screens: {
      'sm': '576px',

      'md': '768px',

      'lg': '992px',

      'xl': '1200px',

      '2xl': '1200px',
    },
    extend: {colors: {
      "primary-color": "#ffbc3b",
      "secondary-color": "#1e1e4b",
      "secondary-font-2": "#494a43",
      "secondary-color-2": "#182b45"
    },
    fontFamily: {
      "poopins": ["Poppins", "sans-serif"] 
    }},
  },
  plugins: [],
}

