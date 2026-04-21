"use client";

import React from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";

interface ContactFormProps {
  formData: { name: string; email: string; message: string };
  formStatus: "idle" | "sending" | "sent" | "error";
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({ formData, formStatus, onChange, onSubmit }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center text-sm">
      <p className="text-xs bg-accent/20 text-accent font-medium px-3 py-1 rounded-full mb-2">Contáctame</p>
      <h1 className="text-3xl md:text-4xl font-bold py-2 text-center text-white">Estemos en contacto.</h1>
      <p className="max-md:text-sm text-gray-500 pb-6 text-center">
        O simplemente escríbeme a <a href="mailto:alejandronopez@gmail.com" className="text-accent hover:underline">alejandronopez@gmail.com</a>
      </p>
      
      <div className="max-w-96 w-full px-2">
        <label htmlFor="name" className="font-medium text-gray-300">Nombre completo</label>
        <div className="flex items-center mt-2 mb-4 h-12 pl-4 border border-white/10 rounded-full focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all overflow-hidden bg-white/5">
          <User className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-gray-500" 
            placeholder="Tu nombre" 
            required 
          />
        </div>

        <label htmlFor="email" className="font-medium text-gray-300 mt-2">Correo electrónico</label>
        <div className="flex items-center mt-2 mb-4 h-12 pl-4 border border-white/10 rounded-full focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all overflow-hidden bg-white/5">
          <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="h-full px-3 w-full outline-none bg-transparent text-white placeholder-gray-500" 
            placeholder="tu@email.com" 
            required 
          />
        </div>

        <label htmlFor="message" className="font-medium text-gray-300 mt-2">Mensaje</label>
        <div className="flex items-start mt-2 mb-4 p-3 border border-white/10 rounded-2xl focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all bg-white/5">
          <MessageSquare className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
          <textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={onChange}
            rows={4} 
            className="w-full px-2 py-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none" 
            placeholder="Cuéntame sobre tu proyecto..." 
            required
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={formStatus === "sending"}
          className="flex items-center justify-center gap-2 mt-4 bg-accent text-black font-bold py-3 px-8 rounded-full hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {formStatus === "sending" ? "Enviando..." : "Enviar mensaje"}
          {formStatus !== "sending" && <Send className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};