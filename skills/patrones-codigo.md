# Patrones de Código Reutilizables

## Patrones de React

### 1. Componente con Animación de Revelación (Blur + Slide)

```typescript
// Definición de variantes
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.5, duration: 0.7 },
  }),
  hidden: { filter: "blur(10px)", y: 40, opacity: 0 },
};

// Uso
<motion.div
  custom={index}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={revealVariants}
>
  Contenido
</motion.div>
```

**Cuándo usar:** Elementos que aparecen al hacer scroll

---

### 2. Componente con IntersectionObserver

```typescript
const [inView, setInView] = useState(false);
const ref = useRef<HTMLParagraphElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setInView(true);
    },
    { threshold: 0.1 }
  );
  
  if (ref.current) observer.observe(ref.current);
  return () => {
    if (ref.current) observer.unobserve(ref.current);
  };
}, []);

// Uso en JSX
<p ref={ref} style={{
  filter: inView ? "blur(0px)" : "blur(10px)",
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(-20px)",
  transition: "all 0.5s ease-out",
}}>
  {text}
</p>
```

**Cuándo usar:** Animaciones custom sin Framer Motion

---

### 3. Click Outside Handler

```typescript
const menuRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      isMenuOpen &&
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isMenuOpen]);
```

**Cuándo usar:** Menús dropdown, modales, popovers

---

### 4. WebGL Shader con Cleanup

```typescript
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!containerRef.current) return;
  
  let renderer: THREE.WebGLRenderer | null = null;
  let animationId: number | null = null;
  let geometry: THREE.PlaneGeometry | null = null;
  let material: THREE.ShaderMaterial | null = null;

  try {
    // Inicialización
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    containerRef.current.appendChild(renderer.domElement);
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      // Actualizar uniforms
      if (renderer) renderer.render(scene, camera);
    };
    animate();

  } catch (error) {
    console.error("Error:", error);
    return () => {};
  }

  // Cleanup obligatorio
  return () => {
    window.removeEventListener("resize", onWindowResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    }
    if (geometry) geometry.dispose();
    if (material) material.dispose();
  };
}, []);
```

**Cuándo usar:** Three.js, Canvas, WebGL, animaciones complejas

---

### 5. Scroll-based Animation

```typescript
const container = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: container,
  offset: ['start start', 'end end'],
});

const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

<motion.div style={{ scale }}>
  Contenido con zoom
</motion.div>
```

**Cuándo usar:** Parallax, efectos de scroll, animaciones vinculadas al scroll

---

### 6. Dark Mode por Defecto

```typescript
useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);
```

**Cuándo usar:** Aplicaciones que siempre inician en modo oscuro

---

### 7. Dynamic Motion Component

```typescript
import { motion, Variants } from "motion/react";

interface TimelineContentProps {
  as?: any;
  animationNum?: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  as = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className = "",
  children,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 });
  
  // Crear componente motion dinámico
  const MotionComponent = motion.create(as);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: animationNum * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants || defaultVariants}
      custom={animationNum}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
```

**Cuándo usar:** Componentes de animación reutilizables con diferentes elementos HTML

---

## Patrones de TypeScript

### 1. Interface para Props de Componente

```typescript
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  // ...
};
```

---

### 2. Interface con Valores por Defecto

```typescript
interface TimelineContentProps {
  as?: any;                    // Default: "div"
  animationNum?: number;       // Default: 0
  timelineRef: React.RefObject<HTMLElement | null>;  // Obligatorio
  customVariants?: Variants;   // Opcional
  className?: string;          // Default: ""
  children: React.ReactNode;   // Obligatorio
}
```

---

### 3. Union Types

```typescript
animateBy?: "words" | "letters";
direction?: "top" | "bottom";
```

---

### 4. Type Assertions

```typescript
// Type assertion para event targets
!menuRef.current.contains(event.target as Node)

// Type assertion para element no-null
createRoot(document.getElementById('root')!).render(<App />);
```

---

### 5. Generic Ref Types

```typescript
const ref = useRef<HTMLParagraphElement>(null);
const menuRef = useRef<HTMLDivElement>(null);
const container = useRef<HTMLDivElement>(null);
```

---

## Patrones de Tailwind

### 1. Responsive con Breakpoints

```tsx
text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px]
```

---

### 2. Condicionales Dinámicos

```tsx
className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
```

---

### 3. Clases Arbitrarias

```tsx
w-[200px]           // Ancho custom
h-[300vh]           // Alto custom
text-[180px]        // Tamaño custom
top-[27.5vh]        // Posición custom
z-[100]             // Z-index custom
bg-white/[0.01]     // Opacidad custom
```

---

### 4. Group Hover

```tsx
// Padre
<div className="group">
  {/* Hijo con hover */}
  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
</div>
```

---

### 5. Opacidad con Slash

```tsx
border-accent/30    // 30% opacidad
bg-accent/5         // 5% opacidad
text-white/10       // 10% opacidad
shadow-accent/20    // 20% opacidad
```

---

## Patrones de Datos

### 1. Array de Objetos Estáticos

```typescript
const services = [
  {
    title: "Arquitectura de prompts",
    description: "Ingeniería avanzada para maximizar el potencial de los LLMs.",
    icon: <Cpu className="w-6 h-6" />,
  },
  // ...
];
```

---

### 2. Mapeo de Arrays a Componentes

```tsx
{projects.map((project, index) => (
  <motion.div key={index}>
    <img src={project.image} alt={project.title} />
    <h3>{project.title}</h3>
    <p>{project.description}</p>
  </motion.div>
))}
```

---

### 3. Datos con Índices

```tsx
{projects.map((project, index) => (
  <div className={index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}>
    {/* Layout alternado */}
  </div>
))}
```

---

## Patrones de Estado

### 1. Boolean Toggle

```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);

<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
  {isMenuOpen ? <X /> : <Menu />}
</button>
```

---

### 2. Conditional Rendering

```tsx
{isMenuOpen && (
  <div ref={menuRef}>
    {/* Menú dropdown */}
  </div>
)}
```

---

## Patrones de Utilidad

### 1. useMemo para Cálculos

```typescript
const segments = useMemo(() => {
  return animateBy === "words" ? text.split(" ") : text.split("");
}, [text, animateBy]);
```

**Cuándo usar:** Cálculos costosos que dependen de props/state

---

### 2. Navegación Programática

```typescript
// Scroll to element
document.getElementById('parallax-trigger')?.scrollIntoView({ behavior: 'smooth' })

// Cerrar menú después de click
onClick={() => setIsMenuOpen(false)}
```

---

### 3. Dark Mode Enforcement

```typescript
useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);
```

---

## Patrones de Estilo

### 1. Badge/Etiqueta

```tsx
<div className="px-3 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm">
  <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
    AI SOLUTIONS ARCHITECT
  </span>
</div>
```

---

### 2. Texto Highlight con Borde

```tsx
<span className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block">
  IA
</span>
```

---

### 3. Separador Decorativo

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

---

### 4. Dot Indicator con Glow

```tsx
<span className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(212,255,0,0.5)]" />
```

---

### 5. Imagen con Gradiente Overlay

```tsx
<div className="aspect-video overflow-hidden rounded-[2rem] bg-gray-900 group relative">
  <img className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
</div>
```

---

## Anti-Patrones (Qué NO Hacer)

### ❌ Mal: No limpiar efectos
```typescript
// ERROR: Memory leak
useEffect(() => {
  const renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);
  // Sin cleanup!
}, []);
```

### ✅ Bien: Cleanup siempre
```typescript
useEffect(() => {
  const renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);
  
  return () => {
    container.removeChild(renderer.domElement);
    renderer.dispose();
  };
}, []);
```

---

### ❌ Mal: Múltiples loops sin cancelar
```typescript
// ERROR: Múltiples animations corriendo
useEffect(() => {
  const animate = () => requestAnimationFrame(animate);
  animate();
}, []);
```

### ✅ Bien: Cancelar anterior
```typescript
useEffect(() => {
  let animationId: number;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
  };
  animate();
  
  return () => {
    if (animationId) cancelAnimationFrame(animationId);
  };
}, []);
```

---

### ❌ Mal: refs sin null check
```typescript
// ERROR: Puede ser null
useEffect(() => {
  observer.observe(ref.current);  // ref.current puede ser null
}, []);
```

### ✅ Bien: Null check siempre
```typescript
useEffect(() => {
  if (ref.current) {
    observer.observe(ref.current);
  }
  return () => {
    if (ref.current) {
      observer.unobserve(ref.current);
    }
  };
}, []);
```

---

## Checklist de Código

### Para Componentes Nuevos
- [ ] Interface de props definida
- [ ] Valores por defecto para props opcionales
- [ ] Cleanup en useEffect (si aplica)
- [ ] Null checks para refs
- [ ] Type annotations correctos
- [ ] Responsive design considerado
- [ ] Dark mode compatible

### Para WebGL/Canvas
- [ ] Try-catch alrededor de inicialización
- [ ] Cleanup de renderer, geometry, material
- [ ] Cancel animation frame en cleanup
- [ ] Remove event listeners en cleanup
- [ ] Limitar pixel ratio
- [ ] Manejar resize

### Para Animaciones
- [ ] `viewport={{ once: true }}` para animaciones de entrada
- [ ] Delays escalonados para staggered animations
- [ ] Duraciones entre 0.5-1s
- [ ] Easing personalizado si necesario
- [ ] blur(0px) como estado final para revelaciones
