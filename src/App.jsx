import React, { useEffect } from 'react';
import HabitTracker from './components/HabitTracker';
import { initializeGA, trackPageView, trackDAU, trackMAU } from './services/analyticsService';

const App = () => {
  useEffect(() => {
    initializeGA();
    trackPageView('/');
    trackDAU();
    trackMAU();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <HabitTracker />
    </div>
  );
};

export default App;
