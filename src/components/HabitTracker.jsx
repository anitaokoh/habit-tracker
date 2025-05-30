import React, { useState, useRef, useEffect } from 'react';
import MonthNavigation from './MonthNavigation';
import HabitForm from './HabitForm';
import HabitTable from './HabitTable';
import NotificationBell from './NotificationBell';
import Modal from './Modal';
import StatsOverview from './StatsOverview';
import useMonthNavigation from '../hooks/useMonthNavigation';
import useHabits from '../hooks/useHabits';
import { Plus, MoreVertical, Copy } from 'lucide-react';
import { trackCopyFromPrevious } from '../services/analyticsService';

/**
 * More options menu component with dropdown
 */
const MoreOptionsMenu = ({ isNewMonth, onCopyFromPrevious }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCopyFromPrevious = () => {
    onCopyFromPrevious();
    trackCopyFromPrevious();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-1.5 sm:p-2 bg-gray-800 rounded hover:bg-gray-700"
        onClick={toggleMenu}
        aria-label="More options"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 sm:w-64 py-2 bg-gray-800 rounded-md shadow-lg z-20">
          <button
            className={`w-full text-left px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base ${isNewMonth ? 'text-white hover:bg-gray-700' : 'text-gray-500 cursor-not-allowed'}`}
            onClick={isNewMonth ? handleCopyFromPrevious : undefined}
            disabled={!isNewMonth}
          >
            <Copy size={14} className="mr-2 flex-shrink-0" />
            <span className="whitespace-normal">Copy from Previous Month</span>
          </button>
          {/* Add more menu options here as needed */}
        </div>
      )}
    </div>
  );
};

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
    // goToCurrentMonth is imported but used in the JSX directly through MonthNavigation component
    getPreviousMonthKey,
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
    startEditing: originalStartEditing,
    saveEdit,
    cancelEdit,
    toggleDay,
    copyFromPreviousMonth,
    handleKeyPress,
  } = useHabits(monthDetails.monthKey, getPreviousMonthKey());

  // Wrap the original startEditing function to also open the modal
  const startEditing = (index) => {
    originalStartEditing(index);
    setIsModalOpen(true);
  };

  // Check if this is a new month with no habits
  const isNewMonth = habits.length === 0;

  // State for controlling the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to close modal and reset the form when closed
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (editingIndex !== null) {
      cancelEdit();
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      {/* Header with Month Navigation and Notification Bell */}
      <div className="flex flex-row justify-between items-center mb-4 gap-3">
        <MonthNavigation
          monthDetails={monthDetails}
          onPrevMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
        />
        <div className="flex items-center space-x-3">
          <NotificationBell />
          <MoreOptionsMenu isNewMonth={isNewMonth} onCopyFromPrevious={copyFromPreviousMonth} />
        </div>
      </div>

      {/* Stats Overview */}
      {habits.length > 0 && <StatsOverview habits={habits} currentDate={currentDate} />}

      {/* Add Habit Button */}
      <div className="mb-4 sm:mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-2 rounded flex items-center text-sm sm:text-base"
          onClick={handleOpenModal}
        >
          <Plus size={16} className="mr-1" /> Add New Habit
        </button>
      </div>

      {/* Modal with Habit Form */}
      <Modal
        isOpen={isModalOpen || editingIndex !== null}
        onClose={handleCloseModal}
        title={editingIndex !== null ? 'Edit Habit' : 'Add New Habit'}
      >
        <HabitForm
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          newHabitDescription={newHabitDescription}
          setNewHabitDescription={setNewHabitDescription}
          editingIndex={editingIndex}
          onAdd={() => {
            addHabit();
            setIsModalOpen(false);
          }}
          onSave={() => {
            saveEdit();
            setIsModalOpen(false);
          }}
          onCancel={handleCloseModal}
          onKeyPress={handleKeyPress}
        />
      </Modal>

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
