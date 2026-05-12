import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Database,
  GitBranch,
  Hammer,
  Mail,
  Puzzle,
  Search,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { ShaderAnimation } from "./components/Animations/ShaderAnimation";
import { BlurText } from "./components/Hero/BlurText";
import { Navigation } from "./components/Navigation/Navigation";
import { ContactForm } from "./components/Contact/ContactForm";
import { COLORS, FONTS } from "./constants";
import { projects } from "./data/projects";
import { useClickOutside } from "./hooks/useClickOutside";
import { ProjectsGallery } from "./components/Projects/ProjectsGallery";

const NexusDemoModal = lazy(() => import("./components/NexusDemo/NexusDemoModal"));

const getPublicContactEmail = () => {
  return import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || "";
};

const VALUE_POINTS = [
  "IA aplicada a procesos reales",
  "Automatizaciones e integraciones utilizables",
  "Prototipos para validar antes de invertir de más",
];

const SERVICES = [
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description:
      "Mapeo flujos repetitivos, detecto fricciones operativas y construyo automatizaciones que reducen trabajo manual.",
  },
  {
    icon: Bot,
    title: "Asistentes y agentes de IA",
    description:
      "Diseño asistentes capaces de clasificar, responder, resumir, priorizar o guiar tareas dentro de un flujo de trabajo.",
  },
  {
    icon: Hammer,
    title: "Herramientas internas",
    description:
      "Creo interfaces y sistemas internos enfocados en resolver una necesidad concreta sin convertirlo todo en un producto complejo.",
  },
  {
    icon: Sparkles,
    title: "Demos funcionales",
    description:
      "Transformo ideas en prototipos navegables para probar valor, enseñar posibilidades y tomar decisiones con más claridad.",
  },
  {
    icon: Puzzle,
    title: "Integración de herramientas",
    description:
      "Conecto modelos de IA, APIs, bases de datos, formularios y plataformas para que la información fluya mejor.",
  },
  {
    icon: GitBranch,
    title: "Flujos y operaciones",
    description:
      "Combino lógica de negocio, automatización y criterio operativo para crear soluciones prácticas, no solo técnicamente atractivas.",
  },
];

const PROCESS_STEPS = [
  {
    id: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Entiendo el contexto, el proceso y el objetivo de negocio antes de proponer una solución.",
  },
  {
    id: "02",
    icon: BrainCircuit,
    title: "Diseño",
    description:
      "Defino el flujo, las herramientas, los datos necesarios y el alcance realista del prototipo.",
  },
  {
    id: "03",
    icon: Hammer,
    title: "Prototipo",
    description:
      "Construyo una demo funcional para validar utilidad, experiencia y posibles integraciones.",
  },
  {
    id: "04",
    icon: CheckCircle2,
    title: "Iteración",
    description:
      "Ajusto la solución según feedback y dejo una base clara para evolucionarla o escalarla.",
  },
];

const TOOL_GROUPS = [
  {
    title: "IA aplicada y automatización",
    items: [
      "OpenAI",
      "Gemini",
      "Make",
      "n8n",
      "agentes de IA",
      "prompt engineering",
      "RAG",
      "automatización de flujos",
    ],
  },
  {
    title: "Prototipado y construcción de soluciones",
    items: [
      "prototipado rápido",
      "desarrollo asistido por IA",
      "validación de ideas",
      "demos funcionales",
      "iteración rápida",
      "experimentación de soluciones",
      "integración de herramientas",
    ],
  },
  {
    title: "Herramientas de trabajo",
    items: [
      "Codex",
      "Claude",
      "ChatGPT",
      "Google AI Studio",
      "Gemini",
      "GitHub",
      "Vercel",
      "Firebase",
      "Supabase",
    ],
  },
];

const FAQS = [
  {
    question: "¿Qué tipo de procesos se pueden automatizar con IA en una empresa?",
    answer:
      "Procesos con tareas repetitivas, clasificación de información, generación de respuestas, priorización, extracción de datos o coordinación entre herramientas.",
  },
  {
    question: "¿Qué es un prototipo funcional con IA y para qué sirve?",
    answer:
      "Es una versión usable de una idea que permite probar el flujo, enseñar la solución y validar si aporta valor antes de construir algo más grande.",
  },
  {
    question:
      "¿Cómo puede ayudar la IA aplicada a mejorar operaciones y procesos de negocio?",
    answer:
      "Puede reducir carga manual, acelerar decisiones, ordenar información dispersa y convertir tareas poco escalables en sistemas más consistentes.",
  },
  {
    question:
      "¿Se pueden crear herramientas internas y automatizaciones sin desarrollar un producto completo desde cero?",
    answer:
      "Sí. Muchas necesidades se pueden resolver con prototipos, integraciones y capas internas enfocadas en un caso de uso concreto.",
  },
  {
    question:
      "¿Qué diferencia hay entre una demo de IA, un prototipo funcional y una solución lista para producción?",
    answer:
      "La demo muestra posibilidades, el prototipo valida uso real y la solución de producción requiere más robustez, seguridad, mantenimiento y escalabilidad.",
  },
  {
    question:
      "¿Cómo combino visión de negocio, automatización e IA aplicada en mis proyectos?",
    answer:
      "Parto del proceso y del objetivo operativo, no solo de la tecnología. Mi formación en Administración y Finanzas me ayuda a traducir necesidades reales en soluciones útiles.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showNexusDemo, setShowNexusDemo] = useState(false);
  const contactModalRef = useClickOutside(() => setShowContactModal(false));
  const publicContactEmail = getPublicContactEmail();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const menuItems = [
    { label: "INICIO", href: "#inicio", highlight: true },
    { label: "QUÉ HAGO", href: "#servicios" },
    { label: "PROYECTOS", href: "#proyectos" },
    { label: "PROCESO", href: "#proceso" },
    { label: "SOBRE MÍ", href: "#sobre-mi" },
    {
      label: "CONTACTO",
      action: () => setShowContactModal(true),
    },
  ];

  return (
    <div className="min-h-screen selection:bg-accent selection:text-black transition-colors relative bg-background text-white overflow-x-hidden">
      <ShaderAnimation />

      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto relative">
          <Navigation items={menuItems} />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

      <main>
        <section
          id="inicio"
          className="relative z-10 min-h-screen flex items-center pt-20 pb-12 sm:pt-24 sm:pb-16"
        >
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="w-full max-w-[343px] sm:max-w-3xl min-w-0 mx-auto sm:mx-0"
              >
                <p className="inline-flex w-full sm:w-auto max-w-full flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 rounded-2xl sm:rounded-full border border-accent/25 bg-accent/10 px-3 py-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-relaxed text-accent">
                  <span>IA aplicada</span>
                  <span>·</span>
                  <span>automatización</span>
                  <span>·</span>
                  <span>prototipos funcionales</span>
                </p>

                <div className="mt-4 sm:mt-6">
                  <BlurText
                    text="ALEJANDRO"
                    delay={60}
                    animateBy="letters"
                    direction="top"
                    className="font-bold text-[clamp(2.35rem,5.6vw,5.4rem)] leading-[0.88] tracking-tighter uppercase"
                    style={{
                      color: "#FFFFFF",
                      fontFamily: FONTS.code,
                    }}
                  />
                  <BlurText
                    text="LOPEZ"
                    delay={60}
                    animateBy="letters"
                    direction="top"
                    className="font-bold text-[clamp(2.35rem,5.6vw,5.4rem)] leading-[0.88] tracking-tighter uppercase"
                    style={{
                      color: COLORS.accent,
                      fontFamily: FONTS.code,
                    }}
                  />
                </div>

                <h1 className="mt-5 max-w-3xl text-[1.7rem] sm:text-4xl md:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.8rem] font-extrabold leading-[1.08] tracking-tight text-white">
                  Construyo prototipos funcionales con IA para automatizar
                  procesos y validar ideas.
                </h1>

                <p className="mt-4 max-w-2xl text-sm sm:text-lg md:text-lg xl:text-xl leading-relaxed text-gray-300">
                  Combino IA aplicada, automatización e integración de
                  herramientas para convertir problemas reales en demos,
                  asistentes y sistemas internos utilizables.
                </p>

                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(true)}
                    className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 sm:gap-3 rounded-full bg-accent px-5 sm:px-6 py-3 text-sm sm:text-base font-bold text-black text-center shadow-[0_0_30px_rgba(212,255,0,0.18)] transition-transform hover:scale-[1.02]"
                  >
                    <span>Hablemos de una oportunidad</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <a
                    href="#proyectos"
                    className="inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 sm:gap-3 rounded-full border border-white/15 bg-white/[0.03] px-5 sm:px-6 py-3 text-sm sm:text-base font-bold text-white text-center transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <span>Ver proyectos y demos</span>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="lg:justify-self-end w-full max-w-[343px] sm:max-w-xl min-w-0 mx-auto lg:mx-0"
              >
                <div className="border border-white/10 bg-black/55 backdrop-blur-sm p-5 sm:p-7 shadow-[0_0_40px_rgba(212,255,0,0.04)]">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                        Enfoque
                      </p>
                      <p className="mt-2 text-xl sm:text-2xl font-bold text-white">
                        IA útil para operaciones reales
                      </p>
                    </div>
                    <img
                      src="/logo-portfolio.png"
                      alt="Logo Alejandro Lopez"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-90 drop-shadow-[0_0_15px_rgba(212,255,0,0.2)]"
                    />
                  </div>

                  <div className="mt-5 space-y-4">
                    {VALUE_POINTS.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 w-5 h-5 shrink-0 text-accent" />
                        <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-2xl font-black text-accent">IA</p>
                      <p className="mt-1 text-xs sm:text-sm text-gray-400">
                        aplicada a casos concretos
                      </p>
                    </div>
                    <div className="border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-2xl font-black text-accent">Ops</p>
                      <p className="mt-1 text-xs sm:text-sm text-gray-400">
                        visión de negocio y procesos
                      </p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <SectionShell id="valor" eyebrow="Propuesta de valor" title="De una idea o proceso confuso a una demo que se puede probar.">
          <div className="grid gap-4 md:grid-cols-3">
            {VALUE_POINTS.map((point, index) => (
              <motion.div
                key={point}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="border border-white/10 bg-white/[0.035] p-5 sm:p-6"
              >
                <p className="text-sm font-mono text-accent">0{index + 1}</p>
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-white">
                  {point}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-400">
                  Trabajo desde el problema de negocio hacia una solución
                  funcional, entendible y lista para recibir feedback real.
                </p>
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="servicios"
          eyebrow="Qué hago"
          title="Capacidades aterrizadas en automatización, asistentes y herramientas internas."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="border border-white/10 bg-black/45 p-5 sm:p-6 transition-colors hover:border-accent/35"
                >
                  <div className="w-11 h-11 rounded-full border border-accent/25 bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 text-lg sm:text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-400">
                    {service.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        <section id="proyectos" className="py-16 sm:py-20 md:py-28 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
            <p className="text-center text-xs font-mono uppercase tracking-[0.24em] text-accent">
              Proyectos destacados
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center tracking-tight">
              Demos y sistemas que muestran el enfoque.
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-400 text-center mt-4 leading-relaxed">
              La sección mantiene su planteamiento actual: ejemplos enfocados
              en IA aplicada, automatización y sistemas internos.
            </p>
          </div>

          <ProjectsGallery projects={projects} setShowNexusDemo={setShowNexusDemo} />
        </section>

        <SectionShell
          id="proceso"
          eyebrow="Proceso de trabajo"
          title="Un proceso claro para validar soluciones sin perder foco."
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-5 relative">
            <div className="hidden md:block absolute top-[31px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-accent/0 via-accent/25 to-accent/0 z-0" />
            <div className="block md:hidden absolute left-[31px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 z-0" />

            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative z-10 flex flex-row md:flex-col items-start gap-5"
                >
                  <div className="w-16 h-16 shrink-0 rounded-full border border-white/10 bg-black flex items-center justify-center text-accent shadow-[0_0_15px_rgba(212,255,0,0.06)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-accent">{step.id}</p>
                    <h3 className="mt-1 text-lg sm:text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell
          id="herramientas"
          eyebrow="Herramientas y entorno"
          title="No lo planteo como un stack clásico, sino como un entorno para construir soluciones."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {TOOL_GROUPS.map((group, index) => (
              <motion.div
                key={group.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <Boxes className="w-5 h-5 text-accent" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs sm:text-sm text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="sobre-mi"
          eyebrow="Sobre mí"
          title="IA aplicada con lectura de negocio, procesos y operaciones."
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-start">
            <div className="border border-white/10 bg-black/50 p-6 sm:p-8">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-neutral-500">
                Perfil
              </p>
              <p className="mt-5 text-2xl sm:text-3xl font-bold leading-tight text-white">
                Construyo desde la intersección entre IA, automatización y
                criterio operativo.
              </p>
            </div>
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-gray-300">
              <p>
                Mi perfil ha evolucionado hacia la IA aplicada, la
                automatización y los prototipos funcionales: soluciones que se
                pueden enseñar, probar y ajustar alrededor de problemas reales.
              </p>
              <p>
                La formación en Administración y Finanzas me aporta una forma
                práctica de mirar procesos, operaciones, costes, tiempos y
                lógica de negocio. Eso me ayuda a aplicar la IA con intención:
                no como una capa llamativa, sino como una herramienta para
                mejorar cómo trabaja una organización.
              </p>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="faq"
          eyebrow="FAQ"
          title="Preguntas habituales antes de plantear una demo o automatización."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 bg-black/45 p-5 sm:p-6 open:border-accent/35"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base sm:text-lg font-bold text-white">
                  <span>{faq.question}</span>
                  <ChevronDown className="mt-1 w-5 h-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </SectionShell>

        <section
          id="contacto"
          className="py-16 sm:py-24 md:py-32 relative z-10 overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-accent">
              Contacto
            </p>
            <h2 className="mt-5 text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Hablemos de oportunidades, colaboraciones o una primera demo.
            </h2>
            <p className="text-gray-400 text-base sm:text-xl md:text-2xl mt-6 mb-9 sm:mb-12 max-w-2xl leading-relaxed">
              Si tienes un proceso que quieres automatizar, una idea que
              validar o una herramienta interna que podría mejorar tu operación,
              podemos aterrizarlo con calma.
            </p>
            <button
              type="button"
              onClick={() => setShowContactModal(true)}
              className="bg-accent text-black px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-lg md:text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,255,0,0.2)] flex items-center gap-3"
            >
              Abrir contacto <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </section>
      </main>

      {showNexusDemo && (
        <Suspense fallback={null}>
          <NexusDemoModal isOpen={showNexusDemo} onClose={() => setShowNexusDemo(false)} />
        </Suspense>
      )}

      {showContactModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={contactModalRef}
            className="bg-neutral-900 border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative"
          >
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 text-neutral-500 hover:text-accent transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="mb-6 sm:mb-8 pr-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                Hablemos <span className="text-accent">.</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-lg">
                Cuéntame sobre una oportunidad, colaboración o proceso que te
                gustaría validar con IA.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
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
                  El formulario envía tu mensaje sin exponer el correo de
                  destino en el frontend.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="font-bold text-xl sm:text-2xl tracking-tighter">
            <span className="text-white">ALEJANDRO</span>{" "}
            <span className="text-accent">LOPEZ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function SectionShell({ id, eyebrow, title, children }: SectionShellProps) {
  return (
    <section id={id} className="relative z-10 py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-8 sm:mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
