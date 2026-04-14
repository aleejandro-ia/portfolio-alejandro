# Guía de TypeScript

## Configuración (`tsconfig.json`)

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
    "moduleDetection": "force",
    "allowJs": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Puntos Clave
- **`allowImportingTsExtensions`:** Permite `import './file.tsx'` sin `.tsx` explícito
- **`noEmit`:** TypeScript solo para type-checking, Vite compila
- **`paths`:** Alias `@/` para imports absolutos

---

## Tipos de React

### Functional Components

```typescript
import React from "react";

// Con interface
interface MyComponentProps {
  name: string;
  age?: number;
  children: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ name, age = 0, children }) => {
  return <div>{name} - {age}</div>;
};

// Sin FC (preferido en React 19)
interface MyComponentProps {
  text: string;
}

export function MyComponent({ text }: MyComponentProps) {
  return <div>{text}</div>;
}
```

---

### Hooks con Tipos

#### useState
```typescript
// Boolean
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Number
const [count, setCount] = useState(0);

// String
const [text, setText] = useState("");

// Array
const [items, setItems] = useState<string[]>([]);

// Object
const [user, setUser] = useState<User | null>(null);

// Ref object
const ref = useRef<HTMLDivElement>(null);
```

---

#### useRef
```typescript
// HTML Elements
const containerRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const paragraphRef = useRef<HTMLParagraphElement>(null);

// Values (persist across renders)
const animationId = useRef<number | null>(null);
const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
```

**Acceso seguro:**
```typescript
// Con null check
if (containerRef.current) {
  containerRef.current.appendChild(element);
}

// Con optional chaining
containerRef.current?.appendChild(element);

// Con non-null assertion (solo si estás seguro)
containerRef.current!.appendChild(element);
```

---

#### useEffect
```typescript
// Sin cleanup
useEffect(() => {
  document.documentElement.classList.add("dark");
}, []);  // Empty deps = solo al montar

// Con cleanup
useEffect(() => {
  const observer = new IntersectionObserver(callback);
  if (ref.current) observer.observe(ref.current);
  
  return () => {
    if (ref.current) observer.unobserve(ref.current);
  };
}, [ref]);  // Deps = cuando cambian

// Con event listeners
useEffect(() => {
  const handleClick = (event: MouseEvent) => { /* ... */ };
  document.addEventListener("mousedown", handleClick);
  
  return () => document.removeEventListener("mousedown", handleClick);
}, [isMenuOpen]);  // Dependencia
```

---

#### useMemo
```typescript
const segments = useMemo(() => {
  return animateBy === "words" ? text.split(" ") : text.split("");
}, [text, animateBy]);  // Recalcular cuando cambien
```

---

## Interfaces del Proyecto

### Component Props

```typescript
// BlurText
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

// TimelineContent
interface TimelineContentProps {
  as?: any;
  animationNum?: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

// ZoomParallax
interface Image {
  src?: string;
  alt?: string;
  text?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}
```

---

### Data Types

```typescript
// Menu items
interface MenuItem {
  label: string;
  href: string;
  highlight?: boolean;
}

// Services
interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;  // Lucide icon component
}

// Projects
interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

// Parallax items
interface ParallaxImage {
  src?: string;
  alt?: string;
  text?: string;
}
```

---

## Three.js Types

```typescript
import * as THREE from "three";

// Renderer
let renderer: THREE.WebGLRenderer | null = null;

// Geometry
let geometry: THREE.PlaneGeometry | null = null;

// Material
let material: THREE.ShaderMaterial | null = null;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

// Mesh
const mesh = new THREE.Mesh(geometry, material);

// Vector
const vector = new THREE.Vector2();
```

---

## Motion/Framer Types

```typescript
import { Variants } from "motion/react";

// Variantes de animación
const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.5, duration: 0.7 },
  }),
  hidden: { filter: "blur(10px)", y: 40, opacity: 0 },
};

// Event types
const handleClick = (event: MouseEvent) => { /* ... */ };
```

---

## Patrones de Tipado

### 1. Union Types

```typescript
// String literals
animateBy?: "words" | "letters";
direction?: "top" | "bottom";

// Nullable
let renderer: THREE.WebGLRenderer | null = null;
const [user, setUser] = useState<User | null>(null);

// Optional
delay?: number;
className?: string;
```

---

### 2. Type Guards

```typescript
// Null check
if (containerRef.current) {
  containerRef.current.appendChild(element);
}

// Type narrowing
if (typeof value === "string") {
  value.toUpperCase();
}

// Instance check
if (element instanceof HTMLDivElement) {
  // ...
}
```

---

### 3. Type Assertions

```typescript
// As Node (event targets)
!menuRef.current.contains(event.target as Node)

// Non-null assertion (usar con cuidado)
createRoot(document.getElementById('root')!).render(<App />);

// As const (literal types)
const animateBy = "words" as const;  // Type: "words"
```

---

### 4. Generic Types

```typescript
// useState
const [items, setItems] = useState<string[]>([]);
const [count, setCount] = useState<number>(0);

// useRef
const ref = useRef<HTMLDivElement>(null);
const animationId = useRef<number | null>(null);

// RefObject
timelineRef: React.RefObject<HTMLElement | null>;
```

---

### 5. Index Signatures

```typescript
// Para objetos dinámicos
interface Styles {
  [key: string]: React.CSSProperties;
}

const styles: Styles = {
  container: { display: "flex" },
  text: { color: "white" },
};
```

---

## React.CSSProperties

```typescript
interface BlurTextProps {
  style?: React.CSSProperties;
}

// Uso
<span style={{
  display: "inline-block",
  filter: inView ? "blur(0px)" : "blur(10px)",
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(-20px)",
  transition: `all 0.5s ease-out ${i * delay}ms`,
}}>
```

---

## Event Types

```typescript
// Mouse events
const handleClick = (event: MouseEvent) => { /* ... */ };
const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => { /* ... */ };

// Form events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { /* ... */ };

// Keyboard events
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { /* ... */ };

// Touch events
const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => { /* ... */ };
```

---

## Imports con Alias

```typescript
// Usando @/ alias
import { TimelineContent } from "@/src/components/ui/timeline-animation";
import { ShaderAnimation } from "@/src/components/ShaderAnimation";

// Relative imports (dentro de la misma carpeta)
import { TimelineContent } from "./ui/timeline-animation";

// Parent imports
import { ShaderAnimation } from "../ShaderAnimation";
```

---

## Type Utilities

### keyof
```typescript
interface User {
  name: string;
  age: number;
}

type UserKeys = keyof User;  // "name" | "age"
```

### Partial
```typescript
interface Config {
  delay: number;
  duration: number;
  easing: string;
}

// Todos opcionales
type OptionalConfig = Partial<Config>;
```

### Required
```typescript
// Todos obligatorios
type RequiredConfig = Required<Config>;
```

### Pick
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

// Solo algunos campos
type ProjectCard = Pick<Project, "title" | "description" | "image">;
```

### Omit
```typescript
// Todo menos un campo
type ProjectWithoutId = Omit<Project, "id">;
```

---

## Errores Comunes y Soluciones

### 1. "Object is possibly 'null'"

```typescript
// ❌ Error
ref.current.appendChild(element);

// ✅ Solución
if (ref.current) {
  ref.current.appendChild(element);
}

// o
ref.current?.appendChild(element);
```

---

### 2. "Type 'X' is not assignable to type 'Y'"

```typescript
// ❌ Error
const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
style={{ scale }}  // SpringValue no es válido para style

// ✅ Solución
<motion.div style={{ scale }}>  // Usar motion.div
```

---

### 3. "Cannot find module"

```typescript
// ❌ Error
import { Something } from "@/components/something";

// ✅ Solución - Verificar tsconfig paths
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

---

### 4. "JSX element type does not have any construct signatures"

```typescript
// ❌ Error
const MotionComponent = motion.create(as);

// ✅ Solución - Usar 'any' para 'as'
interface Props {
  as?: any;  // Permitir cualquier elemento
}
```

---

### 5. "Property 'X' does not exist on type 'EventTarget'"

```typescript
// ❌ Error
event.target.value

// ✅ Solución
(event.target as HTMLInputElement).value
```

---

## Mejores Prácticas

1. **Usar interfaces** para props de componentes
2. **Tipar useState** explícitamente para tipos complejos
3. **Null checks** antes de acceder a refs
4. **Union types** para valores restringidos (`"words" | "letters"`)
5. **Optional chaining** (`?.`) para acceso seguro
6. **Non-null assertion** (`!`) solo cuando estés 100% seguro
7. **React.CSSProperties** para estilos inline
8. **Type guards** antes de operaciones específicas de tipo

---

## Comandos de TypeScript

```bash
# Type-checking (sin emitir archivos)
npm run lint  # Ejecuta: tsc --noEmit

# Ver errores de tipo
npx tsc --noEmit

# Ver solo errores
npx tsc --noEmit --pretty
```

---

## Recursos

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.js.org/)
- [Three.js Types](https://threejs.org/docs/)
