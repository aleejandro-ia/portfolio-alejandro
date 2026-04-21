# Animaciones con Motion (Framer Motion)

## Import
```typescript
import { motion, useInView, useScroll, useTransform, Variants } from "motion/react";
```

---

## Variantes de Animación

### Revelación con Blur
```typescript
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.5,
      duration: 0.7,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 40,
    opacity: 0,
  },
};
```

### Solo Blur
```typescript
const textVariants = {
  visible: (i: number) => ({
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.7,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
};
```

### Uso con Motion Component
```tsx
<motion.div
  custom={index}              // Pasa valor a la función de variante
  initial="hidden"            // Estado inicial
  whileInView="visible"       // Estado al entrar en viewport
  viewport={{ once: true }}   // Solo animar una vez
  variants={revealVariants}   // Variantes a usar
>
  Contenido
</motion.div>
```

---

## useInView Hook

Detecta si un elemento es visible en el viewport.

```typescript
const ref = useRef(null);
const isInView = useInView(ref, { 
  once: true,      // Solo detectar la primera vez
  amount: 0.2      // 20% del elemento visible para trigger
});

<motion.div
  ref={ref}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  variants={variants}
>
```

### Opciones de useInView
| Opción | Tipo | Descripción |
|--------|------|-------------|
| `once` | `boolean` | Si `true`, solo trigger una vez |
| `amount` | `number` | Proporción visible para trigger (0-1) |
| `root` | `Element` | Elemento contenedor (default: viewport) |
| `margin` | `string` | Margen para el observer (ej: "100px") |

---

## useScroll + useTransform

Animaciones basadas en scroll.

### useScroll
```typescript
const container = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: container,
  offset: ['start start', 'end end'],
});
```

### useTransform
Mapea un valor de scroll a un rango diferente.

```typescript
// Escala de 1 a 4 conforme se hace scroll
const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

<motion.div style={{ scale }}>
  Contenido con zoom
</motion.div>
```

### Múltiples Transformaciones
```typescript
const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
```

---

## Animaciones Inline (sin variantes)

### Animación Simples
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2, duration: 0.8 }}
>
  Contenido
</motion.div>
```

### whileInView Directo
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 1, duration: 0.8 }}
>
  Contenido
</motion.div>
```

### Animación de Width/Height
```tsx
<motion.div
  initial={{ width: 0 }}
  animate={{ width: "60px" }}
  transition={{ delay: 2, duration: 1 }}
  className="h-[1px] bg-accent/50"
/>
```

---

## motion.create()

Crear componentes motion personalizados.

```typescript
const MotionComponent = motion.create(as);

// Uso
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
```

---

## Transiciones

### Easing Personalizado
```typescript
transition: {
  duration: 0.8,
  delay: animationNum * 0.2,
  ease: [0.21, 0.47, 0.32, 0.98], // Curva cubic-bezier
}
```

### Tipos de Easing Comunes
| Tipo | Descripción |
|------|-------------|
| `easeInOut` | Suave al inicio y final |
| `easeOut` | Rápido al inicio, suave al final |
| `easeIn` | Suave al inicio, rápido al final |
| `[x1, y1, x2, y2]` | Curva cubic-bezier personalizada |

---

## Animaciones en Hover

```tsx
<button
  className="group"
  // Clases de hover de Tailwind para transformaciones
>
  Ver proyecto 
  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
</button>
```

---

## Patrones de Animación del Proyecto

### Staggered Animation (Animación en Cascada)
```typescript
// Delay progresivo basado en el índice
custom={index}  // Pasa el índice a la variante
visible: (i: number) => ({
  transition: { delay: i * 0.5 }  // Delay escalonado
})
```

### Animación al Scroll con Blur
```typescript
// Elemento aparece desde blur + desplazamiento
hidden: { filter: "blur(10px)", y: 40, opacity: 0 }
visible: { filter: "blur(0px)", y: 0, opacity: 1 }
```

### Parallax con Zoom
```typescript
// Elementos se escalan conforme se hace scroll
style={{ scale }}  // useTransform aplicado directo
```

### Animación de Línea Expansiva
```typescript
// Línea que se expande horizontalmente
initial={{ width: 0 }}
animate={{ width: "60px" }}
```

---

## viewport Options

| Opción | Valores | Descripción |
|--------|---------|-------------|
| `once` | `true/false` | Si animar solo una vez |
| `amount` | `0-1` | Cuánto del elemento debe ser visible |
| `root` | `Element` | Contenedor del observer |
| `margin` | `string` | Margen del viewport (ej: "-100px") |

---

## Mejores Prácticas

1. **Usar `once: true`** para animaciones de entrada (mejor UX)
2. **Limitar `duration`** a 0.5-1s para animaciones responsivas
3. **Usar `filter: blur()`** para revelaciones suaves
4. **Combinar `y` + `opacity`** para animaciones de entrada naturales
5. **Evitar animar propiedades costosas** como `width`, `height` (usar `scale` en su lugar)
6. **Usar `will-change`** con moderación (solo para elementos críticos)
