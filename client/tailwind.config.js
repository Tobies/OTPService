/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'title': '#033841',
        'placeholder': '#607684',
        'button': '#0DAC81',
        'input': '#E6ECF0',
        'email': '#8EA6AA'
      }
    }
  },
  plugins: [],
};
