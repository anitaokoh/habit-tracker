/**
 * Storage service for habits
 * Handles localStorage operations for habit tracking
 */

// Get habits for a specific month
export const getHabitsForMonth = (monthKey) => {
    try {
      const savedHabits = localStorage.getItem(`habits-${monthKey}`);
      if (savedHabits) {
        return JSON.parse(savedHabits);
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    }
    
    // Default habits for May 2025 (as shown in the example)
    if (monthKey === '2025-5') {
      return [
        { name: 'Practice German', description: '(Class, Video, assignment, speaking)', progress: {} },
        { name: 'No Sugar in May', description: '(Bueno, Juice, Biscuit, Drinks)', progress: {} },

      ];
    }
    
    // Empty habits for other months
    return [];
  };
  
  // Save habits for a specific month
  export const saveHabitsForMonth = (monthKey, habits) => {
    try {
      if (habits.length > 0) {
        localStorage.setItem(`habits-${monthKey}`, JSON.stringify(habits));
        return true;
      }
    } catch (error) {
      console.error('Error saving habits:', error);
    }
    return false;
  };
  
  // Copy habits from previous month
  export const copyHabitsFromPreviousMonth = (currentMonthKey, previousMonthKey) => {
    try {
      const savedHabits = localStorage.getItem(`habits-${previousMonthKey}`);
      if (savedHabits) {
        const prevHabits = JSON.parse(savedHabits);
        // Copy habits but reset progress
        const newHabits = prevHabits.map(habit => ({
          name: habit.name,
          description: habit.description,
          progress: {}
        }));
        
        // Save to current month
        localStorage.setItem(`habits-${currentMonthKey}`, JSON.stringify(newHabits));
        return newHabits;
      }
    } catch (error) {
      console.error('Error copying habits from previous month:', error);
    }
    return [];
  };