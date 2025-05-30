import { useState, useEffect } from 'react';
import {
  getHabitsForMonth,
  saveHabitsForMonth,
  copyHabitsFromPreviousMonth,
} from '../services/storageService';
import {
  toggleDayStatus,
  calculateLongestStreak,
  calculateSuccessRate,
} from '../utils/streakUtils';

/**
 * Custom hook for habit management
 */
const useHabits = (monthKey, previousMonthKey) => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Load habits when month changes
  useEffect(() => {
    // Always reload habits when monthKey changes to ensure fresh data
    console.log(`Loading habits for month: ${monthKey}`);
    const monthHabits = getHabitsForMonth(monthKey);
    console.log(`Loaded ${monthHabits.length} habits for ${monthKey}`);

    // Calculate and update metrics for existing habits
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const updatedHabits = monthHabits.map((habit) => {
      // Always recalculate metrics to ensure consistency
      return {
        ...habit,
        longestStreak: calculateLongestStreak(habit.progress, daysInMonth), // Total check marks
        successRate: calculateSuccessRate(habit.progress),
      };
    });

    setHabits(updatedHabits);

    // If we updated any metrics, save them back to storage
    if (JSON.stringify(monthHabits) !== JSON.stringify(updatedHabits)) {
      saveHabitsForMonth(monthKey, updatedHabits);
    }

    // Clear any editing state when switching months
    setEditingIndex(null);
    setNewHabit('');
    setNewHabitDescription('');
  }, [monthKey]);

  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim() !== '') {
      const updatedHabits = [
        ...habits,
        {
          name: newHabit,
          description: newHabitDescription,
          progress: {},
          longestStreak: 0,
          successRate: 0,
        },
      ];
      setHabits(updatedHabits);
      saveHabitsForMonth(monthKey, updatedHabits);
      setNewHabit('');
      setNewHabitDescription('');
    }
  };

  // Remove a habit
  const removeHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
    saveHabitsForMonth(monthKey, updatedHabits);
  };

  // Start editing a habit
  const startEditing = (index) => {
    setEditingIndex(index);
    setNewHabit(habits[index].name);
    setNewHabitDescription(habits[index].description || '');
  };

  // Save edited habit
  const saveEdit = () => {
    if (editingIndex !== null && newHabit.trim() !== '') {
      const updatedHabits = [...habits];
      updatedHabits[editingIndex] = {
        ...updatedHabits[editingIndex],
        name: newHabit,
        description: newHabitDescription,
      };
      setHabits(updatedHabits);
      saveHabitsForMonth(monthKey, updatedHabits);
      setEditingIndex(null);
      setNewHabit('');
      setNewHabitDescription('');
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
    setNewHabit('');
    setNewHabitDescription('');
  };

  // Toggle habit completion status for a day
  const toggleDay = (habitIndex, day) => {
    const updatedHabits = [...habits];
    const updatedProgress = toggleDayStatus(updatedHabits[habitIndex].progress, day);

    // Get the days in month
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

    // Calculate the total number of check marks in the updated progress
    const totalChecks = calculateLongestStreak(updatedProgress, daysInMonth);

    updatedHabits[habitIndex] = {
      ...updatedHabits[habitIndex],
      progress: updatedProgress,
      longestStreak: totalChecks, // Store the total number of check marks
      successRate: calculateSuccessRate(updatedProgress),
    };

    setHabits(updatedHabits);
    saveHabitsForMonth(monthKey, updatedHabits);
  };

  // Copy habits from previous month
  const copyFromPreviousMonth = () => {
    // Only if we have no habits in the current month
    if (habits.length === 0) {
      // This explicitly calls the function that copies and saves habits
      const copiedHabits = copyHabitsFromPreviousMonth(monthKey, previousMonthKey);
      if (copiedHabits.length > 0) {
        setHabits(copiedHabits);
        return true;
      }
    }
    return false;
  };

  // Handle key press for adding habits
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingIndex !== null) {
        saveEdit();
      } else {
        addHabit();
      }
    }
  };

  return {
    habits,
    newHabit,
    setNewHabit,
    newHabitDescription,
    setNewHabitDescription,
    editingIndex,
    addHabit,
    removeHabit,
    startEditing,
    saveEdit,
    cancelEdit,
    toggleDay,
    copyFromPreviousMonth,
    handleKeyPress,
  };
};

export default useHabits;
