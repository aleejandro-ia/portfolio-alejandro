import { motion } from 'framer-motion';
import { User, Headphones } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'client' | 'agent';
  onToggle: (view: 'client' | 'agent') => void;
}

export function ViewToggle({ currentView, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => onToggle('client')}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentView === 'client' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {currentView === 'client' && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-orange-500 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <User size={16} />
          Cliente
        </span>
      </button>
      <button
        onClick={() => onToggle('agent')}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          currentView === 'agent' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {currentView === 'agent' && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-gray-900 rounded-full"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Headphones size={16} />
          Agente
        </span>
      </button>
    </div>
  );
}
