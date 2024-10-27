/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          // taken from FIGMA
          400: '#ec4899',
          500: '#db2777',
        },
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1280px',
      },
    },
  },
  plugins: [],
};
