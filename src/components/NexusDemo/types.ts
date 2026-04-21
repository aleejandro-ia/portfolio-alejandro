/**
 * Nexus Triage - Tipos TypeScript
 * Sistema de triaje multi-dominio con IA
 */

export type TicketCategory =
  | 'Devolución'
  | 'Cambio/Reemplazo'
  | 'Error Técnico'
  | 'Facturación/Pago'
  | 'Soporte Técnico'
  | 'Consulta General'
  | 'Problema de Entrega'
  | 'Mixto'
  | 'Ambiguo';

export type TicketStatus = 'unresolved' | 'resolved';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SubIncident {
  category: TicketCategory;
  items: string[];
  reason?: string;
  details?: Record<string, string>;
  summary: string;
  status: TicketStatus;
}

export interface StructuredTicket {
  id: string;
  orderNumber?: string;
  alternativeIdentifier?: string;
  identificationType?: string;
  category: TicketCategory;
  priority: TicketPriority;
  subIncidents?: SubIncident[];
  items: string[];
  reason?: string;
  isComplete: boolean;
  completenessScore: number;
  missingInfo: string[];
  summary: string;
  aiInterpretation: string;
  originalConversation: Message[];
  createdAt: Date;
  status: TicketStatus;
}

export interface TriageResponse {
  category: TicketCategory;
  subIncidents?: SubIncident[];
  orderNumber?: string;
  alternativeIdentifier?: string;
  identificationType?: string;
  items: string[];
  reason?: string;
  isComplete: boolean;
  completenessScore: number;
  missingInfo: string[];
  summary: string;
  aiInterpretation: string;
  nextQuestion?: string;
}
