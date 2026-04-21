/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
