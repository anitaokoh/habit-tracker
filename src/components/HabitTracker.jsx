import React from 'react';
import MonthNavigation from './MonthNavigation';
import HabitForm from './HabitForm';
import HabitTable from './HabitTable';
import useMonthNavigation from '../hooks/useMonthNavigation';
import useHabits from '../hooks/useHabits';

/**
 * Main HabitTracker component that orchestrates all other components
 */
const HabitTracker = () => {
  // Use custom hooks for month navigation and habit management
  const {
    currentDate,
    daysInMonth,
    monthDetails,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
    getPreviousMonthKey
  } = useMonthNavigation();
  
  const {
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
  } = useHabits(monthDetails.monthKey, getPreviousMonthKey());
  
  // Check if this is a new month with no habits
  const isNewMonth = habits.length === 0;
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Month Navigation */}
      <MonthNavigation 
        monthDetails={monthDetails}
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onCurrentMonth={goToCurrentMonth}
        showCopyButton={isNewMonth}
        onCopyFromPrevious={copyFromPreviousMonth}
      />
      
      {/* Habit Form */}
      <HabitForm
        newHabit={newHabit}
        setNewHabit={setNewHabit}
        newHabitDescription={newHabitDescription}
        setNewHabitDescription={setNewHabitDescription}
        editingIndex={editingIndex}
        onAdd={addHabit}
        onSave={saveEdit}
        onCancel={cancelEdit}
        onKeyPress={handleKeyPress}
      />
      
      {/* Habit Table */}
      <HabitTable
        habits={habits}
        daysInMonth={daysInMonth}
        currentDate={currentDate}
        onToggleDay={toggleDay}
        onEdit={startEditing}
        onDelete={removeHabit}
      />
    </div>
  );
};

export default HabitTracker;