import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Get current build timestamp
const buildTime = Date.now().toString();

// Copy service worker to the build directory
const copyServiceWorker = () => ({
  name: 'copy-service-worker',
  closeBundle() {
    // Read the service worker content
    const serviceWorkerContent = fs.readFileSync('./public/service-worker.js', 'utf-8');
    // Make sure the dist directory exists
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }
    // Write to the dist directory
    fs.writeFileSync('./dist/service-worker.js', serviceWorkerContent);
    console.log('Service worker copied to dist/service-worker.js');
  }
});

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}'
    }),
    copyServiceWorker()
  ],
  define: {
    // Inject the build time as a global variable
    '__APP_BUILD_TIME__': JSON.stringify(buildTime)
  },
  base: '/habit-tracker/' // Add this line for GitHub Pages deployment
})