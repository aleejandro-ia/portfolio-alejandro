# Nexus Demo Integration Design

## Overview

Integración de una demo interactiva del sistema Nexus (AI-powered postventa/triage) dentro del portfolio de Alejandro López. La demo se mostrará en un modal inmersivo con animaciones premium, permitiendo a los visitantes experimentar tanto la vista del cliente como la del agente sin salir del portfolio.

## Goals

1. Mostrar una demo funcional de Nexus sin requerir API keys o backend
2. Mantener al usuario dentro del portfolio (experiencia inmersiva)
3. Impresionar con animaciones de partículas y transiciones fluidas
4. Demostrar capacidades de IA aplicada a atención al cliente
5. Permitir toggle entre vista cliente y vista agente

## Non-Goals

- No conectar con APIs reales (Gemini/Firebase)
- No persistir datos permanentemente
- No replicar 100% la funcionalidad de la app original
- No modificar el diseño del portfolio existente

## Architecture

### Component Structure

```
portfolio-alejandro/
└── src/
    └── components/
        └── NexusDemo/
            ├── NexusDemoModal.tsx       # Modal container con animación de partículas
            ├── ParticleBackground.tsx   # Canvas/Framer Motion partículas
            ├── NexusDemo.tsx           # Demo container principal
            ├── ClientView.tsx          # Vista del chat del cliente
            ├── AgentView.tsx           # Dashboard del agente
            ├── ChatInterface.tsx       # Componente de chat simulado
            ├── TicketCard.tsx          # Card de ticket con animación
            ├── AnalysisBar.tsx         # Barra de análisis en tiempo real
            ├── MetricsPanel.tsx        # Panel de métricas del agente
            └── mockData.ts             # Datos simulados y respuestas
```

### Flow

```
Usuario en Portfolio
       ↓
Clic en "Probar Demo" (Proyecto Nexus)
       ↓
[Animación: Partículas convergen desde bordes]
       ↓
Modal inmersivo aparece (90% viewport)
       ↓
Backdrop: Portfolio con blur + scale 0.98
       ↓
Demo Nexus lista - Vista Cliente por defecto
       ↓
Usuario interactúa con chat simulado
       ↓
Toggle disponible: Vista Cliente ↔ Vista Agente
       ↓
[Animación de transición: Split diagonal rotation]
       ↓
Cierre: Partículas se dispersan, modal desvanece
```

## Design Details

### 1. Modal Container (NexusDemoModal.tsx)

**Apertura (1.2s total):**
1. **Fase 1 (0-300ms)**: Partículas (círculos 2-4px) aparecen desde bordes pantalla
2. **Fase 2 (300-800ms)**: Partículas convergen hacia centro con trayectorias curvas (ease-out-circ)
3. **Fase 3 (800-1000ms)**: Partículas "solidifican" formando marco del modal
4. **Fase 4 (1000-1200ms)**: Scan line horizontal revela contenido de arriba a abajo

**Backdrop:**
- Blur: 8px
- Scale: 0.98
- Opacity: 0.6 (fondo oscuro semitransparente)

**Cierre:**
- Animación inversa: scan line inverso + dispersión de partículas
- Duración: 800ms

### 2. Particle Animation (ParticleBackground.tsx)

**Tecnología:** Framer Motion (preferido) o Canvas 2D como fallback

**Configuración partículas:**
- Cantidad: 40-60 partículas
- Tamaño: 2-4px
- Color: #FF6900 (Zalando orange) o colores del tema Nexus
- Trayectoria: Curva de Bezier desde bordes hacia centro
- Easing: `[0.16, 1, 0.3, 1]` (ease-out-circ)

### 3. Vista Cliente (ClientView.tsx)

**Header:**
- Logo: "Nexus" + icono de bot
- Subtítulo: "Asistente de Postventa IA"
- Badge: "Demo Simulada"

**Chat Interface:**
- Mensaje inicial: "Hola, soy tu asistente de Nexus. ¿En qué puedo ayudarte hoy con tu pedido?"
- Input con sugerencias inteligentes (chips clickeables)
- Typing indicator: 3 puntos con animación wave
- Mensajes: Animación stagger desde bottom

**Barra de Análisis (AnalysisBar.tsx):**
- Posición: Lateral derecha o encima del chat
- Categorías visibles: Devolución, Facturación, Envío, Producto, Otros
- Indicadores se iluminan según keywords detectadas
- Porcentaje de confianza en tiempo real

**Sugerencias Contextuales:**
- Chips arriba del input
- Cambian dinámicamente según categoría detectada
- Ejemplos: "Cambio de talla", "Producto dañado", "Cargo duplicado"

### 4. Vista Agente (AgentView.tsx)

**Header:**
- Título: "Panel de Control - Agente"
- Métricas rápidas: Tickets hoy, Tiempo promedio

**Métricas Visuales (MetricsPanel.tsx):**
- Contador tickets: Hoy / Semana / Mes
- Tiempo promedio resolución: Barra de progreso animada
- Satisfacción estimada: Gauge circular
- Categorías frecuentes: Gráfico barras horizontales

**Lista de Tickets:**
- Filtros: Prioridad, Estado, Categoría
- Búsqueda: Por ID o palabra clave
- Tickets pre-cargados con datos realistas
- Estado toggleable: Pendiente ↔ Resuelto

**Detalle de Ticket:**
- Click en ticket abre detalle expandido
- Campos: ID, Categoría, Items, Resumen IA, Conversación original
- Animación: Card se expande con spring

### 5. Ticket Card (TicketCard.tsx)

**Animación de Generación:**
1. Campos aparecen stagger (100ms delay cada uno)
2. Efecto "scan" horizontal antes de mostrar cada campo
3. Barra completitud: 0% → 100% animada
4. Checkmarks aparecen con scale bounce

**Campos visibles:**
- ID: TK-XXXX (generado aleatoriamente)
- Categoría: Icono + texto
- Sub-categorías: Badges
- Prioridad: Indicador color (rojo/amarillo/verde)
- Items: Lista con iconos
- Resumen IA: Texto procesado
- Estado: Badge interactivo

### 6. Sistema de Chat Simulado

**Lógica de Respuestas:**
```typescript
const responseMap = {
  keywords: {
    'devolución|talla|cambio': 'Entiendo que desea realizar un cambio. ¿Podría indicarme el número de pedido?',
    'factura|cargo|cobro|dinero': 'Veo que tiene una consulta sobre facturación. ¿El cargo aparece duplicado en su cuenta?',
    'no llega|paquete|envío|entrega': 'Lamento el inconveniente con su entrega. ¿El pedido aparece como entregado en el sistema?',
    'roto|dañado|defecto|tara': 'Siento escuchar que el producto llegó dañado. ¿Podría describir el daño?'
  },
  fallback: 'Entiendo. ¿Podría darme más detalles para poder ayudarle mejor?',
  completion: 'He recopilado toda la información necesaria. Generando su ticket...'
}
```

**Flujo de Conversación:**
1. Usuario envía mensaje
2. Sistema detecta intención (simulado)
3. Typing indicator (1-1.5s)
4. Respuesta contextual
5. Tras 3-4 mensajes: Generación de ticket

### 7. Transición entre Vistas

**Efecto Split Diagonal:**
- Al toggle, pantalla se divide diagonalmente
- Vista actual rota 90° y se desvanece
- Nueva vista rota desde -90° a 0°
- Líneas conectoras animadas entre vistas
- Duración: 600ms
- Easing: `[0.34, 1.56, 0.64, 1]` (spring)

## Animations Specifications

### Partículas Convergentes
```typescript
const particleVariants = {
  initial: { 
    x: randomEdgeX(), 
    y: randomEdgeY(), 
    opacity: 0,
    scale: 0 
  },
  converge: { 
    x: '50%', 
    y: '50%', 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }
  },
  solidify: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2 }
  }
}
```

### Scan Line
```typescript
const scanLineVariants = {
  initial: { clipPath: 'inset(0 0 100% 0)' },
  reveal: { 
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.4, ease: 'linear' }
  }
}
```

### Stagger Messages
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300 }
  }
}
```

## Data Structures

### Message
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

### Ticket
```typescript
interface Ticket {
  id: string;
  category: string;
  subCategory?: string;
  priority: 'high' | 'medium' | 'low';
  items: string[];
  summary: string;
  status: 'pending' | 'resolved';
  createdAt: Date;
  originalConversation: Message[];
}
```

### AnalysisState
```typescript
interface AnalysisState {
  detectedCategory: string | null;
  confidence: number;
  keywords: string[];
  missingInfo: string[];
}
```

## Mock Data

### Tickets Pre-cargados
```typescript
const mockTickets: Ticket[] = [
  {
    id: 'TK-3312',
    category: 'Mixto',
    priority: 'medium',
    items: ['Vestido Floral Seda', 'Bolso Piel Negro'],
    summary: 'Devolución por tara + reclamación por cargo duplicado',
    status: 'pending',
    createdAt: new Date(Date.now() - 7200000)
  },
  {
    id: 'TK-3314',
    category: 'Envío',
    priority: 'high',
    items: ['Paquete no entregado'],
    summary: 'Pedido consta como entregado pero cliente no lo recibió',
    status: 'resolved',
    createdAt: new Date(Date.now() - 5400000)
  }
];
```

## Responsive Behavior

**Desktop (>1024px):**
- Modal: 90% width x 90% height
- Vista Cliente: Chat centrado + sidebar análisis
- Vista Agente: Sidebar métricas + lista tickets + detalle

**Tablet (768-1024px):**
- Modal: 95% width x 95% height
- Vista Cliente: Chat full width
- Vista Agente: Tabs para métricas/lista/detalle

**Mobile (<768px):**
- Modal: 100% width x 100% height (fullscreen)
- Vista Cliente: Chat fullscreen
- Vista Agente: Stack vertical, scroll entre secciones

## Accessibility

- Cerrar con tecla ESC
- Focus trap dentro del modal
- ARIA labels para toggle de vistas
- Reducir motion: desactivar partículas si prefers-reduced-motion
- Contraste WCAG AA para textos

## Performance Considerations

- Lazy load componente NexusDemo (dynamic import)
- Cleanup de listeners/teclas al cerrar modal
- Memoización de componentes estáticos
- Animaciones con transform/opacity (GPU accelerated)
- Canvas partículas con requestAnimationFrame

## Integration with Portfolio

### Location
Sección "Proyectos Destacados" → Proyecto "Nexus - Sistema de Triage IA"

### Trigger
Botón "Probar Demo" con efecto:
- Hover: Scale 1.05 + glow naranja
- Active: Scale 0.98
- Icono: Play o Bot

### Exit
- Botón X esquina superior derecha
- Clic fuera del modal (backdrop)
- Tecla ESC

## Dependencies

```json
{
  "framer-motion": "^11.x",
  "lucide-react": "^0.x",
  "date-fns": "^3.x"
}
```

## Success Criteria

- [ ] Modal se abre con animación de partículas fluida
- [ ] Chat simulado responde contextualmente
- [ ] Toggle entre vistas funciona con transición elegante
- [ ] Tickets pre-cargados son interactivos
- [ ] Demo cierra correctamente y devuelve al portfolio
- [ ] Responsive en desktop y móvil
- [ ] No requiere API keys para funcionar

## Open Questions

1. ¿Quieres efectos de sonido sutil (opcional, mute por defecto)?
2. ¿Incluir un botón "Ver Código" que enlace al repo?
3. ¿Mostrar alguna limitación de la demo (ej: "5 mensajes máx.")?
