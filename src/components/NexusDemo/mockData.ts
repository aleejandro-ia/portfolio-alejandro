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
