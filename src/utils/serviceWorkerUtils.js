/**
 * Service worker utility functions
 */

// Register the service worker
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Check if there's a new service worker available
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        // This will check for updates
        await registration.update();
        return !!registration.waiting;
      }
    } catch (error) {
      console.error('Error checking for Service Worker updates:', error);
    }
  }
  return false;
};

// Apply updates (triggers the skipWaiting in the service worker)
export const applyUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });

      return new Promise((resolve) => {
        // Reload once the new Service Worker has taken over
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New service worker activated');
          window.location.reload();
          resolve(true);
        });
      });
    }
  }
  return false;
};
