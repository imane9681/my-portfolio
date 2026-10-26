/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FBB267',
        'accent': '#D5775D',
        'purple-dark': '#5F2C78',
        'purple-medium': '#733A91',
        'purple-light': '#9C76B2',
        'blue-dark': '#17447E',
        'blue-medium': '#404C99',
        'blue-light': '#7280B3',
        'orange-light': '#E4A488',
        'card-bg1': '#F5E8FA',
        'card-bg2': '#FFF4EF',
        'card-bg3': '#F5F5FF',
        'sidebar-logo': '#EE9C6C',
        'sidebar-active-text': '#EE9C6C',
        'sidebar-active-icon': '#EE9C6C',
        'sidebar-icon': '#FFFFFF',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
      },
      animation: {
        // Fade Animations
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-desc': 'fadeInDesc 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRightEllipse 0.8s ease-out forwards',
        'fade-in-up-img': 'fadeInUpImg 0.8s ease-out forwards',
        'fade-in-im': 'fadeInIm 1s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'slide-left': 'slideLeft 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        
        // Rotate Animations
        'spin-slow': 'spin 12s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        'spin-medium': 'spin 8s linear infinite',
        
        // Float & Bounce
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'float-slow-delay': 'float 5s ease-in-out infinite 2s',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'bounce-slow-delay': 'bounce 3s ease-in-out infinite 1.5s',
        
        // Scroll & Pulse
        'scroll': 'scroll 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Scale & Glow
        'scale-up': 'scaleUp 0.4s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
        
        // Text Animation
        'typing': 'typing 3s steps(40, end) forwards',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDesc: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRightEllipse: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUpImg: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInIm: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        scroll: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 178, 103, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(251, 178, 103, 0.6)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blinkCaret: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#FBB267' },
        },
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}