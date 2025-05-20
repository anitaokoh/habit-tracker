// Root service worker redirector for GitHub Pages
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('service-worker.js')) {
    console.log('Forwarding service worker request to /habit-tracker/service-worker.js');
    event.respondWith(fetch('/habit-tracker/service-worker.js'));
  }
});
