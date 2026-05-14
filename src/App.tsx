import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Database,
  GitBranch,
  Hammer,
  Mail,
  Puzzle,
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
import { BuildProcessSection } from "./components/Process/BuildProcessSection";

const NexusDemoModal = lazy(() => import("./components/NexusDemo/NexusDemoModal"));

const getPublicContactEmail = () => {
  return import.meta.env.VITE_PUBLIC_CONTACT_EMAIL || "";
};

const SERVICES = [
  {
    icon: Workflow,
    chip: "SEO INTELIGENTE",
    image: "/service-cards/card-01-automation.png",
    imageClass: "w-[126%] max-w-none translate-x-3 translate-y-2 sm:w-[132%] sm:translate-x-4",
    title: "Automatización de procesos",
    description:
      "Diseño automatizaciones que reducen tareas manuales, conectan flujos de trabajo y mejoran la eficiencia operativa.",
  },
  {
    icon: Bot,
    chip: "IA APLICADA",
    image: "/service-cards/card-02-ai-agents.png",
    imageClass: "w-[122%] max-w-none translate-x-3 translate-y-3 sm:w-[128%] sm:translate-x-4",
    title: "Asistentes y agentes de IA",
    description:
      "Creo asistentes inteligentes que entienden contexto, ejecutan acciones y apoyan procesos reales.",
  },
  {
    icon: Hammer,
    chip: "ORGANIZACIÓN",
    image: "/service-cards/card-03-internal-tools.png",
    imageClass: "w-[126%] max-w-none translate-x-4 translate-y-3 sm:w-[132%] sm:translate-x-5",
    title: "Herramientas internas",
    description:
      "Desarrollo paneles, utilidades y sistemas internos para organizar información y facilitar decisiones.",
  },
  {
    icon: Sparkles,
    chip: "VALIDACIÓN",
    image: "/service-cards/card-04-demos.png",
    imageClass: "w-[128%] max-w-none translate-x-4 translate-y-2 sm:w-[136%] sm:translate-x-5",
    title: "Demos funcionales",
    description:
      "Construyo prototipos interactivos para validar ideas, enseñar valor y aterrizar soluciones.",
  },
  {
    icon: Puzzle,
    chip: "CONEXIÓN",
    image: "/service-cards/card-05-integrations.png",
    imageClass: "w-[138%] max-w-none translate-x-5 translate-y-1 rotate-[-6deg] sm:w-[146%] sm:translate-x-6",
    title: "Integración de herramientas",
    description:
      "Conecto plataformas, datos y procesos para que todo funcione de forma más fluida y coordinada.",
  },
  {
    icon: GitBranch,
    chip: "ESCALABILIDAD",
    image: "/service-cards/card-06-operations.png",
    imageClass: "w-[118%] max-w-none translate-x-4 translate-y-1 sm:w-[124%] sm:translate-x-5",
    title: "Flujos y operaciones",
    description:
      "Estructuro operaciones y recorridos de trabajo para que los sistemas sean más claros, medibles y escalables.",
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
          className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20"
        >
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div className="absolute -left-28 top-1/4 h-[1px] w-[48vw] rotate-[-42deg] bg-gradient-to-r from-accent/0 via-accent/45 to-accent/0" />
            <div className="absolute -right-24 bottom-1/4 h-[1px] w-[52vw] rotate-[-42deg] bg-gradient-to-r from-accent/0 via-accent/55 to-accent/0" />
            <div className="absolute right-0 top-1/3 h-[1px] w-[36vw] rotate-[-42deg] bg-gradient-to-r from-accent/0 via-white/10 to-accent/0" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center"
          >
            <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-accent/35 bg-black/45 px-4 py-2 text-[9px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.22em] leading-relaxed text-accent shadow-[0_0_24px_rgba(212,255,0,0.12)] backdrop-blur-sm">
              <span>IA aplicada</span>
              <span>·</span>
              <span>Automatización</span>
              <span>·</span>
              <span>Prototipos funcionales</span>
            </p>

            <div className="mt-7 sm:mt-9 w-full max-w-[min(100%,72rem)]">
              <BlurText
                text="ALEJANDRO"
                delay={60}
                animateBy="letters"
                direction="top"
                className="justify-center font-bold text-[clamp(3.15rem,15vw,12.5rem)] leading-[0.78] tracking-tighter uppercase whitespace-nowrap"
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
                className="justify-center font-bold text-[clamp(3.4rem,16vw,13.5rem)] leading-[0.78] tracking-tighter uppercase whitespace-nowrap"
                style={{
                  color: COLORS.accent,
                  fontFamily: FONTS.code,
                }}
              />
            </div>

            <div className="mt-5 sm:mt-7 flex w-full max-w-sm items-center justify-center gap-3 sm:max-w-md">
              <div className="h-px flex-1 bg-gradient-to-r from-accent/0 to-accent/45" />
              <img
                src="/logo-portfolio.png"
                alt="Logo Alejandro Lopez"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain opacity-90 drop-shadow-[0_0_16px_rgba(212,255,0,0.25)]"
              />
              <div className="h-px flex-1 bg-gradient-to-l from-accent/0 to-accent/45" />
            </div>

            <h1 className="mt-6 max-w-4xl text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Construyo soluciones con IA para automatizar procesos y validar
              ideas reales.
            </h1>

            <p className="mt-4 max-w-2xl text-sm sm:text-lg md:text-xl leading-relaxed text-gray-300">
              Con enfoque en negocio, procesos y herramientas útiles para
              operaciones reales.
            </p>

            <div className="mt-7 sm:mt-9 flex w-full max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="#proyectos"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-7 py-3 text-sm sm:text-base font-bold uppercase tracking-tight text-black shadow-[0_0_34px_rgba(212,255,0,0.24)] transition-transform hover:scale-[1.02]"
              >
                Ver proyectos
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
              <button
                type="button"
                onClick={() => setShowNexusDemo(true)}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-accent/40 bg-black/45 px-7 py-3 text-sm sm:text-base font-bold uppercase tracking-tight text-white transition-colors hover:border-accent hover:text-accent"
              >
                Probar demo
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
            </div>

            <a
              href="#valor"
              className="mt-8 sm:mt-10 inline-flex flex-col items-center gap-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-accent/70 transition-colors hover:text-accent"
              aria-label="Desliza para descubrir"
            >
              <ChevronDown className="h-5 w-5 animate-bounce" />
              <span className="hidden sm:inline">Desliza para descubrir</span>
            </a>
          </motion.div>
        </section>

        <section id="valor" className="relative z-10 overflow-hidden py-18 sm:py-24 md:py-32">
          <span id="servicios" className="absolute -top-24" aria-hidden="true" />
          <div className="pointer-events-none absolute right-[-10rem] top-[-12rem] hidden h-[32rem] w-[32rem] rounded-full border border-accent/10 lg:block">
            <div className="absolute inset-10 rounded-full border border-accent/10" />
            <div className="absolute inset-24 rounded-full border border-accent/15" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_28px_rgba(212,255,0,0.7)]" />
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div className="absolute -left-24 bottom-16 h-[1px] w-[44vw] rotate-[-42deg] bg-gradient-to-r from-accent/0 via-accent/45 to-accent/0" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="max-w-5xl"
            >
              <div className="flex items-center gap-3">
                <div className="hidden h-px w-12 bg-gradient-to-r from-accent/0 to-accent sm:block" />
                <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(212,255,0,0.7)]" />
                <p className="text-xs font-mono uppercase tracking-[0.32em] text-accent">
                  QUÉ HAGO
                </p>
              </div>

              <h2 className="mt-6 max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight text-white">
                De procesos manuales y problemas reales a soluciones con IA que
                generan valor
                <span className="text-accent">.</span>
              </h2>

              <p className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300">
                Diseño automatizaciones, asistentes, integraciones y prototipos
                funcionales para convertir tareas repetitivas, operaciones
                complejas y oportunidades de mejora en sistemas más claros,
                medibles y útiles para negocio.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((service, index) => {
                return (
                  <motion.article
                    key={service.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeUp}
                    transition={{ duration: 0.55, delay: index * 0.05 }}
                    className="group relative min-h-[23rem] overflow-hidden rounded-xl border border-white/15 bg-black/60 p-5 shadow-[0_0_30px_rgba(212,255,0,0.055)] backdrop-blur-sm transition-colors hover:border-accent/45 sm:min-h-[24rem] sm:p-6"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_60%,rgba(212,255,0,0.18),transparent_34%),linear-gradient(120deg,rgba(212,255,0,0.09),transparent_38%)] opacity-80" />
                    <div className="pointer-events-none absolute inset-y-10 right-0 w-[62%] overflow-visible sm:inset-y-7">
                      <div className="absolute inset-0 bg-gradient-to-l from-accent/14 via-accent/7 to-transparent blur-xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={service.image}
                          alt=""
                          aria-hidden="true"
                          className={`object-contain opacity-92 drop-shadow-[0_0_32px_rgba(212,255,0,0.24)] transition-transform duration-500 group-hover:scale-[1.035] ${service.imageClass}`}
                        />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/76 to-black/10" />
                    <div className="pointer-events-none absolute inset-y-0 left-[48%] w-[18%] bg-gradient-to-r from-black/72 to-transparent" />
                    <div className="pointer-events-none absolute right-5 top-5 grid grid-cols-5 gap-2 opacity-40">
                      {Array.from({ length: 20 }).map((_, dotIndex) => (
                        <span key={dotIndex} className="h-1 w-1 rounded-full bg-accent" />
                      ))}
                    </div>

                    <div className="relative z-10 flex min-h-[21rem] flex-col sm:min-h-[22rem]">
                      <div className="flex items-center gap-5">
                        <p className="font-mono text-2xl font-black text-accent sm:text-3xl">
                          0{index + 1}
                        </p>
                        <span className="rounded-full border border-accent/50 bg-black/45 px-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-accent shadow-[0_0_14px_rgba(212,255,0,0.08)]">
                          {service.chip}
                        </span>
                      </div>

                      <div className="mt-8 max-w-[58%] sm:mt-9">
                        <h3 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                          {service.title}
                        </h3>
                      </div>

                      <p className="mt-6 max-w-[57%] text-sm leading-relaxed text-gray-300 sm:text-base">
                        {service.description}
                      </p>

                      <div className="mt-auto h-px max-w-[58%] bg-white/10" />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

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

        <BuildProcessSection />

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
