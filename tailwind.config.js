/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0f1f',
          surface: '#0f1630',
          'surface-2': '#121d3d',
        },
        accent: {
          primary: '#76a7ff',
          secondary: '#65f3c9',
        },
      },
      backgroundColor: {
        glass: 'rgba(15, 22, 48, 0.4)',
      },
      backdropBlur: {
        glass: '12px',
      },
      borderRadius: {
        glass: '18px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(118, 167, 255, 0.3)' },
          '50%': { 'box-shadow': '0 0 40px rgba(118, 167, 255, 0.6)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
