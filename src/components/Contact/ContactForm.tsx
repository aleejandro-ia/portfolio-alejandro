import React, { type ReactNode } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";

interface ContactFormProps {
  onSuccess?: () => void;
}

const getContactEmail = () => {
  return import.meta.env.VITE_CONTACT_EMAIL || "";
};

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const {
    formData,
    formStatus,
    errors,
    handleChange,
    handleSubmit,
  } = useContactForm(onSuccess);

  const contactEmail = getContactEmail();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm">
      <p className="text-xs bg-accent/20 text-accent font-medium px-3 py-1 rounded-full mb-2">
        Contáctame
      </p>
      <h1 className="text-3xl md:text-4xl font-bold py-2 text-center text-white">
        Estemos en contacto.
      </h1>
      <p className="max-md:text-sm text-gray-500 pb-6 text-center">
        O simplemente escríbeme a{" "}
        <a
          href={`mailto:${contactEmail}`}
          className="text-accent hover:underline"
        >
          {contactEmail}
        </a>
      </p>

      <div className="max-w-96 w-full px-2">
        {/* Name Field */}
        <label htmlFor="name" className="font-medium text-gray-300">
          Nombre completo
        </label>
        <div
          className={`flex items-center mt-2 mb-4 h-12 pl-4 border rounded-full transition-all overflow-hidden bg-white/5 ${
            errors.name
              ? "border-red-500 ring-2 ring-red-500"
              : "border-white/10 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
          }`}
        >
          <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-gray-500"
            placeholder="Tu nombre"
            required
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name}</p>
        )}

        {/* Email Field */}
        <label htmlFor="email" className="font-medium text-gray-300 mt-2">
          Correo electrónico
        </label>
        <div
          className={`flex items-center mt-2 mb-4 h-12 pl-4 border rounded-full transition-all overflow-hidden bg-white/5 ${
            errors.email
              ? "border-red-500 ring-2 ring-red-500"
              : "border-white/10 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
          }`}
        >
          <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-gray-500"
            placeholder="tu@email.com"
            required
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email}</p>
        )}

        {/* Message Field */}
        <label htmlFor="message" className="font-medium text-gray-300 mt-2">
          Mensaje
        </label>
        <div
          className={`flex items-start mt-2 mb-4 p-3 border rounded-2xl transition-all bg-white/5 ${
            errors.message
              ? "border-red-500 ring-2 ring-red-500"
              : "border-white/10 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
          }`}
        >
          <MessageSquare className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-2 py-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none"
            placeholder="Cuéntame sobre tu proyecto..."
            required
          ></textarea>
        </div>
        {errors.message && (
          <p className="text-red-500 text-xs mb-2">{errors.message}</p>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <p className="text-red-500 text-xs mb-2">{errors.submit}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formStatus === "sending"}
          className="flex items-center justify-center gap-2 mt-4 bg-accent text-black font-bold py-3 px-8 rounded-full hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {formStatus === "sending"
            ? "Enviando..."
            : formStatus === "sent"
              ? "¡Enviado!"
              : "Enviar mensaje"}
          {formStatus !== "sending" && formStatus !== "sent" && (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};
