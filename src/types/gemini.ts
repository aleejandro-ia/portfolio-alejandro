export interface GeminiMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GeminiResponse {
  text: string;
  timestamp: Date;
}

export interface GeminiConfig {
  apiKey: string;
  modelName?: string;
}
