# Nexus Demo Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar demo interactiva Nexus en el portfolio con modal de partículas, chat simulado y toggle cliente/agente.

**Architecture:** Componentes React independientes en `src/components/NexusDemo/` con animaciones Framer Motion, lógica de chat simulada sin APIs, y lazy loading desde el portfolio.

**Tech Stack:** React + TypeScript + Framer Motion + Tailwind CSS + Lucide React

---

## File Structure

```
src/
└── components/
    └── NexusDemo/
        ├── index.ts                    # Barrel export
        ├── NexusDemoModal.tsx         # Modal con animación partículas
        ├── ParticleBackground.tsx     # Animación partículas
        ├── NexusDemo.tsx              # Container principal
        ├── ClientView.tsx             # Vista cliente
        ├── AgentView.tsx              # Vista agente
        ├── ChatInterface.tsx          # Componente chat
        ├── TicketCard.tsx             # Card ticket con animaciones
        ├── AnalysisBar.tsx            # Barra análisis tiempo real
        ├── MetricsPanel.tsx           # Métricas dashboard
        ├── ViewToggle.tsx             # Toggle cliente/agente
        ├── ScanReveal.tsx             # Efecto scan line
        └── mockData.ts                # Datos simulados
└── data/
    └── projects.ts                   # Añadir proyecto Nexus
```

---

## Task 1: Setup Dependencies

**Files:**
- Modify: `portfolio-alejandro-main/package.json`

- [ ] **Step 1: Add framer-motion dependency**

Add to dependencies in package.json:
```json
"framer-motion": "^11.0.0"
```

- [ ] **Step 2: Install dependencies**

Run: `cd portfolio-alejandro-main && npm install`
Expected: Installation completes, framer-motion added to node_modules

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add framer-motion for Nexus demo animations"
```

---

## Task 2: Create Directory Structure

**Files:**
- Create: `src/components/NexusDemo/index.ts`
- Create: `src/components/NexusDemo/mockData.ts`

- [ ] **Step 1: Create NexusDemo directory**

Run: `mkdir -p portfolio-alejandro-main/src/components/NexusDemo`

- [ ] **Step 2: Create barrel export file**

Create `src/components/NexusDemo/index.ts`:
```typescript
export { NexusDemoModal } from './NexusDemoModal';
export { default as NexusDemo } from './NexusDemo';
```

- [ ] **Step 3: Create mockData.ts**

Create `src/components/NexusDemo/mockData.ts`:
```typescript
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Ticket {
  id: string;
  orderNumber?: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  items: string[];
  reason?: string;
  summary: string;
  status: 'pending' | 'resolved';
  createdAt: Date;
  originalConversation?: Message[];
}

export const initialMessage: Message = {
  id: '1',
  role: 'assistant',
  content: 'Hola, soy tu asistente de Nexus. ¿En qué puedo ayudarte hoy con tu pedido?',
  timestamp: new Date(),
};

export const mockTickets: Ticket[] = [
  {
    id: 'TK-3312',
    orderNumber: 'ORD-11204',
    category: 'Mixto',
    priority: 'medium',
    items: ['Vestido Floral Seda', 'Bolso Piel Negro'],
    reason: 'Producto dañado + Cargo duplicado',
    summary: 'Solicitud de devolución por tara y reclamación por cargo duplicado en tarjeta.',
    status: 'pending',
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: 'TK-3314',
    orderNumber: 'ORD-11215',
    category: 'Envío',
    priority: 'high',
    items: ['Paquete no entregado'],
    reason: 'Paquete no entregado',
    summary: 'Pedido consta como entregado pero cliente no lo recibió.',
    status: 'resolved',
    createdAt: new Date(Date.now() - 5400000),
  },
  {
    id: 'TK-3311',
    orderNumber: 'ORD-11198',
    category: 'Devolución',
    priority: 'low',
    items: ['Zapatillas Runner Pro'],
    reason: 'Talla pequeña',
    summary: 'Devolución de calzado por problemas de ajuste.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000),
  },
];

export const responseMap: Record<string, string> = {
  devolucion: 'Entiendo que desea realizar una devolución. ¿Podría indicarme el número de pedido y el motivo?',
  talla: 'Veo que tiene un problema de talla. ¿Desea cambiarla o prefiere la devolución?',
  cambio: 'Entiendo que desea realizar un cambio. ¿Podría indicarme qué producto y talla necesita?',
  factura: 'Veo que tiene una consulta sobre facturación. ¿El cargo aparece duplicado o tiene otra duda?',
  cargo: 'Entiendo que hay un problema con el cargo. ¿Podría indicarme el importe y fecha del cobro?',
  cobro: 'Veo que tiene dudas sobre el cobro. ¿El importe es incorrecto o aparece duplicado?',
  envio: 'Lamento el inconveniente con su envío. ¿El paquete aparece como entregado o está retrasado?',
  paquete: 'Entiendo que hay un problema con el paquete. ¿Podría describir qué ha ocurrido?',
  entrega: 'Veo que hay un problema con la entrega. ¿El paquete consta como entregado en el sistema?',
  roto: 'Siento escuchar que el producto llegó dañado. ¿Podría describir el daño con más detalle?',
  danado: 'Entiendo que recibió un producto dañado. ¿Tiene fotos del defecto?',
  defecto: 'Lamento que el producto tenga un defecto. ¿Es un defecto de fabricación o daño por transporte?',
};

export const fallbackResponses = [
  'Entiendo. ¿Podría darme más detalles para poder ayudarle mejor?',
  'Gracias por la información. ¿Hay algo más que deba saber sobre su caso?',
  'Perfecto, estoy procesando su solicitud. ¿Podría confirmarme el número de pedido?',
];

export const completionMessages = [
  'He recopilado toda la información necesaria. Generando su ticket de soporte...',
  'Perfecto, tengo toda la información. Creando su caso ahora mismo...',
];

export function getResponseForInput(input: string): { response: string; category: string } {
  const lowerInput = input.toLowerCase();
  
  for (const [keyword, response] of Object.entries(responseMap)) {
    if (lowerInput.includes(keyword)) {
      return { response, category: keyword };
    }
  }
  
  const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  return { response: randomFallback, category: 'general' };
}

export function generateTicketId(): string {
  return `TK-${Math.floor(Math.random() * 9000) + 1000}`;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/NexusDemo/
git commit -m "feat(nexus): add mock data and types for demo"
```

---

## Task 3: Create ScanReveal Component

**Files:**
- Create: `src/components/NexusDemo/ScanReveal.tsx`

- [ ] **Step 1: Create ScanReveal component**

Create `src/components/NexusDemo/ScanReveal.tsx`:
```typescript
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScanRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScanReveal({ 
  children, 
  delay = 0, 
  duration = 0.4,
  className = '' 
}: ScanRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ 
        duration, 
        delay, 
        ease: 'linear' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScanLine({ 
  isScanning 
}: { 
  isScanning: boolean 
}) {
  return (
    <motion.div
      initial={{ left: '0%', opacity: 0 }}
      animate={{ 
        left: isScanning ? '100%' : '0%', 
        opacity: isScanning ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        ease: 'easeInOut' 
      }}
      className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent pointer-events-none"
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/ScanReveal.tsx
git commit -m "feat(nexus): add ScanReveal animation component"
```

---

## Task 4: Create ParticleBackground Component

**Files:**
- Create: `src/components/NexusDemo/ParticleBackground.tsx`

- [ ] **Step 1: Create ParticleBackground**

Create `src/components/NexusDemo/ParticleBackground.tsx`:
```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  startX: string;
  startY: string;
  delay: number;
  size: number;
  color: string;
}

interface ParticleBackgroundProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function ParticleBackground({ isActive, onComplete }: ParticleBackgroundProps) {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#FF6900', '#FF8C42', '#FFB347', '#FFFFFF'];
    return Array.from({ length: 50 }, (_, i) => {
      const edge = Math.floor(Math.random() * 4);
      let startX = '50%';
      let startY = '50%';
      
      switch (edge) {
        case 0: // top
          startX = `${Math.random() * 100}%`;
          startY = '-5%';
          break;
        case 1: // right
          startX = '105%';
          startY = `${Math.random() * 100}%`;
          break;
        case 2: // bottom
          startX = `${Math.random() * 100}%`;
          startY = '105%';
          break;
        case 3: // left
          startX = '-5%';
          startY = `${Math.random() * 100}%`;
          break;
      }
      
      return {
        id: i,
        startX,
        startY,
        delay: Math.random() * 0.3,
        size: Math.random() * 2 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      <AnimatePresence>
        {isActive && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  left: particle.startX,
                  top: particle.startY,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  left: '50%',
                  top: '50%',
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: particle.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onAnimationComplete={() => {
                  if (particle.id === particles.length - 1) {
                    setTimeout(onComplete, 200);
                  }
                }}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/ParticleBackground.tsx
git commit -m "feat(nexus): add particle animation background"
```

---

## Task 5: Create ViewToggle Component

**Files:**
- Create: `src/components/NexusDemo/ViewToggle.tsx`

- [ ] **Step 1: Create ViewToggle**

Create `src/components/NexusDemo/ViewToggle.tsx`:
```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/ViewToggle.tsx
git commit -m "feat(nexus): add view toggle component with animation"
```

---

## Task 6: Create AnalysisBar Component

**Files:**
- Create: `src/components/NexusDemo/AnalysisBar.tsx`

- [ ] **Step 1: Create AnalysisBar**

Create `src/components/NexusDemo/AnalysisBar.tsx`:
```typescript
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
  const Icon = activeCategory?.icon || Scan;

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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/AnalysisBar.tsx
git commit -m "feat(nexus): add real-time analysis bar component"
```

---

## Task 7: Create ChatInterface Component

**Files:**
- Create: `src/components/NexusDemo/ChatInterface.tsx`

- [ ] **Step 1: Create ChatInterface**

Create `src/components/NexusDemo/ChatInterface.tsx`:
```typescript
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
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
        const completionMessage = completionMessages[Math.floor(Math.random() * completionMessages.length)]];
        
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/ChatInterface.tsx
git commit -m "feat(nexus): add chat interface with typing animation"
```

---

## Task 8: Create TicketCard Component

**Files:**
- Create: `src/components/NexusDemo/TicketCard.tsx`

- [ ] **Step 1: Create TicketCard**

Create `src/components/NexusDemo/TicketCard.tsx`:
```typescript
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Package, AlertCircle } from 'lucide-react';
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/TicketCard.tsx
git commit -m "feat(nexus): add ticket card with scan reveal animation"
```

---

## Task 9: Create MetricsPanel Component

**Files:**
- Create: `src/components/NexusDemo/MetricsPanel.tsx`

- [ ] **Step 1: Create MetricsPanel**

Create `src/components/NexusDemo/MetricsPanel.tsx`:
```typescript
import { motion } from 'framer-motion';
import { Ticket, Clock, TrendingUp, Package } from 'lucide-react';
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/MetricsPanel.tsx
git commit -m "feat(nexus): add metrics panel component"
```

---

## Task 10: Create ClientView Component

**Files:**
- Create: `src/components/NexusDemo/ClientView.tsx`

- [ ] **Step 1: Create ClientView**

Create `src/components/NexusDemo/ClientView.tsx`:
```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { ChatInterface } from './ChatInterface';
import { AnalysisBar } from './AnalysisBar';
import { TicketCard } from './TicketCard';
import { Message, Ticket } from './mockData';

export function ClientView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hola, soy tu asistente de Nexus. ¿En qué puedo ayudarte hoy con tu pedido?',
      timestamp: new Date(),
    },
  ]);
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [generatedTicket, setGeneratedTicket] = useState<Ticket | null>(null);

  const handleCategoryDetected = (category: string) => {
    setDetectedCategory(category);
    setConfidence(Math.floor(Math.random() * 30) + 70);
  };

  const handleTicketGenerated = (ticket: Ticket) => {
    setGeneratedTicket(ticket);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Nexus</h2>
            <p className="text-sm text-gray-500">Asistente de Postventa IA</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          <Sparkles size={12} />
          Demo Simulada
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ChatInterface
              messages={messages}
              setMessages={setMessages}
              onCategoryDetected={handleCategoryDetected}
              onTicketGenerated={handleTicketGenerated}
            />
          </div>
          
          <div className="space-y-4">
            <AnalysisBar 
              detectedCategory={detectedCategory} 
              confidence={confidence} 
            />
            
            {generatedTicket && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <h3 className="text-sm font-medium text-gray-900">Ticket Generado</h3>
                <TicketCard ticket={generatedTicket} isNew />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/ClientView.tsx
git commit -m "feat(nexus): add client view component"
```

---

## Task 11: Create AgentView Component

**Files:**
- Create: `src/components/NexusDemo/AgentView.tsx`

- [ ] **Step 1: Create AgentView**

Create `src/components/NexusDemo/AgentView.tsx`:
```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Search, Filter } from 'lucide-react';
import { MetricsPanel } from './MetricsPanel';
import { TicketCard } from './TicketCard';
import { mockTickets, Ticket } from './mockData';

export function AgentView() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleTicketStatus = (ticketId: string) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId 
        ? { ...t, status: t.status === 'pending' ? 'resolved' : 'pending' }
        : t
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <Headphones className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Panel de Control</h2>
            <p className="text-sm text-gray-500">Vista Agente</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-4">
          <MetricsPanel tickets={tickets} />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tickets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendientes</option>
                <option value="resolved">Resueltos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTicket(ticket.id)}
                className="cursor-pointer"
              >
                <div className="relative">
                  <TicketCard ticket={ticket} />
                  {selectedTicket === ticket.id && (
                    <motion.div
                      layoutId="selected"
                      className="absolute inset-0 border-2 border-orange-500 rounded-lg pointer-events-none"
                    />
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTicketStatus(ticket.id);
                  }}
                  className="mt-2 w-full py-2 text-sm text-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {ticket.status === 'pending' ? 'Marcar resuelto' : 'Reabrir ticket'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/AgentView.tsx
git commit -m "feat(nexus): add agent view component"
```

---

## Task 12: Create NexusDemo Component

**Files:**
- Create: `src/components/NexusDemo/NexusDemo.tsx`

- [ ] **Step 1: Create NexusDemo**

Create `src/components/NexusDemo/NexusDemo.tsx`:
```typescript
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClientView } from './ClientView';
import { AgentView } from './AgentView';
import { ViewToggle } from './ViewToggle';

type ViewType = 'client' | 'agent';

export default function NexusDemo() {
  const [currentView, setCurrentView] = useState<ViewType>('client');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center justify-end p-4 border-b border-gray-200 bg-white">
        <ViewToggle currentView={currentView} onToggle={setCurrentView} />
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
            className="h-full"
          >
            {currentView === 'client' ? <ClientView /> : <AgentView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/NexusDemo.tsx
git commit -m "feat(nexus): add main NexusDemo component with view transition"
```

---

## Task 13: Create NexusDemoModal Component

**Files:**
- Create: `src/components/NexusDemo/NexusDemoModal.tsx`

- [ ] **Step 1: Create NexusDemoModal**

Create `src/components/NexusDemo/NexusDemoModal.tsx`:
```typescript
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import NexusDemo from './NexusDemo';

interface NexusDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NexusDemoModal({ isOpen, onClose }: NexusDemoModalProps) {
  const [showParticles, setShowParticles] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowParticles(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShowContent(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleParticlesComplete = useCallback(() => {
    setShowParticles(false);
    setShowContent(true);
  }, []);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(onClose, 300);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            style={{ 
              backdropFilter: 'blur(8px)',
            }}
          />
          
          <ParticleBackground 
            isActive={showParticles} 
            onComplete={handleParticlesComplete}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: showContent ? 1 : 0.95, 
              opacity: showContent ? 1 : 0 
            }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="absolute inset-4 md:inset-8 lg:inset-12 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Cerrar demo"
            >
              <X size={20} className="text-gray-700" />
            </button>
            
            <div className="h-full">
              <NexusDemo />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/NexusDemoModal.tsx
git commit -m "feat(nexus): add modal container with particle animation"
```

---

## Task 14: Update Barrel Export

**Files:**
- Modify: `src/components/NexusDemo/index.ts`

- [ ] **Step 1: Update index.ts**

Replace `src/components/NexusDemo/index.ts`:
```typescript
export { NexusDemoModal } from './NexusDemoModal';
export { default as NexusDemo } from './NexusDemo';
export { ClientView } from './ClientView';
export { AgentView } from './AgentView';
export { ChatInterface } from './ChatInterface';
export { TicketCard } from './TicketCard';
export { AnalysisBar } from './AnalysisBar';
export { MetricsPanel } from './MetricsPanel';
export { ViewToggle } from './ViewToggle';
export { ParticleBackground } from './ParticleBackground';
export { ScanReveal } from './ScanReveal';
export * from './mockData';
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/index.ts
git commit -m "feat(nexus): update barrel exports"
```

---

## Task 15: Add Nexus Project to Portfolio

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Read current projects.ts**

Read the current file to understand structure.

- [ ] **Step 2: Add Nexus project**

Add to projects array:
```typescript
{
  id: 'nexus',
  tag: 'IA / ATENCIÓN AL CLIENTE',
  title: 'Nexus - Sistema de Triage IA',
  description: 'Asistente de postventa inteligente que clasifica automáticamente incidencias y genera tickets estructurados. Incluye panel de agente con métricas en tiempo real.',
  image: '/images/nexus-demo.jpg', // or existing placeholder
  demo: true,
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add Nexus project to portfolio"
```

---

## Task 16: Create NexusDemoTrigger Component

**Files:**
- Create: `src/components/NexusDemo/NexusDemoTrigger.tsx`

- [ ] **Step 1: Create trigger component**

Create `src/components/NexusDemo/NexusDemoTrigger.tsx`:
```typescript
import { useState, lazy, Suspense } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const NexusDemoModal = lazy(() => import('./NexusDemoModal').then(m => ({ default: m.NexusDemoModal })));

export function NexusDemoTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-orange-500/25"
      >
        <Play size={18} />
        Probar Demo
      </motion.button>

      <Suspense fallback={null}>
        {isOpen && <NexusDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </Suspense>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NexusDemo/NexusDemoTrigger.tsx
git commit -m "feat(nexus): add demo trigger button component"
```

---

## Task 17: Integrate Trigger in Portfolio

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Find Projects section in App.tsx**

Locate where projects are rendered and where to add the trigger button.

- [ ] **Step 2: Import and integrate**

Add import at top:
```typescript
import { NexusDemoTrigger } from './components/NexusDemo/NexusDemoTrigger';
```

Find Nexus project card and add button:
```typescript
// Inside the Nexus project card/render
<NexusDemoTrigger />
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate Nexus demo trigger in portfolio"
```

---

## Task 18: Test Integration

**Files:**
- Test in browser

- [ ] **Step 1: Run dev server**

Run: `cd portfolio-alejandro-main && npm run dev`
Expected: Server starts on http://localhost:3000

- [ ] **Step 2: Test particle animation**

1. Navigate to Projects section
2. Find Nexus project card
3. Click "Probar Demo"
4. Expected: Particles converge from edges
5. Expected: Modal opens with scan reveal
6. Expected: Demo loads in client view

- [ ] **Step 3: Test chat functionality**

1. Type "quiero hacer una devolución"
2. Expected: Response appears after typing indicator
3. Expected: Analysis bar shows category detected
4. Expected: After 3 messages, ticket generated

- [ ] **Step 4: Test view toggle**

1. Click "Agente" toggle
2. Expected: Smooth rotation transition
3. Expected: Agent dashboard appears with metrics
4. Expected: Tickets listed and clickable

- [ ] **Step 5: Test close modal**

1. Press ESC or click X
2. Expected: Modal closes smoothly
3. Expected: Returns to portfolio

- [ ] **Step 6: Commit**

```bash
git commit -m "test(nexus): verify demo integration" --allow-empty
```

---

## Success Criteria Checklist

- [ ] Modal opens with particle convergence animation
- [ ] Scan line reveals content
- [ ] Client chat responds contextually to keywords
- [ ] Analysis bar updates in real-time
- [ ] Ticket generated after conversation
- [ ] View toggle uses rotation transition
- [ ] Agent dashboard shows metrics
- [ ] Tickets are interactive
- [ ] Modal closes with ESC or X button
- [ ] Responsive on desktop and mobile
- [ ] No API calls made (fully simulated)
- [ ] Matches portfolio color scheme where appropriate

---

## Post-Implementation Notes

### Performance Optimizations Applied
- Lazy load modal component
- Particles cleanup after animation
- Memoized category calculations
- GPU-accelerated animations (transform/opacity)

### Future Enhancements (Optional)
- Sound effects toggle
- More complex AI responses
- Persistence with localStorage
- Export conversation as JSON
