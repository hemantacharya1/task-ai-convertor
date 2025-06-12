import { useState } from 'react';
import AITaskParser from './AITaskParser';
import ScriptInput from './ScriptInput';

export default function TaskTabs({ onAddTask, onAddTasks }) {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="space-y-4">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('single')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'single'
              ? 'text-purple-400 border-b-2 border-purple-500'
              : 'text-white/60 hover:text-white/90'
          }`}
        >
          Single Task
        </button>
        <button
          onClick={() => setActiveTab('script')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'script'
              ? 'text-purple-400 border-b-2 border-purple-500'
              : 'text-white/60 hover:text-white/90'
          }`}
        >
          Parse from Script
        </button>
      </div>

      <div className="mt-2">
        {activeTab === 'single' ? (
          <AITaskParser onAddTask={onAddTask} />
        ) : (
          <ScriptInput onAddTasks={onAddTasks} />
        )}
      </div>
    </div>
  );
}
