/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
          colors: {
              korean: {
                  red: '#CD2E3A',
                  blue: '#0047A0',
                  primary: '#1a56db',
                  secondary: '#6c757d',
              },
          },
          fontFamily: {
              korean: ['Noto Sans KR', 'sans-serif'],
              english: ['Inter', 'system-ui', 'sans-serif'],
          },
          animation: {
              'fade-in': 'fadeIn 0.5s ease-in-out',
              'slide-up': 'slideUp 0.3s ease-out',
          },
          keyframes: {
              fadeIn: {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
              },
              slideUp: {
                  '0%': { transform: 'translateY(10px)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' },
              },
          },
      },
  },
  plugins: [],
};
