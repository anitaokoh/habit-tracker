import { useState, useEffect } from 'react';
import {
  getHabitsForMonth,
  saveHabitsForMonth,
  copyHabitsFromPreviousMonth,
} from '../services/storageService';
import { toggleDayStatus } from '../utils/streakUtils';

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
    setHabits(monthHabits);

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
    updatedHabits[habitIndex] = {
      ...updatedHabits[habitIndex],
      progress: toggleDayStatus(updatedHabits[habitIndex].progress, day),
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
