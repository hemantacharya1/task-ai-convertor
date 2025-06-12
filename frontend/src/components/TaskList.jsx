import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  ClockIcon, 
  UserCircleIcon
} from '@heroicons/react/outline';

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

export default function TaskList({ tasks = [], onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setFormData({ 
      title: task.title,
      assignee: task.assignee || '',
      dueDate: task.dueDate || '',
      priority: task.priority || 'P3',
      completed: task.completed || false
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (!formData.title?.trim()) return;
    
    onUpdate(editingId, formData);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleComplete = (id, currentStatus) => {
    onToggle(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Sort tasks: incomplete first, then by priority, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status (uncompleted first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by priority (P1 > P2 > P3 > P4)
    const priorityOrder = { P1: 1, P2: 2, P3: 3, P4: 4 };
    return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
  });

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {sortedTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={`p-4 rounded-xl border ${
              task.completed ? 'bg-white/5 border-green-500/20' : 'bg-white/5 border-white/10'
            }`}
          >
            {editingId === task.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Enter task title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Assignee
                    </label>
                    <input
                      type="text"
                      name="assignee"
                      value={formData.assignee || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="Who's responsible?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Due Date
                    </label>
                    <input
                      type="datetime-local"
                      name="dueDate"
                      value={formData.dueDate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority || 'P3'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <option value="P1">High Priority (P1)</option>
                    <option value="P2">Medium Priority (P2)</option>
                    <option value="P3">Normal (P3)</option>
                    <option value="P4">Low Priority (P4)</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <button
                  onClick={() => toggleComplete(task.id, task.completed)}
                  className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center ${
                    task.completed
                      ? 'bg-green-500/20 border-green-500/50'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {task.completed && (
                    <CheckIcon className="h-3.5 w-3.5 text-green-400" />
                  )}
                </button>

                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-white/90 font-medium ${
                      task.completed ? 'line-through text-white/50' : ''
                    }`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority] || priorityColors.P3}`}>
                        {priorityIcons[task.priority] || priorityIcons.P3} {task.priority || 'P3'}
                      </span>
                    </div>
                  </div>

                  {(task.assignee || task.dueDate) && (
                    <div className="mt-2 flex flex-wrap gap-3 text-sm">
                      {task.assignee && (
                        <span className="flex items-center text-white/60">
                          <UserCircleIcon className="w-4 h-4 mr-1" />
                          {task.assignee}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="flex items-center text-white/60">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Edit task"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1.5 text-red-400/50 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                      title="Delete task"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
