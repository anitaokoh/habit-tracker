import React from 'react';
import HabitRow from './HabitRow';
import { calculateStreak } from '../utils/streakUtils';
import { getDayOfWeek, isFutureDay } from '../utils/dateUtils';

/**
 * HabitTable component for displaying the habit tracking grid
 */
const HabitTable = ({ habits, daysInMonth, currentDate, onToggleDay, onEdit, onDelete }) => {
  // Empty state when no habits
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No habits added yet. Add your first habit above or copy habits from the previous month.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative pb-2 -mx-4 px-0 scrollbar-thin">
      <div className="min-w-[800px]">
        {' '}
        {/* Force minimum width for proper scrolling on mobile */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pl-4 pr-2 py-2 md:p-3 text-left w-40 md:w-64 sticky left-0 z-10 bg-gray-900 shadow-[4px_0_5px_-2px_rgba(0,0,0,0.3)]">
                Goal
              </th>

              {daysInMonth.map((day) => {
                const isFuture = isFutureDay(currentDate, day);
                return (
                  <th
                    key={`header-${day}`}
                    className={`p-1 md:p-3 text-center w-8 md:w-10 ${isFuture ? 'text-gray-500' : ''}`}
                  >
                    <div>{day}</div>
                    <div className="hidden xs:block text-xs text-gray-400">
                      {getDayOfWeek(currentDate.getFullYear(), currentDate.getMonth(), day)}
                    </div>
                  </th>
                );
              })}

              <th className="p-2 md:p-3 text-center">Streak</th>
              <th className="p-2 md:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, habitIndex) => (
              <HabitRow
                key={`habit-${habitIndex}`}
                habit={habit}
                habitIndex={habitIndex}
                daysInMonth={daysInMonth}
                currentDate={currentDate}
                streak={calculateStreak(habit.progress, daysInMonth)}
                onToggleDay={onToggleDay}
                onEdit={onEdit}
                onDelete={onDelete}
                isFutureDay={(day) => isFutureDay(currentDate, day)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTable;
