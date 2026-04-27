import type { Message, TriageResponse } from "../src/components/NexusDemo/types";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1500;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_INSTRUCTION = `
# ROL Y CONTEXTO
Eres el asistente virtual de "Nexus", un sistema inteligente de triaje y clasificación de incidencias multi-dominio.
Tu propósito es RECOPILAR INFORMACIÓN de forma estructurada para generar tickets que el equipo de soporte pueda resolver.

# DOMINIOS QUE SOPORTAS
1. E-commerce: devoluciones, cambios, errores de entrega, productos dañados
2. Soporte Técnico: problemas de software, hardware, configuración, errores de sistema
3. Facturación/Pagos: cargos duplicados, reembolsos, problemas con tarjetas, facturación
4. Consultas Generales: información sobre productos, servicios, políticas, estado de pedidos

# COMPORTAMIENTO ESPERADO

## Tono y Estilo
- Profesional, directo y educado
- Eficiente pero empático
- NO uses lenguaje excesivamente técnico
- NO seas demasiado "amigable" o genérico
- Ve directo al grano

## Flujo de Conversación
1. ESCUCHA activamente lo que dice el usuario
2. IDENTIFICA el dominio y categoría principal
3. RECOPILA datos faltantes de forma SECUENCIAL (una pregunta a la vez)
4. VALIDA que tienes información suficiente
5. CIERRA el ticket cuando tengas lo necesario

## Reglas de Oro
- NUNCA inventes información
- Si el usuario dice "no lo tengo" o "no sé", ACÉPTALO y continúa
- NO hagas múltiples preguntas a la vez (máximo 2)
- NUNCA uses preguntas vagas como "¿Algo más?" o "¿En qué más puedo ayudarte?"
- SIEMPRE confirma que el caso queda registrado al finalizar

# ESTRUCTURA DE RESPUESTA

Debes responder SIEMPRE con un objeto JSON válido con esta estructura:

{
  "category": "categoría principal de la incidencia",
  "isComplete": true/false,
  "completenessScore": 0-100,
  "missingInfo": ["lista de datos faltantes"],
  "summary": "resumen ejecutivo de 1-2 frases",
  "aiInterpretation": "análisis técnico interno de la situación",
  "nextQuestion": "pregunta concreta si faltan datos, O mensaje de cierre si está completo",
  "orderNumber": "número de pedido/referencia si existe",
  "alternativeIdentifier": "email/teléfono si existe",
  "identificationType": "tipo de identificación proporcionada",
  "items": ["productos/items afectados"],
  "reason": "motivo principal de la incidencia",
  "subIncidents": [
    {
      "category": "categoría específica",
      "items": ["items afectados"],
      "reason": "motivo",
      "summary": "resumen de esta incidencia",
      "details": {"clave": "valor"}
    }
  ]
}

# CATEGORÍAS VÁLIDAS
- "Devolución"
- "Cambio/Reemplazo"
- "Error Técnico"
- "Facturación/Pago"
- "Soporte Técnico"
- "Consulta General"
- "Problema de Entrega"
- "Mixto" (cuando hay múltiples incidencias)
- "Ambiguo" (cuando no está claro)

# CRITERIOS DE CIERRE (isComplete: true)

Un ticket está COMPLETO cuando:
1. Tienes la categoría clara
2. Tienes identificación (pedido, email, teléfono) O el usuario confirmó que no la tiene
3. Tienes los items afectados (si aplica)
4. Tienes el motivo/reason claro
5. NO quedan datos críticos pendientes

Cuando el ticket esté completo:
- isComplete = true
- completenessScore = 80-100
- nextQuestion = mensaje profesional confirmando que el caso queda registrado
  Ejemplo: "He registrado su incidencia correctamente. Nuestro equipo de soporte la revisará y contactará con usted en menos de 24 horas."

# GESTIÓN DE CASOS MIXTOS

Si detectas MÚLTIPLES problemas (ej: producto dañado + cargo duplicado):
1. Registra cada uno como subIncident
2. Pregunta por cada incidencia de forma SECUENCIAL
3. No pases a la siguiente hasta completar la anterior
4. category principal = "Mixto"

# FORMATO DE SALIDA
- Responde ÚNICAMENTE con JSON válido
- NO uses markdown
- NO incluyas texto antes ni después del JSON
- El JSON debe ser parseable directamente
`;

interface GeminiTriageOptions {
  apiKey: string;
  model?: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeMessages(messages: Message[]) {
  // 1. Find the first user message (Gemini requires starting with 'user')
  const firstUserIndex = messages.findIndex((m) => m.role === "user");
  if (firstUserIndex === -1) {
    // If there are no user messages, provide a dummy one to avoid API errors
    return [{
      role: "user",
      parts: [{ text: "Hola" }]
    }];
  }

  const validMessages = messages.slice(firstUserIndex);

  // 2. Enforce alternating roles by grouping consecutive messages
  const alternatingMessages: { role: string; content: string }[] = [];
  
  for (const msg of validMessages) {
    const role = msg.role === "user" ? "user" : "model";
    
    if (alternatingMessages.length === 0) {
      alternatingMessages.push({ role, content: msg.content });
    } else {
      const lastMsg = alternatingMessages[alternatingMessages.length - 1];
      if (lastMsg.role === role) {
        // Group consecutive messages of the same role
        lastMsg.content += `\n${msg.content}`;
      } else {
        alternatingMessages.push({ role, content: msg.content });
      }
    }
  }

  return alternatingMessages.slice(-MAX_MESSAGES).map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
      },
    ],
  }));
}

function calculateCompleteness(ticket: Partial<TriageResponse>): number {
  let score = 0;

  if (ticket.category && ticket.category !== "Ambiguo") score += 20;
  if (ticket.orderNumber || ticket.alternativeIdentifier) score += 20;
  if (ticket.items && ticket.items.length > 0) score += 15;
  if (ticket.reason) score += 15;
  if (ticket.summary && ticket.summary.length > 10) score += 15;
  if (ticket.aiInterpretation && ticket.aiInterpretation.length > 10) score += 15;

  if (ticket.missingInfo && ticket.missingInfo.length > 0) {
    score -= Math.min(ticket.missingInfo.length * 10, 30);
  }

  return Math.max(0, Math.min(100, score));
}

function validateAndCompleteResponse(response: Partial<TriageResponse>): TriageResponse {
  const validated: TriageResponse = {
    category: response.category || "Ambiguo",
    isComplete: response.isComplete || false,
    completenessScore: response.completenessScore || 0,
    missingInfo: response.missingInfo || [],
    summary: response.summary || "Sin resumen disponible",
    aiInterpretation: response.aiInterpretation || "No se pudo generar interpretación",
    items: response.items || [],
    nextQuestion: response.nextQuestion,
    orderNumber: response.orderNumber,
    alternativeIdentifier: response.alternativeIdentifier,
    identificationType: response.identificationType,
    reason: response.reason,
    subIncidents: response.subIncidents || [],
  };

  if (!response.completenessScore) {
    validated.completenessScore = calculateCompleteness(validated);
  }

  return validated;
}

function getErrorResponse(error: unknown): TriageResponse {
  const errorMessage = error instanceof Error ? error.message : "Error desconocido";

  return {
    category: "Ambiguo",
    isComplete: false,
    completenessScore: 0,
    missingInfo: [errorMessage],
    summary: "Error al procesar la conversación",
    aiInterpretation: `Error técnico: ${errorMessage}`,
    items: [],
    nextQuestion: "Ha ocurrido un error técnico. ¿Podría describir su incidencia de nuevo?",
  };
}

export async function triageConversationWithGemini(
  messages: Message[],
  options: GeminiTriageOptions
): Promise<TriageResponse> {
  const conversationHistory = sanitizeMessages(messages);
  const model = options.model || DEFAULT_GEMINI_MODEL;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${options.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            contents: conversationHistory,
            generationConfig: {
              temperature: 0.1,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 429 && attempt < MAX_RETRIES) {
          await delay(BASE_DELAY_MS * Math.pow(2, attempt - 1));
          continue;
        }

        if (response.status === 403) {
          throw new Error("La clave de Gemini no es válida.");
        }

        throw new Error(
          `Gemini devolvió ${response.status}${errorData?.error?.message ? `: ${errorData.error.message}` : ""}`
        );
      }

      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error("Gemini no devolvió contenido.");
      }

      const parsed = JSON.parse(content) as Partial<TriageResponse>;
      return validateAndCompleteResponse(parsed);
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        return getErrorResponse(error);
      }
    }
  }

  return getErrorResponse(new Error("No se pudo completar el triaje."));
}

export function hasGeminiConfig(apiKey?: string | null): boolean {
  return Boolean(apiKey && apiKey.trim().length > 10);
}
