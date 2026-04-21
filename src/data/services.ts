import type { LucideIcon } from "lucide-react";
import { Cpu, Zap, Code, Database } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Arquitectura de prompts",
    description:
      "Ingeniería avanzada para maximizar el potencial de los LLMs en entornos corporativos.",
    icon: Cpu,
  },
  {
    title: "Automatización de procesos",
    description:
      "Diseño de flujos de trabajo inteligentes para eliminar la carga operativa y ahorrar tiempo.",
    icon: Zap,
  },
  {
    title: "Soluciones no-code / low-code",
    description:
      "Desarrollo ágil de herramientas personalizadas sin las barreras del desarrollo tradicional.",
    icon: Code,
  },
  {
    title: "Asistentes y sistemas RAG",
    description:
      "Creación de ecosistemas digitales que aprenden, responden y evolucionan con su negocio.",
    icon: Database,
  },
];
