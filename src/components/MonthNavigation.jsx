import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Month navigation component
 */
const MonthNavigation = ({ monthDetails, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <button
          className="p-1.5 sm:p-2 bg-gray-800 rounded hover:bg-gray-700"
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold">{`${monthDetails.monthName} ${monthDetails.year}`}</h1>

        <button
          className="p-1.5 sm:p-2 bg-gray-800 rounded hover:bg-gray-700"
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default MonthNavigation;
