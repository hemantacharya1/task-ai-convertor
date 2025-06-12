import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/outline';
import TaskList from '../components/TaskList';
import TaskTabs from '../components/AITaskParser/TaskTabs';
import { useState, useEffect } from 'react';

// Helper function to get tasks from localStorage
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

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const addMultipleTasks = (newTasks) => {
    setTasks([...tasks, ...newTasks.map(task => ({
      ...task,
      id: Date.now() + Math.random().toString(36).substr(2, 9)
    }))]);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
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
            <div className="space-y-6">
              <AITaskParser onAddTask={(newTask) => setTasks(prev => [...prev, newTask])} />
              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-sm text-indigo-300">or add manually</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>
              <TaskForm setTasks={setTasks} />
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
            
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
