# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚡ Token Efficiency & Coding Profiling (de claude-token-efficient)

### Approach
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Skip files over 100KB unless explicitly required.
- Suggest running /cost when a session is running long to monitor cache ratio.
- Recommend starting a new session when switching to an unrelated task.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.

### Output
- Return code first. Explanation after, only if non-obvious.
- No inline prose. Use comments sparingly - only where logic is unclear.
- No boilerplate unless explicitly requested.

### Code Rules
- Simplest working solution. No over-engineering.
- No abstractions for single-use operations.
- No speculative features or "you might also want..."
- Read the file before modifying it. Never edit blind.
- No docstrings or type annotations on code not being changed.
- No error handling for scenarios that cannot happen.
- Three similar lines is better than a premature abstraction.

### Review & Debugging Rules
- State the bug. Show the fix. Stop.
- No suggestions beyond the scope of the review.
- No compliments on the code before or after the review.
- Never speculate about a bug without reading the relevant code first.
- State what you found, where, and the fix. One pass.
- If cause is unclear: say so. Do not guess.

### Simple Formatting
- No em dashes, smart quotes, or decorative Unicode symbols.
- Plain hyphens and straight quotes only.
- Natural language characters (accented letters, CJK, etc.) are fine when the content requires them.
- Code output must be copy-paste safe.

---

## 🧠 Contexto para el modelo — leer siempre antes de responder

Este es el portfolio profesional de **Alejandro López**, especialista en sistemas inteligentes, automatización y arquitectura de IA. Es una SPA (Single Page Application) con animaciones avanzadas, efectos WebGL y diseño dark-mode permanente.

Actualmente se está integrando la **demo interactiva Nexus** — un sistema de triage IA de atención al cliente — como modal en el portfolio.

> **Nota para el modelo**: Lee la sección "Estado actual" antes de cualquier tarea. No des por creado ningún archivo que no esté marcado como ✅.

---

## Tech Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | React + TypeScript | 19.0.0 / 5.8.2 |
| Build | Vite | 6.2.0 |
| Estilos | Tailwind CSS | 4.1.14 |
| Animaciones | Motion (Framer Motion) | 12.23.24 |
| WebGL | Three.js | 0.183.2 |
| Iconos | Lucide React | 0.546.0 |

---

## Common Commands

```bash
npm run dev        # Servidor dev → http://localhost:3000
npm run build      # Build producción → dist/
npm run preview    # Preview del build
npm run lint       # TypeScript type check (tsc --noEmit)
npm run clean      # Elimina dist/
```

---

## Architecture — Portfolio base

```
src/
├── components/           # React components organized by feature
│   ├── Hero/            # Sección principal con animaciones
│   ├── Navigation/      # Menú y navegación
│   ├── Contact/         # Formulario de contacto
│   ├── Animations/      # Componentes WebGL/shaders
│   └── ui/              # Componentes UI reutilizables
├── hooks/               # Custom hooks
├── constants/           # Colores, fuentes, constantes globales
├── data/                # Datos estáticos (services, projects, parallax)
├── types/               # Tipos TypeScript
└── utils/               # Funciones utilitarias
```

### Custom Hooks disponibles

- `useClickOutside` — detecta clicks fuera de un elemento
- `useContactForm` — estado del formulario + validación
- `useMenu` — toggle del menú
- `useBlurText` — animación de texto con IntersectionObserver

---

## Architecture — NexusDemo (integración en curso)

```
src/components/NexusDemo/
├── index.ts                ← barrel export
├── mockData.ts             ← tipos, datos simulados, lógica de respuestas
├── ScanReveal.tsx          ← efecto scan line con Framer Motion
├── ParticleBackground.tsx  ← partículas convergentes al abrir modal
├── ViewToggle.tsx          ← toggle Cliente / Agente
├── AnalysisBar.tsx         ← barra de análisis en tiempo real
├── ChatInterface.tsx       ← chat simulado con typing indicator
├── TicketCard.tsx          ← card de ticket con ScanReveal
├── MetricsPanel.tsx        ← dashboard de métricas del agente
├── ClientView.tsx          ← vista cliente (chat + análisis + ticket)
├── AgentView.tsx           ← vista agente (métricas + lista tickets)
├── NexusDemo.tsx           ← container principal con ViewToggle
├── NexusDemoModal.tsx      ← modal con ParticleBackground
└── NexusDemoTrigger.tsx    ← botón lazy que abre el modal
```

**Flujo de la demo:**
`NexusDemoTrigger` → abre `NexusDemoModal` → partículas convergen → aparece `NexusDemo` → toggle entre `ClientView` y `AgentView`

---

## Convenciones de código & Key Patterns

- **Estilos**: dark mode permanente en el portfolio, sin toggle
  - Accent portfolio: `#D4FF00` (verde neón)
  - Background portfolio: `#0A0A0A`
  - Accent Nexus demo: `#FF6900` (naranja) — la demo es light mode (fondo blanco)
- **Responsive**: mobile-first approach
- **Animaciones**: Framer Motion para UI declarativas, Three.js para fondo WebGL del portfolio
- **Scroll animations**: siempre `viewport={{ once: true }}`
- **Patrón de componentes**: Feature-based folder structure with barrel exports (`index.ts`).

---

## Reglas críticas — NO romper

```typescript
// 1. Siempre limpiar recursos Three.js en useEffect
return () => {
  window.removeEventListener("resize", handler);
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer) {
    container?.removeChild(renderer.domElement);
    renderer.dispose();
  }
  geometry?.dispose();
  material?.dispose();
};

// 2. Siempre desconectar IntersectionObserver
return () => observer.disconnect();

// 3. Limitar pixel ratio para rendimiento
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 4. Debounce en resize de canvas Three.js (150ms)
// 5. Email NUNCA hardcodeado — siempre desde variables de entorno
// 6. NexusDemo NO hace llamadas a APIs — todo es simulado con mockData.ts
```

---

## Important Notes (Portfolio)

- No routing library - single page con scroll navigation
- Form validation includes email regex and length checks (10-5000 chars). 
- Contact form has 10-second timeout using AbortController.

---

## Variables de entorno

Copiar `.env.example` → `.env.local`:

```
VITE_CONTACT_EMAIL=your_email@example.com
VITE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 📍 Estado actual del proyecto — Integración NexusDemo

> Última actualización: sesión del 20/04/2026 (en clase, quedó a medias en Task 5)

### ✅ Completado

- **Task 1** — Dependencias: `framer-motion` añadido a `package.json` e instalado
- **Task 2** — Estructura de carpetas: `src/components/NexusDemo/` creada con `index.ts` inicial y `mockData.ts` completo
- **Task 3** — `ScanReveal.tsx` creado (componentes `ScanReveal` y `ScanLine`)
- **Task 4** — `ParticleBackground.tsx` creado (50 partículas desde los 4 bordes convergiendo al centro)

### 🚧 En progreso — Task 5 (quedó a medias)

**`ViewToggle.tsx`** — Puede estar creado parcialmente o no existir. Verificar con:
```bash
cat src/components/NexusDemo/ViewToggle.tsx
```
Si no existe, crearlo con el código del plan de integración.

### 📋 Pendiente (Tasks 6–18)

En orden de dependencia:

| Task | Archivo a crear/modificar | Depende de |
|---|---|---|
| 6 | `AnalysisBar.tsx` | — |
| 7 | `ChatInterface.tsx` | `mockData.ts` |
| 8 | `TicketCard.tsx` | `ScanReveal.tsx`, `mockData.ts` |
| 9 | `MetricsPanel.tsx` | `mockData.ts` |
| 10 | `ClientView.tsx` | `ChatInterface`, `AnalysisBar`, `TicketCard` |
| 11 | `AgentView.tsx` | `MetricsPanel`, `TicketCard`, `mockData.ts` |
| 12 | `NexusDemo.tsx` | `ClientView`, `AgentView`, `ViewToggle` |
| 13 | `NexusDemoModal.tsx` | `NexusDemo`, `ParticleBackground` |
| 14 | Actualizar `index.ts` | todos los anteriores |
| 15 | Añadir Nexus a `src/data/projects.ts` | — |
| 16 | `NexusDemoTrigger.tsx` | `NexusDemoModal` |
| 17 | Integrar en `src/App.tsx` | `NexusDemoTrigger` |
| 18 | Testing en browser | todo lo anterior |

### ⚠️ Bug conocido — corregir al crear ChatInterface.tsx (Task 7)

El plan tiene un error tipográfico en la línea 648 (doble corchete de cierre):
```typescript
// ❌ Como está en el plan (incorrecto)
const completionMessage = completionMessages[Math.floor(Math.random() * completionMessages.length)]];

// ✅ Correcto
const completionMessage = completionMessages[Math.floor(Math.random() * completionMessages.length)];
```

---

## 💬 Instrucciones para el modelo local

1. **Verifica siempre** si un archivo ya existe antes de crearlo (`cat` o `ls`)
2. **Sigue el orden de la tabla** de pendientes — no saltes tasks
3. **No toques** los archivos ya completados (Tasks 1–4)
4. **El código de cada componente** está en el archivo `2026-04-20-nexus-demo-integration.md` en la raíz del repo
5. Si necesitas ver un archivo existente del proyecto, pídelo explícitamente al usuario
6. La demo Nexus usa **light mode** (fondo blanco, texto oscuro) — no apliques el dark mode del portfolio dentro del modal
