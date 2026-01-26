import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["lottie-react"],
  },
  theme: {
    extend: {
      animation: {
        cardLines: 'cardLines 20s linear infinite',
        shine: 'shine 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        gradientPan: 'gradientPan 8s linear infinite',
        float: 'float 6s ease-in-out infinite' // Existing float animation
      },
      keyframes: {
        cardLines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 100%' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        gradientPan: {
          '0%': { transform: 'translateX(-50%) translateY(-50%)' },
          '100%': { transform: 'translateX(50%) translateY(50%)' }
        },
        float: { // Existing float keyframes
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      textShadow: {
        default: '0 2px 4px rgba(0, 0, 0, 0.1)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }
    }
  }
})