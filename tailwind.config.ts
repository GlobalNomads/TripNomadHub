import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        '3xl-bold': ['32px', { lineHeight: '42px', fontWeight: 'bold' }],
        '3xl-semibold': ['32px', { lineHeight: '42px', fontWeight: 'semibold' }],
        '2xl-bold': ['24px', { lineHeight: '32px', fontWeight: 'bold' }],
        '2xl-semibold': ['24px', { lineHeight: '32px', fontWeight: 'semibold' }],
        '2xl-medium': ['24px', { lineHeight: '32px', fontWeight: 'medium' }],
        '2xl-regular': ['24px', { lineHeight: '32px', fontWeight: 'regular' }],
        'xl-bold': ['20px', { lineHeight: '32px', fontWeight: 'bold' }],
        'xl-semibold': ['20px', { lineHeight: '32px', fontWeight: 'semibold' }],
        'xl-medium': ['20px', { lineHeight: '32px', fontWeight: 'medium' }],
        'xl-regular': ['20px', { lineHeight: '32px', fontWeight: 'regular' }],
        '2lg-bold': ['18px', { lineHeight: '26px', fontWeight: 'bold' }],
        '2lg-semibold': ['18px', { lineHeight: '26px', fontWeight: 'semibold' }],
        '2lg-medium': ['18px', { lineHeight: '26px', fontWeight: 'medium' }],
        '2lg-regular': ['18px', { lineHeight: '26px', fontWeight: 'regular' }],
        'lg-bold': ['16px', { lineHeight: '26px', fontWeight: 'bold' }],
        'lg-semibold': ['16px', { lineHeight: '26px', fontWeight: 'semibold' }],
        'lg-medium': ['16px', { lineHeight: '26px', fontWeight: 'medium' }],
        'lg-regular': ['16px', { lineHeight: '26px', fontWeight: 'regular' }],
        'md-bold': ['14px', { lineHeight: '24px', fontWeight: 'bold' }],
        'md-semibold': ['14px', { lineHeight: '24px', fontWeight: 'semibold' }],
        'md-medium': ['14px', { lineHeight: '24px', fontWeight: 'medium' }],
        'md-regular': ['14px', { lineHeight: '24px', fontWeight: 'regular' }],
        'sm-semibold': ['13px', { lineHeight: '22px', fontWeight: 'semibold' }],
        'sm-medium': ['13px', { lineHeight: '22px', fontWeight: 'medium' }],
        'xs-semibold': ['12px', { lineHeight: '18px', fontWeight: 'semibold' }],
        'xs-medium': ['12px', { lineHeight: '18px', fontWeight: 'medium' }],
        'xs-regular': ['12px', { lineHeight: '18px', fontWeight: 'regular' }],
      },
      colors: {
        'primary-gray': {
          100: '#FAFAFA',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#CBC9CF',
          500: '#ADAEB8',
          600: '#A4A1AA',
          700: '#79747E',
          800: '#4B4B4B',
        },
        'primary-green': {
          100: '#CED8D5',
          200: '#00AC07',
          300: '#0B3B2D',
        },
        'primary-blue': {
          100: '#E5F3FF',
          200: '#2EB4FF',
          300: '#0085FF',
        },
        'primary-red': {
          100: '#FFE4E0',
          200: '#FF472E',
        },
        'primary-yellow': {
          100: '#FFC23D',
        },
        'primary-orange': {
          100: '#FFF4E8',
          200: '#FF7C1D',
        },
        'primary-black': {
          100: '#112211',
          200: '#1B1B1B',
        },
      },
    },
  },
  plugins: [],
};
export default config;
