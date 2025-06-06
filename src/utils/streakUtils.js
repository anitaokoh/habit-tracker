/**
 * Streak utility functions for habit tracking
 */

// Calculate current streak for a habit based on its progress
export const calculateStreak = (progress, daysInMonth) => {
  let currentStreak = 0;

  // Count all check marks (true) and half marks ('half') in the month
  // Both X marks (false) and unmarked days (undefined) are ignored
  for (let i = 1; i <= daysInMonth.length; i++) {
    if (progress[i] === true) {
      currentStreak++;
    } else if (progress[i] === 'half') {
      currentStreak += 0.5;
    }
    // Skip both false (X) and undefined (blank) days
  }

  return currentStreak;
};

// Calculate the total number of check marks (true values and half values) for a habit's progress
export const calculateLongestStreak = (progress /* daysInMonth param not currently used */) => {
  // Count total number of check marks (true values) and half marks in the habit's progress
  // This is now a count of total completions, not consecutive days
  let totalChecks = 0;
  Object.values(progress).forEach((status) => {
    if (status === true) {
      totalChecks++;
    } else if (status === 'half') {
      totalChecks += 0.5;
    }
  });

  return totalChecks;
};

// Calculate success rate as percentage of completed days
export const calculateSuccessRate = (progress) => {
  // Count only days that have been tracked (have any status)
  const totalDays = Object.keys(progress).length;
  if (totalDays === 0) return 0;

  // Count true (completed) entries and half completed entries
  let completedDays = 0;
  Object.values(progress).forEach((status) => {
    if (status === true) {
      completedDays++;
    } else if (status === 'half') {
      completedDays += 0.5;
    }
  });

  // Calculate percentage rounded to nearest integer
  return Math.round((completedDays / totalDays) * 100);
};

// Get the appropriate status icon based on completion status
export const getStatusIcon = (status) => {
  if (status === true) return { type: 'check', className: 'text-green-500', size: 18 };
  if (status === 'half') return { type: 'check', className: 'text-yellow-500', size: 14 };
  if (status === false) return { type: 'x', className: 'text-red-500', size: 18 };
  return null;
};

// Toggle completion status for a day
export const toggleDayStatus = (progress, day) => {
  const currentProgress = progress[day];

  // Cycle through states: undefined -> true -> half -> false -> undefined
  let newState;
  if (currentProgress === undefined) newState = true;
  else if (currentProgress === true) newState = 'half';
  else if (currentProgress === 'half') newState = false;
  else newState = undefined;

  return {
    ...progress,
    [day]: newState,
  };
};
