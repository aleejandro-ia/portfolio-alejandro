# Optimización y Rendimiento

## Optimización de WebGL/Three.js

### 1. Limitar Pixel Ratio

```typescript
// ✅ Bien - Limitado a 2x
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ❌ Mal - Sin límite (puede ser 3x o más en móviles)
renderer.setPixelRatio(window.devicePixelRatio)
```

**Impacto:** Pantallas con 3x pixel ratio renderizan 2.25x más píxeles

---

### 2. Geometría Simple

```typescript
// ✅ Bien - Solo 4 vértices
const geometry = new THREE.PlaneGeometry(2, 2)

// ❌ Mal - Geometría compleja innecesaria
const geometry = new THREE.PlaneGeometry(2, 2, 100, 100)  // 10,000 vértices
```

---

### 3. Sin Texturas

```typescript
// ✅ Bien - Todo calculado en shader
// (sin texturas que cargar en GPU)

// ❌ Mal - Texturas grandes sin comprimir
const texture = new THREE.TextureLoader().load('huge-image.png')
```

---

### 4. Loops Pequeños en Shaders

```glsl
// ✅ Bien - Máximo 5 iteraciones
for(int i = 0; i < 5; i++){
  // ...
}

// ❌ Mal - Muchas iteraciones
for(int i = 0; i < 100; i++){  // 400 operaciones (5x8x10)
  // ...
}
```

---

### 5. Cleanup Completo

```typescript
// ✅ Bien - Cleanup de todo
return () => {
  window.removeEventListener("resize", onWindowResize);
  if (animationId) cancelAnimationFrame(animationId);
  if (renderer) {
    container?.removeChild(renderer.domElement);
    renderer.dispose();
  }
  geometry?.dispose();
  material?.dispose();
};

// ❌ Mal - Sin cleanup
return () => {};
```

**Consecuencias de no limpiar:**
- Memory leaks (acumulación de WebGL contexts)
- Múltiples loops de animación corriendo
- Crash del navegador

---

## Optimización de React

### 1. useMemo para Cálculos

```typescript
// ✅ Bien - Memorizar cálculo costoso
const segments = useMemo(() => {
  return animateBy === "words" ? text.split(" ") : text.split("");
}, [text, animateBy]);

// ❌ Mal - Recalcular en cada render
const segments = animateBy === "words" ? text.split(" ") : text.split("");
```

---

### 2. viewport {{ once: true }}

```typescript
// ✅ Bien - Animación solo una vez
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

// ❌ Mal - Animación cada vez que entra al viewport
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}  // Default
>
```

**Impacto:** Reduce re-renders y animaciones innecesarias

---

### 3. IntersectionObserver con Cleanup

```typescript
// ✅ Bien - Cleanup correcto
useEffect(() => {
  const observer = new IntersectionObserver(callback);
  if (ref.current) observer.observe(ref.current);
  
  return () => {
    if (ref.current) observer.unobserve(ref.current);
  };
}, []);

// ❌ Mal - Sin cleanup
useEffect(() => {
  const observer = new IntersectionObserver(callback);
  observer.observe(ref.current);
  // No retorna cleanup function
}, []);
```

---

### 4. try-catch en Efectos Complejos

```typescript
// ✅ Bien - Manejo de errores
useEffect(() => {
  try {
    // Inicialización de Three.js
    const renderer = new THREE.WebGLRenderer();
  } catch (error) {
    console.error("Failed to initialize:", error);
    return () => {};
  }
}, []);

// ❌ Mal - Error puede romper el render
useEffect(() => {
  const renderer = new THREE.WebGLRenderer();  // Puede fallar
}, []);
```

---

## Optimización de CSS/Tailwind

### 1. Usar `transform` en lugar de `top/left`

```tsx
// ✅ Bien - GPU accelerated
<motion.div style={{ scale }} />

// ❌ Mal - Trigger layout recalculation
<div style={{ width: '50vw', height: '50vh' }} />
```

---

### 2. Transiciones Específicas

```tsx
// ✅ Bien - Solo color
className="transition-colors duration-300"

// ❌ Mal - Todas las propiedades (más costoso)
className="transition-all duration-300"
```

---

### 3. Limitar will-change

```tsx
// ✅ Bien - Solo si es necesario
className="will-change-transform"

// ❌ Mal - En muchos elementos
// will-change en 100+ elementos consume mucha memoria
```

---

### 4. Imágenes Optimizadas

```tsx
// ✅ Bien - Aspect ratio definido
<div className="aspect-video overflow-hidden">
  <img className="w-full h-full object-cover" />
</div>

// ❌ Mal - Sin dimensiones
<img src={url} />
```

---

## Optimización de Build (Vite)

### 1. Tree Shaking

```typescript
// ✅ Bien - Import específico
import { ArrowRight } from "lucide-react";

// ❌ Mal - Importar todo
import * as Lucide from "lucide-react";
```

---

### 2. Code Splitting (si aplica)

```typescript
// Lazy loading de componentes
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Rutas dinámicas
const Module = await import(`./modules/${moduleName}.ts`);
```

---

### 3. Variables de Entorno

```typescript
// ✅ Bien - Inyectar en build
'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)

// ❌ Mal - Hardcoded
const API_KEY = "sk-...";  // Commit accidental
```

---

## Optimización de Animaciones

### 1. Duraciones Óptimas

```typescript
// ✅ Bien - 0.5-1s para responsividad
transition: { duration: 0.7, delay: i * 0.5 }

// ❌ Mal - Muy lento o muy rápido
transition: { duration: 3.0 }  // 3 segundos es demasiado
transition: { duration: 0.1 }  // 100ms es instantáneo
```

---

### 2. Stagger con Límite

```typescript
// ✅ Bien - Delay progresivo con límite
visible: (i: number) => ({
  transition: { delay: Math.min(i * 0.5, 2.0) }  // Máximo 2s
})

// ❌ Mal - Delay sin límite (último elemento espera mucho)
visible: (i: number) => ({
  transition: { delay: i * 0.5 }  // i=20 → 10s de delay!
})
```

---

### 3. Easing Eficiente

```typescript
// ✅ Bien - Curvas simples
ease: [0.21, 0.47, 0.32, 0.98]  // Cubic-bezier

// ✅ Bien - Easing predefinido
ease: "easeOut"

// ❌ Mal - Curvas complejas con muchos puntos
// No soportado, pero ilustra el punto
```

---

## Optimización de Scroll

### 1. useScroll con target

```typescript
// ✅ Bien - Scoped a contenedor
const { scrollYProgress } = useScroll({
  target: container,
  offset: ['start start', 'end end'],
});

// ❌ Mal - Todo el documento (más costoso)
const { scrollYProgress } = useScroll();
```

---

### 2. Parallax con Límite de Items

```typescript
// ✅ Bien - Máximo 7 items
const parallaxImages = [/* 7 items */];

// ❌ Mal - Muchos items causan lag
const parallaxImages = [/* 50 items */];
```

---

## Métricas de Rendimiento

### WebGL
| Métrica | Valor | Objetivo |
|---------|-------|----------|
| **Vértices** | 4 | < 100 |
| **Triángulos** | 2 | < 50 |
| **Texturas** | 0 | < 10 |
| **Uniforms** | 2 | < 10 |
| **Pixel Ratio** | ≤ 2 | ≤ 2 |

### React
| Métrica | Valor | Objetivo |
|---------|-------|----------|
| **Re-renders** | Mínimos | < 60fps |
| **Observers** | 2-3 | < 10 |
| **useMemo** | 1 | Solo si es necesario |

### Animaciones
| Métrica | Valor | Objetivo |
|---------|-------|----------|
| **Duración** | 0.5-1s | < 1s |
| **Delay máximo** | ~2s | < 3s |
| **FPS** | 60 | 60fps |

---

## Profiling y Debugging

### 1. React DevTools

```bash
npm install --save-dev @react-devtools/core
```

- Ver re-renders
- Identificar componentes lentos
- Inspeccionar hooks

---

### 2. Chrome DevTools Performance Tab

1. Abrir DevTools (F12)
2. Ir a Performance tab
3. Grabar mientras interactúas
4. Analizar:
   - **FPS:** Debe estar cerca de 60
   - **CPU usage:** Picos indican problemas
   - **Heap:** Memory leaks si crece constantemente

---

### 3. WebGL Context Info

```typescript
// Ver info del contexto WebGL
const gl = renderer.getContext();
console.log(gl.getParameter(gl.MAX_TEXTURE_SIZE));
console.log(gl.getParameter(gl.RENDERER));
console.log(gl.getParameter(gl.VERSION));
```

---

## Checklist de Optimización

### Antes de Deploy

- [ ] Limitar pixel ratio en WebGL
- [ ] Cleanup en todos los useEffect
- [ ] try-catch en efectos complejos
- [ ] viewport {{ once: true }} en animaciones
- [ ] useMemo en cálculos costosos
- [ ] Transiciones específicas (no `all` si no es necesario)
- [ ] Imágenes con aspect ratio
- [ ] Variables de entorno correctamente configuradas
- [ ] Build sin errores (`npm run lint`)
- [ ] Build de producción funciona (`npm run build`)

### Monitoreo

- [ ] FPS estable a 60
- [ ] No memory leaks (heap estable)
- [ ] No WebGL context loss
- [ ] Animaciones fluidas
- [ ] Scroll sin jank

---

## Errores de Rendimiento Comunes

### 1. Memory Leak por WebGL

**Síntoma:** Crash después de montar/desmontar componente varias veces

**Causa:** No limpiar renderer, geometry, material

**Solución:**
```typescript
return () => {
  renderer?.dispose();
  geometry?.dispose();
  material?.dispose();
};
```

---

### 2. Múltiples Animation Loops

**Síntoma:** Animación se acelera con el tiempo

**Causa:** No cancelar `requestAnimationFrame`

**Solución:**
```typescript
let animationId: number;
const animate = () => { animationId = requestAnimationFrame(animate); };
animate();

return () => cancelAnimationFrame(animationId);
```

---

### 3. Re-renders Infinitos

**Síntoma:** App se congela o va muy lenta

**Causa:** setState en render o dependencias incorrectas

**Solución:**
```typescript
// ❌ Mal
useEffect(() => {
  setState(newValue);  // Trigger re-render → loop
});

// ✅ Bien
useEffect(() => {
  setState(newValue);
}, [dependency]);  // Solo cuando cambia dependency
```

---

### 4. Observer Leak

**Síntoma:** Múltiples observers corriendo

**Causa:** No limpiar IntersectionObserver

**Solución:**
```typescript
return () => {
  if (ref.current) observer.unobserve(ref.current);
};
```

---

## Recursos

- [React Performance](https://react.dev/learn/render-and-commit)
- [Three.js Performance](https://threejs.org/docs/#manual/en/introduction/Performance-tips)
- [WebGL Best Practices](https://web.dev/webgl-best-practices/)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
