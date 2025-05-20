/**
 * Streak utility functions for habit tracking
 */

// Calculate current streak for a habit based on its progress
export const calculateStreak = (progress, daysInMonth) => {
  let currentStreak = 0;

  // Simply count all check marks (true) in the month
  // Both X marks (false) and unmarked days (undefined) are ignored
  for (let i = 1; i <= daysInMonth.length; i++) {
    if (progress[i] === true) {
      currentStreak++;
    }
    // Skip both false (X) and undefined (blank) days
  }

  return currentStreak;
};

// Get the appropriate status icon based on completion status
export const getStatusIcon = (status) => {
  if (status === true) return { type: 'check', className: 'text-green-500', size: 18 };
  if (status === false) return { type: 'x', className: 'text-red-500', size: 18 };
  return null;
};

// Toggle completion status for a day
export const toggleDayStatus = (progress, day) => {
  const currentProgress = progress[day];

  // Cycle through states: undefined -> true -> false -> undefined
  let newState;
  if (currentProgress === undefined) newState = true;
  else if (currentProgress === true) newState = false;
  else newState = undefined;

  return {
    ...progress,
    [day]: newState,
  };
};
