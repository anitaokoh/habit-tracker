// This is a simple service worker for the habit tracker app

// Cache name - update this when you want to force a cache refresh
// Include a timestamp to force update on each build
const CACHE_NAME = 'habit-tracker-cache-v1-' + new Date().toISOString();

// Files to cache
const urlsToCache = [
  './',
  './index.html',
  './assets/index.css',
  './assets/index.js'
];

// Log when the service worker is installed
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install event fired');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All resources cached');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetch event for ', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('[Service Worker] Found in cache:', event.request.url);
          return response;
        }
        console.log('[Service Worker] Not found in cache, fetching:', event.request.url);
        return fetch(event.request);
      })
  );
});

// Update caches when a new service worker takes over
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate event fired');
  
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Handle message events (such as checking for updates)
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skip waiting command received');
    self.skipWaiting();
  }
});

// Log any errors
self.addEventListener('error', (event) => {
  console.error('[Service Worker] Error:', event.message, event.filename, event.lineno);
});

console.log('[Service Worker] Service worker registered');