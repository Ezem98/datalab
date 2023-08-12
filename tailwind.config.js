/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      textColor: {
        primary: '#5ba176',
        primaryShadow: '#5ba176',
        primaryLight: '#5ba17650',
        primaryLightContrast: '#141414',
        secondary: '#e9aa45',
        secondaryLight: '#e9aa4550',
        tertiary: '#000000',
        quaternary: '#fafafa',
        quinary: '#141414',
        sectary: '#E66765',
        sectaryLight: '#E6676550',
        septenary: '#8A2BE2',
        septenaryLight: '#8A2BE250',
        eightieth: '#FF9966',
        eightiethLight: '#FF996650'
      },
      colors: {
        primary: '#5ba176',
        primaryShadow: '#5ba176',
        primaryLight: '#5ba17650',
        primaryLightContrast: '#141414',
        secondary: '#e9aa45',
        secondaryLight: '#e9aa4550',
        tertiary: '#000000',
        quaternary: '#fafafa',
        quinary: '#141414',
        sectary: '#E66765',
        sectaryLight: '#E6676550',
        septenary: '#8A2BE2',
        septenaryLight: '#8A2BE250',
        eightieth: '#FF9966',
        eightiethLight: '#FF996650'
      }
    }
  },
  plugins: []
}
