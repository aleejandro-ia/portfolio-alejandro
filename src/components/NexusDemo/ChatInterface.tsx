import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Loader2, CheckCircle2, AlertCircle, Trash2, Cpu, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { StructuredTicket, TriageResponse, Message } from './types';
import { triageConversation } from './lib/gemini';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  showSummary: boolean;
  setShowSummary: (show: boolean) => void;
  finalTicket: StructuredTicket | null;
  setFinalTicket: (ticket: StructuredTicket | null) => void;
  currentTriage: TriageResponse | null;
  setCurrentTriage: (triage: TriageResponse | null) => void;
  onTicketCreated: (ticket: StructuredTicket) => void;
  onNewChat: () => void;
  onClose: () => void;
}

export default function ChatInterface({
  messages,
  setMessages,
  showSummary,
  setShowSummary,
  finalTicket,
  setFinalTicket,
  currentTriage,
  setCurrentTriage,
  onTicketCreated,
  onNewChat,
  onClose
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const newMessages = [...messages, userMessage];
      const triage = await triageConversation(newMessages);
      setCurrentTriage(triage);

      const hasPendingData = (triage.missingInfo?.length ?? 0) > 0;
      const trulyComplete = triage.isComplete && !hasPendingData;

      let responseContent = triage.nextQuestion;
      const isVague = !responseContent ||
                      /¿algo más\??/i.test(responseContent) ||
                      /¿en qué (más )?puedo ayudarte\??/i.test(responseContent) ||
                      /cuéntame más/i.test(responseContent);

      if (isVague && hasPendingData) {
        responseContent = `Para poder registrar su solicitud correctamente, necesito confirmar: ${triage.missingInfo[0]}.`;
      } else if (!responseContent) {
        responseContent = triage.isComplete
          ? 'He recopilado toda la información necesaria. He generado un ticket para nuestro equipo.'
          : 'He tomado nota de los detalles. ¿Desea añadir información adicional?';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);

        if (trulyComplete) {
          const newTicket: StructuredTicket = {
            id: `TK-${Math.floor(Math.random() * 9000) + 1000}`,
            orderNumber: triage.orderNumber,
            alternativeIdentifier: triage.alternativeIdentifier,
            identificationType: triage.identificationType || (triage.orderNumber ? 'Nº Referencia' : 'ID Alternativo'),
            category: triage.category,
            priority: 'medium',
            subIncidents: (triage.subIncidents || [])?.map(sub => ({ ...sub, status: 'unresolved' as const })),
            items: triage.items || [],
            reason: triage.reason,
            isComplete: true,
            completenessScore: triage.completenessScore ?? 100,
            missingInfo: triage.missingInfo || [],
            summary: triage.summary,
            aiInterpretation: triage.aiInterpretation || "Información recopilada por Nexus AI.",
            originalConversation: [...(newMessages || []), assistantMessage],
            createdAt: new Date(),
            status: 'unresolved',
          };

          setFinalTicket(newTicket);
          setTimeout(() => setShowSummary(true), 2000);
          onTicketCreated(newTicket);
        }
      }, 800);
    } catch (error) {
      console.error("Chat Error:", error);
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ha habido un problema técnico. Por favor, inténtelo de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#12161E] relative overflow-hidden w-full font-sans">
      <AnimatePresence mode="wait">
        {!showSummary ? (
          <motion.div
            key="chat-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 min-h-0 items-center w-full"
          >
            {/* Header */}
            <div className="w-full max-w-4xl px-8 pt-8 pb-4 z-10 flex flex-col items-center text-center border-b border-[#262E3D] bg-[#181C24]">
              <div className="mb-3">
                <div className="w-12 h-12 bg-[#8FE331]/10 border border-[#8FE331]/30 flex items-center justify-center rounded-2xl shadow-[0_0_15px_rgba(143,227,49,0.1)] overflow-hidden">
                  <img src="/nexus-logo-transparente.png" alt="Nexus Logo" className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-1 shadow-sm">
                Asistente Nexus
              </h2>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <span className="w-2 h-2 bg-[#8FE331] rounded-full shadow-[0_0_6px_#8FE331] animate-pulse" />
                Sistema En Línea
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 w-full max-w-4xl px-4 md:px-8 z-10 min-h-0">
              <div className="py-6 space-y-6">
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex flex-col w-full px-2",
                        m.role === 'user' ? "items-end" : "items-start"
                      )}
                    >
                      <div className={cn(
                        "flex items-center gap-2 mb-2 w-max max-w-[85%]",
                        m.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}>
                        {m.role === 'assistant' ? (
                          <div className="w-6 h-6 rounded-full bg-[#8FE331]/20 flex items-center justify-center border border-[#8FE331]/30 shrink-0 overflow-hidden">
                            <img src="/nexus-logo-transparente.png" alt="Nexus Logo" className="w-4 h-4 object-contain" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <User size={13} />
                          </div>
                        )}
                        <span className={cn(
                          "text-xs font-semibold",
                          m.role === 'user' ? "text-gray-300" : "text-white"
                        )}>
                          {m.role === 'user' ? 'Tú' : 'Nexus AI'}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {format(m.timestamp, 'HH:mm')}
                        </span>
                      </div>

                      <div className={cn(
                        "px-4 py-3.5 shadow-sm max-w-[85%] text-[13.5px] leading-relaxed border font-normal",
                        m.role === 'user'
                          ? "bg-[#283241] text-gray-100 rounded-2xl rounded-tr-sm border-[#343F4F]"
                          : "bg-[#283241] text-gray-200 rounded-2xl rounded-tl-sm border-[#3A4A3C]"
                      )}>
                        <p>{m.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start px-2 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#8FE331]/20 flex items-center justify-center border border-[#8FE331]/30 shrink-0 overflow-hidden">
                        <img src="/nexus-logo-transparent.png" alt="Nexus Logo" className="w-4 h-4 object-contain" />
                      </div>
                      <span className="text-xs font-semibold text-white">Nexus AI</span>
                    </div>
                    <div className="px-4 py-3 bg-[#283241] border border-[#3A4A3C] rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-[46px]">
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#8FE331]/80 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#8FE331]/80 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#8FE331]/80 rounded-full" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            </ScrollArea>

            {/* Context Banner */}
            <AnimatePresence>
              {currentTriage && !currentTriage.isComplete && (currentTriage.missingInfo?.length ?? 0) > 0 && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="fixed bottom-[140px] left-1/2 -translate-x-1/2 z-30"
                >
                  <div className="bg-[#18261E] border border-[#8FE331]/40 text-white px-5 py-2.5 rounded-full flex items-center gap-4 shadow-lg shadow-[#8FE331]/10">
                    <div className="flex items-center gap-3">
                      <Loader2 size={14} className="animate-spin text-[#8FE331]" />
                      <span className="text-[11px] font-medium text-gray-300">
                        Por favor, indícanos: <span className="text-[#8FE331] font-semibold">{currentTriage.missingInfo?.join(', ')}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="w-full max-w-4xl px-4 md:px-8 z-20 pb-6 pt-2 bg-[#12161E]">
              <div className="relative bg-[#181C24] border border-[#262E3D] rounded-2xl p-2.5 focus-within:border-[#8FE331]/50 focus-within:ring-1 focus-within:ring-[#8FE331]/10 transition-all shadow-md">
                <Textarea
                  placeholder="Describe tu incidencia con mayor detalle..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-h-[60px] max-h-[150px] border-none bg-transparent text-sm placeholder:text-gray-500 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-3 mb-2 text-white"
                />
                <div className="flex justify-between items-center px-1">
                  <button onClick={onNewChat} className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors p-2 font-medium">
                    <Trash2 size={14} />
                    Reiniciar conversación
                  </button>
                  <Button onClick={handleSend} disabled={!input.trim() || isTyping} className="h-10 px-6 bg-[#8FE331] text-[#12161E] text-xs font-bold hover:bg-[#9DEB40] transition-colors disabled:opacity-50 rounded-xl gap-2 shadow-sm">
                    Envíar <Send size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="summary-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 min-h-0 w-full flex flex-col items-center bg-[#12161E] overflow-hidden justify-center"
          >
            <div className="w-full max-w-2xl bg-[#181C24] border border-[#262E3D] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="text-center space-y-4 mb-8">
                <div className="inline-flex bg-[#8FE331]/10 text-[#8FE331] p-5 rounded-full mb-2 ring-1 ring-[#8FE331]/30 shadow-[0_0_25px_rgba(143,227,49,0.15)]">
                  <CheckCircle2 size={36} />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Incidencia Registrada</h2>
                <p className="text-sm text-gray-400">Nuestro equipo ha recibido tu solicitud exitosamente y será asignada a un agente.</p>
              </div>

              <div className="bg-[#12161E] rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-[#262E3D] mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-6">
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1.5">ID Ticket</span>
                    <span className="text-white font-mono font-semibold text-base">{finalTicket?.id}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-1.5">Fecha de Creación</span>
                    <span className="text-white text-sm font-medium">{format(new Date(), 'dd/MM/yyyy HH:mm')}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-2">Categoría Detectada</span>
                    <Badge className="bg-[#1C222B] text-white border border-[#2A3441] hover:bg-[#1C222B] px-3 py-1 font-medium">{finalTicket?.category}</Badge>
                  </div>
                  <div className="col-span-2 pt-5 border-t border-[#262E3D]">
                    <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block mb-3">Resumen del caso</span>
                    <p className="text-gray-300 text-sm leading-relaxed">{finalTicket?.summary}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Button onClick={onNewChat} className="w-full h-12 bg-[#8FE331] text-[#12161E] text-[13px] font-bold hover:bg-[#9BEB3A] transition-colors rounded-xl tracking-wide shadow-md">
                  CREAR NUEVA CONSULTA
                </Button>
                <p className="text-xs text-gray-500">Volverás al menú de inicio</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
