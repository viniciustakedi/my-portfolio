import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-black': '#0A0E1A',
        'black': '#0D1321',
        'dark-blue': '#1D2D44',
        'blue': '#3E5C76',
        'soft-blue': '#748CAB',
        'cream': '#F0EBD8',
        'silver': '#E6E6E6',
        'white': '#FFFFFF',
        'red': '#FF0000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        pulseAnimation: 'pulseAnimation 2s infinite',
      },
      keyframes: {
        pulseAnimation: {
          '0%': { transform: 'scale(0.8)', boxShadow: '0 0 0 0 #F0EBD8' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 15px #F0EBD800' },
          '100%': { transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}
