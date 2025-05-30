import React from 'react';
import { Plus } from 'lucide-react';

/**
 * Habit form component for adding and editing habits
 */
const HabitForm = ({
  newHabit,
  setNewHabit,
  newHabitDescription,
  setNewHabitDescription,
  editingIndex,
  onAdd,
  onSave,
  onCancel,
  onKeyPress,
}) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1 text-sm sm:text-base">Habit Name</label>
        <input
          type="text"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base text-white"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              editingIndex !== null ? onSave() : onAdd();
            }
            if (onKeyPress) onKeyPress(e);
          }}
          placeholder="Enter habit name"
          autoFocus
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm sm:text-base">Description (optional)</label>
        <input
          type="text"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base text-white"
          value={newHabitDescription}
          onChange={(e) => setNewHabitDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              editingIndex !== null ? onSave() : onAdd();
            }
            if (onKeyPress) onKeyPress(e);
          }}
          placeholder="Enter description"
        />
      </div>

      <div className="flex gap-2 justify-end mt-6">
        <button
          className="bg-gray-600 hover:bg-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        {editingIndex !== null ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded"
            onClick={onSave}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded flex items-center"
            onClick={onAdd}
          >
            <Plus size={16} className="mr-1" /> Add Habit
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitForm;
