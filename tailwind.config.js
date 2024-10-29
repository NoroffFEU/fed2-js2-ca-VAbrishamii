/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.{html,js,ts}","!./node_modules/**/*"
  ],
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
          dark:'#18191A'
        },
        text:{
          light:'#E3E4E8',
          dark:'#45494F'
        }
        

      }
    },
  },
  plugins: [],
}

