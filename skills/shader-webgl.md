# Shader WebGL con Three.js

## Componente: `ShaderAnimation.tsx`

### Estructura Base
```typescript
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    
    // Variables para cleanup
    let renderer: THREE.WebGLRenderer | null = null
    let animationId: number | null = null
    let geometry: THREE.PlaneGeometry | null = null
    let material: THREE.ShaderMaterial | null = null
    
    try {
      // ... inicialización
      
      // Cleanup function
      return () => {
        window.removeEventListener("resize", onWindowResize)
        if (animationId) cancelAnimationFrame(animationId)
        if (renderer) {
          if (container && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }
        if (geometry) geometry.dispose()
        if (material) material.dispose()
      }
    } catch (error) {
      console.error("Failed to initialize ShaderAnimation:", error)
      return () => {}
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ background: "#000", overflow: "hidden" }}
    />
  )
}
```

---

## Vertex Shader

### Código
```glsl
void main() {
  gl_Position = vec4( position, 1.0 );
}
```

### Explicación
- **Propósito:** Transformar posiciones de vértices
- **En este caso:** Plano 2D que cubre toda la pantalla
- **Sin transformación:** Posiciones se pasan directamente a clip space
- `gl_Position`: Variable de salida obligatoria (vec4)

---

## Fragment Shader

### Código Completo
```glsl
#define TWO_PI 6.2831853072
#define PI 3.14159265359

precision highp float;
uniform vec2 resolution;
uniform float time;

void main(void) {
  // Normalizar coordenadas (-1 a 1, centrado)
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  
  float t = time * 0.05;  // Velocidad de animación
  float lineWidth = 0.002; // Grosor de línea
  
  vec3 color = vec3(0.0); // Color inicial (negro)
  
  // Triple bucle para generar patrón
  for(int j = 0; j < 3; j++){        // 3 canales de color (RGB)
    for(int i = 0; i < 5; i++){      // 5 líneas por canal
      // Calcular distancia al patrón
      float dist = abs(
        fract(t - 0.01*float(j) + float(i)*0.01) * 5.0 
        - length(uv) 
        + mod(uv.x + uv.y, 0.2)
      );
      
      // Acumular color inversamente proporcional a distancia
      color[j] += lineWidth * float(i*i) / (dist + 0.001);
    }
  }

  gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
}
```

### Explicación Detallada

#### Uniforms
```glsl
uniform vec2 resolution;  // Resolución del canvas (píxeles)
uniform float time;       // Tiempo acumulado (animación)
```

#### Normalización de Coordenadas
```glsl
vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
```
- `gl_FragCoord`: Posición del píxel actual
- Normalizado a rango `-1` a `1`
- Centrado en `(0, 0)`
- Mantener aspect ratio con `min(resolution.x, resolution.y)`

#### Patrón de Líneas
```glsl
float dist = abs(fract(...) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
```
- `fract()`: Parte decimal (crea repetición)
- `length(uv)`: Distancia desde centro (patrón circular)
- `mod(uv.x + uv.y, 0.2)`: Patrón diagonal repetitivo
- `abs()`: Distancia absoluta (líneas simétricas)

#### Acumulación de Color
```glsl
color[j] += lineWidth * float(i*i) / (dist + 0.001);
```
- Color más intenso cerca de las líneas (`dist` pequeño)
- Ponderación cuadrática (`i*i`) - líneas exteriores más brillantes
- `+ 0.001`: Prevenir división por cero

---

## Inicialización de Three.js

### Scene Setup
```typescript
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
const scene = new THREE.Scene()
geometry = new THREE.PlaneGeometry(2, 2)
```

**Por qué OrthographicCamera:**
- Sin perspectiva (ideal para shaders 2D)
- Cubre todo el viewport (-1 a 1 en ambos ejes)
- Plano de 2x2 llena toda la pantalla

### ShaderMaterial
```typescript
const uniforms = {
  time: { value: 1.0 },
  resolution: { value: new THREE.Vector2() },
}

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

### Renderer
```typescript
const renderer = new THREE.WebGLRenderer({ 
  antialias: true,   // Suavizar bordes
  alpha: true        // Fondo transparente
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))  // Limitar a 2x
renderer.setClearColor(0x000000, 1)  // Fondo negro
```

**Importante:** `devicePixelRatio` limitado a 2 para rendimiento

---

## Manejo de Resize

```typescript
const onWindowResize = () => {
  if (!container || !renderer) return
  
  const width = container.clientWidth
  const height = container.clientHeight
  
  renderer.setSize(width, height)
  uniforms.resolution.value.x = width * renderer.getPixelRatio()
  uniforms.resolution.value.y = height * renderer.getPixelRatio()
}

window.addEventListener("resize", onWindowResize, false)
```

**Por qué multiplicar por pixelRatio:**
- El shader trabaja en píxeles físicos
- Pantallas Retina/HiDPI tienen más píxeles físicos que CSS píxeles

---

## Animation Loop

```typescript
const animate = () => {
  animationId = requestAnimationFrame(animate)
  uniforms.time.value += 0.05  // Incrementar tiempo
  if (renderer) renderer.render(scene, camera)
}

animate()  // Iniciar loop
```

**Velocidad de animación:**
- `time += 0.05`: Controla velocidad general
- En shader: `time * 0.05`: Escala adicional

---

## Cleanup (Muy Importante)

```typescript
return () => {
  // 1. Remover event listeners
  window.removeEventListener("resize", onWindowResize)
  
  // 2. Cancelar animation loop
  if (animationId) cancelAnimationFrame(animationId)
  
  // 3. Remover canvas del DOM
  if (renderer) {
    if (container && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
    }
    renderer.dispose()  // Liberar recursos GPU
  }
  
  // 4. Dispose de geometría y material
  if (geometry) geometry.dispose()
  if (material) material.dispose()
}
```

**Por qué es crítico:**
- Prevenir memory leaks
- Liberar recursos de GPU
- Evitar múltiples loops de animación

---

## Tipos de Three.js Utilizados

| Tipo | Uso |
|------|-----|
| `THREE.WebGLRenderer` | Renderizador principal |
| `THREE.OrthographicCamera` | Cámara sin perspectiva |
| `THREE.Scene` | Contenedor de objetos |
| `THREE.PlaneGeometry` | Geometría 2D plana |
| `THREE.ShaderMaterial` | Material con shaders custom |
| `THREE.Vector2` | Vector 2D para resolución |
| `THREE.Mesh` | Objeto 3D (geometría + material) |

---

## Shaders: Conceptos Clave

### GLSL Basics
- **Precision:** `precision highp float;` (obligatorio en fragment shader)
- **Variables:**
  - `uniform`: Entradas desde CPU (time, resolution)
  - `varying`: Datos del vertex al fragment shader
  - `attribute`: Datos por vértice (posición, normal, etc.)
- **Funciones integradas:**
  - `fract(x)`: Parte decimal de x
  - `mod(x, y)`: Módulo (x % y)
  - `length(v)`: Longitud de vector
  - `abs(x)`: Valor absoluto

### Pipeline de Renderizado
```
CPU (TypeScript) → Vertex Shader → Fragment Shader → Pantalla
     ↓                    ↓              ↓
  uniforms            posiciones      colores
  attributes          transformadas    calculados
```

---

## Patrones de Shader del Proyecto

### Patrón 1: Líneas Circulares
```glsl
float dist = abs(fract(time_factor) * repeats - length(uv));
color += intensity / (dist + epsilon);
```

### Patrón 2: Múltiples Capas por Canal
```glsl
for(int j = 0; j < 3; j++){  // RGB
  for(int i = 0; i < count; i++){
    color[j] += contribution / distance;
  }
}
```

### Patrón 3: Modulación Temporal
```glsl
float t = time * speed;  // Escalar tiempo
float dist = abs(fract(t + offset) * scale - pattern);
```

---

## Optimización y Rendimiento

### Técnicas Usadas
1. **Limitar pixel ratio:** `Math.min(window.devicePixelRatio, 2)`
2. **Geometría simple:** Solo un plano de 2x2
3. **Sin texturas:** Todo calculado matemáticamente
4. **Loops pequeños:** Máximo 5 iteraciones
5. **Operaciones eficientes:** `abs`, `fract`, `mod` (GPU-optimized)

### Métricas
| Métrica | Valor |
|---------|-------|
| Vértices | 4 (plano 2x2) |
| Triángulos | 2 |
| Shaders | 1 vertex + 1 fragment |
| Uniforms | 2 (time, resolution) |
| Texturas | 0 |

---

## Debugging de Shaders

### Técnica 1: Visualizar UVs
```glsl
gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);  // Rojo = X, Verde = Y
```

### Técnica 2: Visualizar Tiempo
```glsl
gl_FragColor = vec4(t, t, t, 1.0);  // Escala de grises según tiempo
```

### Técnica 3: Visualizar Distancia
```glsl
gl_FragColor = vec4(dist, dist, dist, 1.0);  // Cerca = oscuro, lejos = claro
```

---

## Errores Comunes

### 1. Olvidar `precision highp float;`
```
ERROR: Shader compilation failed
```
**Solución:** Siempre incluir al inicio del fragment shader

### 2. No limpiar en el return del useEffect
```
Memory leak, múltiples loops corriendo
```
**Solución:** Retornar cleanup function siempre

### 3. No multiplicar resolución por pixelRatio
```
Shader se ve borroso en pantallas HiDPI
```
**Solución:** `resolution * renderer.getPixelRatio()`

### 4. División por cero en shaders
```
Resultado: NaN, pantalla negra
```
**Solución:** Siempre agregar epsilon: `1.0 / (value + 0.001)`

---

## Recursos para Aprender

- **The Book of Shaders:** https://thebookofshaders.com/
- **Three.js Docs:** https://threejs.org/docs/
- **ShaderToy:** https://www.shadertoy.com/ (ejemplos interactivos)
- **GLSL Sandbox:** http://glslsandbox.com/
