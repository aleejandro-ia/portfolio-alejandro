# Guía Completa del Proyecto - Portfolio Alejandro López

> **Documento de referencia principal** para Qwen Code y cualquier desarrollador que trabaje en este proyecto.

---

## 📋 Resumen Ejecutivo

### ¿De qué va este proyecto?

Este es el **portfolio profesional de Alejandro López**, un experto en **sistemas inteligentes, automatización y arquitectura de IA** para negocios reales. El sitio web es una **Single Page Application (SPA)** moderna con animaciones avanzadas, efectos visuales WebGL y un diseño dark-mode profesional.

### Objetivo del Portfolio

Mostrar los servicios y proyectos de Alejandro López como:
- **AI Solutions Architect**
- **Especialista en Prompt Engineering**
- **Experto en Automatización de Procesos**
- **Desarrollador de Sistemas RAG e IA Aplicada**

### Filosofía de Diseño

- **Dark Mode Permanente**: Siempre oscuro, con acentos en verde neón (#D4FF00)
- **Animation-First**: Las animaciones son parte integral de la experiencia de usuario
- **Mobile-First**: Responsive design con breakpoints standard
- **Minimalista pero Impactante**: Tipografía grande, espaciado generoso, efectos visuales sutiles

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico Completo

| Categoría | Tecnología | Versión | Propósito |
|-----------|-----------|---------|-----------|
| **Framework UI** | React | 19.0.0 | Biblioteca principal de componentes |
| **Lenguaje** | TypeScript | ~5.8.2 | Tipado estático |
| **Build Tool** | Vite | 6.2.0 | Bundler y dev server |
| **Estilos** | Tailwind CSS | 4.1.14 | Framework CSS utility-first |
| **Animaciones** | Motion (Framer Motion) | 12.23.24 | Animaciones declarativas |
| **WebGL/3D** | Three.js | 0.183.2 | Gráficos 3D y shaders |
| **Iconos** | Lucide React | 0.546.0 | Biblioteca de iconos |
| **AI API** | @google/genai | 1.29.0 | SDK Gemini AI (preparado) |
| **Server** | Express | 4.21.2 | Framework web (backend opcional) |

### Patrón de Arquitectura

```
┌─────────────────────────────────────────────────┐
│                 Patrón General                   │
├─────────────────────────────────────────────────┤
│ Component-Based Architecture                     │
│ Single Page Application (SPA)                    │
│ Animation-First UX                               │
│ Mobile-First Responsive                          │
│ No Routing (todo en una página con scroll)       │
└─────────────────────────────────────────────────┘
```

---

## 📁 Estructura Completa del Proyecto

```
alejandroportfolio/
│
├── skills/                              # 📚 Documentación técnica detallada
│   ├── README.md                        # Índice de skills
│   ├── configuracion.md                 # Setup y configuración
│   ├── estructura-proyecto.md           # Organización de archivos
│   ├── componentes-react.md             # Componentes React
│   ├── animaciones-motion.md            # Framer Motion
│   ├── estilos-tailwind.md              # Tailwind CSS
│   ├── shader-webgl.md                  # Three.js y WebGL
│   ├── secciones-ui.md                  # Secciones del portfolio
│   ├── patrones-codigo.md               # Patrones reutilizables
│   ├── typescript-guia.md               # Guía TypeScript
│   ├── comandos-npm.md                  # Comandos npm
│   └── optimizacion.md                  # Rendimiento
│
├── src/                                 # 🎨 Código fuente
│   ├── main.tsx                         # Entry point de React
│   ├── App.tsx                          # Componente principal (REFACTORIZADO)
│   ├── vite-env.d.ts                    # Ambient types para Vite
│   ├── index.css                        # Estilos globales + Tailwind
│   │
│   ├── constants/                       # 🎨 Constantes centralizadas (NUEVO)
│   │   ├── colors.ts                    # Paleta de colores
│   │   ├── fonts.ts                     # Fuentes
│   │   └── index.ts                     # Barrel export
│   │
│   ├── data/                            # 📊 Datos estáticos (NUEVO)
│   │   ├── services.ts                  # Array de servicios
│   │   ├── projects.ts                  # Array de proyectos
│   │   └── parallax.ts                  # Datos de parallax
│   │
│   ├── hooks/                           # 🎣 Custom hooks (NUEVO)
│   │   ├── useClickOutside.ts           # Detectar clicks fuera
│   │   ├── useContactForm.ts            # Lógica de formulario
│   │   ├── useMenu.ts                   # Lógica de menú
│   │   └── useBlurText.ts               # Lógica de animación blur
│   │
│   ├── types/                           # 📋 Tipos TypeScript (NUEVO)
│   │   ├── forms.ts                     # Tipos de formulario
│   │   └── gemini.ts                    # Tipos de Gemini API
│   │
│   ├── utils/                           # 🔧 Utilidades (NUEVO)
│   │   └── validation.ts                # Validación de formulario
│   │
│   └── components/                      # 🧩 Componentes React
│       ├── Hero/                        # 🎬 Sección Hero (NUEVO)
│       │   └── BlurText.tsx             # Componente BlurText
│       │
│       ├── Navigation/                  # 🧭 Navegación (NUEVO)
│       │   └── Navigation.tsx           # Componente menú
│       │
│       ├── Contact/                     # 📧 Contacto (NUEVO)
│       │   └── ContactForm.tsx          # Formulario de contacto
│       │
│       ├── Animations/                  # ✨ Animaciones (NUEVO)
│       │   └── ShaderAnimation.tsx      # Fondo WebGL
│       │
│       └── ui/                          # 🎨 Componentes base
│           ├── timeline-animation.tsx   # Animaciones scroll-based
│           └── ZoomParallax.tsx         # Efecto parallax con zoom
│
├── public/                              # Archivos estáticos (vacío actualmente)
│
├── index.html                           # HTML entry point
├── package.json                         # Dependencias y scripts
├── package-lock.json                    # Lockfile de npm
├── tsconfig.json                        # Configuración TypeScript
├── vite.config.ts                       # Configuración Vite
├── .env.example                         # Variables de entorno de ejemplo
├── .gitignore                           # Archivos ignorados por Git
├── metadata.json                        # Metadatos del proyecto
├── README.md                            # Documentación general
└── qwen_guia_proyecto.md                # ESTE ARCHIVO - Guía principal
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Nombre | Valor | Uso |
|--------|-------|-----|
| **Accent** | `#D4FF00` | Color principal (verde neón) |
| **Background** | `#0A0A0A` | Fondo principal (negro oscuro) |
| **White** | `#FFFFFF` | Texto principal |
| **Neutral-500** | `#737373` | Texto secundario |
| **Gray-400** | `#9CA3AF` | Descripciones |
| **Gray-500** | `#6B7280` | Texto muted, links |
| **Gray-600** | `#4B5563` | Footer text |
| **Gray-900** | `#1F2937` | Fondos de imágenes |

### Tipografía

| Fuente | Familia | Uso |
|--------|---------|-----|
| **Inter** | `font-sans` | Texto general, párrafos, headings |
| **Fira Code** | `font-mono` | Código, etiquetas técnicas, badges |
| **Antic/Antic Didone** | `font-antic` | Títulos decorativos (no usado activamente) |

### Filosofía Visual

- **Tipografía grande**: Hero hasta 180px en desktop
- **Tracking ajustado**: `tracking-tighter` para títulos, `tracking-widest` para badges
- **Espaciado generoso**: Secciones con `py-32` a `py-48`
- **Animaciones suaves**: Blur + opacidad + desplazamiento
- **Efecto neón**: Sombras y bordes con color accent

---

## 🧩 Componentes Principales

### 1. App.tsx (Componente Raíz) - REFACTORIZADO ✅

**Ubicación**: `src/App.tsx`  
**Líneas**: ~420 (reducido de 726)  
**Responsabilidad**: Orquestar toda la aplicación (layout principal)

#### ¿Qué Cambió?
- ✅ Reducido a 42% del tamaño original
- ✅ Lógica extraída a custom hooks
- ✅ Componentes separados por feature
- ✅ Email movido a variables de entorno
- ✅ Mejor manejo de errores

#### Refs Principales
```typescript
const contactModalRef = useClickOutside(() => setShowContactModal(false));
const aboutRef = useRef<HTMLDivElement>(null);
```

#### Imports de Nuevas Características
```typescript
import { BlurText } from "./components/Hero/BlurText";
import { Navigation } from "./components/Navigation/Navigation";
import { ContactForm } from "./components/Contact/ContactForm";
import { COLORS, FONTS } from "./constants";
import { services } from "./data/services";
import { projects } from "./data/projects";
import { parallaxImages } from "./data/parallax";
import { useClickOutside } from "./hooks/useClickOutside";
```

---

## 🆕 NUEVOS COMPONENTES Y HOOKS (REFACTORIZACIÓN)

### Componentes Extraídos

#### 1. **BlurText.tsx** - Componente de Texto Animado
**Ubicación**: `src/components/Hero/BlurText.tsx`  
**Tamaño**: ~50 líneas

```typescript
export const BlurText: React.FC<BlurTextProps> = React.memo(
  ({ text, delay = 50, animateBy = "words", direction = "top", className, style }) => {
    const { ref, inView } = useBlurText({ delay, animateBy });
    // Renderiza segmentos con blur + opacity + translate
  }
);
```

**Props**:
- `text: string` - Texto a animar
- `delay?: number` - Delay entre segmentos (ms)
- `animateBy?: "words" | "letters"` - Granularidad
- `direction?: "top" | "bottom"` - Dirección de entrada
- `className?: string` - Clases CSS
- `style?: React.CSSProperties` - Estilos inline

**Optimización**: Usa `React.memo` para evitar re-renders innecesarios.

---

#### 2. **Navigation.tsx** - Menú de Navegación
**Ubicación**: `src/components/Navigation/Navigation.tsx`  
**Tamaño**: ~80 líneas

```typescript
export const Navigation: React.FC<NavigationProps> = ({ items, onItemSelect }) => {
  const { isOpen, menuRef, buttonRef, toggle, handleItemClick } = useMenu(onItemSelect);
  // Renderiza botón + menú desplegable
}
```

**Props**:
- `items: NavItem[]` - Items del menú
- `onItemSelect?: () => void` - Callback al seleccionar

**Features**:
- Click-outside para cerrar
- Hover effects
- Custom actions por item

---

#### 3. **ContactForm.tsx** - Formulario de Contacto Mejorado
**Ubicación**: `src/components/Contact/ContactForm.tsx`  
**Tamaño**: ~150 líneas

```typescript
export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { formData, formStatus, errors, handleChange, handleSubmit } = useContactForm(onSuccess);
  // Renderiza formulario con validación
}
```

**Mejoras**:
- ✅ Validación en tiempo real
- ✅ Mensajes de error por campo
- ✅ Estados (idle, sending, sent, error)
- ✅ Email dinámico desde env vars
- ✅ Timeout de 10 segundos

---

#### 4. **ShaderAnimation.tsx** - Fondo WebGL (MEJORADO)
**Ubicación**: `src/components/Animations/ShaderAnimation.tsx`

**Mejoras Implementadas**:
- ✅ Debounce de 150ms en resize events
- ✅ Timeout cleanup mejorado
- ✅ Try-catch para error handling
- ✅ Resource disposal completo

---

### Custom Hooks

#### 1. **useClickOutside.ts** - Detectar Clicks Afuera
```typescript
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
): RefObject<T>
```

**Uso**:
```typescript
const ref = useClickOutside(() => setIsOpen(false));
<div ref={ref}>Cierra al hacer click afuera</div>
```

---

#### 2. **useContactForm.ts** - Lógica de Formulario
```typescript
export function useContactForm(onSuccess?: () => void): UseContactFormReturn {
  return {
    formData,
    formStatus,
    errors,
    handleChange,
    handleSubmit,
    reset
  }
}
```

**Features**:
- ✅ Validación completa
- ✅ Timeout de 10s
- ✅ Manejo de errores de red
- ✅ Email desde env vars
- ✅ Callback de éxito

---

#### 3. **useMenu.ts** - Lógica de Menú
```typescript
export function useMenu(onItemClick?: () => void): UseMenuReturn {
  return {
    isOpen,
    menuRef,
    buttonRef,
    toggle,
    close,
    handleItemClick
  }
}
```

---

#### 4. **useBlurText.ts** - Animación Blur
```typescript
export function useBlurText(options?: UseBlurTextOptions) {
  return {
    ref,
    inView,
    delay,
    animateBy
  }
}
```

**Manejo Correcto de IntersectionObserver**:
```typescript
useEffect(() => {
  const observer = new IntersectionObserver([...]);
  if (currentRef) observer.observe(currentRef);
  
  return () => {
    observer.disconnect();  // ✅ Cleanup completo
  };
}, []);
```

---

### Datos Centralizados

#### 1. **constants/colors.ts** - Paleta de Colores
```typescript
export const COLORS = {
  accent: "#D4FF00",
  accentLight: "rgba(212, 255, 0, 0.2)",
  white: "hsl(0 0% 100%)",
  gray: { 300: "#d1d5db", 500: "#6b7280", 900: "#111827" },
  // ... más
} as const;
```

**Beneficio**: Cambios de diseño en un único lugar.

---

#### 2. **constants/fonts.ts** - Tipografía
```typescript
export const FONTS = {
  code: "'Fira Code', monospace",
  default: "system-ui, -apple-system, sans-serif",
} as const;
```

---

#### 3. **data/services.ts** - Servicios
```typescript
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Arquitectura de prompts",
    description: "...",
    icon: Cpu,
  },
  // ... 3 más
]
```

---

#### 4. **data/projects.ts** - Proyectos
```typescript
export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  { id: "01", tag: "IA / OPTIMIZACIÓN", ... },
  // ... 2 más
]
```

---

#### 5. **data/parallax.ts** - Parallax Items
```typescript
export const parallaxImages: ParallaxItem[] = [
  { text: "CONTINUA DESLIZANDO" },
  { text: "AUTOMATIZACION INTELIGENTE" },
  // ... 5 más
]
```

---

### Validación y Tipos

#### **utils/validation.ts** - Validación de Formulario
```typescript
export function validateContactForm(data: ContactFormData): FormValidationResult

✅ Email regex validation
✅ Mínimo 10 caracteres
✅ Máximo 5000 caracteres
✅ Mensajes en español
✅ Errores estructurados
```

---

#### **types/forms.ts** - Tipos de Formulario
```typescript
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "sent" | "error";

export interface FormValidationError {
  field: keyof ContactFormData;
  message: string;
}

export interface FormValidationResult {
  valid: boolean;
  errors?: FormValidationError[];
}
```

---

#### **types/gemini.ts** - Tipos Gemini API
```typescript
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
```

---

### Ambient Types

#### **vite-env.d.ts** - Variables de Entorno
```typescript
interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_GEMINI_API_KEY?: string;
}
```

**Configuración en `.env.local`**:
```
VITE_CONTACT_EMAIL=alejandronopez@gmail.com
VITE_GEMINI_API_KEY=your_api_key
```

---

### 2. ShaderAnimation.tsx (Fondo WebGL) - MEJORADO ✅

**Ubicación**: `src/components/ShaderAnimation.tsx`  
**Tecnología**: Three.js + WebGL shaders

#### Qué Hace
Crea un fondo animado con patrones de líneas concéntricas que se mueven continuamente.

#### Implementación Técnica
- **Geometry**: PlaneGeometry(2, 2) - solo 4 vértices
- **Camera**: OrthographicCamera(-1, 1, 1, -1, 0, 1)
- **Material**: ShaderMaterial con vertex/fragment shaders custom
- **Uniforms**: `time` (animación), `resolution` (responsive)
- **Performance**: Pixel ratio limitado a 2x

#### Shaders
**Vertex Shader**:
```glsl
void main() {
  gl_Position = vec4(position, 1.0);
}
```

**Fragment Shader**:
- Genera patrón de líneas con bucles anidados
- Usa `fract()`, `length()`, `mod()` para patrones
- 3 canales RGB × 5 líneas = 15 operaciones por píxel

#### Cleanup (Muy Importante) - MEJORADO ✅
```typescript
return () => {
  window.removeEventListener("resize", onWindowResize);
  if (resizeTimeout) {  // ✅ NUEVO: Cleanup de timeout
    clearTimeout(resizeTimeout);
  }
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    if (container && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    renderer.dispose();
  }
  if (geometry) geometry.dispose();
  if (material) material.dispose();
};
```

#### Debounce en Resize - ✅ NUEVO
```typescript
const onWindowResize = () => {
  if (!container || !renderer) return;
  
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  
  // Debounce de 150ms para evitar recálculos excesivos
  resizeTimeout = setTimeout(() => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer!.setSize(width, height);
    uniforms.resolution.value.x = width * renderer!.getPixelRatio();
    uniforms.resolution.value.y = height * renderer!.getPixelRatio();
  }, 150);
};
```

**Mejoras Implementadas**:
- ✅ Debounce de 150ms en resize
- ✅ Timeout cleanup mejorado
- ✅ Try-catch para error handling
- ✅ Resource disposal completo

---

### 3. TimelineContent.tsx (Animaciones Scroll)

**Ubicación**: `src/components/ui/timeline-animation.tsx`  
**Tecnología**: Framer Motion + useInView

#### Qué Hace
Wrapper animado que revela contenido cuando entra en el viewport.

#### Props
```typescript
interface TimelineContentProps {
  as?: any;                                    // Elemento HTML
  animationNum?: number;                       // Índice para delay
  timelineRef: React.RefObject<HTMLElement>;   // Ref del padre
  customVariants?: Variants;                   // Variantes custom
  className?: string;                          // Clases CSS
  children: React.ReactNode;                   // Contenido
}
```

#### Variantes por Defecto
```typescript
{
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: animationNum * 0.2,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
}
```

#### Uso Típico
```tsx
<TimelineContent
  as="h2"
  animationNum={0}
  timelineRef={aboutRef}
  customVariants={revealVariants}
  className="text-3xl md:text-5xl font-bold text-white"
>
  Texto animado con <span>highlights</span>
</TimelineContent>
```

---

### 4. ZoomParallax.tsx (Efecto Parallax)

**Ubicación**: `src/components/ui/ZoomParallax.tsx`  
**Tecnología**: Framer Motion useScroll + useTransform

#### Qué Hace
Crea un efecto de zoom progresivo mientras el usuario hace scroll, mostrando tarjetas de texto en posiciones estratégicas.

#### Props
```typescript
interface Image {
  src?: string;    // URL de imagen
  alt?: string;    // Texto alternativo
  text?: string;   // Texto a mostrar
}

interface ZoomParallaxProps {
  images: Image[];  // Máximo 7 items
}
```

#### Implementación Técnica
- **Contenedor**: `h-[300vh]` (scroll muy largo)
- **Inner**: `sticky top-0 h-screen overflow-hidden`
- **Escalas**: `[1→4, 1→5, 1→6, 1→5, 1→6, 1→8, 1→9]`
- **Posicionamiento**: Clases arbitrarias por índice

#### Escalas por Índice
| Índice | Escala Final | Posición |
|--------|-------------|----------|
| 0 | 4x | Centro |
| 1 | 5x | Left 5vw, Top -30vh |
| 2 | 6x | Left -25vw, Top -10vh |
| 3 | 5x | Left 27.5vw |
| 4 | 6x | Left 5vw, Top 27.5vh |
| 5 | 8x | Left -22.5vw, Top 27.5vh |
| 6 | 9x | Left 25vw, Top 22.5vh |

---

## 📱 Secciones del Portfolio

### Estructura Visual

```
┌─────────────────────────────────────────┐
│  HEADER (Fixed) - Menú + Logo "AL"     │  ← z-50
├─────────────────────────────────────────┤
│                                         │
│  HERO SECTION - "ALEJANDRO LOPEZ"      │  ← min-h-screen
│  Tagline + Badge + Scroll Indicator    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  PARALLAX SECTION - Zoom Cards         │  ← h-[300vh]
│  7 tarjetas con textos de servicios     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  SOBRE MÍ - Descripción con Highlights │  ← py-32
│  Animaciones TimelineContent            │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  PROYECTOS - 3 Cards Alternadas        │  ← py-32, bg-white/[0.01]
│  Imágenes + Descripciones               │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  CTA - "Construyamos algo..."          │  ← py-48
│  Botón grande de contacto               │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER - Links + Copyright             │  ← py-16, border-t
└─────────────────────────────────────────┘
```

### 1. Header (Navegación)

**Posición**: `fixed top-0 left-0 right-0 z-50`

**Componentes**:
- **Menú Button**: Icono `Menu` / `X` de Lucide
- **Signature**: "AL" (logo personal)
- **Dropdown**: 4 items (Inicio, Sobre Mí, Proyectos, Contacto)

**Comportamiento**:
- Click fuera cierra el menú
- Click en link navega y cierra
- "INICIO" siempre highlight en accent

---

### 2. Hero Section

**Posición**: `relative min-h-screen flex flex-col`

**Elementos**:
- **"ALEJANDRO"**: BlurText, hasta 180px, color accent
- **"LOPEZ"**: BlurText, hasta 180px, color accent
- **Badge**: "AI SOLUTIONS ARCHITECT" (pill con borde accent)
- **Tagline**: "AUTOMATIZACIÓN • PROMPT ENGINEERING • IA APLICADA"
- **Separador**: Línea animada de 60px
- **Subtexto**: "Sistemas inteligentes para negocios reales"
- **Scroll Indicator**: ChevronDown animado (bounce)

**Animaciones**:
- BlurText: Letra por letra, delay 100ms, desde arriba
- Badge + Tagline: Fade in con delay 1.2s
- Línea: Width 0 → 60px con delay 2s
- Scroll indicator: bounce infinito

---

### 3. Parallax Section (ZoomParallax)

**Trigger**: `<div id="parallax-trigger">`

**Datos**:
```typescript
const parallaxImages = [
  { text: "CONTINUA DESLIZANDO" },
  { text: "AUTOMATIZACION INTELIGENTE" },
  { text: "ARQUITECTURA DE PROMPTS" },
  { text: "VIBE CODING" },
  { text: "APP PERSONALIZADAS" },
  { text: "SISTEMAS DE CONOCIMIENTO Y ORGANIZACION CON IA" },
  { text: "IA APLICADA AL MARKETING" },
];
```

**Comportamiento**:
- Scroll de 300vh (muy largo)
- Tarjetas se escalan progresivamente
- Cada tarjeta tiene posición única
- Sticky mantiene contenido en viewport

---

### 4. Sobre Mí Section

**ID**: `#sobre-mi`

**Estructura**:
```
┌──────────────────────────────────────┐
│  TimelineContent (h2)               │
│  "Aplico [IA], [integración]..."    │
│                                      │
│  TimelineContent (h2)               │
│  "Desde [automatizaciones] hasta..."│
│                                      │
│  Separador con nombre               │
│  "Sobre mí — Alejandro López"       │
└──────────────────────────────────────┘
```

**Highlights**:
- Spans con borde accent dotted
- Animación escalonada (animationNum 0-8)
- Delay de 0.2s por elemento

---

### 5. Proyectos Section

**Fondo**: `bg-white/[0.01]` (blanco casi transparente)

**Layout**:
- Header: "Proyectos Destacados" + "01 — 03"
- 3 proyectos alternados (imagen izquierda/derecha)
- Espaciado: `space-y-40` (160px entre proyectos)

**Cada Proyecto**:
```
┌──────────────┐  ┌──────────────────────┐
│              │  │  • TAG              │
│   Imagen     │  │  Título Grande      │
│   (16:9)     │  │  Descripción        │
│              │  │  Ver proyecto →     │
└──────────────┘  └──────────────────────┘
```

**Efectos**:
- Imagen: hover scale 1.05 + opacity 80%
- Gradiente overlay en imagen
- Flecha se mueve en hover (translate-x-2)
- Dot indicator con glow accent

---

### 6. CTA Section (Call to Action)

**Texto**:
```
"Construyamos algo
más inteligente."
```

**Botón**:
- Fondo accent (#D4FF00)
- Texto negro
- Pill shape (rounded-full)
- Hover scale 1.05
- Sombra accent

---

### 7. Footer

**Layout**: Flex row con 3 columnas
- **Izquierda**: Logo "ALEJANDRO LOPEZ"
- **Centro**: Links (Linkedin, Github, Email)
- **Derecha**: Copyright "© 2024 Alejandro Lopez"

**Estilo**:
- Border top blanco 5% opacidad
- Links hover a accent
- Iconos ExternalLink

---

## 🔧 Configuración Técnica

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Puntos Clave**:
- `allowImportingTsExtensions`: Permite imports sin extensión
- `noEmit`: TypeScript solo para type-checking
- `paths`: Alias `@/` para imports absolutos

---

### Vite (vite.config.ts)

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
```

**Puntos Clave**:
- Alias `@/` apunta al directorio raíz
- GEMINI_API_KEY inyectada desde `.env`
- HMR controlado por `DISABLE_HMR`

---

### Variables de Entorno

**Archivo**: `.env.example` (crear `.env.local` para desarrollo)

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

**Uso en Código**:
```typescript
// En vite.config.ts
'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)

// En código (inyectado por Vite)
process.env.GEMINI_API_KEY
```

---

## 🚀 Comandos Disponibles

### Desarrollo
```bash
npm run dev              # Servidor en http://localhost:3000
```

### Build
```bash
npm run build            # Build de producción → dist/
npm run preview          # Previsualizar build
```

### Utilidades
```bash
npm run lint             # Type-checking (tsc --noEmit)
npm run clean            # Eliminar dist/
npm install              # Instalar dependencias
```

### Workflow Típico
```bash
# 1. Primera vez
npm install

# 2. Desarrollo
npm run dev

# 3. Antes de commit
npm run lint

# 4. Deploy
npm run build && npm run preview
```

---

## 🎯 Patrones de Código Importantes

### Patrones Refactorizados (2026-04-18)

#### ✅ BlurText - Ahora es Componente + Hook

**Antes** (en App.tsx):
```typescript
// 100+ líneas de lógica de IntersectionObserver
```

**Ahora** (componentes separados):
```typescript
// Hook: useBlurText.ts
export function useBlurText(options?: UseBlurTextOptions) {
  const { ref, inView } = useBlurText({ delay, animateBy });
  // ...
}

// Componente: Hero/BlurText.tsx
export const BlurText: React.FC<BlurTextProps> = React.memo(({ text, ... }) => {
  const { ref, inView } = useBlurText({ delay, animateBy });
  // Renderiza con blur + opacity + translate
});
```

**Beneficios**:
- ✅ Reutilizable en cualquier lugar
- ✅ Optimizado con React.memo
- ✅ IntersectionObserver cleanup correcto

---

#### ✅ Click Outside - Ahora es Hook

**Antes** (en App.tsx):
```typescript
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (isMenuOpen && menuRef.current && buttonRef.current &&
        !menuRef.current.contains(...) && !buttonRef.current.contains(...)) {
      setIsMenuOpen(false);
    }
    // Lógica duplicada para modal contacto
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isMenuOpen, showContactModal]);
```

**Ahora** (hook reutilizable):
```typescript
// Hook: useClickOutside.ts
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): RefObject<T>

// Uso:
const contactModalRef = useClickOutside(() => setShowContactModal(false));
```

**Beneficios**:
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ Una línea en lugar de 20
- ✅ Reutilizable en cualquier componente

---

#### ✅ Contact Form - Validación y Manejo de Errores

**Antes**:
```typescript
const response = await fetch("...", {
  // Timeout implícito (>30s)
  // Sin validación de cliente
  // Sin feedback de errores por campo
  // Email hardcodeado
})
```

**Ahora** (useContactForm hook):
```typescript
const { formData, formStatus, errors, handleChange, handleSubmit } = useContactForm(onSuccess);

// Features:
// ✅ Validación de email (regex)
// ✅ Validación de longitud (10-5000 caracteres)
// ✅ Timeout de 10 segundos (AbortController)
// ✅ Errores por campo con mensajes en español
// ✅ Email dinámico desde env vars
// ✅ Estados: idle, sending, sent, error
```

**En el componente**:
```jsx
{errors.email && <p className="text-red-500">{errors.email}</p>}
{formStatus === "sending" && <p>Enviando...</p>}
```

**Beneficios**:
- ✅ Mejor UX
- ✅ Seguro (timeout)
- ✅ Accesible (mensajes de error)
- ✅ Internacionalizapble (textos en variables)

---

#### ✅ Datos en Archivos - No hardcodeados

**Antes**:
```typescript
// App.tsx (726 líneas)
const services = [
  { title: "...", description: "...", icon: <Cpu /> },
  // ... 3 más
];
const projects = [...]
const parallaxImages = [...]
```

**Ahora**:
```typescript
// data/services.ts
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}
export const services: Service[] = [...]

// App.tsx
import { services } from "./data/services";
```

**Beneficios**:
- ✅ App.tsx limpio (solo layout)
- ✅ Fácil de actualizar datos
- ✅ Reutilizable en otras páginas
- ✅ Tipos definidos

---

## ⚠️ Puntos Críticos a Recordar

### 1. Cleanup Obligatorio

**SIEMPRE** limpiar en useEffect return:
- Event listeners
- Animation frames
- WebGL resources (renderer, geometry, material)
- Observers (IntersectionObserver, etc.)

**Consecuencias si no**: Memory leaks, múltiples loops, crash del navegador

---

### 2. Null Checks para Refs

```typescript
// ✅ Bien
if (ref.current) {
  observer.observe(ref.current);
}

// ❌ Mal - Puede ser null
observer.observe(ref.current);
```

---

### 3. Pixel Ratio Limitado

```typescript
// ✅ Bien
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ❌ Mal - Sin límite (puede ser 3x o más)
renderer.setPixelRatio(window.devicePixelRatio);
```

---

### 4. viewport {{ once: true }}

```typescript
// ✅ Bien - Solo anima una vez
<motion.div viewport={{ once: true }}>

// ❌ Mal - Anima cada vez que entra al viewport
<motion.div viewport={{ once: false }}>
```

---

### 5. Dark Mode Permanente

```typescript
useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);
```

**No hay toggle de tema** - el sitio siempre es dark mode.

---

## 🎨 Convenciones de Estilo

### Responsive Breakpoints

| Prefijo | Ancho | Dispositivo |
|---------|-------|-------------|
| `sm:` | 640px | Móviles grandes |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |

### Patrón Tipográfico Responsive

```tsx
text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px]
```

### Z-Index Strategy

| Valor | Uso |
|-------|-----|
| `-z-10` | Shader de fondo |
| `z-10` | Contenido principal |
| `z-50` | Header fixed |
| `z-[100]` | Menú dropdown |

### Espaciado de Secciones

| Sección | Padding |
|---------|---------|
| Hero | `min-h-screen` |
| Parallax | `h-[300vh]` |
| Sobre Mí | `py-32` |
| Proyectos | `py-32 px-6` |
| CTA | `py-48 px-6` |
| Footer | `py-16 px-6` |

---

## 🔍 IDs de Secciones (Para Navegación)

| Sección | ID | Uso |
|---------|-----|-----|
| Hero | (ninguno) | - |
| Parallax | `parallax-trigger` | Scroll desde hero |
| Sobre Mí | `sobre-mi` | Menú navegación |
| Proyectos | `proyectos` | Menú navegación |
| Contacto | `contacto` | Menú navegación |

**Scroll programático**:
```typescript
document.getElementById('parallax-trigger')?.scrollIntoView({ behavior: 'smooth' })
```

---

## 📦 Dependencias Clave

### Producción
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "motion": "^12.23.24",
  "three": "^0.183.2",
  "@types/three": "^0.183.1",
  "lucide-react": "^0.546.0",
  "@tailwindcss/vite": "^4.1.14",
  "tailwindcss": "^4.1.14"
}
```

### Desarrollo
```json
{
  "typescript": "~5.8.2",
  "vite": "^6.2.0",
  "@vitejs/plugin-react": "^5.0.4",
  "@types/node": "^22.14.0"
}
```

---

## 🐛 Troubleshooting Común

### Puerto ya en uso
```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# O usar otro puerto
npm run dev -- --port 3001
```

### Error de dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build falla
```bash
npm run lint              # Verificar tipos
npm run clean             # Limpiar dist
npm run build             # Reconstruir
```

### HMR no funciona
```bash
# Verificar variable de entorno
# Windows PowerShell
$env:DISABLE_HMR="false"
npm run dev
```

---

## 📚 Recursos Relacionados

### Documentación Interna
- **skills/**: Carpeta con documentación técnica detallada
  - `configuracion.md`: Setup completo
  - `componentes-react.md`: Todos los componentes
  - `animaciones-motion.md`: Framer Motion en detalle
  - `shader-webgl.md`: Three.js y shaders
  - `optimizacion.md`: Rendimiento y mejores prácticas

### Documentación Externa
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Motion (Framer Motion)](https://motion.dev/)
- [Three.js](https://threejs.org/docs/)
- [Lucide Icons](https://lucide.dev/)

---

## 🎯 Próximas Mejoras Posibles

### ✅ COMPLETADAS (Refactorización 2026-04-18)

**Mejoras Implementadas:**
- ✅ Estructura modular por features (componentes en carpetas separadas)
- ✅ Custom hooks reutilizables (useClickOutside, useContactForm, useMenu, useBlurText)
- ✅ Constantes centralizadas (colors, fonts)
- ✅ Datos en archivos separados (services, projects, parallax)
- ✅ Validación de formulario completa (email, longitud, mensajes en español)
- ✅ Email removido del código (ahora en .env)
- ✅ Manejo robusto de errores (timeout 10s, network errors, AbortError)
- ✅ IntersectionObserver cleanup completo (disconnect())
- ✅ Three.js debounce en resize (150ms)
- ✅ Tipos TypeScript completos (forms, gemini)
- ✅ Reducción de App.tsx (726 → ~420 líneas)
- ✅ BlurText optimizado con React.memo
- ✅ Ambient types para variables de entorno

### Funcionalidad Pendiente
- [ ] Formulario de contacto funcional (ya validado, solo falta integrate)
- [ ] Integración real con Gemini AI
- [ ] Página de detalle de proyecto
- [ ] Blog o sección de artículos
- [ ] Testimonios de clientes
- [ ] Integración con analytics

### Visual Pendiente
- [ ] Toggle dark/light mode
- [ ] Más transiciones de página
- [ ] Loader de entrada
- [ ] Cursor personalizado
- [ ] Más efectos de parallax

### Técnico Pendiente
- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] CI/CD pipeline
- [ ] PWA capabilities
- [ ] Optimización de imágenes
- [ ] Lazy loading de componentes

---

## 💡 Notas Finales

### Filosofía del Proyecto

Este portfolio no es solo un sitio web, es una **declaración de intenciones**:
- **Profesional pero accesible**: Diseño serio pero no intimidante
- **Tecnología con propósito**: Cada animación tiene una razón de ser
- **Performance first**: Animaciones fluidas a 60fps
- **Mobile es rey**: Diseñado primero para móvil

### Estilo de Código

- **TypeScript estricto**: Tipos definidos, sin `any` innecesarios
- **Componentes pequeños**: Cada componente hace una cosa bien
- **Cleanup siempre**: Efectos siempre retornan cleanup
- **Null checks siempre**: Refs pueden ser null
- **Mobile first**: Breakpoints progresivos

### Cuando Trabajes en Este Proyecto

1. **Lee esta guía primero** para entender el contexto
2. **Consulta skills/** para detalles técnicos específicos
3. **Mantén el estilo**: Sigue las convenciones existentes
4. **Prueba en móvil**: Siempre verifica responsive
5. **Verifica tipos**: `npm run lint` antes de commit
6. **Performance**: No añadas animaciones sin `viewport={{ once: true }}`

---

**Última actualización**: sábado, 18 de abril de 2026 - REFACTORIZACIÓN COMPLETA ✅  
**Versión del proyecto**: 0.1.0 (Post-Refactor)  
**Maintainer**: Alejandro López  
**Creado por**: Qwen Code (con tests, validación y arquitectura modular)

### Cambios en Esta Versión (0.1.0)

**Refactorización de Seguridad y Arquitectura**:
- ✅ Email movido a variables de entorno
- ✅ Validación de formulario completa
- ✅ Manejo robusto de errores
- ✅ Componentes modulares por feature
- ✅ Custom hooks reutilizables
- ✅ Constantes centralizadas
- ✅ Datos en archivos separados
- ✅ Tipos TypeScript completos
- ✅ IntersectionObserver cleanup correcto
- ✅ Three.js debounce optimizado
- ✅ Reducción de líneas (726 → ~420 en App.tsx)
- ✅ TypeScript sin errores (npm run lint ✅)
- ✅ Dev server funcional (npm run dev ✅)

---

> **Nota para Qwen Code**: Este documento es tu referencia principal. Úsalo para entender el contexto antes de hacer cualquier cambio. Para detalles técnicos específicos, consulta la carpeta `skills/`.
