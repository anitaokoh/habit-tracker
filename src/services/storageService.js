/**
 * Storage service for habits
 * Handles localStorage operations for habit tracking
 */

// Get habits for a specific month
export const getHabitsForMonth = (monthKey) => {
  try {
    // First check if this month exists in localStorage
    const savedHabits = localStorage.getItem(`habits-${monthKey}`);
    if (savedHabits) {
      return JSON.parse(savedHabits);
    }
  } catch (error) {
    console.error('Error loading habits:', error);
  }

  // Only return default habits for May 2025
  if (monthKey === '2025-5') {
    return [
      {
        name: 'Practice German',
        description: '(Class, Video, assignment, speaking)',
        progress: {},
      },
      { name: 'No Sugar in May', description: '(Bueno, Juice, Biscuit, Drinks)', progress: {} },
    ];
  }

  // For all other months, always return an empty array
  return [];
};

// Save habits for a specific month
export const saveHabitsForMonth = (monthKey, habits) => {
  try {
    localStorage.setItem(`habits-${monthKey}`, JSON.stringify(habits || []));
    return true;
  } catch (error) {
    console.error('Error saving habits:', error);
    return false;
  }
};

// Get habits from a previous month WITHOUT saving them
export const getHabitsFromPreviousMonth = (previousMonthKey) => {
  try {
    const savedHabits = localStorage.getItem(`habits-${previousMonthKey}`);
    if (savedHabits) {
      const prevHabits = JSON.parse(savedHabits);
      // Copy habits but reset progress
      return prevHabits.map((habit) => ({
        name: habit.name,
        description: habit.description || '',
        progress: {},
      }));
    }

    // If no saved habits but it's May 2025, return default habits
    if (previousMonthKey === '2025-5') {
      return [
        {
          name: 'Practice German',
          description: '(Class, Video, assignment, speaking)',
          progress: {},
        },
        { name: 'No Sugar in May', description: '(Bueno, Juice, Biscuit, Drinks)', progress: {} },
      ];
    }
  } catch (error) {
    console.error('Error getting habits from previous month:', error);
  }

  // Return a sample habit if nothing else worked
  return [{ name: 'Sample Habit', description: 'A starter habit', progress: {} }];
};

// Copy habits from previous month - only when explicitly called by the user
export const copyHabitsFromPreviousMonth = (currentMonthKey, previousMonthKey) => {
  // Log what we're trying to do
  console.log(`Copying from ${previousMonthKey} to ${currentMonthKey}`);

  // Get habits from previous month
  const habitsFromPrevMonth = getHabitsFromPreviousMonth(previousMonthKey);
  console.log('Habits from previous month:', habitsFromPrevMonth);

  // Always return something, even if it's just a sample habit
  const habitsToSave =
    habitsFromPrevMonth.length > 0
      ? habitsFromPrevMonth
      : [{ name: 'New Habit', description: 'Created for a new month', progress: {} }];

  // Save to current month
  try {
    localStorage.setItem(`habits-${currentMonthKey}`, JSON.stringify(habitsToSave));
    console.log('Successfully saved habits to current month');
    return habitsToSave;
  } catch (error) {
    console.error('Error saving copied habits:', error);
    return habitsToSave; // Still return the habits even if saving failed
  }
};
