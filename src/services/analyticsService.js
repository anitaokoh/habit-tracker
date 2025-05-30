import ReactGA from 'react-ga4';

// Get measurement ID from environment variables
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4 only if measurement ID is available
export const initializeGA = () => {
  if (!MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID is not set');
    return;
  }
  console.log('Initializing Google Analytics...');
  ReactGA.initialize(MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track user engagement (daily/monthly active users)
export const trackUserEngagement = () => {
  ReactGA.event({
    category: 'User',
    action: 'Session Start',
    nonInteraction: false,
  });
};

// Track "Copy from Previous Month" usage
export const trackCopyFromPrevious = () => {
  ReactGA.event({
    category: 'Feature',
    action: 'Copy from Previous Month',
    nonInteraction: false,
  });
};

// Track habit interactions
export const trackHabitInteraction = (action, habitName) => {
  ReactGA.event({
    category: 'Habit',
    action: action,
    label: habitName,
    nonInteraction: false,
  });
};

// Helper function to check if it's a new day/month for user
const getLastVisit = () => {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = new Date();
  const today = now.toDateString();
  const thisMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;

  return { lastVisit, today, thisMonth };
};

// Track Daily Active Users
export const trackDAU = () => {
  const { lastVisit, today } = getLastVisit();
  if (lastVisit !== today) {
    ReactGA.event({
      category: 'User',
      action: 'Daily Active User',
      nonInteraction: true,
    });
    localStorage.setItem('lastVisit', today);
  }
};

// Track Monthly Active Users
export const trackMAU = () => {
  const { /* lastVisit not needed here */ thisMonth } = getLastVisit();
  const lastMonth = localStorage.getItem('lastMonth');

  if (lastMonth !== thisMonth) {
    ReactGA.event({
      category: 'User',
      action: 'Monthly Active User',
      nonInteraction: true,
    });
    localStorage.setItem('lastMonth', thisMonth);
  }
};
