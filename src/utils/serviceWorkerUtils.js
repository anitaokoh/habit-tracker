/**
 * Service worker utility functions
 */

// Register the service worker
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Get the base URL from Vite's import.meta.env or fall back to '/' for local development
      const baseUrl = import.meta.env.BASE_URL || '/';

      // Ensure baseUrl ends with a slash
      const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

      // Construct the correct path for the service worker
      const swPath = `${normalizedBaseUrl}service-worker.js`;

      console.log('Registering service worker at path:', swPath);

      const registration = await navigator.serviceWorker.register(swPath);
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
      console.log('Checking for service worker updates...');
      const registration = await navigator.serviceWorker.getRegistration();

      if (!registration) {
        console.log('No service worker registration found');
        return false;
      }

      console.log(
        'Current service worker state:',
        registration.installing
          ? 'installing'
          : registration.waiting
            ? 'waiting'
            : registration.active
              ? 'active'
              : 'unknown'
      );

      // This will check for updates
      await registration.update();
      console.log(
        'After update check, service worker state:',
        registration.installing
          ? 'installing'
          : registration.waiting
            ? 'waiting'
            : registration.active
              ? 'active'
              : 'unknown'
      );

      return !!registration.waiting;
    } catch (error) {
      console.error('Error checking for Service Worker updates:', error);
    }
  } else {
    console.log('Service Worker API not available');
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
