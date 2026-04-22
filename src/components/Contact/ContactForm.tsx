import React from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { useContactForm } from "../../hooks/useContactForm";

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const {
    formData,
    formStatus,
    errors,
    handleChange,
    handleSubmit,
  } = useContactForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-xs sm:text-sm w-full">
      <div className="w-full">
        {/* Name Field */}
        <label htmlFor="name" className="font-medium text-gray-300 text-xs sm:text-sm">
          Nombre completo
        </label>
        <div
          className={`flex items-center mt-2 mb-3 sm:mb-4 h-10 sm:h-12 pl-3 sm:pl-4 border rounded-full transition-all overflow-hidden bg-white/5 ${
            errors.name
              ? "border-red-500 ring-2 ring-red-500"
              : "border-white/10 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
          }`}
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="h-full px-2 sm:px-3 w-full outline-none bg-transparent text-white placeholder-gray-500 text-xs sm:text-sm"
            placeholder="Tu nombre"
            required
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-[10px] sm:text-xs mb-2 pl-3 sm:pl-4">{errors.name}</p>
        )}

        {/* Email Field */}
        <label htmlFor="email" className="font-medium text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm">
          Correo electrónico
        </label>
        <div
          className={`flex items-center mt-2 mb-3 sm:mb-4 h-10 sm:h-12 pl-3 sm:pl-4 border rounded-full transition-all overflow-hidden bg-white/5 ${
            errors.email
              ? "border-red-500 ring-2 ring-red-500"
              : "border-white/10 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
          }`}
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-full px-2 sm:px-3 w-full outline-none bg-transparent text-white placeholder-gray-500 text-xs sm:text-sm"
            placeholder="tu@email.com"
            required
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-[10px] sm:text-xs mb-2 pl-3 sm:pl-4">{errors.email}</p>
        )}

        {/* Message Field */}
        <label htmlFor="message" className="font-medium text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm">
          Mensaje
        </label>
        <div
          className={`flex items-start mt-2 mb-3 sm:mb-4 p-2 sm:p-3 border rounded-xl sm:rounded-2xl transition-all bg-white/5 ${
            errors.message
              ? "border-red-500 ring-2 ring-red-500"
              : "border-white/10 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent"
          }`}
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 mt-0.5 sm:mt-1" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-2 py-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none text-xs sm:text-sm"
            placeholder="Cuéntame sobre tu proyecto..."
            required
          ></textarea>
        </div>
        {errors.message && (
          <p className="text-red-500 text-[10px] sm:text-xs mb-2 pl-3 sm:pl-4">{errors.message}</p>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <p className="text-red-500 text-[10px] sm:text-xs mb-2 pl-3 sm:pl-4 font-medium">{errors.submit}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formStatus === "sending" || formStatus === "sent"}
          className="flex items-center justify-center gap-2 mt-3 sm:mt-4 bg-accent text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-full shadow-lg shadow-accent/20 text-xs sm:text-sm"
        >
          {formStatus === "sending"
            ? "Enviando..."
            : formStatus === "sent"
              ? "¡Mensaje enviado con éxito!"
              : "Enviar mensaje"}
          {formStatus === "idle" && <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
    </form>
  );
};
