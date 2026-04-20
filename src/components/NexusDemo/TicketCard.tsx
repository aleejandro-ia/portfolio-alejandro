import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Package } from 'lucide-react';
import { Ticket } from './mockData';
import { ScanReveal } from './ScanReveal';

interface TicketCardProps {
  ticket: Ticket;
  isNew?: boolean;
}

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-orange-500',
  low: 'bg-green-500',
};

const statusIcons = {
  pending: Clock,
  resolved: CheckCircle2,
};

export function TicketCard({ ticket, isNew = false }: TicketCardProps) {
  const StatusIcon = statusIcons[ticket.status];

  return (
    <motion.div
      initial={isNew ? { opacity: 0, scale: 0.9, y: 20 } : false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
    >
      <ScanReveal delay={0}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
            <span className={`w-2 h-2 rounded-full ${priorityColors[ticket.priority]}`} />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            ticket.status === 'resolved'
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            <StatusIcon size={12} />
            {ticket.status === 'resolved' ? 'Resuelto' : 'Pendiente'}
          </div>
        </div>
      </ScanReveal>

      <ScanReveal delay={0.1}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-900">{ticket.category}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{ticket.summary}</p>

          {ticket.items.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {ticket.items.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </ScanReveal>

      <ScanReveal delay={0.2}>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>{ticket.createdAt.toLocaleDateString()}</span>
          {ticket.orderNumber && (
            <span className="font-mono">{ticket.orderNumber}</span>
          )}
        </div>
      </ScanReveal>

      {isNew && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-1 bg-gradient-to-r from-orange-400 to-orange-600"
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
}
