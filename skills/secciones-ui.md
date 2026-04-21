# Secciones de la UI

## Estructura General del Portfolio

```
┌─────────────────────────────────────────┐
│           HEADER (Fixed)                │  ← Menú + Logo
├─────────────────────────────────────────┤
│                                         │
│           HERO SECTION                  │  ← Nombre + Tagline
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         PARALLAX SECTION                │  ← Scroll zoom con textos
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         SOBRE MÍ SECTION                │  ← Descripción con animaciones
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         PROYECTOS SECTION               │  ← Cards alternadas
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         CTA SECTION                     │  ← Call to action
│                                         │
├─────────────────────────────────────────┤
│           FOOTER                        │  ← Links + Copyright
└─────────────────────────────────────────┘
```

---

## 1. Header (Navegación)

### Posición
```tsx
<header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
```
- **Fixed:** Siempre visible al hacer scroll
- **z-50:** Encima de todo (excepto shader que está en -z-10)

### Componentes
| Elemento | Descripción |
|----------|-------------|
| **Menú Button** | Icono `Menu` / `X` de Lucide, abre dropdown |
| **Signature** | Texto "AL" grande (logo personal) |
| **Theme Toggle** | Placeholder vacío (no implementado) |

### Menú Dropdown
```tsx
<div className="absolute top-full left-0 w-[200px] md:w-[240px] bg-black p-4 rounded-lg">
  {menuItems.map((item) => (
    <a className="block text-lg py-1.5 px-2 hover:text-accent">
      {item.label}
    </a>
  ))}
</div>
```

### Items del Menú
```typescript
const menuItems = [
  { label: "INICIO", href: "#", highlight: true },
  { label: "SOBRE MÍ", href: "#sobre-mi" },
  { label: "PROYECTOS", href: "#proyectos" },
  { label: "CONTACTO", href: "#contacto" },
];
```

### Comportamiento
- **Click outside:** Cierra el menú
- **Click en link:** Cierra el menú y navega
- **Highlight:** "INICIO" siempre en color accent

---

## 2. Hero Section

### Estructura
```tsx
<main className="relative min-h-screen flex flex-col">
  {/* Nombre centrado */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <BlurText text="ALEJANDRO" />
    <BlurText text="LOPEZ" />
  </div>

  {/* Tagline abajo */}
  <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
    <Badge>AI SOLUTIONS ARCHITECT</Badge>
    <BlurText>AUTOMATIZACIÓN • PROMPT ENGINEERING • IA APLICADA</BlurText>
    <AnimatedLine />
    <p>Sistemas inteligentes para negocios reales</p>
  </div>

  {/* Scroll indicator */}
  <button onClick={() => scrollDown()}>
    <ChevronDown className="animate-bounce" />
  </button>
</main>
```

### Texto Principal
```tsx
<BlurText
  text="ALEJANDRO"
  delay={100}
  animateBy="letters"
  direction="top"
  className="font-bold text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.75] tracking-tighter uppercase"
  style={{ color: "#D4FF00", fontFamily: "'Fira Code', monospace" }}
/>
```

### Badge
```tsx
<div className="px-3 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm mb-2">
  <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
    AI SOLUTIONS ARCHITECT
  </span>
</div>
```

### Tagline Secundario
```tsx
<BlurText
  text="AUTOMATIZACIÓN • PROMPT ENGINEERING • IA APLICADA"
  delay={40}
  animateBy="letters"
  direction="top"
  className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center font-mono font-bold tracking-tighter uppercase"
  style={{ color: "#D4FF00" }}
/>
```

### Separador Animado
```tsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: "60px" }}
  transition={{ delay: 2, duration: 1 }}
  className="h-[1px] bg-accent/50"
/>
```

### Scroll Indicator
```tsx
<button
  onClick={() => document.getElementById('parallax-trigger')?.scrollIntoView({ behavior: 'smooth' })}
  className="absolute bottom-4 left-1/2 -translate-x-1/2"
>
  <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-accent animate-bounce" />
</button>
```

---

## 3. Parallax Section (ZoomParallax)

### Trigger
```tsx
<div id="parallax-trigger">
  <ZoomParallax images={parallaxImages} />
</div>
```

### Datos
```typescript
const parallaxImages = [
  { text: "CONTINUA DESLIZANDO" },           // Centro
  { text: "AUTOMATIZACION INTELIGENTE" },
  { text: "ARQUITECTURA DE PROMPTS" },
  { text: "VIBE CODING" },
  { text: "APP PERSONALIZADAS" },
  { text: "SISTEMAS DE CONOCIMIENTO Y ORGANIZACION CON IA" },
  { text: "IA APLICADA AL MARKETING" },
];
```

### Comportamiento
- Altura total: `300vh` (scroll muy largo)
- Sticky: `h-screen` mientras se hace scroll
- Zoom: Cada item se escala de `1x` a `4x-9x`
- Posicionamiento: Cada item tiene posición única con clases arbitrarias

---

## 4. Sobre Mí Section

### ID
```tsx
<section id="sobre-mi" ref={aboutRef}>
```

### Estructura
```tsx
<div className="max-w-4xl mx-auto text-center">
  <TimelineContent as="h2" animationNum={0}>
    Aplico <span>IA</span>, <span>integración de procesos</span> 
    y <span>herramientas personalizadas</span> para transformar 
    operaciones, simplificar tareas y crear <span>soluciones digitales</span> 
    con impacto real.
  </TimelineContent>

  <TimelineContent as="h2" animationNum={5}>
    Desde <span>automatizaciones</span> hasta <span>aplicaciones personalizadas</span>, 
    desarrollo <span>sistemas pensados</span> para resolver necesidades 
    concretas de forma eficaz.
  </TimelineContent>

  <motion.div>
    <div className="h-[1px] w-12 bg-accent/30" />
    <div>
      <span className="text-gray-500 uppercase tracking-widest text-xs">Sobre mí —</span>{" "}
      <span className="text-white">Alejandro López</span>
    </div>
    <div className="h-[1px] w-12 bg-accent/30" />
  </motion.div>
</div>
```

### Spans con Accent
```tsx
<TimelineContent as="span" animationNum={1}>
  <span className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block">
    IA
  </span>
</TimelineContent>
```

### Animación
- **TimelineContent:** Se anima al hacer scroll
- **Delay escalonado:** `animationNum * 0.2`
- **Separador:** Aparece con `whileInView`

---

## 5. Proyectos Section

### Layout
```tsx
<section id="proyectos" className="py-32 px-6 bg-white/[0.01]">
  <div className="max-w-7xl mx-auto">
    <Header />
    <div className="space-y-40">
      {projects.map((project, index) => (
        <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <Image />
          <Content />
        </div>
      ))}
    </div>
  </div>
</section>
```

### Header
```tsx
<div className="flex items-end justify-between mb-20">
  <h2 className="text-6xl font-extrabold tracking-tighter">
    Proyectos <br /> Destacados
  </h2>
  <div className="text-gray-500 text-sm font-mono">01 — 03</div>
</div>
```

### Datos de Proyectos
```typescript
const projects = [
  {
    id: "01",
    tag: "IA / OPTIMIZACIÓN",
    title: "Asistente de IA para optimización de procesos internos",
    description: "Sistema analítico para auditar procesos, detectar cuellos de botella y proponer mejoras automatizadas.",
    image: "https://picsum.photos/seed/ai-process/800/600",
  },
  // ... 2 más
];
```

### Card de Proyecto
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {/* Imagen */}
  <div className="flex-1 w-full aspect-video overflow-hidden rounded-[2rem] bg-gray-900 group relative shadow-2xl">
    <img
      src={project.image}
      className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
  </div>

  {/* Contenido */}
  <div className="flex-1 space-y-8">
    <div className="flex items-center gap-3">
      <span className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(212,255,0,0.5)]" />
      <span className="text-accent font-bold text-sm tracking-widest uppercase">{project.tag}</span>
    </div>
    <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
      {project.title}
    </h3>
    <p className="text-gray-400 text-xl leading-relaxed">
      {project.description}
    </p>
    <button className="group flex items-center gap-3 text-white font-bold text-lg hover:text-accent">
      Ver proyecto <ArrowRight className="w-6 h-6 group-hover:translate-x-2" />
    </button>
  </div>
</motion.div>
```

### Layout Alternado
```tsx
className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
```
- **Proyecto par (0, 2):** Imagen izquierda, contenido derecha
- **Proyecto impar (1):** Imagen derecha, contenido izquierda

---

## 6. CTA Section (Call to Action)

### Estructura
```tsx
<section id="contacto" className="py-48 px-6 text-center">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-12">
      Construyamos algo <br />
      <span className="text-accent italic">más inteligente.</span>
    </h2>
    <button className="bg-accent text-black px-12 py-6 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-xl shadow-accent/20">
      Contactar ahora
    </button>
  </div>
</section>
```

### Características
- **Padding grande:** `py-48` para dar espacio
- **Texto enorme:** `text-6xl md:text-8xl`
- **Botón prominente:** `px-12 py-6`, color accent, hover scale
- **Sombra accent:** `shadow-accent/20` para glow

---

## 7. Footer

### Estructura
```tsx
<footer className="py-16 px-6 border-t border-white/5">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
    <div className="font-bold text-2xl tracking-tighter">
      ALEJANDRO <span className="text-accent">LOPEZ</span>
    </div>
    
    <div className="flex items-center gap-10">
      <a href="#" className="text-gray-500 hover:text-accent flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
        Linkedin <ExternalLink />
      </a>
      <a href="#" className="...">Github <ExternalLink /></a>
      <a href="#" className="...">Email <ExternalLink /></a>
    </div>
    
    <div className="text-gray-600 text-sm font-mono uppercase">
      © 2024 Alejandro Lopez
    </div>
  </div>
</footer>
```

### Links Sociales
```tsx
<a href="#" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
  Linkedin <ExternalLink className="w-4 h-4" />
</a>
```

---

## Navegación entre Secciones

### IDs de Sección
| Sección | ID |
|---------|-----|
| Hero | (ninguno) |
| Parallax | `parallax-trigger` |
| Sobre Mí | `sobre-mi` |
| Proyectos | `proyectos` |
| Contacto | `contacto` |

### Scroll Smooth
```tsx
// Desde scroll indicator
document.getElementById('parallax-trigger')?.scrollIntoView({ behavior: 'smooth' })

// Desde menú
<a href="#sobre-mi">SOBRE MÍ</a>
```

---

## Jerarquía Visual

### Nivel 1: Hero
- Texto más grande (`180px`)
- Color accent (`#D4FF00`)
- Centro de pantalla

### Nivel 2: Títulos de Sección
- `text-6xl` a `text-8xl`
- Font extrabold
- Tracking tighter

### Nivel 3: Títulos de Proyecto
- `text-4xl` a `text-5xl`
- Font bold

### Nivel 4: Descripciones
- `text-xl`
- Color gray-400

### Nivel 5: Metadata
- `text-xs` a `text-sm`
- Uppercase + tracking-widest
- Color gray-500

---

## Espaciado entre Secciones

| Transición | Espacio |
|------------|---------|
| Hero → Parallax | Directo (scroll trigger) |
| Parallax → Sobre Mí | `py-32` |
| Sobre Mí → Proyectos | `py-32` + `space-y-40` |
| Proyectos → CTA | `py-48` |
| CTA → Footer | Directo (border-top) |
