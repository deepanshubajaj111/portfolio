/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#080b0f',
        surface: '#0d1117',
        surface2: '#111720',
        cyan: {
          DEFAULT: '#0ff4c6',
          dim: '#0dd4ae',
        },
        border: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        pulse_dot: 'pulse_dot 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse_dot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
