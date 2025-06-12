import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, XIcon } from '@heroicons/react/outline';
import { parseTaskWithAI, isAIServiceAvailable } from '../../services/aiService';
import AIPreview from './AIPreview';

export default function AITaskParser({ onAddTask }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [parsedTask, setParsedTask] = useState(null);
  const isAIAvailable = isAIServiceAvailable();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !isAIAvailable) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const task = await parseTaskWithAI(input);
      setParsedTask(task);
    } catch (err) {
      console.error('Error parsing task:', err);
      setError('Failed to parse task. Please try again or enter manually.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = (task) => {
    onAddTask({
      ...task,
      id: Date.now(),
      completed: false
    });
    setInput('');
    setParsedTask(null);
  };

  const handleCancel = () => {
    setParsedTask(null);
  };

  const handleUpdateTask = (updatedTask) => {
    setParsedTask(updatedTask);
  };

  if (!isAIAvailable) {
    return null; // Don't render if AI service is not available
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative
          bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
          backdrop-blur-sm rounded-lg p-0.5
          focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-50
          transition-all duration-200
        ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a task in natural language (e.g., 'Call John tomorrow at 2pm about the project (P1)')"
            className="w-full p-3 pr-16 bg-gray-900/80 backdrop-blur-sm rounded-lg border-0 text-white 
                     placeholder-indigo-300/60 focus:ring-0 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all duration-200 ${
              !input.trim() || isLoading
                ? 'text-indigo-800/50 cursor-not-allowed'
                : 'text-indigo-300 hover:text-white hover:bg-indigo-500/20'
            }`}
            title="Parse with AI"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <SparklesIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </form>

      <AnimatePresence>
        {parsedTask && (
          <AIPreview
            task={parsedTask}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onUpdate={handleUpdateTask}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
