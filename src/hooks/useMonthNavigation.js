import { useState, useEffect } from 'react';
import { 
  getMonthDetails, 
  getPreviousMonth, 
  getNextMonth 
} from '../utils/dateUtils';

/**
 * Custom hook for month navigation
 */
const useMonthNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthDetails, setMonthDetails] = useState({
    monthName: '',
    year: 0,
    monthKey: ''
  });
  
  // Update days in month when current date changes
  useEffect(() => {
    const details = getMonthDetails(currentDate);
    setDaysInMonth(details.daysArray);
    setMonthDetails({
      monthName: details.monthName,
      year: details.year,
      monthKey: details.monthKey
    });
  }, [currentDate]);
  
  // Go to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(getPreviousMonth(currentDate));
  };
  
  // Go to next month
  const goToNextMonth = () => {
    setCurrentDate(getNextMonth(currentDate));
  };
  
  // Go to current month
  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };
  
  // Get previous month key for copying habits
  const getPreviousMonthKey = () => {
    const prevDate = getPreviousMonth(currentDate);
    const details = getMonthDetails(prevDate);
    return details.monthKey;
  };
  
  return {
    currentDate,
    daysInMonth,
    monthDetails,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
    getPreviousMonthKey
  };
};

export default useMonthNavigation;