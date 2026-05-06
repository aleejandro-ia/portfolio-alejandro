import type { StructuredTicket } from "../types";

export const INITIAL_TICKETS: StructuredTicket[] = [
  {
    id: 'TK-3312',
    orderNumber: 'ORD-11204',
    identificationType: 'Nº Pedido',
    category: 'Mixto',
    priority: 'medium',
    subIncidents: [
      {
        category: 'Devolución',
        items: ['Vestido Floral Seda'],
        reason: 'Producto dañado',
        details: { 'Estado': 'Con tara', 'Ubicación': 'Costura lateral' },
        summary: 'Vestido con costura lateral descosida.',
        status: 'unresolved'
      },
      {
        category: 'Facturación/Pago',
        items: [],
        reason: 'Cargo duplicado',
        details: { 'Importe': '89.90€', 'Fecha cargo': '12/04' },
        summary: 'Doble cargo en tarjeta bancaria por el mismo importe.',
        status: 'unresolved'
      }
    ],
    items: ['Vestido Floral Seda'],
    reason: 'Vestido roto y doble cargo en el banco',
    isComplete: true,
    completenessScore: 100,
    missingInfo: [],
    summary: 'Solicitud de devolución por tara y reclamación por cargo duplicado.',
    aiInterpretation: 'El cliente reporta un defecto de fabricación en una prenda y solicita la revisión de un posible error en la facturación del pedido (cargo duplicado).',
    originalConversation: [
      { id: '1', role: 'assistant', content: 'Hola, ¿en qué puedo ayudarte?', timestamp: new Date(Date.now() - 7200000) },
      { id: '2', role: 'user', content: 'He recibido el vestido pero viene con un descosido en el lateral. Además, he visto que me habéis cobrado dos veces el mismo pedido.', timestamp: new Date(Date.now() - 7100000) },
    ],
    createdAt: new Date(Date.now() - 7200000),
    status: 'unresolved',
  },
  {
    id: 'TK-3314',
    orderNumber: 'ORD-11215',
    identificationType: 'Nº Pedido',
    category: 'Consulta General',
    priority: 'medium',
    items: ['Bolso Piel Negro'],
    reason: 'Paquete no entregado',
    isComplete: true,
    completenessScore: 100,
    missingInfo: [],
    summary: 'Reclamación por pedido no recibido que figura como entregado.',
    aiInterpretation: 'El paquete consta como entregado en el sistema logístico, pero el cliente afirma no haberlo recibido y solicita una solución inmediata o reembolso.',
    originalConversation: [
      { id: '1', role: 'user', content: 'Mi pedido de un bolso aparece como entregado pero no he recibido nada. Quiero que me devolváis el dinero ya.', timestamp: new Date(Date.now() - 5400000) }
    ],
    createdAt: new Date(Date.now() - 5400000),
    status: 'resolved',
  },
  {
    id: 'TK-3311',
    orderNumber: 'ORD-11198',
    identificationType: 'Nº Pedido',
    category: 'Devolución',
    priority: 'medium',
    items: ['Zapatillas Runner Pro'],
    reason: 'Talla pequeña',
    isComplete: true,
    completenessScore: 100,
    missingInfo: [],
    summary: 'Devolución de calzado por problemas de ajuste (talla pequeña).',
    aiInterpretation: 'Solicitud estándar de devolución de un par de zapatillas debido a que la talla no se ajusta al cliente.',
    originalConversation: [],
    createdAt: new Date(Date.now() - 3600000),
    status: 'unresolved',
  },
  {
    id: 'TK-3313',
    orderNumber: 'ORD-11210',
    identificationType: 'Correo Electrónico',
    category: 'Cambio/Reemplazo',
    priority: 'medium',
    items: ['Camisa Oxford'],
    reason: 'Cambio de color/talla',
    alternativeIdentifier: 'cliente@ejemplo.com',
    subIncidents: [
      {
        category: 'Cambio/Reemplazo',
        items: ['Camisa Oxford'],
        details: { 'Talla recibida': 'L' },
        summary: 'Cambio de camisa por talla/color incorrecto.',
        status: 'unresolved'
      }
    ],
    isComplete: false,
    completenessScore: 65,
    missingInfo: ['Nueva talla/color deseado'],
    summary: 'El cliente quiere cambiar una camisa pero no ha especificado la nueva opción.',
    aiInterpretation: 'Intención de realizar un cambio de producto detectada. Se requiere confirmar por qué talla o color exacto desea realizar el intercambio.',
    originalConversation: [
      { id: '1', role: 'user', content: 'Quiero cambiar la camisa que me llegó ayer, el color no es lo que esperaba.', timestamp: new Date(Date.now() - 1800000) }
    ],
    createdAt: new Date(Date.now() - 1800000),
    status: 'unresolved',
  }
];
