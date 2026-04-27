import { Message, TriageResponse } from "../types";

const MAX_CLIENT_MESSAGES = 10;
const MAX_CLIENT_MESSAGE_LENGTH = 1500;

type TriageRequestMessage = Pick<Message, "id" | "role" | "content">;

function buildTriagePayload(messages: Message[]): { messages: TriageRequestMessage[] } {
  const recentMessages = messages
    .filter((message) => message && typeof message.content === "string" && typeof message.role === "string")
    .slice(-MAX_CLIENT_MESSAGES)
    .map((message) => ({
      id: String(message.id),
      role: message.role,
      content: message.content.trim().slice(0, MAX_CLIENT_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0);

  return { messages: recentMessages };
}

async function readApiPayload(response: Response): Promise<unknown> {
  const raw = await response.text();

  if (!raw.trim()) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function getApiErrorMessage(response: Response, payload: unknown): string {
  if (payload && typeof payload === "object") {
    const errorPayload = payload as { error?: string | { message?: string }; message?: string };

    if (typeof errorPayload.error === "string" && errorPayload.error.trim()) {
      return errorPayload.error;
    }

    if (errorPayload.error && typeof errorPayload.error === "object" && typeof errorPayload.error.message === "string") {
      return errorPayload.error.message;
    }

    if (typeof errorPayload.message === "string" && errorPayload.message.trim()) {
      return errorPayload.message;
    }
  }

  if (typeof payload === "string") {
    if (/server error has occurred/i.test(payload)) {
      return "El servidor de Nexus ha fallado al procesar la solicitud. Vuelve a intentarlo en unos segundos.";
    }

    if (/<\/?[a-z][\s\S]*>/i.test(payload)) {
      return `El servidor devolvió un error ${response.status} sin detalles legibles.`;
    }
  }

  return "No se pudo procesar el triaje en este momento.";
}

export async function triageConversation(messages: Message[]): Promise<TriageResponse> {
  const response = await fetch("/api/triage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildTriagePayload(messages)),
  });

  const payload = await readApiPayload(response);

  if (!response.ok) {
    throw new Error(getApiErrorMessage(response, payload));
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("El servidor de Nexus respondió con un formato inválido.");
  }

  return payload as TriageResponse;
}

export function isGeminiConfigured(): boolean {
  return true;
}

export async function testGeminiConnection(): Promise<boolean> {
  try {
    const response = await fetch("/api/triage/health");
    if (!response.ok) {
      return false;
    }

    const payload = await readApiPayload(response);
    return Boolean(payload && typeof payload === "object" && "ok" in payload && (payload as { ok?: boolean }).ok);
  } catch (error) {
    console.error("Test de conexión fallido:", error);
    return false;
  }
}
