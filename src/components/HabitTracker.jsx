import React, { useState, useRef, useEffect } from 'react';
import MonthNavigation from './MonthNavigation';
import HabitForm from './HabitForm';
import HabitTable from './HabitTable';
import NotificationBell from './NotificationBell';
import Modal from './Modal';
import StatsOverview from './StatsOverview';
import useMonthNavigation from '../hooks/useMonthNavigation';
import useHabits from '../hooks/useHabits';
import { Plus, MoreVertical, Copy, Coffee, MessageCircle, Info, Check, X } from 'lucide-react';
import { trackCopyFromPrevious } from '../services/analyticsService';

/**
 * More options menu component with dropdown
 */
const MoreOptionsMenu = ({
  isNewMonth,
  onCopyFromPrevious,
  onSupportProject,
  onSendFeedback,
  onShowInstructions,
}) => {
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

  const handleSupportProject = () => {
    onSupportProject();
    setIsOpen(false);
  };

  const handleSendFeedback = () => {
    onSendFeedback();
    setIsOpen(false);
  };

  const handleShowInstructions = () => {
    onShowInstructions();
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
            className="w-full text-left px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base text-white hover:bg-gray-700"
            onClick={handleShowInstructions}
          >
            <Info size={14} className="mr-2 flex-shrink-0" />
            <span className="whitespace-normal">Instructions</span>
          </button>
          <button
            className={`w-full text-left px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base ${isNewMonth ? 'text-white hover:bg-gray-700' : 'text-gray-500 cursor-not-allowed'}`}
            onClick={isNewMonth ? handleCopyFromPrevious : undefined}
            disabled={!isNewMonth}
          >
            <Copy size={14} className="mr-2 flex-shrink-0" />
            <span className="whitespace-normal">Copy from Previous Month</span>
          </button>
          <button
            className="w-full text-left px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base text-green-400 hover:bg-gray-700"
            onClick={handleSendFeedback}
          >
            <MessageCircle size={14} className="mr-2 flex-shrink-0" />
            <span className="whitespace-normal">Send Feedback</span>
          </button>
          <button
            className="w-full text-left px-3 sm:px-4 py-2 flex items-center text-sm sm:text-base text-blue-400 hover:bg-gray-700 border-t border-gray-700"
            onClick={handleSupportProject}
          >
            <Coffee size={14} className="mr-2 flex-shrink-0" />
            <span className="whitespace-normal">Support the Project</span>
          </button>
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
  const [isKofiModalOpen, setIsKofiModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);

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

  // Function to open Ko-fi support modal
  const handleOpenKofiModal = () => {
    setIsKofiModalOpen(true);
  };

  // Function to close Ko-fi modal
  const handleCloseKofiModal = () => {
    setIsKofiModalOpen(false);
  };

  // Function to open feedback modal
  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  // Function to close feedback modal
  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  // Function to open instructions modal
  const handleOpenInstructionsModal = () => {
    setIsInstructionsModalOpen(true);
  };

  // Function to close instructions modal
  const handleCloseInstructionsModal = () => {
    setIsInstructionsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header with Month Navigation and Notification Bell */}
      <div className="flex flex-row justify-between items-center mb-4 gap-3">
        <MonthNavigation
          monthDetails={monthDetails}
          onPrevMonth={goToPreviousMonth}
          onNextMonth={goToNextMonth}
        />
        <div className="flex items-center space-x-3">
          <NotificationBell />
          <MoreOptionsMenu
            isNewMonth={isNewMonth}
            onCopyFromPrevious={copyFromPreviousMonth}
            onSupportProject={handleOpenKofiModal}
            onSendFeedback={handleOpenFeedbackModal}
            onShowInstructions={handleOpenInstructionsModal}
          />
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

      {/* Instructions Modal */}
      <Modal
        isOpen={isInstructionsModalOpen}
        onClose={handleCloseInstructionsModal}
        title="How to Use Habit Tracker 📖"
      >
        <div className="space-y-4">
          <div className="text-gray-300">
            <h3 className="font-semibold text-white mb-2">Tracking Your Habits</h3>
            <p className="text-sm mb-4">
              Click on any day box to cycle through the completion states:
            </p>

            <div className="space-y-3 bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-gray-700 rounded flex-shrink-0"></div>
                <div>
                  <span className="font-medium">Empty</span>
                  <span className="text-gray-400 text-sm ml-2">Not tracked</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-green-500 rounded flex items-center justify-center flex-shrink-0">
                  <Check className="text-green-500" size={18} />
                </div>
                <div>
                  <span className="font-medium">Full Completion</span>
                  <span className="text-gray-400 text-sm ml-2">Green check = 1 point</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                  <Check className="text-yellow-500" size={14} />
                </div>
                <div>
                  <span className="font-medium">Half Completion</span>
                  <span className="text-gray-400 text-sm ml-2">Yellow check = 0.5 points</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-red-500 rounded flex items-center justify-center flex-shrink-0">
                  <X className="text-red-500" size={18} />
                </div>
                <div>
                  <span className="font-medium">Not Done</span>
                  <span className="text-gray-400 text-sm ml-2">Red X = 0 points</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-gray-300">
            <h3 className="font-semibold text-white mb-2">Point System</h3>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Streak Count:</strong> Total points for each habit
              </li>
              <li>
                • <strong>Success Rate:</strong> Percentage of completed days (half marks count as
                50%)
              </li>
              <li>
                • <strong>Recently Active:</strong> Habits with any completion in the last 5 days
              </li>
            </ul>
          </div>

          <div className="text-gray-300">
            <h3 className="font-semibold text-white mb-2">Tips</h3>
            <ul className="text-sm space-y-1">
              <li>• Use half marks for partial completions or modified versions</li>
              <li>• Perfect for tracking progress on difficult days</li>
              <li>• Build consistency without "all or nothing" pressure</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Ko-fi Support Modal */}
      <Modal
        isOpen={isKofiModalOpen}
        onClose={handleCloseKofiModal}
        title="Support Habit Tracker ☕"
      >
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Enjoying the habit tracker? Consider supporting to keep the app free for everyone! 🙏
          </p>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              id="kofiframe"
              src="https://ko-fi.com/nits_koh/?hidefeed=true&widget=true&embed=true&preview=true&minimal=true"
              style={{
                border: 'none',
                width: '100%',
                padding: '4px',
                background: '#f9f9f9',
              }}
              height="400"
              title="nits_koh"
            />
          </div>
        </div>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={handleCloseFeedbackModal}
        title="Send Feedback 💬"
      >
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Help us improve the habit tracker! Share your thoughts, suggestions, or report any
            issues.
          </p>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src="https://branch-snowboard-ca9.notion.site/ebd/205f98b64a72806e874bf73d8b0e1692"
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              title="Feedback Form"
            />
          </div>
        </div>
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
