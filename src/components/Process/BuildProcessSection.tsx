import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Box,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  GitBranch,
  Layers3,
  Link,
  Network,
  RefreshCw,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

const methodSteps = [
  {
    id: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analizo procesos, tareas repetitivas y cuellos de botella para detectar oportunidades reales de automatización y mejora.",
  },
  {
    id: "02",
    icon: Network,
    title: "Diseño",
    description:
      "Defino el flujo, la lógica y el papel de la IA para construir una solución útil, clara y alineada con negocio.",
  },
  {
    id: "03",
    icon: Box,
    title: "Prototipo",
    description:
      "Creo una primera versión funcional para validar la idea, probar su valor y acelerar mejores decisiones.",
  },
  {
    id: "04",
    icon: RefreshCw,
    title: "Iteración",
    description:
      "Ajusto, conecto y preparo la solución para su uso real, priorizando eficiencia, claridad y escalabilidad.",
  },
];

const toolPanels = [
  {
    icon: Cpu,
    title: "IA aplicada y automatización",
    items: [
      { label: "OpenAI", icon: Sparkles, logo: "" },
      { label: "Gemini", icon: Sparkles, logo: "" },
      { label: "Make", icon: Zap, logo: "" },
      { label: "n8n", icon: GitBranch, logo: "" },
      { label: "agentes de IA", icon: Bot, logo: "" },
    ],
  },
  {
    icon: Layers3,
    title: "Prototipado y construcción",
    items: [
      { label: "prototipado rápido", icon: Zap, logo: "" },
      { label: "demos funcionales", icon: ArrowRight, logo: "" },
      { label: "validación", icon: CheckCircle2, logo: "" },
      { label: "integración", icon: Link, logo: "" },
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Herramientas de trabajo",
    items: [
      { label: "Codex", icon: Cpu, logo: "" },
      { label: "Claude", icon: Sparkles, logo: "" },
      { label: "ChatGPT", icon: Sparkles, logo: "" },
      { label: "GitHub", icon: GitBranch, logo: "" },
      { label: "Vercel", icon: ArrowRight, logo: "" },
      { label: "Firebase", icon: Zap, logo: "" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex max-w-full items-center gap-4">
      <p className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-[0.42em] text-accent sm:text-xs">
        {children}
      </p>
      <div className="relative h-px min-w-12 flex-1 max-w-72 bg-gradient-to-r from-accent/65 to-accent/0">
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(212,255,0,0.95)]" />
      </div>
    </div>
  );
}

function ProcessBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_17%,rgba(212,255,0,0.14),transparent_15rem),radial-gradient(circle_at_72%_45%,rgba(212,255,0,0.08),transparent_22rem)]" />
      <div className="absolute left-0 top-0 h-full w-full opacity-[0.10] [background-image:linear-gradient(rgba(212,255,0,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(212,255,0,0.08)_1px,transparent_1px)] [background-size:120px_120px]" />
      <svg
        className="absolute top-[9.25rem] right-[max(1rem,calc((100vw-80rem)/2+1rem))] hidden h-[27rem] w-[48rem] translate-x-[40%] overflow-visible opacity-68 lg:block xl:top-[8.5rem] xl:h-[30rem] xl:w-[54rem] xl:opacity-78 2xl:translate-x-[28%] 2xl:opacity-86"
        viewBox="0 0 760 430"
        fill="none"
      >
        <defs>
          <filter id="build-process-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.831 0 0 0 0 1 0 0 0 0 0 0 0 0 0.9 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="build-process-line" x1="0" y1="360" x2="704" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d4ff00" stopOpacity="0" />
            <stop offset="0.28" stopColor="#d4ff00" stopOpacity="0.24" />
            <stop offset="0.62" stopColor="#d4ff00" stopOpacity="0.95" />
            <stop offset="1" stopColor="#d4ff00" stopOpacity="0.76" />
          </linearGradient>
        </defs>
        <g opacity="0.72">
          <circle cx="704" cy="8" r="34" stroke="rgba(212,255,0,0.25)" strokeWidth="1" />
          <circle cx="704" cy="8" r="58" stroke="rgba(212,255,0,0.16)" strokeWidth="1" />
          <circle cx="704" cy="8" r="88" stroke="rgba(212,255,0,0.09)" strokeWidth="1" />
          <path
            d="M704 8V116"
            stroke="rgba(212,255,0,0.46)"
            strokeWidth="1"
            strokeLinecap="round"
            filter="url(#build-process-glow)"
          />
        </g>
        <path
          d="M72 356H162C206 356 232 330 232 286V246C232 202 258 176 302 176H456C506 176 532 150 532 100V54C532 27 552 8 579 8H704"
          stroke="rgba(212,255,0,0.06)"
          strokeWidth="48"
          strokeLinecap="round"
        />
        <path
          d="M72 356H162C206 356 232 330 232 286V246C232 202 258 176 302 176H456C506 176 532 150 532 100V54C532 27 552 8 579 8H704"
          stroke="rgba(212,255,0,0.14)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M72 356H162C206 356 232 330 232 286V246C232 202 258 176 302 176H456C506 176 532 150 532 100V54C532 27 552 8 579 8H704"
          stroke="url(#build-process-line)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#build-process-glow)"
        />
        <path
          d="M72 356H162C206 356 232 330 232 286V246C232 202 258 176 302 176H456C506 176 532 150 532 100V54C532 27 552 8 579 8H704"
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {[72, 232, 532, 704].map((cx, index) => {
          const cy = [356, 246, 100, 8][index];
          return (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index === 3 ? 6 : 3}
              fill="#d4ff00"
              filter="url(#build-process-glow)"
            />
          );
        })}
      </svg>
    </div>
  );
}

export function BuildProcessSection() {
  return (
    <section id="proceso" className="relative z-10 overflow-hidden pb-14 pt-20 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32">
      <span id="herramientas" className="absolute -top-24" aria-hidden="true" />
      <ProcessBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <SectionLabel>CÓMO CONSTRUYO</SectionLabel>

          <h2 className="mt-7 max-w-5xl text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.85rem]">
            De la idea al prototipo: método, herramientas y criterio para
            construir soluciones con <span className="text-accent">IA.</span>
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
            Trabajo con un enfoque práctico: analizo procesos, detecto
            oportunidades, diseño automatizaciones y construyo prototipos
            funcionales con IA para validar ideas, optimizar operaciones y
            convertir necesidades reales en soluciones utilizables.
          </p>
        </motion.div>

        <div className="relative mt-9 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          <div className="pointer-events-none absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0 md:hidden" />
          {methodSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="group relative min-h-[22.25rem] rounded-[24px] border border-accent/34 bg-black/54 p-5 shadow-[0_0_34px_rgba(212,255,0,0.08)] backdrop-blur-md sm:p-5 lg:min-h-[22.75rem] lg:p-5 xl:p-6"
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(212,255,0,0.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.075),transparent_36%)] opacity-95 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent/0 via-accent/85 to-accent/0 shadow-[0_0_18px_rgba(212,255,0,0.55)]" />
                  <div className="absolute bottom-0 right-0 h-20 w-24 border-b-4 border-r-4 border-accent/70 [clip-path:polygon(100%_0,100%_100%,0_100%)] shadow-[0_0_20px_rgba(212,255,0,0.22)]" />
                  <div className="absolute -bottom-9 -left-8 h-20 w-32 opacity-32 [background-image:radial-gradient(circle,rgba(212,255,0,0.72)_1px,transparent_1.5px)] [background-size:9px_9px] sm:-bottom-8" />
                  <div className="absolute -bottom-10 right-10 h-32 w-40 rounded-full border border-accent/10 opacity-45" />
                  <div className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.13),inset_0_0_34px_rgba(212,255,0,0.028)]" />
                </div>

                {index < methodSteps.length - 1 && (
                  <div className="pointer-events-none absolute -right-[2.45rem] top-[50%] z-40 hidden h-14 w-14 -translate-y-1/2 items-center justify-center lg:flex xl:-right-[2.8rem]">
                    <span className="absolute left-[-1.7rem] h-px w-7 bg-gradient-to-r from-accent/0 to-accent/80" />
                    <span className="absolute right-[-1.7rem] h-px w-7 bg-gradient-to-r from-accent/80 to-accent/0" />
                    <span className="absolute -right-[1.92rem] h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(212,255,0,0.95)]" />
                    <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-accent/45 bg-black/82 text-accent shadow-[0_0_24px_rgba(212,255,0,0.35),inset_0_0_18px_rgba(212,255,0,0.06)] [background-image:radial-gradient(circle_at_50%_50%,rgba(212,255,0,0.08),transparent_58%)]">
                      <ArrowRight className="h-5 w-5" strokeWidth={1.85} />
                    </span>
                  </div>
                )}

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <p className="flex h-10 w-[4.4rem] shrink-0 items-center justify-center rounded-xl border border-accent/55 bg-black/72 font-mono text-xl font-bold text-accent shadow-[0_0_16px_rgba(212,255,0,0.12)] [clip-path:polygon(14%_0,86%_0,100%_28%,100%_72%,86%_100%,14%_100%,0_72%,0_28%)]">
                      {step.id}
                    </p>
                    <p className="flex items-center gap-3 text-sm uppercase tracking-[0.08em] text-gray-300">
                      PASO
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(212,255,0,0.9)]" />
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 4 }).map((_, dotIndex) => (
                      <span
                        key={dotIndex}
                        className={`h-2.5 w-2.5 rounded-full ${
                          dotIndex === index
                            ? "bg-accent shadow-[0_0_12px_rgba(212,255,0,0.9)]"
                            : "bg-white/25"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto mt-4 flex h-[6.6rem] max-w-[15.5rem] items-center justify-center sm:h-[7.4rem]">
                  <div className="absolute inset-x-3 top-3 bottom-2 rounded-[30%] border border-accent/12 bg-black/25 [clip-path:polygon(50%_0,92%_24%,92%_76%,50%_100%,8%_76%,8%_24%)]" />
                  <div className="absolute inset-x-10 inset-y-8 rounded-full border border-accent/18" />
                  <div className="absolute h-24 w-24 rounded-full border border-accent/18 shadow-[0_0_32px_rgba(212,255,0,0.10)]" />
                  <Icon className="relative h-14 w-14 text-accent drop-shadow-[0_0_22px_rgba(212,255,0,0.72)] sm:h-[4.25rem] sm:w-[4.25rem]" strokeWidth={1.45} />
                </div>

                <h3 className="relative mt-3 text-2xl font-bold leading-tight text-white sm:text-[1.8rem]">
                  {step.title}
                </h3>
                <div className="relative mt-2 h-[2px] w-10 bg-accent shadow-[0_0_12px_rgba(212,255,0,0.65)]" />
                <p className="relative mt-3 max-w-[15.75rem] pr-3 text-[0.92rem] leading-relaxed text-gray-300 sm:text-[0.95rem] lg:pr-0">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="relative mt-9 sm:mt-12">
          <SectionLabel>ENTORNO CON EL QUE CONSTRUYO</SectionLabel>

          <div className="mt-5 grid gap-4 lg:grid-cols-3 lg:gap-5 xl:gap-6">
            {toolPanels.map((panel, index) => {
              const Icon = panel.icon;
              return (
                <motion.article
                  key={panel.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group relative min-h-[18.5rem] overflow-hidden rounded-[24px] border border-accent/34 bg-black/58 p-5 shadow-[0_0_36px_rgba(212,255,0,0.07)] backdrop-blur-md sm:p-5 lg:min-h-[19rem] xl:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,255,0,0.15),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.09),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)] opacity-95 transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute right-0 top-0 h-44 w-64 bg-gradient-to-bl from-white/16 via-accent/7 to-transparent [clip-path:polygon(32%_0,100%_0,100%_100%,0_100%)]" />
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-accent/0 via-accent/80 to-accent/0 shadow-[0_0_18px_rgba(212,255,0,0.6)]" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent/0 via-accent/75 to-accent/0 shadow-[0_0_18px_rgba(212,255,0,0.45)]" />
                  <div className="pointer-events-none absolute -left-8 top-10 h-24 w-8 bg-accent/45 blur-xl" />
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_38px_rgba(212,255,0,0.035)]" />

                  <div className="relative grid gap-4 sm:grid-cols-[7.25rem_1fr] sm:items-center lg:grid-cols-1 xl:grid-cols-[7.1rem_1fr]">
                    <div className="relative flex h-[6.4rem] w-[6.8rem] items-center justify-center rounded-[24px] border border-accent/32 bg-black/50 shadow-[0_0_28px_rgba(212,255,0,0.12),inset_0_0_22px_rgba(255,255,255,0.035)]">
                      <div className="absolute inset-3 rounded-[22px] border border-white/10 bg-white/[0.035]" />
                      <div className="absolute h-20 w-20 rounded-full border border-accent/20" />
                      <div className="absolute h-12 w-12 rounded-full border border-accent/18" />
                      <div className="absolute left-4 right-4 top-1/2 h-px bg-gradient-to-r from-accent/0 via-accent/55 to-accent/0" />
                      <div className="absolute bottom-4 left-5 right-5 h-px bg-gradient-to-r from-accent/0 via-white/25 to-accent/0" />
                      <Icon className="relative h-12 w-12 text-accent drop-shadow-[0_0_20px_rgba(212,255,0,0.66)]" strokeWidth={1.45} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="max-w-[18rem] text-2xl font-bold leading-[1.08] text-white sm:text-[1.7rem] lg:text-[1.55rem] xl:text-[1.7rem]">
                        {panel.title}
                      </h3>
                      <div className="mt-3 h-px w-28 bg-gradient-to-r from-accent via-accent/35 to-accent/0 shadow-[0_0_12px_rgba(212,255,0,0.58)]" />
                    </div>
                  </div>

                  <div className="relative mt-5 grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
                    {panel.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <span
                          key={item.label}
                          className="inline-flex min-h-[3rem] items-center gap-2.5 rounded-xl border border-white/16 bg-black/64 px-3.5 py-2 text-sm font-medium text-gray-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_0_16px_rgba(0,0,0,0.30)] transition-colors group-hover:border-white/22"
                        >
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt=""
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0 object-contain"
                            />
                          ) : (
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/22 bg-accent/8 text-accent shadow-[0_0_12px_rgba(212,255,0,0.10)]">
                              <ItemIcon className="h-4 w-4" strokeWidth={2} />
                            </span>
                          )}
                          {item.label}
                        </span>
                      );
                    })}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
