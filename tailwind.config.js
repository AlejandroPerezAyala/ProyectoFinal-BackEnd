/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,handlebars}","/node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated'),
    require('flowbite/plugin')
  ],
}

