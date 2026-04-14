# Estructura del Proyecto

## Árbol de Archivos

```
alejandroportfolio/
├── skills/                      # 📚 Documentación técnica (este directorio)
│   ├── README.md
│   ├── configuracion.md
│   ├── estructura-proyecto.md
│   ├── componentes-react.md
│   ├── animaciones-motion.md
│   ├── estilos-tailwind.md
│   ├── shader-webgl.md
│   ├── secciones-ui.md
│   ├── patrones-codigo.md
│   ├── typescript-guia.md
│   ├── comandos-npm.md
│   └── optimizacion.md
│
├── src/                         # 🎨 Código fuente
│   ├── main.tsx                 # Entry point de la aplicación
│   ├── App.tsx                  # Componente principal
│   ├── index.css                # Estilos globales y Tailwind
│   └── components/              # Componentes React
│       ├── ShaderAnimation.tsx  # Fondo animado WebGL
│       └── ui/                  # Componentes UI reutilizables
│           ├── timeline-animation.tsx  # Animaciones scroll
│           └── ZoomParallax.tsx  # Parallax con zoom
│
├── public/                      # Archivos estáticos (si los hubiera)
│
├── index.html                   # HTML entry point
├── package.json                 # Dependencias y scripts
├── package-lock.json            # Lockfile de npm
├── tsconfig.json                # Configuración TypeScript
├── vite.config.ts               # Configuración Vite
├── .env.example                 # Ejemplo variables de entorno
├── .gitignore                   # Archivos ignorados por Git
├── metadata.json                # Metadatos del proyecto
└── README.md                    # Documentación general
```

## Organización de Componentes

### Componentes Principales (`src/`)

#### `App.tsx`
- **Responsabilidad:** Componente raíz, layout principal, estado global
- **Contiene:** Header, Hero, Parallax, About, Projects, CTA, Footer
- **Estado:** `isMenuOpen`, refs de secciones
- **Dependencias:** Todos los componentes UI

#### `main.tsx`
- **Responsabilidad:** Punto de entrada de React
- **Contiene:** Renderizado con `StrictMode`
- **Importa:** `App.tsx`, `index.css`

### Componentes de UI (`src/components/`)

#### `ShaderAnimation.tsx`
- **Tipo:** Efecto visual de fondo
- **Tecnología:** Three.js + WebGL shaders
- **Posición:** Fixed, z-index -10 (detrás de todo)

#### `ui/timeline-animation.tsx`
- **Tipo:** Componente de animación
- **Tecnología:** Framer Motion + useInView
- **Uso:** Envolver elementos para animar al hacer scroll

#### `ui/ZoomParallax.tsx`
- **Tipo:** Efecto parallax con zoom
- **Tecnología:** Framer Motion useScroll + useTransform
- **Uso:** Sección de scroll intermedio entre hero y contenido

## Convenciones de Nomenclatura

### Archivos
- **Componentes React:** `PascalCase.tsx` (ej: `ShaderAnimation.tsx`)
- **Hooks:** `useNombre.ts` (si se crean en el futuro)
- **Utilidades:** `kebab-case.ts` (si se crean en el futuro)

### Componentes
- **Nombres:** `PascalCase` (ej: `TimelineContent`, `ZoomParallax`)
- **Props interfaces:** `NombreComponentProps` (ej: `TimelineContentProps`)

### Variables y Funciones
- **Variables:** `camelCase` (ej: `isMenuOpen`, `scrollYProgress`)
- **Constantes:** `camelCase` para objetos/arrays (ej: `services`, `projects`)
- **Funciones:** `camelCase` (ej: `handleClickOutside`, `onWindowResize`)

### Clases CSS (Tailwind)
- **Orden:** Layout → Espaciado → Tipografía → Visual → Interacción
- **Ejemplo:** `flex items-center justify-between gap-4 px-6 py-3 text-white`

## Imports y Estructura de Archivos

### Orden de Imports en Componentes
```typescript
// 1. React y hooks
import React, { useState, useEffect, useRef, useMemo } from "react";

// 2. Bibliotecas externas
import { motion } from "motion/react";
import { ArrowRight, Cpu } from "lucide-react";

// 3. Componentes internos
import { ShaderAnimation } from "./components/ShaderAnimation";

// 4. Tipos e interfaces
interface MyComponentProps { ... }

// 5. Constantes/datos
const data = [ ... ];

// 6. Componente principal
export default function MyComponent() { ... }
```

## Separación de Responsabilidades

| Capa | Ubicación | Responsabilidad |
|------|-----------|-----------------|
| **Entry Point** | `src/main.tsx` | Inicialización de React |
| **App Root** | `src/App.tsx` | Layout, estado, routing |
| **Componentes** | `src/components/` | UI y lógica de presentación |
| **UI Primitives** | `src/components/ui/` | Componentes reutilizables |
| **Estilos** | `src/index.css` | Tailwind, variables CSS, utilidades |
| **Config** | Root | Vite, TypeScript, npm |
