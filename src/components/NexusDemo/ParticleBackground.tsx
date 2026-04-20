import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  startX: string;
  startY: string;
  delay: number;
  size: number;
  color: string;
}

interface ParticleBackgroundProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function ParticleBackground({ isActive, onComplete }: ParticleBackgroundProps) {
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#FF6900', '#FF8C42', '#FFB347', '#FFFFFF'];
    return Array.from({ length: 50 }, (_, i) => {
      const edge = Math.floor(Math.random() * 4);
      let startX = '50%';
      let startY = '50%';

      switch (edge) {
        case 0: // top
          startX = `${Math.random() * 100}%`;
          startY = '-5%';
          break;
        case 1: // right
          startX = '105%';
          startY = `${Math.random() * 100}%`;
          break;
        case 2: // bottom
          startX = `${Math.random() * 100}%`;
          startY = '105%';
          break;
        case 3: // left
          startX = '-5%';
          startY = `${Math.random() * 100}%`;
          break;
      }

      return {
        id: i,
        startX,
        startY,
        delay: Math.random() * 0.3,
        size: Math.random() * 2 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      <AnimatePresence>
        {isActive && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  left: particle.startX,
                  top: particle.startY,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  left: '50%',
                  top: '50%',
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: particle.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onAnimationComplete={() => {
                  if (particle.id === particles.length - 1) {
                    setTimeout(onComplete, 200);
                  }
                }}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
