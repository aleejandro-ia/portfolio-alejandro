import { Message, TriageResponse } from "../types";

export async function triageConversation(messages: Message[]): Promise<TriageResponse> {
  const response = await fetch("/api/triage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error || "No se pudo procesar el triaje en este momento."
    );
  }

  return response.json();
}

export function isGeminiConfigured(): boolean {
  return true;
}

export async function testGeminiConnection(): Promise<boolean> {
  try {
    const response = await fetch("/api/triage/health");
    return response.ok;
  } catch (error) {
    console.error("Test de conexión fallido:", error);
    return false;
  }
}
