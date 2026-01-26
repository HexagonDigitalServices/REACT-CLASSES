import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  darkMode: 'class', // enable class-based dark modedarkMode: 'class', // enable class-based dark mode
  plugins: [react(), tailwindcss(),]
})
