import { motion } from 'framer-motion';
import { CheckIcon, XIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/outline';
import { formatDisplayDate } from '../../utils/dateUtils';

const priorityColors = {
  P1: 'bg-red-500/20 text-red-400 border-red-500/30',
  P2: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  P3: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  P4: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const priorityIcons = {
  P1: '🔴',
  P2: '🟠',
  P3: '🔵',
  P4: '⚪',
};

export default function AIPreview({ task, onConfirm, onCancel, onUpdate }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdate({
      ...task,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <h3 className="text-lg font-medium text-white mb-3">Preview Task</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-indigo-200 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Task title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">
              <UserCircleIcon className="inline w-4 h-4 mr-1" />
              Assignee
            </label>
            <input
              type="text"
              name="assignee"
              value={task.assignee}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Who should do this?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">
              <ClockIcon className="inline w-4 h-4 mr-1" />
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={task.dueDate ? task.dueDate.slice(0, 16) : ''}
              onChange={(e) => onUpdate({ ...task, dueDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-200 mb-1">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              priorityColors[task.priority] || 'border-white/10'
            }`}
          >
            <option value="P1" className="bg-gray-900 text-red-400">🔴 P1 - Critical</option>
            <option value="P2" className="bg-gray-900 text-amber-400">🟠 P2 - High</option>
            <option value="P3" className="bg-gray-900 text-blue-400">🔵 P3 - Medium</option>
            <option value="P4" className="bg-gray-900 text-gray-400">⚪ P4 - Low</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          <XIcon className="w-5 h-5 mr-1" />
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onConfirm(task)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-indigo-500/30"
        >
          <CheckIcon className="w-5 h-5 mr-1" />
          Add Task
        </button>
      </div>
    </motion.div>
  );
}
