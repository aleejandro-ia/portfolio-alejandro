import { motion } from 'framer-motion';
import { Scan, Package, CreditCard, Truck, AlertCircle } from 'lucide-react';

interface AnalysisBarProps {
  detectedCategory: string | null;
  confidence: number;
}

const categories = [
  { id: 'devolucion', label: 'Devolución', icon: Package, color: 'bg-blue-500' },
  { id: 'talla', label: 'Cambio Talla', icon: Package, color: 'bg-purple-500' },
  { id: 'cambio', label: 'Cambio', icon: Package, color: 'bg-purple-500' },
  { id: 'factura', label: 'Facturación', icon: CreditCard, color: 'bg-green-500' },
  { id: 'cargo', label: 'Cargo', icon: CreditCard, color: 'bg-green-500' },
  { id: 'envio', label: 'Envío', icon: Truck, color: 'bg-orange-500' },
  { id: 'paquete', label: 'Paquete', icon: Truck, color: 'bg-orange-500' },
  { id: 'roto', label: 'Defecto', icon: AlertCircle, color: 'bg-red-500' },
  { id: 'danado', label: 'Dañado', icon: AlertCircle, color: 'bg-red-500' },
];

export function AnalysisBar({ detectedCategory, confidence }: AnalysisBarProps) {
  const activeCategory = categories.find(c => c.id === detectedCategory);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <Scan size={16} className="text-orange-500" />
        <span>Análisis en tiempo real</span>
      </div>

      <div className="space-y-2">
        {categories.slice(0, 5).map((cat) => {
          const isActive = cat.id === detectedCategory;
          const IconComp = cat.icon;
          return (
            <motion.div
              key={cat.id}
              className="flex items-center gap-2"
              animate={{
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <IconComp size={14} className={isActive ? 'text-orange-500' : 'text-gray-400'} />
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${cat.color}`}
                  initial={{ width: 0 }}
                  animate={{
                    width: isActive ? `${confidence}%` : '5%',
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className={`text-xs w-16 ${isActive ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                {cat.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {activeCategory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 pt-3 border-t border-gray-200"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Categoría detectada:</span>
            <span className={`px-2 py-1 rounded text-white text-xs ${activeCategory.color}`}>
              {activeCategory.label}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Confianza:</span>
            <span className="font-medium">{confidence}%</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
