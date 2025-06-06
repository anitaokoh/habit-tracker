import React from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { getStatusIcon } from '../utils/streakUtils';

/**
 * HabitRow component for a single habit row
 */
const HabitRow = ({
  habit,
  habitIndex,
  daysInMonth,
  // currentDate is passed but not directly used in this component
  // keeping in props for documentation purposes
  streak,
  onToggleDay,
  onEdit,
  onDelete,
  isFutureDay,
}) => {
  // Function to render the appropriate status icon
  const renderStatusIcon = (status) => {
    const iconConfig = getStatusIcon(status);
    if (!iconConfig) return null;

    if (iconConfig.type === 'check') {
      return <Check className={iconConfig.className} size={iconConfig.size} />;
    } else if (iconConfig.type === 'x') {
      return <X className={iconConfig.className} size={iconConfig.size} />;
    }
    return null;
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800 group">
      <td className="pl-4 pr-2 py-2 md:p-3 sticky left-0 z-10 bg-gray-900 group-hover:bg-gray-800 shadow-[4px_0_5px_-2px_rgba(0,0,0,0.3)]">
        <div
          className="font-medium text-sm md:text-base break-words min-w-[150px] max-w-[200px] md:min-w-[180px] md:max-w-[250px] whitespace-normal"
          title={habit.name}
        >
          {habit.name}
        </div>
        {habit.description && (
          <div
            className="text-xs md:text-sm text-gray-400 break-words whitespace-normal"
            title={habit.description}
          >
            {habit.description}
          </div>
        )}
      </td>

      {daysInMonth.map((day) => {
        const futureDay = isFutureDay(day);
        const status = habit.progress[day];

        // Determine border color based on status
        let borderClass = 'border-gray-700';
        if (futureDay) {
          borderClass = 'border-gray-800 bg-gray-800/30';
        } else if (status === true) {
          borderClass = 'border-green-500';
        } else if (status === 'half') {
          borderClass = 'border-yellow-500';
        } else if (status === false) {
          borderClass = 'border-red-500';
        }

        return (
          <td
            key={`cell-${habitIndex}-${day}`}
            className={`p-1 text-center ${futureDay ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !futureDay && onToggleDay(habitIndex, day)}
          >
            <div
              className={`w-6 h-6 md:w-8 md:h-8 mx-auto flex items-center justify-center border ${borderClass} rounded`}
            >
              {renderStatusIcon(habit.progress[day])}
            </div>
          </td>
        );
      })}

      <td className="p-2 md:p-3 text-center">
        <span className="font-medium text-sm md:text-base">{streak}</span>
      </td>

      <td className="p-2 md:p-3 text-center">
        <div className="flex justify-center gap-1 md:gap-2">
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => onEdit(habitIndex)}
            aria-label="Edit habit"
          >
            <Edit size={16} className="text-blue-400" />
          </button>
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => onDelete(habitIndex)}
            aria-label="Delete habit"
          >
            <Trash2 size={16} className="text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default HabitRow;
