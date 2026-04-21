/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ExternalLink,
  ChevronDown,
  X,
  Database,
} from "lucide-react";
import { ShaderAnimation } from "./components/Animations/ShaderAnimation";
import { BlurText } from "./components/Hero/BlurText";
import { Navigation } from "./components/Navigation/Navigation";
import { ContactForm } from "./components/Contact/ContactForm";
import { TimelineContent } from "./components/ui/timeline-animation";
import { ZoomParallax } from "./components/ui/ZoomParallax";
import { COLORS, FONTS } from "./constants";
import { projects } from "./data/projects";
import { parallaxImages } from "./data/parallax";
import { useClickOutside } from "./hooks/useClickOutside";
import { NexusDemoModal } from "./components/NexusDemo";
import { ProjectsGallery } from "./components/Projects/ProjectsGallery";

const getPublicContactEmail = () => {
  return import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || "";
};

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showNexusDemo, setShowNexusDemo] = useState(false);
  const contactModalRef = useClickOutside(() => setShowContactModal(false));
  const aboutRef = useRef<HTMLDivElement>(null);
  const publicContactEmail = getPublicContactEmail();

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const menuItems = [
    { label: "INICIO", href: "#", highlight: true },
    { label: "SOBRE MÍ", href: "#sobre-mi" },
    { label: "PROYECTOS", href: "#proyectos" },
    {
      label: "CONTACTO",
      action: () => setShowContactModal(true),
    },
  ];

  return (
    <div className="min-h-screen selection:bg-accent selection:text-black transition-colors relative bg-transparent text-white">
      <ShaderAnimation />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <Navigation items={menuItems} />
          <div className="text-4xl font-bold tracking-tighter text-white">AL</div>
          <div className="w-10 h-10" />
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <div className="flex flex-col items-center">
              <BlurText
                text="ALEJANDRO"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{
                  color: COLORS.accent,
                  fontFamily: FONTS.code,
                }}
              />
              <BlurText
                text="LOPEZ"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{
                  color: COLORS.accent,
                  fontFamily: FONTS.code,
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="px-3 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm mb-2">
                <span className="text-accent font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase">
                  AI SOLUTIONS ARCHITECT
                </span>
              </div>
              <BlurText
                text="AUTOMATIZACIÓN • PROMPT ENGINEERING • IA APLICADA"
                delay={40}
                animateBy="letters"
                direction="top"
                className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center font-mono font-bold tracking-tighter uppercase"
                style={{ color: COLORS.accent }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 2, duration: 1 }}
                className="h-[1px] bg-accent/50"
              />
              <p className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-[0.4em] mt-2">
                Sistemas inteligentes para negocios reales
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("parallax-trigger")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-neutral-500 hover:text-accent transition-colors duration-300 animate-bounce" />
        </button>
      </main>

      {/* Parallax Section */}
      <div id="parallax-trigger">
        <ZoomParallax images={parallaxImages} />
      </div>

      {/* Services & About Section */}
      <section
        id="sobre-mi"
        className="py-32 relative z-10 overflow-hidden"
        ref={aboutRef}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <TimelineContent
              as="h2"
              animationNum={0}
              timelineRef={aboutRef}
              customVariants={revealVariants}
              className="text-3xl md:text-5xl !leading-[1.4] font-bold text-white mb-8 tracking-tight"
            >
              Aplico{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                IA
              </TimelineContent>
              ,{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                integración de procesos
              </TimelineContent>{" "}
              y{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                transformación digital
              </TimelineContent>{" "}
              para ayudar a negocios a escalar.
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={4}
              timelineRef={aboutRef}
              customVariants={revealVariants}
              className="text-3xl md:text-5xl !leading-[1.4] font-bold text-white mb-16 tracking-tight"
            >
              Creo{" "}
              <TimelineContent
                as="span"
                animationNum={5}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                soluciones inteligentes
              </TimelineContent>{" "}
              que{" "}
              <TimelineContent
                as="span"
                animationNum={6}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                automatizan procesos
              </TimelineContent>
              , optimizan flujos de trabajo y generan valor real. Desde{" "}
              <TimelineContent
                as="span"
                animationNum={7}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                arquitectura de prompts
              </TimelineContent>{" "}
              hasta sistemas{" "}
              <TimelineContent
                as="span"
                animationNum={8}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                RAG personalizados
              </TimelineContent>
              , transformo desafíos en oportunidades con{" "}
              <TimelineContent
                as="span"
                animationNum={9}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                IA aplicada
              </TimelineContent>
              .
            </TimelineContent>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">
            Proyectos destacados
          </h2>
        </div>
        
        <ProjectsGallery projects={projects} setShowNexusDemo={setShowNexusDemo} />
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Construyamos algo <br />
            <span className="text-accent italic">más inteligente.</span>
          </h2>
          <button
            type="button"
            onClick={() => setShowContactModal(true)}
            className="bg-accent text-black px-12 py-6 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-xl shadow-accent/20"
          >
            Contactar ahora
          </button>
        </div>
      </section>

      {/* Nexus Demo Modal */}
      <NexusDemoModal isOpen={showNexusDemo} onClose={() => setShowNexusDemo(false)} />

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={contactModalRef}
            className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-accent transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                Hablemos <span className="text-accent">.</span>
              </h3>
              <p className="text-gray-400 text-lg">
                Cuéntame sobre tu proyecto y te responderé en menos de 24 horas.
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-8">
              {/* Option 1: Direct Email */}
              {publicContactEmail && (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-colors group">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white mb-1">Email directo</h4>
                    <a
                      href={`mailto:${publicContactEmail}?subject=Contacto%20desde%20portfolio`}
                      className="text-gray-400 text-sm hover:text-accent transition-colors truncate block"
                    >
                      {publicContactEmail}
                    </a>
                  </div>
                  <a
                    href={`mailto:${publicContactEmail}?subject=Contacto%20desde%20portfolio`}
                    className="px-4 py-2 rounded-lg border border-accent/30 text-accent text-sm font-bold hover:bg-accent hover:text-black transition-all flex-shrink-0"
                  >
                    Enviar
                  </a>
                </div>
              )}

              {/* Option 2: Contact Form */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Formulario de contacto
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Envío directo, te respondo en menos de 24h
                    </p>
                  </div>
                </div>

                <ContactForm
                  onSuccess={() => {
                    setTimeout(() => setShowContactModal(false), 2000);
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              {publicContactEmail ? (
                <p className="text-gray-600 text-sm">
                  También puedes escribirme directamente a{" "}
                  <a
                    href={`mailto:${publicContactEmail}`}
                    className="text-accent hover:underline"
                  >
                    {publicContactEmail}
                  </a>
                </p>
              ) : (
                <p className="text-gray-600 text-sm">
                  El formulario envía tu mensaje sin exponer el correo de destino en el frontend.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="font-bold text-2xl tracking-tighter">
            ALEJANDRO <span className="text-accent">LOPEZ</span>
          </div>
          <div className="flex items-center gap-10">
            <a
              href="#"
              className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold"
            >
              Linkedin <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold"
            >
              Github <ExternalLink className="w-4 h-4" />
            </a>
            {publicContactEmail && (
              <a
                href={`mailto:${publicContactEmail}`}
                className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold"
              >
                Email <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="text-gray-600 text-sm font-mono uppercase">
            © 2024 Alejandro Lopez
          </div>
        </div>
      </footer>
    </div>
  );
}
