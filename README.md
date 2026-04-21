<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Alejandro Lopez Portfolio

Portfolio profesional de Alejandro Lopez, centrado en automatizacion, IA aplicada y la demo interactiva de Nexus.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Express para exponer APIs internas seguras

## Desarrollo local

**Prerequisitos:** Node.js 20+

1. Install dependencies:
   `npm install`
2. Crea `.env.local` a partir de [.env.example](.env.example)
3. Configura las variables del servidor:
   `GEMINI_API_KEY`
   `CONTACT_EMAIL`
4. Opcionalmente, si quieres mostrar un correo publico en la UI:
   `VITE_PUBLIC_CONTACT_EMAIL`
5. Ejecuta el proyecto:
   `npm run dev`

## Seguridad

- Gemini ya no se llama desde el frontend: el triaje pasa por `/api/triage`
- El formulario ya no expone el destinatario en cliente: el envio pasa por `/api/contact`
- Los secretos deben vivir en `.env.local`, no en variables `VITE_*`

## Produccion

1. Build:
   `npm run build`
2. Start:
   `npm run start`
