/**
 * Google Gemini API Client
 * Sistema de Triaje Nexus con IA para clasificación de incidencias
 * 
 * CARACTERÍSTICAS:
 * - Retry logic con backoff exponencial para rate limits
 * - System instruction detallado para comportamiento consistente
 * - Validación y completado automático de respuestas
 */

import { Message, TriageResponse } from "../types";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

/**
 * System Instruction - Define el comportamiento completo del chatbot
 */
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
- Si el usuario dice "no lo tengo" o "no sé", ACEPТАLO y continúa
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

# EJEMPLOS DE COMPORTAMIENTO

## Ejemplo 1 - Devolución simple
Usuario: "Quiero devolver un vestido"
→ category: "Devolución"
→ isComplete: false
→ missingInfo: ["número de pedido"]
→ nextQuestion: "¿Podría indicarme el número de pedido del vestido que desea devolver?"

## Ejemplo 2 - Caso completo
Usuario: "Quiero devolver el pedido ORD-12345, una camisa que llegó rota"
→ category: "Devolución"
→ orderNumber: "ORD-12345"
→ items: ["camisa"]
→ reason: "producto dañado"
→ isComplete: true
→ nextQuestion: "He registrado su devolución. Recibirá un email con las instrucciones en breves minutos."

## Ejemplo 3 - Caso mixto
Usuario: "Mi pedido llegó tarde y además el producto está roto"
→ category: "Mixto"
→ subIncidents: [
    {category: "Problema de Entrega", reason: "retraso"},
    {category: "Devolución", reason: "producto dañado"}
  ]
→ isComplete: false
→ nextQuestion: "Entiendo. ¿Podría darme el número de pedido para gestionar ambas incidencias?"

# FORMATO DE SALIDA
- Responde ÚNICAMENTE con JSON válido
- NO uses markdown (sin \`\`\`)
- NO incluyas texto antes ni después del JSON
- El JSON debe ser parseable directamente
`;

/**
 * Función de delay para retry con backoff exponencial
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Función principal de triaje con retry logic
 * Analiza la conversación y devuelve una respuesta estructurada
 */
export async function triageConversation(messages: Message[]): Promise<TriageResponse> {
  // Construir contexto de conversación
  const conversationHistory = messages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  const maxRetries = 3;
  const baseDelay = 1500; // 1.5 segundos base

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
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
        console.error("Gemini API Error:", response.status, errorData);
        
        if (response.status === 429) {
          // Rate limit - retry con backoff exponencial
          if (attempt < maxRetries) {
            const delayTime = baseDelay * Math.pow(2, attempt - 1); // 1.5s, 3s, 6s
            console.log(`⚠️ Rate limit (intento ${attempt}/${maxRetries}). Reintentando en ${delayTime}ms...`);
            await delay(delayTime);
            continue;
          } else {
            throw new Error("Límite de peticiones alcanzado. Por favor, espera 10 segundos e inténtalo de nuevo.");
          }
        } else if (response.status === 400) {
          throw new Error("Error en la solicitud. Verifica el formato del mensaje.");
        } else if (response.status === 403) {
          throw new Error("API Key inválida. Contacta con el administrador.");
        } else {
          throw new Error(`Error de Gemini (${response.status}). Reintentando...`);
        }
      }

      const data = await response.json();
      
      // Extraer contenido de la respuesta
      const candidates = data.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error("No hay respuesta de la IA");
      }

      const content = candidates[0]?.content?.parts?.[0]?.text;
      if (!content) {
        throw new Error("Contenido vacío en la respuesta");
      }

      // Parsear JSON
      let result: TriageResponse;
      try {
        result = JSON.parse(content);
      } catch (parseError) {
        console.error("Error parseando JSON:", content);
        throw new Error("La IA no devolvió JSON válido");
      }

      // Validar y completar campos requeridos
      return validateAndCompleteResponse(result);

    } catch (error) {
      // Si es el último intento, devolver error response
      if (attempt === maxRetries) {
        console.error("❌ Error después de", maxRetries, "intentos:", error);
        return getErrorResponse(error);
      }
      // Si no, el loop continúa para el próximo intento
    }
  }

  // Fallback por si algo sale mal en el loop
  return getErrorResponse(new Error("Error en la comunicación con la IA"));
}

/**
 * Valida y completa la respuesta de la IA
 */
function validateAndCompleteResponse(response: Partial<TriageResponse>): TriageResponse {
  const validated: TriageResponse = {
    category: response.category || 'Ambiguo',
    isComplete: response.isComplete || false,
    completenessScore: response.completenessScore || 0,
    missingInfo: response.missingInfo || [],
    summary: response.summary || 'Sin resumen disponible',
    aiInterpretation: response.aiInterpretation || 'No se pudo generar interpretación',
    items: response.items || [],
    nextQuestion: response.nextQuestion,
    orderNumber: response.orderNumber,
    alternativeIdentifier: response.alternativeIdentifier,
    identificationType: response.identificationType,
    reason: response.reason,
    subIncidents: response.subIncidents || [],
  };

  // Calcular completenessScore si no existe
  if (!response.completenessScore) {
    validated.completenessScore = calculateCompleteness(validated);
  }

  return validated;
}

/**
 * Calcula el score de completitud basado en los campos presentes
 */
function calculateCompleteness(ticket: Partial<TriageResponse>): number {
  let score = 0;

  // Categoría (20 puntos)
  if (ticket.category && ticket.category !== 'Ambiguo') score += 20;

  // Identificación (20 puntos)
  if (ticket.orderNumber || ticket.alternativeIdentifier) score += 20;

  // Items (15 puntos)
  if (ticket.items && ticket.items.length > 0) score += 15;

  // Reason (15 puntos)
  if (ticket.reason) score += 15;

  // Summary (15 puntos)
  if (ticket.summary && ticket.summary.length > 10) score += 15;

  // AI Interpretation (15 puntos)
  if (ticket.aiInterpretation && ticket.aiInterpretation.length > 10) score += 15;

  // Restar puntos si hay missingInfo
  if (ticket.missingInfo && ticket.missingInfo.length > 0) {
    score -= Math.min(ticket.missingInfo.length * 10, 30);
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Devuelve una respuesta de error amigable
 */
function getErrorResponse(error: any): TriageResponse {
  const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  
  return {
    category: 'Ambiguo',
    isComplete: false,
    completenessScore: 0,
    missingInfo: [errorMessage],
    summary: "Error al procesar la conversación",
    aiInterpretation: `Error técnico: ${errorMessage}`,
    items: [],
    nextQuestion: "Ha ocurrido un error técnico. ¿Podría describir su incidencia de nuevo?",
  };
}

/**
 * Función de utilidad para verificar si la API está configurada
 */
export function isGeminiConfigured(): boolean {
  return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 10;
}

/**
 * Función de test para verificar conexión con la API
 */
export async function testGeminiConnection(): Promise<boolean> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Responde solo con 'OK'" }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 10,
          },
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Test de conexión fallido:", error);
    return false;
  }
}
