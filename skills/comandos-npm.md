# Comandos NPM Disponibles

## Scripts del `package.json`

```json
{
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  }
}
```

---

## Desarrollo

### `npm run dev`
Inicia el servidor de desarrollo.

```bash
npm run dev
```

- **Puerto:** 3000
- **Host:** 0.0.0.0 (accesible desde la red)
- **HMR:** Hot Module Replacement habilitado (excepto si `DISABLE_HMR=true`)
- **URL:** http://localhost:3000

### `npm run dev` con variables de entorno

```bash
# Windows PowerShell
$env:DISABLE_HMR="true"; npm run dev

# Windows CMD
set DISABLE_HMR=true && npm run dev

# Linux/Mac
DISABLE_HMR=true npm run dev
```

---

## Build

### `npm run build`
Crea un build de producción optimizado.

```bash
npm run build
```

- **Output:** Carpeta `dist/`
- **Optimizaciones:** Minificación, tree-shaking, code splitting
- **Entorno:** Production mode

### Build con preview

```bash
npm run build && npm run preview
```

---

## Preview

### `npm run preview`
Previsualiza el build de producción localmente.

```bash
npm run preview
```

- **Requisito:** Debe existir `dist/` (ejecutar `npm run build` primero)
- **Puerto:** 4173 (por defecto)

---

## Limpieza

### `npm run clean`
Elimina la carpeta de build.

```bash
npm run clean
```

- **Elimina:** `dist/`
- **Nota:** Comando Unix (`rm -rf`). En Windows usar:
  - PowerShell: `Remove-Item -Recurse -Force dist`
  - CMD: `rmdir /s /q dist`

---

## Linting

### `npm run lint`
Ejecuta el type-checker de TypeScript.

```bash
npm run lint
```

- **Comando:** `tsc --noEmit`
- **Output:** Errores de tipo sin generar archivos
- **Uso:** Verificar errores antes de commit

### Ver errores con formato bonito

```bash
npx tsc --noEmit --pretty
```

---

## Instalación de Dependencias

### Instalar todas las dependencias

```bash
npm install
```

### Instalar una dependencia nueva

```bash
# Dependencia de producción
npm install package-name

# Dependencia de desarrollo
npm install --save-dev package-name

# Ejemplo
npm install three @types/three
npm install --save-dev @types/node
```

### Desinstalar dependencia

```bash
npm uninstall package-name
```

### Actualizar dependencias

```bash
# Actualizar a últimas versiones
npm update

# Actualizar paquete específico
npm update package-name
```

---

## Comandos Útiles

### Ver scripts disponibles

```bash
npm run
```

### Ver dependencias instaladas

```bash
# Todas
npm list

# Solo producción
npm list --production

# Solo desarrollo
npm list --dev

# Top-level
npm list --depth=0
```

### Ver información del proyecto

```bash
npm ls react
npm ls vite
npm ls three
```

---

## Comandos de Git (Bonus)

### Commit con mensaje

```bash
git add .
git commit -m "mensaje"
```

### Ver estado

```bash
git status
```

### Ver cambios

```bash
git diff
```

---

## Variables de Entorno

### Crear archivo `.env.local`

```env
GEMINI_API_KEY=your_api_key_here
DISABLE_HMR=false
```

### Acceder en código

```typescript
// En vite.config.ts
const env = loadEnv(mode, '.', '');
env.GEMINI_API_KEY

// En código (inyectado por Vite)
process.env.GEMINI_API_KEY
```

---

## Troubleshooting

### Puerto ya en uso

```bash
# Windows - Matar proceso en puerto 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# O usar otro puerto
npm run dev -- --port 3001
```

### Error de dependencias

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error de TypeScript

```bash
# Ver todos los errores
npx tsc --noEmit --pretty

# Ver errores de un archivo
npx tsc --noEmit src/App.tsx
```

### Build falla

```bash
# Limpiar y reconstruir
npm run clean
npm run build

# Ver logs
npm run build -- --debug
```

---

## Workflow Típico

### Desarrollo diario

```bash
# 1. Instalar dependencias (primera vez)
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Verificar tipos antes de commit
npm run lint

# 4. Commit y push
git add .
git commit -m "mensaje"
git push
```

### Deploy a producción

```bash
# 1. Verificar tipos
npm run lint

# 2. Build de producción
npm run build

# 3. Previsualizar build
npm run preview

# 4. Deploy (según plataforma)
# ...
```

### Nuevo feature

```bash
# 1. Crear rama
git checkout -b feature/nombre

# 2. Instalar nuevas dependencias si es necesario
npm install package-name

# 3. Desarrollar con hot reload
npm run dev

# 4. Verificar antes de mergear
npm run lint
npm run build

# 5. Commit
git add .
git commit -m "feat: descripción"
```

---

## Comandos Rápidos

| Acción | Comando |
|--------|---------|
| **Iniciar desarrollo** | `npm run dev` |
| **Verificar tipos** | `npm run lint` |
| **Build producción** | `npm run build` |
| **Preview build** | `npm run preview` |
| **Limpiar build** | `npm run clean` |
| **Instalar deps** | `npm install` |
| **Agregar paquete** | `npm install package-name` |
| **Agregar dev dep** | `npm install --save-dev package-name` |

---

## Requisitos del Sistema

### Node.js
- **Versión mínima:** 18.x (recomendado 20.x)
- **Verificar:** `node --version`

### npm
- **Versión mínima:** 9.x
- **Verificar:** `npm --version`

---

## Enlaces Útiles

- [Vite Docs](https://vitejs.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [React Docs](https://react.dev/)
- [npm Docs](https://docs.npmjs.com/)
