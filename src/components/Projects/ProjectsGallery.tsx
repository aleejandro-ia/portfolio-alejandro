import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";
import { Project } from "../../data/projects";
import { ArrowRight } from "lucide-react";
import { NexusDemoTrigger } from "../NexusDemo";

// Wrapper function mapped to prevent JS negative modulo bugs format
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ProjectsGalleryProps {
  projects: Project[];
  setShowNexusDemo: (val: boolean) => void;
}

export function ProjectsGallery({ projects, setShowNexusDemo }: ProjectsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  
  const baseX = useMotionValue(0);
  
  // Track velocity of our horizontal movement for the skew effect
  const xVelocity = useVelocity(baseX);
  const smoothVelocity = useSpring(xVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate skew based on movement velocity. 
  // Limit output range to [-5, 5] so it doesn't break the layout at extreme drag speeds.
  const skewTransform = useTransform(smoothVelocity, [-2000, 2000], [-5, 5], { clamp: true });
  const skewX = useTransform(skewTransform, v => `${v}deg`);

  // Observe width to ensure seamless infinite loop
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Find the first repeating block to know the exact width needed to wrap
        const firstChild = containerRef.current.firstElementChild as HTMLElement;
        if (firstChild) {
          setSetWidth(firstChild.offsetWidth);
        }
      }
    };
    
    // Initial width load + 100ms timeout for any strict font/layout shifts
    updateWidth();
    setTimeout(updateWidth, 100);
    
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [projects]);

  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Tracks normalized cursor position from -1 (left edge) to 1 (right edge)
  const cursorRatio = useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const ratio = e.clientX / window.innerWidth;
    cursorRatio.current = (ratio * 2) - 1;
  };

  // Animation Loop Core
  useAnimationFrame((t, delta) => {
    // Stop automatic scroll if user is dragging manually or container hasn't loaded
    if (isDragging.current || setWidth === 0) return;
    
    let baseSpeed = 0.5; // very slow default
    let dir = -1; // defaults to moving left
    
    if (isHovered) {
      const ratio = cursorRatio.current;
      
      // If cursor is on the left half (negative ratio), gallery moves right (positive dir)
      // If cursor is on the right half (positive ratio), gallery moves left (negative dir)
      dir = ratio < 0 ? 1 : -1;
      
      // The closer to the edge, the faster it goes.
      const distance = Math.abs(ratio);
      
      // In center (distance near 0), speed is very slow (0.2). At edges (distance near 1), speed is fast (3.2).
      baseSpeed = 0.2 + (distance * 3); 
    }
    
    let moveBy = dir * baseSpeed * (delta / 8); 
    
    baseX.set(baseX.get() + moveBy);
  });

  // The actual translate X dynamically bound to the baseX motion value
  // We wrap -setWidth to 0 to create the infinite carousel optical illusion
  const xTransform = useTransform(baseX, (v) => {
    if (setWidth === 0) return "0px";
    return `${wrap(-setWidth, 0, v)}px`;
  });

  // Drag Handlers
  const handlePanStart = () => {
    isDragging.current = true;
  };
  
  const handlePan = (event: any, info: any) => {
    // 1-to-1 tracking with finger/mouse delta
    baseX.set(baseX.get() + info.delta.x);
  };
  
  const handlePanEnd = (event: any, info: any) => {
    isDragging.current = false;
    // Add residual momentum using standard physics or simply let loop resume
    // Natively, throwing it hard adds to baseX and then loop smoothly takes over again
  };

  // We repeat projects array 4 times to ensure screens of any size don't show blank space
  // even on extreme ultrawides or aggressive interactions
  const repeatCount = 4;

  return (
    <div
      className="relative w-full overflow-hidden py-6 sm:py-10 cursor-grab active:cursor-grabbing touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        cursorRatio.current = 0;
      }}
      onMouseMove={handleMouseMove}
      // Simple mobile touch hover handler
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setIsHovered(false);
        cursorRatio.current = 0;
      }}
    >
      <motion.div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 md:gap-8 w-max items-center"
        style={{ x: xTransform }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {Array.from({ length: repeatCount }).map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex gap-4 sm:gap-6 md:gap-8 items-center shrink-0 pr-4 sm:pr-6 md:pr-8">
            {projects.map((project, idx) => (
              <motion.div
                key={`${repeatIndex}-${project.id}`}
                style={{ skewX }}
                className="w-[85vw] sm:w-[75vw] md:w-[450px] lg:w-[500px] h-[400px] sm:h-[500px] md:h-[600px] flex-shrink-0 group relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black hover:border-accent/40 transition-colors flex flex-col justify-end p-4 sm:p-6 md:p-8"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-60 lg:opacity-40 lg:group-hover:opacity-60 transition-opacity duration-500 scale-105 lg:scale-100 lg:group-hover:scale-105 pointer-events-none">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end">

                  {/* Transparent Logo (Only for Nexus) */}
                  {project.id === "nexus" && (
                    <div className="absolute inset-x-0 top-0 bottom-[40%] sm:bottom-[38%] md:bottom-[35%] flex items-center justify-center opacity-100 lg:opacity-95 lg:group-hover:opacity-100 transition-transform duration-500 scale-[1.02] lg:scale-100 lg:group-hover:scale-[1.02] pointer-events-none px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8">
                      <img src="/nexus-logo-transparente.png" alt="Nexus Logo" className="w-full h-full object-contain drop-shadow-2xl max-w-[90%]" />
                    </div>
                  )}

                  <div className="translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500 will-change-transform relative z-20">
                    <p className="text-accent text-[9px] sm:text-[10px] md:text-xs font-mono font-bold mb-1 sm:mb-2 tracking-wide opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase">
                      {project.tag}
                    </p>
                    <h3 className="text-base sm:text-xl md:text-2xl font-extrabold text-white mb-1 sm:mb-2 md:mb-3 leading-tight drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 text-[10px] sm:text-xs md:text-sm line-clamp-3 md:line-clamp-4">
                      {project.description}
                    </p>

                    <div className={`flex opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-200 mt-1 sm:mt-2 ${project.id === "nexus" ? "justify-center w-full" : "gap-2 sm:gap-4"}`}>
                      {project.demo && (
                        <NexusDemoTrigger onClick={() => setShowNexusDemo(true)} />
                      )}
                      {project.id !== "nexus" && (
                        <button
                          type="button"
                          className="flex items-center gap-1 sm:gap-2 text-accent hover:gap-2 sm:hover:gap-3 transition-all font-bold text-[10px] sm:text-sm"
                        >
                          Ver proyecto <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
