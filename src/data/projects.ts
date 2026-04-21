export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  demo?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    tag: "IA / OPTIMIZACIÓN",
    title: "Asistente de IA para optimización de procesos internos",
    description:
      "Sistema analítico para auditar procesos, detectar cuellos de botella y proponer mejoras automatizadas.",
    image: "https://picsum.photos/seed/ai-process/800/600",
  },
  {
    id: "02",
    tag: "IA APLICADA / SISTEMA INTERNO",
    title: "Automatización CRM para gestión administrativa",
    description:
      "Integración de flujos de trabajo para sincronizar datos contables y operativos eliminando la carga manual.",
    image: "https://picsum.photos/seed/crm-auto/800/600",
  },
  {
    id: "03",
    tag: "GESTIÓN DE CONOCIMIENTO / IA PROCESAMIENTO",
    title: "Plataforma de vídeo a conocimiento accionable",
    description:
      "Pipeline de NLP para transformar contenido multimedia en resúmenes estructurados y metadatos ejecutables.",
    image: "https://picsum.photos/seed/video-knowledge/800/600",
  },
  {
    id: "nexus",
    tag: "IA / ATENCIÓN AL CLIENTE",
    title: "Nexus - Sistema de Triage IA",
    description:
      "Asistente de postventa inteligente que clasifica automáticamente incidencias y genera tickets estructurados. Incluye panel de agente con métricas en tiempo real.",
    image: "https://picsum.photos/seed/nexus-demo/800/600",
    demo: true,
  },
];
