import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.EMAIL_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transportador de nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: (process.env.EMAIL_APP_PASSWORD || '').replace(/\s/g, ''),
  },
});

// Verificar conexión al iniciar
transporter.verify((error) => {
  if (error) {
    console.error('❌ Error configurando email SMTP:', error.message);
    console.error('Verifica tu EMAIL_APP_PASSWORD en .env.local');
  } else {
    console.log('✅ Email SMTP listo para enviar correos');
  }
});

// Endpoint para enviar emails
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validación básica
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email no válido' });
  }

  try {
    // Email que te llega a ti
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nuevo contacto desde portfolio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #D4FF00; padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #0A0A0A; font-size: 24px;">Nuevo mensaje del portfolio</h1>
          </div>
          <div style="background: #0A0A0A; color: #FFFFFF; padding: 30px; border-radius: 0 0 12px 12px;">
            <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nombre</p>
              <p style="margin: 0; color: #FFFFFF; font-size: 18px; font-weight: bold;">${name}</p>
            </div>
            <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email de contacto</p>
              <p style="margin: 0; color: #D4FF00; font-size: 18px; font-weight: bold;">${email}</p>
            </div>
            <div style="background: #1a1a1a; padding: 20px; border-radius: 8px;">
              <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje</p>
              <p style="margin: 0; color: #FFFFFF; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="text-align: center; padding: 20px; color: #6B7280; font-size: 12px;">
            <p>Enviado desde <a href="#" style="color: #D4FF00; text-decoration: none;">portfolio-alejandro</a></p>
          </div>
        </div>
      `,
    });

    // Auto-respuesta al usuario
    await transporter.sendMail({
      from: `"Alejandro López" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'He recibido tu mensaje - Alejandro López',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #D4FF00; padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #0A0A0A; font-size: 24px;">¡Mensaje recibido! 👋</h1>
          </div>
          <div style="background: #0A0A0A; color: #FFFFFF; padding: 30px; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px; line-height: 1.6;">
              Hola <strong>${name}</strong>,
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              He recibido tu mensaje correctamente. Te responderé lo antes posible, normalmente en menos de 24 horas.
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Mientras tanto, si necesitas algo urgente, puedes escribirme directamente a 
              <a href="mailto:alejandronopez@gmail.com" style="color: #D4FF00;">alejandronopez@gmail.com</a>
            </p>
            <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
              Un saludo,<br>
              <strong style="color: #D4FF00;">Alejandro López</strong><br>
              <span style="color: #6B7280; font-size: 14px;">AI Solutions Architect</span>
            </p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'Email enviado correctamente' });
  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ error: 'Error al enviar el email' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'email-api' });
});

app.listen(PORT, () => {
  console.log(`🚀 Email API server corriendo en http://localhost:${PORT}`);
});
