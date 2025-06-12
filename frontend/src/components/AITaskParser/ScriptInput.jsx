import { useState } from 'react';
import { parseTasksFromScript } from '../../services/aiService';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, XIcon, CheckIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/outline';

const priorityColors = {
  P1: 'bg-red-500/20 text-red-400',
  P2: 'bg-yellow-500/20 text-yellow-400',
  P3: 'bg-blue-500/20 text-blue-400',
  P4: 'bg-gray-500/20 text-gray-400',
};

export default function ScriptInput({ onAddTasks }) {
  const [script, setScript] = useState('');
  const [parsedTasks, setParsedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTasks, setSelectedTasks] = useState({});

  const handleParse = async () => {
    if (!script.trim()) {
      setError('Please enter some text to parse');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const tasks = await parseTasksFromScript(script);
      setParsedTasks(tasks);
      // Select all tasks by default
      const initialSelection = {};
      tasks.forEach((task, index) => {
        initialSelection[task.id] = true;
      });
      setSelectedTasks(initialSelection);
    } catch (err) {
      setError(err.message || 'Failed to parse tasks. Please try again.');
      console.error('Parsing error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskToggle = (taskId) => {
    setSelectedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleCreateTasks = () => {
    const tasksToAdd = parsedTasks.filter(task => selectedTasks[task.id]);
    onAddTasks(tasksToAdd);
    setScript('');
    setParsedTasks([]);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste your script here. Example: 'Aman, please complete the landing page by tomorrow. Rajeev, follow up with the client by Friday.'"
          className="w-full h-40 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleParse}
            disabled={isLoading || !script.trim()}
            className={`flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium ${
              isLoading || !script.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isLoading ? (
              'Parsing...'
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Parse Script
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <AnimatePresence>
        {parsedTasks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white/90">Parsed Tasks</h3>
              <span className="text-sm text-white/60">{parsedTasks.length} tasks found</span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {parsedTasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    selectedTasks[task.id] 
                      ? 'bg-white/5 border-purple-500/30' 
                      : 'bg-white/2 border-white/5'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={!!selectedTasks[task.id]}
                      onChange={() => handleTaskToggle(task.id)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white/90 font-medium">{task.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority] || priorityColors.P3}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/60">
                        {task.assignee && (
                          <span className="flex items-center">
                            <UserCircleIcon className="w-4 h-4 mr-1" />
                            {task.assignee}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {new Date(task.dueDate).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCreateTasks}
                disabled={!Object.values(selectedTasks).some(selected => selected)}
                className={`flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium ${
                  !Object.values(selectedTasks).some(selected => selected) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                <CheckIcon className="w-5 h-5 mr-2" />
                Create Selected Tasks ({Object.values(selectedTasks).filter(Boolean).length})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
