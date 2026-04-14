/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Cpu, 
  Zap, 
  Code, 
  Database, 
  Linkedin, 
  Github, 
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { ShaderAnimation } from "./components/ShaderAnimation";
import { TimelineContent } from "./components/ui/timeline-animation";
import { ZoomParallax } from "./components/ui/ZoomParallax";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

const services = [
  {
    title: "Arquitectura de prompts",
    description: "Ingeniería avanzada para maximizar el potencial de los LLMs en entornos corporativos.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    title: "Automatización de procesos",
    description: "Diseño de flujos de trabajo inteligentes para eliminar la carga operativa y ahorrar tiempo.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Soluciones no-code / low-code",
    description: "Desarrollo ágil de herramientas personalizadas sin las barreras del desarrollo tradicional.",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "Asistentes y sistemas RAG",
    description: "Creación de ecosistemas digitales que aprenden, responden y evolucionan con su negocio.",
    icon: <Database className="w-6 h-6" />,
  },
];

const projects = [
  {
    id: "01",
    tag: "IA / OPTIMIZACIÓN",
    title: "Asistente de IA para optimización de procesos internos",
    description: "Sistema analítico para auditar procesos, detectar cuellos de botella y proponer mejoras automatizadas.",
    image: "https://picsum.photos/seed/ai-process/800/600",
  },
  {
    id: "02",
    tag: "IA APLICADA / SISTEMA INTERNO",
    title: "Automatización CRM para gestión administrativa",
    description: "Integración de flujos de trabajo para sincronizar datos contables y operativos eliminando la carga manual.",
    image: "https://picsum.photos/seed/crm-auto/800/600",
  },
  {
    id: "03",
    tag: "GESTIÓN DE CONOCIMIENTO / IA PROCESAMIENTO",
    title: "Plataforma de vídeo a conocimiento accionable",
    description: "Pipeline de NLP para transformar contenido multimedia en resúmenes estructurados y metadatos ejecutables.",
    image: "https://picsum.photos/seed/video-knowledge/800/600",
  },
];

const parallaxImages = [
  { text: "CONTINUA DESLIZANDO" }, // Centro (Zoom)
  { text: "AUTOMATIZACION INTELIGENTE" },
  { text: "ARQUITECTURA DE PROMPTS" },
  { text: "VIBE CODING" },
  { text: "APP PERSONALIZADAS" },
  { text: "SISTEMAS DE CONOCIMIENTO Y ORGANIZACION CON IA" },
  { text: "IA APLICADA AL MARKETING" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactModalRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.5,
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
        delay: i * 0.3,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (
        showContactModal &&
        contactModalRef.current &&
        !contactModalRef.current.contains(event.target as Node)
      ) {
        setShowContactModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, showContactModal]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Crear enlace mailto con los datos del formulario
    const subject = encodeURIComponent(`Contacto desde portfolio - ${formData.name}`);
    const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`);
    window.location.href = `mailto:alejandronopez@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setShowContactModal(false);
        setFormStatus("idle");
      }, 2000);
    }, 500);
  };

  const menuItems = [
    { label: "INICIO", href: "#", highlight: true },
    { label: "SOBRE MÍ", href: "#sobre-mi" },
    { label: "PROYECTOS", href: "#proyectos" },
    { label: "CONTACTO", href: "#contacto", action: () => setShowContactModal(true) },
  ];

  return (
    <div 
      className="min-h-screen selection:bg-accent selection:text-black transition-colors relative bg-transparent text-white"
    >
      <ShaderAnimation />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-neutral-500 hover:text-accent"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100] bg-black"
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      color: item.highlight ? "#D4FF00" : "hsl(0 0% 100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#D4FF00";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? "#D4FF00" : "hsl(0 0% 100%)";
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.action) item.action();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div className="text-4xl font-bold tracking-tighter text-white">
            AL
          </div>

          {/* Empty div to balance the flex layout since theme toggle is removed */}
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
                style={{ color: "#D4FF00", fontFamily: "'Fira Code', monospace" }}
              />
              <BlurText
                text="LOPEZ"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[60px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: "#D4FF00", fontFamily: "'Fira Code', monospace" }}
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
                style={{ color: "#D4FF00" }}
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
          onClick={() => document.getElementById('parallax-trigger')?.scrollIntoView({ behavior: 'smooth' })}
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
      <section id="sobre-mi" className="py-32 relative z-10 overflow-hidden" ref={aboutRef}>
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
                herramientas personalizadas
              </TimelineContent>{" "}
              para transformar operaciones, simplificar tareas y crear{" "}
              <TimelineContent
                as="span"
                animationNum={4}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                soluciones digitales
              </TimelineContent>{" "}
              con impacto real.
            </TimelineContent>

            <TimelineContent
              as="h2"
              animationNum={5}
              timelineRef={aboutRef}
              customVariants={revealVariants}
              className="text-3xl md:text-5xl !leading-[1.4] font-bold text-white mb-8 tracking-tight mt-16"
            >
              Desde{" "}
              <TimelineContent
                as="span"
                animationNum={6}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                automatizaciones
              </TimelineContent>{" "}
              hasta{" "}
              <TimelineContent
                as="span"
                animationNum={7}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                aplicaciones personalizadas
              </TimelineContent>
              , desarrollo{" "}
              <TimelineContent
                as="span"
                animationNum={8}
                timelineRef={aboutRef}
                customVariants={textVariants}
                className="text-accent border border-accent/30 border-dotted px-2 rounded-lg inline-block"
              >
                sistemas pensados
              </TimelineContent>{" "}
              para resolver necesidades concretas de forma eficaz.
            </TimelineContent>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <div className="h-[1px] w-12 bg-accent/30" />
              <div className="text-base font-mono">
                <span className="text-gray-500 uppercase tracking-widest text-xs">Sobre mí —</span>{" "}
                <span className="text-white">Alejandro López</span>
              </div>
              <div className="h-[1px] w-12 bg-accent/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-32 px-6 bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-20">
            <h2 className="text-6xl font-extrabold tracking-tighter">
              Proyectos <br /> Destacados
            </h2>
            <div className="text-gray-500 text-sm font-mono">01 — 03</div>
          </div>

          <div className="space-y-40">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
              >
                <div className="flex-1 w-full aspect-video overflow-hidden rounded-[2rem] bg-gray-900 group relative shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                </div>
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-accent rounded-full shadow-[0_0_10px_rgba(212,255,0,0.5)]" />
                    <span className="text-accent font-bold text-sm tracking-widest uppercase">{project.tag}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xl leading-relaxed">
                    {project.description}
                  </p>
                  <button className="group flex items-center gap-3 text-white font-bold text-lg hover:text-accent transition-colors">
                    Ver proyecto <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-48 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-12">
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
              onClick={() => { setShowContactModal(false); setFormStatus("idle"); setFormData({ name: "", email: "", message: "" }); }}
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
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-accent/30 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white mb-1">Email directo</h4>
                  <a
                    href="mailto:alejandronopez@gmail.com?subject=Contacto%20desde%20portfolio"
                    className="text-gray-400 text-sm hover:text-accent transition-colors truncate block"
                  >
                    alejandronopez@gmail.com
                  </a>
                </div>
                <a
                  href="mailto:alejandronopez@gmail.com?subject=Contacto%20desde%20portfolio"
                  className="px-4 py-2 rounded-lg border border-accent/30 text-accent text-sm font-bold hover:bg-accent hover:text-black transition-all flex-shrink-0"
                >
                  Enviar
                </a>
              </div>

              {/* Option 2: Contact Form */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Formulario de contacto</h4>
                    <p className="text-gray-500 text-sm">Rellena y se abrirá tu cliente de email</p>
                  </div>
                </div>

                {formStatus === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-white font-bold text-xl mb-2">¡Mensaje preparado!</p>
                    <p className="text-gray-400">Se ha abierto tu cliente de email. Envía y te responderé pronto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-400 mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          placeholder="Tu nombre"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-400 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-400 mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                        rows={4}
                        placeholder="Cuéntame sobre tu proyecto..."
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-accent text-black py-3 rounded-lg font-bold text-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          />
                          Preparando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-gray-600 text-sm">
                También puedes escribirme directamente a{" "}
                <a href="mailto:alejandronopez@gmail.com" className="text-accent hover:underline">
                  alejandronopez@gmail.com
                </a>
              </p>
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
            <a href="#" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              Linkedin <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              Github <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              Email <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="text-gray-600 text-sm font-mono uppercase">
            © 2024 Alejandro Lopez
          </div>
        </div>
      </footer>
    </div>
  );
}
