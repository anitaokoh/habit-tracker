import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { checkForUpdates, applyUpdates } from '../utils/serviceWorkerUtils';

/**
 * NotificationBell component that displays an indicator when updates are available
 */
const NotificationBell = () => {
  const [hasUpdates, setHasUpdates] = useState(false);

  // Function to check for updates using service worker
  const checkForUpdatesFn = async () => {
    try {
      console.log('Checking for updates...');

      // Secondary method: Check for app build changes using timestamp
      // The __APP_BUILD_TIME__ variable is injected at build time in vite.config.js
      const currentBuildTime = window.__APP_BUILD_TIME__ || '0';
      console.log('Current build time:', currentBuildTime);

      const storedBuildTime = localStorage.getItem('appBuildTime') || '0';
      console.log('Stored build time:', storedBuildTime);

      // First time visit - store the current build time
      if (!localStorage.getItem('appBuildTime')) {
        console.log('First visit, storing build time');
        localStorage.setItem('appBuildTime', currentBuildTime);
        return;
      }

      // If build times don't match, we have an update
      if (currentBuildTime !== storedBuildTime && currentBuildTime !== '0') {
        console.log('Build time mismatch, update available');
        setHasUpdates(true);
      }

      // Primary method: Check for service worker updates
      if ('serviceWorker' in navigator) {
        const hasNewVersion = await checkForUpdates();
        console.log('Service worker update check result:', hasNewVersion);

        if (hasNewVersion) {
          setHasUpdates(true);
        }
      } else {
        console.log('Service Worker not supported in this browser');
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  // Handle refresh click
  const handleRefresh = async () => {
    if (hasUpdates) {
      // Apply service worker updates
      const updated = await applyUpdates();

      // Update stored build time
      if (window.__APP_BUILD_TIME__) {
        localStorage.setItem('appBuildTime', window.__APP_BUILD_TIME__);
      }

      if (!updated) {
        // Fallback: reload the page if service worker update failed
        window.location.reload();
      }

      setHasUpdates(false);
    } else {
      // If no updates, just check for updates
      checkForUpdatesFn();
    }
  };

  // Check for updates on component mount
  useEffect(() => {
    checkForUpdatesFn();

    // Set up interval to periodically check for updates (every hour)
    const intervalId = setInterval(checkForUpdatesFn, 60 * 60 * 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="relative cursor-pointer"
      onClick={handleRefresh}
      title={hasUpdates ? 'Update available! Click to refresh' : 'Check for updates'}
    >
      <Bell size={24} className="text-gray-300 hover:text-white" />
      {hasUpdates && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-gray-800"></div>
      )}
    </div>
  );
};

export default NotificationBell;
