const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
      screens: {
        'xs': { 'max': '639px' },
        'sm': { 'min': '640px', 'max': '767px' },
        'md': { 'min': '768px', 'max': '1023px' },
        'lg': { 'min': '1024px', 'max': '1279px' },
        'xl': { 'min': '1280px', 'max': '1535px' },
        '2xl': { 'min': '1536px' },
  
        // DOWN
        'sm-down': { 'max': '767px' },
        'md-down': { 'max': '1023px' },
        'lg-down': { 'max': '1279px' },
        'xl-down': { 'max': '1535px' },
  
        // UP
        'sm-up': { 'min': '640px' },
        'md-up': { 'min': '768px' },
        'lg-up': { 'min': '1024px' },
        'xl-up': { 'min': '1280px' },
        '2xl-up': { 'min': '1537px' },
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        green: colors.green,
        teal: colors.teal,
        blue: colors.blue,
  
        'sonnant-purple': {
          1: '#9B99FF',
          2: '#5551FF',
          3: '#211FCC',
          4: '#201F66'
        },
  
        'sonnant-grey': {
          light: '#e6e6ec',
          1: '#f8f8f8',
          2: '#f0f3f6',
          3: '#f0f0f0',
          4: '#b2b3bc',
          5: '#7f8090',
          6: '#54566c',
          7: '#30244a',
          8: '#050a38',
        },
  
        'sonnant-blue': {
          DEFAULT: '#2B2AA9',
          dark: '#050A38'
        },
  
        'sonnant-dark': '#30324A',
        'sonnant-darker': '#030303',
  
        'sonnant-green': '#19AFA7',
        'sonnant-red': '#E7483D',
        'sonnant-orange': '#FEB446',
  
        'human-selection': 'rgba(33, 31, 204, 0.25)',
        'disabled': '#ADB5BD',
        'disabled-lighter': '#CBCCD2',
  
        'confidence-low': 'rgba(231, 72, 61, 0.5)',
        'confidence-medium': 'rgba(254, 180, 70, 0.5)',
        'sonnant-keyword': 'rgba(85,81,255,.25)',
  
        'bd-confidence-low': '#e7483d',
        'bd-confidence-medium': '#feb446',
  
        'sonnant-trending': 'linear-gradient(180deg, #19AFA7 0%, #5551FF 100%)'
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '10': '1rem',
        '11': '1.1rem',
        '12': '1.2rem',
        '13': '1.3rem',
        '14': '1.4rem',
        '15': '1.5rem',
        '16': '1.6rem',
        '17': '1.7rem',
        '18': '1.8rem',
        '19': '1.9rem',
        '20': '2rem',
      }
    },
    plugins: [],
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      }
    }
}