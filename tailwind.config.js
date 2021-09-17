module.exports = {
  mode: 'jit',
  purge: [
    '*.html',
    'js/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'green-light': '#42b5a4',
        'green-dark': '#18a08b',
      }),
      //Custom font
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
       },
      
     },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
