import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { Message, getResponseForInput, completionMessages, generateTicketId } from './mockData';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onTicketGenerated?: (ticket: any) => void;
  onCategoryDetected?: (category: string) => void;
}

const suggestionChips = [
  'Cambio de talla',
  'Producto dañado',
  'Cargo duplicado',
  'Paquete no llega',
];

export function ChatInterface({
  messages,
  setMessages,
  onTicketGenerated,
  onCategoryDetected
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
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

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    const { response, category } = getResponseForInput(input);
    onCategoryDetected?.(category);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      if (messageCount >= 2) {
        const completionMessage = completionMessages[Math.floor(Math.random() * completionMessages.length)];

        setTimeout(() => {
          const finalMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: completionMessage,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, finalMessage]);

          setTimeout(() => {
            onTicketGenerated?.({
              id: generateTicketId(),
              category: category || 'General',
              priority: 'medium',
              items: ['Producto solicitado'],
              summary: `Consulta de ${category || 'soporte'} procesada`,
              status: 'pending',
              createdAt: new Date(),
            });
          }, 1500);
        }, 1000);
      }
    }, 1000 + Math.random() * 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                delay: index * 0.05
              }}
              className={`flex gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-900 text-white'
              }`}>
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-60 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-1">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setInput(chip)}
              className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 rounded-full text-xs transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
