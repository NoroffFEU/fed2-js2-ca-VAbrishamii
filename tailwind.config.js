/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    "./**/*.{html,js,jxs,ts}","!./node_modules/**/*"
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        primary: '#d90429',
        secondary: {
          light:'#ff5a5f',
          dark:'#ef233c'
        },
        background:{
          light:'#F0F2F5',
          dark:'#45494F',

        },
        text:{
          light:'#E3E4E8',
          dark:'#45494F'
        },
        blue:{
          light:'#B2DBF5',
          dark:'#64B5F6'
        },
  
        accent:'#FB9093'
        

      }
    },
  },
  plugins: [],
}

