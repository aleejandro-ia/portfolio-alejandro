# Configuración del Proyecto

## Stack Tecnológico

### Core
- **React 19** - Biblioteca UI
- **TypeScript ~5.8.2** - Tipado estático
- **Vite 6.2.0** - Build tool y dev server

### UI y Estilos
- **Tailwind CSS 4.1.14** - Framework CSS utility-first
- **@tailwindcss/vite 4.1.14** - Plugin de Tailwind para Vite
- **Fira Code** - Fuente monoespaciada
- **Inter** - Fuente principal
- **Antic/Antic Didone** - Fuentes decorativas

### Animaciones
- **Motion 12.23.24** (Framer Motion) - Biblioteca de animaciones
- **Three.js 0.183.2** - Biblioteca WebGL para gráficos 3D
- **@types/three 0.183.1** - Tipos TypeScript para Three.js

### Iconos
- **Lucide React 0.546.0** - Biblioteca de iconos

### Backend/API
- **Express 4.21.2** - Framework web
- **@google/genai 1.29.0** - SDK Gemini AI
- **dotenv 17.2.3** - Variables de entorno

### Utilidades de Desarrollo
- **tsx 4.21.0** - Ejecutor TypeScript
- **autoprefixer 10.4.21** - PostCSS autoprefixer
- **@types/node 22.14.0** - Tipos Node.js
- **@types/express 4.17.21** - Tipos Express

## Configuración de Archivos

### `vite.config.ts`
```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
```

**Puntos clave:**
- Alias `@/` apunta al directorio raíz del proyecto
- Variable `GEMINI_API_KEY` inyectada desde `.env`
- HMR controlado por variable de entorno `DISABLE_HMR`

### `tsconfig.json`
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
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Puntos clave:**
- `allowImportingTsExtensions`: permite importar archivos `.tsx` sin extensión
- `noEmit`: TypeScript solo para type-checking, Vite se encarga del build
- `paths`: alias `@/` configurado para imports absolutos

### Variables de Entorno

Archivo `.env.example` (crear `.env.local` para desarrollo):
```
GEMINI_API_KEY=your_api_key_here
DISABLE_HMR=false
```

## Path Alias

Usar alias `@/` para imports absolutos:
```typescript
// ❌ Mal - import relativo profundo
import { TimelineContent } from "../../components/ui/timeline-animation";

// ✅ Bien - con alias
import { TimelineContent } from "@/src/components/ui/timeline-animation";
```
