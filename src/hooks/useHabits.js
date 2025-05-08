import { useState, useEffect } from 'react';
import { 
  getHabitsForMonth, 
  saveHabitsForMonth, 
  copyHabitsFromPreviousMonth 
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
    const monthHabits = getHabitsForMonth(monthKey);
    setHabits(monthHabits);
  }, [monthKey]);
  
  // Save habits when they change
  useEffect(() => {
    if (habits.length > 0) {
      saveHabitsForMonth(monthKey, habits);
    }
  }, [habits, monthKey]);
  
  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([...habits, { 
        name: newHabit, 
        description: newHabitDescription,
        progress: {} 
      }]);
      setNewHabit('');
      setNewHabitDescription('');
    }
  };
  
  // Remove a habit
  const removeHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);
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
        description: newHabitDescription
      };
      setHabits(updatedHabits);
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
      progress: toggleDayStatus(updatedHabits[habitIndex].progress, day)
    };
    setHabits(updatedHabits);
  };
  
  // Copy habits from previous month
  const copyFromPreviousMonth = () => {
    const copiedHabits = copyHabitsFromPreviousMonth(monthKey, previousMonthKey);
    if (copiedHabits.length > 0) {
      setHabits(copiedHabits);
      return true;
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
    handleKeyPress
  };
};

export default useHabits;