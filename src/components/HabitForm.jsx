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
  onKeyPress
}) => {
  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <div className="mb-4">
        <label className="block mb-1">Habit Name</label>
        <input
          type="text"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Enter habit name"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">Description (optional)</label>
        <input
          type="text"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          value={newHabitDescription}
          onChange={(e) => setNewHabitDescription(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Enter description"
        />
      </div>
      
      {editingIndex !== null ? (
        <div className="flex gap-2">
          <button 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center"
            onClick={onSave}
          >
            Save Changes
          </button>
          <button 
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex items-center"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center"
          onClick={onAdd}
        >
          <Plus size={18} className="mr-1" /> Add Habit
        </button>
      )}
    </div>
  );
};

export default HabitForm;