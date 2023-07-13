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
        quinary: '#141414'
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
        quinary: '#141414'
      }
    }
  },
  plugins: []
}
