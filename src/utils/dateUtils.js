/**
 * Date utility functions for habit tracking
 */

// Get month details (name, days, etc.)
export const getMonthDetails = (date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const daysCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
    
    return {
      monthName: month,
      year: year,
      daysArray: daysArray,
      monthKey: `${date.getFullYear()}-${date.getMonth() + 1}`
    };
  };
  
  // Get day of week for a specific day in current month/year
  export const getDayOfWeek = (year, month, day) => {
    const date = new Date(year, month, day);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };
  
  // Create a new date for previous month
  export const getPreviousMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  };
  
  // Create a new date for next month
  export const getNextMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  };
  
  // Format date as YYYY-MM
  export const formatMonthKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  };