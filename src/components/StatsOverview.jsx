import React, { useState } from 'react';
import { Award, CheckCircle, Activity, HelpCircle } from 'lucide-react';

/**
 * Stats overview component showing key habit metrics
 */
const StatsOverview = ({ habits, currentDate }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Function to handle tooltip visibility
  const showTooltip = (id) => setActiveTooltip(id);
  const hideTooltip = () => setActiveTooltip(null);
  // Calculate success rate across all habits - aggregate score
  const calculateSuccessRate = () => {
    if (habits.length === 0) return 0;

    let totalCompleted = 0;
    let totalTracked = 0;

    habits.forEach((habit) => {
      const progressEntries = Object.entries(habit.progress);
      totalTracked += progressEntries.length;

      progressEntries.forEach(([, /* day number not used */ status]) => {
        // Only count true (completed) status, not false or undefined
        if (status === true) {
          totalCompleted++;
        }
      });
    });

    return totalTracked > 0 ? Math.round((totalCompleted / totalTracked) * 100) : 0;
  };

  // Find the habit with the most total check marks
  const findLongestStreak = () => {
    if (habits.length === 0) return 0;

    // Find the maximum number of check marks across all habits
    return Math.max(
      ...habits.map((habit) => {
        const { progress } = habit;

        // If the habit has a pre-calculated streak value, use it
        if (habit.longestStreak !== undefined) {
          return habit.longestStreak;
        }

        // Otherwise count the total number of check marks (true values)
        return Object.values(progress).filter((status) => status === true).length;
      }),
      0
    ); // The 0 ensures we return 0 if there are no habits with checks
  };

  // Count active habits (with at least one checked entry in the last 5 days)
  const countActiveHabits = () => {
    if (habits.length === 0) return 0;

    // Get the last 5 days, properly handling month boundaries
    const today = new Date(currentDate);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const lastFiveDays = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Only include days from the current month
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        lastFiveDays.push(date.getDate());
      }
    }

    // Count habits with at least one completed (true) entry in the last 5 days
    // Only count checked entries (true), not crosses (false) or blanks (undefined)
    const activeHabits = habits.filter((habit) => {
      if (!habit.progress) return false;

      // Check if there's at least one check mark in any of the included days
      return lastFiveDays.some((day) => habit.progress[day] === true);
    });

    return activeHabits.length;
  };

  const successRate = calculateSuccessRate();
  const longestStreak = findLongestStreak();
  const activeHabits = countActiveHabits();

  return (
    <div className="flex flex-row gap-2 md:gap-4 mb-6 overflow-x-auto pb-2">
      <div className="bg-gray-800 p-2 md:p-4 rounded-lg flex items-center relative min-w-[120px] flex-1">
        <div className="mr-2 md:mr-3 p-1.5 md:p-2 bg-blue-900/30 rounded-full">
          <CheckCircle className="text-blue-400" size={18} />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-400 flex items-center">
            Success Rate
            <button
              className="ml-1 focus:outline-none"
              onMouseEnter={() => showTooltip('success')}
              onMouseLeave={hideTooltip}
              aria-label="Success Rate Information"
            >
              <HelpCircle size={14} className="text-gray-400" />
            </button>
          </div>
          <div className="text-xl md:text-2xl font-bold">{successRate}%</div>
        </div>
        {activeTooltip === 'success' && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-700 rounded shadow-lg text-xs w-48 z-10">
            Percentage of completed days across all habits compared to total tracked days.
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-2 md:p-4 rounded-lg flex items-center relative min-w-[120px] flex-1">
        <div className="mr-2 md:mr-3 p-1.5 md:p-2 bg-yellow-900/30 rounded-full">
          <Award className="text-yellow-400" size={18} />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-400 flex items-center">
            Most Check Marks
            <button
              className="ml-1 focus:outline-none"
              onMouseEnter={() => showTooltip('streak')}
              onMouseLeave={hideTooltip}
              aria-label="Check Marks Information"
            >
              <HelpCircle size={14} className="text-gray-400" />
            </button>
          </div>
          <div className="text-xl md:text-2xl font-bold">{longestStreak}</div>
        </div>
        {activeTooltip === 'streak' && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-700 rounded shadow-lg text-xs w-48 z-10">
            The highest number of check marks achieved by any habit in this month.
          </div>
        )}
      </div>

      <div className="bg-gray-800 p-2 md:p-4 rounded-lg flex items-center relative min-w-[120px] flex-1">
        <div className="mr-2 md:mr-3 p-1.5 md:p-2 bg-green-900/30 rounded-full">
          <Activity className="text-green-400" size={18} />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-400 flex items-center">
            Recently Active
            <button
              className="ml-1 focus:outline-none"
              onMouseEnter={() => showTooltip('active')}
              onMouseLeave={hideTooltip}
              aria-label="Active Habits Information"
            >
              <HelpCircle size={14} className="text-gray-400" />
            </button>
          </div>
          <div className="text-xl md:text-2xl font-bold">
            {activeHabits}/{habits.length}
          </div>
        </div>
        {activeTooltip === 'active' && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-700 rounded shadow-lg text-xs w-48 z-10">
            Number of habits with at least one check mark in the last 5 days.
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsOverview;
