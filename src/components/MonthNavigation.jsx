import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Month navigation component
 */
const MonthNavigation = ({ 
  monthDetails, 
  onPrevMonth, 
  onNextMonth, 
  onCurrentMonth, 
  showCopyButton = false,
  onCopyFromPrevious
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 bg-gray-800 rounded hover:bg-gray-700"
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h1 className="text-2xl font-bold">
          {`${monthDetails.monthName} ${monthDetails.year}`}
        </h1>
        
        <button 
          className="p-2 bg-gray-800 rounded hover:bg-gray-700"
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="px-3 py-2 bg-gray-800 rounded hover:bg-gray-700 text-sm"
          onClick={onCurrentMonth}
        >
          Today
        </button>
        
        {showCopyButton && (
          <button 
            className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-600 text-sm"
            onClick={onCopyFromPrevious}
          >
            Copy from Previous Month
          </button>
        )}
      </div>
    </div>
  );
};

export default MonthNavigation;