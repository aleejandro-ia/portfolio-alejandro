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
    let errorMessage = "No se pudo procesar el triaje en este momento.";
    if (errorData) {
      if (typeof errorData.error === "string") {
        errorMessage = errorData.error;
      } else if (errorData.error && typeof errorData.error.message === "string") {
        errorMessage = errorData.error.message;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else {
        errorMessage = JSON.stringify(errorData);
      }
    }
    throw new Error(errorMessage);
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
