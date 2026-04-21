# Estilos con Tailwind CSS

## Configuración (`src/index.css`)

### Fuentes Importadas
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600;700&family=Antic&family=Antic+Didone&display=swap');
@import "tailwindcss";
```

### Tema Personalizado
```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --font-antic: "Antic", sans-serif;
  --color-accent: #D4FF00;      // Verde neón (color principal)
  --color-background: #0A0A0A;  // Negro oscuro (fondo)
}
```

---

## Paleta de Colores

| Color | Valor | Uso |
|-------|-------|-----|
| **Accent** | `#D4FF00` | Color principal, textos destacados, botones |
| **Background** | `#0A0A0A` | Fondo principal |
| **White** | `#FFFFFF` | Texto principal |
| **Neutral-500** | `gray` | Texto secundario |
| **Gray-400** | `gray` | Descripciones |
| **Gray-500** | `gray` | Texto muted |
| **Gray-600** | `gray` | Footer text |
| **Gray-900** | `gray` | Fondos secundarios |

### Uso en Tailwind
```tsx
// Color accent
text-accent           // Texto verde neón
bg-accent             // Fondo verde neón
border-accent/30      // Borde con 30% opacidad
shadow-accent/20      // Sombra con 20% opacidad

// Background
bg-background         // Fondo negro
text-background       // Texto negro (raro, para contrastes)

// Escala de grises
text-white            // Texto blanco
text-gray-400         // Descripciones
text-gray-500         // Texto secundario
text-gray-600         // Footer
bg-gray-900           // Fondos de imágenes
bg-white/[0.01]       // Fondo blanco casi transparente
```

---

## Tipografía

### Fuentes Disponibles
| Fuente | Clase Tailwind | Uso |
|--------|----------------|-----|
| **Inter** | `font-sans` | Texto principal |
| **Fira Code** | `font-mono` | Código, etiquetas, textos técnicos |
| **Antic** | `font-antic` | Textos decorativos |

### Tamaños de Texto
```tsx
// Hero principal
text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px]

// Secciones
text-3xl md:text-5xl        // Títulos de sección
text-4xl md:text-5xl        // Títulos de proyecto
text-6xl md:text-8xl        // CTA grande

// Textos normales
text-xl                     // Descripciones largas
text-base                   // Texto estándar
text-sm                     // Texto pequeño
text-xs                     // Etiquetas, badges

// Textos muy pequeños
text-[10px] md:text-xs      // Subtítulos, metadata
```

### Propiedades de Texto
```tsx
// Tracking (letter-spacing)
tracking-tighter            // Muy junto (títulos grandes)
tracking-tight              // Algo junto
tracking-widest             // Muy separado (etiquetas)
tracking-[0.3em]            // Custom (badges)
tracking-[0.4em]            // Custom (subtítulos)

// Leading (line-height)
leading-[0.75]              // Muy compacto (hero)
leading-tight               // Compacto
leading-relaxed             // Espacioso (descripciones)
!leading-[1.4]              // Forzado (sobreescribe)

// Font weight
font-bold                   // 700
font-extrabold              // 800

// Transformación
uppercase                   // MAYÚSCULAS
lowercase                   // minúsculas
capitalize                  // Primera Mayúscula
```

---

## Layout

### Flexbox
```tsx
// Centrado perfecto
flex items-center justify-center

// Espaciado entre items
flex items-center gap-4

// Distribución
flex items-center justify-between

// Dirección
flex flex-col               // Vertical
flex flex-col md:flex-row   // Vertical en móvil, horizontal en desktop
```

### Grid
(No se usa en el proyecto actual, pero disponible)

### Posicionamiento
```tsx
// Fixed (header, shader)
fixed top-0 left-0 right-0 z-50

// Absolute (elementos posicionados)
absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2

// Relative (para hijos absolute)
relative

// Sticky (parallax)
sticky top-0
```

### Z-Index
```tsx
-z-10       // Shader de fondo
z-10        // Contenido principal
z-50        // Header
z-[100]     // Menú dropdown
```

---

## Espaciado

### Padding
```tsx
px-6            // Horizontal padding
py-6            // Vertical padding
px-3 py-1       // Badge padding
p-4             // Padding general
p-6             // Padding de sección
py-32           // Padding vertical grande
py-48           // Padding de CTA
```

### Margin
```tsx
mb-2            // Margen inferior pequeño
mb-8            // Margen de sección
mb-20           // Margen grande
mt-12           // Margen superior
mt-16           // Margen extra grande
mx-auto         // Centrado horizontal
```

### Gap
```tsx
gap-2           // Espaciado mínimo
gap-3           // Espaciado pequeño
gap-4           // Espaciado estándar
gap-10          // Espaciado grande
gap-16          // Espaciado muy grande
gap-12          // Espaciado de footer
```

### Espaciado de Secciones
| Sección | Padding |
|---------|---------|
| Hero | `min-h-screen` |
| Sobre Mí | `py-32` |
| Proyectos | `py-32 px-6` |
| CTA | `py-48 px-6` |
| Footer | `py-16 px-6` |

---

## Bordes y Sombras

### Border Radius
```tsx
rounded-lg          // 8px (menú, badges)
rounded-full        // Pill (botones)
rounded-2xl         // 16px (cards de imágenes)
rounded-[2rem]      // 32px (proyectos)
```

### Bordes
```tsx
border              // 1px sólido
border-none         // Sin borde
border-t            // Solo top
border-accent/30    // Color accent con 30% opacidad
border-white/5      // Blanco casi transparente
border-white/10     // Blanco ligeramente visible
border-dotted       // Estilo punteado
```

### Sombras
```tsx
shadow-2xl          // Sombra extra grande
shadow-xl           // Sombra grande
shadow-accent/20    // Sombra color accent
```

---

## Fondos y Gradientes

### Fondos Sólidos
```tsx
bg-black            // Fondo negro
bg-white            // Fondo blanco
bg-transparent      // Transparente
bg-white/[0.01]     // Blanco casi transparente
bg-accent           // Color accent
bg-accent/5         // Accent muy suave (badges)
bg-gray-900         // Gris oscuro (imágenes)
```

### Gradientes
```tsx
// Gradiente de texto
bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500

// Gradiente de fondo
bg-gradient-to-t from-background to-transparent
```

### Backdrop Filter
```tsx
backdrop-blur-sm    // Desenfoque de fondo (badges)
```

---

## Efectos y Transiciones

### Opacidad
```tsx
opacity-0           // Invisible
opacity-60          // Semi-transparente
opacity-80          // Casi visible
opacity-100         // Totalmente visible
```

### Filtros
```tsx
blur(10px)          // Desenfoque (animaciones)
blur(0px)           // Sin desenfoque
```

### Transiciones
```tsx
transition-colors           // Solo color
transition-colors duration-300  // Color en 300ms
transition-all              // Todas las propiedades
transition-transform        // Solo transform
```

### Hover Effects
```tsx
hover:text-accent           // Cambiar color
hover:scale-105             // Escalar ligeramente
hover:opacity-80            // Cambiar opacidad
```

### Group Hover
```tsx
// En el padre
className="group"

// En el hijo
className="group-hover:translate-x-2 transition-transform"
className="group-hover:scale-105"
```

---

## Utilidades Personalizadas

### Clases Custom en `index.css`
```css
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500;
}

.hover-lime {
  @apply transition-colors duration-300 hover:text-accent;
}
```

### Clases Arbitrarias de Tailwind
```tsx
text-[60px]             // Tamaño custom
text-[180px]            // Tamaño muy grande
text-[10px]             // Tamaño muy pequeño
w-[200px]               // Ancho custom
h-[300vh]               // Altura custom (parallax)
w-[35vw]                // Ancho basado en viewport
top-[27.5vh]            // Posición custom
left-[27.5vw]           // Posición custom
z-[100]                 // Z-index custom
bg-white/[0.01]         // Opacidad de fondo custom
```

---

## Responsive Design

### Breakpoints
| Prefijo | Ancho | Dispositivo |
|---------|-------|-------------|
| `sm:` | 640px | Móviles grandes |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |

### Patrón Responsivo Común
```tsx
// Mobile-first
text-[60px]           // Móvil
sm:text-[100px]       // Móvil grande
md:text-[140px]       // Tablet
lg:text-[180px]       // Desktop
```

### Layout Responsivo
```tsx
// Dirección de flex
flex-col              // Móvil: vertical
md:flex-row           // Tablet+: horizontal

// Alineación
items-center          // Centrado
md:items-start        // Tablet+: alineado al inicio

// Espaciado
gap-8                 // Móvil
md:gap-16             // Tablet+
```

---

## Patrones de Estilo del Proyecto

### Badge/Etiqueta
```tsx
<div className="px-3 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm mb-2">
  <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
    AI SOLUTIONS ARCHITECT
  </span>
</div>
```

### Texto con Accent Inline
```tsx
<span className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block">
  IA
</span>
```

### Separador Decorativo
```tsx
<div className="flex items-center justify-center gap-4 mt-12">
  <div className="h-[1px] w-12 bg-accent/30" />
  <div className="text-base font-mono">
    <span className="text-gray-500 uppercase tracking-widest text-xs">Sobre mí —</span>{" "}
    <span className="text-white">Alejandro López</span>
  </div>
  <div className="h-[1px] w-12 bg-accent/30" />
</div>
```

### Card de Proyecto
```tsx
<div className="flex-1 w-full aspect-video overflow-hidden rounded-[2rem] bg-gray-900 group relative shadow-2xl">
  <img className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
</div>
```

---

## Mejores Prácticas

1. **Usar valores del tema** antes que arbitrarios (`text-accent` vs `text-[#D4FF00]`)
2. **Mobile-first** - Estilos base para móvil, breakpoints para desktop
3. **Combinar `transition-*`** con `hover:` para interacciones suaves
4. **Usar `group` + `group-hover:`** para efectos anidados
5. **Limitar `z-index`** a valores específicos (-10, 10, 50, 100)
6. **Usar `aspect-video`** para contenedores de imágenes 16:9
7. **Prefijar con `!`** solo cuando sea necesario sobreescribir (`!leading-[1.4]`)
