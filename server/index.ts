import express, { type NextFunction, type Request, type Response } from "express";
import { loadEnv, createServer as createViteServer } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Message } from "../src/components/NexusDemo/types";
import { validateContactForm } from "../src/utils/validation";
import { hasGeminiConfig, triageConversationWithGemini } from "./geminiTriage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const isProduction = process.argv.includes("--prod") || process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";
const env = loadEnv(mode, rootDir, "");

for (const [key, value] of Object.entries(env)) {
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

const app = express();
const port = Number(process.env.PORT || 3000);

app.disable("x-powered-by");
app.use(express.json({ limit: "64kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.ip || "unknown";
}

function createRateLimiter(windowMs: number, maxRequests: number) {
  const buckets = new Map<string, RateLimitBucket>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.path}:${getClientIdentifier(req)}`;
    const now = Date.now();
    const current = buckets.get(key);

    if (!current || now >= current.resetAt) {
      buckets.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      next();
      return;
    }

    current.count += 1;

    if (current.count > maxRequests) {
      res.status(429).json({
        error: "Demasiadas solicitudes. Inténtalo de nuevo dentro de unos minutos.",
      });
      return;
    }

    next();
  };
}

function getEnvValue(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

const contactLimiter = createRateLimiter(15 * 60 * 1000, 5);
const triageLimiter = createRateLimiter(5 * 60 * 1000, 30);

app.get("/api/triage/health", (_req, res) => {
  const apiKey = getEnvValue("GEMINI_API_KEY");
  res.setHeader("Cache-Control", "no-store");
  res.json({ ok: hasGeminiConfig(apiKey) });
});

app.post("/api/triage", triageLimiter, async (req, res) => {
  const apiKey = getEnvValue("GEMINI_API_KEY");
  const model = getEnvValue("GEMINI_MODEL") || "gemini-2.5-flash";
  const { messages } = req.body as { messages?: Message[] };

  res.setHeader("Cache-Control", "no-store");

  if (!hasGeminiConfig(apiKey)) {
    res.status(503).json({
      error: "Gemini no está configurado en el servidor.",
    });
    return;
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({
      error: "Se requiere un historial de mensajes válido.",
    });
    return;
  }

  const sanitizedMessages = messages
    .filter((message) => message && typeof message.content === "string" && typeof message.role === "string")
    .map((message) => ({
      id: String(message.id || Date.now()),
      role: (message.role === "assistant" ? "assistant" : "user") as Message["role"],
      content: message.content.trim().slice(0, 2000),
      timestamp: new Date(),
    }));

  if (sanitizedMessages.length === 0) {
    res.status(400).json({
      error: "No hay mensajes válidos para procesar.",
    });
    return;
  }

  try {
    const triage = await triageConversationWithGemini(sanitizedMessages, {
      apiKey,
      model,
    });

    res.json(triage);
  } catch (error) {
    console.error("Triage API error:", error instanceof Error ? error.message : error);
    res.status(500).json({
      error: "No se pudo procesar el triaje.",
    });
  }
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const contactEmail = getEnvValue("CONTACT_EMAIL", "VITE_PUBLIC_CONTACT_EMAIL");
    const { name = "", email = "", message = "", website = "" } = req.body as Record<string, string>;

    res.setHeader("Cache-Control", "no-store");

    if (!contactEmail) {
      return res.status(503).json({
        error: "El servicio de contacto no está disponible temporalmente.",
      });
    }

    // Simple Honeypot check
    if (typeof website === "string" && website.trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const validation = validateContactForm({
      name: String(name),
      email: String(email),
      message: String(message),
    });

    if (!validation.valid) {
      return res.status(400).json({
        error: "Los datos del formulario no son válidos.",
        fieldErrors: validation.errors || [],
      });
    }

    const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Nuevo mensaje de ${name} via Portfolio`,
      }),
    });

    if (response.ok) {
      res.status(200).json({ ok: true });
    } else {
      const errorText = await response.text();
      console.error("FormSubmit error:", errorText);
      res.status(500).json({ error: "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde." });
    }
  } catch (error) {
    console.error("Contact API error:", error);
    res.status(500).json({ error: "Ocurrió un error inesperado al enviar el mensaje." });
  }
});

async function start() {
  if (!isProduction) {
    const vite = await createViteServer({
      root: rootDir,
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });

    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const templatePath = path.join(rootDir, "index.html");
        const template = await fs.readFile(templatePath, "utf8");
        const transformed = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(transformed);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  } else {
    app.use(express.static(distDir));
    app.use("*", async (_req, res, next) => {
      try {
        const html = await fs.readFile(path.join(distDir, "index.html"), "utf8");
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (error) {
        next(error);
      }
    });
  }

  if (!process.env.VERCEL) {
    app.listen(port, () => {
      console.log(`Portfolio server running on http://localhost:${port}`);
    });
  }
}

if (!process.env.VERCEL) {
  start().catch((error) => {
    console.error("Failed to start the portfolio server:", error);
    process.exit(1);
  });
}

export default app;
