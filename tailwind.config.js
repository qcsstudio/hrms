/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container:{
center:true
      },
      screens:{
       'xs':'400px',
       'xs-large':'500px'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        syne: ["Syne", "sans-serif"], 
        nats: ["NATS", "sans-serif"], 
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        plein: ["var(--font-plein)", "sans-serif"],

      },
      keyframes: {
        sparkleGradient: {
          '0%': { color: '#ec4899' },     
          '25%': { color: '#f59e0b' },     
          '50%': { color: '#3b82f6' },     
          '75%': { color: '#10b981' },     
          '100%': { color: '#ec4899' },    
        },
      },
      animation: {
        sparkleGradient: 'sparkleGradient 1s linear',
      },
      
    },
    plugins: [],
  }};