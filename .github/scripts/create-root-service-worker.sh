#!/bin/bash

# Create a root-level service worker file that forwards to the correct location
echo "// Root service worker redirector for GitHub Pages" > dist/root-service-worker.js
echo "self.addEventListener('install', event => {" >> dist/root-service-worker.js
echo "  self.skipWaiting();" >> dist/root-service-worker.js
echo "});" >> dist/root-service-worker.js
echo "" >> dist/root-service-worker.js
echo "self.addEventListener('fetch', event => {" >> dist/root-service-worker.js
echo "  if (event.request.url.includes('service-worker.js')) {" >> dist/root-service-worker.js
echo "    console.log('Forwarding service worker request to /habit-tracker/service-worker.js');" >> dist/root-service-worker.js
echo "    event.respondWith(fetch('/habit-tracker/service-worker.js'));" >> dist/root-service-worker.js
echo "  }" >> dist/root-service-worker.js
echo "});" >> dist/root-service-worker.js

# Create a temporary directory for the root files
mkdir -p root_deploy
# Copy the root service worker file
cp dist/root-service-worker.js root_deploy/service-worker.js

echo "Root service worker created successfully!"