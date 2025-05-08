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
  streak,
  onToggleDay,
  onEdit,
  onDelete
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
    <tr className="border-b border-gray-800 hover:bg-gray-800/50">
      <td className="p-3">
        <div className="font-medium">{habit.name}</div>
        {habit.description && (
          <div className="text-sm text-gray-400">{habit.description}</div>
        )}
      </td>
      
      {daysInMonth.map((day) => (
        <td 
          key={`cell-${habitIndex}-${day}`} 
          className="p-1 text-center cursor-pointer"
          onClick={() => onToggleDay(habitIndex, day)}
        >
          <div className="w-8 h-8 mx-auto flex items-center justify-center border border-gray-700 rounded">
            {renderStatusIcon(habit.progress[day])}
          </div>
        </td>
      ))}
      
      <td className="p-3 text-center">
        <span className="font-medium">{streak}</span>
      </td>
      
      <td className="p-3 text-center">
        <div className="flex justify-center gap-2">
          <button 
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => onEdit(habitIndex)}
            aria-label="Edit habit"
          >
            <Edit size={18} className="text-blue-400" />
          </button>
          <button 
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => onDelete(habitIndex)}
            aria-label="Delete habit"
          >
            <Trash2 size={18} className="text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default HabitRow;