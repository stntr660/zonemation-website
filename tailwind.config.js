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
        // Reduced Typography Scale (30% smaller)
        'xs': ['0.525rem', { lineHeight: '0.7rem' }],      // ~8.4px - metadata
        'sm': ['0.6125rem', { lineHeight: '0.875rem' }],   // ~9.8px - small text
        'base': ['0.7rem', { lineHeight: '1.05rem' }],     // ~11.2px - body text (min)
        'lg': ['0.7875rem', { lineHeight: '1.225rem' }],   // ~12.6px - body text (max)
        'xl': ['1.05rem', { lineHeight: '1.4rem' }],       // ~16.8px - H3 (min)
        '2xl': ['1.225rem', { lineHeight: '1.575rem' }],   // ~19.6px - H3 (max)
        '3xl': ['1.4rem', { lineHeight: '1.75rem' }],      // ~22.4px - H2 (min)
        '4xl': ['1.575rem', { lineHeight: '1.925rem' }],   // ~25.2px - H2 (max)
        '5xl': ['1.75rem', { lineHeight: '2.1rem' }],      // ~28px - H1 (min)
        '6xl': ['2.1rem', { lineHeight: '2.45rem' }],      // ~33.6px - H1 (max)/Display (min)
        '7xl': ['2.8rem', { lineHeight: '2.8rem' }],       // ~44.8px - Display (max)
      },
      letterSpacing: {
        'tighter': '-0.1em',        // Ultra tight
        'tight': '-0.075em',        // Very tight  
        'normal': '-0.05em',        // Tight default
        'wide': '-0.035em',         // Less tight
        'wider': '-0.025em',        // Slightly tight
        'widest': '-0.015em',       // Minimal tight
        'display': '-0.08em',       // Very tight display
        'heading': '-0.06em',       // Very tight headings
        'body': '-0.05em',          // Very tight body
        'caption': '-0.04em',       // Tight captions
      },
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.2', 
        'normal': '1.5',
        'relaxed': '1.6',
        'loose': '1.75',
        'display': '1.1',           // BCG display text
        'heading': '1.2',           // BCG headings
        'body': '1.5',              // BCG body text
      },
      spacing: {
        // BCG 8-point spacing system
        'micro': '0.25rem',    // 4px
        'small': '0.5rem',     // 8px  
        'base': '1rem',        // 16px
        'medium': '1.5rem',    // 24px
        'large': '2rem',       // 32px
        'xlarge': '3rem',      // 48px
        'xxlarge': '4rem',     // 64px
        // Standard spacing
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