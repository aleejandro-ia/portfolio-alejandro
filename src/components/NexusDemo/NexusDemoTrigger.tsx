import React from 'react';

interface NexusDemoTriggerProps {
  onClick: () => void;
}

export default function NexusDemoTrigger({ onClick }: NexusDemoTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-3 px-6 py-3 bg-[#D4FF00] text-[#0A0A0A] font-bold uppercase tracking-wider text-sm hover:bg-[#D4FF00]/90 transition-colors"
    >
      <span>Probar Nexus AI</span>
      <div className="absolute inset-0 border-2 border-[#D4FF00] scale-105 opacity-0 group-hover:opacity-20 group-hover:scale-100 transition-all duration-500" />
    </button>
  );
}
