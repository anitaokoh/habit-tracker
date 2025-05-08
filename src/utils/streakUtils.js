/**
 * Streak utility functions for habit tracking
 */

// Calculate current streak for a habit based on its progress
export const calculateStreak = (progress, daysInMonth) => {
    let currentStreak = 0;
    
    // First find the most recent day with a status (completed or failed)
    let lastCompletedDay = 0;
    for (let i = daysInMonth.length; i >= 1; i--) {
      if (progress[i] === true || progress[i] === false) {
        lastCompletedDay = i;
        break;
      }
    }
    
    // If no day has been marked, return 0
    if (lastCompletedDay === 0) {
      return 0;
    }
    
    // Count consecutive completed days (true) going backwards from the last completed day
    for (let i = lastCompletedDay; i >= 1; i--) {
      if (progress[i] === true) {
        currentStreak++;
      } else {
        // Break on first non-completed day (false or undefined)
        break;
      }
    }
    
    return currentStreak;
  };
  
  // Get the appropriate status icon based on completion status
  export const getStatusIcon = (status) => {
    if (status === true) return { type: 'check', className: "text-green-500", size: 18 };
    if (status === false) return { type: 'x', className: "text-red-500", size: 18 };
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
      [day]: newState
    };
  };