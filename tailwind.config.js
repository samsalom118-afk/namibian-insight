/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: { extend: { colors: { ink: '#172521', sand: '#f6f3ed', rust: '#b64f32' } } },
  plugins: []
};
