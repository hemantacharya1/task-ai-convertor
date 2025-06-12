import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';

export default function TaskForm({ setTasks }) {
  const [task, setTask] = useState({ 
    title: '', 
    assignee: '', 
    dueDate: '', 
    priority: 'P3',
    completed: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return; // Don't add empty tasks
    
    const newTask = { 
      ...task, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, newTask]);
    setTask({ title: '', assignee: '', dueDate: '', priority: 'P3', completed: false });
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-indigo-200/60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-indigo-200 mb-1";
  const priorityColors = {
    P1: 'bg-red-500/20 text-red-400 border-red-500/30',
    P2: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    P3: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    P4: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Task</label>
          <input 
            type="text" 
            className={inputClasses}
            placeholder="What needs to be done?" 
            value={task.title} 
            onChange={e => setTask({ ...task, title: e.target.value })} 
            required
          />
        </div>
        <div>
          <label className={labelClasses}>Assignee</label>
          <input 
            type="text" 
            className={inputClasses}
            placeholder="Who's responsible?" 
            value={task.assignee} 
            onChange={e => setTask({ ...task, assignee: e.target.value })} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Due Date</label>
          <input 
            type="datetime-local" 
            className={inputClasses}
            value={task.dueDate} 
            onChange={e => setTask({ ...task, dueDate: e.target.value })} 
          />
        </div>
        <div>
          <label className={labelClasses}>Priority</label>
          <select 
            className={`${inputClasses} cursor-pointer`} 
            value={task.priority} 
            onChange={e => setTask({ ...task, priority: e.target.value })}
          >
            <option value="P1" className="bg-gray-900 text-red-400">🔴 P1 - Critical</option>
            <option value="P2" className="bg-gray-900 text-amber-400">🟠 P2 - High</option>
            <option value="P3" className="bg-gray-900 text-blue-400">🔵 P3 - Medium</option>
            <option value="P4" className="bg-gray-900 text-gray-400">⚪ P4 - Low</option>
          </select>
        </div>
      </div>
      
      <div className="pt-2">
        <button 
          type="submit" 
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Task
        </button>
      </div>
    </form>
  );
}
