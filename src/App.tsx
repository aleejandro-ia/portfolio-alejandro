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
  Search,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { IntroAnimation } from "./components/Animations/IntroAnimation";
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

const PROCESS_STEPS = [
  {
    id: "01",
    icon: <Search className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
    title: "Diagnóstico",
    description: "Entendemos tu negocio, procesos y desafíos para identificar las mayores oportunidades."
  },
  {
    id: "02",
    title: "Diseño",
    description: "Diseñamos la solución, arquitectura y plan de implementación orientado a resultados."
  },
  {
    id: "03",
    title: "Prototipo",
    description: "Desarrollamos un prototipo funcional para validar valor y ajustar antes de escalar."
  },
  {
    id: "04",
    icon: <img src="/logo-portfolio.png" alt="Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-90" />,
    title: "Implementación",
    description: "Implementamos, integramos y optimizamos para asegurar impacto sostenible."
  }
];

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
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
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      
      {introComplete && <ShaderAnimation />}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6 transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto relative">
          <Navigation items={menuItems} />
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 group"
            aria-label="Volver arriba"
          >
            <div className="text-2xl sm:text-4xl font-bold tracking-tighter leading-none">
              <span className="text-white">A</span>
              <span className="text-accent">L</span>
            </div>
          </button>
          <div className="w-8 sm:w-10 h-8 sm:h-10" />
        </nav>
      </header>

      {/* Hero Section */}
      <main className={`relative min-h-screen flex flex-col transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2 sm:px-4 flex items-center justify-center">



          <div className="relative text-center z-10 max-w-full">
            <div className="flex flex-col items-center">
              <BlurText
                text="ALEJANDRO"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[28px] xs:text-[40px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap max-w-full"
                style={{
                  color: "#FFFFFF",
                  fontFamily: FONTS.code,
                }}
              />
              <BlurText
                text="LOPEZ"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[28px] xs:text-[40px] sm:text-[70px] md:text-[100px] lg:text-[140px] xl:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap max-w-full"
                style={{
                  color: COLORS.accent,
                  fontFamily: FONTS.code,
                }}
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-full px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col items-center gap-2 sm:gap-3"
            >
              <div className="px-4 py-2 sm:px-5 sm:py-2 border border-white/10 rounded-2xl sm:rounded-full bg-white/5 backdrop-blur-sm mb-3 sm:mb-5 shadow-[0_0_15px_rgba(143,227,49,0.05)] text-center max-w-[95vw]">
                <span className="text-white font-sans font-medium text-[10px] sm:text-[11px] md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-relaxed">
                  Experto en <span className="text-accent font-bold">Inteligencia Artificial</span>
                </span>
              </div>
              
              <img src="/logo-portfolio.png" alt="Logo Alejandro Lopez" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-3 sm:mb-5 opacity-90 drop-shadow-[0_0_15px_rgba(143,227,49,0.2)]" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 2, duration: 1 }}
                className="h-[1px] bg-accent/50"
              />
              <p className="text-neutral-500 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-2 sm:mt-3 text-center px-2">
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
          className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-neutral-500 hover:text-accent transition-colors duration-300 animate-bounce" />
        </button>
      </main>

      {/* Parallax Section */}
      <div id="parallax-trigger">
        <ZoomParallax images={parallaxImages} />
      </div>

      {/* Services & About Section */}
      <section
        id="sobre-mi"
        className="py-16 sm:py-24 md:py-32 relative z-10 overflow-hidden"
        ref={aboutRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <TimelineContent
              as="h2"
              animationNum={0}
              timelineRef={aboutRef}
              customVariants={revealVariants}
              className="text-xl sm:text-3xl md:text-5xl !leading-[1.6] sm:!leading-[1.4] font-bold text-white mb-8 sm:mb-12 tracking-tight"
            >
              Impulso negocios con{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                IA aplicada
              </TimelineContent>
              ,{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                automatización
              </TimelineContent>{" "}
              e{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                integración de procesos
              </TimelineContent>{" "}
              para convertir operaciones complejas en sistemas más eficientes, escalables y rentables.
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={4}
              timelineRef={aboutRef}
              customVariants={revealVariants}
              className="text-base sm:text-2xl md:text-3xl lg:text-5xl !leading-[1.6] sm:!leading-[1.4] font-bold text-white mb-12 sm:mb-16 tracking-tight"
            >
              Diseño{" "}
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
                optimizan flujos de trabajo
              </TimelineContent>
              ,{" "}
              <TimelineContent
                as="span"
                animationNum={7}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                conectan herramientas
              </TimelineContent>{" "}
              y transforman{" "}
              <TimelineContent
                as="span"
                animationNum={8}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                tareas repetitivas
              </TimelineContent>{" "}
              en{" "}
              <TimelineContent
                as="span"
                animationNum={9}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                ventaja operativa real
              </TimelineContent>
              .
            </TimelineContent>

            {/* PROCESO DE TRABAJO */}
            <div className="mt-24 sm:mt-32">
              <div className="text-center mb-12 sm:mb-20 px-2">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Un proceso claro para<br />
                  <span className="text-accent">resultados extraordinarios</span>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
                {/* Connecting line (Desktop) */}
                <div className="hidden md:block absolute top-[28px] sm:top-[32px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 z-0" />
                
                {/* Connecting line (Mobile) */}
                <div className="block md:hidden absolute left-[28px] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 z-0" />

                {PROCESS_STEPS.map((step) => (
                  <div key={step.id} className="relative z-10 flex flex-row md:flex-col items-start gap-5 sm:gap-6 group">
                    <div className="w-14 h-14 shrink-0 sm:w-16 sm:h-16 rounded-full border border-white/10 bg-black flex items-center justify-center text-accent font-mono text-lg shadow-[0_0_15px_rgba(143,227,49,0.05)] group-hover:border-accent/50 transition-colors">
                      {step.icon || step.id}
                    </div>
                    <div className="pt-1 md:pt-0">
                      <h4 className="text-white font-bold text-lg sm:text-xl mb-2">{step.title}</h4>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed pr-4 md:pr-0">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-12 sm:py-16 md:py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center tracking-tight px-2">
            Proyectos destacados
          </h2>
          <p className="text-base sm:text-xl md:text-2xl font-bold text-white/60 text-center tracking-tight mt-3 sm:mt-4 px-2">
            ¿Qué podemos hacer en tu empresa?
          </p>
        </div>

        <ProjectsGallery projects={projects} setShowNexusDemo={setShowNexusDemo} />
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative z-10 overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-tight">
            ¿Listo para llevar tu operación al siguiente nivel <span className="text-accent">con IA?</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mb-10 sm:mb-14 max-w-2xl leading-relaxed">
            Hablemos sobre tu proyecto y cómo podemos generar impacto real en tu negocio.
          </p>
          <button
            type="button"
            onClick={() => setShowContactModal(true)}
            className="bg-accent text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-lg md:text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(143,227,49,0.2)] flex items-center gap-3"
          >
            HABLEMOS <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </section>

      {/* Nexus Demo Modal */}
      <NexusDemoModal isOpen={showNexusDemo} onClose={() => setShowNexusDemo(false)} />

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={contactModalRef}
            className="bg-neutral-900 border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 text-neutral-500 hover:text-accent transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                Hablemos <span className="text-accent">.</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-lg">
                Cuéntame sobre tu proyecto y te responderé en menos de 24 horas.
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Option 1: Direct Email */}
              {publicContactEmail && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-colors group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white mb-1 text-sm sm:text-base">Email directo</h4>
                    <a
                      href={`mailto:${publicContactEmail}?subject=Contacto%20desde%20portfolio`}
                      className="text-gray-400 text-xs sm:text-sm hover:text-accent transition-colors truncate block"
                    >
                      {publicContactEmail}
                    </a>
                  </div>
                  <a
                    href={`mailto:${publicContactEmail}?subject=Contacto%20desde%20portfolio`}
                    className="px-3 sm:px-4 py-2 rounded-lg border border-accent/30 text-accent text-xs sm:text-sm font-bold hover:bg-accent hover:text-black transition-all flex-shrink-0 w-full sm:w-auto text-center"
                  >
                    Enviar
                  </a>
                </div>
              )}

              {/* Option 2: Contact Form */}
              <div className="p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-sm sm:text-base">
                      Formulario de contacto
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
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
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 text-center">
              {publicContactEmail ? (
                <p className="text-gray-600 text-xs sm:text-sm">
                  También puedes escribirme directamente a{" "}
                  <a
                    href={`mailto:${publicContactEmail}`}
                    className="text-accent hover:underline"
                  >
                    {publicContactEmail}
                  </a>
                </p>
              ) : (
                <p className="text-gray-600 text-xs sm:text-sm">
                  El formulario envía tu mensaje sin exponer el correo de destino en el frontend.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="font-bold text-xl sm:text-2xl tracking-tighter">
            <span className="text-white">ALEJANDRO</span> <span className="text-accent">LOPEZ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
