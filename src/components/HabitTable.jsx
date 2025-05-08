import React from 'react';
import HabitRow from './HabitRow';
import { calculateStreak } from '../utils/streakUtils';
import { getDayOfWeek } from '../utils/dateUtils';

/**
 * HabitTable component for displaying the habit tracking grid
 */
const HabitTable = ({
  habits,
  daysInMonth,
  currentDate,
  onToggleDay,
  onEdit,
  onDelete
}) => {
  // Empty state when no habits
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No habits added yet. Add your first habit above or copy habits from the previous month.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left w-64">Goal</th>
            
            {daysInMonth.map((day) => (
              <th key={`header-${day}`} className="p-3 text-center w-10">
                <div>{day}</div>
                <div className="text-xs text-gray-400">
                  {getDayOfWeek(currentDate.getFullYear(), currentDate.getMonth(), day)}
                </div>
              </th>
            ))}
            
            <th className="p-3 text-center">Streak</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <HabitRow
              key={`habit-${habitIndex}`}
              habit={habit}
              habitIndex={habitIndex}
              daysInMonth={daysInMonth}
              streak={calculateStreak(habit.progress, daysInMonth)}
              onToggleDay={onToggleDay}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTable;