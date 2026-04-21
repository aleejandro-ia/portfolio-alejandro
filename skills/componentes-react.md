# Componentes React

## Componente Principal: `App.tsx`

### Estructura
```typescript
export default function App() {
  // Estado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Variantes de animación
  const revealVariants = { ... };
  const textVariants = { ... };
  
  // Efectos
  useEffect(() => { /* dark mode */ }, []);
  useEffect(() => { /* click outside */ }, [isMenuOpen]);
  
  // Datos
  const menuItems = [ ... ];
  
  return (/* JSX */);
}
```

### Props Interface (implícito)
No tiene props externos, es el componente raíz.

### Estado Interno
| Estado | Tipo | Uso |
|--------|------|-----|
| `isMenuOpen` | `boolean` | Controla visibilidad del menú |
| refs | `RefObject` | Referencias a elementos DOM para eventos y animaciones |

---

## BlurText (Componente Local en App.tsx)

### Interface
```typescript
interface BlurTextProps {
  text: string;                    // Texto a animar
  delay?: number;                  // Delay entre segmentos (ms)
  animateBy?: "words" | "letters"; // Animar por palabras o letras
  direction?: "top" | "bottom";    // Dirección de entrada
  className?: string;              // Clases CSS adicionales
  style?: React.CSSProperties;     // Estilos inline
}
```

### Uso
```tsx
<BlurText
  text="ALEJANDRO"
  delay={100}
  animateBy="letters"
  direction="top"
  className="font-bold text-[180px] leading-[0.75]"
  style={{ color: "#D4FF00" }}
/>
```

### Comportamiento
- Usa **IntersectionObserver** para detectar visibilidad
- Aplica **blur + translate + opacity** como animación
- Segmenta texto por palabras o letras
- Transición: `all 0.5s ease-out`

---

## TimelineContent (`src/components/ui/timeline-animation.tsx`)

### Interface
```typescript
interface TimelineContentProps {
  as?: any;                        // Elemento HTML a renderizar
  animationNum?: number;           // Número de animación (para delay)
  timelineRef: React.RefObject<HTMLElement | null>; // Ref del contenedor
  customVariants?: Variants;       // Variantes personalizadas de Motion
  className?: string;              // Clases CSS
  children: React.ReactNode;       // Contenido
}
```

### Uso
```tsx
<TimelineContent
  as="h2"
  animationNum={0}
  timelineRef={aboutRef}
  customVariants={revealVariants}
  className="text-3xl md:text-5xl font-bold text-white mb-8"
>
  Aplico <span>IA</span> para transformar
</TimelineContent>
```

### Comportamiento
- Usa **useInView** para detectar scroll
- Animación por defecto: `blur(10px) → blur(0px)`, `y: 20 → 0`, `opacity: 0 → 1`
- Delay escalonado: `animationNum * 0.2`
- Una vez visible, no se vuelve a animar (`once: true`)

---

## ZoomParallax (`src/components/ui/ZoomParallax.tsx`)

### Interface
```typescript
interface Image {
  src?: string;    // URL de imagen (opcional)
  alt?: string;    // Texto alternativo
  text?: string;   // Texto a mostrar (si no hay imagen)
}

interface ZoomParallaxProps {
  images: Image[]; // Array de máximo 7 items
}
```

### Uso
```tsx
const parallaxImages = [
  { text: "CONTINUA DESLIZANDO" },
  { text: "AUTOMATIZACION INTELIGENTE" },
  // ... hasta 7 items
];

<ZoomParallax images={parallaxImages} />
```

### Comportamiento
- Altura total: `300vh` (scroll largo)
- Posición sticky: `top-0 h-screen`
- Escalas de zoom: `[1→4, 1→5, 1→6, 1→5, 1→6, 1→8, 1→9]`
- Posicionamiento específico por índice con clases Tailwind arbitrarias
- Renderiza imágenes `<img>` o `<span>` con texto

---

## ShaderAnimation (`src/components/ShaderAnimation.tsx`)

### Props
No tiene props.

### Uso
```tsx
<ShaderAnimation />
```

### Comportamiento
- Fondo fijo: `fixed inset-0 -z-10`
- WebGL con **Three.js** + **ShaderMaterial**
- Fragment shader personalizado con patrones de líneas
- Limpieza completa en desmontaje (dispose de geometría, material, renderer)
- Manejo de resize con `devicePixelRatio` limitado a 2

---

## Patrones de Componentes

### Componente con Animación de Entrada
```typescript
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.5, duration: 0.7 },
  }),
  hidden: { filter: "blur(10px)", y: 40, opacity: 0 },
};

<motion.div
  custom={index}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={revealVariants}
>
```

### Componente con IntersectionObserver
```typescript
const [inView, setInView] = useState(false);
const ref = useRef<HTMLParagraphElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setInView(true); },
    { threshold: 0.1 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => { if (ref.current) observer.unobserve(ref.current); };
}, []);
```

### Componente con Click Outside
```typescript
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

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isMenuOpen]);
```

### Componente WebGL con Cleanup
```typescript
useEffect(() => {
  if (!containerRef.current) return;
  
  // Inicialización
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  containerRef.current.appendChild(renderer.domElement);
  
  // Cleanup
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
