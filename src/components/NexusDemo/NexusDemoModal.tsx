import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, LayoutDashboard } from 'lucide-react';
import ChatInterface from './ChatInterface';
import Dashboard from './Dashboard';
import { StructuredTicket, TriageResponse, Message } from './types';
import { INITIAL_TICKETS } from './data/mockTickets';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface NexusDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NexusDemoModal({ isOpen, onClose }: NexusDemoModalProps) {
  const [view, setView] = useState<'customer' | 'agent'>('agent');
  const [tickets, setTickets] = useState<StructuredTicket[]>(INITIAL_TICKETS);

  // Chat State
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hola, soy Nexus AI. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [chatShowSummary, setChatShowSummary] = useState(false);
  const [chatFinalTicket, setChatFinalTicket] = useState<StructuredTicket | null>(null);
  const [chatCurrentTriage, setChatCurrentTriage] = useState<TriageResponse | null>(null);

  // Dashboard State
  const [agentSelectedTicketId, setAgentSelectedTicketId] = useState<string | null>(null);
  const [agentActiveTab, setAgentActiveTab] = useState<'unresolved' | 'resolved'>('unresolved');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTickets(INITIAL_TICKETS);
      setView('agent');
      setChatMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Hola, soy Nexus AI. ¿En qué puedo ayudarte hoy?',
          timestamp: new Date(),
        },
      ]);
      setChatShowSummary(false);
      setChatFinalTicket(null);
      setChatCurrentTriage(null);
      setAgentSelectedTicketId(null);
      setAgentActiveTab('unresolved');
    }
  }, [isOpen]);

  // Auto-select first ticket
  useEffect(() => {
    if (!agentSelectedTicketId && tickets.length > 0) {
      const firstInTab = tickets.find(t => t.status === agentActiveTab);
      if (firstInTab) setAgentSelectedTicketId(firstInTab.id);
    }
  }, [tickets, agentActiveTab, agentSelectedTicketId]);

  const handleTicketCreated = (newTicket: StructuredTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    setAgentSelectedTicketId(newTicket.id);
    setAgentActiveTab('unresolved');
    setChatFinalTicket(newTicket);
    setChatShowSummary(true);
  };

  const handleNewChat = () => {
    setChatMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hola de nuevo. ¿En qué puedo ayudarte?',
        timestamp: new Date(),
      },
    ]);
    setChatShowSummary(false);
    setChatFinalTicket(null);
    setChatCurrentTriage(null);
  };

  const handleUpdateStatus = (ticketId: string, status: 'unresolved' | 'resolved') => {
    setTickets((prev) => prev.map(t => t.id === ticketId ? { ...t, status } : t));
    if (status === 'resolved') {
      setAgentActiveTab('resolved');
    }
  };

  const handleReset = () => {
    setAgentSelectedTicketId(null);
    setAgentActiveTab('unresolved');
    handleNewChat();
    setTickets(INITIAL_TICKETS);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 sm:inset-2 md:inset-4 bg-[#12161E] border sm:border-[#262E3D] rounded-none sm:rounded-xl z-50 flex flex-col overflow-hidden shadow-2xl font-sans"
          >
            {/* Header con navegación (Rediseñado) */}
            <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-[#262E3D] bg-[#181C24] relative z-20">
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center">
                    <img src="/nexus-logo-transparente.png" alt="Nexus Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">Nexus</h3>
                    <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-medium hidden xs:block">Claims System</p>
                  </div>
                </div>

                {/* Navegación Cliente/Agente - Scrollable en móvil */}
                <nav className="flex items-center gap-1 ml-2 sm:ml-6 bg-[#11141A] p-0.5 sm:p-1 rounded-md sm:rounded-lg border border-[#262E3D] overflow-x-auto">
                  <button
                    onClick={() => setView('customer')}
                    className={cn(
                      "px-2 sm:px-4 py-1.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 sm:gap-2 rounded-md whitespace-nowrap",
                      view === 'customer'
                        ? "bg-[#262E3D] text-[#8FE331] shadow-sm"
                        : "text-gray-500 hover:text-gray-300 hover:bg-[#1C222B]"
                    )}
                  >
                    <MessageSquare size={12} className="sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Simular Cliente</span>
                    <span className="xs:hidden">Cliente</span>
                  </button>
                  <button
                    onClick={() => setView('agent')}
                    className={cn(
                      "px-2 sm:px-4 py-1.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 sm:gap-2 rounded-md whitespace-nowrap",
                      view === 'agent'
                        ? "bg-[#262E3D] text-[#8FE331] shadow-sm"
                        : "text-gray-500 hover:text-gray-300 hover:bg-[#1C222B]"
                    )}
                  >
                    <LayoutDashboard size={12} className="sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Panel Agente</span>
                    <span className="xs:hidden">Agente</span>
                    {agentSelectedTicketId && view !== 'agent' && tickets.find(t => t.id === agentSelectedTicketId)?.status === 'unresolved' && (
                      <span className="w-1.5 h-1.5 bg-[#8FE331] rounded-full animate-ping ml-1" />
                    )}
                  </button>
                </nav>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-7 sm:h-8 px-2 sm:px-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border-[#262E3D] bg-transparent text-gray-400 hover:text-white hover:border-[#8FE331] hover:bg-[#8FE331]/10 rounded-md hidden xs:flex"
                >
                  Reset
                </Button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors p-1.5 sm:p-2 bg-[#1C222B] hover:bg-[#262E3D] rounded-full"
                >
                  <X size={14} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-hidden bg-[#12161E] relative z-10 w-full">
              {view === 'customer' ? (
                <ChatInterface
                  messages={chatMessages}
                  setMessages={setChatMessages}
                  showSummary={chatShowSummary}
                  setShowSummary={setChatShowSummary}
                  finalTicket={chatFinalTicket}
                  setFinalTicket={setChatFinalTicket}
                  currentTriage={chatCurrentTriage}
                  setCurrentTriage={setChatCurrentTriage}
                  onTicketCreated={handleTicketCreated}
                  onNewChat={handleNewChat}
                />
              ) : (
                <Dashboard
                  tickets={tickets}
                  selectedId={agentSelectedTicketId}
                  setSelectedId={setAgentSelectedTicketId}
                  activeTab={agentActiveTab}
                  setActiveTab={setAgentActiveTab}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
