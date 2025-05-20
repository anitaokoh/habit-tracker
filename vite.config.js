import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get current build timestamp
const buildTime = Date.now().toString();

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}'
    })
  ],
  define: {
    // Inject the build time as a global variable
    '__APP_BUILD_TIME__': JSON.stringify(buildTime)
  },
  base: '/habit-tracker/' // Add this line for GitHub Pages deployment
})