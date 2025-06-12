import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/outline';
import TaskList from '../components/TaskList';
import TaskTabs from '../components/AITaskParser/TaskTabs';
import { useState, useEffect } from 'react';

// Load tasks from localStorage
const getStoredTasks = () => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error);
    return [];
  }
};

export default function HomePage() {
  const [tasks, setTasks] = useState(() => getStoredTasks());

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Add a single task
  const addTask = (newTask) => {
    setTasks(prev => [...prev, { ...newTask, id: Date.now() }]);
  };

  // Add multiple tasks from script
  const addMultipleTasks = (newTasks) => {
    setTasks(prev => [
      ...prev, 
      ...newTasks.map(task => ({
        ...task,
        id: Date.now() + Math.random().toString(36).substr(2, 9)
      }))
    ]);
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Update a task
  const updateTask = (taskId, updatedTask) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              TaskFlow AI
            </span>
          </div>
          <span className="px-4 py-2 text-indigo-100 bg-indigo-900/50 rounded-full text-sm font-medium">
            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Your Tasks
          </h1>
          <p className="text-indigo-200 mb-8">
            Manage your tasks with ease and stay productive
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
            <TaskTabs 
              onAddTask={addTask}
              onAddTasks={addMultipleTasks}
            />
          </div>

          <div className="mt-8">
            <TaskList 
              tasks={tasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask}
              onUpdate={updateTask}
            />

            {tasks.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/30 mb-4">
                  <SparklesIcon className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No tasks yet</h3>
                <p className="text-indigo-200 max-w-md mx-auto">
                  Start by adding your first task above. Your tasks will appear here.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
