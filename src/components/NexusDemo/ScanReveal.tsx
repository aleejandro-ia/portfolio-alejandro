import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScanRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScanReveal({
  children,
  delay = 0,
  duration = 0.4,
  className = ''
}: ScanRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{
        duration,
        delay,
        ease: 'linear'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScanLine({
  isScanning
}: {
  isScanning: boolean
}) {
  return (
    <motion.div
      initial={{ left: '0%', opacity: 0 }}
      animate={{
        left: isScanning ? '100%' : '0%',
        opacity: isScanning ? 1 : 0
      }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut'
      }}
      className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent pointer-events-none"
    />
  );
}
