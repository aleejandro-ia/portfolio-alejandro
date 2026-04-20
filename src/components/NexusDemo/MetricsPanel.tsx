import { motion } from 'framer-motion';
import { Ticket, Clock, TrendingUp } from 'lucide-react';
import { Ticket as TicketType } from './mockData';

interface MetricsPanelProps {
  tickets: TicketType[];
}

export function MetricsPanel({ tickets }: MetricsPanelProps) {
  const today = tickets.filter(t =>
    t.createdAt.toDateString() === new Date().toDateString()
  ).length;

  const pending = tickets.filter(t => t.status === 'pending').length;
  const resolved = tickets.filter(t => t.status === 'resolved').length;
  const avgTime = '4.2h';

  const categories = [
    { name: 'Devolución', count: tickets.filter(t => t.category === 'Devolución').length, color: 'bg-blue-500' },
    { name: 'Envío', count: tickets.filter(t => t.category === 'Envío').length, color: 'bg-orange-500' },
    { name: 'Facturación', count: tickets.filter(t => t.category === 'Facturación').length, color: 'bg-green-500' },
    { name: 'Mixto', count: tickets.filter(t => t.category === 'Mixto').length, color: 'bg-purple-500' },
  ];

  const maxCount = Math.max(...categories.map(c => c.count), 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{today}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Ticket className="text-orange-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-orange-600">{pending}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resueltos</p>
              <p className="text-2xl font-bold text-green-600">{resolved}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tiempo Medio</p>
              <p className="text-2xl font-bold text-gray-900">{avgTime}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="text-blue-600" size={20} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-24">{cat.name}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.count / maxCount) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={`h-full ${cat.color} rounded-full`}
                />
              </div>
              <span className="text-sm text-gray-900 w-8 text-right">{cat.count}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
