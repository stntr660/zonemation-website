/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#ddf2e0',
          200: '#bce5c4',
          300: '#8ed19d',
          400: '#a7d26d', // Main Zonemation green
          500: '#7cb747',
          600: '#609739',
          700: '#4e7830',
          800: '#41602a',
          900: '#385026',
        },
        surface: {
          DEFAULT: '#181a0e',   // Page bg
          raised: '#1e2112',    // Cards, elevated surfaces
          overlay: '#252819',   // Modals, dropdowns
          border: 'rgba(167, 210, 109, 0.08)', // Subtle borders
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.55)',
          tertiary: 'rgba(255, 255, 255, 0.30)',
          muted: 'rgba(255, 255, 255, 0.15)',
        },
        neutral: {
          beige: '#F1EEEA',
          sand: '#DCD5CE',
          bronze: '#AB947E',
        },
        gray: {
          50: '#F2F2F2',
          100: '#E8E8E8',
          200: '#D4D4D4',
          300: '#C0C0C0',
          400: '#B1B1B1',
          500: '#898888',
          600: '#6D6D6D',
          700: '#545454',
          800: '#3A3A3A',
          900: '#323232',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Henderson Sans', 'sans-serif'],
        serif: ['Henderson Sans'],
        headline: ['Poppins', 'Henderson Sans'],
        mono: ['JetBrains Mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
        arabic: ['"Noto Kufi Arabic"', 'Poppins', 'sans-serif'],
      },
      fontWeight: {
        'thin': 200,
        'light': 300,
        'regular': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      },
      fontSize: {
        'xs': ['0.625rem', { lineHeight: '0.875rem' }],    // 10px - metadata, fine print
        'sm': ['0.75rem', { lineHeight: '1.125rem' }],     // 12px - captions, labels
        'base': ['0.875rem', { lineHeight: '1.375rem' }],  // 14px - body text
        'lg': ['1rem', { lineHeight: '1.5rem' }],          // 16px - body large
        'xl': ['1.125rem', { lineHeight: '1.625rem' }],    // 18px - subheadings
        '2xl': ['1.375rem', { lineHeight: '1.75rem' }],    // 22px - H3
        '3xl': ['1.625rem', { lineHeight: '2rem' }],       // 26px - H2
        '4xl': ['2rem', { lineHeight: '2.375rem' }],       // 32px - H1
        '5xl': ['2.5rem', { lineHeight: '2.75rem' }],      // 40px - Display small
        '6xl': ['3rem', { lineHeight: '3.25rem' }],        // 48px - Display
        '7xl': ['3.75rem', { lineHeight: '3.75rem' }],     // 60px - Display large
      },
      letterSpacing: {
        'tighter': '-0.1em',
        'tight': '-0.075em',
        'normal': '-0.05em',
        'wide': '-0.035em',
        'wider': '-0.025em',
        'widest': '-0.015em',
        'display': '-0.08em',
        'heading': '-0.06em',
        'body': '-0.05em',
        'caption': '-0.04em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.5',
        'relaxed': '1.6',
        'loose': '1.75',
        'display': '1.1',
        'heading': '1.2',
        'body': '1.5',
      },
      spacing: {
        'micro': '0.25rem',    // 4px
        'small': '0.5rem',     // 8px
        'base': '1rem',        // 16px
        'medium': '1.5rem',    // 24px
        'large': '2rem',       // 32px
        'xlarge': '3rem',      // 48px
        'xxlarge': '4rem',     // 64px
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '15px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
